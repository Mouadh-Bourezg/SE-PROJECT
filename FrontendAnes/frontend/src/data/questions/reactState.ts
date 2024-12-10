import { Question } from '../../types/quiz';

export const reactStateQuestions: Question[] = [
  {
    id: '1',
    type: 'mcq',
    text: 'What is the primary purpose of state in React?',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    hint: 'Think about how components handle dynamic data.',
    options: [
      { 
        id: '1', 
        text: 'To store and manage component data that can change over time', 
        isCorrect: true 
      },
      { 
        id: '2', 
        text: 'To style React components', 
        isCorrect: false 
      },
      { 
        id: '3', 
        text: 'To handle routing in React applications', 
        isCorrect: false 
      },
      { 
        id: '4', 
        text: 'To communicate with the server', 
        isCorrect: false 
      },
    ],
  },
  {
    id: '2',
    type: 'open-ended',
    text: 'Compare and contrast local state vs. global state management. When would you use each?',
    imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa',
    hint: 'Consider the scope and accessibility of different state management approaches.',
    sampleAnswer: 'Local state (useState) is best for component-specific data that doesn\'t need to be shared. Global state (Redux, Context) is better for data that needs to be accessed by many components.\n\nExample use cases:\nLocal state: Form inputs, toggle states, component-specific UI states\nGlobal state: User authentication, theme settings, shopping cart data\n\nConsiderations:\n- Use local state by default\n- Move to global state when sharing becomes cumbersome\n- Consider performance implications',
  },
  {
    id: '3',
    type: 'mcq',
    text: 'What is the correct way to update state that depends on the previous state?',
    imageUrl: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b',
    hint: 'Think about state updates and their timing.',
    options: [
      { 
        id: '1', 
        text: 'Use the function form of setState', 
        isCorrect: true 
      },
      { 
        id: '2', 
        text: 'Directly modify the state variable', 
        isCorrect: false 
      },
      { 
        id: '3', 
        text: 'Use a global variable', 
        isCorrect: false 
      },
      { 
        id: '4', 
        text: 'Create a new state variable', 
        isCorrect: false 
      },
    ],
  },
];