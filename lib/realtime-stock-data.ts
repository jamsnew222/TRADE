import { StockData, Currency, Exchange } from '@/types';
import { STOCK_SYMBOLS_LIST, getBasePrice } from './stock-universe';

// Finnhub API - Free tier available
// Get your API key at https://finnhub.io/
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || 'demo';

const STOCK_SYMBOLS = STOCK_SYMBOLS_LIST;

// Currency symbols for display
const CURRENCY_SYMBOLS: Record<Currency, string> = {
  All: '🌐',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'Fr',
  CNY: '¥',
  INR: '₹',
  BTC: '₿',
  ETH: 'Ξ'
};

// Exchange rate cache
const exchangeRates: Record<string, number> = {};
let ratesLastUpdated: number = 0;
const RATES_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch real-time stock quote from Finnhub API
 */
export async function fetchStockQuote(symbol: string): Promise<StockData | null> {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );

    if (!response.ok) {
      console.error(`Failed to fetch quote for ${symbol}:`, response.statusText);
      return generateFallbackData(symbol);
    }

    const data = await response.json();

    if (data.error) {
      console.error(`API error for ${symbol}:`, data.error);
      return generateFallbackData(symbol);
    }

    const stockInfo = STOCK_SYMBOLS.find(s => s.symbol === symbol);

    if (!stockInfo) {
      console.error(`Stock info not found for ${symbol}`);
      return null;
    }

    const currentPrice = data.c || 0;
    const change = data.d || 0;
    const changePercent = data.dp || 0;

    return {
      symbol: stockInfo.symbol,
      name: stockInfo.name,
      price: currentPrice,
      change: change,
      changePercent: changePercent,
      currency: stockInfo.currency,
      exchange: stockInfo.exchange,
      open: data.o,
      high: data.h,
      low: data.l,
      previousClose: data.pc,
      volume: data.t
    };
  } catch (error) {
    console.error(`Error fetching stock quote for ${symbol}:`, error);
    return generateFallbackData(symbol);
  }
}

// Store current prices for realistic movement simulation
const currentPrices: Record<string, number> = {};
const dailyHighs: Record<string, number> = {};
const dailyLows: Record<string, number> = {};

/**
 * Generate fallback stock data when API fails
 */
function generateFallbackData(symbol: string): StockData | null {
  const stockInfo = STOCK_SYMBOLS.find(s => s.symbol === symbol);
  if (!stockInfo) return null;

  // Get or initialize current price
  let currentPrice = currentPrices[symbol];
  if (!currentPrice) {
    currentPrice = getBasePrice(stockInfo);
    currentPrices[symbol] = currentPrice;
    dailyHighs[symbol] = currentPrice;
    dailyLows[symbol] = currentPrice;
  }

  // Simulate realistic price movement (geometric Brownian motion)
  const volatility = 0.001; // 0.1% per update (more realistic)
  const drift = 0.00005; // Slight upward drift
  const randomShock = (Math.random() - 0.5) * 2; // Random shock between -1 and 1
  const priceChange = currentPrice * (drift + volatility * randomShock);
  currentPrice = Math.max(0.01, currentPrice + priceChange);
  currentPrices[symbol] = currentPrice;

  // Update daily high/low
  if (currentPrice > dailyHighs[symbol]) {
    dailyHighs[symbol] = currentPrice;
  }
  if (currentPrice < dailyLows[symbol]) {
    dailyLows[symbol] = currentPrice;
  }

  // Calculate change from day open (simulated)
  const dayOpen = getBasePrice(stockInfo) * 0.995;
  const change = currentPrice - dayOpen;
  const changePercent = (change / dayOpen) * 100;

  return {
    symbol: stockInfo.symbol,
    name: stockInfo.name,
    price: currentPrice,
    change: change,
    changePercent: changePercent,
    currency: stockInfo.currency,
    exchange: stockInfo.exchange,
    open: dayOpen,
    high: dailyHighs[symbol],
    low: dailyLows[symbol],
    previousClose: dayOpen,
    volume: Math.floor(Math.random() * 5000000) + 500000
  };
}

/**
 * Fetch multiple stock quotes in parallel
 */
export async function fetchMultipleStockQuotes(symbols: string[]): Promise<StockData[]> {
  const quotes = await Promise.all(
    symbols.map(symbol => fetchStockQuote(symbol))
  );

  return quotes.filter((quote): quote is StockData => quote !== null);
}

/**
 * Fetch all available stock quotes
 */
export async function fetchAllStockQuotes(): Promise<StockData[]> {
  return fetchMultipleStockQuotes(STOCK_SYMBOLS.map(s => s.symbol));
}

/**
 * Get exchange rate between two currencies
 * Uses a free exchange rate API
 */
export async function getExchangeRate(from: Currency, to: Currency): Promise<number> {
  if (from === to) return 1;

  const cacheKey = `${from}-${to}`;
  const now = Date.now();

  // Check cache
  if (exchangeRates[cacheKey] && (now - ratesLastUpdated) < RATES_CACHE_DURATION) {
    return exchangeRates[cacheKey];
  }

  try {
    // Using a free exchange rate API
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );

    if (!response.ok) {
      console.error('Failed to fetch exchange rates');
      return 1; // Return 1 if API fails
    }

    const data = await response.json();
    const rate = data.rates[to] || 1;

    // Cache the rate
    Object.assign(exchangeRates, { [cacheKey]: rate });
    ratesLastUpdated = now;

    return rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return 1;
  }
}

/**
 * Convert amount from one currency to another
 */
export async function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
): Promise<number> {
  const rate = await getExchangeRate(from, to);
  return amount * rate;
}

/**
 * Get currency symbol for display
 */
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: Currency): string {
  const symbol = getCurrencySymbol(currency);

  if (currency === 'JPY' || currency === 'INR') {
    return `${symbol}${price.toFixed(0)}`;
  }

  return `${symbol}${price.toFixed(2)}`;
}

/**
 * Get stocks by exchange
 */
export function getStocksByExchange(exchange: Exchange): StockData[] {
  return STOCK_SYMBOLS
    .filter(s => s.exchange === exchange)
    .map(s => ({
      symbol: s.symbol,
      name: s.name,
      price: 0,
      change: 0,
      changePercent: 0,
      currency: s.currency,
      exchange: s.exchange
    }));
}

/**
 * Get stocks by currency
 */
export function getStocksByCurrency(currency: Currency): StockData[] {
  return STOCK_SYMBOLS
    .filter(s => s.currency === currency)
    .map(s => ({
      symbol: s.symbol,
      name: s.name,
      price: 0,
      change: 0,
      changePercent: 0,
      currency: s.currency,
      exchange: s.exchange
    }));
}

/**
 * Get all available exchanges
 */
export function getAvailableExchanges(): Exchange[] {
  const exchanges = new Set(STOCK_SYMBOLS.map(s => s.exchange));
  return ['All' as Exchange, ...Array.from(exchanges)];
}

/**
 * Get all available currencies
 */
export function getAvailableCurrencies(): Currency[] {
  const currencies = new Set(STOCK_SYMBOLS.map(s => s.currency));
  return ['All' as Currency, ...Array.from(currencies)];
}
