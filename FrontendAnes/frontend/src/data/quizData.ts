import { Question } from '../types/quiz';
import { reactHooksQuestions } from './questions/reactHooks';
import { reactBasicsQuestions } from './questions/reactBasics';
import { reactStateQuestions } from './questions/reactState';
import { reactPerformanceQuestions } from './questions/reactPerformance';

export const QUIZ_DATA: Record<string, Question[]> = {
  '1': reactHooksQuestions,
  '2': reactBasicsQuestions,
  '3': reactStateQuestions,
  '4': reactPerformanceQuestions,
};