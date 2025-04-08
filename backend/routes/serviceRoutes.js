// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const { handleTransaction } = require('../controllers/serviceController');

// Add this route
router.post('/transaction', handleTransaction);

module.exports = router;
