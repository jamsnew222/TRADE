import { Achievement } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    requirement: {
      type: 'lessons_completed',
      value: 1
    },
    unlocked: false
  },
  {
    id: 'xp_collector',
    title: 'XP Collector',
    description: 'Earn 100 total XP',
    icon: '⭐',
    requirement: {
      type: 'total_xp',
      value: 100
    },
    unlocked: false
  },
  {
    id: 'xp_legend',
    title: 'XP Legend',
    description: 'Earn 500 total XP',
    icon: '🌟',
    requirement: {
      type: 'total_xp',
      value: 500
    },
    unlocked: false
  },
  {
    id: 'xp_master',
    title: 'XP Master',
    description: 'Earn 1000 total XP',
    icon: '💎',
    requirement: {
      type: 'total_xp',
      value: 1000
    },
    unlocked: false
  },
  {
    id: 'xp_champion',
    title: 'XP Champion',
    description: 'Earn 2000 total XP',
    icon: '👑',
    requirement: {
      type: 'total_xp',
      value: 2000
    },
    unlocked: false
  },
  {
    id: 'xp_titan',
    title: 'XP Titan',
    description: 'Earn 5000 total XP',
    icon: '💫',
    requirement: {
      type: 'total_xp',
      value: 5000
    },
    unlocked: false
  },
  {
    id: 'xp_mythic',
    title: 'XP Mythic',
    description: 'Earn 10000 total XP',
    icon: '⚡',
    requirement: {
      type: 'total_xp',
      value: 10000
    },
    unlocked: false
  },
  {
    id: 'streak_start',
    title: 'On Fire',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    requirement: {
      type: 'streak',
      value: 3
    },
    unlocked: false
  },
  {
    id: 'streak_master',
    title: 'Unstoppable',
    description: 'Maintain a 7-day streak',
    icon: '💪',
    requirement: {
      type: 'streak',
      value: 7
    },
    unlocked: false
  },
  {
    id: 'streak_legend',
    title: 'Dedicated Learner',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    requirement: {
      type: 'streak',
      value: 30
    },
    unlocked: false
  },
  {
    id: 'basics_complete',
    title: 'Basics Master',
    description: 'Complete all Basics lessons',
    icon: '🎓',
    requirement: {
      type: 'category_completed',
      value: 30,
      category: 'Basics'
    },
    unlocked: false
  },
  {
    id: 'orders_complete',
    title: 'Order Expert',
    description: 'Complete all Orders lessons',
    icon: '📋',
    requirement: {
      type: 'category_completed',
      value: 8,
      category: 'Orders'
    },
    unlocked: false
  },
  {
    id: 'strategy_complete',
    title: 'Strategy Guru',
    description: 'Complete all Strategy lessons',
    icon: '🧠',
    requirement: {
      type: 'category_completed',
      value: 20,
      category: 'Strategy'
    },
    unlocked: false
  },
  {
    id: 'technical_complete',
    title: 'Technical Analyst',
    description: 'Complete all Technical Analysis lessons',
    icon: '📈',
    requirement: {
      type: 'category_completed',
      value: 15,
      category: 'Technical Analysis'
    },
    unlocked: false
  },
  {
    id: 'fundamental_complete',
    title: 'Fundamental Analyst',
    description: 'Complete all Fundamental Analysis lessons',
    icon: '🔍',
    requirement: {
      type: 'category_completed',
      value: 10,
      category: 'Fundamental Analysis'
    },
    unlocked: false
  },
  {
    id: 'advanced_complete',
    title: 'Advanced Trader',
    description: 'Complete all Advanced lessons',
    icon: '🚀',
    requirement: {
      type: 'category_completed',
      value: 8,
      category: 'Advanced'
    },
    unlocked: false
  },
  {
    id: 'options_complete',
    title: 'Options Master',
    description: 'Complete all Options lessons',
    icon: '📊',
    requirement: {
      type: 'category_completed',
      value: 5,
      category: 'Options'
    },
    unlocked: false
  },
  {
    id: 'forex_complete',
    title: 'Forex Trader',
    description: 'Complete all Forex lessons',
    icon: '💱',
    requirement: {
      type: 'category_completed',
      value: 5,
      category: 'Forex'
    },
    unlocked: false
  },
  {
    id: 'crypto_complete',
    title: 'Crypto Expert',
    description: 'Complete all Crypto lessons',
    icon: '₿',
    requirement: {
      type: 'category_completed',
      value: 5,
      category: 'Crypto'
    },
    unlocked: false
  },
  {
    id: 'psychology_complete',
    title: 'Trading Psychologist',
    description: 'Complete all Psychology lessons',
    icon: '🧠',
    requirement: {
      type: 'category_completed',
      value: 5,
      category: 'Psychology'
    },
    unlocked: false
  },
  {
    id: 'risk_complete',
    title: 'Risk Manager',
    description: 'Complete all Risk Management lessons',
    icon: '🛡️',
    requirement: {
      type: 'category_completed',
      value: 5,
      category: 'Risk Management'
    },
    unlocked: false
  },
  {
    id: 'lesson_master',
    title: 'Lesson Master',
    description: 'Complete 25 lessons',
    icon: '📚',
    requirement: {
      type: 'lessons_completed',
      value: 25
    },
    unlocked: false
  },
  {
    id: 'lesson_expert',
    title: 'Lesson Expert',
    description: 'Complete 50 lessons',
    icon: '📖',
    requirement: {
      type: 'lessons_completed',
      value: 50
    },
    unlocked: false
  },
  {
    id: 'lesson_legend',
    title: 'Lesson Legend',
    description: 'Complete 75 lessons',
    icon: '👑',
    requirement: {
      type: 'lessons_completed',
      value: 75
    },
    unlocked: false
  },
  {
    id: 'lesson_grandmaster',
    title: 'Lesson Grandmaster',
    description: 'Complete 100 lessons',
    icon: '🏆',
    requirement: {
      type: 'lessons_completed',
      value: 100
    },
    unlocked: false
  }
];