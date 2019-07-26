// Status.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Status
let Status = new Schema({
  StatusID: {
    type: String
  },
  StatusName: {
    type: String
  },
  StatusDateTime: {
    type: String
  }
},{
    collection: 'Status'
});

module.exports = mongoose.model('Status', Status);