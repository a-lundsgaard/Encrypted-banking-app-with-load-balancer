const https = require('https'),
    httpProxy = require('http-proxy'),
    seaport = require('seaport'),
    ports = seaport.connect('localhost', 9090);

const fs = require("fs");
const path = require('path');

let i = -1;

const proxy = httpProxy.createProxyServer({
       secure: false
});
const server = https.createServer({
    // ...
    //  requestCert: true,
    //rejectUnauthorized: false,
    cert: fs.readFileSync(path.join(__dirname, 'keys', 'cert.pem')),
    key: fs.readFileSync(path.join(__dirname, 'keys', 'key.pem')),
    //  ca: fs.readFileSync('ca.crt'),
    // ...
}, function (req, res) {
    const addresses = ports.query('add-server');

    if (!addresses.length) {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('The service is available');
        return;
    }

    i = (i + 1) % addresses.length;
    let host = addresses[i].host.split(":").reverse()[0];
    let port = addresses[i].port;
    proxy.web(req, res, { target: 'https://' + host + ':' + port });
});

server.listen(3443, function () {
    console.log(`load balancer listening on port ${3443}`);
}).on('error', (err)=> {
    throw err;
})

