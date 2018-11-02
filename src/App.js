import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  RegisterPage,
  HomePage,
  ExtensionPage,
  MultiEventTicketsPage,
} from './pages';

import { parse } from 'query-string';
import jwt from 'jsonwebtoken';
import eventbrite from 'eventbrite';
import { BASE_API_URL, CLIENT_SECRET } from './constants';

import(/* webpackPreload: true */ 'eventbrite_design_system/css/eds.css');

const useProps = props => Component => routeProps => (
  <Component {...routeProps} {...props} />
);

export default class App extends Component {
  constructor(props) {
    super(props);
    const query = parse(window.location.search || '');
    const token = query.esr ? jwt.decode(query.esr, CLIENT_SECRET) : {};
    this.state = {
      eventId: token.event_id,
      authToken: token.auth_token,
      userId: token.user_id,
      sdk: eventbrite({ baseUrl: BASE_API_URL, token: token.auth_token }),
    };
  }

  componentDidMount() {
    window.EB.FrameAPI.init({});
  }

  componentDidUpdate() {
    window.EB.FrameAPI.resize();
  }

  render() {
    const useState = useProps(this.state);

    return (
      <Router>
        <div className="App">
          <Route path="/register" component={useState(RegisterPage)} />
          <Route path="/extension" component={useState(ExtensionPage)} />
          <Route path="/met" component={useState(MultiEventTicketsPage)} />
          <Route exact path="/" component={useState(HomePage)} />
        </div>
      </Router>
    );
  }
}
