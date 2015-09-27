'use strict'

//libs
var $ = require( "jquery" );
var _ = require( "underscore" );

var React = require( "react" );

//React componet to create new application
module.exports = React.createClass({
  handleSubmit: function(evt){
    evt.preventDefault();

    //create the body object with user inputs
    var body = {
      appName: React.findDOMNode(this.refs.appName).value.trim(),
      appDomain: React.findDOMNode(this.refs.appDomain).value.trim()
    }

    //Form validation
    if( !body.appName || !body.appDomain ) {
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
      //if form is not complete
      return;
    }

    //send data and url to ConsoleBox commponent, create application
    //and reload application list because the component owns state
    var url = this.props.createAppUrl;
    this.props.onCreateAppSubmit(body, url);

    //finally clean inputs after submit
    this.setState({formComplete:true});// show the uncompleteForm
    React.findDOMNode(this.refs.appName).value = "";
    React.findDOMNode(this.refs.appDomain).value = "";
    return;
  },
  componentDidUpdate: function() {
    // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
    componentHandler.upgradeDom();
  },
  getInitialState: function(){
    return {
      formComplete: false,
      AppNameErr : "",
      DomainNameErr : ""
    };
  },
  createNewApplication: function(){
    //initalize the state
    this.replaceState(this.getInitialState());
  },
  render: function(){
    var errStyle = {
      color: "#F4C236"
    };
    var formCompleteStyle = {
      textAlign: "center",
      marginTop: "18px"
    };
    var form = (
      <form name="crateAppForm" onSubmit={this.handleSubmit}>
      <div className="mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
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
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <button value="Post" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"  type="submit">
            Create
          </button>
        </div>
      </div>
      </form>
    );
    var formComplete = (
      <div className="mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
          <div style={formCompleteStyle}>
            <i className="icoSuccess material-icons">check_circle</i>
            <p>your application has been created enjoy!</p>
          </div>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.createNewApplication}>
            create new one
          </button>
        </div>
      </div>
    )
    return(
      <div>
          {this.state.formComplete ? formComplete: form }
      </div>
    );
  }
});
