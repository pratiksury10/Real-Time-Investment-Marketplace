// routes/investments.js
const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');
const Investment = require('../models/Investment');
const { protect } = require('../middleware/authMiddleware'); // ✅ Correct

// POST /api/investments
router.post('/', protect, async (req, res) => {
  const { proposalId, amount } = req.body;
  const investorId = req.user._id;

  try {
    const investment = new Investment({
      proposal: proposalId,
      investor: investorId,
      amount,
    });
    await investment.save();

    // Optionally also push this investment into the proposal's investments array
    await Proposal.findByIdAndUpdate(proposalId, {
      $push: { investments: investment._id }
    });

    res.status(201).json({ message: 'Investment successful', investment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Investment failed' });
  }
});

module.exports = router;