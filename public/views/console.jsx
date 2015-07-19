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

//React componets to create new application
var CreateAppBox = React.createClass({
  render: function(){
    return(
      <div className="createAppForm" >
        <h1>Create new application</h1>
        <CreateAppForm url="/CreateApp"/>
      </div>
    );
  }
});
var CreateAppForm = React.createClass({
  handleSubmit: function(evt){
    evt.preventDefault();
    var body = {
      appName: React.findDOMNode(this.refs.appName).value.trim(),
      appDomain: React.findDOMNode(this.refs.appDomain).value.trim()
    }
    if(!body.appName || !body.appDomain) return;

    $.ajax({
      type:'Post',
      url:this.props.url,
      dataType: 'json',
      cache:'false',
      data:body,
      success: function(data){
        console.log(data);
      },
      erorr: function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }
    })

    React.findDOMNode(this.refs.appName).value = '';
    React.findDOMNode(this.refs.appDomain).value = '';
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
          <CreateAppBox />
          <AppBox url="/fetchApps" pollInterval={2000} />
        </div>
      </Layout>
    )
  }
});
