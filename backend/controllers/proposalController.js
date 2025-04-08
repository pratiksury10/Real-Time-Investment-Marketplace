const Proposal = require('../models/Proposal');

// Create Proposal
const createProposal = async (req, res) => {
  const { title, description, fundingGoal } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const proposal = new Proposal({
      title,
      description,
      fundingGoal,
      founder: req.user._id,
    });

    const saved = await proposal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Proposals
const getProposals = async (req, res) => {
  try {
    const filter = req.user.role === 'founder' ? { founder: req.user._id } : {};

    const proposals = await Proposal.find(filter)
      .populate('founder', 'name email')
      .populate({
        path: 'investments.investor',
        select: 'name email',
      });

    res.status(200).json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Comment on Proposal
const commentOnProposal = async (req, res) => {
  const { proposalId } = req.params;
  const { text } = req.body;

  try {
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

    proposal.comments.push({ user: req.user._id, text });
    await proposal.save();
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Invest in Proposal
const investInProposal = async (req, res) => {
  const { proposalId } = req.params;
  const { amount } = req.body;

  try {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: 'Invalid investment amount' });
    }

    const proposal = await Proposal.findById(proposalId);
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

    // Check if the user has already invested in this proposal
    const existingInvestment = proposal.investments.find(investment => 
      investment.investor.toString() === req.user._id.toString()
    );
    
    if (existingInvestment) {
      return res.status(400).json({ message: 'You have already invested in this proposal' });
    }

    proposal.investments.push({
      investor: req.user._id,  // Assuming the user is authenticated via JWT
      amount: numericAmount,
    });

    // Update total raised
    proposal.totalRaised += numericAmount;
    await proposal.save();

    // Return the updated proposal with populated investor data
    const updatedProposal = await Proposal.findById(proposalId)
      .populate('founder', 'name email')
      .populate('investments.investor', 'name email');

    res.status(200).json({ message: 'Investment successful', proposal: updatedProposal });
  } catch (err) {
    console.error('Investment error:', err);
    res.status(500).json({ message: 'Investment failed' });
  }
};

module.exports = {
  createProposal,
  getProposals,
  commentOnProposal,
  investInProposal,
};







// const Proposal = require('../models/Proposal');

// // Create Proposal
// const createProposal = async (req, res) => {
//   const { title, description, fundingGoal } = req.body;

//   try {
//     const proposal = new Proposal({
//       title,
//       description,
//       fundingGoal,
//       founder: req.user._id,
//     });

//     const saved = await proposal.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get All Proposals
// const getProposals = async (req, res) => {
//   try {
//     const filter = req.user.role === 'founder' ? { founder: req.user._id } : {};

//     const proposals = await Proposal.find(filter)
//       .populate('founder', 'name email')
//       .populate({
//         path: 'investments.investor',
//         select: 'name email',
//       });

//     res.status(200).json(proposals);
//   } catch (error) {
//     console.error('Error fetching proposals:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Comment on Proposal
// const commentOnProposal = async (req, res) => {
//   const { proposalId } = req.params;
//   const { text } = req.body;

//   try {
//     const proposal = await Proposal.findById(proposalId);
//     if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

//     proposal.comments.push({ user: req.user._id, text });
//     await proposal.save();
//     res.json(proposal);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Invest in Proposal
// const investInProposal = async (req, res) => {
//   const { proposalId } = req.params;
//   const { amount } = req.body;

//   try {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       return res.status(400).json({ message: 'Invalid investment amount' });
//     }

//     const proposal = await Proposal.findById(proposalId);
//     if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

//     proposal.investments.push({
//       investor: req.user._id,  // Assuming the user is authenticated via JWT
//       amount: numericAmount,
//     });

//     // Update total raised
//     proposal.totalRaised += numericAmount;
//     await proposal.save();

//     // Return the updated proposal with populated investor data
//     const updatedProposal = await Proposal.findById(proposalId)
//       .populate('founder', 'name email')
//       .populate('investments.investor', 'name email');

//     res.status(200).json({ message: 'Investment successful', proposal: updatedProposal });
//   } catch (err) {
//     console.error('Investment error:', err);
//     res.status(500).json({ message: 'Investment failed' });
//   }
// };

// module.exports = {
//   createProposal,
//   getProposals,
//   commentOnProposal,
//   investInProposal,
// };






// const Proposal = require('../models/Proposal');
// const { cleanInvestments } = require('../utils/cleanupUtils'); // 👈 Added

// // Create Proposal
// const createProposal = async (req, res) => {
//   const { title, description, fundingGoal } = req.body;

//   try {
//     const proposal = new Proposal({
//       title,
//       description,
//       fundingGoal,
//       founder: req.user._id,
//     });

//     const saved = await proposal.save();

//     await cleanInvestments(); // 👈 Clean up proposals after saving

//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get All Proposals
// const getProposals = async (req, res) => {
//   try {
//     const filter = req.user.role === 'founder' ? { founder: req.user._id } : {};

//     const proposals = await Proposal.find(filter)
//       .populate('founder', 'name email')
//       .populate('investments.investor', 'name email');

//     res.status(200).json(proposals);
//   } catch (error) {
//     console.error('Error fetching proposals:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Comment on Proposal
// const commentOnProposal = async (req, res) => {
//   const { proposalId } = req.params;
//   const { text } = req.body;

//   try {
//     const proposal = await Proposal.findById(proposalId);
//     if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

//     proposal.comments.push({ user: req.user._id, text });
//     await proposal.save();
//     res.json(proposal);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST /api/proposals/:proposalId/invest
// const investInProposal = async (req, res) => {
//   try {
//     const { proposalId } = req.params;
//     const { amount } = req.body;

//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       return res.status(400).json({ message: 'Invalid investment amount' });
//     }

//     const proposal = await Proposal.findById(proposalId);
//     if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

//     proposal.investments.push({
//       investor: req.user._id,
//       amount: numericAmount,
//     });

//     await proposal.save();
//     res.status(200).json({ message: 'Investment successful', proposal });
//   } catch (err) {
//     console.error('Investment error:', err);
//     res.status(500).json({ message: 'Investment failed' });
//   }
// };

// module.exports = { createProposal, getProposals, commentOnProposal, investInProposal };