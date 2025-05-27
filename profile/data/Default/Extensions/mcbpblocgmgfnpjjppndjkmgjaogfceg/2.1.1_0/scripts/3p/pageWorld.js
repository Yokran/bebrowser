/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/ajax.ts":
/*!****************************!*\
  !*** ./src/common/ajax.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ajax)
/* harmony export */ });
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var pdelay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pdelay */ "./node_modules/pdelay/js/index.js");
/* harmony import */ var _cachebust_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cachebust-url */ "./src/common/cachebust-url.ts");



const MAX_TIMEOUT = 64 * 1000; //64 seconds
const MAX_RETRIES = 5;
const serversToIgnore = {};

// Simple ajax helper.
// opts:
// * url
// * [method]
// * [cachebust] - boolean
// * [headers] - object
// * [xhrFields] - object
// * [data]
function ajax(opts) {
  if (!opts || typeof opts.url !== 'string') {
    throw new Error('URL must be given');
  }
  return new Promise(function (resolve, reject) {
    const method = opts.method ? opts.method : 'GET';
    let url = opts.url;
    let stringData = null;
    if (opts.data) {
      stringData = typeof opts.data === 'string' ? opts.data : querystring__WEBPACK_IMPORTED_MODULE_0__.stringify(opts.data);
      if (method === 'GET' || method === 'HEAD') {
        url += (/\?/.test(url) ? '&' : '?') + stringData;
        stringData = null;
      }
    }
    const canRetry = opts.canRetry != null ? opts.canRetry : method === 'GET' || method === 'HEAD';
    const match = url.match(/(?:(?:[a-z]+:)?\/\/)?([^/]*)\//);
    if (!match) {
      throw new Error('Failed to match url');
    }
    const server = match[1];
    if (Object.prototype.hasOwnProperty.call(serversToIgnore, server)) {
      reject(new Error(`Server at ${url} has told us to stop connecting`));
      return;
    }
    if (opts.cachebust) {
      url = (0,_cachebust_url__WEBPACK_IMPORTED_MODULE_1__["default"])(url);
    }
    const XMLHttpRequest = opts.XMLHttpRequest || window.XMLHttpRequest;
    const xhr = new XMLHttpRequest();
    Object.assign(xhr, opts.xhrFields);
    xhr.onerror = function (event) {
      if ((opts.retryNum || 0) < MAX_RETRIES) {
        if (xhr.status === 502 || (xhr.status === 0 || xhr.status >= 500) && canRetry) {
          resolve(_retry(opts));
          return;
        }
      }
      const err = Object.assign(new Error(`Failed to load ${url}`), {
        event,
        xhr,
        status: xhr.status
      });

      // give a way for a server to tell us to go away for now. Good fallback
      // in case a bug ever causes clients to spam a server with requests.
      if (xhr.status == 490) {
        serversToIgnore[server] = true;
      }
      reject(err);
    };
    xhr.onload = function (event) {
      if (xhr.status === 200) {
        resolve({
          xhr,
          text: xhr.responseText
        });
      } else {
        xhr.onerror(event);
      }
    };
    xhr.open(method, url, true);
    if (opts.headers) {
      const {
        headers
      } = opts;
      Object.keys(headers).forEach(name => {
        const value = headers[name];
        xhr.setRequestHeader(name, value);
      });
    }
    xhr.send(stringData);
  });
}
function _retry(opts) {
  const retryNum = (opts.retryNum || 0) + 1;

  // 2000 4000 8000...
  const retryTimeout = Math.min(Math.pow(2, retryNum) * 1000, MAX_TIMEOUT);
  return (0,pdelay__WEBPACK_IMPORTED_MODULE_2__["default"])(retryTimeout).then(() => ajax(Object.assign({}, opts, {
    retryNum
  })));
}

/***/ }),

/***/ "./src/common/assert.ts":
/*!******************************!*\
  !*** ./src/common/assert.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssertionError: () => (/* binding */ AssertionError),
/* harmony export */   assert: () => (/* binding */ assert)
/* harmony export */ });
class AssertionError extends Error {
  name = 'AssertionError';
  constructor(message) {
    super(message ?? 'assertion failed');
  }
}
function assert(condition, message) {
  // eslint-disable-next-line no-extra-boolean-cast -- this is to mimic Node's assert behavior
  if (!!condition) {
    // ok
  } else {
    throw new AssertionError(message);
  }
}

/***/ }),

/***/ "./src/common/cachebust-url.ts":
/*!*************************************!*\
  !*** ./src/common/cachebust-url.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cachebustUrl)
/* harmony export */ });
const r = /([?&])_=[^&]*/;
let nonce = Date.now() + Math.floor(Math.random() * Math.pow(2, 32));
function cachebustUrl(url) {
  if (r.test(url)) {
    return url.replace(r, '$1_=' + nonce++);
  } else {
    return url + (/\?/.test(url) ? '&' : '?') + '_=' + nonce++;
  }
}

/***/ }),

/***/ "./src/common/defer.ts":
/*!*****************************!*\
  !*** ./src/common/defer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defer)
/* harmony export */ });
// This is a drop-in replacement for RSVP.defer(). New code should avoid using
// this, and should use the Promise constructor instead!

function defer() {
  let resolve = undefined;
  let reject = undefined;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    resolve,
    reject,
    promise
  };
}

/***/ }),

/***/ "./src/common/find-parent.ts":
/*!***********************************!*\
  !*** ./src/common/find-parent.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findParent)
/* harmony export */ });
/**
 * @deprecated Use @see Element.closest instead.
 */
function findParent(el, cb) {
  let candidate = el.parentElement;
  while (candidate) {
    if (cb(candidate)) {
      return candidate;
    }
    candidate = candidate.parentElement;
  }
  return null;
}

/***/ }),

/***/ "./src/common/html-to-text.ts":
/*!************************************!*\
  !*** ./src/common/html-to-text.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ htmlToText)
/* harmony export */ });
/* harmony import */ var _removeHtmlTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removeHtmlTags */ "./src/common/removeHtmlTags.ts");


/**
 * Converts HTML to unformatted plain text.
 * Works by stripping all HTML tags and converting entities to symbols.
 * Safe to use on arbitrary input.
 *
 * Converts text like `String with <b>html</b> &amp; entities &lt;&gt;` to
 * `String with html & entities <>`.
 *
 * This is *not* for creating "safe HTML" from user input to assign to
 * an element's innerHTML. The result of this function should not be treated
 * as HTML.
 */
function htmlToText(html) {
  const div = document.createElement('div');
  div.innerHTML = _removeHtmlTags__WEBPACK_IMPORTED_MODULE_0__.removeHtmlTagsPolicy.createHTML(html);
  return div.textContent;
}

/***/ }),

/***/ "./src/common/isNotNil.ts":
/*!********************************!*\
  !*** ./src/common/isNotNil.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isNotNil)
/* harmony export */ });
// Type predicate to avoid opting out of strict type checking in filter operations.
// Adapted from https://stackoverflow.com/a/46700791
function isNotNil(value) {
  return value != null;
}

/***/ }),

/***/ "./src/common/quoted-split.ts":
/*!************************************!*\
  !*** ./src/common/quoted-split.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ quotedSplit)
/* harmony export */ });
// Splits a string on spaces, but ignores spaces inside quotes.

function quotedSplit(s) {
  let split = [];
  let lastEnd = 0;
  const quoteRe = /"[^"]*"/g;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = quoteRe.exec(s);
    split = split.concat((match ? s.substring(lastEnd, match.index) : s.substring(lastEnd)).split(/ +/).filter(Boolean));
    if (!match) break;
    lastEnd = match.index + match[0].length;
    split.push(match[0]);
  }
  return split;
}

/***/ }),

/***/ "./src/common/rate-limit-queuer.ts":
/*!*****************************************!*\
  !*** ./src/common/rate-limit-queuer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rateLimitQueuer)
/* harmony export */ });
// Returns a wrapped version of the function which queues up callTimestamps to the
// function if it is called more than count times within period amount of time.
function rateLimitQueuer(fn, period, count) {
  let callTimestamps = [];
  const queue = [];
  let runningQueue = false;
  function runJob() {
    const job = queue.shift();
    job();
    if (queue.length) {
      runQueue();
    } else {
      runningQueue = false;
    }
  }
  function runQueue() {
    runningQueue = true;
    const timeToWait = getTimeToUnqueueItem();
    if (timeToWait > 0) {
      setTimeout(runJob, timeToWait);
    } else {
      runJob();
    }
  }
  function getTimeToUnqueueItem() {
    const now = Date.now();
    const periodAgo = now - period;
    callTimestamps = callTimestamps.filter(time => time > periodAgo);
    if (callTimestamps.length >= count) {
      return callTimestamps[0] - periodAgo;
    }
    return -1;
  }
  return function attempt() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    let job;
    const promise = new Promise((resolve, reject) => {
      job = () => {
        callTimestamps.push(Date.now());
        try {
          resolve(fn.apply(this, args));
        } catch (err) {
          reject(err);
        }
      };
    });
    if (!job) throw new Error('Should not happen');
    queue.push(job);
    if (!runningQueue) {
      runQueue();
    }
    return promise;
  };
}

/***/ }),

/***/ "./src/common/removeHtmlTags.ts":
/*!**************************************!*\
  !*** ./src/common/removeHtmlTags.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeHtmlTagsPolicy: () => (/* binding */ removeHtmlTagsPolicy)
/* harmony export */ });
/**
 * This function removes all HTML tags from a string.
 * The resulting string may still contain HTML entities and not be suitable to display as plain text.
 *
 * This function's output will never contain `<` and therefore will never contain any HTML
 * tags, so it's safe to use this on arbitrary input and assign the result to an element's
 * innerHTML property.
 *
 * @see Use [htmlToText](./html-to-text.ts) instead if you want to convert HTML to
 * unformatted text to display.
 */
function removeHtmlTags(html) {
  return html.replace(/<[^>]*>?/g, '');
}

/**
 * This policy object is used to strip HTML tags from a string.
 */
const removeHtmlTagsPolicy = globalThis.trustedTypes?.createPolicy('inboxSdk__removeHtmlTagsPolicy', {
  createHTML(string) {
    return removeHtmlTags(string);
  }
}) ?? {
  createHTML(string) {
    return removeHtmlTags(string);
  }
};

/***/ }),

/***/ "./src/injected-js/gmail/constants.ts":
/*!********************************************!*\
  !*** ./src/injected-js/gmail/constants.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DRAFT_SAVING_ACTIONS: () => (/* binding */ DRAFT_SAVING_ACTIONS),
/* harmony export */   SEND_ACTIONS: () => (/* binding */ SEND_ACTIONS)
/* harmony export */ });
const SEND_ACTIONS = ['^pfg'];
const DRAFT_SAVING_ACTIONS = ['^r', '^r_bt'];

/***/ }),

/***/ "./src/injected-js/gmail/modify-suggestions.ts":
/*!*****************************************************!*\
  !*** ./src/injected-js/gmail/modify-suggestions.ts ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/escape */ "./node_modules/lodash/escape.js");
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_escape__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var auto_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! auto-html */ "./node_modules/auto-html/js/index.js");
/* harmony import */ var auto_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(auto_html__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ud__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ud */ "./node_modules/ud/js/index.js");
/* harmony import */ var _common_html_to_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/html-to-text */ "./src/common/html-to-text.ts");
/* harmony import */ var _platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../platform-implementation-js/dom-driver/gmail/gmail-response-processor */ "./src/platform-implementation-js/dom-driver/gmail/gmail-response-processor.ts");
/* module decorator */ module = __webpack_require__.hmd(module);






// This is the type that the user provides.

// These ids are part of the object constructed by the SDK used to refer to a
// suggestion to the injected script.
/*
Notes about the Gmail suggestions response:
The response may be made up of multiple sections. Each section can specify
results. There are three types of results: search terms/contacts, drive files,
and emails. Each section may only contain one type of result. The sections can
be in any order, though Gmail appears to always put the search terms/contacts
section first.

Some fields of a section:
0: The constant "aso.srp"
1: The user's search query
3: Array of search term/contact suggestions.
4: Array of email suggestions.
5: Array of drive suggestions.
6-9: Constants signifying type of section(?)
  search terms/contacts: 1,0,0,1
  drive:                 0,0,1,3
  email:                 0,1,0,2
11: Timestamp in microseconds. Each section should have the same timestamp.
12: Typing autocomplete value or empty array.
13: The length of the user's search query times 4 then cast to a string.

Currently modifySuggestions modifies the first section and adds the
app-provided suggestions into the search term/contact suggestions array.
*/

function modifySuggestions(responseText, modifications) {
  const {
    value: parsed,
    options
  } = _platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_2__.deserialize(responseText);
  const query = parsed[0][1];
  for (const modification of modifications) {
    let name, nameHTML;
    if (typeof modification.name === 'string') {
      name = modification.name;
      nameHTML = lodash_escape__WEBPACK_IMPORTED_MODULE_0___default()(name);
    } else if (typeof modification.nameHTML === 'string') {
      nameHTML = modification.nameHTML;
      name = (0,_common_html_to_text__WEBPACK_IMPORTED_MODULE_1__["default"])(nameHTML);
    }
    if (name == null || nameHTML == null) {
      throw new Error('name or nameHTML must be provided');
    }
    let description, descriptionHTML;
    if (typeof modification.description === 'string') {
      description = modification.description;
      descriptionHTML = lodash_escape__WEBPACK_IMPORTED_MODULE_0___default()(description);
    } else if (typeof modification.descriptionHTML === 'string') {
      descriptionHTML = modification.descriptionHTML;
      description = (0,_common_html_to_text__WEBPACK_IMPORTED_MODULE_1__["default"])(descriptionHTML);
    }
    const data = {
      id: modification.id,
      routeName: modification.routeName,
      routeParams: modification.routeParams,
      externalURL: modification.externalURL
    };
    nameHTML += auto_html__WEBPACK_IMPORTED_MODULE_3___default()` <span style="display:none" data-inboxsdk-suggestion="${JSON.stringify(data)}"></span>`;
    if (modification.iconHTML != null) {
      nameHTML = `<div class="inboxsdk__custom_suggestion_iconHTML">${modification.iconHTML}</div>${nameHTML}`;
    }
    const newItem = ['aso.sug', modification.searchTerm || query, nameHTML, null, [],
    // screen height estimate. Currently Gmail bugs out if the screen height
    // estimates add up to above the screen height, so let's avoid making the
    // issue more likely by telling it our entries are zero-height.
    0, null, 'asor inboxsdk__custom_suggestion ' + modification.providerId + ' ' + (modification.iconClass || ''), 0];
    if (descriptionHTML != null) {
      newItem[3] = ['aso.eme', description, name, descriptionHTML, nameHTML];
    }

    // Allow iconHtml to be passed, and ignore iconUrl if iconHtml is presents
    if (modification.iconHTML != null) {
      // set empty image
      newItem[6] = ['aso.thn', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='];
      newItem[7] += ' inboxsdk__no_bg';
    } else if (modification.iconUrl) {
      newItem[6] = ['aso.thn', modification.iconUrl];
      newItem[7] += ' inboxsdk__no_bg';
    } else {
      newItem[7] += ' asor_i4';
    }
    if (Array.isArray(parsed[0][3])) {
      parsed[0][3].push(newItem);
    } else {
      parsed[0][3] = [newItem];
    }
  }
  return _platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_2__.serialize(parsed, options);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,ud__WEBPACK_IMPORTED_MODULE_4__.defn)(module, modifySuggestions));

/***/ }),

/***/ "./src/injected-js/gmail/setup-gmail-interceptor.ts":
/*!**********************************************************!*\
  !*** ./src/injected-js/gmail/setup-gmail-interceptor.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupGmailInterceptor),
/* harmony export */   setupGmailInterceptorOnFrames: () => (/* binding */ setupGmailInterceptorOnFrames)
/* harmony export */ });
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/clone */ "./node_modules/lodash/clone.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/flatten */ "./node_modules/lodash/flatten.js");
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/intersection */ "./node_modules/lodash/intersection.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_intersection__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var kefir__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! kefir */ "./node_modules/kefir/dist/kefir.esm.js");
/* harmony import */ var _injected_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../injected-logger */ "./src/injected-js/injected-logger.ts");
/* harmony import */ var _xhr_proxy_factory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../xhr-proxy-factory */ "./src/injected-js/xhr-proxy-factory.ts");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var _thread_identifier__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./thread-identifier */ "./src/injected-js/gmail/thread-identifier/index.ts");
/* harmony import */ var _message_metadata_holder__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../message-metadata-holder */ "./src/injected-js/message-metadata-holder.ts");
/* harmony import */ var _platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../platform-implementation-js/dom-driver/gmail/gmail-response-processor */ "./src/platform-implementation-js/dom-driver/gmail/gmail-response-processor.ts");
/* harmony import */ var _platform_implementation_js_dom_driver_gmail_gmail_sync_response_processor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../platform-implementation-js/dom-driver/gmail/gmail-sync-response-processor */ "./src/platform-implementation-js/dom-driver/gmail/gmail-sync-response-processor.ts");
/* harmony import */ var _common_quoted_split__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../common/quoted-split */ "./src/common/quoted-split.ts");
/* harmony import */ var _common_defer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../common/defer */ "./src/common/defer.ts");
/* harmony import */ var _modify_suggestions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modify-suggestions */ "./src/injected-js/gmail/modify-suggestions.ts");
/* harmony import */ var _sync_compose_processor__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./sync-compose-processor */ "./src/injected-js/gmail/sync-compose-processor.ts");


















function logErrorExceptEventListeners(err, details) {
  // Don't log Gmail's errors
  if (details !== 'XMLHttpRequest event listener error') {
    _injected_logger__WEBPACK_IMPORTED_MODULE_7__.error(err, details);
  } else {
    setTimeout(function () {
      // let window.onerror log this
      throw err;
    }, 1);
  }
}
function setupGmailInterceptor() {
  let jsFrame = null;
  const js_frame_element = top.document.getElementById('js_frame');
  if (js_frame_element) {
    jsFrame = js_frame_element.contentDocument.defaultView;
  } else {
    _injected_logger__WEBPACK_IMPORTED_MODULE_7__.eventSdkPassive('noJSFrameElementFound');
  }
  setupGmailInterceptorOnFrames(window, jsFrame);
}

// Split into a separate step to make it easy for tests to use.
function setupGmailInterceptorOnFrames(mainFrame, jsFrame) {
  const main_wrappers = [],
    js_frame_wrappers = [];
  {
    const main_originalXHR = mainFrame.XMLHttpRequest;
    mainFrame.XMLHttpRequest = (0,_xhr_proxy_factory__WEBPACK_IMPORTED_MODULE_8__["default"])(main_originalXHR, main_wrappers, {
      logError: logErrorExceptEventListeners
    });
  }
  if (jsFrame) {
    const js_frame_originalXHR = jsFrame.XMLHttpRequest;
    jsFrame.XMLHttpRequest = (0,_xhr_proxy_factory__WEBPACK_IMPORTED_MODULE_8__["default"])(js_frame_originalXHR, js_frame_wrappers, {
      logError: logErrorExceptEventListeners
    });
  }
  _thread_identifier__WEBPACK_IMPORTED_MODULE_10__.setup();
  _message_metadata_holder__WEBPACK_IMPORTED_MODULE_11__.setup();
  //email sending modifier/notifier
  {
    const modifiers = {};
    kefir__WEBPACK_IMPORTED_MODULE_6__["default"].fromEvents(document, 'inboxSDKregisterComposeRequestModifier').onValue(_ref => {
      let {
        detail
      } = _ref;
      const keyId = detail.composeid || detail.draftID;
      if (!modifiers[keyId]) {
        modifiers[keyId] = [];
      }
      modifiers[keyId].push(detail.modifierId);
    });
    kefir__WEBPACK_IMPORTED_MODULE_6__["default"].fromEvents(document, 'inboxSDKunregisterComposeRequestModifier').onValue(_ref2 => {
      let {
        detail
      } = _ref2;
      const {
        keyId,
        modifierId
      } = detail;
      modifiers[keyId] = modifiers[keyId].filter(item => item !== modifierId);
      if (modifiers[keyId].length === 0) {
        delete modifiers[keyId];
      }
    });
    js_frame_wrappers.push({
      isRelevantTo: function (connection) {
        return connection.params.act === 'sm';
      },
      originalSendBodyLogger: function (connection, body) {
        triggerEvent({
          type: 'emailSending',
          body: body
        });
      },
      requestChanger: async function (connection, request) {
        let composeParams = querystring__WEBPACK_IMPORTED_MODULE_9__.parse(request.body);
        const composeid = composeParams.composeid;
        const composeModifierIds = modifiers[composeParams.composeid];
        if (!composeModifierIds || composeModifierIds.length === 0) {
          return request;
        }
        for (let ii = 0; ii < composeModifierIds.length; ii++) {
          const modifierId = composeModifierIds[ii];
          const modificationPromise = kefir__WEBPACK_IMPORTED_MODULE_6__["default"].fromEvents(document, 'inboxSDKcomposeRequestModified').filter(_ref3 => {
            let {
              detail
            } = _ref3;
            return detail.composeid === composeid && detail.modifierId === modifierId;
          }).take(1).map(_ref4 => {
            let {
              detail
            } = _ref4;
            return detail.composeParams;
          }).toPromise(

            /* Promise */);
          triggerEvent({
            type: 'inboxSDKmodifyComposeRequest',
            composeid,
            modifierId,
            composeParams: {
              body: composeParams.body,
              isPlainText: composeParams.ishtml !== '1'
            }
          });
          const newComposeParams = await modificationPromise;
          composeParams = Object.assign({}, composeParams, newComposeParams);
        }
        return Object.assign({}, request, {
          body: stringifyComposeParams(composeParams)
        });
      },
      afterListeners: function (connection) {
        if (connection.status === 200) {
          triggerEvent({
            type: 'emailSent',
            responseText: connection.originalResponseText,
            originalSendBody: connection.originalSendBody
          });
          if (connection.originalSendBody) {
            const composeParams = querystring__WEBPACK_IMPORTED_MODULE_9__.parse(connection.originalSendBody);
            delete modifiers[composeParams.composeid];
          }
        }
      }
    });
    js_frame_wrappers.push({
      isRelevantTo: function (connection) {
        return connection.params.act === 'sd';
      },
      originalSendBodyLogger: function (connection, body) {
        triggerEvent({
          type: 'emailDraftSaveSending',
          body: body
        });
      },
      afterListeners: function (connection) {
        if (connection.status === 200) {
          triggerEvent({
            type: 'emailDraftReceived',
            responseText: connection.originalResponseText,
            originalSendBody: connection.originalSendBody,
            connectionDetails: {
              method: connection.method,
              url: connection.url,
              params: connection.params,
              responseType: connection.responseType
            }
          });
        }
      }
    });
    {
      // Sync API-based compose sending intercept
      const currentSendConnectionIDs = new WeakMap();
      const currentDraftSaveConnectionIDs = new WeakMap();
      const currentFirstDraftSaveConnectionIDs = new WeakMap();
      main_wrappers.push({
        isRelevantTo(connection) {
          return /sync(?:\/u\/\d+)?\/i\/s/.test(connection.url);
        },
        originalSendBodyLogger(connection) {
          if (connection.originalSendBody) {
            const composeRequestDetails = (0,_sync_compose_processor__WEBPACK_IMPORTED_MODULE_17__.parseComposeRequestBody)(connection.originalSendBody);
            if (!composeRequestDetails) {
              return;
            }
            const {
              draftID
            } = composeRequestDetails;
            switch (composeRequestDetails.type) {
              case 'FIRST_DRAFT_SAVE':
                currentFirstDraftSaveConnectionIDs.set(connection, draftID);
                break;
              case 'DRAFT_SAVE':
                currentDraftSaveConnectionIDs.set(connection, draftID);
                break;
              case 'SEND':
                currentSendConnectionIDs.set(connection, draftID);
                triggerEvent({
                  type: 'emailSending',
                  draftID
                });
                break;
            }
          }
        },
        requestChanger: async function (connection, request) {
          const composeRequestDetails = (0,_sync_compose_processor__WEBPACK_IMPORTED_MODULE_17__.parseComposeRequestBody)(request.body);
          if (!composeRequestDetails || composeRequestDetails.type !== 'SEND') return request;
          const {
            draftID
          } = composeRequestDetails;
          const composeModifierIds = modifiers[draftID];
          if (!composeModifierIds || composeModifierIds.length === 0) return request;
          let newEmailBody = composeRequestDetails.body;
          for (let ii = 0; ii < composeModifierIds.length; ii++) {
            const modifierId = composeModifierIds[ii];
            const modificationPromise = kefir__WEBPACK_IMPORTED_MODULE_6__["default"].fromEvents(document, 'inboxSDKcomposeRequestModified').filter(_ref5 => {
              let {
                detail
              } = _ref5;
              return detail.draftID === draftID && detail.modifierId === modifierId;
            }).take(1).map(_ref6 => {
              let {
                detail
              } = _ref6;
              return detail.composeParams;
            }).toPromise(

              /* Promise */);
            triggerEvent({
              type: 'inboxSDKmodifyComposeRequest',
              draftID,
              modifierId,
              composeParams: {
                body: newEmailBody,
                isPlainText: false
              }
            });
            const newComposeParams = await modificationPromise;
            newEmailBody = newComposeParams.body;
          }
          return Object.assign({}, request, {
            body: (0,_sync_compose_processor__WEBPACK_IMPORTED_MODULE_17__.replaceBodyContentInComposeSendRequestBody)(request.body, newEmailBody)
          });
        },
        afterListeners(connection) {
          if (currentSendConnectionIDs.has(connection) || currentDraftSaveConnectionIDs.has(connection) || currentFirstDraftSaveConnectionIDs.has(connection)) {
            const sendFailed = () => {
              triggerEvent({
                type: 'emailSendFailed',
                draftID
              });
              currentSendConnectionIDs.delete(connection);
            };
            const draftID = currentSendConnectionIDs.get(connection) || currentDraftSaveConnectionIDs.get(connection) || currentFirstDraftSaveConnectionIDs.get(connection);
            if (connection.status !== 200 || !connection.originalResponseText) {
              sendFailed();
              return;
            }
            try {
              const responsesParsed = (0,_sync_compose_processor__WEBPACK_IMPORTED_MODULE_17__.parseComposeResponseBody)(connection.originalResponseText);
              for (const responseParsed of responsesParsed) {
                // If we're sending a draft, we only care about the response related to the draft we're sending.
                if (draftID && !responseParsed.messageId.endsWith(draftID)) {
                  continue;
                }
                if (responseParsed.type === 'FIRST_DRAFT_SAVE' || responseParsed.type === 'DRAFT_SAVE') {
                  triggerEvent({
                    draftID: draftID,
                    type: 'emailDraftReceived',
                    rfcID: responseParsed.rfcID,
                    threadID: responseParsed.threadId,
                    messageID: responseParsed.messageId,
                    oldMessageID: responseParsed.oldMessageId,
                    oldThreadID: responseParsed.oldThreadId
                  });
                  currentSendConnectionIDs.delete(connection);
                  currentDraftSaveConnectionIDs.delete(connection);
                  currentFirstDraftSaveConnectionIDs.delete(connection);
                  return;
                } else if (responseParsed.type === 'SEND') {
                  triggerEvent({
                    draftID: draftID,
                    type: 'emailSent',
                    rfcID: responseParsed.rfcID,
                    threadID: responseParsed.threadId,
                    messageID: responseParsed.messageId,
                    oldMessageID: responseParsed.oldMessageId,
                    oldThreadID: responseParsed.oldThreadId
                  });
                  currentSendConnectionIDs.delete(connection);
                  currentDraftSaveConnectionIDs.delete(connection);
                  currentFirstDraftSaveConnectionIDs.delete(connection);
                  return;
                }
              }
            } catch (err) {
              _injected_logger__WEBPACK_IMPORTED_MODULE_7__.eventSdkPassive('connection.requestResponseParsingFailed', {
                responseParseError: err
              });
            }
            const originalResponse = JSON.parse(connection.originalResponseText);

            // TODO this function silently fails way too easily. Need to add better logging for it!
            if (currentFirstDraftSaveConnectionIDs.has(connection)) {
              const wrapper = originalResponse[2] && originalResponse[2][6] && originalResponse[2][6][0] && originalResponse[2][6][0][1];
              if (wrapper) {
                const threadUpdate = wrapper[3] && wrapper[3][7] && wrapper[3][7][1];
                const messageUpdate = threadUpdate && threadUpdate[5] && threadUpdate[5][0];
                if (threadUpdate && messageUpdate) {
                  triggerEvent({
                    draftID: draftID,
                    type: 'emailDraftReceived',
                    rfcID: messageUpdate[14],
                    threadID: threadUpdate[4].split('|')[0],
                    messageID: messageUpdate[1],
                    oldMessageID: messageUpdate[56],
                    oldThreadID: threadUpdate[20]
                  });
                } else {
                  _injected_logger__WEBPACK_IMPORTED_MODULE_7__.error(new Error('Could not parse draft save'));
                }
              } else {
                // pre-2019-05-29 handling
                _injected_logger__WEBPACK_IMPORTED_MODULE_7__.eventSdkPassive('old compose draft id handling hit');
                const oldWrapper = originalResponse[2] && originalResponse[2][6] && originalResponse[2][6][1] && originalResponse[2][6][1][1];
                if (oldWrapper) {
                  const saveUpdate = oldWrapper[3] && oldWrapper[3][1] && oldWrapper[3][1][1];
                  if (saveUpdate) {
                    triggerEvent({
                      draftID: draftID,
                      type: 'emailDraftReceived',
                      rfcID: saveUpdate[14],
                      messageID: saveUpdate[1],
                      oldMessageID: saveUpdate[48] ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_5___default())(saveUpdate[48]).toString(16) : saveUpdate[56],
                      syncThreadID: oldWrapper[1]
                    });
                  }
                }
              }
            } else {
              const updateList = originalResponse[2]?.[6];
              if (!updateList) {
                sendFailed();
                return;
              }
              const sendUpdateMatch = updateList.find(update => update[1]?.[3]?.[7]?.[1]?.[5]?.[0]?.[14] && update[1][3][7][1][5].find(message => lodash_includes__WEBPACK_IMPORTED_MODULE_4___default()(message[1], draftID)));
              if (!sendUpdateMatch) {
                if (currentSendConnectionIDs.has(connection)) {
                  const minimalSendUpdates = updateList.filter(update => update[1]?.[3]?.[5]?.[3]);
                  if (minimalSendUpdates.length > 0) {
                    const threadID = minimalSendUpdates[0][1][1] ? minimalSendUpdates[0][1][1].replace(/\|.*$/, '') : undefined;
                    triggerEvent({
                      draftID,
                      type: 'emailSent',
                      threadID,
                      //new compose
                      messageID: minimalSendUpdates[0][1][3]?.[5]?.[5]?.[0] ||
                      //replies
                      minimalSendUpdates[0][1][3][5][3]?.[0]
                    });
                  } else {
                    sendFailed();
                  }
                } else {
                  sendFailed();
                }
                return;
              }
              const sendUpdateWrapper = sendUpdateMatch[1]?.[3]?.[7]?.[1];
              const sendUpdate = sendUpdateWrapper[5].find(message => message[1].includes(draftID));
              if (!sendUpdate) {
                sendFailed();
                return;
              }
              const isEmailSentResponse = currentSendConnectionIDs.has(connection);
              if (!Array.isArray(sendUpdate[11])) {
                _injected_logger__WEBPACK_IMPORTED_MODULE_7__.error(new Error('sendUpdate[11] was not an array'));
              } else {
                if (isEmailSentResponse) {
                  if (sendUpdate[11].indexOf('^r') >= 0) {
                    _injected_logger__WEBPACK_IMPORTED_MODULE_7__.error(new Error('sendUpdate[11] unexpectedly contained "^r"'));
                  }
                }
              }
              if (isEmailSentResponse) {
                if (sendUpdate[22] !== undefined && sendUpdate[22] !== 3) {
                  _injected_logger__WEBPACK_IMPORTED_MODULE_7__.error(new Error('sendUpdate[22] was not expected value'), {
                    value: sendUpdate[22]
                  });
                }
              }
              const threadID = sendUpdateWrapper[4] ? sendUpdateWrapper[4].replace(/\|.*$/, '') : undefined;
              triggerEvent({
                draftID: draftID,
                type: isEmailSentResponse ? 'emailSent' : 'emailDraftReceived',
                rfcID: sendUpdate[14],
                messageID: sendUpdate[1],
                oldMessageID: sendUpdate[48] ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_5___default())(sendUpdate[48]).toString(16) : sendUpdate[56],
                threadID,
                // It seems Gmail is A/B testing including gmailThreadID in response[20] and not including
                // the encoded version of it in response[18], so pull it from [20] if [18] is not set.
                oldThreadID: sendUpdateWrapper[18] != null ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_5___default())(sendUpdateWrapper[18]).toString(16) : sendUpdateWrapper[20]
              });
            }
            currentSendConnectionIDs.delete(connection);
            currentDraftSaveConnectionIDs.delete(connection);
            currentFirstDraftSaveConnectionIDs.delete(connection);
          }
        }
      });
    }
  }

  // intercept and process thread responses
  {
    js_frame_wrappers.push({
      isRelevantTo(connection) {
        return !!connection.params.search && connection.params.view === 'tl';
      },
      async responseTextChanger(connection, responseText) {
        // Presence of a responseTextChanger blocks Gmail from getting the partial
        // values as this loads. We want our originalResponseTextLogger to run
        // before Gmail has seen any of the response.
        return responseText;
      },
      originalResponseTextLogger(connection) {
        if (connection.status === 200) {
          const responseText = connection.originalResponseText;
          _thread_identifier__WEBPACK_IMPORTED_MODULE_10__.processThreadListResponse(responseText);
        }
      }
    });
  }
  // intercept and process conversation view responses to get message metadata
  {
    // do this for gmail v1
    {
      js_frame_wrappers.push({
        isRelevantTo(connection) {
          return connection.params.view === 'cv';
        },
        originalResponseTextLogger(connection) {
          if (connection.status === 200) {
            const groupedMessages = _platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_12__.extractMessages(connection.originalResponseText);
            _message_metadata_holder__WEBPACK_IMPORTED_MODULE_11__.add(groupedMessages);
          }
        }
      });
    }
    // sync API based
    {
      // search response
      main_wrappers.push({
        isRelevantTo: function (connection) {
          return /sync(?:\/u\/\d+)?\/i\/bv/.test(connection.url);
        },
        originalResponseTextLogger(connection) {
          if (connection.status === 200) {
            const threads = _platform_implementation_js_dom_driver_gmail_gmail_sync_response_processor__WEBPACK_IMPORTED_MODULE_13__.extractThreadsFromSearchResponse(connection.originalResponseText);
            _message_metadata_holder__WEBPACK_IMPORTED_MODULE_11__.add(threads.map(syncThread => ({
              threadID: syncThread.syncThreadID,
              messages: syncThread.extraMetaData.syncMessageData.map(syncMessage => ({
                date: syncMessage.date,
                recipients: syncMessage.recipients
              }))
            })));
          }
        }
      });
      // thread response
      main_wrappers.push({
        isRelevantTo: function (connection) {
          return /sync(?:\/u\/\d+)?\/i\/fd/.test(connection.url);
        },
        originalResponseTextLogger(connection) {
          if (connection.status === 200) {
            const threads = _platform_implementation_js_dom_driver_gmail_gmail_sync_response_processor__WEBPACK_IMPORTED_MODULE_13__.extractThreadsFromThreadResponse(connection.originalResponseText);
            _message_metadata_holder__WEBPACK_IMPORTED_MODULE_11__.add(threads.map(syncThread => ({
              threadID: syncThread.syncThreadID,
              messages: syncThread.extraMetaData.syncMessageData.map(syncMessage => ({
                date: syncMessage.date,
                recipients: syncMessage.recipients
              }))
            })));
          }
        }
      });
    }
  }
  // Search suggestions modifier
  // The content scripts tell us when they're interested in adding
  // modifications to future suggestion results. When we see a search
  // suggestions request come through, we signal the query string to the content
  // scripts, wait for the same number of responses as the number of registered
  // suggestion modifiers, and then meld them into the query response.
  {
    const providers = Object.create(null);
    let currentQuery;
    let suggestionModifications;
    let currentQueryDefer;
    document.addEventListener('inboxSDKregisterSuggestionsModifier', function (_ref7) {
      let {
        detail
      } = _ref7;
      providers[detail.providerID] = {
        position: Object.keys(providers).length
      };
    });
    document.addEventListener('inboxSDKprovideSuggestions', function (_ref8) {
      let {
        detail
      } = _ref8;
      if (detail.query === currentQuery) {
        const provider = providers[detail.providerID];
        if (!provider) {
          throw new Error('provider does not exist for providerID');
        }
        if (suggestionModifications == null) {
          throw new Error('tried to modified a null suggestionModifications');
        }
        suggestionModifications[provider.position] = detail.suggestions;
        if (suggestionModifications.filter(Boolean).length === Object.keys(providers).length) {
          if (currentQueryDefer == null) {
            throw new Error('tried to resolve a null currentQueryDefer');
          }
          currentQueryDefer.resolve(lodash_flatten__WEBPACK_IMPORTED_MODULE_1___default()(suggestionModifications));
          currentQueryDefer = currentQuery = suggestionModifications = null;
        }
      }
    });
    main_wrappers.push({
      isRelevantTo(connection) {
        return Object.keys(providers).length > 0 && !!connection.url.match(/^\/cloudsearch\/request\?/) && connection.params.client == 'gmail' && connection.params.gs_ri == 'gmail';
      },
      originalSendBodyLogger(connection, body) {
        const parsedBody = querystring__WEBPACK_IMPORTED_MODULE_9__.parse(body);
        if (!parsedBody.request) {
          return;
        }
        const query = JSON.parse(parsedBody.request)[2];
        if (!query) {
          return;
        }
        currentQuery = query;
        if (currentQueryDefer) currentQueryDefer.resolve();
        currentQueryDefer = connection._defer = (0,_common_defer__WEBPACK_IMPORTED_MODULE_15__["default"])();
        suggestionModifications = [];
        triggerEvent({
          type: 'suggestionsRequest',
          query: currentQuery
        });
      },
      async responseTextChanger(connection, responseText) {
        if (connection._defer && connection.status === 200) {
          const modifications = await connection._defer.promise;
          if (modifications) {
            let modified;
            try {
              modified = (0,_modify_suggestions__WEBPACK_IMPORTED_MODULE_16__["default"])(responseText, modifications);
            } catch (e) {
              _injected_logger__WEBPACK_IMPORTED_MODULE_7__.eventSdkPassive('suggestionsModified.error', {
                query: currentQuery,
                originalResponseText: responseText,
                error: e instanceof Error && e.message
              }, true);
              throw e;
            }
            return modified;
          }
        }
        return responseText;
      }
    });
  }
  {
    // TODO: simplify this code
    // the triggerEvent call should happen in the requestChanger callback
    // and a lot of these state variables can be stored in the closure
    // Search query replacer.
    // The content script tells us search terms to watch for. Whenever we see a
    // search query containing the term, we delay it being sent out, trigger an
    // event containing the full query, and wait for a response event from the
    // content script that contains a new query to substitute in.
    const customSearchTerms = [];
    let queryReplacement;
    document.addEventListener('inboxSDKcreateCustomSearchTerm', function (event) {
      customSearchTerms.push(event.detail.term);
    });
    document.addEventListener('inboxSDKsearchReplacementReady', function (event) {
      if (queryReplacement.query === event.detail.query) {
        queryReplacement.newQuery.resolve(event.detail.newQuery);
      }
    });

    // classic Gmail API intercept
    js_frame_wrappers.push({
      isRelevantTo: function (connection) {
        let customSearchTerm;
        const params = connection.params;
        if (connection.method === 'POST' && params.search && params.view === 'tl' && connection.url.match(/^\?/) && params.q && (customSearchTerm = lodash_intersection__WEBPACK_IMPORTED_MODULE_3___default()(customSearchTerms, (0,_common_quoted_split__WEBPACK_IMPORTED_MODULE_14__["default"])(params.q))[0])) {
          if (queryReplacement && queryReplacement.query === params.q && queryReplacement.start != params.start) {
            // If this is the same query that was made last, but just for a
            // different page, then re-use the replacement query we got last time.
            // Don't wait on the extension to come up with it again (and risk it
            // giving an inconsistent answer between pages).
            connection._queryReplacement = queryReplacement;
            // Mark the old queryReplacement with this page now so we can tell on
            // a later request whether the page was changed or the list refresh
            // button was hit.
            queryReplacement.start = params.start;
          } else {
            if (queryReplacement) {
              // Resolve the old one with something because no one else is going
              // to after it's replaced in a moment.
              queryReplacement.newQuery.resolve(queryReplacement.query);
            }
            queryReplacement = connection._queryReplacement = {
              term: customSearchTerm,
              query: params.q,
              start: params.start,
              newQuery: (0,_common_defer__WEBPACK_IMPORTED_MODULE_15__["default"])()
            };
            triggerEvent({
              type: 'searchQueryForReplacement',
              term: customSearchTerm,
              query: params.q
            });
          }
          return true;
        }
        return false;
      },
      requestChanger: function (connection, request) {
        return connection._queryReplacement.newQuery.promise.then(function (newQuery) {
          const newParams = lodash_clone__WEBPACK_IMPORTED_MODULE_0___default()(connection.params);
          newParams.q = newQuery;
          return {
            method: request.method,
            url: '?' + (0,querystring__WEBPACK_IMPORTED_MODULE_9__.stringify)(newParams),
            body: request.body
          };
        });
      }
    });

    // newer, sync API based request intercept
    main_wrappers.push({
      isRelevantTo: function (connection) {
        return connection.method === 'POST' && /sync(?:\/u\/\d+)?\/i\/bv/.test(connection.url);
      },
      requestChanger: function (connection, request) {
        let customSearchTerm;
        const body = JSON.parse(request.body);
        let newFormat = false;
        let payload, searchString, pageOffset;
        if (Array.isArray(body)) {
          newFormat = true;
          payload = body[0];
          searchString = payload[3];
          pageOffset = payload[9];
        } else {
          payload = body[1];
          searchString = payload[4];
          pageOffset = payload[10];
        }
        const isSyncAPISearchWithCustomTerm = payload[newFormat ? 0 : 1] === 79 && typeof searchString === 'string' && (customSearchTerm = lodash_intersection__WEBPACK_IMPORTED_MODULE_3___default()(customSearchTerms, (0,_common_quoted_split__WEBPACK_IMPORTED_MODULE_14__["default"])(searchString))[0]);
        if (!isSyncAPISearchWithCustomTerm) return Promise.resolve(request);
        if (queryReplacement && queryReplacement.query === searchString && queryReplacement.start != pageOffset) {
          // If this is the same query that was made last, but just for a
          // different page, then re-use the replacement query we got last time.
          // Don't wait on the extension to come up with it again (and risk it
          // giving an inconsistent answer between pages).
          connection._queryReplacement = queryReplacement;
          // Mark the old queryReplacement with this page now so we can tell on
          // a later request whether the page was changed or the list refresh
          // button was hit.
          queryReplacement.start = pageOffset;
        } else {
          if (queryReplacement) {
            // Resolve the old one with something because no one else is going
            // to after it's replaced in a moment.
            queryReplacement.newQuery.resolve(queryReplacement.query);
          }
          queryReplacement = connection._queryReplacement = {
            term: customSearchTerm,
            query: searchString,
            start: pageOffset,
            newQuery: (0,_common_defer__WEBPACK_IMPORTED_MODULE_15__["default"])()
          };
          triggerEvent({
            type: 'searchQueryForReplacement',
            term: customSearchTerm,
            query: searchString
          });
        }
        return connection._queryReplacement.newQuery.promise.then(function (newQuery) {
          if (newFormat) {
            body[0][3] = newQuery;
          } else {
            body[1][4] = newQuery;
          }
          return {
            method: request.method,
            url: request.url,
            body: JSON.stringify(body)
          };
        });
      }
    });
  }
  {
    // Search results replacer.
    // The content script tells us a search query to watch for. Whenever we see
    // the search query, trigger an event containing the query, trigger an
    // event containing the response, and then wait for a response event from
    // the content script that contains new results to substitute in.
    const customSearchQueries = [];
    let customListJob;
    document.addEventListener('inboxSDKcustomListRegisterQuery', event => {
      customSearchQueries.push(event.detail.query);
    });
    document.addEventListener('inboxSDKcustomListNewQuery', event => {
      if (customListJob.query === event.detail.query && customListJob.start === event.detail.start) {
        const {
          newQuery,
          newStart
        } = event.detail;
        customListJob.newRequestParams.resolve({
          query: newQuery,
          start: newStart
        });
      }
    });
    document.addEventListener('inboxSDKcustomListResults', event => {
      if (customListJob.query === event.detail.query) {
        customListJob.newResults.resolve(event.detail.newResults);
      }
    });
    js_frame_wrappers.push({
      isRelevantTo: function (connection) {
        const params = connection.params;
        if (connection.method === 'POST' && params.search && params.view === 'tl' && connection.url.match(/^\?/) && params.q && !params.act && lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(customSearchQueries, x => x === params.q)) {
          if (customListJob) {
            // Resolve the old one with something because no one else is going
            // to after it's replaced in a moment.
            customListJob.newRequestParams.resolve({
              query: customListJob.query,
              start: customListJob.start
            });
            customListJob.newResults.resolve(null);
          }
          customListJob = connection._customListJob = {
            query: params.q,
            start: +params.start,
            newRequestParams: (0,_common_defer__WEBPACK_IMPORTED_MODULE_15__["default"])(),
            newResults: (0,_common_defer__WEBPACK_IMPORTED_MODULE_15__["default"])()
          };
          triggerEvent({
            type: 'searchForReplacement',
            query: customListJob.query,
            start: customListJob.start
          });
          return true;
        }
        return false;
      },
      requestChanger: function (connection, request) {
        return connection._customListJob.newRequestParams.promise.then(_ref9 => {
          let {
            query,
            start
          } = _ref9;
          const newParams = lodash_clone__WEBPACK_IMPORTED_MODULE_0___default()(connection.params);
          newParams.q = query;
          newParams.start = start;
          return {
            method: request.method,
            url: '?' + (0,querystring__WEBPACK_IMPORTED_MODULE_9__.stringify)(newParams),
            body: request.body
          };
        });
      },
      responseTextChanger: function (connection, response) {
        triggerEvent({
          type: 'searchResultsResponse',
          query: connection._customListJob.query,
          start: connection._customListJob.start,
          response
        });
        return connection._customListJob.newResults.promise.then(newResults => newResults === null ? response : newResults);
      }
    });
    // Sync API-based custom thread list interception
    main_wrappers.push({
      isRelevantTo: function (connection) {
        if (/sync(?:\/u\/\d+)?\/i\/bv/.test(connection.url)) {
          if (customListJob) {
            // Resolve the old one with something because no one else is going
            // to after it's replaced in a moment.
            customListJob.newRequestParams.resolve({
              query: customListJob.query,
              start: customListJob.start
            });
            customListJob.newResults.resolve(null);
          }
          return true;
        }
        return false;
      },
      requestChanger: async function (connection, request) {
        if (request.body) {
          const parsedBody = JSON.parse(request.body);
          const newFormat = Array.isArray(parsedBody);
          // we are a search!
          const searchQuery = (newFormat ? parsedBody && parsedBody[0] && parsedBody[0][3] : parsedBody && parsedBody[1] && parsedBody[1][4]) || '';
          if (lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(customSearchQueries, x => x === searchQuery)) {
            customListJob = connection._customListJob = {
              query: searchQuery,
              start: newFormat ? parsedBody[0][9] : parsedBody[1][10],
              newRequestParams: (0,_common_defer__WEBPACK_IMPORTED_MODULE_15__["default"])(),
              newResults: (0,_common_defer__WEBPACK_IMPORTED_MODULE_15__["default"])()
            };
            triggerEvent({
              type: 'searchForReplacement',
              query: customListJob.query,
              start: customListJob.start
            });
            return connection._customListJob.newRequestParams.promise.then(_ref10 => {
              let {
                query,
                start
              } = _ref10;
              if (newFormat) {
                parsedBody[0][3] = query;
                parsedBody[0][9] = start;
              } else {
                parsedBody[1][4] = query;
                parsedBody[1][10] = start;
              }
              return {
                method: request.method,
                url: request.url,
                body: JSON.stringify(parsedBody)
              };
            });
          }
        }
        return request;
      },
      responseTextChanger: async function (connection, response) {
        if (connection._customListJob) {
          triggerEvent({
            type: 'searchResultsResponse',
            query: connection._customListJob.query,
            start: connection._customListJob.start,
            response
          });
          return connection._customListJob.newResults.promise.then(newResults => newResults === null ? response : newResults);
        } else {
          return response;
        }
      }
    });
  }
  // sync token savers
  {
    const saveBTAIHeader = header => {
      document.head.setAttribute('data-inboxsdk-btai-header', header);
      triggerEvent({
        type: 'btaiHeaderReceived'
      });
    };
    main_wrappers.push({
      isRelevantTo(connection) {
        return /sync(?:\/u\/\d+)?\//.test(connection.url) && !document.head.hasAttribute('data-inboxsdk-btai-header');
      },
      originalSendBodyLogger(connection) {
        if (connection.headers['X-Gmail-BTAI']) {
          saveBTAIHeader(connection.headers['X-Gmail-BTAI']);
        }
      }
    });
    const saveXsrfTokenHeader = header => {
      document.head.setAttribute('data-inboxsdk-xsrf-token', header);
      triggerEvent({
        type: 'xsrfTokenHeaderReceived'
      });
    };
    main_wrappers.push({
      isRelevantTo(connection) {
        return /sync(?:\/u\/\d+)?\//.test(connection.url) && !document.head.hasAttribute('data-inboxsdk-xsrf-token');
      },
      originalSendBodyLogger(connection) {
        if (connection.headers['X-Framework-Xsrf-Token']) {
          saveXsrfTokenHeader(connection.headers['X-Framework-Xsrf-Token']);
        }
      }
    });
  }

  // Google API request header values
  {
    // harcoding a value observed across multiple accounts to start with.
    // Will be updated when we see a request, in case Gmail has changed it.
    let googleApiKey = 'AIzaSyBm7aDMG9actsWSlx-MvrYsepwdnLgz69I';
    document.addEventListener('inboxSDKgetGoogleRequestHeaders', () => {
      const authorizationHeader = window.gapi.auth.getAuthHeaderValueForFirstParty([]);
      const headers = {
        authorization: authorizationHeader,
        'x-goog-api-key': googleApiKey
      };
      document.head.setAttribute('data-inboxsdk-google-headers', JSON.stringify(headers));
    });
    main_wrappers.push({
      isRelevantTo(connection) {
        // check for absolute URLs going to a google domain
        if (connection.url.startsWith('https://')) {
          const url = new URL(connection.url);
          return url.hostname.endsWith('.google.com');
        }
        return false;
      },
      originalSendBodyLogger(connection) {
        if (connection.headers['X-Goog-Api-Key']) {
          googleApiKey = connection.headers['X-Goog-Api-Key'];
        }
      }
    });
  }
}
function triggerEvent(detail) {
  document.dispatchEvent(new CustomEvent('inboxSDKajaxIntercept', {
    bubbles: true,
    cancelable: false,
    detail
  }));
}
function stringifyComposeParams(inComposeParams) {
  const composeParams = lodash_clone__WEBPACK_IMPORTED_MODULE_0___default()(inComposeParams);
  const string = `=${stringifyComposeRecipientParam(composeParams.to, 'to')}&=${stringifyComposeRecipientParam(composeParams.cc, 'cc')}&=${stringifyComposeRecipientParam(composeParams.bcc, 'bcc')}`;
  delete composeParams.to;
  delete composeParams.bcc;
  delete composeParams.cc;
  return string + '&' + querystring__WEBPACK_IMPORTED_MODULE_9__.stringify(composeParams);
}
function stringifyComposeRecipientParam(value, paramType) {
  let string = '';
  if (Array.isArray(value)) {
    for (let ii = 0; ii < value.length; ii++) {
      string += `&${paramType}=${encodeURIComponent(value[ii])}`;
    }
  } else {
    string += `&${paramType}=${encodeURIComponent(value)}`;
  }
  return string;
}

