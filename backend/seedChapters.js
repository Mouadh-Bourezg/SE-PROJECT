const mongoose = require('mongoose');
const Chapter = require('./models/Chapter'); // Adjust path based on your folder structure

// Example chapter data
const chapters = [
    { moduleId: '674a45a54fef10899d8cf370', chapterName: 'Addition and Subtraction' },
    { moduleId: '674a45a54fef10899d8cf370', chapterName: 'Multiplication and Division' },
    { moduleId: '674a45a54fef10899d8cf371', chapterName: 'Plants and Animals' },
    { moduleId: '674a45a54fef10899d8cf371', chapterName: 'Weather and Seasons' },
    { moduleId: '674a45a54fef10899d8cf372', chapterName: 'World War II' },
    { moduleId: '674a45a54fef10899d8cf372', chapterName: 'Ancient Civilizations' },
    { moduleId: '674a45a54fef10899d8cf373', chapterName: 'Algebra' },
    { moduleId: '674a45a54fef10899d8cf373', chapterName: 'Geometry' },
    { moduleId: '674a45a54fef10899d8cf374', chapterName: 'Newton’s Laws' },
    { moduleId: '674a45a54fef10899d8cf374', chapterName: 'Electromagnetism' },
    { moduleId: '674a45a54fef10899d8cf375', chapterName: 'Chemical Reactions' },
    { moduleId: '674a45a54fef10899d8cf375', chapterName: 'Periodic Table' },
    { moduleId: '674a45a54fef10899d8cf376', chapterName: 'Programming Basics' },
    { moduleId: '674a45a54fef10899d8cf376', chapterName: 'Data Structures' },
    { moduleId: '674a45a54fef10899d8cf377', chapterName: 'Microeconomics' },
    { moduleId: '674a45a54fef10899d8cf377', chapterName: 'Macroeconomics' },
    { moduleId: '674a45a54fef10899d8cf378', chapterName: 'Machine Learning' },
    { moduleId: '674a45a54fef10899d8cf378', chapterName: 'Neural Networks' },
];

// Seed the chapters
const seedChapters = async () => {
    try {
        await Chapter.deleteMany(); // Clear existing chapters
        console.log('Existing Chapters cleared')
        await Chapter.insertMany(chapters);
        console.log('Chapters seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding chapters:', err);
        mongoose.connection.close();
    }
};

module.exports = seedChapters;
