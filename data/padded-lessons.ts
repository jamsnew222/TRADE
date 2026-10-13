import { Lesson, QuizQuestion } from '@/types';

const baseCategories = [
  'Basics',
  'Orders',
  'Strategy',
  'Practice',
  'Technical Analysis',
  'Fundamental Analysis',
  'Advanced',
  'Options',
  'Forex',
  'Crypto',
  'Psychology',
  'Risk Management',
];

const buildPadQuestions = (lesson: Lesson, countToAdd: number): QuizQuestion[] => {
  if (countToAdd <= 0) return [];

  const topicLabel = lesson.title || 'this concept';
  const categoryPrefix = lesson.category || 'Trading';

  return Array.from({ length: countToAdd }, (_, index) => ({
    id: `${lesson.id}-pad-q${index + 1}`,
    question: `${topicLabel}: Which statement best reflects the most important idea for ${categoryPrefix.toLowerCase()}?`,
    options: [
      `The core concept behind ${topicLabel.toLowerCase()} is foundational to smart trading decisions.`,
      `This topic has no effect on market behavior or risk management.`,
      `Only advanced traders should care about ${topicLabel.toLowerCase()}.`,
      `It only matters after you already have a large portfolio.`
    ],
    correctAnswer: 0,
    explanation: `This reinforces the key takeaway that ${topicLabel.toLowerCase()} matters because it supports better decision-making, risk management, and long-term consistency.`
  }));
};

const ensureMinimumQuestions = (items: Lesson[]): Lesson[] => {
  return items.map((lesson) => {
    const content = { ...(lesson.content ?? {}) } as any;
    const questionArrays = [
      content.quiz ?? [],
      content.multipleChoice ?? [],
      content.trueFalse ?? [],
      content.multipleSelect ?? [],
      content.ordering ?? [],
      content.wordBank ?? [],
      content.flashcards ?? []
    ];

    const totalQuestions = questionArrays.reduce((sum, arr) => sum + arr.length, 0);

    if (totalQuestions >= 10) {
      return lesson;
    }

    const countToAdd = 10 - totalQuestions;
    const paddedQuiz = [...(content.quiz ?? []), ...buildPadQuestions(lesson, countToAdd)];

    return {
      ...lesson,
      content: {
        ...content,
        quiz: paddedQuiz
      }
    };
  });
};

export const lessons: Lesson[] = ensureMinimumQuestions([
  {
    id: 'intro-stocks',
    title: 'What is a Stock?',
    description: 'Learn the basics of what stocks are and how they work',
    type: 'quiz',
    difficulty: 'beginner',
    category: 'Basics',
    xpReward: 25,
    content: {
      explanation: 'A stock represents a share in the ownership of a company. When you buy a stock, you become a partial owner of that company. Stocks are bought and sold on stock exchanges like the New York Stock Exchange (NYSE) or NASDAQ.',
      quiz: []
    }
  }
]);

export const categories = baseCategories;

