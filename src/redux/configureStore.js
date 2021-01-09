import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Spaces } from './spaces';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            spaces: Spaces
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}