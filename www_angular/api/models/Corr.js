// Corr.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Corr
let Corr = new Schema({
  CorrID: {
    type: String
  },
  CorrName: {
    type: String
  },
  CorrDesc: {
    type: String
  },
  CorrLink: {
    type: String
  },
  CorrDateTime: {
    type: String
  }
},{
    collection: 'Corr'
});

module.exports = mongoose.model('Corr', Corr);