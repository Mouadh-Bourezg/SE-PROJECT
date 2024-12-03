const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// POST
router.post('/', async (req, res) => {
    try {
        console.log('haha');
        const { question_id, child_id, score } = req.body;
        console.log('trying to create a quiz instance :'+ question_id + child_id);

        if (!question_id || !child_id) {
            return res.status(400).send('Missing required fields.');
        }

        const newQuiz = new Quiz({
            question_id,
            child_id,
            score,
        });

        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating quiz instance.');
    }
});

module.exports = router;