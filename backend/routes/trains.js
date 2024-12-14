const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
  res.json({ message: 'Trains endpoint' });
});

module.exports = router;
