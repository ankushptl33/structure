const express = require('express');
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const opn = require('opn');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compress = require('compression');
const webpackConfig = require('../config/webpack.dev.config');
const project = require('../project.config');
const app = express();
const port = 8090;
const compiler = webpack(webpackConfig);

app.use(compress());

const devMiddleware = webpackDevMiddleware(compiler, {
    contentBase: `http://localhost:${port}`,
    quiet: false,
    noInfo: false,
    lazy: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'errors-only',
    publicPath: '/'
});

devMiddleware.waitUntilValid(() => {
    opn('http://localhost:' + port);
});

const hotMiddleware = webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    log: false
});

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static(project.basePath));

app.use(function(req, res, next) {
    const reqPath = req.url;
    // find the file that the browser is looking for
    const file = _.last(reqPath.split('/'));
    if (['main.js', 'index.html'].indexOf(file) !== -1) {
        res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, file)));
    } else if (file.indexOf('.') === -1) {
        // if the url does not have an extension, assume they've navigated to something like /home and want index.html
        res.end(
            devMiddleware.fileSystem.readFileSync(
                path.join(webpackConfig.output.path, 'index.html')
            )
        );
    } else {
        next();
    }
});

module.exports = {
    app,
    port
};
