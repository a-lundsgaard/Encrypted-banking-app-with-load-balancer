const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./database/db");
const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);

const fs = require("fs");
const https = require("https");
const path = require('path')
const middleware = require('./middleware/middleware')

//const accountRoute = require('./routes/accounts');
const clientRoute = require('./routes/clients');
const accountRoute = require('./routes/accounts');

//Added Json Body-parser
app.use(bodyParser.json());
app.use(middleware());

//Import Routes
app.use('/accounts', accountRoute);
app.use('/clients', clientRoute);


//Initial route
app.get('/', (req, res) => {
  res.send('Welcome to the banking app');
});

//process.env.NODE_TLS_REJECT_UNAUTHORIZED=0

let server = https
  .createServer(
    {
      // ...
      //  requestCert: true,
      rejectUnauthorized: false,
      cert: fs.readFileSync(path.join(__dirname, 'keys', 'cert.pem')),
      key: fs.readFileSync(path.join(__dirname, 'keys', 'key.pem')),
      //rejectUnauthorized: false
      //  ca: fs.readFileSync('ca.crt'),
      // ...
    },
    app)
  .listen(ports.register('add-server'), () => {
    console.log('Server listening on ' + server.address().port);
    db.getConnection().then(async res => {
      console.log('Db connected...');
    }, err => {
      console.log("ERROR");
      console.log(err);
    });
  }).on('error', (err) => {
    throw err;
  })

