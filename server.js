'use strict';
const express = require('express')
    , app = express()
    , React = require('react')
    , path = require('path')
    , logger = require('./lib/logger')
    , bodyParser = require('body-parser')

var port    = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip      = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.use(bodyParser.json());
// Express Router Stuff - mostly JSON calls
app.use('/api',require('./routes/api'));
app.use('',require('./routes/openshift.js'))

// React stuff ... routing and static display
app.use(express.static(path.resolve(__dirname, 'build')));
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port,ip,function(){
    logger.log("app listening on "+ip+":"+port);
});