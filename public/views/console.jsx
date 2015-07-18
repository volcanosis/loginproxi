'use strict';

var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({
  render:function render(){
    return(
      <Layout {...this.props}>
        <div id="container">
          <CreateAppBox />
        </div>
      </Layout>
    );
  }
});
var CreateAppBox = React.createClass({
  render: function(){
    return(
      <div className="createAppBox">
        <form method="post" action="/CreateApp" name="crateAppForm">
          <input name="appName" id="appNameField" type="text" placeholder="App name"/>
          <input name="appDomain" id="appDomainField" type="text" placeholder="Domain name" />
          <button className="btnCreateApp" type="submit">Create App</button>
        </form>
      </div>
    );
  }
});
