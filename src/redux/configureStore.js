import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Comments } from "./reducers/comments";
import { Spaces } from "./reducers/spaces";
import { Questions } from "./reducers/questions";
import { Answers } from "./reducers/answers";
import { user } from "./reducers/user_reducer";
import { Chat } from "./reducers/chat";
import { Qreactions } from "./reducers/qReactions";
import { Areactions } from "./reducers/aReactions";
import {Blogs} from './reducers/blogs'
import thunk from "redux-thunk";
import logger from "redux-logger";
import authReducer from "./reducers/authReducer";
import contact from './reducers/contactUs'
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
			areactions: Areactions,
			user,
			auth: authReducer,
			chats: Chat,
			contact
		}),
		composeEnhancers(applyMiddleware(thunk, logger))
	);

	return store;
};
