/*
 *Router
 */

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('home',{
      title:'Welcome to Volcanosis Home!',
      organization:'Volcanosis'
    });
  });

  app.post('/CreateApp', function(req, res){
    console.log(req.body);
    return res.redirect(303, '/');
  });
};
