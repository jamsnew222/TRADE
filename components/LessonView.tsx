'use client';

import { useState } from 'react';
import { Lesson, QuizQuestion } from '@/types';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

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

  const allQuestions = [
    ...(lesson.content.quiz || []).map(q => ({ ...q, type: 'quiz' as const })),
    ...(lesson.content.multipleChoice || []).map(q => ({ ...q, type: 'multiple-choice' as const })),
    ...(lesson.content.trueFalse || []).map(q => ({ ...q, type: 'true-false' as const })),
    ...(lesson.content.multipleSelect || []).map(q => ({ ...q, type: 'multiple-select' as const })),
    ...(lesson.content.ordering || []).map(q => ({ ...q, type: 'ordering' as const })),
    ...(lesson.content.wordBank || []).map(q => ({ ...q, type: 'word-bank' as const }))
  ];
  
  const totalQuestions = allQuestions.length;
  const currentQuestionData = allQuestions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    const currentQ = currentQuestionData as QuizQuestion;
    
    // Handle multiple-select questions
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

  if (currentStep === 'intro') {
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Lessons
        </button>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {lesson.type === 'quiz' ? '❓' : 
               lesson.type === 'matching' ? '🔗' : 
               lesson.type === 'fill-blank' ? '✏️' : 
               lesson.type === 'multiple-choice' ? '📝' : 
               lesson.type === 'true-false' ? '✅' :
               lesson.type === 'multiple-select' ? '☑️' :
               lesson.type === 'ordering' ? '🔢' :
               lesson.type === 'word-bank' ? '📝' : '🎮'}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <p className="text-gray-600">{lesson.description}</p>
          </div>

          {lesson.content.explanation && (
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Learn</h3>
              <p className="text-blue-800">{lesson.content.explanation}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-yellow-600">
              <span className="text-lg">⭐</span>
              <span className="font-semibold">{lesson.xpReward} XP</span>
            </div>
            <button 
              onClick={() => setCurrentStep('exercise')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'exercise') {
    if (lesson.type === 'quiz' || lesson.type === 'multiple-choice') {
      const question = currentQuestionData as QuizQuestion;
      
      // Handle true/false questions
      if (question.type === 'true-false') {
        return (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back
              </button>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {totalQuestions}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer(0)}
                  disabled={showResult}
                  className={`p-6 rounded-xl border-2 font-semibold transition-colors ${
                    showResult
                      ? selectedAnswer === 0 && question.correctAnswer === 0
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : selectedAnswer === 0
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 text-gray-400'
                      : selectedAnswer === 0
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-400 text-gray-700'
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => handleAnswer(1)}
                  disabled={showResult}
                  className={`p-6 rounded-xl border-2 font-semibold transition-colors ${
                    showResult
                      ? selectedAnswer === 1 && question.correctAnswer === 1
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : selectedAnswer === 1
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 text-gray-400'
                      : selectedAnswer === 1
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-400 text-gray-700'
                  }`}
                >
                  False
                </button>
              </div>

              {showResult && (
                <div className={`p-4 rounded-xl mt-6 ${selectedAnswer === question.correctAnswer ? 'bg-green-50' : 'bg-red-50'}`}>
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
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition-colors"
                >
                  {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Complete Lesson'}
                </button>
              )}
            </div>
          </div>
        );
      }

      // Handle multiple-select questions
      if (question.type === 'multiple-select') {
        return (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back
              </button>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {totalQuestions}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>
              <p className="text-gray-600 mb-4">Select all that apply</p>
              
              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                      selectedMultipleSelect.includes(index)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-400 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 ${
                        selectedMultipleSelect.includes(index)
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedMultipleSelect.includes(index) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedMultipleSelect.length > 0 && !showResult && (
                <button
                  onClick={submitMultipleSelect}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition-colors"
                >
                  Submit Answer
                </button>
              )}

              {showResult && currentQ.correctAnswers && (
                <div className={`p-4 rounded-xl mt-6 ${
                  selectedMultipleSelect.length === currentQ.correctAnswers.length &&
                  selectedMultipleSelect.every(i => currentQ.correctAnswers.includes(i))
                    ? 'bg-green-50'
                    : 'bg-red-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedMultipleSelect.length === currentQ.correctAnswers.length &&
                     selectedMultipleSelect.every(i => currentQ.correctAnswers.includes(i)) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${
                      selectedMultipleSelect.length === currentQ.correctAnswers.length &&
                      selectedMultipleSelect.every(i => currentQ.correctAnswers.includes(i))
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
                      {selectedMultipleSelect.length === currentQ.correctAnswers.length &&
                       selectedMultipleSelect.every(i => currentQ.correctAnswers.includes(i))
                        ? 'Correct!'
                        : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-gray-700">{currentQ.explanation}</p>
                </div>
              )}

              {showResult && (
                <button
                  onClick={handleNext}
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition-colors"
                >
                  {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Complete Lesson'}
                </button>
              )}
            </div>
          </div>
        );
      }

      // Handle regular multiple-choice questions
      return (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                
                let buttonClass = 'border-2 border-gray-200 hover:border-green-400';
                if (showResult && isSelected) {
                  buttonClass = isCorrect 
                    ? 'border-2 border-green-500 bg-green-50' 
                    : 'border-2 border-red-500 bg-red-50';
                } else if (showResult && isCorrect) {
                  buttonClass = 'border-2 border-green-500 bg-green-50';
                } else if (isSelected) {
                  buttonClass = 'border-2 border-green-500 bg-green-50';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl transition-all ${buttonClass}`}
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
              <div className="mt-6 p-4 rounded-xl bg-blue-50">
                <p className="text-blue-800 font-medium">{question.explanation}</p>
              </div>
            )}

            {showResult && (
              <button
                onClick={handleNext}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
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

    if (lesson.type === 'matching') {
      const pairs = lesson.content.matching?.pairs || [];
      const allMatched = matchingState.matches.length === pairs.length;

      return (
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
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
                      className={`w-full p-3 rounded-lg border-2 text-left ${
                        isMatched ? 'border-green-500 bg-green-50 text-gray-400' : 'border-gray-200 hover:border-green-400'
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
                      className={`w-full p-3 rounded-lg border-2 text-left ${
                        isMatched ? 'border-green-500 bg-green-50 text-gray-400' : 'border-gray-200 hover:border-green-400'
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
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition-colors"
              >
                Check Answers
              </button>
            )}

            {matchingState.matches.length > 0 && !allMatched && (
              <button
                onClick={() => setMatchingState({ selectedLeft: null, matches: [] })}
                className="mt-4 w-full text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            )}
          </div>
        </div>
      );
    }

    if (lesson.type === 'fill-blank') {
      const [answer, setAnswer] = useState('');

      return (
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-6">Fill in the blank to complete the sentence.</p>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <p className="text-blue-900 text-lg">
                {lesson.content.fillBlank?.sentence.replace('_____', (
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="border-b-2 border-blue-400 bg-transparent outline-none w-32 text-center"
                    placeholder="_____"
                  />
                ))}
              </p>
              {lesson.content.fillBlank?.hint && (
                <p className="text-blue-700 text-sm mt-2">Hint: {lesson.content.fillBlank.hint}</p>
              )}
            </div>

            <button
              onClick={() => handleFillBlank(answer)}
              disabled={!answer}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-full font-semibold transition-colors"
            >
              Submit Answer
            </button>
          </div>
        </div>
      );
    }

    if (lesson.type === 'interactive') {
      return (
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-6">{lesson.description}</p>

            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-purple-900 mb-3">Scenario</h3>
              <p className="text-purple-800">{lesson.content.interactive?.scenario}</p>
            </div>

            <div className="space-y-4">
              {lesson.content.interactive?.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep('complete')}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition-colors"
            >
              Complete Exercise
            </button>
          </div>
        </div>
      );
    }



    return <div>Lesson type not implemented</div>;
  }

  if (currentStep === 'complete') {
    const xpEarned = Math.round(lesson.xpReward * (correctAnswers / Math.max(1, totalQuestions || 1)));

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete!</h1>
          <p className="text-gray-600 mb-6">Great job completing {lesson.title}</p>

          <div className="bg-yellow-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 text-yellow-600">
              <span className="text-3xl">⭐</span>
              <span className="text-3xl font-bold">{xpEarned}</span>
              <span className="text-xl">XP earned</span>
            </div>
          </div>

          {totalQuestions > 0 && (
            <div className="mb-6">
              <p className="text-gray-600">
                You got {correctAnswers} out of {totalQuestions} questions correct
              </p>
            </div>
          )}

          <button
            onClick={handleComplete}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return null;
}