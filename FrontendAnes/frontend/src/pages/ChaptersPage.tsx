import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ChapterCard } from "../components/ChapterCard";
import { useChapterData } from "../hooks/useChapterData";


export const ChaptersPage: React.FC = () => {
  const { id, year, subjectId } = useParams<{ id: string, year: string, subjectId: string }>();
  const location = useLocation();
  const { subjectName } = location.state as { subjectName: string };
  const navigate = useNavigate();
  const { chapters, loading } = useChapterData(subjectId!);

  // Redirect to "Something Went Wrong" page if any required parameter is missing
  useEffect(() => {
    if (!id || !year || !subjectId || !subjectName || id.trim() === '' || year.trim() === '') {
      console.log("Navigating to error page due to missing parameters"); // Add this line for debugging
      navigate("/error", { replace: true });
    }
  }, [id, year, subjectId, subjectName, navigate]);
  const handleChapterClick = (year: string, subjectId: string, subjectName: string,chapterId : string) => {
    navigate(`/student/${id}/subjects/${year}/chapters/${subjectId}/quizzes/${chapterId}`, { state: { subjectName } });
  };


  // Prevent rendering if any parameter is missing
  if (!id || !year || !subjectId || !subjectName) return null;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 select-none">
        Chapters for {subjectName} (ID: {subjectId})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          console.log(chapter),
          <ChapterCard
            key={chapter.id}
            id={chapter.id}
            name={chapter.name}
            description={chapter.description}
            onClick={()=>handleChapterClick(year,subjectId,subjectName,chapter.id)}
          />
        ))}
      </div>
    </div>
  );
};
