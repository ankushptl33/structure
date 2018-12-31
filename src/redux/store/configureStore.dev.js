import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../rootReducer';
import { restMiddleware } from '@/utils/redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

const configureStore = initialState => {
    // Redux Configuration
    const middleware = [];
    const enhancers = [];

    // Thunk Middleware
    middleware.push(thunk);

    // Logging Middleware
    const logger = createLogger({
        level: 'info',
        collapsed: true
    });

    // Skip redux logs in console during the tests
    if (process.env.NODE_ENV !== 'test') {
        middleware.push(logger);
    }

    // Router Middleware
    const router = routerMiddleware(history);
    middleware.push(router);

    // Rest middleware for redux
    middleware.push(restMiddleware);

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? composeWithDevTools
        : compose;
    /* eslint-enable no-underscore-dangle */

    // Apply Middleware & Compose Enhancers
    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);

    // Create Store
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept(
            '../rootReducer',
            // eslint-disable-next-line global-require
            () => store.replaceReducer(require('../rootReducer').default)
        );
    }

    return store;
};

export default { configureStore, history };
