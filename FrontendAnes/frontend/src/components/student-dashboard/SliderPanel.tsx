import React from 'react';
import {  BarChart2, History, UserCog } from 'lucide-react';
import { Student } from '../../types/student';
import { useStudent } from '../../contexts/StudentContext';
import { Statistics } from './slider-sections/Statistics';
import { HistorySection } from './slider-sections/History';
import { AccountSection } from './slider-sections/Account';

interface SliderPanelProps {
  student: Student;
}

export const SliderPanel: React.FC<SliderPanelProps> = ({ student }) => {
  const { isSliderOpen, activeSection, setActiveSection } = useStudent();

  const sections = [
    { id: 'statistics', label: 'Statistics', icon: BarChart2 },
    { id: 'history', label: 'History', icon: History },
    { id: 'account', label: 'Account', icon: UserCog },
  ] as const;

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isSliderOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Dashboard</h2>

        </div>

        <div className="flex border-b">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex-1 py-4 px-2 text-sm font-medium ${
                activeSection === id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <Icon size={20} />
                {label}
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'statistics' && <Statistics student={student} />}
          {activeSection === 'history' && <HistorySection student={student} />}
          {activeSection === 'account' && <AccountSection student={student} />}
        </div>
      </div>
    </div>
  );
};