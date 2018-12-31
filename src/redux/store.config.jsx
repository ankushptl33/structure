import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { persistStore } from 'redux-persist';
import mainReducer from './rootReducer';
import { restMiddleware } from '@/utils/redux';

const composeEnhancer = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

export default history => {
    const store = createStore(
        mainReducer(history),
        composeEnhancer(
            applyMiddleware(
                thunkMiddleware,
                createLogger({ collapsed: true }),
                routerMiddleware(history),
                restMiddleware
            )
        )
    );
    // const persistor = persistStore(store);
    return { store };
};
