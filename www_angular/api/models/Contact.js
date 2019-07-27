// Contact.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Contact
let Contact = new Schema({
  ContactID: {
    type: String
  },
  ContactName: {
    type: String
  },
  ContactEmail: {
    type: String
  },
  ContactPhone: {
    type: String
  },
  ContactNote: {
    type: String
  }
},{
    collection: 'Contact'
});

module.exports = mongoose.model('Contact', Contact);