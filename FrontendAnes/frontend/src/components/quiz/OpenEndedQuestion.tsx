import React, { useState, useEffect } from 'react';
import { Question } from '../../types/quiz';
import { ImageModal } from './ImageModal';
import { QuestionTimer } from './QuestionTimer';
import { QuestionImageCard } from './QuestionImageCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { HelpCircle } from 'lucide-react';

interface OpenEndedQuestionProps {
  question: Question;
  onAnswer: (answer: {
    questionId: string;
    openEndedScore: number;
    usedHint: boolean;
    timeSpent: number;
  }) => void;
  onUseHint: () => void;
  hintsAvailable: boolean;
}

export const OpenEndedQuestion: React.FC<OpenEndedQuestionProps> = ({
  question,
  onAnswer,
  onUseHint,
  hintsAvailable,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setShowHint(false);
    setShowSampleAnswer(false);
    setScore(0);
    setAnswered(false);
    setStartTime(Date.now());
  }, [question.id]);

  const handleHintClick = () => {
    setShowHint(true);
    onUseHint();
  };

  const handleScoreSelect = (value: number) => {
    if (!answered) {
      setScore(value);
      setAnswered(true);
      onAnswer({
        questionId: question.id,
        openEndedScore: value,
        usedHint: showHint,
        timeSpent: Date.now() - startTime,
      });
    }
  };

  return (
    <div className="w-[95%] mx-auto space-y-6">
      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Content Section */}
          <div className="flex-1 order-2 md:order-1">
            {/* Question Header */}
            <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold text-gray-900 leading-relaxed">
                {question.text}
              </h2>
              <QuestionTimer startTime={startTime} isActive={!answered} />
            </div>

            {/* Hint Button */}
            {question.hint && !showHint && (
              <button
                onClick={handleHintClick}
                disabled={!hintsAvailable}
                className={cn(
                  "w-full p-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 mb-6",
                  hintsAvailable
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "bg-gray-50 text-gray-400 cursor-not-allowed"
                )}
              >
                <HelpCircle size={16} />
                Show Hint
              </button>
            )}

            {/* Hint Content */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-blue-50 rounded-lg text-blue-700 text-sm mb-6">
                    {question.hint}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sample Answer Button */}
            <button
              onClick={() => setShowSampleAnswer(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Sample Answer
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-72 order-1 md:order-2">
            <QuestionImageCard
              imageUrl={question.imageUrl}
              onClick={() => setIsImageModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Sample Answer Content */}
      <AnimatePresence>
        {showSampleAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Sample Answer:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{question.sampleAnswer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Rate your understanding:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <button
              key={value}
              onClick={() => handleScoreSelect(value)}
              disabled={answered}
              className={cn(
                "h-16 rounded-xl transition-all duration-200 text-lg font-medium",
                score === value
                  ? "bg-blue-600 text-white scale-105"
                  : answered
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-blue-100 hover:scale-105 text-gray-700"
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <ImageModal
        imageUrl={question.imageUrl}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
};