'use strict';

//require node modules
var express = require('express'),
    http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.json({status:'success'});
});

http.createServer(app).listen(app.get('port'),function(){

  var host = 'localhost';

  var port = app.get('port');

  console.log('Express started in: ' + app.get('env') +
  ' mode on http://%s:%s; press Ctrl-c to terminate', host, port);
});
