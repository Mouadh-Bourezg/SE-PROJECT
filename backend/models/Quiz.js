const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
  score: { type: mongoose.Types.Decimal128, required: true },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', quizSchema);