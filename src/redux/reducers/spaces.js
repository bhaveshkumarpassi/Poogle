import * as ActionTypes from "../ActionTypes";

// these are reducer functions.
export const Spaces = (
	state = { isLoading: true, errMess: null, spaces: [], postFail: false, postFailMess: '' },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_SPACES:
			return {
				...state,
				isLoading: false,
				errMess: null,
				spaces: action.payload,
				postFail: false, postFailMess: ''
			};

		case ActionTypes.SPACES_LOADING:
			return { ...state, isLoading: true, errMess: null, spaces: [], postFail: false, postFailMess: '' };

		case ActionTypes.SPACES_FAILED:
			return { ...state, isLoading: false, errMess: action.payload, postFail: false, postFailMess: '' };

		case ActionTypes.POST_FAIL:
			return { ...state, postFail: true, postFailMess: action.payload}

		default:
			return state;
	}
};
