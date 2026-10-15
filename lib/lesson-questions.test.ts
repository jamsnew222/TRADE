import { describe, it, expect } from 'vitest';
import { buildQuestions } from '@/lib/lesson-questions';
import { Lesson } from '@/types';

const baseLesson = (content: Lesson['content'], type: Lesson['type'] = 'quiz'): Lesson => ({
  id: 'l1',
  title: 'Test Lesson',
  description: 'desc',
  type,
  difficulty: 'beginner',
  category: 'stocks',
  xpReward: 50,
  content,
});

describe('buildQuestions', () => {
  it('maps quiz questions and preserves embedded type', () => {
    const lesson = baseLesson({
      quiz: [
        { id: 'q1', question: 'Q?', options: ['a', 'b'], correctAnswer: 0, explanation: 'e' },
        { id: 'q2', question: 'Multi?', options: ['a', 'b'], correctAnswer: 0, correctAnswers: [0, 1], explanation: 'e', type: 'multiple-select' },
      ],
    });
    const qs = buildQuestions(lesson);
    expect(qs).toHaveLength(2);
    expect(qs[0].type).toBe('quiz');
    expect(qs[1].type).toBe('multiple-select');
  });

  it('normalizes true-false items into quiz shape (statement -> question, boolean -> index)', () => {
    const lesson = baseLesson({
      trueFalse: [
        { id: 't1', statement: 'The sky is blue', correctAnswer: true, explanation: 'e' },
        { id: 't2', statement: 'The sky is green', correctAnswer: false, explanation: 'e' },
      ],
    });
    const qs = buildQuestions(lesson);
    expect(qs[0]).toMatchObject({ type: 'true-false', question: 'The sky is blue', correctAnswer: 0, options: ['True', 'False'] });
    expect(qs[1]).toMatchObject({ type: 'true-false', correctAnswer: 1 });
  });

  it('normalizes multiple-select items preserving correctAnswers', () => {
    const lesson = baseLesson({
      multipleSelect: [{ id: 'm1', question: 'Pick all', options: ['a', 'b', 'c'], correctAnswers: [0, 2], explanation: 'e' }],
    });
    const qs = buildQuestions(lesson);
    expect(qs[0]).toMatchObject({ type: 'multiple-select', correctAnswers: [0, 2] });
  });

  it('passes ordering, word-bank and flashcard questions through with their type', () => {
    const lesson = baseLesson({
      ordering: [{ id: 'o1', instruction: 'Order', items: ['a', 'b'], correctOrder: [0, 1], explanation: 'e' }],
      wordBank: [{ id: 'w1', instruction: 'Pick', sentence: 's', words: ['x'], correctWords: ['x'], explanation: 'e' }],
      flashcards: [{ id: 'f1', front: 'term', back: 'def' }],
    });
    const types = buildQuestions(lesson).map(q => q.type);
    expect(types).toEqual(['ordering', 'word-bank', 'flashcard']);
  });

  it('converts scenario questions to quiz cards combining scenario and question text', () => {
    const lesson = baseLesson({
      scenario: [{ id: 's1', scenario: 'Market crashes', question: 'What do you do?', options: ['sell', 'hold'], correctAnswer: 1, explanation: 'e' }],
    });
    const qs = buildQuestions(lesson);
    expect(qs[0]).toMatchObject({ type: 'quiz', correctAnswer: 1 });
    expect((qs[0] as { question: string }).question).toContain('Market crashes');
  });

  it('converts timeline events into an ordering question', () => {
    const lesson = baseLesson({
      timeline: {
        id: 'tl1', instruction: 'Order events', explanation: 'e',
        events: [{ id: 'e1', description: 'First', date: '2000' }, { id: 'e2', description: 'Second', date: '2001' }],
        correctOrder: ['e1', 'e2'],
      },
    });
    const qs = buildQuestions(lesson);
    expect(qs[0]).toMatchObject({ type: 'ordering', items: ['First', 'Second'], correctOrder: [0, 1] });
  });

  it('converts drag-drop items into per-item category quiz cards', () => {
    const lesson = baseLesson({
      dragDrop: {
        id: 'd1', instruction: 'Sort these', explanation: 'e', categories: ['Stock', 'Bond'],
        items: [{ id: 'i1', content: 'Apple', category: 'Stock' }, { id: 'i2', content: 'Treasury', category: 'Bond' }],
      },
    });
    const qs = buildQuestions(lesson);
    expect(qs).toHaveLength(2);
    expect(qs[0]).toMatchObject({ type: 'quiz', correctAnswer: 0, options: ['Stock', 'Bond'] });
    expect(qs[1]).toMatchObject({ type: 'quiz', correctAnswer: 1 });
  });

  it('appends fillBlank, matching and interactive as cards', () => {
    const lesson = baseLesson({
      fillBlank: { id: 'fb1', sentence: 'A _____ rises', correctAnswer: 'stock', hint: 'h' },
      matching: { id: 'ma1', instruction: 'Match', pairs: [{ left: 'a', right: 'b' }] },
      interactive: { scenario: 'scene', steps: ['s1'] },
    });
    const types = buildQuestions(lesson).map(q => q.type);
    expect(types).toEqual(['fill-blank', 'matching', 'interactive']);
  });

  it('returns empty array for empty content', () => {
    expect(buildQuestions(baseLesson({}))).toEqual([]);
  });
});
