import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-bg text-center">
      <h1 className="text-9xl font-bold text-heading tracking-wider drop-shadow-md sm:text-[8.5rem]">
        4<span className="inline-block text-ghost animate-spooky ml-1 mr-2.5">
          <FontAwesomeIcon icon={faGhost} />
        </span>4
      </h1>
      <h2 className="text-2xl font-semibold text-heading mb-4">
        Error: 404 page not found
      </h2>
      <p className="text-gray-400">Sorry, the page you're looking for cannot be accessed</p>
    </main>
  );
};

export default NotFoundPage;
