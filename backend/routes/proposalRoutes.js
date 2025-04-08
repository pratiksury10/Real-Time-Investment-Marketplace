const express = require('express');
const { createProposal, getProposals, commentOnProposal, investInProposal } = require('../controllers/proposalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createProposal);
router.get('/', protect, getProposals);
router.post('/:proposalId/comment', protect, commentOnProposal);
router.post('/:proposalId/invest', protect, investInProposal);

module.exports = router;






// const express = require('express');
// const Proposal = require('../models/Proposal');
// const router = express.Router();

// // Create Proposal
// router.post('/proposal', async (req, res) => {
//   const { title, description, fundingGoal } = req.body;

//   const newProposal = new Proposal({ title, description, fundingGoal });

//   try {
//     const savedProposal = await newProposal.save();
//     res.status(201).json(savedProposal);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get all Proposals
// router.get('/proposals', async (req, res) => {
//   try {
//     const proposals = await Proposal.find();
//     res.json(proposals);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
