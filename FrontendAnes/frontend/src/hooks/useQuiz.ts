import { useState, useCallback, useEffect } from 'react';
import { Quiz, QuizProgress } from '../types/quiz';
import { 
  getQuizById, 
  getStoredProgress, 
  storeProgress, 
  resetQuizProgress 
} from '../data/quizzes';

export function useQuiz(quizId: string) {
  const [progress, setProgress] = useState<QuizProgress>(() => {
    const storedProgress = getStoredProgress(quizId);
    return storedProgress || {
      currentQuestionIndex: 0,
      hintsRemaining: 3,
      answers: [],
    };
  });
  
  const [isPaused, setIsPaused] = useState(false);
  const quiz = getQuizById(quizId);

  useEffect(() => {
    if (quiz) {
      storeProgress(quizId, progress);
    }
  }, [quiz, progress, quizId]);

  const handleAnswer = useCallback((answer: {
    questionId: string;
    selectedOptionId?: string;
    openEndedScore?: number;
    usedHint: boolean;
    timeSpent: number;
  }) => {
    setProgress(prev => ({
      ...prev,
      answers: [...prev.answers, answer],
    }));
  }, []);

  const handleUseHint = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      hintsRemaining: Math.max(0, prev.hintsRemaining - 1),
    }));
  }, []);

  const goToNextQuestion = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const saveProgress = useCallback(() => {
    if (quiz) {
      storeProgress(quizId, progress);
    }
  }, [quiz, progress, quizId]);

  const resetProgress = useCallback(() => {
    resetQuizProgress(quizId);
    setProgress({
      currentQuestionIndex: 0,
      hintsRemaining: 3,
      answers: [],
    });
  }, [quizId]);

  return {
    quiz,
    progress,
    isPaused,
    handleAnswer,
    handleUseHint,
    goToNextQuestion,
    togglePause,
    saveProgress,
    resetProgress,
  };
}