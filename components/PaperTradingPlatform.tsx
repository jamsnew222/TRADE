'use client';

import { useState, useEffect, useRef } from 'react';
import { PaperPortfolio, PaperTrade, Currency, Exchange } from '@/types';
import {
  convertCurrency,
  formatPrice,
  getCurrencySymbol,
  getAvailableExchanges,
  getAvailableCurrencies
} from '@/lib/currency';
import { refreshMarketNow } from '@/lib/market-engine';
import { useMarket } from '@/lib/useMarket';
import { applyBuy, applySell, valuePositions } from '@/lib/portfolio';
import { useNotification } from '@/lib/useNotification';
import { loadPaperPortfolio, savePaperPortfolio, resetPaperPortfolio } from '@/lib/simulator-storage';
import StockRow from './StockRow';
import { canTrade, consumeTrade, loadProgress, FREE_DAILY_TRADES } from '@/lib/progress';
import { recordQuestEvent } from '@/lib/quests';
import { X, TrendingUp, TrendingDown, Search, BarChart3, History, RefreshCw, DollarSign, Building2, RotateCcw } from 'lucide-react';

interface PaperTradingPlatformProps {
  onClose: () => void;
  darkMode: boolean;
}

export default function PaperTradingPlatform({ onClose, darkMode }: PaperTradingPlatformProps) {
  const {
    stocks, marketMode, lastUpdated, priceChanges,
    selectedStock, setSelectedStock,
    selectedExchange, setSelectedExchange,
    selectedCurrency, setSelectedCurrency,
    isLoading,
  } = useMarket();
  const defaultPortfolio: PaperPortfolio = {
    cash: 100000,
    initialCash: 100000,
    baseCurrency: 'USD',
    positions: [],
    trades: [],
    watchlist: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'],
    startDate: new Date().toISOString()
  };
  const [portfolio, setPortfolio] = useState<PaperPortfolio>(defaultPortfolio);
  // Persisted across sessions: hydrate on mount, save on change.
  const skipSave = useRef(true);
  useEffect(() => {
    const saved = loadPaperPortfolio<PaperPortfolio>();
    if (saved && typeof saved.cash === 'number' && Array.isArray(saved.positions) && Array.isArray(saved.trades)) {
      // Hydrating persisted state from localStorage — intentional post-mount load
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPortfolio(saved);
    }
  }, []);
  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    savePaperPortfolio(portfolio);
  }, [portfolio]);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [activeTab, setActiveTab] = useState<'trade' | 'portfolio' | 'watchlist' | 'history'>('trade');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { notification, show: showNotification } = useNotification();

  const availableExchanges = getAvailableExchanges();
  const availableCurrencies = getAvailableCurrencies();

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

    if (!canTrade(loadProgress())) {
      showNotification(`Daily free limit of ${FREE_DAILY_TRADES} trades reached — upgrade to Premium for unlimited trades`);
      return;
    }

    const stockPriceInBaseCurrency = await convertCurrency(
      selectedStock.price,
      selectedStock.currency,
      portfolio.baseCurrency
    );

    const totalCost = qty * stockPriceInBaseCurrency;
    const newTrade: PaperTrade = {
      id: Date.now().toString(),
      symbol: selectedStock.symbol,
      type: tradeType,
      quantity: qty,
      price: stockPriceInBaseCurrency,
      currency: portfolio.baseCurrency,
      timestamp: new Date().toISOString()
    };

    if (tradeType === 'buy') {
      if (totalCost > portfolio.cash) {
        showNotification('Insufficient funds');
        return;
      }

      setPortfolio({
        ...portfolio,
        cash: portfolio.cash - totalCost,
        positions: applyBuy(portfolio.positions, selectedStock.symbol, qty, stockPriceInBaseCurrency, selectedStock.currency),
        trades: [newTrade, ...portfolio.trades]
      });
    } else {
      const newPositions = applySell(portfolio.positions, selectedStock.symbol, qty);
      if (!newPositions) {
        showNotification('Insufficient shares');
        return;
      }

      setPortfolio({
        ...portfolio,
        cash: portfolio.cash + totalCost,
        positions: newPositions,
        trades: [newTrade, ...portfolio.trades]
      });
    }

    consumeTrade();
    recordQuestEvent('trade', 1);
    setQuantity('');
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
      const value = await valuePositions(portfolio.positions, stocks, portfolio.baseCurrency);
      const currentValue = portfolio.cash + value;
      const totalReturn = currentValue - portfolio.initialCash;
      setPortfolioValue(currentValue);
      setTotalReturn(totalReturn);
      setReturnPercent((totalReturn / portfolio.initialCash) * 100);
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
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full" title="Real market data (may be delayed; shows last real price after market close)">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-700">LIVE</span>
              </div>
            ) : marketMode === 'simulated' ? (
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 rounded-full" title="Simulated prices for practice — real feed unreachable; movement continues even when markets are closed">
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
              aria-label="Close"
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
          <div className="flex justify-end mb-2 -mt-1">
            <button
              onClick={() => { resetPaperPortfolio(); setPortfolio({ ...defaultPortfolio, startDate: new Date().toISOString() }); showNotification('Portfolio reset'); }}
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg transition-colors ${
                darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'
              }`}
              title="Reset portfolio to $100,000"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
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
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
                      <StockRow
                        key={stock.symbol}
                        stock={stock}
                        selected={selectedStock?.symbol === stock.symbol}
                        darkMode={darkMode}
                        marketMode={marketMode}
                        priceChange={priceChanges[stock.symbol]}
                        onClick={() => setSelectedStock(stock)}
                      />
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

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[60]">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
}
