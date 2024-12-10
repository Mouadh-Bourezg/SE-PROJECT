import { useState, useEffect } from 'react';
import type { Subject } from '../types/subject';

const mockSubjectsByYear: { [year: string]: Subject[] } = {
    'First Grade': [
        {
            id: '1',
            name: 'Mathematics',
            description: 'Learn about numbers, shapes, and patterns.',
            icon: '➕',
        },
        {
            id: '2',
            name: 'Science',
            description: 'Explore the world around you.',
            icon: '🧪',
        },
    ],
    'Second Grade': [
        {
            id: '3',
            name: 'Language Arts',
            description: 'Read and write stories.',
            icon: '📖',
        },
        {
            id: '4',
            name: 'Social Studies',
            description: 'Learn about communities and cultures.',
            icon: '🌍',
        },
    ],
    // Add more years and subjects as needed
};


export const useSubjectsByYear = (year: string) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        // Simulate API call
        const foundSubjects = mockSubjectsByYear[year] || [];
        setSubjects(foundSubjects);
        setLoading(false);
    }, [year]);

    return { subjects, loading };
};