
/*
NOTE: Do not edit. This is an auto-generated file. All changes will be lost!
*/


// REMOVE ME
(() => {
  const MSG_INIT = 1;
  const MSG_EVENT = 2;
  const MSG_REQUEST = 3;
  const MSG_RESPONSE = 4;
  const MSG_LOG = 5;

  const isRoot = top == window;

  const attrs = {
    id: ''+(Math.random() * 10000000)|0,
    root: isRoot,
    // these are saved on port, can be used by selectors
    title: document.title,
    uri: location.href,
  };


  let port;

  // console.log('PORT:LOADER:new', attrs, attrs.uri);

  // NOTE: We call connect whenever port-loader is evaluated in a frame.
  // i.e. a new port is always created
  // If required we can save a port-already-connected reference in window.loading
  // and only call connect when the frame's port is in disconnected state.
  // This will allow us to have the possibility for keeping multiple ports
  // in a single frame if required in the future

  connect();

  function connect() {
    // console.log('PORT:LOADER:loader:connect', attrs.uri);
    port = chrome.runtime.connect({
      // `name` is mapped to specific port class in background
      name: 'loader:' + JSON.stringify(attrs),
    });

    port.onMessage.addListener(onPortMessage);
    port.onDisconnect.addListener(onPortDisconnect);
  }

  function onInit() {
    // console.log('LOADER:onInit:', attrs.uri);

    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', onLoad, false);
    } else {
      onLoad();
    }

    async function onLoad() {
      // console.log('LOADER:DOMContentLoaded:', attrs.uri);
      try {
        sendEvent('DOMContentLoaded', { title: document.title });
      } catch (e) {
        // fatal error
        console.error('LOADER:error loading mods:', e);
        sendEvent('init:error', { message: e.message });
        port.disconnect(); // let background disconnect?
      };
    }
  }

  function onPortDisconnect() {
    // console.log('PORT:LOADER:disconnect', attrs.uri);
    port.onMessage.removeListener(onPortMessage);
    port.onDisconnect.removeListener(onPortDisconnect);

    port = null
  }

  function onPortMessage(msg) {
    // console.log('-> PORT:LOADER:message', msg, attrs.uri);

    switch (msg.type) {

      case MSG_INIT:
        onInit(msg);
        break;

      default:
        sendMsgFromPortToContent(msg);
        break;
    }
  }

  function sendEvent(type, event) {
    port?.postMessage({
      type: MSG_EVENT,
      data: {event, type},
    });
  }

  // content -> port
  function sendMsgFromContentToPort(msg) {
    // console.log('<- PORT:LOADER:sendMsgFromContentToPort', msg);
    port?.postMessage(msg);
  }

  // port -> content
  function sendMsgFromPortToContent(msg) {
    // console.log('-> PORT:LOADER:sendMsgFromPortToContent', msg, attrs.uri);
    if(window.onMsgFromPortToContent) {
      window.onMsgFromPortToContent(msg);
    } else {
      throw new Error('no message handler defined by content');
    }
  }

  window.sendMsgFromContentToPort = sendMsgFromContentToPort;
})();

