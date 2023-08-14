const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
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
  receivedFrom:{
    type: String,
    trim: true
  },
  receivedFor:{
    type: String,
    trim: true
  }
},{ timestamps: true });

const Credit = mongoose.model('credit', creditSchema);

module.exports = Credit;