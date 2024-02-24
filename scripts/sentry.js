import * as Sentry from '@sentry/browser';

window.sentryOnLoad = function () {
    Sentry.init({
        dsn: 'https://028f532367f52ee276cc72cc87c08951@o4506786880028672.ingest.sentry.io/4506786933899264',
        integrations: [Sentry.browserTracingIntegration()],
        tracePropagationTargets: ['https://gxcko.me']
    });
};
