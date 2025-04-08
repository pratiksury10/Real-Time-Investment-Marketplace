// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    note: String
  },
  services: [
    {
      serviceId: String,
      name: String,
      description: String,
      price: Number
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);