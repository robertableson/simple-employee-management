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
      console.log(doc.data());
      employees.push(doc.data());
    });

    response.send(employees);
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
});

// -------------- Add new employee to DB -------------- //

app.post('/employee', (request, response) => { 
  let employee = {
    firstName:  request.param('firstName'),
    lastName:   request.param('lastName'),
    hourlyWage: Number(request.param('hourlyWage')),
    birthDate:  request.param('birthDate')
  };
  
  db.collection('employees').add(employee).then(ref => {
    console.log('Added document with ID: ', ref.id);
    response.send({
      'status': 'success',
      'docId': ref.id
    });
  }).catch((err) => {
    console.log('Error adding document', err);
    response.send({
      'status': 'fail',
      'message': err
    });
  });
});



exports.app = functions.https.onRequest(app);
