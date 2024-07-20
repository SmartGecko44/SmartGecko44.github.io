import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import path from 'path';

export default {
    // the entry point of your application
    entry: './gxcko.me/scripts/sentry.js',

    output: {
        filename: 'bundle.js', // the output filename
        path: path.resolve(process.cwd(), 'gxcko.me', 'dist'), // the output directory
    },

    mode: 'production',
    devtool: 'source-map',

    plugins: [sentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_WEBPACK,
        org: 'gecko-rz',
        project: 'gh-pages'
    })],
};
