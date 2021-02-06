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

		case ActionTypes.ADD_QUESTION:
			var question = action.payload;
			return { ...state, questions: state.questions.concat(question)};
		
		case ActionTypes.DELETE_QUESTION: 
			var questionId = action.payload;
			var index = state.questions.indexOf(state.questions.filter(question => question._id === questionId)[0]);
			state.questions.splice(index, 1);
			return {...state, questions: state.questions}

		/*case ActionTypes.EDIT_QUESTION:
			var uQuestion = action.payload;
			var index = state.questions.indexOf(state.questions.filter(question => question._id === uQuestion._id)[0]);
			state.questions.splice(index, 1);*/

		default:
			return state;
	}
};
