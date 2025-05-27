
/*
NOTE: Do not edit. This is an auto-generated file. All changes will be lost!
*/


import CFG from "./cfg.js";
import * as Sentry from "/ui/lib/sentry.min.js";
import EXT_CONST from "/ui/lib/const-ext.js"

const window = globalThis;
globalThis.Sentry = Sentry;
let serviceWorkerPort = null;
let portCallbacks = {};
let serviceWorkerCreateResolve;
let creatingServiceWorkerPortPromise;
let isSWReconnect = false;
globalThis.CFG = CFG;

const ID = (function(x) {
  return function() {
    return x++;
  };
})(1);

class ChromeEventsProxy {
  constructor(path) {
    this.listeners = [];
    this.path = Array.isArray(path) ? path : [path];
    addEventListener('port:reconnect', this.restoreListeners.bind(this));
  }
  async addListener (callback) {
    // We pass the module path as ['chrome', 'notifications', 'onClicked']
    // This simply tells service worker to forward events from this module to this port
    // If no. of event listeners reaches 0, we remove the event forwarding in service worker
    if (!serviceWorkerPort) {
      if (!creatingServiceWorkerPortPromise) {
        await createServiceWorkerPort();
      } else {
        await creatingServiceWorkerPortPromise;
      }
    }
    serviceWorkerPort.postMessage({
      path: this.path,
      method: 'addPortEventProxy',
      type: EXT_CONST.PORT_EVENT_SERVICE,
    })
    this.listeners.push(callback);
  }
  removeListener (listener) {
    if (!this.listeners) {
      return;
    }
    this.listeners.splice(this.listeners.indexOf(listener), 1);
    serviceWorkerPort.postMessage({
      path: this.path,
      method: 'removePortEventProxy',
      type: EXT_CONST.PORT_EVENT_SERVICE,
    })
  }
  trigger (...args) {
    if (!this.listeners) {
      return;
    }
    this.listeners.forEach(callback => callback(...args));
  }
  restoreListeners() {
    // We re-create the addListener flow for all the already existing
    // listeners so that the count of listeners is maintained in service worker
    this.listeners.forEach(listener => {
      serviceWorkerPort.postMessage({
        path: this.path,
        method: 'addPortEventProxy',
        type: EXT_CONST.PORT_EVENT_SERVICE,
      })
    });
  }
  clearListeners() {
    this.listeners.forEach(listener => this.removeListener(listener));
  }
};

class BGProxy {
  constructor(moduleName, methods=[]) {
    this.moduleName = moduleName;
    methods.forEach(method => {
      this[method] = (...args) => this.call(method, ...args)
    })
  }
  async call(method, ...args){
    return await _call([this.moduleName], method, ...args);
  }
}

class ModuleApiProxy extends BGProxy {
  constructor(module, name, methods) {
    super(name, methods);
    this.module = module;
  }

  async call(method, ...args) {
    let callback;
    if (typeof args.slice(-1)[0] === 'function') {
      callback = args.pop();
    }
    let res = await _call([this.module, this.moduleName], method, ...args);
    if (callback) {
      callback(res);
    } else {
      return res;
    }
  }
}

class ChromeStorageProxy extends BGProxy {
  constructor(storageType, methods) {
    super(storageType, methods)
    this.storageType = storageType;
  }

  async call(method, ...args) {
    let callback;
    if (typeof args.slice(-1)[0] === 'function') {
      callback = args.pop();
    }
    let res = await _call(['chrome', 'storage', this.storageType], method, ...args);
    if (callback) {
      callback(res);
    } else {
      return res;
    }

  }
}

function createChromeProxy() {
  // We proxy chrome APIs as offscreen documents does not have
  // access to them. Only chrome.runtime is available here
  chrome.tabs = new ModuleApiProxy('chrome', 'tabs', [
    'create',
    'query',
    'remove',
    'update',
    'setCurrent',
    'openExternal',
    'getCurrent',
    'goBack',
    'goForward',
    'reload',
    'get',
  ]);
  chrome.scripting = new ModuleApiProxy('chrome', 'scripting', ['executeScript']);
  chrome.tabs.onCreated = new ChromeEventsProxy(['chrome', 'tabs', 'onCreated']);
  chrome.tabs.onRemoved = new ChromeEventsProxy(['chrome', 'tabs', 'onRemoved']);
  chrome.tabs.onReplaced = new ChromeEventsProxy(['chrome', 'tabs', 'onReplaced']);
  chrome.tabs.onUpdated = new ChromeEventsProxy(['chrome', 'tabs', 'onUpdated']);
  chrome.tabs.onCurrentTab = new ChromeEventsProxy(['chrome', 'tabs', 'onCurrentTab']);
  chrome.tabs.onAttached = new ChromeEventsProxy(['chrome', 'tabs', 'onAttached']);
  chrome.tabs.onActivated = new ChromeEventsProxy(['chrome', 'tabs', 'onActivated']);
  chrome.tabs.onHighlighted = new ChromeEventsProxy(['chrome', 'tabs', 'onHighlighted']);

  // Some chrome.runtime methods are unavailable in off screen
  // document. So we proxy them too
  let runtimeProxy = new ModuleApiProxy('chrome', 'runtime', ['getManifest', 'reload', ]);
  chrome.runtime = _.extend(runtimeProxy, chrome.runtime);

  chrome.notifications = new ModuleApiProxy('chrome', 'notifications', ['clear', 'create', ]);
    // change the listeners to use CHromeEventProxy class
  chrome.notifications.onClicked = new ChromeEventsProxy(['chrome', 'notifications', 'onClicked']);
  chrome.notifications.onClosed = new ChromeEventsProxy(['chrome', 'notifications', 'onClosed']);
  chrome.notifications.onButtonClicked = new ChromeEventsProxy(['chrome', 'notifications', 'onButtonClicked']);
  
  chrome.windows = new ModuleApiProxy('chrome', 'windows', ['create', 'remove', 'update', 'getAll', 'getCurrent', ]);
  chrome.windows.onCreated = new ChromeEventsProxy(['chrome', 'windows', 'onCreated']);
  chrome.windows.onRemoved = new ChromeEventsProxy(['chrome', 'windows', 'onRemoved']);
  chrome.windows.onReplaced = new ChromeEventsProxy(['chrome', 'windows', 'onReplaced']);
  chrome.windows.onUpdated = new ChromeEventsProxy(['chrome', 'windows', 'onUpdated']);
  chrome.windows.onCurrentTab = new ChromeEventsProxy(['chrome', 'windows', 'onCurrentTab']);
  chrome.windows.onFocusChanged = new ChromeEventsProxy(['chrome', 'windows', 'onFocusChanged']);

  chrome.action = new ModuleApiProxy('chrome', 'action', ['setBadgeBackgroundColor', 'setBadgeText', 'setIcon']);
  chrome.contextMenus = new ModuleApiProxy('chrome', 'contextMenus', ['create', 'removeAll']);
  chrome.contextMenus.onClicked = new ChromeEventsProxy(['chrome', 'contextMenus', 'onClicked']);

  chrome.offscreen = new ModuleApiProxy('chrome', 'offscreen', [ 'reload', ]);

  chrome.i18n = new ModuleApiProxy('chrome', 'i18n', ['getUILanguage']);
  chrome.storage = {
    local: new ChromeStorageProxy('local', ['get', 'set', 'remove', 'clear']),
  }
}

createChromeProxy();

// For xml, if we get XMLDocument as response, we directly pass it to frontend
// since we use ports now, the responses are serialized. So we add the toJSON method
// to XMLDocument class to support serialization
XMLDocument.prototype.toJSON = function toJSON() {
  return this.documentElement.outerHTML
}

class OffscreenFrontEndPort {
  // Port to communicate with frontend pages. The connect request
  // is made by frontend pages in platform/service.js
  constructor(port) {
    this.port = port;
    this.listenerMap = {};
    this.disconnected = false;
    this.onMessage = this.onMessage.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    service.state.on('all', this.forwardServiceStateEvents, this);
    port.onMessage.addListener(this.onMessage);
    port.onDisconnect.addListener(this.onDisconnect);
  }
  async onMessage(msg) {
    let mod = globalThis;
    let {path, method, args} = msg;
    try {
      if (msg.type === EXT_CONST.PORT_EVENT_OFFSCREEN) {
        this[method](msg);
        return;
      }
      for (let name of path) {
        mod = mod[name];
      }
      let res = await mod[method](...args);
      this.postMessage({ id: msg.id, data: res});
    } catch (err) {
      console.error('Post message error:', msg, path, method, err);
      this.postMessage({ id: msg.id, err});
    }
  };
  onDisconnect() {
    this.disconnected = true;
    this.removeAllListeners();
    service.state.off('all', this.forwardServiceStateEvents, this);
  }
  postMessage(msg) {
    if (this.disconnected) {
      console.error('Sending message to disconnected port', msg);
      return;
    }
    this.port.postMessage(msg);
  }

  disconnect() {
    this.port.onMessage.removeListener(this.onMessage);
    this.port.onDisconnect.removeListener(this.onDisconnect);
    this.port.disconnect();
  }

  // TODO: Make these two a single function?

  forwardEvent(path, event, ...args) {
    this.postMessage({type: EXT_CONST.PORT_EVENT_OFFSCREEN, path, event, args});
  }

  forwardServiceStateEvents (event, stateObject) {
    let attributes = stateObject.attributes;
    this.postMessage({type: EXT_CONST.PORT_EVENT_SERVICE_STATE, event, attributes});
  }

  addPortOffEventProxy ({path, event}) {
    let listenerKey = path.join('@') + '@' + event;
    let mod = globalThis;
    for (let name of path) {
      mod = mod[name];
    }
    if (!this.listenerMap[listenerKey]) {
      const listener = (...args) => this.forwardEvent(path, event, ...args);
      mod.on(event, listener);
      this.listenerMap[listenerKey] = {
        listener
      };
    }
    this.listenerMap[listenerKey].count = (this.listenerMap[listenerKey].count || 0) + 1;
  }

  removePortOffEventProxy ({path, event}) {
    let listenerKey = path.join('@') + '@' + event;
    let mod = globalThis;
    for (let name of path) {
      mod = mod[name];
    }
    if (this.listenerMap[listenerKey].count === 0) {
      mod.off(event, this.listenerMap[listenerKey].listener);
      delete this.listenerMap[listenerKey];
    }
  }

  removeAllListeners() {
    for (let listenerKey in this.listenerMap) {
      let path = listenerKey.split('@');
      let event = path.pop();
      let mod = globalThis;
      for (let name of path) {
        mod = mod[name];
      }
      mod.off(event, this.listenerMap[listenerKey].listener);
    }
    this.listenerMap = {};
  }
}

chrome.runtime.onConnect.addListener(port => {
  if (port.name.startsWith("frontend_service")) {
    let newPort = new OffscreenFrontEndPort(port);
  } else {
    return;
  }
})

async function serviceWorkerReady() {
  return new Promise ((resolve, reject) => {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      if (registrations.length > 0) {
        resolve(registrations[0]);
      } else {
        navigator.serviceWorker.register('/distill-service-worker.js')
        .then((registration) => {
          resolve(registration);
        })
        .catch((error) => {
          console.error('Service worker registration failed:', error);
          reject(error);
        });
      }
    });
  })
}
async function createServiceWorkerPort() {
  try {
    creatingServiceWorkerPortPromise = new Promise ((resolve, reject) => {
      serviceWorkerCreateResolve = resolve;
    })
    let registeredSW = await serviceWorkerReady();
    serviceWorkerPort = await chrome.runtime.connect(chrome.runtime.id, {
      name: "offscreen_" + Date.now()
    });
    if (isSWReconnect) {
      window.dispatchEvent(new Event("port:reconnect"));
      isSWReconnect = false;
    }
    serviceWorkerPort.onMessage.addListener((msg) => {
      if (msg.type === EXT_CONST.PORT_EVENT_SERVICE) {
        let {path, args} = msg;
        let mod = globalThis;
        for (let name of path) {
          mod = mod[name];
        }
        mod.trigger(...args);
        return;
      }
      let id = msg.id;
      portCallbacks[id]?.fn(msg.err, msg.data);
      delete portCallbacks[id];
    })
    serviceWorkerPort.onDisconnect.addListener(msg => {
      serviceWorkerPort = null;
      isSWReconnect = true;
    })
    serviceWorkerCreateResolve();
    creatingServiceWorkerPortPromise = null;
    return;
  } catch (err) {
    console.error('Error sending message:', err);
  }
}

createServiceWorkerPort();

async function _call(path, method, ...args) {
  // Method calls APIs in service worker using port. Port is set to null
  // on disconnection, which is handled by creating a new connect request
  const id = ID();
  let msg = {
    id,
    path,
    method,
    args,
  }
  try {
    return new Promise(async (resolve, reject) => {
      let fn = (err, data) => err ? reject(err) : resolve(data);
      portCallbacks[id] = { fn, msg, };
      if (!serviceWorkerPort) {
        if (!creatingServiceWorkerPortPromise) {
          await createServiceWorkerPort();
        } else {
          await creatingServiceWorkerPortPromise;
        }
      }
      serviceWorkerPort.postMessage(msg);
    });
  } catch(err) {
    throw new ServiceProxyError(err, path, method);
  }
};
CFG.URL.BASE = chrome.runtime.getURL('');
CFG.URL.WELCOME = CFG.URL.WEBSITE+'/docs/web-monitor/distill-chrome-extension/';
CFG.URL.BLANK = CFG.URL.BASE+'blank.html';
CFG.URL.STICKY = CFG.URL.BASE+'sticky.html';
CFG.URL.DIFFWORKER = '/lib/worker.mjs';

CFG.CLIENT = {
  TYPE: 11,
  NAME: 'chrome',
  INFO: 'Google Chrome',
};

CFG.ORIGIN_TRIAL_TOKEN = `Avp+hs1DMWUxZQiSM0XIJcdeqniuqJTAdEDpcSXroA4f3dwo9Ay3fQhcDUh8++/X0+992HOVD6yWZuSkXWMvpAEAAABneyJvcmlnaW4iOiJjaHJvbWUtZXh0ZW5zaW9uOi8vaW5saWtqZW1lZWtub2Zja2tqb2xuamJwZWhnYWRnZ2UiLCJmZWF0dXJlIjoiV2ViU1FMIiwiZXhwaXJ5IjoxNzE2OTQwNzk5fQ==`;;
function idFn(prefix = '') {
  return () => prefix + ID();
}

let DBG = DEV || 0;

// Generate four random hex digits.
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
  return (S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4());
}

const Supports = window.Supports = {
  tabForXFrame: true,
  tabForDynamic: true,
};

;
// some clients can generate errors at a very high rate.
// cap the number of errors sent to sentry for a given session.
const SENTRY_MAX_COUNT = 100;
let SENTRY_COUNT = 0;


// don't track installs on android
if(isElectron() || !navigator.userAgent.includes('Android')) {
  Sentry.init({
    ...CFG.SENTRY,
    integrations: function (integrations) {
      // integrations will be all default integrations
      return integrations.filter(function (integration) {
        // For electron enabling SentryMinidump integration creates
        // a crashReporter which does not submit mindumps to the
        // Sentry server. So we exclude it and create our own crashReporter
        return isElectron()? integration.name !== "SentryMinidump" : true;
      });
    },
    beforeSend(event, hint) {
      SENTRY_COUNT++;
      return SENTRY_COUNT < SENTRY_MAX_COUNT ? event : null;
    },
  });

}
if (isElectron()) {
  crashReporter.start({
    companyName: "Neemb LLC",
    productName: "Distill Web Monitor - Desktop App",
    compress: true,
    ignoreSystemCrashHandler: true,
    submitURL: CFG.SENTRY.minidump_url,
  });
}

Error.prototype.toJSON = function() {
  return { 
      message: this.message,
  }
}

// Service level configurations
class ErrorBase extends Error {
  constructor(code, message, data = {}) {
    super(message);
    this.code = code;
    this.data = data;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      stack: this.stack,
    }
  }
}

function Err(code, msg) {
  const tpl = createTemplate(msg);

  return class Error extends ErrorBase {
    constructor(data) {
      super(code, tpl(data), data);
    }

    setSnapshot(snapshot) {
      this.snapshot = snapshot
    }

    hasSnapshot(snapshot) {
      return !!this.snapshot
    }

    // Checks if err is of same type
    static si(err) {
      return code === err.code;
    }
  };
}

// XXX expose different error classes directly?
_.extend(Err, {

  ABORT: Err('ABORT', 'Activity aborted!'),

  EBROWSER: Err('EBROWSER', 'Browser api error: {{message}}'),

  EREQUEST: Err('EREQUEST', '{{message}} - {{url}}'),

  NOT_FOUND: Err('NOT_FOUND', '{{type}} not found with {{id}}.'),

  PARAM_INVALID: Err('PARAM_INVALID', 'Invalid {{param}}, got: {{value}}'),

  PAGE_LOAD: Err('ELOAD', 'Failed to load page; cause: {{message}}'),

  SELECTION_EMPTY: Err('SELECTION_EMPTY', 'Selection did not match any content'),

  TIMEOUT: Err('TIMEOUT', '{{type}} timedout after {{time}} seconds.'),

  TYPE_UNKNOWN: Err('TYPE_UNKNOWN', '{{type}} of unknown type: {{value}}'),

  UNHANDLED: function(e) {
    return {
      code: 'UNHANDLED',
      message: e.toString(),
      data: e.stack,
    };
  },

});

;
/**
 * Global object to trigger and subscribe to events.
 *
 * Namespacing events:
 *  ns_1:ns_x:name, event
 *
 * All arguments to a trigger should be serializable into JSON.
 */
const gEvents = window.gEvents = _.extend({}, Backbone.Events);

function returnEventSource (url, callback) {
  if (CFG.CLIENT.TYPE === C.CLIENT_ELECTRON) {
    const source = new EventSource(url, { heartbeatTimeout: 300000 });
    callback(null, source);
  } else {
    const source = new EventSource(url);
    callback(null, source);
  }
}

function createEventSource (callback) {
  // 1. Get token to subscribe to notifications
  HTTP.request({
    url: CFG.URL.BROADCAST + '/temp_token',
    method: 'POST',
    headers: apiHeaders(),
  }, function(err, xhrObj) {
    if (err) {
      callback(err);
    } else {
      let res = xhrObj.response;
      const ENTITIES = ['clients', 'sieves', 'sieve_data', 'sieve_actions', 'sieve_rules', 'tags', 'user_attrs', 'users', 'users_clients_groups', 'macros'];
      const EVENT_SOURCE_URL = CFG.URL.BROADCAST + '/events/' + res.token+'?' + qs.stringify({entities: ENTITIES});
      returnEventSource(EVENT_SOURCE_URL, callback)
    }
  });
}
;
const BBEvent = function() {};
BBEvent.prototype = Backbone.Events;

BBEvent.prototype.waitForEvent = function(name, timeout = 0) {
  return new Promise((resolve, reject) => {
    this.once(name, resolve);
    if(timeout > 0) {
      setTimeout(reject, timeout, new Error('time out waiting for: ' + name));
    }
  });
}

const REGEX_CHARS_SPECIAL = '*.?^$[]{}()\/+,:|!'.split('').map(function(chr) {
  return [new RegExp('\\' + chr, 'g'), '\\' + chr];
});

const LOGGED_MESSAGES = {};
const LOG_SKIP_NEXT_N = 100;
const MAX_TAB_CREATE_RETRY_COUNT = 10;
/**
 * @typedef {{
 *   category?: string,
 *   level?: "fatal" | "critical" | "error" | "warning" | "log" | "info" |"debug",
 *   message: string,
 *   data?: object,
 *   timestamp?: number,
 * }} SentryBreadCrumb
 */

/**
 * @param {SentryBreadCrumb} breadCrumb
 */
function addBreadcrumb(breadCrumb) {
  if (!window.Sentry) {
    return
  }
  if (!breadCrumb.timestamp) {
    // sentry needs the secs instead of milliseconds
    breadCrumb.timestamp = Date.now() / 1000;
  }
  if (!breadCrumb.level) {
    breadCrumb.level = 'info';
  }
  Sentry.addBreadcrumb(breadCrumb);
}

function logMessage(msg, ...args) {
  let count = LOGGED_MESSAGES[msg] || 0;
  if(count == 0) {
    window.Sentry && Sentry.captureMessage(msg, ...args);
  }
  count += 1;
  // log, skip N and log again
  LOGGED_MESSAGES[msg] = count > LOG_SKIP_NEXT_N ? 0 : count;
}

/**
 * @param {Error} err
 * @param {SentryBreadCrumb | SentryBreadCrumb[]} breadCrumbs
 */
globalThis.logException = function logException(err,  ...breadCrumbs) {
  if (!window.Sentry) {
    return
  }
  breadCrumbs.map(bc => ({level: 'error', ...bc})).forEach(addBreadcrumb);
  Sentry.captureException(err);
}

function testURL(url) {
  return /^(http:|https:)/i.test(url);
};

function createTemplate(str) {
  return (data) => str.replace(/\{\{(\w*)\}\}/g, (x, key) => data[key] || '');
}

function wildcardMatch(pattern, str) {
  const expr = pattern.split('*').map(function(block) {
    REGEX_CHARS_SPECIAL.forEach(function(replacer) {
      block = block.replace(replacer[0], replacer[1]);
    });
    return block;
  }).join('.*');
  const regex = new RegExp('^' + expr + '$');
  return regex.test(str);
}

function getHostname(url) {
  return url.split('/')[2];
}

/*
  Take a function, with last argument as callback,
  and promisify it if callback is null, else just
  call the function with arguments.
  **** Will work only if there is only one function as argument in fn, as callback.
  **** Will work with only 2 arguments in the callback function inside new Promise,
       err, res. Since resolve & reject only takes 1 argument.
*/
function promisifyOrCallback(fn) {
  return function(...args) {
    if (typeof(args[args.length-1]) != 'function') {
      return new Promise((resolve, reject) => {
        fn.call(this, ...args, (err, res) => err ? reject(err) : resolve(res));
      });
    } else {
      fn.call(this, ...args);
    }
  };
}

function getValueFromPath(json, path) {
  const parts = path.split('.');
  let value = json;

  for (let i = 0; i < parts.length; i += 1) {
    value = value[parts[i]];
    if (value == null) {
      break;
    }
  }
  return value;
}

async function sha1Digest(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**
 * @param {number} ms
 * @param {string|Error} [message]
 */
function throwAfterNMillis(ms, message) {
  return new Promise((_, reject) => setTimeout(() => {
    if (message instanceof Error) {
      reject(message);
    } else {
      reject(new Error(message ?? `Timeout ${ms}ms exceeded`));
    }
  }, ms));
}


class CancellablePromise {

  cancel() {
    throw new Error("Not Implemented")
  }
}

class CancellableTimeoutPromise extends CancellablePromise {

  timeoutId = null

  /**
   * @type {Promise}
   */
  promise = null

  constructor(ms, e) {
    super();
    this.promise = new Promise((_, rej) => {
      this.timeoutId = setTimeout(() => {
        rej(e)
      }, ms)
    })
  }

  cancel() {
    clearTimeout(this.timeoutId)
  }
}

function isElectron() {
  return CFG.CLIENT.TYPE === C.CLIENT_ELECTRON;
}
;
const NotifyAudio = (function() {
  let defaultSrc = '/skin/media/bell_strike.ogg';

  return {
    play: function(action) {
      const src = action?.config?.tone || defaultSrc;
      async function playAudio (src) {
        const player = new Audio();
        player.src = src;
        player.play();
      }
      if (src.indexOf('tone:') == 0) {
        KVStore.findOne(src, function(err, doc) {
          // doc can be null if tone was not found
          doc ? DOMUtils.call(playAudio, doc.value) : DOMUtils.call(playAudio, defaultSrc);
        });
      } else {
        DOMUtils.call(playAudio, src);
      }
    },
  };
})();

const NotifyPopup =  (function() {
    chrome.notifications.onButtonClicked.addListener(async function(notificationId, btnIndex) {
      await chrome.notifications.clear(notificationId);
      const words = notificationId.split(/--(.+)/);
      if (words[0] === 'errorG') {
        await chrome.tabs.create({url: service.appUrl+'#/settings/error_actions/'});
      } else {
        const sieveId = words[1].split(':')[0];
        // console.log('opening sieve id:', sieveId, words[1]);
        if (btnIndex == -1) {
        // BUG Win10+Chrome, non-button area click fired onButtonClicked
          service.openAndMarkRead(sieveId);
        } else {
          service.markReadById(sieveId);
        }
      }
    });

    chrome.notifications.onClicked.addListener(async function(notificationId) {
      const words = notificationId.split(/--(.+)/);// using capturing group to show matched part as a part of result
      if (words[0] === 'update') {
        const sieveId = words[1].split(':')[0];
        service.openAndMarkRead(sieveId);
      } else if (words[0] === 'error') {
        await chrome.tabs.create({url: words[1]});
      } else if (words[0] === 'errorG') {
        await chrome.tabs.create({url: words[1]});
      }
      await chrome.notifications.clear(notificationId);
    });


    chrome.notifications.onClosed.addListener(function(notificationId, byUser) {
    });

    return {
      hide: function() {
      },

      /**
       * @param {{
       *   monitors: [{
       *     sieveId: string,
       *     name:string,
       *     work_id: string,
       *   }],
       *   monitor_count: number,
       * }} {monitors, monitor_count}
       * @returns {Promise<void>}
       */
      showErrorGroupV2: async function({monitors, monitor_count}) {
        const title = 'Errors encountered';
        let message = '';
        let url = '';
        if (monitor_count > 1) {
          message = `Error monitoring ${monitor_count} sieves`;
          url = 'errorG--' + service.appUrl + `#/w/0/list/error/`
        } else {
          const monitor = monitors[0];
          message = `Error monitoring ${monitor.name}`;
          url = 'errorG--' + service.appUrl + `#/checks/0/${monitor.sieveId}?work=${monitor.work_id}`
        }

        // Note: We were using distill_error.svg for the error notification icon
        // but it does not work in MV3. So, we are using a default distill logo png file instead.
        await chrome.notifications.create(url, {
          type: 'basic',
          title: title,
          message: message,
          iconUrl: 'ui/img/distill_128.png',
          requireInteraction: true,
          buttons: [{
            title: 'Settings',
          }],
        });
      },
      show: function(action, context) {
      // console.log('Actions:popup:show', action, context);

        // Add message to list of messages to be shown to user. Once popup is
        // shown, it will pull message and display it to the user.

        const {sieve, sieve_data} = context;

        PopupMessageStore.create({
          rel: SieveStore.name,
          key: sieve.id,
          uri: sieve.uri,
          title: sieve.name, // TODO Add a snippet of diff from context?
        }, async function(err, msg) {
          const
            title = sieve.name;


          let body = sieve_data.text;

          body = body.length > 70 ? body.substring(0, 70) + '...' : body;

          await chrome.notifications.create(`update--${sieve.id}:${sieve_data.id}`, {
            type: 'basic',
            title: msg.title,
            message: body, // TODO Show a smart preview of content
            iconUrl: 'ui/img/distill_128.png',
            buttons: [{title: 'Mark as Read'}],
          });
        });
      },
    };
  })();;
var ErrorActions = (function() {
  const counter = 0;
  // var timer = [0, 1000, 2000, 3000, 4000];
  let timer = 0;
  let eaUnreadErrList= {};
  let setTime;
  let handleFirstCalled = false;
  let timerId;
  /*
  function intervalReset(){
    if(Date.now() - setTime >= 7200000){
      counter = 0;
      setTime = Date.now();
    }
    setTimeout(intervalReset, 7210000);
  }
  */
  function runTimer() {
    if (_.size(eaUnreadErrList) > 0) {
      ErrorActions.handleIntervalError();
    }
    timerId = setTimeout(runTimer, timer*60000);
  }
  gEvents.on('init', function(argument) {
    Prefs.on('change:errorAction.enabled change:active', function(e) {
      if (!(Prefs.get('errorAction.enabled') && Prefs.get('active') )) {
        clearTimeout(timerId);
        NotifyPopup.clearErrorGroup?.();
      } else {
        handleFirstCalled = false;
      }
    });
    eaUnreadErrList = Prefs.get('eaUnreadErrList', {});
    timer = Prefs.get('errorAction.interval');
  });
  return {
    handleError: function(sieve, err) {
      const minCount = parseInt(Prefs.get('errorAction.minCount', 3));
      if (err.count === minCount) {
        eaUnreadErrList[sieve.id] = Date.now();
        Prefs.set('eaUnreadErrList', eaUnreadErrList);
      }
      // condition passes when user enables notifications and first error occurs
      if (Prefs.get('errorAction.enabled') && Prefs.get('active') && (!handleFirstCalled && err.count >= minCount)) {
        if (!_.isEmpty(eaUnreadErrList)) {
          this.handleFirstError(sieve, err);
        }
        runTimer();
      }
    },
    handleFirstError: function(sieve, err) {
      NotifyAudio.play({
        config: {
          tone: Prefs.get('errorAction.sound') || '/skin/media/buzzer.ogg',
        },
      });
      handleFirstCalled = true;
    },

    handleIntervalError: function() {
      SieveStore.find({
        // XXX Users only need notifications for monitors that are ON.
        'state.in': [C.STATE_READY],
        'err.ne': '$null',
        // 'ts_view.lt': { name: 'ts_data', type: 'field' }
      }, {
        only: ['id', 'ts', 'name', 'err'],
        order: ['-ts_mod'],
      }, function(err, result) {
        if (err) {
          DBG && console.error('Failed to schedule.');
          // XXX Severe error, unilkely to happen.
        } else {
          if (result && result.count > 0) {
            const resultList = _.filter(result.data, function(sieve) {
              return eaUnreadErrList[sieve.id];
            });

            if (_.size(resultList) > 0) {
              NotifyPopup.showErrorGroup(resultList);
              /*
                setTime = Date.now();
                if(!notificationCalled){
                  intervalReset();
                }
                notificationCalled = true;
                */
            }
          }
        }
      });
    },

    clearErrorUnreadList: function(argument) {
      NotifyPopup.clearErrorGroup();
      eaUnreadErrList = {};
      Prefs.set('eaUnreadErrList', {});
    },
  };
})();
;
const DATE_0 = new Date(0);
const DAYS = [0, 1, 2, 3, 4, 5, 6];
const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

window.ActionDescriptors = {};

ActionDescriptors[C.ACTION_EMAIL] = {
  descriptors: [{
    desc: 'Template for subject',
    name: 'subject',
    type: 'STRING_TEMPLATE',
  }, {
    desc: 'Template for email body',
    name: 'body',
    type: 'HTML_TEMPLATE',
  }],
  /**
   * Dispatches the alert.
   *
   * @action Configuration parameters. Must conform to descriptor.
   * @data Data generated by an alert.
   * @cb Callback to call when done.
   */
  act: function alert_email(action, context, cb) {
    ActionEmail.send(action, context, cb);
  },
},

ActionDescriptors[C.ACTION_LOCAL_POPUP] = {
  descriptors: [],
  act: function(action, context, cb) {
    if (Prefs.get('actions.popup', true)) {
      NotifyPopup.show(action, context);
    }
    cb();
  },
};

ActionDescriptors[C.ACTION_PUSH] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionPush.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_SMS] = {
  descriptors: [{
  }],
  act: function(action, context, cb) {
    ActionSMS.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_WEBHOOK] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionWebhook.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_SLACK] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionSlack.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_DISCORD] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionDiscord.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_TEAMS] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionTeams.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_LOCAL_OPEN_TAB] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionTab.open(action, context, cb);
  },
};
ActionDescriptors[C.ACTION_LOCAL_AUDIO] = {
  descriptors: [{
    desc: 'Name or URL of the file to play audio',
    must: true,
    name: 'src',
    type: 'SRC',
  }, {
    desc: 'Playback duration',
    must: false,
    name: 'duration',
    type: 'DURATION',
  }],
  act: function(action, context, cb) {
    if (Prefs.get('actions.audio', true)) {
      NotifyAudio.play(action, context);
    }
    cb();
  },
};

ActionDescriptors[C.ACTION_MACRO] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionMacro.run(action, context, cb);
  },
};

window.ScheduleDescriptors = {
  undefined: {
    getSchedule: function(params, logs) {
      return -1;
    },
  },
  LIVE: {
    getSchedule: function() {
      return 0;
    },
  },
  INTERVAL: {
    getSchedule: function(params, logs) {
      let
        checkedOn; let lastCheckedOn;


      const interval = params.interval;
      // in sec

      const now = Date.now()/1000 | 0;

      if (_.isUndefined(interval)) {
        return -1;
      }

      if (interval >= C.TIME_INFINITE) {
        return -1;
      }

      checkedOn = _.map(logs, function(log) {
        return new Date(log.ts);
      });

      lastCheckedOn = (_.max(checkedOn) || DATE_0).valueOf()/1000 | 0;

      if (logs.length > 0 && logs[0].err) {
        // Previously there was an error. Reschedule after 120 secs
        const
          errs = _.pluck(logs, 'err');


        const indexNull = _.indexOf(errs, null);
        if (indexNull >= 0) {
          // Additionally perform quick check iff there has been atleast one
          // successful check in the log.
          return lastCheckedOn + Math.min(120, interval);
        }
      }

      return Math.max(now, lastCheckedOn + interval) + 1; // +1 offsets |0
    },
  },

  RANDOM: {
    getSchedule: function(params, logs) {
      let
        checkedOn; let lastCheckedOn;


      const min = params.min;


      const max = params.max;


      const now = Date.now()/1000 | 0;

      if (_.isUndefined(min) || _.isUndefined(max)) {
        return -1;
      }

      if (min >= C.TIME_INFINITE || max >= C.TIME_INFINITE) {
        return -1;
      }

      checkedOn = _.map(logs, function(log) {
        return new Date(log.ts);
      });

      lastCheckedOn = (_.max(checkedOn) || DATE_0).valueOf()/1000 | 0;

      if (logs.length > 0 && logs[0].err) {
        // Previously there was an error. Reschedule after 120 secs
        const
          errs = _.pluck(logs, 'err');


        const indexNull = _.indexOf(errs, null);
        if (indexNull >= 0) {
          // Additionally perform quick check iff there has been atleast one
          // successful check in the log.
          return lastCheckedOn + Math.min(120, max);
        }
      }

      return Math.max(now, lastCheckedOn + (Math.random()*(max-min)+min)) + 1;
    },
  },
};
;
const MSG_INIT = 1;
const MSG_EVENT = 2;
const MSG_REQUEST = 3;
const MSG_RESPONSE = 4;
const MSG_LOG = 5;
const CONTENT_SCRIPTS = [
  './ui/lib/async.js',
  './ui/lib/underscore.js',
  './ui/lib/domo.js',
  './ui/lib/jquery.js',
  './ui/lib/backbone.js',
  './lib/xlibs.js',
  './content/content-pre.js',
  './content/content.js',
]
/**
 * A wrapper around native port to enable requests and response with any
 * content loaded in browser.
 * A port acts as a messaging channel between content process and background
 * process.
 */
class AbstractPort extends BBEvent {

  constructor(requestHandler) {
    super();
    if (!requestHandler) {
      throw new Error('Missing request handler');
    }
    this.id = ID();
    this._connected = true;
    this._destroyed = false;
    this.requestHandler = requestHandler;
    this.callbacks = {};
    this.onMessage = this.onMessage.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  destroy() {
    if (this._destroyed) {
      return false;
    }
    this._destroyed = true;
    this.trigger('destroy');  // for listeners
    this.off();
    this.stopListening();
    _.each(this.callbacks, (cb, id) => {
      try {
        cb.fn({ code: 'EPORTREQ', msg: 'Request to port did not complete.' });
      } catch (e) {
        DBG && console.error(e);
      }
    });
    this.callbacks = null;
    return true;
  }

  async onMessage(msg) {
    // console.log('Port:onMessage:', msg);
    let { callbacks, } = this;

    if (msg.type == MSG_REQUEST) {
      if (this._destroyed) { return; }
      let id = msg._id;
      const input = msg.data;
      const path = msg.path;

      try {
        let data = await this.requestHandler.handleRequest(path, input);
        this.postMessage({
          _id: id, type: MSG_RESPONSE,
          data,
        });
      } catch (err) {
        this.postMessage({ _id: id, type: MSG_RESPONSE, err, });
      }
    } else if (msg.type == MSG_RESPONSE) {
      // console.log('<- AbstractPort:response: ', this.id, msg._id, msg);

      let id = msg._id;
      const cb = callbacks[id];
      if (!cb) {
        console.warn('MSG_RESPONSE: missing response callback', msg);  // FIXME got response twice? how?
      } else {
        delete callbacks[id];
        cb.fn(msg.err, msg.data);
      }
    } else if (msg.type == MSG_EVENT) {
      // trigger event for its listeners
      const { type, event } = msg.data;
      // console.log('AbstractPort: event: <- ', this.id, type, event);
      this.trigger(type, event);
    } else {
      DBG && console.error('AbstractPort:Unhandled message: <- ', this.id, msg);
    }
  }

  onDisconnect() {
    this._connected = false;
    // console.log('AbstractPort:onDisconnect:', this.id, this);
    this.destroy();
  }

  postMessage(msg) {
    throw new Error('Not implemented by subclass');
  }

  sendEvent(type, event) {
    // console.log(' AbstractPort: sendEvent: -> ', this.id, type, event);

    this.postMessage({
      data: { event, type },
      type: MSG_EVENT,
    });
  }

  /**
  *
  * Send request to content
  *
  * @param {string} path
  * @param {{type: string, arg: any }} data
  * @returns {Promise}
  *
  * @example
  * sendRequest('extractor', { type: 'parseSchema', arg; <SCHEMA> })
  */
  sendRequest(path, data) {
    const _id = ID();
    // console.log('-> AbstractPort: sendRequest:', this.id, path, _id);
    const msg = {
      _id,
      data,
      path,
      type: MSG_REQUEST,
    };

    return new Promise((resolve, reject) => {
      let fn = (err, data) => err ? reject(err) : resolve(data);
      this.callbacks[_id] = { fn, msg, };
      this.postMessage(msg);
    });
  }

}

// A base port interface supporting request/response cycle.
class BasicPort extends AbstractPort {

  constructor(port, requestHandler) {
    super(requestHandler);
    if (!port) {
      throw new Error('Missing port');
    }

    this.port = port;

    port.onMessage.addListener(this.onMessage);
    port.onDisconnect.addListener(this.onDisconnect);
  }

  destroy() {
    if (super.destroy()) {
      // console.log('BasicPort:destroy', new Error().stack);
      let { port } = this;

      port.onMessage.removeListener(this.onMessage);
      port.onDisconnect.removeListener(this.onDisconnect);

      if (this._connected) {
        port.disconnect();
      }

      delete this.port;
    }
  }

  isRoot() {
    return this.port.attrs.root;
    // we used to support loading pages in an iframe but don't do that anymore
    // || (this.attrs.parent && this.attrs.parent.id === 'BG');
  }

