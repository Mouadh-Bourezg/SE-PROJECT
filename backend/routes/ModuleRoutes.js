const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

// Get all modules
router.get('/', async (req, res) => {
    console.log('Query params:', req.query);
  const { level } = req.query; // Extract the study level from the query parameter

  try {
    // If a level is provided, filter by it; otherwise, fetch all modules
    const query = level ? { studyLevel: level } : {};
    const modules = await Module.find(query);

    // Transform `modules` to match the `Subject` structure
    const subjects = modules.map((module) => ({
      id: module._id,           // Map MongoDB `_id` to `id`
      name: module.moduleName,  // Map `moduleName` to `name`
      description: module.description, // Map `description`
      icon: module.icon,        // Map `icon`
    }));

    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Failed to fetch modules' });
  }
});

module.exports = router;
