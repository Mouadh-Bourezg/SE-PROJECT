export type SubjectName = 'Mathematics' | 'Science' | 'Language Arts' | 'Social Studies' | 'Art' | 'Music' | 'Physical Education' | 'Islamic Science';
export interface Subject {
    id: string;
    name: SubjectName;
    description: string;
    icon: string;
}