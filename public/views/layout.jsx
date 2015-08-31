'use strict';

var React = require('react');

module.exports = React.createClass({
  handleTitleClick: function(){
    window.location = '/console'
  },
  render:function render(){
    return(
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="/css/vendor/react-select/default.css"/>
          <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.red-indigo.min.css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          <link rel="stylesheet" type="text/css" href="/css/app.css"/>
          <title>
            {this.props.title}
          </title>
        </head>
        <body style={this.props.style}>
          {/*The drawer is always open in large screens. The header is always shown,even in small screens. */}
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <span className="mdl-layout-title" onClick={this.handleTitleClick}>Volcanosis developers</span>
                <div className="mdl-layout-spacer"></div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                  <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="fixed-header-drawer-exp">
                    <i className="material-icons">search</i>
                  </label>
                  <div className="mdl-textfield__expandable-holder">
                    <input className="mdl-textfield__input" type="text" name="sample" id="fixed-header-drawer-exp" />
                  </div>
                </div>
              </div>
            </header>
            <div className="mdl-layout__drawer">
              <nav className="mdl-navigation">
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
              </nav>
            </div>
            <main className="mdl-layout__content">
              <div className="page-content">
                {/*content goes here */}
                  {this.props.children}
              </div>
              <footer className="mdl-mini-footer">
                <div className="mdl-mini-footer__left-section">
                  <div className="mdl-logo">Volcanosis</div>
                  <ul className="mdl-mini-footer__link-list">
                    <li><a href="#">About</a></li>
                    <li><a href="/team">Team</a></li>
                  </ul>
                </div>
              </footer>
            </main>
          </div>
        </body>
        <script src="/bundle.js"></script>
        <script src="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.min.js"></script>
      </html>
    );
  }
});
