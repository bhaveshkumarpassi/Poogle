import * as ActionTypes from "../ActionTypes";

export const Questions = (
	state = { isLoading: true, errMess: null, questions: [] },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_QUESTIONS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				questions: action.payload,
			};

		case ActionTypes.QUESTIONS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		case ActionTypes.QUESTIONS_LOADING:
			return { ...state, isLoading: true, errMess: null, questions: [] };

		default:
			return state;
	}
};