/***/ }),

/***/ "./src/injected-js/gmail/setup-gmonkey-handler.ts":
/*!********************************************************!*\
  !*** ./src/injected-js/gmail/setup-gmonkey-handler.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupGmonkeyHandler)
/* harmony export */ });
function setupGmonkeyHandler() {
  const gmonkeyPromise = setupGmonkey();
  document.addEventListener('inboxSDKtellMeIsConversationViewDisabled', function () {
    gmonkeyPromise.then(gmonkey => {
      const answer = gmonkey.isConversationViewDisabled();
      const event = document.createEvent('CustomEvent');
      event.initCustomEvent('inboxSDKgmonkeyResponse', false, false, answer);
      document.dispatchEvent(event);
    });
  });
  document.addEventListener('inboxSDKtellMeCurrentThreadId', function (event) {
    let threadId;
    if (event.detail.isPreviewedThread) {
      const rows = Array.from(document.querySelectorAll('[gh=tl] tr.aps'));
      if (rows.length > 0) {
        const elementWithId = rows.map(row => row.querySelector('[data-thread-id]')).filter(Boolean)[0];
        if (elementWithId) {
          threadId = elementWithId.getAttribute('data-thread-id');
        } else {
          threadId = rows[0].getAttribute('data-inboxsdk-threadid');
        }
      }
    } else {
      threadId = window.gmonkey?.v2?.getCurrentThread?.()?.getThreadId();
    }
    if (threadId) {
      // hash is included in the sync id route url, so we also need to take it out
      threadId = threadId.replace('#', '');
      event.target.setAttribute('data-inboxsdk-currentthreadid', threadId);
    }
  });
}
function setupGmonkey() {
  return new Promise(resolve => {
    function check() {
      if (!window.gmonkey) {
        setTimeout(check, 500);
      } else {
        window.gmonkey.load('2.0', resolve);
      }
    }
    check();
  });
}

/***/ }),

/***/ "./src/injected-js/gmail/sync-compose-processor-20220909.ts":
/*!******************************************************************!*\
  !*** ./src/injected-js/gmail/sync-compose-processor-20220909.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actionsToComposeRequestType: () => (/* binding */ actionsToComposeRequestType),
/* harmony export */   parseComposeRequestBody_2022_09_09: () => (/* binding */ parseComposeRequestBody_2022_09_09),
/* harmony export */   parseComposeResponseBody_2022_09_09: () => (/* binding */ parseComposeResponseBody_2022_09_09),
/* harmony export */   replaceBodyContentInComposeSendRequestBody_2022_09_09: () => (/* binding */ replaceBodyContentInComposeSendRequestBody_2022_09_09)
/* harmony export */ });
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/sortBy */ "./node_modules/lodash/sortBy.js");
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_sortBy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/intersection */ "./node_modules/lodash/intersection.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_intersection__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_isNotNil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/isNotNil */ "./src/common/isNotNil.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/injected-js/gmail/constants.ts");




const ACTION_TYPE_PRIORITY_RANK = ['SEND', 'DRAFT_SAVE'];
function parseComposeRequestBody_2022_09_09(request) {
  return parseCreateUpdateSendDraftRequestBody(request);
}
function parseComposeResponseBody_2022_09_09(response) {
  return parseCreateUpdateSendDraftResponseBody(response);
}
function replaceBodyContentInComposeSendRequestBody_2022_09_09(request, newBodyHtmlContent) {
  return replaceBodyContentInSendRequestBody(request, newBodyHtmlContent);
}

/**
 * Parses request body when compose window either saves a draft for the first time,
 * updates the draft or sends the draft.
 * NOTE: request could contain multiple threads and messages within it,
 * prioritize SEND to DRAFT_SAVE message.
 */
function parseCreateUpdateSendDraftRequestBody(request) {
  const updateList = request[1]?.[0];
  if (!Array.isArray(updateList)) {
    // cannot parse
    return null;
  }
  const parsedMessages = updateList.map(parseRequestThread).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_2__["default"]);
  const sorted = lodash_sortBy__WEBPACK_IMPORTED_MODULE_0___default()(parsedMessages, m => ACTION_TYPE_PRIORITY_RANK.indexOf(m.type));
  return sorted[0] || null;
}

/**
 * Parses response body when compose window either saved a draft for the first time,
 * updated the draft, or sent the draft.
 * NOTE: response could contain multiple threads and messages within it
 * even not related to a message/thread in the request body.
 * So the calling code should find needed message manually.
 */
function parseCreateUpdateSendDraftResponseBody(response) {
  const updateList = response[1]?.[5];
  if (!Array.isArray(updateList)) {
    // cannot parse
    return [];
  }
  return updateList.map(parseResponseThread).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_2__["default"]).flatMap(parsedThread => {
    const {
      threadId,
      oldThreadId,
      parsedMessages
    } = parsedThread;
    return parsedMessages.map(parsedMessage => {
      const {
        messageId,
        to,
        cc,
        bcc,
        actions,
        rfcID,
        oldMessageId
      } = parsedMessage;
      const actionType = actionsToComposeRequestType(actions);
      if (!actionType) {
        // unsupported actions within a message
        return null;
      }
      return {
        threadId,
        messageId,
        to,
        cc,
        bcc,
        actions,
        rfcID,
        oldMessageId,
        oldThreadId,
        type: actionType
      };
    });
  }).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_2__["default"]);
}
function replaceBodyContentInSendRequestBody(request, newBodyHtmlContent) {
  // since draftID is not passed from outside,
  // use parse function to find a message which body needs to be replaced
  const parsed = parseCreateUpdateSendDraftRequestBody(request);
  if (!parsed) {
    return null;
  }
  const replaceBodyInThisMessageId = parsed.messageId;
  const updateList = request[1]?.[0];
  if (!Array.isArray(updateList)) {
    // cannot parse
    return null;
  }
  for (const threadWrapper of updateList) {
    if (!Array.isArray(threadWrapper) || !Array.isArray(threadWrapper[1])) {
      // cannot parse
      return null;
    }
    const thread = threadWrapper[1];
    const threadId = parseThreadId(thread[0]);
    if (!threadId) {
      // cannot parse
      return null;
    }
    const parseResult = findAndParseRequestMessage(thread);
    if (parseResult?.parsedMsg.messageId === replaceBodyInThisMessageId) {
      const actionType = actionsToComposeRequestType(parseResult.parsedMsg.actions);
      if (actionType === 'SEND') {
        // find first message with needed messageId and 'SEND' action and replace the body content
        replaceBodyInRequestMsg(parseResult.originalMsg, newBodyHtmlContent);
        return request;
      }
    }
  }
  return null;
}
function parseThreadId(threadId) {
  if (!threadId.startsWith('thread-')) {
    return null;
  }
  if (threadId.includes('|')) {
    return threadId.split('|')[0];
  }
  return threadId;
}
function parseMsgId(messageId) {
  if (!messageId.startsWith('msg-')) {
    // cannot parse
    return null;
  }
  return messageId;
}
function parseContacts(contacts) {
  if (!Array.isArray(contacts)) {
    // cannot parse
    return null;
  }
  return contacts.filter(c => !!c[1]).map(c => ({
    emailAddress: c[1],
    name: c[2] ?? null
  }));
}
function findAndParseRequestMessage(thread) {
  const originalMsgs = [thread[1]?.[2]?.[0]?.[4]?.[0], thread[1]?.[1]?.[0], thread[1]?.[13]?.[0]];
  for (const originalMsg of originalMsgs) {
    const parsedMsg = parseRequestMsg(originalMsg);
    if (parsedMsg) {
      return {
        parsedMsg,
        originalMsg
      };
    }
  }
  return null;
}
function parseRequestThread(threadWrapper) {
  if (!Array.isArray(threadWrapper) || !Array.isArray(threadWrapper[1])) {
    // cannot parse
    return null;
  }
  const thread = threadWrapper[1];
  const threadId = parseThreadId(thread[0]);
  if (!threadId) {
    // cannot parse
    return null;
  }
  const parseResult = findAndParseRequestMessage(thread);
  if (!parseResult) {
    // cannot parse
    return null;
  }
  const {
    parsedMsg: message,
    originalMsg
  } = parseResult;
  const {
    messageId,
    to,
    cc,
    bcc,
    subject,
    body,
    actions
  } = message;
  let actionType = actionsToComposeRequestType(actions);
  if (!actionType) {
    // exit if doesn't have required actions
    return null;
  }

  // usually for draft_save action when draft or reply got saved for first time, response could be different
  // from usual update response, so replace draft_save action with first_draft_save in this case.
  if (actionType === 'DRAFT_SAVE' && (originalMsg === thread[1]?.[2]?.[0]?.[4]?.[0] || originalMsg === thread[1]?.[1]?.[0])) {
    actionType = 'FIRST_DRAFT_SAVE';
  }
  return {
    threadId,
    messageId,
    to,
    cc,
    bcc,
    subject,
    body,
    actions,
    type: actionType
  };
}
function parseRequestMsg(msg) {
  if (!Array.isArray(msg)) {
    // cannot parse
    return null;
  }
  const messageId = parseMsgId(msg[0]);
  if (!messageId) {
    // cannot parse
    return null;
  }
  const subject = msg[7];
  const to = parseContacts(msg[2]);
  const cc = parseContacts(msg[3]);
  const bcc = parseContacts(msg[4]);
  const body = msg[8][1][0][1];
  const actions = msg[10];
  const rfcID = msg[13];
  const oldMessageId = msg[55];
  return {
    messageId,
    to,
    cc,
    bcc,
    subject,
    body,
    actions,
    rfcID,
    oldMessageId
  };
}
function replaceBodyInRequestMsg(msg, newBodyHtmlContent) {
  if (!Array.isArray(msg)) {
    // cannot parse
    return null;
  }
  msg[8][1][0][1] = newBodyHtmlContent;
}
function parseResponseThread(threadWrapper) {
  if (!Array.isArray(threadWrapper) || !Array.isArray(threadWrapper[0])) {
    // cannot parse
    return null;
  }
  const thread = threadWrapper[0];
  const threadId = parseThreadId(thread[0]);
  if (!threadId) {
    // cannot parse
    return null;
  }
  const threadInner = thread[2]?.[6]?.[0];
  if (!Array.isArray(threadInner)) {
    // cannot parse
    return null;
  }
  const oldThreadId = threadInner[19];
  const parsedMessages = Array.isArray(threadInner[4]) ? threadInner[4].map(msg => {
    if (!Array.isArray(msg)) {
      // cannot parse
      return null;
    }
    return parseResponseMsg(msg);
  }).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_2__["default"]) : [];
  return {
    threadId,
    oldThreadId,
    parsedMessages
  };
}
function parseResponseMsg(msg) {
  if (!Array.isArray(msg)) {
    // cannot parse
    return null;
  }
  const messageId = parseMsgId(msg[0]);
  if (!messageId) {
    // cannot parse
    return null;
  }
  const actions = msg[10];
  const to = parseContacts(msg[2]);
  const cc = parseContacts(msg[3]);
  const bcc = parseContacts(msg[4]);
  const rfcID = msg[13];
  const oldMessageId = msg[55];
  return {
    messageId,
    to,
    cc,
    bcc,
    actions,
    rfcID,
    oldMessageId
  };
}
function actionsToComposeRequestType(actions) {
  if (lodash_intersection__WEBPACK_IMPORTED_MODULE_1___default()(actions, _constants__WEBPACK_IMPORTED_MODULE_3__.DRAFT_SAVING_ACTIONS).length === _constants__WEBPACK_IMPORTED_MODULE_3__.DRAFT_SAVING_ACTIONS.length) {
    return 'DRAFT_SAVE';
  }
  if (lodash_intersection__WEBPACK_IMPORTED_MODULE_1___default()(actions, _constants__WEBPACK_IMPORTED_MODULE_3__.SEND_ACTIONS).length === _constants__WEBPACK_IMPORTED_MODULE_3__.SEND_ACTIONS.length) {
    return 'SEND';
  }
  return null;
}

/***/ }),

/***/ "./src/injected-js/gmail/sync-compose-processor.ts":
/*!*********************************************************!*\
  !*** ./src/injected-js/gmail/sync-compose-processor.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseComposeRequestBody: () => (/* binding */ parseComposeRequestBody),
/* harmony export */   parseComposeResponseBody: () => (/* binding */ parseComposeResponseBody),
/* harmony export */   replaceBodyContentInComposeSendRequestBody: () => (/* binding */ replaceBodyContentInComposeSendRequestBody)
/* harmony export */ });
/* harmony import */ var _sync_compose_processor_20220909__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sync-compose-processor-20220909 */ "./src/injected-js/gmail/sync-compose-processor-20220909.ts");
/* harmony import */ var _sync_compose_request_processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sync-compose-request-processor */ "./src/injected-js/gmail/sync-compose-request-processor.ts");
/* harmony import */ var _injected_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../injected-logger */ "./src/injected-js/injected-logger.ts");



function parseComposeRequestBody(request) {
  const requestParsed = JSON.parse(request);
  try {
    if (Array.isArray(requestParsed)) {
      const parsed = (0,_sync_compose_processor_20220909__WEBPACK_IMPORTED_MODULE_0__.parseComposeRequestBody_2022_09_09)(requestParsed);
      if (parsed) {
        return {
          type: parsed.type,
          to: parsed.to,
          cc: parsed.cc,
          bcc: parsed.bcc,
          draftID: parsed.messageId.replace('msg-a:', ''),
          subject: parsed.subject,
          body: parsed.body
        };
      }
      return null;
    }
  } catch (err) {
    _injected_logger__WEBPACK_IMPORTED_MODULE_2__.eventSdkPassive('connection.requestResponseParsingFailed', {
      requestParseError: err
    });
  }
  return (0,_sync_compose_request_processor__WEBPACK_IMPORTED_MODULE_1__.getDetailsOfComposeRequest)(requestParsed);
}
function parseComposeResponseBody(response) {
  const responseParsed = JSON.parse(response);
  if (Array.isArray(responseParsed)) {
    return (0,_sync_compose_processor_20220909__WEBPACK_IMPORTED_MODULE_0__.parseComposeResponseBody_2022_09_09)(responseParsed);
  }
  return [];
}
function replaceBodyContentInComposeSendRequestBody(request, newBodyHtmlContent) {
  const requestParsed = JSON.parse(request);
  try {
    if (Array.isArray(requestParsed)) {
      const replacedRequestObj = (0,_sync_compose_processor_20220909__WEBPACK_IMPORTED_MODULE_0__.replaceBodyContentInComposeSendRequestBody_2022_09_09)(requestParsed, newBodyHtmlContent);
      if (replacedRequestObj) {
        return JSON.stringify(replacedRequestObj);
      }

      // if couldn't parse and replace body content, return original object
      return request;
    }
  } catch (err) {
    _injected_logger__WEBPACK_IMPORTED_MODULE_2__.eventSdkPassive('connection.requestResponseParsingFailed', {
      replaceBodyFailed: err
    });
  }
  return (0,_sync_compose_request_processor__WEBPACK_IMPORTED_MODULE_1__.replaceEmailBodyForSendRequest)(request, newBodyHtmlContent);
}

/***/ }),

/***/ "./src/injected-js/gmail/sync-compose-request-processor.ts":
/*!*****************************************************************!*\
  !*** ./src/injected-js/gmail/sync-compose-request-processor.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDetailsOfComposeRequest: () => (/* binding */ getDetailsOfComposeRequest),
/* harmony export */   replaceEmailBodyForSendRequest: () => (/* binding */ replaceEmailBodyForSendRequest)
/* harmony export */ });
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/intersection */ "./node_modules/lodash/intersection.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_intersection__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/injected-js/gmail/constants.ts");


function getDetailsOfComposeRequest(parsed) {
  const updateList = parsed[2] && parsed[2][1];
  if (!updateList) return null;
  const messageUpdates = updateList.filter(update => {
    const updateWrapper = update[2] && update[2][2] && (update[2][2][14] || update[2][2][2]);
    return updateWrapper && updateWrapper[1] && updateWrapper[1][1] && updateWrapper[1][1].indexOf('msg-a:') > -1;
  });
  if (messageUpdates.length) {
    const sendUpdateMatch = messageUpdates.find(update => {
      const updateWrapper = update[2] && update[2][2] && (update[2][2][14] || update[2][2][2]);
      return updateWrapper[1][11] && lodash_intersection__WEBPACK_IMPORTED_MODULE_0___default()(updateWrapper[1][11], _constants__WEBPACK_IMPORTED_MODULE_1__.SEND_ACTIONS).length === _constants__WEBPACK_IMPORTED_MODULE_1__.SEND_ACTIONS.length;
    });
    if (sendUpdateMatch) {
      const sendUpdateWrapper = sendUpdateMatch[2] && sendUpdateMatch[2][2] && (sendUpdateMatch[2][2][14] || sendUpdateMatch[2][2][2]);
      const sendUpdate = sendUpdateWrapper[1];
      return getComposeRequestFromUpdate(sendUpdate, 'SEND');
    } else {
      // There's a small chance that an update list could contain the
      // draft saves for multiple drafts in some situations — we've never
      // seen this so currently just picking the first update and assuming
      // that if there are multiple updates in the request they are for
      // queued up versions of the same draft.

      const firstMessageUpdate = messageUpdates[0];
      const updateWrapper = firstMessageUpdate[2] && firstMessageUpdate[2][2] && (firstMessageUpdate[2][2][14] || firstMessageUpdate[2][2][2]);
      const update = updateWrapper[1];
      return getComposeRequestFromUpdate(update, 'DRAFT_SAVE');
    }
  } else {
    // the first time a draft is saved it has a different response format
    const messageUpdates = updateList.map(update => update[2] && update[2][2] && update[2][2][3] && update[2][2][3][1] && update[2][2][3][1][5] && update[2][2][3][1][5][0]).filter(Boolean);
    if (messageUpdates.length === 0) return null;
    const firstMessageUpdate = messageUpdates[0];
    return getComposeRequestFromUpdate(firstMessageUpdate, 'FIRST_DRAFT_SAVE');
  }
}
function getComposeRequestFromUpdate(update, type) {
  const body = update[9] && update[9][2] && update[9][2][0] && update[9][2][0][2];
  if (body == null) return null;
  return {
    body,
    type,
    to: parseContacts(update[3]),
    cc: parseContacts(update[4]),
    bcc: parseContacts(update[5]),
    draftID: update[1].replace('msg-a:', ''),
    subject: update[8]
  };
}
function parseContacts(contacts) {
  if (!Array.isArray(contacts)) {
    // exit cuz cannot parse
    return null;
  }
  return contacts.map(c => ({
    emailAddress: c[2],
    name: c[3] || null
  }));
}
function replaceEmailBodyForSendRequest(request, newBody) {
  if (!newBody) return request;
  const parsed = JSON.parse(request);
  const updateList = parsed[2] && parsed[2][1];
  if (!updateList) return request;
  const messageUpdates = updateList.filter(update => {
    const updateWrapper = update[2] && update[2][2] && (update[2][2][14] || update[2][2][2]);
    return updateWrapper && updateWrapper[1] && updateWrapper[1][1] && updateWrapper[1][1].indexOf('msg-a:') > -1;
  });
  if (!messageUpdates.length) return request;
  const sendUpdateMatch = messageUpdates.find(update => {
    const updateWrapper = update[2] && update[2][2] && (update[2][2][14] || update[2][2][2]);
    return updateWrapper[1][11] && lodash_intersection__WEBPACK_IMPORTED_MODULE_0___default()(updateWrapper[1][11], _constants__WEBPACK_IMPORTED_MODULE_1__.SEND_ACTIONS).length === _constants__WEBPACK_IMPORTED_MODULE_1__.SEND_ACTIONS.length;
  });
  if (!sendUpdateMatch) return request;
  const sendUpdateWrapper = sendUpdateMatch[2] && sendUpdateMatch[2][2] && (sendUpdateMatch[2][2][14] || sendUpdateMatch[2][2][2]);
  const sendUpdate = sendUpdateWrapper[1];
  sendUpdate[9][2][0][2] = newBody;
  return JSON.stringify(parsed);
}

/***/ }),

/***/ "./src/injected-js/gmail/thread-identifier/click-and-get-popup-url.ts":
/*!****************************************************************************!*\
  !*** ./src/injected-js/gmail/thread-identifier/click-and-get-popup-url.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clickAndGetPopupUrl)
/* harmony export */ });
/* harmony import */ var lodash_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/constant */ "./node_modules/lodash/constant.js");
/* harmony import */ var lodash_constant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_constant__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_noop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/noop */ "./node_modules/lodash/noop.js");
/* harmony import */ var lodash_noop__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_noop__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _injected_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../injected-logger */ "./src/injected-js/injected-logger.ts");



const ignoreErrors = lodash_constant__WEBPACK_IMPORTED_MODULE_0___default()(true);
function getIfOwn(object, prop) {
  if (Object.prototype.hasOwnProperty.call(object, prop)) {
    return object[prop];
  }
  return null;
} // Simulates a control+meta click on an element, intercepts the call to
// window.open, and returns the attempted popup's URL.

function clickAndGetPopupUrl(element) {
  const event = document.createEvent('MouseEvents');
  const options = {
    bubbles: true,
    cancelable: true,
    button: 0,
    pointerX: 0,
    pointerY: 0,
    ctrlKey: true,
    altKey: false,
    shiftKey: false,
    metaKey: true
  };
  event.initMouseEvent('click', options.bubbles, options.cancelable, document.defaultView, options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, null);
  let url;
  const oldWindowOpen = window.open,
    oldWindowOnerror = window.onerror,
    oldFocus = getIfOwn(window.HTMLElement.prototype, 'focus'),
    oldBlur = getIfOwn(window.HTMLElement.prototype, 'blur');
  try {
    window.HTMLElement.prototype.focus = (lodash_noop__WEBPACK_IMPORTED_MODULE_1___default());
    window.HTMLElement.prototype.blur = (lodash_noop__WEBPACK_IMPORTED_MODULE_1___default());
    window.onerror = ignoreErrors;
    const newOpen = function (_url, _title, _options) {
      url = _url;
      // Gmail checks the returned object for these two values specifically.
      const newWin = {
        closed: false,
        focus: (lodash_noop__WEBPACK_IMPORTED_MODULE_1___default())
      };
      setTimeout(function () {
        newWin.closed = true;
      }, 5);
      return newWin;
    };
    window.open = newOpen;

    // If another extension created a setter on window.open, then setting it
    // could have failed. Log to see if this is a thing that ever happens, and
    // avoid letting windows be opened.
    if (window.open !== newOpen) {
      _injected_logger__WEBPACK_IMPORTED_MODULE_2__.error(new Error('Failed to override window.open'));
      return null;
    }
    element.dispatchEvent(event);
  } finally {
    if (oldFocus) {
      window.HTMLElement.prototype.focus = oldFocus;
    } else {
      delete window.HTMLElement.prototype.focus;
    }
    if (oldBlur) {
      window.HTMLElement.prototype.blur = oldBlur;
    } else {
      delete window.HTMLElement.prototype.blur;
    }
    window.onerror = oldWindowOnerror;
    window.open = oldWindowOpen;
  }
  return url;
}

/***/ }),

/***/ "./src/injected-js/gmail/thread-identifier/index.ts":
/*!**********************************************************!*\
  !*** ./src/injected-js/gmail/thread-identifier/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processThreadListResponse: () => (/* binding */ processThreadListResponse),
/* harmony export */   setup: () => (/* binding */ setup)
/* harmony export */ });
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../platform-implementation-js/dom-driver/gmail/gmail-response-processor */ "./src/platform-implementation-js/dom-driver/gmail/gmail-response-processor.ts");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var _injected_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../injected-logger */ "./src/injected-js/injected-logger.ts");
/* harmony import */ var _thread_row_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thread-row-parser */ "./src/injected-js/gmail/thread-identifier/thread-row-parser.ts");
/* harmony import */ var _click_and_get_popup_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./click-and-get-popup-url */ "./src/injected-js/gmail/thread-identifier/click-and-get-popup-url.ts");
/* harmony import */ var _common_find_parent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/find-parent */ "./src/common/find-parent.ts");
/* harmony import */ var _platform_implementation_js_lib_dom_custom_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../platform-implementation-js/lib/dom/custom-events */ "./src/platform-implementation-js/lib/dom/custom-events.ts");








function setup() {
  try {
    processPreloadedThreads();
  } catch (err) {
    _injected_logger__WEBPACK_IMPORTED_MODULE_3__.error(err, 'Failed to process preloaded thread identifiers');
  }
  document.addEventListener(_platform_implementation_js_lib_dom_custom_events__WEBPACK_IMPORTED_MODULE_7__.CustomDomEvent.tellMeThisThreadIdByDatabase, function (event) {
    try {
      if (!(event.target instanceof HTMLElement)) {
        throw new Error('event.target is not an HTMLElement');
      }
      const threadId = getGmailThreadIdForThreadRowByDatabase(event.target);
      if (threadId) {
        event.target.setAttribute('data-inboxsdk-threadid', threadId);
      }
    } catch (err) {
      _injected_logger__WEBPACK_IMPORTED_MODULE_3__.error(err, 'Error in inboxSDKtellMeThisThreadIdByDatabase');
    }
  });
  document.addEventListener(_platform_implementation_js_lib_dom_custom_events__WEBPACK_IMPORTED_MODULE_7__.CustomDomEvent.tellMeThisThreadIdByClick, function (event) {
    try {
      if (!(event.target instanceof HTMLElement)) {
        throw new Error('event.target is not an HTMLElement');
      }
      const threadId = getGmailThreadIdForThreadRowByClick(event.target);
      if (threadId) {
        event.target.setAttribute('data-inboxsdk-threadid', threadId);
      }
    } catch (err) {
      _injected_logger__WEBPACK_IMPORTED_MODULE_3__.error(err, 'Error in inboxSDKtellMeThisThreadIdByClick');
    }
  });
}
function processThreadListResponse(threadListResponse) {
  processThreads(_platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_1__.extractThreads(threadListResponse));
}
function processThreads(threads) {
  threads.forEach(storeThreadMetadata);
}
const AMBIGUOUS = {
  name: 'AMBIGUOUS'
};
const threadIdsByKey = new Map();
function storeThreadMetadata(threadMetadata) {
  var key = threadMetadataKey(threadMetadata);
  if (threadIdsByKey.has(key)) {
    if (threadIdsByKey.get(key) !== threadMetadata.gmailThreadId) {
      threadIdsByKey.set(key, AMBIGUOUS);
    }
  } else {
    threadIdsByKey.set(key, threadMetadata.gmailThreadId);
  }
}
function threadMetadataKey(threadRowMetadata) {
  return threadRowMetadata.subject.trim() + ':' + threadRowMetadata.timeString.trim() + ':' + threadRowMetadata.peopleHtml.trim();
}
function processPreloadedThreads() {
  const preloadScript = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelectorAll('script:not([src])'), script => script.text && script.text.slice(0, 500).indexOf('var VIEW_DATA=[[') > -1);
  if (!preloadScript) {
    // preloadScript is not available in gmail v2, so let's stop logging an error
    return;
  } else {
    const firstBracket = preloadScript.text.indexOf('[');
    const lastBracket = preloadScript.text.lastIndexOf(']');
    const viewDataString = preloadScript.text.slice(firstBracket, lastBracket + 1);
    processThreads(_platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_1__.extractThreadsFromDeserialized([_platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_1__.deserializeArray(viewDataString)]));
  }
}
function getThreadIdFromUrl(url) {
  var tid = (0,querystring__WEBPACK_IMPORTED_MODULE_2__.parse)(url).th;
  if (!tid) {
    // drafts in sync world can have weird urls that kind of
    // look like old style urls, and get handled properly here
    var urlHashMatch = url.match(/#(.*)/);
    if (urlHashMatch) {
      // drafts have the hash in them without the th=
      url = decodeURIComponent(decodeURIComponent(urlHashMatch[1]));
      tid = (0,querystring__WEBPACK_IMPORTED_MODULE_2__.parse)(url).th;
    }
  }

  // if we're in sync world and it's a
  // draft then a hash can come through in the beginning
  return tid.replace('#', '');
}
function getGmailThreadIdForThreadRowByDatabase(threadRow) {
  const domRowMetadata = _thread_row_parser__WEBPACK_IMPORTED_MODULE_4__.extractMetadataFromThreadRow(threadRow);
  if (domRowMetadata === _thread_row_parser__WEBPACK_IMPORTED_MODULE_4__.ThreadRowAd) {
    // TODO do we want to do anything here?
    return;
  }
  const key = threadMetadataKey(domRowMetadata);
  const value = threadIdsByKey.get(key);
  if (typeof value === 'string') {
    return value;
  }
}
function getGmailThreadIdForThreadRowByClick(threadRow) {
  // Simulate a ctrl-click on the thread row to get the thread id, then
  // simulate a ctrl-click on the previously selected thread row (or the
  // first thread row) to put the cursor back where it was.
  _thread_row_parser__WEBPACK_IMPORTED_MODULE_4__.extractMetadataFromThreadRow(threadRow);
  const parent = (0,_common_find_parent__WEBPACK_IMPORTED_MODULE_6__["default"])(threadRow, el => el.nodeName === 'DIV' && el.getAttribute('role') === 'main');
  if (!parent) {
    throw new Error("Can't operate on disconnected thread row");
  }
  const currentRowSelection = parent.querySelector('td.PE') || parent.querySelector('tr');
  const url = (0,_click_and_get_popup_url__WEBPACK_IMPORTED_MODULE_5__["default"])(threadRow);
  const threadId = url && getThreadIdFromUrl(url);
  if (currentRowSelection) {
    (0,_click_and_get_popup_url__WEBPACK_IMPORTED_MODULE_5__["default"])(currentRowSelection);
  }
  return threadId;
}

/***/ }),

