import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MCQQuestion } from '../components/quiz/MCQQuestion';
import { OpenEndedQuestion } from '../components/quiz/OpenEndedQuestion';
import { QuizResults } from '../components/quiz/QuizResults';
import { BottomBar } from '../components/quiz/BottomBar';
import { QuizMenu } from '../components/quiz/QuizMenu';
import { QuizStartCard } from '../components/quiz/QuizStartCard';
import { useQuiz } from '../hooks/useQuiz';
import { Pause } from 'lucide-react';
import { completeQuiz } from '../data/quizzes';

const USER_DATA = {
  name: "Abdelrahim Chabira",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
};

interface QuizPageProps {
  isRetake?: boolean;
}

export const QuizPage: React.FC<QuizPageProps> = ({ isRetake = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const {
    quiz,
    progress,
    isPaused,
    handleAnswer,
    handleUseHint,
    goToNextQuestion,
    togglePause,
    saveProgress,
    resetProgress,
  } = useQuiz(id || '');

  useEffect(() => {
    if (isRetake) {
      resetProgress();
    }
  }, [isRetake, resetProgress]);

  if (!quiz) {
    navigate('/');
    return null;
  }

  const currentQuestion = quiz.questions[progress.currentQuestionIndex];
  const isLastQuestion = progress.currentQuestionIndex === quiz.questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      completeQuiz(id || '', progress);
      setShowResults(true);
    } else {
      goToNextQuestion();
    }
  };

  const handleSaveAndQuit = () => {
    saveProgress();
    navigate('/');
  };

  if (!hasStarted) {
    return <QuizStartCard quiz={quiz} onStart={() => setHasStarted(true)} />;
  }

  if (showResults) {
    return (
      <QuizResults 
        answers={progress.answers} 
        questions={quiz.questions}
      />
    );
  }

  const hasAnswer = progress.answers.some(
    answer => answer.questionId === currentQuestion.id
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">
              Question {progress.currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Hints: {progress.hintsRemaining} left
              </div>
              <button
                onClick={togglePause}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Pause className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${((progress.currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {currentQuestion.type === 'mcq' ? (
          <MCQQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            onUseHint={handleUseHint}
            hintsAvailable={progress.hintsRemaining > 0}
          />
        ) : (
          <OpenEndedQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            onUseHint={handleUseHint}
            hintsAvailable={progress.hintsRemaining > 0}
          />
        )}
      </div>

      <BottomBar
        userName={USER_DATA.name}
        avatarUrl={USER_DATA.avatarUrl}
        onNextQuestion={hasAnswer ? handleNext : undefined}
        isAnswered={hasAnswer}
        isLastQuestion={isLastQuestion}
      />

      <QuizMenu
        isOpen={isPaused}
        onClose={togglePause}
        onSaveAndQuit={handleSaveAndQuit}
      />
    </div>
  );
};