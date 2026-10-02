import { lessons } from './lessons';
import { Unit, Level, LearningPath } from '@/types';

// Create levels from lessons
function createLevelsFromLessons(lessonIds: string[], checkpointIndices: number[] = []): Level[] {
  return lessonIds.map((lessonId, index) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) {
      console.warn(`Lesson not found: ${lessonId}`);
      return {
        id: `level-${lessonId}`,
        lessonId,
        lesson: {
          id: lessonId,
          title: 'Lesson Not Found',
          description: 'This lesson is not available yet',
          type: 'quiz',
          difficulty: 'beginner',
          category: 'Basics',
          xpReward: 10,
          content: { quiz: [] }
        },
        locked: true,
        completed: false,
        checkpoint: checkpointIndices.includes(index)
      };
    }
    return {
      id: `level-${lessonId}`,
      lessonId,
      lesson,
      locked: index > 0, // First lesson unlocked, rest locked initially
      completed: false,
      checkpoint: checkpointIndices.includes(index)
    };
  });
}

// Define the learning path with units
export const learningPath: LearningPath = {
  units: [
    // Unit 1: Getting Started (Basics)
    {
      id: 'unit-1',
      title: 'Getting Started',
      description: 'Learn the fundamentals of stock trading',
      icon: '🚀',
      category: 'Basics',
      locked: false,
      completed: false,
      totalXP: 40,
      levels: createLevelsFromLessons([
        'intro-stocks',
        'buy-sell',
        'brokerage-accounts',
        'market-hours',
        'market-order'
      ], [2, 4])
    },
    // Unit 2: Market Mechanics
    {
      id: 'unit-2',
      title: 'Market Mechanics',
      description: 'Understand how markets work',
      icon: '⚙️',
      category: 'Basics',
      locked: true,
      completed: false,
      totalXP: 50,
      levels: createLevelsFromLessons([
        'supply-and-demand',
        'market-participants',
        'market-index',
        'market-cap-importance',
        'volatility-basics',
        'liquidity-basics'
      ], [3, 5])
    },
    // Unit 3: Order Types
    {
      id: 'unit-3',
      title: 'Order Types',
      description: 'Master different order types',
      icon: '📋',
      category: 'Orders',
      locked: true,
      completed: false,
      totalXP: 50,
      levels: createLevelsFromLessons([
        'market-order',
        'limit-order',
        'stop-loss',
        'stop-limit-order',
        'trailing-stop'
      ], [2, 4])
    },
    // Unit 4: Risk Management
    {
      id: 'unit-4',
      title: 'Risk Management',
      description: 'Protect your investments',
      icon: '🛡️',
      category: 'Risk Management',
      locked: true,
      completed: false,
      totalXP: 40,
      levels: createLevelsFromLessons([
        'risk-management',
        'diversification',
        'stop-loss',
        'interactive-trade'
      ], [2, 3])
    },
    // Unit 5: Diversification Strategy
    {
      id: 'unit-5',
      title: 'Diversification Strategy',
      description: 'Build a balanced portfolio',
      icon: '🎯',
      category: 'Strategy',
      locked: true,
      completed: false,
      totalXP: 40,
      levels: createLevelsFromLessons([
        'diversification',
        'compound-interest',
        'dollar-cost-averaging',
        'bull-bear-markets'
      ], [2, 3])
    },
    // Unit 6: Fundamental Analysis
    {
      id: 'unit-6',
      title: 'Fundamental Analysis',
      description: 'Analyze company fundamentals',
      icon: '📊',
      category: 'Fundamental Analysis',
      locked: true,
      completed: false,
      totalXP: 50,
      levels: createLevelsFromLessons([
        'pe-ratio',
        'earnings-reports',
        'market-cap',
        'dividend-basics',
        'stock-splits',
        'eps-basics'
      ], [2, 4])
    },
    // Unit 7: Technical Analysis Basics
    {
      id: 'unit-7',
      title: 'Technical Analysis Basics',
      description: 'Read charts and patterns',
      icon: '📈',
      category: 'Technical Analysis',
      locked: true,
      completed: false,
      totalXP: 30,
      levels: createLevelsFromLessons([
        'support-resistance',
        'moving-averages',
        'rsi-indicator'
      ], [2])
    },
    // Unit 8: Advanced Technical Analysis
    {
      id: 'unit-8',
      title: 'Advanced Technical Analysis',
      description: 'Master advanced indicators',
      icon: '🔬',
      category: 'Technical Analysis',
      locked: true,
      completed: false,
      totalXP: 30,
      levels: createLevelsFromLessons([
        'reading-stock-charts',
        'terminology',
        'volume-basics'
      ], [2])
    },
    // Unit 9: Investment Strategies
    {
      id: 'unit-9',
      title: 'Investment Strategies',
      description: 'Develop your trading style',
      icon: '💡',
      category: 'Strategy',
      locked: true,
      completed: false,
      totalXP: 20,
      levels: createLevelsFromLessons([
        'compound-interest',
        'dollar-cost-averaging'
      ], [1])
    },
    // Unit 10: Advanced Trading
    {
      id: 'unit-10',
      title: 'Advanced Trading',
      description: 'Advanced trading concepts',
      icon: '🚀',
      category: 'Advanced',
      locked: true,
      completed: false,
      totalXP: 20,
      levels: createLevelsFromLessons([
        'short-selling',
        'options-basics'
      ], [1])
    },
    // Unit 11: Options Trading
    {
      id: 'unit-11',
      title: 'Options Trading',
      description: 'Learn options strategies',
      icon: '📊',
      category: 'Options',
      locked: true,
      completed: false,
      totalXP: 10,
      levels: createLevelsFromLessons([
        'options-basics'
      ], [])
    },
    // Unit 15: Market Events
    {
      id: 'unit-15',
      title: 'Market Events',
      description: 'Understand market-moving events',
      icon: '📰',
      category: 'Basics',
      locked: true,
      completed: false,
      totalXP: 30,
      levels: createLevelsFromLessons([
        'market-participants',
        'sectors-and-industries',
        'regulatory-bodies'
      ], [2])
    }
  ],
  totalXP: 360,
  totalLessons: 0 // Will be calculated
};

// Calculate total lessons
learningPath.totalLessons = learningPath.units.reduce((sum, unit) => sum + unit.levels.length, 0);