/***/ "./src/injected-js/gmail/thread-identifier/thread-row-parser.ts":
/*!**********************************************************************!*\
  !*** ./src/injected-js/gmail/thread-identifier/thread-row-parser.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThreadRowAd: () => (/* binding */ ThreadRowAd),
/* harmony export */   extractMetadataFromThreadRow: () => (/* binding */ extractMetadataFromThreadRow)
/* harmony export */ });
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/intersection */ "./node_modules/lodash/intersection.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_intersection__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _injected_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../injected-logger */ "./src/injected-js/injected-logger.ts");
/* harmony import */ var _platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../platform-implementation-js/dom-driver/gmail/gmail-response-processor */ "./src/platform-implementation-js/dom-driver/gmail/gmail-response-processor.ts");
/* harmony import */ var _common_assert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/assert */ "./src/common/assert.ts");




/**
 * Ads in the Promotions tab aren't included with other thread row data.
 */
const ThreadRowAd = Symbol(`ThreadRowAd`);
function extractMetadataFromThreadRow(threadRow) {
  var timeSpan, subjectSpan, peopleDiv;
  (0,_common_assert__WEBPACK_IMPORTED_MODULE_3__.assert)(threadRow.hasAttribute('id'), 'check element is main thread row');
  var errors = [];
  var threadRowIsVertical = lodash_intersection__WEBPACK_IMPORTED_MODULE_0___default()(Array.from(threadRow.classList), ['zA', 'apv']).length === 2;
  const isThreadRowAd = threadRow.querySelector('.am0,.bvA');
  if (isThreadRowAd) {
    return ThreadRowAd;
  } else if (threadRowIsVertical) {
    var threadRow2 = threadRow.nextElementSibling;
    if (!threadRow2) {
      errors.push('failed to find threadRow2');
    } else {
      var threadRow3 = threadRow2.nextElementSibling;
      if (!threadRow3 || !threadRow3.classList.contains('apw')) {
        threadRow3 = null;
      }
      timeSpan = threadRow.querySelector('td.apt > div.apm > span[title]');
      subjectSpan = threadRow2.querySelector('td div.xS div.xT div.y6 > span');
      peopleDiv = threadRow.querySelector('td.apy > div.yW, td.apx > div.yW');
    }
  } else {
    timeSpan = threadRow.querySelector('td.xW > span[title]');
    var subjectAreaDiv = threadRow.querySelector('td.a4W div[role=link] div.y6');
    if (subjectAreaDiv && subjectAreaDiv.children.length >= 1) {
      subjectSpan = subjectAreaDiv.children[0]; // body snippet is not always present.
      //var bodySnippetSpan = subjectAreaDiv.children[1];
    }

    peopleDiv = threadRow.querySelector('td.yX > div.yW');
  }
  if (!timeSpan) {
    errors.push('failed to find timeSpan');
  }
  if (!subjectSpan) {
    errors.push('failed to find subjectSpan');
  }
  if (!peopleDiv) {
    errors.push('failed to find peopleDiv');
  }
  if (errors.length) {
    _injected_logger__WEBPACK_IMPORTED_MODULE_1__.error(new Error('Errors in thread row parsing'), {
      errors
    });
  }
  return {
    timeString: timeSpan ? timeSpan.getAttribute('title') || '' : '',
    subject: subjectSpan ? subjectSpan.textContent : '',
    peopleHtml: peopleDiv ? (0,_platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_2__.cleanupPeopleLine)(peopleDiv.innerHTML) : ''
  };
}

/***/ }),

/***/ "./src/injected-js/injected-logger.ts":
/*!********************************************!*\
  !*** ./src/injected-js/injected-logger.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   eventSdkPassive: () => (/* binding */ eventSdkPassive)
/* harmony export */ });
function error(err, details) {
  if (!err) {
    err = new Error('No error given');
  }
  console.error('Error in injected script', err, details);
  try {
    JSON.stringify(details);
  } catch (e) {
    details = '<failed to jsonify>';
  }
  const errorProperties = {};
  for (const name in err) {
    if (Object.prototype.hasOwnProperty.call(err, name)) {
      try {
        const value = err[name];
        JSON.stringify(value);
        errorProperties[name] = value;
      } catch (err) {
        // ignore
      }
    }
  }
  if (Object.keys(errorProperties).length > 0) {
    details = {
      errorProperties,
      details
    };
  }
  document.dispatchEvent(new CustomEvent('inboxSDKinjectedError', {
    bubbles: false,
    cancelable: false,
    detail: {
      message: err && err.message,
      stack: err && err.stack,
      details
    }
  }));
}
function eventSdkPassive(name, details, sensitive) {
  try {
    JSON.stringify(details);
  } catch (e) {
    details = '<failed to jsonify>';
  }
  document.dispatchEvent(new CustomEvent('inboxSDKinjectedEventSdkPassive', {
    bubbles: false,
    cancelable: false,
    detail: {
      name,
      details,
      sensitive
    }
  }));
}

/***/ }),

/***/ "./src/injected-js/message-metadata-holder.ts":
/*!****************************************************!*\
  !*** ./src/injected-js/message-metadata-holder.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   setup: () => (/* binding */ setup)
/* harmony export */ });
/* harmony import */ var lodash_startsWith__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/startsWith */ "./node_modules/lodash/startsWith.js");
/* harmony import */ var lodash_startsWith__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_startsWith__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform-implementation-js/dom-driver/gmail/gmail-response-processor */ "./src/platform-implementation-js/dom-driver/gmail/gmail-response-processor.ts");
/* harmony import */ var _platform_implementation_js_dom_driver_gmail_gmail_driver_getSyncThreadFromSyncThreadId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform-implementation-js/dom-driver/gmail/gmail-driver/getSyncThreadFromSyncThreadId */ "./src/platform-implementation-js/dom-driver/gmail/gmail-driver/getSyncThreadFromSyncThreadId.ts");
/* harmony import */ var _injected_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./injected-logger */ "./src/injected-js/injected-logger.ts");
/* harmony import */ var _platform_implementation_js_driver_common_requestGmailThread__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../platform-implementation-js/driver-common/requestGmailThread */ "./src/platform-implementation-js/driver-common/requestGmailThread.ts");





const threadIdToMessages = new Map();
function setup() {
  document.addEventListener('inboxSDKtellMeThisMessageDate', function (event) {
    exposeMetadata(event, 'data-inboxsdk-sortdate', m => m.date);
  });
  document.addEventListener('inboxSDKtellMeThisMessageRecipients', function (event) {
    exposeMetadata(event, 'data-inboxsdk-recipients', m => {
      if (m.recipients) return m.recipients;else return null;
    });
  });
}
function exposeMetadata(event, attribute, processor) {
  const {
    target,
    detail: {
      threadId,
      ikValue,
      btaiHeader,
      xsrfToken
    }
  } = event;
  (async () => {
    const messageIndex = Array.from(target.parentElement.children).filter(el => !el.classList.contains('inboxsdk__custom_message_view')).indexOf(target);
    if (messageIndex < 0) {
      throw new Error('Should not happen');
    }
    let message = getMessage(threadId, messageIndex);
    if (message == null || !message.recipients) {
      try {
        await addDataForThread(threadId, ikValue, btaiHeader, xsrfToken);
      } catch (err) {
        _injected_logger__WEBPACK_IMPORTED_MODULE_3__.error(err);
      }
      message = getMessage(threadId, messageIndex);
      if (message == null) {
        throw new Error('Failed to find message date after re-requesting thread');
      }
    }
    target.setAttribute(attribute, JSON.stringify(processor(message)));
  })().catch(err => {
    target.setAttribute(attribute, 'error');
    _injected_logger__WEBPACK_IMPORTED_MODULE_3__.error(err);
  });
}
function getMessage(threadId, messageIndex) {
  const messages = threadIdToMessages.get(threadId);
  if (messages) {
    const message = messages[messageIndex];
    if (message) {
      return message;
    }
  }
}
function add(groupedMessages) {
  groupedMessages.forEach(group => {
    threadIdToMessages.set(group.threadID, group.messages);
  });
}
const activeThreadRequestPromises = new Map();
function addDataForThread(threadId, ikValue, btaiHeader, xsrfToken) {
  const existingRequestPromise = activeThreadRequestPromises.get(threadId);
  if (existingRequestPromise) {
    return existingRequestPromise;
  }
  const newPromise = (async () => {
    try {
      if (lodash_startsWith__WEBPACK_IMPORTED_MODULE_0___default()(threadId, 'thread')) {
        // new data layer
        if (!btaiHeader || !xsrfToken) {
          throw new Error('Need btaiHeader and xsrfToken when in new data layer');
        }
        const syncThread = await (0,_platform_implementation_js_dom_driver_gmail_gmail_driver_getSyncThreadFromSyncThreadId__WEBPACK_IMPORTED_MODULE_2__.getThreadFromSyncThreadIdUsingHeaders)(threadId, btaiHeader, xsrfToken);
        if (syncThread) {
          add([{
            threadID: syncThread.syncThreadID,
            messages: syncThread.extraMetaData.syncMessageData.map(syncMessage => ({
              date: syncMessage.date,
              recipients: syncMessage.recipients
            }))
          }]);
        }
      } else {
        // legacy gmail
        const text = await (0,_platform_implementation_js_driver_common_requestGmailThread__WEBPACK_IMPORTED_MODULE_4__["default"])(ikValue, threadId);
        add((0,_platform_implementation_js_dom_driver_gmail_gmail_response_processor__WEBPACK_IMPORTED_MODULE_1__.extractMessages)(text));
      }
    } catch (err) {
      _injected_logger__WEBPACK_IMPORTED_MODULE_3__.error(err);
    } finally {
      activeThreadRequestPromises.delete(threadId);
    }
  })();
  activeThreadRequestPromises.set(threadId, newPromise);
  return newPromise;
}

/***/ }),

/***/ "./src/injected-js/setup-data-exposer.ts":
/*!***********************************************!*\
  !*** ./src/injected-js/setup-data-exposer.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupDataExposer)
/* harmony export */ });
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _injected_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injected-logger */ "./src/injected-js/injected-logger.ts");
/* harmony import */ var _platform_implementation_js_lib_wait_for__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform-implementation-js/lib/wait-for */ "./src/platform-implementation-js/lib/wait-for.ts");



function stupidToBool(stupid) {
  switch ('' + stupid) {
    case '1':
    case 't':
    case 'true':
      return true;
    default:
      return false;
  }
}
function getSettingValue(settings, name) {
  var entry = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(settings, setting => setting[0] === name);
  return entry ? stupidToBool(entry[1]) : false;
}
function getContext() {
  let context = __webpack_require__.g;
  try {
    // our current tab has globals defined
    if (context.GLOBALS) return context;

    // we don't, let's see if we have access to opener (i.e. we are a new compose/thread view)
    if (__webpack_require__.g.opener && __webpack_require__.g.opener.top) {
      // try to get href
      // if the opener is not gmail (i.e. you clicked on a mailto link on craigslist) then this will throw an error
      __webpack_require__.g.opener.top.location.href;
      context = __webpack_require__.g.opener.top;
    }
  } catch (err) {
    context = __webpack_require__.g; //we got an error from requesting global.opener.top.location.href;
  }

  return context;
}
function setupDataExposer() {
  let context;
  (0,_platform_implementation_js_lib_wait_for__WEBPACK_IMPORTED_MODULE_2__["default"])(() => {
    context = getContext();
    return context && (context.GLOBALS || context.gbar);
  }).then(() => {
    if (!context) return;
    var userEmail = context.GLOBALS ? context.GLOBALS[10] : context.gbar._CONFIG[0][10][5];
    document.head.setAttribute('data-inboxsdk-user-email-address', userEmail);
    var userLanguage = context.GLOBALS ? context.GLOBALS[4].split('.')[1] : context.gbar._CONFIG[0][0][4];
    document.head.setAttribute('data-inboxsdk-user-language', userLanguage);
    document.head.setAttribute('data-inboxsdk-using-sync-api', context.GM_SPT_ENABLED);
    if (context.GLOBALS) {
      // Gmail
      document.head.setAttribute('data-inboxsdk-ik-value', context.GLOBALS[9]);
      document.head.setAttribute('data-inboxsdk-action-token-value', context.GM_ACTION_TOKEN);
      var globalSettingsHolder = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(context.GLOBALS[17], item => item[0] === 'p');
      if (!globalSettingsHolder) {
        // global settings doesn't exist on gmail v2, so we don't need to log this anymore
        return;
      } else {
        var globalSettings = globalSettingsHolder[1];
        {
          var previewPaneLabEnabled = getSettingValue(globalSettings, 'bx_lab_1252');
          var previewPaneEnabled = getSettingValue(globalSettings, 'bx_spa');
          var previewPaneVertical = getSettingValue(globalSettings, 'bx_spo');
          var previewPaneMode = previewPaneLabEnabled && previewPaneEnabled ? previewPaneVertical ? 'vertical' : 'horizontal' : 'none';
          document.head.setAttribute('data-inboxsdk-user-preview-pane-mode', previewPaneMode);
        }
      }
    } else {
      // Inbox
      const preloadDataSearchString = 'window.BT_EmbeddedAppData=[';
      const preloadScript = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelectorAll('script:not([src])'), script => script.text && script.text.slice(0, 500).indexOf(preloadDataSearchString) > -1);
      if (!preloadScript) {
        _injected_logger__WEBPACK_IMPORTED_MODULE_1__.error(new Error('Could not read preloaded BT_EmbeddedAppData'));
      } else {
        const {
          text
        } = preloadScript;
        const firstBracket = text.indexOf('window.BT_EmbeddedAppData=[');
        let lastBracket = text.indexOf(']\n;', firstBracket);
        if (lastBracket === -1) {
          // I have only seen the case where there is a new line between the
          // closing bracket and the semicolon, but want to be defensive in
          // case that changes.
          lastBracket = text.indexOf('];', firstBracket);
        }
        const preloadData = JSON.parse(text.slice(firstBracket + preloadDataSearchString.length - 1, lastBracket + 1));
        const ikValue = preloadData[11];
        if (typeof ikValue !== 'string') {
          _injected_logger__WEBPACK_IMPORTED_MODULE_1__.error(new Error('Could not find valid ikValue'));
        } else {
          document.head.setAttribute('data-inboxsdk-ik-value', ikValue);
        }
        const xsrfToken = preloadData[12];
        if (typeof xsrfToken !== 'string') {
          _injected_logger__WEBPACK_IMPORTED_MODULE_1__.error(new Error('Could not find valid xsrfToken'));
        } else {
          document.head.setAttribute('data-inboxsdk-xsrf-token', xsrfToken);
        }
      }
    }
  }).catch(err => {
    function getStatus() {
      return {
        hasGLOBALS: !!context.GLOBALS,
        hasGbar: !!context.gbar
      };
    }
    var startStatus = getStatus();
    var waitTime = 180 * 1000;
    setTimeout(() => {
      var laterStatus = getStatus();
      _injected_logger__WEBPACK_IMPORTED_MODULE_1__.eventSdkPassive('waitfor global data', {
        startStatus,
        waitTime,
        laterStatus
      });
    }, waitTime);
    throw err;
  }).catch(_injected_logger__WEBPACK_IMPORTED_MODULE_1__.error);
}

/***/ }),

/***/ "./src/injected-js/setup-error-silencer.ts":
/*!*************************************************!*\
  !*** ./src/injected-js/setup-error-silencer.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupErrorSilencer)
/* harmony export */ });
function setupErrorSilencer() {
  var oldErrorHandlers = [];
  document.addEventListener('inboxSDKsilencePageErrors', function () {
    oldErrorHandlers.push(window.onerror);
    window.onerror = function () {
      if (true) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        console.error('(Silenced in production) Page error:', ...args);
      }
      return true;
    };
  });
  document.addEventListener('inboxSDKunsilencePageErrors', function () {
    window.onerror = oldErrorHandlers.pop();
  });
}

/***/ }),

/***/ "./src/injected-js/setup-event-reemitter.ts":
/*!**************************************************!*\
  !*** ./src/injected-js/setup-event-reemitter.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupEventReemitter)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-empty-function */
function setupEventReemitter() {
  // Webkit has bugs that stop certain types of events from being created. We
  // can manually fake creation of those events, but we have to do it from
  // inside the page's script if we want the page's script to see the modified
  // properties.
  // https://bugs.webkit.org/show_bug.cgi?id=16735
  // https://code.google.com/p/chromium/issues/detail?id=327853
  document.addEventListener('inboxsdk_event_relay', function (event) {
    const newEvent = document.createEvent('Events');
    newEvent.initEvent(event.detail.type, event.detail.bubbles, event.detail.cancelable);
    Object.assign(newEvent, event.detail.props);
    if (event.detail.dataTransfer) {
      const {
        files,
        fileNames
      } = event.detail.dataTransfer;
      if (fileNames) {
        fileNames.forEach((fileName, i) => {
          const file = files[i];
          if (typeof file.name !== 'string') {
            file.name = fileName;
          }
        });
      }
      newEvent.dataTransfer = {
        dropEffect: 'none',
        effectAllowed: 'all',
        files,
        items: files.map((_ref, i) => {
          let {
            type
          } = _ref;
          return {
            kind: 'file',
            type,
            getAsFile() {
              return files[i];
            },
            getAsString() {
              throw new Error('getAsString not supported');
            }
          };
        }),
        types: ['Files'],
        getData() {
          return '';
        },
        setData() {},
        setDragImage() {}
      };
    }
    event.target.dispatchEvent(newEvent);
  });
}

/***/ }),

/***/ "./src/injected-js/setupCustomViewEventAssassin.ts":
/*!*********************************************************!*\
  !*** ./src/injected-js/setupCustomViewEventAssassin.ts ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupCustomViewEventAssassin)
/* harmony export */ });
/* harmony import */ var ud__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ud */ "./node_modules/ud/js/index.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _injected_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injected-logger */ "./src/injected-js/injected-logger.ts");
/* module decorator */ module = __webpack_require__.hmd(module);



function md(value) {
  return {
    value,
    configurable: true
  };
}

// These are basically all the keys that trigger some action in thread list
// views and thread views that we don't want to be triggerable while a custom
// view is open. Key combos which affect things still visible on the screen or
// navigate to a new view are still allowed.

const blockedAnyModKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Enter'];

// These are only necessary for Safari
const blockedKeyIdentifiers = ['Left', 'Right', 'Up', 'Down'];
const blockedAnyModCharacters = '!#[]{}_+=-;:\r\n1234567890`~';
const blockedNoModCharacters = ',xsyemrafz.ujkpnl';
const blockedShiftCharacters = 'parfniut';
function shouldBlockEvent(event) {
  if (!document.body.classList.contains('inboxsdk__custom_view_active')) {
    return false;
  }
  const target = event.target;
  const key = event.key || /* safari*/String.fromCharCode(event.which || event.keyCode);

  // Block all escape key presses inside a custom view, even when an input
  // is focused.
  if (event.key === 'Escape' && target instanceof HTMLElement && target.closest('.inboxsdk__custom_view')) {
    return true;
  }
  if (lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(blockedAnyModKeys, key) || /* safari */lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(blockedKeyIdentifiers, event.keyIdentifier) || lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(blockedAnyModCharacters, key) || !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey && lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(blockedNoModCharacters, key) || event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey && lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(blockedShiftCharacters, key.toLowerCase())) {
    if (
    // Gmail already ignores events originating in these elements even if
    // they were made by an extension.
    target instanceof HTMLElement && target.closest('input, textarea, button, [contenteditable]') ||
    // Gmail ignores events originating in its own interactive elements
    // which tend to have certain role attributes.
    target instanceof HTMLElement && !target.closest('.inboxsdk__custom_view') && target.closest('[role=button], [role=link]')) {
      return false;
    }
    return true;
  }
  return false;
}
const handler = (0,ud__WEBPACK_IMPORTED_MODULE_2__.defn)(module, function (event) {
  try {
    // If the key is in a blacklist and it originated while a custom view is
    // present, then maim the event object before Gmail or Inbox sees it.
    if (shouldBlockEvent(event)) {
      Object.defineProperties(event, {
        altKey: md(false),
        ctrlKey: md(false),
        shiftKey: md(false),
        metaKey: md(false),
        charCode: md(92),
        code: md('Backslash'),
        key: md('\\'),
        keyCode: md(92),
        which: md(92)
      });
    }
  } catch (err) {
    _injected_logger__WEBPACK_IMPORTED_MODULE_1__.error(err);
  }
});
function setupCustomViewEventAssassin() {
  document.addEventListener('keydown', handler, true);
}

/***/ }),

/***/ "./src/injected-js/setupInboxCustomViewLinkFixer.ts":
/*!**********************************************************!*\
  !*** ./src/injected-js/setupInboxCustomViewLinkFixer.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupInboxCustomViewLinkFixer)
/* harmony export */ });
function setupInboxCustomViewLinkFixer() {
  const allowedStartTerms = new Set();
  document.addEventListener('inboxSDKregisterAllowedHashLinkStartTerm', function (event) {
    const term = event.detail.term;
    allowedStartTerms.add(term);
  });
  document.addEventListener('click', function (event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const anchor = target.closest('a[href^="#"]');
    if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
    const m = /^#([^/]+)/.exec(anchor.getAttribute('href') || '');
    if (!m) return;
    const startTerm = m[1];
    if (!allowedStartTerms.has(startTerm)) return;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    event.preventDefault = () => {};
  }, true);
}

/***/ }),

/***/ "./src/injected-js/setupPushStateListener.ts":
/*!***************************************************!*\
  !*** ./src/injected-js/setupPushStateListener.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupPushStateListener)
/* harmony export */ });
function setupPushStateListener() {
  const origPushState = history.pushState;
  history.pushState = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const ret = origPushState.apply(this, args);
    document.dispatchEvent(new CustomEvent('inboxSDKpushState', {
      bubbles: false,
      cancelable: false,
      detail: {
        args
      }
    }));
    return ret;
  };
}

/***/ }),

/***/ "./src/injected-js/xhr-helper.ts":
/*!***************************************!*\
  !*** ./src/injected-js/xhr-helper.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ xhrHelper)
/* harmony export */ });
function xhrHelper() {
  document.addEventListener('inboxSDKpageAjax', function (event) {
    const id = event.detail.id;
    const opts = {
      url: event.detail.url,
      method: event.detail.method,
      headers: event.detail.headers,
      xhrFields: event.detail.xhrFields,
      data: event.detail.data
    };

    // It's important to use fetch when possible because it's needed for
    // getDownloadURL() in Gmail v2: Gmail v2's ServiceWorker in Chrome causes
    // xhr.responseURL to have the wrong value (possibly a Chrome bug).
    (async () => {
      const response = await fetch(opts.url, {
        method: opts.method || 'GET',
        credentials: 'include'
      });
      document.dispatchEvent(new CustomEvent('inboxSDKpageAjaxDone', {
        bubbles: false,
        cancelable: false,
        detail: {
          id,
          error: false,
          text: await response.text(),
          responseURL: response.url
        }
      }));
    })().catch(err => {
      document.dispatchEvent(new CustomEvent('inboxSDKpageAjaxDone', {
        bubbles: false,
        cancelable: false,
        detail: {
          id,
          error: true,
          message: err && err.message,
          stack: err && err.stack,
          status: err && err.xhr && err.xhr.status
        }
      }));
    });
  });
}

/***/ }),

/***/ "./src/injected-js/xhr-proxy-factory.ts":
/*!**********************************************!*\
  !*** ./src/injected-js/xhr-proxy-factory.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ XHRProxyFactory)
/* harmony export */ });
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/has */ "./node_modules/lodash/has.js");
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_noop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/noop */ "./node_modules/lodash/noop.js");
/* harmony import */ var lodash_noop__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_noop__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/filter */ "./node_modules/lodash/filter.js");
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_once__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/once */ "./node_modules/lodash/once.js");
/* harmony import */ var lodash_once__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_once__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_assert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/assert */ "./src/common/assert.ts");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var _common_isNotNil__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/isNotNil */ "./src/common/isNotNil.ts");
/* eslint-disable prefer-rest-params */










const WARNING_TIMEOUT = 60 * 1000;

/**
 * Object with information about the connection in progress. Its fields are
 * populated as the connection goes on. The object is passed as the first
 * argument to all of the wrappers. The object is mutable so the wrappers can
 * add properties to it.
 *
 * @typedef {Object} XHRProxyConnectionDetails
 * @property {string} method
 * @property {string} url
 * @property {Object} params - parameters decoded from the URL
 * @property {Object} headers - request headers set on the XHR
 * @property {string} responseType
 * @property {string} originalSendBody - data passed to send method
 * @property {number} status - HTTP response status
 * @property {string} [originalResponseText] - Is not set if responseType is set
 *  to a value besides 'text'.
 * @property {string} [modifiedResponseText]
 */

/**
 * Thing
 *
 * @callback XHRProxyWrapperCallback
 * @param {XHRProxyConnectionDetails} connection
 */

/**
 * Wrapper object contains optional callbacks that get run for completed
 * requests, and a required isRelevantTo method that filters what types of
 * requests the methods should be called for. All methods are passed an object
 * with details about the connection as the first argument. Some methods are
 * called with a relevant second argument (which is also present within the
 * connection argument).
 *
 * @typedef {Object} XHRProxyWrapper
 * @property {XHRProxyWrapperCallback} isRelevantTo - returns true if wrapper should be used
 *  for request.
 * @property {XHRProxyWrapperCallback} [originalSendBodyLogger] - called with value passed to
 *  send.
 * @property {XHRProxyWrapperCallback} [requestChanger] - Allows the protocol, URL, and body
 *  to be changed together before the connection is opened and sent.
 * @property {XHRProxyWrapperCallback} [originalResponseTextLogger] - called with the responseText as
 *  given by the server. Is not called if responseType is set to a value besides 'text'.
 * @property {XHRProxyWrapperCallback} [responseTextChanger] - called with the responseText as given
 *  by the server and returns new responseText value. Is not called if responseType
 * is set to a value besides 'text'.
 * @property {XHRProxyWrapperCallback} [finalResponseTextLogger] - called with the responseText as
 *  delivered to application code. Is not called if responseType is set to a value besides 'text'.
 * @property {XHRProxyWrapperCallback} [afterListeners] - called after all event listeners
 *  for readystatechange have run
 */

/**
 * Creates a drop-in replacement for the XMLHttpRequest constructor that can
 * have wrappers which may log or modify server responses. See
 * test/xhrproxy.js for usage examples and tests.
 * @function XHRProxyFactory
 * @param {function} XHR - original XMLHttpRequest constructor to wrap
 * @param {XHRProxyWrapper[]} wrappers - mutable array
 * @param {Object} [opts] - Can specify a logError function
 * @returns {function} wrapped XMLHttpRequest-like constructor
 */

function XHRProxyFactory(XHR, wrappers, opts) {
  const logError = opts && opts.logError || function (error) {
    setTimeout(function () {
      // let window.onerror log this
      throw error;
    }, 1);
  };
  function transformEvent(oldTarget, newTarget, event) {
    const newEvent = {};
    Object.keys(event).concat(['bubbles', 'cancelBubble', 'cancelable', 'defaultPrevented', 'preventDefault', 'stopPropagation', 'stopImmediatePropagation', 'lengthComputable', 'loaded', 'total', 'type', 'currentTarget', 'target', 'srcElement', 'NONE', 'CAPTURING_PHASE', 'AT_TARGET', 'BUBBLING_PHASE', 'eventPhase']).filter(name => name in event).forEach(name => {
      const value = event[name];
      if (value === oldTarget) {
        newEvent[name] = newTarget;
      } else if (typeof value === 'function') {
        newEvent[name] = value.bind(event);
      } else {
        newEvent[name] = value;
      }
    });
    return newEvent;
  }
  function wrapEventListener(oldTarget, newTarget, listener) {
    return function (event) {
      return listener.call(newTarget, transformEvent(oldTarget, newTarget, event));
    };
  }
  function findApplicableWrappers(wrappers, connection) {
    return lodash_filter__WEBPACK_IMPORTED_MODULE_3___default()(wrappers, function (wrapper) {
      try {
        return wrapper.isRelevantTo(connection);
      } catch (e) {
        logError(e);
      }
    });
  }
  function XHRProxy() {
    this._wrappers = wrappers;
    this._listeners = {};
    this._boundListeners = {};
    this._events = new (events__WEBPACK_IMPORTED_MODULE_7___default())(); // used for internal stuff, not user-visible events

    this.responseText = '';
    this._openState = false;
    if (XHR.bind && XHR.bind.apply) {
      // call constructor with variable number of arguments
      this._realxhr = new (XHR.bind.apply(XHR, [null].concat(arguments)))();
    } else {
      // Safari's XMLHttpRequest lacks a bind method, but its constructor
      // doesn't support extra arguments anyway, so don't bother logging an
      // error here.
      this._realxhr = new XHR();
    }
    const self = this;
    const triggerEventListeners = (name, event) => {
      if (this['on' + name]) {
        try {
          wrapEventListener(this._realxhr, this, this['on' + name]).call(this, event);
        } catch (e) {
          logError(e, 'XMLHttpRequest event listener error');
        }
      }
      lodash_each__WEBPACK_IMPORTED_MODULE_2___default()(this._boundListeners[name], boundListener => {
        try {
          boundListener(event);
        } catch (e) {
          logError(e, 'XMLHttpRequest event listener error');
        }
      });
    };
    const runRscListeners = event => {
      triggerEventListeners('readystatechange', event);
    };
    this._fakeRscEvent = function () {
      runRscListeners(Object.freeze({
        bubbles: false,
        cancelBubble: false,
        cancelable: false,
        defaultPrevented: false,
        preventDefault: (lodash_noop__WEBPACK_IMPORTED_MODULE_1___default()),
        stopPropagation: (lodash_noop__WEBPACK_IMPORTED_MODULE_1___default()),
        stopImmediatePropagation: (lodash_noop__WEBPACK_IMPORTED_MODULE_1___default()),
        type: 'readystatechange',
        currentTarget: this,
        target: this,
        srcElement: this,
        NONE: 0,
        CAPTURING_PHASE: 1,
        AT_TARGET: 2,
        BUBBLING_PHASE: 3,
        eventPhase: 0
      }));
    };
    const deliverFinalRsc = event => {
      this.readyState = 4;
      // Remember the status now before any event handlers are called, just in
      // case one aborts the request.
      var wasSuccess = this.status == 200;
      var progressEvent = Object.assign({}, transformEvent(this._realxhr, this, event), {
        lengthComputable: false,
        loaded: 0,
        total: 0
      });
      var supportsResponseText = !this._realxhr.responseType || this._realxhr.responseType == 'text';
      if (supportsResponseText) {
        lodash_each__WEBPACK_IMPORTED_MODULE_2___default()(this._activeWrappers, wrapper => {
          if (wrapper.finalResponseTextLogger) {
            try {
              wrapper.finalResponseTextLogger(this._connection, this.responseText);
            } catch (e) {
              logError(e);
            }
          }
        });
      }
      runRscListeners(event);
      if (wasSuccess) {
        triggerEventListeners('load', progressEvent);
      } else {
        triggerEventListeners('error', progressEvent);
      }
      triggerEventListeners('loadend', progressEvent);
      lodash_each__WEBPACK_IMPORTED_MODULE_2___default()(this._activeWrappers, wrapper => {
        if (wrapper.afterListeners) {
          try {
            wrapper.afterListeners(this._connection);
          } catch (e) {
            logError(e);
          }
        }
      });
    };
    this._realxhr.addEventListener('readystatechange', event => {
      if (!this._connection) {
        return;
      }
      if (this._realxhr.readyState >= 2) {
        this._connection.status = this._realxhr.status;
      }
      const supportsResponseText = !this._realxhr.responseType || this._realxhr.responseType == 'text';

      // Process the response text.
      if (this._realxhr.readyState == 4) {
        if (supportsResponseText) {
          Object.defineProperty(this._connection, 'originalResponseText', {
            enumerable: true,
            writable: false,
            configurable: false,
            value: self._realxhr.responseText
          });
          lodash_each__WEBPACK_IMPORTED_MODULE_2___default()(this._activeWrappers, wrapper => {
            if (wrapper.originalResponseTextLogger) {
              try {
                wrapper.originalResponseTextLogger(this._connection, this._connection.originalResponseText);
              } catch (e) {
                logError(e);
              }
            }
          });
          const finish = lodash_once__WEBPACK_IMPORTED_MODULE_5___default()(deliverFinalRsc.bind(null, event));
          if (this._connection.async) {
            // If the XHR object is re-used for another connection, then we need
            // to make sure that our upcoming async calls here do nothing.
            // Remember the current connection object, and do nothing in our async
            // calls if it no longer matches.
            const startConnection = this._connection;
            (async () => {
              let modifiedResponseText = startConnection.originalResponseText;
              startConnection.modifiedResponseText = modifiedResponseText;
              for (const responseTextChanger of this._responseTextChangers) {
                const longRunWarningTimer = setTimeout(() => {
                  console.warn('responseTextChanger is taking too long', responseTextChanger, startConnection);
                }, WARNING_TIMEOUT);
                try {
                  modifiedResponseText = await responseTextChanger(startConnection, modifiedResponseText);
                } finally {
                  clearTimeout(longRunWarningTimer);
                }
                if (typeof modifiedResponseText !== 'string') {
                  throw new Error('responseTextChanger returned non-string value ' + modifiedResponseText);
                }
                startConnection.modifiedResponseText = modifiedResponseText;
                if (startConnection !== this._connection) break;
              }
              return modifiedResponseText;
            })().then(modifiedResponseText => {
              if (startConnection === self._connection) {
                this.responseText = modifiedResponseText;
                finish();
              }
            }, err => {
              logError(err);
              if (startConnection === this._connection) {
                this.responseText = this._realxhr.responseText;
                finish();
              }
            }).catch(logError);
            return;
          } else {
            self.responseText = self._realxhr.responseText;
          }
        } else {
          self.responseText = '';
        }
        deliverFinalRsc(event);
      } else {
        if (self._realxhr.readyState == 1 && self.readyState == 1) {
          // Delayed open+send just happened. We already delivered an event
          // for this, so drop this event.
          return;
        } else if (self._realxhr.readyState >= 3 && supportsResponseText) {
          if (self._responseTextChangers.length) {
            // If we're going to transform the final response, then we don't
            // want to expose any partial untransformed responses and we don't
            // want to bother trying to transform partial responses. Only show
            // an empty string as the loaded response until the connection is
            // done.
            self.responseText = '';
          } else {
            self.responseText = self._realxhr.responseText;
          }
        } else {
          self.responseText = '';
        }
        self.readyState = self._realxhr.readyState;
        runRscListeners(event);
      }
    }, false);
    ['dispatchEvent', 'getAllResponseHeaders', 'getResponseHeader', 'overrideMimeType', 'responseType', 'responseXML', 'responseURL', 'status', 'statusText', 'timeout', 'ontimeout', 'onloadstart', 'onprogress', 'onabort', 'upload', 'withCredentials'].forEach(function (prop) {
      Object.defineProperty(self, prop, {
        enumerable: true,
        configurable: false,
        get: function () {
          // If we give the original native methods directly, they'll be called
          // with `this` as the XHRProxy object, which they aren't made for.
          if (typeof self._realxhr[prop] == 'function') {
            return self._realxhr[prop].bind(self._realxhr);
          }
          return self._realxhr[prop];
        },
        set: function (v) {
          if (typeof v == 'function') {
            v = wrapEventListener(this._realxhr, this, v);
          }
          self._realxhr[prop] = v;
        }
      });
    });
    Object.defineProperty(self, 'response', {
      enumerable: true,
      configurable: false,
      get: function () {
        if (!this._realxhr.responseType || this._realxhr.responseType == 'text') {
          return this.responseText;
        } else {
          // We're not trying to transform non-text responses currently.
          return this._realxhr.response;
        }
      }
    });
    self.readyState = self._realxhr.readyState;
  }
  XHRProxy.prototype.abort = function () {
    // Important: If the request has already been sent, the XHR will change
    // its readyState to 4 after abort. However, we sometimes asynchronously
    // delay send calls. If the application has already called send but we
    // haven't sent off the real call yet, then we need to hurry up and send
    // something before the abort so that the readyState change happens.
    if (this._clientStartedSend && !this._realStartedSend) {
      if (this.readyState != 0 && this._realxhr.readyState == 0) {
        this._realxhr.open(this._connection.method, this._connection.url);
      }
      this._realStartedSend = true;
      this._realxhr.send();
    }
    this._realxhr.abort();
  };
  XHRProxy.prototype.setRequestHeader = function (name, value) {
    var self = this;
    if (this.readyState != 1) {
      console.warn('setRequestHeader improperly called at readyState ' + this.readyState);
    }
    if (!this._openState) {
      throw new Error('Can only set headers after open and before send');
    }
    this._connection.headers[name] = value;
    if (this._connection.async && this._requestChangers.length) {
      this._events.once('realOpen', function () {
        self._realxhr.setRequestHeader(name, value);
      });
    } else {
      this._realxhr.setRequestHeader(name, value);
    }
  };
  XHRProxy.prototype.addEventListener = function (name, listener) {
    if (!this._listeners[name]) {
      this._listeners[name] = [];
      this._boundListeners[name] = [];
    }
    if (!lodash_includes__WEBPACK_IMPORTED_MODULE_4___default()(this._listeners[name], listener)) {
      var boundListener = wrapEventListener(this._realxhr, this, listener);
      this._listeners[name].push(listener);
      this._boundListeners[name].push(boundListener);
      if (!lodash_includes__WEBPACK_IMPORTED_MODULE_4___default()(['readystatechange', 'load', 'error', 'loadend'], name)) {
        // certain listeners are called manually so that the final
        // call (when readyState==4) can be delayed.
        this._realxhr.addEventListener(name, boundListener, false);
      }
    }
  };
  XHRProxy.prototype.removeEventListener = function (name, listener) {
    if (!this._listeners[name]) {
      return;
    }
    var i = this._listeners[name].indexOf(listener);
    if (i == -1) {
      return;
    }
    this._listeners[name].splice(i, 1);
    var boundListener = this._boundListeners[name].splice(i, 1)[0];
    if (name != 'readystatechange') {
      this._realxhr.removeEventListener(name, boundListener, false);
    }
  };
  XHRProxy.prototype.open = function (method, url, async) {
    // Work around MailTrack issue
    if (!(this instanceof XHRProxy)) {
      return XHR.prototype.open.apply(this, arguments);
    }
    var self = this;
    this._connection = {
      method: method,
      url: url,
      params: (0,querystring__WEBPACK_IMPORTED_MODULE_8__.parse)(url.split('?')[1] || ''),
      headers: {},
      async: arguments.length < 3 || !!async
    };
    this._clientStartedSend = false;
    this._realStartedSend = false;
    this._activeWrappers = findApplicableWrappers(this._wrappers, this._connection);
    this._responseTextChangers = this._activeWrappers.map(wrapper => {
      return wrapper.responseTextChanger && wrapper.responseTextChanger.bind(wrapper);
    }).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_9__["default"]);
    this.responseText = '';
    this._openState = true;
    function finish(method, url) {
      return self._realxhr.open(method, url, self._connection.async);
    }
    if (this._connection.async) {
      this._requestChangers = this._activeWrappers.map(wrapper => {
        return wrapper.requestChanger && wrapper.requestChanger.bind(wrapper);
      }).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_9__["default"]);
      if (this._requestChangers.length) {
        if (this.readyState != 1) {
          this.readyState = 1;
          this._fakeRscEvent();
        }
      } else {
        finish(method, url);
      }
    } else {
      finish(method, url);
    }
  };
  XHRProxy.prototype.send = function (body) {
    var self = this;
    this._clientStartedSend = true;
    this._openState = false;
    Object.defineProperty(this._connection, 'originalSendBody', {
      enumerable: true,
      writable: false,
      configurable: false,
      value: body
    });
    this._connection.responseType = this._realxhr.responseType || 'text';
    lodash_each__WEBPACK_IMPORTED_MODULE_2___default()(self._activeWrappers, function (wrapper) {
      if (wrapper.originalSendBodyLogger) {
        try {
          wrapper.originalSendBodyLogger(self._connection, body);
        } catch (e) {
          logError(e);
        }
      }
    });
    function finish(body) {
      self._realStartedSend = true;
      self._realxhr.send(body);
    }
    if (this._connection.async && this._requestChangers.length) {
      // If the XHR object is re-used for another connection, then we need
      // to make sure that our upcoming async calls here do nothing.
      // Remember the current connection object, and do nothing in our async
      // calls if it no longer matches. Also check for aborts.
      const startConnection = this._connection;
      const request = {
        method: this._connection.method,
        url: this._connection.url,
        body: body
      };
      (async () => {
        let modifiedRequest = request;
        for (const requestChanger of this._requestChangers) {
          const longRunWarningTimer = setTimeout(() => {
            console.warn('requestChanger is taking too long', requestChanger, startConnection);
          }, WARNING_TIMEOUT);
          try {
            modifiedRequest = await requestChanger(this._connection, Object.freeze(modifiedRequest));
          } finally {
            clearTimeout(longRunWarningTimer);
          }
          (0,_common_assert__WEBPACK_IMPORTED_MODULE_6__.assert)(lodash_has__WEBPACK_IMPORTED_MODULE_0___default()(modifiedRequest, 'method'), 'modifiedRequest has method');
          (0,_common_assert__WEBPACK_IMPORTED_MODULE_6__.assert)(lodash_has__WEBPACK_IMPORTED_MODULE_0___default()(modifiedRequest, 'url'), 'modifiedRequest has url');
          (0,_common_assert__WEBPACK_IMPORTED_MODULE_6__.assert)(lodash_has__WEBPACK_IMPORTED_MODULE_0___default()(modifiedRequest, 'body'), 'modifiedRequest has body');
          if (startConnection !== this._connection || this._realStartedSend) break;
        }
        return modifiedRequest;
      })().catch(err => {
        logError(err);
        return request;
      }).then(modifiedRequest => {
        if (startConnection === this._connection && !this._realStartedSend) {
          this._realxhr.open(modifiedRequest.method, modifiedRequest.url);
          this._events.emit('realOpen');
          finish(modifiedRequest.body);
        }
      });
    } else {
      finish(body);
    }
  };
  [XHRProxy, XHRProxy.prototype].forEach(function (obj) {
    Object.assign(obj, {
      UNSENT: 0,
      OPENED: 1,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      DONE: 4
    });
  });
  return XHRProxy;
}

