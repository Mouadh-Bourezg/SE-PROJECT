const mongoose = require('mongoose');

// Define the module schema
const Module = require('./models/Module');

// Sample data for modules
const modules = [
  {
    moduleName: 'Mathematics',
    studyLevel: 'Second%20Grade',
    description: 'Learn about numbers, shapes, and patterns.',
    icon: '➕',
  },
  {
    moduleName: 'Physics',
    studyLevel: 'Second%20Grade',
    description: 'Understand the laws of nature and the universe.',
    icon: '🌌',
  },
  {
    moduleName: 'Chemistry',
    studyLevel: 'Second%20Grade',
    description: 'Explore the composition and properties of matter.',
    icon: '🧪',
  },
  {
    moduleName: 'Biology',
    studyLevel: 'Second%20Grade',
    description: 'Study living organisms and their interactions.',
    icon: '🌱',
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Module.deleteMany();
    console.log('Existing modules cleared.');

    // Insert sample modules
    await Module.insertMany(modules);
    console.log('Sample modules inserted.');

    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

module.exports = seedDatabase;
