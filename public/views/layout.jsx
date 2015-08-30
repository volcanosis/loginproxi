'use strict';

var React = require('react');

module.exports = React.createClass({
  render:function render(){
    var mdClass = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent ";
    return(
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="/css/vendor/react-select/default.css"/>
          <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.orange-indigo.min.css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          <link rel="stylesheet" type="text/css" href="/css/app.css"/>
          <title>
            {this.props.title}
          </title>
        </head>
        <body style={this.props.style}>
          <h1>Volcanosis developer console</h1>
          {this.props.children}
        </body>
        <script src="/bundle.js"></script>
        <script src="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.min.js"></script>
      </html>
    );
  }
});
