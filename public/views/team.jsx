'use strict'

var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({
  render:function render(){
    return(
      <div className="team">
        <h5>{this.props.team[0]}</h5>
        <h5>{this.props.team[1]}</h5>
      </div>
    )
  }
});