/***/ }),

/***/ "./src/platform-implementation-js/dom-driver/gmail/gmail-driver/getSyncThreadFromSyncThreadId.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/platform-implementation-js/dom-driver/gmail/gmail-driver/getSyncThreadFromSyncThreadId.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getThreadFromSyncThreadId),
/* harmony export */   getThreadFromSyncThreadIdUsingHeaders: () => (/* binding */ getThreadFromSyncThreadIdUsingHeaders)
/* harmony export */ });
/* harmony import */ var _driver_common_gmailAjax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../driver-common/gmailAjax */ "./src/platform-implementation-js/driver-common/gmailAjax.ts");
/* harmony import */ var _gmail_sync_response_processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gmail-sync-response-processor */ "./src/platform-implementation-js/dom-driver/gmail/gmail-sync-response-processor.ts");
/* harmony import */ var _driver_common_getAccountUrlPart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../driver-common/getAccountUrlPart */ "./src/platform-implementation-js/driver-common/getAccountUrlPart.ts");



async function getThreadFromSyncThreadId(driver, syncThreadId) {
  const [btaiHeader, xsrfToken] = await Promise.all([driver.getPageCommunicator().getBtaiHeader(), driver.getPageCommunicator().getXsrfToken()]);
  return getThreadFromSyncThreadIdUsingHeaders(syncThreadId, btaiHeader, xsrfToken);
}
async function getThreadFromSyncThreadIdUsingHeaders(syncThreadId, btaiHeader, xsrfToken) {
  let responseText = null;
  try {
    const {
      text
    } = await (0,_driver_common_gmailAjax__WEBPACK_IMPORTED_MODULE_0__["default"])({
      method: 'POST',
      url: `https://mail.google.com/sync${(0,_driver_common_getAccountUrlPart__WEBPACK_IMPORTED_MODULE_2__["default"])()}/i/fd`,
      headers: {
        'Content-Type': 'application/json',
        'X-Framework-Xsrf-Token': xsrfToken,
        'X-Gmail-BTAI': btaiHeader,
        'X-Google-BTD': '1'
      },
      data: JSON.stringify({
        '1': [{
          '1': syncThreadId,
          '2': 1
        }]
      })
    });
    responseText = text;
  } catch (err) {
    // try sending request with new format 2022_09_09
    const {
      text
    } = await (0,_driver_common_gmailAjax__WEBPACK_IMPORTED_MODULE_0__["default"])({
      method: 'POST',
      url: `https://mail.google.com/sync${(0,_driver_common_getAccountUrlPart__WEBPACK_IMPORTED_MODULE_2__["default"])()}/i/fd?rt=r&pt=ji`,
      headers: {
        'Content-Type': 'application/json',
        'X-Framework-Xsrf-Token': xsrfToken,
        'X-Gmail-BTAI': btaiHeader,
        'X-Google-BTD': '1'
      },
      data: JSON.stringify([[[syncThreadId, 1]], 2])
    });
    responseText = text;
  }
  const threadDescriptors = (0,_gmail_sync_response_processor__WEBPACK_IMPORTED_MODULE_1__.extractThreadsFromThreadResponse)(responseText);
  if (threadDescriptors.length > 0) {
    const thread = threadDescriptors[0];
    if (thread.oldGmailThreadID) {
      return thread;
    }
  }
  return null;
}

/***/ }),

/***/ "./src/platform-implementation-js/dom-driver/gmail/gmail-response-processor.ts":
/*!*************************************************************************************!*\
  !*** ./src/platform-implementation-js/dom-driver/gmail/gmail-response-processor.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanupPeopleLine: () => (/* binding */ cleanupPeopleLine),
/* harmony export */   deserialize: () => (/* binding */ deserialize),
/* harmony export */   deserializeArray: () => (/* binding */ deserializeArray),
/* harmony export */   extractGmailThreadIdFromMessageIdSearch: () => (/* binding */ extractGmailThreadIdFromMessageIdSearch),
/* harmony export */   extractMessageIdsFromThreadBatchRequest: () => (/* binding */ extractMessageIdsFromThreadBatchRequest),
/* harmony export */   extractMessages: () => (/* binding */ extractMessages),
/* harmony export */   extractThreads: () => (/* binding */ extractThreads),
/* harmony export */   extractThreadsFromDeserialized: () => (/* binding */ extractThreadsFromDeserialized),
/* harmony export */   readDraftId: () => (/* binding */ readDraftId),
/* harmony export */   replaceThreadsInResponse: () => (/* binding */ replaceThreadsInResponse),
/* harmony export */   rewriteSingleQuotes: () => (/* binding */ rewriteSingleQuotes),
/* harmony export */   serialize: () => (/* binding */ serialize)
/* harmony export */ });
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/flatten */ "./node_modules/lodash/flatten.js");
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_last__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/last */ "./node_modules/lodash/last.js");
/* harmony import */ var lodash_last__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_last__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var transducers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! transducers.js */ "./node_modules/transducers.js/transducers.js");
/* harmony import */ var transducers_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(transducers_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var map_indexed_xf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! map-indexed-xf */ "./node_modules/map-indexed-xf/js/index.js");
/* harmony import */ var map_indexed_xf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(map_indexed_xf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_html_to_text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/html-to-text */ "./src/common/html-to-text.ts");
/* harmony import */ var _common_assert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/assert */ "./src/common/assert.ts");






function extractGmailThreadIdFromMessageIdSearch(responseString) {
  const threadResponseArray = deserialize(responseString).value;
  const threadIdArrayMarker = 'cs';
  const threadIdArray = _searchArray(threadResponseArray, threadIdArrayMarker, markerArray => markerArray[0] === 'cs' && markerArray.length > 20);
  if (!threadIdArray) {
    return null;
  }
  return threadIdArray[1];
}
function rewriteSingleQuotes(s) {
  // The input string contains unquoted, double-quoted, and single-quoted
  // parts. Parse the string for these parts, and transform the single-
  // quoted part into a double-quoted part by swapping the quotes, and
  // escaping any double-quotes inside of it with backslashes.

  // i is our position in the input string. result is our result string that
  // we'll copy the parts of the input to as we interpret them.
  let i = 0;
  const resultParts = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Find the position of the next singly or doubly quoted part.
    // `i` is increasing monotonically every round of this loop, and the loop
    // ends as soon as no matches are found after the `i`th position in the
    // string, so this while loop can't be infinite.
    const nextQuoteIndex = findNextQuote(s, i);
    if (nextQuoteIndex < 0) {
      resultParts.push(s.substr(i));
      break;
    }
    // Copy the unquoted part preceding the quoted section we found into the
    // result, and put a double-quote into the result to begin the quoted
    // section we found.
    resultParts.push(s.substr(i, nextQuoteIndex - i));
    resultParts.push('"');
    i = nextQuoteIndex + 1;
    if (s[nextQuoteIndex] === '"') {
      // Find the next quotation mark not preceded by a backslash.
      const nextDoubleQuoteIndex = findNextUnescapedCharacter(s, i, '"');
      if (nextDoubleQuoteIndex < 0) {
        throw new Error('Unclosed double quote');
      }
      // Add that entire double-quoted part to the result.
      resultParts.push(s.slice(i, nextDoubleQuoteIndex + 1));
      i = nextDoubleQuoteIndex + 1;
    } else {
      // Same logic as above, but for a single-quoted part.
      const nextSingleQuoteIndex = findNextUnescapedCharacter(s, i, "'");
      if (nextSingleQuoteIndex < 0) {
        throw new Error('Unclosed single quote');
      }
      // Escape all double-quotes inside the part, un-escape all single-quotes
      // inside the part, and then write it out into the result with the ending
      // single-quote replaced with a double-quote.
      const part = s.slice(i, nextSingleQuoteIndex).replace(/"/g, '\\"').replace(/\\'/g, "'");
      resultParts.push(part);
      resultParts.push('"');
      i = nextSingleQuoteIndex + 1;
    }
  }
  return resultParts.join('');
}
function findNextQuote(s, start) {
  for (let i = start, len = s.length; i < len; i++) {
    if (s[i] === '"' || s[i] === "'") {
      return i;
    }
  }
  return -1;
}
function findNextUnescapedCharacter(s, start, char) {
  for (let i = start, len = s.length; i < len; i++) {
    if (s[i] === '\\') {
      i++;
    } else if (s[i] === char) {
      return i;
    }
  }
  return -1;
}
function deserialize(threadResponseString) {
  const options = {
    includeLengths: false,
    suggestionMode: /^5\n/.test(threadResponseString),
    noArrayNewLines: !/^[,\]]/m.test(threadResponseString),
    includeExplicitNulls: true
  };
  const value = [];
  let pos;
  if (options.suggestionMode) {
    pos = threadResponseString.indexOf("'\n");
    if (pos === -1) {
      throw new Error('Message was missing beginning header');
    }
    pos += 2;
  } else {
    pos = threadResponseString.indexOf('\n\n');
    if (pos === -1) {
      throw new Error('Message was missing beginning newlines');
    }
    pos += 2;
  }
  while (pos < threadResponseString.length) {
    let lineEnd = threadResponseString.indexOf('\n', pos + 1);
    if (lineEnd === -1) {
      lineEnd = threadResponseString.length;
    } else if (threadResponseString[lineEnd - 1] === '\r') {
      // seriously Gmail is crazy. The chunk length only sometimes includes the
      // newline after the chunk length.
      lineEnd += 1;
    }
    const line = threadResponseString.slice(pos, lineEnd);
    let dataLine;
    if (/^\d+\s*$/.test(line)) {
      options.includeLengths = true;
      const length = +line;
      dataLine = threadResponseString.slice(lineEnd, lineEnd + length);
      pos = lineEnd + length;
    } else {
      dataLine = threadResponseString.slice(pos);
      pos = threadResponseString.length;
    }
    value.push(deserializeArray(dataLine));
  }
  return {
    value,
    options
  };
}
function transformUnquotedSections(str, cb) {
  const parts = [];
  let nextQuote;
  let position = 0;
  let inString = false;
  while ((nextQuote = findNextUnescapedCharacter(str, position, '"')) !== -1) {
    if (inString) {
      parts.push(str.slice(position, nextQuote + 1));
    } else {
      parts.push(cb(str.slice(position, nextQuote + 1)));
    }
    position = nextQuote + 1;
    inString = !inString;
  }
  if (inString) {
    throw new Error('string ended inside quoted section');
  }
  parts.push(cb(str.slice(position)));
  return parts.join('');
}
function deserializeArray(value) {
  value = value.replace(/[\r\n\t]/g, '');

  // Change all the singly quoted parts to use double-quotes so that the
  // data can be JSON-decoded instead of eval'd. (Also necessary for the
  // next step.)
  value = rewriteSingleQuotes(value);

  // Fix some things with the data. (It's in a weird minified JSON-like
  // format). Make sure we don't modify any data inside of strings!
  value = transformUnquotedSections(value, match => match.replace(/,\s*(?=,|\])/g, ',null') // fix implied nulls
  .replace(/\[\s*(?=,)/g, '[null') // "
  );

  try {
    return JSON.parse(value, (k, v) => v == null ? undefined : v);
  } catch (err) {
    throw new Error('deserialization error');
  }
}
function serialize(value, options) {
  if (options.suggestionMode) {
    (0,_common_assert__WEBPACK_IMPORTED_MODULE_4__.assert)(options.includeLengths);
    return suggestionSerialize(value, options.includeExplicitNulls);
  }
  return threadListSerialize(value, options);
}
function threadListSerialize(threadResponseArray, options) {
  const {
    includeLengths,
    noArrayNewLines,
    includeExplicitNulls
  } = options;
  let response = ")]}'\n" + (noArrayNewLines && includeLengths ? '' : '\n');
  for (let ii = 0; ii < threadResponseArray.length; ii++) {
    const arraySection = threadResponseArray[ii];
    const arraySectionString = serializeArray(arraySection, noArrayNewLines, includeExplicitNulls);
    if (!includeLengths) {
      response += arraySectionString;
    } else {
      const length = arraySectionString.length + (noArrayNewLines ? 2 : 1);
      response += (noArrayNewLines ? '\n' : '') + length + '\n' + arraySectionString;
    }
  }
  if (!includeLengths) {
    if (!noArrayNewLines) {
      const lines = response.split(/\r|\n/);
      const firstLines = lines.slice(0, -3);
      const lastLines = lines.slice(-3);
      response = firstLines.join('\n');
      response += '\n' + lastLines[0] + lastLines[1].replace(/"/g, "'");
    } else {
      // A 16-digit hexadecimal string is often at the end, but sometimes it
      // has fewer digits.
      response = response.replace(/"([0-9a-f]{8,16})"\]$/, "'$1']");
    }
  }
  return response + (noArrayNewLines && includeLengths ? '\n' : '');
}
function suggestionSerialize(suggestionsArray, includeExplicitNulls) {
  let response = "5\n)]}'\n";
  for (let ii = 0; ii < suggestionsArray.length; ii++) {
    const arraySection = suggestionsArray[ii];
    const arraySectionString = serializeArray(arraySection, false, includeExplicitNulls);
    const length = arraySectionString.length;
    response += length + '\r\n' + arraySectionString;
  }
  return response;
}
function serializeArray(array, noArrayNewLines, includeExplicitNulls) {
  let response = '[';
  for (let ii = 0; ii < array.length; ii++) {
    const item = array[ii];
    let addition;
    if (Array.isArray(item)) {
      addition = serializeArray(item, noArrayNewLines, includeExplicitNulls);
    } else if (item == null) {
      addition = includeExplicitNulls ? 'null' : '';
    } else {
      addition = JSON.stringify(item).replace(/</gim, '\\u003c').replace(/=/gim, '\\u003d').replace(/>/gim, '\\u003e').replace(/&/gim, '\\u0026');
    }
    if (ii > 0) {
      response += ',';
    }
    response += addition;
  }
  response += ']' + (noArrayNewLines ? '' : '\n');
  return response;
}
function readDraftId(response, messageID) {
  const decoded = deserialize(response).value;
  const msgA = transducers_js__WEBPACK_IMPORTED_MODULE_2___default().toArray(decoded, transducers_js__WEBPACK_IMPORTED_MODULE_2___default().compose((transducers_js__WEBPACK_IMPORTED_MODULE_2___default().cat), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().filter(Array.isArray), (transducers_js__WEBPACK_IMPORTED_MODULE_2___default().cat), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().filter(x => x[0] === 'ms' && x[1] === messageID), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().take(1), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().map(x => x[60])))[0];
  if (msgA) {
    const match = msgA.match(/^msg-[^:]:(\S+)$/i);
    return match && match[1];
  }
  return null;
}
function replaceThreadsInResponse(response, replacementThreads, _ref) {
  let {
    start,
    total
  } = _ref;
  const {
    value,
    options
  } = deserialize(response);
  const actionResponseMode = value.length === 1 && value[0].length === 2 && typeof value[0][1] === 'string';
  const threadValue = actionResponseMode ? value[0][0].map(x => [x]) : value;

  /*
  threadValue looks like this:
  [
  [ // group
    ["blah", ...], // item
    ["blah", ...]  // item
  ],
  [ // group
    ["blah", ...],
    ["tb", [...]],
    ["tb", [...]]
  ],
  [
    ["tb", [...]],
    ["blah", ...]
  ],
  [
    ["blah", ...],
    ["blah", ...]
  ],
  ]
  threadValue is an array of groups. Each group is an array of items. An item is
  an array which has an identifier string as its first item. Each "tb" item
  contains an array of up to 10 threads. All of the "tb" items will be sequential
  but may overflow to other groups.
  We want to replace all of the "tb" items, while trying to stick close to the
  original structure. We prepare by creating an array of groups that come before
  any groups containing a "tb" item, an array of groups that come after any
  groups containing a "tb" item, an array of items that come before any "tb"
  items in the first "tb" group, and an array of items that come after any "tb"
  items in the last "tb" group. Then we generate the new "tb" items, and splice
  it all back together.
  */

  const preTbGroups = [];
  const postTbGroups = [];
  let preTbItems = [];
  let postTbItems = [];
  let hasSeenTb = false;
  threadValue.forEach(group => {
    let tbSeenInThisGroup = false;
    const preTbGroup = [];
    const postTbGroup = [];
    group.forEach(item => {
      if (total && item[0] === 'ti') {
        if (typeof total === 'number') {
          // does not switch out of 'many'-total mode (we currently never need this).
          item[2] = item[10] = total;
        } else if (total === 'MANY') {
          // large total to ensure it is always larger than the actual
          // number of threads.
          item[2] = item[10] = 100 * 1000;
          // flip response from number-total mode into 'many'-total mode.
          item[3] = 1;
          const query = item[5];
          if (item[6]) {
            item[6][0] = [query, 1];
          } else {
            console.error('replaceThreadsInResponse(): Missing item[6]');
          }
        }
      }
      if (item[0] === 'tb') {
        hasSeenTb = tbSeenInThisGroup = true;
        if (preTbGroup.length) {
          preTbItems = preTbGroup;
        }
        postTbItems = postTbGroup;
      } else if (!hasSeenTb) {
        preTbGroup.push(item);
      } else {
        postTbGroup.push(item);
      }
    });
    if (!tbSeenInThisGroup) {
      if (!hasSeenTb) {
        preTbGroups.push(preTbGroup);
      } else {
        postTbGroups.push(postTbGroup);
      }
    }
  });
  const newTbs = _threadsToTbGroups(replacementThreads, start);
  if (preTbItems.length) {
    newTbs[0] = preTbItems.concat(newTbs[0] || []);
  }
  if (postTbItems.length) {
    if (newTbs.length) {
      newTbs[newTbs.length - 1] = newTbs[newTbs.length - 1].concat(postTbItems);
    } else {
      newTbs.push(postTbItems);
    }
  }
  const parsedNew = lodash_flatten__WEBPACK_IMPORTED_MODULE_0___default()([preTbGroups, newTbs, postTbGroups]);
  const allSections = lodash_flatten__WEBPACK_IMPORTED_MODULE_0___default()(parsedNew);
  const endSection = lodash_last__WEBPACK_IMPORTED_MODULE_1___default()(allSections);
  if (endSection[0] !== 'e') {
    throw new Error('Failed to find end section');
  }
  endSection[1] = allSections.length;
  const fullNew = actionResponseMode ? [[lodash_flatten__WEBPACK_IMPORTED_MODULE_0___default()(parsedNew), value[0][1]]] : parsedNew;
  return serialize(fullNew, options);
}
function extractThreads(response) {
  return extractThreadsFromDeserialized(deserialize(response).value);
}
function extractThreadsFromDeserialized(value) {
  if (value.length === 1 && value[0].length === 2 && typeof value[0][1] === 'string') {
    value = [value[0][0]];
  }
  return _extractThreadArraysFromResponseArray(value).map(thread => Object.freeze(Object.defineProperty({
    subject: (0,_common_html_to_text__WEBPACK_IMPORTED_MODULE_3__["default"])(thread[9]),
    shortDate: (0,_common_html_to_text__WEBPACK_IMPORTED_MODULE_3__["default"])(thread[14]),
    timeString: (0,_common_html_to_text__WEBPACK_IMPORTED_MODULE_3__["default"])(thread[15]),
    peopleHtml: cleanupPeopleLine(thread[7]),
    timestamp: thread[16] / 1000,
    isUnread: thread[9].indexOf('<b>') > -1,
    lastEmailAddress: thread[28],
    bodyPreviewHtml: thread[10],
    someGmailMessageIds: [thread[1], thread[2]],
    gmailThreadId: thread[0]
  }, '_originalGmailFormat', {
    value: thread
  })));
}
const _extractMessageIdsFromThreadBatchRequestXf = transducers_js__WEBPACK_IMPORTED_MODULE_2___default().compose((transducers_js__WEBPACK_IMPORTED_MODULE_2___default().cat), (transducers_js__WEBPACK_IMPORTED_MODULE_2___default().cat), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().filter(item => item[0] === 'cs'), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().map(item => [item[1], item[2]]));
function extractMessageIdsFromThreadBatchRequest(response) {
  const {
    value
  } = deserialize(response);
  return transducers_js__WEBPACK_IMPORTED_MODULE_2___default().toObj(value, _extractMessageIdsFromThreadBatchRequestXf);
}
function cleanupPeopleLine(peopleHtml) {
  // Removes possible headings like "To: " that get added on the Sent page, and
  // removes a class that's specific to the current preview pane setting.
  return peopleHtml.replace(/^[^<]*/, '').replace(/(<span[^>]*) class="[^"]*"/g, '$1');
}
const _extractThreadArraysFromResponseArrayXf = transducers_js__WEBPACK_IMPORTED_MODULE_2___default().compose((transducers_js__WEBPACK_IMPORTED_MODULE_2___default().cat), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().filter(item => item[0] === 'tb'), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().map(item => item[2]), (transducers_js__WEBPACK_IMPORTED_MODULE_2___default().cat));
function _extractThreadArraysFromResponseArray(threadResponseArray) {
  return transducers_js__WEBPACK_IMPORTED_MODULE_2___default().toArray(threadResponseArray, _extractThreadArraysFromResponseArrayXf);
}
const _extractThreadsFromConversationViewResponseArrayXf = transducers_js__WEBPACK_IMPORTED_MODULE_2___default().compose((transducers_js__WEBPACK_IMPORTED_MODULE_2___default().cat), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().filter(item => item[0] === 'cs'), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().map(item => ({
  threadID: item[1],
  messageIDs: item[8]
})));
const _extractMessagesFromResponseArrayXf = transducers_js__WEBPACK_IMPORTED_MODULE_2___default().compose((transducers_js__WEBPACK_IMPORTED_MODULE_2___default().cat), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().filter(item => item[0] === 'ms'), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().map(item => ({
  messageID: item[1],
  date: item[7]
})));
function extractMessages(response) {
  // regular view=cv requests have a top level array length of 1
  // whereas view=cv requests when you refresh Gmail while looking at a thread
  // have a top level array with more elements
  let {
    value
  } = deserialize(response);
  if (value.length === 1) value = value[0];
  const threads = transducers_js__WEBPACK_IMPORTED_MODULE_2___default().toArray(value, _extractThreadsFromConversationViewResponseArrayXf);
  const messages = transducers_js__WEBPACK_IMPORTED_MODULE_2___default().toArray(value, _extractMessagesFromResponseArrayXf);
  const messageMap = {};
  messages.forEach(message => {
    messageMap[message.messageID] = message;
  });
  return threads.map(_ref2 => {
    let {
      threadID,
      messageIDs
    } = _ref2;
    return {
      threadID,
      messages: messageIDs.map(messageID => messageMap[messageID])
    };
  });
}
function _threadsToTbGroups(threads, start) {
  const _threadsToTbGroupsXf = transducers_js__WEBPACK_IMPORTED_MODULE_2___default().compose(transducers_js__WEBPACK_IMPORTED_MODULE_2___default().map(thread => thread._originalGmailFormat), transducers_js__WEBPACK_IMPORTED_MODULE_2___default().partition(10), map_indexed_xf__WEBPACK_IMPORTED_MODULE_5___default()((threadsChunk, i) => [['tb', start + i * 10, threadsChunk]]));
  return transducers_js__WEBPACK_IMPORTED_MODULE_2___default().toArray(threads, _threadsToTbGroupsXf);
}
function _searchArray(responseArray, marker, markerArrayValidator) {
  const pathArray = _searchObject(responseArray, marker, 100);
  for (let ii = 0; ii < pathArray.length; ii++) {
    const pathToMarkerArray = pathArray[ii].path.slice(0, -1);
    const markerArray = _getArrayValueFromPath(responseArray, pathToMarkerArray);
    if (markerArrayValidator(markerArray)) {
      return markerArray;
    }
  }
}
function _searchObject(element, query, maxDepth) {
  const retVal = [];
  const initialNode = {
    el: element,
    path: []
  };
  const nodeList = [initialNode];
  while (nodeList.length > 0) {
    const node = nodeList.pop();
    if (node.path.length <= maxDepth) {
      if (node.el !== null && typeof node.el === 'object') {
        const keys = Object.keys(node.el);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const newNode = {
            el: node.el[key],
            path: node.path.concat([key])
          };
          nodeList.push(newNode);
        }
      } else {
        if (node.el === query) {
          retVal.push(node);
        }
      }
    }
  }
  return retVal;
}
function _getArrayValueFromPath(responseArray, path) {
  let currentArray = responseArray;
  for (let ii = 0; ii < path.length; ii++) {
    currentArray = currentArray[path[ii]];
  }
  return currentArray;
}

/***/ }),

/***/ "./src/platform-implementation-js/dom-driver/gmail/gmail-sync-response-processor.ts":
/*!******************************************************************************************!*\
  !*** ./src/platform-implementation-js/dom-driver/gmail/gmail-sync-response-processor.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractThreadsFromSearchResponse: () => (/* binding */ extractThreadsFromSearchResponse),
/* harmony export */   extractThreadsFromSearchResponse_20220909: () => (/* binding */ extractThreadsFromSearchResponse_20220909),
/* harmony export */   extractThreadsFromThreadResponse: () => (/* binding */ extractThreadsFromThreadResponse),
/* harmony export */   replaceThreadsInSearchResponse: () => (/* binding */ replaceThreadsInSearchResponse),
/* harmony export */   replaceThreadsInSearchResponse_20220909: () => (/* binding */ replaceThreadsInSearchResponse_20220909)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_isNotNil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/isNotNil */ "./src/common/isNotNil.ts");


function extractThreadsFromSearchResponse(response) {
  const parsedResponse = JSON.parse(response);
  if (Array.isArray(parsedResponse)) {
    try {
      return extractThreadsFromSearchResponse_20220909(parsedResponse);
    } catch (err) {
      return [];
    }
  }
  const threadDescriptors = parsedResponse && parsedResponse[3];
  if (!threadDescriptors) return [];
  return threadDescriptors.map((descriptorWrapper, index) => {
    const descriptor = descriptorWrapper[1];
    if (!descriptor) return null;
    return {
      subject: descriptor[1],
      snippet: descriptor[2],
      syncThreadID: descriptor[4],
      // It seems Gmail is A/B testing including gmailThreadID in descriptor[20] and not including
      // the encoded version of it in descriptor[18], so pull it from [20] if [18] is not set.
      oldGmailThreadID: descriptor[18] != null ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(descriptor[18]).toString(16) : descriptor[20],
      rawResponse: descriptorWrapper,
      extraMetaData: {
        snippet: parsedResponse[15] && parsedResponse[15][1] && parsedResponse[15][1][index] || '',
        syncMessageData: descriptor[5].map(md => ({
          syncMessageID: md[1],
          oldMessageID: md[56],
          date: +md[7]
        }))
      }
    };
  }).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_1__["default"]);
}
function extractThreadsFromSearchResponse_20220909(parsedResponse) {
  const threadDescriptors = parsedResponse && parsedResponse[2];
  if (!threadDescriptors) return [];
  return threadDescriptors.map((descriptorWrapper, index) => {
    const descriptor = descriptorWrapper[0];
    if (!descriptor) return null;
    return {
      subject: descriptor[0],
      snippet: descriptor[1],
      syncThreadID: descriptor[3],
      // It seems Gmail is A/B testing including gmailThreadID in descriptor[20] and not including
      // the encoded version of it in descriptor[18], so pull it from [20] if [18] is not set.
      oldGmailThreadID: descriptor[17] != null ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(descriptor[17]).toString(16) : descriptor[19],
      rawResponse: descriptorWrapper,
      extraMetaData: {
        snippet: parsedResponse[14] && parsedResponse[14][0] && parsedResponse[14][0][index] || '',
        syncMessageData: descriptor[4].map(md => ({
          syncMessageID: md[0],
          oldMessageID: md[55],
          date: +md[6]
        }))
      }
    };
  }).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_1__["default"]);
}
function extractThreadsFromThreadResponse(response) {
  const parsedResponse = JSON.parse(response);
  if (Array.isArray(parsedResponse)) {
    return extractThreadsFromThreadResponse_20220909(parsedResponse);
  }
  const threadDescriptors = parsedResponse && parsedResponse[2];
  if (!threadDescriptors) throw new Error('Failed to process thread response');
  return threadDescriptors.map(descriptorWrapper => {
    if (typeof descriptorWrapper[1] === 'string' && Array.isArray(descriptorWrapper[3]) && !(descriptorWrapper[2] && descriptorWrapper[2][1] && descriptorWrapper[2][1][14] && Array.isArray(descriptorWrapper[2][2]))) {
      return {
        syncThreadID: descriptorWrapper[1],
        oldGmailThreadID: descriptorWrapper[2] && descriptorWrapper[2][1] && descriptorWrapper[2][1][16] || undefined,
        extraMetaData: {
          snippet: descriptorWrapper[2] && descriptorWrapper[2][1] && descriptorWrapper[2][1][3] || undefined,
          syncMessageData: (descriptorWrapper[3] || []).filter(md => Boolean(md[2])).map(md => ({
            syncMessageID: md[1],
            date: +md[2][17],
            recipients: getRecipientsFromMessageDescriptor(md)
          }))
        }
      };
    } else {
      const threadDescriptor = descriptorWrapper[2] && descriptorWrapper[2][1];
      if (!threadDescriptor) return null;
      let syncMessageData;
      const fullMessageDescriptors = Array.isArray(descriptorWrapper[3]) && descriptorWrapper[3];
      if (fullMessageDescriptors) {
        syncMessageData = fullMessageDescriptors.map(md => ({
          syncMessageID: md[1],
          date: +md[2][17],
          recipients: getRecipientsFromMessageDescriptor(md)
        }));
      } else {
        const messageDescriptors = descriptorWrapper[2] && descriptorWrapper[2][2];
        syncMessageData = messageDescriptors.map(md => ({
          syncMessageId: md[1],
          date: +md[16]
        }));
      }
      return {
        subject: threadDescriptor[2],
        snippet: threadDescriptor[3],
        syncThreadID: threadDescriptor[1],
        oldGmailThreadID: new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(threadDescriptor[14]).toString(16),
        rawResponse: descriptorWrapper,
        extraMetaData: {
          syncMessageData,
          snippet: ''
        }
      };
    }
  }).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_1__["default"]);
}
function extractThreadsFromThreadResponse_20220909(parsedResponse) {
  const threadDescriptors = parsedResponse && parsedResponse[1];
  if (!threadDescriptors) throw new Error('Failed to process thread response');
  return threadDescriptors.map(descriptorWrapper => {
    if (typeof descriptorWrapper[0] === 'string' && Array.isArray(descriptorWrapper[2]) && !(descriptorWrapper[1] && descriptorWrapper[1][0] && descriptorWrapper[1][0][13] && Array.isArray(descriptorWrapper[1][1]))) {
      return {
        syncThreadID: descriptorWrapper[0],
        oldGmailThreadID: descriptorWrapper[1] && descriptorWrapper[1][0] && descriptorWrapper[1][0][15] || undefined,
        extraMetaData: {
          snippet: descriptorWrapper[1] && descriptorWrapper[1][0] && descriptorWrapper[1][0][2] || undefined,
          syncMessageData: (descriptorWrapper[2] || []).filter(md => Boolean(md[1])).map(md => ({
            syncMessageID: md[0],
            date: +md[1][16],
            recipients: getRecipientsFromMessageDescriptor_20220909(md)
          }))
        }
      };
    } else {
      const threadDescriptor = descriptorWrapper[1] && descriptorWrapper[1][0];
      if (!threadDescriptor) return null;
      let syncMessageData;
      const fullMessageDescriptors = Array.isArray(descriptorWrapper[2]) && descriptorWrapper[2];
      if (fullMessageDescriptors) {
        syncMessageData = fullMessageDescriptors.map(md => ({
          syncMessageID: md[0],
          date: +md[1][16],
          recipients: getRecipientsFromMessageDescriptor_20220909(md)
        }));
      } else {
        const messageDescriptors = descriptorWrapper[1] && descriptorWrapper[1][1];
        syncMessageData = messageDescriptors.map(md => ({
          syncMessageId: md[0],
          date: +md[15]
        }));
      }
      return {
        subject: threadDescriptor[1],
        snippet: threadDescriptor[2],
        syncThreadID: threadDescriptor[0],
        oldGmailThreadID: new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(threadDescriptor[13]).toString(16),
        rawResponse: descriptorWrapper,
        extraMetaData: {
          syncMessageData,
          snippet: ''
        }
      };
    }
  }).filter(_common_isNotNil__WEBPACK_IMPORTED_MODULE_1__["default"]);
}
function getRecipientsFromMessageDescriptor(messageDescriptor) {
  if (!messageDescriptor[2]) return;
  const to = messageDescriptor[2][1] || [];
  const cc = messageDescriptor[2][2] || [];
  const bcc = messageDescriptor[2][3] || [];
  return to.concat(cc).concat(bcc).map(recipientDescriptor => ({
    emailAddress: recipientDescriptor[2],
    name: recipientDescriptor[3]
  }));
}
function getRecipientsFromMessageDescriptor_20220909(messageDescriptor) {
  if (!messageDescriptor[1]) return;
  const to = messageDescriptor[1][0] || [];
  const cc = messageDescriptor[1][1] || [];
  const bcc = messageDescriptor[1][2] || [];
  return to.concat(cc).concat(bcc).map(recipientDescriptor => ({
    emailAddress: recipientDescriptor[1],
    name: recipientDescriptor[2]
  }));
}
function replaceThreadsInSearchResponse(response, replacementThreads, _unused // TODO why is this unused?
) {
  const parsedResponse = JSON.parse(response);
  if (Array.isArray(parsedResponse)) {
    try {
      return replaceThreadsInSearchResponse_20220909(parsedResponse, replacementThreads, _unused);
    } catch (err) {
      console.error('Caught err in replaceThreadsInSearchResponse', err);
      return response;
    }
  }
  if (parsedResponse[3] || replacementThreads.length) {
    parsedResponse[3] = replacementThreads.map((_ref, index) => {
      let {
        rawResponse
      } = _ref;
      return {
        ...rawResponse,
        '2': index
      };
    });
  }
  if (parsedResponse[15] || replacementThreads.length) {
    parsedResponse[15] = {
      ...parsedResponse[15],
      '1': replacementThreads.map(_ref2 => {
        let {
          extraMetaData
        } = _ref2;
        return extraMetaData.snippet;
      }),
      '2': replacementThreads.map(_ref3 => {
        let {
          extraMetaData
        } = _ref3;
        return extraMetaData.syncMessageData.map(_ref4 => {
          let {
            syncMessageID
          } = _ref4;
          return syncMessageID;
        });
      })
    };
  }
  return JSON.stringify(parsedResponse);
}
function replaceThreadsInSearchResponse_20220909(parsedResponse, replacementThreads, _unused // TODO why is this unused?
) {
  if (parsedResponse[2] || replacementThreads.length) {
    parsedResponse[2] = replacementThreads.map((_ref5, index) => {
      let {
        rawResponse
      } = _ref5;
      const res = [...rawResponse];
      res[1] = index;
      return res;
    });
  }
  if (parsedResponse[14] || replacementThreads.length) {
    parsedResponse[14] = [...parsedResponse[14]];
    parsedResponse[14][0] = replacementThreads.map(_ref6 => {
      let {
        extraMetaData
      } = _ref6;
      return extraMetaData.snippet;
    });
    if (Array.isArray(parsedResponse[14][1]) && parsedResponse[14][1].length > 0 && Array.isArray(parsedResponse[14][1][0][0])) {
      // 2023-04-19 gmail change
      parsedResponse[14][1] = replacementThreads.map(_ref7 => {
        let {
          extraMetaData
        } = _ref7;
        return [[extraMetaData.syncMessageData[0].syncMessageID]];
      });
    } else {
      parsedResponse[14][1] = replacementThreads.map(_ref8 => {
        let {
          extraMetaData
        } = _ref8;
        return extraMetaData.syncMessageData.map(_ref9 => {
          let {
            syncMessageID
          } = _ref9;
          return syncMessageID;
        });
      });
    }
  }
  return JSON.stringify(parsedResponse);
}

