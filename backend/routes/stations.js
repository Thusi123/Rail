const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
  res.json({ message: 'Stations endpoint' });
});

module.exports = router;
