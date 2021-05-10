import * as ActionTypes from "../ActionTypes";

export const BlogDemands = (
	state = { isLoading: true, errMess: null, blogDemands: [] },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_BLOGDEMANDS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				blogDemands: action.payload,
			};

		case ActionTypes.BLOGDEMANDS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		case ActionTypes.BLOGDEMANDS_LOADING:
			return { ...state, isLoading: true, errMess: null, blogDemands: [] };

		case ActionTypes.ADD_BLOGDEMAND:
				var blogDemand = action.payload;
				return { ...state, blogDemands: state.blogDemands.concat(blogDemand)};	
		
		case ActionTypes.DELETE_BLOGDEMAND: 
				var blogDemandId = action.payload;
				var index = state.blogDemands.indexOf(state.blogDemands.filter(blogDemand => blogDemand._id === blogDemandId)[0]);
				state.blogDemands.splice(index, 1);
				return {...state, blogDemands: state.blogDemands}
	
		default:
			return state;
	}
};

export const userBlogDemands = (state={isLoading: true, errMess: null, blogDemands: []}, action)=>{
	switch(action.type){
		case ActionTypes.GET_USER_BLOG_DEMANDS:
			return {...state, isLoading:false, errMess:null, blogDemands:action.payload}
		case ActionTypes.USER_BLOG_DEMAND_LOADING:
			return {...state, isLoading:true, errMess:null, blogDemands:[]}
		case ActionTypes.USER_BLOG_DEMANDS_FAILED:
			return {...state, isLoading:false, errMess:action.payload.err, blogDemands:[]}
		default:
			return state;

	}

};