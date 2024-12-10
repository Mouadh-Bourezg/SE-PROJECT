import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SubjectCard } from "../components/SubjectCard";
import { useModules } from "../hooks/useModules";
import type { Subject } from "../types/subject";

export const SubjectPage: React.FC = () => {
  const { id, year } = useParams<{ id?: string; year?: string }>();
  const yearString = year || '';
  const navigate = useNavigate();
  const { modules: subjects, loading } = useModules(yearString!) as { modules: Subject[]; loading: boolean };

  const handleSubjectClick = (yearString: string, subjectId: string, subjectName: string) => {
    navigate(`/student/${id}/subjects/${yearString}/chapters/${subjectId}`, { state: { subjectName } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 select-none">
        Subjects for {yearString}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            id={subject.id}
            name={subject.name}
            icon={subject.icon}
            year={yearString}
            onClick={() => handleSubjectClick(yearString, subject.id, subject.name)}
          />
        ))}
      </div>
    </div>
  );
};
