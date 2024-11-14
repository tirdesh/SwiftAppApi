// models/Customer.js
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imageData: {
    type: Buffer, // This field will store binary data for the image
    default: null,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
