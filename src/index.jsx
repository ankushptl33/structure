import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as bluebird from 'bluebird';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import Root from './Root';
import { configureStore, history } from '@/redux/store/configureStore';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './assets/less/main.less';


library.add(fal, fab, far, fas);

window.Promise = bluebird;

const store = configureStore();
const theme = createMuiTheme({
    palette: {
        primary: { main: '#4194F2' }, // Purple and green play nicely together.
        secondary: { main: '#6ABC6A' } // This is just green.A700 as hex.
    }
});

render(
    <AppContainer>
        <MuiThemeProvider theme={theme}>
            <Root store={store} history={history} />
        </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root')
);

/* devblock:start */
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./Root', () => {
        // eslint-disable-next-line global-require
        const NextRoot = require('./Root').default;
        render(
            <AppContainer>
                <MuiThemeProvider theme={theme}>
                    <NextRoot store={store} history={history} />
                </MuiThemeProvider>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
/* devblock:end */
