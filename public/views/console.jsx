'use strict'

//libs
var $ = require('jquery');
var _ = require('underscore');
var React = require('react');

//components
var CreateAppForm = require('./components/createApplicationForm.jsx');
var CreateAPIForm = require('./components/CreateAPIForm.jsx');

//components for check applications
var ConsoleBox = React.createClass({
  fetchAppsFromServer: function(){
    $.ajax({
      url: this.props.fetchAppsUrl,
      dataType: 'json',
      cache:false,
      success:function(data){
        this.setState({applications:data.applications});
      }.bind(this),
      error: function(xhr, statu, err){
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  fetchApisFromServer: function(){
    $.ajax({
      url: this.props.fetchApisUrl,
      dataType: 'json',
      cache:false,
      success:function(data){
        this.setState({APIS:data.APIS});
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
    var apis = this.state.APIS;
    var newApi = apis.concat([body]);
    this.setState({APIS: newApi});

    $.ajax({
      type: 'Post',
      url: url,
      dataType: 'json',
      data: body,
      success: function(data){
        this.setState({APIS:data.APIS});
      }.bind(this),
      erorr: function(xhr, status, err){
        console.log(url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {
      applications:[],
      APIS:[]
    };
  },
  componentDidMount: function(){
    this.fetchAppsFromServer();
    this.fetchApisFromServer();
    //TODO: implement technology to fetch data
    //only when a new app is created
    //setInterval(this.fetchAppsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
      <div className="mdl-grid">
        <div className="createAppForm mdl-cell mdl-cell--6-col">
          <CreateAppForm onCreateAppSubmit={this.handleCreateAppSubmit} createAppUrl="/Application" fetchApisUrl="/APIS"/>
        </div>
        <div className="createApiForm mdl-cell mdl-cell--6-col">
          <CreateAPIForm onCreateAPISubmit={this.handleCreateAPISubmit} url="/API"/>
        </div>
        <div className="listsContent mdl-grid">
          <div className="applicationsBox mdl-cell mdl-cell--6-col">
            <h1>Applications</h1>
            <AppList applications={this.state.applications}/>
          </div>
          <div className="apisBox mdl-cell mdl-cell--6-col">
            <h1>APIS</h1>
            <ApiList APIS={this.state.APIS}></ApiList>
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
        <App key={index} appID={application.appID} appName={application.appName}>
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
          <span>ApplicationID: {this.props.appID}</span>
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

var ApiList = React.createClass({
  render: function(){
    var ApisNodes = this.props.APIS.map(function(API,index){
      return (
        //API has ApiID, ApiName, baseUrl, Methods, status
        <Api key={index} apiData={API}>

        </Api>
      );
    })
    return(
      <div className="apiList">
        {ApisNodes}
      </div>
    );
  }
});
var Api = React.createClass({
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
      <div className="demo-card-wide mdl-card mdl-shadow--4dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{this.props.apiData.ApiName}</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <span>API: {this.props.apiData.ApiID}</span>
          <br/>
          <span>base url: {this.props.apiData.baseUrl}</span>
        </div>
        <div className="mdl-card__actions mdl-card--border">
            <div id="status" className={this.props.apiData.status + " status"}></div>
            <span htmlFor="status" className="mdl-tooltip">{this.props.apiData.status}</span>
        </div>
        <div className="mdl-card__menu">
          <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i className="material-icons">share</i>
          </button>
        </div>
      </div>
    )
  }
})
module.exports = React.createClass({
  displayName: 'console',
  render:function render(){
    return(
      <div className="container">
        <ConsoleBox fetchApisUrl="/APIS" fetchAppsUrl="/Applications" pollInterval={9000} />
      </div>
    )
  }
});
