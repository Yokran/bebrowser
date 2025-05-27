var config = {};

config.test = {"page": "https://webbrowsertools.com/useragent/?method=normal&verbose=false"};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.addon = {
  set log (val) {app.storage.write("console", val)},
  set state (val) {app.storage.write("state", val)},
  get log () {return app.storage.read("console") !== undefined ? app.storage.read("console") : false},
  get state () {return app.storage.read("state") !== undefined ? app.storage.read("state") : "enabled"}
};

config.useragent = {
  set array (val) {app.storage.write("useragent", JSON.stringify(val))},
  get array () {
    var tmp = app.storage.read("useragent");
    return tmp !== undefined ? (JSON.parse(tmp) || []) : [];
  },
  "index": {
    set ua (val) {app.storage.write("index-ua", val)},
    set fn (val) {app.storage.write("index-fn", val)},
    get ua () {return app.storage.read("index-ua") !== undefined ? app.storage.read("index-ua") : 0},
    get fn () {return app.storage.read("index-fn") !== undefined ? app.storage.read("index-fn") : 0}
  }
};

config.get = function (name) {
  return name.split('.').reduce(function (p, c) {
    return p[c];
  }, config);
};

config.set = function (name, value) {
  const _set = function (name, value, scope) {
    name = name.split('.');
    if (name.length > 1) {
      _set.call((scope || this)[name.shift()], name.join('.'), value);
    } else {
      this[name[0]] = value;
    }
  };
  /*  */
  _set(name, value, config);
};
