const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  moduleName: { type: String, required: true }, // Maps to `name` in Subject
  studyLevel: { type: String, required: true }, // Optional but included for filtering
  description: { type: String, required:true }, // Matches `description` in Subject
  icon: { type: String, required: true },       // Matches `icon` in Subject
});

module.exports = mongoose.model('Module', moduleSchema);
