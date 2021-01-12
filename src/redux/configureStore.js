import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { Spaces } from './spaces';
import { Questions } from "./questions";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            spaces: Spaces,
            questions: Questions
        }),
        composeEnhancers(applyMiddleware(thunk,logger))
    );

    return store;
}