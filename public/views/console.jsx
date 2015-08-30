'use strict'

//libs
var $ = require('jquery');
var _ = require('underscore');

var React = require('react');

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
          <h1>Create new API</h1>
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

//value of the hidden input on select that contains
//APIS selected
var APISSelected = []; //to save the hidden input field
//React componet to create new application
var CreateAppForm = React.createClass({
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

//React componet to create new application
var CreateAPIForm = React.createClass({
  createRouteInput: function(event){
    event.preventDefault();
    //if (this.state.MethodsReady.length)
    if (this.state.Methods.length === 0 || this.state.Methods.length === this.state.MethodsReady.length){
      var count = this.state.Methods.length;
      var methods = this.state.Methods;
      var newmethods = methods.concat(['method' + count]);
      this.setState({Methods: newmethods});
    } else alert('first you must save the method');

  },
  handleSubmit: function(evt){
    evt.preventDefault();

    var body = {
      ApiName: React.findDOMNode(this.refs.AppiName).value.trim(),
      baseUrl: React.findDOMNode(this.refs.baseUrl).value.trim(),
      Methods: this.state.MethodsReady
    }
    console.log(body.Methods.length)
    if(!body.ApiName || !body.baseUrl || body.Methods.length === 0) return;

    //send data and url to ConsoleBox commponent and create application
    //and reload application list because the component owns state
    var url = this.props.url;
    this.props.onCreateAPISubmit(body, url);

    //clean inputs after submit
    React.findDOMNode(this.refs.AppiName).value = '';
    React.findDOMNode(this.refs.baseUrl).value = '';

    //restart state
    this.setState({
      Methods:[],
      MethodsReady:[]
    })
    return;
  },
  getInitialState: function(){
    return({
      Methods:[],
      MethodsReady:[]
    })
  },
  deleteInput: function(id){
    console.log('letsdelete!');
    console.log(id);
  },
  updateStates: function(val){
    var methods = this.state.MethodsReady;
    var newmethod = methods.concat([val]);
    this.setState({MethodsReady: newmethod});
  },
  render: function(){
    return(
      <form name="crateAppiForm" onSubmit={this.handleSubmit}>
        <input ref="AppiName" id="AppiNameField" type="text" placeholder="API name"/>
        <input ref="baseUrl" id="baseUrlField" type="text" placeholder="base url" />
        <button onClick={this.createRouteInput}>Create Route</button>
        <InputMethodList Methods={this.state.Methods} updateStates={this.updateStates}/>
        <button value="Post" className="btnCreateApi" type="submit">Create API</button>
      </form>
    );
  }
});
var InputMethodList = React.createClass({
  render: function(){
    var updateStates = this.props.updateStates;
    var InputNodes = this.props.Methods.map(function(method, index){
      return(
        <InputMethod key={index} placeholder={method} pushState={updateStates}/>
      )
    })
    return(
      <div className="inputList">
        {InputNodes}
      </div>
    )
  }
});
var InputMethod = React.createClass({
  getInitialState: function(){
    return({
      method:'',
      methodtype: 'private',
      verb:'GET',
      ready: false
    })
  },
  handleClick: function(event){
    event.preventDefault();
    if (this.state.methodtype === 'private'){
      this.setState({methodtype: 'public'});
    }
    else {
      this.setState({methodtype: 'private'});
    }
  },
  handleChange: function(event){
    this.setState({method: event.target.value});
  },
  pushState: function(event){
    event.preventDefault();
    //check if there is and input method
    if(!this.state.method) return;

    this.setState({ready: true});
    this.props.pushState(this.state);
  },
  handleChangeVerb: function(event){
    this.setState({verb: event.target.value.trim()});
  },
  render: function(){
    var editButtonStyle = {
      display: this.state.ready ? 'inline' : 'none'
    }
    return(
      <div className="inputMethod">
        <input
          disabled={this.state.ready}
          ref="inputfield"
          type="text"
          placeholder={this.props.placeholder}
          onChange={this.handleChange} />
        <select disabled={this.state.ready} value={this.state.verb} onChange={this.handleChangeVerb}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
        <button disabled={this.state.ready} onClick={this.handleClick}>
          {this.state.methodtype}
        </button>
        <button ref="buttonSave" onClick={this.pushState}>Save</button>
        <button style={editButtonStyle} onClick={this.handleEdit}>Edit</button>
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
