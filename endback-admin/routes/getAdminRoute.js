'use strict'; // Use strict mode in this code.
require('dotenv').config(); // Require the dotenv module.
const express = require('express'); // Require the express module.
const datenow = Date.now(); // Get the current date and time.
const date = [{'datenow': datenow}]; // Create an object with the current date and time.
const fs = require('fs'); // Require the fs module.
const router = express.Router(); // Create a router object with express.
const {
  getAdminDataCounts,
  getAdminDataUptime,
  getAdminDataAllusers,
  getAdminDataAllrecipeData,
  getAdminDataAllcommentswithauthors,
} = require('../controllers/adminController'); // Require the adminController module.
router.get('/c', getAdminDataCounts); // Get the count of all user comments.
router.get('/ut', getAdminDataUptime); // Get the uptime of the server.
router.get('/au', getAdminDataAllusers); // Get all user data.
router.get('/rd', getAdminDataAllrecipeData); // Get all recipe data.
router.get('/co', getAdminDataAllcommentswithauthors); // Get all comments with the author data.
const logic = 1 + 2; // Create a variable with the value 3.
router.get('/m', function(req, res, next) { // Create a route for the server status.
  if (process.env.NODE_ENV === 'production') { // If the server is in production mode.
    const mariadbstatus = fs.readFileSync( // Read the mariadbstatus.txt file.
        '/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt'); // Set the path of the mariadbstatus.txt file.
    const mariadbstatusfixed = mariadbstatus.toString(). // Convert the mariadbstatus variable to a string.
        includes('active (running)'); // Check if the string includes the string 'active (running)'.

    const mariadbstatusfixedJson = [{'status': mariadbstatusfixed}]; // Create an object with the status of the mariadbstatus.
    res.send(mariadbstatusfixedJson); // Send the response to the client.
  } else { // If the server is not in production mode.
    res.send('[{ "status":" localhost"}]'); // Send a response to the client.
  }
});
router.get('/n', function(req, res, next) { // Create a route for the node.js status.
  if (logic === 3) { // If the logic variable is equal to 3.
    res.send('[{ "status":"node.js is running"}]'); // Send a response to the client.
  } else { // If the logic variable is not equal to 3.
    res.send('[{ "status":"wtf is going on with node.js"}]'); // Send a response to the client.

  }
});
router.get('/a', function(req, res, next) { // Create a route for the apache status.
  if (process.env.NODE_ENV === 'production') { // If the server is in production mode.
    const apachestatus = fs.readFileSync( // Read the apachestatus.txt file.
        '/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt'); // Set the path of the apachestatus.txt file.
    const apachestatusfixed = apachestatus.toString(). // Convert the apachestatus variable to a string.
        includes('active (running)'); // Check if the string includes the string 'active (running)'.
    const apachestatusfixedJson = [{'status': apachestatusfixed}]; // Create an object with the status of the apachestatus.
    res.send(apachestatusfixedJson); // Send the response to the client.
  } else { // If the server is not in production mode.
    res.send('[{ "status":"localhost"}]'); // Send a response to the client.
  }

});

router.get('/n/s', function(req, res, next) { // Create a route for the server date and time.
      res.send(date); // Send a response to the client.
    },
);
module.exports = router; // Export the router object.