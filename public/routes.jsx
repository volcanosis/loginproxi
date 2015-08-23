'use strcit'

var React = require('react');
var Router = require('react-router');

var Loginproxy = require('./views/loginproxy.jsx')
var Console = require('./views/console.jsx')

var routes = (
  <Router.Route path = "/" handler = {Loginproxy}>
    <Router.Route path = "console" handler = {Console} />
  </Router.Route>
);

module.exports = routes;
