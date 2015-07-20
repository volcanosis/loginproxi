'use strict';

var React = require('react');

module.exports = React.createClass({
  render:function render(){
    return(
      <html>
        <head>
          <meta charSet='utf-8' />
          <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css' />
	         <link rel="stylesheet" type="text/css" href="/css/app.css"/>
          <title>
            {this.props.title}
          </title>
        </head>
        <body>
          <h1>Volcanosis developer console</h1>
          {this.props.children}
        </body>
        <script src="/bundle.js"></script>
      </html>
    );
  }
});
