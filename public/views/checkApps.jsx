'use strict';

var $ = require('jquery');

var Layout = require('./layout.jsx');
var React = require('react');

var AppBox = React.createClass({
  fetchAppsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache:false,
      success:function(data){
        this.setState({data:data.applications});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data:[]};
  },
  componentDidMount: function(){
    this.fetchAppsFromServer();
    //TODO: implement technology to fetch data
    //nonly when a new app is created
    setInterval(this.fetchAppsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
      <div className="appBox">
        <h1>Applications</h1>
        <AppList data={this.state.data}/>
      </div>
    );
  }
});

var AppList = React.createClass({
  render: function(){
    var AppsNodes = this.props.data.map(function(app){
      return (
        <App appName={app.appName}>
          {app.domain}
        </App>
      );
    })
    return(
      <div className="appList">
        {AppsNodes}
      </div>
    );
  }
});

var AppEditForm = React.createClass({
  render: function(){
    return(
      <button className="btnEditdarApp">editar</button>
    );
  }
});
var App = React.createClass({
  render: function(){
    return(
      <div className="app">
        <h2>
          {this.props.appName}
        </h2>
        <span>{this.props.children}</span>
        <div className="editAppBox">
          <AppEditForm/>
        </div>
      </div>
    );
  }
});

module.exports = React.createClass({
  render: function render(){
    return(
      <Layout {...this.props}>
        <div className="container">
          <AppBox url="/fetchApps" pollInterval={2000} />
        </div>
      </Layout>
    );
  }
});
