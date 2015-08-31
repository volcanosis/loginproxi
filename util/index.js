'use strict';

var credentials = require('../credentials.js');

//database configuration
var mongoose = require('mongoose');
var options = {
  server:{
    socketOptions:{keepAlive:1}
  }
};

//model to create applications
var Application = require('../models/applications.js');


module.exports = {
  fetchApps: function(filter){
    console.log('Hi! ' + name);
  }
}
