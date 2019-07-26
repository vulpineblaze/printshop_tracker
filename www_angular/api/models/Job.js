
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Job
let Job = new Schema({
  JobName: {
    type: String
  },
  JobDescription: {
    type: String
  },
  JobStatuses: {
    type: [Schema.Types.ObjectId], ref: 'Status'
  }
},{
    collection: 'Job'
});

module.exports = mongoose.model('Job', Job);