'use strict'

var $ = require('jquery');

var Layout = require('./layout.jsx');
var React = require('react');

//components for check applications
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
  handleCreateAppSubmit: function(application, url){
    //don´t wait untill the request complete
    //instead set state directly and render de applications
    var applications = this.state.data;
    var newApplications = applications.concat([application]);
    this.setState({data: newApplications});

    $.ajax({
      type: 'Post',
      url: url,
      dataType: 'json',
      data: application,
      success: function(data){
        this.setState({data:data.applications});
      }.bind(this),
      erorr: function(xhr, status, err){
        console.log(url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data:[]};
  },
  componentDidMount: function(){
    this.fetchAppsFromServer();
    //TODO: implement technology to fetch data
    //only when a new app is created
    setInterval(this.fetchAppsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
      <div className="appBox">
        <h1>Create new application</h1>
        <CreateAppForm onCreateAppSubmit={this.handleCreateAppSubmit} url="/CreateApp"/>
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
  handleClikEditApp: function(){
    alert('do not work yet');
    console.log(this);
  },
  render: function(){
    return(
      <button onClick={this.handleClikEditApp} className="btnEditdarApp">edit</button>
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

//React componet to create new application
var CreateAppForm = React.createClass({
  handleSubmit: function(evt){
    evt.preventDefault();
    var body = {
      appName: React.findDOMNode(this.refs.appName).value.trim(),
      appDomain: React.findDOMNode(this.refs.appDomain).value.trim()
    }
    if(!body.appName || !body.appDomain) return;

    //send data and url to AppBox commponent and create application
    //and reload application list because the component owns state
    var url = this.props.url;
    this.props.onCreateAppSubmit(body, url);

    //clean inputs after submit
    React.findDOMNode(this.refs.appName).value = '';
    React.findDOMNode(this.refs.appDomain).value = '';
    return;
  },
  render: function(){
    return(
      <form name="crateAppForm" onSubmit={this.handleSubmit}>
        <input ref="appName" id="appNameField" type="text" placeholder="App name"/>
        <input ref="appDomain" id="appDomainField" type="text" placeholder="Domain name" />
        <button value="Post" className="btnCreateApp" type="submit">Create App</button>
      </form>
    );
  }
});

module.exports = React.createClass({
  render:function render(){
    return(
      <Layout {...this.props}>
        <div id="container">
          <AppBox url="/fetchApps" pollInterval={2000} />
        </div>
      </Layout>
    )
  }
});
