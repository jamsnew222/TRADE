import { StockData } from '@/types';

// Educational stock data (static examples)
const educationalStocks: StockData[] = [
  {
    symbol: 'DEMO',
    name: 'Demo Corporation',
    price: 150.00,
    change: 2.50,
    changePercent: 1.69,
    currency: 'USD',
    exchange: 'NASDAQ'
  },
  {
    symbol: 'TECH',
    name: 'Tech Innovators Inc',
    price: 320.50,
    change: -5.20,
    changePercent: -1.60,
    currency: 'USD',
    exchange: 'NYSE'
  },
  {
    symbol: 'GROW',
    name: 'Growth Enterprises',
    price: 85.75,
    change: 3.25,
    changePercent: 3.94,
    currency: 'USD',
    exchange: 'NASDAQ'
  }
];

// In a real implementation, you would integrate with a stock API like:
// - Alpha Vantage (free tier available)
// - Yahoo Finance API
// - IEX Cloud
// - Polygon.io

export const getStockData = async (useRealData: boolean = false): Promise<StockData[]> => {
  if (useRealData) {
    try {
      // Example using a free API (you'd need to sign up for an API key)
      // const response = await fetch('https://api.example.com/stocks');
      // const data = await response.json();
      // return data;
      
      // For now, return educational data
      console.log('Real stock data integration would go here');
      return educationalStocks;
    } catch (error) {
      console.error('Error fetching real stock data:', error);
      return educationalStocks;
    }
  }
  
  return educationalStocks;
};

export const getStockBySymbol = (symbol: string): StockData | undefined => {
  return educationalStocks.find(stock => stock.symbol === symbol);
};

export const simulatePriceChange = (stock: StockData, volatility: number = 0.02): StockData => {
  const changePercent = (Math.random() - 0.5) * 2 * volatility * 100;
  const changeAmount = stock.price * (changePercent / 100);
  const newPrice = stock.price + changeAmount;

  return {
    ...stock,
    price: Math.max(0.01, newPrice), // Ensure price doesn't go negative
    change: changeAmount,
    changePercent: changePercent,
    currency: stock.currency,
    exchange: stock.exchange
  };
};