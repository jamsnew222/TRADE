import { Currency, Exchange } from '@/types';

export interface StockInfo {
  symbol: string;
  name: string;
  exchange: Exchange;
  currency: Currency;
}

export const STOCK_SYMBOLS_LIST: StockInfo[] = [
  // US Stocks (NYSE/NASDAQ) - Tech Giants
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'NFLX', name: 'Netflix Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ', currency: 'USD' },

  // US Stocks - Financials
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'BAC', name: 'Bank of America Corp', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'WFC', name: 'Wells Fargo & Co', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'C', name: 'Citigroup Inc', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'GS', name: 'Goldman Sachs Group', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Consumer & Retail
  { symbol: 'WMT', name: 'Walmart Inc.', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'PG', name: 'Procter & Gamble', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'KO', name: 'Coca-Cola Co', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'MCD', name: 'McDonald\'s Corp', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'NKE', name: 'Nike Inc', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'SBUX', name: 'Starbucks Corp', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'HD', name: 'Home Depot Inc', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'COST', name: 'Costco Wholesale', exchange: 'NASDAQ', currency: 'USD' },

  // US Stocks - Healthcare
  { symbol: 'JNJ', name: 'Johnson & Johnson', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'PFE', name: 'Pfizer Inc', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'UNH', name: 'UnitedHealth Group', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'ABT', name: 'Abbott Laboratories', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Energy
  { symbol: 'XOM', name: 'Exxon Mobil Corp', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'CVX', name: 'Chevron Corp', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'COP', name: 'ConocoPhillips', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Industrial
  { symbol: 'CAT', name: 'Caterpillar Inc', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'BA', name: 'Boeing Co', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'GE', name: 'General Electric Co', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Payment & Fintech
  { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'MA', name: 'Mastercard Inc', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'PYPL', name: 'PayPal Holdings', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'SQ', name: 'Block Inc', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Software & Cloud
  { symbol: 'CSCO', name: 'Cisco Systems', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'ORCL', name: 'Oracle Corporation', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'ADBE', name: 'Adobe Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'CRM', name: 'Salesforce Inc.', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'IBM', name: 'IBM Corp', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'ACN', name: 'Accenture PLC', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Entertainment & Media
  { symbol: 'DIS', name: 'Walt Disney Co', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'CMCSA', name: 'Comcast Corp', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'T', name: 'AT&T Inc', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Communication
  { symbol: 'VZ', name: 'Verizon Communications', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'TMUS', name: 'T-Mobile US', exchange: 'NASDAQ', currency: 'USD' },

  // US Stocks - Semiconductor
  { symbol: 'QCOM', name: 'Qualcomm Inc', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'TXN', name: 'Texas Instruments', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'MU', name: 'Micron Technology', exchange: 'NASDAQ', currency: 'USD' },

  // UK Stocks (LSE)
  { symbol: 'HSBA.L', name: 'HSBC Holdings', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'BP.L', name: 'BP plc', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'GSK.L', name: 'GSK plc', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'BARC.L', name: 'Barclays PLC', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'ULVR.L', name: 'Unilever PLC', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'DGE.L', name: 'Diageo PLC', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'RIO.L', name: 'Rio Tinto plc', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'PRU.L', name: 'Prudential plc', exchange: 'LSE', currency: 'GBP' },

  // Japanese Stocks (TSE)
  { symbol: '7203.T', name: 'Toyota Motor Corp', exchange: 'TSE', currency: 'JPY' },
  { symbol: '6758.T', name: 'Sony Group Corp', exchange: 'TSE', currency: 'JPY' },
  { symbol: '7201.T', name: 'Nissan Motor Co', exchange: 'TSE', currency: 'JPY' },
  { symbol: '8306.T', name: 'Mitsubishi UFJ Financial', exchange: 'TSE', currency: 'JPY' },
  { symbol: '4755.T', name: 'SoftBank Group Corp', exchange: 'TSE', currency: 'JPY' },
  { symbol: '6702.T', name: 'Canon Inc', exchange: 'TSE', currency: 'JPY' },
  { symbol: '8035.T', name: 'Tokyo Electron', exchange: 'TSE', currency: 'JPY' },

  // Canadian Stocks (TSX)
  { symbol: 'RY.TO', name: 'Royal Bank of Canada', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'SHOP.TO', name: 'Shopify Inc.', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'TD.TO', name: 'Toronto-Dominion Bank', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'BMO.TO', name: 'Bank of Montreal', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'CNQ.TO', name: 'Canadian Natural Resources', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'BNS.TO', name: 'Bank of Nova Scotia', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'ENB.TO', name: 'Enbridge Inc', exchange: 'TSX', currency: 'CAD' },

  // Australian Stocks (ASX)
  { symbol: 'CBA.AX', name: 'Commonwealth Bank', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'BHP.AX', name: 'BHP Group', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'CSL.AX', name: 'CSL Ltd', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'WBC.AX', name: 'Westpac Banking', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'NAB.AX', name: 'National Australia Bank', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'ANZ.AX', name: 'Australia & NZ Banking', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'RIO.AX', name: 'Rio Tinto Ltd', exchange: 'ASX', currency: 'AUD' },

  // European Stocks (various exchanges)
  { symbol: 'ASML.AS', name: 'ASML Holding', exchange: 'Euronext', currency: 'EUR' },
  { symbol: 'SAP.DE', name: 'SAP SE', exchange: 'XETRA', currency: 'EUR' },
  { symbol: 'SIE.DE', name: 'Siemens AG', exchange: 'XETRA', currency: 'EUR' },
  { symbol: 'BAYN.DE', name: 'Bayer AG', exchange: 'XETRA', currency: 'EUR' },
  { symbol: 'VOW.DE', name: 'Volkswagen AG', exchange: 'XETRA', currency: 'EUR' },
  { symbol: 'MC.PA', name: 'LVMH Moët Hennessy', exchange: 'Euronext', currency: 'EUR' },
  { symbol: 'OR.PA', name: 'L\'Oréal SA', exchange: 'Euronext', currency: 'EUR' },
  { symbol: 'SAN.PA', name: 'Sanofi SA', exchange: 'Euronext', currency: 'EUR' },
  { symbol: 'AIR.PA', name: 'Airbus SE', exchange: 'Euronext', currency: 'EUR' },
  { symbol: 'BNP.PA', name: 'BNP Paribas SA', exchange: 'Euronext', currency: 'EUR' },

  // Swiss Stocks (SIX)
  { symbol: 'NESN.SW', name: 'Nestlé SA', exchange: 'SIX', currency: 'CHF' },
  { symbol: 'ROG.SW', name: 'Roche Holding AG', exchange: 'SIX', currency: 'CHF' },
  { symbol: 'UBSG.SW', name: 'UBS Group AG', exchange: 'SIX', currency: 'CHF' },
  { symbol: 'NOVN.SW', name: 'Novartis AG', exchange: 'SIX', currency: 'CHF' },
];

const BASE_PRICES: Record<string, number> = {
  AAPL: 175, GOOGL: 140, MSFT: 380, AMZN: 180, TSLA: 240, META: 500,
  NVDA: 880, NFLX: 480, AMD: 150, INTC: 45,
  JPM: 195, BAC: 38, WFC: 55, C: 58, GS: 380,
  WMT: 165, PG: 160, KO: 60, MCD: 280, NKE: 105, SBUX: 95, HD: 380, COST: 750,
  JNJ: 160, PFE: 28, UNH: 520, ABT: 110,
  XOM: 105, CVX: 155, COP: 120,
  CAT: 320, BA: 200, GE: 150,
  V: 280, MA: 450, PYPL: 65, SQ: 85,
  CSCO: 52, ORCL: 125, ADBE: 580, CRM: 280, IBM: 185, ACN: 320,
  DIS: 110, CMCSA: 42, T: 18,
  VZ: 40, TMUS: 155,
  QCOM: 165, TXN: 175, MU: 95,
  'HSBA.L': 6, 'BP.L': 5, 'GSK.L': 15, 'BARC.L': 2, 'ULVR.L': 45,
  'DGE.L': 35, 'RIO.L': 60, 'PRU.L': 10,
  '7203.T': 2500, '6758.T': 8000, '7201.T': 600, '8306.T': 1500,
  '4755.T': 6500, '6702.T': 2200, '8035.T': 15000,
  'RY.TO': 95, 'SHOP.TO': 70, 'TD.TO': 78, 'BMO.TO': 110,
  'CNQ.TO': 85, 'BNS.TO': 75, 'ENB.TO': 50,
  'CBA.AX': 105, 'BHP.AX': 45, 'CSL.AX': 280, 'WBC.AX': 30,
  'NAB.AX': 32, 'ANZ.AX': 28, 'RIO.AX': 120,
  'ASML.AS': 700, 'SAP.DE': 160, 'SIE.DE': 180, 'BAYN.DE': 30,
  'VOW.DE': 140, 'MC.PA': 750, 'OR.PA': 380, 'SAN.PA': 95,
  'AIR.PA': 30, 'BNP.PA': 65,
  'NESN.SW': 95, 'ROG.SW': 280, 'UBSG.SW': 25, 'NOVN.SW': 95,
};

const CURRENCY_ADJUST: Record<string, number> = {
  GBP: 0.78, EUR: 0.92, JPY: 150, CAD: 1.35, AUD: 1.55, CHF: 0.9,
};

export function getBasePrice(stock: { symbol: string; currency: string }): number {
  const base = BASE_PRICES[stock.symbol];
  if (base) {
    return base * (CURRENCY_ADJUST[stock.currency] ?? 1);
  }
  const defaults: Record<string, number> = {
    USD: 100, GBP: 78, EUR: 92, JPY: 15000, CAD: 135, AUD: 155, CHF: 90,
  };
  return defaults[stock.currency] || 100;
}
