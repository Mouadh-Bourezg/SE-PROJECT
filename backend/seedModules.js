const mongoose = require('mongoose');

// Define the module schema
const Module = require('./models/Module');

// Sample data for modules
const modules = [
  { moduleName: 'Mathematics', studyLevel: 'Primary' },
  { moduleName: 'Science', studyLevel: 'Primary' },
  { moduleName: 'History', studyLevel: 'Primary' },
  { moduleName: 'Mathematics', studyLevel: 'Secondary' },
  { moduleName: 'Physics', studyLevel: 'Secondary' },
  { moduleName: 'Chemistry', studyLevel: 'Secondary' },
  { moduleName: 'Computer Science', studyLevel: 'University' },
  { moduleName: 'Economics', studyLevel: 'University' },
  { moduleName: 'Artificial Intelligence', studyLevel: 'University' }
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
