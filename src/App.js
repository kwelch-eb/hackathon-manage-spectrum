import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { RegisterPage, HomePage } from './pages';
import(/* webpackPreload: true */'eventbrite_design_system/css/eds.css');

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/register" component={RegisterPage} />
          <Route exact path="/"  component={HomePage} />
        </div>
      </Router>
    );
  }
}
