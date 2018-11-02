import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { RegisterPage, HomePage, ExtensionPage } from './pages';

import { parse } from 'query-string';
import jwt from 'jsonwebtoken';
import eventbrite from 'eventbrite';
import { BASE_API_URL, CLIENT_SECRET } from './constants';

import(/* webpackPreload: true */'eventbrite_design_system/css/eds.css');

export default class App extends Component {
  constructor(props) {
    super(props);
    const query = parse(window.location.search || '');
    const token = query.esr ? jwt.decode(query.esr, CLIENT_SECRET) : null;
    this.state = {
      ...token,
    };
    this.sdk = eventbrite({ baseUrl: BASE_API_URL, token: token.auth_token });
  }

  withSDK = (Component) => (routeProps) => (<Component {...routeProps} sdk={this.sdk} />);

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/register" component={this.withSDK(RegisterPage)} />
          <Route path="/extension" component={this.withSDK(ExtensionPage)} />
          <Route exact path="/"  component={this.withSDK(HomePage)} />
        </div>
      </Router>
    );
  }
}
