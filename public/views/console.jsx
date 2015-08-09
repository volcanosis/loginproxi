'use strict'

//libs
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
        console.log(data);
        this.setState({applications:data.applications});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCreateAppSubmit: function(application, url){
    //don´t wait untill the request complete
    //instead set state directly and render de applications
    var applications = this.state.applications;
    var newApplications = applications.concat([application]);
    this.setState({applications: newApplications});

    $.ajax({
      type: 'Post',
      url: url,
      dataType: 'json',
      data: application,
      success: function(data){
        this.setState({applications:data.applications});
      }.bind(this),
      erorr: function(xhr, status, err){
        console.log(url, status, err.toString());
      }.bind(this)
    });
  },
  handleCreateAPISubmit: function(body, url){
    $.ajax({
      type: 'Post',
      url: url,
      dataType: 'json',
      data: body,
      success: function(data){
        //TODO:show data on client
        console.log(data)
      },
      erorr: function(xhr, status, err){
        console.log(url, status, err.toString());
      }
    });
  },
  getInitialState: function(){
    return {applications:[]};
  },
  componentDidMount: function(){
    this.fetchAppsFromServer();
    //TODO: implement technology to fetch data
    //only when a new app is created
    //setInterval(this.fetchAppsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
      <div className="appBox">
        <h1>Create new application</h1>
        <CreateAppForm onCreateAppSubmit={this.handleCreateAppSubmit} url="/CreateApp"/>
        <CreateAPIForm onCreateAPISubmit={this.handleCreateAPISubmit} url="/CreateAPI"/>
        <h1>Applications</h1>
        <AppList applications={this.state.applications}/>
      </div>
    );
  }
});
var AppList = React.createClass({
  render: function(){
    var ApplicationsNodes = this.props.applications.map(function(application){
      return (
        <App key={application.appID} appID={application.appID} appName={application.appName}>
          {application.domain} {application.appID}
        </App>
      );
    })
    return(
      <div className="appList">
        {ApplicationsNodes}
      </div>
    );
  }
});
var AppEditForm = React.createClass({
  handleClikEditApp: function(){
    console.log('lets modify this application' + this.props.appID);
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
          <AppEditForm appID={this.props.appID}/>
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
        <ApiSelect url="/fetchAPIS" />
        <button value="Post" className="btnCreateApp" type="submit">Create App</button>
      </form>
    );
  }
});

//React componet to create new application
var CreateAPIForm = React.createClass({
  handleSubmit: function(evt){
    evt.preventDefault();
    var body = {
      ApiName: React.findDOMNode(this.refs.AppiName).value.trim(),
      baseUrl: React.findDOMNode(this.refs.baseUrl).value.trim()
    }
    if(!body.ApiName || !body.baseUrl) return;

    //send data and url to AppBox commponent and create application
    //and reload application list because the component owns state
    var url = this.props.url;
    this.props.onCreateAPISubmit(body, url);

    //clean inputs after submit
    React.findDOMNode(this.refs.AppiName).value = '';
    React.findDOMNode(this.refs.baseUrl).value = '';
    return;
  },
  render: function(){
    return(
      <form name="crateAppiForm" onSubmit={this.handleSubmit}>
        <input ref="AppiName" id="AppiNameField" type="text" placeholder="API name"/>
        <input ref="baseUrl" id="baseUrlField" type="text" placeholder="base url" />
        <button value="Post" className="btnCreateApi" type="submit">Create API</button>
      </form>
    );
  }
});

var Select = require('react-select');
var ApiSelect = React.createClass({
  logChange: function(val){
    console.log('Selected ' + val)
  },
  fetchAPISFromServer: function(){
    var url = this.props.url;

    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log(data);
        var options = data.APIS.map(function(API){
          return {
            value: API.ApiID,
            label: API.ApiName
          }
        })
        this.setState({options:options});
      }.bind(this),
      erorr: function(xhr, status, err){
        console.log(url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.fetchAPISFromServer();
  },
  getInitialState: function(){
    return {options:[]};
  },
  render: function(){
    return(
      <Select
          name="form-field-name"
          multi={true}
          options={this.state.options}
          onChange={this.logChange}
      />
    );
  }
});

module.exports = React.createClass({
  render:function render(){
    return(
      <Layout {...this.props}>
        <div id="container">
          <AppBox url="/fetchApps" pollInterval={9000} />
        </div>
      </Layout>
    )
  }
});
