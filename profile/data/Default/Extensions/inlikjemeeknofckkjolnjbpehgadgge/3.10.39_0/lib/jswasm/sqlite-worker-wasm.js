
/*
NOTE: Do not edit. This is an auto-generated file. All changes will be lost!
*/


function sqliteExtendDB(db) {
  let rows = [];
  var g_RegExpString = null;
  var g_RegExp = null;

  const dbFunctions = {
    REGEXP: {
      name: 'REGEXP',
      arity: 2,
      xFunc: function (val, pattern, value) {
        let ans = new RegExp(pattern).test(value);
        return ans;
      },
      onFunctionCall: function (val) {
        if (g_RegExp == null || val.getString(0) != g_RegExpString) {
          g_RegExpString = val.getString(0);
          g_RegExp = new RegExp(g_RegExpString);
        }
        if (val.getString(1).match(g_RegExp)) return 1;
        else return 0;
      }
    }
  };
  db.createFunction(dbFunctions.REGEXP);
}
;
"use strict";
{
  const urlParams = globalThis.location
    ? new URL(globalThis.location.href).searchParams
    : new URLSearchParams();
  let theJs = 'sqlite3.js';
  if (urlParams.has('sqlite3.dir')) {
    theJs = urlParams.get('sqlite3.dir') + '/' + theJs;
  }

  importScripts(theJs);
}


const ctx = self;

class Logger {
  constructor(prefix = "sqlite-worker", isLoggingEnabled = true) {
    this.prefix = prefix;
    this.isLoggingEnabled = isLoggingEnabled;
  }

  debug(...args) {
    if (this.isLoggingEnabled) {
      console.log(this.prefix, ...args);
    }
  }

  warn(...args) {
    if (this.isLoggingEnabled) {
      console.warn(this.prefix, ...args);
    }
  }

  error(...args) {
    if (this.isLoggingEnabled || true) {
      console.error(this.prefix, ...args);
    }
  }
}

class SerializableError extends Error {

  /**
   * @type {{}}
   */
  attributes = {};

  constructor(message, attributes = {}) {
    super(message);
    this.attributes = attributes;
  }

  toJSON() {
    return {
      message: this.message,
      ...this.attributes,
    };
  }
}

const logger = new Logger("sqlite-worker", true);
self.addEventListener('message', function (event) {
  const {method, args, id} = event.data;
  switch (method) {
    case 'exec':
      const statement = args[0];
      const _args = args[1];
      try {
        const result = exec(statement, _args);
        postMessage({id, result});
      } catch (e) {
        logger.error('error while performing \'query\'', statement, _args, e.toJSON?.() || e);
        postMessage({id, error: e.toJSON()});
      }
      break;
    case 'importFrom':
      const importOptions = args[0];
      importFrom(importOptions).then(() => {
        postMessage({id});
      }).catch((err) => {
        logger.error('error while performing \'importFrom\'', err.toJSON?.() || err);
        postMessage({id, error: err.toJSON()});
      });
      break;
    case 'open':
      const options = args[0];
      open(options).then((db) => {
        postMessage({id, result: db.filename});
      }).catch((err) => {
        logger.error('error while performing \'connect\'', err.toJSON?.() || err);
        postMessage({id, error: err.toJSON()});
      });
      break;
    case 'close':
      close().then(() => {
        postMessage({id});
      }).catch((err) => {
        logger.error('error while performing \'close\'', err.toJSON?.() || err);
        postMessage({id, error: err.toJSON()});
      });
      break;
    default:
      postMessage({id, error: 'Unknown method'});
  }
});
let db = null;
let capi = null;
let oo = null;
let _poolUtil = null;
let sqlite3 = null;
let _sqlite3InitDone = false;

function exec(statement, args = []) {
  if (!db) {
    throw new SerializableError('Database is not connected');
  }
  if (!statement) {
    throw new SerializableError('Statement is empty', {
      method: 'exec',
      statement,
      args,
    });
  }
  try {
    if (!args) {
      args = [];
    }
    let rows = [];
    db.exec({
      sql: statement,
      bind: args,
      resultRows: rows,
      rowMode: "object",
    });
    return rows;
  } catch (e) {
    throw new SerializableError(e.message, {
      method: 'exec',
      statement,
      args,
      stack: e.stack,
    });
  }
}

/**
 * @param {{
 *  useSAHPool: boolean,
 * }} options
 */
async function initializeSqliteWasm(options) {
  logger.debug('Loading and initializing sqlite3 module...');
  sqlite3 = globalThis.sqlite3 = await sqlite3InitModule({
    print: (...args) => {
      logger.debug(...args);
    },
    printErr: (...args) => {
      logger.error(...args);
    },
  });

  capi = globalThis.capi = sqlite3.capi;
  oo = globalThis.oo = sqlite3.oo1;
  logger.debug('SQLite3 version', capi.sqlite3_libversion(), capi.sqlite3_sourceid());

  if (options.useSAHPool) {
    _poolUtil = globalThis._poolUtil = await sqlite3.installOpfsSAHPoolVfs();
    logger.debug('Installed OPFS SAHPOOL VFS');
  }
  if (!('OpfsDb' in oo)) {
    logger.debug('The OPFS is not available.');
    throw new SerializableError('The OPFS is not available.');
  }

  logger.debug('The OPFS is available.');
  _sqlite3InitDone = true;
}

