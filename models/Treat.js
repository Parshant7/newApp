const mongoose = require('mongoose');

const TreatSchema = new mongoose.Schema({
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
  },
  treatBy:{
    type: String,
    trim: true
  }
},{ timestamps: true });

const Treat = mongoose.model('treat', TreatSchema);

module.exports = Treat;