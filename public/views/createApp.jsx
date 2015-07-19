'use strict';


var $ = require('jquery');

var Layout = require('./layout.jsx');
var React = require('react');

var CreateAppBox = React.createClass({
  render: function(){
    return(
      <div className="createAppForm" >
        <h1>Create new application</h1>
        <CreateAppForm url="/CreateApp"/>
      </div>
    );
  }
});

var CreateAppForm = React.createClass({
  handleSubmit: function(evt){
    evt.preventDefault();
    var body = {
      appName: React.findDOMNode(this.refs.appName).value.trim(),
      appDomain: React.findDOMNode(this.refs.appDomain).value.trim()
    }
    if(!body.appName || !body.appDomain) return;

    $.ajax({
      type:'Post',
      url:this.props.url,
      dataType: 'json',
      cache:'false',
      data:body,
      success: function(data){
        console.log(data);
      },
      erorr: function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }
    })

    React.findDOMNode(this.refs.appName).value = '';
    React.findDOMNode(this.refs.appDomain).value = '';
  },
  render: function(){
    return(
      <form name="crateAppForm" onSubmit={this.handleSubmit}>
        <input ref="appName" id="appNameField" type="text" placeholder="App name"/>
        <input ref="appDomain" id="appDomainField" type="text" placeholder="Domain name" />
        <button value="Post" className="btnCreateApp" type="submit">Create App</button>
      </form>
    );
  }
});

module.exports = React.createClass({
  render:function render(){
    return(
      <Layout {...this.props}>
        <div id="container">
          <CreateAppBox />
        </div>
      </Layout>
    );
  }
});
