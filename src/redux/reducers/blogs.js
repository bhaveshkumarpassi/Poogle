import * as ActionTypes from "../ActionTypes";

export const Blogs = (
	state = { isLoading: true, errMess: null, blogs: [] },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_BLOGS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				blogs: action.payload,
			};

		case ActionTypes.BLOGS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		case ActionTypes.BLOGS_LOADING:
			return { ...state, isLoading: true, errMess: null, blogs: [] };

		case ActionTypes.ADD_BLOG:
				var blog = action.payload;
				return { ...state, blogs: state.blogs.concat(blog)};	
		
		case ActionTypes.DELETE_BLOG: 
				var blogId = action.payload;
				var index = state.blogs.indexOf(state.blogs.filter(blog => blog._id === blogId)[0]);
				state.blogs.splice(index, 1);
				return {...state, blogs: state.blogs}
	
		default:
			return state;
	}
};