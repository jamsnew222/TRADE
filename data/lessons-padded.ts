import { Lesson, QuizQuestion } from '@/types';
import { lessons as baseLessons } from './lessons';
import { dayTradingLessons } from './day-trading-lessons';
import { advancedLessons } from './advanced-lessons';

const MIN_QUESTIONS = 10;

const safeCountQuestions = (lesson: Lesson): number => {
  const content = lesson.content ?? {};
  return (
    (content.quiz ?? []).length +
    (content.multipleChoice ?? []).length +
    (content.trueFalse ?? []).length +
    (content.multipleSelect ?? []).length +
    (content.ordering ?? []).length +
    (content.wordBank ?? []).length +
    (content.flashcards ?? []).length +
    (content.scenario ?? []).length
  );
};

const isGenericText = (t: string) => t.toLowerCase().startsWith('this reinforces');

// Real facts taught/tested by the lesson — pulled from its question explanations
const collectFacts = (lesson: Lesson): string[] => {
  const content = lesson.content ?? {};
  const facts: string[] = [];
  const push = (t?: string) => {
    const s = (t || '').trim();
    if (s && !isGenericText(s) && !facts.includes(s)) facts.push(s);
  };
  (['quiz', 'multipleChoice', 'trueFalse', 'multipleSelect', 'ordering', 'wordBank', 'flashcards', 'scenario'] as const)
    .forEach(key => ((content[key] ?? []) as { explanation?: string }[]).forEach(q => push(q.explanation)));
  push(content.fillBlank?.hint);
  return facts;
};

// Term -> definition pairs from matching exercises and flashcards
const collectTerms = (lesson: Lesson): { term: string; def: string }[] => {
  const content = lesson.content ?? {};
  const terms: { term: string; def: string }[] = [];
  (content.matching?.pairs ?? []).forEach((p: { left: string; right: string }) =>
    terms.push({ term: p.left, def: p.right }));
  (content.flashcards ?? []).forEach((f: { front: string; back: string }) =>
    terms.push({ term: f.front, def: f.back }));
  return terms;
};

const shuffle = <T>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const WRONG_STATEMENTS = [
  'This has no effect on trading outcomes or risk.',
  'This only matters for traders with very large accounts.',
  'This is an advanced concept beginners can safely ignore.',
  'This never influences real market decisions.',
];

// Generate real, varied padding questions from the lesson's own content
const buildExtraQuestions = (lesson: Lesson, count: number): QuizQuestion[] => {
  const facts = collectFacts(lesson);
  const terms = collectTerms(lesson);
  const questions: QuizQuestion[] = [];
  let i = 0;

  // Deterministic rotation through generators so types get mixed
  const makeId = () => `${lesson.id}-pad-q${i}`;

  const fromTerm = (): QuizQuestion | null => {
    if (i >= terms.length || terms.length < 2) return null;
    const t = terms[i % terms.length];
    const distractors = shuffle(terms.filter(x => x.def !== t.def).map(x => x.def)).slice(0, 3);
    while (distractors.length < 3) distractors.push(WRONG_STATEMENTS[distractors.length]);
    const options = shuffle([t.def, ...distractors]);
    return {
      id: makeId(),
      question: `What is "${t.term}"?`,
      options,
      correctAnswer: options.indexOf(t.def),
      explanation: `${t.term}: ${t.def}`
    };
  };

  const trueFalseFromFact = (): QuizQuestion | null => {
    if (i >= facts.length) return null;
    const fact = facts[i % facts.length];
    return {
      id: makeId(),
      type: 'true-false',
      question: `True or False: ${fact}`,
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: fact
    };
  };

  const whichIsTrue = (): QuizQuestion | null => {
    if (i >= facts.length) return null;
    const fact = facts[i % facts.length];
    const options = shuffle([fact, ...WRONG_STATEMENTS.slice(0, 3)]);
    return {
      id: makeId(),
      question: `Which of the following is TRUE about ${lesson.title}?`,
      options,
      correctAnswer: options.indexOf(fact),
      explanation: fact
    };
  };

  const generic = (): QuizQuestion => {
    const templates: QuizQuestion[] = [
      {
        id: makeId(),
        question: `${lesson.title}: Why does this topic matter for traders?`,
        options: [
          'It improves decision-making, risk awareness, and consistency.',
          'It only matters for professional fund managers.',
          'It is mostly trivia with no practical use.',
          'It guarantees profits on every trade.'
        ],
        correctAnswer: 0,
        explanation: `Understanding ${lesson.title.toLowerCase()} helps you make smarter, more disciplined trading decisions.`
      },
      {
        id: makeId(),
        type: 'true-false',
        question: `True or False: Understanding ${lesson.title.toLowerCase()} can improve your trading decisions.`,
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: `Yes — this concept directly supports better decision-making and risk management.`
      },
      {
        id: makeId(),
        question: `What is the best way to apply what you learned in "${lesson.title}"?`,
        options: [
          'Practice it in the simulator and review the key points regularly.',
          'Memorize it once and never revisit it.',
          'Only use it after years of trading experience.',
          'Ignore it when real money is involved.'
        ],
        correctAnswer: 0,
        explanation: 'Consistent practice and review turn knowledge into skill — that is why the simulator exists.'
      },
      {
        id: makeId(),
        type: 'true-false',
        question: `True or False: ${lesson.title} is only relevant to advanced traders.`,
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: `False — ${lesson.title.toLowerCase()} is useful at every level, starting from your very first trade.`
      },
    ];
    return templates[i % templates.length];
  };

  const generators = [fromTerm, trueFalseFromFact, whichIsTrue];
  while (questions.length < count) {
    // Try each generator in turn so question types stay mixed
    let q: QuizQuestion | null = null;
    for (let g = 0; g < generators.length && !q; g++) {
      q = generators[(i + g) % generators.length]();
    }
    const next = q && !questions.some(e => e.question === q.question) ? q : generic();
    questions.push(next);
    i++;
  }

  return questions;
};

export const padLessonQuestions = (lessons: Lesson[]): Lesson[] => {
  return lessons.map((lesson) => {
    const content = { ...(lesson.content ?? {}) };
    const totalQuestions = safeCountQuestions(lesson);

    if (totalQuestions >= MIN_QUESTIONS) {
      return lesson;
    }

    const extra = buildExtraQuestions(lesson, MIN_QUESTIONS - totalQuestions);

    return {
      ...lesson,
      content: {
        ...content,
        quiz: [...(content.quiz ?? []), ...extra]
      }
    };
  });
};

export const lessons: Lesson[] = padLessonQuestions([...baseLessons, ...dayTradingLessons, ...advancedLessons]);

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
