const {
    sentryWebpackPlugin
} = require("@sentry/webpack-plugin");

const path = require('path');

module.exports = {
    // the entry point of your application
    entry: './scripts/sentry.js',

    output: {
        filename: 'bundle.js', // the output filename
        path: path.resolve(__dirname, 'dist'), // the output directory
    },

    mode: "production",
    devtool: "source-map",

    plugins: [sentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_WEBPACK,
        org: "gecko-rz",
        project: "gh-pages"
    })]
};