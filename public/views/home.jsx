'use strict';

var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({
  onButtonClick:function(){
    alert('i was rendered on server side but I am clickable because mounting!');
  },

  render:function render(){
    return(
      <Layout {...this.props}>
        <div id="index">
          <button onClick={this.onButtonClick}>__Click Me__</button>
        </div>
        <CreateAppBox />
      </Layout>
    );
  }
});
var CreateAppBox = React.createClass({
  render: function(){
    return(
      <div className="createAppBox">
        <form method="post" action="/CreateApp" name="crateAppForm">
          <label className="lblCreateApp" htmlFor="appName">
            Escribe el nombre de tu app
          </label>
          <input name="appName" id="appNameField" type="text" placeholder="nombre de la app"/>
          <button className="btnCreateApp" type="submit">Create App</button>
        </form>
      </div>
    );
  }
});
