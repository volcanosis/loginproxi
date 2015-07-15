'use strict';

var React = require('react');

module.exports = React.createClass({
  render:function render(){
    return(
      <html>
        <head>
          <meta charSet='utf-8' />
	         <link rel="stylesheet" type="text/css" href="/css/app.css"/>
          <title>
            {this.props.title}
          </title>
        </head>
        <body>
          {this.props.children}
        </body>
        <script src="/bundle.js"></script>
      </html>
    );
  }
});
