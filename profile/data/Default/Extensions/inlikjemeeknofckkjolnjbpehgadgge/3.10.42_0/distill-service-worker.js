import contentMethods from "./content-methods.js";
import EXT_CONST from './ui/lib/const-ext.js';

import CFG from "./cfg.js";
import {
  BrowserClient,
  makeFetchTransport,
  Scope,
  addBreadcrumb,
} from './ui/lib/sentry.min.js';

// filter integrations that use the global variable

const client = new BrowserClient({
  ...CFG.SENTRY,
  tracesSampleRate: 0.001,
  transport: makeFetchTransport,
});

const scope = new Scope();
scope.setClient(client);

client.init();

let backgroundToOffscreenPort;

chrome.alarms.clear('offscreen-keep-alive');
// Clear existing and create an alarm which will cause service worker to
// start every periodInMinutes and hence trigger offscreen document creation (if it does not exist)
chrome.alarms.create('offscreen-keep-alive', {
  periodInMinutes: 2,
});

chrome.runtime.onStartup.addListener(async function() {
  console.log('Chrome onStartup', new Date());
});

chrome.alarms.onAlarm.addListener(async function(alarm) {
  if (alarm.name === 'offscreen-keep-alive') {
    let hasOffscreen = await hasOffscreenDocument();
    if (!hasOffscreen) {
      // Log the case where service worker is active but offscreen document
      // We just log for inormation and create the offscreen document anyway
      addBreadcrumb("No offscreen document found, but service worker is active. Creating one");
      setTimeout(createOffscreenDocument, 1000);
    }
  }
});

chrome.offscreen.reload = async () => {
  try {
    await chrome.offscreen.closeDocument();
  } catch (err) {
    // Throws if document is already closed, catch and ignore
  }
  await createOffscreenDocument();
}

let originalExecScript = chrome.scripting.executeScript;

chrome.scripting.executeScript = async function(...args) {
  // If execute script passes a func, we get the func reference
  // from contentMethods and pass it to the executeScript method
  let func = args[0].func;
  if (func) {
    args[0].func = contentMethods[func];
  }
  return await originalExecScript(...args);
}

class BackgroundToOffscreenPort {
  constructor(port) {
    this.port = port;
    this.listenerMap = {};
    this.disconnected = false;
    this.portListeners = {};
    this.onMessage = this.onMessage.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    port.onMessage.addListener(this.onMessage);
    port.onDisconnect.addListener(this.onDisconnect);
  }

  onDisconnect() {
    this.disconnected = true;
    this.removeAllPortEventProxies();
    this.port.onMessage.removeListener(this.onMessage);
    this.port.onDisconnect.removeListener(this.onDisconnect);
  }
  
  async onMessage(msg) {
    let mod = globalThis;
    let {id, path, method, args, type} = msg;
    try {
      if (type === EXT_CONST.PORT_EVENT_SERVICE) {
        // method will be either addPortEventProxy or removePortEventProxy
        this[method](path);
        return;
      }
      for (let name of path) {
        mod = mod[name];
      }

      let res = await mod[method](...args);
      backgroundToOffscreenPort.postMessage({ id, data: res, err: null});
    } catch (err) {
      if (!backgroundToOffscreenPort) {
        console.error("Sending message to disconnected port");
        throw err;
      }
      backgroundToOffscreenPort.postMessage({ 
        id,
        err: {
          message: err.message,
          details: "Error calling chrome API in service worker" + JSON.stringify(path) + method + ": " + err.message,
        },
        data: null
      });
    }
  }

  postMessage(msg) {
    if (this.disconnected) {
      console.error('Sending message to disconnected port', msg);
      return;
    }
    this.port.postMessage(msg);
  }

  disconnect() {
    this.port.disconnect();
  }

  // TODO: Make these two a single function?
  forwardPortEvent(path, ...args) {
    this.postMessage({type: EXT_CONST.PORT_EVENT_SERVICE, path, args});
  }

  addPortEventProxy(path) {
    // Adds a listener to the module defined by path
    // When the module emits an event, we forward it 
    // it as a message to the offscreen document
    if (!this.listenerMap[JSON.stringify(path)]) {
      const listener = (...args) => this.forwardPortEvent(path, ...args);
      let mod = globalThis;
      for (let name of path) {
        mod = mod[name];
      }
      mod.addListener(listener);
      this.listenerMap[JSON.stringify(path)] = {
        listener
      };
    }
    this.listenerMap[JSON.stringify(path)].count = (this.listenerMap[JSON.stringify(path)].count || 0) + 1;
  }

  removePortEventProxy(path) {
    this.listenerMap[JSON.stringify(path)].count -= 1;
    if (this.listenerMap[JSON.stringify(path)].count === 0) {
      let mod = globalThis;
      for (let name of path) {
        mod = mod[name];
      }
      mod.removeListener(this.listenerMap[JSON.stringify(path)].listener);
      delete this.listenerMap[JSON.stringify(path)];
    }
  }
  removeAllPortEventProxies() {
    for (let path in this.listenerMap) {
      let mod = globalThis;
      for (let name of JSON.parse(path)) {
        mod = mod[name];
      }
      mod.removeListener(this.listenerMap[path].listener);
    }
    this.listenerMap = {};
  }
}

const RETRIABLE_ERRORS = [
  'Tabs cannot be edited right now (user may be dragging a tab).',
];
const origTabsCreate = chrome.tabs.create;
// override create method to handle error while dragging and retry
chrome.tabs.create = async function (options, retryCount = 0) {
  try {
    return await origTabsCreate(options);
  } catch (err) {
    if(RETRIABLE_ERRORS.includes(err.message) && retryCount < 3) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return chrome.tabs.create(options, retryCount + 1);
    }
    throw err;
  }
}


chrome.runtime.onConnect.addListener((port) => {
  if (port.name.startsWith("offscreen")) {
    backgroundToOffscreenPort = new BackgroundToOffscreenPort(port);
    port.onDisconnect.addListener(() => {
      backgroundToOffscreenPort = null;
    });
  } else {
    return;
  }
})

chrome.contextMenus.onClicked.addListener((info, tab) =>{
  chrome.runtime.sendMessage({type: 'contextMenus.onClicked', info, tab})
});

async function hasOffscreenDocument() {
  if ('getContexts' in chrome.runtime) {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: [chrome.runtime.getURL('') + 'background.html']
    });
    return Boolean(contexts.length);
  } else {
    // Backward compatibility for older Chrome versions
    const matchedClients = await clients.matchAll();
    let clients = await matchedClients.some(client => {
      client.url.includes('background.html');
    });
    return clients;
  }
}


async function createOffscreenDocument() {
  await chrome.offscreen.createDocument({
    url: 'background.html',
    reasons: ['WORKERS'],
    justification: "Offscreen document to load sqlite-wasn data store and load and parse content documents"
  });
};

hasOffscreenDocument().then(async exists => {
  if (!exists) {
    try {
      await createOffscreenDocument();
    } catch (e) {
      console.error("Error creating offscreen document", e);
    }
  }
});