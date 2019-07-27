// asco.route.js

const express = require('express');
// const app = express();
const ascoRoutes = express.Router(); 

// Require Asco model in our routes module
let Asco = require('../models/Asco');
let Addr = require('../models/Addr');
let Contact = require('../models/Contact');

// Defined store route
ascoRoutes.route('/add').post(function (req, res) {
  console.log("in add");
  let asco = new Asco(req.body);
  // console.log(asco);
  asco.save()
    .then(asco => {
      res.status(200).json({'Asco': 'Asco has been added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
ascoRoutes.route('/').get(function (req, res) {
  console.log("in get");
  Asco.find({}).exec((err, ascos) => {
    if (err) return console.log(err)

    res.json(ascos);
  });
});

// Defined edit route
ascoRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Asco.findById(id, function (err, asco){
      res.json(asco);
  });
});

//  Defined update route
ascoRoutes.route('/update/:id').post(function (req, res) {
  Asco.findById(req.params.id, function(err, asco) {
    if (!asco)
      res.status(404).send("Record not found");
    else {
      asco.AscoName = req.body.AscoName;;

      asco.save().then(asco => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
ascoRoutes.route('/delete/:id').get(function (req, res) {
    Asco.findByIdAndRemove({_id: req.params.id}, function(err, asco){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


// -----------------   ADDR

// Defined get data(index or listing) route
ascoRoutes.route('/addr/:id').get(function (req, res) {
  Addr.find({AddrID: req.params.id}).exec((err, addrs) => {
    if (err) return console.log(err)

    res.json(addrs);    
  });
});

//  Defined Addr update route
ascoRoutes.route('/addr/:id/update').post(function (req, res) {
  let newAddr = new Addr(req.body);

  Addr.findById(req.params.id, function(err, addr) {
    if (!addr){
      // res.status(404).send("Record not found");
      newAddr.save()
        .then(newAddr => {
          res.status(200).json({'Addr': 'Addr has been added successfully'});
        })
        .catch(newAddr => {
          res.status(400).send("unable to save newAddr to database");
        });
    } else {
      addr.Addr1 = req.body.Addr1;
      addr.Addr2 = req.body.Addr2;
      addr.Addr3 = req.body.Addr3;
      addr.Addr4 = req.body.Addr4;
      addr.Addr5 = req.body.Addr5;
      addr.Addr6 = req.body.Addr6;

      addr.save().then(addr => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update Addr the database");
      });
    }
  });
});

// Defined Addr delete | remove | destroy route
ascoRoutes.route('/addr/:id/delete').get(function (req, res) {
    Addr.findByIdAndRemove({_id: req.params.id}, function(err, addr){
        if(err) res.json(err);
        else res.json('Successfully Addr removed');
    });
});


// -------------------    CONTACTS




// Defined get data(index or listing) route
ascoRoutes.route('/contact/:id').get(function (req, res) {
  Contact.find({ContactID: req.params.id}).exec((err, contacts) => {
    if (err) return console.log(err)

    res.json(contacts);    
  });
});

//  Defined Contact update route
ascoRoutes.route('/contact/:id/update').post(function (req, res) {
  let newContact = new Contact(req.body);

  Contact.findById(req.params.id, function(err, contact) {
    if (!contact){
      // res.status(404).send("Record not found");
      newContact.save()
        .then(newContact => {
          res.status(200).json({'Contact': 'Contact has been added successfully'});
        })
        .catch(newContact => {
          res.status(400).send("unable to save newContact to database");
        });
    } else {
      contact.ContactName = req.body.ContactName;
      contact.ContactEmail = req.body.ContactEmail;
      contact.ContactPhone = req.body.ContactPhone;
      contact.ContactNote = req.body.ContactNote;

      contact.save().then(contact => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update Contact the database");
      });
    }
  });
});

// Defined Contact delete | remove | destroy route
ascoRoutes.route('/contact/:id/delete').get(function (req, res) {
    Contact.findByIdAndRemove({_id: req.params.id}, function(err, contact){
        if(err) res.json(err);
        else res.json('Successfully Contact removed');
    });
});





module.exports = ascoRoutes;