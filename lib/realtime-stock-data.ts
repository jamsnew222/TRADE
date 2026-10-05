import { StockData, Currency, Exchange, ExchangeRate } from '@/types';

// Finnhub API - Free tier available
// Get your API key at https://finnhub.io/
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || 'demo';

// Popular stocks across different exchanges
const STOCK_SYMBOLS = [
  // US Stocks (NYSE/NASDAQ)
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'JNJ', name: 'Johnson & Johnson', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },

  // UK Stocks (LSE)
  { symbol: 'HSBA.L', name: 'HSBC Holdings', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'BP.L', name: 'BP plc', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'GSK.L', name: 'GSK plc', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },

  // Japanese Stocks (TSE)
  { symbol: '7203.T', name: 'Toyota Motor Corp', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },
  { symbol: '6758.T', name: 'Sony Group Corp', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },

  // Canadian Stocks (TSX)
  { symbol: 'RY.TO', name: 'Royal Bank of Canada', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },
  { symbol: 'SHOP.TO', name: 'Shopify Inc.', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },

  // Australian Stocks (ASX)
  { symbol: 'CBA.AX', name: 'Commonwealth Bank', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },
  { symbol: 'BHP.AX', name: 'BHP Group', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },

  // European Stocks (various exchanges)
  { symbol: 'ASML.AS', name: 'ASML Holding', exchange: 'Euronext' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'SAP.DE', name: 'SAP SE', exchange: 'XETRA' as Exchange, currency: 'EUR' as Currency },
];

// Currency symbols for display
const CURRENCY_SYMBOLS: Record<Currency, string> = {
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
let exchangeRates: Record<string, number> = {};
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
      return null;
    }

    const data = await response.json();

    if (data.error) {
      console.error(`API error for ${symbol}:`, data.error);
      return null;
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
    return null;
  }
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
    exchangeRates[cacheKey] = rate;
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
  // This would be populated with fetched data
  // For now, return the symbol definitions
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
  return Array.from(exchanges);
}

/**
 * Get all available currencies
 */
export function getAvailableCurrencies(): Currency[] {
  const currencies = new Set(STOCK_SYMBOLS.map(s => s.currency));
  return Array.from(currencies);
}
