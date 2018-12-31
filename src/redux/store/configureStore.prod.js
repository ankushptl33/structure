import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../rootReducer';
import { restMiddleware } from '@/utils/redux';

const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, restMiddleware);

function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
