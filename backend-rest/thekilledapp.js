'use strict';

const express = require('express');
const fs = require('fs');
const https = require('https');

const app = express();
app.set('view engine', 'ejs');
// kommentoi alla oleva pois että tämä toimii kotikoneella
// //https://wiki.centos.org/HowTos/Https#head-37cd1f5c67d362756f09313cd758bef48407c325
const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
    key: sslkey,
   cert: sslcert
};
 // kommentoi yllä oleva pois että tämä toimii kotikoneella
const date = { d: Date.now() }
   console.log(date)
        
app.get('/status', (req, res) => {
    
    res.render('status', {
        date: date.d
    });
    
    ;
});
// kommentoi alla oleva pois että tämä toimii kotikoneella
app.get('/', (req, res) => {
    if (req.secure) res.send('https secure');
    else res.send('http not secure');
});
 // kommentoi yllä oleva pois että tämä toimii kotikoneella
app.listen(3000); //normal http traffic

// kommentoi alla oleva pois että tämä toimii kotikoneella
https.createServer(options, app).listen(8000); //https traffic