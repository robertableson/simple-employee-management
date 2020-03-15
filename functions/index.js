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

app.post('/employee', (request, response) => { 
  let employee = {
    firstName: 'Rob',
    lastName: 'Paul',
    hourlyWage: 343,
    birthDate: '1973-03-19T00:00Z'
  };

  //response.send(employee);  
  
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
  
  
  /*db.collection('employees').get()
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
  });*/
});



exports.app = functions.https.onRequest(app);
