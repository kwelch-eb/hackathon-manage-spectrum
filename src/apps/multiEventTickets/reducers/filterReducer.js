import {UPDATE_FILTERS} from '../actions';

const filterReducer = (state = {}, action) => {
    if (action.type === UPDATE_FILTERS) {
        return {
            ...state,
            ...action.payload,
        };
    }
    return state;
};

export default filterReducer;