  postMessage(msg) {
    if (this._destroyed) {
      console.warn('sending message after port was destroyed', msg);
    } else {
      this.port.postMessage(msg);
    }
  }

}

class LoaderPort extends BasicPort {

  constructor(port, requestHandler, options) {
    super(port, requestHandler, options);
    this.name = port.name;
    this.title = port.attrs.title;
    this.uri = port.attrs.uri;
    this.initDone = false;
    this.frameId = port.sender.frameId;
    this.tabId = port.sender.tab.id;
    this.pageMods = options.pageMods || [];
    this.pageFuncs = options.pageFuncs || [];

    port.postMessage({
      type: MSG_INIT,
    });

    // forwarded from content
    this.once('DOMContentLoaded', this.onDOMContentLoaded);
 }

  onDOMContentLoaded = async (e) => {
    this.title = e.title;
    // Chrome and Edge prevents content script executions in their 
    // new tab pages. So we skip the executeScript if it is a new tab page.

    let target = {
      tabId: this.tabId,
      frameIds: [this.frameId]
    };
    if (isElectron()) {
      // For Electron, the content (event.sender) obtained from
      // port:connect IPC request is the frame itself
      target.content = this.port.content;
    }

    try {
      await chrome.scripting.executeScript({
        target,
        func: 'setGlobals',
        args: [{
          DISTILL_LOCALE: Prefs.get('locale') ?? 'en-US',
          URL_BASE: chrome.runtime.getURL(''),
          CAN_EVAL_JS: isElectron(),
        }],
      });
      // In V2 we were passing some mods to be loaded in the tab
      // Now, in V3, when we are attaching the loader to a tab we execute a 
      // file bundled with all the mods rather than selectively executing
      // each mods
      await chrome.scripting.executeScript({
        target,
        files: [...CONTENT_SCRIPTS, ...this.pageMods],
      });

      /// execute pageFuncs
      for (const { path, data } of this.pageFuncs) {
        await this.sendRequest(path, data);
      }

      this.initDone = true;
      this.trigger('init');
    } catch (err) {
      if (!this._destroyed && err.code !== 'EWEBFRAMEDESTROYED') {
        // Tab might be closed (and hence the frame) by the time we get the event here
        // and executeScript can throw. In this case catch and ignore error.
        this.trigger("init:error", err)
      }
      console.error("LoaderPort:OnInit", err);
    }
  }
}

// a dummy port
class StaticLocaderPort extends AbstractPort {
  constructor(requestHandler, { content, uri }) {
    super(requestHandler);
    this.id = ID();
    this.uri = uri;
    this.content = content;
    this.content.on('message', this.onMessage);
  }

  isRoot() {
    return true;
  }

  postMessage(msg) {
    this.content.postMessage(msg);
  }

}
;
const DEFAULT_LIMIT = 50;

function SimpleStore(name) {
  this.name = name;
  const store = this.storage.getItem(this.name);
  this.data = (store && JSON.parse(store)) || {};
}

_.extend(SimpleStore.prototype, Backbone.Events, {
  defaults: {},

  storage: localStorage,

  __init__: function(callback) {
    callback && callback();
  },

  del: function(key) {
    const value = this.data[key];
    delete this.data[key];
    this.save();
    return value;
  },

  getDefault: function(key) {
    return this.defaults[key];
  },

  get: function(key, defaultValue) {
    const value = this.data[key];
    return value !== void 0 ? _.clone(value) :
      (arguments.length > 1 ? defaultValue : this.getDefault(key));
  },

  save: function() {
    this.storage.setItem(this.name, JSON.stringify(this.data));
  },

  set: function(key, value) {
    const oldValue = this.data[key];
    if (oldValue !== value) {
      this.data[key] = value;
      this.save();
      this.trigger('change:'+key, value, oldValue, key);
      gEvents.trigger('change:pref:'+key, value, oldValue, key);
    }
  },
});

window.Prefs = new SimpleStore('prefs');

if (!Prefs.get('since')) {
  Prefs.set('since', {time: new Date(), version: CFG.VERSION});
}

class SQLiteWASM {

  /**
   * @type {Worker}
   */
  worker;

  /**
   * @type {{[number]: {
   *   resolve: (result: any) => void,
   *   reject: (error: Error) => void
   * }}}
   */
  promises =  {};

  /**
   * @type {number}
   */
  lastId;

  /**
   * @type {false}
   */
  initDone = false;

  #onMessage(event) {
    const {id, result, error} = event.data;
    //
    if (this.promises[id]) {
      if (error) {
        this.promises[id].reject(error);
      } else {
        this.promises[id].resolve(result);
      }
      delete this.promises[id];
    }
  }

  #sendMessage(method, ...args) {
    return new Promise((resolve, reject) => {
      const id = this.lastId++;
      this.promises[id] = {resolve, reject};
      this.worker.postMessage({method, args, id});
    });
  }

  constructor(name = 'distill-2.db') {
    this.name = name;
    this.promises = {};
    this.lastId = 0;
  }

  _init() {
    this.worker = new Worker("/lib/jswasm/sqlite-worker-wasm.js");
    this.worker.onmessage = this.#onMessage.bind(this);
    this.initDone = true;
  }

  async open() {
    if (!this.initDone) {
      this._init();
    }
    const args = {
      filename: this.name,
      useSAHPool: true,
    };
    return this.#sendMessage('open', args);
  }

  async importFrom(importFromFile) {
    if (!this.initDone) {
      this._init();
    }
    return this.#sendMessage('importFrom', {
      filename: this.name,
      oldFilename: importFromFile,
      useSAHPool: true,
    });
  }

  async close() {
    await this.#sendMessage('close');
    this.worker.terminate();
  }

  /**
   * @param {string} sql
   * @param {any[]} values
   * @returns {Promise<{
   *   resultRows: any[]
   * }>}
   */
  async exec(sql, values) {
    const rows =  await this.#sendMessage('exec', sql, values);
    return {
      resultRows: rows
    };
  }
}

globalThis._SQLiteWASM = SQLiteWASM;

// create execQuery2 and execQueries2 using SQLiteWASM

async function execQuery(sql, values, options, callback) {
  if (_.isFunction(options)) {
    callback = options;
    options = null;
  }

  if (_.isFunction(values)) {
    callback = values;
    options = null;
    values = null;
  }

  let result = undefined;
  try {
    result = await SQLStore.db.exec(sql, values);
  } catch (e) {
    logException(new Error(e.message), {
      data: e,
      message: 'execQuery2: error',
    });
    return callback(e,  null);
  }
  const rows = result.resultRows;

  const isSelect = sql.slice(0, 6) == 'SELECT';
  if (options?.count) {
    callback(null, rows[0]);
  } else if (isSelect) {
    callback(null, rows);
  } else {
    callback(null/*, result.changeCount*/); // count not being used?
  }
}

globalThis.execQuery = execQuery = promisifyOrCallback(execQuery);

async function execQueries(statements) {
  // ASK: values/query arguments not being passed? Most likely not being used
  return await SQLStore.db.exec(statements.join(';'));
}

globalThis.execQueries = execQueries;

async function openConnection(name, callback) {
  // Some people have 100s of alerts requiring large amount of storage data.
  const sqliteWasmInitTS = localStorage.getItem('sqlite-wasm');
  const currentVFS = localStorage.getItem('sqlite-wasm-vfs');
  addBreadcrumb({
    message: 'openConnection:init',
    data: {sqliteWasmInitTS, currentVFS},
  });
  try {
    // doing away with db1
    //  db1 will not be initialized anymore
    SQLStore.db = new SQLiteWASM(name);
    const migrationWillApply = !!sqliteWasmInitTS && currentVFS !== 'opfs-sahpool';
    addBreadcrumb({message: 'openConnection:init:migrationWillApply', data: {migrationWillApply}});
    if (migrationWillApply) {
      DEV && console.log('sqlite-wasm: migration will apply');
      await SQLStore.db.importFrom('distill.sqlite');
    } else {
      // either first time (!sqliteWasmInitTS)
      // or already migrated (currentVFS === 'opfs-sahpool')
      DEV && console.log('sqlite-wasm: migration will not apply', {sqliteWasmInitTS, currentVFS});
    }
    addBreadcrumb({message: 'openConnection:db'});
    await SQLStore.db.open();
    addBreadcrumb({message: 'openConnection:db:success'});
    if (!sqliteWasmInitTS) {
      localStorage.setItem('sqlite-wasm', Date.now());
    }
    if (!currentVFS) {
      localStorage.setItem('sqlite-wasm-vfs', 'opfs-sahpool');
    }
    callback();
  } catch (err) {
    console.error('Failed to open SQLiteWASM:', err);
    logException(err);
    callback(err);
  }
}
;
// Common file for apps with sqlite.
function tableCreate(store, callback) {
  const sql = Statements.createTable(store);
  // console.log('tableCreate:', store.name, store.fields, sql);
  execQuery(sql, function(err) {
    if (err) {
      callback(err);
    } else {
      MaintLog.create({
        name: store.name,
        version: store.versions[store.versions.length - 1].version,
      }, callback);
    }
  });
}

async function tableUpgradeFromVersion(store, currentVersion, callback) {
  // TODO Perform all upgrade within one transaction
  // console.log('tableUpgradeFromVersion:', store.name, currentVersion);
  const
    versions = store.versions;


  const indexCurrent = _.indexOf(versions, _.findWhere(versions, {
    version: currentVersion,
  }));


  const currentVersions = _.first(versions, indexCurrent+1);


  const newVersions = _.rest(versions, indexCurrent+1);

  if (indexCurrent < 0 || newVersions.length == 0) {
    throw new Error('Incorrect version to upgrade from: ' + currentVersion);
  }

  const unchangedFields = _.flatten(_.pluck(currentVersions, 'fields'));
  const unchangedFieldNames = _.pluck(unchangedFields, 'name');
  const newOrRenamedFields = _.flatten(_.pluck(newVersions, 'fields'));
  const newOrRenamedFieldNames = _.pluck(newOrRenamedFields, 'name');
  const renamedFields = _.filter(newOrRenamedFields, function(field) {
    return field.oldName;
  });
  const renamedOldNames = _.pluck(renamedFields, 'oldName');
  const renamedNewNames = _.pluck(renamedFields, 'name');
  const oldSelectFields = unchangedFieldNames.concat(renamedOldNames).join(',');
  const newInsertFields = unchangedFieldNames.concat(renamedNewNames).join(',');


  let table = store.name;

  let tableUpgradeStatements = [
    `ALTER TABLE ${table} RENAME to _tmp_;`,
    `${Statements.createTable(store)};`,
    `INSERT INTO ${MaintLog.name} (name, version) VALUES ('${table}', ${store.versions[store.versions.length - 1].version});`,
    `INSERT INTO ${table} (${newInsertFields}) SELECT ${oldSelectFields} FROM _tmp_;`,
    `DROP table _tmp_;`,
  ];
  try {
    await execQueries(tableUpgradeStatements);
  } catch (err) {
    console.error("TABLE UPGRADE FAILED!", err);
    isElectron() && app.quit();
  }
  callback();
}

function tableCheckForUpgrade(store, callback) {
  // console.log('tableCheckForUpgrade:', store.name);
  // TODO Query metadata for table's currently installed version
  // TODO Add entries to maint_logs when we create a new table or upgrade
  // it to the latest version.
  let currentVersion = store.versions[0].version;
  const latestVersion = store.versions[store.versions.length - 1].version;

  MaintLog.findOne({
    name: store.name,
  }, {
    limit: 1,
    order: ['-ts'],
  },
  function(err, doc) {
    // console.log('tableCheckForUpgrade: findOne in maint_logs:', err, doc);
    err && console.error('err:', err);
    if (doc) {
      currentVersion = doc.version;
    }
    if (latestVersion > currentVersion) {
      DEV && console.log('tableCheckForUpgrade: upgrade needed:', store.name, 'currentVersion', currentVersion, 'latestVersion', latestVersion);
      tableUpgradeFromVersion(store, currentVersion, callback);
    } else {
      callback();
    }
  });
}

function tableInit(store, callback) {
  // console.log('tableInit:', store.name);
  // Steps to initialize tables:
  // 1. Check if table exits, and if so, which version.
  // 2. If table does not exist, create a new table.
  // 3. If table exists, start upgrade for each version sequentially.
  const outValues = [];

  const sql = Statements.select({
    tableName: 'sqlite_master',
    fields: [{name: 'name'}],
  }, {name: store.name}, {only: ['name']}, outValues);

  execQuery(
    sql,
    outValues,
    function(err, result) {
      if (err) {
        DEV && console.error('failed to fetch data from sqlite_master', err);
        callback(err);
      } else {
        if (result.length === 1) {
          DEV && console.log('table exists:', store.name);
          tableCheckForUpgrade(store, callback);
        } else {
          if (localStorage.getItem('sqlite-wasm') !== null && store === MaintLog /* log it for only one table to reduce count */) {
            // the table should be there but isn't. why?
            const lastInitTs = localStorage.getItem('sqlite-wasm');
            const initCount = localStorage.getItem('sqlite-wasm-count') ?? 1;
            (async () => {
              const storageEstimate = await navigator?.storage?.estimate();

              logMessage(`sqlite-wasm: table missing after initial setup ${store.name}`, {
                extra: {
                  lastInitTs,
                  initCount,
                  storageEstimate,
                  isOPFSAvailable: globalThis.FileSystemHandle &&
                    globalThis.FileSystemDirectoryHandle &&
                    globalThis.FileSystemFileHandle &&
                    navigator?.storage?.getDirectory
                }
              });

              localStorage.setItem('sqlite-wasm-count', 1 + +initCount);
            })();
          }
          tableCreate(store, async (err) => {
            if (err) {
              return callback(err);
            }
            if (auth.isLoggedIn()) {
              return callback();
            }
            if (backupEnabled()) {
              try {
                await restoreBackupForStore(store);
              } catch (e) {
                console.error('restoreBackupForStore failed for store', store.name, e);
                return callback(err);
              }
            }
            callback()
          });

        }
      }
    }
  );
}

function initStores(callback) {
  // Must init sequentially, _tmp_
  openConnection('distill-sah.sqlite', function(err) {
    if (err) {
      return callback(err);
    }
    execQuery(`PRAGMA journal_mode = TRUNCATE`, function (err, res) {
      if (err) {
        return callback(err);
      }
    })
    const SQL_STORES = [
      MaintLog, ClientStore, UserStore, SieveStore, TagStore, SieveDataStore,
      ActionStore, RuleStore, AttrStore, ErrorStore, WorkStore, PopupMessageStore,
      KVStore, ClientGroupStore, SieveSnapshotStore, MacroStore, WorkflowStore, DatasourceStore
    ];

    async.eachSeries(SQL_STORES, function(store, callback) {
      // console.log('to call tableInit:', store.name);
      tableInit(store, function(err) {
        err && console.error('err:', err);
        callback(err);
      });
    }, async function(err) {
      // console.log('initStores done', err)
      if (err) {
        return callback(err);
      }
      try {
        const SQL_STORES_FOR_BACKUP = [
          ClientStore, UserStore, SieveStore, TagStore,
          ActionStore, RuleStore, AttrStore, MacroStore,
        ];
        if (!auth.isLoggedIn() && backupEnabled()) {
          SQL_STORES_FOR_BACKUP.forEach(store => {
            initBackupForStore(store);
          });
          auth.on('login', () => {
            SQL_STORES_FOR_BACKUP.forEach(store => {
              removeBackupListenersForStore(store);
            });
          });
        }
        Prefs.__init__(callback);
      } catch(e) {
        callback(e)
      }
    });
  });
}

/**
 * Return true only when sqlite3 wasm is used.
 * @returns {boolean}
 */
function backupEnabled() {
  return !!SQLStore.db && !isElectron();
}
;
Prefs.defaults = {
  'active': true,
  'nworkers': 3,
  'account.sync': false,
  'actions.audio': true,
  'actions.popup': true,
  'actions.popup.autohide': 20,
  // 'page.embedded': true,
  // 'page.embedded.dock': 'R',
  'sticky-window-timeout': 6,
  'sieve-slot.start': '00:00',
  'sieve-slot.end': '23:59',
  'time-slot-map': {
    '0': {'start': '00:00', 'end': '23:59'},
    '1': {'start': '00:00', 'end': '23:59'},
    '2': {'start': '00:00', 'end': '23:59'},
    '3': {'start': '00:00', 'end': '23:59'},
    '4': {'start': '00:00', 'end': '23:59'},
    '5': {'start': '00:00', 'end': '23:59'},
    '6': {'start': '00:00', 'end': '23:59'},
  },
  'x-frame-load-in': 'tab', // bg, tab, window, sticky_window
};

execQuery = promisifyOrCallback(execQuery);
globalThis.SQLStore = function SQLStore(options) {
  const self = this;
  const debouncedSyncPost = _.debounce(() => SyncMan.post(this), 120000);

  _.extend(this, {
    primaryKey: 'id',
    tableName: options.name, // alias for statements library
  }, options, {
    fields: _.flatten(_.pluck(options.versions, 'fields')),
  });
  this.fieldIndex = _.indexBy(this.fields, 'name');
  this.fieldNames = _.pluck(this.fields, 'name');

  this.syncable = !!self.sync;


  this.create = create = promisifyOrCallback(create);
  this.destroy = destroy = promisifyOrCallback(destroy);
  this.destroyWithSubQuery = destroyWithSubQuery = promisifyOrCallback(destroyWithSubQuery);
  this.find = find = promisifyOrCallback(find);
  this.findOne = findOne = promisifyOrCallback(findOne);
  this.update = update = promisifyOrCallback(update);
  this.updateLocal = updateLocal;
  this.hasField = hasField;

  SQLStore[this.name] = this;

  function formatFields(doc) {
    const newDoc = _.extend({}, doc);
    _.each(doc, function(value, key) {
      const
        field = self.fieldIndex[key];

      if (key === 'ts' || key.indexOf('ts_') === 0) {
        if (_.isNumber(value)) {
          try {
            // console.log('formatFields: ', value, key)
            newDoc[key] = new Date(value).toISOString();
            // console.log('formatFields: date - ', newDoc[key])
          } catch (e) {
            console.error(e);
          }
        }
      } else if (field && field.type == 'json') {
        if (_.isString(value)) {
          newDoc[key] = JSON.parse(value);
        }
      } else if (field && field.type == 'boolean') {
        newDoc[key] = value ? true : false;
      }
    });
    if (!options.formatFields) {
      return newDoc;
    }
    return options.formatFields(newDoc);
  }

  function deformatFields(doc) {
    // console.log('deformatFields: oldDoc - ', doc)
    const newDoc = _.extend({}, doc);
    _.each(doc, function(value, key) {
      const
        name = key.split('.')[0];


      const field = self.fieldIndex[key];

      if (name === 'ts' || name.indexOf('ts_') === 0) {
        if (_.isString(value)) {
          newDoc[key] = new Date(value).valueOf();
        }
      } else if (field && field.type == 'json') {
        if (_.isObject(value)) {
          newDoc[key] = JSON.stringify(value);
        }
      } else if(field && field.type == 'boolean') {
        newDoc[key] = value ? 1 : 0;
      }
    });
    // console.log('deformatFields: newDoc - ', newDoc)
    return newDoc;
  }

  // $api
  async function create(doc, callback) {
    // console.log('create doc: ', doc);
    const canSync = self.syncable && auth.isLoggedIn();

    _.defaults(doc, {_state: C.LOCAL_STATE_POST}, _.result(self, 'defaults'));

    if (canSync && doc._state !== C.LOCAL_STATE_SYNCED) {
      try {
        const response = await api(self.urls.root, 'POST', doc);
        doc = {...doc, ...response};
        doc._state = C.LOCAL_STATE_SYNCED;
      } catch (err) {
        _.defaults(doc, {id: guid()});
      }
    }
    createLocalDoc(deformatFields(doc), callback);
  }

  function createLocalDoc(doc, callback) {
    _.defaults(doc, {id: guid()});

    const
      id = doc.id;


    const outValues = [];


    const sql = Statements.insert(self, doc, outValues);

    callback || (callback = function() {});
    execQuery(sql, outValues, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        findOne(id, function(err, doc) {
          callback(err, formatFields(doc));
          !err && doc && gEvents.trigger('store:'+self.name+':create', doc);
        });
      }
    });
  }

  // $api
  function destroy(query, callback) {
    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    callback || (callback = function() {});

    async.series({
      list: function(callback) {
        find(query, {only: ['id']}, callback);
      },
      destroys: function(callback) {
        const
          outValues = [];


        const sql = Statements.destroy(self, query, outValues);

        execQuery(sql, outValues, callback);
      },
    }, function(err, result) {
      callback(err, result.destroys);

      if (!err && result.list.count > 0) {
        result.list.data.forEach(function(row) {
          // console.log('Destroying ', row)
          gEvents.trigger('store:'+self.name+':destroy', row);
        });
      }
    });
  }

  // Need a special function to delete fields using a select from the same
  // table that requires LIMIT and OFFSET.
  // XXX Why not make it the default destroy implementation?
  function destroyWithSubQuery(query, options, callback) {
    options || (options = {});
    query = deformatFields(query);

    let ids;

    _.extend(options, {
      only: ['id'], // XXX Assuming that in our case, all tables have id.
    });

    async.waterfall([
      function(callback) {
        const
          outValues = [];


        const subQuery = Statements.select(self, query, options, outValues);

        execQuery(subQuery, outValues, options, callback);
      },
      function(rows, callback) {
        ids = _.pluck(rows, 'id');

        const
          outValues = [];


        const destroyQuery = Statements.destroy(self, {
          'id.in': ids,
        }, outValues);

        execQuery(destroyQuery, outValues, callback);
      },
    ], function(err, result) {
      callback(err, result);

      if (!err) {
        _.each(ids, function(id) {
          gEvents.trigger('store:'+self.name+':destroy', {id: id});
        });
      }
    });
  }

  // $api
  function find(query, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    query || (query = {});
    query = deformatFields(query);
    options || (options = {});
    callback || (callback = function() {});

    _.defaults(options, {
      limit: DEFAULT_LIMIT,
      offset: 0,
      order: ['-ts'],
    });

    async.parallel({
      data: function(callback) {
        const
          outValues = [];


        const sql = Statements.select(self, query, options, outValues);

        execQuery(sql, outValues, options, callback);
      },
      total_count: function(callback) {
        const
          outValues = [];


        const countOptions = {count: 1};


        const sql = Statements.select(self, query, countOptions, outValues);

        execQuery(sql, outValues, countOptions, callback);
      },
    }, function(err, result) {
      if (err) {
        DBG && console.error('ERR:STORE:', err);
        callback(err);
      } else {
        result.data = _.map(result.data, formatFields);
        result.count = result.data.length;
        result.offset = options.offset;
        result.total_count = result.total_count.count;
        // DBG && console.log('STORE:FIND:result', result);

        callback(null, result);
      }
    });
  }

  function findOne(query, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    options || (options = {});
    callback || (callback = function() {});

    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    _.extend(options, {
      limit: 1,
    });

    const
      outValues = [];


    const sql = Statements.select(self, query, options, outValues);

    execQuery(sql, outValues, options, function(err, result) {
      callback(err, (result && result.length > 0) ? formatFields(result[0]) : null);
    });
  }

  function hasField(name) {
    return self.fieldNames.indexOf(name) >= 0;
  }

  async function update(query, doc, callback) {
    // console.log(self.name, '--UPDATE--', {...doc});

    const canSync = self.syncable && auth.isLoggedIn();
    // (self.name=='sieves') && console.trace();
    callback || (callback = function() {});

    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    // console.log('STORE: UPDATE:', self.name, query, doc);
    try {
      if (doc._state === -1) {
        // If state is default, only store locally, do nothing else
        delete doc._state;
      } else if (_.isUndefined(doc._state)) {
        doc._state = C.LOCAL_STATE_PUT;
      }
      // console.log(doc)
      const oldLocalRes = await find(query, {
        limit: 10000,
      });
      await updateLocalDocsAfterSync(doc, oldLocalRes);

      // Handle post case -> Call syncman post after delay
      // return doc when one is trying to patch one document
      callback(null, query.id ? {
        id: query.id,
        ts_mod: Date.now(),
        _count: oldLocalRes.count,
      } : oldLocalRes.count);
      canSync && debouncedSyncPost();
      oldLocalRes.data.forEach(function(row) {
        // console.log(_.extend(row, doc))
        gEvents.trigger('store:'+self.name+':update', _.extend(row, doc));
      });
    } catch (e) {
      console.error('Error updating store:', self.name, e);
      callback(e);
    }
  }

  async function updateLocalDocsAfterSync(doc, oldRes) {
    // if _state or ts_mod is set to -1; they should not be updated
    const setTsMod = doc.ts_mod !== -1;
    const tsMod = (new Date()).toISOString();
    const canSync = self.syncable && auth.isLoggedIn();
    for (const i in oldRes.data) {
      let methodName = 'PUT';
      const oldDoc = oldRes.data[i];
      let newDoc = {};
      try {
        // In sync, change only diff, and in case of put apply doc over oldDoc and put
        if (oldDoc._state == C.LOCAL_STATE_SYNCED) {
          for (const key in doc) {
            if (oldDoc[key] !== doc[key]) {
              newDoc[key] = doc[key];
            }
          }
        } else {
          newDoc = {...oldDoc, ...doc};
          if (oldDoc._state == C.LOCAL_STATE_POST && newDoc._state != C.LOCAL_STATE_SYNCED) {
            methodName = 'POST';
          }
        }

        delete newDoc._state;
        if (!setTsMod) {
          delete newDoc.ts_mod;
        }
        const isEmpty = _.isEmpty(newDoc);

        if (!isEmpty && setTsMod && _.isUndefined(newDoc.ts_mod)) {
          newDoc.ts_mod = tsMod;
        }

        if (doc._state == C.LOCAL_STATE_SYNCED) {
          newDoc._state = doc._state;
        } else if (canSync && !isEmpty
        // shouldn't if doc was synced from remote
        // doc._state must be used for this check
        // doc._state != C.LOCAL_STATE_SYNCED -- done in prev if check
        ) {
          const urlTpl = methodName=='POST' ? self.urls.root : self.urls.id;
          const url = Mustache.render(urlTpl, oldDoc);
          const response = await api(url, methodName, newDoc);
          _.extend(newDoc, response);
          newDoc._state = C.LOCAL_STATE_SYNCED;
        } else if (isEmpty) {
          // This is fine, we diff only when old doc is synced
          newDoc._state = C.LOCAL_STATE_SYNCED;
          // } else if(doc._state == -1) { -- it is deleted by caller
          // No need to update _state
        } else if (doc._state != void 0) { // synced is handled in 1st if block
          // Mark default dirty _state based on what was older _state
          newDoc._state = oldDoc._state == C.LOCAL_STATE_POST ? oldDoc._state : doc._state;
        }
      } catch (err) {
        console.error('syncAndUpdateLocal:', err);
        newDoc._state = doc._state != null ? doc._state :
          (oldDoc._state != null ? oldDoc._state : C.LOCAL_STATE_POST);
      }
      await updateLocal(oldDoc.id, newDoc);
    }
  }

  async function updateLocal(query, doc) {
    // console.log('updateLocal', self.name, id, doc)
    if (_.isString(query)) {
      query = {id: query};
    }
    const
      outValues = [];


    const sql = Statements.update(self, query, deformatFields(doc), outValues);
    return await execQuery(sql, outValues);
  }
}


window.MaintLog = new SQLStore({
  name: 'maint_logs',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'version', type: 'integer'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.ClientStore = new SQLStore({
  name: 'clients',
  urls: {
    root: '/clients',
    id: '/clients/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      // Comment out altered fields. Original name is preserved in new field
      // definition
      /* { name: 'id',           type: 'string', primaryKey: 1 }, */
      {name: 'user_id', type: 'string'},
      {name: 'type', type: 'integer'},
      {name: 'name', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'info', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [],
  }, {
    version: 4,
    fields: [
      // Altered field with oldName attribute. Keep altered fields as last
      // fields in the list.
      {name: 'id', type: 'string', oldName: 'id'},
    ],
  }, {
    version: 5,
    fields: [
      // Altered field with oldName attribute. Keep altered fields as last
      // fields in the list.
      {name: 'version', type: 'string'},
      {name: 'messages_state', type: 'json', default: '"{}"'},
      {name: 'is_worker', type: 'boolean', default: true}
    ]}
  ],
  // These are custom extensions to column defs
  unique: ['id', 'user_id'],
  extension: ', UNIQUE (id, user_id) ON CONFLICT REPLACE',
});

window.UserStore = new SQLStore({
  name: 'users',
  urls: {
    root: '/users',
    id: '/users',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'full_name', type: 'string'},
      {name: 'bio', type: 'string'},
      {name: 'email', type: 'string'},
      {name: 'website', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'locale', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'prefs', type: 'json'},
    ],
  }, {
    version: 4,
    fields: [
      {name: 'account_id', type: 'string'},
      {name: 'role', type: 'string'},
    ],
  }, {
    version: 5,
    fields: [
      {name: 'billing_address', type: 'json'},
    ],
  }],
});
window.ClientGroupStore = new SQLStore({
  name: 'users_clients_groups',
  urls: {
    root: '/clients-groups',
    // id: '/clients-groups/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'cgid', type: 'string'},
      {name: 'user_id', type: 'string'},
      {name: 'client_id', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
});
window.SieveStore = new SQLStore({
  name: 'sieves',
  urls: {
    root: '/sieves',
    id: '/sieves/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'rule_id', type: 'string'},
      {name: 'content_type', type: 'integer'},
      {name: 'config', type: 'string'},
      {name: 'schedule', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_READY},
      {name: 'text', type: 'string'},
      {name: 'tags', type: 'string'}, // de-normalized tag data
      // Timestamp when sievedata changed.
      {name: 'ts_data', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      // When it was last viewed by user
      {name: 'ts_view', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'client_id', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'err', type: 'string'},
    ],
  }, {
    version: 4,
    fields: [
      {name: 'session_id', type: 'string'},
      {name: 'proxy_id', type: 'string'},
      {name: 'meta', type: 'json'},
      {name: 'ext', type: 'json'},
    ],
  }, {
    version: 5,
    fields: [
      {name: 'macro_id', type: 'string'},
    ],
  }, {
    version: 6,
    fields: [
      {name: 'datasource_id', type: 'string'},
    ],
  }, {
    version: 7,
    fields: [
      {name: 'crawler_id', type: 'string'},
    ],
  }, {
    version: 8,
    fields: [
      {name: 'prefs', type: 'json'},
    ],
  },],
  defaults: function() {
    return {
      client_id: Prefs.get('client.id'),
      user_id: auth.getId(),
    };
  },
});

window.TagStore = new SQLStore({
  name: 'tags',
  urls: {
    root: '/tags',
    id: '/tags/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'user_id', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
      state: 0,
    };
  },
});

window.SieveDataStore = new SQLStore({
  name: 'sieve_data',
  urls: {
    root: '/sieves/-/data',
    id: '/sieves/{{sieve_id}}/data/{{id}}',
  },
  sync: {
    push: true,
    pull: false,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'data_type', type: 'integer'},
      {name: 'data', type: 'string'},
      {name: 'text', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }, {
    version: 3,
      fields: [
        { name: 'client_id', type: 'string' },
        { name: 'meta', type: 'json', default:'"{}"'},
        { name: 'triggered', type: 'boolean', default: false }
      ],
    }, {
    version: 4,
    fields: [
      {name: 'summary', type: 'json'},
    ],
    }, {
      version: 5,
      fields: [
        { name: 'text_hash', type: 'string' },
      ],
    }, {
      version: 6,
      fields: [
        { name: 'snapshot', type: 'string' },
      ],
    }],
  // Override meta.rules to meta.rule
  // https://github.com/distill-io/distill.io/issues/1493
  formatFields: function (doc) {
    if (!doc.meta) {
      return doc;
    }
    if (doc.meta?.rules) {
      doc.meta.rule = doc.meta.rules;
    }
    return doc;
  }
});

async function findOneByIdWithSync(query, options = {}) {
  // skip store fetch if force is set
  if (!options.force) {
    const data = await this.findOne(query, options);
    if (data) {
      return data;
    }
  }
  // re-fetch
  const { id, ...restQuery } = query;
  const data = await api(`${this.url.root}/${id}`, 'GET', restQuery);
  // console.log('Fetched data from remote ', newData);

  // does not throw if id not present in store
  await this.destroy({ id });

  // save data and return the created row
  const newRow = await this.create(data);
  // console.log('Saved to Store', newRow);
  return newRow;
}

window.WorkflowStore = new SQLStore({
  name: 'workflows',
  url: {
    root: '/pagedb/workflows',
    id: '/pagedb/workflows/{{id}}'
  },
  versions: [{
    version: 1,
    fields: [
      { name: 'id', type: 'string', primaryKey: 1 },
      { name: 'version', type: 'integer', default: 1 },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'state', type: 'integer' },
      { name: 'steps', type: 'json' },
      { name: 'tags', type: 'json' },
      { name: 'params_spec', type: 'json' },
      { name: 'schema', type: 'json' },
      { name: 'plugins', type: 'json' },
      { name: 'category', type: 'string' },
      { name: 'meta', type: 'json' },
      { name: 'ts', type: 'integer' },
      { name: '_ts_fetch', type: 'integer', default: `(strftime('%s', 'now') * 1000)` },
    ]
  }],
  findOneByIdWithSync
})

window.DatasourceStore = new SQLStore({
  name: 'datasources',
  url: {
    root: '/datasources',
    id: '/datasources/{{id}}'
  },
  versions: [{
    version: 1,
    fields: [
      { name: 'id', type: 'string', primaryKey: 1 },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'datasource_type', type: 'string' },
      { name: 'priority', type: 'integer' },
      { name: 'datasource_params', type: 'json' },
      { name: 'spec', type: 'json'},
      { name: 'state', type: 'integer' },
      { name: 'schema', type: 'json' },
      { name: 'min_plan_price', type: 'integer' },
      { name: 'example_data', type: 'json' },
      { name: 'example_uri', type: 'json' },
      { name: 'ts', type: 'integer' },
      { name: 'ts_mod', type: 'integer'}
    ]
  }],
  findOneByIdWithSync
})

window.SieveDataProxy = _.extend({}, SieveDataStore, {
  find: promisifyOrCallback(async function(query, options, callback) {
    options || (options = {})
    const sieveId = query.sieve_id;
    const offset = options.offset || 0;
    // If sieve_id
    // console.log('SieveDataProxy:', sieveId);
    if (sieveId && offset == 0) {
      const sieve = await SieveStore.findOne({ id: sieveId });

      // Find last sieve data for sieve_id
      const sieveData = await SieveDataStore.findOne({
        sieve_id: sieveId,
      }, {
        order: ['-ts'],
      });
      // console.log(sieve, sieveData);

      // Check if out of sync
      // If yes, sync sieve data for sieveId
      if ((!sieveData || (sieveData.ts !== sieve.ts_data)) && (auth.isLoggedIn())) {
        // console.log('Hitting get');
        try {
          await SyncMan.get(SieveDataStore, {
            query: {
              sieve_id: sieveId,
            },
          });
        } catch (e) {
          // Ignore network error
          if (sieve.client_id != SyncId.get()) {
            return callback(e);
          }
        }
      }
    }
    const allSieveData = await SieveDataStore.find({ sieve_id: sieveId, text_hash: null },
      {
        only: ['id', 'text', 'text_hash']
      });
    const data = allSieveData.data;

    for (const item of data) {
      if (!item.text_hash) {
        const textHash = await sha1Digest(item.text);
        await SieveDataStore.update(item.id, { text_hash: textHash });
      }
    }

    SieveDataStore.find(query, options, callback);
  }),
});

// SieveDataProxy = SieveDataStore;

window.ActionStore = new SQLStore({
  name: 'actions',
  urls: {
    root: '/sieves/-/actions',
    id: '/sieves/{{sieve_id}}/actions/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'type', type: 'integer'},
      {name: 'config', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'user_id', type: 'string'},
    ],
  }],
  defaults: function() {
    return {
      state: 0,
      user_id: auth.getId(),
    };
  },
});

window.RuleStore = new SQLStore({
  name: 'rules',
  urls: {
    root: '/rules',
    id: '/rules/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'config', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'version', type: 'string'},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
    };
  },
});

window.AttrStore = new SQLStore({
  name: 'attrs',
  urls: {
    root: '/users/attrs',
    id: '/users/attrs/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'value', type: 'string'},
      {name: 'state', type: 'integer'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
    };
  },
});

// Stores errors related to activities that should be reviewed manually.
window.ErrorStore = new SQLStore({
  name: 'errors',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      // Context name describes the context in which this error occurred.
      {name: 'context', type: 'string'},
      // Human readable error message (template?).
      {name: 'msg', type: 'string'},
      // Contextual data when this error happened.
      {name: 'data', type: 'string'},
      // Actual error message received.
      {name: 'err', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
});

window.WorkStore = new SQLStore({
  name: 'works',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'rel', type: 'string'},
      {name: 'key', type: 'string'},
      {name: 'err', type: 'string'},
      {name: 'data', type: 'string'},
      {name: 'duration', type: 'integer'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'snapshot_id', type: 'string'},
    ],
  }],
});

window.PopupMessageStore = new SQLStore({
  name: 'popup_messages',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'rel', type: 'string'},
      {name: 'key', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'title', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'msg', type: 'string'},
    ],
  }],
});

