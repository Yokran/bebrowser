function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var browser = Worker;

var Worker$1 = /*@__PURE__*/getDefaultExportFromCjs(browser);

class DiffWorker {
  constructor({ url, module = true } = {}) {
    // module worker supports esm
    this.url = url;
    this.module = module;
    this.promises = {};
    this.ready = false;
    this.messageCounter = 0;
    this.initCalled = false;
  }

  async init(){
    if(this.initCalled) return;
    this.initCalled = true;
    this.worker = new Worker$1(this.url, { type: this.module ? 'module' : 'classic' });
    this.worker.onerror = (error) => {
      console.log(`Worker error: ${error.message}`);
      throw error;
    };
    this.attachListener();
    await this.ping();
    this.ready = true;
  }

  attachListener() {
    this.worker.addEventListener('message', (event) => {
      const [id, result] = event.data;
      const { resolve, reject } = this.promises[id];
      delete this.promises[id];
      if (result.error) {
        return reject(new Error(result.error));
      }
      resolve(result);
    });
  }

  // expected arguments: [ operation, params : Array<Any>]
  // postMessage will add the id to the end of the params array
  // which is used to keep track of resolve, reject for the promise
  async postMessage(args) {
    const id = this.messageCounter++;
    args.push(id);
    this.worker.postMessage(args);
    return new Promise((resolve, reject) => (this.promises[id] = { resolve, reject }));
  }

  async diff(data1, data2, opts) {
    return this.postMessage(['diff', [ data1, data2, opts ]])
  }

  async diffAndRender(data1, data2, opts) {
    return this.postMessage(['diffAndRender', [ data1, data2, opts ]])
  }

  async diffAndRenderEmail(data1, data2, opts) {
    return this.postMessage(['diffAndRenderEmail', [ data1, data2, opts ]])
  }

  async diffAndRenderForSummary(data1, data2, opts) {
    return this.postMessage(['diffAndRenderForSummary', [ data1, data2, opts ]])
  }

  async ping(){
    return this.postMessage(['ping', null ]);
  }
}

globalThis.DiffWorker = DiffWorker;
globalThis.DIFF_DELETE = -1;
globalThis.DIFF_INSERT = 1;
globalThis.DIFF_EQUAL = 0;

export { DiffWorker as default };
