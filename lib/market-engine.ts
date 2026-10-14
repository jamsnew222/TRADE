import { StockData, Currency, Exchange } from '@/types';
import { STOCK_SYMBOLS_LIST, getBasePrice } from './stock-universe';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '';

export type MarketMode = 'live' | 'simulated' | 'loading';
type Listener = (stocks: StockData[]) => void;

// Finnhub free tier only supports US symbols (no exchange suffix)
const isApiSymbol = (symbol: string) => !symbol.includes('.');

const quotes = new Map<string, StockData>();
const liveSymbols = new Set<string>();
const listeners = new Set<Listener>();

let mode: MarketMode = 'loading';
let initialized = false;
let tickTimer: ReturnType<typeof setInterval> | null = null;
let apiTimer: ReturnType<typeof setInterval> | null = null;

const TICK_MS = 1500;
const API_REFRESH_MS = 60_000; // stay under Finnhub's 60 calls/min free limit
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
}

function seed() {
  STOCK_SYMBOLS_LIST.forEach(info => {
    const base = getBasePrice(info);
    // Small deterministic-ish spread so prices aren't identical on load
    const price = base * (1 + (Math.random() - 0.5) * 0.004);
    setQuote(info.symbol, price, base);
  });
}

function tickSimulated() {
  let changed = false;
  quotes.forEach((q, symbol) => {
    if (liveSymbols.has(symbol)) return; // real symbols only move on API data
    const volatility = 0.0012;
    const drift = 0.00002;
    const shock = (Math.random() - 0.5) * 2;
    const next = Math.max(0.01, q.price * (1 + drift + volatility * shock));
    setQuote(symbol, next);
    changed = true;
  });
  if (changed) notify();
}

interface RealQuote {
  price: number;
  open: number;
}

async function fetchRealQuote(symbol: string): Promise<RealQuote | null> {
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

async function refreshApiQuotes(symbols: string[]) {
  for (let i = 0; i < symbols.length; i += API_BATCH_SIZE) {
    const batch = symbols.slice(i, i + API_BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(async sym => {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${FINNHUB_API_KEY}`
        );
        if (!res.ok) throw new Error('bad response');
        const data = await res.json();
        if (data.error || !data.c) throw new Error('no data');
        return { sym, price: data.c as number, open: data.o as number };
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

async function init() {
  if (initialized) return;
  initialized = true;

  // Synchronous seed — the UI has data on the very first render
  seed();
  notify();

  const apiSymbols = STOCK_SYMBOLS_LIST
    .map(s => s.symbol)
    .filter(isApiSymbol);

  if (FINNHUB_API_KEY) {
    // Probe one symbol; if the key works, pull real quotes for all API symbols
    const probe = await fetchRealQuote(apiSymbols[0]);
    if (probe !== null) {
      mode = 'live';
      // refreshApiQuotes already batched/rate-limited
      refreshApiQuotes(apiSymbols).then(() => {
        apiTimer = setInterval(
          () => refreshApiQuotes(apiSymbols),
          API_REFRESH_MS
        );
      });
    } else {
      mode = 'simulated';
    }
  } else {
    mode = 'simulated';
  }

  // Local tick keeps simulated symbols moving; live symbols hold real prices
  tickTimer = setInterval(tickSimulated, TICK_MS);
  notify();
}

export function subscribeMarket(listener: Listener): () => void {
  listeners.add(listener);
  init();
  // Send current snapshot immediately
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

export async function refreshMarketNow(): Promise<void> {
  if (mode !== 'live') {
    tickSimulated();
    return;
  }
  const apiSymbols = STOCK_SYMBOLS_LIST
    .map(s => s.symbol)
    .filter(isApiSymbol);
  await refreshApiQuotes(apiSymbols);
}
