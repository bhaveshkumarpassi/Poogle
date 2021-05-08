import * as ActionTypes from "../ActionTypes";

export const Answers = (
	state = { isLoading: true, errMess: null, answers: []
		, postFail: false, postFailMess: '' 
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_ANSWERS:
			return {

				...state,
				isLoading: false,
				errMess: null,
				answers: action.payload,
				postFail: false, postFailMess: ''
			};

		case ActionTypes.ANSWERS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload, 
				postFail: false, postFailMess: '' 
			};

		case ActionTypes.ANSWERS_LOADING:
			return { ...state, isLoading: true, errMess: null, answers: [],
				postFail: false, postFailMess: '' 
			};

		case ActionTypes.ADD_ANSWER:
			var answer = action.payload;
			return { ...state, answers: state.answers.concat(answer), 
				postFail: false, postFailMess: '' 
		};

		case ActionTypes.POST_FAIL:
			return { ...state, 
				postFail: true, postFailMess: action.payload
			}

		case ActionTypes.DELETE_ANSWER:
			var answerId = action.payload;
			var index = state.answers.indexOf(
				state.answers.filter((answer) => answer._id === answerId)[0]
			);
			state.answers.splice(index, 1);
			return { ...state, answers: state.answers };

		default:
			return state;
	}
};

export const userAnswers = (state={isLoading: true, errMess: null, answers: []}, action)=>{
	switch(action.type){
		case ActionTypes.GET_USER_ANSWERS:
			return {...state, isLoading:false, errMess:null, answers:action.payload}
		case ActionTypes.USER_ANSWERS_LOADING:
			return {...state, isLoading:true, errMess:null, answers:[]}
		case ActionTypes.USER_ANSWERS_FAILED:
			return {...state, isLoading:false, errMess:action.payload.err, answers:[]}
		default:
			return state;

	}

};