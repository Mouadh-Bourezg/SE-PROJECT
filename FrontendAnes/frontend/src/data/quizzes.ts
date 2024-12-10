import { Quiz, QuizProgress, QuizAttempt } from '../types/quiz';
import { reactHooksQuestions } from './questions/reactHooks';
import { reactBasicsQuestions } from './questions/reactBasics';
import { reactStateQuestions } from './questions/reactState';
import { reactPerformanceQuestions } from './questions/reactPerformance';
import { 
  getStoredProgress, 
  storeProgress, 
  storeQuizAttempt, 
  getQuizStatistics, 
  resetQuizProgress 
} from '../lib/quizStorage';

const INITIAL_QUIZZES: { [chapterId: string]: Quiz[] } = {
  1: [
    {
      id: '1',
      title: 'React Hooks Deep Dive',
      description: 'Master the fundamentals of React Hooks and learn advanced patterns',
      totalQuestions: reactHooksQuestions.length,
      answeredQuestions: 0,
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      year: '2024',
      questions: reactHooksQuestions,
      completionCount: 0,
      averageScore: 0,
    },
  ],
  2: [
    {
      id: '2',
      title: 'React Fundamentals',
      description: 'Learn the core concepts of React and build a strong foundation',
      totalQuestions: reactBasicsQuestions.length,
      answeredQuestions: 0,
      imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
      year: '2024',
      questions: reactBasicsQuestions,
      completionCount: 0,
      averageScore: 0,
    },
  ],
  3: [
    {
      id: '3',
      title: 'React State Management',
      description: 'Deep dive into state management patterns and best practices',
      totalQuestions: reactStateQuestions.length,
      answeredQuestions: 0,
      imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa',
      year: '2024',
      questions: reactStateQuestions,
      completionCount: 0,
      averageScore: 0,
    },
  ],
  4: [
    {
      id: '4',
      title: 'React Performance Optimization',
      description: 'Learn advanced techniques to optimize React applications',
      totalQuestions: reactPerformanceQuestions.length,
      answeredQuestions: 0,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      year: '2024',
      questions: reactPerformanceQuestions,
      completionCount: 0,
      averageScore: 0,
    },
  ],
};

let QUIZZES = { ...INITIAL_QUIZZES };

export function getAllQuizzes(chapterId: string): Quiz[] {
  if (Object.keys(QUIZZES).length === 0) {
    QUIZZES = { ...INITIAL_QUIZZES };
  }

  return QUIZZES[chapterId]?.map(quiz => {
    const stats = getQuizStatistics(quiz.id);
    return {
      ...quiz,
      completionCount: stats.completedAttempts,
      averageScore: stats.averageScore,
      answeredQuestions: getStoredProgress(quiz.id)?.answers.length || 0,
    };
  }) || [];
}
export function getQuizById(id: string): Quiz | undefined {
  if (Object.keys(QUIZZES).length === 0) {
    QUIZZES = { ...INITIAL_QUIZZES };
  }

  // Search for the quiz by iterating through all chapters
  for (const chapterId in QUIZZES) {
    const quiz = QUIZZES[chapterId].find(q => q.id === id);
    if (quiz) {
      const stats = getQuizStatistics(quiz.id);
      return {
        ...quiz,
        completionCount: stats.completedAttempts,
        averageScore: stats.averageScore,
        answeredQuestions: getStoredProgress(quiz.id)?.answers.length || 0,
      };
    }
  }
  return undefined;
}

function calculateQuizScore(quiz: Quiz, progress: QuizProgress): QuizAttempt {
  const answers = progress.answers.map(answer => {
    const question = quiz.questions.find(q => q.id === answer.questionId);
    let correct = false;

    if (question?.type === 'mcq') {
      const correctOption = question.options?.find(opt => opt.isCorrect);
      correct = answer.selectedOptionId === correctOption?.id;
    } else if (question?.type === 'open-ended' && answer.openEndedScore) {
      correct = answer.openEndedScore >= 7; // Consider scores 7+ as correct
    }

    return {
      ...answer,
      correct,
    };
  });

  const correctCount = answers.filter(a => a.correct).length;
  const score = Math.round((correctCount / answers.length) * 100);

  return {
    timestamp: Date.now(),
    score,
    answers,
  };
}

export function completeQuiz(quizId: string, progress: QuizProgress): void {
  const quiz = getQuizById(quizId);
  if (!quiz) return;

  const attempt = calculateQuizScore(quiz, progress);
  storeQuizAttempt(quizId, attempt);
  storeProgress(quizId, progress);
}

export {
  getStoredProgress,
  storeProgress,
  resetQuizProgress,
  getQuizStatistics,
};
