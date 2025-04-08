const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  investedAt: {
    type: Date,
    default: Date.now,
  },
});

const proposalSchema = new mongoose.Schema({
  title: String,
  description: String,
  fundingGoal: Number,
  status: {
    type: String,
    default: 'Under Review',
  },
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      commentedAt: { type: Date, default: Date.now },
    },
  ],
  investments: [investmentSchema],
  totalRaised: {
    type: Number,
    default: 0,  // Initialize the total raised to 0
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Proposal', proposalSchema);


// const mongoose = require('mongoose');

// const investmentSchema = new mongoose.Schema({
//   investor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   investedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const proposalSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   fundingGoal: { type: Number, required: true },
//   status: { 
//     type: String, 
//     enum: ['Under Review', 'Negotiating', 'Funded'], 
//     default: 'Under Review' 
//   },
//   founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   comments: [
//     {
//       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       text: String,
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],
//   investments: [investmentSchema] 
// }, { timestamps: true });

// module.exports = mongoose.model('Proposal', proposalSchema);