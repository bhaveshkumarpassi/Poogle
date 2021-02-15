import {USER_LOADING, UPDATE_USER, UPDATE_FAILED} from "../ActionTypes";

export const updateUser = (state = { isLoading: true, 
                                errMess: null, user: null 
                            }, action) => {
	switch (action.type) {
		case UPDATE_FAILED:
			return { ...state, isLoading: false,user:null, errMess: action.payload };

        case UPDATE_USER:
            return {...state, isLoading:false, errMess:null, user:action.payload};

		default:
			return state;
	}
};

	