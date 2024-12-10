import React from 'react';
import type { Student } from '../../../types/student';

interface HistorySectionProps {
  student: Student;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ student }) => {
  const history = student.history ?? [
    { date: '2024-03-10', activity: 'Math Quiz', score: 95 },
    { date: '2024-03-08', activity: 'Science Project', score: 88 },
    { date: '2024-03-05', activity: 'Reading Assessment', score: 92 },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-gray-900">{item.activity}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Score:</span>
              <span className="font-semibold text-blue-600">{item.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};