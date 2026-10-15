'use client';

import { useState } from 'react';
import { Lesson, FlashcardQuestion } from '@/types';
import { ArrowRight, Sparkles, Target, ChevronRight, ChevronLeft, Flame, Crown, Heart, HeartCrack, RotateCcw } from 'lucide-react';
import { loadProgress, getStreakBonus, checkPremiumStatus } from '@/lib/progress';
import { recordQuestEvent } from '@/lib/quests';
import { buildQuestions } from '@/lib/lesson-questions';
import QuizCard from './questions/QuizCard';
import OrderingCard from './questions/OrderingCard';
import WordBankCard from './questions/WordBankCard';
import FlashcardCard from './questions/FlashcardCard';
import FillBlankCard from './questions/FillBlankCard';
import MatchingCard from './questions/MatchingCard';
import InteractiveCard from './questions/InteractiveCard';

const MAX_LIVES = 3;
const PREMIUM_REVIVES = 2;

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
  onUpgrade?: () => void;
}

export default function LessonView({ lesson, onComplete, onBack, onUpgrade }: LessonViewProps) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'learn' | 'exercise' | 'failed' | 'complete'>('intro');
  const [learnIndex, setLearnIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [revivesUsed, setRevivesUsed] = useState(0);

  const allQuestions = buildQuestions(lesson);
  const totalQuestions = allQuestions.length;

  // Build "learn before you're tested" study slides from the lesson's own content
  const learnSlides = (() => {
    const slides: { title: string; body: string; emoji: string }[] = [];
    const content = lesson.content;

    // Core explanation, chunked into short digestible cards
    const explanation = (content.explanation || '').trim();
    if (explanation) {
      const sentences = explanation.match(/[^.!?]+[.!?]+/g) || [explanation];
      for (let i = 0; i < sentences.length; i += 2) {
        slides.push({
          title: i === 0 ? 'The Core Idea' : 'Keep Going',
          body: sentences.slice(i, i + 2).join(' ').trim(),
          emoji: '💡'
        });
      }
    }

    // Key points drawn from what the quiz will test — skip generic padding text
    const isGeneric = (t: string) => t.toLowerCase().startsWith('this reinforces');
    const points: string[] = [];
    const pushPoint = (t?: string) => {
      const s = (t || '').trim();
      if (s && !isGeneric(s) && !points.includes(s) && points.length < 5) {
        points.push(s);
      }
    };
    allQuestions.forEach(q => pushPoint('explanation' in q ? q.explanation : undefined));
    if (content.fillBlank?.hint) pushPoint(content.fillBlank.hint);

    points.forEach((point, i) => {
      slides.push({ title: `Key Point ${i + 1} of ${points.length}`, body: point, emoji: '🔑' });
    });

    // Terms to know — matching pairs and flashcard fronts/backs
    const terms: string[] = [];
    (content.matching?.pairs || []).forEach((p: { left: string; right: string }) => terms.push(`${p.left} — ${p.right}`));
    (content.flashcards || []).forEach((f: FlashcardQuestion) => terms.push(`${f.front} — ${f.back}`));
    if (terms.length > 0) {
      slides.push({ title: 'Terms to Know', body: terms.join('\n'), emoji: '📖' });
    }

    return slides;
  })();

  const isLastQuestion = currentQuestion >= totalQuestions - 1;

  const handleResult = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      recordQuestEvent('correct', 1);
    } else {
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const advance = () => {
    if (isLastQuestion) {
      setCurrentStep('complete');
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleNext = () => {
    // Reaching zero lives shows the result first; failure lands on Next
    if (lives <= 0) {
      setCurrentStep('failed');
      return;
    }
    advance();
  };

  const handleRevive = () => {
    setRevivesUsed(prev => prev + 1);
    setLives(MAX_LIVES);
    setCurrentStep('exercise');
    advance();
  };

  const handleRestart = () => {
    setLives(MAX_LIVES);
    setRevivesUsed(0);
    setCorrectAnswers(0);
    setCurrentQuestion(0);
    setLearnIndex(0);
    setCurrentStep(learnSlides.length > 0 ? 'learn' : 'exercise');
  };

  const handleComplete = () => {
    const xpEarned = Math.round(lesson.xpReward * (correctAnswers / Math.max(1, totalQuestions)));
    onComplete(xpEarned);
  };

  if (currentStep === 'intro') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Lessons
        </button>

        <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl p-8 border-2 border-green-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20"></div>

          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4 shadow-lg">
                <span className="text-5xl">
                  {lesson.type === 'quiz' ? '❓' :
                   lesson.type === 'matching' ? '🔗' :
                   lesson.type === 'fill-blank' ? '✏️' :
                   lesson.type === 'multiple-choice' ? '📝' :
                   lesson.type === 'true-false' ? '✅' :
                   lesson.type === 'multiple-select' ? '☑️' :
                   lesson.type === 'ordering' ? '🔢' :
                   lesson.type === 'word-bank' ? '📝' :
                   lesson.type === 'flashcard' ? '🎴' :
                   lesson.type === 'drag-drop' ? '🎯' :
                   lesson.type === 'timeline' ? '📅' :
                   lesson.type === 'scenario' ? '🎬' : '🎮'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
              <p className="text-gray-600">{lesson.description}</p>
            </div>

            {lesson.content.explanation && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">
                    {learnSlides.length > 0 ? `You'll study ${learnSlides.length} quick cards, then get tested` : 'Learn'}
                  </h3>
                </div>
                <p className="text-blue-800 leading-relaxed">
                  {lesson.content.explanation.match(/[^.!?]+[.!?]+/)?.[0] || lesson.content.explanation}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-2 rounded-full">
                <span className="text-lg">⭐</span>
                <span className="font-semibold text-yellow-700">{lesson.xpReward} XP</span>
              </div>
              <button
                onClick={() => setCurrentStep(learnSlides.length > 0 ? 'learn' : 'exercise')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {learnSlides.length > 0 ? 'Start Learning' : 'Start Lesson'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'learn') {
    const slide = learnSlides[learnIndex];
    const isLastSlide = learnIndex === learnSlides.length - 1;

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>
          <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700 font-medium">Learn — {learnIndex + 1} of {learnSlides.length}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
          <div className="text-center mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Study this — the quiz covers it
            </span>
          </div>
          <div className="text-center mb-6">
            <span className="text-4xl">{slide.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">{slide.title}</h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm min-h-[140px] flex items-center justify-center">
            <div className="space-y-3">
              {slide.body.split('\n').map((line, i) => (
                <p key={i} className="text-gray-800 text-lg leading-relaxed text-center">{line}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {learnSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setLearnIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === learnIndex ? 'bg-blue-500 w-6' : i < learnIndex ? 'bg-blue-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 mt-6">
            {learnIndex > 0 && (
              <button
                onClick={() => setLearnIndex(prev => prev - 1)}
                className="px-6 py-3 rounded-full font-semibold border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-all flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (isLastSlide) {
                  setCurrentStep('exercise');
                } else {
                  setLearnIndex(prev => prev + 1);
                }
              }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLastSlide ? (
                <>
                  Ready — start the quiz
                  <Target className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'exercise') {
    if (totalQuestions === 0) {
      return <div className="text-center text-gray-600 py-12">Lesson type not implemented yet</div>;
    }

    const question = allQuestions[currentQuestion];
    const counterLabel = question.type === 'flashcard'
      ? `Card ${currentQuestion + 1} of ${totalQuestions}`
      : `Question ${currentQuestion + 1} of ${totalQuestions}`;

    // Each card owns its answer state; keying by index gives a fresh card per question
    const shared = {
      counterLabel,
      isLast: isLastQuestion,
      onBack,
      onResult: handleResult,
      onNext: handleNext,
    };

    const card = (() => {
      switch (question.type) {
        case 'ordering':
          return <OrderingCard key={currentQuestion} question={question} {...shared} />;
        case 'word-bank':
          return <WordBankCard key={currentQuestion} question={question} {...shared} />;
        case 'flashcard':
          return (
            <FlashcardCard
              key={currentQuestion}
              question={question}
              counterLabel={counterLabel}
              onBack={onBack}
              onAssess={(known) => { handleResult(known); handleNext(); }}
            />
          );
        case 'fill-blank':
          return <FillBlankCard key={currentQuestion} question={question} {...shared} />;
        case 'matching':
          return <MatchingCard key={currentQuestion} question={question} {...shared} />;
        case 'interactive':
          return (
            <InteractiveCard
              key={currentQuestion}
              question={question}
              counterLabel={counterLabel}
              onBack={onBack}
              onDone={() => { handleResult(true); handleNext(); }}
            />
          );
        default:
          return <QuizCard key={currentQuestion} question={question} {...shared} />;
      }
    })();

    return (
      <>
        {/* Lives bar — Duolingo-style hearts */}
        <div className="max-w-2xl mx-auto mb-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-1">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 transition-all ${
                  i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'
                } ${i === lives && lives < MAX_LIVES ? 'animate-pulse' : ''}`}
              />
            ))}
          </div>
          {revivesUsed > 0 && (
            <span className="text-xs font-medium text-amber-600">
              {PREMIUM_REVIVES - revivesUsed} revive{PREMIUM_REVIVES - revivesUsed === 1 ? '' : 's'} left
            </span>
          )}
        </div>
        {card}
      </>
    );
  }

  // Out of lives — free users restart, premium gets a limited "Keep Going"
  if (currentStep === 'failed') {
    const progress = loadProgress();
    const isPremium = checkPremiumStatus(progress);
    const revivesLeft = isPremium ? PREMIUM_REVIVES - revivesUsed : 0;

    return (
      <div className="max-w-md mx-auto animate-fade-in text-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-red-200">
          <div className="inline-flex p-4 bg-red-100 rounded-2xl mb-4">
            <HeartCrack className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Out of Lives</h1>
          <p className="text-gray-600 mb-6">
            You got {correctAnswers} of {totalQuestions} before running out of hearts.
          </p>

          {revivesLeft > 0 && (
            <button
              onClick={handleRevive}
              className="w-full mb-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Crown className="w-5 h-5" />
              Keep Going — {revivesLeft} premium revive{revivesLeft === 1 ? '' : 's'} left
            </button>
          )}

          <button
            onClick={handleRestart}
            className="w-full mb-3 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Restart Lesson
          </button>

          {!isPremium && onUpgrade && (
            <button
              onClick={onUpgrade}
              className="w-full mb-3 border-2 border-amber-400 text-amber-600 hover:bg-amber-50 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Crown className="w-5 h-5" />
              Premium gets {PREMIUM_REVIVES} revives per lesson
            </button>
          )}

          <button
            onClick={onBack}
            className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium py-2 transition-colors"
          >
            Quit to lessons
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'complete') {
    const xpEarned = Math.round(lesson.xpReward * (correctAnswers / Math.max(1, totalQuestions || 1)));
    const progress = loadProgress();
    const streakBonus = getStreakBonus(progress.currentStreak);
    const isPremium = checkPremiumStatus(progress);
    const premiumBonus = isPremium ? xpEarned : 0;
    const totalXP = xpEarned + streakBonus + premiumBonus;

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl p-8 border-2 border-green-200 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20"></div>

          <div className="relative z-10">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete!</h1>
            <p className="text-gray-600 mb-6">Great job completing {lesson.title}</p>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 mb-4 border border-yellow-200">
              <div className="flex items-center justify-center gap-2 text-yellow-600">
                <span className="text-3xl">⭐</span>
                <span className="text-3xl font-bold">{totalXP}</span>
                <span className="text-xl">XP earned</span>
              </div>
            </div>

            {isPremium && (
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-4 mb-4 border-2 border-yellow-300">
                <div className="flex items-center justify-center gap-2 text-yellow-700">
                  <Crown className="w-5 h-5" />
                  <span className="font-semibold">Premium Bonus: +{premiumBonus} XP (2x Multiplier)</span>
                </div>
              </div>
            )}

            {streakBonus > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 mb-4 border border-orange-200">
                <div className="flex items-center justify-center gap-2 text-orange-600">
                  <Flame className="w-5 h-5" />
                  <span className="font-semibold">Streak Bonus: +{streakBonus} XP</span>
                </div>
                <p className="text-sm text-orange-700 mt-1">
                  {progress.currentStreak} day streak!
                </p>
              </div>
            )}

            {totalQuestions > 0 && (
              <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-gray-700">
                  You got <span className="font-bold text-green-600">{correctAnswers}</span> out of <span className="font-bold">{totalQuestions}</span> questions correct
                </p>
              </div>
            )}

            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
