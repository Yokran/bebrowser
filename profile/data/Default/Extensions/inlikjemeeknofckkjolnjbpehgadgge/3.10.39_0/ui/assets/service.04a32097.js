const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
const scriptRel = "modulepreload";
const seen = {};
const base = "./";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
class CallError extends Error {
  constructor(e, module, method) {
    super(`Error at ${module}: ${method}: ${e.msg || e.message}`);
    this.error = e;
  }
}
function createProxyMethod(method, module) {
  return async function(...args) {
    let res;
    let callback;
    if (typeof args[args.length - 1] === "function") {
      callback = args.pop();
    }
    if (typeof browser !== "undefined") {
      res = await browser.runtime.sendMessage({
        type: "request",
        module,
        method,
        args
      });
    } else {
      res = await new Promise((resolve) => {
        chrome.runtime.sendMessage({
          type: "request",
          module,
          method,
          args
        }, function(response) {
          resolve(response);
        });
      });
    }
    if (callback) {
      callback(...res);
    } else {
      let [error, value] = res;
      if (error) {
        throw new CallError(error, module, method);
      }
      return value;
    }
  };
}
function ProxyStore(module) {
  const proxy = {
    hasField: function() {
      return false;
    }
  };
  ["get", "create", "find", "findOne", "destroy", "update"].forEach((mName) => proxy[mName] = createProxyMethod(mName, module));
  return proxy;
}
function ProxyModule(module) {
  const proxy = {
    hasField: function() {
      return false;
    }
  };
  if (module === "auth") {
    proxy["getId"] = createProxyMethod("getId", module);
  } else if (module === "Prefs") {
    ["get"].forEach((mName) => proxy[mName] = createProxyMethod(mName, module));
  } else if (module === "CFG") {
    ["CLIENT", "VERSION"].forEach((mName) => proxy[mName] = createProxyMethod(mName, module));
  }
  return proxy;
}
var EXT_CONST = {
  PORT_EVENT_SERVICE: "serviceEvent",
  PORT_EVENT_SERVICE_STATE: "stateEvent",
  PORT_EVENT_OFFSCREEN: "offscreenEvent"
};
let Service, serviceProxy;
let ID = function(i) {
  return function() {
    return i++;
  };
}(1);
chrome.runtime.onMessage.addListener(async (msg, send) => {
  if (msg.type === "offscreen_document:ready") {
    createOffscreenWindowPort();
  }
});
class OffScreenWindowPort {
  constructor(port) {
    this.port = port;
    this.listenerMap = {};
    this.disconnected = false;
    this.portCallbacks = {};
  }
  async resendLostRequests() {
    for (let id in this.portCallbacks) {
      await this.port.postMessage(this.portCallbacks[id].msg);
    }
  }
  onEvent(path, event, callback) {
    var _a;
    (_a = this.port) == null ? void 0 : _a.postMessage({
      type: EXT_CONST.PORT_EVENT_OFFSCREEN,
      path,
      method: "addPortOffEventProxy",
      event
    });
    let listenerKey = JSON.stringify(path) + "@" + event;
    this.listenerMap[listenerKey] = this.listenerMap[listenerKey] || [];
    this.listenerMap[listenerKey].push(callback);
  }
  offEvent(path, event, callback) {
    var _a;
    let listenerKey = JSON.stringify(path) + "@" + event;
    if (!this.listenerMap[listenerKey]) {
      return;
    }
    this.listenerMap[listenerKey].splice(this.listenerMap[listenerKey].indexOf(callback), 1);
    (_a = this.port) == null ? void 0 : _a.postMessage({
      type: EXT_CONST.PORT_EVENT_OFFSCREEN,
      path,
      method: "removePortOffEventProxy",
      event
    });
  }
  async setPort(port) {
    this.port = port;
    this.port.onMessage.addListener((msg) => {
      var _a;
      if (msg.type === EXT_CONST.PORT_EVENT_SERVICE_STATE) {
        serviceProxy.state.set(msg.attributes);
        return;
      } else if (msg.type === EXT_CONST.PORT_EVENT_OFFSCREEN) {
        this.triggerEvent(msg.path, msg.event, ...msg.args);
        return;
      }
      let id = msg.id;
      if (id) {
        (_a = this.portCallbacks[id]) == null ? void 0 : _a.fn(msg.err, msg.data);
        delete this.portCallbacks[id];
      }
    });
    this.restoreListeners();
    this.port.onDisconnect.addListener((msg) => {
      this.port = null;
    });
    await this.resendLostRequests();
  }
  triggerEvent(path, event, ...args) {
    let listenerKey = JSON.stringify(path) + "@" + event;
    if (!this.listenerMap[listenerKey]) {
      return;
    }
    this.listenerMap[listenerKey].forEach((callback) => callback(...args));
  }
  restoreListeners() {
    var _a;
    for (let listenerKey in this.listenerMap) {
      let listenerKeyParts = listenerKey.split("@");
      let path = JSON.parse(listenerKeyParts[0]);
      let event = listenerKeyParts[1];
      (_a = this.port) == null ? void 0 : _a.postMessage({
        type: EXT_CONST.PORT_EVENT_OFFSCREEN,
        path,
        method: "addPortOffEventProxy",
        event
      });
    }
  }
}
let offscreenWindowPort = new OffScreenWindowPort();
class PortEventManager {
  constructor(path) {
    this.path = path;
  }
  on(event, callback) {
    offscreenWindowPort.onEvent(this.path, event, callback);
  }
  off(event, callback) {
    offscreenWindowPort.offEvent(this.path, event, callback);
  }
}
async function createOffscreenWindowPort() {
  try {
    let port = await chrome.runtime.connect(chrome.runtime.id, {
      name: "frontend_service_" + Date.now()
    });
    await offscreenWindowPort.setPort(port);
  } catch (err) {
    console.error("Error sending message:", err);
  }
}
const _ = window._;
const Backbone = window.Backbone;
if (!Backbone) {
  throw new Error("ADD Backbone");
}
class ServiceProxyError extends Error {
  constructor(errorObject, path, method) {
    super("Error at Service Proxy: " + path + method + ": " + errorObject.message);
    this.details = errorObject;
  }
}
async function _call(path, method, ...args) {
  const id = ID();
  let msg = {
    id,
    path,
    method,
    args
  };
  return new Promise(async (resolve, reject) => {
    if (!offscreenWindowPort.port) {
      await createOffscreenWindowPort();
    }
    let fn = (err, data) => err ? reject(err) : resolve(data);
    offscreenWindowPort.portCallbacks[id] = { fn, msg };
    try {
      offscreenWindowPort.port.postMessage(msg);
    } catch (err) {
      throw new ServiceProxyError(err, path, method);
    }
  });
}
async function _callStore(storeName, method, ...args) {
  return await _call(["store", storeName], method, ...args);
}
async function _callService(moduleName, method, ...args) {
  return await _call(["service", moduleName], method, ...args);
}
async function _callBGWindowMethod(method, ...args) {
  return await _call([], method, ...args);
}
class BGProxy {
  constructor(moduleName, methods = []) {
    this.moduleName = moduleName;
    methods.forEach((method) => {
      this[method] = (...args) => this.call(method, ...args);
    });
  }
  async call(method, ...args) {
    return await _call([this.moduleName], method, ...args);
  }
}
class Store extends BGProxy {
  constructor(options) {
    super("store", ["find", "findOne", "update", "create", "destroy"]);
    this.storeName = options.storeName;
  }
  async call(method, ...args) {
    return await _callStore(this.storeName, method, ...args);
  }
}
class SimpleStoreProxy extends BGProxy {
  constructor(options) {
    super("store", ["del", "getDefault", "get", "save", "set"]);
    this.storeName = options.storeName;
  }
  async call(method, ...args) {
    return await _callStore(this.storeName, method, ...args);
  }
}
function SimpleStore(name) {
  this.name = name;
  const store = this.storage.getItem(this.name);
  this.data = store && JSON.parse(store) || {};
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
    return value !== void 0 ? _.clone(value) : arguments.length > 1 ? defaultValue : this.getDefault(key);
  },
  save: function() {
    this.storage.setItem(this.name, JSON.stringify(this.data));
  },
  set: function(key, value) {
    const oldValue = this.data[key];
    if (oldValue !== value) {
      this.data[key] = value;
      this.save();
      this.trigger("change:" + key, value, oldValue, key);
    }
  }
});
class StoreProxy {
  constructor(storeList) {
    this.SimpleStore = SimpleStore;
    storeList.forEach((store) => {
      this[store] = new Store({
        storeName: store
      });
    });
  }
}
class SchedulerProxy extends BGProxy {
  constructor() {
    super("Scheduler", ["isBusy"]);
  }
  async call(method, args) {
    return await _callService(this.moduleName, method, args);
  }
}
class HTTPProxy extends BGProxy {
  constructor() {
    super("HTTP", ["get"]);
  }
}
class SyncManProxy extends BGProxy {
  constructor() {
    super("SyncMan", ["sync"]);
  }
  async _syncStore(store) {
    this.call("_syncStore", store);
  }
  async get(store) {
    this.call("get", store);
  }
}
class FeedProxy extends BGProxy {
  constructor() {
    super("Feed", ["fromString"]);
  }
}
class XmlProxy extends BGProxy {
  constructor() {
    super("Xml", ["parse"]);
  }
}
class DatasourceProxy extends BGProxy {
  constructor() {
    super("datasources", ["fetchData", "applyFilters", "findDatasource"]);
  }
}
class AuthProxy extends BGProxy {
  constructor() {
    super("auth", ["getId", "getToken", "getUser", "isReady", "isLoggedIn", "isLegacy", "logout"]);
  }
}
class SupportsProxy extends BGProxy {
  constructor() {
    super("Supports");
  }
  async init() {
    this.tabForDynamic = true;
    this.tabForXFrame = true;
  }
}
class BGServiceProxy extends BGProxy {
  constructor() {
    super("service", [
      "getInfo",
      "checkNow",
      "initSync",
      "isActive",
      "isReady",
      "showInInbox",
      "showURL",
      "openAllAndMarkRead",
      "showWatchlist",
      "toggleService"
    ]);
  }
}
class ServiceProxy extends BGProxy {
  constructor() {
    super("serviceProxy", [
      "api",
      "_api",
      "fetchFromAPIOrStore",
      "addSieveForTab",
      "createLoader",
      "isActive",
      "makeAPICaller",
      "openSelector",
      "watchTab",
      "utilApi",
      "attachAndOpenSelector",
      "closeSelector",
      "getConfigValues"
    ]);
    this.auth = new AuthProxy();
    this.store = new StoreProxy(
      [
        "ClientStore",
        "UserStore",
        "SieveStore",
        "TagStore",
        "SieveDataStore",
        "SieveSnapshotStore",
        "ActionStore",
        "RuleStore",
        "AttrStore",
        "ErrorStore",
        "WorkStore",
        "PopupMessageStore",
        "KVStore",
        "ClientGroupStore"
      ]
    );
    this.store.Prefs = new SimpleStoreProxy({
      storeName: "Prefs"
    });
    this.Scheduler = new SchedulerProxy();
    this.SyncMan = new SyncManProxy();
    this.Feed = new FeedProxy();
    this.Xml = new XmlProxy();
    this.HTTP = new HTTPProxy();
    this.service = new BGServiceProxy();
    this.Supports = new SupportsProxy();
    this.datasources = new DatasourceProxy();
    this.state = new Backbone.Model({ unread: 0, error: 0 });
    this.serviceEvents = _.extend({}, Backbone.Events);
    this.eventManager = new PortEventManager(["service"]);
    this.serviceEvents.on = this.eventManager.on.bind(this.eventManager);
    this.serviceEvents.off = this.eventManager.off.bind(this.eventManager);
    this.gEvents = new PortEventManager(["gEvents"]);
  }
  async init() {
    await createOffscreenWindowPort();
    await this.Supports.init();
    this.clientId = await this.store.Prefs.get("client.id");
    this.CFG = await this.getConfigValues();
  }
  async call(method, ...args) {
    return await _callBGWindowMethod(method, ...args);
  }
}
if (!serviceProxy) {
  serviceProxy = new ServiceProxy();
}
try {
  Service = serviceProxy = new ServiceProxy();
} catch (e) {
  serviceProxy = Service = {
    CFG: {
      URL: {
        API: "api.distill.io",
        APP: "monitor.distill.io",
        AUTH: "accounts.distill.io"
      }
    },
    store: new Proxy({}, {
      get: (obj, prop) => ProxyStore(prop)
    }),
    proxy: new Proxy({}, {
      get: (obj, prop) => ProxyModule(prop)
    }),
    service: _.extend({
      state: _.extend({}, Backbone.Events)
    }, Backbone.Events),
    gEvents: Backbone,
    Supports: {
      tabForXFrame: true
    },
    utilities: {},
    init: function() {
    }
  };
}
export { Service as S, __vitePreload as _, serviceProxy as s };
