var background = (function () {
  let tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-options") {
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
        "path": "options-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "set": function (e) {
    if (window[e.pref]) {
      window[e.pref].value = e.value;
    }
  },
  "sortable": {
    "object": null,
    "move": {
      "item": function (array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
      }
    }
  },
  "custom": {
    "useragent": {
      "array": [],
      "index": {
        "fn": 0,
        "ua": 0
      }
    }
  },
  "store": {
    "options": {
      "data": function () {
        config.fill.useragent.table();
        background.send("custom-array", {
          "array": config.custom.useragent.array
        });
      }
    }
  },
  "useragents": {
    "load": function (file, callback) {
      const request = new XMLHttpRequest();
      request.open("GET", "useragents/" + file + ".json");
      request.onload = function () {
        const response = JSON.parse(request.responseText);
        if (response) callback(response);
      };
      /*  */
      request.send();
    }
  },
  "search": {
    "method": function (e) {      
      const ua = document.getElementById("custom-ua-list");
      for (let index = 0; index < ua.length; index++) {
        let item = ua[index].value.toLowerCase();
        if (item.indexOf(e.toLowerCase()) !== -1) {
          config.custom.useragent.index.ua = index;
          config.send.custom.event(ua, "ua");
          /*  */
          return;
        }
      }
    }
  },
  "send": {
    "custom": {
      "event": function (element, key) {
        window.setTimeout(function () {
          const valid = config.custom.useragent.index[key] > -1;
          element.selectedIndex = valid ? config.custom.useragent.index[key] : 0;
        }, 100);
        /*  */
        window.setTimeout(function () {
          element.dispatchEvent(new Event("change"));
        }, 300);
      }
    }
  },
  "render": function (e) {
    config.fill.useragent.table(e);
    config.fill.useragent.select(e);
    config.custom.useragent.index.fn = e.index.fn;
    config.custom.useragent.index.ua = e.index.ua;
    /*  */
    window.setTimeout(function () {
      document.querySelector(".open-a").open = true;
      window.setTimeout(function () {
        document.querySelector(".open-b").open = true;
      }, 300);
    }, 300);
  },
  "connect": function (e, pref) {
    let a = "value";
    if (e) {
      if (e.type == "text") a = "value";
      if (e.type == "checkbox") a = "checked";
      if (e.localName == "span") a = "textContent";
      if (e.localName == "select") a = "selectedIndex";
      /*  */
      pref = e.getAttribute("data-pref");
      background.send("get", pref);
      e.addEventListener("change", function () {
        background.send("changed", {
          "pref": pref, 
          "value": this[a]
        });
      });
    }
    /*  */
    return {
      get value () {return e[a]},
      set value (val) {
        if (e.type === "file") return;
        e[a] = val;
      }
    }
  },
  "add": {
    "input": {
      "field": {
        "item": function () {
          const input = document.getElementById("input-field");
          const useragent = input.children[1].children[0];
          const url = input.children[0].children[0];
          /*  */
          const obj = {
            "url": '', 
            "useragent": '', 
            "state": 'active',
            "checked_d": true
          };
          /*  */
          try {
            obj.url = new URL(url.value).href;
          } catch (e) {
            obj.url = '*';
          }
          /*  */
          if (url.value === '*') obj.url = '*';
          /*  */
          url.value = obj.url;
          obj.useragent = useragent.value;
          config.custom.useragent.array = config.custom.useragent.array.filter(function (e) {
            return e.url !== obj.url || e.useragent !== obj.useragent;
          });
          /*  */
          config.custom.useragent.array.push(obj);
          config.store.options.data();
        }
      }
    }
  },
  "interface": {
    "load": function () {
      const explore = document.getElementById("explore");
      const search = document.getElementById("search-box");
      const add = document.getElementById("input-field-add");
      const table = document.getElementById("header-value-table");
      const prefs = [...document.querySelectorAll("*[data-pref]")];
      /*  */
      prefs.forEach(function (e) {
        const pref = e.getAttribute("data-pref");
        window[pref] = config.connect(e, pref);
      });
      /*  */
      search.addEventListener("input", function (e) {
        if (e.target.value) {
          config.search.method(e.target.value);
        }
      });
      /*  */
      add.addEventListener("click", config.add.input.field.item);
      table.addEventListener("click", config.header.value.table.listener);
      /*  */
      background.send("load");
      window.removeEventListener("load", config.interface.load, false);
      explore.style.display = navigator.userAgent.indexOf("Edg") !== -1 ? "none": "block";
    }
  },
  "header": {
    "value": {
      "table": {
        "listener": function (e) {
          const target = e.target;
          if (target.tagName.toLowerCase() === "td" || target.nodeName.toLowerCase() === "td") {
            let url, useragent, tr = target.parentNode;
            for (let i = 0; i < tr.children.length; i++) {
              const td = tr.children[i];
              const type = td.getAttribute("type");
              if (type == "url") url = tr.children[i].children[0].value;
              if (type == "useragent") useragent = tr.children[i].children[0].value;
            }
            /*  */
            if (target.getAttribute("type") === "close") {
              const action = window.confirm("Are you sure you want to remove this item?");
              if (action) {
                config.custom.useragent.array = config.custom.useragent.array.filter(function (h) {
                  return !(h.url === url && h.useragent === useragent);
                });
              }
            }
            /*  */
            if (target.getAttribute("type") === "toggle") {
              for (let k = 0; k < config.custom.useragent.array.length; k++) {
                const h = config.custom.useragent.array[k];
                if (h.url === url && h.useragent === useragent) {
                  if (target.getAttribute("state") === "active") {
                    target.setAttribute("state", "inactive");
                    config.custom.useragent.array[k].state = "inactive";
                  } else {
                    target.setAttribute("state", "active");
                    config.custom.useragent.array[k].state = "active";
                  }
                  /*  */
                  break;
                }
              }
            }
            /*  */
            config.store.options.data();
          }
          /*  */
          const tagname = target.tagName.toLowerCase();
          const nodename = target.nodeName.toLowerCase();
          if (tagname === "input" || nodename === "input") {
            if (target.getAttribute("type") === "checkbox") {
              let url, useragent;
              const tr = target.parentNode.parentNode;
              for (let i = 0; i < tr.children.length; i++) {
                const td = tr.children[i];
                const type = td.getAttribute("type");
                if (type === "url") url = tr.children[i].children[0].value;
                if (type === "useragent") useragent = tr.children[i].children[0].value;
              }
              /*  */
              for (let j = 0; j < config.custom.useragent.array.length; j++) {
                const h = config.custom.useragent.array[j];
                if (h.url === url && h.useragent === useragent) {
                  if (target.getAttribute("rule") === "domain") {
                    config.custom.useragent.array[j].checked_d = target.checked;
                  }
                  /*  */
                  break;
                }
              }
            }
            /*  */
            config.store.options.data();
          }
        }
      }
    }
  },
  "fill": {
    "useragent": {
      "select": function () {
        config.useragents.load("filenames", function (data) {
          const fn = document.getElementById("custom-fn-list");
          fn.textContent = '';
          /*  */
          data.sort();
          for (let i = 0; i < data.length; i++) {
            const option = document.createElement("option");
            option.value = data[i] || '';
            option.textContent = option.value.replace(/\-/g, ' ');
            if (option.value) fn.appendChild(option);
          }
          /*  */
          config.send.custom.event(fn, "fn");
          fn.addEventListener("change", function (e) {
            if (e.target.value) {
              config.custom.useragent.index.fn = e.target.selectedIndex;
              background.send("custom-fn-list", config.custom.useragent.index.fn);
              config.useragents.load(e.target.value, function (data) {
                const ua = document.getElementById("custom-ua-list");
                ua.textContent = '';
                /*  */
                for (let i = 0; i < data.length; i++) {
                  const option = document.createElement("option");
                  option.value = data[i].ua || '';
                  option.textContent = option.value;
                  if (option.value) {
                    ua.appendChild(option);
                  }
                }
                /*  */
                config.send.custom.event(ua, "ua");
                ua.addEventListener("change", function (e) {
                  config.custom.useragent.index.ua = e.target.selectedIndex;
                  background.send("custom-ua-list", config.custom.useragent.index.ua);
                  const input = document.getElementById("input-field");
                  input.children[0].children[0].value = '*';
                  input.children[1].children[0].value = e.target.value;
                });
              });
            }
          });
        });
      },
      "table": function (e) {
        if (e && "useragent" in e) {
          config.custom.useragent.array = e.useragent;
        }
        /*  */
        let count = 1;
        const tbody = document.getElementById('header-value-tbody');
        tbody.textContent = '';
        /*  */
        for (let i = 0; i < config.custom.useragent.array.length; i++) {
          let textarea = null;
          /*  */
          const url = document.createElement("td");
          const item = document.createElement("tr");
          const close = document.createElement("td");
          const domain = document.createElement("td");
          const toggle = document.createElement("td");
          const number = document.createElement("td");
          const useragent = document.createElement("td");
          const checkbox = document.createElement("input");
          /*  */
          number.setAttribute("type", "number");
          url.setAttribute("type", "url");
          domain.setAttribute("type", "check");
          useragent.setAttribute("type", "useragent");
          toggle.setAttribute("type", "toggle");
          close.setAttribute("type", "close");
          /*  */
          close.textContent = '⛌';
          number.textContent = count;
          /*  */
          textarea = document.createElement("textarea");
          textarea.value = config.custom.useragent.array[i].url;
          url.appendChild(textarea);
          /*  */
          textarea = document.createElement("textarea");
          textarea.value = config.custom.useragent.array[i].useragent;
          useragent.appendChild(textarea);
          /*  */
          checkbox.setAttribute("type", "checkbox");
          checkbox.checked = config.custom.useragent.array[i].checked_d;
          domain.appendChild(checkbox);
          checkbox.setAttribute("rule", "domain");
          /*  */
          toggle.textContent = config.custom.useragent.array[i].state === "active" ? '✔' : '⊖';
          toggle.setAttribute("state", config.custom.useragent.array[i].state);
          item.setAttribute("state", config.custom.useragent.array[i].state);
          /*  */
          item.appendChild(number);
          item.appendChild(url);
          item.appendChild(useragent);
          item.appendChild(domain);
          item.appendChild(toggle);
          item.appendChild(close);
          tbody.appendChild(item);
          count++;
        }
        /*  */
        if (config.sortable.object) config.sortable.object.destroy();
        config.sortable.object = Sortable.create(tbody, {
          "animation": 200,
          "onEnd": function (e) {
            const array = config.custom.useragent.array;
            config.sortable.move.item(array, e.oldIndex, e.newIndex);
            config.store.options.data();
          }
        });
        /*  */
        const clicked = {"item": null};
        const textarea = [...document.getElementById("header-value-table").querySelectorAll("textarea")];
        textarea.map(function (area) {
          area.addEventListener("mousedown", function () {
            const tr = this.parentNode.parentNode;
            const oldua = tr.querySelectorAll("textarea")[1].value;
            const oldurl = tr.querySelectorAll("textarea")[0].value;
            /*  */
            for (let i = 0; i < config.custom.useragent.array.length; i++) {
              const obj = config.custom.useragent.array[i];
              if (obj.url === oldurl && obj.useragent === oldua) {
                clicked.item = i;
                break;
              }
            }
          });
          /*  */
          area.addEventListener("change", function () {
            const tr = this.parentNode.parentNode;
            const checked_d = tr.querySelector("input").checked;
            const newua = tr.querySelectorAll("textarea")[1].value;
            const newurl = tr.querySelectorAll("textarea")[0].value;
            const state = tr.querySelector('td[type="toggle"]').getAttribute("state");
            /*  */
            const obj = {
              "url": newurl, 
              "state": state,
              "useragent": newua, 
              "checked_d": checked_d
            };
            /*  */
            if (config.custom.useragent.array[clicked.item]) {
              config.custom.useragent.array[clicked.item] = obj;
              config.store.options.data();
            }
          }, false);
        });
      }
    }
  }
};

background.receive("set", config.set);
background.receive("storage", config.render);

window.addEventListener("load", config.interface.load, false);
