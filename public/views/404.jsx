'use strict';

var Layout = require('./layout.jsx');
var React = require('react');

//inline style
var h3Stlye = {
  color: '#555',
  fontSize: 22,
  fontWeight: 400
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
        <h3 style={h3Stlye}>URL: {this.props.url} - Not Found(404)</h3>
      </Layout>
    );
  }
});
