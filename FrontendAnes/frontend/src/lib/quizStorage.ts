import { QuizProgress, QuizAttempt, QuizStatistics, Quiz } from '../types/quiz';

const STORAGE_KEYS = {
  PROGRESS: 'quiz_progress',
  ATTEMPTS: 'quiz_attempts',
  STATS: 'quiz_stats',
  ANSWERED: 'quiz_answered',
} as const;

export function getStoredProgress(quizId: string): QuizProgress | null {
  const stored = localStorage.getItem(`${STORAGE_KEYS.PROGRESS}_${quizId}`);
  return stored ? JSON.parse(stored) : null;
}

export function storeProgress(quizId: string, progress: QuizProgress): void {
  localStorage.setItem(`${STORAGE_KEYS.PROGRESS}_${quizId}`, JSON.stringify(progress));
}

export function getQuizAttempts(quizId: string): QuizAttempt[] {
  const stored = localStorage.getItem(`${STORAGE_KEYS.ATTEMPTS}_${quizId}`);
  return stored ? JSON.parse(stored) : [];
}

export function storeQuizAttempt(quizId: string, attempt: QuizAttempt): void {
  const attempts = getQuizAttempts(quizId);
  attempts.push(attempt);
  localStorage.setItem(`${STORAGE_KEYS.ATTEMPTS}_${quizId}`, JSON.stringify(attempts));
  updateQuizStatistics(quizId, attempt);
}

export function getQuizStatistics(quizId: string): QuizStatistics {
  const stored = localStorage.getItem(`${STORAGE_KEYS.STATS}_${quizId}`);
  return stored ? JSON.parse(stored) : createInitialStatistics();
}

function createInitialStatistics(): QuizStatistics {
  return {
    totalAttempts: 0,
    completedAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    questionStats: {},
  };
}

function updateQuizStatistics(quizId: string, attempt: QuizAttempt): void {
  const stats = getQuizStatistics(quizId);
  const totalTimeSpent = attempt.answers.reduce((sum, a) => sum + a.timeSpent, 0);

  // Update overall statistics
  stats.totalAttempts++;
  stats.completedAttempts++;
  stats.totalTimeSpent += totalTimeSpent;
  stats.bestScore = Math.max(stats.bestScore, attempt.score);
  
  // Recalculate average score
  const attempts = getQuizAttempts(quizId);
  const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
  stats.averageScore = Math.round(totalScore / attempts.length);

  // Update per-question statistics
  attempt.answers.forEach(answer => {
    if (!stats.questionStats[answer.questionId]) {
      stats.questionStats[answer.questionId] = {
        correctCount: 0,
        totalAttempts: 0,
        averageTimeSpent: 0,
        hintsUsed: 0,
      };
    }

    const questionStat = stats.questionStats[answer.questionId];
    questionStat.totalAttempts++;
    if (answer.correct) questionStat.correctCount++;
    if (answer.usedHint) questionStat.hintsUsed++;
    
    // Update average time spent
    const totalTime = questionStat.averageTimeSpent * (questionStat.totalAttempts - 1) + answer.timeSpent;
    questionStat.averageTimeSpent = Math.round(totalTime / questionStat.totalAttempts);
  });

  localStorage.setItem(`${STORAGE_KEYS.STATS}_${quizId}`, JSON.stringify(stats));
}

export function resetQuizProgress(quizId: string): void {
  localStorage.removeItem(`${STORAGE_KEYS.PROGRESS}_${quizId}`);
  localStorage.setItem(`${STORAGE_KEYS.ANSWERED}_${quizId}`, '0');
}