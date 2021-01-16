import * as ActionTypes from "../ActionTypes";

export const Answers = (
	state = { isLoading: true, errMess: null, answers: [] },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_ANSWERS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				answers: action.payload,
			};

		case ActionTypes.ANSWERS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		case ActionTypes.ANSWERS_LOADING:
			return { ...state, isLoading: true, errMess: null, answers: [] };

		default:
			return state;
	}
};