/***/ }),

/***/ "./src/platform-implementation-js/driver-common/getAccountUrlPart.ts":
/*!***************************************************************************!*\
  !*** ./src/platform-implementation-js/driver-common/getAccountUrlPart.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAccountUrlPart)
/* harmony export */ });
/*
 returns "/u/NUMBER" or "/u/NUMBER/d/DELEGATE_ID" for delegated accounts
*/
function getAccountUrlPart() {
  const delegatedAccountMatch = document.location.pathname.match(/\/b\/(.+?)\/u\/(\d+)/);
  if (delegatedAccountMatch) {
    const delegatedAccountId = delegatedAccountMatch[1];
    const delegatedAccountNumber = delegatedAccountMatch[2];
    return `/u/${delegatedAccountNumber}/d/${delegatedAccountId}`;
  } else {
    const accountParamMatch = document.location.pathname.match(/(\/u\/\d+)\//i);
    //no match happens in inbox when user only has one account
    const accountParam = accountParamMatch ? accountParamMatch[1] : '/u/0';
    return accountParam;
  }
}

/***/ }),

/***/ "./src/platform-implementation-js/driver-common/gmailAjax.ts":
/*!*******************************************************************!*\
  !*** ./src/platform-implementation-js/driver-common/gmailAjax.ts ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ud__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ud */ "./node_modules/ud/js/index.js");
/* harmony import */ var kefir__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kefir */ "./node_modules/kefir/dist/kefir.esm.js");
/* harmony import */ var _lib_imageRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/imageRequest */ "./src/platform-implementation-js/lib/imageRequest.ts");
/* harmony import */ var _common_rate_limit_queuer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/rate-limit-queuer */ "./src/common/rate-limit-queuer.ts");
/* harmony import */ var _common_ajax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/ajax */ "./src/common/ajax.ts");
/* module decorator */ module = __webpack_require__.hmd(module);





const IMAGE_REQUEST_TIMEOUT = 1000 * 60; // one minute

const limitedAjax = (0,_common_rate_limit_queuer__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_common_rate_limit_queuer__WEBPACK_IMPORTED_MODULE_2__["default"])(_common_ajax__WEBPACK_IMPORTED_MODULE_3__["default"], 1000, 7), 10 * 1000, 50);

// Tool for making ajax requests to Gmail endpoints. When used in Inbox, this
// function is able to handle the issue that happens when the user has no Gmail
// cookies.
async function gmailAjax(opts) {
  if (!/^https:\/\/mail\.google\.com(?:$|\/)/.test(opts.url)) {
    throw new Error('Should not happen: gmailAjax called with non-gmail url');
  }
  if (document.location.origin === 'https://mail.google.com') {
    return await limitedAjax(opts);
  }
  try {
    return await limitedAjax({
      ...opts,
      canRetry: false
    });
  } catch (e) {
    if (e && e.status === 0) {
      // The connection failed for an unspecified reason. One possible reason
      // is that we have no Gmail cookies, and the connection tried to redirect
      // to an accounts.google.com URL so the Gmail cookies could be set, but
      // then this connection failed because we don't have ajax permission to
      // accounts.google.com. We can work around this by trying an image
      // request (which doesn't have cross-domain restrictions) so the Gmail
      // cookies get set, and then retrying the original ajax request.
      try {
        await kefir__WEBPACK_IMPORTED_MODULE_0__["default"].fromPromise((0,_lib_imageRequest__WEBPACK_IMPORTED_MODULE_1__["default"])('https://mail.google.com/mail/u/0/')).merge(kefir__WEBPACK_IMPORTED_MODULE_0__["default"].later(IMAGE_REQUEST_TIMEOUT, undefined)).take(1).takeErrors(1).toPromise();
      } catch (e) {
        // ignore. If we got an error here, there are several possible causes:
        // 1. The user has Gmail cookies, but the first connection attempt
        //    failed for another reason. In this case, we don't care about how
        //    this image request turned out.
        // 2. The user did not have Gmail cookies, and the image's original
        //    request and its first few redirects succeeded, setting the
        //    cookies, but the final request, after the cookies were set,
        //    failed. We don't care about the image's final request.
        // 3. The user did not have Gmail cookies, and the image request didn't
        //    work at all.
        // In the final case, ideally we would retry the image request, but we
        // can't distinguish that case from the other cases and doing retries
        // of the image request would slow down the other cases. The first case
        // is expected to be significantly more common -- the second two cases
        // where the user has no Gmail cookies is expected to happen maybe once
        // in total to an individual user.
      }
      return await limitedAjax(opts);
    } else if (e && typeof e.status === 'number' && e.status >= 500) {
      return await limitedAjax(opts);
    } else {
      throw e;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,ud__WEBPACK_IMPORTED_MODULE_4__.defn)(module, gmailAjax));

/***/ }),

/***/ "./src/platform-implementation-js/driver-common/requestGmailThread.ts":
/*!****************************************************************************!*\
  !*** ./src/platform-implementation-js/driver-common/requestGmailThread.ts ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ud__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ud */ "./node_modules/ud/js/index.js");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var _gmailAjax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gmailAjax */ "./src/platform-implementation-js/driver-common/gmailAjax.ts");
/* harmony import */ var _getAccountUrlPart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getAccountUrlPart */ "./src/platform-implementation-js/driver-common/getAccountUrlPart.ts");
/* module decorator */ module = __webpack_require__.hmd(module);




async function requestGmailThread(ikValue, threadId) {
  const queryParameters = {
    ui: 2,
    ik: ikValue,
    view: 'cv',
    th: threadId,
    pcd: 1,
    mb: 0,
    rt: 'c',
    search: 'inbox',
    type: threadId
  };
  const {
    text
  } = await (0,_gmailAjax__WEBPACK_IMPORTED_MODULE_1__["default"])({
    method: 'POST',
    url: `https://mail.google.com/mail${(0,_getAccountUrlPart__WEBPACK_IMPORTED_MODULE_2__["default"])()}?${querystring__WEBPACK_IMPORTED_MODULE_0__.stringify(queryParameters)}`,
    canRetry: true
  });
  return text;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,ud__WEBPACK_IMPORTED_MODULE_3__.defn)(module, requestGmailThread));

/***/ }),

/***/ "./src/platform-implementation-js/lib/dom/custom-events.ts":
/*!*****************************************************************!*\
  !*** ./src/platform-implementation-js/lib/dom/custom-events.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomDomEvent: () => (/* binding */ CustomDomEvent)
/* harmony export */ });
var CustomDomEvent = {
  tellMeThisThreadIdByDatabase: "inboxSDKtellMeThisThreadIdByDatabase",
  tellMeThisThreadIdByClick: "inboxSDKtellMeThisThreadIdByClick"
};

/***/ }),

/***/ "./src/platform-implementation-js/lib/imageRequest.ts":
/*!************************************************************!*\
  !*** ./src/platform-implementation-js/lib/imageRequest.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ imageRequest)
/* harmony export */ });
function imageRequest(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = url;
  });
}

/***/ }),

/***/ "./src/platform-implementation-js/lib/wait-for.ts":
/*!********************************************************!*\
  !*** ./src/platform-implementation-js/lib/wait-for.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WaitForError: () => (/* binding */ WaitForError),
/* harmony export */   "default": () => (/* binding */ waitFor)
/* harmony export */ });
class WaitForError extends Error {
  name = 'WaitForError';
  constructor() {
    super('waitFor timeout');
  }
}

/**
 * @param condition a function that returns the value to wait for, or falsey if it's not ready yet
 * @throws {WaitForError} if the condition is not met within the timeout
 */
function waitFor(condition) {
  let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 120 * 1000;
  let steptime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;
  // make this error here so we have a sensible stack.
  const timeoutError = new WaitForError();
  return new Promise(function (resolve, reject) {
    let waited = 0;
    function step() {
      try {
        const result = condition();
        if (result) {
          resolve(result);
        } else {
          if (waited >= timeout) {
            reject(timeoutError);
          } else {
            waited += steptime;
            setTimeout(step, steptime);
          }
        }
      } catch (e) {
        reject(e);
      }
    }
    setTimeout(step, 1);
  });
}

/***/ }),

/***/ "./node_modules/array-range/index.js":
/*!*******************************************!*\
  !*** ./node_modules/array-range/index.js ***!
  \*******************************************/
/***/ ((module) => {


module.exports = function newArray(start, end) {
    var n0 = typeof start === 'number',
        n1 = typeof end === 'number'

    if (n0 && !n1) {
        end = start
        start = 0
    } else if (!n0 && !n1) {
        start = 0
        end = 0
    }

    start = start|0
    end = end|0
    var len = end-start
    if (len<0)
        throw new Error('array length must be positive')
    
    var a = new Array(len)
    for (var i=0, c=start; i<len; i++, c++)
        a[i] = c
    return a
}

/***/ }),

/***/ "./node_modules/auto-html/js/index.js":
/*!********************************************!*\
  !*** ./node_modules/auto-html/js/index.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = autoHtml;

var _escape = _interopRequireDefault(__webpack_require__(/*! lodash/escape */ "./node_modules/lodash/escape.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autoHtml(templateParts) {
  var parts = new Array(templateParts.length * 2 - 1);
  parts[0] = templateParts[0];

  for (var i = 0, len = arguments.length <= 1 ? 0 : arguments.length - 1; i < len; i++) {
    var value = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
    parts[2 * i + 1] = value && Object.prototype.hasOwnProperty.call(value, '__html') ? value.__html : (0, _escape.default)(value);
    parts[2 * i + 2] = templateParts[i + 1];
  }

  return parts.join('');
}

module.exports = exports.default;
module.exports["default"] = exports.default;


/***/ }),

/***/ "./node_modules/bignumber.js/bignumber.js":
/*!************************************************!*\
  !*** ./node_modules/bignumber.js/bignumber.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function (globalObject) {
  'use strict';

/*
 *      bignumber.js v9.0.1
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2020 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


  var BigNumber,
    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    mathceil = Math.ceil,
    mathfloor = Math.floor,

    bignumberError = '[BigNumber Error] ',
    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    SQRT_BASE = 1e7,

    // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9;                                   // 0 to MAX_INT32


  /*
   * Create and return a BigNumber constructor.
   */
  function clone(configObject) {
    var div, convertBase, parseNumeric,
      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
      ONE = new BigNumber(1),


      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


      // The default values below must be integers within the inclusive ranges stated.
      // The values can also be changed at run-time using BigNumber.set.

      // The maximum number of decimal places for operations involving division.
      DECIMAL_PLACES = 20,                     // 0 to MAX

      // The rounding mode used when rounding to the above decimal places, and when using
      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
      // UP         0 Away from zero.
      // DOWN       1 Towards zero.
      // CEIL       2 Towards +Infinity.
      // FLOOR      3 Towards -Infinity.
      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      ROUNDING_MODE = 4,                       // 0 to 8

      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

      // The exponent value at and beneath which toString returns exponential notation.
      // Number type: -7
      TO_EXP_NEG = -7,                         // 0 to -MAX

      // The exponent value at and above which toString returns exponential notation.
      // Number type: 21
      TO_EXP_POS = 21,                         // 0 to MAX

      // RANGE : [MIN_EXP, MAX_EXP]

      // The minimum exponent value, beneath which underflow to zero occurs.
      // Number type: -324  (5e-324)
      MIN_EXP = -1e7,                          // -1 to -MAX

      // The maximum exponent value, above which overflow to Infinity occurs.
      // Number type:  308  (1.7976931348623157e+308)
      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
      MAX_EXP = 1e7,                           // 1 to MAX

      // Whether to use cryptographically-secure random number generation, if available.
      CRYPTO = false,                          // true or false

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP        0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN      1 The remainder has the same sign as the dividend.
      //             This modulo mode is commonly known as 'truncated division' and is
      //             equivalent to (a % n) in JavaScript.
      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
      //             The remainder is always positive.
      //
      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
      // modes are commonly used for the modulus operation.
      // Although the other rounding modes can also be used, they may not give useful results.
      MODULO_MODE = 1,                         // 0 to 9

      // The maximum number of significant digits of the result of the exponentiatedBy operation.
      // If POW_PRECISION is 0, there will be unlimited significant digits.
      POW_PRECISION = 0,                    // 0 to MAX

      // The format specification used by the BigNumber.prototype.toFormat method.
      FORMAT = {
        prefix: '',
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ',',
        decimalSeparator: '.',
        fractionGroupSize: 0,
        fractionGroupSeparator: '\xA0',      // non-breaking space
        suffix: ''
      },

      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
      // '-', '.', whitespace, or repeated character.
      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


    //------------------------------------------------------------------------------------------


    // CONSTRUCTOR


    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */
    function BigNumber(v, b) {
      var alphabet, c, caseChanged, e, i, isNum, len, str,
        x = this;

      // Enable constructor call without `new`.
      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

      if (b == null) {

        if (v && v._isBigNumber === true) {
          x.s = v.s;

          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }

          return;
        }

        if ((isNum = typeof v == 'number') && v * 0 == 0) {

          // Use `1 / n` to handle minus zero also.
          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

          // Fast path for integers, where n < 2147483648 (2**31).
          if (v === ~~v) {
            for (e = 0, i = v; i >= 10; i /= 10, e++);

            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }

            return;
          }

          str = String(v);
        } else {

          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {

          // Integer.
          e = str.length;
        }

      } else {

        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');

        // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.
        if (b == 10) {
          x = new BigNumber(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        str = String(v);

        if (isNum = typeof v == 'number') {

          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error
             (tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0;

        // Check that str is a valid base b number.
        // Don't use RegExp, so alphabet can contain special characters.
        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {

              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {

              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                  str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, String(v), isNum, b);
          }
        }

        // Prevent later check for length on converted number.
        isNum = false;
        str = convertBase(str, b, 10, x.s);

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
        else e = str.length;
      }

      // Determine leading zeros.
      for (i = 0; str.charCodeAt(i) === 48; i++);

      // Determine trailing zeros.
      for (len = str.length; str.charCodeAt(--len) === 48;);

      if (str = str.slice(i, ++len)) {
        len -= i;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (isNum && BigNumber.DEBUG &&
          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
            throw Error
             (tooManyDigits + (x.s * v));
        }

         // Overflow?
        if ((e = e - i - 1) > MAX_EXP) {

          // Infinity.
          x.c = x.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];

          // Transform base

          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;  // i < 1

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            i = LOG_BASE - (str = str.slice(i)).length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');
          x.c.push(+str);
        }
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    }


    // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;

    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;


    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */
    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {

        if (typeof obj == 'object') {

          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }

          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }

          // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }

          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error
                 (bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          }

          // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'
          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                 (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error
                   (bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error
               (bignumberError + p + ' not true or false: ' + v);
            }
          }

          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }

          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }

          // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'
          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;
            else throw Error
             (bignumberError + p + ' not an object: ' + v);
          }

          // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'
          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p];

            // Disallow if less than two characters,
            // or if it contains '+', '-', '.', whitespace, or a repeated character.
            if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
              ALPHABET = v;
            } else {
              throw Error
               (bignumberError + p + ' invalid: ' + v);
            }
          }

        } else {

          // '[BigNumber Error] Object expected: {v}'
          throw Error
           (bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };


    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */
    BigNumber.isBigNumber = function (v) {
      if (!v || v._isBigNumber !== true) return false;
      if (!BigNumber.DEBUG) return true;

      var i, n,
        c = v.c,
        e = v.e,
        s = v.s;

      out: if ({}.toString.call(c) == '[object Array]') {

        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

          // If the first element is zero, the BigNumber value must be zero.
          if (c[0] === 0) {
            if (e === 0 && c.length === 1) return true;
            break out;
          }

          // Calculate number of digits that c[0] should have, based on the exponent.
          i = (e + 1) % LOG_BASE;
          if (i < 1) i += LOG_BASE;

          // Calculate number of digits of c[0].
          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
          if (String(c[0]).length == i) {

            for (i = 0; i < c.length; i++) {
              n = c[i];
              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
            }

            // Last element cannot be zero, unless it is the only element.
            if (n !== 0) return true;
          }
        }

      // Infinity/NaN
      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
        return true;
      }

      throw Error
        (bignumberError + 'Invalid BigNumber: ' + v);
    };


    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, P.lt);
    };


    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, P.gt);
    };


    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */
    BigNumber.random = (function () {
      var pow2_53 = 0x20000000000000;

      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
       ? function () { return mathfloor(Math.random() * pow2_53); }
       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
         (Math.random() * 0x800000 | 0); };

      return function (dp) {
        var a, b, e, k, v,
          i = 0,
          c = [],
          rand = new BigNumber(ONE);

        if (dp == null) dp = DECIMAL_PLACES;
        else intCheck(dp, 0, MAX);

        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {

          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {

            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {

              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

              // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {

                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }
            i = k / 2;

          // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {

            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {

              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {

                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }
            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error
             (bignumberError + 'crypto unavailable');
          }
        }

        // Use Math.random.
        if (!CRYPTO) {

          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE;

        // Convert trailing digits to zeros according to dp.
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        }

        // Remove trailing elements which are zero.
        for (; c[i] === 0; c.pop(), i--);

        // Zero?
        if (i < 0) {
          c = [e = 0];
        } else {

          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

          // Count the digits of the first element of c to determine leading zeros, and...
          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

          // adjust the exponent accordingly.
          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    })();


    /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.sum = function () {
      var i = 1,
        args = arguments,
        sum = new BigNumber(args[0]);
      for (; i < args.length;) sum = sum.plus(args[i++]);
      return sum;
    };


    // PRIVATE FUNCTIONS


    // Called by BigNumber and BigNumber.prototype.toString.
    convertBase = (function () {
      var decimal = '0123456789';

      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
          arr = [0],
          arrL,
          i = 0,
          len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {

            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.
      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y,
          i = str.indexOf('.'),
          dp = DECIMAL_PLACES,
          rm = ROUNDING_MODE;

        // Non-integer.
        if (i >= 0) {
          k = POW_PRECISION;

          // Unlimited precision.
          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k;

          // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
           10, baseOut, decimal);
          y.e = y.c.length;
        }

        // Convert the number as integer.

        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
         ? (alphabet = ALPHABET, decimal)
         : (alphabet = decimal, ALPHABET));

        // xc now represents str as an integer and converted to baseOut. e is the exponent.
        e = k = xc.length;

        // Remove trailing zeros.
        for (; xc[--k] == 0; xc.pop());

        // Zero?
        if (!xc[0]) return alphabet.charAt(0);

        // Does str represent an integer? If so, no need for the division.
        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;

          // The sign is needed for correct rounding.
          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }

        // xc now represents str converted to baseOut.

        // THe index of the rounding digit.
        d = e + dp + 1;

        // The rounding digit: the digit to the right of the digit that may be rounded up.
        i = xc[d];

        // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;

        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
               rm == (x.s < 0 ? 8 : 7));

        // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.
        if (d < 1 || !xc[0]) {

          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {

          // Truncate xc to the required number of decimal places.
          xc.length = d;

          // Round up?
          if (r) {

            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }

          // Determine trailing zeros.
          for (k = xc.length; !xc[--k];);

          // E.g. [4, 11, 15] becomes 4bf.
          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

          // Add leading zeros, decimal point and trailing zeros as required.
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }

        // The caller will add the sign.
        return str;
      };
    })();


    // Perform division in the specified base. Called by div and convertBase.
    div = (function () {

      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m, temp, xlo, xhi,
          carry = 0,
          i = x.length,
          klo = k % SQRT_BASE,
          khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);

        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {

          for (i = cmp = 0; i < aL; i++) {

            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0;

        // Subtract b from a.
        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1; a.splice(0, 1));
      }

      // x: dividend, y: divisor.
      return function (x, y, dp, rm, base) {
        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
          yL, yz,
          s = x.s == y.s ? 1 : -1,
          xc = x.c,
          yc = y.c;

        // Either NaN, Infinity or 0?
        if (!xc || !xc[0] || !yc || !yc[0]) {

          return new BigNumber(

           // Return NaN if either NaN, or both Infinity or 0.
           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
         );
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }

        // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2;

          // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1));

          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL; rem[remL++] = 0);
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++;
          // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0;

            // Compare divisor and remainder.
            cmp = compare(yc, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, n.

              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // n is how many times the divisor goes into the current remainder.
              n = mathfloor(rem0 / yc0);

              //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {

                // n may be > base only when base is 3.
                if (n >= base) n = base - 1;

                // product = divisor * trial digit.
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.
                while (compare(prod, rem, prodL, remL) == 1) {
                  n--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {

                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {

                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                }

                // product = divisor
                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);
              remL = rem.length;

               // If product was < remainder.
              if (cmp == -1) {

                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0

            // Add the next digit, n, to the result array.
            qc[i++] = n;

            // Update the remainder.
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null;

          // Leading zero?
          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {

          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

        // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    })();


    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */
    function format(n, i, rm, id) {
      var c0, e, ne, len, str;

      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      if (!n.c) return n.toString();

      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
         ? toExponential(str, ne)
         : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm);

        // n.e may have changed if the value was rounded up.
        e = n.e;

        str = coeffToString(n.c);
        len = str.length;

        // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.

        // Exponential notation.
        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

          // Append zeros?
          for (; len < i; str += '0', len++);
          str = toExponential(str, e);

        // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0');

          // Append zeros?
          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;
            if (i > 0) {
              if (e + 1 == len) str += '.';
              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    }


    // Handle BigNumber.max and BigNumber.min.
    function maxOrMin(args, method) {
      var n,
        i = 1,
        m = new BigNumber(args[0]);

      for (; i < args.length; i++) {
        n = new BigNumber(args[i]);

        // If any number is NaN, return NaN.
        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }

      return m;
    }


    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */
    function normalise(n, c, e) {
      var i = 1,
        j = c.length;

       // Remove trailing zeros.
      for (; !c[--j]; c.pop());

      // Calculate the base 10 exponent. First get the number of digits of c[0].
      for (j = c[0]; j >= 10; j /= 10, i++);

      // Overflow?
      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

        // Infinity.
        n.c = n.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    }


    // Handle values that fail the validity test in BigNumber.
    parseNumeric = (function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        dotAfter = /^([^.]+)\.$/,
        dotBefore = /^\.([^.]+)$/,
        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

      return function (x, str, isNum, b) {
        var base,
          s = isNum ? str : str.replace(whitespaceOrPlus, '');

        // No exception on ±Infinity or NaN.
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {

            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b;

              // E.g. '1.' to '1', '.1' to '0.1'
              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          }

          // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'
          if (BigNumber.DEBUG) {
            throw Error
              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          }

          // NaN
          x.s = null;
        }

        x.c = x.e = null;
      }
    })();


    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */
    function round(x, sd, rm, r) {
      var d, i, j, k, n, ni, rd,
        xc = x.c,
        pows10 = POWS_TEN;

      // if x is not Infinity or NaN...
      if (xc) {

        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {

          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
          i = sd - d;

          // If the rounding digit is in the first element of xc...
          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0];

            // Get the rounding digit at index j of n.
            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {

              if (r) {

                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));
                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];

              // Get the number of digits of n.
              for (d = 1; k >= 10; k /= 10, d++);

              // Get the index of rd within n.
              i %= LOG_BASE;

              // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.
              j = i - LOG_BASE + d;

              // Get the rounding digit at index j of n.
              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }

          r = r || sd < 0 ||

          // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

          r = rm < 4
           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

            // Check whether the digit to the left of the rounding digit is odd.
            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
             rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {

              // Convert sd to decimal places.
              sd -= x.e + 1;

              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {

              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          }

          // Remove excess digits.
          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i];

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }

          // Round up?
          if (r) {

            for (; ;) {

              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {

                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++);

                // if i != k the length has increased.
                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }

          // Remove trailing zeros.
          for (i = xc.length; xc[--i] === 0; xc.pop());
        }

        // Overflow? Infinity.
        if (x.e > MAX_EXP) {
          x.c = x.e = null;

        // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }


    function valueOf(n) {
      var str,
        e = n.e;

      if (e === null) return n.toString();

      str = coeffToString(n.c);

      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
        ? toExponential(str, e)
        : toFixedPoint(str, e, '0');

      return n.s < 0 ? '-' + str : str;
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */
    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };


    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */
    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };


    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.decimalPlaces = P.dp = function (dp, rm) {
      var c, n, v,
        x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last number.
      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;

      return n;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };


    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */
    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };


    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */
    P.exponentiatedBy = P.pow = function (n, m) {
      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
        x = this;

      n = new BigNumber(n);

      // Allow NaN and ±Infinity, but not other non-integers.
      if (n.c && !n.isInteger()) {
        throw Error
          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
      }

      if (m != null) m = new BigNumber(m);

      // Exponent of MAX_SAFE_INTEGER is 15.
      nIsBig = n.e > 14;

      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {

        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

        if (isModExp) x = x.mod(m);

      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
        // [1, 240000000]
        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
        // [80000000000000]  [99999750000000]
        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0;

        // If x >= 1, k = ±Infinity.
        if (x.e > -1) k = 1 / k;

        // If n is negative return ±0, else return ±Infinity.
        return new BigNumber(nIsNeg ? 1 / k : k);

      } else if (POW_PRECISION) {

        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        if (nIsNeg) n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i = Math.abs(+valueOf(n));
        nIsOdd = i % 2;
      }

      y = new BigNumber(ONE);

      // Performs 54 loop iterations for n of 9007199254740991.
      for (; ;) {

        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (i) {
          i = mathfloor(i / 2);
          if (i === 0) break;
          nIsOdd = i % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);

          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i = +valueOf(n);
            if (i === 0) break;
            nIsOdd = i % 2;
          }
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);

      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */
    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };


    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };


    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */
    P.isFinite = function () {
      return !!this.c;
    };


    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };


    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

    };


    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */
    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };


    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };


    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };


    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */
    P.isNaN = function () {
      return !this.s;
    };


    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */
    P.isNegative = function () {
      return this.s < 0;
    };


    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */
    P.isPositive = function () {
      return this.s > 0;
    };


    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */
    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */
    P.minus = function (y, b) {
      var i, j, t, xLTy,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

        // Either zero?
        if (!xc[0] || !yc[0]) {

          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
           ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Determine which is the bigger number.
      if (a = xe - ye) {

        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse();

        // Prepend zeros to equalise exponents.
        for (b = a; b--; t.push(0));
        t.reverse();
      } else {

        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {

          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }

      // x < y? Point xc to the array of the bigger number.
      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

      b = (j = yc.length) - (i = xc.length);

      // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1;

      // Subtract yc from xc.
      for (; j > a;) {

        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);
          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      }

      // Remove leading zeros and adjust exponent accordingly.
      for (; xc[0] == 0; xc.splice(0, 1), --ye);

      // Zero?
      if (!xc[0]) {

        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }

      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.
      return normalise(y, xc, ye);
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */
    P.modulo = P.mod = function (y, b) {
      var q, s,
        x = this;

      y = new BigNumber(y, b);

      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN);

      // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {

        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y));

      // To match JavaScript %, ensure sign of zero is sign of dividend.
      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

      return y;
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */
    P.multipliedBy = P.times = function (y, b) {
      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
        base, sqrtBase,
        x = this,
        xc = x.c,
        yc = (y = new BigNumber(y, b)).c;

      // Either NaN, ±Infinity or ±0?
      if (!xc || !yc || !xc[0] || !yc[0]) {

        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;

          // Return ±Infinity if either is ±Infinity.
          if (!xc || !yc) {
            y.c = y.e = null;

          // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;

      // Ensure xc points to longer array and xcL to its length.
      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

      // Initialise the result array with zeros.
      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */
    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */
    P.plus = function (y, b) {
      var t,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
       if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0);

        // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();
        for (; a--; t.push(0));
        t.reverse();
      }

      a = xc.length;
      b = yc.length;

      // Point xc to the longer array, and b to the shorter length.
      if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }

      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible
      return normalise(y, xc, ye);
    };


    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.precision = P.sd = function (sd, rm) {
      var c, n, v,
        x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {

        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--);

        // Add the number of digits of the first element.
        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;

      return n;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */
    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.squareRoot = P.sqrt = function () {
      var m, n, r, rep, t,
        x = this,
        c = x.c,
        s = x.s,
        e = x.e,
        dp = DECIMAL_PLACES + 4,
        half = new BigNumber('0.5');

      // Negative/NaN/Infinity/zero?
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }

      // Initial estimate.
      s = Math.sqrt(+valueOf(x));

      // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '5e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      }

      // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0;

        // Newton-Raphson iteration.
        for (; ;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1);

            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.
            if (n == '9999' || !rep && n == '4999') {

              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {

              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };


    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */
    P.toFormat = function (dp, rm, format) {
      var str,
        x = this;

      if (format == null) {
        if (dp != null && rm && typeof rm == 'object') {
          format = rm;
          rm = null;
        } else if (dp && typeof dp == 'object') {
          format = dp;
          dp = rm = null;
        } else {
          format = FORMAT;
        }
      } else if (typeof format != 'object') {
        throw Error
          (bignumberError + 'Argument not an object: ' + format);
      }

      str = x.toFixed(dp, rm);

      if (x.c) {
        var i,
          arr = str.split('.'),
          g1 = +format.groupSize,
          g2 = +format.secondaryGroupSize,
          groupSeparator = format.groupSeparator || '',
          intPart = arr[0],
          fractionPart = arr[1],
          isNeg = x.s < 0,
          intDigits = isNeg ? intPart.slice(1) : intPart,
          len = intDigits.length;

        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);
          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart
         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
           '$&' + (format.fractionGroupSeparator || ''))
          : fractionPart)
         : intPart;
      }

      return (format.prefix || '') + str + (format.suffix || '');
    };


    /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */
    P.toFraction = function (md) {
      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
        x = this,
        xc = x.c;

      if (md != null) {
        n = new BigNumber(md);

        // Throw if md is less than one or is not an integer, unless it is Infinity.
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error
            (bignumberError + 'Argument ' +
              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
        }
      }

      if (!xc) return new BigNumber(x);

      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc);

      // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s);

      // n0 = d1 = 0
      n0.c[0] = 0;

      for (; ;)  {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2;

      // Determine which fraction is closer to x, n0/d0 or n1/d1
      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

      MAX_EXP = exp;

      return r;
    };


    /*
     * Return the value of this BigNumber converted to a number primitive.
     */
    P.toNumber = function () {
      return +valueOf(this);
    };


    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };


    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */
    P.toString = function (b) {
      var str,
        n = this,
        s = n.s,
        e = n.e;

      // Infinity or NaN?
      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
           ? toExponential(coeffToString(n.c), e)
           : toFixedPoint(coeffToString(n.c), e, '0');
        } else if (b === 10) {
          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };


    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */
    P.valueOf = P.toJSON = function () {
      return valueOf(this);
    };


    P._isBigNumber = true;

    if (configObject != null) BigNumber.set(configObject);

    return BigNumber;
  }


  // PRIVATE HELPER FUNCTIONS

  // These functions don't need access to variables,
  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  }


  // Return a coefficient array as a string of base 10 digits.
  function coeffToString(a) {
    var s, z,
      i = 1,
      j = a.length,
      r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;
      for (; z--; s = '0' + s);
      r += s;
    }

    // Determine trailing zeros.
    for (j = r.length; r.charCodeAt(--j) === 48;);

    return r.slice(0, j + 1 || 1);
  }


  // Compare the value of BigNumbers x and y.
  function compare(x, y) {
    var a, b,
      xc = x.c,
      yc = y.c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either NaN?
    if (!i || !j) return null;

    a = xc && !xc[0];
    b = yc && !yc[0];

    // Either zero?
    if (a || b) return a ? b ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    a = i < 0;
    b = k == l;

    // Either Infinity?
    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

    // Compare exponents.
    if (!b) return k > l ^ a ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }


  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error
       (bignumberError + (name || 'Argument') + (typeof n == 'number'
         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
         : ' not a primitive number: ') + String(n));
    }
  }


  // Assumes finite n.
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }


  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
     (e < 0 ? 'e' : 'e+') + e;
  }


  function toFixedPoint(str, e, z) {
    var len, zs;

    // Negative exponent?
    if (e < 0) {

      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);
      str = zs + str;

    // Positive exponent
    } else {
      len = str.length;

      // Append zeros.
      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);
        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  }


  // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node.js and other environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/ext-corb-workaround/dist/src/moduleId.js":
/*!***************************************************************!*\
  !*** ./node_modules/ext-corb-workaround/dist/src/moduleId.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.moduleId = void 0;
var moduleId = '1f24 e53a';
exports.moduleId = moduleId;


/***/ }),

/***/ "./node_modules/ext-corb-workaround/dist/src/pageWorld.js":
/*!****************************************************************!*\
  !*** ./node_modules/ext-corb-workaround/dist/src/pageWorld.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.init = init;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _transferrables = _interopRequireDefault(__webpack_require__(/*! ./transferrables */ "./node_modules/ext-corb-workaround/dist/src/transferrables.js"));

var _moduleId = __webpack_require__(/*! ./moduleId */ "./node_modules/ext-corb-workaround/dist/src/moduleId.js");

// must be executed in page's world
function init() {
  // save a reference to XHR so we use the original instead of any replacements that extensions may place.
  var XMLHttpRequest = window.XMLHttpRequest;

  function handler(event) {
    if (!event.data || event.data.type !== 'ext-corb-workaround_port' || event.data.moduleId !== _moduleId.moduleId || event.__ext_claimed) {
      return;
    }

    event.__ext_claimed = true;
    window.removeEventListener('message', handler);
    var port = event.data.port;
    var instancesById = {};
    port.addEventListener('message', function (event) {
      var id = event.data.id;

      switch (event.data.type) {
        case 'NEW_XHR':
          {
            var xhr = instancesById[id] = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', function () {
              if (xhr.readyState !== 4) {
                return;
              }

              delete instancesById[id];
              var responseText;

              try {
                responseText = xhr.responseText;
              } catch (err) {// ignore
              }

              port.postMessage({
                type: 'COMPLETE',
                id: id,
                headers: xhr.getAllResponseHeaders(),
                readyState: xhr.readyState,
                status: xhr.status,
                statusText: xhr.statusText,
                responseURL: xhr.responseURL,
                response: xhr.response,
                responseText: responseText
              }, (0, _transferrables["default"])([xhr.response]));
            });
            break;
          }

        case 'SET':
          {
            var _event$data = event.data,
                prop = _event$data.prop,
                value = _event$data.value;
            instancesById[id][prop] = value;
            break;
          }

        case 'CALL':
          {
            var _ref;

            var _event$data2 = event.data,
                method = _event$data2.method,
                args = _event$data2.args; // Let abort calls silently fail if the XHR isn't present.

            if (method === 'abort' && !instancesById[id]) {
              break;
            }

            (_ref = instancesById[id])[method].apply(_ref, (0, _toConsumableArray2["default"])(args));

            break;
          }

        default:
          {
            // eslint-disable-next-line no-console
            console.error('ext-corb-workaround: Unknown event in page world:', event);
          }
      }
    });
    port.addEventListener('messageerror', function (event) {
      // eslint-disable-next-line no-console
      console.error('ext-corb-workaround: Unknown error in page world:', event);
    });
    port.start();
  }

  window.addEventListener('message', handler);
}


/***/ }),

/***/ "./node_modules/ext-corb-workaround/dist/src/transferrables.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ext-corb-workaround/dist/src/transferrables.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = transferrables;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

function transferrables(list) {
  return list.map(function (value) {
    if (value && (0, _typeof2["default"])(value) === 'object' && value.__proto__) {
      if (value.__proto__.constructor.name === 'ArrayBuffer') {
        return value;
      }

      if (value.__proto__.__proto__ && value.__proto__.__proto__.constructor.name === 'TypedArray') {
        return value.buffer;
      }
    }
  }).filter(Boolean);
}


/***/ }),

/***/ "./node_modules/kefir/dist/kefir.esm.js":
/*!**********************************************!*\
  !*** ./node_modules/kefir/dist/kefir.esm.js ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kefir: () => (/* binding */ Kefir),
