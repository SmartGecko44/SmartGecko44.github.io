import {browserTracingIntegration, init} from "@sentry/browser/build/npm/types-ts3.8/index.js";


window.sentryOnLoad = function () {
    console.log('sentryOnLoad');
    init({
        dsn: 'https://028f532367f52ee276cc72cc87c08951@o4506786880028672.ingest.sentry.io/4506786933899264',

        integrations: [
            browserTracingIntegration(),
        ],
        tracePropagationTargets: ['https://gxcko.me'],
    });
};
