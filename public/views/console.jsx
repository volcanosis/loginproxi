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
        <App key={application.appID} appName={application.appName}>
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
        <ApiSelect />
        <button value="Post" className="btnCreateApp" type="submit">Create App</button>
      </form>
    );
  }
});
var Select = require('react-select');
var ApiSelect = React.createClass({
  logChange: function(val){
    console.log('Selected ' + val)
  },
  getInitialState: function(){
    return {options:[
      {value: 'MCT', label: 'MCT'},
      {value: 'Ristorante', label: 'Ristorante'},
      {value: 'MCT-2', label: 'MCT-2'},
      {value: 'Ristorante-4', label: 'Ristorante-4'},
      {value: 'MCTV8', label: 'MCTV8'}
    ]};
  },
  render: function(){
    return(
      <Select
          name="form-field-name"
          value="one"
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