/* harmony export */   Observable: () => (/* binding */ Observable),
/* harmony export */   Pool: () => (/* binding */ Pool),
/* harmony export */   Property: () => (/* binding */ Property),
/* harmony export */   Stream: () => (/* binding */ Stream),
/* harmony export */   combine: () => (/* binding */ combine),
/* harmony export */   concat: () => (/* binding */ concat$1),
/* harmony export */   constant: () => (/* binding */ constant),
/* harmony export */   constantError: () => (/* binding */ constantError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   dissableDeprecationWarnings: () => (/* binding */ dissableDeprecationWarnings),
/* harmony export */   fromCallback: () => (/* binding */ fromCallback),
/* harmony export */   fromESObservable: () => (/* binding */ fromESObservable),
/* harmony export */   fromEvents: () => (/* binding */ fromEvents),
/* harmony export */   fromNodeCallback: () => (/* binding */ fromNodeCallback),
/* harmony export */   fromPoll: () => (/* binding */ fromPoll),
/* harmony export */   fromPromise: () => (/* binding */ fromPromise),
/* harmony export */   interval: () => (/* binding */ interval),
/* harmony export */   later: () => (/* binding */ later),
/* harmony export */   merge: () => (/* binding */ merge),
/* harmony export */   never: () => (/* binding */ never),
/* harmony export */   pool: () => (/* binding */ pool),
/* harmony export */   repeat: () => (/* binding */ repeat),
/* harmony export */   sequentially: () => (/* binding */ sequentially),
/* harmony export */   staticLand: () => (/* binding */ staticLand),
/* harmony export */   stream: () => (/* binding */ stream),
/* harmony export */   withInterval: () => (/* binding */ withInterval),
/* harmony export */   zip: () => (/* binding */ zip)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
/*! Kefir.js v3.8.8
 *  https://github.com/kefirjs/kefir
 */

function createObj(proto) {
  var F = function () {};
  F.prototype = proto;
  return new F();
}

function extend(target /*, mixin1, mixin2...*/) {
  var length = arguments.length,
      i = void 0,
      prop = void 0;
  for (i = 1; i < length; i++) {
    for (prop in arguments[i]) {
      target[prop] = arguments[i][prop];
    }
  }
  return target;
}

function inherit(Child, Parent /*, mixin1, mixin2...*/) {
  var length = arguments.length,
      i = void 0;
  Child.prototype = createObj(Parent.prototype);
  Child.prototype.constructor = Child;
  for (i = 2; i < length; i++) {
    extend(Child.prototype, arguments[i]);
  }
  return Child;
}

var NOTHING = ['<nothing>'];
var END = 'end';
var VALUE = 'value';
var ERROR = 'error';
var ANY = 'any';

function concat(a, b) {
  var result = void 0,
      length = void 0,
      i = void 0,
      j = void 0;
  if (a.length === 0) {
    return b;
  }
  if (b.length === 0) {
    return a;
  }
  j = 0;
  result = new Array(a.length + b.length);
  length = a.length;
  for (i = 0; i < length; i++, j++) {
    result[j] = a[i];
  }
  length = b.length;
  for (i = 0; i < length; i++, j++) {
    result[j] = b[i];
  }
  return result;
}

function find(arr, value) {
  var length = arr.length,
      i = void 0;
  for (i = 0; i < length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

function findByPred(arr, pred) {
  var length = arr.length,
      i = void 0;
  for (i = 0; i < length; i++) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
}

function cloneArray(input) {
  var length = input.length,
      result = new Array(length),
      i = void 0;
  for (i = 0; i < length; i++) {
    result[i] = input[i];
  }
  return result;
}

function remove(input, index) {
  var length = input.length,
      result = void 0,
      i = void 0,
      j = void 0;
  if (index >= 0 && index < length) {
    if (length === 1) {
      return [];
    } else {
      result = new Array(length - 1);
      for (i = 0, j = 0; i < length; i++) {
        if (i !== index) {
          result[j] = input[i];
          j++;
        }
      }
      return result;
    }
  } else {
    return input;
  }
}

function map(input, fn) {
  var length = input.length,
      result = new Array(length),
      i = void 0;
  for (i = 0; i < length; i++) {
    result[i] = fn(input[i]);
  }
  return result;
}

function forEach(arr, fn) {
  var length = arr.length,
      i = void 0;
  for (i = 0; i < length; i++) {
    fn(arr[i]);
  }
}

function fillArray(arr, value) {
  var length = arr.length,
      i = void 0;
  for (i = 0; i < length; i++) {
    arr[i] = value;
  }
}

function contains(arr, value) {
  return find(arr, value) !== -1;
}

function slide(cur, next, max) {
  var length = Math.min(max, cur.length + 1),
      offset = cur.length - length + 1,
      result = new Array(length),
      i = void 0;
  for (i = offset; i < length; i++) {
    result[i - offset] = cur[i];
  }
  result[length - 1] = next;
  return result;
}

function callSubscriber(type, fn, event) {
  if (type === ANY) {
    fn(event);
  } else if (type === event.type) {
    if (type === VALUE || type === ERROR) {
      fn(event.value);
    } else {
      fn();
    }
  }
}

function Dispatcher() {
  this._items = [];
  this._spies = [];
  this._inLoop = 0;
  this._removedItems = null;
}

extend(Dispatcher.prototype, {
  add: function (type, fn) {
    this._items = concat(this._items, [{ type: type, fn: fn }]);
    return this._items.length;
  },
  remove: function (type, fn) {
    var index = findByPred(this._items, function (x) {
      return x.type === type && x.fn === fn;
    });

    // if we're currently in a notification loop,
    // remember this subscriber was removed
    if (this._inLoop !== 0 && index !== -1) {
      if (this._removedItems === null) {
        this._removedItems = [];
      }
      this._removedItems.push(this._items[index]);
    }

    this._items = remove(this._items, index);
    return this._items.length;
  },
  addSpy: function (fn) {
    this._spies = concat(this._spies, [fn]);
    return this._spies.length;
  },


  // Because spies are only ever a function that perform logging as
  // their only side effect, we don't need the same complicated
  // removal logic like in remove()
  removeSpy: function (fn) {
    this._spies = remove(this._spies, this._spies.indexOf(fn));
    return this._spies.length;
  },
  dispatch: function (event) {
    this._inLoop++;
    for (var i = 0, spies = this._spies; this._spies !== null && i < spies.length; i++) {
      spies[i](event);
    }

    for (var _i = 0, items = this._items; _i < items.length; _i++) {
      // cleanup was called
      if (this._items === null) {
        break;
      }

      // this subscriber was removed
      if (this._removedItems !== null && contains(this._removedItems, items[_i])) {
        continue;
      }

      callSubscriber(items[_i].type, items[_i].fn, event);
    }
    this._inLoop--;
    if (this._inLoop === 0) {
      this._removedItems = null;
    }
  },
  cleanup: function () {
    this._items = null;
    this._spies = null;
  }
});

function Observable() {
  this._dispatcher = new Dispatcher();
  this._active = false;
  this._alive = true;
  this._activating = false;
  this._logHandlers = null;
  this._spyHandlers = null;
}

extend(Observable.prototype, {
  _name: 'observable',

  _onActivation: function () {},
  _onDeactivation: function () {},
  _setActive: function (active) {
    if (this._active !== active) {
      this._active = active;
      if (active) {
        this._activating = true;
        this._onActivation();
        this._activating = false;
      } else {
        this._onDeactivation();
      }
    }
  },
  _clear: function () {
    this._setActive(false);
    this._dispatcher.cleanup();
    this._dispatcher = null;
    this._logHandlers = null;
  },
  _emit: function (type, x) {
    switch (type) {
      case VALUE:
        return this._emitValue(x);
      case ERROR:
        return this._emitError(x);
      case END:
        return this._emitEnd();
    }
  },
  _emitValue: function (value) {
    if (this._alive) {
      this._dispatcher.dispatch({ type: VALUE, value: value });
    }
  },
  _emitError: function (value) {
    if (this._alive) {
      this._dispatcher.dispatch({ type: ERROR, value: value });
    }
  },
  _emitEnd: function () {
    if (this._alive) {
      this._alive = false;
      this._dispatcher.dispatch({ type: END });
      this._clear();
    }
  },
  _on: function (type, fn) {
    if (this._alive) {
      this._dispatcher.add(type, fn);
      this._setActive(true);
    } else {
      callSubscriber(type, fn, { type: END });
    }
    return this;
  },
  _off: function (type, fn) {
    if (this._alive) {
      var count = this._dispatcher.remove(type, fn);
      if (count === 0) {
        this._setActive(false);
      }
    }
    return this;
  },
  onValue: function (fn) {
    return this._on(VALUE, fn);
  },
  onError: function (fn) {
    return this._on(ERROR, fn);
  },
  onEnd: function (fn) {
    return this._on(END, fn);
  },
  onAny: function (fn) {
    return this._on(ANY, fn);
  },
  offValue: function (fn) {
    return this._off(VALUE, fn);
  },
  offError: function (fn) {
    return this._off(ERROR, fn);
  },
  offEnd: function (fn) {
    return this._off(END, fn);
  },
  offAny: function (fn) {
    return this._off(ANY, fn);
  },
  observe: function (observerOrOnValue, onError, onEnd) {
    var _this = this;
    var closed = false;

    var observer = !observerOrOnValue || typeof observerOrOnValue === 'function' ? { value: observerOrOnValue, error: onError, end: onEnd } : observerOrOnValue;

    var handler = function (event) {
      if (event.type === END) {
        closed = true;
      }
      if (event.type === VALUE && observer.value) {
        observer.value(event.value);
      } else if (event.type === ERROR && observer.error) {
        observer.error(event.value);
      } else if (event.type === END && observer.end) {
        observer.end(event.value);
      }
    };

    this.onAny(handler);

    return {
      unsubscribe: function () {
        if (!closed) {
          _this.offAny(handler);
          closed = true;
        }
      },

      get closed() {
        return closed;
      }
    };
  },


  // A and B must be subclasses of Stream and Property (order doesn't matter)
  _ofSameType: function (A, B) {
    return A.prototype.getType() === this.getType() ? A : B;
  },
  setName: function (sourceObs /* optional */, selfName) {
    this._name = selfName ? sourceObs._name + '.' + selfName : sourceObs;
    return this;
  },
  log: function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.toString();

    var isCurrent = void 0;
    var handler = function (event) {
      var type = '<' + event.type + (isCurrent ? ':current' : '') + '>';
      if (event.type === END) {
        console.log(name, type);
      } else {
        console.log(name, type, event.value);
      }
    };

    if (this._alive) {
      if (!this._logHandlers) {
        this._logHandlers = [];
      }
      this._logHandlers.push({ name: name, handler: handler });
    }

    isCurrent = true;
    this.onAny(handler);
    isCurrent = false;

    return this;
  },
  offLog: function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.toString();

    if (this._logHandlers) {
      var handlerIndex = findByPred(this._logHandlers, function (obj) {
        return obj.name === name;
      });
      if (handlerIndex !== -1) {
        this.offAny(this._logHandlers[handlerIndex].handler);
        this._logHandlers.splice(handlerIndex, 1);
      }
    }

    return this;
  },
  spy: function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.toString();

    var handler = function (event) {
      var type = '<' + event.type + '>';
      if (event.type === END) {
        console.log(name, type);
      } else {
        console.log(name, type, event.value);
      }
    };
    if (this._alive) {
      if (!this._spyHandlers) {
        this._spyHandlers = [];
      }
      this._spyHandlers.push({ name: name, handler: handler });
      this._dispatcher.addSpy(handler);
    }
    return this;
  },
  offSpy: function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.toString();

    if (this._spyHandlers) {
      var handlerIndex = findByPred(this._spyHandlers, function (obj) {
        return obj.name === name;
      });
      if (handlerIndex !== -1) {
        this._dispatcher.removeSpy(this._spyHandlers[handlerIndex].handler);
        this._spyHandlers.splice(handlerIndex, 1);
      }
    }
    return this;
  }
});

// extend() can't handle `toString` in IE8
Observable.prototype.toString = function () {
  return '[' + this._name + ']';
};

function Stream() {
  Observable.call(this);
}

inherit(Stream, Observable, {
  _name: 'stream',

  getType: function () {
    return 'stream';
  }
});

function Property() {
  Observable.call(this);
  this._currentEvent = null;
}

inherit(Property, Observable, {
  _name: 'property',

  _emitValue: function (value) {
    if (this._alive) {
      this._currentEvent = { type: VALUE, value: value };
      if (!this._activating) {
        this._dispatcher.dispatch({ type: VALUE, value: value });
      }
    }
  },
  _emitError: function (value) {
    if (this._alive) {
      this._currentEvent = { type: ERROR, value: value };
      if (!this._activating) {
        this._dispatcher.dispatch({ type: ERROR, value: value });
      }
    }
  },
  _emitEnd: function () {
    if (this._alive) {
      this._alive = false;
      if (!this._activating) {
        this._dispatcher.dispatch({ type: END });
      }
      this._clear();
    }
  },
  _on: function (type, fn) {
    if (this._alive) {
      this._dispatcher.add(type, fn);
      this._setActive(true);
    }
    if (this._currentEvent !== null) {
      callSubscriber(type, fn, this._currentEvent);
    }
    if (!this._alive) {
      callSubscriber(type, fn, { type: END });
    }
    return this;
  },
  getType: function () {
    return 'property';
  }
});

var neverS = new Stream();
neverS._emitEnd();
neverS._name = 'never';

function never() {
  return neverS;
}

function timeBased(mixin) {
  function AnonymousStream(wait, options) {
    var _this = this;

    Stream.call(this);
    this._wait = wait;
    this._intervalId = null;
    this._$onTick = function () {
      return _this._onTick();
    };
    this._init(options);
  }

  inherit(AnonymousStream, Stream, {
    _init: function () {},
    _free: function () {},
    _onTick: function () {},
    _onActivation: function () {
      this._intervalId = setInterval(this._$onTick, this._wait);
    },
    _onDeactivation: function () {
      if (this._intervalId !== null) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    },
    _clear: function () {
      Stream.prototype._clear.call(this);
      this._$onTick = null;
      this._free();
    }
  }, mixin);

  return AnonymousStream;
}

var S = timeBased({
  _name: 'later',

  _init: function (_ref) {
    var x = _ref.x;

    this._x = x;
  },
  _free: function () {
    this._x = null;
  },
  _onTick: function () {
    this._emitValue(this._x);
    this._emitEnd();
  }
});

function later(wait, x) {
  return new S(wait, { x: x });
}

var S$1 = timeBased({
  _name: 'interval',

  _init: function (_ref) {
    var x = _ref.x;

    this._x = x;
  },
  _free: function () {
    this._x = null;
  },
  _onTick: function () {
    this._emitValue(this._x);
  }
});

function interval(wait, x) {
  return new S$1(wait, { x: x });
}

var S$2 = timeBased({
  _name: 'sequentially',

  _init: function (_ref) {
    var xs = _ref.xs;

    this._xs = cloneArray(xs);
  },
  _free: function () {
    this._xs = null;
  },
  _onTick: function () {
    if (this._xs.length === 1) {
      this._emitValue(this._xs[0]);
      this._emitEnd();
    } else {
      this._emitValue(this._xs.shift());
    }
  }
});

function sequentially(wait, xs) {
  return xs.length === 0 ? never() : new S$2(wait, { xs: xs });
}

var S$3 = timeBased({
  _name: 'fromPoll',

  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _onTick: function () {
    var fn = this._fn;
    this._emitValue(fn());
  }
});

function fromPoll(wait, fn) {
  return new S$3(wait, { fn: fn });
}

function emitter(obs) {
  function value(x) {
    obs._emitValue(x);
    return obs._active;
  }

  function error(x) {
    obs._emitError(x);
    return obs._active;
  }

  function end() {
    obs._emitEnd();
    return obs._active;
  }

  function event(e) {
    obs._emit(e.type, e.value);
    return obs._active;
  }

  return {
    value: value,
    error: error,
    end: end,
    event: event,

    // legacy
    emit: value,
    emitEvent: event
  };
}

var S$4 = timeBased({
  _name: 'withInterval',

  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
    this._emitter = emitter(this);
  },
  _free: function () {
    this._fn = null;
    this._emitter = null;
  },
  _onTick: function () {
    var fn = this._fn;
    fn(this._emitter);
  }
});

function withInterval(wait, fn) {
  return new S$4(wait, { fn: fn });
}

function S$5(fn) {
  Stream.call(this);
  this._fn = fn;
  this._unsubscribe = null;
}

inherit(S$5, Stream, {
  _name: 'stream',

  _onActivation: function () {
    var fn = this._fn;
    var unsubscribe = fn(emitter(this));
    this._unsubscribe = typeof unsubscribe === 'function' ? unsubscribe : null;

    // fix https://github.com/kefirjs/kefir/issues/35
    if (!this._active) {
      this._callUnsubscribe();
    }
  },
  _callUnsubscribe: function () {
    if (this._unsubscribe !== null) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  },
  _onDeactivation: function () {
    this._callUnsubscribe();
  },
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._fn = null;
  }
});

function stream(fn) {
  return new S$5(fn);
}

function fromCallback(callbackConsumer) {
  var called = false;

  return stream(function (emitter) {
    if (!called) {
      callbackConsumer(function (x) {
        emitter.emit(x);
        emitter.end();
      });
      called = true;
    }
  }).setName('fromCallback');
}

function fromNodeCallback(callbackConsumer) {
  var called = false;

  return stream(function (emitter) {
    if (!called) {
      callbackConsumer(function (error, x) {
        if (error) {
          emitter.error(error);
        } else {
          emitter.emit(x);
        }
        emitter.end();
      });
      called = true;
    }
  }).setName('fromNodeCallback');
}

function spread(fn, length) {
  switch (length) {
    case 0:
      return function () {
        return fn();
      };
    case 1:
      return function (a) {
        return fn(a[0]);
      };
    case 2:
      return function (a) {
        return fn(a[0], a[1]);
      };
    case 3:
      return function (a) {
        return fn(a[0], a[1], a[2]);
      };
    case 4:
      return function (a) {
        return fn(a[0], a[1], a[2], a[3]);
      };
    default:
      return function (a) {
        return fn.apply(null, a);
      };
  }
}

function apply(fn, c, a) {
  var aLength = a ? a.length : 0;
  if (c == null) {
    switch (aLength) {
      case 0:
        return fn();
      case 1:
        return fn(a[0]);
      case 2:
        return fn(a[0], a[1]);
      case 3:
        return fn(a[0], a[1], a[2]);
      case 4:
        return fn(a[0], a[1], a[2], a[3]);
      default:
        return fn.apply(null, a);
    }
  } else {
    switch (aLength) {
      case 0:
        return fn.call(c);
      default:
        return fn.apply(c, a);
    }
  }
}

function fromSubUnsub(sub, unsub, transformer /* Function | falsey */) {
  return stream(function (emitter) {
    var handler = transformer ? function () {
      emitter.emit(apply(transformer, this, arguments));
    } : function (x) {
      emitter.emit(x);
    };

    sub(handler);
    return function () {
      return unsub(handler);
    };
  }).setName('fromSubUnsub');
}

var pairs = [['addEventListener', 'removeEventListener'], ['addListener', 'removeListener'], ['on', 'off']];

function fromEvents(target, eventName, transformer) {
  var sub = void 0,
      unsub = void 0;

  for (var i = 0; i < pairs.length; i++) {
    if (typeof target[pairs[i][0]] === 'function' && typeof target[pairs[i][1]] === 'function') {
      sub = pairs[i][0];
      unsub = pairs[i][1];
      break;
    }
  }

  if (sub === undefined) {
    throw new Error("target don't support any of " + 'addEventListener/removeEventListener, addListener/removeListener, on/off method pair');
  }

  return fromSubUnsub(function (handler) {
    return target[sub](eventName, handler);
  }, function (handler) {
    return target[unsub](eventName, handler);
  }, transformer).setName('fromEvents');
}

// HACK:
//   We don't call parent Class constructor, but instead putting all necessary
//   properties into prototype to simulate ended Property
//   (see Propperty and Observable classes).

function P(value) {
  this._currentEvent = { type: 'value', value: value, current: true };
}

inherit(P, Property, {
  _name: 'constant',
  _active: false,
  _activating: false,
  _alive: false,
  _dispatcher: null,
  _logHandlers: null
});

function constant(x) {
  return new P(x);
}

// HACK:
//   We don't call parent Class constructor, but instead putting all necessary
//   properties into prototype to simulate ended Property
//   (see Propperty and Observable classes).

function P$1(value) {
  this._currentEvent = { type: 'error', value: value, current: true };
}

inherit(P$1, Property, {
  _name: 'constantError',
  _active: false,
  _activating: false,
  _alive: false,
  _dispatcher: null,
  _logHandlers: null
});

function constantError(x) {
  return new P$1(x);
}

function createConstructor(BaseClass, name) {
  return function AnonymousObservable(source, options) {
    var _this = this;

    BaseClass.call(this);
    this._source = source;
    this._name = source._name + '.' + name;
    this._init(options);
    this._$handleAny = function (event) {
      return _this._handleAny(event);
    };
  };
}

function createClassMethods(BaseClass) {
  return {
    _init: function () {},
    _free: function () {},
    _handleValue: function (x) {
      this._emitValue(x);
    },
    _handleError: function (x) {
      this._emitError(x);
    },
    _handleEnd: function () {
      this._emitEnd();
    },
    _handleAny: function (event) {
      switch (event.type) {
        case VALUE:
          return this._handleValue(event.value);
        case ERROR:
          return this._handleError(event.value);
        case END:
          return this._handleEnd();
      }
    },
    _onActivation: function () {
      this._source.onAny(this._$handleAny);
    },
    _onDeactivation: function () {
      this._source.offAny(this._$handleAny);
    },
    _clear: function () {
      BaseClass.prototype._clear.call(this);
      this._source = null;
      this._$handleAny = null;
      this._free();
    }
  };
}

function createStream(name, mixin) {
  var S = createConstructor(Stream, name);
  inherit(S, Stream, createClassMethods(Stream), mixin);
  return S;
}

function createProperty(name, mixin) {
  var P = createConstructor(Property, name);
  inherit(P, Property, createClassMethods(Property), mixin);
  return P;
}

var P$2 = createProperty('toProperty', {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._getInitialCurrent = fn;
  },
  _onActivation: function () {
    if (this._getInitialCurrent !== null) {
      var getInitial = this._getInitialCurrent;
      this._emitValue(getInitial());
    }
    this._source.onAny(this._$handleAny); // copied from patterns/one-source
  }
});

function toProperty(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (fn !== null && typeof fn !== 'function') {
    throw new Error('You should call toProperty() with a function or no arguments.');
  }
  return new P$2(obs, { fn: fn });
}

var S$6 = createStream('changes', {
  _handleValue: function (x) {
    if (!this._activating) {
      this._emitValue(x);
    }
  },
  _handleError: function (x) {
    if (!this._activating) {
      this._emitError(x);
    }
  }
});

function changes(obs) {
  return new S$6(obs);
}

function fromPromise(promise) {
  var called = false;

  var result = stream(function (emitter) {
    if (!called) {
      var onValue = function (x) {
        emitter.emit(x);
        emitter.end();
      };
      var onError = function (x) {
        emitter.error(x);
        emitter.end();
      };
      var _promise = promise.then(onValue, onError);

      // prevent libraries like 'Q' or 'when' from swallowing exceptions
      if (_promise && typeof _promise.done === 'function') {
        _promise.done();
      }

      called = true;
    }
  });

  return toProperty(result, null).setName('fromPromise');
}

function getGlodalPromise() {
  if (typeof Promise === 'function') {
    return Promise;
  } else {
    throw new Error("There isn't default Promise, use shim or parameter");
  }
}

var toPromise = function (obs) {
  var Promise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getGlodalPromise();

  var last = null;
  return new Promise(function (resolve, reject) {
    obs.onAny(function (event) {
      if (event.type === END && last !== null) {
        (last.type === VALUE ? resolve : reject)(last.value);
        last = null;
      } else {
        last = event;
      }
    });
  });
};

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof __webpack_require__.g !== 'undefined') {
  root = __webpack_require__.g;
} else if (true) {
  root = module;
} else {}

var result = symbolObservablePonyfill(root);

// this file contains some hot JS modules systems stuff

var $$observable = result.default ? result.default : result;

function fromESObservable(_observable) {
  var observable = _observable[$$observable] ? _observable[$$observable]() : _observable;
  return stream(function (emitter) {
    var unsub = observable.subscribe({
      error: function (error) {
        emitter.error(error);
        emitter.end();
      },
      next: function (value) {
        emitter.emit(value);
      },
      complete: function () {
        emitter.end();
      }
    });

    if (unsub.unsubscribe) {
      return function () {
        unsub.unsubscribe();
      };
    } else {
      return unsub;
    }
  }).setName('fromESObservable');
}

function ESObservable(observable) {
  this._observable = observable.takeErrors(1);
}

extend(ESObservable.prototype, {
  subscribe: function (observerOrOnNext, onError, onComplete) {
    var _this = this;

    var observer = typeof observerOrOnNext === 'function' ? { next: observerOrOnNext, error: onError, complete: onComplete } : observerOrOnNext;

    var fn = function (event) {
      if (event.type === END) {
        closed = true;
      }

      if (event.type === VALUE && observer.next) {
        observer.next(event.value);
      } else if (event.type === ERROR && observer.error) {
        observer.error(event.value);
      } else if (event.type === END && observer.complete) {
        observer.complete(event.value);
      }
    };

    this._observable.onAny(fn);
    var closed = false;

    var subscription = {
      unsubscribe: function () {
        closed = true;
        _this._observable.offAny(fn);
      },
      get closed() {
        return closed;
      }
    };
    return subscription;
  }
});

// Need to assign directly b/c Symbols aren't enumerable.
ESObservable.prototype[$$observable] = function () {
  return this;
};

function toESObservable() {
  return new ESObservable(this);
}

function collect(source, keys, values) {
  for (var prop in source) {
    if (source.hasOwnProperty(prop)) {
      keys.push(prop);
      values.push(source[prop]);
    }
  }
}

function defaultErrorsCombinator(errors) {
  var latestError = void 0;
  for (var i = 0; i < errors.length; i++) {
    if (errors[i] !== undefined) {
      if (latestError === undefined || latestError.index < errors[i].index) {
        latestError = errors[i];
      }
    }
  }
  return latestError.error;
}

function Combine(active, passive, combinator) {
  var _this = this;

  Stream.call(this);
  this._activeCount = active.length;
  this._sources = concat(active, passive);
  this._combinator = combinator;
  this._aliveCount = 0;
  this._latestValues = new Array(this._sources.length);
  this._latestErrors = new Array(this._sources.length);
  fillArray(this._latestValues, NOTHING);
  this._emitAfterActivation = false;
  this._endAfterActivation = false;
  this._latestErrorIndex = 0;

  this._$handlers = [];

  var _loop = function (i) {
    _this._$handlers.push(function (event) {
      return _this._handleAny(i, event);
    });
  };

  for (var i = 0; i < this._sources.length; i++) {
    _loop(i);
  }
}

inherit(Combine, Stream, {
  _name: 'combine',

  _onActivation: function () {
    this._aliveCount = this._activeCount;

    // we need to suscribe to _passive_ sources before _active_
    // (see https://github.com/kefirjs/kefir/issues/98)
    for (var i = this._activeCount; i < this._sources.length; i++) {
      this._sources[i].onAny(this._$handlers[i]);
    }
    for (var _i = 0; _i < this._activeCount; _i++) {
      this._sources[_i].onAny(this._$handlers[_i]);
    }

    if (this._emitAfterActivation) {
      this._emitAfterActivation = false;
      this._emitIfFull();
    }
    if (this._endAfterActivation) {
      this._emitEnd();
    }
  },
  _onDeactivation: function () {
    var length = this._sources.length,
        i = void 0;
    for (i = 0; i < length; i++) {
      this._sources[i].offAny(this._$handlers[i]);
    }
  },
  _emitIfFull: function () {
    var hasAllValues = true;
    var hasErrors = false;
    var length = this._latestValues.length;
    var valuesCopy = new Array(length);
    var errorsCopy = new Array(length);

    for (var i = 0; i < length; i++) {
      valuesCopy[i] = this._latestValues[i];
      errorsCopy[i] = this._latestErrors[i];

      if (valuesCopy[i] === NOTHING) {
        hasAllValues = false;
      }

      if (errorsCopy[i] !== undefined) {
        hasErrors = true;
      }
    }

    if (hasAllValues) {
      var combinator = this._combinator;
      this._emitValue(combinator(valuesCopy));
    }
    if (hasErrors) {
      this._emitError(defaultErrorsCombinator(errorsCopy));
    }
  },
  _handleAny: function (i, event) {
    if (event.type === VALUE || event.type === ERROR) {
      if (event.type === VALUE) {
        this._latestValues[i] = event.value;
        this._latestErrors[i] = undefined;
      }
      if (event.type === ERROR) {
        this._latestValues[i] = NOTHING;
        this._latestErrors[i] = {
          index: this._latestErrorIndex++,
          error: event.value
        };
      }

      if (i < this._activeCount) {
        if (this._activating) {
          this._emitAfterActivation = true;
        } else {
          this._emitIfFull();
        }
      }
    } else {
      // END

      if (i < this._activeCount) {
        this._aliveCount--;
        if (this._aliveCount === 0) {
          if (this._activating) {
            this._endAfterActivation = true;
          } else {
            this._emitEnd();
          }
        }
      }
    }
  },
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._sources = null;
    this._latestValues = null;
    this._latestErrors = null;
    this._combinator = null;
    this._$handlers = null;
  }
});

function combineAsArray(active) {
  var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var combinator = arguments[2];

  if (!Array.isArray(passive)) {
    throw new Error('Combine can only combine active and passive collections of the same type.');
  }

  combinator = combinator ? spread(combinator, active.length + passive.length) : function (x) {
    return x;
  };
  return active.length === 0 ? never() : new Combine(active, passive, combinator);
}

function combineAsObject(active) {
  var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var combinator = arguments[2];

  if (typeof passive !== 'object' || Array.isArray(passive)) {
    throw new Error('Combine can only combine active and passive collections of the same type.');
  }

  var keys = [],
      activeObservables = [],
      passiveObservables = [];

  collect(active, keys, activeObservables);
  collect(passive, keys, passiveObservables);

  var objectify = function (values) {
    var event = {};
    for (var i = values.length - 1; 0 <= i; i--) {
      event[keys[i]] = values[i];
    }
    return combinator ? combinator(event) : event;
  };

  return activeObservables.length === 0 ? never() : new Combine(activeObservables, passiveObservables, objectify);
}

function combine(active, passive, combinator) {
  if (typeof passive === 'function') {
    combinator = passive;
    passive = undefined;
  }

  return Array.isArray(active) ? combineAsArray(active, passive, combinator) : combineAsObject(active, passive, combinator);
}

var Observable$2 = {
  empty: function () {
    return never();
  },


  // Monoid based on merge() seems more useful than one based on concat().
  concat: function (a, b) {
    return a.merge(b);
  },
  of: function (x) {
    return constant(x);
  },
  map: function (fn, obs) {
    return obs.map(fn);
  },
  bimap: function (fnErr, fnVal, obs) {
    return obs.mapErrors(fnErr).map(fnVal);
  },


  // This ap strictly speaking incompatible with chain. If we derive ap from chain we get
  // different (not very useful) behavior. But spec requires that if method can be derived
  // it must have the same behavior as hand-written method. We intentionally violate the spec
  // in hope that it won't cause many troubles in practice. And in return we have more useful type.
  ap: function (obsFn, obsVal) {
    return combine([obsFn, obsVal], function (fn, val) {
      return fn(val);
    });
  },
  chain: function (fn, obs) {
    return obs.flatMap(fn);
  }
};



var staticLand = Object.freeze({
	Observable: Observable$2
});

var mixin = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    this._emitValue(fn(x));
  }
};

var S$7 = createStream('map', mixin);
var P$3 = createProperty('map', mixin);

var id = function (x) {
  return x;
};

function map$1(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id;

  return new (obs._ofSameType(S$7, P$3))(obs, { fn: fn });
}

var mixin$1 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (fn(x)) {
      this._emitValue(x);
    }
  }
};

var S$8 = createStream('filter', mixin$1);
var P$4 = createProperty('filter', mixin$1);

var id$1 = function (x) {
  return x;
};

function filter(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$1;

  return new (obs._ofSameType(S$8, P$4))(obs, { fn: fn });
}

var mixin$2 = {
  _init: function (_ref) {
    var n = _ref.n;

    this._n = n;
    if (n <= 0) {
      this._emitEnd();
    }
  },
  _handleValue: function (x) {
    if (this._n === 0) {
      return;
    }
    this._n--;
    this._emitValue(x);
    if (this._n === 0) {
      this._emitEnd();
    }
  }
};

var S$9 = createStream('take', mixin$2);
var P$5 = createProperty('take', mixin$2);

function take(obs, n) {
  return new (obs._ofSameType(S$9, P$5))(obs, { n: n });
}

var mixin$3 = {
  _init: function (_ref) {
    var n = _ref.n;

    this._n = n;
    if (n <= 0) {
      this._emitEnd();
    }
  },
  _handleError: function (x) {
    if (this._n === 0) {
      return;
    }
    this._n--;
    this._emitError(x);
    if (this._n === 0) {
      this._emitEnd();
    }
  }
};

var S$10 = createStream('takeErrors', mixin$3);
var P$6 = createProperty('takeErrors', mixin$3);

function takeErrors(obs, n) {
  return new (obs._ofSameType(S$10, P$6))(obs, { n: n });
}

var mixin$4 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (fn(x)) {
      this._emitValue(x);
    } else {
      this._emitEnd();
    }
  }
};

var S$11 = createStream('takeWhile', mixin$4);
var P$7 = createProperty('takeWhile', mixin$4);

var id$2 = function (x) {
  return x;
};

function takeWhile(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$2;

  return new (obs._ofSameType(S$11, P$7))(obs, { fn: fn });
}

var mixin$5 = {
  _init: function () {
    this._lastValue = NOTHING;
  },
  _free: function () {
    this._lastValue = null;
  },
  _handleValue: function (x) {
    this._lastValue = x;
  },
  _handleEnd: function () {
    if (this._lastValue !== NOTHING) {
      this._emitValue(this._lastValue);
    }
    this._emitEnd();
  }
};

var S$12 = createStream('last', mixin$5);
var P$8 = createProperty('last', mixin$5);

function last(obs) {
  return new (obs._ofSameType(S$12, P$8))(obs);
}

var mixin$6 = {
  _init: function (_ref) {
    var n = _ref.n;

    this._n = Math.max(0, n);
  },
  _handleValue: function (x) {
    if (this._n === 0) {
      this._emitValue(x);
    } else {
      this._n--;
    }
  }
};

var S$13 = createStream('skip', mixin$6);
var P$9 = createProperty('skip', mixin$6);

function skip(obs, n) {
  return new (obs._ofSameType(S$13, P$9))(obs, { n: n });
}

var mixin$7 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (this._fn !== null && !fn(x)) {
      this._fn = null;
    }
    if (this._fn === null) {
      this._emitValue(x);
    }
  }
};

var S$14 = createStream('skipWhile', mixin$7);
var P$10 = createProperty('skipWhile', mixin$7);

var id$3 = function (x) {
  return x;
};

function skipWhile(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$3;

  return new (obs._ofSameType(S$14, P$10))(obs, { fn: fn });
}

var mixin$8 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
    this._prev = NOTHING;
  },
  _free: function () {
    this._fn = null;
    this._prev = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (this._prev === NOTHING || !fn(this._prev, x)) {
      this._prev = x;
      this._emitValue(x);
    }
  }
};

var S$15 = createStream('skipDuplicates', mixin$8);
var P$11 = createProperty('skipDuplicates', mixin$8);

var eq = function (a, b) {
  return a === b;
};

function skipDuplicates(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : eq;

  return new (obs._ofSameType(S$15, P$11))(obs, { fn: fn });
}

var mixin$9 = {
  _init: function (_ref) {
    var fn = _ref.fn,
        seed = _ref.seed;

    this._fn = fn;
    this._prev = seed;
  },
  _free: function () {
    this._prev = null;
    this._fn = null;
  },
  _handleValue: function (x) {
    if (this._prev !== NOTHING) {
      var fn = this._fn;
      this._emitValue(fn(this._prev, x));
    }
    this._prev = x;
  }
};

var S$16 = createStream('diff', mixin$9);
var P$12 = createProperty('diff', mixin$9);

function defaultFn(a, b) {
  return [a, b];
}

function diff(obs, fn) {
  var seed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOTHING;

  return new (obs._ofSameType(S$16, P$12))(obs, { fn: fn || defaultFn, seed: seed });
}

var P$13 = createProperty('scan', {
  _init: function (_ref) {
    var fn = _ref.fn,
        seed = _ref.seed;

    this._fn = fn;
    this._seed = seed;
    if (seed !== NOTHING) {
      this._emitValue(seed);
    }
  },
  _free: function () {
    this._fn = null;
    this._seed = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (this._currentEvent === null || this._currentEvent.type === ERROR) {
      this._emitValue(this._seed === NOTHING ? x : fn(this._seed, x));
    } else {
      this._emitValue(fn(this._currentEvent.value, x));
    }
  }
});

function scan(obs, fn) {
  var seed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOTHING;

  return new P$13(obs, { fn: fn, seed: seed });
}

var mixin$10 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    var xs = fn(x);
    for (var i = 0; i < xs.length; i++) {
      this._emitValue(xs[i]);
    }
  }
};

var S$17 = createStream('flatten', mixin$10);

var id$4 = function (x) {
  return x;
};

function flatten(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$4;

  return new S$17(obs, { fn: fn });
}

var END_MARKER = {};

var mixin$11 = {
  _init: function (_ref) {
    var _this = this;

    var wait = _ref.wait;

    this._wait = Math.max(0, wait);
    this._buff = [];
    this._$shiftBuff = function () {
      var value = _this._buff.shift();
      if (value === END_MARKER) {
        _this._emitEnd();
      } else {
        _this._emitValue(value);
      }
    };
  },
  _free: function () {
    this._buff = null;
    this._$shiftBuff = null;
  },
  _handleValue: function (x) {
    if (this._activating) {
      this._emitValue(x);
    } else {
      this._buff.push(x);
      setTimeout(this._$shiftBuff, this._wait);
    }
  },
  _handleEnd: function () {
    if (this._activating) {
      this._emitEnd();
    } else {
      this._buff.push(END_MARKER);
      setTimeout(this._$shiftBuff, this._wait);
    }
  }
};

var S$18 = createStream('delay', mixin$11);
var P$14 = createProperty('delay', mixin$11);

function delay(obs, wait) {
  return new (obs._ofSameType(S$18, P$14))(obs, { wait: wait });
}

var now = Date.now ? function () {
  return Date.now();
} : function () {
  return new Date().getTime();
};

var mixin$12 = {
  _init: function (_ref) {
    var _this = this;

    var wait = _ref.wait,
        leading = _ref.leading,
        trailing = _ref.trailing;

    this._wait = Math.max(0, wait);
    this._leading = leading;
    this._trailing = trailing;
    this._trailingValue = null;
    this._timeoutId = null;
    this._endLater = false;
    this._lastCallTime = 0;
    this._$trailingCall = function () {
      return _this._trailingCall();
    };
  },
  _free: function () {
    this._trailingValue = null;
    this._$trailingCall = null;
  },
  _handleValue: function (x) {
    if (this._activating) {
      this._emitValue(x);
    } else {
      var curTime = now();
      if (this._lastCallTime === 0 && !this._leading) {
        this._lastCallTime = curTime;
      }
      var remaining = this._wait - (curTime - this._lastCallTime);
      if (remaining <= 0) {
        this._cancelTrailing();
        this._lastCallTime = curTime;
        this._emitValue(x);
      } else if (this._trailing) {
        this._cancelTrailing();
        this._trailingValue = x;
        this._timeoutId = setTimeout(this._$trailingCall, remaining);
      }
    }
  },
  _handleEnd: function () {
    if (this._activating) {
      this._emitEnd();
    } else {
      if (this._timeoutId) {
        this._endLater = true;
      } else {
        this._emitEnd();
      }
    }
  },
  _cancelTrailing: function () {
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  },
  _trailingCall: function () {
    this._emitValue(this._trailingValue);
    this._timeoutId = null;
    this._trailingValue = null;
    this._lastCallTime = !this._leading ? 0 : now();
    if (this._endLater) {
      this._emitEnd();
    }
  }
};

var S$19 = createStream('throttle', mixin$12);
var P$15 = createProperty('throttle', mixin$12);

function throttle(obs, wait) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$leading = _ref2.leading,
      leading = _ref2$leading === undefined ? true : _ref2$leading,
      _ref2$trailing = _ref2.trailing,
      trailing = _ref2$trailing === undefined ? true : _ref2$trailing;

  return new (obs._ofSameType(S$19, P$15))(obs, { wait: wait, leading: leading, trailing: trailing });
}

var mixin$13 = {
  _init: function (_ref) {
    var _this = this;

    var wait = _ref.wait,
        immediate = _ref.immediate;

    this._wait = Math.max(0, wait);
    this._immediate = immediate;
    this._lastAttempt = 0;
    this._timeoutId = null;
    this._laterValue = null;
    this._endLater = false;
    this._$later = function () {
      return _this._later();
    };
  },
  _free: function () {
    this._laterValue = null;
    this._$later = null;
  },
  _handleValue: function (x) {
    if (this._activating) {
      this._emitValue(x);
    } else {
      this._lastAttempt = now();
      if (this._immediate && !this._timeoutId) {
        this._emitValue(x);
      }
      if (!this._timeoutId) {
        this._timeoutId = setTimeout(this._$later, this._wait);
      }
      if (!this._immediate) {
        this._laterValue = x;
      }
    }
  },
  _handleEnd: function () {
    if (this._activating) {
      this._emitEnd();
    } else {
      if (this._timeoutId && !this._immediate) {
        this._endLater = true;
      } else {
        this._emitEnd();
      }
    }
  },
  _later: function () {
    var last = now() - this._lastAttempt;
    if (last < this._wait && last >= 0) {
      this._timeoutId = setTimeout(this._$later, this._wait - last);
    } else {
      this._timeoutId = null;
      if (!this._immediate) {
        var _laterValue = this._laterValue;
        this._laterValue = null;
        this._emitValue(_laterValue);
      }
      if (this._endLater) {
        this._emitEnd();
      }
    }
  }
};

