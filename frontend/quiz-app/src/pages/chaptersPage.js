import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const ChaptersPage = () => {
    const [chapters, setChapters] = useState([]);
    const { module_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChapters = async () => {
            const response = await fetch(`/api/Chapters?module_id=${module_id}`);
            const json = await response.json();
            if (response.ok) {
                setChapters(json);
            }
        };
        fetchChapters();
    }, [module_id]);

    const handleBoxClick = async (chapter_id) => {
        try {
            // Fetch questions for the given module_id
            const response = await fetch(`/api/Questions?chapter_id=${chapter_id}`);
            const questions = await response.json();
    
            if (response.ok && questions.length > 0) {
                navigate(`/quiz/${questions[0]._id}`, { state: { questions } });
            } else {
                alert('No questions available for this chapter.');
            }
        } catch (err) {
            console.error('Failed to fetch questions:', err);
            alert('Failed to fetch questions. Please try again later.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Chapters</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                }}
            >
                {chapters.map((chapter) => (
                    <div
                        key={chapter._id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '15px',
                            textAlign: 'center',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                        }}
                        onClick={() => handleBoxClick(chapter._id)} // Handle click event here
                    >
                        <h3 style={{ margin: '10px 0' }}>{chapter.chapterName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChaptersPage;
