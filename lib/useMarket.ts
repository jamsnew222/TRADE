'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { StockData, Exchange, Currency } from '@/types';
import { subscribeMarket, getMarketMode, MarketMode } from './market-engine';

/**
 * Shared market subscription for the simulator and paper-trading screens.
 * Subscribes to the engine once, tracks per-tick price flashes, keeps the
 * selected stock synced to the latest quote, and derives the filtered list
 * so changing filters never reloads data.
 */
export function useMarket() {
  const [allStocks, setAllStocks] = useState<StockData[]>([]);
  const [marketMode, setMarketMode] = useState<MarketMode>('loading');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [priceChanges, setPriceChanges] = useState<Record<string, 'up' | 'down' | null>>({});
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [selectedExchange, setSelectedExchange] = useState<Exchange>('All');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('All');
  const prevPricesRef = useRef<Record<string, number>>({});
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeMarket((snapshot) => {
      const prev = prevPricesRef.current;
      const changes: Record<string, 'up' | 'down'> = {};
      snapshot.forEach(s => {
        const old = prev[s.symbol];
        if (old !== undefined && s.price !== old) {
          changes[s.symbol] = s.price > old ? 'up' : 'down';
        }
        prev[s.symbol] = s.price;
      });

      if (Object.keys(changes).length > 0) {
        setPriceChanges(changes);
        if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
        flashTimerRef.current = setTimeout(() => setPriceChanges({}), 1200);
      }

      setAllStocks(snapshot);
      setMarketMode(getMarketMode());
      setLastUpdated(new Date());

      // Keep the selected stock in sync with the latest prices
      setSelectedStock(prev => {
        if (!prev) return snapshot[0] ?? null;
        return snapshot.find(s => s.symbol === prev.symbol) ?? prev;
      });
    });

    return () => {
      unsubscribe();
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  const stocks = useMemo(
    () => allStocks.filter(stock =>
      (selectedExchange === 'All' || stock.exchange === selectedExchange) &&
      (selectedCurrency === 'All' || stock.currency === selectedCurrency)
    ),
    [allStocks, selectedExchange, selectedCurrency]
  );

  return {
    allStocks,
    stocks,
    marketMode,
    lastUpdated,
    priceChanges,
    selectedStock,
    setSelectedStock,
    selectedExchange,
    setSelectedExchange,
    selectedCurrency,
    setSelectedCurrency,
    isLoading: marketMode === 'loading' && allStocks.length === 0,
  };
}
