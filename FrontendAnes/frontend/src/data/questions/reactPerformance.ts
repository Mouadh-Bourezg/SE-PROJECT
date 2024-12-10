import { Question } from '../../types/quiz';

export const reactPerformanceQuestions: Question[] = [
  {
    id: '1',
    type: 'mcq',
    text: 'Which hook should you use to memoize expensive calculations?',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    hint: 'Think about performance optimization hooks in React.',
    options: [
      { 
        id: '1', 
        text: 'useMemo', 
        isCorrect: true 
      },
      { 
        id: '2', 
        text: 'useEffect', 
        isCorrect: false 
      },
      { 
        id: '3', 
        text: 'useState', 
        isCorrect: false 
      },
      { 
        id: '4', 
        text: 'useContext', 
        isCorrect: false 
      },
    ],
  },
  {
    id: '2',
    type: 'open-ended',
    text: 'Explain React.memo() and when you should use it. Provide examples of good and bad use cases.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    hint: 'Consider component re-rendering patterns and optimization costs.',
    sampleAnswer: 'React.memo() is a higher-order component that memoizes functional components to prevent unnecessary re-renders.\n\nGood use cases:\n- Components that receive the same props frequently\n- Expensive rendering components\n- Pure functional components\n\nBad use cases:\n- Components that always receive different props\n- Simple components with cheap renders\n- Components that depend on context\n\nExample:\nconst MemoizedComponent = React.memo(({ data }) => {\n  // Complex rendering logic\n  return <ExpensiveVisualization data={data} />;\n});',
  },
  {
    id: '3',
    type: 'mcq',
    text: 'What is the purpose of the useCallback hook?',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    hint: 'Think about function references and component re-renders.',
    options: [
      { 
        id: '1', 
        text: 'To memoize function references', 
        isCorrect: true 
      },
      { 
        id: '2', 
        text: 'To create state variables', 
        isCorrect: false 
      },
      { 
        id: '3', 
        text: 'To handle side effects', 
        isCorrect: false 
      },
      { 
        id: '4', 
        text: 'To manage routing', 
        isCorrect: false 
      },
    ],
  },
];