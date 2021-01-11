import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Spaces } from './spaces';
import { Questions } from "./questions";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            spaces: Spaces,
            questions: Questions
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}