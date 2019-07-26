

const express = require('express');
const app = express();
const jobRoutes = express.Router();

// Require Job model in our routes module
let Job = require('../models/Job');
let Status = require('../models/Status');
let Corr = require('../models/Corr');

// Defined store route
jobRoutes.route('/add').post(function (req, res) {
  // console.log("/add");
  let job = new Job(req.body);
  job.save()
    .then(job => {
      res.status(200).json({'Job': 'Job has been added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
jobRoutes.route('/').get(function (req, res) {
  Job.find({}).populate({path: 'JobStatuses', model:'Status'}).exec((err, jobs) => {
    if (err) return console.log(err)

    res.json(jobs);    
  });
});

// Defined get data(index or listing) route
jobRoutes.route('/corr/:id').get(function (req, res) {
  Corr.find({CorrID: req.params.id}).exec((err, corrs) => {
    if (err) return console.log(err)

    res.json(corrs);    
  });
});

// Defined edit route
jobRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Job.findById(id, function (err, job){
      res.json(job);
  });
});

//  Defined update route
jobRoutes.route('/update/:id').post(function (req, res) {
  Job.findById(req.params.id, function(err, job) {
    if (!job)
      res.status(404).send("Record not found");
    else {
      job.JobName = req.body.JobName;
      job.JobDescription = req.body.JobDescription;

      job.save().then(job => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined update route
jobRoutes.route('/corr/:id/update').post(function (req, res) {
  let newCorr = new Corr(req.body);

  Corr.findById(req.params.id, function(err, corr) {
    if (!corr){
      // res.status(404).send("Record not found");
      newCorr.CorrDateTime = Date.now();
      newCorr.save()
        .then(newCorr => {
          res.status(200).json({'Corr': 'Corr has been added successfully'});
        })
        .catch(newCorr => {
          res.status(400).send("unable to save to database");
        });
    } else {
      corr.CorrName = req.body.CorrName;
      corr.CorrDesc = req.body.CorrDesc;
      corr.CorrLink = req.body.CorrLink;

      corr.save().then(corr => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
jobRoutes.route('/delete/:id').get(function (req, res) {
    Job.findByIdAndRemove({_id: req.params.id}, function(err, job){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


// Defined delete | remove | destroy route
jobRoutes.route('/corr/:id/delete').get(function (req, res) {
    Corr.findByIdAndRemove({_id: req.params.id}, function(err, corr){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

//  job status 
jobRoutes.route('/status/:id/:status').get(function (req, res) {
    // console.log(req.params.status,req.params.id);
    Job.findById(req.params.id, function(err, job) {
    if (!job)
      res.status(404).send("Record not found");
    else {
      let status = new Status();

      status.StatusID = req.params.id;
      status.StatusName = req.params.status;
      status.StatusDateTime = Date.now();

      status.save().then(status => {
        job.JobStatuses.push(status);
        job.save();
        console.log(job, status);
        res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

module.exports = jobRoutes;