var background = (function () {
  let tmp = {};
  /*  */
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-page") {
          if (request.method === id) {
            tmp[id](request.data);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {
      tmp[id] = callback;
    },
    "send": function (id, data) {
      chrome.runtime.sendMessage({
        "method": id, 
        "data": data,
        "path": "page-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "useragent": function (e) {
    if (e) {
      localStorage.setItem("custom-useragent-string-ua", e);
    } else {
      localStorage.removeItem("custom-useragent-string-ua");
    }
  },
  "hostname": function (url) {
    try {
      return (new URL(url)).hostname;
    } catch (e) {
      return '*';
    }
  },
  "action": function (data) {
    if (data.state === "enabled") {
      for (let i = 0; i < data.array.length; i++) {
        if (data.array[i].state === "active") {
          let url = data.array[i].url;
          let top = data.top || document.location.href;
          let domain = config.hostname(data.array[i].url);
          /*  */
          let flag = top && top === url;
          if (url === '*') {
            flag = true;
          } else if (data.array[i].checked_d) {
            flag = top && top.indexOf(domain) !== -1;
          }
          /*  */
          if (flag) {
            let useragent = data.array[i].useragent;
            if (window === window.top) {
              background.send("log", {
                "msg": "PG :: UA for " + data.top + " is changed to: " + useragent
              });
            } else {
              background.send("log", {
                "msg": "PG :: UA for iframe with top URL " + data.top + " is changed to: " + useragent
              });
            }
            /*  */
            return config.useragent(useragent);
          }
        }
      }
    }
    /*  */
    return config.useragent('');
  }
};

background.send("load");
background.receive("storage", config.action);
