import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Comments } from "./reducers/comments";
import { Spaces } from "./reducers/spaces";
import { Questions, userQuestions } from "./reducers/questions";
import { Answers, userAnswers } from "./reducers/answers";
import { user } from "./reducers/user_reducer";
import { Chat } from "./reducers/chat";
import { Qreactions } from "./reducers/qReactions";
import { Areactions } from "./reducers/aReactions";
import {Blogs, userBlogs} from './reducers/blogs'
import thunk from "redux-thunk";
import logger from "redux-logger";
import authReducer from "./reducers/authReducer";
import {contact} from './reducers/contactUs'
import { Breactions } from "./reducers/bReactions";
import { Bcomments } from "./reducers/bComments";
import { BlogDemands, userBlogDemands } from "./reducers/blogDemands";
import {updateUser} from './reducers/updateUser';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			spaces: Spaces,
			questions: Questions,
			answers: Answers,
			comments: Comments,
			blogs:Blogs,
			qreactions: Qreactions,
			breactions:Breactions,
			bcomments: Bcomments,
			blogDemands:BlogDemands,
			areactions: Areactions,
			user,
			auth: authReducer,
			chats: Chat,
			contact,
			updateUser,
			userQuestions,
			userAnswers,
			userBlogs, 
			userBlogDemands
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
