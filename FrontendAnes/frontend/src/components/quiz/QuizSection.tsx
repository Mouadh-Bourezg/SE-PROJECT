import React from 'react';
import { cn } from '../../lib/utils';

interface QuizSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <section className={cn("relative", className)}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
      <div className="relative">
        {children}
      </div>
    </section>
  );
};