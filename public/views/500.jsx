'use strict';

var Layout = require('./layout.jsx');
var React = require('react');

var h1Stlye = {
  color: '#555',
  fontSize: 22,
  fontWeight: 400
}
var pStyle = {
  margin: '0 auto',
  width: '280px'
}
var layoutStyle = {
  color: '#888',
  display: 'table',
  fontFamily: 'sans-serif',
  height: '100%',
  textAlign: 'center',
  width: '100%'
}

module.exports = React.createClass({

  render: function render() {

    return (
      <Layout {...this.props} style={layoutStyle}>
        <h1 style={h1Stlye}>Internal Server Error</h1>
        <p style={pStyle}>awwi something went wrong, please reload or conctact the administrator if the problem persist
        </p>
      </Layout>
    );
  }
});
