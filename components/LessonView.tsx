'use client';

import { useState } from 'react';
import { Lesson, QuizQuestion, OrderingQuestion, WordBankQuestion, FlashcardQuestion, DragDropQuestion, TimelineQuestion, ScenarioQuestion } from '@/types';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Sparkles, Target, Clock, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, FlipHorizontal, Flame, Crown } from 'lucide-react';
import { loadProgress, getStreakBonus, checkPremiumStatus, getPremiumMultiplier } from '@/lib/progress';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

export default function LessonView({ lesson, onComplete, onBack }: LessonViewProps) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'exercise' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [matchingState, setMatchingState] = useState<{ selectedLeft: string | null; matches: Array<{left: string; right: string}> }>({
    selectedLeft: null,
    matches: []
  });
  const [selectedMultipleSelect, setSelectedMultipleSelect] = useState<number[]>([]);
  const [orderingItems, setOrderingItems] = useState<number[]>([]);
  const [wordBankSelection, setWordBankSelection] = useState<string[]>([]);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  const allQuestions = [
    ...(lesson.content.quiz || []).map(q => ({ ...q, type: 'quiz' as const })),
    ...(lesson.content.multipleChoice || []).map(q => ({ ...q, type: 'multiple-choice' as const })),
    ...(lesson.content.trueFalse || []).map(q => ({ ...q, type: 'true-false' as const })),
    ...(lesson.content.multipleSelect || []).map(q => ({ ...q, type: 'multiple-select' as const })),
    ...(lesson.content.ordering || []).map(q => ({ ...q, type: 'ordering' as const })),
    ...(lesson.content.wordBank || []).map(q => ({ ...q, type: 'word-bank' as const })),
    ...(lesson.content.flashcards || []).map(q => ({ ...q, type: 'flashcard' as const }))
  ];

  const totalQuestions = allQuestions.length;
  const currentQuestionData = allQuestions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    const currentQ = currentQuestionData as QuizQuestion;

    if (currentQ.type === 'multiple-select') {
      setSelectedMultipleSelect(prev => {
        if (prev.includes(answerIndex)) {
          return prev.filter(i => i !== answerIndex);
        } else {
          return [...prev, answerIndex];
        }
      });
      return;
    }

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQ.correctAnswer;
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const submitMultipleSelect = () => {
    if (showResult) return;

    const currentQ = currentQuestionData as QuizQuestion;
    const correctSet = new Set(currentQ.correctAnswers || []);
    const selectedSet = new Set(selectedMultipleSelect);
    const isCorrect = selectedSet.size === correctSet.size &&
                   selectedMultipleSelect.every(i => correctSet.has(i));

    setShowResult(true);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setSelectedMultipleSelect([]);
      setOrderingItems([]);
      setWordBankSelection([]);
      setFlashcardFlipped(false);
    } else {
      setCurrentStep('complete');
    }
  };

  const handleMatching = (left: string, right: string) => {
    if (matchingState.matches.some(m => m.left === left || m.right === right)) return;
    setMatchingState(prev => ({
      ...prev,
      matches: [...prev.matches, { left, right }]
    }));
  };

  const checkMatching = () => {
    const correctPairs = lesson.content.matching?.pairs || [];
    const allCorrect = matchingState.matches.every(match =>
      correctPairs.some(pair => pair.left === match.left && pair.right === match.right)
    ) && matchingState.matches.length === correctPairs.length;

    if (allCorrect) {
      setCurrentStep('complete');
    } else {
      setMatchingState({ selectedLeft: null, matches: [] });
    }
  };

  const handleFillBlank = (answer: string) => {
    const correctAnswer = lesson.content.fillBlank?.correctAnswer.toLowerCase();
    if (answer.toLowerCase().trim() === correctAnswer) {
      setCurrentStep('complete');
    }
  };

  const handleComplete = () => {
    const xpEarned = Math.round(lesson.xpReward * (correctAnswers / Math.max(1, totalQuestions)));
    onComplete(xpEarned);
  };

  const handleOrderingSwap = (index1: number, index2: number) => {
    const newOrder = [...orderingItems];
    [newOrder[index1], newOrder[index2]] = [newOrder[index2], newOrder[index1]];
    setOrderingItems(newOrder);
  };

  const checkOrdering = () => {
    const question = currentQuestionData as OrderingQuestion;
    const isCorrect = orderingItems.every((item, index) => item === question.correctOrder[index]);
    setShowResult(true);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleWordBankClick = (word: string) => {
    if (wordBankSelection.includes(word)) {
      setWordBankSelection(prev => prev.filter(w => w !== word));
    } else {
      setWordBankSelection(prev => [...prev, word]);
    }
  };

  const checkWordBank = () => {
    const question = currentQuestionData as WordBankQuestion;
    const isCorrect = wordBankSelection.length === question.correctWords.length &&
                     wordBankSelection.every(w => question.correctWords.includes(w));
    setShowResult(true);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleFlashcardAnswer = (known: boolean) => {
    if (known) {
      setCorrectAnswers(prev => prev + 1);
    }
    if (currentQuestion < totalQuestions - 1) {
      handleNext();
    } else {
      setCurrentStep('complete');
    }
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
                  <h3 className="font-semibold text-blue-900">Learn</h3>
                </div>
                <p className="text-blue-800 leading-relaxed">{lesson.content.explanation}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-2 rounded-full">
                <span className="text-lg">⭐</span>
                <span className="font-semibold text-yellow-700">{lesson.xpReward} XP</span>
              </div>
              <button
                onClick={() => setCurrentStep('exercise')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'exercise') {
    // Quiz / Multiple Choice
    if (lesson.type === 'quiz' || lesson.type === 'multiple-choice') {
      const question = currentQuestionData as QuizQuestion;

      if (question.type === 'true-false') {
        return (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back
              </button>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600 font-medium">Question {currentQuestion + 1} of {totalQuestions}</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer(0)}
                  disabled={showResult}
                  className={`p-6 rounded-2xl border-2 font-semibold transition-all transform hover:scale-105 ${
                    showResult
                      ? selectedAnswer === 0 && question.correctAnswer === 0
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                        : selectedAnswer === 0
                          ? 'border-red-500 bg-red-50 text-red-700 shadow-lg'
                          : 'border-gray-200 text-gray-400'
                      : selectedAnswer === 0
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                        : 'border-gray-200 hover:border-green-400 text-gray-700'
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => handleAnswer(1)}
                  disabled={showResult}
                  className={`p-6 rounded-2xl border-2 font-semibold transition-all transform hover:scale-105 ${
                    showResult
                      ? selectedAnswer === 1 && question.correctAnswer === 1
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                        : selectedAnswer === 1
                          ? 'border-red-500 bg-red-50 text-red-700 shadow-lg'
                          : 'border-gray-200 text-gray-400'
                      : selectedAnswer === 1
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                        : 'border-gray-200 hover:border-green-400 text-gray-700'
                  }`}
                >
                  False
                </button>
              </div>

              {showResult && (
                <div className={`p-4 rounded-2xl mt-6 ${selectedAnswer === question.correctAnswer ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                      {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
              )}

              {showResult && (
                <button
                  onClick={handleNext}
                  className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Complete Lesson'}
                </button>
              )}
            </div>
          </div>
        );
      }

      if (question.type === 'multiple-select') {
        return (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back
              </button>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600 font-medium">Question {currentQuestion + 1} of {totalQuestions}</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl p-8 border-2 border-purple-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{question.question}</h2>
              <p className="text-gray-600 mb-4">Select all that apply</p>

              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all transform hover:scale-[1.02] ${
                      selectedMultipleSelect.includes(index)
                        ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                        : 'border-gray-200 hover:border-purple-400 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                        selectedMultipleSelect.includes(index)
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedMultipleSelect.includes(index) && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedMultipleSelect.length > 0 && !showResult && (
                <button
                  onClick={submitMultipleSelect}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Submit Answer
                </button>
              )}

              {showResult && question.correctAnswers && (
                <div className={`p-4 rounded-2xl mt-6 ${
                  selectedMultipleSelect.length === question.correctAnswers?.length &&
                  selectedMultipleSelect.every(i => question.correctAnswers?.includes(i))
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedMultipleSelect.length === question.correctAnswers?.length &&
                     selectedMultipleSelect.every(i => question.correctAnswers?.includes(i)) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${
                      selectedMultipleSelect.length === question.correctAnswers?.length &&
                      selectedMultipleSelect.every(i => question.correctAnswers?.includes(i))
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
                      {selectedMultipleSelect.length === question.correctAnswers?.length &&
                       selectedMultipleSelect.every(i => question.correctAnswers?.includes(i))
                        ? 'Correct!'
                        : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
              )}

              {showResult && (
                <button
                  onClick={handleNext}
                  className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Complete Lesson'}
                </button>
              )}
            </div>
          </div>
        );
      }

      return (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">Question {currentQuestion + 1} of {totalQuestions}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-xl p-8 border-2 border-indigo-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;

                let buttonClass = 'border-2 border-gray-200 hover:border-indigo-400';
                if (showResult && isSelected) {
                  buttonClass = isCorrect
                    ? 'border-2 border-green-500 bg-green-50 shadow-lg'
                    : 'border-2 border-red-500 bg-red-50 shadow-lg';
                } else if (showResult && isCorrect) {
                  buttonClass = 'border-2 border-green-500 bg-green-50 shadow-lg';
                } else if (isSelected) {
                  buttonClass = 'border-2 border-indigo-500 bg-indigo-50 shadow-lg';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-2xl transition-all transform hover:scale-[1.02] ${buttonClass}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && isSelected && (
                        isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <p className="text-blue-800 font-medium">{question.explanation}</p>
              </div>
            )}

            {showResult && (
              <button
                onClick={handleNext}
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {currentQuestion < totalQuestions - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  'Complete Lesson'
                )}
              </button>
            )}
          </div>
        </div>
      );
    }

    // Matching Exercise
    if (lesson.type === 'matching') {
      const pairs = lesson.content.matching?.pairs || [];
      const allMatched = matchingState.matches.length === pairs.length;

      return (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>

          <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl p-8 border-2 border-orange-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-6">{lesson.content.matching?.instruction}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {pairs.map((pair, index) => {
                  const isMatched = matchingState.matches.some(m => m.left === pair.left);
                  return (
                    <button
                      key={`left-${index}`}
                      disabled={isMatched}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isMatched ? 'border-green-500 bg-green-50 text-gray-400' : 'border-gray-200 hover:border-orange-400'
                      }`}
                    >
                      {pair.left}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                {pairs.map((pair, index) => {
                  const isMatched = matchingState.matches.some(m => m.right === pair.right);
                  return (
                    <button
                      key={`right-${index}`}
                      disabled={isMatched}
                      onClick={() => !isMatched && handleMatching(pair.left, pair.right)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isMatched ? 'border-green-500 bg-green-50 text-gray-400' : 'border-gray-200 hover:border-orange-400'
                      }`}
                    >
                      {pair.right}
                    </button>
                  );
                })}
              </div>
            </div>

            {allMatched && (
              <button
                onClick={checkMatching}
                className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Check Answers
              </button>
            )}

            {matchingState.matches.length > 0 && !allMatched && (
              <button
                onClick={() => setMatchingState({ selectedLeft: null, matches: [] })}
                className="mt-4 w-full text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            )}
          </div>
        </div>
      );
    }

    // Fill in the Blank
    if (lesson.type === 'fill-blank') {
      const [answer, setAnswer] = useState('');

      return (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>

          <div className="bg-gradient-to-br from-white to-cyan-50 rounded-3xl shadow-xl p-8 border-2 border-cyan-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-6">Fill in the blank to complete the sentence.</p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 mb-6 border border-cyan-100">
              <p className="text-cyan-900 text-lg leading-relaxed">
                {lesson.content.fillBlank?.sentence.split('_____').map((part, index) => (
                  <span key={index}>
                    {part}
                    {index === 0 && (
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border-b-4 border-cyan-400 bg-transparent outline-none w-40 text-center mx-2 text-cyan-800 font-semibold text-xl"
                        placeholder="_____"
                      />
                    )}
                  </span>
                ))}
              </p>
              {lesson.content.fillBlank?.hint && (
                <p className="text-cyan-700 text-sm mt-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Hint: {lesson.content.fillBlank.hint}
                </p>
              )}
            </div>

            <button
              onClick={() => handleFillBlank(answer)}
              disabled={!answer}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Submit Answer
            </button>
          </div>
        </div>
      );
    }

    // Ordering
    if (lesson.type === 'ordering') {
      const question = currentQuestionData as OrderingQuestion;

      if (orderingItems.length === 0) {
        setOrderingItems(question.items.map((_, i) => i));
      }

      return (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">Question {currentQuestion + 1} of {totalQuestions}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-teal-50 rounded-3xl shadow-xl p-8 border-2 border-teal-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{question.instruction}</h2>
            <p className="text-gray-600 mb-6">Drag or use arrows to reorder the items</p>

            <div className="space-y-2 mb-6">
              {orderingItems.map((itemIndex, position) => (
                <div
                  key={position}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm"
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleOrderingSwap(position, position - 1)}
                      disabled={position === 0}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleOrderingSwap(position, position + 1)}
                      disabled={position === orderingItems.length - 1}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex-1 font-medium text-gray-800">
                    {position + 1}. {question.items[itemIndex]}
                  </div>
                </div>
              ))}
            </div>

            {!showResult && (
              <button
                onClick={checkOrdering}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Check Order
              </button>
            )}

            {showResult && (
              <div className={`p-4 rounded-2xl mt-6 ${
                orderingItems.every((item, index) => item === question.correctOrder[index])
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {orderingItems.every((item, index) => item === question.correctOrder[index]) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${
                    orderingItems.every((item, index) => item === question.correctOrder[index])
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}>
                    {orderingItems.every((item, index) => item === question.correctOrder[index])
                      ? 'Correct!'
                      : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-700">{question.explanation}</p>
              </div>
            )}

            {showResult && (
              <button
                onClick={handleNext}
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Complete Lesson'}
              </button>
            )}
          </div>
        </div>
      );
    }

    // Word Bank
    if (lesson.type === 'word-bank') {
      const question = currentQuestionData as WordBankQuestion;

      return (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">Question {currentQuestion + 1} of {totalQuestions}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-xl p-8 border-2 border-pink-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{question.instruction}</h2>
            <p className="text-gray-600 mb-6">Select words from the bank to complete the sentence</p>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 mb-6 border border-pink-100">
              <p className="text-pink-900 text-lg leading-relaxed mb-4">
                {question.sentence}
              </p>
              <div className="flex flex-wrap gap-2">
                {wordBankSelection.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-500 text-white rounded-full text-sm font-medium"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3 font-medium">Word Bank:</p>
              <div className="flex flex-wrap gap-2">
                {question.words.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleWordBankClick(word)}
                    disabled={showResult}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      wordBankSelection.includes(word)
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'bg-white border-2 border-pink-200 text-pink-700 hover:border-pink-400'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            {!showResult && wordBankSelection.length > 0 && (
              <button
                onClick={checkWordBank}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Submit Answer
              </button>
            )}

            {showResult && (
              <div className={`p-4 rounded-2xl mt-6 ${
                wordBankSelection.length === question.correctWords.length &&
                wordBankSelection.every(w => question.correctWords.includes(w))
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {wordBankSelection.length === question.correctWords.length &&
                   wordBankSelection.every(w => question.correctWords.includes(w)) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${
                    wordBankSelection.length === question.correctWords.length &&
                    wordBankSelection.every(w => question.correctWords.includes(w))
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}>
                    {wordBankSelection.length === question.correctWords.length &&
                     wordBankSelection.every(w => question.correctWords.includes(w))
                      ? 'Correct!'
                      : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-700">{question.explanation}</p>
              </div>
            )}

            {showResult && (
              <button
                onClick={handleNext}
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Complete Lesson'}
              </button>
            )}
          </div>
        </div>
      );
    }

    // Flashcards
    if (lesson.type === 'flashcard') {
      const question = currentQuestionData as FlashcardQuestion;

      return (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">Card {currentQuestion + 1} of {totalQuestions}</span>
            </div>
          </div>

          <div className="relative">
            <div
              onClick={() => !showResult && setFlashcardFlipped(!flashcardFlipped)}
              className={`bg-gradient-to-br ${flashcardFlipped ? 'from-amber-50 to-yellow-50' : 'from-emerald-50 to-green-50'} rounded-3xl shadow-xl p-8 border-2 ${flashcardFlipped ? 'border-amber-200' : 'border-emerald-200'} min-h-[300px] cursor-pointer transition-all duration-500 hover:shadow-2xl`}
            >
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={(e) => { e.stopPropagation(); setFlashcardFlipped(!flashcardFlipped); }}
                  className="p-2 hover:bg-white/50 rounded-full transition-colors"
                >
                  <FlipHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-600 mb-4">
                  {flashcardFlipped ? 'Answer' : 'Question'}
                </h3>
                <p className="text-2xl font-bold text-gray-900 leading-relaxed">
                  {flashcardFlipped ? question.back : question.front}
                </p>
                {question.hint && !flashcardFlipped && (
                  <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {question.hint}
                  </p>
                )}
              </div>
            </div>

            {flashcardFlipped && !showResult && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => { setShowResult(true); handleFlashcardAnswer(false); }}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Need Review
                </button>
                <button
                  onClick={() => { setShowResult(true); handleFlashcardAnswer(true); }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Got It!
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Interactive
    if (lesson.type === 'interactive') {
      return (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>

          <div className="bg-gradient-to-br from-white to-violet-50 rounded-3xl shadow-xl p-8 border-2 border-violet-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-6">{lesson.description}</p>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 mb-6 border border-violet-100">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-violet-600" />
                <h3 className="font-semibold text-violet-900">Scenario</h3>
              </div>
              <p className="text-violet-800 leading-relaxed">{lesson.content.interactive?.scenario}</p>
            </div>

            <div className="space-y-4">
              {lesson.content.interactive?.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 shadow-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep('complete')}
              className="mt-6 w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Complete Exercise
            </button>
          </div>
        </div>
      );
    }

    return <div className="text-center text-gray-600 py-12">Lesson type not implemented yet</div>;
  }

  if (currentStep === 'complete') {
    const xpEarned = Math.round(lesson.xpReward * (correctAnswers / Math.max(1, totalQuestions || 1)));
    const progress = loadProgress();
    const streakBonus = getStreakBonus(progress.currentStreak);
    const isPremium = checkPremiumStatus(progress);
    const premiumMultiplier = getPremiumMultiplier(progress);
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
