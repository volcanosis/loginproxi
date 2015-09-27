'use strict'

//libs
var $ = require('jquery');
var _ = require('underscore');
var React = require('react');

//components
var CreateAppForm = require('./components/createApplicationForm.jsx');

//components for check applications
var ConsoleBox = React.createClass({
  fetchAppsFromServer: function(){
    $.ajax({
      url: this.props.fetchAppsUrl,
      dataType: 'json',
      cache:false,
      success:function(data){
        console.log(data)
        this.setState({applications:data.applications});
      }.bind(this),
      error: function(xhr, statu, err){
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
    return {
      applications:[]
    };
  },
  componentDidMount: function(){
    this.fetchAppsFromServer();
    //TODO: implement technology to fetch data
    //only when a new app is created
    //setInterval(this.fetchAppsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
      <div className="mdl-grid">
        <div className="createAppForm mdl-cell mdl-cell--6-col">
          <CreateAppForm onCreateAppSubmit={this.handleCreateAppSubmit} createAppUrl="/Application" />
        </div>
        <div className="listsContent mdl-cell mdl-cell--6-col">
          <div className="applicationsBox">
            <h1>Applications</h1>
            <AppList applications={this.state.applications}/>
          </div>
        </div>
      </div>
    );
  }
});
var AppList = React.createClass({
  render: function(){
    var ApplicationsNodes = this.props.applications.map(function(application, index){
      return (
        <App
          key = { index }
          appID = { application.appID }
          appName = { application.appName }
          privateKey = { application.privateKey }
          PublicKey = { application.publicKey }
          >
          {application.domain}
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
  handleClikEditApp: function(e){
    e.preventDefault();
    console.log('lets modify this application ' + this.props.appID);
  },
  render: function(){
    var mdClass = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent ";
    return(
        <button
          onClick={this.handleClikEditApp}
          className={mdClass + "btnEditarApp"}>
          edit
        </button>
    );
  }
});
var App = React.createClass({
  componentDidUpdate: function(){
    /*
     *To update jsclases on MDL
     *A deeper description of the
     *componentHandler is given in
     *https://github.com/jasonmayes/mdl-component-design-pattern
     */
    componentHandler.upgradeDom();
  },
  render: function(){
    return(
      <div className="demo-card-wide mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{this.props.appName}</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <span>Application ID: {this.props.appID}</span>
          <br/>
          <span>Private key: {this.props.privateKey}</span>
          <br/>
          <span>Public key: {this.props.PublicKey}</span>
          <br/>
          <span>Domain: {this.props.children}</span>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <AppEditForm appID={this.props.appID}/>
        </div>
        <div className="mdl-card__menu">
          <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i className="material-icons">share</i>
          </button>
        </div>
      </div>
    );
  }
});

module.exports = React.createClass({
  displayName: 'console',
  render:function render(){
    return(
      <div className="container">
        <ConsoleBox fetchAppsUrl="/Applications" pollInterval={9000} />
      </div>
    )
  }
});
