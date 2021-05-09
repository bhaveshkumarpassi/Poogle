import * as ActionTypes from "../ActionTypes";

export const Blogs = (
	state = { isLoading: true, errMess: null, blogs: [], postFail: false, postFailMess: '' },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_BLOGS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				blogs: action.payload,
				postFail: false, postFailMess: ''
			};

		case ActionTypes.BLOGS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload, postFail: false, postFailMess: '' };

		case ActionTypes.BLOGS_LOADING:
			return { ...state, isLoading: true, errMess: null, blogs: [], postFail: false, postFailMess: '' };

		case ActionTypes.ADD_BLOG:
				var blog = action.payload;
				return { ...state, blogs: state.blogs.concat(blog), postFail: false, postFailMess: ''};	
			
		case ActionTypes.POST_FAIL:
			return { ...state, postFail: true, postFailMess: action.payload}
		
		case ActionTypes.DELETE_BLOG: 
				var blogId = action.payload;
				var index = state.blogs.indexOf(state.blogs.filter(blog => blog._id === blogId)[0]);
				state.blogs.splice(index, 1);
				return {...state, blogs: state.blogs}
	
		default:
			return state;
	}
};

export const userBlogs = (state={isLoading: true, errMess: null, blogs: []}, action)=>{
	switch(action.type){
		case ActionTypes.GET_USER_BLOGS:
			return {...state, isLoading:false, errMess:null, blogs:action.payload}
		case ActionTypes.USER_BLOGS_LOADING:
			return {...state, isLoading:true, errMess:null, blogs:[]}
		case ActionTypes.USER_BLOGS_FAILED:
			return {...state, isLoading:false, errMess:action.payload.err, blogs:[]}
		default:
			return state;

	}

};