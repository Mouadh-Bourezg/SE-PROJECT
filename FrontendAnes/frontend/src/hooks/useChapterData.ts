import { useState, useEffect } from 'react';
import type { Chapter } from '../types/chapter';

const mockChaptersBySubject: { [subjectId: string]: Chapter[] } = {
    '1': [
        {
            id: '1',
            name: 'Addition',
            description: 'Learn how to add numbers together.',
        },
        {
            id: '2',
            name: 'Subtraction',
            description: 'Learn how to subtract numbers from each other.',
        },
    ],
    '2': [
        {
            id: '3',
            name: 'Multiplication',
            description: 'Learn how to multiply numbers together.',
        },
        {
            id: '4',
            name: 'Division',
            description: 'Learn how to divide numbers.',
        },
    ],
    '3': [
        {
            id: '3',
            name: 'Multiplication',
            description: 'Learn how to multiply numbers together.',
        },
        {
            id: '4',
            name: 'Division',
            description: 'Learn how to divide numbers.',
        },
    ],
    // Add more subjects and chapters as needed
};

export const useChapterData = (subjectId: string) => {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        const foundChapters = mockChaptersBySubject[subjectId] || [];
        setChapters(foundChapters);
        setLoading(false);
    }, [subjectId]);
    return {chapters, loading};
}