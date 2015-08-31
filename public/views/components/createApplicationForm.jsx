'use strict'

//libs
var $ = require('jquery');
var _ = require('underscore');

var React = require('react');

//React componet to create new application
module.exports = React.createClass({
  logState:function(){
    console.log(this.state);
  },
  handleSubmit: function(evt){
    evt.preventDefault();
    //convert the apis selected array into object
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

    //TODO: validate and show warning message on missing fields
    if(!body.appName || !body.appDomain || _.isEmpty(body.apis)) return;

    //send data and url to ConsoleBox commponent, create application
    //and reload application list because the component owns state
    var url = this.props.createAppUrl;
    this.props.onCreateAppSubmit(body, url);

    //finally clean inputs after submit
    React.findDOMNode(this.refs.appName).value = '';
    React.findDOMNode(this.refs.appDomain).value = '';
    return;
  },
  fetchAPISFromServer: function(){
    var url = this.props.fetchApisUrl;

    $.ajax({
      url: url,
      dataType: 'json',
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
  getInitialState: function(){
    return {
      options:[], //for existents apis
      APISSelected:[] //for apis that user select
    };
  },
  //this function are triggered each time the user
  //select and api From the input
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
  render: function(){
    var Select = require('react-select');
    return(
      <div className="mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
          <h4>Create new application</h4>
        <form name="crateAppForm" onSubmit={this.handleSubmit}>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              id="appNameField"
              ref="appName"
              />
            <label className="mdl-textfield__label"  htmlFor="appNameField">App name</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              id="appDomainField"
              ref="appDomain"
              />
            <label className="mdl-textfield__label" htmlFor="appDomainField">Domain name</label>
          </div>
          <Select
              name="apiList"
              multi={true}
              options={this.state.options}
              onChange={this.logChange}
              placeholder = "Select APIS to use on your application"
            />
          <div className="mdl-card__actions mdl-card--border">
            <button value="Post" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"  type="submit">
                Create
            </button>
          </div>
        </form>
        </div>
      </div>
    );
  }
});
