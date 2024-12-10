import { Question } from '../../types/quiz';

export const reactBasicsQuestions: Question[] = [
  {
    id: '1',
    type: 'mcq',
    text: 'What is the virtual DOM in React?',
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
    hint: 'Think about how React optimizes rendering performance.',
    options: [
      { 
        id: '1', 
        text: 'A lightweight copy of the actual DOM that React uses for performance optimization', 
        isCorrect: true 
      },
      { 
        id: '2', 
        text: 'A special browser feature for JavaScript frameworks', 
        isCorrect: false 
      },
      { 
        id: '3', 
        text: 'A database for storing React components', 
        isCorrect: false 
      },
      { 
        id: '4', 
        text: 'A third-party library for DOM manipulation', 
        isCorrect: false 
      },
    ],
  },
  {
    id: '2',
    type: 'open-ended',
    text: 'Explain the concept of JSX and why it\'s useful in React.',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
    hint: 'Consider how JSX relates to writing UI components and its advantages over plain JavaScript.',
    sampleAnswer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It makes React code more readable and intuitive by allowing developers to write UI components in a familiar HTML-like syntax while retaining the full power of JavaScript. Example:\n\nconst element = (\n  <div className="container">\n    <h1>Hello, {name}</h1>\n    <p>Welcome to React</p>\n  </div>\n);',
  },
  {
    id: '3',
    type: 'mcq',
    text: 'What is the purpose of React components?',
    imageUrl: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b',
    hint: 'Think about code organization and reusability.',
    options: [
      { 
        id: '1', 
        text: 'To create reusable, self-contained pieces of UI', 
        isCorrect: true 
      },
      { 
        id: '2', 
        text: 'To style web pages', 
        isCorrect: false 
      },
      { 
        id: '3', 
        text: 'To handle server-side logic', 
        isCorrect: false 
      },
      { 
        id: '4', 
        text: 'To manage database connections', 
        isCorrect: false 
      },
    ],
  },
];