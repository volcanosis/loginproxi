'use strict'

//libs
var $ = require( "jquery" );
var _ = require( "underscore" );

var React = require( "react" );

//React componet to create new application
module.exports = React.createClass({
  handleSubmit: function(evt){
    evt.preventDefault();
    //convert the apis selected state into object
    var Apis = _.map(this.state.APISSelected, function(Api){
      return{
        ApiID: Api
      }
    })
    //create the body object with user inputs
    var body = {
      appName: React.findDOMNode(this.refs.appName).value.trim(),
      appDomain: React.findDOMNode(this.refs.appDomain).value.trim(),
      apis: Apis
    }

    //Form validation
    if(!body.appName || !body.appDomain || _.isEmpty(body.apis)) {
      if(!body.appName){
        this.setState({AppNameErr : "you must write a name for your application"});
      } else {
        this.setState({AppNameErr : ""});
      }
      if(!body.appDomain){
        this.setState({DomainNameErr : "You must wirte a domain name for your application"});
      } else {
        this.setState({DomainNameErr : ""});
      }
      if(_.isEmpty(body.apis)){
        //TODO: do not show the err when user select any option
        this.setState({APISSelectedErr : "You must select at least one API"});
      } else {
        this.setState({APISSelectedErr : ""});
      }
      //if form is not complete
      return;
    }

    //send data and url to ConsoleBox commponent, create application
    //and reload application list because the component owns state
    var url = this.props.createAppUrl;
    this.props.onCreateAppSubmit(body, url);

    //finally clean inputs after submit
    this.state.formComplete = true;
    React.findDOMNode(this.refs.appName).value = "";
    React.findDOMNode(this.refs.appDomain).value = "";
    return;
  },
  fetchAPISFromServer: function(){
    var url = this.props.fetchApisUrl;

    $.ajax({
      url: url,
      dataType: "json",
      cache: false,
      success: function(data){
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
  componentDidUpdate: function() {
    // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
    componentHandler.upgradeDom();
  },
  getInitialState: function(){
    return {
      options:[], //for existents apis
      APISSelected:[], //for apis that user select
      formComplete: false,
      AppNameErr : "",
      DomainNameErr : "",
      APISSelectedErr : ""
    };
  },
  //this function are triggered each time the user
  //select api From the input
  logChange: function(val){
    //if there is no value on hidden input
    //set the state as empty array
    if (!val){
      this.state.APISSelected = [];
    } else{
    //set the value of hidden field on state
     this.state.APISSelected = val.split(',');
    }
  },
  createNewApplication: function(){
    //initalize the state
    this.replaceState(this.getInitialState());
    //finally get APIS
    this.fetchAPISFromServer();
  },
  render: function(){
    var errStyle = {
      color: "#F4C236"
    };
    var formCompleteStyle = {
      textAlign: "center",
      marginTop: "18px"
    };
    var Select = require('react-select');
    var form = (
      <form name="crateAppForm" onSubmit={this.handleSubmit}>
        <h4>Create new application</h4>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input
            className="mdl-textfield__input"
            type="text"
            id="appNameField"
            ref="appName"
            />
          <label className="mdl-textfield__label"  htmlFor="appNameField">App name</label>
        </div>
        <span style={errStyle} >{this.state.AppNameErr}</span>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input
            className="mdl-textfield__input"
            type="text"
            id="appDomainField"
            ref="appDomain"
            />
          <label className="mdl-textfield__label" htmlFor="appDomainField">Domain name</label>
        </div>
          <span style={errStyle}>{this.state.DomainNameErr}</span>
        <Select
            name="apiList"
            multi={true}
            options={this.state.options}
            onChange={this.logChange}
            placeholder = "Select APIS to use on your application"
          />
        <span style={errStyle}>{this.state.APISSelectedErr}</span>
        <div className="mdl-card__actions mdl-card--border">
          <button value="Post" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"  type="submit">
              Create
          </button>
        </div>
      </form>
    );
    var formComplete = (
      <div style={formCompleteStyle}>
        <i className="icoSuccess material-icons">check_circle</i>
        <p>your application has been created enjoy!</p>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.createNewApplication}>
            create new one
          </button>
      </div>
    )
    return(
      <div className="mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
          {this.state.formComplete ? formComplete: form }
        </div>
      </div>
    );
  }
});
