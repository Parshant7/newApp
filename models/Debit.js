const mongoose = require('mongoose');

const DebitSchema = new mongoose.Schema({
  expenditureType: {
      type: String,
      trim: true,
  },
  otherExpenditureType: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    trim: true,
    required: [true, 'Please enter the amount']
  },
  remarks:{
      type: String,
      trim: true,
  },
  date:{
    type: Date
  }
},{ timestamps: true });

const Debit = mongoose.model('debit', DebitSchema);

module.exports = Debit;