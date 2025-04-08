const Proposal = require('../models/Proposal');

// Remove NaN or invalid investment amounts from all proposals
const cleanInvestments = async () => {
  try {
    const proposals = await Proposal.find();

    for (let proposal of proposals) {
      const validInvestments = (proposal.investments || []).filter(
        (inv) => !isNaN(inv.amount) && typeof inv.amount === 'number'
      );

      if (validInvestments.length !== proposal.investments.length) {
        proposal.investments = validInvestments;
        await proposal.save();
        console.log(`Cleaned invalid investments in proposal: ${proposal._id}`);
      }
    }
  } catch (err) {
    console.error('Error cleaning investments:', err);
  }
};

module.exports = { cleanInvestments };