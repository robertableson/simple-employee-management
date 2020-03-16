const functions = require('firebase-functions');
const express = require('express');
var admin = require("firebase-admin");

var serviceAccount = require("./employee-management-15524-firebase-adminsdk-krnni-5e09b0fc09.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://employee-management-15524.firebaseio.com"
});

const db = admin.firestore();
const app = express();

// -------------- Get all employees in DB -------------- //

app.get('/employees', (request, response) => {
  db.collection('employees').get()
  .then((snapshot) => {
    let employees = [];
    
    snapshot.forEach((doc) => {
      employees.push(doc.data());
    });

    response.send(employees);
  })
  .catch((err) => {
    response.send({
      'status': 'fail',
      'message': err
    });
  });
});

// -------------- Get specific employee by ID in DB -------------- //

app.get('/employee/:id', (request, response) => {
  db.collection('employees').doc(request.params.id).get()
  .then(doc => {
    if (doc.exists) {
      response.send({
        'status': 'success',
        'docData': doc.data()
      });
    } 
    else {
      response.send({
        'status': 'fail',
        'message': 'No such employee.'
      });
    }    
  })
  .catch((err) => {
    response.send({
      'status': 'fail',
      'message': err
    });
  });
});

// -------------- Add new employee to DB -------------- //

app.post('/employee', (request, response) => { 
  let employee = {
    firstName:  request.query.firstName,
    lastName:   request.query.lastName,
    hourlyWage: Number(request.query.hourlyWage),
    birthDate:  request.query.birthDate
  };
  
  db.collection('employees').add(employee).then(ref => {
    response.send({
      'status': 'success',
      'docId': ref.id
    });
  }).catch((err) => {
    response.send({
      'status': 'fail',
      'message': err
    });
  });
});

// -------------- Update existing employee in DB -------------- //

app.put('/employee/:id', (request, response) => { 
  let employee = {
    firstName:  request.query.firstName,
    lastName:   request.query.lastName,
    hourlyWage: Number(request.query.hourlyWage),
    birthDate:  request.query.birthDate
  };

  db.collection('employees').doc(request.params.id).update(employee).then(ref => {
    response.send({
      'status': 'success',
      'docId': ref.id
    });
  }).catch((err) => {
    response.send({
      'status': 'fail',
      'message': err
    });
  });
});

// -------------- Delete existing employee in DB -------------- //

app.delete('/employee/:id', (request, response) => { 

  db.collection('employees').doc(request.params.id).delete().then(() => {
    response.send({
      'status': 'success'
    });
  }).catch((err) => {
    response.send({
      'status': 'fail',
      'message': err
    });
  });
});

exports.app = functions.https.onRequest(app);