var S$20 = createStream('debounce', mixin$13);
var P$16 = createProperty('debounce', mixin$13);

function debounce(obs, wait) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$immediate = _ref2.immediate,
      immediate = _ref2$immediate === undefined ? false : _ref2$immediate;

  return new (obs._ofSameType(S$20, P$16))(obs, { wait: wait, immediate: immediate });
}

var mixin$14 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleError: function (x) {
    var fn = this._fn;
    this._emitError(fn(x));
  }
};

var S$21 = createStream('mapErrors', mixin$14);
var P$17 = createProperty('mapErrors', mixin$14);

var id$5 = function (x) {
  return x;
};

function mapErrors(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$5;

  return new (obs._ofSameType(S$21, P$17))(obs, { fn: fn });
}

var mixin$15 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleError: function (x) {
    var fn = this._fn;
    if (fn(x)) {
      this._emitError(x);
    }
  }
};

var S$22 = createStream('filterErrors', mixin$15);
var P$18 = createProperty('filterErrors', mixin$15);

var id$6 = function (x) {
  return x;
};

function filterErrors(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$6;

  return new (obs._ofSameType(S$22, P$18))(obs, { fn: fn });
}

var mixin$16 = {
  _handleValue: function () {}
};

var S$23 = createStream('ignoreValues', mixin$16);
var P$19 = createProperty('ignoreValues', mixin$16);

function ignoreValues(obs) {
  return new (obs._ofSameType(S$23, P$19))(obs);
}

var mixin$17 = {
  _handleError: function () {}
};

var S$24 = createStream('ignoreErrors', mixin$17);
var P$20 = createProperty('ignoreErrors', mixin$17);

function ignoreErrors(obs) {
  return new (obs._ofSameType(S$24, P$20))(obs);
}

var mixin$18 = {
  _handleEnd: function () {}
};

var S$25 = createStream('ignoreEnd', mixin$18);
var P$21 = createProperty('ignoreEnd', mixin$18);

function ignoreEnd(obs) {
  return new (obs._ofSameType(S$25, P$21))(obs);
}

var mixin$19 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleEnd: function () {
    var fn = this._fn;
    this._emitValue(fn());
    this._emitEnd();
  }
};

var S$26 = createStream('beforeEnd', mixin$19);
var P$22 = createProperty('beforeEnd', mixin$19);

function beforeEnd(obs, fn) {
  return new (obs._ofSameType(S$26, P$22))(obs, { fn: fn });
}

var mixin$20 = {
  _init: function (_ref) {
    var min = _ref.min,
        max = _ref.max;

    this._max = max;
    this._min = min;
    this._buff = [];
  },
  _free: function () {
    this._buff = null;
  },
  _handleValue: function (x) {
    this._buff = slide(this._buff, x, this._max);
    if (this._buff.length >= this._min) {
      this._emitValue(this._buff);
    }
  }
};

var S$27 = createStream('slidingWindow', mixin$20);
var P$23 = createProperty('slidingWindow', mixin$20);

function slidingWindow(obs, max) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return new (obs._ofSameType(S$27, P$23))(obs, { min: min, max: max });
}

var mixin$21 = {
  _init: function (_ref) {
    var fn = _ref.fn,
        flushOnEnd = _ref.flushOnEnd;

    this._fn = fn;
    this._flushOnEnd = flushOnEnd;
    this._buff = [];
  },
  _free: function () {
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null && this._buff.length !== 0) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handleValue: function (x) {
    this._buff.push(x);
    var fn = this._fn;
    if (!fn(x)) {
      this._flush();
    }
  },
  _handleEnd: function () {
    if (this._flushOnEnd) {
      this._flush();
    }
    this._emitEnd();
  }
};

var S$28 = createStream('bufferWhile', mixin$21);
var P$24 = createProperty('bufferWhile', mixin$21);

var id$7 = function (x) {
  return x;
};

function bufferWhile(obs, fn) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$flushOnEnd = _ref2.flushOnEnd,
      flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;

  return new (obs._ofSameType(S$28, P$24))(obs, { fn: fn || id$7, flushOnEnd: flushOnEnd });
}

var mixin$22 = {
  _init: function (_ref) {
    var count = _ref.count,
        flushOnEnd = _ref.flushOnEnd;

    this._count = count;
    this._flushOnEnd = flushOnEnd;
    this._buff = [];
  },
  _free: function () {
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null && this._buff.length !== 0) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handleValue: function (x) {
    this._buff.push(x);
    if (this._buff.length >= this._count) {
      this._flush();
    }
  },
  _handleEnd: function () {
    if (this._flushOnEnd) {
      this._flush();
    }
    this._emitEnd();
  }
};

var S$29 = createStream('bufferWithCount', mixin$22);
var P$25 = createProperty('bufferWithCount', mixin$22);

function bufferWhile$1(obs, count) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$flushOnEnd = _ref2.flushOnEnd,
      flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;

  return new (obs._ofSameType(S$29, P$25))(obs, { count: count, flushOnEnd: flushOnEnd });
}

var mixin$23 = {
  _init: function (_ref) {
    var _this = this;

    var wait = _ref.wait,
        count = _ref.count,
        flushOnEnd = _ref.flushOnEnd;

    this._wait = wait;
    this._count = count;
    this._flushOnEnd = flushOnEnd;
    this._intervalId = null;
    this._$onTick = function () {
      return _this._flush();
    };
    this._buff = [];
  },
  _free: function () {
    this._$onTick = null;
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handleValue: function (x) {
    this._buff.push(x);
    if (this._buff.length >= this._count) {
      clearInterval(this._intervalId);
      this._flush();
      this._intervalId = setInterval(this._$onTick, this._wait);
    }
  },
  _handleEnd: function () {
    if (this._flushOnEnd && this._buff.length !== 0) {
      this._flush();
    }
    this._emitEnd();
  },
  _onActivation: function () {
    this._intervalId = setInterval(this._$onTick, this._wait);
    this._source.onAny(this._$handleAny); // copied from patterns/one-source
  },
  _onDeactivation: function () {
    if (this._intervalId !== null) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    this._source.offAny(this._$handleAny); // copied from patterns/one-source
  }
};

var S$30 = createStream('bufferWithTimeOrCount', mixin$23);
var P$26 = createProperty('bufferWithTimeOrCount', mixin$23);

function bufferWithTimeOrCount(obs, wait, count) {
  var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref2$flushOnEnd = _ref2.flushOnEnd,
      flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;

  return new (obs._ofSameType(S$30, P$26))(obs, { wait: wait, count: count, flushOnEnd: flushOnEnd });
}

function xformForObs(obs) {
  return {
    '@@transducer/step': function (res, input) {
      obs._emitValue(input);
      return null;
    },
    '@@transducer/result': function () {
      obs._emitEnd();
      return null;
    }
  };
}

var mixin$24 = {
  _init: function (_ref) {
    var transducer = _ref.transducer;

    this._xform = transducer(xformForObs(this));
  },
  _free: function () {
    this._xform = null;
  },
  _handleValue: function (x) {
    if (this._xform['@@transducer/step'](null, x) !== null) {
      this._xform['@@transducer/result'](null);
    }
  },
  _handleEnd: function () {
    this._xform['@@transducer/result'](null);
  }
};

var S$31 = createStream('transduce', mixin$24);
var P$27 = createProperty('transduce', mixin$24);

function transduce(obs, transducer) {
  return new (obs._ofSameType(S$31, P$27))(obs, { transducer: transducer });
}

var mixin$25 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._handler = fn;
    this._emitter = emitter(this);
  },
  _free: function () {
    this._handler = null;
    this._emitter = null;
  },
  _handleAny: function (event) {
    this._handler(this._emitter, event);
  }
};

var S$32 = createStream('withHandler', mixin$25);
var P$28 = createProperty('withHandler', mixin$25);

function withHandler(obs, fn) {
  return new (obs._ofSameType(S$32, P$28))(obs, { fn: fn });
}

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function Zip(sources, combinator) {
  var _this = this;

  Stream.call(this);

  this._buffers = map(sources, function (source) {
    return isArray(source) ? cloneArray(source) : [];
  });
  this._sources = map(sources, function (source) {
    return isArray(source) ? never() : source;
  });

  this._combinator = combinator ? spread(combinator, this._sources.length) : function (x) {
    return x;
  };
  this._aliveCount = 0;

  this._$handlers = [];

  var _loop = function (i) {
    _this._$handlers.push(function (event) {
      return _this._handleAny(i, event);
    });
  };

  for (var i = 0; i < this._sources.length; i++) {
    _loop(i);
  }
}

inherit(Zip, Stream, {
  _name: 'zip',

  _onActivation: function () {
    // if all sources are arrays
    while (this._isFull()) {
      this._emit();
    }

    var length = this._sources.length;
    this._aliveCount = length;
    for (var i = 0; i < length && this._active; i++) {
      this._sources[i].onAny(this._$handlers[i]);
    }
  },
  _onDeactivation: function () {
    for (var i = 0; i < this._sources.length; i++) {
      this._sources[i].offAny(this._$handlers[i]);
    }
  },
  _emit: function () {
    var values = new Array(this._buffers.length);
    for (var i = 0; i < this._buffers.length; i++) {
      values[i] = this._buffers[i].shift();
    }
    var combinator = this._combinator;
    this._emitValue(combinator(values));
  },
  _isFull: function () {
    for (var i = 0; i < this._buffers.length; i++) {
      if (this._buffers[i].length === 0) {
        return false;
      }
    }
    return true;
  },
  _handleAny: function (i, event) {
    if (event.type === VALUE) {
      this._buffers[i].push(event.value);
      if (this._isFull()) {
        this._emit();
      }
    }
    if (event.type === ERROR) {
      this._emitError(event.value);
    }
    if (event.type === END) {
      this._aliveCount--;
      if (this._aliveCount === 0) {
        this._emitEnd();
      }
    }
  },
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._sources = null;
    this._buffers = null;
    this._combinator = null;
    this._$handlers = null;
  }
});

function zip(observables, combinator /* Function | falsey */) {
  return observables.length === 0 ? never() : new Zip(observables, combinator);
}

var id$8 = function (x) {
  return x;
};

function AbstractPool() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$queueLim = _ref.queueLim,
      queueLim = _ref$queueLim === undefined ? 0 : _ref$queueLim,
      _ref$concurLim = _ref.concurLim,
      concurLim = _ref$concurLim === undefined ? -1 : _ref$concurLim,
      _ref$drop = _ref.drop,
      drop = _ref$drop === undefined ? 'new' : _ref$drop;

  Stream.call(this);

  this._queueLim = queueLim < 0 ? -1 : queueLim;
  this._concurLim = concurLim < 0 ? -1 : concurLim;
  this._drop = drop;
  this._queue = [];
  this._curSources = [];
  this._$handleSubAny = function (event) {
    return _this._handleSubAny(event);
  };
  this._$endHandlers = [];
  this._currentlyAdding = null;

  if (this._concurLim === 0) {
    this._emitEnd();
  }
}

inherit(AbstractPool, Stream, {
  _name: 'abstractPool',

  _add: function (obj, toObs /* Function | falsey */) {
    toObs = toObs || id$8;
    if (this._concurLim === -1 || this._curSources.length < this._concurLim) {
      this._addToCur(toObs(obj));
    } else {
      if (this._queueLim === -1 || this._queue.length < this._queueLim) {
        this._addToQueue(toObs(obj));
      } else if (this._drop === 'old') {
        this._removeOldest();
        this._add(obj, toObs);
      }
    }
  },
  _addAll: function (obss) {
    var _this2 = this;

    forEach(obss, function (obs) {
      return _this2._add(obs);
    });
  },
  _remove: function (obs) {
    if (this._removeCur(obs) === -1) {
      this._removeQueue(obs);
    }
  },
  _addToQueue: function (obs) {
    this._queue = concat(this._queue, [obs]);
  },
  _addToCur: function (obs) {
    if (this._active) {
      // HACK:
      //
      // We have two optimizations for cases when `obs` is ended. We don't want
      // to add such observable to the list, but only want to emit events
      // from it (if it has some).
      //
      // Instead of this hacks, we could just did following,
      // but it would be 5-8 times slower:
      //
      //     this._curSources = concat(this._curSources, [obs]);
      //     this._subscribe(obs);
      //

      // #1
      // This one for cases when `obs` already ended
      // e.g., Kefir.constant() or Kefir.never()
      if (!obs._alive) {
        if (obs._currentEvent) {
          this._emit(obs._currentEvent.type, obs._currentEvent.value);
        }
        // The _emit above could have caused this stream to end.
        if (this._active) {
          if (this._queue.length !== 0) {
            this._pullQueue();
          } else if (this._curSources.length === 0) {
            this._onEmpty();
          }
        }
        return;
      }

      // #2
      // This one is for cases when `obs` going to end synchronously on
      // first subscriber e.g., Kefir.stream(em => {em.emit(1); em.end()})
      this._currentlyAdding = obs;
      obs.onAny(this._$handleSubAny);
      this._currentlyAdding = null;
      if (obs._alive) {
        this._curSources = concat(this._curSources, [obs]);
        if (this._active) {
          this._subToEnd(obs);
        }
      } else {
        if (this._queue.length !== 0) {
          this._pullQueue();
        } else if (this._curSources.length === 0) {
          this._onEmpty();
        }
      }
    } else {
      this._curSources = concat(this._curSources, [obs]);
    }
  },
  _subToEnd: function (obs) {
    var _this3 = this;

    var onEnd = function () {
      return _this3._removeCur(obs);
    };
    this._$endHandlers.push({ obs: obs, handler: onEnd });
    obs.onEnd(onEnd);
  },
  _subscribe: function (obs) {
    obs.onAny(this._$handleSubAny);

    // it can become inactive in responce of subscribing to `obs.onAny` above
    if (this._active) {
      this._subToEnd(obs);
    }
  },
  _unsubscribe: function (obs) {
    obs.offAny(this._$handleSubAny);

    var onEndI = findByPred(this._$endHandlers, function (obj) {
      return obj.obs === obs;
    });
    if (onEndI !== -1) {
      obs.offEnd(this._$endHandlers[onEndI].handler);
      this._$endHandlers.splice(onEndI, 1);
    }
  },
  _handleSubAny: function (event) {
    if (event.type === VALUE) {
      this._emitValue(event.value);
    } else if (event.type === ERROR) {
      this._emitError(event.value);
    }
  },
  _removeQueue: function (obs) {
    var index = find(this._queue, obs);
    this._queue = remove(this._queue, index);
    return index;
  },
  _removeCur: function (obs) {
    if (this._active) {
      this._unsubscribe(obs);
    }
    var index = find(this._curSources, obs);
    this._curSources = remove(this._curSources, index);
    if (index !== -1) {
      if (this._queue.length !== 0) {
        this._pullQueue();
      } else if (this._curSources.length === 0) {
        this._onEmpty();
      }
    }
    return index;
  },
  _removeOldest: function () {
    this._removeCur(this._curSources[0]);
  },
  _pullQueue: function () {
    if (this._queue.length !== 0) {
      this._queue = cloneArray(this._queue);
      this._addToCur(this._queue.shift());
    }
  },
  _onActivation: function () {
    for (var i = 0, sources = this._curSources; i < sources.length && this._active; i++) {
      this._subscribe(sources[i]);
    }
  },
  _onDeactivation: function () {
    for (var i = 0, sources = this._curSources; i < sources.length; i++) {
      this._unsubscribe(sources[i]);
    }
    if (this._currentlyAdding !== null) {
      this._unsubscribe(this._currentlyAdding);
    }
  },
  _isEmpty: function () {
    return this._curSources.length === 0;
  },
  _onEmpty: function () {},
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._queue = null;
    this._curSources = null;
    this._$handleSubAny = null;
    this._$endHandlers = null;
  }
});

function Merge(sources) {
  AbstractPool.call(this);
  this._addAll(sources);
  this._initialised = true;
}

inherit(Merge, AbstractPool, {
  _name: 'merge',

  _onEmpty: function () {
    if (this._initialised) {
      this._emitEnd();
    }
  }
});

function merge(observables) {
  return observables.length === 0 ? never() : new Merge(observables);
}

function S$33(generator) {
  var _this = this;

  Stream.call(this);
  this._generator = generator;
  this._source = null;
  this._inLoop = false;
  this._iteration = 0;
  this._$handleAny = function (event) {
    return _this._handleAny(event);
  };
}

inherit(S$33, Stream, {
  _name: 'repeat',

  _handleAny: function (event) {
    if (event.type === END) {
      this._source = null;
      this._getSource();
    } else {
      this._emit(event.type, event.value);
    }
  },
  _getSource: function () {
    if (!this._inLoop) {
      this._inLoop = true;
      var generator = this._generator;
      while (this._source === null && this._alive && this._active) {
        this._source = generator(this._iteration++);
        if (this._source) {
          this._source.onAny(this._$handleAny);
        } else {
          this._emitEnd();
        }
      }
      this._inLoop = false;
    }
  },
  _onActivation: function () {
    if (this._source) {
      this._source.onAny(this._$handleAny);
    } else {
      this._getSource();
    }
  },
  _onDeactivation: function () {
    if (this._source) {
      this._source.offAny(this._$handleAny);
    }
  },
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._generator = null;
    this._source = null;
    this._$handleAny = null;
  }
});

var repeat = function (generator) {
  return new S$33(generator);
};

function concat$1(observables) {
  return repeat(function (index) {
    return observables.length > index ? observables[index] : false;
  }).setName('concat');
}

function Pool() {
  AbstractPool.call(this);
}

inherit(Pool, AbstractPool, {
  _name: 'pool',

  plug: function (obs) {
    this._add(obs);
    return this;
  },
  unplug: function (obs) {
    this._remove(obs);
    return this;
  }
});

function FlatMap(source, fn, options) {
  var _this = this;

  AbstractPool.call(this, options);
  this._source = source;
  this._fn = fn;
  this._mainEnded = false;
  this._lastCurrent = null;
  this._$handleMain = function (event) {
    return _this._handleMain(event);
  };
}

inherit(FlatMap, AbstractPool, {
  _onActivation: function () {
    AbstractPool.prototype._onActivation.call(this);
    if (this._active) {
      this._source.onAny(this._$handleMain);
    }
  },
  _onDeactivation: function () {
    AbstractPool.prototype._onDeactivation.call(this);
    this._source.offAny(this._$handleMain);
    this._hadNoEvSinceDeact = true;
  },
  _handleMain: function (event) {
    if (event.type === VALUE) {
      // Is latest value before deactivation survived, and now is 'current' on this activation?
      // We don't want to handle such values, to prevent to constantly add
      // same observale on each activation/deactivation when our main source
      // is a `Kefir.conatant()` for example.
      var sameCurr = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === event.value;
      if (!sameCurr) {
        this._add(event.value, this._fn);
      }
      this._lastCurrent = event.value;
      this._hadNoEvSinceDeact = false;
    }

    if (event.type === ERROR) {
      this._emitError(event.value);
    }

    if (event.type === END) {
      if (this._isEmpty()) {
        this._emitEnd();
      } else {
        this._mainEnded = true;
      }
    }
  },
  _onEmpty: function () {
    if (this._mainEnded) {
      this._emitEnd();
    }
  },
  _clear: function () {
    AbstractPool.prototype._clear.call(this);
    this._source = null;
    this._lastCurrent = null;
    this._$handleMain = null;
  }
});

function FlatMapErrors(source, fn) {
  FlatMap.call(this, source, fn);
}

inherit(FlatMapErrors, FlatMap, {
  // Same as in FlatMap, only VALUE/ERROR flipped
  _handleMain: function (event) {
    if (event.type === ERROR) {
      var sameCurr = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === event.value;
      if (!sameCurr) {
        this._add(event.value, this._fn);
      }
      this._lastCurrent = event.value;
      this._hadNoEvSinceDeact = false;
    }

    if (event.type === VALUE) {
      this._emitValue(event.value);
    }

    if (event.type === END) {
      if (this._isEmpty()) {
        this._emitEnd();
      } else {
        this._mainEnded = true;
      }
    }
  }
});

function createConstructor$1(BaseClass, name) {
  return function AnonymousObservable(primary, secondary, options) {
    var _this = this;

    BaseClass.call(this);
    this._primary = primary;
    this._secondary = secondary;
    this._name = primary._name + '.' + name;
    this._lastSecondary = NOTHING;
    this._$handleSecondaryAny = function (event) {
      return _this._handleSecondaryAny(event);
    };
    this._$handlePrimaryAny = function (event) {
      return _this._handlePrimaryAny(event);
    };
    this._init(options);
  };
}

function createClassMethods$1(BaseClass) {
  return {
    _init: function () {},
    _free: function () {},
    _handlePrimaryValue: function (x) {
      this._emitValue(x);
    },
    _handlePrimaryError: function (x) {
      this._emitError(x);
    },
    _handlePrimaryEnd: function () {
      this._emitEnd();
    },
    _handleSecondaryValue: function (x) {
      this._lastSecondary = x;
    },
    _handleSecondaryError: function (x) {
      this._emitError(x);
    },
    _handleSecondaryEnd: function () {},
    _handlePrimaryAny: function (event) {
      switch (event.type) {
        case VALUE:
          return this._handlePrimaryValue(event.value);
        case ERROR:
          return this._handlePrimaryError(event.value);
        case END:
          return this._handlePrimaryEnd(event.value);
      }
    },
    _handleSecondaryAny: function (event) {
      switch (event.type) {
        case VALUE:
          return this._handleSecondaryValue(event.value);
        case ERROR:
          return this._handleSecondaryError(event.value);
        case END:
          this._handleSecondaryEnd(event.value);
          this._removeSecondary();
      }
    },
    _removeSecondary: function () {
      if (this._secondary !== null) {
        this._secondary.offAny(this._$handleSecondaryAny);
        this._$handleSecondaryAny = null;
        this._secondary = null;
      }
    },
    _onActivation: function () {
      if (this._secondary !== null) {
        this._secondary.onAny(this._$handleSecondaryAny);
      }
      if (this._active) {
        this._primary.onAny(this._$handlePrimaryAny);
      }
    },
    _onDeactivation: function () {
      if (this._secondary !== null) {
        this._secondary.offAny(this._$handleSecondaryAny);
      }
      this._primary.offAny(this._$handlePrimaryAny);
    },
    _clear: function () {
      BaseClass.prototype._clear.call(this);
      this._primary = null;
      this._secondary = null;
      this._lastSecondary = null;
      this._$handleSecondaryAny = null;
      this._$handlePrimaryAny = null;
      this._free();
    }
  };
}

function createStream$1(name, mixin) {
  var S = createConstructor$1(Stream, name);
  inherit(S, Stream, createClassMethods$1(Stream), mixin);
  return S;
}

function createProperty$1(name, mixin) {
  var P = createConstructor$1(Property, name);
  inherit(P, Property, createClassMethods$1(Property), mixin);
  return P;
}

var mixin$26 = {
  _handlePrimaryValue: function (x) {
    if (this._lastSecondary !== NOTHING && this._lastSecondary) {
      this._emitValue(x);
    }
  },
  _handleSecondaryEnd: function () {
    if (this._lastSecondary === NOTHING || !this._lastSecondary) {
      this._emitEnd();
    }
  }
};

var S$34 = createStream$1('filterBy', mixin$26);
var P$29 = createProperty$1('filterBy', mixin$26);

function filterBy(primary, secondary) {
  return new (primary._ofSameType(S$34, P$29))(primary, secondary);
}

var id2 = function (_, x) {
  return x;
};

function sampledBy(passive, active, combinator) {
  var _combinator = combinator ? function (a, b) {
    return combinator(b, a);
  } : id2;
  return combine([active], [passive], _combinator).setName(passive, 'sampledBy');
}

var mixin$27 = {
  _handlePrimaryValue: function (x) {
    if (this._lastSecondary !== NOTHING) {
      this._emitValue(x);
    }
  },
  _handleSecondaryEnd: function () {
    if (this._lastSecondary === NOTHING) {
      this._emitEnd();
    }
  }
};

var S$35 = createStream$1('skipUntilBy', mixin$27);
var P$30 = createProperty$1('skipUntilBy', mixin$27);

function skipUntilBy(primary, secondary) {
  return new (primary._ofSameType(S$35, P$30))(primary, secondary);
}

var mixin$28 = {
  _handleSecondaryValue: function () {
    this._emitEnd();
  }
};

var S$36 = createStream$1('takeUntilBy', mixin$28);
var P$31 = createProperty$1('takeUntilBy', mixin$28);

function takeUntilBy(primary, secondary) {
  return new (primary._ofSameType(S$36, P$31))(primary, secondary);
}

var mixin$29 = {
  _init: function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$flushOnEnd = _ref.flushOnEnd,
        flushOnEnd = _ref$flushOnEnd === undefined ? true : _ref$flushOnEnd;

    this._buff = [];
    this._flushOnEnd = flushOnEnd;
  },
  _free: function () {
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handlePrimaryEnd: function () {
    if (this._flushOnEnd) {
      this._flush();
    }
    this._emitEnd();
  },
  _onActivation: function () {
    this._primary.onAny(this._$handlePrimaryAny);
    if (this._alive && this._secondary !== null) {
      this._secondary.onAny(this._$handleSecondaryAny);
    }
  },
  _handlePrimaryValue: function (x) {
    this._buff.push(x);
  },
  _handleSecondaryValue: function () {
    this._flush();
  },
  _handleSecondaryEnd: function () {
    if (!this._flushOnEnd) {
      this._emitEnd();
    }
  }
};

var S$37 = createStream$1('bufferBy', mixin$29);
var P$32 = createProperty$1('bufferBy', mixin$29);

function bufferBy(primary, secondary, options /* optional */) {
  return new (primary._ofSameType(S$37, P$32))(primary, secondary, options);
}

var mixin$30 = {
  _init: function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$flushOnEnd = _ref.flushOnEnd,
        flushOnEnd = _ref$flushOnEnd === undefined ? true : _ref$flushOnEnd,
        _ref$flushOnChange = _ref.flushOnChange,
        flushOnChange = _ref$flushOnChange === undefined ? false : _ref$flushOnChange;

    this._buff = [];
    this._flushOnEnd = flushOnEnd;
    this._flushOnChange = flushOnChange;
  },
  _free: function () {
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handlePrimaryEnd: function () {
    if (this._flushOnEnd) {
      this._flush();
    }
    this._emitEnd();
  },
  _handlePrimaryValue: function (x) {
    this._buff.push(x);
    if (this._lastSecondary !== NOTHING && !this._lastSecondary) {
      this._flush();
    }
  },
  _handleSecondaryEnd: function () {
    if (!this._flushOnEnd && (this._lastSecondary === NOTHING || this._lastSecondary)) {
      this._emitEnd();
    }
  },
  _handleSecondaryValue: function (x) {
    if (this._flushOnChange && !x) {
      this._flush();
    }

    // from default _handleSecondaryValue
    this._lastSecondary = x;
  }
};

var S$38 = createStream$1('bufferWhileBy', mixin$30);
var P$33 = createProperty$1('bufferWhileBy', mixin$30);

function bufferWhileBy(primary, secondary, options /* optional */) {
  return new (primary._ofSameType(S$38, P$33))(primary, secondary, options);
}

var f = function () {
  return false;
};
var t = function () {
  return true;
};

function awaiting(a, b) {
  var result = merge([map$1(a, t), map$1(b, f)]);
  result = skipDuplicates(result);
  result = toProperty(result, f);
  return result.setName(a, 'awaiting');
}

var mixin$31 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    var result = fn(x);
    if (result.convert) {
      this._emitError(result.error);
    } else {
      this._emitValue(x);
    }
  }
};

var S$39 = createStream('valuesToErrors', mixin$31);
var P$34 = createProperty('valuesToErrors', mixin$31);

var defFn = function (x) {
  return { convert: true, error: x };
};

function valuesToErrors(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defFn;

  return new (obs._ofSameType(S$39, P$34))(obs, { fn: fn });
}

var mixin$32 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleError: function (x) {
    var fn = this._fn;
    var result = fn(x);
    if (result.convert) {
      this._emitValue(result.value);
    } else {
      this._emitError(x);
    }
  }
};

var S$40 = createStream('errorsToValues', mixin$32);
var P$35 = createProperty('errorsToValues', mixin$32);

var defFn$1 = function (x) {
  return { convert: true, value: x };
};

function errorsToValues(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defFn$1;

  return new (obs._ofSameType(S$40, P$35))(obs, { fn: fn });
}

var mixin$33 = {
  _handleError: function (x) {
    this._emitError(x);
    this._emitEnd();
  }
};

var S$41 = createStream('endOnError', mixin$33);
var P$36 = createProperty('endOnError', mixin$33);

function endOnError(obs) {
  return new (obs._ofSameType(S$41, P$36))(obs);
}

// Create a stream
// -----------------------------------------------------------------------------

// () -> Stream
// (number, any) -> Stream
// (number, any) -> Stream
// (number, Array<any>) -> Stream
// (number, Function) -> Stream
// (number, Function) -> Stream
// (Function) -> Stream
// (Function) -> Stream
// Target = {addEventListener, removeEventListener}|{addListener, removeListener}|{on, off}
// (Target, string, Function|undefined) -> Stream
// (Function) -> Stream
// Create a property
// -----------------------------------------------------------------------------

// (any) -> Property
// (any) -> Property
// Convert observables
// -----------------------------------------------------------------------------

// (Stream|Property, Function|undefined) -> Property
Observable.prototype.toProperty = function (fn) {
  return toProperty(this, fn);
};

// (Stream|Property) -> Stream
Observable.prototype.changes = function () {
  return changes(this);
};

// Interoperation with other implimentations
// -----------------------------------------------------------------------------

// (Promise) -> Property
// (Stream|Property, Function|undefined) -> Promise
Observable.prototype.toPromise = function (Promise) {
  return toPromise(this, Promise);
};

// (ESObservable) -> Stream
// (Stream|Property) -> ES7 Observable
Observable.prototype.toESObservable = toESObservable;
Observable.prototype[$$observable] = toESObservable;

// Modify an observable
// -----------------------------------------------------------------------------

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.map = function (fn) {
  return map$1(this, fn);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.filter = function (fn) {
  return filter(this, fn);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.take = function (n) {
  return take(this, n);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.takeErrors = function (n) {
  return takeErrors(this, n);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.takeWhile = function (fn) {
  return takeWhile(this, fn);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.last = function () {
  return last(this);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.skip = function (n) {
  return skip(this, n);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.skipWhile = function (fn) {
  return skipWhile(this, fn);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.skipDuplicates = function (fn) {
  return skipDuplicates(this, fn);
};

// (Stream, Function|falsey, any|undefined) -> Stream
// (Property, Function|falsey, any|undefined) -> Property
Observable.prototype.diff = function (fn, seed) {
  return diff(this, fn, seed);
};

// (Stream|Property, Function, any|undefined) -> Property
Observable.prototype.scan = function (fn, seed) {
  return scan(this, fn, seed);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.flatten = function (fn) {
  return flatten(this, fn);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.delay = function (wait) {
  return delay(this, wait);
};

// Options = {leading: boolean|undefined, trailing: boolean|undefined}
// (Stream, number, Options|undefined) -> Stream
// (Property, number, Options|undefined) -> Property
Observable.prototype.throttle = function (wait, options) {
  return throttle(this, wait, options);
};

// Options = {immediate: boolean|undefined}
// (Stream, number, Options|undefined) -> Stream
// (Property, number, Options|undefined) -> Property
Observable.prototype.debounce = function (wait, options) {
  return debounce(this, wait, options);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.mapErrors = function (fn) {
  return mapErrors(this, fn);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.filterErrors = function (fn) {
  return filterErrors(this, fn);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.ignoreValues = function () {
  return ignoreValues(this);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.ignoreErrors = function () {
  return ignoreErrors(this);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.ignoreEnd = function () {
  return ignoreEnd(this);
};

// (Stream, Function) -> Stream
// (Property, Function) -> Property
Observable.prototype.beforeEnd = function (fn) {
  return beforeEnd(this, fn);
};

// (Stream, number, number|undefined) -> Stream
// (Property, number, number|undefined) -> Property
Observable.prototype.slidingWindow = function (max, min) {
  return slidingWindow(this, max, min);
};

// Options = {flushOnEnd: boolean|undefined}
// (Stream, Function|falsey, Options|undefined) -> Stream
// (Property, Function|falsey, Options|undefined) -> Property
Observable.prototype.bufferWhile = function (fn, options) {
  return bufferWhile(this, fn, options);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.bufferWithCount = function (count, options) {
  return bufferWhile$1(this, count, options);
};

// Options = {flushOnEnd: boolean|undefined}
// (Stream, number, number, Options|undefined) -> Stream
// (Property, number, number, Options|undefined) -> Property
Observable.prototype.bufferWithTimeOrCount = function (wait, count, options) {
  return bufferWithTimeOrCount(this, wait, count, options);
};

// (Stream, Function) -> Stream
// (Property, Function) -> Property
Observable.prototype.transduce = function (transducer) {
  return transduce(this, transducer);
};

// (Stream, Function) -> Stream
// (Property, Function) -> Property
Observable.prototype.withHandler = function (fn) {
  return withHandler(this, fn);
};

// (Stream, Stream -> a) -> a
// (Property, Property -> a) -> a
Observable.prototype.thru = function (fn) {
  return fn(this);
};

// Combine observables
// -----------------------------------------------------------------------------

// (Array<Stream|Property>, Function|undefiend) -> Stream
// (Array<Stream|Property>, Array<Stream|Property>, Function|undefiend) -> Stream
Observable.prototype.combine = function (other, combinator) {
  return combine([this, other], combinator);
};

// (Array<Stream|Property>, Function|undefiend) -> Stream
Observable.prototype.zip = function (other, combinator) {
  return zip([this, other], combinator);
};

// (Array<Stream|Property>) -> Stream
Observable.prototype.merge = function (other) {
  return merge([this, other]);
};

// (Array<Stream|Property>) -> Stream
Observable.prototype.concat = function (other) {
  return concat$1([this, other]);
};

// () -> Pool
var pool = function () {
  return new Pool();
};

// (Function) -> Stream
// Options = {concurLim: number|undefined, queueLim: number|undefined, drop: 'old'|'new'|undefiend}
// (Stream|Property, Function|falsey, Options|undefined) -> Stream
Observable.prototype.flatMap = function (fn) {
  return new FlatMap(this, fn).setName(this, 'flatMap');
};
Observable.prototype.flatMapLatest = function (fn) {
  return new FlatMap(this, fn, { concurLim: 1, drop: 'old' }).setName(this, 'flatMapLatest');
};
Observable.prototype.flatMapFirst = function (fn) {
  return new FlatMap(this, fn, { concurLim: 1 }).setName(this, 'flatMapFirst');
};
Observable.prototype.flatMapConcat = function (fn) {
  return new FlatMap(this, fn, { queueLim: -1, concurLim: 1 }).setName(this, 'flatMapConcat');
};
Observable.prototype.flatMapConcurLimit = function (fn, limit) {
  return new FlatMap(this, fn, { queueLim: -1, concurLim: limit }).setName(this, 'flatMapConcurLimit');
};

// (Stream|Property, Function|falsey) -> Stream
Observable.prototype.flatMapErrors = function (fn) {
  return new FlatMapErrors(this, fn).setName(this, 'flatMapErrors');
};

// Combine two observables
// -----------------------------------------------------------------------------

// (Stream, Stream|Property) -> Stream
// (Property, Stream|Property) -> Property
Observable.prototype.filterBy = function (other) {
  return filterBy(this, other);
};

// (Stream, Stream|Property, Function|undefiend) -> Stream
// (Property, Stream|Property, Function|undefiend) -> Property
Observable.prototype.sampledBy = function (other, combinator) {
  return sampledBy(this, other, combinator);
};

// (Stream, Stream|Property) -> Stream
// (Property, Stream|Property) -> Property
Observable.prototype.skipUntilBy = function (other) {
  return skipUntilBy(this, other);
};

// (Stream, Stream|Property) -> Stream
// (Property, Stream|Property) -> Property
Observable.prototype.takeUntilBy = function (other) {
  return takeUntilBy(this, other);
};

// Options = {flushOnEnd: boolean|undefined}
// (Stream, Stream|Property, Options|undefined) -> Stream
// (Property, Stream|Property, Options|undefined) -> Property
Observable.prototype.bufferBy = function (other, options) {
  return bufferBy(this, other, options);
};

// Options = {flushOnEnd: boolean|undefined}
// (Stream, Stream|Property, Options|undefined) -> Stream
// (Property, Stream|Property, Options|undefined) -> Property
Observable.prototype.bufferWhileBy = function (other, options) {
  return bufferWhileBy(this, other, options);
};

// Deprecated
// -----------------------------------------------------------------------------

var DEPRECATION_WARNINGS = true;
function dissableDeprecationWarnings() {
  DEPRECATION_WARNINGS = false;
}

function warn(msg) {
  if (DEPRECATION_WARNINGS && console && typeof console.warn === 'function') {
    var msg2 = '\nHere is an Error object for you containing the call stack:';
    console.warn(msg, msg2, new Error());
  }
}

// (Stream|Property, Stream|Property) -> Property
Observable.prototype.awaiting = function (other) {
  warn('You are using deprecated .awaiting() method, see https://github.com/kefirjs/kefir/issues/145');
  return awaiting(this, other);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.valuesToErrors = function (fn) {
  warn('You are using deprecated .valuesToErrors() method, see https://github.com/kefirjs/kefir/issues/149');
  return valuesToErrors(this, fn);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.errorsToValues = function (fn) {
  warn('You are using deprecated .errorsToValues() method, see https://github.com/kefirjs/kefir/issues/149');
  return errorsToValues(this, fn);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.endOnError = function () {
  warn('You are using deprecated .endOnError() method, see https://github.com/kefirjs/kefir/issues/150');
  return endOnError(this);
};

// Exports
// --------------------------------------------------------------------------

var Kefir = {
  Observable: Observable,
  Stream: Stream,
  Property: Property,
  never: never,
  later: later,
  interval: interval,
  sequentially: sequentially,
  fromPoll: fromPoll,
  withInterval: withInterval,
  fromCallback: fromCallback,
  fromNodeCallback: fromNodeCallback,
  fromEvents: fromEvents,
  stream: stream,
  constant: constant,
  constantError: constantError,
  fromPromise: fromPromise,
  fromESObservable: fromESObservable,
  combine: combine,
  zip: zip,
  merge: merge,
  concat: concat$1,
  Pool: Pool,
  pool: pool,
  repeat: repeat,
  staticLand: staticLand
};

Kefir.Kefir = Kefir;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Kefir);


/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js"),
    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ "./node_modules/lodash/_setCacheAdd.js"),
    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ "./node_modules/lodash/_setCacheHas.js");

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/***/ ((module) => {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludes.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayIncludes.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/lodash/_baseIndexOf.js");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_arrayIncludesWith.js ***!
  \***************************************************/
/***/ ((module) => {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "./node_modules/lodash/_arraySome.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseClamp.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClamp.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

module.exports = baseClamp;


/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "./node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "./node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "./node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "./node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "./node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "./node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "./node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "./node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "./node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/lodash/_baseEach.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseEach.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ "./node_modules/lodash/_baseForOwn.js"),
    createBaseEach = __webpack_require__(/*! ./_createBaseEach */ "./node_modules/lodash/_createBaseEach.js");

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),

/***/ "./node_modules/lodash/_baseFilter.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseFilter.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js");

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;


/***/ }),

/***/ "./node_modules/lodash/_baseFindIndex.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseFindIndex.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseFlatten.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isFlattenable = __webpack_require__(/*! ./_isFlattenable */ "./node_modules/lodash/_isFlattenable.js");

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseHas.js ***!
  \*****************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = baseHas;


/***/ }),

/***/ "./node_modules/lodash/_baseHasIn.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseHasIn.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIndexOf.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ "./node_modules/lodash/_baseFindIndex.js"),
    baseIsNaN = __webpack_require__(/*! ./_baseIsNaN */ "./node_modules/lodash/_baseIsNaN.js"),
    strictIndexOf = __webpack_require__(/*! ./_strictIndexOf */ "./node_modules/lodash/_strictIndexOf.js");

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseIntersection.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIntersection.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "./node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "./node_modules/lodash/_arrayIncludesWith.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = [];

  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined;
  }
  array = arrays[0];

  var index = -1,
      seen = caches[0];

  outer:
  while (++index < length && result.length < maxLength) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (!(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator)
        )) {
      othIndex = othLength;
      while (--othIndex) {
        var cache = caches[othIndex];
        if (!(cache
              ? cacheHas(cache, computed)
              : includes(arrays[othIndex], computed, comparator))
            ) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseIntersection;


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/lodash/_baseIsEqual.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ "./node_modules/lodash/_baseIsEqualDeep.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    equalByTag = __webpack_require__(/*! ./_equalByTag */ "./node_modules/lodash/_equalByTag.js"),
    equalObjects = __webpack_require__(/*! ./_equalObjects */ "./node_modules/lodash/_equalObjects.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ "./node_modules/lodash/_baseIsMap.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),

/***/ "./node_modules/lodash/_baseIsMatch.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsMatch.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/lodash/_baseIsEqual.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNaN.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsNaN.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "./node_modules/lodash/_baseIsSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_baseIteratee.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseMatches = __webpack_require__(/*! ./_baseMatches */ "./node_modules/lodash/_baseMatches.js"),
    baseMatchesProperty = __webpack_require__(/*! ./_baseMatchesProperty */ "./node_modules/lodash/_baseMatchesProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    property = __webpack_require__(/*! ./property */ "./node_modules/lodash/property.js");

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_baseMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseMap.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),

/***/ "./node_modules/lodash/_baseMatches.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseMatches.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMatch = __webpack_require__(/*! ./_baseIsMatch */ "./node_modules/lodash/_baseIsMatch.js"),
    getMatchData = __webpack_require__(/*! ./_getMatchData */ "./node_modules/lodash/_getMatchData.js"),
    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ "./node_modules/lodash/_matchesStrictComparable.js");

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),

/***/ "./node_modules/lodash/_baseMatchesProperty.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_baseMatchesProperty.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/lodash/_baseIsEqual.js"),
    get = __webpack_require__(/*! ./get */ "./node_modules/lodash/get.js"),
    hasIn = __webpack_require__(/*! ./hasIn */ "./node_modules/lodash/hasIn.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ "./node_modules/lodash/_isStrictComparable.js"),
    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ "./node_modules/lodash/_matchesStrictComparable.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),

/***/ "./node_modules/lodash/_baseOrderBy.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseOrderBy.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    baseMap = __webpack_require__(/*! ./_baseMap */ "./node_modules/lodash/_baseMap.js"),
    baseSortBy = __webpack_require__(/*! ./_baseSortBy */ "./node_modules/lodash/_baseSortBy.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    compareMultiple = __webpack_require__(/*! ./_compareMultiple */ "./node_modules/lodash/_compareMultiple.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function(iteratee) {
      if (isArray(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;


/***/ }),

/***/ "./node_modules/lodash/_baseProperty.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseProperty.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),

/***/ "./node_modules/lodash/_basePropertyDeep.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_basePropertyDeep.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js");

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),

/***/ "./node_modules/lodash/_basePropertyOf.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_basePropertyOf.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "./node_modules/lodash/_baseSortBy.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseSortBy.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "./node_modules/lodash/_baseTrim.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseTrim.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "./node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_baseValues.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseValues.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js");

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ "./node_modules/lodash/_castArrayLikeObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_castArrayLikeObject.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js");

/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}

module.exports = castArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/_castFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_castFunction.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "./node_modules/lodash/_stringToPath.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_compareAscending.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_compareAscending.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;


/***/ }),

/***/ "./node_modules/lodash/_compareMultiple.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_compareMultiple.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var compareAscending = __webpack_require__(/*! ./_compareAscending */ "./node_modules/lodash/_compareAscending.js");

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_createBaseEach.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createBaseEach.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ "./node_modules/lodash/_createFind.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createFind.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_equalArrays.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arraySome = __webpack_require__(/*! ./_arraySome */ "./node_modules/lodash/_arraySome.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ "./node_modules/lodash/_equalByTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "./node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/lodash/_setToArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ "./node_modules/lodash/_equalObjects.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ "./node_modules/lodash/_escapeHtmlChar.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_escapeHtmlChar.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var basePropertyOf = __webpack_require__(/*! ./_basePropertyOf */ "./node_modules/lodash/_basePropertyOf.js");

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
var escapeHtmlChar = basePropertyOf(htmlEscapes);

module.exports = escapeHtmlChar;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "./node_modules/lodash/_getMatchData.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getMatchData.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ "./node_modules/lodash/_isStrictComparable.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(/*! ./_DataView */ "./node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "./node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "./node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "./node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "./node_modules/lodash/_hasPath.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hasPath.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ "./node_modules/lodash/_cloneDataView.js"),
    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ "./node_modules/lodash/_cloneRegExp.js"),
    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ "./node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_isFlattenable.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/lodash/_isStrictComparable.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash/_isStrictComparable.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_mapToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ "./node_modules/lodash/_matchesStrictComparable.js":
/*!*********************************************************!*\
  !*** ./node_modules/lodash/_matchesStrictComparable.js ***!
  \*********************************************************/
/***/ ((module) => {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoize = __webpack_require__(/*! ./memoize */ "./node_modules/lodash/memoize.js");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_setCacheAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ "./node_modules/lodash/_setCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/***/ ((module) => {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "./node_modules/lodash/_strictIndexOf.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_strictIndexOf.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ "./node_modules/lodash/_memoizeCapped.js");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "./node_modules/lodash/_trimmedEndIndex.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_trimmedEndIndex.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "./node_modules/lodash/before.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/before.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', _.before(5, addContactToList));
 * // => Allows adding up to 4 contacts to the list.
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}

module.exports = before;


/***/ }),

/***/ "./node_modules/lodash/clone.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/clone.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseClone = __webpack_require__(/*! ./_baseClone */ "./node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}

module.exports = clone;


/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "./node_modules/lodash/each.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/each.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./forEach */ "./node_modules/lodash/forEach.js");


/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "./node_modules/lodash/escape.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/escape.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var escapeHtmlChar = __webpack_require__(/*! ./_escapeHtmlChar */ "./node_modules/lodash/_escapeHtmlChar.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"']/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;


/***/ }),

/***/ "./node_modules/lodash/filter.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/filter.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    baseFilter = __webpack_require__(/*! ./_baseFilter */ "./node_modules/lodash/_baseFilter.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 *
 * // Combining several predicates using `_.overEvery` or `_.overSome`.
 * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
 * // => objects for ['fred', 'barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;


/***/ }),

/***/ "./node_modules/lodash/find.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/find.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createFind = __webpack_require__(/*! ./_createFind */ "./node_modules/lodash/_createFind.js"),
    findIndex = __webpack_require__(/*! ./findIndex */ "./node_modules/lodash/findIndex.js");

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;


/***/ }),

