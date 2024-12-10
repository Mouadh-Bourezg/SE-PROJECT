import React from 'react';
import { Mail, Phone, Home, Book } from 'lucide-react';
import type { Student } from '../../../types/student';

interface AccountSectionProps {
  student: Student;
}

export const AccountSection: React.FC<AccountSectionProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Mail className="text-gray-400" size={20} />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{student.name.toLowerCase().replace(' ', '.')}@school.edu</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Book className="text-gray-400" size={20} />
          <div>
            <p className="text-sm text-gray-500">Current Grade</p>
            <p className="font-medium text-gray-900">{student.year}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Phone className="text-gray-400" size={20} />
          <div>
            <p className="text-sm text-gray-500">Emergency Contact</p>
            <p className="font-medium text-gray-900">(555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Home className="text-gray-400" size={20} />
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium text-gray-900">123 Education St, Learning City</p>
          </div>
        </div>
      </div>
    </div>
  );
};