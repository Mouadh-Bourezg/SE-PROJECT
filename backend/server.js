const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const ModuleRoutes = require('./routes/ModuleRoutes');
const ChapterRoutes = require('./routes/ChapterRoutes');
const QuestionRoutes = require('./routes/QuestionRoutes');
const StudyLevelsRoutes = require('./routes/studyLevelsRoutes');
const QuizRoutes = require('./routes/QuizRoutes');
// Add other routes similarly

const seedModules = require('./seedModules')
const seedChapters = require('./seedChapters')
const seedQuestions = require('./seedQuestions')

const app = express();
app.use(express.json());


// Routes
app.use('/api/Modules', ModuleRoutes);
app.use('/api/Chapters', ChapterRoutes);
app.use('/api/Questions', QuestionRoutes);
app.use('/api/Levels', StudyLevelsRoutes);
app.use('/api/Quiz', QuizRoutes);
// Add other routes here


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log('connected to db & listening on port 5000 ...'));
  })
  .catch(err => console.error(err));


