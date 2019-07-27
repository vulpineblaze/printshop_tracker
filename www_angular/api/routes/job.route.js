

const express = require('express');
// const app = express();
const jobRoutes = express.Router();

// Require Job model in our routes module
let Job = require('../models/Job');
let Status = require('../models/Status');
let Corr = require('../models/Corr');
let Acl = require('../models/Acl');

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


// Defined get data(index or listing) route
jobRoutes.route('/acl/:id').get(function (req, res) {
  Acl.find({AclID: req.params.id}).exec((err, acls) => {
    if (err) return console.log(err)

    res.json(acls);    
  });
});

// Defined Job edit route
jobRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Job.findById(id, function (err, job){
      res.json(job);
  });
});

//  Defined Job update route
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

//  Defined Corr update route
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
          res.status(400).send("unable to save newCorr to database");
        });
    } else {
      corr.CorrName = req.body.CorrName;
      corr.CorrDesc = req.body.CorrDesc;
      corr.CorrLink = req.body.CorrLink;

      corr.save().then(corr => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update Corr the database");
      });
    }
  });
});


//  Defined Acl update route
jobRoutes.route('/acl/:id/update').post(function (req, res) {
  let newAcl = new Acl(req.body);
  console.log(req.body);
  Acl.findById(req.params.id, function(err, acl) {
    if (!acl){
      // res.status(404).send("Record not found");
      newAcl.AclDateTime = Date.now();
      newAcl.save()
        .then(newAcl => {
          res.status(200).json({'Acl': 'Acl has been added successfully'});
        })
        .catch(newAcl => {
          res.status(400).send("unable to save newAcl to database");
        });
    } else {
      acl.AclDesc = req.body.AclDesc;
      acl.AclLink = req.body.AclLink;
      acl.AclQty = req.body.AclQty;
      acl.AclCost = req.body.AclCost;

      acl.save().then(acl => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update Acl the database");
      });
    }
  });
});

// Defined Job delete | remove | destroy route
jobRoutes.route('/delete/:id').get(function (req, res) {
    Job.findByIdAndRemove({_id: req.params.id}, function(err, job){
        if(err) res.json(err);
        else res.json('Successfully Job removed');
    });
});


// Defined Corr delete | remove | destroy route
jobRoutes.route('/corr/:id/delete').get(function (req, res) {
    Corr.findByIdAndRemove({_id: req.params.id}, function(err, corr){
        if(err) res.json(err);
        else res.json('Successfully Corr removed');
    });
});

// Defined Acl delete | remove | destroy route
jobRoutes.route('/acl/:id/delete').get(function (req, res) {
    Acl.findByIdAndRemove({_id: req.params.id}, function(err, acl){
        if(err) res.json(err);
        else res.json('Successfully Acl removed');
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