import React from 'react';
import { Question } from '../../types/quiz';
import { Trophy, Target, Clock, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuizResultsProps {
  answers: {
    questionId: string;
    selectedOptionId?: string;
    openEndedScore?: number;
    usedHint: boolean;
  }[];
  questions: Question[];
}

export const QuizResults: React.FC<QuizResultsProps> = ({ 
  answers, 
  questions,
}) => {
  const navigate = useNavigate();
  
  const mcqCorrect = answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question?.type === 'mcq') {
      const correctOption = question.options?.find((opt) => opt.isCorrect);
      return answer.selectedOptionId === correctOption?.id;
    }
    return false;
  }).length;

  const openEndedAverage =
    answers
      .filter((answer) => answer.openEndedScore !== undefined)
      .reduce((acc, curr) => acc + (curr.openEndedScore || 0), 0) /
    answers.filter((answer) => answer.openEndedScore !== undefined).length;

  const hintsUsed = answers.filter((answer) => answer.usedHint).length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-blue-100">Here's how you performed</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-green-900">MCQ Score</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {Math.round((mcqCorrect / questions.filter((q) => q.type === 'mcq').length) * 100)}%
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {mcqCorrect} correct out of {questions.filter((q) => q.type === 'mcq').length}
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Open-Ended Average</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {openEndedAverage.toFixed(1)}/10
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Average score across all questions
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">Hints Used</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">{hintsUsed}</p>
                <p className="text-sm text-purple-700 mt-1">
                  Out of {questions.length} available
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Home size={20} />
                Back to Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};