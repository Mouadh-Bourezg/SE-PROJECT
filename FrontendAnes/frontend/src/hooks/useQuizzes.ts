import { useMemo } from 'react';
import { getAllQuizzes } from '../data/quizzes';

export function useQuizzes(chapterId:string) {
  const quizzes = useMemo(() => getAllQuizzes(chapterId), []);

  const inProgressQuizzes = useMemo(() => 
    quizzes.filter(quiz => 
      quiz.answeredQuestions > 0 && quiz.answeredQuestions < quiz.totalQuestions
    ),
    [quizzes]
  );

  const newQuizzes = useMemo(() => 
    quizzes.filter(quiz => quiz.answeredQuestions === 0),
    [quizzes]
  );

  const completedQuizzes = useMemo(() => 
    quizzes.filter(quiz => 
      quiz.answeredQuestions === quiz.totalQuestions
    ),
    [quizzes]
  );

  const stats = useMemo(() => {
    const totalQuizCount = quizzes.length;
    const completedQuizCount = completedQuizzes.length;
    
    return {
      totalQuestions: quizzes.reduce((acc, quiz) => acc + quiz.totalQuestions, 0),
      totalAnswered: quizzes.reduce((acc, quiz) => acc + quiz.answeredQuestions, 0),
      completionRate: totalQuizCount === 0 
        ? 0 
        : Math.round((completedQuizCount / totalQuizCount) * 100),
    };
  }, [quizzes, completedQuizzes]);

  return {
    quizzes,
    inProgressQuizzes,
    newQuizzes,
    completedQuizzes,
    stats,
  };
}