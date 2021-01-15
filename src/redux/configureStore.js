import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Spaces } from "./spaces";
import { Questions } from "./questions";
import { Answers } from './answers';
import {user} from './reducers/user_reducer'
import thunk from "redux-thunk";
import logger from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			spaces: Spaces,
			questions: Questions,
			answers: Answers,
			user,
		}),
		composeEnhancers(applyMiddleware(thunk, logger))
	);

	return store;
};
