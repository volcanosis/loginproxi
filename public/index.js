'use sctrict';

var Routes = require('./routes.jsx')
var Client = require('react-engine/lib/client');

//include all view files
require('./views/**/*.jsx', {glob:true});

//boot
var options = {
  routes: Routes,
  //function that can be called
  //to resolve the file that was rendered.
  viewResolver: function(viewName){
    return require('./views/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad(){
  Client.boot(options);
});
