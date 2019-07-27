// Acl.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Acl
let Acl = new Schema({
  AclID: {
    type: String
  },
  AclDesc: {
    type: String
  },
  AclLink: {
    type: String
  },
  AclDateTime: {
    type: String
  },
  AclQty: {
    type: String
  },
  AclCost: {
    type: String
  }
},{
    collection: 'Acl'
});

module.exports = mongoose.model('Acl', Acl);