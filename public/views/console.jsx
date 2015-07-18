'use strict'

var Layout = require('./layout.jsx');
var React = require('react');

var BtnCreateApp = React.createClass({
  render: function(){
    return(
      <a href="/console/create-application" className="btnCreateApp">
        Create application
      </a>
    );
  }
});

var BtnCheckApps = React.createClass({
  render: function(){
    return(
      <a href="/console/check-applications" className="btnCheckApps">
        Check applications
      </a>
    );
  }
});

module.exports = React.createClass({
  render:function render(){
    return(
      <Layout {...this.props}>
        <div id="container">
          <BtnCreateApp />
          <br />
          <BtnCheckApps />
        </div>
      </Layout>
    )
  }
});
