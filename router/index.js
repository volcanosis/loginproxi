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

  //when user open the app redirect /console
  app.get('/', function(req, res){
    return res.redirect(303, '/console');
  });

  //developer console to create and configure
  //application
  app.get('/console',function(req, res){
    res.render('console',{
      title:'developer console',
      organization:'Volcanosis'
    });
  });

  //method to create applications
  //TODO:add missing properties on data model
  //when app is created like appid etc
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
        //after save data, return all the applications to render on React
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
        });
      });
    }
    return;
  });

  //method to fetch application data and
  //exposed to the users
  app.get('/fetchApps', function(req, res){
    Application.find({isActive:true}, function(err, applications){
      var context = {
        applications:applications.map(function(application){
          return{
            appID: application._id,
            appName: application.appName,
            domain: application.domain
          };
        })
      };
      return res.json(context);
    })
  });
};
