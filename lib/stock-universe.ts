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
  { symbol: 'AVGO', name: 'Broadcom Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'PLTR', name: 'Palantir Technologies', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'ARM', name: 'Arm Holdings', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'SMCI', name: 'Super Micro Computer', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'DELL', name: 'Dell Technologies', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'CRWD', name: 'CrowdStrike Holdings', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'PANW', name: 'Palo Alto Networks', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'SNOW', name: 'Snowflake Inc.', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'NET', name: 'Cloudflare Inc.', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'DDOG', name: 'Datadog Inc.', exchange: 'NASDAQ', currency: 'USD' },

  // US Stocks - Fintech & Growth
  { symbol: 'SHOP', name: 'Shopify Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'UBER', name: 'Uber Technologies', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'ABNB', name: 'Airbnb Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'RBLX', name: 'Roblox Corporation', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'COIN', name: 'Coinbase Global', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'SOFI', name: 'SoFi Technologies', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'HOOD', name: 'Robinhood Markets', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'SPOT', name: 'Spotify Technology', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'ROKU', name: 'Roku Inc.', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'DASH', name: 'DoorDash Inc.', exchange: 'NASDAQ', currency: 'USD' },

  // US ETFs (index funds)
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', exchange: 'NASDAQ', currency: 'USD' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', exchange: 'NYSE', currency: 'USD' },

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
  { symbol: 'LLY', name: 'Eli Lilly and Company', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'MRK', name: 'Merck & Co.', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'ABBV', name: 'AbbVie Inc.', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Energy
  { symbol: 'XOM', name: 'Exxon Mobil Corp', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'CVX', name: 'Chevron Corp', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'COP', name: 'ConocoPhillips', exchange: 'NYSE', currency: 'USD' },

  // US Stocks - Industrial
  { symbol: 'CAT', name: 'Caterpillar Inc', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'BA', name: 'Boeing Co', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'GE', name: 'General Electric Co', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'RTX', name: 'RTX Corporation', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'LMT', name: 'Lockheed Martin', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'DE', name: 'Deere & Company', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'F', name: 'Ford Motor Company', exchange: 'NYSE', currency: 'USD' },
  { symbol: 'GM', name: 'General Motors', exchange: 'NYSE', currency: 'USD' },

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
  { symbol: 'SHEL.L', name: 'Shell plc', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'AZN.L', name: 'AstraZeneca plc', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'NG.L', name: 'National Grid plc', exchange: 'LSE', currency: 'GBP' },
  { symbol: 'LSEG.L', name: 'London Stock Exchange Group', exchange: 'LSE', currency: 'GBP' },

  // Japanese Stocks (TSE)
  { symbol: '7203.T', name: 'Toyota Motor Corp', exchange: 'TSE', currency: 'JPY' },
  { symbol: '6758.T', name: 'Sony Group Corp', exchange: 'TSE', currency: 'JPY' },
  { symbol: '7201.T', name: 'Nissan Motor Co', exchange: 'TSE', currency: 'JPY' },
  { symbol: '8306.T', name: 'Mitsubishi UFJ Financial', exchange: 'TSE', currency: 'JPY' },
  { symbol: '4755.T', name: 'SoftBank Group Corp', exchange: 'TSE', currency: 'JPY' },
  { symbol: '6702.T', name: 'Canon Inc', exchange: 'TSE', currency: 'JPY' },
  { symbol: '8035.T', name: 'Tokyo Electron', exchange: 'TSE', currency: 'JPY' },
  { symbol: '6501.T', name: 'Hitachi Ltd', exchange: 'TSE', currency: 'JPY' },
  { symbol: '9983.T', name: 'Fast Retailing (Uniqlo)', exchange: 'TSE', currency: 'JPY' },
  { symbol: '6861.T', name: 'Keyence Corp', exchange: 'TSE', currency: 'JPY' },

  // Canadian Stocks (TSX)
  { symbol: 'RY.TO', name: 'Royal Bank of Canada', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'SHOP.TO', name: 'Shopify Inc.', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'TD.TO', name: 'Toronto-Dominion Bank', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'BMO.TO', name: 'Bank of Montreal', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'CNQ.TO', name: 'Canadian Natural Resources', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'BNS.TO', name: 'Bank of Nova Scotia', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'ENB.TO', name: 'Enbridge Inc', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'BAM.TO', name: 'Brookfield Asset Management', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'BCE.TO', name: 'BCE Inc', exchange: 'TSX', currency: 'CAD' },
  { symbol: 'TRP.TO', name: 'TC Energy Corp', exchange: 'TSX', currency: 'CAD' },

  // Australian Stocks (ASX)
  { symbol: 'CBA.AX', name: 'Commonwealth Bank', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'BHP.AX', name: 'BHP Group', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'CSL.AX', name: 'CSL Ltd', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'WBC.AX', name: 'Westpac Banking', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'NAB.AX', name: 'National Australia Bank', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'ANZ.AX', name: 'Australia & NZ Banking', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'RIO.AX', name: 'Rio Tinto Ltd', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'FMG.AX', name: 'Fortescue Ltd', exchange: 'ASX', currency: 'AUD' },
  { symbol: 'WES.AX', name: 'Wesfarmers Ltd', exchange: 'ASX', currency: 'AUD' },

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
  { symbol: 'TTE.PA', name: 'TotalEnergies SE', exchange: 'Euronext', currency: 'EUR' },
  { symbol: 'ALV.DE', name: 'Allianz SE', exchange: 'XETRA', currency: 'EUR' },
  { symbol: 'DTE.DE', name: 'Deutsche Telekom AG', exchange: 'XETRA', currency: 'EUR' },
  { symbol: 'MBG.DE', name: 'Mercedes-Benz Group', exchange: 'XETRA', currency: 'EUR' },

  // Swiss Stocks (SIX)
  { symbol: 'NESN.SW', name: 'Nestlé SA', exchange: 'SIX', currency: 'CHF' },
  { symbol: 'ROG.SW', name: 'Roche Holding AG', exchange: 'SIX', currency: 'CHF' },
  { symbol: 'UBSG.SW', name: 'UBS Group AG', exchange: 'SIX', currency: 'CHF' },
  { symbol: 'NOVN.SW', name: 'Novartis AG', exchange: 'SIX', currency: 'CHF' },
  { symbol: 'ABBN.SW', name: 'ABB Ltd', exchange: 'SIX', currency: 'CHF' },
  { symbol: 'CFR.SW', name: 'Richemont SA', exchange: 'SIX', currency: 'CHF' },
];

