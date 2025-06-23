
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  accountnum:{
    type: Number, 
    unique: true,
    index: true
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
    balance: {
    type: Number,
    default: 0,
  },
    kycStatus: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected'],
    default: 'pending',
  },
  
  country: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
    required: true,
  },
  wardNo: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
    accountCategory: {
    type: String,
    enum: ['Saving', 'Current'],
    required: true,
  },
  accountCurrency: {
    type: String,
    enum: ['INR', 'USD'],
    required: true,
  },
  accountPurpose: {
    type: String,
    enum: ['Personal', 'Business'],
    required: true,
  },


});
const User = mongoose.model("User", userSchema);
module.exports= User