import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Plus, GraduationCap } from 'lucide-react';
import { StudentCard } from './components/StudentCard';
import { AddStudentModal } from './components/AddStudentModal';
import { StudentDashboard } from './components/student-dashboard/StudentDashboard';
import { SubjectPage } from './pages/SubjectsPage';
import { ChaptersPage } from './pages/ChaptersPage'; // Import ChaptersPage
import type { Student, StudyYear } from './types/student';
import  ErrorPage  from './pages/errors/ErrorPage';
import {QuizzesPage}  from './pages/QuizzesPage';
import { QuizPage } from './pages/QuizPage';
function App() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Emma Thompson',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
      year: 'Second Grade',
      score: 85,
      stats: {
        attendance: 95,
        assignments: 88,
        participation: 92
      }
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
        participation: 92
      }
    },
    // ... other students
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStudent = (name: string, imageUrl: string, year: StudyYear) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      imageUrl,
      year,
      score: 0,
      stats: {
        attendance: 90,
        assignments: 85,
        participation: 88
      }
    };
    setStudents([...students, newStudent]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap size={32} className="text-blue-600" />
                      <h1 className="text-3xl font-bold text-gray-900">Children Dashboard</h1>
                    </div>
                    <p className="text-gray-600">Track and manage child progress</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Plus size={20} className="mr-2" />
                    <span className="font-medium">Add New Child</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {students.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </div>
              </div>

              <AddStudentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddStudent}
              />
            </div>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/student/:id" element={<StudentDashboard />} />
        <Route path="/student/:id/subjects/:year" element={<SubjectPage />} />
        <Route path="/student/:id/subjects/:year/chapters/:subjectId" element={<ChaptersPage />} /> {/* Update this route */}
        <Route path="/student/:id/subjects/:year/chapters/:subjectId/quizzes/:chapterId" element={<QuizzesPage />} />
        <Route path='/quiz/:id' element={<QuizPage />} />
        <Route path='/quiz/:id/retake' element={<QuizPage isRetake/>} />
      </Routes>
    </Router>
  )
}

export default App;