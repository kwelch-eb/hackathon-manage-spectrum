import {combineReducers} from 'redux';
import _ from 'lodash';

/**
 * Given two object shallow merge them on matching keys
 *
 * @param {object} destination
 * @param {object} source
 */
const _shallowMergeObjects = (destination, source) => (
    Object.keys(source).reduce((acc, curr) => {
        const currState = destination[curr];
        const newState = source[curr];

        return {
            ...acc, 
            [curr]: {
                ...currState,
                ...newState,
            },
        };
    }, {...destination})
);

const _noopReducer = (state = null) => state;

/**
 * Given a reducer list this will create a reducer that will merge any action with `entities` in the payload
 * with the assigned entity in state. Typically used as the reducer for `entities` in state.
 * 
 * This will manage entities at the top level updating with the lastest values from actions.
 * Reducers must be passed for each tracked entity which allow for more grainular control over each entity.
 *
 * @param {object} userReducers
 */
const entitiesReducerFactory = (userReducers = {}) => (state = {}, action) => {
    let newState = (_.isObject(action.payload) && _.isObject(action.payload.entities))
        ? _shallowMergeObjects(state, action.payload.entities)
        : state;

    // combine reducers will error if there is a part of state with a match reducer
    // fill the user reducers with noops reducers for all keys in state where no reducer is provided
    let reducers = Object.keys(newState).reduce((acc, curr) => ({
        ...acc,
        [curr]: userReducers[curr] || _noopReducer,
    }), userReducers);

    return combineReducers(reducers)(newState, action);
};

export default entitiesReducerFactory;
