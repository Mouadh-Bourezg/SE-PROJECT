import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCw, Trophy } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { ScoreIndicator } from '../ui/ScoreIndicator';
import { cn } from '../../lib/utils';

interface CompletedQuizCardProps {
  id: string;
  title: string;
  totalQuestions: number;
  averageScore: number;
  imageUrl: string;
  completionCount: number;
  year?: string;
  className?: string;
}

export const CompletedQuizCard: React.FC<CompletedQuizCardProps> = ({
  id,
  title,
  totalQuestions,
  averageScore,
  imageUrl,
  completionCount,
  year,
  className,
}) => {
  const navigate = useNavigate();

  const handleRetake = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/quiz/${id}/retake`);
  };

  return (
    <div 
      onClick={() => navigate(`/quiz/${id}`)}
      className={cn(
        "group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col",
        "ring-2 ring-green-500 ring-offset-2",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent z-10" />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 z-20">
          <Badge variant="success" className="flex items-center gap-1">
            <Trophy size={12} />
            {completionCount}x Completed
          </Badge>
        </div>
        <div className="absolute -top-1 -right-1 z-20">
          <ScoreIndicator 
            score={averageScore}
            size={48}
            className="shadow-xl ring-2 ring-white"
          />
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-white/90">
              {totalQuestions} Questions
            </Badge>
            {year && (
              <span className="text-white/90 text-sm font-medium">
                {year}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-center">
        <button
          onClick={handleRetake}
          className="group/button flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-300"
        >
          <RotateCw size={16} className="group-hover/button:rotate-180 transition-transform duration-500" />
          Retake Quiz
        </button>
      </div>
    </div>
  );
};