/***/ "./node_modules/lodash/findIndex.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/findIndex.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ "./node_modules/lodash/_baseFindIndex.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;


/***/ }),

/***/ "./node_modules/lodash/flatten.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/flatten.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "./node_modules/lodash/_baseFlatten.js");

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),

/***/ "./node_modules/lodash/forEach.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/forEach.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js"),
    castFunction = __webpack_require__(/*! ./_castFunction */ "./node_modules/lodash/_castFunction.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;


/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js");

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ "./node_modules/lodash/has.js":
/*!************************************!*\
  !*** ./node_modules/lodash/has.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseHas = __webpack_require__(/*! ./_baseHas */ "./node_modules/lodash/_baseHas.js"),
    hasPath = __webpack_require__(/*! ./_hasPath */ "./node_modules/lodash/_hasPath.js");

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

module.exports = has;


/***/ }),

/***/ "./node_modules/lodash/hasIn.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/hasIn.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseHasIn = __webpack_require__(/*! ./_baseHasIn */ "./node_modules/lodash/_baseHasIn.js"),
    hasPath = __webpack_require__(/*! ./_hasPath */ "./node_modules/lodash/_hasPath.js");

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/lodash/includes.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/includes.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/lodash/_baseIndexOf.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isString = __webpack_require__(/*! ./isString */ "./node_modules/lodash/isString.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js"),
    values = __webpack_require__(/*! ./values */ "./node_modules/lodash/values.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;


/***/ }),

/***/ "./node_modules/lodash/intersection.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/intersection.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseIntersection = __webpack_require__(/*! ./_baseIntersection */ "./node_modules/lodash/_baseIntersection.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    castArrayLikeObject = __webpack_require__(/*! ./_castArrayLikeObject */ "./node_modules/lodash/_castArrayLikeObject.js");

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersection([2, 1], [2, 3]);
 * // => [2]
 */
var intersection = baseRest(function(arrays) {
  var mapped = arrayMap(arrays, castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : [];
});

module.exports = intersection;


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/lodash/isMap.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ "./node_modules/lodash/_baseIsMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSet.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ "./node_modules/lodash/_baseIsSet.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),

/***/ "./node_modules/lodash/isString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isString.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/lodash/last.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/last.js ***!
  \*************************************/
/***/ ((module) => {

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;


/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ "./node_modules/lodash/noop.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/noop.js ***!
  \*************************************/
/***/ ((module) => {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "./node_modules/lodash/once.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/once.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var before = __webpack_require__(/*! ./before */ "./node_modules/lodash/before.js");

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */
function once(func) {
  return before(2, func);
}

module.exports = once;


/***/ }),

/***/ "./node_modules/lodash/property.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/property.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseProperty = __webpack_require__(/*! ./_baseProperty */ "./node_modules/lodash/_baseProperty.js"),
    basePropertyDeep = __webpack_require__(/*! ./_basePropertyDeep */ "./node_modules/lodash/_basePropertyDeep.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),

/***/ "./node_modules/lodash/sortBy.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/sortBy.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "./node_modules/lodash/_baseFlatten.js"),
    baseOrderBy = __webpack_require__(/*! ./_baseOrderBy */ "./node_modules/lodash/_baseOrderBy.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

module.exports = sortBy;


/***/ }),

/***/ "./node_modules/lodash/startsWith.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/startsWith.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseClamp = __webpack_require__(/*! ./_baseClamp */ "./node_modules/lodash/_baseClamp.js"),
    baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Checks if `string` starts with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @example
 *
 * _.startsWith('abc', 'a');
 * // => true
 *
 * _.startsWith('abc', 'b');
 * // => false
 *
 * _.startsWith('abc', 'b', 1);
 * // => true
 */
function startsWith(string, target, position) {
  string = toString(string);
  position = position == null
    ? 0
    : baseClamp(toInteger(position), 0, string.length);

  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}

module.exports = startsWith;


/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/lodash/toFinite.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toFinite.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),

/***/ "./node_modules/lodash/toInteger.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/toInteger.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toFinite = __webpack_require__(/*! ./toFinite */ "./node_modules/lodash/toFinite.js");

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "./node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "./node_modules/lodash/values.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/values.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseValues = __webpack_require__(/*! ./_baseValues */ "./node_modules/lodash/_baseValues.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),

/***/ "./node_modules/map-indexed-xf/js/index.js":
/*!*************************************************!*\
  !*** ./node_modules/map-indexed-xf/js/index.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = mapIndexed;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var MapIndexed =
/*#__PURE__*/
function () {
  function MapIndexed(f, xform) {
    (0, _classCallCheck2.default)(this, MapIndexed);
    this.f = f;
    this.xform = xform;
    this.i = -1;
  }

  (0, _createClass2.default)(MapIndexed, [{
    key: '@@transducer/init',
    value: function transducerInit() {
      return this.xform['@@transducer/init']();
    }
  }, {
    key: '@@transducer/result',
    value: function transducerResult(v) {
      return this.xform['@@transducer/result'](v);
    }
  }, {
    key: '@@transducer/step',
    value: function transducerStep(res, input) {
      this.i++;
      return this.xform['@@transducer/step'](res, this.f(input, this.i));
    }
  }]);
  return MapIndexed;
}();

function mapIndexed(f) {
  return function (xform) {
    return new MapIndexed(f, xform);
  };
}

module.exports = exports.default;
module.exports["default"] = exports.default;


/***/ }),

/***/ "./node_modules/pdelay/js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/pdelay/js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = delay;

function delay(time, value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, time);
  });
}


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/transducers.js/transducers.js":
/*!****************************************************!*\
  !*** ./node_modules/transducers.js/transducers.js ***!
  \****************************************************/
/***/ ((module) => {


// basic protocol helpers

var symbolExists = typeof Symbol !== 'undefined';

var protocols = {
  iterator: symbolExists ? Symbol.iterator : '@@iterator'
};

function throwProtocolError(name, coll) {
  throw new Error("don't know how to " + name + " collection: " +
                  coll);
}

function fulfillsProtocol(obj, name) {
  if(name === 'iterator') {
    // Accept ill-formed iterators that don't conform to the
    // protocol by accepting just next()
    return obj[protocols.iterator] || obj.next;
  }

  return obj[protocols[name]];
}

function getProtocolProperty(obj, name) {
  return obj[protocols[name]];
}

function iterator(coll) {
  var iter = getProtocolProperty(coll, 'iterator');
  if(iter) {
    return iter.call(coll);
  }
  else if(coll.next) {
    // Basic duck typing to accept an ill-formed iterator that doesn't
    // conform to the iterator protocol (all iterators should have the
    // @@iterator method and return themselves, but some engines don't
    // have that on generators like older v8)
    return coll;
  }
  else if(isArray(coll)) {
    return new ArrayIterator(coll);
  }
  else if(isObject(coll)) {
    return new ObjectIterator(coll);
  }
}

function ArrayIterator(arr) {
  this.arr = arr;
  this.index = 0;
}

ArrayIterator.prototype.next = function() {
  if(this.index < this.arr.length) {
    return {
      value: this.arr[this.index++],
      done: false
    };
  }
  return {
    done: true
  }
};

function ObjectIterator(obj) {
  this.obj = obj;
  this.keys = Object.keys(obj);
  this.index = 0;
}

ObjectIterator.prototype.next = function() {
  if(this.index < this.keys.length) {
    var k = this.keys[this.index++];
    return {
      value: [k, this.obj[k]],
      done: false
    };
  }
  return {
    done: true
  }
};

// helpers

var toString = Object.prototype.toString;
var isArray = typeof Array.isArray === 'function' ? Array.isArray : function(obj) {
  return toString.call(obj) == '[object Array]';
};

function isFunction(x) {
  return typeof x === 'function';
}

function isObject(x) {
  return x instanceof Object &&
    Object.getPrototypeOf(x) === Object.getPrototypeOf({});
}

function isNumber(x) {
  return typeof x === 'number';
}

function Reduced(value) {
  this['@@transducer/reduced'] = true;
  this['@@transducer/value'] = value;
}

function isReduced(x) {
  return (x instanceof Reduced) || (x && x['@@transducer/reduced']);
}

function deref(x) {
  return x['@@transducer/value'];
}

/**
 * This is for transforms that may call their nested transforms before
 * Reduced-wrapping the result (e.g. "take"), to avoid nested Reduced.
 */
function ensureReduced(val) {
  if(isReduced(val)) {
    return val;
  } else {
    return new Reduced(val);
  }
}

/**
 * This is for tranforms that call their nested transforms when
 * performing completion (like "partition"), to avoid signaling
 * termination after already completing.
 */
function ensureUnreduced(v) {
  if(isReduced(v)) {
    return deref(v);
  } else {
    return v;
  }
}

function reduce(coll, xform, init) {
  if(isArray(coll)) {
    var result = init;
    var index = -1;
    var len = coll.length;
    while(++index < len) {
      result = xform['@@transducer/step'](result, coll[index]);
      if(isReduced(result)) {
        result = deref(result);
        break;
      }
    }
    return xform['@@transducer/result'](result);
  }
  else if(isObject(coll) || fulfillsProtocol(coll, 'iterator')) {
    var result = init;
    var iter = iterator(coll);
    var val = iter.next();
    while(!val.done) {
      result = xform['@@transducer/step'](result, val.value);
      if(isReduced(result)) {
        result = deref(result);
        break;
      }
      val = iter.next();
    }
    return xform['@@transducer/result'](result);
  }
  throwProtocolError('iterate', coll);
}

function transduce(coll, xform, reducer, init) {
  xform = xform(reducer);
  if(init === undefined) {
    init = xform['@@transducer/init']();
  }
  return reduce(coll, xform, init);
}

function compose() {
  var funcs = Array.prototype.slice.call(arguments);
  return function(r) {
    var value = r;
    for(var i=funcs.length-1; i>=0; i--) {
      value = funcs[i](value);
    }
    return value;
  }
}

// transformations

function transformer(f) {
  var t = {};
  t['@@transducer/init'] = function() {
    throw new Error('init value unavailable');
  };
  t['@@transducer/result'] = function(v) {
    return v;
  };
  t['@@transducer/step'] = f;
  return t;
}

function bound(f, ctx, count) {
  count = count != null ? count : 1;

  if(!ctx) {
    return f;
  }
  else {
    switch(count) {
    case 1:
      return function(x) {
        return f.call(ctx, x);
      }
    case 2:
      return function(x, y) {
        return f.call(ctx, x, y);
      }
    default:
      return f.bind(ctx);
    }
  }
}

function arrayMap(arr, f, ctx) {
  var index = -1;
  var length = arr.length;
  var result = Array(length);
  f = bound(f, ctx, 2);

  while (++index < length) {
    result[index] = f(arr[index], index);
  }
  return result;
}

function arrayFilter(arr, f, ctx) {
  var len = arr.length;
  var result = [];
  f = bound(f, ctx, 2);

  for(var i=0; i<len; i++) {
    if(f(arr[i], i)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function Map(f, xform) {
  this.xform = xform;
  this.f = f;
}

Map.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Map.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Map.prototype['@@transducer/step'] = function(res, input) {
  return this.xform['@@transducer/step'](res, this.f(input));
};

function map(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if(coll) {
    if(isArray(coll)) {
      return arrayMap(coll, f, ctx);
    }
    return seq(coll, map(f));
  }

  return function(xform) {
    return new Map(f, xform);
  }
}

function Filter(f, xform) {
  this.xform = xform;
  this.f = f;
}

Filter.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Filter.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Filter.prototype['@@transducer/step'] = function(res, input) {
  if(this.f(input)) {
    return this.xform['@@transducer/step'](res, input);
  }
  return res;
};

function filter(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if(coll) {
    if(isArray(coll)) {
      return arrayFilter(coll, f, ctx);
    }
    return seq(coll, filter(f));
  }

  return function(xform) {
    return new Filter(f, xform);
  };
}

function remove(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);
  return filter(coll, function(x) { return !f(x); });
}

function keep(coll) {
  return filter(coll, function(x) { return x != null });
}

function Dedupe(xform) {
  this.xform = xform;
  this.last = undefined;
}

Dedupe.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Dedupe.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Dedupe.prototype['@@transducer/step'] = function(result, input) {
  if(input !== this.last) {
    this.last = input;
    return this.xform['@@transducer/step'](result, input);
  }
  return result;
};

function dedupe(coll) {
  if(coll) {
    return seq(coll, dedupe());
  }

  return function(xform) {
    return new Dedupe(xform);
  }
}

function TakeWhile(f, xform) {
  this.xform = xform;
  this.f = f;
}

TakeWhile.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

TakeWhile.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

TakeWhile.prototype['@@transducer/step'] = function(result, input) {
  if(this.f(input)) {
    return this.xform['@@transducer/step'](result, input);
  }
  return new Reduced(result);
};

function takeWhile(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if(coll) {
    return seq(coll, takeWhile(f));
  }

  return function(xform) {
    return new TakeWhile(f, xform);
  }
}

function Take(n, xform) {
  this.n = n;
  this.i = 0;
  this.xform = xform;
}

Take.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Take.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Take.prototype['@@transducer/step'] = function(result, input) {
  if (this.i < this.n) {
    result = this.xform['@@transducer/step'](result, input);
    if(this.i + 1 >= this.n) {
      // Finish reducing on the same step as the final value. TODO:
      // double-check that this doesn't break any semantics
      result = ensureReduced(result);
    }
  }
  this.i++;
  return result;
};

function take(coll, n) {
  if(isNumber(coll)) { n = coll; coll = null }

  if(coll) {
    return seq(coll, take(n));
  }

  return function(xform) {
    return new Take(n, xform);
  }
}

function Drop(n, xform) {
  this.n = n;
  this.i = 0;
  this.xform = xform;
}

Drop.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Drop.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Drop.prototype['@@transducer/step'] = function(result, input) {
  if(this.i++ < this.n) {
    return result;
  }
  return this.xform['@@transducer/step'](result, input);
};

function drop(coll, n) {
  if(isNumber(coll)) { n = coll; coll = null }

  if(coll) {
    return seq(coll, drop(n));
  }

  return function(xform) {
    return new Drop(n, xform);
  }
}

function DropWhile(f, xform) {
  this.xform = xform;
  this.f = f;
  this.dropping = true;
}

DropWhile.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

DropWhile.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

DropWhile.prototype['@@transducer/step'] = function(result, input) {
  if(this.dropping) {
    if(this.f(input)) {
      return result;
    }
    else {
      this.dropping = false;
    }
  }
  return this.xform['@@transducer/step'](result, input);
};

function dropWhile(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if(coll) {
    return seq(coll, dropWhile(f));
  }

  return function(xform) {
    return new DropWhile(f, xform);
  }
}

function Partition(n, xform) {
  this.n = n;
  this.i = 0;
  this.xform = xform;
  this.part = new Array(n);
}

Partition.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Partition.prototype['@@transducer/result'] = function(v) {
  if (this.i > 0) {
    return ensureUnreduced(this.xform['@@transducer/step'](v, this.part.slice(0, this.i)));
  }
  return this.xform['@@transducer/result'](v);
};

Partition.prototype['@@transducer/step'] = function(result, input) {
  this.part[this.i] = input;
  this.i += 1;
  if (this.i === this.n) {
    var out = this.part.slice(0, this.n);
    this.part = new Array(this.n);
    this.i = 0;
    return this.xform['@@transducer/step'](result, out);
  }
  return result;
};

function partition(coll, n) {
  if (isNumber(coll)) {
    n = coll; coll = null;
  }

  if (coll) {
    return seq(coll, partition(n));
  }

  return function(xform) {
    return new Partition(n, xform);
  };
}

var NOTHING = {};

function PartitionBy(f, xform) {
  // TODO: take an "opts" object that allows the user to specify
  // equality
  this.f = f;
  this.xform = xform;
  this.part = [];
  this.last = NOTHING;
}

PartitionBy.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

PartitionBy.prototype['@@transducer/result'] = function(v) {
  var l = this.part.length;
  if (l > 0) {
    return ensureUnreduced(this.xform['@@transducer/step'](v, this.part.slice(0, l)));
  }
  return this.xform['@@transducer/result'](v);
};

PartitionBy.prototype['@@transducer/step'] = function(result, input) {
  var current = this.f(input);
  if (current === this.last || this.last === NOTHING) {
    this.part.push(input);
  } else {
    result = this.xform['@@transducer/step'](result, this.part);
    this.part = [input];
  }
  this.last = current;
  return result;
};

function partitionBy(coll, f, ctx) {
  if (isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if (coll) {
    return seq(coll, partitionBy(f));
  }

  return function(xform) {
    return new PartitionBy(f, xform);
  };
}

function Interpose(sep, xform) {
  this.sep = sep;
  this.xform = xform;
  this.started = false;
}

Interpose.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Interpose.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Interpose.prototype['@@transducer/step'] = function(result, input) {
  if (this.started) {
    var withSep = this.xform['@@transducer/step'](result, this.sep);
    if (isReduced(withSep)) {
      return withSep;
    } else {
      return this.xform['@@transducer/step'](withSep, input);
    }
  } else {
    this.started = true;
    return this.xform['@@transducer/step'](result, input);
  }
};

/**
 * Returns a new collection containing elements of the given
 * collection, separated by the specified separator. Returns a
 * transducer if a collection is not provided.
 */
function interpose(coll, separator) {
  if (arguments.length === 1) {
    separator = coll;
    return function(xform) {
      return new Interpose(separator, xform);
    };
  }
  return seq(coll, interpose(separator));
}

function Repeat(n, xform) {
  this.xform = xform;
  this.n = n;
}

Repeat.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Repeat.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Repeat.prototype['@@transducer/step'] = function(result, input) {
  var n = this.n;
  var r = result;
  for (var i = 0; i < n; i++) {
    r = this.xform['@@transducer/step'](r, input);
    if (isReduced(r)) {
      break;
    }
  }
  return r;
};

/**
 * Returns a new collection containing elements of the given
 * collection, each repeated n times. Returns a transducer if a
 * collection is not provided.
 */
function repeat(coll, n) {
  if (arguments.length === 1) {
    n = coll;
    return function(xform) {
      return new Repeat(n, xform);
    };
  }
  return seq(coll, repeat(n));
}

function TakeNth(n, xform) {
  this.xform = xform;
  this.n = n;
  this.i = -1;
}

TakeNth.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

TakeNth.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

TakeNth.prototype['@@transducer/step'] = function(result, input) {
  this.i += 1;
  if (this.i % this.n === 0) {
    return this.xform['@@transducer/step'](result, input);
  }
  return result;
};

/**
 * Returns a new collection of every nth element of the given
 * collection. Returns a transducer if a collection is not provided.
 */
function takeNth(coll, nth) {
  if (arguments.length === 1) {
    nth = coll;
    return function(xform) {
      return new TakeNth(nth, xform);
    };
  }
  return seq(coll, takeNth(nth));
}

// pure transducers (cannot take collections)

function Cat(xform) {
  this.xform = xform;
}

Cat.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Cat.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Cat.prototype['@@transducer/step'] = function(result, input) {
  var xform = this.xform;
  var newxform = {};
  newxform['@@transducer/init'] = function() {
    return xform['@@transducer/init']();
  };
  newxform['@@transducer/result'] = function(v) {
    return v;
  };
  newxform['@@transducer/step'] = function(result, input) {
    var val = xform['@@transducer/step'](result, input);
    return isReduced(val) ? deref(val) : val;
  };

  return reduce(input, newxform, result);
};

function cat(xform) {
  return new Cat(xform);
}

function mapcat(f, ctx) {
  f = bound(f, ctx);
  return compose(map(f), cat);
}

// collection helpers

function push(arr, x) {
  arr.push(x);
  return arr;
}

function merge(obj, x) {
  if(isArray(x) && x.length === 2) {
    obj[x[0]] = x[1];
  }
  else {
    var keys = Object.keys(x);
    var len = keys.length;
    for(var i=0; i<len; i++) {
      obj[keys[i]] = x[keys[i]];
    }
  }
  return obj;
}

var arrayReducer = {};
arrayReducer['@@transducer/init'] = function() {
  return [];
};
arrayReducer['@@transducer/result'] = function(v) {
  return v;
};
arrayReducer['@@transducer/step'] = push;

var objReducer = {};
objReducer['@@transducer/init'] = function() {
  return {};
};
objReducer['@@transducer/result'] = function(v) {
  return v;
};
objReducer['@@transducer/step'] = merge;

// building new collections

function toArray(coll, xform) {
  if(!xform) {
    return reduce(coll, arrayReducer, []);
  }
  return transduce(coll, xform, arrayReducer, []);
}

function toObj(coll, xform) {
  if(!xform) {
    return reduce(coll, objReducer, {});
  }
  return transduce(coll, xform, objReducer, {});
}

function toIter(coll, xform) {
  if(!xform) {
    return iterator(coll);
  }
  return new LazyTransformer(xform, coll);
}

function seq(coll, xform) {
  if(isArray(coll)) {
    return transduce(coll, xform, arrayReducer, []);
  }
  else if(isObject(coll)) {
    return transduce(coll, xform, objReducer, {});
  }
  else if(coll['@@transducer/step']) {
    var init;
    if(coll['@@transducer/init']) {
      init = coll['@@transducer/init']();
    }
    else {
      init = new coll.constructor();
    }

    return transduce(coll, xform, coll, init);
  }
  else if(fulfillsProtocol(coll, 'iterator')) {
    return new LazyTransformer(xform, coll);
  }
  throwProtocolError('sequence', coll);
}

function into(to, xform, from) {
  if(isArray(to)) {
    return transduce(from, xform, arrayReducer, to);
  }
  else if(isObject(to)) {
    return transduce(from, xform, objReducer, to);
  }
  else if(to['@@transducer/step']) {
    return transduce(from,
                     xform,
                     to,
                     to);
  }
  throwProtocolError('into', to);
}

// laziness

var stepper = {};
stepper['@@transducer/result'] = function(v) {
  return isReduced(v) ? deref(v) : v;
};
stepper['@@transducer/step'] = function(lt, x) {
  lt.items.push(x);
  return lt.rest;
};

function Stepper(xform, iter) {
  this.xform = xform(stepper);
  this.iter = iter;
}

Stepper.prototype['@@transducer/step'] = function(lt) {
  var len = lt.items.length;
  while(lt.items.length === len) {
    var n = this.iter.next();
    if(n.done || isReduced(n.value)) {
      // finalize
      this.xform['@@transducer/result'](this);
      break;
    }

    // step
    this.xform['@@transducer/step'](lt, n.value);
  }
}

function LazyTransformer(xform, coll) {
  this.iter = iterator(coll);
  this.items = [];
  this.stepper = new Stepper(xform, iterator(coll));
}

LazyTransformer.prototype[protocols.iterator] = function() {
  return this;
}

LazyTransformer.prototype.next = function() {
  this['@@transducer/step']();

  if(this.items.length) {
    return {
      value: this.items.pop(),
      done: false
    }
  }
  else {
    return { done: true };
  }
};

LazyTransformer.prototype['@@transducer/step'] = function() {
  if(!this.items.length) {
    this.stepper['@@transducer/step'](this);
  }
}

// util

function range(n) {
  var arr = new Array(n);
  for(var i=0; i<arr.length; i++) {
    arr[i] = i;
  }
  return arr;
}

module.exports = {
  reduce: reduce,
  transformer: transformer,
  Reduced: Reduced,
  isReduced: isReduced,
  iterator: iterator,
  push: push,
  merge: merge,
  transduce: transduce,
  seq: seq,
  toArray: toArray,
  toObj: toObj,
  toIter: toIter,
  into: into,
  compose: compose,
  map: map,
  filter: filter,
  remove: remove,
  cat: cat,
  mapcat: mapcat,
  keep: keep,
  dedupe: dedupe,
  take: take,
  takeWhile: takeWhile,
  takeNth: takeNth,
  drop: drop,
  dropWhile: dropWhile,
  partition: partition,
  partitionBy: partitionBy,
  interpose: interpose,
  repeat: repeat,
  range: range,

  LazyTransformer: LazyTransformer
};


/***/ }),

/***/ "./node_modules/ud/js/index.js":
/*!*************************************!*\
  !*** ./node_modules/ud/js/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defn = defn;
exports.defobj = defobj;
exports.defonce = defonce;
exports.markReloadable = markReloadable;
var range = __webpack_require__(/*! array-range */ "./node_modules/array-range/index.js");
var zipObject = __webpack_require__(/*! zip-object */ "./node_modules/zip-object/index.js");
var moduleUsedUdKeys = new WeakMap();
function markReloadable(module) {
  if (module.hot) {
    module.hot.accept();
  }
}
function defonce(module, fn) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  markReloadable(module);
  var usedKeys = moduleUsedUdKeys.get(module);
  if (!usedKeys) {
    usedKeys = new Set();
    moduleUsedUdKeys.set(module, usedKeys);
  }
  if (usedKeys.has(key)) {
    throw new Error('ud functions can only be used once per module with a given key');
  }
  usedKeys.add(key);
  var valueWasSet = false;
  var value = undefined;
  if (module.hot) {
    if (module.hot.data && module.hot.data.__ud__ && Object.prototype.hasOwnProperty.call(module.hot.data.__ud__, key)) {
      value = module.hot.data.__ud__[key];
      valueWasSet = true;
    }
    module.hot.dispose(function (data) {
      if (!data.__ud__) data.__ud__ = {};
      data.__ud__[key] = value;
    });
  }
  if (!valueWasSet) value = fn();
  return value;
}
function defobj(module, object) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var sharedObject = defonce(module, function () {
    return object;
  }, '--defobj-' + key);
  if (sharedObject !== object) {
    cloneOntoTarget(sharedObject, object);
  }
  return sharedObject;
}

// Assigns all properties of object onto target, and deletes any properties
// from target that don't exist on object. The optional blacklist argument
// specifies properties to not assign on target.
function cloneOntoTarget(target, object) {
  Object.getOwnPropertyNames(target).filter(function (name) {
    return !Object.prototype.hasOwnProperty.call(object, name);
  }).forEach(function (name) {
    delete target[name];
  });
  var newPropsChain = Object.getOwnPropertyNames(object);
  Object.defineProperties(target, zipObject(newPropsChain, newPropsChain.map(function (name) {
    return Object.getOwnPropertyDescriptor(object, name);
  }).filter(Boolean).map(function (_ref) {
    var value = _ref.value,
      enumerable = _ref.enumerable;
    return {
      value: value,
      enumerable: enumerable,
      writable: true,
      configurable: true
    };
  })));
  return target;
}
function defn(module, fn) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var shared = defonce(module, function () {
    if (!module.hot) {
      return {
        fn: null,
        wrapper: fn
      };
    }
    var shared = {
      fn: null,
      wrapper: null
    };
    var paramsList = range(fn.length).map(function (x) {
      return 'a' + x;
    }).join(',');
    shared.wrapper = new Function('shared', "\n      'use strict';\n      return function ".concat(fn.name, "__ud_wrapper(").concat(paramsList, ") {\n        if (new.target) {\n          return Reflect.construct(shared.fn, arguments, new.target);\n        } else {\n          return shared.fn.apply(this, arguments);\n        }\n      };\n      "))(shared);
    if (fn.prototype) {
      shared.wrapper.prototype = Object.create(fn.prototype);
      shared.wrapper.prototype.constructor = shared.wrapper;
    } else {
      shared.wrapper.prototype = fn.prototype;
    }
    return shared;
  }, '--defn-shared-' + key);
  shared.fn = fn;
  if (module.hot) {
    if (fn.prototype && shared.wrapper.prototype && Object.getPrototypeOf(shared.wrapper.prototype) !== fn.prototype) {
      Object.setPrototypeOf(shared.wrapper.prototype, fn.prototype);
    }
    Object.setPrototypeOf(shared.wrapper, fn);
  }
  return shared.wrapper;
}


/***/ }),

/***/ "./node_modules/zip-object/index.js":
/*!******************************************!*\
  !*** ./node_modules/zip-object/index.js ***!
  \******************************************/
/***/ ((module) => {

var zipObject = function (keys, values) {
  if (arguments.length == 1) {
    values = keys[1];
    keys = keys[0];
  }
    
  var result = {};
  var i = 0;
  
  for (i; i < keys.length; i += 1) {
    result[keys[i]] = values[i];
  }
  
  return result;
};

module.exports = zipObject;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/***/ ((module) => {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/***/ ((module) => {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/toPrimitive.js");
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/injected-js/main.ts ***!
  \*********************************/
/* eslint-disable @typescript-eslint/no-var-requires */

// Protections against https://github.com/w3c/webextensions/issues/8 before
// running for browsers that don't support the documentIds option to
// scripting.executeScript():
// 1. Check the page URL to make sure the page hasn't been navigated away from
//    Gmail since the injection was requested.
// 2. Check that the document.head attribute the InboxSDK sets in the document
//    before injection is present, to make sure we're not in the situation where
//    the page has refreshed since the injection was requested and a new
//    injection was not requested yet.
// 3. Check that a global variable this script sets is not already set to make
//    sure this script isn't running twice, to make sure we don't run twice if
//    we're in the situation where the page has refreshed since the injection
//    was requested and another injection was requested too.
const pageOrigin =  false || document.location.origin;
if (pageOrigin !== 'https://mail.google.com') {
  throw new Error("Should not happen: InboxSDK pageWorld.js running in document that didn't request it.");
}
if (!document.head?.hasAttribute('data-inboxsdk-script-injected')) {
  throw new Error("Should not happen: InboxSDK pageWorld.js running in document that didn't request it.");
}
if (!__webpack_require__.g.__InboxSDKInjected) {
  __webpack_require__.g.__InboxSDKInjected = true;
  const logger = __webpack_require__(/*! ./injected-logger */ "./src/injected-js/injected-logger.ts");
  let oldDefine;
  try {
    if ( true && __webpack_require__.amdD && __webpack_require__.amdO) {
      // work around amd compatibility issue
      // https://groups.google.com/forum/#!msg/inboxsdk/U_bq82Exmwc/I3iIinxxCAAJ
      oldDefine = __webpack_require__.amdD;
      __webpack_require__.amdD = null;
    }
    const extCorbWorkaroundPageWorld = __webpack_require__(/*! ext-corb-workaround/dist/src/pageWorld */ "./node_modules/ext-corb-workaround/dist/src/pageWorld.js");
    const xhrHelper = (__webpack_require__(/*! ./xhr-helper */ "./src/injected-js/xhr-helper.ts")["default"]);
    const setupDataExposer = (__webpack_require__(/*! ./setup-data-exposer */ "./src/injected-js/setup-data-exposer.ts")["default"]);
    const setupEventReemitter = (__webpack_require__(/*! ./setup-event-reemitter */ "./src/injected-js/setup-event-reemitter.ts")["default"]);
    const setupErrorSilencer = (__webpack_require__(/*! ./setup-error-silencer */ "./src/injected-js/setup-error-silencer.ts")["default"]);
    const setupCustomViewEventAssassin = (__webpack_require__(/*! ./setupCustomViewEventAssassin */ "./src/injected-js/setupCustomViewEventAssassin.ts")["default"]);
    const setupPushStateListener = (__webpack_require__(/*! ./setupPushStateListener */ "./src/injected-js/setupPushStateListener.ts")["default"]);
    const setupInboxCustomViewLinkFixer = (__webpack_require__(/*! ./setupInboxCustomViewLinkFixer */ "./src/injected-js/setupInboxCustomViewLinkFixer.ts")["default"]);
    const gmailInterceptor = (__webpack_require__(/*! ./gmail/setup-gmail-interceptor */ "./src/injected-js/gmail/setup-gmail-interceptor.ts")["default"]);
    const setupGmonkeyHandler = (__webpack_require__(/*! ./gmail/setup-gmonkey-handler */ "./src/injected-js/gmail/setup-gmonkey-handler.ts")["default"]);
    gmailInterceptor();
    setupGmonkeyHandler();
    extCorbWorkaroundPageWorld.init();
    xhrHelper();
    setupDataExposer();
    setupEventReemitter();
    setupErrorSilencer();
    setupCustomViewEventAssassin();
    setupPushStateListener();
    setupInboxCustomViewLinkFixer();
  } catch (err) {
    logger.error(err);
  } finally {
    if (oldDefine) {
      __webpack_require__.amdD = oldDefine;
    }
  }
}
})();

/******/ })()
;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d19751e6-2fca-5e58-9bea-e6aa5dccf150")}catch(e){}}();
//# sourceMappingURL=pageWorld.js.map
//# debugId=d19751e6-2fca-5e58-9bea-e6aa5dccf150
