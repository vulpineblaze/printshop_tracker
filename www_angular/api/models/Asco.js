
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Asco
let Asco = new Schema({
  AscoID: {
    type: String
  },
  AscoName: {
    type: String
  },
  AscoAddrs: {
    type: [Schema.Types.ObjectId], ref: 'Addr'
  },
  AscoContacts: {
    type: [Schema.Types.ObjectId], ref: 'Contact'
  }
},{
    collection: 'Asco'
});

module.exports = mongoose.model('Asco', Asco);