/*
 *Router
 */
var credentials = require('../credentials.js');
//database configuration
var mongoose = require('mongoose');
var options = {
  server:{
    socketOptions:{keepAlive:1}
  }
};

var Application = require('../models/application.js');

module.exports = function(app){

  switch (app.get('env')) {
    case 'development':
      mongoose.connect(credentials.mongo.dev.connectionString, options);
      break;
    default:
      throw new Error('Unknown execution enviroment: ' + app.get('env'));
  }

  app.get('/', function(req, res){
    res.render('home',{
      title:'Welcome to Volcanosis Home!',
      organization:'Volcanosis'
    });
  });

  app.post('/CreateApp', function(req, res){
    var appName = req.body.appName,
        domain = req.body.appDomain;

    new Application({
      appName: appName,
      domain: domain,
      isActive: true,
    }).save(function(err){
      if(err) return console.log('Database connection err');
      console.log('Data saved');
    });
    return res.redirect(303, '/');
  });
};
