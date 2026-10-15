import { describe, it, expect } from 'vitest';
import { applyBuy, applySell, valuePositions, positionsPL, Position } from '@/lib/portfolio';
import { StockData } from '@/types';

const makeStock = (symbol: string, price: number): StockData => ({
  symbol,
  name: symbol,
  price,
  change: 0,
  changePercent: 0,
  currency: 'USD',
  exchange: 'NASDAQ',
});

const pos = (symbol: string, shares: number, averageCost: number): Position => ({
  symbol, shares, averageCost, currency: 'USD',
});

describe('applyBuy', () => {
  it('creates a new position when none exists', () => {
    const result = applyBuy([], 'AAPL', 10, 150, 'USD');
    expect(result).toEqual([{ symbol: 'AAPL', shares: 10, averageCost: 150, currency: 'USD' }]);
  });

  it('merges into an existing position with weighted average cost', () => {
    const positions = [pos('AAPL', 10, 100)];
    const result = applyBuy(positions, 'AAPL', 10, 200, 'USD');
    expect(result[0].shares).toBe(20);
    expect(result[0].averageCost).toBe(150);
  });

  it('does not mutate the original array', () => {
    const positions = [pos('AAPL', 10, 100)];
    applyBuy(positions, 'AAPL', 5, 200, 'USD');
    expect(positions[0].shares).toBe(10);
  });

  it('leaves other positions untouched', () => {
    const positions = [pos('AAPL', 10, 100), pos('MSFT', 5, 300)];
    const result = applyBuy(positions, 'AAPL', 10, 200, 'USD');
    expect(result.find(p => p.symbol === 'MSFT')).toEqual(pos('MSFT', 5, 300));
  });
});

describe('applySell', () => {
  it('reduces shares on partial sell', () => {
    const result = applySell([pos('AAPL', 10, 100)], 'AAPL', 4);
    expect(result).toEqual([pos('AAPL', 6, 100)]);
  });

  it('removes the position when fully sold', () => {
    expect(applySell([pos('AAPL', 10, 100)], 'AAPL', 10)).toEqual([]);
  });

  it('returns null when selling more shares than held', () => {
    expect(applySell([pos('AAPL', 5, 100)], 'AAPL', 6)).toBeNull();
  });

  it('returns null when the position does not exist', () => {
    expect(applySell([pos('AAPL', 5, 100)], 'MSFT', 1)).toBeNull();
  });
});

describe('valuePositions / positionsPL', () => {
  it('computes total market value in base currency', async () => {
    const positions = [pos('AAPL', 10, 100), pos('MSFT', 5, 300)];
    const stocks = [makeStock('AAPL', 200), makeStock('MSFT', 400)];
    expect(await valuePositions(positions, stocks, 'USD')).toBe(4000);
  });

  it('computes unrealized profit/loss', async () => {
    const positions = [pos('AAPL', 10, 100)];
    const stocks = [makeStock('AAPL', 150)];
    expect(await positionsPL(positions, stocks, 'USD')).toBe(500);
  });

  it('computes negative P/L for losing positions', async () => {
    const positions = [pos('AAPL', 10, 200)];
    const stocks = [makeStock('AAPL', 150)];
    expect(await positionsPL(positions, stocks, 'USD')).toBe(-500);
  });

  it('skips positions with no matching stock quote', async () => {
    const positions = [pos('GONE', 10, 100), pos('AAPL', 5, 100)];
    const stocks = [makeStock('AAPL', 100)];
    expect(await valuePositions(positions, stocks, 'USD')).toBe(500);
  });
});
