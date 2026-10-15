import { describe, it, expect } from 'vitest';
import { lessons } from './lessons-padded';
import { buildQuestions, AnyQuestion } from '@/lib/lesson-questions';

/**
 * Structural validation of the entire lesson corpus — catches malformed
 * questions (bad answer indices, empty options, non-permutation ordering)
 * before they crash a question card in production.
 */

const validateQuestion = (q: AnyQuestion, ctx: string): string[] => {
  const errors: string[] = [];
  const fail = (msg: string) => errors.push(`${ctx}: ${msg}`);

  if (!q.id) fail('missing id');

  switch (q.type) {
    case 'quiz':
    case 'multiple-choice':
    case 'true-false': {
      if (!q.question?.trim()) fail('empty question text');
      if (!Array.isArray(q.options) || q.options.length < 2) fail('needs >= 2 options');
      else if (q.options.some(o => !o?.trim())) fail('empty option text');
      if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= (q.options?.length ?? 0)) {
        fail(`correctAnswer ${q.correctAnswer} out of range (options: ${q.options?.length})`);
      }
      break;
    }
    case 'multiple-select': {
      if (!q.question?.trim()) fail('empty question text');
      if (!Array.isArray(q.options) || q.options.length < 2) fail('needs >= 2 options');
      if (!Array.isArray(q.correctAnswers) || q.correctAnswers.length === 0) fail('no correct answers');
      else {
        if (q.correctAnswers.some(i => i < 0 || i >= (q.options?.length ?? 0))) fail('correctAnswers index out of range');
        if (q.correctAnswers.length === q.options?.length) fail('all options correct — not a real selection');
      }
      break;
    }
    case 'ordering': {
      const n = q.items?.length ?? 0;
      if (n < 2) fail('needs >= 2 items');
      if (!Array.isArray(q.correctOrder) || q.correctOrder.length !== n) {
        fail('correctOrder length mismatch');
      } else {
        const sorted = [...q.correctOrder].sort((a, b) => a - b);
        if (!sorted.every((v, i) => v === i)) fail('correctOrder is not a permutation of indices');
      }
      break;
    }
    case 'word-bank': {
      if (!Array.isArray(q.words) || q.words.length === 0) fail('no words');
      if (!Array.isArray(q.correctWords) || q.correctWords.length === 0) fail('no correctWords');
      else if (q.words && !q.correctWords.every(w => q.words!.includes(w))) fail('correctWords not present in words');
      if (!q.sentence?.trim()) fail('empty sentence');
      break;
    }
    case 'flashcard': {
      if (!q.front?.trim() || !q.back?.trim()) fail('flashcard needs front and back');
      break;
    }
    case 'fill-blank': {
      if (!q.sentence?.trim()) fail('empty sentence');
      if (!q.correctAnswer?.toString().trim()) fail('missing correctAnswer');
      if (!q.sentence?.includes('_____')) fail('sentence has no _____ blank marker');
      break;
    }
    case 'matching': {
      if (!Array.isArray(q.pairs) || q.pairs.length < 2) fail('needs >= 2 pairs');
      else if (q.pairs.some(p => !p.left?.trim() || !p.right?.trim())) fail('empty pair side');
      break;
    }
    case 'interactive': {
      if (!q.scenario?.trim()) fail('empty scenario');
      if (!Array.isArray(q.steps) || q.steps.length === 0) fail('no steps');
      break;
    }
    default:
      fail(`unknown question type: ${(q as AnyQuestion).type}`);
  }
  return errors;
};

describe('lesson corpus validation', () => {
  it('has unique lesson IDs', () => {
    const ids = lessons.map(l => l.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it('every lesson teaches before testing (has explanation)', () => {
    const missing = lessons.filter(l => !l.content?.explanation?.trim()).map(l => l.id);
    expect(missing).toEqual([]);
  });

  it('every lesson has >= 10 questions', () => {
    const short = lessons
      .map(l => ({ id: l.id, n: buildQuestions(l).length }))
      .filter(l => l.n < 10);
    expect(short).toEqual([]);
  });

  it('every question in every lesson is structurally valid', () => {
    const errors: string[] = [];
    for (const lesson of lessons) {
      const questions = buildQuestions(lesson);
      questions.forEach((q, i) => {
        errors.push(...validateQuestion(q, `${lesson.id} q${i} [${q.type}]`));
      });
    }
    expect(errors).toEqual([]);
  });

  it('every lesson has valid metadata', () => {
    const errors: string[] = [];
    for (const l of lessons) {
      if (!l.title?.trim()) errors.push(`${l.id}: no title`);
      if (!l.description?.trim()) errors.push(`${l.id}: no description`);
      if (!l.xpReward || l.xpReward <= 0) errors.push(`${l.id}: bad xpReward`);
      if (!l.category?.trim()) errors.push(`${l.id}: no category`);
      if (!['beginner', 'intermediate', 'advanced'].includes(l.difficulty)) {
        errors.push(`${l.id}: bad difficulty '${l.difficulty}'`);
      }
    }
    expect(errors).toEqual([]);
  });
});
