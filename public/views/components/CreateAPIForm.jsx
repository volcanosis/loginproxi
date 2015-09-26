"use strict";

//libs
var $ = require( "jquery" );

var React = require( "react" );

//React componet to create new application
module.exports  = React.createClass({
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
      <div className="mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
      <form name="crateAppiForm" onSubmit={this.handleSubmit}>
        <h4>Create new API</h4>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input
            className="mdl-textfield__input"
            type="text"
            id="AppiNameField"
            ref="AppiName"
            />
          <label className="mdl-textfield__label"  htmlFor="AppiNameField">API name</label>
        </div>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input
            className="mdl-textfield__input"
            type="text"
            id="baseUrlField"
            ref="baseUrl"
            />
          <label className="mdl-textfield__label" htmlFor="baseUrlField">Base url</label>
        </div>
        <button onClick={this.createRouteInput}>Create Route</button>
        <InputMethodList Methods={this.state.Methods} updateStates={this.updateStates}/>
        <div className="mdl-card__actions mdl-card--border">
          <button value="Post" className="btnCreateApi" type="submit">Create API</button>
        </div>
      </form>
    </div></div>
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
