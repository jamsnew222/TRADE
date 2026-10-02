import { TradingStyleInfo } from '@/types';

export const tradingStyles: TradingStyleInfo[] = [
  {
    id: 'day-trading',
    name: 'Day Trading',
    description: 'Active trading with positions opened and closed within the same day. Focus on short-term price movements and technical analysis.',
    icon: '⚡',
    focus: ['Technical Analysis', 'Chart Patterns', 'Market Orders', 'Risk Management'],
    recommendedLessons: [
      'market-order',
      'limit-order',
      'stop-loss',
      'support-resistance',
      'moving-averages',
      'rsi-indicator',
      'technical-chart-patterns',
      'risk-management'
    ],
    simulatorSettings: {
      timeScale: 'intraday',
      volatility: 0.05,
      defaultPositionSize: 1000
    }
  },
  {
    id: 'swing-trading',
    name: 'Swing Trading',
    description: 'Hold positions for several days to weeks, capturing short- to medium-term trends. Balance of technical and fundamental analysis.',
    icon: '📊',
    focus: ['Technical Analysis', 'Fundamental Analysis', 'Strategy', 'Risk Management'],
    recommendedLessons: [
      'market-order',
      'limit-order',
      'stop-loss',
      'support-resistance',
      'moving-averages',
      'pe-ratio',
      'earnings-reports',
      'diversification',
      'risk-management'
    ],
    simulatorSettings: {
      timeScale: 'daily',
      volatility: 0.03,
      defaultPositionSize: 2500
    }
  },
  {
    id: 'long-term-investing',
    name: 'Long-term Investing',
    description: 'Buy and hold strategy focusing on fundamental analysis and long-term growth. Ideal for building wealth over years.',
    icon: '🏦',
    focus: ['Fundamental Analysis', 'Strategy', 'Basics', 'Compound Interest'],
    recommendedLessons: [
      'intro-stocks',
      'buy-sell',
      'pe-ratio',
      'earnings-reports',
      'market-cap',
      'diversification',
      'compound-interest',
      'dollar-cost-averaging',
      'dividend-investing',
      'bull-bear-markets'
    ],
    simulatorSettings: {
      timeScale: 'weekly',
      volatility: 0.02,
      defaultPositionSize: 5000
    }
  },
  {
    id: 'balanced',
    name: 'Balanced Approach',
    description: 'Mix of trading and investing strategies. Learn all aspects of trading to adapt to different market conditions.',
    icon: '⚖️',
    focus: ['All Categories', 'Comprehensive Learning', 'Flexibility'],
    recommendedLessons: [], // All lessons recommended
    simulatorSettings: {
      timeScale: 'daily',
      volatility: 0.035,
      defaultPositionSize: 3000
    }
  }
];