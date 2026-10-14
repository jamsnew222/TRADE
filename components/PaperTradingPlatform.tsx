'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { StockData, PaperPortfolio, PaperTrade, Currency, Exchange } from '@/types';
import {
  convertCurrency,
  formatPrice,
  getCurrencySymbol,
  getAvailableExchanges,
  getAvailableCurrencies
} from '@/lib/realtime-stock-data';
import { subscribeMarket, getMarketMode, refreshMarketNow, MarketMode } from '@/lib/market-engine';
import { X, TrendingUp, TrendingDown, Plus, Search, Clock, BarChart3, History, Settings, RefreshCw, Globe, DollarSign, Building2 } from 'lucide-react';

interface PaperTradingPlatformProps {
  onClose: () => void;
  darkMode: boolean;
}

export default function PaperTradingPlatform({ onClose, darkMode }: PaperTradingPlatformProps) {
  const [allStocks, setAllStocks] = useState<StockData[]>([]);
  const [marketMode, setMarketMode] = useState<MarketMode>('loading');
  const [portfolio, setPortfolio] = useState<PaperPortfolio>({
    cash: 100000,
    initialCash: 100000,
    baseCurrency: 'USD',
    positions: [],
    trades: [],
    watchlist: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'],
    startDate: new Date().toISOString()
  });
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [activeTab, setActiveTab] = useState<'trade' | 'portfolio' | 'watchlist' | 'history'>('trade');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExchange, setSelectedExchange] = useState<Exchange>('All');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('All');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [priceChanges, setPriceChanges] = useState<Record<string, 'up' | 'down' | null>>({});
  const priceChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevPricesRef = useRef<Record<string, number>>({});

  const availableExchanges = getAvailableExchanges();
  const availableCurrencies = getAvailableCurrencies();

  // Subscribe once — the engine pushes price updates in place
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
        if (priceChangeTimeoutRef.current) {
          clearTimeout(priceChangeTimeoutRef.current);
        }
        priceChangeTimeoutRef.current = setTimeout(() => setPriceChanges({}), 1200);
      }

      setAllStocks(snapshot);
      setMarketMode(getMarketMode());
      setLastUpdated(new Date());

      setSelectedStock(prev => {
        if (!prev) return snapshot[0] ?? null;
        return snapshot.find(s => s.symbol === prev.symbol) ?? prev;
      });
    });

    return () => {
      unsubscribe();
      if (priceChangeTimeoutRef.current) {
        clearTimeout(priceChangeTimeoutRef.current);
      }
    };
  }, []);

  const stocks = useMemo(
    () => allStocks.filter(stock => {
      const exchangeMatch = selectedExchange === 'All' || stock.exchange === selectedExchange;
      const currencyMatch = selectedCurrency === 'All' || stock.currency === selectedCurrency;
      return exchangeMatch && currencyMatch;
    }),
    [allStocks, selectedExchange, selectedCurrency]
  );

  const isLoading = marketMode === 'loading' && allStocks.length === 0;

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshMarketNow();
    } finally {
      setIsRefreshing(false);
    }
  };

  const executeTrade = async () => {
    if (!selectedStock || !quantity) return;

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) return;

    const stockPriceInBaseCurrency = await convertCurrency(
      selectedStock.price,
      selectedStock.currency,
      portfolio.baseCurrency
    );

    const totalCost = qty * stockPriceInBaseCurrency;

    if (tradeType === 'buy') {
      if (totalCost > portfolio.cash) {
        alert('Insufficient funds');
        return;
      }

      const existingPosition = portfolio.positions.find(p => p.symbol === selectedStock.symbol);
      let newPositions;

      if (existingPosition) {
        newPositions = portfolio.positions.map(p => {
          if (p.symbol === selectedStock.symbol) {
            const totalShares = p.shares + qty;
            const newAvgCost = ((p.shares * p.averageCost) + totalCost) / totalShares;
            return { ...p, shares: totalShares, averageCost: newAvgCost };
          }
          return p;
        });
      } else {
        newPositions = [...portfolio.positions, {
          symbol: selectedStock.symbol,
          shares: qty,
          averageCost: stockPriceInBaseCurrency,
          currency: selectedStock.currency
        }];
      }

      const newTrade: PaperTrade = {
        id: Date.now().toString(),
        symbol: selectedStock.symbol,
        type: 'buy',
        quantity: qty,
        price: stockPriceInBaseCurrency,
        currency: portfolio.baseCurrency,
        timestamp: new Date().toISOString()
      };

      setPortfolio({
        ...portfolio,
        cash: portfolio.cash - totalCost,
        positions: newPositions,
        trades: [newTrade, ...portfolio.trades]
      });
    } else {
      const position = portfolio.positions.find(p => p.symbol === selectedStock.symbol);
      if (!position || position.shares < qty) {
        alert('Insufficient shares');
        return;
      }

      const newPositions = portfolio.positions
        .map(p => {
          if (p.symbol === selectedStock.symbol) {
            return { ...p, shares: p.shares - qty };
          }
          return p;
        })
        .filter(p => p.shares > 0);

      const newTrade: PaperTrade = {
        id: Date.now().toString(),
        symbol: selectedStock.symbol,
        type: 'sell',
        quantity: qty,
        price: stockPriceInBaseCurrency,
        currency: portfolio.baseCurrency,
        timestamp: new Date().toISOString()
      };

      setPortfolio({
        ...portfolio,
        cash: portfolio.cash + totalCost,
        positions: newPositions,
        trades: [newTrade, ...portfolio.trades]
      });
    }

    setQuantity('');
  };

  const calculatePortfolioValue = async () => {
    let holdingsValue = 0;

    for (const holding of portfolio.positions) {
      const stock = stocks.find(s => s.symbol === holding.symbol);
      if (stock) {
        const valueInStockCurrency = holding.shares * stock.price;
        const valueInBaseCurrency = await convertCurrency(
          valueInStockCurrency,
          stock.currency,
          portfolio.baseCurrency
        );
        holdingsValue += valueInBaseCurrency;
      }
    }

    return portfolio.cash + holdingsValue;
  };

  const calculateTotalReturn = async () => {
    const currentValue = await calculatePortfolioValue();
    const totalReturn = currentValue - portfolio.initialCash;
    const returnPercent = (totalReturn / portfolio.initialCash) * 100;
    return { totalReturn, returnPercent };
  };

  const addToWatchlist = (symbol: string) => {
    if (!portfolio.watchlist.includes(symbol)) {
      setPortfolio({ ...portfolio, watchlist: [...portfolio.watchlist, symbol] });
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setPortfolio({ ...portfolio, watchlist: portfolio.watchlist.filter(s => s !== symbol) });
  };

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [totalReturn, setTotalReturn] = useState(0);
  const [returnPercent, setReturnPercent] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    const updateCalculations = async () => {
      const value = await calculatePortfolioValue();
      const returns = await calculateTotalReturn();
      setPortfolioValue(value);
      setTotalReturn(returns.totalReturn);
      setReturnPercent(returns.returnPercent);
    };

    updateCalculations();
  }, [stocks, portfolio]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Real-Time Paper Trading</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Practice with {getCurrencySymbol(portfolio.baseCurrency)}{portfolio.cash.toLocaleString()} virtual money
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {marketMode === 'live' ? (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full" title="Real market data">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-700">LIVE</span>
              </div>
            ) : marketMode === 'simulated' ? (
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 rounded-full" title="Simulated prices — add a Finnhub API key for real data">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-amber-700">SIMULATED</span>
              </div>
            ) : null}
            {lastUpdated && (
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } disabled:opacity-50`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={onClose}
              className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : ''}`}
            >
              <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        {/* Exchange and Currency Selection */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : ''}`}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Building2 className="w-4 h-4 inline mr-1" />
                Exchange
              </label>
              <select
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value as Exchange)}
                className={`w-full px-4 py-2 rounded-lg border-2 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                {availableExchanges.map(exchange => (
                  <option key={exchange} value={exchange}>{exchange}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <DollarSign className="w-4 h-4 inline mr-1" />
                Currency
              </label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                className={`w-full px-4 py-2 rounded-lg border-2 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                {availableCurrencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : ''}`}>
          <div className="grid grid-cols-4 gap-4">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Portfolio Value</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatPrice(portfolioValue, portfolio.baseCurrency)}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cash Available</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatPrice(portfolio.cash, portfolio.baseCurrency)}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Return</p>
              <p className={`text-xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalReturn >= 0 ? '+' : ''}{formatPrice(totalReturn, portfolio.baseCurrency)}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Return %</p>
              <p className={`text-xl font-bold ${returnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`border-b ${darkMode ? 'border-gray-700' : ''}`}>
          <div className="flex">
            {[
              { id: 'trade', label: 'Trade', icon: TrendingUp },
              { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
              { id: 'watchlist', label: 'Watchlist', icon: Search },
              { id: 'history', label: 'History', icon: History }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : darkMode
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 300px)' }}>
          {activeTab === 'trade' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stock Selection */}
              <div>
                <div className="mb-4">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search stocks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border-2 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {isLoading ? (
                    <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Loading stocks...
                    </div>
                  ) : filteredStocks.length === 0 ? (
                    <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No stocks found
                    </div>
                  ) : (
                    filteredStocks.map(stock => (
                      <button
                        key={stock.symbol}
                        onClick={() => setSelectedStock(stock)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          selectedStock?.symbol === stock.symbol
                            ? 'border-green-500 bg-green-50'
                            : darkMode
                              ? 'border-gray-700 bg-gray-700 hover:border-green-400'
                              : 'border-gray-200 bg-white hover:border-green-400'
                        } ${priceChanges[stock.symbol] === 'up' ? 'animate-pulse border-green-300' : ''} ${
                          priceChanges[stock.symbol] === 'down' ? 'animate-pulse border-red-300' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {stock.symbol}
                              <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {stock.exchange}
                              </span>
                              {priceChanges[stock.symbol] === 'up' && (
                                <span className="ml-2 text-green-500">↑</span>
                              )}
                              {priceChanges[stock.symbol] === 'down' && (
                                <span className="ml-2 text-red-500">↓</span>
                              )}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stock.name}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {formatPrice(stock.price, stock.currency)}
                            </p>
                            <div className={`flex items-center gap-1 text-sm ${
                              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stock.change >= 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Trading Panel */}
              {selectedStock && (
                <div className={`p-4 rounded-xl border-2 ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedStock.symbol}
                        <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {selectedStock.exchange}
                        </span>
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedStock.name}</p>
                    </div>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatPrice(selectedStock.price, selectedStock.currency)}
                    </p>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setTradeType('buy')}
                      className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                        tradeType === 'buy'
                          ? 'bg-green-500 text-white'
                          : darkMode
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setTradeType('sell')}
                      className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                        tradeType === 'sell'
                          ? 'bg-red-500 text-white'
                          : darkMode
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Sell
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      className={`w-full px-4 py-2 rounded-lg border-2 ${
                        darkMode
                          ? 'bg-gray-600 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                    <div className="flex justify-between text-sm">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Estimated Total</span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {quantity ? formatPrice(parseInt(quantity) * selectedStock.price, selectedStock.currency) : formatPrice(0, selectedStock.currency)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={executeTrade}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    {tradeType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Positions</h3>
              {portfolio.positions.length === 0 ? (
                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No positions yet. Start trading to build your portfolio!
                </div>
              ) : (
                <div className={`rounded-xl border-2 overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <table className="w-full">
                    <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th className={`text-left p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Symbol</th>
                        <th className={`text-right p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shares</th>
                        <th className={`text-right p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Avg Cost</th>
                        <th className={`text-right p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current</th>
                        <th className={`text-right p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>P/L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.positions.map(position => {
                        const stock = stocks.find(s => s.symbol === position.symbol);
                        if (!stock) return null;
                        const profitLoss = (stock.price - position.averageCost) * position.shares;
                        return (
                          <tr key={position.symbol} className={darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className={`p-3 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {position.symbol}
                              <span className={`text-xs ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {position.currency}
                              </span>
                            </td>
                            <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{position.shares}</td>
                            <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {formatPrice(position.averageCost, portfolio.baseCurrency)}
                            </td>
                            <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {formatPrice(stock.price, stock.currency)}
                            </td>
                            <td className={`p-3 text-right font-medium ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {profitLoss >= 0 ? '+' : ''}{formatPrice(profitLoss, portfolio.baseCurrency)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'watchlist' && (
            <div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Watchlist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolio.watchlist.map(symbol => {
                  const stock = stocks.find(s => s.symbol === symbol);
                  if (!stock) return null;
                  return (
                    <div key={symbol} className={`p-4 rounded-xl border-2 ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stock.symbol}</p>
                        <button
                          onClick={() => removeFromWatchlist(symbol)}
                          className={`p-1 rounded ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        >
                          <X className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        </button>
                      </div>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {formatPrice(stock.price, stock.currency)}
                      </p>
                      <div className={`flex items-center gap-1 text-sm ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Trade History</h3>
              {portfolio.trades.length === 0 ? (
                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No trades yet.
                </div>
              ) : (
                <div className={`rounded-xl border-2 overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <table className="w-full">
                    <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th className={`text-left p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</th>
                        <th className={`text-left p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Symbol</th>
                        <th className={`text-left p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</th>
                        <th className={`text-right p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quantity</th>
                        <th className={`text-right p-3 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.trades.map(trade => (
                        <tr key={trade.id} className={darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                          <td className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {new Date(trade.timestamp).toLocaleDateString()}
                          </td>
                          <td className={`p-3 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{trade.symbol}</td>
                          <td className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              trade.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {trade.type.toUpperCase()}
                            </span>
                          </td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{trade.quantity}</td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {formatPrice(trade.price, trade.currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
