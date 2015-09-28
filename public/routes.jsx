'use strcit'

var React = require( 'react' );
var Router = require( 'react-router' );

var Loginproxy = require( './views/loginproxy.jsx' );
var Console = require( './views/console.jsx' );
var Team = require( './views/team.jsx' );
var Application = require( './views/application.jsx' );

var routes = (
  <Router.Route path = "/" handler = {Loginproxy}>
    <Router.Route path = "console" handler = {Console} />
    <Router.Route path = "console/app/:appID" handler = {Application} />    
    <Router.Route path = "team" handler = {Team} />
  </Router.Route>
);

module.exports = routes;
