// Import mongoose in model.js
const mongoose = require('mongoose');

// Define the schema for the bill_table subdocument
const billTableSchema = new mongoose.Schema({
  scope: String,
  quantity: Number,
  description: String,
  warranty: String,
  rate: Number,
  total: Number,
});

// Define the main schema for the Quote
const quoteSchema = new mongoose.Schema({
  top_section: {

   date: String,
      // default: Date.now  // Set a default value to the current date and time
   
      quoteno: {
        type: String,
        unique: true // Ensure unique values for quoteno
      },
      property: String,
    company_details: {
      cname: String,
      caddress: String,
      account_details: {
        accno: String,
        bankname: String,
        branchname: String,
      },
    },
     },
  middle_section: {
    bill_table: [billTableSchema], // Array of bill_table subdocuments
    gtotal: Number,
    advance: Number,
    due: Number,
  },
  bottom_section: {
    inwords: String,
    started_within: String,
    finished_within: String,
    testperiod: String,
    quotvaliduntil: String,
    workers: Number,
  },
});

// Create the Quote model
const Quote = mongoose.model('Quote', quoteSchema);

// Create the User model
const User = mongoose.model('User', {
  uname: String,
  password: String,
});

module.exports = {
  User,
  Quote
};