/**
 * @param {{
 *   filename: string,
 *   useSAHPool: boolean,
 * }} options
 */
async function open(options) {
  logger.debug('opening database', options.filename);

  if (!_sqlite3InitDone) {
    await initializeSqliteWasm(options);
  }

  try {
    if (options.useSAHPool) {
      await connectToOPFSSahPoolDB(options.filename);
    } else {
      await connectToOPFSDB(options.filename);
    }
  } catch (e) {
    logger.error('error while connecting to database', e);
    throw new SerializableError(e.message, {
      method: 'open',
      filename: options.filename,
      useSAHPool: options.useSAHPool,
      stack: e.stack,
    });
  }
  sqliteExtendDB(db);
  logger.debug('Connected to database', db.filename);

  try {
    let rows = [];
    db.exec({
      sql: 'SELECT 1',
      resultRows: rows,
      rowMode: "object",
    });
    logger.debug('validation query done', db.filename, rows);
    return db;
  } catch (e) {
    logger.error('error while executing validation statement', e);
    throw new SerializableError(e.message, {
      method: 'open',
      statement: 'SELECT 1',
      args: [],
      stack: e.stack,
    });
  }
}

/**
 * @param {{
 *   filename: string,
 *   oldFilename: string,
 *   useSAHPool: boolean,
 * }} options
 */
async function importFrom(options) {
  logger.debug('importing from', options.oldFilename, 'to', options.filename);
  let exists = await fileExists(options.oldFilename);
  if (!exists) {
    throw new SerializableError('Old file does not exist', {
      oldFilename: options.oldFilename,
    });
  }

  if (!_sqlite3InitDone) {
    await initializeSqliteWasm(options);
  }

  try {
    if (options.useSAHPool) {
      await importToOPFSSahPoolDB(options.oldFilename, options.filename);
    } else {
      await importToOPFSDb(options.oldFilename, options.filename);
    }
  } catch (e) {
    logger.error('error while importing the database from', options.oldFilename, 'to', options.filename, e);
    throw new SerializableError(e.message, {
      method: 'open',
      filename: options.filename,
      useSAHPool: options.useSAHPool,
      oldFilename: options.oldFilename,
      stack: e.stack,
    });
  }
  logger.debug('importing from', options.oldFilename, 'to', options.filename, 'done');
}

/**
 * @param {string} oldFilename
 * @param {string} filename
 */
async function importToOPFSDb(oldFilename, filename) {
  const dbFileName = `file:/${filename}?vfs=opfs`;
  logger.debug('Restoring from previous version', oldFilename, 'to', dbFileName);
  const oldDBArrayBuffer = await loadDatabaseFromFilename(oldFilename);
  logger.debug('Loaded file successfully', oldFilename, oldDBArrayBuffer.byteLength, 'bytes');
  const byteCount = await oo.OpfsDb.importDb(dbFileName, oldDBArrayBuffer);
  logger.debug('Imported file successfully', 'from', oldFilename, 'to', dbFileName, byteCount, 'bytes');
}


/**
 * @param {string} filename
 */
async function connectToOPFSDB(filename) {
  const dbFileName = `file:/${filename}?vfs=opfs`;
  db = globalThis.db = new oo.DB(dbFileName, 'c');
}

/**
 * @param {string} oldFilename
 * @param {string} filename
 */
async function importToOPFSSahPoolDB(oldFilename, filename) {
  let dbFileName = `/${filename}`;
  logger.debug('Restoring from previous version', oldFilename, 'to', dbFileName);
  const oldDBArrayBuffer = await loadDatabaseFromFilename(oldFilename);
  logger.debug('Loaded file successfully', oldFilename, oldDBArrayBuffer.byteLength, 'bytes');
  const byteCount = await _poolUtil.importDb(dbFileName, oldDBArrayBuffer);
  logger.debug('Imported file successfully', 'from', oldFilename, 'to', dbFileName, byteCount, 'bytes');
}

/**
 * @param {string} filename
 */
async function connectToOPFSSahPoolDB(filename) {
  let dbFileName = `/${filename}`;
  db = globalThis.db = new _poolUtil.OpfsSAHPoolDb(dbFileName);
}

/**
 * @param {string} filename
 * @return {Promise<ArrayBuffer>}
 */
async function loadDatabaseFromFilename(filename) {
  const dir = await navigator.storage.getDirectory();
  const file = await dir.getFileHandle(filename, {create: false});
  if (!file) {
    throw new Error('File not found');
  }
  const fileStream = await file.getFile();
  return await fileStream.arrayBuffer();
}

async function fileExists(name) {
  const opfsRoot = await navigator.storage.getDirectory();
  try {
    await opfsRoot.getFileHandle(name, {create: false});
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return false;
    }
    throw e;
  }
  return true;
}

async function close() {
  try {
    if (db) {
      logger.debug('Closing database', db.filename);
      db.close();
      db = null;
      logger.debug('Database closed');
    } else {
      logger.debug('Database is not connected or already closed');
    }
  } catch (e) {
    logger.error('error while closing database', e);
    throw new SerializableError(e.message, {
      method: 'close',
      filename: db.filename,
      stack: e.stack,
    });
  }
}
