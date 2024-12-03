const mongoose = require('mongoose');
const Question = require('./models/Question'); 

const questionsData = [
  {
    chapterId: "674af43e13361bb230f584c8",
    questions: [
      {
        questionText: "What is 5 + 3?",
        correctAnswer: "8",
        explanation: "Adding 5 and 3 gives 8.",
      },
      {
        questionText: "What is 10 - 4?",
        correctAnswer: "6",
        explanation: "Subtracting 4 from 10 gives 6.",
      },
    ],
  },
  {
    chapterId: "674af43e13361bb230f584c9", 
    questions: [
      {
        questionText: "What is 6 × 7?",
        correctAnswer: "42",
        explanation: "Multiplying 6 and 7 gives 42.",
      },
      {
        questionText: "What is 20 ÷ 5?",
        correctAnswer: "4",
        explanation: "Dividing 20 by 5 gives 4.",
      },
    ],
  },
  {
    chapterId: "674af43e13361bb230f584ca",
    questions: [
      {
        questionText: "What process do plants use to make food?",
        correctAnswer: "Photosynthesis",
        explanation: "Plants use sunlight, water, and carbon dioxide in photosynthesis to make food.",
      },
      {
        questionText: "What is the largest land animal?",
        correctAnswer: "Elephant",
        explanation: "The African elephant is the largest land animal.",
      },
    ],
  },
  {
    chapterId: "674af43e13361bb230f584cb",
    questions: [
      {
        questionText: "What causes the seasons?",
        correctAnswer: "Earth's tilt",
        explanation: "The tilt of Earth's axis causes the seasons as it orbits the sun.",
      },
      {
        questionText: "What is the main gas in Earth's atmosphere?",
        correctAnswer: "Nitrogen",
        explanation: "Nitrogen makes up about 78% of Earth's atmosphere.",
      },
    ],
  },
];

const seedQuestions = async () => {
  try {
    // Clear existing questions
    await Question.deleteMany({});
    console.log('Existing questions removed');

    // Seed new questions
    for (const chapter of questionsData) {
      for (const question of chapter.questions) {
        await Question.create({
          chapterId: chapter.chapterId,
          questionText: question.questionText,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        });
      }
    }

    console.log('Questions seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding questions:', error);
    mongoose.connection.close();
  }
};

module.exports = seedQuestions;
