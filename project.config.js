const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    basePath: __dirname,
    srcDir: path.resolve(__dirname, 'src'),
    outDir: path.resolve(__dirname, 'dist'),
    publicPath: NODE_ENV === 'development' ? '/' : '/',
    esLint: false,
    vendor: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-loadable',
        '@amcharts/amcharts3-react',
        '@date-io/moment',
        '@fortawesome/fontawesome-pro',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-brands-svg-icons',
        '@fortawesome/pro-light-svg-icons',
        '@fortawesome/pro-regular-svg-icons',
        '@fortawesome/pro-solid-svg-icons',
        '@fortawesome/react-fontawesome',
        '@material-ui/core',
        '@material-ui/icons',
        'bluebird',
        'lodash',
        'moment',
        'react-redux',
        'redux',
        'react-jsonschema-materialui-forms',
        'react-fontawesome'
    ]
};
