import { Question } from '../../types/quiz';

export const reactHooksQuestions: Question[] = [
  {
    id: '1',
    type: 'mcq',
    text: 'What is the primary purpose of React hooks?',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    hint: 'Think about how they relate to state and lifecycle in functional components.',
    options: [
      { id: '1', text: 'To add state to functional components', isCorrect: true },
      { id: '2', text: 'To create class components', isCorrect: false },
      { id: '3', text: 'To style components', isCorrect: false },
      { id: '4', text: 'To handle routing', isCorrect: false },
    ],
  },
  {
    id: '2',
    type: 'open-ended',
    text: 'Explain how the useEffect hook works and provide an example.',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    hint: 'Consider its relationship with component lifecycle and side effects.',
    sampleAnswer: 'useEffect is a hook that handles side effects in functional components. It runs after every render and can be used for data fetching, subscriptions, or manually changing the DOM. Example:\n\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);',
  },
  {
    id: '3',
    type: 'mcq',
    text: 'Which hook would you use to store a value that persists across renders but doesn\'t trigger re-renders?',
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
    hint: 'Think about mutable values that don\'t affect the visual output.',
    options: [
      { id: '1', text: 'useRef', isCorrect: true },
      { id: '2', text: 'useState', isCorrect: false },
      { id: '3', text: 'useMemo', isCorrect: false },
      { id: '4', text: 'useReducer', isCorrect: false },
    ],
  },
];