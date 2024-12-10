import { useState, useEffect } from 'react';
import type { Student } from '../types/student';

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
    year: 'Second Grade',
    score: 85,
    stats: {
      attendance: 95,
      assignments: 88,
      participation: 92,
    },
    history: [
      { date: '2024-03-10', activity: 'Math Quiz', score: 95 },
      { date: '2024-03-08', activity: 'Science Project', score: 88 },
      { date: '2024-03-05', activity: 'Reading Assessment', score: 92 },
    ],
  },
  {
    id: '1733695213425',
    name: 'Emma Thompson',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
    year: 'Second Grade',
    score: 85,
    stats: {
      attendance: 95,
      assignments: 88,
      participation: 92,
    },
    history: [
      { date: '2024-03-10', activity: 'Math Quiz', score: 95 },
      { date: '2024-03-08', activity: 'Science Project', score: 88 },
      { date: '2024-03-05', activity: 'Reading Assessment', score: 92 },
    ],
  },
  // Add more mock students as needed
];

export const useStudentData = (id: string) => {
  const [student, setStudent] = useState<Student | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const foundStudent = mockStudents.find(s => s.id === id);
    setStudent(foundStudent);
    setLoading(false);
  }, [id]);

  return { student, loading };
};