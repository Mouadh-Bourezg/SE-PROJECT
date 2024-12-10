import React, { createContext, useContext, useState } from 'react';
import type { StudentContextType } from '../types/student';

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'statistics' | 'history' | 'account'>('statistics');

  const toggleSlider = () => {
    setSliderOpen(prevState => !prevState);
  };

  return (
    <StudentContext.Provider
      value={{
        isSliderOpen,
        setSliderOpen,
        toggleSlider,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};