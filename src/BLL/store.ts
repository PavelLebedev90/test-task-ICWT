import {applyMiddleware, combineReducers, createStore} from 'redux';
import {JokeReducer} from './joke-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    joke: JokeReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

