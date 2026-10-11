export type LessonType = 'quiz' | 'matching' | 'fill-blank' | 'multiple-choice' | 'interactive' | 'true-false' | 'multiple-select' | 'ordering' | 'word-bank' | 'flashcard' | 'drag-drop' | 'timeline' | 'scenario';

export type TradingStyle = 'day-trading' | 'swing-trading' | 'long-term-investing' | 'balanced';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'INR' | 'BTC' | 'ETH';

export type Exchange = 'NYSE' | 'NASDAQ' | 'LSE' | 'TSE' | 'HKEX' | 'SSE' | 'NSE' | 'ASX' | 'TSX' | 'B3';

export interface UserProgress {
  completedLessons: string[];
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  lastActiveDate: string;
  tradingStyle?: TradingStyle;
  currentUnit?: number;
  currentLevel?: number;
  streakFreezes?: number;
  totalDaysActive?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  xpReward: number;
  content: {
    explanation?: string;
    quiz?: QuizQuestion[];
    matching?: MatchingExercise;
    fillBlank?: FillBlankExercise;
    multipleChoice?: QuizQuestion[];
    trueFalse?: TrueFalseQuestion[];
    multipleSelect?: MultipleSelectQuestion[];
    ordering?: OrderingQuestion[];
    wordBank?: WordBankQuestion[];
    interactive?: {
      scenario: string;
      steps: string[];
    };
    flashcards?: FlashcardQuestion[];
    dragDrop?: DragDropQuestion;
    timeline?: TimelineQuestion;
    scenario?: ScenarioQuestion[];
  };
  prerequisites?: string[];
}

export interface Level {
  id: string;
  lessonId: string;
  lesson: Lesson;
  locked: boolean;
  completed: boolean;
  checkpoint?: boolean;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  icon: string;
  levels: Level[];
  locked: boolean;
  completed: boolean;
  totalXP: number;
  category: string;
}

export interface LearningPath {
  units: Unit[];
  totalXP: number;
  totalLessons: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type?: 'multiple-choice' | 'true-false' | 'multiple-select';
  correctAnswers?: number[]; // For multiple-select questions
}

export interface MatchingExercise {
  id: string;
  instruction: string;
  pairs: Array<{
    left: string;
    right: string;
  }>;
}

export interface FillBlankExercise {
  id: string;
  sentence: string;
  correctAnswer: string;
  hint?: string;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface MultipleSelectQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export interface OrderingQuestion {
  id: string;
  instruction: string;
  items: string[];
  correctOrder: number[];
  explanation: string;
}

export interface WordBankQuestion {
  id: string;
  instruction: string;
  sentence: string;
  words: string[];
  correctWords: string[];
  explanation: string;
}

export interface FlashcardQuestion {
  id: string;
  front: string;
  back: string;
  hint?: string;
  explanation?: string;
}

export interface DragDropQuestion {
  id: string;
  instruction: string;
  items: Array<{
    id: string;
    content: string;
    category: string;
  }>;
  categories: string[];
  explanation: string;
}

export interface TimelineQuestion {
  id: string;
  instruction: string;
  events: Array<{
    id: string;
    description: string;
    date: string;
  }>;
  correctOrder: string[];
  explanation: string;
}

export interface ScenarioQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: Currency;
  exchange: Exchange;
  volume?: number;
  marketCap?: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
}

export interface TradingStyleInfo {
  id: TradingStyle;
  name: string;
  description: string;
  icon: string;
  focus: string[];
  recommendedLessons: string[];
  simulatorSettings: {
    timeScale: 'intraday' | 'daily' | 'weekly';
    volatility: number;
    defaultPositionSize: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: 'lessons_completed' | 'total_xp' | 'streak' | 'category_completed' | 'unit_completed';
    value: number;
    category?: string;
    unitId?: string;
  };
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PaperTrade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  currency: Currency;
  timestamp: string;
}

export interface ExchangeRate {
  from: Currency;
  to: Currency;
  rate: number;
  lastUpdated: string;
}

export interface PaperPortfolio {
  cash: number;
  initialCash: number;
  baseCurrency: Currency;
  positions: Array<{
    symbol: string;
    shares: number;
    averageCost: number;
    currency: Currency;
  }>;
  trades: PaperTrade[];
  watchlist: string[];
  startDate: string;
}