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
      <div>
        <div className="mdl-grid">
          <div className="createAppForm mdl-cell mdl-cell--6-col">
            <CreateAppForm onCreateAppSubmit={this.handleCreateAppSubmit} createAppUrl="/Application" />
          </div>
        </div>
        <div className = "">
          <h1>Applications</h1>
          <AppList applications={this.state.applications}/>
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
          >
          {application.domain}
        </App>
      );
    })
    return(
      <div className = "mdl-grid">
        {ApplicationsNodes}
      </div>
    );
  }
});

var App = React.createClass({
  handleDetailClick: function(){
    console.log(this.props.appID);
    window.location = "/console/app/" + this.props.appID;
  },
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
    var imgStyle = {
      width : "220px",
      height : "140px",
      border : "0" ,
      padding : "20px"
    };
    return(
      <div className = "mdl-cell mdl-cell--6-col">
        <div className = "application_content mdl-shadow--2dp">
          <div className = "bar" >
            <h2 className = "mdl-card__title-text">
              {this.props.appName}
            </h2>
            <div className = "wrapper">
              <button id = { "application-menu-" + this.props.appName}
                className="mdl-button mdl-js-button mdl-button--icon">
                <i className="material-icons">more_vert</i>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                htmlFor = { "application-menu-" + this.props.appName }>
                <li onClick = {this.handleDetailClick} className="mdl-menu__item">Details</li>
                <li className="mdl-menu__item">Delete</li>
              </ul>
            </div>
          </div>
          <div className = "background">
            <span className = "application__data">Application ID: {this.props.appID}</span>
          </div>
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
