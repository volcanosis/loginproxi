'use strict';

var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({
  onButtonClick:function(){
    alert('i was rendered on server side but I am clickable because mounting!');
  },

  render:function render(){
    return(
      <Layout {...this.props}>
        <div id="index">
          <h1>Hello {this.props.organization}!</h1>
          <button onClick={this.onButtonClick}>__Click Me__</button>
        </div>
      </Layout>
    );
  }
});
