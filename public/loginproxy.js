'use sctrict';

var Client = require('react-engine/lib/client');

//include all view files
require('./views/**/*.jsx', {glob:true});

var $ = require('jquery');

//boot
var options = {
  //function that can be called
  //to resolve the file that was rendered.
  viewResolver: function(viewName){
    return require('./views/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad(){
  Client.boot(options);
});
