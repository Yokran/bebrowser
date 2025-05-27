
/*
NOTE: Do not edit. This is an auto-generated file. All changes will be lost!
*/

(function(scope) {

if(window.__LOADED) return;
else window.__LOADED = true;
;
window.ID = (function() {
  let x = 0;
  return () => x += 1;
})();

Error.prototype.toJSON = function(){
  return { code: this.code, message: this.message, stack: this.stack };
}

window.Api = (function() {
  const MSG_INIT = 1;
  const MSG_EVENT = 2;
  const MSG_REQUEST = 3;
  const MSG_RESPONSE = 4;
  const MSG_LOG = 5;

  const NS = 'xbrwsr_';

  window.onMsgFromPortToContent = onMsgFromPortToContent;

  // Handle message from extension.
  function onMsgFromPortToContent(msg) {
    if (msg.type == MSG_REQUEST) {
      // console.log('CONTENT: request:', msg._id, msg.path, msg);
      handleRequest(msg._id, _.pick(msg, 'path', 'data'));
    } else if (msg.type == MSG_EVENT) {
      // console.log('CONTENT: event:', msg);
    } else {
      console.error('CONTENT: Unhandled message:', msg);
    }
  }

  function postToExtn(msg) {
    sendMsgFromContentToPort(msg);
  }

  const error = function error(e) {
    // DBG && console.error('content error:', e, e.stack);
    return e.message ? (e.message + (e.stack ? ' ' + e.stack : '' )) : e + '';
  };

  const trigger = function trigger(event) {
    postToExtn({
      type: MSG_EVENT,
      data: event,
    });
    // TODO Post event to local event listeners.
  };

  function removeTags(name) {
    const embeds = Array.prototype.slice.call(
      document.getElementsByTagName(name), 0);
    embeds.forEach(function(el) {
      el.parentNode.removeChild(el);
    });
  }

  if (document.readyState == 'complete' || document.readyState == 'loaded') {
    documentOnReady();
  } else {
    document.addEventListener('DOMContentLoaded', documentOnReady, false);
  }

  function documentOnReady() {
    // We clean up the document before we prepare it for interaction.
    // XXX This may be a surprise for the end user.
    document.removeEventListener('DOMContentLoaded', documentOnReady, false);
    // removeTags('embed');
  }

  function handleRequest(_id, msg) {
    // console.log('handleRequest:', msg);

    const options = _.isString(msg) ? JSON.parse(msg) : msg;

    function callback(err, data) {
      if (err) {
        // console.error("handleRequest failed:", _id, err);
        // Convert error to string
        if (typeof err == 'string') {
          //TODO: this block is not needed anymore
          err = {message: err};
        } else if (err instanceof Error) {
          err = JSON.parse(JSON.stringify(err));
        } else if (!err.code) {
          try {
            err = {message: JSON.stringify(err)};
          } catch (e) {
            err = {message: 'unknown error response received'};
          }
        }
        err.source = location.href;
      }

      // DBG && console.log('handleRequest: response:' + _id + " " + options.path + " " + stringify(data));

      // Send response back
      postToExtn({
        type: MSG_RESPONSE,
        _id,
        err,
        data,
      });
    }

    callApi(options, callback);
  }

  async function callApi({path, data}, callback = () => {}) {
    try {
      const api = Api[path] || Api.none(path);
      if(api.length == 2) {
        api(data, callback);
      } else {
        let result = await api(data);
        callback(null, result);
      }
    } catch (e) {
      console.error("API: unhandled exception: ", path, e);
      callback(e);
    }
  }

  window.addEventListener('message', onWindowMessage, true);

  Object.defineProperty(window, 'handleRequest', { get: () => handleRequest });

  let Api = {
    eval: evalScript,
    none: function(path) {
      return function none(input, callback) {
        callback({code: 'E_API', message: 'API not found:' + path} );
      }
    },
    require: function(modules, sendResponse) {
      require(modules, function() { sendResponse() }, sendResponse);
    },
    MSG_EVENT,
    MSG_REQUEST,
    MSG_RESPONSE,
    MSG_LOG,
  };

  // Support for inter-frame communication.
  const requestHandlers = {};
  const responseHandlers = {};
  const LISTENERS = {};


  function notifyListeners(name, data) {
    const listeners = LISTENERS[name];
    listeners && listeners.forEach(function(l) {
      l(data);
    });
  }

  // Receves message from another frame.
  function onWindowMessage(event) {
    const data = event.data;
    const type = data.brwsr_type;
    // We identify out messages using name brwsr_type.
    const id = data.id;
    const path = data.path;
    const source = event.source;

    // console.log('window.onmessage:'+type+':'+id+':'+path);

    if (type == Api.MSG_REQUEST) {
      // console.log('request:' + JSON.stringify(data));

      // Call request handler
      // We allow limited set of API access to callers from other windows.
      var handler = requestHandlers[path];
      if (handler) {
        handler(event, function(err, data) {
          // console.log('requestHandler:response:', err, data);
          source.postMessage({
            brwsr_type: Api.MSG_RESPONSE,
            id: id,
            err: err,
            data: data,
          }, '*');
        });
      } else {
        // TODO Emit log event for storage in errors table.
        // console.log('WARN! Unhandled request:' + stringify(event.data), event);
      }
    } else if (type == Api.MSG_RESPONSE) {
      // console.log('response:' + JSON.stringify(data));
      var handler = responseHandlers[id];
      if (handler) {
        delete responseHandlers[id];
        handler(event.data.err, event.data.data);
      } else {
        // TODO Emit log event
        // console.log('WARN! Unhandled response:' + stringify(event.data));
      }
    } else if (type == Api.MSG_EVENT) {
      // TODO Notify event listeners. Let modules register themselves as
      // event listeners.
      // console.log('WARN: TODO: Propagate event');
      notifyListeners(data.type, data.data);
    } else if (type != undefined) {
      // console.error('ERR: Unknow message type:'+type);
    }
  }

  // Sends event to another frame.
  function sendEvent(win, type, data) {
    // DBG && console.log('sendEvent:', stringify(data));
    win.postMessage({
      brwsr_type: Api.MSG_EVENT,
      type,
      data,
    });
  }

  // Sends request to another frame.
  function sendRequest(win, path, data, callback) {
    // DBG && console.log('sendRequest:' + path + ':' + stringify(data));

    const id = ID();
    responseHandlers[id] = callback;
    win.postMessage({
      brwsr_type: Api.MSG_REQUEST,
      id,
      path,
      data,
    }, '*');
    // DBG && console.log('sendRequest: done');
  }

  function syncToAsync(fn) {
    return function(input, callback) {
      const result = fn.call(this, input);
      callback(void 0, result);
    };
  }

  function evalScript(script, sendResponse) {
    let alert; let confirm; let prompt;
    // console.log('evalScript:', script);
    eval(script);
  }

  const host = document.createElement('x-feedback-d')
  host.setAttribute('class', NS+'ui');
  host.setAttribute('style', 'position: initial; display: block !important; visibility: visible !important;'); // some sites set position to `relative` to *
  const shadow = host.attachShadow({ mode: 'closed' });
  document.documentElement.appendChild(host);

  return {
  // Namespace is used when creating identifiable attributes in public context.
    NS,
    hostRoot: shadow,

    call: callApi,
    callAsync: function(options) {
      return new Promise((resolve, reject) => {
        callApi(options, (err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    extend: function(extensions) {
      _.extend(Api, extensions);
    // console.log("APIs:" + stringify(Object.keys(Api)) + ':' + location.href);
    },
    syncToAsync,
    /**
   * Triggers an event. `event` object should specify event type and data
   */
    trigger: function(event) {
      trigger(event);
    },

    // Internal functions used for inter-frame/window communications.
    sendEvent,
    sendRequest,

    // Event listeners for messages from other frames
    // TODO Rename to addFrameMessageListener
    addEventListener: function(name, listener) {
      (LISTENERS[name] || (LISTENERS[name] = [])).push(listener);
    },
    addRequestHandler: function(path, handler) {
    // Allow overrides?
      requestHandlers[path] = handler;
    },
  };
})();
;
window.util = (function() {
  Api.addRequestHandler('frame/offset', function(event, callback) {
    const el = findWindowsFrame(event.source);
    if (!el) {
      callback('iframe element not found');
    } else {
      getOffsetFromScreen(el, callback);
    } // else somebody else's request or message
  });

  Api.extend({
    createEl: Api.syncToAsync(createEl),
    showEl: Api.syncToAsync(showEl),
    showMsg: Api.syncToAsync(showMsg),
    removeMsg: Api.syncToAsync(removeMsg),
    scrollToFirstScrapedElement: Api.syncToAsync(scrollToFirstScrapedElement),
    setScraperHighlightVisibility: Api.syncToAsync(setScraperHighlightVisibility)
  });

  function setScraperHighlightVisibility(visible) {
    const scraperHighlightStyleEl = document.querySelector('[distill-scraper]');
    if(visible) {
      if(!scraperHighlightStyleEl) {
        addScraperHighlightStyle();
      }
    } else {
      if(scraperHighlightStyleEl) {
        scraperHighlightStyleEl.remove();
      }
    }
  }

  function addScraperHighlightStyle() {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('distill-scraper', true);
    styleEl.innerText = ` 
            [distill-tag]{
                position: relative;
                border: 1px solid #0066cc;
                box-shadow: 0 0 2px #0066cc;
            }

            [distill-tag]::before {
                content: attr(distill-tag);
                position: absolute;
                left: 0;
                bottom: 0;
                transform: translateY(100%) translateX(-1px);
                color: #0066cc;
                font-size: 10px;
                background-color: #ffffff99;
                border: solid 1px #0066cc99;
                z-index: 1;
                padding: 0 2px;
                font-family: monospace;
                line-height: initial;
            }`
    document.head.appendChild(styleEl);
  }

  // add style by default
  addScraperHighlightStyle();

  function createEl(config) {
    const el = document.createElement(config.name);
    _.each(config.attrs, function(value, name) {
      el.setAttribute(name, value);
    });
    _.each(config.style, function(value, name) {
      el.style[name] = value;
    });
    _.each(config.on, function(value, name) {
      el.addEventListener(name, value)
    });
    _.each(config.children, function(child) {
      if (_.isString(child)) {
        el.appendChild(document.createTextNode(child));
      } else if (_.isObject(child)) {
        el.appendChild(createEl(child));
      }
    });
    el.className += ' ' + Api.NS;
    return el;
  }

  function removeEl(el) {
    el?.remove()
  }

  function showEl(input) {
    const currentRoot = Api.hostRoot
    const el = createEl(input.el);
    const oldEl = el.id && currentRoot.getElementById(el.id);
    oldEl?.remove()

    currentRoot.appendChild(el);
    if (input.hideAfter) {
      setTimeout(function() {
        el.remove()
        removeEl(el);
      }, input.hideAfter);
    }
    return el;
  }

  function showMsg(input) {
    showEl({
      hideAfter: input.hideAfter,
      el: {
        name: 'div',
        style: {
          'position': 'fixed',
          'top': 0,
          'z-index': 10000000000,
          'display': 'flex',
          'left': 'calc((100vw - 440px) / 2)',
          'width': '440px',
          'border': 'solid 1px #666',
          'box-shadow': '2px 2px 2px rgba(0, 0, 0, .2)',
          'background-color': 'rgb(255, 255, 162)',
          'align-items': 'center',
        },
        attrs: {
          id: Api.NS + 'msg',
        },
        children: [
          {
            name: 'img',
            attrs: {
              'src': `${window.URL_BASE}ui/img/logo-classic.svg`,
              'height': 32,
              'width': 32,
            }, style: {
              'border-right': 'solid 1px #aaa'
            }
          },
          {
          name: 'span',
          style: {
            'padding': '6px 12px',
            'flex-grow': '1',
            'color': 'black'
          },
          children: [
            input.msg,
          ],
        }, {
            name: 'a',
            on: {
              click: function (e) {
                removeMsg()
              }
            },
            attrs: {
              id: Api.NS + 'msg_close_btn',
              href: 'javascript: void 0',
            },
            style: {
              'margin-left': '20px',
              'padding': '8px',
              'text-decoration': 'none',
            },
            children: [
              "Close",
            ],
          }],
      },
    });
  }

  function removeMsg(_) {
    const msgElId = Api.NS + 'msg'
    const msgEl = Api.hostRoot.getElementById(msgElId);
    msgEl?.remove();
  }

  function findWindowsFrame(aWindow) {
    const frames = document.querySelectorAll('iframe,frame');
    for (var i = 0, frame; i < frames.length; i += 1) {
      frame = frames[i];
      if (frame.contentWindow == aWindow) {
        return frame;
      }
    }
  }

  function getWindowOffset(callback) {
    if (window == window.top) {
      callback(null, {top: 0, left: 0});
    } else {
      Api.sendRequest(parent, 'frame/offset', null, function(err, offset) {
        err && console.error('ERR! getWindowOffset:' + err);
        callback(err, offset);
      });
    }
  }

  /**
 * Returns offset from screen measured in CSS pixels.
 */
  function getOffsetFromScreen(el, callback) {
    const
      offset = _.clone(el.getBoundingClientRect());
    delete offset.toJSON;

    offset.top += window.pageYOffset;
    offset.left += window.pageXOffset;

    getWindowOffset(function(err, ref) {
      err && console.error('ERR! getOffsetFromScreen:' + err);
      offset.top += ref.top;
      offset.left += ref.left;
      callback(err, offset);
    });
  }

  function scrollToFirstScrapedElement() {
    // scroll to the first element with [distill-tag] attribute
      document.querySelector('[distill-tag]')
      .scrollIntoView({ block: 'center', behaviour: 'smooth' });
  }

  return {
    getOffsetFromScreen,
    getWindowOffset,
  };
})();
;
let el;

$(document).on('focus', '*', function(e) {
  el = e.target;
  debouncedOnSetFocus();
}).on('blur', '*', function(e) {
  el = null;
  debouncedOnSetFocus();
});

$(window).on('resize scroll', _.debounce(function(e) {
  debouncedOnSetFocus();
}));

let debouncedOnSetFocus = _.debounce(onSetFocus, 200);

function onSetFocus() {
  if (el) {
    util.getOffsetFromScreen(el, function(err, offset) {
      Api.trigger({
        type: 'focus',
        event: _.extend(elInfo(el), {offset: offset}),
      });
    });
  } else {
    Api.trigger({type: 'blur'});
  }
}

function elInfo(el) {
  return {
    nodeName: el.nodeName,
    attributes: _.map(el.attributes, function(attr) {
      return {name: attr.name, value: attr.value};
    }),
  };
}

Api.extend({
  dom_setFocusNodeValue: function(input, callback) {
    if (!el) {
      callback('err:dom:el_not_found');
    } else {
      el.value = input.value;
      callback();
    }
  },
});

;
function querySelectorAll(selector) {
  if (selector.type === 'css') {
    return Array.from(document.querySelectorAll(selector.value));
  } else if (selector.type === 'xpath') {
    let els = [];
    let iterator = document.evaluate(selector.value, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    try {
      let thisNode = iterator.iterateNext();
      while (thisNode) {
        els.push(thisNode);
        thisNode = iterator.iterateNext();
      }
    } catch (e) {
      throw new Error('Document tree modified during iteration' + e)
    }
    return els;
  } else {
    throw new Error(`unknown selector type: ${selector.type}`)
  }
}

function getElement({ selector }) {
  const els = querySelectorAll(selector);
  if (els.length > 0) {
    return els[0];
  }
  throw new Error('Element not found');
}

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function waitAndGetElement({selector, opts}) {
  const timeout = (opts?.timeout ?? 30)
  let cutoffTime = Date.now() + (timeout * 1000)
  while (cutoffTime > Date.now()) {
    try{
      return getElement({selector});
    }catch(e){}
    await wait(500)
  }
  throw new Error(`timed out waiting for element ${selector.value}`)
}

class MacroPlayer {

  constructor() {
  }

  async api_click({selector, pos, opts}) {
    const el = await waitAndGetElement({selector, opts})
    el.click()
  }

  async api_focus({selector, opts}) {
    const el = await waitAndGetElement({selector, opts})
    return el.focus()
  }

  async api_mousedown() {
    return document.dispatchEvent(new MouseEvent('mousedown'));
  }

  async api_mousemove({selector, pos, opts}) {
    let offset = {x: 0, y: 0}
    const el = await waitAndGetElement({selector, opts});
    if(el){
      offset = el.getBoundingClientRect()
    }
    return document.dispatchEvent(new MouseEvent('mousemove', {
      clientX: pos.x + offset.x,
      clientY: pos.y + offset.y,
    }));
  }

  async api_mouseup() {
    return document.dispatchEvent(new MouseEvent('mousedown'));
  }

  async api_open({url, opts}) {
    window.location.href = url
  }

  async api_scroll({selector, top, left, opts}) {
    let timeout = (opts?.timeout ?? 30) * 1000;
    let startTime = Date.now();
    let el = await waitAndGetElement({selector, opts})
    let scrollDiff = Math.max(top - el.scrollTop, left - el.scrollLeft);
    while (scrollDiff > 10 && (Date.now() - startTime) < timeout) {
      el.scrollTo(left, top)
      await wait(1000);
      scrollDiff = Math.max(top - el.scrollTop, left - el.scrollLeft);
    }
  }

  async api_select({selector, value, opts}) {
    let timeout = (opts?.timeout ?? 30) * 1000;
    let startTime = Date.now();
    const el = await waitAndGetElement({selector, opts})
    const options = [...el.options];
    let matchedAnOption = false;
    while (!matchedAnOption && (Date.now() - startTime) < timeout) {
      for (let index = 0; index < options.length; index++) {
        const option = options[index]
        if (option.value === value || option.label === value) {
          option.selected = true;
          matchedAnOption = true;
          break;
        }
      }
      if (!matchedAnOption) {
        await wait(500);
      }
    }

    if (matchedAnOption) {
      el.dispatchEvent(new Event('input', {'bubbles': true}));
      el.dispatchEvent(new Event('change', {'bubbles': true}));
    } else {
      throw new Error('timed out waiting for matching select option');
    }
  }

  async api_type({selector, value, opts}) {
    const keyboardEventInit = {bubbles: false, cancelable: false, composed: false, key: '', code: '', location: 0};
    // TODO: what if the selector type is not css?
    let element
    try {
      element = await waitAndGetElement({selector, opts})
    } catch (e) {
      element = document.activeElement
    }

    if (element) {
      element.dispatchEvent(new KeyboardEvent("keydown", keyboardEventInit));
      element.value = value;
      element.dispatchEvent(new KeyboardEvent("keyup", keyboardEventInit));
      // TODO: this may break if user is expecting the incremental change
      element.dispatchEvent(new Event('input', {bubbles: true}));
      element.dispatchEvent(new Event('change', {bubbles: true}));
    }
  }

  async api_get_elements_count({selector, opts}) {
    return querySelectorAll(selector).length
  }

  async api_get_element_text({ selector }) {
    const el = getElement({ selector });
    return el?.innerText ?? "";
  }

  async api_get_elements({selector, opts}) {
    const els = await querySelectorAll(selector);

    return Promise.all(els.map(async el => ({
      type: "xpath",
      value: await Locator.findXPath(el, [])
    })));
  }

  async wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async api_wait_for_duration({duration}) {
    // TODO: This function can just be present in the background too, not need for a new port event
    await this.wait(duration * 1000)
  }

  async api_wait_for_element({selector, opts}) {
    await waitAndGetElement({selector, opts})
  }
}


const macroPlayer = new MacroPlayer()

Api.extend({
  performStep: async function (input) {
    // TODO: handle errors correctly here as the errors are correctly forwarded to the macro player client
    console.log("input", input)
    input.data = JSON.parse(input.data)
    return await macroPlayer[input.type](input.data)
  },
});

Api.extend({
  extractor: async function(input) {
    return await xlibs.extractor[input.type](input.arg);
  }
})
;
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).selectorx=t()}(this,(function(){"use strict";function e(e,t,r,i){return e+(t-e)/(r+1)}function t(e,t){return t>e?e:t}function r(e,t){let r=[];return/([a-z][A-Z])|[\-\_\s]/.test(e)?(t&&t.multi&&e.length>3&&(r=r.concat(function(e){let t=/^[a-zA-Z0-9]+[\-\_\s]{1,2}[a-zA-Z0-9]+/,r=/^[a-zA-Z0-9]+[\-\_\s]{1,2}[a-zA-Z0-9]+[\-\_\s]{1,2}[a-zA-Z-0-9]+/,i=/\b[a-z]+[A-Z][a-z]{2,}/g;return[...e.match(t)||[]].concat([...e.match(r)||[]]).concat([...e.matchAll(i)].map((e=>e[0])))}(e))),r=r.concat(i(e)),r=r.filter((e=>e.length>3)),r.slice(0,(null==t?void 0:t.maxCount)||10)):r}function i(e){return(e=(e=e.replace(/(.+)([A-Z][a-z])/g,"$1 $2")).replace(/([a-z])([A-Z])/,"$1 $2")).split(/[\s\,\_\-\(\)\[\]\=]+/)}class n extends Set{static flatten(e){let t=new n;for(let r of e)for(let e of r)t.add(e);return t}constructor(e){super(e)}get length(){return this.size}get first(){let e;for(e of this)break;return e}map(e){return[...this].map(e)}mapToSet(e){return new n(this.map(e))}filter(e){return new n([...this].filter(e))}intersects(e){for(let t of this)if(e.has(t))return!0;return!1}intersection(e){let t=new n;for(let r of this)e.has(r)&&t.add(r);return t}isSubsetOf(e){return[...this].every((t=>e.has(t)))}isEqualTo(e){return this.isSubsetOf(e)&&e.isSubsetOf(this)}difference(e){let t=[];for(let r of this)e.has(r)||t.push(r);return new n(t)}union(e){let t=new n;for(let e of this)t.add(e);for(let r of e)t.add(r);return t}clone(){return new n([...this])}toArray(){return[...this]}}let o=["false","true","blank"].concat(["css","align","animation","delay","direction","fill","mode","iteration","name","@keyframes","state","timing","function","backface","visibility","background","attachment","clip","image","origin","position","repeat","size","border","bottom","radius","right","style","width","collapse","collapsed","outset","slice","source","spacing","top","box","shadow","sizing","caption","side","clear","column","gap","rule","span","columns","counter","increment","reset","cursor","display","empty","cell","flex","basis","flow","wrap","grow","shrink","float","font","family","adjust","stretch","variant","weight","height","justify","letter","line","margin","max","min","opacity","order","outline","offset","overflow","padding","break","after","before","inside","perspective","quotes","resize","tab","layout","decoration","indent","transform","transition","property","vertical","white","space","word","index","foramt","row","col","format","highlight","vert","middle","large","down","small","overlay","trigger"]).concat(["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgrey","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred ","indigo ","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgrey","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"]).concat(["top","left","right","bottom","position"]).concat(["flex","grid","col","row","inline"]).concat(["xs","sm","lg","md","semibold","bold","medium","large","small"]).concat(["lang"]);function s(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}
/*! https://mths.be/cssesc v3.0.0 by @mathias */var a={}.hasOwnProperty,l=/[ -,\.\/:-@\[-\^`\{-~]/,h=/[ -,\.\/:-@\[\]\^`\{-~]/,u=/(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,d=function e(t,r){"single"!=(r=function(e,t){if(!e)return t;var r={};for(var i in t)r[i]=a.call(e,i)?e[i]:t[i];return r}(r,e.options)).quotes&&"double"!=r.quotes&&(r.quotes="single");for(var i="double"==r.quotes?'"':"'",n=r.isIdentifier,o=t.charAt(0),s="",d=0,c=t.length;d<c;){var f=t.charAt(d++),m=f.charCodeAt(),p=void 0;if(m<32||m>126){if(m>=55296&&m<=56319&&d<c){var g=t.charCodeAt(d++);56320==(64512&g)?m=((1023&m)<<10)+(1023&g)+65536:d--}p="\\"+m.toString(16).toUpperCase()+" "}else p=r.escapeEverything?l.test(f)?"\\"+f:"\\"+m.toString(16).toUpperCase()+" ":/[\t\n\f\r\x0B]/.test(f)?"\\"+m.toString(16).toUpperCase()+" ":"\\"==f||!n&&('"'==f&&i==f||"'"==f&&i==f)||n&&h.test(f)?"\\"+f:f;s+=p}return n&&(/^-[-\d]/.test(s)?s="\\-"+s.slice(1):/\d/.test(o)&&(s="\\3"+o+" "+s.slice(1))),s=s.replace(u,(function(e,t,r){return t&&t.length%2?e:(t||"")+r})),!n&&r.wrap?i+s+i:s};d.options={escapeEverything:!1,isIdentifier:!1,quotes:"single",wrap:!1},d.version="3.0.0";var c=s(d);function f(e){if(function(e){let t=[];for(let r=0;r<e.tokens.length;r++)if("pos"===e.tokens[r].type){let i=!0;for(let t=r-1;t>=0&&(e.tokens[t].depth===e.tokens[r].depth&&e.tokens[t].offset===e.tokens[r].offset);t--)if("tag"===e.tokens[t].type){i=!1;break}i&&t.push(e.tokens[r])}for(let r of t)e.removeToken(r);let r=[];for(let t=0;t<e.tokens.length;t++)"immediate"===e.tokens[t].type&&(0!==t&&t!==e.tokens.length-1&&e.tokens[t].depth===e.tokens[t-1].depth&&e.tokens[t].offset===e.tokens[t-1].offset&&(e.tokens[t+1].depth-e.tokens[t].depth==1||e.tokens[t+1].depth===e.tokens[t].depth&&e.tokens[t+1].offset-e.tokens[t].offset==1)||r.push(e.tokens[t]));for(let t of r)e.removeToken(t)}(e=e.clone()),0===e.tokens.length)return"*";let t="",r=e.tokens;for(let e=0;e<r.length;e++){e>0&&(r[e].depth!==r[e-1].depth||(r[e].offset,r[e-1].offset));let i=p(r[e],r[e].nodeRef);t+=m(r[e-1],r[e],t)+i}return 0!==e.tokens[r.length-1].offset&&(t+="~ *"),e.tokens[r.length-1].depth!==e.maxDepth&&(t+=" *"),t}function m(e,t,r){if(""===r)return"";if(e.depth===t.depth&&e.offset===t.offset)return"";if(0===e.offset&&t.depth-e.depth==1&&"immediate"===e.type&&"immediate"!==t.type)return"> ";if(0===e.offset&&e.depth!==t.depth)return" ";if(e.offset-t.offset==1&&e.depth===t.depth&&"immediate"===e.type)return"+ ";if(e.offset<t.offset&&e.depth===t.depth)return"~ ";if(0!==e.offset&&e.depth!==t.depth)return"~ * ";throw new Error(`unmatched condition in add Connector. prevdepth ${e.depth}, prevOffset ${e.offset}, curDept ${t.depth}, curOffset ${t.offset}`)}function p(e,t){if(e.type.startsWith("attrib")&&(e.name.includes(":")||"xmlns"===e.name))throw new Error("got xmlns token");if("pos"===e.type){let e=g(t);return 1===e?":first-child":`:nth-child(${e})`}if("tag"===e.type)return c(e.name,{isIdentifier:!0});if("attrib"===e.type&&"class"===e.name)return!/[^a-zA-Z0-9\_\-]/.test(e.value)&&e.nodeRef.classList.contains(e.value)?"."+c(e.value,{isIdentifier:!0}):`[${c(e.name,{isIdentifier:!0})}*='${c(e.value,{isIdentifier:!0})}']`;if("attrib"===e.type&&"id"===e.name)return"#"+c(e.value,{isIdentifier:!0});if("attrib"===e.type)return`[${c(e.name,{isIdentifier:!0})}='${c(e.value,{isIdentifier:!0})}']`;if("attribStart"===e.type)return`[${c(e.name,{isIdentifier:!0})}^='${c(e.value,{isIdentifier:!0})}']`;if("attribEnd"===e.type)return`[${c(e.name,{isIdentifier:!0})}$='${c(e.value,{isIdentifier:!0})}']`;if("attribContain"===e.type)return`[${c(e.name,{isIdentifier:!0})}*='${c(e.value,{isIdentifier:!0})}']`;if("attribOnly"===e.type)return`[${c(e.name,{isIdentifier:!0})}]`;if("immediate"===e.type)return"";throw new Error("the type "+e.type+" is unhandled")}function g(e){let t=e.parentElement;if(t)return Array.from(t.children).indexOf(e)+1;throw new Error("no parent")}let _=["script","style","link","head","noscript","object","meta"],y=["srcdoc","style","onafterprint","onbeforeprint","onbeforeunload","onerror","onhaschange","onload","onmessage","onoffline","onpagehide","onpageshow","onpopstate","onredo","onresize","onstorage","onundo","onunload","onblur","onchange","oncontextmenu","onfocus","onformchange","onforminput","oninput","oninvalid","onreset","onselect","onsubmit","onkeydown","onkeypress","onkeyup","onclick","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onscroll","onabort","oncanplay","oncanplaythrough","ondurationchange","onemptied","onended","onerror","onloadeddata","onloadedmetadata","onloadstart","onpause","onplay","onplaying","onprogress","onratechange","onreadystatechange","onseeked","onseeking","onstalled","onsuspend","ontimeupdate","onvolumechange","onwaiting"],b=["a","li","h1","h2","h3","h4","h5","title"],w=["td","tr","table","ul","ol","header","footer","img","label","section"],k=["td","tr","li","a"],v=["result","upvote","downvote","price","product","rating","rated"],T=["feature","vote","heading","rate"];class E{static addNewToken(e,t,r,i,n,o,s,a){if((!["attrib","attribContain","attribStart","attribEnd","text"].includes(e)||!r||N.isNotRandGen(r)&&!N.isUUID(r))&&(void 0===a||a(e,t,r,i,n))){let a=N.createNew(e,t,r,i,n,o);s.includes(a)||s.unshift(a)}}static addTextTokens(e,t,r,i,n,o,s){let a=this.getTextArrFromNode(r,n,o);a=a.filter((e=>!e.includes("'")&&e.length>3));for(let n of a)this.addNewToken("text","text",n,e,t,r,i,s)}static addPartialTokens(e,t,r,i,n,o,s,a,l){if(!N.isUUID(t))for(let h of r){let r="attribContain";s||(0===t.indexOf(h)?r="attribStart":t.indexOf(h)===t.length-h.length&&(r="attribEnd")),this.addNewToken(r,e,h,i,n,o,a,l)}}static buildTree(e,t,r,i,n){let o=[],s=[],a=this.getMaxDepth(e,t),l=a,h=e;if(!h.contains(e))throw new Error("target is not in subtree");for(;h&&t.contains(h);){if(this.generateTokens(h,r,l,0,s,o,i,n),r.siblingNodes){let e=x(h);if(e){this.generateTokens(e.node,r,l,-1,s,o,i,n);let t=x(e.node);t&&this.generateTokens(t.node,r,l,-2,s,o,i,n)}}l-=1,h.parentNode&&(h=h.parentNode)}return new E(e,t,s,a)}static generateTokens(e,t,i,n,o,s,a,l){var h;let u=e;this.addNewToken("immediate",null,null,i,n,e,o,l),u.parentElement&&this.addNewToken("pos",u.tagName.toLowerCase(),g(e).toString(),i,n,e,o,l),t.text&&this.addTextTokens(i,n,e,o,s,a,l);let d=Array.from(u.attributes).slice(0,15),c=(null===(h=u.classList)||void 0===h?void 0:h.length)>0?Array.from(u.classList).slice(0,15):[];for(let{name:t,value:r}of d)t.length>20||t.includes(":")||t.indexOf("xmlns")>=0||y.includes(t)||(r.trim().length>0&&("class"===t?c.forEach((r=>this.addNewToken("attrib",t,r,i,n,e,o,l))):r.length<=30&&this.addNewToken("attrib",t,r,i,n,e,o,l)),"id"!==t&&"class"!==t&&this.addNewToken("attribOnly",t,null,i,n,e,o,l));if(t.partAttrib){for(let t of c){let s=r(t,{multi:!0});s=[...new Set(s)],this.addPartialTokens("class",t,s,i,n,e,!0,o,l)}for(let{name:t,value:s}of d)if("class"!==t&&!(t.length>20||t.includes(":")||t.indexOf("xmlns")>=0||y.includes(t))&&s.trim().length>0){let a=r(s,{multi:!0});a=[...new Set(a)],this.addPartialTokens(t,s,a,i,n,e,!1,o,l)}}this.addNewToken("tag",u.tagName.toLowerCase(),null,i,n,e,o,l)}static getMaxDepth(e,t){let r=0,i=t;for(;i!==e;){r+=1;for(let t of Array.from(i.childNodes))if(t.contains(e)){i=t;break}}return r}static getTextArrFromNode(e,t,r){if(t.includes(e))return[];if(t.push(e),3===e.nodeType){let t=i(e.textContent||"");return 0===t.length?[]:t.length<=3?[e.textContent.trim()]:t.length<=5?t:[]}if(1===e.nodeType){let i=[];for(let n of Array.from(e.childNodes)){if(t.includes(n)||r.some((e=>n.contains(e))))break;if(i=i.concat(this.getTextArrFromNode(n,t,r)),i.length>15)break}return i.slice(0,15)}return[]}addToken(e){this.includes(e)||(this._tokens.push(e),this.sortTokens())}clone(e=!1){let t=e?[]:this.tokens;return new E(this.targetNode,this._root,t,this.maxDepth)}constructor(e,t,r,i){this.targetNode=e,this._root=t,this._tokens=[...r],this.maxDepth=i}hasSimilarToken(e,t=!1){let r=this._tokens;t&&(r=r.filter((e=>0===e.offset)));for(let t of r)if(t.equals(e))return!0;return!1}includes(e,t=!1){let r=this._tokens;t&&(r=r.filter((e=>0===e.offset)));for(let t of r)if(t.exacts(e))return!0;return!1}get length(){return this._tokens.filter((e=>0===e.offset)).length}removeToken(e){let t=this._tokens.indexOf(e);if(-1===t)throw new Error(`token not in current tree: ${e.type}, ${e.name}, ${e.value} `);return this._tokens.splice(t,1),t}sortTokens(){this._tokens.sort(((e,t)=>e.depth!==t.depth?e.depth-t.depth:e.offset!==t.offset?e.offset-t.offset:e.internalPriorityNumber!=t.internalPriorityNumber?e.internalPriorityNumber-t.internalPriorityNumber:e.name!=t.name?e.name.localeCompare(t.name):e.value.localeCompare(t.value)))}get tokens(){return this._tokens}}class N{constructor(e,t,r,i,n,o){this._value=r,this._type=e,this._name=t,this._depth=i,this._offset=n,this.nodeRef=o,this._metrics=null,this.internalPriorityNumber=N.getInternalPriorityNumber(this.type,this.name)}get depth(){return this._depth}equals(e){return this.value===e.value&&this.type===e.type&&this.name===e.name}exacts(e){return this.value===e.value&&this.type===e.type&&this.name===e.name&&this.depth===e.depth&&this.offset===e.offset}getScore(e){let t,r=0;for(t in this.metrics)r+=e[t]*this.metrics[t];return r}get metrics(){if(this._metrics)return this._metrics;throw new Error("metrics not yet updated")}get name(){return this._name||""}get offset(){return this._offset}get type(){return this._type}get value(){return this._value||""}updateMetrics(e,t,r){let i=0===this.offset;this._metrics={numPaths:t.filter((e=>e.hasSimilarToken(this,i))).length/t.length,rightLean:this.depth/e.maxDepth,specificity:N.getSpecificity(this.type,this.name,this.value),isDirectAncestor:0===this.offset?1:0,nameCssAttribProb:N.getCSSAttribProb(this.name),valueCssAttribProb:N.getCSSAttribProb(this.value),namePriority:N.getNamePriority(this.name),valuePriority:N.getValuePriority(this.value),rejectPaths:r.filter((e=>e.hasSimilarToken(this,!0))).length/(r.length||1),nameContainsNumber:N.checkIfNameContainsNumber(this.name),valueContainsNumber:N.checkIfContainsNumber(this.value),shallowRightLean:N.getShallowRightLean(this,e),tokensPathsRatio:N.getTokensPathsRatio(this,t),numOfSameTokensToRight:N.getNumOfSameTokensToRight(this,e),valueContainsSpecialChar:/[^a-zA-Z-_\s0-9]/.test(this.value)?1:0}}static createNew(e,t,r,i,n,o){return"tag"===e?new S(e,t,r,i,n,o):"pos"===e?new C(e,t,r,i,n,o):"immediate"===e?new A(e,t,r,i,n,o):new N(e,t,r,i,n,o)}static checkIfContainsNumber(e){return e.replace(/\D/g,"").length>0?1:0}static checkIfNameContainsNumber(e){return["h1","h2","h3","h4","h5","h6","h7"].includes(e)?0:N.checkIfContainsNumber(e)}static isNotRandGen(e){if(0===e.length)return 1;let r=["txt","btn"];if(/([a-zA-Z]|\b)\d+[a-zA-Z]/.test(e))return 0;if(/[0-9]{3,}/.test(e))return 0;let n=e.replace(/[^a-zA-Z]/g,"").length;if(3===n)return r.includes(e.toLowerCase())?1:0;if(n<3)return 0;let o=i(e);return 0===o.length?1:o.map((e=>/\b\d{1,2}\b/.test(e)?1:(e=e.toLowerCase()).length>2&&!/[aeiouy]/.test(e)||/[^aeiouy]{4,}/.test(e)?0:1)).reduce(t)}static isUUID(e){return e=e.toLowerCase(),/[0-9abcdef]{8}-[0-9abcdef]{4}-[0-9abcdef]{4}-[0-9abcdef]{4}-[0-9abcdef]{12}/.test(e)?1:32!==(e=e.replace(/[\-_]/g,"")).length||/[hijklmnopqrstuvwxyz]/.test(e)?0:1}static getCSSAttribProb(t){if(""===t)return 0;return i(t).map((e=>{e=e.toLowerCase();for(let t of o)if(e===t)return 1;return 0})).reduce(e)}static getInternalPriorityNumber(e,t){if("tag"===e)return 0;if("attrib"===e&&"id"===t)return 1;if("attrib"===e&&"class"===t)return 2;if("attrib"===e)return 3;if("attribOnly"===e)return 4;if("attribStart"===e)return 5;if("attribContain"===e)return 6;if("attribEnd"===e)return 7;if("text"===e)return 8;if("pos"===e)return 9;if("immediate"===e)return 10;throw new Error("unhandled case in getInternalPriorityNumber "+e+" "+t+" ")}static getNamePriority(e){return(e=e.toLowerCase()).startsWith("aria-")||b.includes(e)?1:w.includes(e)?.7:0}static getNumOfSameTokensToRight(e,t){return t.tokens.filter((t=>t.equals(e)&&(t.depth>e.depth||t.depth===e.depth&&t.offset>e.offset))).length}static getShallowRightLean(e,t){let r=t.tokens.filter((e=>0===e.offset)).sort(((e,t)=>e.depth-t.depth)).map((e=>e.nodeRef)),i=[...new Set(r)].map((e=>e.childNodes.length)),n=i.slice(0,t.length).filter((e=>e>1)).length+1;return(i.slice(0,e.depth).filter((e=>e>1)).length+1)/n}static getSpecificity(e,t,r){if("attrib"===e)return.8;if("attribStart"===e)return.75;if("attribEnd"===e)return.725;if("attribContain"===e)return.7;if("attribOnly"===e)return.6;if("text"===e)return.55;if("tag"===e)return.5;if("pos"===e)return.3;if("immediate"===e)return.2;throw new Error(`unknown token: ${e}, ${t}, ${r}`)}static getTokensPathsRatio(e,t){let r=0;for(let i of t)for(let t of i.tokens.filter((e=>0===e.offset)))t.equals(e)&&r++;let i=r/t.length;return Math.exp(3.5*(1-i+Math.log(i)))}static getValuePriority(e){return e=e.toLowerCase(),v.some((t=>e.includes(t)))?1:T.some((t=>e.includes(t)))?.5:0}static getVowelRatio(e){if(0===(e=e.toLowerCase().replace(/[^a-z]/g,"")).length)return 0;return e.replace(/[^aeiou]/g,"").length/e.length}static printTokens(e,t){let r=[],i=1;for(let n of e){let e;for(e in r.push(""+i++),r.push(`"${n.value}"-"${n.name}"-"${n.type}"-depth ${n.depth}"-offset ${n.offset}"`),r.push(`score: ${n.getScore(t)}`),n.metrics)r.push(`${e} ${n.metrics[e]}`);r.push("\n")}!function(...e){console.log("SELECTORX",...e)}(r.join("\n"))}}N.separator="<<<---|||---\x3e>>";class S extends N{updateMetrics(e,t,r){super.updateMetrics(e,t,r),this._metrics&&(this._metrics.valueCssAttribProb=0,this._metrics.nameContainsNumber=0,this._metrics.valueContainsNumber=0)}}class C extends N{updateMetrics(e,t,r){super.updateMetrics(e,t,r),this._metrics&&(this._metrics.namePriority=this.getNamePriority(),this._metrics.valueCssAttribProb=0,this._metrics.nameContainsNumber=0,this._metrics.valueContainsNumber=0)}getNamePriority(){return k.includes(this.name.toLocaleLowerCase())?.65:0}}class A extends N{getScore(e){return this._metrics?super.getScore(e):0}updateMetrics(e,t,r){super.updateMetrics(e,t,r),this._metrics&&(this._metrics.valueCssAttribProb=0,this._metrics.nameContainsNumber=0,this._metrics.valueContainsNumber=0)}}function x(e){if(e.parentNode&&e.parentNode.children.length>0){let t=Array.from(e.parentNode.children),r=t.indexOf(e),i=r-1;for(;i>=0;){if(!_.includes(t[i].nodeName.toLowerCase()))return{node:t[i],immediate:r-i==1};i--}}return null}function O(e,t,r){if(""===r)return"//";if(e.depth===t.depth&&e.offset===t.offset)return"";if(0===e.offset&&t.depth-e.depth==1&&"immediate"===e.type)return"/";if(0===e.offset&&e.depth!==t.depth)return"//";if(e.offset<t.offset&&e.depth===t.depth)return"/following-sibling::";if(0!==e.offset&&e.depth!==t.depth)return"/following-sibling::*//";throw new Error("unmatched condition")}function D(e,t,r,i){if(e.type.startsWith("attrib")&&(e.name.includes(":")||"xmlns"===e.name))throw new Error("got xmlns token");if("tag"===e.type){let t=e.name.trim();return/[^a-zA-Z0-9]/.test(t)||"svg"===t?`*[name()='${t}']`:t}if("attrib"===e.type&&"class"!==e.name)return`[@${e.name}=${P(e.value)}]`;if("attribStart"===e.type)return`[starts-with(@${e.name},${P(e.value)})]`;if("attribEnd"===e.type)return`[contains(@${e.name},${P(e.value)})]`;if("attribContain"===e.type||"class"===e.name)return`[contains(@${e.name},${P(e.value)})]`;if("attribOnly"===e.type)return"[boolean(@"+e.name+")]";if("text"===e.type)return"[contains(string(),'"+e.value+"')]";if("immediate"===e.type)return"";if("pos"===e.type){let e=function(e,t,r){let i="";if(t.parentNode===e.parentNode)i="following-sibling::";else{if(t!==e.parentNode)throw new Error("couldnt set context");i="child::"}let n=e.ownerDocument.evaluate(i+r,t,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);const o=[];let s=n.iterateNext();for(;s;)o.push(s),s=n.iterateNext();return o.indexOf(e)}(t,r,i);if(-1===e)throw new Error('curr element not related to "relativeTo" node');return`[${e+1}]`}throw new Error("the token type "+e.type+" is unhandled")}function P(e){let t=e.includes("'"),r=e.includes('"');if(t){if(r){return"concat("+e.split("'").map((e=>"'"+e+"'")).join(', "\'" ,')+")"}return`"${e}"`}return`'${e}'`}function R(e,t){let r,i=e[t];for(let n=t-1;n>=0;n--)if(e[n].offset!==i.offset||e[n].depth!==i.depth){r=e[n].nodeRef;break}return r&&r.parentNode===i.nodeRef.parentNode?r:i.nodeRef.parentNode}let q={numPaths:8,rightLean:2,specificity:3,isDirectAncestor:2,nameCssAttribProb:-4,valueCssAttribProb:-4,namePriority:2,valuePriority:1,rejectPaths:0,nameContainsNumber:-2,valueContainsNumber:-1,shallowRightLean:1,tokensPathsRatio:1,numOfSameTokensToRight:-1,valueContainsSpecialChar:-2},$={numPaths:8,rightLean:0,specificity:1,isDirectAncestor:0,nameCssAttribProb:-2,valueCssAttribProb:-2,namePriority:0,valuePriority:0,rejectPaths:-2,nameContainsNumber:0,valueContainsNumber:-1,shallowRightLean:0,tokensPathsRatio:0,numOfSameTokensToRight:0,valueContainsSpecialChar:0};class I{constructor(e){this._selected=new n,this._rejected=new n,this._doc=document,this._root=document.documentElement,this._queryCache=new Map,this._selectorTrees=new n,this._startTime=0,this.debug=!1,this._options=e,this._tokenOpts={text:!0,partAttrib:!0,immediate:!0,siblingNodes:!0,selectorType:"CSS"},this._weights=q,this._unionSeparator=" , ",e&&e.debug&&(this.debug=e.debug)}isRejection(e){return this._rejected.has(e)}isSelection(e){return this._selected.has(e)}get rejected(){return[...this._rejected]}reset(){var e;this._selected=new n,this._rejected=new n,this._selectorTrees=new n,(null===(e=this._options)||void 0===e?void 0:e.root)?this._root=this._options.root:this._root=this._doc.documentElement,this._queryCache=new Map}get selected(){return[...this._selected]}_buildQuery(e){throw new Error("Method not Implemented")}_checkTreeValidity(e){let t=this._query(e);return t.length>0&&t.has(e.targetNode)}async _getOrderedTokens(e){let t=this._getSelectorTreeArr(this._rejected),r=[...e.first.tokens];return this._updateTokenMetrics(r,e,t),await this._orderTokens(r)}_getSelectorTreeArr(e){if(this._root)return e.mapToSet((t=>{var r;return E.buildTree(t,this._root,this._tokenOpts,e.toArray(),null===(r=this._options)||void 0===r?void 0:r.filterCallback)}));throw new Error("root node not set")}async _orderTokens(e){var t;let r=null===(t=this._options)||void 0===t?void 0:t.tokenSorter;return void 0!==r?(this.debug&&function(...e){console.log("SELECTORX",...e)}("token Sorter plugin present"),e=await r(e)):e.sort(((e,t)=>{let r=e.getScore(this._weights),i=t.getScore(this._weights);return r!=i?i-r:"text"===e.type&&"text"===t.type?e.offset!=t.offset?t.offset-e.offset:-1:e.name===t.name?t.value.length-e.value.length:e.name.length+e.value.length-(t.name.length+t.value.length)})),e}async _predict(){this._selectorTrees=new n;let e=this._selected.clone(),t=0;for(this._startTime=Date.now();e.length>0;){this._timeout();let r=await this._simplify(e),i=this._query(r);if(e=e.difference(i),e.length>0&&(r=await this._simplify(i),i=this._query(r)),this._selectorTrees.add(r),t+=1,t>this._selected.length)throw new Error("stuck in loop")}return this._selectorTrees.map((e=>this._buildQuery(e))).join(this._unionSeparator)}_query(e){let t=this._buildQuery(e);return this._queryCache.has(t)||this._queryCache.set(t,this._querySelectorAll(t)),this._queryCache.get(t)}_querySelectorAll(e){throw new Error("method not implemented")}_removeBadTokens(e){let t=e.clone(),r=t.tokens;for(let e=0;e<r.length;e++)"pos"!==r[e].type||0!==e&&r[e-1].depth===r[e].depth&&r[e-1].offset===r[e].offset||r.splice(e,1);for(let e=0;e<r.length;e++)"immediate"!==r[e].type||0!==e&&r[e-1].depth===r[e].depth&&r[e-1].offset===r[e].offset||r.splice(e,1);return t}async _simplify(e){throw new Error("method not implemented")}_timeout(){var e,t;if((null===(e=this._options)||void 0===e?void 0:e.timeout)&&Date.now()-this._startTime>this._options.timeout)throw this.reset(),new Error(`Time limit exceeded, took more than ${null===(t=this._options)||void 0===t?void 0:t.timeout}ms to generate selectors`)}_updateTokenMetrics(e,t,r){for(let i of e)i.updateMetrics(t.first,t.toArray(),r.toArray())}_updateRoot(){var e;if(0!==this.selected.length){if(this._queryCache=new Map,this._doc=this._selected.first.ownerDocument,null===(e=this._options)||void 0===e?void 0:e.root){if(this._root=this._options.root,this._root.ownerDocument!==this._doc)throw new Error("root node does not belong to the same document")}else this._root=this._doc.documentElement;for(let e of this._selected)if(e.ownerDocument!==this._doc)throw new Error("elements do not belong to the same document");for(let e of this._rejected)if(e.ownerDocument!==this._doc)throw new Error("elements do not belong to the same document")}}}class j extends I{constructor(e,t){super(t),this._selected=new n(e),this._updateRoot()}_checkConvergence(e,t,r){let i=this._query(e);if(!this._checkTreeValidity(e))throw console.log("tree",[...e.tokens]),console.log("query",this._buildQuery(e)),new Error("not a valid tree was built");return i.isEqualTo(r)?2:i.isSubsetOf(r)?3:i.isSubsetOf(t)&&!i.isEqualTo(t)?1:0}_addToken(e,t,r){let i=e.clone(),n=this._query(i);return i.addToken(t),{convergence:this._checkConvergence(i,n,r),tree:i}}_shakeTree(e,t){let r=this._query(e),i=t.filter((t=>e.tokens.includes(t)));i=i.reverse();for(let t of i){this.debug&&console.log("removing",t.type,t.name,t.value,t.depth,t.offset),e.removeToken(t);let i=this._query(e);i.isSubsetOf(this._selected)&&i.has(e.targetNode)&&r.isSubsetOf(i)?this.debug&&console.log("query",this._buildQuery(e)):(this.debug&&console.log("added back"),e.addToken(t))}}async _simplify(e){this.debug&&console.log("number of unsatisified",e.length);let t=this._getSelectorTreeArr(e),r=await this._getOrderedTokens(t);if(!this._checkTreeValidity(t.first)||1!==this._query(t.first).length)throw this.reset(),new Error("not a valid tree was built "+this._buildQuery(t.first));let i=t.first.clone(!0);this.debug&&N.printTokens(r,this._weights);let n=0;for(let t of r){this._timeout(),this.debug&&console.log(t.type,t.name,t.value,t.depth,t.offset);let r=this._addToken(i,t,e);if(i=r.tree,n=r.convergence,this.debug&&console.log("status",r.convergence,"selector",this._buildQuery(i)),n>=2)break}return this.debug&&console.log("after loop",this._buildQuery(i)),this._shakeTree(i,r),this.debug&&console.log("after shake tree",this._buildQuery(i)),i}}class L extends j{constructor(e,t){super(e,t),this._tokenOpts.text=!1,this._unionSeparator=" , "}_buildQuery(e){return f(e=this._removeBadTokens(e))}_querySelectorAll(e){if(!e)return new n;if(!this._doc)throw new Error("document not set");if(!this._root)throw new Error("root node not set");return new n(Array.from(this._root.querySelectorAll(e)))}}class z extends j{constructor(e,t){super(e,t),this._tokenOpts.selectorType="XPATH",this._tokenOpts.text=(null==t?void 0:t.useText)||!1,this._unionSeparator=" | "}_buildQuery(e){return function(e){if(function(e){let t=[];for(let r=0;r<e.tokens.length;r++)"pos"===e.tokens[r].type&&(0!==r&&e.tokens[r-1].depth===e.tokens[r].depth&&e.tokens[r-1].offset===e.tokens[r].offset||t.push(e.tokens[r]));for(let r of t)e.removeToken(r);let r=[];for(let t=0;t<e.tokens.length;t++)"immediate"===e.tokens[t].type&&(0!==t&&t!==e.tokens.length-1&&e.tokens[t].depth===e.tokens[t-1].depth&&e.tokens[t].offset===e.tokens[t-1].offset&&(e.tokens[t+1].depth-e.tokens[t].depth==1||e.tokens[t+1].depth===e.tokens[t].depth&&e.tokens[t+1].offset-e.tokens[t].offset==1)||r.push(e.tokens[t]));for(let t of r)e.removeToken(t)}(e=e.clone()),0===e.tokens.length)return"//*";e.targetNode.ownerDocument;let t="",r="",i=!1,n=e.tokens;for(let o=0;o<e.tokens.length;o++){i=!1,0!==o&&n[o].depth===n[o-1].depth&&n[o].offset===n[o-1].offset||(r="","tag"!==n[o].type&&(i=!0,r+="*"));let e=R(n,o),s=D(n[o],n[o].nodeRef,e,r);t+=O(n[o-1],n[o],t)+(i?"*":"")+s,r+=s}return 0!==e.tokens[n.length-1].offset&&(t+="/following-sibling::*"),e.tokens[e.tokens.length-1].depth!==e.maxDepth&&(t+="//*"),t}(e=this._removeBadTokens(e))}_querySelectorAll(e){let t=new n;if(!this._doc)throw new Error("document not set");if(e&&e.trim().length>0){const r=this._root||this._doc;let i=this._doc.evaluate(e,r,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);try{let e=i.iterateNext();for(;e;)t.add(e),e=i.iterateNext()}catch(e){throw new Error("Document tree modified during iteration"+e)}}return t}}class M extends I{constructor(e){super(),this._latestAction=M.NO_ACTION,this._similar=new n,this._tokenOpts.partAttrib=!1,this._tokenOpts.text=!1,this._tokenOpts.siblingNodes=!1,this._weights=$,e&&e.debug&&(this.debug=e.debug)}async addRejection(e){await this._add(e,this._rejected,this._selected,M.ADDED_REJECTION)}async addSelection(e){await this._add(e,this._selected,this._rejected,M.ADDED_SELECTION)}async removeRejection(e){await this._remove(e,this._rejected,M.REMOVED_REJECTION)}async removeSelection(e){await this._remove(e,this._selected,M.REMOVED_SELECTION)}async update(){if(this._updateRoot(),0===this._selected.length)throw new Error("empty list of selected");await this._predict();let e=n.flatten(this._selectorTrees.mapToSet((e=>this._query(e))));this._similar=e.difference(this._selected)}get similar(){return[...this._similar]}isSimilar(e){return this._similar.has(e)}reset(){super.reset(),this._rejected=new n,this._similar=new n,this._latestAction=M.NO_ACTION}async set(e){let t=new n(e);this.reset();let r=!1,i=t.clone();for(;i.length>0;){let e=i.first;await this.addSelection(e);let n=this._similar.difference(t);for(;n.length>0;)await this.addRejection(n.first),n=this._similar.difference(t);let o=this.selected.concat(this.similar);if(i=t.filter((e=>!o.includes(e))),0===i.length&&0===n.length){r=!0;break}}if(!r)throw new Error("could not create a set of selection and rejection for the given list of elements")}async _add(e,t,r,i){if(t.length>0&&this._doc!=e.ownerDocument)throw new Error("element not part of document");if(r.length>0&&this._doc!=e.ownerDocument)throw new Error("element not part of document");r.has(e)&&r.delete(e),t.has(e)||(t.add(e),this._latestAction=i,await this.update())}get _additionalUnsatisfied(){let e=this._latestAction===M.ADDED_SELECTION?this._similar:new n,t=n.flatten(this._selectorTrees.mapToSet((e=>this._query(e))));return e.difference(t)}_buildQuery(e){return f(e=this._removeBadTokens(e))}_isCoveringExtra(e,t,r){return e.intersection(r).difference(t).size>0}_isDesiredSimplification(e,t,r){let i=this._selected.difference(t),n=this._query(e);return this._checkTreeValidity(e)&&!n.intersects(i)&&!n.intersects(this._rejected)&&(this._unAffectingDiscard(n,r)||this._isCoveringExtra(n,r,t))}_isDoneSimplifying(e,t){return t.isSubsetOf(e)}_querySelectorAll(e){if(!e)return new n;let t=Array.from(this._root.querySelectorAll(e));return new n(t)}async _remove(e,t,r){if(t.length>0&&this._doc!=e.ownerDocument)throw new Error("element not part of document");t.has(e)&&(t.delete(e),this._latestAction=r,await this.update())}async _simplify(e){e=e.union(this._additionalUnsatisfied);let t=this._getSelectorTreeArr(e),r=(await this._getOrderedTokens(t)).reverse();if(this.debug&&N.printTokens(r,this._weights),!this._checkTreeValidity(t.first)||1!==this._query(t.first).length)throw this.reset(),new Error("not a valid tree was built "+this._buildQuery(t.first));let i=t.first.clone(),n=this._query(i);for(let t of r)if(this._timeout(),i.removeToken(t),this._isDesiredSimplification(i,e,n)?n=this._query(i):i.addToken(t),this._isDoneSimplifying(n,e))break;return i}_unAffectingDiscard(e,t){return t.isEqualTo(e)}_updateRoot(){super._updateRoot();let e=!0;for(;e;){e=!1;for(let t of Array.from(this._root.childNodes))this.selected.every((e=>t.contains(e)))&&this.selected.every((e=>e!=t))&&(this._root=t,e=!0)}}}return M.ADDED_SELECTION=1,M.REMOVED_SELECTION=2,M.ADDED_REJECTION=3,M.REMOVED_REJECTION=4,M.NO_ACTION=0,{getCSS:async function(e,t){return 1!==e.length||e[0].parentElement?await new L(e,t)._predict():":root"},getXPATH:async function(e,t){return await new z(e,t)._predict()},SelectorX:M}}));

})(this)