window.KVStore = new SQLStore({
  name: 'kv',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'value', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.SieveSnapshotStore = new SQLStore({
  name: 'sieve_snapshots',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'work_id', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'content', type: 'string'},
      {name: 'content_type', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.MacroStore = new SQLStore({
  name: 'macros',
  urls: {
    root: '/macros',
    id: '/macros/{{id}}',
  },
  sync: {
    push: false,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'spec', type: 'json'},
      {name: 'steps', type: 'json'},
      {name: 'state', type: 'integer'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'meta', type: 'json'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  },
  {
    version: 2,
    fields: [
      {name: 'version', type: 'integer', default: 2 }
    ]
  }],
});

window.REMOTE_LOCAL_NAME_MAP = {
  'clients': 'clients',
  'sieves': 'sieves',
  'sieve_actions': 'actions',
  'sieve_data': 'sieve_data',
  'sieve_rules': 'rules',
  'user_attrs': 'attrs',
  'tags': 'tags',
  'users': 'users',
  'users_clients_groups' : 'users_clients_groups',
  'macros' : 'macros'
};
;
/**
 * @param {SQLStore} store
 */
function initBackupForStore(store) {
  const onCreate = async (doc) => {
    try {
      await addEntityToBackup(store, doc);
    } catch (e) {
      console.error('cannot backup the doc', store.name, doc, e);
    }
  };
  const onDestroy = async (doc) => {
    try {
      await deleteEntityFromBackup(store, doc);
    } catch (e) {
      console.error('cannot delete the doc', store.name, doc, e);
    }
  };
  const onUpdate = async (doc) => {
    try {
      await updateEntityBackup(store, doc);
    } catch (e) {
      console.error('cannot update the doc', store.name, doc, e);
    }
  };

  // Add event listeners
  gEvents.on('store:' + store.name + ':create', onCreate);
  gEvents.on('store:' + store.name + ':destroy', onDestroy);
  gEvents.on('store:' + store.name + ':update', onUpdate);

  // Store references for later removal
  store.backUpListeners = {
    onCreate,
    onDestroy,
    onUpdate
  };
}

function removeBackupListenersForStore(store) {
  if (!store.backUpListeners) {
    return;
  }
  // Remove event listeners
  gEvents.off('store:' + store.name + ':create', store.backUpListeners.onCreate);
  gEvents.off('store:' + store.name + ':destroy', store.backUpListeners.onDestroy);
  gEvents.off('store:' + store.name + ':update', store.backUpListeners.onUpdate);

  // Clear local storage
  console.log('clearing storage for', store.name);
  chrome.storage.local.clear();
}

function storeBackupKeyName(store) {
  return store.name + '_backup';
}

/**
 * @param {string} key
 * @returns {Promise<any>}
 */
async function chromeStorageLocalGetAsync(key) {
  let result = await chrome.storage.local.get(key);
  return result[key]
}

/**
 * @param {Object} obj
 * @returns {Promise<void>}
 */
async function chromeStorageLocalSetAsync(obj) {
  await chrome.storage.local.set(obj);
}

/**
 * Add an entity to the localstorage.
 * If the localstorage is empty for this store then
 * - create an array
 * - add all the entities to the array
 * otherwise
 * - add the entity to the array
 *
 * If the entity is already present in the array
 * then call `updateEntityBackup`.
 *
 * @param {SQLStore} store
 * @param {Object} doc
 */
async function addEntityToBackup(store, doc) {
  const keyName = storeBackupKeyName(store);
  let storedRows = await chromeStorageLocalGetAsync(keyName);
  if (!storedRows) {
    storedRows = [];
  } else {
    storedRows = JSON.parse(storedRows);
  }
  if (storedRows.length === 0) {
    // only find the entities where state is not deleted
    let storeResult = await store.find({'state.in': [0, 40, 45]});
    const rows = storeResult.data;
    storedRows.push(...rows);
  } else {
    const index = storedRows.findIndex(row => row.id === doc.id);
    if (index !== -1) {
      storedRows[index] = doc;
    } else {
      storedRows.push(doc);
    }
  }
  await chromeStorageLocalSetAsync({[keyName]: JSON.stringify(storedRows)});
}


/**
 * Update an entity present in hte local storage.
 *
 * @param {SQLStore} store
 * @param {Object} doc
 */
async function updateEntityBackup(store, doc) {
  if (![0, 40, 45].includes(doc.state)) {
    return await deleteEntityFromBackup(store, doc);
  }
  const keyName = storeBackupKeyName(store);
  let storedRows = await chromeStorageLocalGetAsync(keyName);
  if (!storedRows) {
    return await addEntityToBackup(store, doc);
  }
  storedRows = JSON.parse(storedRows);
  let found = false;
  storedRows = storedRows.map(row => {
    if (row.id === doc.id) {
      found = true;
      return doc;
    }
    return row;
  });
  if (!found) {
    storedRows.push(doc);
  }
  await chromeStorageLocalSetAsync({[keyName]: JSON.stringify(storedRows)});
}

/**
 * Delete an entity from the localstorage.
 *
 * @param {SQLStore} store
 * @param {Object} doc
 */
async function deleteEntityFromBackup(store, doc) {
  const keyName = storeBackupKeyName(store);
  let storedRows = await chromeStorageLocalGetAsync(keyName);
  if (!storedRows) {
    return;
  }
  storedRows = JSON.parse(storedRows);
  storedRows = storedRows.filter(row => row.id !== doc.id);
  await chromeStorageLocalSetAsync({[keyName]: JSON.stringify(storedRows)});
}

/**
 * @param {SQLStore} store
 */
async function restoreBackupForStore(store) {
  const keyName = storeBackupKeyName(store);
  let storedRows = await chromeStorageLocalGetAsync(keyName);
  if (!storedRows) {
    return;
  }
  storedRows = JSON.parse(storedRows);
  for (let i = 0; i < storedRows.length; i++) {
    const doc = storedRows[i];
    try {
      await store.create(doc);
    } catch (e) {
      console.error('cannot restore the doc', store.name, doc, e);
    }
  }
}
;
const TIMEOUT_LOAD = 30000;

/**
 * List of public APIs and events.
 *
 * APIs:
 *  - id
 *  - ports
 *  - uri
 *  - destroy
 *  - getPortIndex
 *  - load
 *  - request
 *
 * Events:
 *  - reset
 *  - port:init
 *  - port:<port_events>
 */
class WebpageLoader extends BBEvent {

  static ID = 1;
  static INSTANCES = [];

  static get(id) {
    return _.detect(WebpageLoader.INSTANCES, function (loader) {
      return loader.id == id;
    });
  }

  constructor(options) {
    super();
    this.options = options;
    this.pageMods = options.pageMods || [];
    this.ports = [];
    this.id = WebpageLoader.ID++;
    this.rootPort = null;
    this.uri = null;
    this.pageFuncs = options.pageFuncs ?? []
   // if closeTabOnDestroy not passed, close only if tab has been created by us i.e. tabId is not present on info
    this.options.closeTabOnDestroy = this.options.closeTabOnDestroy ?? (options.info.tabId ? false : true);

    WebpageLoader.INSTANCES.push(this);
  }

  addPort(chromePort) {
    // const attrs = chromePort.attrs;
    // attrs.root && console.log('EXTN:loaderAttachPort:', attrs);
    let port = this.createPort(chromePort);

    // console.log("addPort: ", port);
    port.on('destroy', e => this.onPortDestroy(port), this);
    port.on("init:error", err => {
      port.destroy();
    })

    this.addPortEvents(port);
    // Add port to the list of ports
    if (port.isRoot()) { // Is a root port.
      // console.log('LOADER: root port set.', port.uri, this.id);
      this.rootPort = port;
      // XXX A hack to set root port with index 1. This can lead to errors if
      // clients are using ports and index before root port is added to loader.
      this.ports.unshift(port);
      this.uri = port.uri;
      this.trigger('reset');
    } else {
      this.ports.push(port);
    }
    return port;
  }

  createPort(chromePort) {
    return new LoaderPort(chromePort, this, {
      pageMods: this.pageMods,
      pageFuncs: this.pageFuncs
    });
  }

  addPortEvents(aPort) {
    aPort.on('all', (eventName, event) => {
      // console.log('on port event:', eventName, event);
      if (aPort == this.rootPort) {
        // sent root events in a special name to make listening easy
        const newType = 'port:root:' + eventName;
        this.trigger(newType, _.extend({}, event, {
          portId: aPort.id,
          type: newType,
        }), aPort);
      }
      const newType = 'port:' + eventName;
      this.trigger(newType, _.extend({}, event, {
        portId: aPort.id,
        type: newType,
      }), aPort);
    });
  }

  // Sub-classes create frames to load documents, either in an iframe or in a
  // tab.
  async createView(callback) {
    throw new Error('Not implemented');
  }

  async destroy() {
    // console.log("destroy: ");

    if (this.destroyed) return; // nothing to do if already destroyed.
    this.destroyed = true;

    [...this.ports].forEach(port => port.destroy());

    WebpageLoader.INSTANCES.splice(WebpageLoader.INSTANCES.indexOf(this), 1);
    this.trigger('destroy');

    this.off();
    this.stopListening();

    this.rootPort = null;

    // XXX await?
    this.destroy2 && await this.destroy2();
  }

  findPorts(portSelector) {
    let filter = function () {
      return false;
    };

    if (portSelector == '<root>') {
      return [this.rootPort];
    } else if (_.isNumber(portSelector)) {
      filter = function (port, index) {
        return index === portSelector;
      };
    } else if (portSelector.href) {
      if (typeof portSelector.href == 'object') {
        const regex = new RegExp(portSelector.href.pattern,
          portSelector.href.flags || 'i');
        filter = function (port) {
          return regex.test(port.data.href);
        };
      } else { // a string
        filter = function (port) {
          return port.data.href == portSelector.href;
        };
      }
    }
    // XXX support more ways of finding ports
    return _.filter(this.ports, filter);
  }

  getPortIndex(portId) {
    for (let i = 0; i < this.ports.length; i += 1) {
      if (this.ports[i].id == portId) {
        return i;
      }
    }
    return -1;
  }

  handleRequest() {
    throw new Error('not supported');
  }

  load(url, options = {}) {
    // TODO support frameIndices as an option so that load waits for all
    // frames to load

    return new Promise((resolve, reject) => {
      let timeoutId;
      let timeout = options.timeout || TIMEOUT_LOAD;

      let off = () => {
        this.off('port:root:init', onRootPortInit);
        this.off('port:root:init:error', onRootPortInitError);
        clearTimeout(timeoutId);
      }

      const onRootPortInit = (event, aPort) => {
        off();
        resolve();
      }

      const onRootPortInitError = (event, aPort) => {
        off();
        reject(new Err.PAGE_LOAD({ message: event.message }));
      }

      timeoutId = setTimeout(() => {
        off();
        reject(new Err.TIMEOUT({ type: 'Page load', time: timeout / 1000 }));
      }, timeout);

      this.on('port:root:init', onRootPortInit);
      this.on('port:root:init:error', onRootPortInitError);

      this.setURL(url);
    });
  }

  onPortDestroy(aPort) {
    // console.log('LOADER:onPortDestroy:', aPort);

    if (aPort == this.rootPort) {
      this.rootPort = null;
      this.trigger('port:root:destroy', aPort, this);
    }
    const index = this.ports.indexOf(aPort);
    this.ports.splice(index, 1);
    this.trigger('port:destroy', aPort, this);
  }

  async request(portSelector, { path, data }) {
    // console.log('EXTN:loader:request:', portSelector, {path, data});
    const matchingPorts = this.findPorts(portSelector);

    if (matchingPorts.length == 0) {
      throw new Err.NOT_FOUND({
        type: 'port',
        param: 'selector',
        id: JSON.stringify(portSelector),
        data: portSelector,
        loader: this.id,
      });
    }
    return await matchingPorts[0].sendRequest(path, data);
  }

  setURL(url) {
    throw new Error('setURL not implemented by WebpageLoader subclass:',
      this.constructor);
  }

}


class TabLoader extends WebpageLoader {

  tabId = null;

  async createView() {
    let info = this.options.info = {
      pinned: true,
      active: false,
      ...this.options.info
    };
    let tab;

    if (info.tabId) {
      this.tabId = info.tabId;
      tab = await this._attachToTab(info.tabId);
    } else {
      tab = await this._createTab(info);
      this.tabId = tab.id;
    }
    if (isElectron()) {
      this.contents = chrome.tabs.getViewFromTab(tab).webContents;
    }
  }

  async _attachToTab(id) {
    let tab = await chrome.tabs.get(id)
    if (!tab) {
      return reject(
        new Err.NOT_FOUND({ type: 'tab', id })
      );
    }
    const tabURL = tab.url || tab.pendingUrl;
    // If the tab is a chrome:// or edge:// page, do not attach loader.
    // and trigger a fake reset event to continue createLoader flow
    if (tabURL.startsWith('chrome://') || tabURL.startsWith('edge://')) {
      setTimeout(() => {
        this.trigger('reset');
      }, 500);
      return tab;
    }
    // If the loader is being attached to an existing tab, load port script.
    // Don't await so that createView returns asap
    // Otherwise loaders events might be missed by callers
    chrome.scripting.executeScript({
      injectImmediately: true,
      target: {
        tabId: tab.id,
        allFrames: true
      },
      func: 'setGlobals',
      args: [{
        DISTILL_LOCALE: Prefs.get('locale') ?? 'en-US',
        URL_BASE: chrome.runtime.getURL(''),
        CAN_EVAL_JS: isElectron(),
      }],
    });

    chrome.scripting.executeScript({
      injectImmediately: true,
      target: {
        tabId: tab.id,
        allFrames: true
      },
      files: ['./content/port-loader.js'],
    });
    return tab;
  }

  async _createTab(info) {
    // create tab in current window
    info = _.pick(info, 'active', 'index', 'pinned', 'url', 'windowOptions');
    info.url || (info.url = CFG.URL.BLANK);

    let tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (info.after == 'activeTab') {
      // XXX chrome recently started sending no active tab when active is
      // being changed or being dragged
      const activeTab = tabs.length > 0 ? tabs[0] : -1;
      info.index = activeTab.index + 1;
    }

    try {
      return await chrome.tabs.create(info);
    } catch(e) {
      // throw error with known error code
      throw new Err.EBROWSER({
        message: e.message
      })
    }
  }

  async destroy2() {
    // Remove tab if we created it. do not remove if we didnt create it.
    if (this.options.closeTabOnDestroy && this.tabId) {
      try {
        const id = this.tabId;
        await chrome.tabs.remove(id);
        setTimeout(async () => {
          try {
            let tab = await chrome.tabs.get(id);
            if (tab) {
              await chrome.tabs.update(id, { pinned: false });
              await chrome.tabs.remove(id);
            }
          } catch (e) {
            // DEV && console.error('Error removing tab', e);
          }
        }, 500)
        removePinnedURL(this._tabURL);
      } catch (e) {
        // DEV && console.error('Error removing tab', e);
      }
    } else {
      // console.log('tabId not set - not removed');
    }
  }

  setURL(url) {
    // FIXME what if the page was redirected to a different URL?
    this._tabURL = url;
    chrome.tabs.update(this.tabId, {
      url,
    });

    // Store tab's URL into a persistent storage in order to clean that up
    if (this.options.info.pinned) {
      savePinnedURL(url);
    }
  }
}

class WindowLoader extends TabLoader {

  async createView() {
    let info = _.pick(this.options.info, 'url', 'tabId', 'left', 'top',
      'width', 'height', 'focused', 'type', 'state');

    info = _.defaults(info, {
      url: CFG.URL.BLANK,
    });

    let window = await chrome.windows.create(info);
    this.tabId = window.tabs[0].id;
  }

  async destroy2() {
    // Remove tab if we created it. do not remove if we didnt create it.
    if (!this.options.tabId && this.tabId) {
      try {
        const id = this.tabId;
        await chrome.tabs.remove(id);
        setTimeout(async () => {
          try {
            let tab = await chrome.tabs.get(id);
            if (tab) {
              await chrome.tabs.update(id, { pinned: false });
              await chrome.tabs.remove(id);
            }
          } catch (e) {
            // DEV && console.error('Error removing tab', e);
          }
        }, 200);
      } catch (e) {/* ignore, tab removed*/ }
      removePinnedURL(this._tabURL);
    }
  }

}

class StickyWindowLoader extends TabLoader {

  static STICKY_WINDOW = null;

  async createView() {
    let info = _.pick(this.options.info, 'url', 'tabId', 'left', 'top',
      'width', 'height', 'focused', 'type', 'state');

    info = _.defaults(info, {
      url: Session.stickyWindowURL,
      state: 'minimized',
    });

    const tabInfo = this.options.info;
    const session = Session.getInstance();

    this.options.tabInfo = _.defaults(tabInfo, {
      pinned: true,
      active: false,
    });

    if (StickyWindowLoader.STICKY_WINDOW) {
      session.trackStickyWindow(StickyWindowLoader.STICKY_WINDOW);
    } else {
      let _window = await chrome.windows.create(info);
      // XXX There is a race condition where we can create duplicate sticky
      // windows. We should only create one at a time and second call should
      // wait for the first call to complete.
      // For now, it is a quick and dirty fix.
      if (StickyWindowLoader.STICKY_WINDOW) {
        // remove this newly created window, we already have one to use
        await chrome.windows.remove(_window.id);
      } else {
        StickyWindowLoader.STICKY_WINDOW = _window.id;
        session.trackStickyWindow(StickyWindowLoader.STICKY_WINDOW);
        _window.distill = true;
        session.addWindow(_window);
      }
    }

    tabInfo.windowId = StickyWindowLoader.STICKY_WINDOW;
    const tab = await chrome.tabs.create(tabInfo);
    this.tabId = tab.id;
    tab.distill = true;
    session.addTab(tab);
  }
}

function savePinnedURL(url) {
  const urls = Prefs.get('tabs.pinned.urls', []);
  if (urls.indexOf(url) < 0) {
    urls.push(url);
  }
  Prefs.set('tabs.pinned.urls', urls);
}

function removePinnedURL(url) {
  const urls = Prefs.get('tabs.pinned.urls', []);
  const index = urls.indexOf(url);

  if (index >= 0) {
    urls.splice(index, 1);
  }
  Prefs.set('tabs.pinned.urls', urls);
}

// FIXME unused?
function removePinnedTabs(url) {
  const urls = Prefs.get('tabs.pinned.urls', []);
  _.each(urls, function (url) {
    chrome.tabs.query({
      pinned: true,
      url, // FIXME Its a URL pattern
    }, function (tabs) {
      if (tabs && tabs.length > 0) {
        chrome.tabs.remove(_.pluck(tabs, 'id'));
      }
    });
  });
  Prefs.set('tabs.pinned.urls', []);
}

/**
 * @returns {WebpageLoader}
 */
async function createLoader({ type, dynamic, ...options }) {
  let loader;
  if (type === 'bg' || dynamic === false) {
    loader = new StaticLoader(options);
  } else if (type === 'tab') {
    loader = new TabLoader(options);
  } else if (type === 'window') {
    loader = new WindowLoader(options);
  } else if (type === 'sticky_window') {
    loader = new StickyWindowLoader(options);
  } else if (type === 'offscreen_window') {
    loader = new OffscreenWindowLoader(options);
  } else {
    throw new Err.TYPE_UNKNOWN({
      type: 'Page loader',
      value: type
    });
  }

  await loader.createView();
  return loader;
}

window.createLoader = createLoader;

async function loaderAttachPort(port) {
  return new Promise((resolve, reject) => {
    const tab = port.sender.tab;
    const loader = _.findWhere(WebpageLoader.INSTANCES, { tabId: tab.id });
    loader && loader.addPort(port);
    resolve(!!loader);
  })
}

chrome.tabs.onReplaced.addListener(function (added, removed) {
  // console.log('EXTN: tabs.onReplaced:', added, removed);
  _.each(WebpageLoader.INSTANCES, function (loader) {
    if (loader.tabId === removed) {
      loader.tabId = added;
    }
  });
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  // console.log('EXTN: tabs.onRemoved:', tabId, removeInfo);

  const loaders = _.where(WebpageLoader.INSTANCES, { tabId: tabId });
  loaders.forEach(function (loader) {
    loader.destroy();
  });
});

chrome.windows.onRemoved.addListener(async function (windowId) {
  if (windowId == StickyWindowLoader.STICKY_WINDOW) {
    delete StickyWindowLoader.STICKY_WINDOW;
  }
  let windows = await chrome.windows.getAll({});
  // windows can sometimes be undefined - bug?
  windows || (windows = []);
  const ids = windows.map(item => item.id);
  if (ids.length == 1 && ids[0] == StickyWindowLoader.STICKY_WINDOW) {
    // Get tabs for distill window
    const session = Session.getInstance();
    // Returns emtpy array if no tabs found
    const tabs = await Session.fetchTabs(StickyWindowLoader.STICKY_WINDOW);
    for (const tab of tabs) {
      if (tab.url != Session.stickyWindowURL) {
        try {
          await chrome.tabs.remove(tab.id);
        } catch (err) {
          console.error('Error removing tab', err);
        }
      }
    }
    await chrome.windows.remove(StickyWindowLoader.STICKY_WINDOW);
  }
});

gEvents.on('destroy:sticky_window', async function () {
  try {
    if (StickyWindowLoader.STICKY_WINDOW) {
      await chrome.windows.remove(StickyWindowLoader.STICKY_WINDOW);
      delete StickyWindowLoader.STICKY_WINDOW;
    }
  } catch (e) {
    // console.error('Error removing window', e);
  }
});

gEvents.on('init', async () => {
  if (CFG.CLIENT.TYPE == C.CLIENT_FFWX) {
    Session.stickyWindowURL = CFG.URL.STICKY;
  } else {
    const responseText = await fetchLocalFileText(CFG.URL.STICKY);
    Session.stickyWindowURL = 'data:text/html,' + responseText.replace(/\n/g, '');
  }
  Session.prefs = new SimpleStore('session_prefs');
  Session.prefs.__init__(() => {
    try {
      Session.restoreTabs();
    } catch (err) {
      // console.error('Error restoring session prefs', err);
    }
  });
});

Prefs.on('change:x-frame-load-in', (value, oldValue, key) => {
  if (oldValue == 'sticky_window' && value != 'sticky_window') {
    Session.destroy();
  }
});

gEvents.on('beforereload', async () => {
  try {
    if (StickyWindowLoader.STICKY_WINDOW) {
      await chrome.windows.remove(StickyWindowLoader.STICKY_WINDOW);
    }
  } catch (e) {
    // console.error('Error removing window', e);
  }
});
;
// 1. Load URL content
// 2. Parse into DOM
// 3. Sanitize it
// 4. Load into iframe
// 5. Load content scripts
// 6. Create port
// 7. And start operations
class StaticContent extends BBEvent {
  height = 800;
  width = 1100;

  constructor({pageMods}) {
    super();
    this.pageMods = pageMods;
    this.iframe = this.createIFrame();
    this.doc = this.iframe.contentDocument;
    this.win = this.iframe.contentWindow;

    this.loading = {};

    this.destroy = this.destroy.bind(this);
    this.loadScript = this.loadScript.bind(this);

    this.win.loadScript = this.loadScript;
    this.win.sendMsgFromContentToPort = (msg) => this.trigger('message', msg);
  }

  createIFrame() {
    const iframe = document.createElement('iframe');
    iframe.src = 'about:blank';
    iframe.width = this.width;
    iframe.height = this.height;
    document.body.appendChild(iframe);
    return iframe;
  }

  async init() {
    let base = chrome.runtime.getURL('');
    // CONTENT_SCRIPTS is defined in port.js
    for (let script of CONTENT_SCRIPTS) {
      await this.loadScript(`${base}${script}`);
    }
  }

  destroy() {
    this.iframe.remove();
    this.win = this.doc = this.iframe = null;
  }

  async load(url) {
    this.url = url;
    let html;
    try {
      let res = await this.fetch(url);
      html = await this.parseOrFetchWithCharset(res, url);
    } catch(e) {
      // not logging fetch errors - they are beyond our control and can be many
      if(e.response != null) {  // http request error
        html = e.response ? e.response : e.status;
      } else {
        html = `<b style="color:#F00">Failed to download page: ${e.message}<b>`;
      }
    }

    let win = this.iframe.contentWindow;
    let doc = win.document;
    win.URL_BASE = chrome.runtime.getURL('');
    await this.setHTML(html);
    if(doc.querySelector('base') == null) {
      let base = doc.createElement('base');
      base.href = url;
      win.document.head.appendChild(base);
    }
  }

  loadScript(path) {
    return this.loading[path] || (this.loading[path] = new Promise(resolve => {
      // console.log('loadScript', path);
      let doc = this.iframe.contentDocument;
      const el = doc.createElement('script');
      el.src = path;
      doc.head.appendChild(el);
      el.addEventListener('load', resolve);
      setTimeout(() => el.removeEventListener('load', resolve), 10000);
    }));
  }

  postMessage(msg) {
    // defined by content script
    this.win.onMsgFromPortToContent(msg);
  }

  async parseOrFetchWithCharset(html, url) {
    // http://www.cpta.com.cn/GB/index.html
    // <meta http-equiv="content-type" content="text/html;charset=GB2312"/>
    let matches = html.match(/<meta.*?charset=['"](.*?)['"].*>/im);
    if(matches) {
      let charset = matches[1];
      if(charset && charset.toLowerCase() != 'utf-8') {
        // we refetch to help browser parse response correctly
        try {
          return await this.fetchWithCharset(url, charset);
        } catch(e) {
          // console.error('Error fetching with mime type override', e);
        }
      }
    }
    return html;
  }

  fetch(url) {
    return new Promise((resolve, reject) => {
      HTTP.get({ url, }, (err, xhrObj) => {
        err ? reject(err) : resolve(xhrObj.response);
      })
    });
  }

  fetchWithCharset(url, charset) {
    return new Promise((resolve, reject) => {
      HTTP.get({
        url,
        overrideMimeType: `text/html;charset=${charset}`,
      }, (err, xhrObj) => {
        err ? reject(err) : resolve(xhrObj.response);
      })
    });
  }

  async setHTML(html) {
    this.iframe.contentDocument.documentElement.innerHTML = await DOMUtils.Feed.sanitize(html);
  }

}

// Loads content locally
class StaticLoader extends WebpageLoader {

  createPort() {
    return new StaticLocaderPort(this, {
      content: this.content,
      uri: this.url,
    });
  }

  async createView() {
    this.content = new StaticContent({
      pageMods: this.pageMods,
    });
  }

  async destroy2() {
    this.content.destroy();
  }

  async load(url) {
    await this.content.load(url);
    this.addPort(); // calls createPort (by super)
    await this.content.init();
  }
};
class Session {

  constructor() {
    if(Session.instance) {
      throw new Error('Session is singleton.');
    }
    this.windows = {};
    this.tabs = {};
    this.listeners = {chrome: [], intervals: []};
    this.eventLog = Session.prefs.get('eventLog', []);
    this.restored = false;
    this.stickyWindowActivity = null;
    Session.instance = this;
    this.startListeners();
    this.saveCurrentState();
    this.trackStickyWindow();
  }

  trackStickyWindow() {
    let checkInterval = setInterval(() => {
      if(this.stickyWindowActivity) {
        let timeElapsed = Date.now() - this.stickyWindowActivity;
        let threshold = parseInt(Prefs.get('sticky-window-timeout'))*60*1000;
        if(timeElapsed > threshold) {
          clearInterval(checkInterval);
          Session.destroy();
          gEvents.trigger('destroy:sticky_window');
        }
      }
    }, 500);
  }

  save() {
    Session.prefs.set('windows', this.windows);
    Session.prefs.set('tabs', this.tabs);
    Session.prefs.set('eventLog', this.eventLog);
    Session.prefs.save();
  }

  deletePrefs() {
    Session.prefs.del('windows');
    Session.prefs.del('tabs');
    Session.prefs.del('eventLog');
  }

  async saveCurrentState(){
    // Save all tabs and windows
    let _windows = await Session.getAllWindows();
    _windows.forEach(async(_win) => {
      this.windows[_win.id] = _win;

      // tabs
      let tabs = await Session.fetchTabs(_win.id);
      tabs.forEach((tab) => {
        this.tabs[tab.id] = tab;
      });
    });
    this.save();
  }

  log(s) {
    var d = new Date();
    var n = d.toLocaleTimeString();
    this.eventLog.push(s + ` at ${n}`);
    this.save();
  }

  addWindow(newWindow) {
    newWindow.distill = newWindow.distill || false;
    newWindow.createdAt = newWindow.createdAt || Date.now();
    this.windows[newWindow.id] = newWindow;
    this.save();
  }

  addTab(newTab) {
    newTab.createdAt = newTab.createdAt || Date.now();
    if(newTab.distill) {
      this.stickyWindowActivity = Date.now();
    }
    this.tabs[newTab.id] = _.defaults(newTab, this.tabs[newTab.id]);
    this.save();
  }

  nonDistillWindowCount() {
    let windowProperties = Object.values(this.windows);
    // Exclude incognito windows from count
    let distillWindows = _.where(windowProperties, {distill: true, incognito: false});
    return this.windows.length - distillWindows.length;
  }

  // Defer deletion by a fixed time, so that last windows tabs aren't deleted
  // Drawback: If user quickly closes tabs within the given time interval, this won't work
  removeTabFromSession(id) {
    if(this.tabs[id].distill) {
      delete this.tabs[id];
      this.save();
    } else {
      setTimeout(() => {
        delete this.tabs[id];
        this.save();
      }, 2000);
    }
  }

  removeWindow(id) {
    this.windows[id].closedAt = Date.now();
    if(this.windows[id].distill || this.windows[id].incognito) {
      delete this.windows[id];
      //this.log(`Window ${id} was removed from list.`);
      this.save();
    } else if (!this.windows[id].distill && this.nonDistillWindowCount() > 1) {
      delete this.windows[id];
      //this.log(`Window ${id} was removed from list.`);
      this.save();
    }

  }

  static async restoreTabs() {
    let prefs = Session.prefs;
    let windows = JSON.parse(JSON.stringify(prefs.get('windows', {})));
    let lastTabs = JSON.parse(JSON.stringify(prefs.get('tabs', {})));
    let restoreEnabled = await Session.checkWhetherRestoreIsEnabled(windows);
    if(!restoreEnabled){
      return;
    }
    Session.prefs.set('windows', {});
    Session.prefs.set('tabs', {});

    let _window = await Session.fetchCurrentWindow();

    windows = Session.removeDistillWindows(windows, lastTabs);

    // Open a blank tab and close all current tabs
    // Restore tabs from last window
    let blankTab = await chrome.tabs.create({windowId: _window.id});
    let tabs = await Session.getCurrentWindowTabs();
    tabs.forEach(async(tab) => {
      if(blankTab.id != tab.id) {
        await chrome.tabs.remove(tab.id);
      }
    });
    let tabProperties = Object.values(lastTabs);
    let tabCount = tabProperties.length;
    let nTabsCreated = 0;
    let lastWindow = Session.getLastWindow(windows);
    // Update current window state
    if(lastWindow.state) {
      if(lastWindow.state == 'normal') {
        let props = _.pick(lastWindow, 'state', 'width', 'height', 'top', 'left');
        chrome.windows.update(_window.id, props);
      } else {
        chrome.windows.update(_window.id, {state: lastWindow.state});
      }
    }
    tabProperties.forEach((tab) => {
      let incognito = windows[tab.windowId] && windows[tab.windowId].incognito;
      if(tab.url &&
        !incognito &&
        tab.windowId == lastWindow.id &&
        !tab.distill &&
        !(tab.url == Session.stickyWindowURL) &&
        (tab.url.indexOf('chrome://newtab')==-1)
      ){
        chrome.tabs.create({url: tab.url});
        nTabsCreated += 1;
      }
    });
    if(nTabsCreated > 0) {
      await chrome.tabs.remove(blankTab.id);
    }
  }

  static getLastWindow(windows) {
    let lastWindow = null;
    Object.values(windows).forEach((_window) => {
      // if(lastWindow && !_window.incognito && _window.closedAt && lastWindow.closedAt > _window.closedAt) {
      if(!_window.incognito) {
        lastWindow = _window;
      }
      // } else if(_window && _window.closedAt) {
      //   lastWindow = _window;
      // }
    });
    return lastWindow;
  }

  startListeners() {
    this.startTabOpenListener();
    this.startTabCloseListener();
    this.startTabUpdateListener();
    this.startTabAttachmentListener();
    this.startWindowOpenListener();
    this.startWindowCloseListener();
    this.startSizeListeners();
  }

  startSizeListeners() {
    let listener = setInterval(async() => {
      let _windows = await Session.getAllWindows();
      _windows.forEach((_window) => {
        let id = _window.id;
        this.windows[id].state = _window.state;
        if(this.windows[id].state=='normal') {
          this.windows[id].top = _window.top;
          this.windows[id].left = _window.left;
          this.windows[id].height = _window.height;
          this.windows[id].width = _window.width;
        }
      });
    }, 1000);
    this.listeners.intervals.push(listener);
  }

  startTabOpenListener() {
    this.sessionTabOpenListener = (tab) => {
      this.addTab(tab);
      //this.log(`Tab ${tab.id} (windowId: ${tab.windowId}) created with url ${tab.url}`);
    }
    let listener = chrome.tabs.onCreated.addListener(this.sessionTabOpenListener);
    let evt = chrome.tabs.onCreated;
    let fnc = this.sessionTabOpenListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startTabUpdateListener() {
    this.sessionTabUpdateListener = (tabId, changeInfo, tab) => {
      this.addTab(tab);
      //this.log(`Tab ${tab.id} (windowId: ${tab.windowId}) updated with url ${tab.url}.`);
    }
    let listener = chrome.tabs.onUpdated.addListener(this.sessionTabUpdateListener);
    let evt = chrome.tabs.onUpdated;
    let fnc = this.sessionTabUpdateListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startTabCloseListener() {
    this.sessionTabCloseListener = (id, info) => {
      //let tab = this.tabs[id];
      this.removeTabFromSession(id);
      //this.log(`Tab ${tab.id} (windowId: ${tab.windowId}) with url ${tab.url} closed`);
    }
    let listener = chrome.tabs.onRemoved.addListener(this.sessionTabCloseListener);
    let evt = chrome.tabs.onRemoved;
    let fnc = this.sessionTabCloseListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startTabAttachmentListener() {
    this.sessionTabAttachmentListener = (id, info) => {
      this.tabs[id].windowId = info.attachInfo.newWindowId;
      this.save();
    }
    let listener = chrome.tabs.onAttached.addListener(this.sessionTabAttachmentListener);
    let evt = chrome.tabs.onAttached;
    let fnc = this.sessionTabAttachmentListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startWindowOpenListener() {
    this.sessionWindowOpenListener = (_window) => {
      this.addWindow(_window);
      //this.log(`Window id ${_window.id} opened`);
    }
    let listener = chrome.windows.onCreated.addListener(this.sessionWindowOpenListener);
    let evt = chrome.windows.onCreated;
    let fnc = this.sessionWindowOpenListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startWindowCloseListener() {
    this.sessionWindowCloseListener = (id) => {
      this.removeWindow(id);
      //this.log(`Window id ${id} closed`);
    }
    let listener = chrome.windows.onRemoved.addListener(this.sessionWindowCloseListener);
    let evt = chrome.windows.onRemoved;
    let fnc = this.sessionWindowCloseListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  destroyListeners() {
    this.listeners.intervals.forEach((listener) => {
      clearInterval(listener);
    });
    this.listeners.chrome.forEach((listenerItem) => {
      let {listener, evt, fnc} = listenerItem;
      evt.removeListener(fnc);
    });
  }

  static windowContainsUserTab(id, tabs) {
    Object.values(tabs).forEach((tab) => {
      if(!tab.distill && tab.windowId == id) {
        return true;
      }
    });
    return false;
  }

}

Session.removeDistillWindows = (windows, tabs) => {
  Object.values(windows).forEach((_window) => {
    if(!Session.windowContainsUserTab(_window.id, tabs) && _window.distill) {
      delete windows[_window.id];
    }
  });
  return windows;
}

Session.checkWhetherRestoreIsEnabled = async(prevWindows) => {
  // If default distill tab is opened then restore is enabled
  let tabs = await Session.getCurrentWindowTabs();
  let windows = await Session.getAllWindows();
  if(windows.length > 1){
    Session.shutdownDistillWindows(prevWindows);
  }
  let enabled = false;
  tabs.forEach((tab) => {
    if(tab.url == Session.stickyWindowURL) {
      enabled = true;
    }
  });
  return enabled && (windows.length == 1) ;
}

Session.fetchTabs = async(windowId) => {
  try {
    return await chrome.tabs.query({windowId});
  } catch (err) {
    // console.error("Error:fetchTabs", err);
    return [];
  }
}

Session.fetchCurrentWindow = async() => {
  // windows.getCurrent can throw if no windows are active
  // eg: Chrome is docked in MacOS
  try {
    return await chrome.windows.getCurrent({});
  } catch(err) {
    // console.error("Error:fetchCurrentWindow", err);
    return null;
  }
}

Session.getCurrentWindowTabs = async() => {
  try {
    let _window = await Session.fetchCurrentWindow();
    return _window ? await Session.fetchTabs(_window.id) : [];
  } catch(err) {
    // console.error("Error:getCurrentWindowTabs", err);
    return [];
  }
}

Session.getAllWindows = async() => {
  try {
    return await chrome.windows.getAll({});
  } catch (err) {
    // console.error("Error:getAllWindows", err);
    return [];
  }
}

Session.getInstance = () => {
  return Session.instance || (Session.instance = new Session());
}

Session.shutdownDistillWindows = async(prevWindows) => {
  let windows = await Session.getAllWindows();
  let _tabs = Session.prefs.get('tabs', {});
  //let protocol = Session.stickyWindowURL.
  let params = {};
  if(CFG.CLIENT.TYPE == C.CLIENT_FFWX) {
    params.url = Session.stickyWindowURL;
  } else {
    params.url = 'data:*';
  }
  let tabs = await chrome.tabs.query(params);
  if(tabs.length > 0) {
    tabs.forEach(async (tab) => {
      if(tab.url == Session.stickyWindowURL) {
        await chrome.windows.remove(tab.windowId);
      }
    });
  }
}

Session.destroy = () => {
  let instance = Session.getInstance();
  instance.destroyListeners();
  instance.deletePrefs();
  instance = null;
  Session.instance = null;
}
;
// TODO send result using an event?


/**
 *  loader -> tab, port -> frame
 *  ## Init Flow:
 *  - loadSelectorFrame() attaches an iframe which contains the selector ui on the tab
 *  (Iframe UI svelte entrypoint: static/src/AppHTMLSelector.svelte)
 *  - iframe context has access to chrome apis, AppHTMLSelector uses chrome.runtime.connect to connect to the backgound
 *  - bg.js(BG) has added a listener for the connect event and  based on tab id which is stored in the event object it links port back to the appropriate VisualSelector Object (all the VisualSelectors are stored in VisualSelector.ALL and have a loader i.e. Tab)
 *  - VisualSelector(BG) sends an `init` event to AppHTMLSelector with the initial state
 *  - After init, UI has to send `subscribe` event which indicates that it is ready to listen to events 
 *
 * ## Save Flow
 * - UI sends `save` event along with the data to be saved to BG
 * - In BG, port's `save` event handler is triggered and visual selector's `onSave()` method handles the event
 * - Eventually `bg.js -> saveSieve` is called which creates a new sieve and opens the sieve's edit page in a new tab
 *
 * @param {{loader: TabLoader, identityId: string, model: Object, state: Object }}
 */
function VisualSelector({ loader, identityId, model, state }, resultCallback) {

  _.extend(this, Backbone.Events);

  /**
   * @type {BasicPort}
   */
  let port; // the port connected to selector's iframe
  const id = ID();

  state = _.extend(
    {
      selectorOn: false,
      expanded: true,
      identityId
    },
    Prefs.get('visualselector.uistate'),
    state
  );
  let scraperMode = false;

  // init scraper state if model had datasource_id
  if (model?.datasource_id) {
    scraperMode = true;
    state.scraper = {};
  }

  this.id = id;
  this.loader = loader; // used externally

  // --- for scraper
  this.player = null;
  this.replayStatus = null;
  // -------

  // ALL: Array<VisualSelector>
  VisualSelector.ALL.push(this);

  // 1. Store application state in a model.
  // 2. Open a visual selector port in tab content and connect the port to this
  //    selector instance.
  // 3. Load selector UI in an iframe in the content tab or in a separate window.
  // 4. Set the model and start editing selections.

  // If the loader is ready already, load visual selector now.
  this.listenTo(loader, 'reset', loadSelectorFrame);
  this.listenTo(loader, 'reset', onLoaderReset);
  this.listenTo(loader, 'destroy', () => resultCallback(null));

  // entry point
  if (loader.rootPort) {
    loadSelectorFrame();
  }

  this.listenTo(loader, 'port:init', (event, aPort) => {
    onLoaderPortInit(aPort);
  });

  // automatically forward all events from loader to selector port?
  [
    'port:select:close',
    'port:select:display',
    'port:select:new',
  ].forEach(name => {
    // using this.listenTo instead of loader.on for easier cleanup
    this.listenTo(loader, name, (event, aPort) => {
      port.sendEvent(`loader:${name}`, {
        index: loader.getPortIndex(event.portId),
        uri: aPort.uri,
        ...event,
      });
    });
  });

  this.destroy = () => {
    VisualSelector.ALL.splice(VisualSelector.ALL.indexOf(this), 1);

    this.off();
    this.stopListening();
  }

  // called when UI connects with BG
  this.setSelectorFramePort = (chromePort) => {
    if (port) port.destroy();
    port = new BasicPort(chromePort, {
      handleRequest: handleSelectorFrameRequest.bind(this)
    });
    this.initSelectorFramePort();
  }

  this.initSelectorFramePort = () => {
    port.on('disconnect', () => port = null);
    port.on('close', this.onClose);
    port.on('save', onSave);
    port.on('uistate', onUIState);

    // Set model and state variables
    // console.log('load model:', model);
    let _state = { ...state };
    // serialize state.scraper.replayStatus(if datasource)
    if (scraperMode && state.scraper.replayStatus) {
      const _scraper = { ...state.scraper };
      _scraper.replayStatus = serializeReplayStatus(_scraper.replayStatus);
      _state.scraper = _scraper;
    }
    port.sendEvent('init', {
      model,
      state: _state
    });
  };

  function onLoaderReset() {
    if (!port) return;

    port.sendEvent('loader:reset',
      _.pick(loader.rootPort.port.attrs, 'uri'));
  }

  function onLoaderPortInit(loaderPort) {
    if (!port) return;

    if (loaderPort.initDone) {
      // console.log('onLoaderPortInit', loaderPort.uri);
      port.sendEvent('loader:load', {
        index: loader.getPortIndex(loaderPort.id),
      });
    }
  }

  async function loadSelectorFrame() {
    if(isElectron()) {
      chrome.tabs.attachToolsPanel(loader.tabId);
    } else {
      // load this script in the top context.
      // this will create and load the selector iframe in the page
      await chrome.scripting.executeScript({
        target : {
          tabId : loader.tabId,
        },
        func: 'setGlobals',
        args: [{DISTILL_LOCALE: Prefs.get('locale') ?? 'en-US'}],
      });

      await chrome.scripting.executeScript({
        target : {
          tabId : loader.tabId,
        },
        files: ['./content/port-selector.js'],
      });
    }
  }

  this.onClose = async () => {
    if (scraperMode) {
      setScraperHighlightVisibility(false);
    }

    chrome.scripting.executeScript({
      target: { tabId: loader.tabId },
      func: 'callRemove'
    });

    const cancellablePromises = [];
    try {
      await Promise.all(
        loader.ports.map((p) => {
          const cancellablePromise = new CancellablePromise(
            100,
            new Error(`picker_setMode request failed for port ${port.id}`)
          );
          cancellablePromises.push(cancellablePromise);
          return Promise.race([cancellablePromise, p.sendRequest('picker_setMode', 'NOOP')]);
        })
      );
    } catch (e) {
      DBG && console.error('error while closing the picker', e);
    } finally {
      cancellablePromises.forEach((cp) => {
        clearTimeout(cp.timeoutId);
      });
    }

    resultCallback();
  };

  function onSave(event) {
    chrome.scripting.executeScript({
      target: { tabId: loader.tabId },
      func: 'callRemove' // Close visual selector ui
    });
    // order: last run title - current page title - workflow name 
    // last run title - Title of the page where the scraper run was started from
    event.name = state.scaper?.lastRunTitle ?? loader.rootPort.title ?? event.name;
    if (!event.uri) {
      // last run uri / current page uri
      // last run uri - uri of the page where the scraper run was started from 
      event.uri = state.scraper?.lastRunURI ?? loader.rootPort.uri;
    }

    if (scraperMode) {
      setScraperHighlightVisibility(false);
    }

    // console.log('Options Saved: ', event);
    resultCallback(null, event);
  }

  function onUIState(event) {
    Prefs.set('visualselector.uistate', event);
    Object.assign(state, event);

    // call frame controller
    if(isElectron()) {
      chrome.tabs.toggleToolsPanel(loader.tabId, event);
    } else {
      chrome.scripting.executeScript({
        target : {tabId : loader.tabId},
        func: `callShow`,
        args: [event]
      });
    }
  }

  function saveScraperState(data) {
    Object.assign(state.scraper, data);
  }

  function serializeReplayStatus(replayStatus) {
    const serReplayStatus = {
      isPlaying: replayStatus.isPlaying,
      error: replayStatus.error
    };

    for (const key of ['playing', 'completed', 'errored']) {
      serReplayStatus[key] = replayStatus[key].map((node) => node.path());
    }
    return serReplayStatus;
  }

  // handle requests coming from selector frame
  async function handleSelectorFrameRequest(path, input) {
    // console.log("Handler Selector Frame Request: ", path, input);
    switch (path) {
      case 'subscribe':
        // Perform init if loader has already been loaded.
        if (loader.rootPort) {
          onLoaderReset();
        }
        _.each(loader.ports, onLoaderPortInit);
        break;
      case 'loader/request':
        return loader.request(input.portSelector, input.data);
      case 'scraper/save-state':
        saveScraperState(input);
        break;
      case 'scraper/start-run':
        const { datasourceId, params } = input;
        saveScraperState(input);
        let { player, scrape} = await setupScraper(datasourceId, params);
        this.player = player;
        this.runScraper(scrape).catch((err) => DBG && console.error(err.toJSON()));
        break;
      case 'scraper/stop-run':
        if (this.player) {
          this.player.interrupt();
          this.replayStatus.isPlaying = false;
        } else {
          DBG && console.log('Nothing to interrupt: No player running!');
        }
        break;
      case 'scraper/set-highlight':
        setScraperHighlightVisibility(input);
        break;
      default:
        throw new Error('Unsupported path:' + path);
    }
  }

  function setScraperHighlightVisibility(state) {
    loader.request(0, { path: 'setScraperHighlightVisibility', data: state });
  }

  const updateReplayStatusHook = (type, { node, error }) => {
    const { HOOK_EVENT, Root, Block, Clause, Conditional } = xlibs.expressions;
    if (type === HOOK_EVENT.BEFORE_RUN || type === HOOK_EVENT.AFTER_RUN) {
      return;
    }
    const parent = node.parent;
    switch (type) {
      case HOOK_EVENT.BEFORE_EVAL:
        if (
          parent instanceof Root ||
          parent instanceof Block ||
          parent instanceof Clause ||
          parent instanceof Conditional
        ) {
          this.replayStatus.playing = [...this.replayStatus.playing, node];
          // console.log('Sending run update: new node playing');
          port.sendEvent('scraper:run:update', {
            key: 'playing',
            data: { path: node.path() }
          });
        }
        break;
      case HOOK_EVENT.AFTER_EVAL:
        if (error) {
          this.replayStatus.playing = [];
          if (
            parent instanceof Root ||
            parent instanceof Block ||
            parent instanceof Clause ||
            parent instanceof Conditional
          ) {
            this.replayStatus.errored = [node, ...this.replayStatus.errored];
            // console.log('Errored Event ', node);
            port.sendEvent('scraper:run:update', {
              key: 'errored',
              data: {
                path: node.path()
              }
            });
          }
        } else {
          // after eval no error, node completed execution
          let index = this.replayStatus.playing.indexOf(node);
          if (index > -1) {
            this.replayStatus.completed = [...this.replayStatus.completed, node];
            this.replayStatus.playing = this.replayStatus.playing.slice(0, index);
            port.sendEvent('scraper:run:update', {
              key: 'completed',
              data: {
                path: node.path()
              }
            });
          }
        }
        break;
    }
  };

  async function setupScraper(datasourceId, params) {
    // console.log('Setting up scraper: datasource_id: ', datasourceId);
    const pageContext = new PageContext();
    const scrapeClient = new ScrapeClient({
      uri: loader.rootPort.uri,
      datasource_id: datasourceId,
      params,
      pageContext,
      pageLoader: loader
    });
    const { player, scrape } = await scrapeClient.setup();
    player.vm.addHook(updateReplayStatusHook);
    return { player, scrape };
  }

  this.runScraper = async (scrapeFunc) => {
    // save the start uri and title
    saveScraperState({ lastRunURI: loader.rootPort.uri, lastRunTitle: loader.rootPort.title })

    // add hook to vm
    this.replayStatus = {
      isPlaying: true,
      playing: [],
      completed: [],
      errored: [],
      error: undefined
    };
    setScraperHighlightVisibility(false);

    const replayStatusState = { replayStatus: this.replayStatus}
    // sync replayStatus to UI
    port.sendEvent('scraper:run:start', replayStatusState);
    // save replayStatus to state.scraper
    saveScraperState(replayStatusState)

    try {
      // run scraper
      const result = await scrapeFunc();
      // console.log('Got Scrape Result ', result);
      // save result in state.scraper
      saveScraperState({ result });
      setScraperHighlightVisibility(true);
      // scroll to first highlighted elementj
      loader.request(0, { path: 'scrollToFirstScrapedElement' });
      port.sendEvent('scraper:run:complete', { result });
    } catch (error) {
      DBG && console.error('scraper run error ', error);
      saveScraperState({ error });
      port.sendEvent('scraper:run:error', { error });
      throw error;
    } finally {
      this.player = null;
      port.sendEvent('scraper:run:update', { key: 'isPlaying', data: false });
      this.replayStatus.isPlaying = false;
    }
  };
}

VisualSelector.ALL = [];

function selectorAttachPort(chromePort) {
  const tabId = chromePort.sender.tab.id;
  const vs = _.find(VisualSelector.ALL, function(vs) {
    return vs.loader.tabId == tabId;
  });

  vs && vs.setSelectorFramePort(chromePort);
  return !!vs;
}

;
const TYPE_FORM_ENCODED = 'application/x-www-form-urlencoded';

const TYPE_JSON = 'application/json';

function encodeParams(params) {
  return _.map(params, function(value, name) {
    return name+'='+encodeURIComponent(value);
  }).join('&');
}

window.HTTP = {
  request: promisifyOrCallback(function({
    params, json, url, overrideMimeType, headers, method, timeout
  }, callback) {
    const contentType = params ? TYPE_FORM_ENCODED : TYPE_JSON;

    method || (method = 'GET');
    json || (json = {});

    if (method == 'GET' && !_.isEmpty(json)) {
      url += (url.indexOf('?') < 0 ? '?' : '&') + qs.stringify(json);
    }
    // console.log('HTTP.request:', method, url);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = onreadystatechange;
    xhr.open(method, url, true);
    setHeaders();

    if(timeout) {
      xhr.timeout = timeout;
    }

    if(overrideMimeType) {
      xhr.overrideMimeType(overrideMimeType);
    }

    if (method == 'GET') {
      // null for GET with native object
      xhr.send(null);
    } else {
      const str = contentType == TYPE_JSON ?
        JSON.stringify(json) : encodeParams(params);
      xhr.send(str);
    }

    function onreadystatechange() {
      if (xhr.readyState == 4) {
        const text = xhr.responseText;
        const contentType = xhr.getResponseHeader('content-type') || 'text';
        const isJSON = contentType.indexOf(TYPE_JSON) == 0;
        const status = xhr.status;
        let response;
        try{
          response = isJSON ? JSON.parse(text) : text;
        } catch(e) {
          // default to text text is not a valid json. note google apis serving json with prefixes
          response = text;
        }
        
        const headerString = xhr.getAllResponseHeaders();

        // Convert the header string into an array
        // of individual headers
        const arr = headerString.trim().split(/[\r\n]+/);
    
        // Create a map of header names to values
        const headers = {};
        arr.forEach((line) => {
          const parts = line.split(': ');
          const header = parts.shift();
          const value = parts.join(': ');
          headers[header] = value;
        });
        // console.log('HTTP:response:(type?', contentType, ')-', xhr.status,  xhr, xhr.responseText);
        callback(status !=200 ? {status, response} : null, {headers, response, status});
      }
    }

    function setHeaders() {
      xhr.withCredentials = true;
      if (method != 'GET') {
        xhr.setRequestHeader('Content-type', contentType);
      }
      _.each(headers, function(value, key) {
        xhr.setRequestHeader(key, value);
      });
    }
  }),
  
  del: function(options, ...args) {
    _.extend(options, {method: 'DELETE'});
    return HTTP.request(options, ...args);
  },
  head: function(options, ...args) {
    _.extend(options, {method: 'HEAD'});
    return HTTP.request(options, ...args);
  },
  get: function(options, ...args) {
    _.extend(options, {method: 'GET'});
    return HTTP.request(options, ...args);
  },
  post: function(options, ...args) {
    _.extend(options, {method: 'POST'});
    return HTTP.request(options, ...args);
  },
  put: function(options, ...args) {
    _.extend(options, {method: 'PUT'});
    return HTTP.request(options, ...args);
  },
};

;
function Route(options) {
  _.extend(this, options, this.parse(options.path));
}

_.extend(Route.prototype, {

  match: function(path) {
    const
      keys = this.keys;


    const params = this.params = {};


    const m = this.regexp.exec(path);

    if (!m) return false;

    for (let i = 1, len = m.length; i < len; ++i) {
      const key = keys[i - 1];

      const val = 'string' == typeof m[i]
        ? decode(m[i])
        : m[i];

      if (key) {
        params[key.name] = val;
      } else {
        throw new Error('Nameless param not supported, path:'+path);
      }
    }

    return true;
  },
  
  // The parse method returns a regular expression for the path provided which is later used 
  // to match the paths of store with input url in `api.js`

  parse: function(path) {
    const keys = []; const strict = true;
    path = path
      .concat(strict ? '' : '/?')
      .replace(/\/\(/g, '(?:/')
      .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,
        function(_, slash, format, key, capture, optional, star) {
          keys.push({name: key, optional: !! optional});
          slash = slash || '';
          return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
          + (optional || '')
          + (star ? '(/*)?' : '');
        })
      .replace(/([\/.])/g, '\\$1')
      .replace(/\*/g, '(.*)');
    return {
      keys: keys,
      regexp: new RegExp('^' + path + '$', 'i'),
    };
  },

});


function Router(options) {
  this.routes = _.map(options.routes, function(routeOptions) {
    return new Route(routeOptions);
  }, this);

  // console.log('this.routes:', this.routes, options);
}

_.extend(Router.prototype, {

  find: function(path) {
    const route = _.find(this.routes, function(route) {
      return route.match(path);
    });
    return route;
  },

});

function decode(str) {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}

;

const methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'patch': 'PATCH',
  'delete': 'DELETE',
  'read': 'GET',
};

const router = new Router({
  routes: [{
    list: true,
    path: '/clients',
    store: ClientStore,
  }, {
    path: '/clients/:id',
    store: ClientStore,
  }, {
    list: true,
    path: '/sieves',
    store: SieveStore,
  }, {
    path: '/sieves/:id',
    store: SieveStore,
  }, {
    list: true,
    path: '/sieves/:sieve_id/actions',
    store: ActionStore,
  }, {
    path: '/sieves/:sieve_id/actions/:id',
    store: ActionStore,
  }, {
    list: true,
    path: '/sieves/:sieve_id/data',
    store: SieveDataProxy,
  }, {
    path: '/sieves/:sieve_id/data/:id',
    store: SieveDataStore,
  }, {
    list: true,
    path: '/sieves/:key/works/local',
    store: WorkStore,
  }, {
    path: '/sieves/:sieve_id/snapshots/:id/local',
    store: SieveSnapshotStore,
  }, {
    list: true,
    path: '/rules',
    store: RuleStore,
  }, {
    path: '/rules/:id',
    store: RuleStore,
  }, {
    list: true,
    path: '/tags',
    store: TagStore,
  }, {
    list: true,
    path: '/tags/:id',
    store: TagStore,
  }, {
    list: true,
    path: '/users/attrs',
    store: AttrStore,
  }, {
    path: '/users/attrs/:id',
    store: AttrStore,
  }],
});

function apiHeaders() {
  return {
    'Authorization': 'Client '+auth.getToken(),
    'X-Client-ID': Prefs.get('client.id'),
    'X-Client-Version': CFG.VERSION,
  };
}


function callAPI(url, method, json, callback) {
  let headers = {}
  if (url && typeof url === 'object') {
    const requestOptions = url;
    callback = method;
    url = requestOptions["url"];
    method = requestOptions["method"] || "GET";
    json = requestOptions["json"];
    headers = requestOptions["headers"];
  } else if (typeof method == 'function') {
    callback = method;
    json = null;
    method = 'GET';
  } else if (typeof json == 'function') {
    callback = json;
    if (_.isObject(method)) {
      json = method;
      method = 'GET';
    } else {
      json = null;
    }
  }
  // console.log(method, url)

  const options = {
    url,
    method,
    json,
    headers
  };
  return _api(options, callback);
}

function handleStoreQuery(route, method, json, _callback) {
  if (typeof method == 'function') {
    _callback = method;
    json = null;
    method = 'GET';
  } else if (typeof json == 'function') {
    _callback = json;
    if (_.isObject(method)) {
      json = method;
      method = 'GET';
    } else {
      json = null;
    }
  }
  json = json || {};
  method = methodMap[method] || method || 'GET';
  const path = route.path;
  const store = route.store;
  const hasUserId = store.hasField('user_id');
  const user_id = window.USER ? USER.id : auth.getId();

  const callback = function(err, result) {
    if (err) {
      console.error('API:err', path, method, err);
    } else {
      if (method != 'GET') {
        service.syncStore(store);
      }
    }
    result && (result = JSON.parse(JSON.stringify(result)));
    _callback(err, result);
  };

  // console.log('handleStoreQuery:', store.name, method, JSON.stringify(json));
  let query;
  let doc;
  switch (method) {
    case 'DELETE':
    // Soft delete the entity and let sync service handle the rest.
      store.update(route.params, {
        state: C.STATE_DEL,
        _state: C.LOCAL_STATE_DEL,
      }, callback);
      break;

    case 'GET':
      query = route.params;
      if (hasUserId) {
        query.$and1 = {
          $or: [
            ['user_id', user_id],
            ['user_id', null],
          ],
        };
      }
      if (route.list) {
        const opts = json._opt;
        query = _.extend(_.omit(json, '_opt'), query);
        store.find(query, opts, callback);
      } else {
        store.findOne(query, callback);
      }
      break;

    case 'PATCH':
    case 'PUT':
              query = route.params;

      doc = json;
      store.update(query, doc, callback);
      break;

    case 'POST':
      doc = _.extend(json, route.params);
      store.create(doc, callback);
      break;

    default:
      callback({
        msg: 'API: Unknown method:' + method,
      });
  }
}



async function _api(options, callback) {
  options.headers = {...apiHeaders(), ...options.headers, };
  return new Promise((resolve, reject) => {
    return HTTP.request(options, function(err, xhrObj) {
      if (err && err.status == 401) {
        auth.on401(); // user need to login token lost
      }
      // xhrObj can be null in case of error
      let res = xhrObj?.response;
      if (callback) {
        callback(err, res);
      } else {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      // err && console.error('api error: ', err, url, method, json);
      // callback(err, res);
    });
  });
}

function makeAPICaller(baseURL){
  return (urlOrOptions, ...args) => {
    if (typeof urlOrOptions === "string") {
      return callAPI(baseURL + urlOrOptions, ...args);
    } else {
      urlOrOptions.url = baseURL + urlOrOptions.url
      return callAPI(urlOrOptions, ...args);
    }
  }
}

function fetchFromAPIOrStore(url, method, json, callback) {
  const route = router.find(url);
  if (route) {
    return handleStoreQuery(route, method, json, callback);
  } else {
    return api(url, method, json, callback);
  }
}

window.fetchFromAPIOrStore = promisifyOrCallback(fetchFromAPIOrStore);
window.api = promisifyOrCallback(makeAPICaller(CFG.URL.API));
window.utilApi = utilWrapper;
window.util = makeAPICaller(CFG.URL.UTILITIES);

const utilRouter = new Router({
  routes: [{
    path: '/datasources/:datasource_id/fetch',
    handler: async function ({ json }) {
      if (!json.config.request) {
        json.config.request = {};
      }
      const { timeout } = json.config.request;
      json.config.request.timeout = (timeout ?? 30) * 1000;
      const { datasource_id } = this.params;
      return await datasources.fetchData({
        type: datasource_id_type_map[datasource_id],
        fetchOpts: json
      });
    }
  }]
});

async function utilWrapper(url, method, json) {
  const route = utilRouter.find(url);
  if (route) {
    return await route.handler({ url, method, json });
  } else {
    return await util(url, method, json);
  }
}
;
window.auth = _.extend({

  clear: function(callback) {
    Prefs.del('client.token');
  },

  isLegacy: function() {
    const installedVersion = auth.getVersion();
    const vInstall = installedVersion.split('.');
    const vMarker = [1, 11];
    const len = Math.max(vInstall.length, vMarker.length);

    for (let i = 0; i < len; i += 1) {
      const vi = parseInt(vInstall[i]||0); const vm = vMarker[i]||0;
      if (vi !== vm) {
        return vi < vm;// it is legacy version
      }
    }
    return false;// current ver is not legacy
  },

  logout: function() {
    auth.clear();
    auth.trigger('logout');
  },

  // Deprecated method
  _get: function(callback) {
    const name = Prefs.get('service.name');
    const password = Prefs.get('service.password');
    const cred = password ? { name, password, } : null;
    callback && callback(null, cred);
    return cred;
  },

  getId: function() {
    // XXX Set a default value of null, when it is undefined, IndexexDB (zangodb)
    // queries where they look for null values won't work
    return Prefs.get('service.user_id', null);
  },

  _setId: function(id) {
    Prefs.set('service.user_id', id);
  },

  getToken: function() {
    return Prefs.get('client.token');
  },

  _setToken: function(token) {
    Prefs.set('client.token', token);
  },

  setUserIdAndToken: async function(token, uid) {
    await ClientStore.update({
      id: SyncId.get(),
      user_id: '$null',
    }, {
      user_id: uid,
      _state: C.LOCAL_STATE_SYNCED,
    });

    auth._setId(uid);
    auth._setToken(token);

    auth.trigger("login")
    return true;
  },

  getUser: promisifyOrCallback(function(callback) {
    UserStore.findOne(auth.getId(), callback);
  }),

  getVersion: function() {
    return Prefs.get('since')['version'];
  },

  isLoggedIn: function() {
    return !!auth.getToken();
  },

  isLoginMandatory: function() {
    /*
    let version = auth.getVersion();
    if(auth.isLegacy()) {
      return !!auth.getId()
    } else {
      return true;
    }
    */
    return !!auth.getId();
  },

  isReady: function() {
    return (auth.isLoggedIn() || !auth.isLoginMandatory());
  },

  on401: function() {
    if (auth.isLoggedIn()) {
      auth.logout();
      auth.trigger('expired');
    }
  },

  // Fetch and save logged in user
  init: function(callback = function(err) {
    err && console.error('auth.init', err);
  }) {
    const oldCreds = auth._get();
    const token = auth.getToken();

    if (auth.getId() && !token) {
      // User was logged in at some point of time but does not have a valid token
      if (oldCreds) {
        // Get auth token from server
        auth.saveToken(oldCreds, callback);
      } else {
        // Can't get a token, send error. Should show a notice to the user.
        return callback({code: 'EAUTH', msg: 'Authentication required'});
      }
    } else if (token) {
      auth.initUser(callback);
    } else {
      callback();
    }
  },

  initUser: async function(callback = function() {}) {
    // console.trace()
    try {
      let user = await UserStore.findOne(auth.getId());
      if (!user) {
        user = await api('/users/self', 'GET');
        await UserStore.create(_.extend({_state: C.LOCAL_STATE_SYNCED}, user));
      }

      callback();
    } catch (e) {
      if (await UserStore.findOne(auth.getId())) { // slow network temporary solution for initUser failure
        callback();
      } else {
        callback(e);
      }
    }
  },

  // Check credentials and save token for auth for this client
  saveToken: function(params, callback) {
    ClientStore.findOne(SyncId.get(), function(err, client) {
      if (err) {
        // show watchlist with err code
        return callback(err);
      }
      if (!client) {
        // show watchlist with err code
        return callback({
          code: 'ECLIENT',
          msg: 'Failed to find client metadata',
        });
      }
      params.client = client;
      HTTP.post({
        url: CFG.URL.API + '/users/client_token',
        json: params,
      }, async (err, xhrObj) => {
        if (err) {
          // show watchlist with err code
          return callback(err);
        }
        let res = xhrObj.response;
        // Client is created on server as part of this call
        await ClientStore.update({
          id: client.id,
          user_id: '$null',
        }, {
          user_id: res.user_id,
          _state: C.LOCAL_STATE_SYNCED,
        });

        const
          token = res.token;
        auth._setId(res.user_id);
        auth._setToken(token);
        auth.initUser(callback);
      });
    });
  },

}, Backbone.Events);
;
// Id to sync data across different devices.
var SyncId = {

  webAppId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
  anyLocalId: C.DEFAULT_GROUPID,

  create: function (callback) {
    // console.log('client.create');
    let
      client_id = Prefs.get('client.id');


    let clientDoc;

    async.waterfall([
      function (callback) {
        const doc = {
          type: CFG.CLIENT.TYPE,
          name: CFG.CLIENT.NAME,
          info: CFG.CLIENT.INFO,
          // By default, sync is not authorized.
          state: C.STATE_DEFAULT,
          version: CFG.VERSION,
          is_worker: true,
        };
        client_id && (doc.id = client_id);
        // user_id && (doc.user_id = user_id); // Remove dependency on auth
        ClientStore.create(doc, callback);
      },
      function (_clientDoc, callback) {
        clientDoc = _clientDoc;
        client_id = clientDoc.id;
        Prefs.set('client.id', client_id);
        KVStore.destroy({ id: 'client_id' }, callback);
      },
      function (res, callback) {
        KVStore.create({ id: 'client_id', value: client_id }, callback);
      },
    ], function (err) {
      callback(err, clientDoc);
    });
  },

  init: function (callback) {
    SyncId.findId(function (err, client_id) {
      if (client_id) {
        Prefs.set('client.id', client_id);
        // Query ClientStore to make sure that an entry for client_id exists
        // for currently authenticated user. If this is not so, make sure that
        // we create one.
        const query = { id: client_id };
        // user_id && (query.user_id = user_id);   // Remove dependency on auth
        ClientStore.findOne(query, function (err, doc) {
          // console.log('findOne:', err, doc);
          if (!doc) {
            // XXX The db is out of sync. Possible reasons:
            // 1. Restored from backup of an older version.
            // 2. Copied from another client.
            // console.log('to create:', err, doc);
            SyncId.create(callback);
          } else {
            // We are all set, there is nothing left for us to do.
            callback(null, doc);
            ClientStore.update(query, { state: C.STATE_DEFAULT });
          }
        });
      } else {
        _getId().then(id => {
          if (id && id.length == 36) {
            // Save client id only iff it is a valid uuid
            Prefs.set('client.id', id);
          } else {
            const generateId = guid();
            Prefs.set('client.id', generateId);
            _setId(generateId);
          }
          SyncId.create(callback);
        })
          .catch(() => {
            Prefs.set('client.id', guid());
            SyncId.create(callback);
          })
      }
    });
  },

  findId: function (callback) {
    const client_id = Prefs.get('client.id');
    if (client_id) {
      callback(null, client_id);
    } else {
      // A more durable form of storage - can be restored from a backup
      KVStore.findOne({ id: 'client_id' }, function (err, doc) {
        callback(err, doc && doc.value);
      });
    }
  },

  get: function (callback) {
    return Prefs.get('client.id');
  },

};

function updateErrorActions(callback) {
  try {
    const isEnabled = Prefs.get('errorAction.enabled');
    if (isEnabled) {
      Prefs.del('errorAction.enabled');

      const minimum_time_interval = Prefs.get('errorAction.interval') || 15;
      Prefs.del('errorAction.interval');

      const number_of_consecutive_errors = Prefs.get('errorAction.minCount') || 5;
      Prefs.del('errorAction.minCount');

      const soundPath = Prefs.get('errorAction.sound') || '/skin/media/buzzer.ogg';
      Prefs.del('errorAction.sound');

      Prefs.set('errorActions', [{
        minimum_time_interval,
        number_of_consecutive_errors,
        trigger: true,
        sieve_filter: '',
        actions: [{
          config: `{"tone":"${soundPath}"}`,
          type: 101
        }]
      }]);
    }
  } catch (e) {
    console.error('cannot move the errorAction prefs to errorActions', e);
  } finally {
    callback();
  }
}

function pruneDeletedSieve(callback) {
  SieveStore.destroy({
    state: C.STATE_DEL,
    $or: {
      _state: C.LOCAL_STATE_POST,
      user_id: null,
    },
  }, function (err, list) {
    if (err) {
      callback(err);
    } else {
      /*
      execQuery('DELETE FROM sieve_data WHERE id IN (SELECT sieve_data.id '
        + 'FROM sieve_data LEFT JOIN sieves ON '
        + 'sieves.id = sieve_data.sieve_id WHERE sieves.id IS NULL)',
        [], {},
        function(err, res) {
          callback(err);
        });
      */
      // pruneOrphanedData(callback);
      callback();
    }
  });
}

// delete the snapshots created when the logic for removing them was not there inside insertWork fn
//  remove the snapshots not referenced by works
function pruneSieveSnapshots(callback) {
  if (CFG.CLIENT.TYPE !== C.CLIENT_CR) {
    return callback()
  }

  execQuery('DELETE FROM sieve_snapshots WHERE id NOT IN (SELECT works.snapshot_id FROM works where works.snapshot_id IS NOT NULL)',
    [], {},
    function (err, res) {
      callback(err);
    });
}

function pruneOrphanedData(callback) {
  async.series([
    function (callback) {
      // Delete orphaned actions and data.
      async.each([ActionStore, SieveDataStore], function (store, callback) {
        const
          n = store.name;


        const sql = 'SELECT ' + n + '.id FROM ' + n + ' LEFT JOIN sieves ON ' + n + '.sieve_id=sieves.id WHERE sieves.id IS NULL';
        execQuery(sql, [], {}, function (err, list) {
          if (err) {
            callback(err);
          } else {
            const
              ids = _.pluck(list, 'id');
            // NOTE Limit maximum number of ids that can be passed to a query
            // in a single call. We destroy in chunks of 100.
            async.whilst(function () {
              return ids.length > 0;
            }, function (callback) {
              store.destroy({
                'id.in': ids.splice(0, 500), // SQLITE_MAX_VARIABLE_NUMBER is 999
              }, callback);
            }, callback);
          }
        });
      }, callback);
    },
    function (callback) {
      // Delete orphaned rules.
      const sql = 'SELECT rules.id FROM rules LEFT JOIN sieves on rules.id = sieves.rule_id where sieves.rule_id IS NULL';
      execQuery(sql, [], {}, function (err, list) {
        if (err) {
          callback(err);
        } else {
          RuleStore.destroy({
            'id.in': _.pluck(list, 'id'),
          }, callback);
        }
      });
    },
  ], callback);
}

function initData(callback) {
  const clientId = Prefs.get('client.id');

  async.series([
    updateErrorActions,
    // Prune data that has not been synced and has been marked for deletion
    pruneDeletedSieve,
    pruneSieveSnapshots,
    function (callback) {
      PopupMessageStore.destroy({}, callback);
    },
    // Make sure that we have updated state and _state
    function (callback) {
      // Update the _state to mark records for sync
      async.each([
        ClientStore, SieveStore, TagStore, SieveDataStore, ActionStore,
        RuleStore, AttrStore, ClientGroupStore/* ErrorStore, WorkStore,*/
      ],
        function (store, callback) {
          store.update({ _state: null }, {
            _state: C.LOCAL_STATE_POST,
            ts_mod: -1,
          }, callback);
        }, callback);
    },
    function (callback) {
      async.each([
        ClientStore, SieveStore, TagStore, SieveDataStore, ActionStore,
        RuleStore, AttrStore, ClientGroupStore /* ErrorStore, WorkStore,*/
      ],
        function (store, callback) {
          store.update({ state: null }, {
            state: C.STATE_DEFAULT,
            ts_mod: -1,
            _state: -1,
          }, callback);
        }, callback);
    },
    function (callback) {
      SieveStore.update({
        rule_id: '',
      }, {
          rule_id: null,
          ts_mod: -1,
          _state: -1,
        }, callback);
    },
    function (callback) {
      // console.log('update client_id');
      SieveStore.update({ client_id: null }, {
        client_id: clientId,
        ts_mod: -1,
        _state: -1,
      }, callback);
    },
    function (callback) {
      const user_id = auth.getId();
      if (!user_id) {
        callback();
        return;
      }
      async.parallel([
        function (callback) {
          ClientStore.update({
            'user_id': null,
            'id.nin': [SyncId.webAppId, SyncId.anyLocalId],
          }, {
              user_id: user_id,
              ts_mod: -1,
              _state: -1,
            }, callback);
        },
        function (callback) {
          async.each(
            [SieveStore, TagStore, ActionStore, RuleStore, AttrStore],
            function (store, callback) {
              store.update({
                user_id: null,
              }, {
                  user_id: user_id,
                  ts_mod: -1,
                  _state: -1,
                }, callback);
            }, callback);
        },
      ], callback);
    },
  ], callback);
}

async function _getId() {
  // Used when extension is reinstalled to recover the older client id using cookies
  const url = `${CFG.URL.AUTH}/client/id`;
  let res = await fetch(url);
  let text = await res.text();
  return text;
}

async function _setId(id) {

  const url = `${CFG.URL.AUTH}/client/id`;
  return await fetch(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'PATCH',
    body: 'id=' + id
  })
}
;
window.SyncMan = _.extend({}, Backbone.Events, {

  accountEnabled: false,

  syncTimer: {},

  canSync: function() {
    return auth.isLoggedIn();
  },

  clearTimers: function() {
    _.each(this.syncTimer, function(timeoutId) {
      clearTimeout(timeoutId);
    });
    this.syncTimer = {};
  },

  del: promisifyOrCallback(function(store, callback) {
    // console.log('del:', store.name);
    const urlTpl = (store.urls.id);
    store.find({
      _state: C.LOCAL_STATE_DEL,
    }, function(err, resp) {
      if (err) {
        callback(err);
        return;
      }
      // console.log('to delete:', resp.count, resp.data);
      async.eachSeries(resp.data, function(doc, callback) {
        const url = Mustache.render(urlTpl, doc);
        api(url, 'DELETE', function(err) {
          if (err) {
            console.error('error deleting model from server:', err);
            store.update(doc.id, {
              _state: C.LOCAL_STATE_DEL_ERR,
            }, callback);
          } else {
            store.destroy(doc.id, callback);
          }
        });
      }, callback);
    });
  }),
  get: promisifyOrCallback(function(store, options, callback) {
    //
    if (typeof options == 'function') {
      callback = options;
      options = {};
    }
    function getSyncSuffix() {
      const
        query = options.query || {};


      const keys = Object.keys(query).sort();

      if (keys.length === 0) {
        return '';
      }

      const
        parts = keys.map(function(key) {
          return key + '_' + query[key];
        });

      return '_' + parts.join('_');
    }
    let
      tsDoc;


    let resp;


    const user_id = auth.getId();


    const tsSyncId = user_id+'_ts_sync_'+store.name+getSyncSuffix();

    async.waterfall([
      function(callback) {
        KVStore.findOne(tsSyncId, {
          only: ['id', 'value'],
        }, callback);
      },
      function(_tsDoc, callback) {
        // console.log('_tsDoc:', _tsDoc);
        tsDoc = _tsDoc;

        const url = store.urls.root;
        const query = _.extend({
          // Overrides API query default.
          'client_id': '-',
          // Remove any default query filter based on actions for /v1
          'state': '-',
          '_opt': {
            order: ['ts_mod', 'id'],
            limit: store.name == SieveDataStore.name ? 50 : 200,
          },
        }, options.query);

        if (tsDoc) {
          const parts = tsDoc.value.split(',');
          const sTsMod = new Date(parts[0] == 'null' ? 0 : parts[0]); // some tables can return null ts_mod
          const sId = parts[1];

          if (sId) {
            query.$or = {
              'ts_mod.gt': new Date(sTsMod.valueOf() + 1).toISOString(),
              '$and1': {
                'ts_mod.gte': sTsMod.toISOString(),
                'id.gt': sId,
              },
            };
          } else {
            query['ts_mod.gt'] = new Date(sTsMod.valueOf() + 1).toISOString();
          }
        } else {
          // Do not fetch deleted items for first sync
          query['state.nin'] = [C.STATE_DEL, C.STATE_ARCHIVED, ];
        }

        api(url, 'GET', query, callback);
      },
      function(_resp, callback) {
        // console.log('get:resp', store.name, _resp);
        resp = _resp;
        // TODO Fastest way to arrive at the logic would be to query the DB
        // for existing records and then perform the operations.
        async.eachSeries(resp.data, function(remoteDoc, callback) {
          // console.log('remotedoc:', remoteDoc.ts_mod);
          // XXX Find based on combination of id and user_id (if applicable)
          const query = _.pick(remoteDoc, 'id', 'user_id');
          store.findOne(query, {
            only: ['id', '_state'],
          }, function(err, localDoc) {
            remoteDoc._state = C.LOCAL_STATE_SYNCED;
            if (_.isUndefined(remoteDoc.state)) {
              remoteDoc.state = C.STATE_DEFAULT;
            }
            if (localDoc) {
              if (remoteDoc.state == C.STATE_DEL) {
                store.destroy(query, callback);
              } else {
                if (localDoc._state === C.LOCAL_STATE_PUT) {
                  // Let local changes overwrite remote ones
                  callback();
                } else {
                  store.update(query, remoteDoc, callback);
                }
              }
            } else {
              store.create(remoteDoc, callback);
            }
          });
        }, callback);
      },
      function(callback) {
        if (resp.count === 0) {
          callback();
        } else {
          const
            doc = _.pick(resp.data[resp.count - 1], 'id', 'ts_mod');


          const ref = doc.ts_mod + ',' + doc.id;

          if (tsDoc) {
            KVStore.update(tsDoc.id, {
              value: ref,
            }, callback);
          } else {
            KVStore.create({
              id: tsSyncId,
              value: ref,
            }, callback);
          }
        }
      },
    ], function(err) {
      if (err) {
        callback(err);
      } else if (resp.total_count > resp.count) {
        // If there are more items to be synced, get them.
        SyncMan.get(store, options, callback);
      } else {
        callback();
      }
    });
  }),
  post: promisifyOrCallback(function(store, callback) {
    // throw new Error();
    // console.log('post:', store.name);
    const
      url = store.urls.root;


    const user_id = auth.getId();

    store.find({
      'user_id': user_id,
      '_state': C.LOCAL_STATE_POST,
      '$or': {
        'state': null,
        'state.nin': [C.STATE_DEL],
      },
    }, {
      limit: 10,
      order: ['ts_mod'],
    }, function(err, resp) {
      // console.log('docs to post:', resp.data);
      async.eachSeries(resp.data, function(localDoc, callback) {
        api(url, 'POST', localDoc, async function(err, res) {
          if (err) {
            if (err.status == 409) {
              // The document was already created, we will resync later
              store.update(localDoc.id, {
                _state: C.LOCAL_STATE_PUT,
              }, function(errUpdate) {
                callback();
              });
            } else if (err.status == 461 && store == SieveStore) {
              // This error is received when a referenced entity was not found
              // It is similar to 404 where a parent entity could not be found
              const count = await RuleStore.updateLocal(localDoc.rule_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(RuleStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
              } else {
                // The related rule doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(localDoc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status == 404 && res && res.param == 'sieve_id' && store.hasField('sieve_id')) {
              // When we reach here, SieveStore should have been synced, but didnt
              // Try to post that sieve once again
              const count = await SieveStore.updateLocal(localDoc.sieve_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(SieveStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
                // XXX Can we  be stuck in a look?
              } else {
                // The related sieve doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(localDoc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status > 200 && err.status < 502) {
              // XXX Find the reason of error and take action accordingly
              // 1. Find if the resource exists and if so PUT it.
              // 2. In other cases, set it up for manual resolution.

              const
                urlTpl = (store.urls.id);


              const urlId = Mustache.render(urlTpl, localDoc);

              api(urlId, 'GET', async function(errGet, remoteDoc) {
                if (errGet) {
                  if (errGet.status > 200 && errGet.status < 502) {
                    await store.updateLocal(localDoc.id, {_state: C.LOCAL_STATE_POST_ERR});
                    callback();
                  } else {
                    // In case the error is due to intermittent connection, abort.
                    callback(err);
                  }
                } else {
                  // If there was a document at the server, update local's status
                  store.update(remoteDoc.id, {
                    _state: C.LOCAL_STATE_PUT,
                  }, function(errUpdate) {
                    callback();
                  });
                }
              });
            } else {
              // On other non-distill related errors, send error
              callback(err);
            }
          } else {
            let savedDoc = res;
            // console.log('posted doc:', store.name, savedDoc.id);
            // XXX We query using ts_mod to handle cases when an update was
            // performed on an unsynced item. We leave unsynced items unchanged.
            const
              query = _.pick(localDoc, 'id', 'user_id', 'ts_mod');
            store.update(query, _.extend(savedDoc, {
              _state: C.LOCAL_STATE_SYNCED,
            }), async function(err, updatedDoc) {
              if (err) {
                return callback(err);
              }
              if (updatedDoc._count == 0) {
                // The doc was modified while we were posting it. Set its state
                // to PUT
                await store.updateLocal(_.omit(query, 'ts_mod'), {
                  _state: C.LOCAL_STATE_PUT,
                });
              }
              callback();
            });
          }
        });
      }, function(err) {
        if (err) {
          callback(err);
        } else if (resp.total_count > resp.count) {
          // console.log('post: again', store.name);
          SyncMan.post(store, callback);
        } else {
          callback();
        }
      });
    });
  }),
  put: promisifyOrCallback(function(store, callback) {
    // console.log('put:', store.name);
    const
      urlTpl = (store.urls.id),
    user_id = auth.getId();

    store.find({
      user_id: user_id,
      _state: C.LOCAL_STATE_PUT,
    }, {
      limit: 10,
    }, function(err, resp) {
      async.eachSeries(resp.data, function(doc, callback) {
        const
          url = Mustache.render(urlTpl, doc);


        let query = _.pick(doc, 'id', 'user_id');

        // console.log('put:url:', url, doc);
        api(url, 'PUT', doc, async function(err, res) {
          if (err) {
            if (err.status == 461 && store == SieveStore) {
              // This error is received when a referenced entity was not found
              // It is similar to 404 where a parent entity could not be found
              const count = await RuleStore.updateLocal(doc.rule_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(RuleStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
              } else {
                // The related rule doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status == 404 && res && res.param == 'sieve_id' && store.hasField('sieve_id')) {
              // When we reach here, SieveStore should have been synced, but didnt
              // Try to post the sieve once again
              const count = await SieveStore.updateLocal(doc.sieve_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(SieveStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
                // XXX Can we  be stuck in a look?
              } else {
                // The related sieve doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
            } else if (err.status == 404) {
              store.update(query, {
                _state: C.LOCAL_STATE_POST,
              }, function(errUpdate) {
                callback(); // Err-less callback
              });
            } else if (err.status > 200 && err.status < 502) {
              // Server request resulted in error due to inconsistent state
              store.update(query, {
                _state: C.LOCAL_STATE_PUT_ERR,
              }, function(errUpdate) {
                callback(); // Err-less callback
              });
            } else {
              callback(err); // Bubble up error
            }
          } else {
            query = _.pick(res, 'id', 'user_id');
            store.update(query, _.extend(res, {
              // FIXME Race condition when an attribute changed while it was
              // being synced?
              _state: C.LOCAL_STATE_SYNCED,
            }), callback);
          }
        });
      }, function(err) {
        if (err) {
          callback(err);
        } else if (resp.total_count > resp.count) {
          // console.log('put: again', store.name);
          SyncMan.put(store, callback);
        } else {
          callback();
        }
      });
    });
  }),
  sync: promisifyOrCallback(function(clearTimers, callback) {
    // XXX When called explicitly, we clear the lock
    clearTimers && this.clearTimers();

    pruneDeletedSieve(function(err) {
      if (err) {
        return callback(err);
      }
      async.eachSeries(
        [ClientStore, UserStore, AttrStore, RuleStore, TagStore, MacroStore, SieveStore, SieveDataStore,
          ActionStore, ClientGroupStore],
        function(store, callback) {
          SyncMan.syncStore(store, callback);
        }, callback);
    });
  }),
  syncStore: function(store, options, callback) {
    const
      self = this;


    const name = store.name;

    if (typeof options == 'function') {
      callback = options;
      options = {};
    }

    callback || (callback = function(err) {
      err && console.error(err);
    });

    _.defaults(options, {
      delay: 100,
    });

    if (!this.canSync()) {
      callback({msg: 'e_sync_disabled'});
      return;
    }

    if (!this.accountEnabled) {
      callback({msg: 'e_sync_server_na'});
      return;
    }

    // This timer acts as a lock to prevent concurrent calls to sync same store
    if (!this.syncTimer[name]) {
      var timeoutId = setTimeout(function() {
        const syncTimeoutId = setTimeout(function() {
          // Don't remove if it was removed already
          if (self.syncTimer[name] === timeoutId) {
            // Report error and remove lock
            DBG && console.error('Removing store\'s lock after timeout:', name);
            self.syncTimer[name] = 0;
          }
        }, 120 * 1000);

        self._syncStore(store, function(err, res) {
          // Clear lock's timeout check
          clearTimeout(syncTimeoutId);
          // Remove sync lock
          self.syncTimer[name] = 0;
          if (err) {
            DBG && console.error('Sync failed', err);
          }
          callback(err);
        });
      }, options.delay);

      // Set lock that will be removed after sync completes
      this.syncTimer[name] = timeoutId;
    } else {
      // Sync again after old call has completed?
      self.once(name + ':sync', function (err, res) {
        if (err) {
          callback(err);
        } else {
          self.syncStore(store, options, callback);
        }
      });
    }
  },
  _syncStore: promisifyOrCallback(function(store, callback) {
    // console.log('_syncStore:', store.name);
    SyncMan.trigger(store.name+':sync:init');
    async.series({
      del: function(callback) {
        SyncMan.del(store, callback);
      },
      get: function(callback, force=false) {
        (store.sync.pull || force) ? SyncMan.get(store, callback) : callback();
      },
      put: function(callback) {
        SyncMan.put(store, callback);
      },
      post: function(callback) {
        SyncMan.post(store, callback);
      },
    }, function(err, res) {
      callback(err, res);
      SyncMan.trigger(store.name+':sync', err, res);
    });
  }),
});
;
const ActionEmail = {
  send: function(action, context, callback) {
    // console.log('ActionEmail:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/email', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          emailContent: context.html,
          hasDiff: true,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionPush = {
  send: function(action, context, callback) {
    // console.log('ActionPush action, context);

    if (auth.getToken()) {
      api('/agents/actions/push', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionSMS = {
  send: function(action, context, callback) {
    // console.log('ActionEmail:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/sms', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionWebhook = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/webhook', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'tags', 'ts', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'data', 'ts', ),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionTab = {
  open: function(action, context, callback) {
    // console.log('ActionOpenTab:', action, context);

    chrome.tabs.create({
      active: true,
      url: context.sieve.uri,
    });
  },
};

// Slack Action
const ActionSlack = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/slack', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'content_type'),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          content: context.html,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

// Discord Action
const ActionDiscord = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/discord', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'content_type'),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          content: context.html,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

// Teams Action
const ActionTeams = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/teams', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'content_type'),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          content: context.html,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};


// Macro Action
const ActionMacro = {
  log: async function (doc) {
    const res = await api('/agents/actions/macro/log', 'POST', doc)
  },
  run: async function (action, context, callback) {
    if (!auth.getToken()) {
      return callback({code: 'EAUTH', msg: 'Login to take this action'});
    }

    try {
      const usageLeft = await api('/users/usage-left/action_macro', 'GET')
      if (usageLeft?.action_macro <= 0) {
        return callback({
          // server also responds with 503
          code: 503,
          msg: 'e_quota'
        })
      }

      const pageContext = new PageContext({
        pageProperties: {
          loaderProperties: {
            pinned: false,
            active: true,
          },
          closeLoadersOnClose: false,
        }
      });
      pageContext.setMacroId(action.config.macro_id);
      let macroErr = null
      try {
        await pageContext.run_macro(context.sieve, action.config.params)
      } catch (e) {
        DBG && console.log('ActionMacro', 'run', e)
        macroErr = e;
      }

      await this.log({
        error: macroErr, sieve_id: context.sieve.id, sieve_data_id: context.sieve_data.id, sieve_action_id: action?.id,
      })
      pageContext._close()
      callback()
    } catch (e) {
      console.error('cannot run the macro action', action.config.macro_id, e)
      callback()
    }
  },
};
;

/* 1
 * Feed parser
 * Parses raw XML feeds and converts them to so called Item objects (see below).
 * By qFox, 2010, http://qfox.nl
 */

window.Feed = {
  domParser: new DOMParser(),

  /**
   * Detect the type of the feed and let type specific functions
   * parse the feed. The result is an array containing FeedItem
   * objects representing the items from the feed.
   * @param XML xml The actual feed, as an XML tree
   * @param string name Name of the feed, passed on to plugins
   * @param string group Name of group of the feed, passed on to plugins
   * @return array Contains Item objects
   */
  parse: function(xml, name, group) {
    let root; let result;

    // rss 1.0 ("rdf")
    if (xml.getElementsByTagName('rdf:RDF').length || xml.getElementsByTagName('RDF').length) {
      return Feed.parseRss1(xml, name, group);
    }

    // rss (2.0)
    if ((root = xml.getElementsByTagName('rss')) && root.length) { // RSS feed
      const version = root[0].getAttribute('version');
      if (version === '2.0') { // rss 2.0
        return Feed.parseRss2(root[0], name, group);
      }
      if (version === '0.91' || version === '0.92') { // rss 0.91 or 0.92
        return Feed.parseRss091(root[0], name, group);
      }
      throw new Error(' unknown rss version...');
    }

    // atom
    if (xml.getElementsByTagName('feed').length) {
      return Feed.parseAtom(xml, name, group);
    }

    throw new Error('unsupported feed');
    return false;
  },

  /**
   * Retrieve the node value for given attribute or an empty string on failure.
   * When the third parameter is given, it returns that attribute value of the node.
   * @param xml root The root node to search through
   * @param string name The node name we're looking for
   * @param string attr=false If given, the attribute of node we want returned
   * @return mixed
   */
  getNodeValue: function(root, name, attr) {
    try {
      const node = root.getElementsByTagName(name)[0];
      if (attr) {
        return node.getAttribute(attr);
      }

      return node.textContent ? Feed.sanitize(node.textContent) : '';
    } catch (er) {
      return '';
    }
  },

  sanitize: function(text) {
    if (!/<\w.*>/.test(text)) return text;

    const doc = Feed.domParser.parseFromString(text, 'text/html');

    if (!doc || !doc.body) {
      return text;
    }

    const kachra = doc && doc.querySelectorAll(
      'script,link[as=script],noscript,frame,iframe,object'
    );

    _.toArray(kachra).forEach(el => el.remove());

    // Clean on* attributes for all elements
    Feed.sanitizeAttributes(doc.documentElement);

    return doc.documentElement.outerHTML;
  },

  sanitizeAttributes: function(el) {
    const attrs = _.toArray(el.attributes);

    _.each(attrs, function(attr) {
      if (attr.nodeName.startsWith('on')) {
        el.removeAttribute(attr);
      } else if (attr.value.toLowerCase().split(':')[0] == 'javascript') {
        el.removeAttribute(attr);
      }
    });

    _.each(el.childNodes, Feed.sanitizeAttributes);
  },

  /**
   * Parse a RSS 1.0 feed
   * Returns an array with FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss1: function(xmlRoot, name, group) {
    const
      result = [];


    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item');


    let item;


    let i;

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // throw new Error("Parsing item "+i+" ("+item+")");
      // title, link, description dc:creator, dc:date, dc:subject
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Unable to parse item '+i+': '+er.message);
      }
    }
    // return the items
    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse an RSS 2.0 feed
   * Returns an array containing FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss2: function(xmlRoot, name, group) {
    let
      i;


    const result = [];


    let item;
    // one

    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item'); // collection of  nodes

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // now add the FeedItem
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Feed.parseRss2 fail for '+i+' '+j+' ('+er.message+')');
      }
    }

    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse a RSS 0.91 feed
   * Returns an array with FeedItem objects
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss091: function(xmlRoot, name, group) {
    let
      i;


    const result = [];


    let item;
    // single  FeedItem

    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item'); // get items for this feed

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // now add the FeedItem
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Feed.parseRss2 fail for '+i+' ('+er.message+')');
      }
    }

    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse an Atom feed
   * Returns an array with FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseAtom: function(xmlRoot, name, group) {
    const
      result = [];


    let i;


    let item;
    // one  FeedItem

    let aUri;


    const rootEl = xmlRoot.getElementsByTagName('feed')[0];


    const baseUri = rootEl.getAttribute('xml:base');


    const items = xmlRoot.getElementsByTagName('entry');

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // title, link, summary, pubdate
      try {
        aUri = Feed.getNodeValue(item, 'link', 'href');
        if (baseUri && aUri && aUri.indexOf(':') < 0) {
          aUri = baseUri + aUri;
        }

        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'summary') || Feed.getNodeValue(item, 'content'),
          aUri,
          Feed.getNodeValue(item, 'published') || Feed.getNodeValue(item, 'updated') || '',
          item
        );
      } catch (er) {
        throw new Error('Unable to parse item '+i+': '+er.message);
      }
    }

    return {
      title: Feed.getNodeValue(rootEl, 'title'),
      link: Feed.getNodeValue(rootEl, 'link', 'href'),
      summary: Feed.getNodeValue(rootEl, 'description'),
      pubdate: Feed.getNodeValue(rootEl, 'published') || Feed.getNodeValue(rootEl, 'updated') || '',
      entries: result,
    };
  },
  // ext only, will be overridden by electron
  fetch: function(url, request, callback) {
    let requestTimeout = 0;
    if (request) {
      requestTimeout = (request.timeout ?? 30) * 1000;
    }
    let headers = {'X-Moz': 'livebookmarks'};
    // we get the headers as array of arrays
    // eg: [["header1", "value1"], ["header2", "value2"]];
    _.each(request.headers, (header) => {
      headers[header[0]] = header[1];
    })
    const xhr = HTTP.get({
      url: url,
      headers,
      timeout: requestTimeout
    }, function(err, xhrObj) {
      if (err) {
        console.error('error getting feed from: ' + url);
        callback(err);
      } else {
        let response = xhrObj.response;
        if (response.nodeType === Node.DOCUMENT_NODE) {
          Feed.fromXML(response, callback);
        } else {
          // Default to a string type. If we have a JSON, callback.
          Feed.fromString(response, callback);
        }
      }
    });
  },

  // calls callback with the retrieved result
  fromString: promisifyOrCallback(function(text, url, callback) {
    if (typeof url == 'function') {
      callback = url;
      url = '';
    }
    const
      parser = new DOMParser();


    const doc = parser.parseFromString(text, 'application/xml');

    Feed.fromXML(doc, callback);
  }),

  fromXML: function(doc, callback) {
    if (doc) {
      callback(null, Feed.parse(doc));
    } else {
      callback(ERR.PARAM_INVALID({param: 'feed', value: 'EMPTY'}));
    }
  },

  getText: function(feed) {
    const buf = [feed.title];

    feed.entries.forEach(function(entry, index) {
      buf.push(entry.title);
      if (/<\w.*>/.test(entry.summary)) {
        buf.push(Feed.domParser.parseFromString(entry.summary, 'text/html').documentElement.textContent);
      } else {
        buf.push(entry.summary);
      }
    });

    return buf.join(' \n');
  },

};

function FeedItem(title, summary, url, date, dom) {
  return {
    title: title, // string
    link: url, // string
    summary: summary, // string (not sanatized)
    pubdate: date, // timestamp (as found in the feed...)
  };
}

;
window.Xml = {
  xmlSerializer: new XMLSerializer(),
  domParser: new DOMParser(),
  fetch: async function (uri, request) {
    if (!request) {
      request = {};
    }
    request.timeout = (request.timeout ?? 30) * 1000;
    try {
      const res = await datasources.fetchData({ type: 'text', fetchOpts: { uri, request } });
      if (res.status !== 200) {
        throw new Error(`Request failed with status code - ${res.status}`);
      }
      const contentType = res.headers['content-type'];
      if (!contentType.match(/.+\/(.+\+)?xml/)) {
        throw new Error(`Invalid content type: ${contentType}. Expected XML Format`);
      }
      return { ...res, response: res.text };
    } catch (e) {
      throw new Err.EREQUEST({
        message: e.message,
        url: uri,
      });
    }
  },
  toString: function (xmlDoc) {
    return Xml.xmlSerializer.serializeToString(xmlDoc);
  },
  parse: function (xmlText) {
    return Xml.domParser.parseFromString(xmlText, 'application/xml');
  },
  // ext only, will be overridden by electron
  filter: function (xmlText, selector) {
    const includes = selector?.includes;

    if (!includes || includes.length == 0) {
      return xmlText;
    }

    const xmlDoc = Xml.parse(xmlText);
    let matches = [];
    includes.forEach((include) => {
      if (include.type === 'xpath') {
        const xpathRes = xmlDoc.evaluate(include.expr, xmlDoc, null, XPathResult.ANY_TYPE, null);
        // First iterateNext returns the first nod in the result
        let iteratedNode = xpathRes.iterateNext();
        while (iteratedNode !== null) {
          matches.push(iteratedNode);
          iteratedNode = xpathRes.iterateNext();
        }
      }
    });
    xmlDoc.documentElement.setAttribute('__hasincl', '1');
    let parent;
    matches.forEach((node) => {
      node.setAttribute('__incl', '1');
      parent = node.parentElement;
      while (parent && parent !== xmlDoc.documentElement && !parent.getAttribute('__hasincl')) {
        parent.setAttribute('__hasincl', '1');
        parent = parent.parentElement;
      }
    });

    Xml.removeExcluded(xmlDoc.documentElement, matches);
    // when root element has both __incl and __hasincl attribute, __hasincl is not removed
    xmlDoc.documentElement.removeAttribute('__hasincl');

    return Xml.serializeXmlDocument(xmlDoc);
  },
  removeExcluded: function (el) {
    let attrIncl = el.getAttribute('__incl');
    let attrHasI = el.getAttribute('__hasincl');

    if (attrIncl) {
      el.removeAttribute('__incl');
    } else if (attrHasI) {
      el.removeAttribute('__hasincl');
      let children = el.children;
      Array.from(children).forEach((childEl) => {
        Xml.removeExcluded(childEl);
      });
    } else {
      el.remove();
    }
  },
  serializeXmlDocument: function (xmlDoc) {
    function serializeNode(node, level = 0) {
      let result = '';
      const indent = '\n' + '  '.repeat(level);

      // Handle different types of nodes
      switch (node.nodeType) {
        case Node.DOCUMENT_NODE:
          if (node.xmlVersion) {
            result += `<?xml version="${node.xmlVersion}"`;
            if (node.xmlEncoding) {
              result += ` encoding="${node.xmlEncoding}"`;
            }
            result += '?>';
          }

          // Handle DOCTYPE
          if (node.doctype) {
            result += '\n' + serializeNode(node.doctype);
          }

          // Handle root element
          result += serializeNode(node.documentElement, 0);
          break;

        case Node.DOCUMENT_TYPE_NODE:
          result += `<!DOCTYPE ${node.name}`;
          if (node.publicId) {
            result += ` PUBLIC "${node.publicId}" "${node.systemId}"`;
          } else if (node.systemId) {
            result += ` SYSTEM "${node.systemId}"`;
          }
          result += '>';
          break;

        case Node.ELEMENT_NODE:
          result += `${indent}<${node.nodeName}`;

          if (node.attributes) {
            for (let i = 0; i < node.attributes.length; i++) {
              result += ` ${node.attributes[i].name}="${node.attributes[i].value}"`;
            }
          }

          // Handle child nodes or self-closing tags
          if (node.childNodes.length === 0) {
            result += ' />';
          } else {
            result += '>';
            let hasElementChild = false;

            // Process child nodes
            node.childNodes.forEach((child) => {
              if (child.nodeType === Node.ELEMENT_NODE) {
                result += serializeNode(child, level + 1);
                hasElementChild = true;
              } else if (child.nodeType === Node.TEXT_NODE) {
                const textContent = child.nodeValue.trim();
                if (textContent) {
                  result += textContent;
                }
              } else if (child.nodeType === Node.CDATA_SECTION_NODE) {
                result += `${indent}<![CDATA[${child.nodeValue}]]>`;
              } else if (child.nodeType === Node.COMMENT_NODE) {
                result += `${indent}<!--${child.nodeValue}-->`;
              }
            });

            if (hasElementChild) {
              result += `${indent}</${node.nodeName}>`;
            } else {
              result += `</${node.nodeName}>`;
            }
          }
          break;

        case Node.COMMENT_NODE:
          result += `${indent}<!--${node.nodeValue}-->`;
          break;

        case Node.CDATA_SECTION_NODE:
          result += `${indent}<![CDATA[${child.nodeValue}]]>`;
          break;

        default:
          break;
      }

      return result;
    }
    return serializeNode(xmlDoc).trim();
  }

};
;
class BrowserWrapper {
  pageContext;
  pageLoader;
  /**
   * @type { number }
   */
  stepCount;

  /**
   * @type {number}
   */
  lastInitEventStep;

  constructor(pageContext, pageLoader) {
    this.pageContext = pageContext;
    this.pageLoader = pageLoader;
    this.stepCount = 0;
    // store the step count at which root init event was triggered
    this.pageLoader.on('port:root:init', () => {
      this.lastInitEventStep = this.stepCount;
    });
    let methods = ['click', 'waitForDoc', 'select', 'keypress', 'mousemove', 'drag', 'focus', 'type', 'scroll', 'open'];
    methods.forEach(method => {
      let originalMethod = this[method];
      this[method] = async function(...args) {
        this.stepCount++;
        await originalMethod.call(this, ...args);
      }
    });
  }

  async init () {
    // Dummy method. Serves no purpose for extension
    // Implemented to make code uniform
  }

  async _frame_request(type, data){
    return await this.pageContext.frame_request({
      id: this.pageLoader.id,
      frame: 0,
      input: {
        path: 'performStep',
        data: {
          type,
          data: JSON.stringify(data)
        }
      }
    });
  }

  async click(selector, pos, opts) {
    await this._frame_request('api_click', {selector, pos, opts})
  }

  async waitForDoc(opts) {
    let timeout = (opts?.timeout ?? 30) * 1000;
    let resolveWaitingState;
    const waitComplete = new Promise(resolve => {
      resolveWaitingState = resolve;
    });
    this.pageLoader.on('port:root:init', resolveWaitingState)
    if (this.lastInitEventStep >= (this.stepCount - 1)) {
      return;
    }
    await Promise.race([
      waitComplete,
      throwAfterNMillis(timeout)
    ])
  }

  /*
  * used to wait for redirects
  * throwing won't affect the expression run
  * For usage refer: expression-libs/src/common/types.ts waitForDoc
  */
  async waitForDocumentRequest(opts) {
    // TODO: implement after wait doc is fixed
    throw new Error('Not Implemented');
  }

  async evalOnSelector(selector, func, arg, opts){
    // TODO implement after eval is allowed 
    return;
  }

  async select(selector, value, opts) {
    await this._frame_request('api_select', {selector, value, opts})
  }

  async keypress(_code, _count, _opts){
    throw new Error('keypress not allowed in extension')
  }

  async mousemove(selector, pos, opts){
    await this._frame_request('api_mousemove', {selector, pos, opts});
  }

  async drag(_selector, _pos, _targetSelector, _targetPos, _opts){
    throw new Error('drag not implemented in extension');
  }

  async fill(selector, value, opts){
    await this._frame_request('api_type', {selector, value, opts})
  }

  async focus(selector, opts){
    await this._frame_request('api_focus', {selector, opts});
  }

  async type(selector, value, opts){
    await this._frame_request('api_type', {selector, value, opts})
  }

  async scroll(selector, left, top, opts) {
    throw new Error('Scroll is not supported in extension. Use a desktop or cloud monitor instead.')
  }

  async open(url, opts){
    await this._frame_request('api_open', {url, opts});
    await this.waitForDoc();
  }

  async getElementsCount(selector, opts){
    return await this._frame_request('api_get_elements_count', {selector, opts})
  }

  async getElementText(selector, opts){
    return await this._frame_request('api_get_element_text', {selector, opts})
  }

  async getSelectors(selector, opts) {
    return await this._frame_request('api_get_elements', {selector, opts})
  }
}

function toMacroFormat(steps) {
  return steps.map(step=>{
    let type = step.type.toLowerCase();
    switch (type){
      case 'click':
        return [
          type,
          ['selector', step.data.selector],
          step.data.pos,
          {frame: step.frame || 0}
        ]
      case 'wait_doc':
        return [
          type,
          {frame: step.frame || 0}
        ]
      case 'select':
        return [
          type,
          ['selector', step.data.selector],
          step.data.value,
          {frame: step.frame || 0}
        ]
      case 'keypress':
        return [
          type,
          step.data.code,
          step.data.count,
          {page: step.page || -1}
        ]
      case 'mousemove':
        return [
          type,
          ['selector', step.data.selector],
          step.data.pos,
          {frame: step.frame || 0}
        ]
      case 'drag':
        return [
          type,
          ['selector', step.data.start.selector],
          step.data.start.pos,
          ['selector', step.data.end.selector],
          step.data.end.pos,
          {frame: step.frame || 0}
        ]
      case 'focus':
        return [
          type,
          ['selector', step.data.selector],
          {frame: step.frame || 0}
        ]
      case 'type':
        return [
          type,
          ['selector', step.data.selector],
          step.data.value,
          {frame: step.frame || 0}
        ]
      case 'scroll':
        return [
          type,
          ['selector', step.data.selector],
          step.data.left,
          step.data.top,
          {frame: step.frame || 0}
        ]
      case 'wait_for_duration':
        return [
          type,
          step.data.duration
        ]
      case 'wait_for_element':
        return [
          type,
          ['selector', step.data.selector],
          {frame: step.frame || 0}
        ]
      case 'open':
        return [
          type,
          step.data.url,
          {page: step.page || -1}
        ]
      case 'for':
      case 'while':
        return step.data;
      default:
        throw new Error('Unknown step type: ' + step.type)
    }
  })
}
;
const
MAX_RETRY_COUNT_ON_EMPTY_TEXT           = 4,
MAX_RETRY_COUNT_ON_EMPTY_TEXT_FOR_HTML  = 1,
RETRY_DELAY_ON_EMPTY_TEXT               = 5,    // in sec
DEFAULT_TIMEOUT                         = 60;    // in sec

const datasource_id_type_map = {
  [C.DS_ID_JSON]: 'json',
  [C.DS_ID_UPTIME]: 'uptime',
  [C.DS_ID_TEXT]: 'text'
}

// TODO: use a better name for closeLoadersOnClose
function Runner(sieve, runnerOptions = {snapshot: false}, pageProperties = {loaderProperties: {pinned: true, active: false}, closeLoadersOnClose: true}) {
  let
  self          = this,
  startedOn     = Date.now(),
  type          = sieve.content_type,
  config        = sieve.config,
  context       = new PageContext({
    runnerOptions,
    pageProperties,
  });

  // Config is compared to sieve config before a new run
  // to abort old runs for same sieve (main.js -> willAbortAndCanRun)
  // We save non-mutated original (sieve's) config to runner
  this.originalConfig = JSON.parse(JSON.stringify(config));
  this.run = run;
  this.runnerOptions = runnerOptions;

  const contentTypesWithoutRequest = [C.TYPE_DOC, C.TYPE_HTML, C.TYPE_PDF_HTML];

  if (!contentTypesWithoutRequest.includes(type)) {
    if (!config.request) {
      config.request = {
        method: 'GET',
        headers: [],
        redirect: 'follow'
      };
    }
    const { timeout } = config.request;
    config.request.timeout = (timeout ?? DEFAULT_TIMEOUT);
  }

  function getMetrics() {
    var
    endedOn = Date.now();
    return {
      on: startedOn,
      duration: (endedOn - startedOn) / 1000 // milliseconds
    }
  }

  addBreadcrumb({
    message: `running sieve: ${sieve.id}`,
    data: _.pick(sieve, 'id', 'user_id', 'uri', 'client_id'),
  });

  function run(resultCallback) {
    switch (type) {
      case C.TYPE_HTML:
        context.run_html(sieve, config, runnerCallback);
        break;
      case C.TYPE_FEED:
        run_feed(runnerCallback);
        break;
      case C.TYPE_JSON:
        run_datasource(context, runnerCallback);
        break;
      case C.TYPE_XML:
        run_xml(runnerCallback);
        break;
      default:
        resultCallback(new Err.PARAM_INVALID({
          param: 'content_type',
          value: type
        }));
        break;
    }

    self.abort  = abort;

    // Call to abnormally interrupt execution. This could be done to reset it.
    function abort() {
      runnerCallback(new Err.ABORT({
        type: SieveStore.name,
        id: sieve.id
      }));
    }

    function runnerCallback(err, data) {
      //console.log('RUNNER:runnerCallback:', err, data, new Error().stack);

      let callback = resultCallback;
      resultCallback = null;

      try {
        context._close();
      } catch(e) {
        DBG && console.error('RUNNER: error closing context:', e);
      }

      context = null;
      self = this;

      try {
        callback && callback(err, data, getMetrics());
      } catch(e) {
        DBG && console.error('RUNNER: ERROR calling callback:', e);
        // Log this error to ErrorStore for user's review
        ErrorStore.create({
          context:  'runner',
          msg:      'Failed to call result callback after running job',
          data:     JSON.stringify(sieve),
          err:      JSON.stringify(new Err.UNHANDLED(e))
        });
      }
    }
  }

  async function run_xml(callback) {
    try {
      const { text } = await DOMUtils.Xml.fetch(sieve.uri, config.request);
      const filteredXml = await DOMUtils.Xml.filter(text, config.selection);
      return callback(null, {
        data_type: C.TYPE_XML,
        data: filteredXml,
        text: filteredXml
      });
    } catch (e) {
      DBG && console.error('Error while fetching XML ', e);
      return callback(e);
    }
  }

  function run_feed(callback) {
    DOMUtils.Feed.fetch(config.uri, config.request, async function(err, feed) {
      if (err) {
        callback(err);
      } else {
        try {
          let text = await DOMUtils.Feed.getText(feed);
          callback(null, {
            data_type: C.TYPE_FEED,
            data: JSON.stringify(feed),
            text
          });
        } catch (e) {
          callback(e);
        }
      }
    })
  }

  async function run_datasource(pageContext, callback) {
    const opts = { uri: sieve.uri, config };

    // run dynamic datasource;
    if (![C.DS_ID_JSON, C.DS_ID_UPTIME, C.DS_ID_TEXT].includes(sieve.datasource_id)) {
      const scrapeClient = new ScrapeClient({
        uri: sieve.uri,
        sieve_id: sieve.id,
        datasource_id: sieve.datasource_id,
        params: config.params,
        pageContext
      });
      try {
        const { scrape } = await scrapeClient.setup();
        const result = await scrape();
        // console.log('result ', result);
        return callback(null, {
          data_type: C.TYPE_JSON,
          data: JSON.stringify(result.data),
          text: JSON.stringify(result.data),
          snapshot: result.html,
          fullPageSnapshot: result.fullPageSnapshot
        });
      } catch (err) {
        DBG && console.error(err);
        return callback(err);
      }
    }

    if (!opts.config.request) {
      opts.config.request = {};
    }
    const { timeout } = opts.config.request;
    opts.config.request.timeout = (timeout ?? 30) * 1000;
    const { datasource_id } = sieve;
    try {
      let result = await datasources.fetchData({
        type: datasource_id_type_map[datasource_id],
        fetchOpts: opts
      })
      // console.log('ds:result:', result);
      if (config.filters) {
        result = datasources.applyFilters(result, config.filters.included);
        // console.log('ds:filtered result:', result);
      }
      return callback(null, {
        data_type: C.TYPE_JSON,
        data: JSON.stringify(result),
        text: JSON.stringify(result)
      });
    } catch (e) {
      DBG && console.error('error while fetching data', e);
      return callback(e);
    }
  }
}

// Opens a tab and runs a live monitor within the tab.
function LiveRunner(sieve) {
  var

  startedOn     = Date.now(),
  type          = sieve.content_type,
  config        = sieve.config,
  context       = new PageContext({});

  this.run    = run;

  function getMetrics() {
    var endedOn = Date.now();
    return {
      on: startedOn,
      duration: (endedOn - startedOn) / 1000 // milliseconds
    }
  }

  function run(resultCallback) {
    switch(type) {
      case C.TYPE_HTML:
        context.run_live_html(sieve, config, runnerCallback);
        break;

      default:
        resultCallback(new Err.PARAM_INVALID({
          param: 'content_type',
          value: type
        }));
        break;
    }

    this.abort = abort;

    // Call to abnormally interrupt execution. This could be done to reset it.
    function abort() {
      try {
        context._close();
      } catch(e) {
        DBG && console.error('RUNNER: error closing context:', e);
      }

      context = null;
      self = null;

      runnerCallback(new Err.ABORT({
        type: SieveStore.name,
        id: sieve.id
      }));
    }

    function runnerCallback(err, data) {
      //console.log('RUNNER:runnerCallback:', err, data, new Error().stack);

      try {
        resultCallback(err, data, getMetrics());
      } catch(e) {
        // This should be extremely rare
        DBG && console.error('RUNNER: ERROR calling callback:', e);
        // Log this error to ErrorStore for user's review
        ErrorStore.create({
          context: 'runner',
          msg: 'Failed to call result callback after running job',
          data: JSON.stringify(sieve),
          err: JSON.stringify(new Err.UNHANDLED(e))
        });
      }
    }
  }
}

class ScrapeClient {
  uri;
  sieve_id;
  datasource_id;
  params;
  /**
   * @type {TabLoader}
   */
  pageLoader;
  /**
   * @type {PageContext}
   */
  pageContext;

  /**
   * @type {Boolean} - if false and first step is wait_doc replaces it with 'or' i.e. no op
   */
  createNewTab;

  constructor({ uri, sieve_id, datasource_id, params, pageContext, pageLoader }) {
    this.uri = uri;
    this.sieve_id = sieve_id;
    this.datasource_id = datasource_id;
    this.params = params;
    this.pageContext = pageContext;
    this.pageLoader = pageLoader;
    this.createNewTab = !this.pageLoader;
  }

  async fetchDatasourceAndWorkflow() {
    const datasourceId = this.datasource_id;
    let datasource = await DatasourceStore.findOneByIdWithSync({ id: datasourceId });

    const workflowId = datasource.datasource_params.workflow_id;
    let workflow = await WorkflowStore.findOneByIdWithSync({ id: workflowId, state: 40 }, { force: true });
    if (!workflow) {
      DBG && console.error('could not find workflow for the sieve ', { workflowId, datasourceId });
      const err = new Err.NOT_FOUND({
        type: 'Workflow',
        id: workflowId,
        datasource_id: datasourceId
      });
      Sentry.captureException(err);
      throw err;
    }

    const minutesSinceLastFetch = (new Date() - new Date(workflow._ts_fetch)) / (60 * 1000);
    // if less than 15 minutes have passed since last fetch use the same workflow
    if (minutesSinceLastFetch <= 15) {
      return { datasource, workflow };
    }

    let forceFetchWorkflow = false;
    // if scraper is run on demand it won't have an id
    let errorPercentage = 0;
    if (this.sieve_id) {
      const { data: lastFiveWorks, count } = await WorkStore.find(
        { rel: SieveStore.name, key: this.sieve_id },
        { order: ['-ts'], limit: 5 }
      );
      // if less than 5 runs occurred return workflow
      if (count < 5) {
        return { datasource, workflow };
      }
      let errorCount = 0;
      for (const work of lastFiveWorks) {
        if (work.err) {
          errorCount += 1;
        }
      }
      errorPercentage = (errorCount / count) * 100;
      if (errorPercentage > 40) {
        forceFetchWorkflow = true;
      }
    }

    if (minutesSinceLastFetch > 60) {
      forceFetchWorkflow = true;
    }

    /* Refetch datasource and workflow if -
       - Error % greater than 40 and it has been > 15 mins since last fetch (implicit as minutesSinceLastFetch <=15 check failed)
       - More than 1 hour since last fetch
    */
    if (!forceFetchWorkflow) {
      return { datasource, workflow };
    } else {
      DBG &&
        console.log(
          `Refetch workflow ${workflowId}: ${errorPercentage > 40 ? 'error% > 40' : 'minutes since last fetch > 60'}`
        );
      datasource = await DatasourceStore.findOneByIdWithSync({ id: datasourceId }, { force: true });
      workflow = await WorkflowStore.findOneByIdWithSync(
        { id: datasource.datasource_params.workflow_id, state: 40 },
        { force: true }
      );
      if (workflow) {
        return { datasource, workflow };
      } else {
        DBG &&
          console.error('Refetch: could not find workflow for the sieve ', {
            workflowId,
            datasourceId
          });
        const err = new Err.NOT_FOUND({
          type: 'Workflow',
          id: workflowId,
          datasource_id: datasourceId
        });
        Sentry.captureException(err);
        throw err;
      }
    }
  }

  createPlayer(workflow, browserWrapper) {
    const { parseSteps, Player } = xlibs.workflow;
    const { steps, tags, params_spec } = workflow;
    const expressionTree = parseSteps(
      steps,
      tags.map((t) => t.name),
      {
        declarations: params_spec
      }
    );
    const vars = xlibs.common.getExpressionVars({ params: params_spec }, this.params);
    vars.push({ name: 'start_url', dataType: 'string', value: this.uri });
    return new Player(expressionTree, browserWrapper, tags, { vars });
  }

  async createBrowserWrapper(pageLoader) {
    const browserWrapper = new BrowserWrapper(this.pageContext, pageLoader);
    try {
      await browserWrapper.init();
    } catch (err) {
      DBG && console.log('Error init browserWrapper', err);
      throw err;
    }
    return browserWrapper;
  }

  async setup() {
    const { datasource, workflow } = await this.fetchDatasourceAndWorkflow();
    // console.log("Workflow ", workflow);
    const schema = xlibs.extractorBG.parseSchema(workflow.schema);
    // create pageLoader
    // pageFunc creates schema object on the content side
    const pageFuncs = [
      {
        path: 'extractor',
        data: {
          type: 'parseSchema',
          arg: JSON.parse(JSON.stringify(schema))
        }
      }
    ];
    if (this.createNewTab) {
      this.pageLoader = await this.pageContext.page_new({
        type: 'tab',
        pageFuncs
      });
    } else {
      this.pageLoader.pageFuncs = pageFuncs;
      for (const { path, data } of pageFuncs) {
        this.pageContext.frame_request({
          id: this.pageLoader.id,
          frame: 0,
          input: {
            path,
            data
          }
        });
      }
    }
    const browserWrapper = await this.createBrowserWrapper(this.pageLoader);
    const player = this.createPlayer(workflow, browserWrapper);
    const scraper = new Scraper(player, schema, browserWrapper);
    // TODO: get validators and add them before running
    player.vm.addHook(scraper.playerHook.bind(scraper));
    return {
      player,
      scrape: async () => {
        // load uri but don't wait as wait_doc should wait for page load
        this.pageContext.page_load({ id: this.pageLoader.id, uri: this.uri }).catch((err) => {
          player.interrupt(err);
        });
        let result;
        try {
          await player.play();
          result = { data: scraper.schema.getData(), html: await scraper.getHTML() };
        } catch (err) {
          const { StackedError } = xlibs.types;
          // add workflow and datasource stack lines
          err = StackedError.handle(err, 'workflow', {
            name: workflow.name,
            id: workflow.id,
            version: workflow.version
          });
          throw StackedError.handle(err, 'datasource', {
            name: workflow.name,
            id: workflow.id,
            version: workflow.version
          });
        }
        try {
          // save first snapshot
          if (this.pageContext.options.runnerOptions.snapshot) {
            result.fullPageSnapshot = await this.pageContext._page_snapshot(this.pageLoader);
          }
        } catch (e) {
          DBG && console.error('error while taking snapshot', e);
        }
        return result;
      }
    };
  }
}

class MacroPlayerClient {

  /**
   * @type {string}
   */
  macroId

  /**
   * @type {string}
   */
  uri

  /**
   * @type {PageContext}
   */
  pageContext

  pageLoader

  /**
   * @param {PageContext} pageContext
   * @param {string} macroId
   * @param {string} uri
   * @param {{
   *   showMessage: boolean
   * }} options
   */
  constructor(pageContext, pageLoader, macroId, uri, params, options = {showMessage: false}) {
    this.pageContext = pageContext
    this.pageLoader = pageLoader
    this.macroId = macroId
    this.uri = uri;
    this.options = options
    this.params = params
  }

  async _showMessage(message = '', hideAfter = null) {
    const prefix = 'Macro' + (message.length > 0 ? ": " : "")
    await this.pageLoader.request(0, {
      path: 'showMsg',
      data: {msg: prefix + message, hideAfter, showLogo: true},
    });
  }

  async _removeMessage() {
    await this.pageLoader.request(0, {
      path: 'removeMsg',
      data: {},
    });
  }

  async _fetchMacro() {
    const macro = await MacroStore.findOne({id: this.macroId})
    if (macro) {
      return macro
    }
    DBG && console.error("cannot find the macro for sieve", this.macroId)
    throw new Err.NOT_FOUND({
      type: "Macro",
      id: this.macroId
    })
  }

  async play() {
    const macro = await this._fetchMacro()
    let steps = macro.steps;

    DBG && console.log('macro version', macro.version);

    DBG && console.log('expressions version', xlibs.expressions.VERSION);
    if (macro.version > xlibs.expressions.VERSION) {
      throw {
        code: 'EMACROVER',
        msg: 'This macro was created with a newer version of the recorder. Please update the app to the latest version to use this macro.',
      }
    }

    // Until the macros v2 feature is rolled out in web,
    // we will not have version in macros. So it is imperative to check if version exists.
    if (!macro.version || macro.version === 1) {
      steps = toMacroFormat(steps);
    }

    DBG && console.log('play:steps:', steps);
    
    let vars;
    if (macro.spec) {
      try {
        vars = xlibs.common.getExpressionVars(macro.spec, this.params);
      } catch (error) {
        if (this.options.showMessage) {
          await this._showMessage(error);
        }
        throw error;
      }
    }


    const browserWrapper = new BrowserWrapper(this.pageContext, this.pageLoader);
    try {
      await browserWrapper.init();
    } catch (err) {
      DBG && console.log("Error init browserWrapper", err);
      throw err;
    }
    this.player = new xlibs.macro.Player(steps, browserWrapper, {vars});
    let stepCount = 0;
    this.player.on('statusChange', async ({ step }) => {
      stepCount += 1;
      // statusChange is emitted before a step is executed
      // first step wait_doc will error out as content script is not executed at that time, so the port won't be found
      if (this.options.showMessage) {
        try {
          await this._showMessage(`Step [${stepCount}] ${step.name}`);
        } catch (err) {
          DBG && console.error(err);
        }
      }
      DBG && step && console.log(`step: , ${JSON.stringify(step.toJSON())}`);
      await wait(1000);  // TODO wait only before actions, not before effects
    });
    try {
      this.pageContext.page_load({
        id: this.pageLoader.id,
        uri: this.uri
      }).catch(err => this.player.interrupt(err));

      if (this.options.showMessage) {
        this.pageLoader.once('port:root:init', () => {
          this._showMessage('Starting playback')
        });
      }
      await this.player.play()
    } catch (error) {
      DBG && console.error("macro playback failed", error)
      const lastPlayedStep =  error.stackEx.at(-1).node;
      let step, errorMessage;
      if (lastPlayedStep) {
        errorMessage = `Macro playback failed at step: ${lastPlayedStep.title}.\n${error.message}`
        const path = lastPlayedStep.path();
        step = { type: lastPlayedStep.type, path, data: JSON.stringify(lastPlayedStep) }
      } else {
        errorMessage = `Macro playback failed\n${error.message}`;
      }
      this.options.showMessage && await this._showMessage(errorMessage)
      const {outerHTML} = await this.pageContext._page_snapshot(this.pageLoader)
      throw {
        ...(error?.toJSON() ?? {}),
        code: error.code || 'EMACRO',
        message: errorMessage,
        step,
        snapshot: {
          content: outerHTML,
          uri: this.pageLoader.rootPort.uri
        },
      };
    }
    await wait(1000); // wait for other changes to take effect
    DBG && console.log('play done');
    this.options.showMessage && await this._showMessage('Completed')
  }
}

class PageContext extends BBEvent {

  static http_request = HTTP.request;

  /**
   * @param {{
   * pageMods: any,
   * runnerOptions: {
   *   snapshot: boolean
   * },
   * pageProperties: {
   *    loaderProperties: {
   *      pinned: boolean,
   *      active: boolean,
   *    },
   *    closeLoadersOnClose: boolean
   * }
   * }} options
   */
  constructor(options = {}) {
    super();
    this.options = _.defaults(options, {
      runnerOptions: {
        snapshot: false
      },
      pageProperties: {
        loaderProperties: {
          pinned: true,
          active: false,
        },
        closeLoadersOnClose: true
      }
    });
    this.pageMods = options.pageMods;
    this.pages = [];

    /**
     * contains the tabs that may get created while the macro is running.
     * This array does not contain the first tab which the page context opens
     * using the _page_load method.
     */
    this.tabs = [];

    this.macroId = undefined

    this.onTabCreatedL = (tab) => {
      this.onTabCreated(tab)
    }
    // this.addTabListener()
  }

  setMacroId(macro_id) {
    this.macroId = macro_id
  }

  addTabListener() {
    chrome.tabs.onCreated.addListener(this.onTabCreatedL)
  }

  removeTabListener() {
    chrome.tabs.onCreated.removeListener(this.onTabCreatedL)
  }

  /**
   * @param {{
   * openerTabId: number,
   * id: number,
   * groupId: number
   * }} tab
   */
  onTabCreated(tab) {
    const parentTab = (this.pages || []).find(t => {
      // TODO: add support for the openerTabID in electron
      return t.tabId === tab.openerTabId
    })
    if (!parentTab) {
      return
    }

    this.tabs.push(tab)
  }

  /**
   * @param {WebpageLoader} loader
   */
  _addLoader(loader) {
    this.pages.push(loader);
  }

  async run_html(sieve, config, runCallback) {
    if(!config.selections || config.selections.length === 0) {
      config.selections = [{dynamic: false}];
    }

    const macroId = this.macroId || sieve.macro_id

    const result= {
      data_type: C.TYPE_HTML,
      /* data and text modified after filter-ing each frame*/
      data: '',
      text: ''
    },
    timeout = config.timeout || DEFAULT_TIMEOUT; // in sec

    // TODO: can a macro take > 60 secs to execute
    const timeoutId = setTimeout(function() {
      runCallback(new Err.TIMEOUT({
        type: 'Loading page',
        time: timeout
      }));

      // override so that we don't call back again accidentally
      runCallback = function(err, data){
        DBG && console.error('runCallback called after TIMEOUT', err, data);
      };
    }, timeout*1000);

    try {
      // config.selections: [pages: [frames: { index, includes, excludes}]]
      let pageSelection = config.selections[0]; // TODO remove support for list
      if (!pageSelection) {
        pageSelection = {dynamic: false};
      }
      pageSelection.uri || (pageSelection.uri = sieve.uri);
      if (!pageSelection.frames || pageSelection.frames.length === 0) {
        pageSelection.frames = [{
          index: 0,
          includes: [{type: 'css', expr: 'body'}],
          excludes: []
        }];
      }
      pageSelection.frames.forEach(fr => {
        // XXX some selectors create index as string - convert to int
        if(typeof fr.index == 'string') {
          fr.index = parseInt(fr.index);
        }
      });
      if (config.incognito) {
        this.options.incognito = config.incognito;
      }
      let page;
      if (!macroId) {
        // create tab and load uri
        page = await this._page_load(pageSelection);
      } else {
        // create tab
        page = await this.page_new({
          type: 'tab'
        });
        this.macroPlayerClient = new MacroPlayerClient(this, page, macroId, sieve.uri, config.params)
        // uri will be loaded by play
        await this.macroPlayerClient.play()
      }

      try {
        if (this.options.runnerOptions.snapshot) {
          result.fullPageSnapshot = await this._page_snapshot(page)
        }
      } catch (e) {
        DBG && console.error('error while taking snapshot', e)
      }
      // TODO: there are too may args, only one is enough for config and the page selection
      await this.filter(sieve, config, pageSelection, page, result, runCallback)
    } catch(e) {
      runCallback(e);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async run_macro(sieve, params) {
    const macroId = this.macroId || sieve.macro_id

    const timeout = DEFAULT_TIMEOUT; // in sec

    const cancellablePromise = new CancellableTimeoutPromise(timeout * 1000, new Err.TIMEOUT({
      type: 'Macro',
      time: timeout
    }))

    // TODO: can a macro take > 60 secs to execute
    await Promise.race([
      new Promise(async (res, rej) => {
        try {
          const page = await this.page_new({
            // this is an action - always open in a foreground tab
            type: 'tab'
          });
          this.macroPlayerClient = new MacroPlayerClient(this, page, macroId, sieve.uri, params, {
            showMessage: true
          });
          await this.macroPlayerClient.play()
        } catch (e) {
          rej(e)
        }
        res()
      }),
      cancellablePromise.promise,
    ])

    cancellablePromise.cancel()
  }

  async filter(sieve, config, pageSelection, page, result, runCallback) {
    await this._page_filter(config, pageSelection, page, result);
    let re    = config.regexp;
    let text  = result.text;

    if(_.isString(re)) {  // backward compatibility
      re = { expr: re, flags: 'gim' };
    }

    if(re && re.expr) {
      let matches = text.match(new RegExp(re.expr, re.flags||''));
      if(matches && matches.length > 0) {
        text = matches.join(' ');
      } else {
        text = '';
      }
    }
    result.text = text;

    if (!result.text || result.text.length === 0) {
      // If the setting is set to mark empty matches as error, record this run
      // as error.
      if (sieve.config && sieve.config.ignoreEmptyText !== false) {
        // We stumbled on empty text selection. This is not expected and hence
        // not recorded in our history.
        const {outerHTML} = await this._page_snapshot(page)
        const selectionEmptyErr = new Err.SELECTION_EMPTY()
        selectionEmptyErr.setSnapshot({
          content: outerHTML,
          uri: page.rootPort.uri,
        })
        return runCallback(selectionEmptyErr, result)
      }
    }

    runCallback(null, result);
  }

  async run_live_html(sieve, config, runCallback) {
    if(!config.selections) {
      return runCallback({
        code: 'ECONFIG',
        msg: 'Select parts of page to monitor this page, selection is empty'
      });
    }

    const timeout = config.timeout || 60; // in sec

    const timeoutId = setTimeout(() => {
      runCallback(new Err.TIMEOUT({
        type: 'Loading page',
        time: timeout
      }));

      // override so that we don't call back again accidentally
      runCallback = function(err, data){
        DBG && console.error('runCallback called after TIMEOUT', err, data);
      };
    }, timeout*1000);

    let pageSelection = config.selections[0]; // TODO remove support for list
    // config.selections: [pages: [frames: { index, includes, excludes}]]
    pageSelection.uri || (pageSelection.uri = sieve.uri);
    pageSelection.frames.forEach(fr => {
      // XXX some selectors create index as string - convert to int
      if(typeof fr.index == 'string') {
        fr.index = parseInt(fr.index);
      }
    });

    let page;
    try {
      page = await this._page_load(pageSelection);
    } catch(e) {
      return runCallback(e);
    } finally {
      clearTimeout(timeoutId);
    }

    // events are sent by content once live watcher is setup
    // add listener before 'live_init' so that we don't miss the first event
    this.listenTo(page, 'port:live:err', ({message}) => {
      runCallback(new Err.PAGE_LOAD({ message }));
    });

    this.listenTo(page, 'port:live:result', ({result: {text, html}}) => {
      // console.log('LiveRunner:result', {text, data});

      // Fitler text using regexp
      let re    = config.regexp;
      if(_.isString(re)) {
        re = { expr: re, flags: 'gim' };
      }

      if(re && re.expr) {
        let matches = text.match(new RegExp(re.expr, re.flags||''));
        if(matches && matches.length > 0) {
          text = matches.join(' ');
        } else {
          text = '';
        }
      }

      runCallback(null, {data_type: C.TYPE_HTML, data: html, text, });
    });

    this.listenTo(page, 'port:root:DOMContentLoaded', () => {
      initMonitoring();
    });

    let initMonitoring = async () => {
      // init live monitoring
      for(let frame of pageSelection.frames) {
        let selectors = this._getFrameSelectors(config, frame);
        try {
          await this.frame_request({
            id: page.id,
            frame: frame.index,
            input: {
              path: 'live_init',
              data: selectors,
            }
          });
          // console.log('LiveRunner:live_init done', page.id, frame.index);
        } catch(e) {
          DBG && console.error('Failed to live_init', e);
          return runCallback(e);
        }
      }
    }

    initMonitoring();

    // console.log('LiveRunner:live_init done for all');
  }

  _getFrameSelectors(config, frame) {
    let includes = frame.includes,
      excludes = frame.excludes || [];

    if(config.includeScript) {
      // XXX Only include scripts with text?
      includes.push(
        { type: 'xpath', expr: '//script[not(@src)]' }
      );
    } else {
      excludes.push(
        { type: 'css', expr: 'script, noscript' },
        { type: 'xpath', expr: "//@*[starts-with(name(), 'on')]" }
      );
    }
    if(config.includeStyle) {
      includes.push(
        { type: 'css', expr: "style" },
        { type: 'css', expr: "link[rel='stylesheet']" }
      );
    } else {
      excludes.push(
        { type: 'css', expr: "style" },
        { type: 'css', expr: "link[rel='stylesheet']" },
        { type: 'xpath', expr: "//@*[name() ='style']" }
      );
    }
    excludes.push(
      { type: 'css', expr: "frame" },
      { type: 'css', expr: "iframe" }
    );
    // Include base URL. It will help us get
    includes.push({ type: 'css', expr: "base" });
    return {
      excludes,
      includes,
    }
  }

  async _frame_filter(config, page, frame, result, retryCount) {
    // console.log('_frame_filter', page, {retryCount});
    let selectors  = this._getFrameSelectors(config, frame);

    const {html, text} = await this.frame_request({
      id: page.id,
      frame: frame.index,
      input: {
        path: 'filterHTMLAndGetData',
        data: selectors
      }
    });

    result.data += html;
    if (text) {
      result.text += text;
    } else if (retryCount > MAX_RETRY_COUNT_ON_EMPTY_TEXT ||
      // For cases when looking for full HTML retry once more
      (config.dataAttr == 'data' &&
        retryCount > MAX_RETRY_COUNT_ON_EMPTY_TEXT_FOR_HTML)) {
      // no more retries
    } else {
      // Text was empty. Retry after some time.
      await wait(RETRY_DELAY_ON_EMPTY_TEXT * 1000);
      return this._frame_filter(config, page, frame, result, retryCount + 1);
    }
  }

  async _page_filter(config, {delay, frames}, page, result) {
    await wait((delay||0)*1000);
    // Filter innermost frame first. Usually that means that frame
    // with highest index should be filtered first.
    frames = _.sortBy(frames, function(frame) {
      return -frame.index;
    });
    for(let frame of frames) {
      await this._frame_filter(config, page, frame, result, 0);
    }
  }

  async _page_load({uri, dynamic, frames}, callback) {
    let type = Prefs.get('x-frame-load-in') || 'tab';
    let loader = await this.page_new({
      dynamic,
      incognito: this.options.incognito,
      pageMods: this.pageMods,
      type,
    });
    let frameIndices = _.pluck(frames, 'index');
    await this.page_load({ id: loader.id, uri, frameIndices });
    return loader;
  }

  /**
   * @returns {Promise<{
   *   outerHTML: string,
   *   metaTags: {
   *     [key: string]: string,
   *   }
   * }>}
   */
  async _page_snapshot(page) {
    return await this.frame_request({
      id: page.id,
      frame: 0,
      input: { path: 'getSanitizedDoc' }
    });
  }

  async closeTabs() {
    const tabIds = this.tabs.map(t => t.id)
    if (tabIds && tabIds.length > 0) {
      await chrome.tabs.remove(tabIds)
    }
  }

  _close() {
    this.off();
    this.stopListening();

    // this.removeTabListener()
    // TODO: await
    // this.closeTabs()
    // this.tabs = []

    if (this.options.pageProperties.closeLoadersOnClose) {
      this.pages.forEach(function (loader) {
        loader.destroy();
      });
    }
    this.pages = null;
  }

  _removeLoader(loader) {
    _.remove(this.pages, loader);
  }

  async page_close({id}) {
    let loader = getLoader(id);
    await loader.destroy();
    this._removeLoader(loader);
  }

  async page_load({id, uri, frameIndices}, cb) {
    if(_.isEmpty(uri)) {
      throw new Err.PARAM_INVALID({ param: 'uri', value: 'empty' });
    }
    let loader = getLoader(id);
    await loader.load(uri, {frameIndices});

    // Call after a delay of few seconds to handle cases where js loads
    // content dynamically?
    await wait(2000);
  }

  async page_new(options) {
    // console.log('page_new:create:', this.options);
    options.info || (options.info = {});
    options.info = {
      ...options.info,
      ...this.options.pageProperties.loaderProperties,
    }
    if (isElectron()) {
      options.info.windowOptions = {
        show: !!options.info?.active,
      };
      options.type = options.info.active ? 'tab': 'offscreen_window';
    }
    let loader = await createLoader(options);
    if (isElectron()) {
      // In electron, we create a tab and attaches a loader like a TabLoader
      // to then load the content statically, unlike in extension which does everything in
      // in offscreen.html (background) itself by creating an iframe.
      await loader.waitForEvent('reset', 5000);
    }
    this._addLoader(loader);
    return loader;
  }

  async frame_request({id, frame, input}) {
    let loader = getLoader(id);
    return await loader.request(frame, input);
  }

}

/**
 * Finds browser and give it back to the caller if browser is found.
 *
 * @return {WebpageLoader}
 */
function getLoader(id) {
  var loader = WebpageLoader.get(id);
  if(!loader) throw new Err.NOT_FOUND({ type: 'loader', param: 'id', id, });
  return loader;
}
;
const DOMUtils = {
  call: async function (method, ...args) {
    return method(...args);
  },
}
DOMUtils.Feed = Feed;
DOMUtils.Xml = Xml;
window.DOMUtils = DOMUtils;
;
const DATE_START = new Date();
const BROADCAST_HEARTBEAT_TIMEOUT = 120000; // 2 minutes
DBG && console.log('init main', DATE_START);

function upgradeCheck() {
  const version = Prefs.get('version');
  const newVersion = CFG.VERSION;

  if (!version) {
    Prefs.set('version', newVersion);

    // We are a new install. Show getting started page.
    setTimeout(function () {
      !DEV && !isElectron() && chrome.tabs.create({
        url: CFG.URL.WELCOME + '?utm_source=install',
        active: true,
      });
    }, 2000);
  } else if (version != newVersion) {
    const oldDate = version.split('.').pop();
    Prefs.set('version', newVersion);
    /*
    setTimeout(function() {
      showUpdateNotes(version, newVersion);
    }, 2000);
    */
  }
}


const diffWorker = new DiffWorker({ url: CFG.URL.DIFFWORKER });

const Scheduler = (function () {
  const q = [];
  const liveRunners = {};
  const runners = {};

  let timeouts = {}, count = 0;
  let checkInetervalId;
  let nActive = 0;

  //clientid changes on other peer disconnection
  let clientIds = [];
  const groupDetails = {};
  let initialized = false;

  function checkQueue() {
    // Check queue for schedule jobs and runs them when its their turn. Run it
    // only if there is an empty slot.
    const
      nMaxWorkers = Prefs.get('nworkers');


    const nWaiting = q.length;
    if (nWaiting > 0 && nActive < nMaxWorkers) {
      const id = q.shift();
      SieveStore.findOne(id, {
        only: ['id', 'name', 'uri', 'config', 'content_type', 'schedule',
          'err', 'client_id', 'rule_id', 'state', 'tags', 'user_id', 'macro_id', 'datasource_id', 'text', 'ts_view'],
      }, function (err, sieve) {
        if(!sieve) {
          // could have been deleted after it was added to queue
          // XXX FIXME was it not deleted from `q`?
          return;
        }
        // allow turned off monitors so that manually run but paused monitors
        // work
        if (!isReadyToRun(sieve, true)) {
          // when sieve is not ready, return. clear any check state to make
          // sure that we don't show any checking state in the ui
          gEvents.trigger('worker:sieve:state', {
            id: sieve.id,
            state: C.RUN_STATE_INIT,
          });
          return;
        }

        sieve.config = JSON.parse(sieve.config);

        // DBG && console.log('Scheduler:checkQueue:findOne:', sieve);
        if (willAbortAndCanRun(sieve)) {
          run(sieve, function (err) {
            // console.log('Scheduler:run:callback:', err, sieve.id);
            // err && console.error('Error running:', sieve, err);

            count += 1;
            nActive -= 1;

            if (!(err && Err.ABORT.si(err))) {
              // Schedule again iff it has not been aborted by Scheduler.this
              schedule(sieve);
            } else {
              // Ignore errors that are ABORTs since they are called by
              // scheduler
            }
          });

          // Increment counter iff the worker started successfully.
          nActive += 1;
        }

        if (nActive < nMaxWorkers && nWaiting > 1) {
          setTimeout(checkQueue, 200);
        }
      });
    }
  }

  function deSchedule(sieveOrId) {
    // DBG && console.log('deSchedule:sieveOrId:', sieveOrId);

    const id = _.isString(sieveOrId) ? sieveOrId : sieveOrId.id;
    const timeoutId = timeouts[id];
    const liveRunner = liveRunners[id];

    if (timeoutId) {
      delete timeouts[id];
      clearTimeout(timeoutId);
    }

    if (liveRunner) {
      liveRunner.abort();
    }
    // What if the sieve is already being run? Let that run and finish.
  }

  function getScheduleOn(sieve, callback) {
    const schedule = sieve.schedule;

    WorkStore.find({
      rel: SieveStore.name,
      key: sieve.id,
    }, {
      limit: 10,
      only: ['id', 'err', 'ts'],
      order: ['-ts'],
    }, function (err, result) {
      if (err) {
        callback(err);
      } else {
        const scheduler = ScheduleDescriptors[schedule.type];
        if (!scheduler) {
          callback(new Err.TYPE_UNKNOWN({
            type: 'scheduler',
            value: schedule.type,
          }));
        } else {
          callback(null, scheduler.getSchedule(schedule.params, result.data));
        }
      }
    });
  }

  function onUpdate(sieve) {
    // console.log('onUpdate:', sieve);
    const {id, state} = sieve;
    if ((state != void 0) && (state != C.STATE_READY)) {
      // console.log('onUpdate:deSchedule', sieve);
      deSchedule(id);
    } else if (state == C.STATE_READY) {
      // console.log('onUpdate:schedule', sieve);
      schedule(id);
    } else if ('schedule' in sieve) {
      // console.log('onUpdate:schedule', sieve);
      schedule(id);
    }
  }

  async function processResult(sieve, result, doneCallback) {
    // console.log('processResult:result:', result);
    const dataAttr = sieve.config.dataAttr || 'text';
    const ignoreWhitespace = sieve.config.ignoreWhitespace !== false;

    SieveDataProxy.find({
      sieve_id: sieve.id,
    }, {
      only: ['id', 'ts', 'text', 'data'],
      order: ['-ts'],
      limit: 1,
    }, async function (err, res) {
      if (err) {
        // console.error('Scheduler:failed to find sieve data', err);
        doneCallback(err);
      } else {
        const lastData = res.count > 0 ? res.data[0] : null;
        const
          RE_WHITESPACE = /\s|\b/g;


        const RE_SPLIT = /\s+|\b/g;


        const equal = lastData &&
          (ignoreWhitespace ?
            _.isEqual(lastData[dataAttr].replace(RE_WHITESPACE, ''),
              result[dataAttr].replace(RE_WHITESPACE, ''))
            :
            _.isEqual(lastData[dataAttr].split(RE_SPLIT),
              result[dataAttr].split(RE_SPLIT))
          );

        if (equal) {
          if (sieve.err) {
            // Clear error from previous run
            SieveStore.update(sieve.id, { err: null }, doneCallback);
          } else {
            // Do nothing.
            doneCallback();
          }
        } else {
          await saveData(lastData);
        }
      }
    });

    async function saveData(lastData) {
      const
        now = Date.now();


      const ts = (new Date(now)).toISOString();


      const ts_view = (new Date(now + 1)).toISOString();

      const textHash = await sha1Digest(result.text);
      // Save data
      async.parallel({
        sieve_data: function (callback) {
          SieveDataStore.create(_.extend({
            sieve_id: sieve.id,
            ts,
            ts_mod: ts,
            client_id: Prefs.get('client.id'),
            text_hash: textHash
          }, result), callback);
        },
        sieve: function (callback) {
          const
            doc = {
              err: null,
              // Trim text content for preview
              text: result.text.slice(0, 199),
              ts_data: ts,
            };
          if (!lastData) {
            doc.ts_view = ts_view;
          }
          SieveStore.update(sieve.id, doc, callback);
        },
      }, async function (err, results) {
        doneCallback(err);

        if (!lastData) {
          return;
        }

        function getSummary(diffs) {
          // console.log('diffs:', diffs);
          let firstIns = -1;
          let firstInsEnd = -1;
          let len = 0;
          let summary = _.reduce(diffs, function (buff, aDiff) {
            const op = aDiff[0];
            let text = aDiff[1];

            if (op == DIFF_EQUAL) {
              buff.push(text);
              len += text.length;
            } else if (op == DIFF_INSERT) {
              text = '*' + text.trim() + '*';
              buff.push(text);
              if (firstIns < 0) {
                firstIns = len;
                firstInsEnd = firstIns + text.length;
              }
              len += text.length;
            }
            return buff;
          }, []).join('');

          if (firstIns > 40) {
            if (firstInsEnd > 80) {
              // XXX Slice on a word boundary
              summary = '...' + summary.slice(firstIns - 10);
            }
          }

          return summary.slice(0, 199);
        }

        const curData = results.sieve_data;

        if(!diffWorker.ready){
          await diffWorker.init();
        }
        let diffs, inserts, dels;
        let type = curData.data_type === C.TYPE_JSON ? 'json' : 'text';
        try {
          ({diff: diffs, addedText: inserts, deletedText: dels} = await diffWorker.diff(lastData.text, curData.text, {type}));
        } catch (err) {
          DBG && console.error('Scheduler:failed to diff', err);
          if (type === 'json') {
            diffs = curData.text;
            inserts = JSON.stringify(curData.text);
          } else {
            diffs = [[DIFF_INSERT, curData.text]];
            inserts = _.reduce(diffs, function (buff, aDiff) {
              if (aDiff[0] == DIFF_INSERT) {
                buff.push(aDiff[1]);
              }
              return buff;
            }, []).join(' ');
          }
        }

        if(sieve.tags) {
          let tagIds = sieve.tags.split(',');
          let tagDocs = (await TagStore.find({
            'id.in': tagIds,
            state: C.STATE_DEFAULT,
          })).data;
          sieve.tags = _.map(tagDocs, doc => doc.name).join(',');
        }

        const {netAdditions, netDeletions} = findNetAdditionsAndDeletions(inserts, dels);

        const context = {
          sieve,
          sieve_data: results.sieve_data,
          old_sieve_data: lastData, // added for matchRule
          items: [curData, lastData],
          diffs,
          dels,
          inserts,
          net_additions: netAdditions,
          net_deletions: netDeletions
        };

        /*
        if(curData.text.length > 80) {
          // Focus on changes in preview.
          SieveStore.update(sieve.id, { text: getSummary(diffs) });
        }
        */
        ActionManager.computeActions(context);

        // Prune old data that is outside of storage units
        SieveDataStore.destroyWithSubQuery({
          sieve_id: sieve.id,
        }, {
          limit: 10,
          offset: Prefs.get('nhist') || 10, // limit according to client's abilities
          order: ['-ts'],
        }, function (err) {
          if (err) {
            DBG && console.error('Scheduler:SieveDataStore:destroyWithSubQuery', err);
          }
        });
      });
    }
  }

  function qNow(id) {
    deSchedule(id);
    q.push(id);

    gEvents.trigger('worker:sieve:state', {
      id,
      state: C.RUN_STATE_WAIT,
    });
  }

  function resetAll() {
    _.each(_.values(timeouts), deSchedule);
    _.each(_.values(runners), stop);
    updateCliendIds();
  }

  function run(sieve, callback) {
    // console.log('Scheduler:run:', sieve);
    const runner = new Runner(sieve, {
      snapshot: sieve.text === null,
    });

    // Keep reference for control.

    runners[sieve.id] = runner;

    runner.run(function (errRun, result, metrics) {
      // console.log('Scheduler:run:runner.run:', errRun, result, metrics);
      delete runners[sieve.id];
      sieveResultHandler(sieve, errRun, result, metrics, callback);
    });

    gEvents.trigger('worker:sieve:state', {
      id: sieve.id,
      state: C.RUN_STATE_WIP,
    });
  }

  function runLive(sieve) {
    const oldRunner = liveRunners[sieve.id];

    if (oldRunner) {
      // console.log('LiveRunner already running');
      return;
    }

    const liveRunner = new LiveRunner(sieve);

    liveRunners[sieve.id] = liveRunner;

    liveRunner.run(function (errRun, result, metrics) {
      if (errRun) {
        DBG && console.error('Error running live monitor', errRun, sieve);
        if (Err.ABORT.si(errRun)) {
          // deSchedule aborts a liveRunner. Remove the runner here after the
          // abort. It should be re-scheduled later
          delete liveRunners[sieve.id];
        } else if (Err.TIMEOUT.si(errRun)) {
          liveRunner.abort();
        }
      }
      sieveResultHandler(sieve, errRun, result, metrics, function (err) {
        if (!err) {
          return;
        }
      });
    });
  }

  /**
   * @param {{
   *   id: string,
   *   uri: string,
   * }} sieve
   * @param {{
   *   metaTags: {
   *     [key: string]: string
   *   },
   *   outerHTML: string,
   * }} snapshotObject
   */
  async function saveFirstSnapshot(sieve, snapshotObject) {
    try {
      await utilApi('/page-db/api/snapshots', 'POST', {
        url: sieve.uri,
        content: snapshotObject.outerHTML,
        object_type: 'html',
        meta: {
          first_run: true,
          sieve_id: sieve.id,
          metaTags: snapshotObject.metaTags,
        },
      })
    } catch (e) {
      DBG && console.error('Error saving URL', e);
    }
  }

  function sieveResultHandler(sieve, errRun, result, metrics, callback) {
    if (errRun && Err.ABORT.si(errRun)) {
      callback(errRun);
      return;
    }

    const work = {
      rel: SieveStore.name,
      key: sieve.id,
      duration: metrics ? metrics.duration : 0,
    };

    let errSnapshot
    if (errRun) {
      errSnapshot = errRun.snapshot ? errRun.snapshot : undefined
      if (errSnapshot) {
        delete errRun.snapshot
      }

      WorkStore.find({
        key: sieve.id,
      }, {
        limit: 1,
        only: ['id', 'err', 'ts'],
        order: ['-ts'],
      }, function (err, result) {
        if (err) {
          console.error('Error querying WorkStore', err);
        }
        work.err = JSON.stringify(errRun);
        insertWork();
      });

      if(!errRun.code) {
        // log unknown error so that we can fix it
        logMessage('sieve: unknown run error', {extra: {errRun, sieve}});
      }
    } else {
      insertWork();
    }

    async function insertWork() {
      let savedWork
      try {
        savedWork = await WorkStore.create(work);
      } catch (err) {
        DBG && console.error('Scheduler: failed to save work result to DB', err);
      }

      if (errSnapshot) {
        try {
         const res = await SieveSnapshotStore.create({
            sieve_id: sieve.id,
            work_id: savedWork.id,
            uri: errSnapshot.uri,
            content: errSnapshot.content,
            content_type: 'text/html',
          })

          await WorkStore.update({id: savedWork.id}, {snapshot_id: res.id});
        } catch (err) {
          DBG && console.error('SieveSnapshotStore: cannot insert the snapshot', err);
        }
      }

      if (errRun && savedWork.rel === SieveStore.name) {
        ErrorActionsV2.enqueue(savedWork.id);
        callback(errRun);
      } else {
        if (result?.fullPageSnapshot && auth.isLoggedIn()) {
          saveFirstSnapshot(sieve, result.fullPageSnapshot);
          delete result.fullPageSnapshot;
        }
        processResult(sieve, result, callback);
      }

      try {
        const result = await WorkStore.find({rel: SieveStore.name, key: sieve.id,}, {
          limit: 10,
          offset: 10,
          order: ['-ts'],
          only: ['id']
        })
        if (result.count > 0) {
          await SieveSnapshotStore.destroyWithSubQuery({"work_id.in": result.data.map((d) => d.id),}, {})
        }
      } catch (err) {
        DBG && console.error('Scheduler:WorkStore:create:SieveSnapshotStore:destroy:err', err);
      }

      // Delete old entries from work log.
      // TODO Collect metrics into a stats table to summarize activity.
      try {
        await WorkStore.destroyWithSubQuery({
          rel: SieveStore.name,
          key: sieve.id,
        }, {
          limit: 10,
          offset: 10,
          order: ['-ts'],
        });
      } catch (err) {
        DBG && console.error('Scheduler:WorkStore:create:destroy:err', err);
        // A case of unhandled error.
      }

      // if (sieve.client_id !== Prefs.get('client.id')) {
      //   const workTable = {
      //     name: 'work',
      //     data: work
      //   }
      //   PeerConnection.sendAllPeers(workTable);
      // }
    }

    gEvents.trigger('worker:sieve:state', {
      id: sieve.id,
      state: C.RUN_STATE_INIT,
    });
  }

  function isReadyToRun(sieve, allowPaused = false) {
    const user_id = auth.getId();
    return (sieve
      && clientIds.includes(sieve.client_id)
      && (!user_id || sieve.user_id == user_id)
      && (allowPaused || sieve.state == C.STATE_READY));
  }

  function schedule(sieve, callback) {
    callback || (callback = function (err) {
      if (err) throw err;
    });
    // console.log('Clients Monitoring: ', clientIds)
    const id = _.isString(sieve) ? sieve : sieve.id;

    SieveStore.findOne(id, function (err, sieve) {
      if (!isReadyToRun(sieve)) {
        deSchedule(id);
        return;
      }

      sieve.config = JSON.parse(sieve.config);
      sieve.schedule = JSON.parse(sieve.schedule);

      if (sieve.schedule.type == 'LIVE') {
        // Start live runner
        runLive(sieve);
        callback();
        return;
      }

      getScheduleOn(sieve, function (err, scheduleOn) {
        if (err) {
          DBG && console.error('Error getting schedule:', sieve, err);
          callback(err);
        } else if (scheduleOn < 0) {
          // There is no need to schedule it according to its parameters.
          // DBG && console.log('Scheduler:not scheduled:', sieve.id, sieve.name);
          callback();
        } else {
          // console.log('Scheduler: schedule:', sieve.id, sieve.name, scheduleOn-Date.now()/1000);
          deSchedule(id);

          // XXX limit min and max https://stackoverflow.com/a/43358488
          const intervalInMs = Math.max(Math.min(scheduleOn * 1000 - Date.now(), 0x7FFFFFFF), 0);
          timeouts[sieve.id] = setTimeout(function () {
            // XXX There could be a subtle bug when the timeout for this sieve is
            // set after it was scheduled.
            qNow(sieve.id);
          }, intervalInMs);

          callback();
        }
      });
    });
  }
  function scheduleMonitors(offset=0) {
    SieveStore.find({
      state: C.STATE_READY,
      'client_id.in': clientIds,
      $or: [
        ['user_id', auth.getId()],
        ['user_id', null],
      ],
    }, {
      limit: 1000,
      offset: offset,
      only: ['id', 'schedule', 'client_id', 'ts'],
      order: ['-ts'],
    }, function (err, result) {
      // console.log('monitoring: clients: ', [...clientIds], '; sieves: ', result.data, 0);
      if (err) {
        console.error('Failed to schedule.', err);
        // XXX Severe error, unilkely to happen.
      } else {
        async.eachSeries(result.data, schedule, function (err) {
          if (err) {
            DBG && console.error('Error scheduling:', err);
          } else {
            if (result.total_count > (result.count + result.offset)) {
              scheduleMonitors(result.offset + result.count);
            }
          }
        });
      }
    });
  }
  function updateClientIds() {
    initiatePeerTable();
    scheduleMonitors();
  }

  /* function checkAndElectCoordinator(closedConnId) {
    const closedPeerGroup = PeerConnection.getClientsGroup(closedConnId);
    const clients = _.clone(PeerConnection.getClients());
    let coordinator;
    const orderedClients = {};
    Object.keys(clients).sort().forEach(function (key) {
      orderedClients[key] = clients[key];
    });

    // console.log(closedPeerGroup, clients)
    if (closedPeerGroup !== undefined) {
      for (let group of closedPeerGroup) {
        let count = 0, conn;
        if (group === C.DEFAULT_GROUPID && !clientIds.includes(C.DEFAULT_GROUPID) && groupDetails[C.DEFAULT_GROUPID] === closedConnId) {
          for (let id in orderedClients) {
            if (orderedClients[id] === C.CLIENT_ACTIVE) {
              coordinator = id;
              break;
            }
          }
          electCoordinator(1, coordinator, null, C.DEFAULT_GROUPID);
        } else if (group !== C.DEFAULT_GROUPID && groupDetails[group] === closedConnId) {
          for (conn of PeerConnection.getConnections(group)) {
            if (conn !== null) {
              if (clients[conn] === C.CLIENT_ACTIVE && count <= 2) {
                count++;
                coordinator = conn;
              } else if (count > 1) {
                break;
              }
            }
          }
          electCoordinator(count, coordinator, conn, group);
        }
      }
    } else {
      if(!clientIds.includes(C.DEFAULT_GROUPID)) {
        electCoordinator(1, Prefs.get('client.id'), null, C.DEFAULT_GROUPID);
      }
    }
    const msg = {
      name: 'group',
      data: groupDetails
    }
    PeerConnection.sendAllPeers(msg);
    scheduleMonitors();
  }

  function electCoordinator(count, coordinator, conn, group) {
    if (((count >= 1 && coordinator === Prefs.get('client.id')) || (count <= 1 && conn === Prefs.get('client.id'))) && clientIds[clientIds.length - 1] !== C.DEFAULT_GROUPID) {
      clientIds.push(group);
      groupDetails[group] = coordinator;
    }
  } */

  function willAbortAndCanRun(sieve) {
    // If it is already running, stop current runner and remove its references.
    const oldRunner = runners[sieve.id];

    if (!oldRunner) {
      return true;
    }

    if (!_.isEqual(sieve.config, oldRunner.originalConfig)) {
      oldRunner.abort();
      delete runners[sieve.id];
      return true;
    }

    return false;
  }

  function initiatePeerTable() {
    clientIds = loadClientIds();
  }

  /* function makeCoordinator(localGroup) {
    for (let peer_id of localGroup) {
      groupDetails[peer_id] = Prefs.get('client.id');
    }
    if (Object.entries(groupDetails).length !== 0) {
      const msg = {
        name: 'group',
        data: groupDetails
      }
      PeerConnection.sendAllPeers(msg);
    }
  } */
  function loadClientIds() {
    let localGroup = [C.DEFAULT_GROUPID, Prefs.get('client.id')]
    return localGroup;
  }
  /*function onPeerConnect(conn) {
    const msg = {
      name: 'group',
      data: groupDetails
    }
    conn.send(msg);
  }

  function updateGroupDetails(groups) {
    for (let peer_id in groups) {
      groupDetails[peer_id] = groups[peer_id];
    }
  }*/
  return {
    isBusy: function () {
      return _.size(runners) > 0;
    },

    checkNow: function (ids) {
      _.each(ids, qNow);
    },

    getInfo: function () {
      return { count, initialized, nActive, nQueued: q.length, clientIds };
    },

    init: function () {
      if (initialized) this.uninit();
      // PeerConnection.init();
      _.delay(updateClientIds, 6000);
      checkInetervalId = setInterval(function () {
        checkQueue();
      }, 1000);
      gEvents.on('store:' + SieveStore.name + ':create', schedule);
      gEvents.on('store:' + SieveStore.name + ':update', onUpdate);
      gEvents.on('store:' + SieveStore.name + ':destroy', deSchedule);

      // gEvents.on('store:' + ClientGroupStore.name + ':create', PeerConnection.init);
      // gEvents.on('store:' + ClientStore.name + ':create', PeerConnection.peerConnect);
      // gEvents.on('store:' + ClientGroupStore.name + ':update', PeerConnection.init);

      // PeerConnection.on('update:clients', updateClientIds);
      // PeerConnection.on('change:clients:disconnect', checkAndElectCoordinator);
      // PeerConnection.on('change:clients:peerconnected', onPeerConnect);
      // PeerConnection.on('change:clients:updateGroup', updateGroupDetails);

      initialized = true;
    },

    uninit: function () {
      initialized = false;

      clearInterval(checkInetervalId);

      gEvents.off('store:' + SieveStore.name + ':create', schedule);
      gEvents.off('store:' + SieveStore.name + ':update', onUpdate);
      gEvents.off('store:' + SieveStore.name + ':destroy', deSchedule);

      _.each(_.values(runners), function (runner) {
        runner.abort();
      });
      _.each(_.values(liveRunners), function (runner) {
        runner.abort();
      });

      _.each(timeouts, clearTimeout);
      timeouts = {};

      q.splice(0);
      // PeerConnection.uninit();
      // gEvents.off('store:' + ClientGroupStore.name + ':create', PeerConnection.init);
      // gEvents.off('store:' + ClientStore.name + ':create', PeerConnection.peerConnect);
      // gEvents.off('store:' + ClientGroupStore.name + ':update', PeerConnection.init);

      // PeerConnection.off('update:clients', updateClientIds);
      // PeerConnection.off('change:clients:disconnect', checkAndElectCoordinator);
      // PeerConnection.off('change:clients:peerconnected', onPeerConnect);
      // PeerConnection.off('change:clients:updateGroup', updateGroupDetails);
    },
  };
})();

var ActionManager = (function () {
  async function computeActions(context) {

    let {sieve} = context;

    let promises = [
      UserStore.findOne(auth.getId()),
      ActionStore.find({ sieve_id: sieve.id, state: C.STATE_DEFAULT, }),
    ];

    if (sieve.rule_id) {
      promises.push(RuleStore.findOne(sieve.rule_id));
    }

    let [user, rActions, rule] = await Promise.all(promises);
    user || (user = {id: 0, prefs: {}});

    let globalActions = await getGlobalActions(user);
    let actions = dedupeActions([...globalActions, ...rActions.data]);

    context.actions = actions;
    context.rule = rule;

    // console.log('computeActions: context after diff: ', context);
    const resSieveHash = await SieveDataStore.find({ sieve_id: context.sieve_data.sieve_id }, {
      only: ['text_hash'],
    });
    context.oldTextHashes = resSieveHash.data.slice(1).map(row => row.text_hash);
    context.newTextHash = context.sieve_data.text_hash;

    let matched = true;
    try {
      matched = matchRule(context, user.prefs);
      await updateSieveDataWithConditions(context, user.prefs, matched);
    } catch (e) {
      DBG && console.error('Error evaluating rule for sieve', sieve.id, e);
    }
    if (matched) {
      await setContextDiff(context, user);
      takeActions(context);
      // Broadcast audio and popup actions to other peers
      const actions = context.actions.filter(
        (action) => action.type == C.ACTION_LOCAL_POPUP || action.type == C.ACTION_LOCAL_AUDIO
      );
      // if (actions.length > 0) {
      //   const remoteContext = { ...context, actions };
      //   PeerConnection.sendAllPeers({
      //     name: 'notification',
      //     data: remoteContext
      //   });
      // }
    } else {
      // Mark item as read
      const wasRead = moment(sieve.ts_view) >= moment(context.old_sieve_data.ts);
      if (wasRead) {
        SieveStore.update(sieve.id, { ts_view: Date.now() });
      }
    }
  }

  async function updateSieveDataWithConditions(context, prefs, matched) {
    const sieveConditions = context.rule;
    const globalConditions = prefs.rule;
    const sieveConditionVersion = sieveConditions?.version ?? '';
    const globalConditionVersion = globalConditions?.version ?? '';
    const sieveRule = JSON.parse(sieveConditions?.config ?? '{}');

    const meta = {
      rule: {
        global: {
          rules: { rule: globalConditions ?? {} },
          version: globalConditionVersion
        },
        sieve: {
          rules: sieveRule ?? {},
          version: sieveConditionVersion
        }
      },
      oldTextHashes: context.oldTextHashes,
    }

    await SieveDataStore.update(
      { id: context.sieve_data.id },
      {
        meta,
        triggered: matched
      }
    );
  }

  function takeActions(context) {
    // console.log('takeActions:', context);
    async.each(context.actions, function (action, callback) {
      const desc = ActionDescriptors[action.type];
      if (!desc) {
        DBG && console.error('Invalid action type', action);
        callback(new Err.NOT_FOUND({
          type: 'action:desc',
          id: action.type,
        }));
      } else {
        // console.log('ActionManager:takeAction:', action);
        action = { ...action, config: JSON.parse(action.config||null) }
        // action.config && (action.config = JSON.parse(action.config));
        desc.act(action, context, callback);
      }
    });
  }


  return {

    computeActions,

    init: function () {
      // Start listening to events that result in actions.
      // Listen for action events sent by peers
      // PeerConnection.on('change:clients:notification', onNotification);
      // function onNotification(context) {
      //   setTimeout(takeActions, 2000, context);
      // }
    },

    uninit: function () {
      // Remove peer notification listener or let remote notifications come?
    },
  };
})();

async function getGlobalActions({id, prefs}) {
  if(!prefs) {
    logMessage('user: prefs missing:', {extra: {id, }});
    return [];
  }
  let actions = prefs.actions;
  let hasApp = !!await AttrStore.findOne({
    user_id: id,
    'name.in': ['apns_id', 'fcm_id', ],
    state: C.STATE_DEFAULT,
  });

  if(hasApp && actions == null) {
    actions = [{
      type: C.ACTION_PUSH,
      config: null,
    }];
  }

  return actions || [];
}

function dedupeActions(actions) {
  return _.uniq(actions, (action) => action.type+action.config);
}

// set notification email content
async function setContextDiff(context, user) {
  if (!user.id) {
    return;
  }
  const newData = context.items[0];
  const oldData = context.items[1];

  // TODO set default behaviour if prefs not set

  const emailPrefs = _.defaults(user?.prefs?.action_email || {}, {
    content_type: 'HTML',
    highlighted: true,
    snipped: true,
    mode: 'SPLIT'
  });

  const { content_type } = context.sieve;
  switch (content_type) {
    case C.TYPE_FEED:
      try {
        context.html = await diffWorker.diffAndRenderEmail(oldData.data, newData.data, { type: 'feed' });
      } catch (e) {
        console.error('error:setContextDiff:feed: ', e);
      }
      break;
    case C.TYPE_JSON:
      try {
        context.html = await diffWorker.diffAndRenderEmail(oldData.data, newData.data, {
          type: 'json',
          emailOpts: emailPrefs
        });
      } catch (e) {
        console.error('error:setContextDiff:json: ', e);
      }
      break;
    case C.TYPE_XML:
      try {
        context.html = await diffWorker.diffAndRenderEmail(oldData.data, newData.data, {
          type: 'text',
          emailOpts: { oldTs: oldData.ts, ...emailPrefs }
        });
      } catch (e) {
        console.error('error:setContextDiff:xml: ', e);
      }
      break;
    default:
      // html diff
      const isHTML = emailPrefs.content_type == 'HTML';
      const newHtml = isHTML ? newData.data : `<div>${newData.text}</div>`;
      const oldHtml = isHTML ? oldData.data : `<div>${oldData.text}</div>`;

      // in html diff, xml tags are preserved as-is but xml diff needs <,> in xml tags to be replaced with $lt; and $gt;
      // html : <span><note></note></span>
      // text: <span>&lt;note&gt;&lt;/note&gt;</span>
      let result;
      try {
        result = await diffWorker.diffAndRenderEmail(oldHtml, newHtml, {
          type: 'html',
          emailOpts: { oldTs: oldData.ts, ...emailPrefs }
        });

        const pattern = new RegExp('diffMark (inserted|removed)', 'g');
        const lenVisualChanges = (result.match(pattern) || []).length;

        if (emailPrefs.highlighted) {
          // diff won't be applied if emailOpts.highlighted is false which can set `lenVisualChanges` to a value > 0.
          // We will redo diff with type = `text` only when emailOpts.highlighted is true.
          if(lenVisualChanges === 0 && emailPrefs.content_type === 'HTML') {
            result = await diffWorker.diffAndRenderEmail(oldData.text, newData.text, {
              type: 'text',
              emailOpts: { oldTs: oldData.ts, ...emailPrefs }
            });
          }
        }

        context.html = result;
      } catch (e) {
        context.html = newHtml;
        console.error('error:setContextDiff:email: ', e);
      }
  }
}

function setDiffStyle(doc) {
  setStyle(doc.querySelectorAll('.removed'), 'background-color', '#ff9494');
  setStyle(doc.querySelectorAll('.inserted'), 'background-color', '#b7fdcb');

  setStyle(doc.querySelectorAll('span.inserted, span.removed'), 'padding', '1px 4px');

  setStyle(doc.querySelectorAll('a.removed, a .removed'), 'color', '#008');

  setStyle(doc.querySelectorAll('img.removed'), 'border', 'solid 2px red');
  setStyle(doc.querySelectorAll('img.removed'), 'background-color', 'transparent');
  setStyle(doc.querySelectorAll('img.removed'), 'padding', '2px');

  setStyle(doc.querySelectorAll('img.inserted'), 'border', 'solid 2px green');
  setStyle(doc.querySelectorAll('img.inserted'), 'background-color', 'transparent');
  setStyle(doc.querySelectorAll('img.inserted'), 'padding', '2px');

  function setStyle(els, name, value) {
    _.each(els, function (el) {
      el.style[name] = value;
    });
  }
}

function Service(options) {
  const self = this;

  this.options = _.extend({}, this.OPTIONS, options);
  this.active = true;
  this.state = new Backbone.Model({ unread: 0, error: 0, sync: {
      syncing: false,
      name: null,
      err: null
    } }); // for ui
  this.initialized = false;
  this.initError = null;

  _.extend(this, Backbone.Events);

  this.once('init:stores', initLocale);

  this.init((err) => {
    if (Prefs.get('sieve-slot.enabled')) {
      Prefs.set('active', checkSlot());
    }

    setInterval(() => {
      if (Prefs.get('sieve-slot.enabled')) {
        Prefs.set('active', checkSlot());
      }
    }, 60000);

    Prefs.on('change:sieve-slot.enabled', (enabled) => {
      if (enabled) {
        Prefs.set('active', checkSlot());
      } else {
        Prefs.set('active', true);
      }
    });

    if (err) {
      console.error('Failed to init distill service:', err);
      if (err.toJSON) {
        this.initError = err.toJSON();
      } else {
        this.initError = err;
      }
      this.trigger('init:error', err);
    }

    upgradeCheck();

    auth.on('login', () => {
      // Called whenever user's logged in status changes
      if (auth.isReady()) {
        this.active && Scheduler.init();
        this.initData();
        this.updateState();
      }
    });

    auth.on('expired', async () => {
      Scheduler.uninit();
      let tabs = await chrome.tabs.query({ url: CFG.URL.BASE + '*' });
      for (let tab of tabs) {
        try {
          await chrome.tabs.update(tab.id, { url: tab.url });
        } catch (err) {
          DEV && console.error('Error updating tab', tab, err);
        }
      }
    });

    auth.on('logout', () => {
      this.setEventSource(null);
    });
  });
}

_.extend(Service.prototype, {

  appUrl: CFG.URL.WATCHLIST,

  serviceLoginUrl: CFG.URL.LOGIN,

  Scheduler: Scheduler,

  SyncMan: SyncMan,

  heartbeatTimer: null,

  checkNow: Scheduler.checkNow,

  getInfo: function () {
    return {
      active: this.active,
      ready: this.ready,
      errEventSource: this.errEventSource,
      initError: this.initError,
      initialized: this.initialized,
      scheduler: Scheduler.getInfo(),
    };
  },

  toggleService: function () {
    const active = Prefs.get('active');
    // change:sieve-slot.enabled has a side effect which can alter Prefs.active
    Prefs.set('sieve-slot.enabled', false);
    Prefs.set('active', !active);
  },

  // add listener that will be called back after service has inititalized
  afterInit: function (callback) {
    // NOTE Order of initialized and initError is important
    if (this.initialized) {
      callback();
    } else if (this.initError) {
      callback(this.initError);
    } else {
      this.once('init:stores', function () {
        try {
          callback();
        } catch (e) {
          // NOTE An error in one callback doesn't affect others
          console.error('Error calling afterInit callback', e);
        }
      });
      this.once('init:error', function (err) {
        try {
          callback(err);
        } catch (e) {
          console.error('Error calling afterInit callback', e);
        }
      });
    }
  },

  init: function (callback) {
    // gEvents.off('store:'+SieveDataStore.name+':create', this.onSieveDataCreate, this);
    gEvents.on('store:' + SieveDataStore.name + ':create', this.onSieveDataCreate, this);
    SyncMan.on("all", (eventName, err, _) => {
      if (eventName.endsWith(":sync:init")) {
        const storeName = eventName.split(":sync")[0]
        this.state.set("sync", {
          syncing: true,
          name: storeName
        })
      } else if (eventName.endsWith(":sync")) {
        const storeName = eventName.split(":sync")[0]
        this.state.set("sync", {
          syncing: false,
          name: storeName,
          err
        })
      }
    })

    initStores((err) => {
      if (err) {
        return callback(err);
      }
      // The most important step in init is preparing stores. So setting flag here
      // even when other parts that are super critical may fail
      this.initialized = true;
      this.trigger('init:stores');
      this.initData(callback);
    });
  },

  initData: function (callback) {
    async.series([
      SyncId.init,
      (callback) => {
        auth.init(function (err) {
          // console.log('auth.init done');
          // TODO Add error to message store for review by user.
          err && console.error('Failed to init auth', err);
          callback();
        });
      },
      initData,
      (callback) => {
        this.triggerInit();
        this.initSync(callback);
      },
    ], callback);
  },

  isReady() {
    return this.ready;
  },

  isActive() {
    return this.active;
  },

  triggerInit: function () {
    this.ready = true;
    this.trigger('init init:data');
    gEvents.trigger('init');
  },

  initSync: promisifyOrCallback(function (callback){
    callback || (callback = function () { });

    if (SyncMan.canSync()) {
      api('/users/constraints', (err, constraint) => {
        if (err) {
          if (err.status == 401 || err.status == 403) {
            callback(err);
            // Do not retry in case of authentication failure
            // XXX sync inits after auth resets.
            // TODO Check various authentication and network failure modes
            // TODO Flag this error to user so that they can take action
            return;
          }

          let
            retryInterval = 300000; // 5 mins
          if (err.status == 403) {
            retryInterval = 3600000;
          } else if (err.status == 0 || err.status >= 500) {
            // temporary interruption
            retryInterval = 5000;
          }

          setTimeout(() => this.initSync(), retryInterval); // Retry
          callback(); // XXX Don't send back error
        } else {
          if (constraint.sync == 'S') {
            SyncMan.accountEnabled = true;
            // SyncMan.sync(false, callback);
            this.createEventSource(callback);
          } else {
            callback();
          }
        }
      });
    } else {
      // console.log('auth not set, cant create event source');
      this.setEventSource(null);
      callback();
    }
  }),

  createEventSource: function (callback) {
    callback || (callback = function () { });
    createEventSource((err, res) => {
      this.errEventSource = err;
      if (err) {
        console.error("createEventSource err callback", err)
        setTimeout(() => this.createEventSource(), 10000);
        callback();
      } else {
        this.setEventSource(res, callback);
      }
    });
  },

  resetHeartbeatTimer: function () {
    // Wait 2 minutes for a broadcast heartbeat
    // Re-initialize the eventsource if heartbeat is not recieved
    clearTimeout(this.heartbeatTimer);
    this.heartbeatTimer = setTimeout(() => {
      console.error('Broadcast message not received within timeout', new Date());
      setTimeout(() => this.createEventSource(), 10000);
    }, BROADCAST_HEARTBEAT_TIMEOUT);
  },

  markRead: function (callback) {
    SieveStore.update({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'ts_view.lt': { name: 'ts_data', type: 'field' },
    }, {
      ts_view: Date.now(),
    }, callback);

    this.syncStore(SieveStore);
  },

  markReadById: async function (id) {
    await SieveStore.update(id, { ts_view: Date.now() });
    this.syncStore(SieveStore);
  },

  pause: function () {
    Scheduler.uninit();
    ActionManager.uninit();
    // PeerConnection.uninit();
    gEvents.off('store:create:' + SieveStore.name, this.onSieveCreate, this);
    gEvents.off('store:destroy:' + SieveStore.name, this.onSieveDestroy, this);
    gEvents.off('store:update:' + SieveStore.name, this.onSieveUpdate, this);
  },

  onSieveCreate: function (doc) {
    this.updateState(doc.id);
  },

  onSieveDataCreate: function (doc) {
    if (doc._state !== C.LOCAL_STATE_SYNCED) {
      this.syncStore(SieveDataStore, (err) => {
        if (!err) {
          this.syncStore(SieveStore, { delay: 100 });
        }
      });
    }
  },

  onSieveDestroy: function (doc) {
    // console.log('onSieveDestroy');
    this.updateState(doc.id);
  },

  onSieveUpdate: function (doc) {
    // console.log('main:onseiveupdate:', doc);
    this.updateState(doc.id);
  },

  open: function (id, options, callback) {
    if (typeof options == 'function') {
      callback = options;
      options = {};
    }

    SieveStore.findOne(id, {
      only: ['uri', 'name'],
    }, (err, sieve) => {
      if (err) {
        callback(new Err.NOT_FOUND({
          type: 'sieve',
          id: id,
        }));
      } else {
        // Look for open weapps. Request and focus one of them to show
        // sieve in inbox. If none is open, create and open a new tab.

        const url = sieve.uri;
        this.showURL(url, options, (err, tab) => {
          callback();
        });
      }
    });
  },

  openAndMarkRead: function (id, options, callback) {
    SieveStore.update(id, { ts_view: new Date().toISOString() }, () => {
      this.open(id, options, callback);
    });

    this.syncStore(SieveStore);
  },

  openAllAndMarkRead: async function (options) {
    let sieves = await SieveStore.find({
      'state.in': [40, 45], // C.STATE_READY, C.STATE_PAUSE
      'ts_view.lt': {type: 'field', name: 'ts_data'},
      _opt: {
        order: ['-ts_data'],
        only: ['id', 'uri', ],
      }
    });
    for(let sieve of sieves.data) {
      await this.markReadById(sieve.id);
      this.showURL(sieve.uri, {
        openInBlank: false,
      });
    }
  },

  openGettingStarted: function () {
    chrome.tabs.create({
      url: CFG.URL.WELCOME,
      active: true,
    });
  },

  resume: function () {
    auth.isReady() && Scheduler.init();
    ActionManager.init();

    gEvents.on('store:' + SieveStore.name + ':create', this.onSieveCreate, this);
    gEvents.on('store:' + SieveStore.name + ':destroy', this.onSieveDestroy, this);
    gEvents.on('store:' + SieveStore.name + ':update', this.onSieveUpdate, this);

    this.updateState();
  },

  // Called and managed by service creator
  setActive: function (active) {
    // console.log('set active:', active);
    this.active = active;
    this[active ? 'resume' : 'pause']();
    gEvents.trigger('service:active', active);
  },

  setEventSource: function (source, callback) {
    callback || (callback = function () { });
    if (this.eventSource) {
      this.eventSource.close();
    }
    this.eventSource = source;
    if (source) {
      source.addEventListener('message', (e) => {
        this.resetHeartbeatTimer();
        const
          data = JSON.parse(e.data);
        // name, id, op, ts_mod

        const store = SQLStore[REMOTE_LOCAL_NAME_MAP[data.name]];

        // Find if we have the entity

        store && store.findOne(data.id, {
          only: ['ts_mod'],
        }, (err, doc) => {
          if (err) {
            // Most likely a programming or a fatal error. Shouldn't happen.
            DBG && console.error('Error fetching doc:', err);
          } else if (!doc) {
            if (store.name !== 'sieve_data') {
                this.syncStore(store);
            }
          } else {
            const
              ts1 = new Date(data.ts_mod);


            const ts2 = new Date(doc.ts_mod);


            const delta = Math.abs(ts1.valueOf() - ts2.valueOf());

            DBG && console.log('ts:', data.ts_mod, ts1, doc.ts_mod, ts2, delta);

            // stale by more than 5 sec.
            if (delta > 5000) {
              // We have stale data. Schedule a sync after
              if (store.name === 'sieve_data') {
                if (data.op === 'U') {
                  this.syncStore(store);
                }
              } else {
                this.syncStore(store);
              }
            }
          }
        });
      });

      source.addEventListener('error', (e) => {
        DBG && console.error('EventSource error', e);
        switch (e.target.readyState) {
          case EventSource.CLOSED:
            this.initSync();
            break;
        }
      });

      source.addEventListener('open', (e) => {
        // console.log('source.addEventListener: Opened');
        SyncMan.sync(false, callback);
      });
    } else {
      callback();
    }
  },

  showInInbox: async function (id, team) {
    try {
      chrome.tabs.create({
        active: true,
        url: `${this.appUrl}#/w/${team||0}/list/all/${id}.id/`,
      });
    } catch (err) {
      console.error('Error:showInInbox:', err);
    }
  },

  showWatchlist: function (team) {
    this.showURL(`${this.appUrl}#/w/${team||0}/list/all/`);
  },

  openUrlInTabId: function (url, sender) {
    // console.log(url, sender);
    if (url.indexOf('app://') == 0) {
      const page = url.replace('app://', '');
      url = chrome.runtime.getURL(page);
    }
    if (sender.tab && sender.tab.id) {
      chrome.tabs.update(sender.tab.id, {
        active: true,
        url: url,
      });
    }
  },

  async showURL(url, options) {
    // console.log('showURL:', url);

    options || (options = {});

    let tabs = await chrome.tabs.query({ url });
    if (tabs && tabs.length > 0) {
      return await chrome.tabs.update(tabs[0].id, {
        active: true,
        url,
      });
    } else {
      // Get current tab. If it is an empty tab, do not create a new one.
      let tabs = await chrome.tabs.query({ active: true });
      const tab = tabs && tabs.length > 0 && tabs[0];
      // console.log('active tab:', tab);
      if (tab &&
        // A workaround to avoid all urls in one tab when opening multipe tabs
        options.openInBlank !== false &&
        /^(about:blank)|(about:newtab)|(chrome:\/\/newtab)/.test(tab.url)) {
        return await chrome.tabs.update(tab.id, {
          active: true,
          url,
        });
      } else {
        return await chrome.tabs.create({
          active: true,
          url,
        });
      }
    }
  },

  syncStore: function (store, options, callback) {
    if (typeof options == 'function') {
      callback = options;
      options = null;
    }
    if (SyncMan.canSync()) {
      SyncMan.syncStore(store, options || { delay: 5000 }, function () { });
    }
  },

  updateState: function (sieveId) {
    // Update following parameters:
    // 1. Unread count
    const user_id = auth.getId();
    SieveStore.find({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'ts_view.lt': { name: 'ts_data', type: 'field' },
      '$and': {
        $or: [
          ['user_id', user_id],
          ['user_id', null],
        ],
      },
    }, {
      only: ['id'],
      limit: 1,
    }, (err, result) => {
      this.state.set('unread', result.total_count);
    });

    SieveStore.find({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'err.ne': '$null',
      '$and': {
        $or: [
          ['user_id', user_id],
          ['user_id', null],
        ],
      },
    },
      {
        only: ['id'],
        limit: 1,
      }, (err, result) => {
        this.state.set('error', result.total_count);
      });

    if (sieveId) {
      SieveStore.findOne(sieveId, {
        only: ['_state'],
      }, (err, doc) => {
        if (doc && doc._state !== C.LOCAL_STATE_SYNCED) {
          this.syncStore(SieveStore, { delay: 1000 });
        }
      });
    }
  },

});

let brwsr; let curBrowser;
try {
  brwsr = ['browser', 'chrome'];
  curBrowser = window.chrome;
} catch (e) {
  console.error(e);
}
curBrowser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // console.log( "onMessage", msg);
  chromeOnMessageHandler(msg, sender, sendResponse);
  return true;
});

async function chromeOnMessageHandler(msg, sender, sendResponse) {
  function replyOnMessage(msg) {
    if (typeof browser == 'undefined') { // XXX For firefox
      sendResponse(msg);
    } else {
      Promise.reject(msg);
    }
  }
  if (msg.type == 'request') {
    let
      { module, method, args } = { ...msg };


    const modulePath = (module && module != '') ? module : ('window');


    const tStore = getValueFromPath(window, module);
    args || (args = []);
    args = args.map((arg) => arg == '$sender' ? sender : arg);
    // console.log('main: ', msg, tStore, args)
    if (tStore) {
      try {
        let res;
        const
          callable = tStore[method];
        if (typeof callable == 'function') {
          res = callable.bind(tStore)(...args);
          if (res && typeof res.then == 'function') {
            res = await res;
          }
        } else {
          res = callable;
        }
        // console.log('message: request: response', msg, res, ...args)
        try {
          sendResponse([null, res]);
        } catch (e) {
          console.error('onMessage: request: sendResponse ', e);
        }
      } catch (e) {
        DEV && console.error('onMessage: request', e);
        replyOnMessage([{ msg: e.msg || e.message || e }]);
      }
    } else {
      replyOnMessage([{ msg: 'Unhandled request, unknown store: ' + tStore }]);
    }
  } else {
    replyOnMessage([{ msg: 'Unhandled message type' }]);
  }
}


function checkSlot() {
  if (isActiveDay()) {
    const map = Prefs.get('time-slot-map');
    const date = new Date();
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const timeString = currentHours + ':' + currentMinutes;
    const slots = map[date.getDay() + ''];
    let inSlot = false;
    try {
      for (const i in slots) {
        const slot = slots[i];
        // if end > start
        if(compareTime(slot.end, slot.start)){
          //  currTime > start and end > currTime
          if(compareTime(timeString, slot.start) && compareTime(slot.end, timeString)){
            inSlot = true;
            break;
          }
        }else{
          // currTime > start or end > currTime
          if(compareTime(timeString, slot.start) || compareTime(slot.end, timeString)){
            inSlot = true;
            break;
          }
        }

      }
    } catch (e) {
      // Fix data format
      // Prefs.time-slot-map format:
      // { 0: [{ start: 'mm:ss', end:'mm:ss'}], 1: [{ start: 'mm:ss', end:'mm:ss'}] ....}
      const days = [0, 1, 2, 3, 4, 5, 6];
      const fixedTimeSlotMap = days.reduce((acc, day) => {
        acc[day] = [{ start: '00:00', end: '23:59' }];
        return acc;
      }, {});
      // sieve-slot.start and sieve-slot.end are only used in UI
      Prefs.set('sieve-slot.start', '00:00');
      Prefs.set('sieve-slot.end', '23:59');
      Prefs.set('time-slot-map', fixedTimeSlotMap);
      return true;
    }
    return inSlot;
  } else {
    return false;
  }
}

function isActiveDay() {
  const map = Prefs.get('time-slot-map');
  const day = (new Date()).getDay();
  return !!map[(day + '')];
}

function compareTime(time1, time2) {
  const time1Data = time1.split(':');
  const time1Hours = parseInt(time1Data[0]);
  const time1Minutes = parseInt(time1Data[1]);
  const time2Data = time2.split(':');
  const time2Hours = parseInt(time2Data[0]);
  const time2Minutes = parseInt(time2Data[1]);
  if (time1Hours > time2Hours) {
    return true;
  } else if (time1Hours < time2Hours) {
    return false;
  } else {
    if (time1Minutes >= time2Minutes) {
      return true;
    } else {
      return false;
    }
  }
}
;
// websql origin trial till may 2024
const otMeta = document.createElement('meta');
otMeta.httpEquiv = 'origin-trial';
otMeta.content = CFG.ORIGIN_TRIAL_TOKEN;
document.head.append(otMeta);

window.store = {
  SimpleStore,
  Prefs,
  ActionStore,
  AttrStore,
  ClientStore,
  ErrorStore,
  KVStore,
  PopupMessageStore,
  RuleStore,
  SieveStore,
  SieveDataStore,
  SieveSnapshotStore,
  SieveDataProxy,
  TagStore,
  UserStore,
  WorkStore,
  ClientGroupStore,
  MacroStore,
};
import { matchRule } from './ui/lib/rules.js';
window.matchRule = matchRule;

import { findNetAdditionsAndDeletions } from './ui/lib/diff-utils.js';
window.findNetAdditionsAndDeletions = findNetAdditionsAndDeletions;

window.initLocale = async function initLocale() {
  if (Prefs.get('locale')) {
    return;
  }
  const osLocale = await chrome.i18n.getUILanguage();
  const lang = osLocale.split(/[-_]/)[0];

  if (['de', 'fr', 'ja', 'ru', 'zh', 'es', 'it', 'pl', 'pt', 'sr'].indexOf(lang) >= 0) {
    Prefs.set('locale', lang);
  }
};

window.fetchLocalFileText = async function fetchLocalFileText(url) {
  let res = await fetch(url);
  let text = await res.text();
  return text;
}

window.service = new Service();

service.on('init', async () => {
  try {
    await chrome.runtime.sendMessage({type: 'offscreen_document:ready'});
  } catch (err) {
    // If no Distill pages are open which uses platform/ext/service.js
    // then there are no onMessage listeners, in which case thrown
    // error is logged and ignored
    if (!err.message.startsWith('Could not establish connection')) {
      console.error("Could not send offscreen_document:ready event: ", err);
    }
  }
})
service.on('init:data', async () => {
  service.setActive(Prefs.get('active'));
  try {
    let clientId = Prefs.get('client.id');
    Sentry.setExtra('clientID', clientId);
    await api('/public/clients', 'POST', await ClientStore.findOne(clientId));
  } catch(e) {
    console.error("Could not fetch clients", e);
  }
});

Prefs.on('change:active', (active, name) => {
  service.setActive(active);
  setActionIcon(active);
});

service.state.on('change:unread', (_, count) => {
  chrome.action.setBadgeText({
    text: count == 0 ? '' : count+'',
  });
});

chrome.runtime.onConnect.addListener(function(port) {
  if(port.name.startsWith('offscreen') || port.name.startsWith('frontend_service')) {
    return;
  }
  if (port.sender.tab) {
    handlePort(port);
  } else {
    console.error('Unhandled background port', port);
    port.disconnect();
  }
});

async function handlePort(port) {
  const name = port.name;
  const type = name.substring(0, name.indexOf(':'));

  switch (type) {
    case 'loader':
      if (!port.attrs) {
        port.attrs = JSON.parse(name.substring('loader:'.length));
      }

      if (!(await loaderAttachPort(port))) {
        port.disconnect();
      }
      break;

    case 'selector':
      if (!selectorAttachPort(port)) {
        port.disconnect();
      }
      break;

    default:
      port.disconnect();
  }
};

// Handles messages sent by child frames created by loaders.
addEventListener('message', function(event) {
  // console.log('EXTN:message:', event);
  const
    source = event.source;


  const child = (event.data || {}).distillchildport;

  if (child) {
    // console.log('EXTN:message:send message to child:', child);
    source.postMessage({
      distillparentport: {id: 'BG'},
      forChild: child,
    }, '*');
  }
}, false);

window.addSieveForTab = async function addSieveForTab(identityId, monitorType) {
  const [tab] = await chrome.tabs.query({
    currentWindow: true,
    active: true
  });
  const { id, url } = tab;
  if (!testURL(url)) {
    throw new Error('Page with unsupported URL: ' + url);
  }
  const constructedUrl = `${service.appUrl}#/w/${identityId || 0}/sieve/add/${monitorType}.d?url=${url}`

  await chrome.tabs.create({
    active: true,
    openerTabId: id,
    url: constructedUrl,
  });
};

window.addSieveForTemplate = async function addSieveForTemplate(tab, tplId) {
  await chrome.tabs.create({
    active: true,
    url: `${service.appUrl}#/w/0/sieve/from-tpl/${tplId}.id?url=${encodeURIComponent(tab.url)}`,
  });
};

async function saveSieve(identityId, sieve) {
  let doc;
  if(identityId) {
    doc = await _api({
      url: CFG.URL.API + SieveStore.urls.root,
      method: 'POST',
      json: sieve,
      headers: { 'x-identity': identityId, }
    });
  } else {
    doc = await SieveStore.create(sieve);
  }
  await chrome.tabs.create({
    active: true,
    url: `${service.appUrl}#/w/${identityId||0}/sieve/edit/${doc.id}.id`,
  });
}

/**
 * Miscellaneous APIs
 *
 * Pop up calls this method to open the selector
 *
 * if datasourceId is present Scraper Selector is rendered otherwise
 * HTML Selector is rendered
 *
 * @param {{ identityId: string, datasourceId?: string }}
 */
window.openSelector = async function openSelector({ identityId, datasourceId } = {}) {
  try {
    let [tab] = await chrome.tabs.query({
      currentWindow: true,
      active: true
    });

    let {id, url} = tab;
    // if there exists a VisualSelector for the current tab, destroy it before creating a new one
    // SHAUN_TODO: Make this lean
    const existingSelectorForTab = VisualSelector.ALL.find((vs) => vs.loader.tabId === id);
    if (existingSelectorForTab) {
      // console.log("Close existing visual selector for tab");
      await existingSelectorForTab.onClose();
      existingSelectorForTab.destroy();
      existingSelectorForTab.loader.destroy();
    }

    if (!testURL(url)) {
      alert('Page with unsupported url: ' + url);
      return;
    }

    // Create loader for the tab
    const loader = await createLoader({
      type: 'tab',
      info: {
        tabId: id,
      },
    });
  
    addBreadcrumb({
      message: 'openSelector: ' + url,
    });  // some wait for 'reset' timeout
    await loader.waitForEvent('reset', 5000);

    let model;
    if (datasourceId) {
      model = { datasource_id: datasourceId };
    }
    const selector = new VisualSelector(
      {
        loader,
        identityId,
        model,
        state: {
          selectorOn: true,
        }
      },
      async function(err, sieve) {
        if (err) {
          console.error('Visual Selector error:', err);
          // TODO Log error for user to see?
        } else if (sieve) {
          _.defaults(sieve, {
            schedule: JSON.stringify({
              type: 'INTERVAL',
              params: {interval: 1800},
            }),
            state: 20, // STATE_INIT, used by ui to set default options
          });

          await loader.request(0, {
            path: 'showMsg',
            data: { msg: 'Saving...', hideAfter: 6000 }
          });

          await saveSieve(identityId, sieve);
        }
        selector.destroy();
        loader.destroy();
      });
  } catch (err) {
    console.error('Error in openSelector:', err);
    Sentry.captureException(err);
  }
};

window.isActive = function isActive() {
  return Prefs.get('active');
};

window.toggleService = function toggleService() {
  Prefs.set('active', !Prefs.get('active'));
};

window.watchTab = async function watchTab({identityId} = {}) {
  let [tab] = await chrome.tabs.query({currentWindow: true, active: true});

  let {url} = tab;

  if (!testURL(url)) {
    return alert('Page with unsupported url:' + url);
  }

  const sieve = {
    content_type: 2, // C.TYPE_HTML
    config: JSON.stringify({
      includeStyle: true,
      selections: [{
        frames: [{
          index: 0,
          excludes: [],
          includes: [{
            expr: '/html',
            type: 'xpath',
          }],
        }],
      }],
    }),
    schedule: JSON.stringify({
      type: 'INTERVAL',
      params: {interval: 1800},
    }),
    name: tab.title || 'Untitled',
    uri: url,
    state: 20, // STATE_INIT
  };
  await saveSieve(identityId, sieve);
};

window.setActionIcon = (active) => {
  chrome.action.setIcon({
    path: active ? {
      19: '/ui/img/distill_19.png',
      38: '/ui/img/distill_38.png',
    }: {
      19: '/ui/img/distill_disabled_19.png',
      38: '/ui/img/distill_disabled_38.png',
    },
  });
};

// setActionIcon(Prefs.get('active'));
// Set bg color for other chromium based browsers
chrome.action.setBadgeBackgroundColor({
  color: '#c00',
});

const contextMenuClickHandler = function ({info, tab}) {
  switch (info.menuItemId) {
    case 'monitorFullPage':
      watchTab();
      break;
    case 'monitorPartsOfPage':
      openSelector();
      break;
  }
}

// chrome APIs are proxied to the background service worker
// in Manifest V3. When creating context menus from the service worker,
// a unique ID is mandatory, hence we remove all before creating context menu.
// Recreation is needed in case we make any changes to the menu details
// https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-CreateProperties
chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.onClicked.clearListeners();
  chrome.contextMenus.create({
    id: 'monitorFullPage',
    documentUrlPatterns: ['http://*/*', 'https://*/*'],
    title: 'Monitor Full Page'
  });
  
  chrome.contextMenus.create({
    id: 'monitorPartsOfPage',
    documentUrlPatterns: ['http://*/*', 'https://*/*'],
    title: 'Monitor Parts of Page'
  });
  // When service-worker becomes inactive, only listners added in the
  // top level are triggered on an event. So we add a listener for
  // chrome.contextMenus.onClicked in the top level in distill-service-worker.js
  // and send a message using runtime API, which is received here

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "contextMenus.onClicked") {
      contextMenuClickHandler(msg);
    }
  })
});

window.removeBlanks = async function removeBlanks() {
  let tabs = await chrome.tabs.query({
    pinned: true,
    url: CFG.URL.BLANK,
  });
  await chrome.tabs.remove(_.pluck(tabs, 'id'));
};

// initLocale();
// removePinnedTabs();
try {
  await removeBlanks();
} catch (err) {
  console.error('Error removing blanks:', err);
}

// Manifest V3 change: Sets the initial config of Service in platforms. 
// We used to access it directly from the background page (extension.getBackgroundPage().CFG),
// which is not available in V3. So we get it from offscreen in Service.init()
window.getConfigValues = function () {
  return window.CFG;
}

window.attachAndOpenSelector = async function attachAndOpenSelector(options) {
  let {url, model, tabId} = options;

  if (!testURL(url)) {
    console.error('Page with unsupported url: ' + url);
    return;
  }

  // Create loader for the tab and call openSelectorForTabLoader
  const loader = await createLoader({
    type: 'tab',
    info: {
      tabId,
      pinned: false,
    },
    closeTabOnDestroy : true,
  });
  await loader.waitForEvent('reset', 5000);
  loader.load(url);
  setTimeout(() => {
    chrome.tabs.update(loader.tabId, {active: true})
  }, 500)

  addBreadcrumb({
    message: 'openSelector: ' + url,
  });
  let resultSieve = await new Promise((resolve, reject) => {
    const selector = new VisualSelector({
      loader,
      model,
    }, async function (err, sieve) {
      if (err) {
        console.error('Visual Selector error:', err);
        reject(err);
        // TODO Log error for user to see?
      } else if (sieve) {
        _.defaults(sieve, {
          schedule: JSON.stringify({
            type: 'INTERVAL',
            params: {interval: 1800},
          }),
          state: 20, // STATE_INIT, used by ui to set default options
        });

        await loader.request(0, {
          path: 'showMsg',
          data: {msg: 'Saving...', hideAfter: 6000},
        });
        resolve(sieve);
      } else {
        resolve();
      }
      selector.destroy();
      loader.destroy();
    });
  });
  return resultSieve;
};

window.closeSelector = async function closeSelector(tabId){
  const loader = WebpageLoader.INSTANCES.find((loader) => loader.tabId === tabId );
  loader && await loader.destroy();
};
// reloads extension to workaround memory leaks
// TODO fix memory leaks and remove this module
(async () => {
  const RELOAD_LIMIT_SIEVE_RUN_COUNT = 1000;
  let count = 0;

  gEvents.on('store:works:create', function(work) {
    count += 1;

    if (count > RELOAD_LIMIT_SIEVE_RUN_COUNT) {
      reload();
    }
  });
})();

async function reload() {
  service.Scheduler.uninit();

  gEvents.trigger('beforereload');
  setTimeout(async function () {
    try {
      // ASK: Don't care and move on if db close throws?
      await SQLStore.db.close();
    } finally {
      try {
        await chrome.offscreen.reload();
      } catch (e) {
        DEV && console.error('reload failed', e);
        location.reload();
      }
    }
  }, 1000);
}
;
async function fetchWithTimeout(uri, options = {}) {
  try {
    options = options || {};
    const { timeout = 5000 } = options;
    const controller = new AbortController();
    const signal = controller.signal;
    options.signal = signal;

    const timeoutId = setTimeout(() => {
      controller.abort(); // Abort the fetch request
    }, timeout);
    const res = await fetch(uri, options);
    clearTimeout(timeoutId);
    return res;
  } catch (e) {
    if (e instanceof DOMException) {
      e = new Error('TIMEOUT');
    }
    throw e;
  }
}

datasources.registerFetch({
  fetch: {
    useWrapper: true,
    fetch: ({ uri, fetchOpts }) => fetchWithTimeout(uri, fetchOpts)
  }
});
;
// ASK: Should I move the constants SIEVE_ERROR_CODES and SIEVE_ERROR_CODES_VALUES to const.js?
const SIEVE_ERROR_CODES = {
  E_RUNTIME: 'ERUNTIME',
  E_REQUEST: 'EREQUEST',
  E_CONFIG: 'ECONFIG',
  E_UNHANDLED: 'EUNHANDLED',
  TYPE_UNKNOWN: 'TYPE_UNKNOWN',
  SELECTION_EMPTY: 'SELECTION_EMPTY',
  E_BLOCKED: 'EBLOCKED',
  E_SSLCERT: 'ESSLCERT',
  E_PROXY: 'EPROXY',
  E_TIMEOUT: 'TIMEOUT',
  E_CONTEXT404: 'ECONTEXT404',
  E_FRAMEEVAL: 'EFRAMEEVAL',
  E_MACRO: 'EMACRO',
  E_FEED: 'EFEED',
  E_JAVASCRIPT: 'EJAVASCRIPT',
  E_NOTFOUND: 'ENOTFOUND',
  E_CONNREFUESED: 'ECONNREFUSED',
  E_TIMEDOUT: 'ETIMEDOUT',
  E_CONNRESET: 'ECONNRESET',
  E_UNKNOWN: 'EUNKNOWN',
  ERR_DOC_PARSE: 'ERR_DOC_PARSE',
  ERR_PDF_PARSE: 'ERR_PDF_PARSE',
  EX00X: 'EX00X',
  E_BROWSER: 'EBROWSER',
  E_MISSING_INPUT: 'E_MISSING_INPUT',
};

const SIEVE_ERROR_CODES_VALUES = Object.keys(SIEVE_ERROR_CODES).reduce((ret, key) => {
  ret[SIEVE_ERROR_CODES[key]] = key;
  return ret;
}, {});

class ErrorActionsV2 {

  static queue = [];
  static working = false;

  static enqueue(workId) {
    ErrorActionsV2.queue.push(workId);
    if (!ErrorActionsV2.working) {
      ErrorActionsV2.startWorker();
    }
  }

  static async startWorker() {
    try {
      ErrorActionsV2.working = true;
      while (ErrorActionsV2.queue.length > 0) {
        try {
          const currentWorkId = ErrorActionsV2.queue.shift();
          await ErrorActionsV2.handleWork(currentWorkId);
        } catch (e) {
          console.error('ErrorActionsV2:startWorker:failed', e)
        }
      }
    } finally {
      ErrorActionsV2.working = false;
    }
  }

  /**
   * @param {string} workId
   */
  static async handleWork(workId) {
    const work = await WorkStore.findOne(
      {id: workId},
      {only: ['id', 'err', 'key', 'ts', 'rel']}
    );
    if (!work) {
      console.error(`work not found`, workId);
      return;
    }

    if (!work.err) {
      console.error(`current work did not error`, workId);
      return;
    }
    let errorActionsPrefs = Prefs.get('errorActions') || [];
    errorActionsPrefs = structuredClone(errorActionsPrefs);
    work.err = await ErrorActionsV2.updateWorkCount(work);

    for (let i = 0; i < errorActionsPrefs.length; i++) {
      const ea = errorActionsPrefs[i];
      await ErrorActionsV2.takeActions(work, ea);
    }
  }

  static async updateWorkCount(work) {
    const workErrLog = JSON.parse(work.err);
    let code = workErrLog.code;
    if (!SIEVE_ERROR_CODES_VALUES[code]) {
      console.log('unknown error code', code, 'work.id', work.id, workErrLog);
      if (SIEVE_ERROR_CODES_VALUES[workErrLog.name]) {
        code = workErrLog.name;
      } else {
        // console.log('unknown error name', workErrLog.name, 'work.id', work.id);
        code = SIEVE_ERROR_CODES.E_UNKNOWN;
      }
    }

    // fetch previous work log
    const prevWorkLog = await WorkStore.findOne({
      'ts.lt': work.ts,
      key: work.key,
      rel: work.rel,
    }, {
      limit: 1,
      only: ['id', 'err', 'ts'],
      order: ['-ts']
    });
    if (!prevWorkLog) {
      // this is the first work
      workErrLog.count = {
        total: 1,
        [code]: 1,
      }
    } else {
      const prevWorkErrLog = prevWorkLog.err ? JSON.parse(prevWorkLog.err) : {};
      if (typeof prevWorkErrLog.count !== 'object') {
        prevWorkErrLog.count = undefined;
      }
      prevWorkErrLog.count = prevWorkErrLog.count || {
        // count info was not available in previous error work log
        total: 0,
        [code]: 0,
      };
      workErrLog.count = {
        ...prevWorkErrLog.count,
        total: prevWorkErrLog.count.total + 1,
        [code]: (prevWorkErrLog.count[code] || 0) + 1,
      }
    }

    // update work
    await WorkStore.update(
      {id: work.id},
      {err: JSON.stringify(workErrLog),}
    );

    await SieveStore.update(work.key, {err: JSON.stringify(workErrLog),})
    return workErrLog;
  }


  /**
   * @param {{
   *  id: string,
   *   err: {
   *      code: string,
   *   },
   *   ts: number,
   * }} work
   * @param {{
   *   minimum_time_interval: number,
   *   number_of_consecutive_errors: number,
   *   sieve_filter: string,
   *   trigger: boolean,
   *   actions: {
   *     type: string,
   *     config: string, //json string
   *   }[],
   * }} errorActionConfig
   */
  static async takeActions(work, errorActionConfig) {
    if (!errorActionConfig.trigger) {
      return;
    }
    const {number_of_consecutive_errors} = errorActionConfig;
    const {err: workErr} = work;
    if (!workErr || !workErr.count || !workErr.count.total) {
      // the work has no error or the error count is not available
      console.log('takeActions:work has no error or the error count is not available', 'work.id', work.id, 'workErr', workErr);
      return;
    }
    if (workErr.count.total % number_of_consecutive_errors !== 0) {
      return;
    }

    // TODO: handle crawler work logs too
    const appSieve = await SieveStore.findOne({id: work.key});
    if (!appSieve) {
      console.error(`sieve not found for sieveOpt.id`, work.key, 'work.id', work.id);
      return;
    }
    const user = await UserStore.findOne({id: appSieve.user_id});
    for (const action of errorActionConfig.actions) {
      action.config = JSON.parse(action.config);
      const processor = ACTIONS[action.type];
      if (!processor) {
        continue;
      }
      try {
        await processor({
          work,
          user,
          appSieve,
          action,
          errorActionConfig,
        })
      } catch (e) {
        console.error('takeActions:processor failed', 'action', action, 'user.id', user.id, 'work.id', work.id, 'sieveId', appSieve.id, e);
      }
    }
  }
}


class ErrorActionProcessorEmail {

  static MAX_QUEUED_MONITORS = 50;
  static jobQueued = false;

  /**
   * get queued email content
   */
  static getQueuedMonitors() {
    return Prefs.get('errorActions:email') || [];
  }

  static appendToQueuedMonitor(sieveInfo) {
    const queuedSievesInfo = ErrorActionProcessorEmail.getQueuedMonitors();
    if (queuedSievesInfo.length === ErrorActionProcessorEmail.MAX_QUEUED_MONITORS) {
      return;
    }
    queuedSievesInfo.push(sieveInfo);
    return Prefs.set('errorActions:email', queuedSievesInfo);
  }

  static setQueuedMonitorInfo(sieveInfoList) {
    return Prefs.set('errorActions:email', sieveInfoList);
  }

  static getLastErrorActionJobTS() {
    return Prefs.get('errorActions:lastErrorActionEmailJobTS') || 0;
  }

  /**
   * @param {number} ts
   */
  static setLastErrorActionJobTS(ts) {
    Prefs.set('errorActions:lastErrorActionEmailJobTS', ts);
  }

  static isJobQueued() {
    return ErrorActionProcessorEmail.jobQueued;
  }

  /**
   * @param {{
   *   id: string,
   *   err: {
   *      code: string,
   *   },
   *   ts: number,
   * }} work
   * @param {{
   *   id: string,
   *   type: 'group' | 'user',
   *   name: string,
   * }} user
   * @param {Object} appSieve
   * @param {{
   *   type: number,
   *   config: {
   *     email: string,
   *   }
   * }} action
   * @param {{
   *   minimum_time_interval: number,
   *   number_of_consecutive_errors: number,
   *   sieve_filter: string,
   *   trigger: boolean,
   *   actions: {
   *     type: string,
   *     config: string, //json string
   *   }[],
   * }} errorActionConfig
   */
  static async action_email({work, user, appSieve, action, errorActionConfig}) {
    const user_id = appSieve.user_id;
    const sieve_id = appSieve.id;

    if (!user) {
      console.error('action_email:user is not defined', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }

    if (!action?.config?.email) {
      console.error('action_email:config is not defined', action, 'user_id', user_id);
      return;
    }

    const sieveInfo = {
      sieveId: sieve_id,
      name: appSieve.name,
      uri: appSieve.uri,
      error_code: work.err.code,
      work_id: work.id,
      // TODO: Get URL from the config
      error_code_link: 'https://distill.io/docs/web-monitor/troubleshooting-errors/' + '#' + (work.err.code?.toLowerCase() || ''),

      // https://monitor.distill.io/#/w/0/sieve/4d7cb814-3beb-11ec-9bc3-1f52dfc2a91f/detail
      sieveURI: `https://monitor.distill.io/#/u/${user.type === 'group' ? user_id : 0}/sieve/${sieve_id}/detail`,

      // https://monitor.distill.io/#/checks/0/0cde4cd0-8f56-11ed-87a5-5b336dcb24fc?work=c9f6af4a-abfe-11ee-b3b6-0f0b90608a15
      workLogURI: `https://monitor.distill.io/#/checks/${user.type === 'group' ? user_id : 0}/${sieve_id}?work=${work.id}`,
      ts: new Date(work.ts).getTime(),
      tsString: new Date(work.ts).toUTCString(),
    };

    ErrorActionProcessorEmail.appendToQueuedMonitor(sieveInfo);

    if (ErrorActionProcessorEmail.isJobQueued()) {
      DBG && console.log('action_email:job already queued', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }

    let delay = 1;
    const lastErrorActionEmailJobTS = ErrorActionProcessorEmail.getLastErrorActionJobTS();
    if (lastErrorActionEmailJobTS) {
      const diff = Date.now() - lastErrorActionEmailJobTS;
      if (diff < errorActionConfig.minimum_time_interval * 60 * 1000) {
        delay = errorActionConfig.minimum_time_interval * 60 * 1000 - diff;
      }
    }

    ErrorActionProcessorEmail.jobQueued = true;
    DBG && console.log('action_email:job will be queued', 'work_id', work.id, 'user_id', user_id, 'action', action, 'delay', delay);

    // ASK: Should the timeout ID be saved?
    setTimeout(async () => {
      try {
        let queuedSievesInfo = ErrorActionProcessorEmail.getQueuedMonitors();
        const sievesToWorkOn = queuedSievesInfo.splice(0, ErrorActionProcessorEmail.MAX_QUEUED_MONITORS);
        ErrorActionProcessorEmail.setQueuedMonitorInfo(queuedSievesInfo);
        if (sievesToWorkOn.length === 0) {
          return;
        }

        let monitors = sievesToWorkOn.reduce((acc, sieveInfo) => {
          if (acc[sieveInfo.sieveId]) {
            acc[sieveInfo.sieveId].error_code = sieveInfo.error_code;
            acc[sieveInfo.sieveId].error_code_link = 'https://distill.io/docs/web-monitor/troubleshooting-errors/' + '#' + (sieveInfo.error_code?.toLowerCase() || '');
            acc[sieveInfo.sieveId].ts = Math.min(acc[sieveInfo.sieveId].ts, sieveInfo.ts);
            acc[sieveInfo.sieveId].tsString = new Date(acc[sieveInfo.sieveId].ts).toUTCString();
          } else {
            acc[sieveInfo.sieveId] = sieveInfo;
          }
          return acc;
        }, {});
        monitors = Object.values(monitors);

        if (!monitors || monitors.length === 0) {
          throw new Error('action_email:monitors is empty');
        }

        await api('/agents/error_action/email', 'POST', {
          context: {
            action,
            monitors,
            monitor_count: monitors.length,
          },
          logData: {
            work_id: monitors.length === 0 ? monitors[0].work_id : undefined,
            clientId: Prefs.get('client.id'),
          },
        });
      } catch (e) {
        console.error('action_email:api failed', 'work_id', work.id, 'user_id', user_id, 'action', action, e);
      } finally {
        ErrorActionProcessorEmail.setLastErrorActionJobTS(Date.now());
        ErrorActionProcessorEmail.jobQueued = false;
      }
    }, delay);
  }
}


class ErrorActionProcessorSMS {

  static MAX_QUEUED_MONITORS = 25;
  static jobQueued = false;

  /**
   * get queued content
   * @returns {{
   *   monitor: {
   *    sieveId: string,
   *    name: string,
   *    uri: string,
   *    error_code: string,
   *    work_id: string,
   *    workLogURI: string,
   *   },
   *   uniqueIds: Object<string, 1>
   * }}
   */
  static getQueuedMonitors() {
    return Prefs.get('errorActions:sms') || [];
  }

  static appendToQueuedMonitor(sieveInfo) {
    let queuedSievesInfo = ErrorActionProcessorSMS.getQueuedMonitors();
    if (!queuedSievesInfo || Object.keys(queuedSievesInfo).length === 0) {
      queuedSievesInfo = {
        monitor: sieveInfo,
        uniqueIds: {
          [sieveInfo.sieveId]: 1,
        }
      }
      return Prefs.set('errorActions:sms', queuedSievesInfo);
    } else {
      if (Object.keys(queuedSievesInfo.uniqueIds).length >= ErrorActionProcessorSMS.MAX_QUEUED_MONITORS) {
        return
      }
      if (queuedSievesInfo.uniqueIds[sieveInfo.sieveId]) {
        return;
      }
      queuedSievesInfo.uniqueIds[sieveInfo.sieveId] = 1;
      return Prefs.set('errorActions:sms', queuedSievesInfo);
    }
  }

  static setQueuedMonitorInfo(sieveInfoList) {
    return Prefs.set('errorActions:sms', sieveInfoList);
  }

  static getLastErrorActionJobTS() {
    return Prefs.get('errorActions:lastErrorActionSMSJobTS') || 0;
  }

  /**
   * @param {number} ts
   */
  static setLastErrorActionJobTS(ts) {
    Prefs.set('errorActions:lastErrorActionSMSJobTS', ts);
  }

  static isJobQueued() {
    return ErrorActionProcessorSMS.jobQueued;
  }

  /**
   * @param {{
   *   id: string,
   *   err: {
   *      code: string,
   *   },
   *   ts: number,
   * }} work
   * @param {{
   *   id: string,
   *   type: 'group' | 'user',
   *   name: string,
   * }} user
   * @param {Object} appSieve
   * @param {{
   *   type: number,
   *   config: {
   *     phone: string,
   *   }
   * }} action
   * @param {{
   *   minimum_time_interval: number,
   *   number_of_consecutive_errors: number,
   *   sieve_filter: string,
   *   trigger: boolean,
   *   actions: {
   *     type: string,
   *     config: string, //json string
   *   }[],
   * }} errorActionConfig
   */
  static async action_sms({work, user, appSieve, action, errorActionConfig}) {
    const user_id = appSieve.user_id;
    const sieve_id = appSieve.id;

    if (!user) {
      console.error('action_sms:user is not defined', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }

    if (!action?.config?.phone) {
      console.error('action_sms:phone is not defined', action, 'user_id', user_id);
      return;
    }

    const sieveInfo = {
      sieveId: sieve_id,
      name: appSieve.name,
      uri: appSieve.uri,
      error_code: work.err.code,
      work_id: work.id,

      // https://monitor.distill.io/#/checks/0/0cde4cd0-8f56-11ed-87a5-5b336dcb24fc?work=c9f6af4a-abfe-11ee-b3b6-0f0b90608a15
      workLogURI: `https://monitor.distill.io/#/checks/${user_id}/${sieve_id}?work=${work.id}`,
    };

    ErrorActionProcessorSMS.appendToQueuedMonitor(sieveInfo);

    if (ErrorActionProcessorSMS.isJobQueued()) {
      DBG && console.log('action_sms:job already queued', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }

    let delay = 1;
    const lastErrorActionEmailJobTS = ErrorActionProcessorSMS.getLastErrorActionJobTS();
    if (lastErrorActionEmailJobTS) {
      const diff = Date.now() - lastErrorActionEmailJobTS;
      if (diff < errorActionConfig.minimum_time_interval * 60 * 1000) {
        delay = errorActionConfig.minimum_time_interval * 60 * 1000 - diff;
      }
    }

    ErrorActionProcessorSMS.jobQueued = true;
    DBG && console.log('action_sms:job will be queued', 'work_id', work.id, 'user_id', user_id, 'action', action, 'delay', delay);

    setTimeout(async () => {
      try {
        let queuedSievesInfo = ErrorActionProcessorSMS.getQueuedMonitors();
        if (!queuedSievesInfo) {
          return;
        }
        if (!queuedSievesInfo.monitor || !queuedSievesInfo.uniqueIds) {
          return;
        }

        ErrorActionProcessorSMS.setQueuedMonitorInfo({});

        const monitor_count = Object.keys(queuedSievesInfo.uniqueIds).length;

        await api('/agents/error_action/sms', 'POST', {
          context: {
            action,
            monitors: [queuedSievesInfo.monitor],
            monitor_count: Object.keys(queuedSievesInfo.uniqueIds).length,
          },
          logData: {
            work_id: monitor_count === 1 ? queuedSievesInfo.monitor.work_id : undefined,
            clientId: Prefs.get('client.id'),
          },
        });
      } catch (e) {
        console.error('action_sms:api failed', 'work_id', work.id, 'user_id', user_id, 'action', action, e);
      } finally {
        ErrorActionProcessorSMS.setLastErrorActionJobTS(Date.now());
        ErrorActionProcessorSMS.jobQueued = false;
      }
    }, delay);
  }
}


class ErrorActionProcessorWebhook {

  /**
   * @param {{
   *   id: string,
   *   err: {
   *      code: string,
   *   },
   *   ts: number,
   * }} work
   * @param {{
   *   id: string,
   *   type: 'group' | 'user',
   *   name: string,
   * }} user
   * @param {Object} appSieve
   * @param {{
   *   type: number,
   *   config: any,
   * }} action
   * @param {{
   *   minimum_time_interval: number,
   *   number_of_consecutive_errors: number,
   *   sieve_filter: string,
   *   trigger: boolean,
   *   actions: {
   *     type: string,
   *     config: string, //json string
   *   }[],
   * }} errorActionConfig
   */
  static async action_webhook({work, user, appSieve, action, errorActionConfig}) {
    const user_id = appSieve.user_id;
    const sieve_id = appSieve.id;

    if (!user) {
      console.error('action_webhook:user is not defined', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }

    DBG && console.log('action_webhook:job will be queued', 'work_id', work.id, 'user_id', user_id, 'action', action);

    try {
      await api('/agents/error_action/webhook', 'POST', {
        context: {
          action,
          sieve_id,
          sieve: appSieve,
          work_id: work.id,
          work: work,
          error_code: work.err.code,
          user_id,
        },
        logData: {
          sieve_id,
          work_id: work.id,
          clientId: Prefs.get('client.id'),
        },
      });
    } catch (e) {
      console.error('action_webhook:api failed', 'work_id', work.id, 'user_id', user_id, 'action', action, e);
    }
  }
}

class ErrorActionProcessorPopup {

  static MAX_QUEUED_MONITORS = 25;
  static jobQueued = false;

  /**
   * get queued content
   * @returns {{
   *   monitor: {
   *    sieveId: string,
   *    name: string,
   *    work_id: string,
   *   },
   *   uniqueIds: Object<string, 1>
   * }}
   */
  static getQueuedMonitors() {
    return Prefs.get('errorActions:popup') || null;
  }

  static appendToQueuedMonitor(sieveInfo) {
    let queuedSievesInfo = ErrorActionProcessorPopup.getQueuedMonitors();
    if (!queuedSievesInfo || Object.keys(queuedSievesInfo).length === 0) {
      queuedSievesInfo = {
        monitor: sieveInfo,
        uniqueIds: {
          [sieveInfo.sieveId]: 1,
        }
      }
      return Prefs.set('errorActions:popup', queuedSievesInfo);
    } else {
      if (Object.keys(queuedSievesInfo.uniqueIds).length >= ErrorActionProcessorPopup.MAX_QUEUED_MONITORS) {
        return
      }
      if (queuedSievesInfo.uniqueIds[sieveInfo.sieveId]) {
        return;
      }
      queuedSievesInfo.uniqueIds[sieveInfo.sieveId] = 1;
      return Prefs.set('errorActions:popup', queuedSievesInfo);
    }
  }

  static setQueuedMonitorInfo(sieveInfoList) {
    return Prefs.set('errorActions:popup', sieveInfoList);
  }

  static getLastErrorActionJobTS() {
    return Prefs.get('errorActions:lastErrorActionPopupJobTS') || 0;
  }

  /**
   * @param {number} ts
   */
  static setLastErrorActionJobTS(ts) {
    Prefs.set('errorActions:lastErrorActionPopupJobTS', ts);
  }

  static isJobQueued() {
    return ErrorActionProcessorPopup.jobQueued;
  }

  /**
   * @param {{
   *   id: string,
   *   err: {
   *      code: string,
   *   },
   *   ts: number,
   * }} work
   * @param {{
   *   id: string,
   *   type: 'group' | 'user',
   *   name: string,
   * }} user
   * @param {Object} appSieve
   * @param {{
   *   type: number,
   *   config: {
   *     phone: string,
   *   }
   * }} action
   * @param {{
   *   minimum_time_interval: number,
   *   number_of_consecutive_errors: number,
   *   sieve_filter: string,
   *   trigger: boolean,
   *   actions: {
   *     type: string,
   *     config: string, //json string
   *   }[],
   * }} errorActionConfig
   */
  static async action_popup({work, user, appSieve, action, errorActionConfig}) {
    const user_id = appSieve.user_id;
    const sieve_id = appSieve.id;

    if (!user) {
      console.error('action_popup:user is not defined', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }

    const sieveInfo = {
      sieveId: sieve_id,
      name: appSieve.name,
      work_id: work.id,
    };

    ErrorActionProcessorPopup.appendToQueuedMonitor(sieveInfo);

    if (ErrorActionProcessorPopup.isJobQueued()) {
      DBG && console.log('action_popup:job already queued', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }


    let delay = 1;
    const lastErrorActionEmailJobTS = ErrorActionProcessorPopup.getLastErrorActionJobTS();
    if (lastErrorActionEmailJobTS) {
      const diff = Date.now() - lastErrorActionEmailJobTS;
      if (diff < errorActionConfig.minimum_time_interval * 60 * 1000) {
        delay = errorActionConfig.minimum_time_interval * 60 * 1000 - diff;
      }
    }

    ErrorActionProcessorPopup.jobQueued = true;
    DBG && console.log('action_popup:job will be queued', 'work_id', work.id, 'user_id', user_id, 'action', action, 'delay', delay);

    setTimeout(async () => {
      try {
        let queuedSievesInfo = ErrorActionProcessorPopup.getQueuedMonitors();
        if (!queuedSievesInfo) {
          return;
        }
        if (!queuedSievesInfo.monitor || !queuedSievesInfo.uniqueIds) {
          return;
        }

        ErrorActionProcessorPopup.setQueuedMonitorInfo({})

        // TODO: NotifyPopup.showErrorGroupV2 is async, not sure why.
        NotifyPopup.showErrorGroupV2({
          monitors: [queuedSievesInfo.monitor],
          monitor_count: Object.keys(queuedSievesInfo.uniqueIds).length,
        })
      } catch (e) {
        console.error('action_popup:api failed', 'work_id', work.id, 'user_id', user_id, 'action', action, e);
      } finally {
        ErrorActionProcessorPopup.setLastErrorActionJobTS(Date.now());
        ErrorActionProcessorPopup.jobQueued = false;
      }
    }, delay);
  }
}

class ErrorActionProcessorAudio {

  static QUEUED_MONITORS_COUNT = 0;
  static jobQueued = false;

  static appendToQueuedMonitor(sieveInfo) {
    ErrorActionProcessorAudio.QUEUED_MONITORS_COUNT += 1;
  }

  static getLastErrorActionJobTS() {
    return Prefs.get('errorActions:lastErrorActionAudioJobTS') || 0;
  }

  /**
   * @param {number} ts
   */
  static setLastErrorActionJobTS(ts) {
    Prefs.set('errorActions:lastErrorActionAudioJobTS', ts);
  }

  static isJobQueued() {
    return ErrorActionProcessorAudio.jobQueued;
  }

  /**
   * @param {{
   *   id: string,
   *   err: {
   *      code: string,
   *   },
   *   ts: number,
   * }} work
   * @param {{
   *   id: string,
   *   type: 'group' | 'user',
   *   name: string,
   * }} user
   * @param {Object} appSieve
   * @param {{
   *   type: number,
   *   config: {
   *     tone: string,
   *   }
   * }} action
   * @param {{
   *   minimum_time_interval: number,
   *   number_of_consecutive_errors: number,
   *   sieve_filter: string,
   *   trigger: boolean,
   *   actions: {
   *     type: string,
   *     config: string, //json string
   *   }[],
   * }} errorActionConfig
   */
  static async action_audio({work, user, appSieve, action, errorActionConfig}) {
    const user_id = appSieve.user_id;
    const sieve_id = appSieve.id;

    if (!user) {
      console.error('action_audio:user is not defined', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }

    ErrorActionProcessorAudio.appendToQueuedMonitor();

    if (ErrorActionProcessorAudio.isJobQueued()) {
      DBG && console.log('action_audio:job already queued', 'work_id', work.id, 'user_id', user_id, 'action', action);
      return;
    }

    let delay = 1;
    const lastErrorActionEmailJobTS = ErrorActionProcessorAudio.getLastErrorActionJobTS();
    if (lastErrorActionEmailJobTS) {
      const diff = Date.now() - lastErrorActionEmailJobTS;
      if (diff < errorActionConfig.minimum_time_interval * 60 * 1000) {
        delay = errorActionConfig.minimum_time_interval * 60 * 1000 - diff;
      }
    }

    ErrorActionProcessorAudio.jobQueued = true;
    DBG && console.log('action_audio:job will be queued', 'work_id', work.id, 'user_id', user_id, 'action', action, 'delay', delay);

    // ASK: Should the timeout ID be saved?
    setTimeout(async () => {
      try {
        if (ErrorActionProcessorAudio.QUEUED_MONITORS_COUNT < 1) {
          return;
        }

        ErrorActionProcessorAudio.QUEUED_MONITORS_COUNT = 0;
        NotifyAudio.play(action)
      } catch (e) {
        console.error('action_audio:api failed', 'work_id', work.id, 'user_id', user_id, 'action', action, e);
      } finally {
        ErrorActionProcessorAudio.setLastErrorActionJobTS(Date.now());
        ErrorActionProcessorAudio.jobQueued = false;
      }
    }, delay);
  }
}


/**
 * @type {Object<string, Function<any, Promise>>}
 */
const ACTIONS = {}

ACTIONS[C.ACTION_EMAIL] = ErrorActionProcessorEmail.action_email;
ACTIONS[C.ACTION_SMS] = ErrorActionProcessorSMS.action_sms;
ACTIONS[C.ACTION_WEBHOOK] = ErrorActionProcessorWebhook.action_webhook;
ACTIONS[C.ACTION_LOCAL_POPUP] = ErrorActionProcessorPopup.action_popup;
ACTIONS[C.ACTION_LOCAL_AUDIO] = ErrorActionProcessorAudio.action_audio;;
class Scraper {

  /**
   * @type {Player}
   */
  player;

  /**
   * @type {{
   *   name: string,
   *   scraped: boolean
   *   node?: any
   * }[]}
   */
  blockStack;

  /**
   * @type {Schema}
   */
  schema;

  pageContext;

  /**
   * @type {Object<string, Object>}
   */
  data;

  constructor(player, schema, browserWrapper) {
    this.player = player;
    this.schema = schema;
    this.pageContext = browserWrapper.pageContext;
    this.pageLoader = browserWrapper.pageLoader;
    this.blockStack = [];
  }

  /**
   * Pushes a context to the block stack
   * @param {any} context - The context to push
   */
  pushToBlockStack(context) {
    this.blockStack.push({
      name: context,
      scraped: false
    });
  }

  /**
   * Pops a context from the block stack
   * @returns {{
   *   name: string,
   *   scraped: boolean
   *   node?: any
   * }} - The popped context
   */
  popBlockStack() {
    return this.blockStack.pop();
  }

  /**
   * Peeks at the top of the block stack
   * @returns {{
   *   name: string,
   *   scraped: boolean
   *   node?: any
   * }} - The context at the top of the block stack
   */
  peekBlockStack() {
    return this.blockStack[this.blockStack.length - 1];
  }

  async callExtractor(funcName, arg) {
    return await this.pageContext.frame_request({
      id: this.pageLoader.id,
      frame: 0,
      input: {
        path: 'extractor',
        data: {
          type: funcName,
          arg
        }

      },
    });
  }

  async getHTML() {
    const selectors = [];
    for (const tag of this.player.vm.context.tagList) {
      for (const selector of tag.selectors) {
        selectors.push({ type: selector.type, expr: selector.value });
      }
    }
    // console.log({ selectors });
    const { html } = await this.pageContext.frame_request({
      id: this.pageLoader.id,
      frame: 0,
      input: {
        path: 'filterHTMLAndGetData',
        data: { includes: selectors }
      }
    })
    // console.log("getHTML Data ", html);
    return html;
  }

  async scrapeContext(context) {
    let contextNameToScrape = context.name === xlibs.expressions.C.UNTITLED ? null : context.name;
    // console.log('scraping context', context, 'contextNameToScrape', contextNameToScrape);
    const [data, err] = await this.callExtractor('scrape', contextNameToScrape);
    // console.log('Extracted Data ', data, err);
    if (err) {
      throw xlibs.types.StackedError.handle(err);
    }
    for (const propertyId in data) {
      this.schema.id2PropertyMap.get(propertyId)?.setData(data[propertyId]);
    }
  }

  /**
   * Player hook method
   * @param {string} eventName - The event name
   * @param {object} params - The parameters
   */
  async playerHook(eventName, { node, error }) {
    const { HOOK_EVENT, Block } = xlibs.expressions;
    if (error) {
      return;
    }
    // console.log('hook', eventName, node?.toJSON());
    // console.log('blockStack', this.blockStack);
    if (eventName === HOOK_EVENT.BEFORE_EVAL && node instanceof Block) {
      const context = this.peekBlockStack();
      if (context && !context.scraped) {
        this.scrapeContext(context);
        context.scraped = true;
      }
      this.pushToBlockStack(node.name);
    } else if (eventName === HOOK_EVENT.AFTER_EVAL) {
      if (node instanceof Block) {
        const context = this.popBlockStack();
        if (!context.scraped) {
          await this.scrapeContext(context);
        }
      }
    }
  }
}

