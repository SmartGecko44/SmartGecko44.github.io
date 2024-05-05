const {
    sentryWebpackPlugin
} = require("@sentry/webpack-plugin");

const path = require('path');

module.exports = {
    // the entry point of your application
    entry: ['./gxcko.me/scripts/sentry.js', "./gxcko.me/scripts/google analytics.js"],

    output: {
        filename: 'bundle.js', // the output filename
        path: path.resolve(__dirname + "/gxcko.me", 'dist'), // the output directory
    },

    mode: "production",
    devtool: "source-map",

    plugins: [sentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_WEBPACK,
        org: "gecko-rz",
        project: "gh-pages"
    })]
};