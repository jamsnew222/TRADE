import { Lesson, QuizQuestion, OrderingQuestion, WordBankQuestion, FlashcardQuestion, FillBlankExercise, MatchingExercise } from '@/types';

export interface InteractiveQuestion {
  type: 'interactive';
  id: string;
  scenario: string;
  steps: string[];
}

export type AnyQuestion =
  | (QuizQuestion & { type: 'quiz' | 'multiple-choice' | 'true-false' | 'multiple-select' })
  | (OrderingQuestion & { type: 'ordering' })
  | (WordBankQuestion & { type: 'word-bank' })
  | (FlashcardQuestion & { type: 'flashcard' })
  | (FillBlankExercise & { type: 'fill-blank' })
  | (MatchingExercise & { type: 'matching' })
  | InteractiveQuestion;

// Normalize every content shape into one question list, dispatched by `type`.
// trueFalse/multipleSelect/scenario items are adapted to the QuizQuestion shape,
// timeline becomes an ordering question, drag-drop becomes per-item quizzes,
// and lesson-level exercises (fillBlank/matching/interactive) become cards.
export const buildQuestions = (lesson: Lesson): AnyQuestion[] => {
  const content = lesson.content;
  const questions: AnyQuestion[] = [
    ...(content.quiz || []).map((q): AnyQuestion => ({
      ...q,
      type: q.type ?? 'quiz',
    })),
    ...(content.multipleChoice || []).map((q): AnyQuestion => ({ ...q, type: 'multiple-choice' })),
    ...(content.trueFalse || []).map((q): AnyQuestion => ({
      id: q.id,
      question: q.statement,
      options: ['True', 'False'],
      correctAnswer: q.correctAnswer ? 0 : 1,
      explanation: q.explanation,
      type: 'true-false',
    })),
    ...(content.multipleSelect || []).map((q): AnyQuestion => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: -1,
      correctAnswers: q.correctAnswers,
      explanation: q.explanation,
      type: 'multiple-select',
    })),
    ...(content.ordering || []).map((q): AnyQuestion => ({ ...q, type: 'ordering' })),
    ...(content.wordBank || []).map((q): AnyQuestion => ({ ...q, type: 'word-bank' })),
    ...(content.flashcards || []).map((q): AnyQuestion => ({ ...q, type: 'flashcard' })),
    ...(content.scenario || []).map((q): AnyQuestion => ({
      id: q.id,
      question: q.scenario ? `${q.scenario} — ${q.question}` : q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      type: 'quiz',
    })),
    // Timeline events render through the ordering card
    ...(content.timeline ? [{
      id: content.timeline.id,
      instruction: content.timeline.instruction,
      items: content.timeline.events.map(e => e.description),
      correctOrder: content.timeline.correctOrder.map(id => content.timeline!.events.findIndex(e => e.id === id)),
      explanation: content.timeline.explanation,
      type: 'ordering' as const,
    }] : []),
    // Drag-drop items become per-item "which category?" quiz cards
    ...(content.dragDrop?.items || []).map((item, i): AnyQuestion => ({
      id: `${content.dragDrop!.id}-${i}`,
      question: `Which category does "${item.content}" belong to?`,
      options: content.dragDrop!.categories,
      correctAnswer: content.dragDrop!.categories.indexOf(item.category),
      explanation: content.dragDrop!.explanation,
      type: 'quiz',
    })),
  ];
  if (content.fillBlank) {
    questions.push({ ...(content.fillBlank as FillBlankExercise), type: 'fill-blank' });
  }
  if (content.matching) {
    questions.push({ ...(content.matching as MatchingExercise), type: 'matching' });
  }
  if (content.interactive) {
    questions.push({
      type: 'interactive',
      id: `${lesson.id}-interactive`,
      scenario: content.interactive.scenario,
      steps: content.interactive.steps,
    });
  }
  return questions;
};