// Base prices in USD-equivalent — getBasePrice multiplies by CURRENCY_ADJUST
// to produce the local-currency anchor used by the simulated feed.
const BASE_PRICES: Record<string, number> = {
  AAPL: 175, GOOGL: 140, MSFT: 380, AMZN: 180, TSLA: 240, META: 500,
  NVDA: 880, NFLX: 480, AMD: 150, INTC: 45,
  AVGO: 180, PLTR: 45, ARM: 140, SMCI: 45, DELL: 120, CRWD: 300,
  PANW: 180, SNOW: 130, NET: 90, DDOG: 120,
  SHOP: 105, UBER: 75, ABNB: 130, RBLX: 45, COIN: 220, SOFI: 15,
  HOOD: 35, SPOT: 350, ROKU: 60, DASH: 160,
  SPY: 580, QQQ: 500, VOO: 540,
  JPM: 195, BAC: 38, WFC: 55, C: 58, GS: 380,
  WMT: 165, PG: 160, KO: 60, MCD: 280, NKE: 105, SBUX: 95, HD: 380, COST: 750,
  JNJ: 160, PFE: 28, UNH: 520, ABT: 110, LLY: 780, MRK: 95, ABBV: 185, TMO: 540,
  XOM: 105, CVX: 155, COP: 120,
  CAT: 320, BA: 200, GE: 150, RTX: 130, LMT: 470, DE: 390, F: 11, GM: 48,
  V: 280, MA: 450, PYPL: 65, SQ: 85,
  CSCO: 52, ORCL: 125, ADBE: 580, CRM: 280, IBM: 185, ACN: 320,
  DIS: 110, CMCSA: 42, T: 18,
  VZ: 40, TMUS: 155,
  QCOM: 165, TXN: 175, MU: 95,
  'HSBA.L': 9, 'BP.L': 5.5, 'GSK.L': 19, 'BARC.L': 3.5, 'ULVR.L': 62,
  'DGE.L': 30, 'RIO.L': 62, 'PRU.L': 24, 'SHEL.L': 33, 'AZN.L': 150,
  'NG.L': 13, 'LSEG.L': 145,
  '7203.T': 17, '6758.T': 30, '7201.T': 5, '8306.T': 14,
  '4755.T': 90, '6702.T': 33, '8035.T': 230, '6501.T': 30,
  '9983.T': 330, '6861.T': 460,
  'RY.TO': 140, 'SHOP.TO': 105, 'TD.TO': 80, 'BMO.TO': 130,
  'CNQ.TO': 40, 'BNS.TO': 65, 'ENB.TO': 43, 'BAM.TO': 55, 'BCE.TO': 34,
  'TRP.TO': 48,
  'CBA.AX': 135, 'BHP.AX': 42, 'CSL.AX': 185, 'WBC.AX': 33,
  'NAB.AX': 38, 'ANZ.AX': 30, 'RIO.AX': 85, 'FMG.AX': 13, 'WES.AX': 50,
  'ASML.AS': 750, 'SAP.DE': 270, 'SIE.DE': 210, 'BAYN.DE': 27,
  'VOW.DE': 100, 'MC.PA': 650, 'OR.PA': 370, 'SAN.PA': 105,
  'AIR.PA': 160, 'BNP.PA': 80, 'TTE.PA': 60, 'ALV.DE': 350,
  'DTE.DE': 33, 'MBG.DE': 60,
  'NESN.SW': 85, 'ROG.SW': 250, 'UBSG.SW': 32, 'NOVN.SW': 115,
  'ABBN.SW': 55, 'CFR.SW': 150,
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
