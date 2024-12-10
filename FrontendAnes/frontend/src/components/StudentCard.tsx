import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Student } from '../types/student';
import { CircularProgress } from './CircularProgress';
import { GraduationCap } from 'lucide-react';

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/student/${student.id}`)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src={student.imageUrl}
          alt={student.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl font-bold text-white mb-1 select-none">{student.name}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <GraduationCap size={16} className="mr-2" />
            {student.year}
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <CircularProgress 
            percentage={student.score} 
            size={50}
            strokeWidth={3}
            className="transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="text-sm">
            <span className="text-gray-600 select-none">Progress</span>
            <div className="font-semibold text-gray-900 select-none">{student.score}% Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}