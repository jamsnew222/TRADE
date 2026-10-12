import { Lesson, QuizQuestion } from '@/types';
import { lessons as baseLessons } from './lessons';

const safeCountQuestions = (lesson: Lesson): number => {
  const content = (lesson.content ?? {}) as any;
  return (
    (content.quiz ?? []).length +
    (content.multipleChoice ?? []).length +
    (content.trueFalse ?? []).length +
    (content.multipleSelect ?? []).length +
    (content.ordering ?? []).length +
    (content.wordBank ?? []).length +
    (content.flashcards ?? []).length
  );
};

export const padLessonQuestions = (lessons: Lesson[]): Lesson[] => {
  return lessons.map((lesson) => {
    const content = { ...(lesson.content ?? {}) } as any;
    const totalQuestions = safeCountQuestions(lesson);

    if (totalQuestions >= 10) {
      return lesson;
    }

    const needed = 10 - totalQuestions;
    const topic = lesson.title || 'This lesson';
    const category = lesson.category || 'Trading';

    const extra: QuizQuestion[] = Array.from({ length: needed }, (_, index) => ({
      id: `${lesson.id}-pad-q${index + 1}`,
      question: `${topic}: Which statement best summarizes the most important takeaway for ${category.toLowerCase()}?`,
      options: [
        `The core concept behind ${topic.toLowerCase()} is essential for making smarter decisions in ${category.toLowerCase()}.`,
        `This topic is mostly irrelevant unless you already have a large portfolio.`,
        `Only advanced traders benefit from understanding ${topic.toLowerCase()}.`,
        `The subject has little to no effect on risk, behavior, or market decisions.`
      ],
      correctAnswer: 0,
      explanation: `This reinforces the key lesson: ${topic.toLowerCase()} matters because it improves understanding, trade quality, and risk awareness in ${category.toLowerCase()}.`
    }));

    return {
      ...lesson,
      content: {
        ...content,
        quiz: [...(content.quiz ?? []), ...extra]
      }
    };
  });
};

export const lessons: Lesson[] = padLessonQuestions(baseLessons);

export const categories = [
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
  'Risk Management'
];
