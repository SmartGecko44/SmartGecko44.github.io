const path = require('path');

module.exports = {
    entry: './scripts/sentry.js', // the entry point of your application
    output: {
        filename: 'main.js', // the output filename
        path: path.resolve(__dirname, 'dist'), // the output directory
    },
    mode: "production",
};