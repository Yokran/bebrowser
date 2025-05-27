var background = {
  "port": null,
  "message": {},
  "receive": function (id, callback) {
    if (id) {
      background.message[id] = callback;
    }
  },
  "send": function (id, data) {
    if (id) {
      chrome.runtime.sendMessage({
        "method": id,
        "data": data,
        "path": "popup-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  },
  "connect": function (port) {
    chrome.runtime.onMessage.addListener(background.listener); 
    /*  */
    if (port) {
      background.port = port;
      background.port.onMessage.addListener(background.listener);
      background.port.onDisconnect.addListener(function () {
        background.port = null;
      });
    }
  },
  "post": function (id, data) {
    if (id) {
      if (background.port) {
        background.port.postMessage({
          "method": id,
          "data": data,
          "path": "popup-to-background",
          "port": background.port.name
        });
      }
    }
  },
  "listener": function (e) {
    if (e) {
      for (let id in background.message) {
        if (background.message[id]) {
          if ((typeof background.message[id]) === "function") {
            if (e.path === "background-to-popup") {
              if (e.method === id) {
                background.message[id](e.data);
              }
            }
          }
        }
      }
    }
  }
};

var config = {
  "render": function (e) {
    const toggle = document.querySelector(".toggle");
    toggle.setAttribute("state", e.state);
  },
  "load": function () {
    const check = document.querySelector(".check");
    const reload = document.querySelector(".reload");
    const toggle = document.querySelector(".toggle");
    const options = document.querySelector(".options");
    const support = document.querySelector(".support");
    const donation = document.querySelector(".donation");
    /*  */
    check.addEventListener("click", function () {background.send("check")});
    toggle.addEventListener("click", function () {background.send("state")});
    reload.addEventListener("click", function () {background.send("reload")});
    options.addEventListener("click", function () {background.send("options")});
    support.addEventListener("click", function () {background.send("support")});
    donation.addEventListener("click", function () {background.send("donation")});
    /*  */
    background.send("load");
    window.removeEventListener("load", config.load, false);
  }
};

background.receive("storage", config.render);
window.addEventListener("load", config.load, false);
background.connect(chrome.runtime.connect({"name": "popup"}));
