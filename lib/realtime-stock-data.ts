import { StockData, Currency, Exchange } from '@/types';

// Finnhub API - Free tier available
// Get your API key at https://finnhub.io/
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || 'demo';

// Popular stocks across different exchanges
const STOCK_SYMBOLS = [
  // US Stocks (NYSE/NASDAQ) - Tech Giants
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'NFLX', name: 'Netflix Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Financials
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'BAC', name: 'Bank of America Corp', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'WFC', name: 'Wells Fargo & Co', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'C', name: 'Citigroup Inc', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'GS', name: 'Goldman Sachs Group', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Consumer & Retail
  { symbol: 'WMT', name: 'Walmart Inc.', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'PG', name: 'Procter & Gamble', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'KO', name: 'Coca-Cola Co', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'MCD', name: 'McDonald\'s Corp', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'NKE', name: 'Nike Inc', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'SBUX', name: 'Starbucks Corp', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'HD', name: 'Home Depot Inc', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'COST', name: 'Costco Wholesale', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Healthcare
  { symbol: 'JNJ', name: 'Johnson & Johnson', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'PFE', name: 'Pfizer Inc', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'UNH', name: 'UnitedHealth Group', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'ABT', name: 'Abbott Laboratories', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Energy
  { symbol: 'XOM', name: 'Exxon Mobil Corp', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'CVX', name: 'Chevron Corp', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'COP', name: 'ConocoPhillips', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Industrial
  { symbol: 'CAT', name: 'Caterpillar Inc', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'BA', name: 'Boeing Co', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'GE', name: 'General Electric Co', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Payment & Fintech
  { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'MA', name: 'Mastercard Inc', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'PYPL', name: 'PayPal Holdings', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'SQ', name: 'Block Inc', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Software & Cloud
  { symbol: 'CSCO', name: 'Cisco Systems', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'ORCL', name: 'Oracle Corporation', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'ADBE', name: 'Adobe Inc.', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'CRM', name: 'Salesforce Inc.', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'IBM', name: 'IBM Corp', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'ACN', name: 'Accenture PLC', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Entertainment & Media
  { symbol: 'DIS', name: 'Walt Disney Co', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'CMCSA', name: 'Comcast Corp', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'T', name: 'AT&T Inc', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Communication
  { symbol: 'VZ', name: 'Verizon Communications', exchange: 'NYSE' as Exchange, currency: 'USD' as Currency },
  { symbol: 'TMUS', name: 'T-Mobile US', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },

  // US Stocks - Semiconductor
  { symbol: 'QCOM', name: 'Qualcomm Inc', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'TXN', name: 'Texas Instruments', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },
  { symbol: 'MU', name: 'Micron Technology', exchange: 'NASDAQ' as Exchange, currency: 'USD' as Currency },

  // UK Stocks (LSE)
  { symbol: 'HSBA.L', name: 'HSBC Holdings', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'BP.L', name: 'BP plc', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'GSK.L', name: 'GSK plc', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'BARC.L', name: 'Barclays PLC', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'ULVR.L', name: 'Unilever PLC', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'DGE.L', name: 'Diageo PLC', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'RIO.L', name: 'Rio Tinto plc', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },
  { symbol: 'PRU.L', name: 'Prudential plc', exchange: 'LSE' as Exchange, currency: 'GBP' as Currency },

  // Japanese Stocks (TSE)
  { symbol: '7203.T', name: 'Toyota Motor Corp', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },
  { symbol: '6758.T', name: 'Sony Group Corp', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },
  { symbol: '7201.T', name: 'Nissan Motor Co', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },
  { symbol: '8306.T', name: 'Mitsubishi UFJ Financial', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },
  { symbol: '4755.T', name: 'SoftBank Group Corp', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },
  { symbol: '6702.T', name: 'Canon Inc', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },
  { symbol: '8035.T', name: 'Tokyo Electron', exchange: 'TSE' as Exchange, currency: 'JPY' as Currency },

  // Canadian Stocks (TSX)
  { symbol: 'RY.TO', name: 'Royal Bank of Canada', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },
  { symbol: 'SHOP.TO', name: 'Shopify Inc.', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },
  { symbol: 'TD.TO', name: 'Toronto-Dominion Bank', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },
  { symbol: 'BMO.TO', name: 'Bank of Montreal', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },
  { symbol: 'CNQ.TO', name: 'Canadian Natural Resources', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },
  { symbol: 'BNS.TO', name: 'Bank of Nova Scotia', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },
  { symbol: 'ENB.TO', name: 'Enbridge Inc', exchange: 'TSX' as Exchange, currency: 'CAD' as Currency },

  // Australian Stocks (ASX)
  { symbol: 'CBA.AX', name: 'Commonwealth Bank', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },
  { symbol: 'BHP.AX', name: 'BHP Group', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },
  { symbol: 'CSL.AX', name: 'CSL Ltd', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },
  { symbol: 'WBC.AX', name: 'Westpac Banking', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },
  { symbol: 'NAB.AX', name: 'National Australia Bank', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },
  { symbol: 'ANZ.AX', name: 'Australia & NZ Banking', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },
  { symbol: 'RIO.AX', name: 'Rio Tinto Ltd', exchange: 'ASX' as Exchange, currency: 'AUD' as Currency },

  // European Stocks (various exchanges)
  { symbol: 'ASML.AS', name: 'ASML Holding', exchange: 'Euronext' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'SAP.DE', name: 'SAP SE', exchange: 'XETRA' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'SIE.DE', name: 'Siemens AG', exchange: 'XETRA' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'BAYN.DE', name: 'Bayer AG', exchange: 'XETRA' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'VOW.DE', name: 'Volkswagen AG', exchange: 'XETRA' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'MC.PA', name: 'LVMH Moët Hennessy', exchange: 'Euronext' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'OR.PA', name: 'L\'Oréal SA', exchange: 'Euronext' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'SAN.PA', name: 'Sanofi SA', exchange: 'Euronext' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'AIR.PA', name: 'Airbus SE', exchange: 'Euronext' as Exchange, currency: 'EUR' as Currency },
  { symbol: 'BNP.PA', name: 'BNP Paribas SA', exchange: 'Euronext' as Exchange, currency: 'EUR' as Currency },

  // Swiss Stocks (SIX)
  { symbol: 'NESN.SW', name: 'Nestlé SA', exchange: 'SIX' as Exchange, currency: 'CHF' as Currency },
  { symbol: 'ROG.SW', name: 'Roche Holding AG', exchange: 'SIX' as Exchange, currency: 'CHF' as Currency },
  { symbol: 'UBSG.SW', name: 'UBS Group AG', exchange: 'SIX' as Exchange, currency: 'CHF' as Currency },
  { symbol: 'NOVN.SW', name: 'Novartis AG', exchange: 'SIX' as Exchange, currency: 'CHF' as Currency },
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
