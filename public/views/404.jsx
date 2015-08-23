'use strict';

var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({

  render: function render() {

    return (
      <Layout {...this.props}>
        <h3>URL: {this.props.url} - Not Found(404)</h3>
      </Layout>
    );
  }
});
