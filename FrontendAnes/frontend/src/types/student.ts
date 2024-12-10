export type StudyYear = 'Kindergarten' | 'First Grade' | 'Second Grade' | 'Third Grade' | 'Fourth Grade';

export interface Student {
  id: string;
  name: string;
  imageUrl: string;
  year: StudyYear;
  score: number;
  stats?: {
    attendance: number;
    assignments: number;
    participation: number;
  };
  history?: {
    date: string;
    activity: string;
    score: number;
  }[];
}

export interface StudentContextType {
  isSliderOpen: boolean;
  setSliderOpen: (open: boolean) => void;
  activeSection: 'statistics' | 'history' | 'account';
  setActiveSection: (section: 'statistics' | 'history' | 'account') => void;
  toggleSlider: () => void;
}