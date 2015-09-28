'use strict';

//make '.jsx' extensions files requirable by node
require('babel/register');

//require node modules
var express = require('express'),
    http = require('http'),
    path = require('path'),
    renderer = require('react-engine');

var app = express();

//set up react-engine
var engine = renderer.server.create({
  routes : require( path.join( __dirname, '/public/routes.jsx' ) ),
  routesFilePath : path.join( __dirname, '/public/routes.jsx' )
});
app.engine( 'jsx', engine );
app.set( 'views', path.join( __dirname, '/public/views' ) );
app.set( 'view engine', 'jsx' );

app.set( 'view' , renderer.expressView );

//public assets
app.use( express.static( path.join( __dirname, '/public' ) ) );

app.set( 'port', process.env.PORT || 3000 );

app.use( require( 'body-parser' ).json() );
app.use( require( 'body-parser' ).urlencoded({
  extended : true
}));

//router
(require( './router' )( app ) );

http.createServer( app ).listen( app.get( 'port' ), function(){

  var host = 'localhost';

  var port = app.get( 'port' );

  console.log( 'Express started in: ' + app.get( 'env' ) +
  ' mode on http://%s:%s; press Ctrl-c to terminate', host, port);
});
