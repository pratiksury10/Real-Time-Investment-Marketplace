const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  proposal: { type: mongoose.Schema.Types.ObjectId, ref: 'Proposal', required: true },
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);