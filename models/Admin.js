const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'This email is already registered'],
        lowercase: true,
        trim: true,
      },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
        maxlength: [255, 'maximum password length is 255 characters'],
    },
});


const admin = mongoose.model('admin', adminSchema);

module.exports = admin;