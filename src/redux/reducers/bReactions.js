import * as ActionTypes from "../ActionTypes";

export const Breactions = (
	state = {
		errMess: null,
		breactions: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_BREACTIONS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				breactions: action.payload,
			};

		case ActionTypes.REACTIONS_BFAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				breactions: [],
			};

		case ActionTypes.ADD_BREACTION:
			var breaction = action.payload;
			return { ...state, breactions: state.breactions.concat(breaction) };

		case ActionTypes.DELETE_BREACTION:
			var breacId = action.payload;
			var index = state.breactions.indexOf(
				state.breactions.filter((reac) => reac._id === breacId)[0]
			);
			state.breactions.splice(index, 1);
			return { ...state, breactions: state.breactions };
		default:
			return state;
	}
};
