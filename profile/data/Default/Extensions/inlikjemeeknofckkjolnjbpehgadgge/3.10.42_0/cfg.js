
/*
NOTE: Do not edit. This is an auto-generated file. All changes will be lost!
*/

const VERSION = "3.10.42";
const DEV = globalThis.DEV = 0;  // used by main.js and bg.js to disable a few features

const CFG = {
  URL: {
    ANALYTICS : 'https://acts.distillweb.net',
    API: 'https://api.distill.io/v1',
    APP: 'https://monitor.distill.io',
    AUTH: 'https://accounts.distill.io',
    BASE: chrome.runtime.getURL(''),
    BROADCAST: 'https://broadcast2.distill.io',
    STATIC: 'https://accounts.distill.io/static_files/v1',
    WEBSITE: 'https://distill.io',
    UTILITIES : 'https://utils.distill.io',
    WATCHLIST: chrome.runtime.getURL('') + 'ui/inbox.html',
    LOGIN: 'https://accounts.distill.io/service-login?redirect=app://ui/inbox.html#inbox',
    ROOT: 'https://distill.io',
    RR: 'rr.bbx.sh',
  },
  SENTRY: {
    dsn: "https://dc79f420ae7dbadb1187f6278f2446a0@o985892.ingest.us.sentry.io/5946006",
    tracesSampleRate: .01,
    environment: "ext",
    release: VERSION,
    integrations: [],
    ignoreErrors: [
      'ResizeObserver loop completed with undelivered notifications.',
      'ResizeObserver loop limit exceeded',
      'CreateHTMLCallback',
      'TemplateResult.getTemplateElement',
      'InvalidStateError: A mutation operation was attempted on a database that did not allow mutations.',
      // node's internal fetch, which uses undici, throws when event source connection gets
      // aborted (newtork disconnect, unreadable response, etc) in an onAborted callback
      // this is not caught anywhere and fills up sentry (Error message is TypeError: terminated)
      'TypeError: terminated',
    ]
  },
  SIGNAL: {
    WS_URL: 'signalling-server.distill.io',
    WS_PORT: 443,
    SECURE: true,
  },
  VERSION,
};
export default CFG;