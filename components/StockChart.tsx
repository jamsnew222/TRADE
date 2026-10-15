'use client';

import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { CandlestickChart, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { subscribeMarket, subscribeSimulated, getQuote, getSimQuote, isSymbolLive } from '@/lib/market-engine';
import { formatPrice } from '@/lib/currency';
import { Currency } from '@/types';

interface StockChartProps {
  symbol: string;
  darkMode: boolean;
  /** Use the always-on practice stream instead of the live one */
  simulated?: boolean;
}

interface ChartData {
  time: string;
  price: number;
}

const MAX_LIVE_POINTS = 90;

function generateHistoricalData(basePrice: number, tf: '1D' | '1W' | '1M'): ChartData[] {
  const points = tf === '1D' ? 24 : tf === '1W' ? 7 : 30;
  const data: ChartData[] = [];
  let price = basePrice * 0.95;

  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * (basePrice * 0.02);
    price += change;

    const time = tf === '1D'
      ? `${i}:00`
      : tf === '1W'
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]
        : `Day ${i + 1}`;

    data.push({ time, price });
  }

  data[data.length - 1].price = basePrice;
  return data;
}

export default function StockChart({ symbol, darkMode, simulated = false }: StockChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [live, setLive] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M'>('1D');
  const tickCountRef = useRef(0);

  // Seed history once per symbol/timeframe, then append live ticks.
  // No refetching — data flows in from the shared market engine.
  useEffect(() => {
    tickCountRef.current = 0;
    const initial = simulated ? getSimQuote(symbol) : getQuote(symbol);
    const base = initial?.price ?? 100;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: seed chart history from the external market engine on symbol/timeframe change, then subscribe for ticks
    setChartData(generateHistoricalData(base, timeframe));
    setCurrency(initial?.currency ?? 'USD');

    const subscribe = simulated ? subscribeSimulated : subscribeMarket;
    const unsubscribe = subscribe(() => {
      const quote = simulated ? getSimQuote(symbol) : getQuote(symbol);
      if (!quote) return;

      setLive(simulated ? true : isSymbolLive(symbol));
      setCurrency(quote.currency);

      if (timeframe !== '1D') return; // only live-append to the intraday view

      tickCountRef.current += 1;
      setChartData(prev => {
        if (prev.length === 0) return prev;
        const label = `L${tickCountRef.current}`;
        const next = [...prev, { time: label, price: quote.price }];
        return next.length > MAX_LIVE_POINTS
          ? next.slice(next.length - MAX_LIVE_POINTS)
          : next;
      });
    });

    return unsubscribe;
  }, [symbol, timeframe, simulated]);

  const isLoading = chartData.length === 0;
  const latestPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const firstPrice = chartData.length > 0 ? chartData[0].price : 0;
  const isUp = latestPrice >= firstPrice;
  const percentChange = firstPrice > 0 ? ((latestPrice - firstPrice) / firstPrice) * 100 : 0;

  if (isLoading) {
    return (
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Activity className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'} animate-pulse`} />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Loading chart...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CandlestickChart className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{symbol}</span>
          {live && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-medium text-green-700">LIVE</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {['1D', '1W', '1M'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as '1D' | '1W' | '1M')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeframe === tf
                  ? isUp
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : darkMode
                    ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Price Change Indicator */}
      <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${
        isUp
          ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
          : darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'
      }`}>
        {isUp ? (
          <TrendingUp className="w-5 h-5" />
        ) : (
          <TrendingDown className="w-5 h-5" />
        )}
        <div>
          <span className="font-semibold">
            {isUp ? '+' : ''}{formatPrice(latestPrice, currency)}
          </span>
          <span className="text-sm ml-2">
            ({isUp ? '+' : ''}{percentChange.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? '#374151' : '#e5e7eb'}
            />
            <XAxis
              dataKey="time"
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 2', 'dataMax + 2']}
              tickFormatter={(value) => formatPrice(value, currency)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              itemStyle={{ color: darkMode ? '#ffffff' : '#000000' }}
              labelStyle={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
              formatter={(value: unknown) => [
                formatPrice(typeof value === 'number' ? value : Number(value ?? 0), currency),
                'Price'
              ]}
            />
            <ReferenceLine
              y={firstPrice}
              stroke={darkMode ? '#6b7280' : '#9ca3af'}
              strokeDasharray="3 3"
              label={{ value: 'Start', position: 'left', fill: darkMode ? '#9ca3af' : '#6b7280' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isUp ? '#10b981' : '#ef4444'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: isUp ? '#10b981' : '#ef4444' }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>High</p>
          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatPrice(Math.max(...chartData.map(d => d.price)), currency)}
          </p>
        </div>
        <div>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Low</p>
          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatPrice(Math.min(...chartData.map(d => d.price)), currency)}
          </p>
        </div>
        <div>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Latest</p>
          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatPrice(latestPrice, currency)}
          </p>
        </div>
      </div>
    </div>
  );
}
