import * as ActionTypes from "../ActionTypes";

export const Qreactions = (
	state = {
		errMess: null,
		qreactions: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_QREACTIONS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				qreactions: action.payload,
			};

		case ActionTypes.QREACTIONS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				qreactions: [],
			};

		case ActionTypes.ADD_QREACTION:
			var qreaction = action.payload;
			return { ...state, qreactions: state.qreactions.concat(qreaction) };

		case ActionTypes.DELETE_QREACTION:
			var qreacId = action.payload;
			var index = state.qreactions.indexOf(
				state.qreactions.filter((reac) => reac._id === qreacId)[0]
			);
			state.qreactions.splice(index, 1);
			return { ...state, qreactions: state.qreactions };
		default:
			return state;
	}
};
