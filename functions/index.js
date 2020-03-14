const functions = require('firebase-functions');
const express = require('express');

const app = express();

let employees = [
  {  
    'firstName': 'Marry',
    'lastName': 'Lovin',
    'hourlyWage': 20,
    'birthDate': '1993-03-19T00:00Z'
  },
  {  
    'firstName': 'Harry',
    'lastName': 'McBurger',
    'hourlyWage': 40,
    'birthDate': '1983-03-19T00:00Z'
  }
];

app.get('/employees', (request, response) => {
  response.send(employees);
});

exports.app = functions.https.onRequest(app);
