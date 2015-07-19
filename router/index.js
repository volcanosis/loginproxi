/*
 *Router
 */
 //require credentials hidden on repo
 //for security reasons
var credentials = require('../credentials.js');

//database configuration
var mongoose = require('mongoose');
//Options that can be passed to mongoose
var options = {
  server:{
    socketOptions:{keepAlive:1} //to prevent get "connection closed" err
  }
};

//mongoose model to create applications
var Application = require('../models/application.js');

//export routes
module.exports = function(app){
  //use database for develpment
  //TODO:add connectionString for production env
  switch (app.get('env')) {
    case 'development':
      mongoose.connect(credentials.mongo.dev.connectionString, options);
      break;
    default:
      throw new Error('Unknown execution enviroment: ' + app.get('env'));
  }

  app.get('/', function(req, res){
    return res.redirect(303, '/console');
  });

  app.get('/console',function(req, res){
    res.render('console',{
      title:'developer console',
      organization:'Volcanosis'
    });
  });

  app.get('/console/create-application',function(req, res){
    res.render('createApp');
  });

  app.post('/CreateApp', function(req, res){
    if (req.xhr){
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
      return res.json({status:'succes'});
    }
    return;
  });

  app.get('/console/check-applications', function(req, res){
    res.render('checkApps');
  });

  app.get('/fetchApps', function(req, res){
    Application.find({isActive:true}, function(err, applications){
      var context = {
        applications:applications.map(function(application){
          return{
            appName: application.appName,
            domain: application.domain
          };
        })
      };
      return res.json(context);
    })
  });
};
