import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Trophy, Clock } from 'lucide-react';
import { Quiz } from '../../types/quiz';
import { CountdownOverlay } from './CountdownOverlay';

interface QuizStartCardProps {
  quiz: Quiz;
  onStart: () => void;
}

export const QuizStartCard: React.FC<QuizStartCardProps> = ({ quiz, onStart }) => {
  const [showCountdown, setShowCountdown] = useState(false);

  const handleStart = () => {
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    onStart();
  };

  return (
    <>
      <AnimatePresence>
        {!showCountdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={quiz.imageUrl}
                  alt={quiz.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-6 right-6 z-20">
                  <h2 className="text-3xl font-bold text-white mb-2">{quiz.title}</h2>
                  <p className="text-white/90">{quiz.description}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Trophy size={18} />
                      <span className="font-medium">Completion Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">
                      {quiz.completionCount > 0
                        ? `${Math.round((quiz.averageScore || 0))}%`
                        : 'New'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <Clock size={18} />
                      <span className="font-medium">Questions</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-700">
                      {quiz.totalQuestions}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                      <Trophy size={18} />
                      <span className="font-medium">Attempts</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">
                      {quiz.completionCount || 0}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
                >
                  <Play size={20} className="group-hover:scale-110 transition-transform" />
                  Start Quiz
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CountdownOverlay
        isVisible={showCountdown}
        onComplete={handleCountdownComplete}
      />
    </>
  );
};