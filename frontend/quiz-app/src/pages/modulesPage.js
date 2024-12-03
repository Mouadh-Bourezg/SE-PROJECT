import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get route parameters
import { useNavigate } from 'react-router-dom';

const ModulesPage = () => {
    const { studyLevel } = useParams(); // Extract studyLevel from URL
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch modules for the selected study level
        const fetchModules = async () => {
            const response = await fetch(`/api/Modules?level=${studyLevel}`);
            const json = await response.json();
            if (response.ok) {
                setModules(json);
            }
        };
        fetchModules();
    }, [studyLevel]);

    const handleBoxClick = (module_id) => {
        // Navigate to the modules page for the selected study level
        navigate(`/chapters/${module_id}`);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Modules for {studyLevel}</h1>
            <div style={styles.grid}>
                {modules.map((module) => (
                    <div key={module._id} style={styles.box} onClick={() => handleBoxClick(module._id)}>
                        <p style={styles.boxText}>{module.moduleName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    box: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        cursor: 'pointer',
    },
    boxText: {
        margin: 0,
        fontSize: '18px',
        color: '#333',
    },
    boxHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
    },
};

export default ModulesPage;
