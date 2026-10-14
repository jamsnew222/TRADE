'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { StockData, TradingStyle, Currency, Exchange } from '@/types';
import { tradingStyles } from '@/data/trading-styles';
import {
  convertCurrency,
  formatPrice,
  getCurrencySymbol,
  getAvailableExchanges,
  getAvailableCurrencies
} from '@/lib/realtime-stock-data';
import { subscribeMarket, getMarketMode, refreshMarketNow, getPriceHistory, isMarketOpen, isSymbolLive, MarketMode } from '@/lib/market-engine';
import { X, TrendingUp, TrendingDown, Wallet, RefreshCw, Globe, DollarSign, Building2, LineChart } from 'lucide-react';
import StockChart from './StockChart';
import Sparkline from './Sparkline';
import { canTrade, consumeTrade, getRemainingUsage, loadProgress, checkPremiumStatus, FREE_DAILY_TRADES } from '@/lib/progress';

interface TradingSimulatorProps {
  onClose: () => void;
  darkMode: boolean;
  tradingStyle?: TradingStyle;
}

interface Portfolio {
  cash: number;
  baseCurrency: Currency;
  holdings: Array<{
    symbol: string;
    shares: number;
    averageCost: number;
    currency: Currency;
  }>;
}

export default function TradingSimulator({ onClose, darkMode, tradingStyle }: TradingSimulatorProps) {
  const styleSettings = tradingStyle ? tradingStyles.find(s => s.id === tradingStyle)?.simulatorSettings : undefined;

  const [allStocks, setAllStocks] = useState<StockData[]>([]);
  const [marketMode, setMarketMode] = useState<MarketMode>('loading');
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: styleSettings?.defaultPositionSize || 10000,
    baseCurrency: 'USD',
    holdings: []
  });
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [notification, setNotification] = useState<string | null>(null);
  const [tradeProgress, setTradeProgress] = useState(() => loadProgress());
  const [selectedExchange, setSelectedExchange] = useState<Exchange>('All');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('All');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [priceChanges, setPriceChanges] = useState<Record<string, 'up' | 'down' | null>>({});
  const priceChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevPricesRef = useRef<Record<string, number>>({});
  const tradePanelRef = useRef<HTMLDivElement | null>(null);

  const availableExchanges = getAvailableExchanges();
  const availableCurrencies = getAvailableCurrencies();

  // Subscribe once — the engine pushes price updates in place.
  // Filtering is derived below, so changing filters never reloads data.
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

      // Keep the selected stock in sync with the latest prices
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
    if (!selectedStock || !tradeAmount) return;

    const amount = parseInt(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      showNotification('Please enter a valid amount');
      return;
    }

    if (!canTrade(tradeProgress)) {
      showNotification(`Daily free limit of ${FREE_DAILY_TRADES} trades reached — upgrade to Premium for unlimited`);
      return;
    }

    // Convert trade amount to stock's currency if needed
    const stockPriceInBaseCurrency = await convertCurrency(
      selectedStock.price,
      selectedStock.currency,
      portfolio.baseCurrency
    );

    const totalCost = amount * stockPriceInBaseCurrency;

    if (tradeType === 'buy') {
      if (totalCost > portfolio.cash) {
        showNotification('Insufficient funds');
        return;
      }

      const existingHolding = portfolio.holdings.find(h => h.symbol === selectedStock.symbol);
      let newHoldings;

      if (existingHolding) {
        newHoldings = portfolio.holdings.map(h => {
          if (h.symbol === selectedStock.symbol) {
            const totalShares = h.shares + amount;
            const newAverageCost = ((h.shares * h.averageCost) + totalCost) / totalShares;
            return { ...h, shares: totalShares, averageCost: newAverageCost };
          }
          return h;
        });
      } else {
        newHoldings = [...portfolio.holdings, {
          symbol: selectedStock.symbol,
          shares: amount,
          averageCost: stockPriceInBaseCurrency,
          currency: selectedStock.currency
        }];
      }

      setPortfolio({
        ...portfolio,
        cash: portfolio.cash - totalCost,
        holdings: newHoldings
      });
      showNotification(`Bought ${amount} shares of ${selectedStock.symbol}`);
    } else {
      const holding = portfolio.holdings.find(h => h.symbol === selectedStock.symbol);
      if (!holding || holding.shares < amount) {
        showNotification('Insufficient shares');
        return;
      }

      const newHoldings = portfolio.holdings
        .map(h => {
          if (h.symbol === selectedStock.symbol) {
            return { ...h, shares: h.shares - amount };
          }
          return h;
        })
        .filter(h => h.shares > 0);

      setPortfolio({
        ...portfolio,
        cash: portfolio.cash + totalCost,
        holdings: newHoldings
      });
      showNotification(`Sold ${amount} shares of ${selectedStock.symbol}`);
    }

    setTradeProgress(consumeTrade());
    setTradeAmount('');
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const calculatePortfolioValue = async () => {
    let holdingsValue = 0;

    for (const holding of portfolio.holdings) {
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

  const calculateProfitLoss = async () => {
    let profitLoss = 0;

    for (const holding of portfolio.holdings) {
      const stock = stocks.find(s => s.symbol === holding.symbol);
      if (stock) {
        const currentValue = await convertCurrency(
          stock.price * holding.shares,
          stock.currency,
          portfolio.baseCurrency
        );
        const costValue = holding.averageCost * holding.shares;
        profitLoss += currentValue - costValue;
      }
    }

    return profitLoss;
  };

  const [portfolioValue, setPortfolioValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);

  useEffect(() => {
    const updatePortfolioCalculations = async () => {
      const value = await calculatePortfolioValue();
      const pl = await calculateProfitLoss();
      setPortfolioValue(value);
      setProfitLoss(pl);
    };

    updatePortfolioCalculations();
  }, [stocks, portfolio]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Real-Time Trading Simulator</h2>
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
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
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

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Exchange and Currency Selection */}
          <div className="mb-6 grid grid-cols-2 gap-4">
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

          {/* Portfolio Summary */}
          <div className={`mb-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Wallet className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Portfolio Value</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Value</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatPrice(portfolioValue, portfolio.baseCurrency)}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cash</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatPrice(portfolio.cash, portfolio.baseCurrency)}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>P/L</p>
                <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profitLoss >= 0 ? '+' : ''}{formatPrice(profitLoss, portfolio.baseCurrency)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stock List */}
            <div className="lg:col-span-1">
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Available Stocks ({stocks.length})
              </h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {isLoading ? (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Loading stocks...
                  </div>
                ) : stocks.length === 0 ? (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No stocks available for this exchange/currency combination
                  </div>
                ) : (
                  stocks.map(stock => (
                    <div
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all cursor-pointer ${
                        selectedStock?.symbol === stock.symbol
                          ? 'border-green-500 bg-green-50'
                          : darkMode
                            ? 'border-gray-700 bg-gray-700 hover:bg-gray-600'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                      } ${priceChanges[stock.symbol] === 'up' ? 'border-green-300' : ''} ${
                        priceChanges[stock.symbol] === 'down' ? 'border-red-300' : ''
                      }`}
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
                            {priceChanges[stock.symbol] === 'up' && (
                              <span className="ml-2 text-green-500">↑</span>
                            )}
                            {priceChanges[stock.symbol] === 'down' && (
                              <span className="ml-2 text-red-500">↓</span>
                            )}
                          </p>
                          <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stock.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkline
                            data={getPriceHistory(stock.symbol)}
                            positive={stock.change >= 0}
                          />
                          <div className="text-right">
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {formatPrice(stock.price, stock.currency)}
                            </p>
                            <div className={`flex items-center justify-end gap-1 text-sm ${
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
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStock(stock);
                            setTradeType('buy');
                            tradePanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className="flex-1 py-1.5 rounded-md text-xs font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                          BUY
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStock(stock);
                            setTradeType('sell');
                            tradePanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className="flex-1 py-1.5 rounded-md text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          SELL
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chart and Trading Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trading Panel — placed first so it's always visible */}
              <div ref={tradePanelRef}>
                <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Trade
                  {selectedStock && (
                    <span className="text-sm font-normal px-2 py-0.5 rounded bg-green-100 text-green-700">
                      {selectedStock.symbol} selected
                    </span>
                  )}
                </h3>
                {selectedStock ? (
                  <div className={`p-4 rounded-xl border-2 ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {selectedStock.symbol}
                          <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {selectedStock.exchange}
                          </span>
                        </p>
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
                        Number of Shares
                      </label>
                      <input
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(e.target.value)}
                        placeholder="Enter amount"
                        className={`w-full px-4 py-2 rounded-lg border-2 ${
                          darkMode
                            ? 'bg-gray-600 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                      <div className="flex justify-between text-sm">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Estimated Total</span>
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {tradeAmount ? formatPrice(parseInt(tradeAmount) * selectedStock.price, selectedStock.currency) : formatPrice(0, selectedStock.currency)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={executeTrade}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      {tradeType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
                    </button>
                    {!checkPremiumStatus(tradeProgress) && (
                      <p className={`text-xs text-center mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getRemainingUsage(tradeProgress).trades} of {FREE_DAILY_TRADES} free trades left today — Premium removes limits
                      </p>
                    )}
                  </div>
                ) : (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Select a stock to trade
                  </div>
                )}
              </div>

              {/* Stock Chart */}
              {selectedStock && (
                <StockChart symbol={selectedStock.symbol} darkMode={darkMode} />
              )}
            </div>
          </div>

          {/* Holdings */}
          {portfolio.holdings.length > 0 && (
            <div className="mt-6">
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Holdings</h3>
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
                    {portfolio.holdings.map(holding => {
                      const stock = stocks.find(s => s.symbol === holding.symbol);
                      if (!stock) return null;
                      const currentPriceInBase = (stock.price * holding.shares); // Simplified for demo
                      const holdingPL = currentPriceInBase - (holding.averageCost * holding.shares);
                      return (
                        <tr key={holding.symbol} className={darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                          <td className={`p-3 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {holding.symbol}
                            <span className={`text-xs ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {holding.currency}
                            </span>
                          </td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{holding.shares}</td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {formatPrice(holding.averageCost, portfolio.baseCurrency)}
                          </td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {formatPrice(stock.price, stock.currency)}
                          </td>
                          <td className={`p-3 text-right font-medium ${holdingPL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {holdingPL >= 0 ? '+' : ''}{formatPrice(holdingPL, portfolio.baseCurrency)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
}
