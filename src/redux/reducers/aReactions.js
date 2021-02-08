import * as ActionTypes from '../ActionTypes';

export const Areactions = (state = {
        errMess: null,
        areactions: []
    }, action) => {
    switch(action.type) {
            
        case ActionTypes.ADD_AREACTIONS:
            return {...state, isLoading: false, errMess: null, areactions: action.payload};

        case ActionTypes.AREACTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, areactions: []};

        case ActionTypes.ADD_AREACTION:
            var areaction = action.payload;
            return {...state, areactions: state.areactions.concat(areaction)};

        case ActionTypes.DELETE_AREACTION: 
            var areacId = action.payload;
            var index = state.areactions.indexOf(state.areactions.filter(reac => reac._id === areacId)[0]);
            state.areactions.splice(index, 1);
            return {...state, areactions: state.areactions}
        default:
            return state;
    }
}