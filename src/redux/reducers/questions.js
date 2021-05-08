import * as ActionTypes from "../ActionTypes";

export const Questions = (
	state = { isLoading: true, errMess: null, questions: [], postFail: false, postFailMess: '' },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_QUESTIONS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				questions: action.payload,
				postFail: false, postFailMess: ''
			};

		case ActionTypes.QUESTIONS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload, postFail: false, postFailMess: ''};

		case ActionTypes.QUESTIONS_LOADING:
			return { ...state, isLoading: true, errMess: null, questions: [], postFail: false, postFailMess: '' };

		case ActionTypes.ADD_QUESTION:
			var question = action.payload;
			return { ...state, questions: state.questions.concat(question), postFail: false, postFailMess: ''};

		case ActionTypes.POST_FAIL:
			return { ...state, postFail: true, postFailMess: action.payload}
		
		case ActionTypes.DELETE_QUESTION: 
			var questionId = action.payload;
			var index = state.questions.indexOf(state.questions.filter(question => question._id === questionId)[0]);
			state.questions.splice(index, 1);
			return {...state, questions: state.questions}

		default:
			return state;
	}
};

export const userQuestions = (state={isLoading: true, errMess: null, questions: []}, action)=>{
	switch(action.type){
		case ActionTypes.GET_USER_QUESTIONS:
			return {...state, isLoading:false, errMess:null, questions:action.payload}
		case ActionTypes.USER_QUESTIONS_LOADING:
			return {...state, isLoading:true, errMess:null, questions:[]}
		case ActionTypes.USER_QUESTIONS_FAILED:
			return {...state, isLoading:false, errMess:action.payload.err, questions:[]}
		default:
			return state;

	}

};