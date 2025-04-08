// controllers/serviceController.js
const Transaction = require('../models/Transaction');

// POST /api/services/transaction
const handleTransaction = async (req, res) => {
  try {
    const { userDetails, services } = req.body;

    if (!userDetails || !services || services.length === 0) {
      return res.status(400).json({ msg: 'Missing data' });
    }

    const newTransaction = new Transaction({ userDetails, services });
    await newTransaction.save();

    res.status(201).json({ msg: 'Transaction successful', transactionId: newTransaction._id });
  } catch (err) {
    console.error('Transaction error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  // ...existing exports
  handleTransaction
};