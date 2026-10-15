import { Currency, StockData } from '@/types';
import { convertCurrency } from './currency';

export interface Position {
  symbol: string;
  shares: number;
  /** Cost basis per share, in the portfolio's base currency */
  averageCost: number;
  /** The stock's quote currency */
  currency: Currency;
}

/**
 * Apply a buy: add a new position or merge into an existing one with a
 * weighted average cost basis.
 */
export function applyBuy(
  positions: Position[],
  symbol: string,
  shares: number,
  priceInBaseCurrency: number,
  currency: Currency
): Position[] {
  const existing = positions.find(p => p.symbol === symbol);
  if (existing) {
    return positions.map(p => {
      if (p.symbol !== symbol) return p;
      const totalShares = p.shares + shares;
      const averageCost = ((p.shares * p.averageCost) + (shares * priceInBaseCurrency)) / totalShares;
      return { ...p, shares: totalShares, averageCost };
    });
  }
  return [...positions, { symbol, shares, averageCost: priceInBaseCurrency, currency }];
}

/**
 * Apply a sell: reduce a position, dropping it at zero shares.
 * Returns null when the position doesn't exist or has insufficient shares.
 */
export function applySell(
  positions: Position[],
  symbol: string,
  shares: number
): Position[] | null {
  const position = positions.find(p => p.symbol === symbol);
  if (!position || position.shares < shares) return null;

  return positions
    .map(p => (p.symbol === symbol ? { ...p, shares: p.shares - shares } : p))
    .filter(p => p.shares > 0);
}

/**
 * Total market value of positions converted into the base currency.
 */
export async function valuePositions(
  positions: Position[],
  stocks: StockData[],
  baseCurrency: Currency
): Promise<number> {
  let total = 0;
  for (const position of positions) {
    const stock = stocks.find(s => s.symbol === position.symbol);
    if (!stock) continue;
    total += await convertCurrency(position.shares * stock.price, stock.currency, baseCurrency);
  }
  return total;
}

/**
 * Unrealized profit/loss of positions in base currency.
 */
export async function positionsPL(
  positions: Position[],
  stocks: StockData[],
  baseCurrency: Currency
): Promise<number> {
  let pl = 0;
  for (const position of positions) {
    const stock = stocks.find(s => s.symbol === position.symbol);
    if (!stock) continue;
    const currentValue = await convertCurrency(stock.price * position.shares, stock.currency, baseCurrency);
    pl += currentValue - position.averageCost * position.shares;
  }
  return pl;
}
