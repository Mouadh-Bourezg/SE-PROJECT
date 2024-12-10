import React, { useState, useEffect } from 'react';
import { Question } from '../../types/quiz';
import { ImageModal } from './ImageModal';
import { QuestionTimer } from './QuestionTimer';
import { QuestionImageCard } from './QuestionImageCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { HelpCircle } from 'lucide-react';

interface MCQQuestionProps {
  question: Question;
  onAnswer: (answer: {
    questionId: string;
    selectedOptionId: string;
    usedHint: boolean;
    timeSpent: number;
  }) => void;
  onUseHint: () => void;
  hintsAvailable: boolean;
}

export const MCQQuestion: React.FC<MCQQuestionProps> = ({
  question,
  onAnswer,
  onUseHint,
  hintsAvailable,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setSelectedOption(null);
    setShowHint(false);
    setStartTime(Date.now());
  }, [question.id]);

  const handleOptionClick = (optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
    onAnswer({
      questionId: question.id,
      selectedOptionId: optionId,
      usedHint: showHint,
      timeSpent: Date.now() - startTime,
    });
  };

  const handleHintClick = () => {
    setShowHint(true);
    onUseHint();
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
              <QuestionTimer startTime={startTime} isActive={!selectedOption} />
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

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options?.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={!!selectedOption}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={!selectedOption ? { scale: 1.02 } : {}}
            className={cn(
              "p-6 rounded-xl border-2 text-left transition-all duration-200 min-h-[100px] flex items-center",
              selectedOption
                ? option.isCorrect
                  ? "border-green-500 bg-green-50 text-green-700"
                  : option.id === selectedOption
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 bg-gray-50 text-gray-500"
                : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
            )}
          >
            <div className="text-lg font-medium">{option.text}</div>
          </motion.button>
        ))}
      </div>

      <ImageModal
        imageUrl={question.imageUrl}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
};