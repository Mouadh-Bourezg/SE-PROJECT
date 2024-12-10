import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SubjectCard } from "../components/SubjectCard";
import { useSubjectsByYear } from "../hooks/useSubjectData";

export const SubjectPage: React.FC = () => {
  const { id, year } = useParams<{ id?: string; year?: string }>();
  const navigate = useNavigate();
  const { subjects, loading } = useSubjectsByYear(year!);

  // Redirect to "Something Went Wrong" if `id` or `year` is missing
  useEffect(() => {
    if (!id || !year || id.trim() === '' || year.trim() === '') {
      console.log("Navigating to error page due to missing id or year"); // Add this line for debugging
      navigate("/error", { replace: true });
    }
  }, [id, year, navigate]);

  const handleSubjectClick = (year: string, subjectId: string, subjectName: string) => {
    navigate(`/student/${id}/subjects/${year}/chapters/${subjectId}`, { state: { subjectName } });
  };

  // Prevent rendering if id or year is missing
  if (!id || !year) return null;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 select-none">
        Subjects for {year}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            id={subject.id}
            name={subject.name}
            icon={subject.icon}
            year={year}
            onClick={() => handleSubjectClick(year, subject.id, subject.name)} // Pass subject.id correctly
          />
        ))}
      </div>
    </div>
  );
};
