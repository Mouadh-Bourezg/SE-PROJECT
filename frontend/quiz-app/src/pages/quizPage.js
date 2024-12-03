import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const QuizPage = () => {
    const { state } = useLocation(); // Access navigation state
    const { questions } = state || { questions: [] }; // Extract questions list
    const { question_id } = useParams(); // Current question ID from URL
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
        questions.findIndex((q) => q._id === question_id) || 0
    );

    if (!questions.length) return <p>No questions available.</p>;

    const currentQuestion = questions[currentQuestionIndex];

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Quiz completed!');
        }
    };

    return (
        <div>
            <h1>Quiz</h1>
            <p>Question {currentQuestionIndex + 1}</p>
            <p>{currentQuestion.questionText}</p>
            <button onClick={handleNextQuestion}>Next Question</button>
        </div>
    );
};

export default QuizPage;
