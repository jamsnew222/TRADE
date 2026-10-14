import { StockData } from '@/types';
import { STOCK_SYMBOLS_LIST, getBasePrice } from './stock-universe';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '';

export type MarketMode = 'live' | 'simulated' | 'loading';
type Listener = (stocks: StockData[]) => void;

// Finnhub free tier only supports US symbols (no exchange suffix)
const isFinnhubSymbol = (symbol: string) => !symbol.includes('.');

const quotes = new Map<string, StockData>();
const priceHistory = new Map<string, number[]>();
const liveSymbols = new Set<string>();
const listeners = new Set<Listener>();
const simBias = new Map<string, number>();

const MAX_HISTORY = 120;

let mode: MarketMode = 'loading';
let activeSource: 'finnhub' | 'stooq' | null = null;
let initialized = false;
let tickTimer: ReturnType<typeof setInterval> | null = null;
let apiTimer: ReturnType<typeof setInterval> | null = null;

const TICK_MS = 1500;
const FINNHUB_REFRESH_MS = 60_000; // stay under Finnhub's 60 calls/min free limit
const STOOQ_REFRESH_MS = 30_000; // stooq is one batched request per cycle
const API_BATCH_SIZE = 15;
const API_BATCH_GAP_MS = 1200;

function notify() {
  const snapshot = STOCK_SYMBOLS_LIST
    .map(s => quotes.get(s.symbol))
    .filter((q): q is StockData => !!q);
  listeners.forEach(cb => cb(snapshot));
}

function setQuote(symbol: string, price: number, dayOpen?: number) {
  const info = STOCK_SYMBOLS_LIST.find(s => s.symbol === symbol);
  if (!info) return;

  const existing = quotes.get(symbol);
  const open = dayOpen ?? existing?.open ?? price;
  const high = Math.max(existing?.high ?? price, price);
  const low = Math.min(existing?.low ?? price, price);

  quotes.set(symbol, {
    symbol,
    name: info.name,
    price,
    change: price - open,
    changePercent: open > 0 ? ((price - open) / open) * 100 : 0,
    currency: info.currency,
    exchange: info.exchange,
    open,
    high,
    low,
    previousClose: existing?.previousClose ?? open,
    volume: existing?.volume,
  });

  const history = priceHistory.get(symbol) ?? [];
  history.push(price);
  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY);
  }
  priceHistory.set(symbol, history);
}

function seed() {
  STOCK_SYMBOLS_LIST.forEach(info => {
    const base = getBasePrice(info);
    // Small spread so stocks don't all start identical, roughly half red/half green
    const price = base * (1 + (Math.random() - 0.5) * 0.008);
    setQuote(info.symbol, price, base);
    // Persistent per-stock trend bias so some trend up and some trend down
    simBias.set(info.symbol, (Math.random() - 0.5) * 0.0008);
  });
}

function tickSimulated() {
  let changed = false;
  quotes.forEach((q, symbol) => {
    if (liveSymbols.has(symbol)) return; // real symbols only move on real data

    const volatility = 0.0012;
    const bias = simBias.get(symbol) ?? 0;
    const shock = (Math.random() - 0.5) * 2;
    // Gentle mean reversion toward day open keeps prices bounded
    const dayOpen = q.open ?? q.price;
    const reversion = dayOpen > 0 ? ((dayOpen - q.price) / dayOpen) * 0.002 : 0;
    const next = Math.max(0.01, q.price * (1 + bias + reversion + volatility * shock));

    setQuote(symbol, next);
    changed = true;
  });
  if (changed) notify();
}

// ---------- Finnhub (requires user API key, US symbols only) ----------

async function fetchFinnhubQuote(symbol: string): Promise<{ price: number; open: number } | null> {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.error || !data.c) return null;
    return { price: data.c, open: data.o || data.c };
  } catch {
    return null;
  }
}

async function refreshFinnhubQuotes(symbols: string[]) {
  for (let i = 0; i < symbols.length; i += API_BATCH_SIZE) {
    const batch = symbols.slice(i, i + API_BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(async sym => {
        const q = await fetchFinnhubQuote(sym);
        if (!q) throw new Error('no data');
        return { sym, ...q };
      })
    );

    results.forEach(r => {
      if (r.status === 'fulfilled') {
        liveSymbols.add(r.value.sym);
        setQuote(r.value.sym, r.value.price, r.value.open);
      }
    });
    notify();

    if (i + API_BATCH_SIZE < symbols.length) {
      await new Promise(r => setTimeout(r, API_BATCH_GAP_MS));
    }
  }
}

