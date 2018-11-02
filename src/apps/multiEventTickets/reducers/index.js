// import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';

import entitiesReducerFactory from './entitiesReducerFactory';
import filterReducer from './filterReducer';

const noopReducer = (state = {}) => state;

export default combineReducers({
    filters: filterReducer,
    entities: entitiesReducerFactory({
        ticketClasses: noopReducer,
        ticketAssociations: noopReducer,
        events: noopReducer,
    }),
    // routing: routerReducer,
});
