import React from "react";

interface ChapterCardProps {
  id: string;
  name: string;
  description: string;
  onClick: () => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ id, name, description, onClick }) => {
  return (
    <div
      key={id}
      className="bg-white rounded-xl shadow-lg shadow-blue-400/50 hover:shadow-blue-600/50 hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors select-none">
        {name}
      </h2>
      <p className="text-gray-500 mt-2 select-none">
        {description}
      </p>
    </div>
  );
};
