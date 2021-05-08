import {USER_LOADING, USER_FAILED, GET_USER, UPDATE_USER} from "../ActionTypes";

export const user = (state = { isLoading: true, 
                                errMess: null, user: null 
                            }, action) => {
	switch (action.type) {
		case USER_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		case GET_USER:
			return { ...state, isLoading: false, errMess: null, user: action.payload };
		
		case USER_LOADING:
			return {...state, isLoading: true, errMess: null, user: {}};

		default:
			return state;
	}
};


