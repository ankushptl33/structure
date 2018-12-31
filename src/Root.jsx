import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import { PersistGate } from 'redux-persist/es/integration/react';
// import Loader from '@/helper/loaders/ComponentLoader';
import Routers from '@/routes/app.routes';
import ErrorBoundary from '@/layouts/ErrorLayout/ErrorBoundary';
import Loader from '@/helper/loaders';

const AppError = Loader(() =>
    import('@/layouts/ErrorLayout/AppError' /* webpackChunkName: "error-msg" */)
);

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <ErrorBoundary fallbackComponent={AppError}>
                        <Routers {...store} />
                    </ErrorBoundary>
                </ConnectedRouter>
            </Provider>
        );
    }
}
