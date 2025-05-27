var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    core.action.netrequest.register();
  },
  "update": {
    "toolbar": {
      "button": function () {
        const current = config.addon.state === "enabled" ? "ON" : "OFF";
        /*  */
        app.button.icon(null, config.addon.state);
        app.button.title(null, "Modify Header Value: " + current);
      }
    }
  },
  "action": {
    "storage": function (changes, namespace) {
      /*  */
    },
    "log": function (e) {
      if (config.addon.log) {
        console.log(e);
      }
    },
    "page": {
      "log": function (e) {
        core.action.log(e.msg);
      },
      "load": function (e) {
        if (config.addon.state === "enabled") {
          app.page.send("storage", {
            "array": config.useragent.array,
            "state": config.addon.state
          }, e ? e.tabId : null, null);
        }
      }
    },
    "popup": {
      "load": function () {
        app.popup.send("storage", {
          "state": config.addon.state
        });
      },
      "state": function () {
        config.addon.state = config.addon.state === "disabled" ? "enabled" : "disabled";
        core.action.netrequest.register();
        /*  */
        app.popup.send("storage", {
          "state": config.addon.state
        });
      }
    },
    "options": {
      "custom": {
        "array": function (e) {
          config.useragent.array = e.array;
          core.action.netrequest.register();
        }
      },
      "get": function (pref) {
        app.options.send("set", {
          "pref": pref, 
          "value": config.get(pref)
        });
      },
      "changed": function (o) {
        config.set(o.pref, o.value);
        app.options.send("set", {
          "pref": o.pref, 
          "value": config.get(o.pref)
        });
      },
      "load": function () {
        app.options.send("storage", {
          "useragent": config.useragent.array,
          "index": {
            "fn": config.useragent.index.fn,
            "ua": config.useragent.index.ua
          }
        });
      }
    },
    "netrequest": {
      "register": async function () {
        core.update.toolbar.button();
        /*  */
        await app.netrequest.display.badge.text(false);
        await app.netrequest.rules.remove.by.action.type("modifyHeaders", "requestHeaders");
        /*  */
        if (config.addon.state === "enabled") {
          for (let i = 0; i < config.useragent.array.length; i++) {
            let item = config.useragent.array[i];
            if (item) {
              if (item.state === "active") {
                let url = item.url !== '*' ? new URL(item.url) : '';
                /*  */
                app.netrequest.rules.push({
                  "action": {
                    "type": "modifyHeaders",
                    "requestHeaders": [
                      {
                        "operation": "set", 
                        "header": "user-agent", 
                        "value": item.useragent
                      }
                    ]
                  },
                  "condition": {
                    "urlFilter": url ? "||" + url.hostname + (item.checked_d ? '' : url.pathname) : '*',
                    "resourceTypes": [
                      "ping",
                      "other",
                      "websocket",
                      "sub_frame",
                      "csp_report",
                      "main_frame", 
                      "xmlhttprequest"
                    ]
                  }
                });
              }
            }
          }
        }
        /*  */
        await app.netrequest.rules.update();
      }
    }
  }
};

app.page.receive("log", core.action.page.log);
app.page.receive("load", core.action.page.load);

app.options.receive("get", core.action.options.get);
app.options.receive("load", core.action.options.load);
app.options.receive("changed", core.action.options.changed);
app.options.receive("custom-array", core.action.options.custom.array);
app.options.receive("custom-fn-list", function (e) {config.useragent.index.fn = e});
app.options.receive("custom-ua-list", function (e) {config.useragent.index.ua = e});

app.popup.receive("reload", app.tab.reload);
app.popup.receive("options", app.tab.options);
app.popup.receive("load", core.action.popup.load);
app.popup.receive("state", core.action.popup.state);
app.popup.receive("check", function () {app.tab.open(config.test.page)});
app.popup.receive("support", function () {app.tab.open(app.homepage())});
app.popup.receive("donation", function () {app.tab.open(app.homepage() + "?reason=support")});

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);
