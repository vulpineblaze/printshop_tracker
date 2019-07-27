// Addr.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Addr
let Addr = new Schema({
  AddrID: {
    type: String
  },
  Addr1: {
    type: String
  },
  Addr2: {
    type: String
  },
  Addr3: {
    type: String
  },
  Addr4: {
    type: String
  },
  Addr5: {
    type: String
  },
  Addr6: {
    type: String
  }
},{
    collection: 'Addr'
});

module.exports = mongoose.model('Addr', Addr);