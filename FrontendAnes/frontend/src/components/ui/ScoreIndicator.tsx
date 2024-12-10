import React from 'react';
import { cn } from '../../lib/utils';
import { CircularProgress } from '../quiz/CircularProgress';

interface ScoreIndicatorProps {
  score: number;
  size?: number;
  className?: string;
}

export const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({
  score,
  size = 44,
  className
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={cn(
      "relative bg-white rounded-full shadow-lg p-1",
      getScoreColor(score),
      className
    )}>
      <CircularProgress 
        percentage={score} 
        size={size}
        strokeWidth={3}
        className="transform transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};