import * as Sentry from '@sentry/browser';

window.sentryOnLoad = function () {
    Sentry.init({
        dsn: 'https://js.sentry-cdn.com/028f532367f52ee276cc72cc87c08951.min.js',
        integrations: [new Sentry.browserTracingIntegration()],
        tracePropagationTargets: ['https://gxcko.me', /\/api\//]
    });
};
