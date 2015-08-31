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

//Application model
var Application = require('../models/application.js');
//API model
var API = require('../models/API.js');

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
  //application and APIS
  app.get('/console',function(req, res){
    res.render(req.url,{
      title:'developer console',
      organization:'Volcanosis'
    });
  });

  //method to create applications
  //TODO:add missing properties on data model
  //when app is created like appid etc
  app.post('/Application', function(req, res){
    if (!req.xhr) return;

    var appName = req.body.appName,
        domain = req.body.appDomain,
        apis = req.body.apis;

    new Application({
      appName: appName,
      domain: domain,
      apis: apis,
      isActive: true,
    }).save(function(err){
      if(err) return console.log('Database connection err ' + err);
      console.log('Application saved');
      //after save data, return all the applications to render on React
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
      });
    });
  });

  app.post('/API', function(req, res){
    if (!req.xhr) return
    var apiName = req.body.ApiName,
        baseUrl = req.body.baseUrl,
        methods = req.body.Methods;

    new API({
      ApiName: apiName,
      baseUrl: baseUrl,
      Methods: methods,
      status: 'Online',
      isActive: true,
    }).save(function(err){
      if(err) return console.log('Database connection err' + err);
      console.log('API saved');
      //after save data, return all the applications to render on React
      API.find({isActive:true}, function(err, APIS){
        var context = {
          APIS:APIS.map(function(API){
            return{
              ApiName: API.ApiName,
              baseUrl: API.baseUrl,
              Methods: API.Methods,
              status: API.status
            };
          })
        };
        return res.json(context);
      });
    });
  });

  //method to fetch application data and
  //exposed to the users
  app.get('/Applications', function(req, res){
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

  app.get('/APIS', function(req, res){
    API.find({isActive:true}, function(err, APIS){
      var context = {
        APIS:APIS.map(function(API){
          return{
            ApiID: API._id,
            ApiName: API.ApiName,
            baseUrl: API.baseUrl,
            Methods: API.Methods,
            status: API.status
          };
        })
      };
      return res.json(context);
    })
  });

  app.get('/team', function(req, res){
    res.render(req.url,{
      team:[
        "Sergio Audel Ortiz Gutierrez",
        "Luis Alonso Valdovinos Valencia"
    ]
    })
  })

 //check 500 err
  app.get('/fail', function(req, res){
    throw new Error('internal server error!');
  });

  //Handle 404 err
  app.use(function(req, res) {
    res.render('404', {
      title: '404',
      url: req.url
    });
  });

  //Handle 500 err
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.render('500',{
      title: 'Internal server error'
    });
	});
};
