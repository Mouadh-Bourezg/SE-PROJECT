import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Save } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuizMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAndQuit: () => void;
}

export const QuizMenu: React.FC<QuizMenuProps> = ({
  isOpen,
  onClose,
  onSaveAndQuit,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Paused</h2>
            <div className="space-y-3">
              <button
                onClick={onClose}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-colors flex items-center gap-3",
                  "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
              >
                <Play className="w-5 h-5" />
                <span className="font-medium">Continue Quiz</span>
              </button>
              <button
                onClick={onSaveAndQuit}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-colors flex items-center gap-3",
                  "bg-gray-50 text-gray-700 hover:bg-gray-100"
                )}
              >
                <Save className="w-5 h-5" />
                <div>
                  <span className="font-medium block">Save & Quit</span>
                  <span className="text-sm text-gray-500">Your progress will be saved</span>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};