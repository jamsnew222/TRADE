import { Currency, Exchange } from '@/types';
import { STOCK_SYMBOLS_LIST } from './stock-universe';

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
 * Get exchange rate between two currencies
 * Uses a free exchange rate API
 */
async function getExchangeRate(from: Currency, to: Currency): Promise<number> {
  if (from === to) return 1;

  const cacheKey = `${from}-${to}`;
  const now = Date.now();

  if (exchangeRates[cacheKey] && (now - ratesLastUpdated) < RATES_CACHE_DURATION) {
    return exchangeRates[cacheKey];
  }

  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );

    if (!response.ok) {
      console.error('Failed to fetch exchange rates');
      return 1;
    }

    const data = await response.json();
    const rate = data.rates[to] || 1;

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
 * Get all exchanges present in the stock universe
 */
export function getAvailableExchanges(): Exchange[] {
  const exchanges = new Set(STOCK_SYMBOLS_LIST.map(s => s.exchange));
  return ['All' as Exchange, ...Array.from(exchanges)];
}

/**
 * Get all currencies present in the stock universe
 */
export function getAvailableCurrencies(): Currency[] {
  const currencies = new Set(STOCK_SYMBOLS_LIST.map(s => s.currency));
  return ['All' as Currency, ...Array.from(currencies)];
}
