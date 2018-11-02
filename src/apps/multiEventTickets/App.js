import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import configureStore from '../common/store/configureStore';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import ConnectedLandingPage from './containers/ConnectedLandingPage';
// import ConnectedAssociationPage from './containers/ConnectedAssociationPage';
import reducer from './reducers';

/// ROUTES
/*<Route
          path="/"
          component={ConnectedLandingPage}
          eventGroupId={eventGroupId}
        />
        <Route
          path=":masterTicketId"
          component={ConnectedAssociationPage}
          eventGroupId={eventGroupId}
        />*/

export default class ManageMultiEventTicketsApp extends React.Component {
  static propTypes = {
    eventGroupId: PropTypes.string,
  };
  static defaultProps = {
    eventGroupId: '1',
  };

  constructor(props) {
    super(props);
    this._store = createStore(
      reducer,
      {},
      composeWithDevTools(applyMiddleware(thunk))
    );
  }

  render() {
    console.log(this.props);
    return (
      <Provider store={this._store}>
        <Route
          path={`${this.props.match.path}`}
          exact
          component={props => (
            <ConnectedLandingPage
              {...props}
              {...this.props}
            />
          )}
        />

        <Route
          path={`${this.props.match.path}/:masterTicketId`}
          exact
          component={props => (
            <ConnectedLandingPage
              {...props}
              {...this.props}
            />
          )}
        />
      </Provider>
    );
  }
}
