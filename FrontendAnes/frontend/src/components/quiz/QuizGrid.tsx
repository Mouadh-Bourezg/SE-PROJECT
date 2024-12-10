import { QuizCard } from './QuizCard';
import { CompletedQuizCard } from './CompletedQuizCard';
interface Quiz {
  id: string;
  title: string;
  totalQuestions: number;
  answeredQuestions: number;
  imageUrl: string;
  year?: string;
  averageScore?: number;
  completionCount?: number;
}

interface QuizGridProps {
  quizzes: Quiz[];
  variant?: 'default' | 'completed';
}


export const QuizGrid: React.FC<QuizGridProps> = ({ quizzes, variant = 'default' }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {quizzes.map((quiz) => (
        variant === 'completed' ? (
          <CompletedQuizCard
            key={quiz.id}
            {...quiz}
            averageScore={quiz.averageScore || 0}
            completionCount={quiz.completionCount || 1}
            className="h-full"
          />
        ) : (
          <QuizCard
            key={quiz.id}
            {...quiz}
            className="h-full"
          />
        )
      ))}
    </div>
  );
};