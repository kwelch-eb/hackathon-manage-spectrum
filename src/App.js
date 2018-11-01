import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { RegisterPage, HomePage } from './pages';

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
