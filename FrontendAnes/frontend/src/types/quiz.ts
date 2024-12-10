export interface Question {
  id: string;
  type: 'mcq' | 'open-ended';
  text: string;
  imageUrl?: string;
  hint?: string;
  options?: {
    id: string;
    text: string;
    imageUrl: string;
    isCorrect: boolean;
  }[];
  sampleAnswer?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  answeredQuestions: number;
  imageUrl: string;
  year?: string;
  averageScore?: number;
  completionCount: number; // Remove optional flag
  questions: Question[];
}

export interface QuizProgress {
  currentQuestionIndex: number;
  hintsRemaining: number;
  answers: {
    questionId: string;
    selectedOptionId?: string;
    openEndedScore?: number;
    usedHint: boolean;
    timeSpent: number;
  }[];
}

export interface QuizAttempt {
  timestamp: number;
  score: number;
  answers: {
    questionId: string;
    correct: boolean;
    selectedOptionId?: string;
    openEndedScore?: number;
    timeSpent: number;
    usedHint: boolean;
  }[];
}

export interface QuizStatistics {
  totalAttempts: number;
  completedAttempts: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  questionStats: {
    [questionId: string]: {
      correctCount: number;
      totalAttempts: number;
      averageTimeSpent: number;
      hintsUsed: number;
    };
  };
}