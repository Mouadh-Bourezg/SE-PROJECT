import React, { useState, useEffect } from 'react';
import './studyLevelsPage.css'
import { useNavigate } from 'react-router-dom';

const StudyLevelsPage = () => {
    const [studyLevels, setStudyLevels] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch study levels from the backend
        const fetchLevels = async () => {
            const response = await fetch('/api/Levels');  
            const json = await response.json();
            if(response.ok){
              setStudyLevels(json);
            }
        };
        fetchLevels();

    }, []);

    const handleBoxClick = (studyLevel) => {
        // Navigate to the modules page for the selected study level
        navigate(`/modules/${studyLevel}`);
    };

    return (
        <div className="studyLevels-container">
            <h1>Study Levels</h1>
            <div className="studyLevels-grid">
                {studyLevels.map((level, index) => (
                    <div key={index} className="studyLevel-box" onClick={() => handleBoxClick(level)}>
                        {level}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyLevelsPage;