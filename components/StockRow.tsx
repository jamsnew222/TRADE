'use client';

import { StockData } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Sparkline from './Sparkline';
import { formatPrice } from '@/lib/realtime-stock-data';
import { getPriceHistory, isMarketOpen, isSymbolLive, MarketMode } from '@/lib/market-engine';

interface StockRowProps {
  stock: StockData;
  selected: boolean;
  darkMode: boolean;
  marketMode: MarketMode;
  priceChange: 'up' | 'down' | null;
  onClick: () => void;
  /** Optional row-level actions (e.g. BUY/SELL quick buttons) rendered under the row */
  children?: React.ReactNode;
}

export default function StockRow({ stock, selected, darkMode, marketMode, priceChange, onClick, children }: StockRowProps) {
  return (
    <div
      onClick={onClick}
      className={`w-full p-3 rounded-lg border-2 text-left transition-all cursor-pointer ${
        selected
          ? 'border-green-500 bg-green-50'
          : darkMode
            ? 'border-gray-700 bg-gray-700 hover:bg-gray-600'
            : 'border-gray-200 bg-white hover:bg-gray-50'
      } ${priceChange === 'up' ? 'border-green-300' : ''} ${priceChange === 'down' ? 'border-red-300' : ''}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {stock.symbol}
            <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {stock.exchange}
            </span>
            <span className={`ml-1 text-[10px] font-semibold px-1 py-0.5 rounded ${
              isMarketOpen(stock.exchange)
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {isMarketOpen(stock.exchange) ? 'OPEN' : 'CLOSED'}
            </span>
            {marketMode === 'live' && !isSymbolLive(stock.symbol) && (
              <span className="ml-1 text-[10px] font-semibold px-1 py-0.5 rounded bg-amber-100 text-amber-700" title="Simulated price — no real feed for this symbol">
                SIM
              </span>
            )}
            {priceChange === 'up' && <span className="ml-2 text-green-500">↑</span>}
            {priceChange === 'down' && <span className="ml-2 text-red-500">↓</span>}
          </p>
          <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stock.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Sparkline data={getPriceHistory(stock.symbol)} positive={stock.change >= 0} />
          <div className="text-right">
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatPrice(stock.price, stock.currency)}
            </p>
            <div className={`flex items-center justify-end gap-1 text-sm ${
              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
