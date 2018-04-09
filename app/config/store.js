import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import reducers from './index.reducer';

const middleware = applyMiddleware(promise(), thunk, createLogger());

export default createStore(reducers, middleware);