// ---------- Stooq (free, no key needed, via CORS proxy) ----------

// Map our symbols to stooq tickers. Stooq covers most major markets.
function toStooqSymbol(symbol: string): string {
  if (!symbol.includes('.')) return `${symbol.toLowerCase()}.us`;
  const dot = symbol.lastIndexOf('.');
  const base = symbol.slice(0, dot).toLowerCase();
  const suffix = symbol.slice(dot + 1);
  const map: Record<string, string> = {
    L: 'uk', T: 'jp', TO: 'ca', AX: 'au', DE: 'de', PA: 'fr', AS: 'nl', SW: 'ch',
  };
  const mapped = map[suffix];
  return mapped ? `${base}.${mapped}` : '';
}

const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

async function fetchStooqQuotes(): Promise<number> {
  const pairs = STOCK_SYMBOLS_LIST
    .map(s => ({ ours: s.symbol, stooq: toStooqSymbol(s.symbol) }))
    .filter(p => p.stooq);
  const stooqToOurs = new Map(pairs.map(p => [p.stooq.toLowerCase(), p.ours]));

  const url = `https://stooq.com/q/l/?s=${pairs.map(p => p.stooq).join(',')}&f=sd2t2ohlcv&h&e=csv`;

  let text: string | null = null;
  for (const wrap of CORS_PROXIES) {
    try {
      const res = await fetch(wrap(url));
      if (res.ok) {
        text = await res.text();
        break;
      }
    } catch {
      // try next proxy
    }
  }
  if (!text) return 0;

  let count = 0;
  const lines = text.trim().split('\n');
  for (const line of lines) {
    const cols = line.split(',');
    if (cols.length < 7) continue;
    const stooqSym = cols[0]?.trim().toLowerCase();
    if (!stooqSym || stooqSym === 'symbol') continue; // skip header

    const ours = stooqToOurs.get(stooqSym);
    const close = parseFloat(cols[6]);
    const open = parseFloat(cols[3]);
    if (ours && !isNaN(close)) {
      liveSymbols.add(ours);
      setQuote(ours, close, isNaN(open) ? close : open);
      count++;
    }
  }
  return count;
}

// ---------- Lifecycle ----------

async function init() {
  if (initialized) return;
  initialized = true;

  // Synchronous seed — the UI has data on the very first render
  seed();
  notify();

  const finnhubSymbols = STOCK_SYMBOLS_LIST
    .map(s => s.symbol)
    .filter(isFinnhubSymbol);

  // 1) Finnhub if the user configured a key (US symbols)
  if (FINNHUB_API_KEY) {
    const probe = await fetchFinnhubQuote(finnhubSymbols[0]);
    if (probe !== null) {
      mode = 'live';
      activeSource = 'finnhub';
      refreshFinnhubQuotes(finnhubSymbols).then(() => {
        apiTimer = setInterval(
          () => refreshFinnhubQuotes(finnhubSymbols),
          FINNHUB_REFRESH_MS
        );
      });
    }
  }

  // 2) Stooq via CORS proxy — no key needed, covers international too
  if (mode !== 'live') {
    const found = await fetchStooqQuotes();
    if (found > 0) {
      mode = 'live';
      activeSource = 'stooq';
      apiTimer = setInterval(fetchStooqQuotes, STOOQ_REFRESH_MS);
    } else {
      mode = 'simulated';
    }
  }

  // Local tick keeps symbols without real data moving
  tickTimer = setInterval(tickSimulated, TICK_MS);
  notify();
}

export function subscribeMarket(listener: Listener): () => void {
  listeners.add(listener);
  init();
  const snapshot = STOCK_SYMBOLS_LIST
    .map(s => quotes.get(s.symbol))
    .filter((q): q is StockData => !!q);
  if (snapshot.length) listener(snapshot);
  return () => listeners.delete(listener);
}

export function getMarketMode(): MarketMode {
  return mode;
}

export function isSymbolLive(symbol: string): boolean {
  return liveSymbols.has(symbol);
}

export function getQuote(symbol: string): StockData | undefined {
  return quotes.get(symbol);
}

export function getPriceHistory(symbol: string): number[] {
  return priceHistory.get(symbol) ?? [];
}

export async function refreshMarketNow(): Promise<void> {
  if (activeSource === 'finnhub') {
    const finnhubSymbols = STOCK_SYMBOLS_LIST
      .map(s => s.symbol)
      .filter(isFinnhubSymbol);
    await refreshFinnhubQuotes(finnhubSymbols);
  } else if (activeSource === 'stooq') {
    await fetchStooqQuotes();
  } else {
    tickSimulated();
  }
}
