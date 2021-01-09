import * as ActionTypes from './ActionTypes';

// these are reducer functions.
export const Spaces = (state = { isLoading: true,
    errMess: null,
    spaces:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SPACES:
            return {...state, isLoading: false, errMess: null, spaces: action.payload};

        case ActionTypes.SPACES_LOADING:
            return {...state, isLoading: true, errMess: null, spaces: []}

        case ActionTypes.SPACES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};