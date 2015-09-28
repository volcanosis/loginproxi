'use strict';

//libs
var $ = require('jquery');
var _ = require('underscore');
var React = require('react');


module.exports = React.createClass({
  render:function render(){
    var containerStyle = {
      minHeight : "600px"
    }
    var data = this.props.applications;
    var showApplication;
    var noData = "No data";
    if ( data === undefined ){
      showApplication = false;
    } else {
      showApplication = true;

      var ApplicationNode = data.map( function( application, index ){
        return (
          <div key = { index }>
            <h1 className = "mdl-card__title-text"  > { application.appName } </h1>
            <br/>
            <span>Domain: { application.domain }</span>
            <br/>
            <span>Private Key: { application.privateKey }</span>
            <br/>
            <span>Public Key { application.publicKey }</span>
          </div>

        );
      })
    }
    return(
      <div style = { containerStyle } className="container">
        <div className = "application__head">
          <div className = "application_box mdl-shadow--4dp">
            <div className = "background">
              { showApplication ? ApplicationNode : noData }
            </div>
          </div>
        </div>
      </div>
    )
  }
});
