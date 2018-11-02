import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import configureStore from '../common/store/configureStore';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import ConnectedLandingPage from './containers/ConnectedLandingPage';
import ConnectedAssociationPage from './containers/ConnectedAssociationPage';
import reducer from './reducers';

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
    this.state = {
      masterTicketId: null,
    };
  }

  setMasterTicketId = masterTicketId => this.setState({ masterTicketId });

  render() {
    const { masterTicketId } = this.state;
    const Component = masterTicketId
      ? ConnectedAssociationPage
      : ConnectedLandingPage;

    return (
      <Provider store={this._store}>
        <Route
          component={props => (
            <Component
              {...props}
              {...this.props}
              masterTicketId={masterTicketId}
              setMasterTicketId={this.setMasterTicketId}
            />
          )}
        />
      </Provider>
    );
  }
}
