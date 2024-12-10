import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentProvider } from "../../contexts/StudentContext";
import { useStudent } from "../../contexts/StudentContext";
import { SliderPanel } from "./SliderPanel";
import { useStudentData } from "../../hooks/useStudentData";
import { CircularProgress } from "../CircularProgress";
import { Statistics } from "./slider-sections/Statistics";
export const StudentDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { student, loading } = useStudentData(id!);
  const navigate = useNavigate();

  const SliderToggleButton: React.FC = () => {
    const { toggleSlider } = useStudent();

    const handleClick = () => {
      toggleSlider();
    };

    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition-shadow text-gray-700 hover:text-blue-600"
      >
        <span className="font-medium">
          {useStudent().isSliderOpen ? "Hide Slider" : "Show Slider"}
        </span>
      </button>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <StudentProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-600">
                <img
                  src={student.imageUrl}
                  alt={student.name}
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-between px-8">
                  <div className="text-white">
                    <h1 className="text-4xl font-bold mb-2">{student.name}</h1>
                    <p className="text-xl opacity-90">{student.year}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                    <CircularProgress
                      percentage={student.score}
                      size={80}
                      strokeWidth={4}
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Attendance"
                value={`${student.stats?.attendance ?? 95}%`}
                trend="up"
              />
              <StatCard
                title="Assignments"
                value={`${student.stats?.assignments ?? 88}%`}
                trend="up"
              />
              <StatCard
                title="Participation"
                value={`${student.stats?.participation ?? 92}%`}
                trend="up"
              />
            </div>

            {/* Statistics Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Statistics student={student} />
            </div>

            {/* Single Button to Open Slider */}
            <div className="fixed bottom-4 right-4 z-50">
              <button className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                <SliderToggleButton />
              </button>
            </div>
            <div className="fixed bottom-4 left-4 z-50">
              <button
                onClick={() => navigate(`/student/${student.id}/subjects/${student.year}`)}
                className="w-16 h-16 rounded-full bg-blue-200 text-black flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors hover:text-white"
              >
                Quiz
              </button>
            </div>
          </div>
        </div>
        <SliderPanel student={student} />
      </div>
    </StudentProvider>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <span
        className={`text-sm ${
          trend === "up" ? "text-green-500" : "text-red-500"
        }`}
      >
        {trend === "up" ? "↑" : "↓"}
      </span>
    </div>
  </div>
);
