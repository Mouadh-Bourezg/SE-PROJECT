
import { GraduationCap, Trophy, Award } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import {useNavigate} from "react-router-dom";
interface QuizCardProps {
  id: string;
  title: string;
  totalQuestions: number;
  answeredQuestions: number;
  imageUrl: string;
  year?: string;
  className?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  totalQuestions,
  answeredQuestions,
  imageUrl,
  year,
  className,
}) => {
  const progress = (answeredQuestions / totalQuestions) * 100;
  const hasStarted = answeredQuestions > 0;
  const isCompleted = answeredQuestions === totalQuestions;
  const navigate = useNavigate();
  const handleQuizClick = (quizId: string)  => {
  navigate(`/quiz/${quizId}`)
  }
  return (
    <div 
      className={cn(
        "group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col",
        isCompleted && "ring-2 ring-green-500 ring-offset-2",
        className
      )}
      onClick={() => handleQuizClick(id)}
    >
      <div className="relative h-48 overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10",
          isCompleted && "from-green-900/60"
        )} />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {isCompleted && (
            <Badge variant="success" className="animate-pulse">
              <Trophy size={12} className="mr-1" /> Completed
            </Badge>
          )}
          <Badge variant="secondary">
            {totalQuestions} Questions
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
          {year && (
            <div className="flex items-center text-white/90 text-sm">
              <GraduationCap size={16} className="mr-2" />
              {year}
            </div>
          )}
        </div>
      </div>
      <div className={cn(
        "p-4 flex-1 flex items-center",
        isCompleted 
          ? "bg-gradient-to-r from-green-50 to-emerald-50" 
          : "bg-gradient-to-r from-blue-50 to-indigo-50"
      )}>
        {isCompleted ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-[50px] h-[50px] rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <span className="text-sm text-green-600 font-medium block">Congratulations!</span>
              <div className="font-semibold text-gray-900">
                Quiz Mastered
              </div>
            </div>
          </div>
        ) : hasStarted ? (
          <div className="flex items-center gap-3 w-full">
            <CircularProgress 
              percentage={progress} 
              size={50}
              strokeWidth={3}
              className="transform group-hover:scale-110 transition-transform duration-300 shrink-0"
            />
            <div className="flex-1">
              <span className="text-sm text-gray-600 block">Progress</span>
              <div className="font-semibold text-gray-900">
                {answeredQuestions} of {totalQuestions} Complete
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full">
            <div className="w-[50px] h-[50px] rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Badge variant="secondary" className="bg-white">New</Badge>
            </div>
            <div className="flex-1">
              <span className="text-sm text-gray-600 block">Ready to begin</span>
              <div className="font-semibold text-gray-900">Start Quiz</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};