import { s as serviceProxy } from "./service.04a32097.js";
import { a_ as withWindow, T as TXT, k as i18n, V as View$1, E as Editor, D as push, p as params, S as Supports, u as urlCfg, A as Api, s as base, b as Msg } from "./json-parser.7cb2f04e.js";
import { S as SvelteComponent, i as init, s as safe_not_equal, q as space, U as empty, y as insert, E as noop, C as detach, j as component_subscribe, h as getContext, Y as onMount, a0 as onDestroy, p as element, r as text, v as attr, z as append, A as listen$1, D as is_function, G as set_data, F as destroy_each, L as run_all, x as set_style, O as toggle_class, a as assign, N as set_attributes, ao as set_data_maybe_contenteditable, g as get_spread_update } from "./index.21aef151.js";
const { CFG: { URL } } = serviceProxy;
window.LOCALE = "en-US";
window.URL_ROOT = URL.APP;
window.URL_UTILS = URL.UTILITIES;
window.URL_WEBSITE = URL.WEBSITE;
window.URL_ANALYTICS = URL.ANALYTICS;
window.URL_RR = URL.RR;
const userStates = serviceProxy.state;
const _$4 = window._;
if (!_$4) {
  throw new Error("ADD _");
}
const Backbone$2 = window.Backbone;
if (!Backbone$2) {
  throw new Error("ADD Backbone");
}
const instance$2 = _$4.extend({}, Backbone$2);
function listen(topic, listener) {
  function delayedExecutor() {
    const args = _$4.toArray(arguments);
    setTimeout(function() {
      listener.apply(this, args);
    }, 50);
  }
  withWindow(() => serviceProxy.gEvents.on(topic, delayedExecutor));
}
function propagateEvent(name) {
  listen(name, function(arg1, arg2) {
    instance$2.trigger(name, arg1, arg2);
  });
}
listen("service:active", onServiceActivation);
listen("change:pref:service.user_id", onChangeUser);
listen("store:clients:create", entityOpListener("clients", "I"));
listen("store:clients:update", entityOpListener("clients", "U"));
listen("store:sieve_data:create", entityOpListener("sieve_data", "I"));
listen("store:sieves:create", entityOpListener("sieves", "I"));
listen("store:sieves:update", entityOpListener("sieves", "U"));
listen("worker:sieve:state", onWorkerSieveState);
listen("store:tags:create", entityOpListener("tags", "I"));
listen("store:tags:update", entityOpListener("tags", "U"));
listen("store:tags:destroy", entityOpListener("tags", "U"));
listen("store:users:update", entityOpListener("users", "U"));
listen("store:macros:create", entityOpListener("macros", "I"));
listen("store:macros:update", entityOpListener("macros", "U"));
listen("store:macros:destroy", entityOpListener("macros", "U"));
setTimeout(() => userStates.trigger("change"), 500);
withWindow(() => userStates.on("change", () => instance$2.trigger("user_states", userStates.attributes)));
propagateEvent("change:error");
propagateEvent("change:unread");
function onServiceActivation(active) {
  instance$2.trigger("service:state", active);
}
function onChangeUser() {
  window.location.reload();
}
function entityOpListener(name, op) {
  return function(doc) {
    setTimeout(function() {
      const event = {
        name,
        id: doc.id,
        op,
        ts_mod: doc.ts_mod
      };
      instance$2.trigger(name, event);
      instance$2.trigger(name + ":" + doc.id, event);
    }, 100);
  };
}
function onWorkerSieveState(doc) {
  const event = {
    rel: "sieves",
    id: doc.id,
    ts_mod: Date.now(),
    doc
  };
  instance$2.trigger("sieves:run_state", event);
  instance$2.trigger("sieves:run_state:" + doc.id, event);
}
const _$3 = window._;
if (!_$3) {
  throw new Error("ADD _");
}
function SPRINTF(format) {
  let params2 = _$3.toArray(arguments).slice(1);
  params2 = _$3.map(params2, function(param) {
    return _$3.isString(param) ? TXT(param) : param;
  });
  return i18n.sprintf(...[TXT(format)].concat(params2));
}
const domo = window.domo;
if (!domo) {
  throw new Error("ADD domo");
}
const _$2 = window._;
if (!_$2) {
  throw new Error("ADD _");
}
const $$1 = window.jQuery;
if (!$$1) {
  throw new Error("ADD jQuery");
}
const Backbone$1 = window.Backbone;
if (!Backbone$1) {
  throw new Error("ADD Backbone");
}
const PreRenderedForm = View$1.Form.extend({
  name: "PreRenderedForm",
  fields: [],
  postInit: function() {
    this.model || (this.model = new Backbone$1.Model());
    this.initEditors();
  },
  getFieldEl: function(field) {
    const selectorValue = field.name.replace("[", "\\[").replace("]", "\\]");
    return this.$el.find("[name=" + selectorValue + "]");
  },
  initEditors: function() {
    this.editors = _$2.map(this.fields, function(field) {
      const editor = Editor.create(field.type, {
        param: field,
        parent: this,
        model: this.model,
        el: this.getFieldEl(field).parent()[0]
      }).acquire();
      return editor;
    }, this);
  },
  validateFields: function() {
    const errors = _$2.filter(this.editors, function(editor) {
      return !editor.isValid();
    }, this);
    return errors;
  }
});
var View = {
  PreRenderedForm
};
const $ = window.jQuery;
if (!$) {
  throw new Error("ADD jQuery");
}
const _$1 = window._;
if (!_$1) {
  throw new Error("ADD _");
}
const SearchForm = View.PreRenderedForm.extend({
  name: "SearchForm",
  events: {
    "input input": "event_input"
  },
  fields: [{ name: "q", type: "text" }],
  event_input: function() {
    this.search();
  },
  postInit: function() {
    const self = this;
    const tags = [
      "is:\n on,off,read,unread",
      "has:\nlabel,error",
      'label:\ncustom labels, use "-label:foo for monitors without label foo"',
      "in:\ndeleted items",
      "no:\nlabel,error"
    ];
    const is = ["on", "off", "read", "unread"];
    const isList = _$1.map(is, (value, i) => {
      return { "id": i, "name": value };
    });
    const tagList = _$1.map(tags, (value, i) => {
      return { "id": i, "name": value };
    });
    $(this.el.q).atwho({
      at: "has:",
      data: ["label", "error"]
    }).atwho({
      at: "in:",
      data: ["trash"]
    }).atwho({
      at: "no:",
      data: ["label", "error"]
    }).atwho({
      at: "is:",
      callbacks: {
        filter: (query, data, searchKey) => {
          let _results;
          let i;
          let item;
          let len;
          _results = [];
          for (i = 0, len = data.length; i < len; i++) {
            item = data[i];
            if (item[searchKey].toLowerCase().indexOf(query.toLowerCase()) == 0 || query === "") {
              _results.push(item);
            }
          }
          return _results;
        }
      },
      data: isList
    }).atwho({
      at: "label:",
      limit: 10,
      callbacks: {
        matcher: createMatcher,
        filter: (query, data, searchKey) => {
          let _results;
          let i;
          let item;
          let len;
          _results = [];
          const labelList = self.options.labels.map((value, i2) => {
            const labelName = value.get("name").replace(/"/g, escape('"'));
            return { "id": i2, "name": labelName.indexOf(" ") >= 0 ? '"' + labelName + '"' : labelName };
          });
          for (i = 0, len = labelList.length; i < len; i++) {
            item = labelList[i];
            const val = item[searchKey].toLowerCase();
            const trimmedVal = val.replace('"', "").replace("'", "");
            if (trimmedVal.indexOf(query.toLowerCase()) == 0 || val.indexOf(query.toLowerCase()) == 0 || query === "") {
              _results.push(item);
            }
          }
          return _results;
        }
      },
      data: []
    }).atwho({
      at: "-label:",
      limit: 10,
      callbacks: {
        matcher: createMatcher,
        filter: (query, data, searchKey) => {
          let _results;
          let i;
          let item;
          let len;
          _results = [];
          const labelList = self.options.labels.map((value, i2) => {
            const labelName = value.get("name").replace(/"/g, escape('"'));
            return { "id": i2, "name": labelName.indexOf(" ") >= 0 ? '"' + labelName + '"' : labelName };
          });
          for (i = 0, len = labelList.length; i < len; i++) {
            item = labelList[i];
            const val = item[searchKey].toLowerCase();
            const trimmedVal = val.replace('"', "").replace("'", "");
            if (trimmedVal.indexOf(query.toLowerCase()) == 0 || val.indexOf(query.toLowerCase()) == 0 || query === "") {
              _results.push(item);
            }
          }
          return _results;
        }
      }
    }).atwho({
      at: "",
      startWithSpace: true,
      callbacks: {
        filter: (query, data, searchKey) => {
          let _results;
          let i;
          let item;
          let len;
          _results = [];
          for (i = 0, len = data.length; i < len; i++) {
            item = data[i];
            if (new String(item[searchKey]).toLowerCase().indexOf(query.toLowerCase()) == 0 || query === "") {
              _results.push(item);
            }
          }
          return _results;
        },
        tplEval: (tpl, obj) => {
          return "<li data-name='" + _$1.escape(obj.name.split("\n")[0]) + "'>" + _$1.escape(obj.name.split("\n")[0]) + "      <span style='color:grey;'>" + _$1.escape(obj.name.split("\n")[1]) + "</span></li>";
        },
        beforeInsert: (value, $li) => {
          return $li.data("name");
        }
      },
      data: tagList,
      suffix: ""
    }).on("inserted.atwho", (e1, $li, e2) => {
      const op = $li.data("name");
      if (!op || op[op.length - 1] !== ":") {
        self.search();
      }
      $(this).atwho("run");
    });
    this.model || (this.model = new Backbone.Model());
    SearchForm.__super__.postInit.apply(this, arguments);
  },
  search: _$1.debounce(function() {
    const query = this.el.q.value.trim();
    if (query) {
      push(`/w/${this.routeParams.team}/list/search/?q=${encodeURIComponent(query)}`);
    } else {
      push(`/w/${this.routeParams.team}/list/all/`);
    }
  }, 600),
  setRouteParams(params2) {
    this.routeParams = params2;
  },
  submit: function() {
    this.search();
    return false;
  }
});
const createMatcher = (flag, subtext, should_startWithSpace, acceptSpaceBar) => {
  let _a;
  let _y;
  let match;
  let regexp;
  let space2;
  flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  if (should_startWithSpace) {
    flag = "(?:^|\\s)" + flag;
  }
  _a = decodeURI("%C3%80");
  _y = decodeURI("%C3%BF");
  space2 = acceptSpaceBar ? " " : "";
  regexp = new RegExp(
    flag + "([A-Za-z" + _a + "-" + _y + "0-9_" + space2 + `"'.+-]*)$|` + flag + "([^\\x00-\\xff]*)$",
    "gi"
  );
  match = regexp.exec(subtext);
  if (match) {
    return match[2] || match[1];
  } else {
    return null;
  }
};
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}
function create_else_block_1(ctx) {
  let a;
  let t;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      t = text("Sign In");
      attr(a, "href", urlCfg.login);
      attr(a, "class", "xnav-a");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
      if (!mounted) {
        dispose = listen$1(a, "click", function() {
          if (is_function(ctx[1]))
            ctx[1].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_2$1(ctx) {
  let div;
  let a0;
  let i;
  let t0;
  let t1;
  let t2;
  let ul;
  let li;
  let a1;
  let t3;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      a0 = element("a");
      i = element("i");
      t0 = space();
      t1 = text(ctx[6]);
      t2 = space();
      ul = element("ul");
      li = element("li");
      a1 = element("a");
      t3 = text("Sign Out");
      attr(i, "class", "fa fa-user");
      attr(a0, "href", "#");
      attr(a0, "data-bs-toggle", "dropdown");
      attr(a0, "class", "text-decoration-none dropdown-toggle xnav-a");
      attr(a1, "class", "dropdown-item");
      attr(a1, "role", "menuitem");
      attr(a1, "href", urlCfg.logout);
      attr(ul, "class", "dropdown-menu");
      attr(div, "class", "dropdown d-flex align-items-stretch");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, a0);
      append(a0, i);
      append(a0, t0);
      append(a0, t1);
      append(div, t2);
      append(div, ul);
      append(ul, li);
      append(li, a1);
      append(a1, t3);
      if (!mounted) {
        dispose = listen$1(a1, "click", ctx[10]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & 64)
        set_data(t1, ctx2[6]);
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$1(ctx) {
  let div;
  let a0;
  let t0;
  let t1;
  let t2;
  let ul;
  let li0;
  let a1;
  let t3_value = ctx[4].name + "";
  let t3;
  let t4;
  let a1_href_value;
  let t5;
  let li1;
  let t7;
  let t8;
  let li2;
  let t9;
  let li3;
  let a2;
  let t10;
  let t11;
  let li4;
  let a3;
  let t12;
  let ul_class_value;
  let mounted;
  let dispose;
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[5])
      return create_if_block_1$1;
    return create_else_block;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type(ctx);
  let each_value = ctx[3];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      var _a;
      div = element("div");
      a0 = element("a");
      if_block.c();
      t0 = space();
      t1 = text(ctx[6]);
      t2 = space();
      ul = element("ul");
      li0 = element("li");
      a1 = element("a");
      t3 = text(t3_value);
      t4 = text(" (personal)");
      t5 = space();
      li1 = element("li");
      li1.textContent = "Teams";
      t7 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t8 = space();
      li2 = element("li");
      li2.innerHTML = `<hr class="dropdown-divider"/>`;
      t9 = space();
      li3 = element("li");
      a2 = element("a");
      t10 = text("Manage Teams");
      t11 = space();
      li4 = element("li");
      a3 = element("a");
      t12 = text("Sign Out");
      attr(a0, "href", "#");
      attr(a0, "data-bs-toggle", "dropdown");
      attr(a0, "class", "text-decoration-none dropdown-toggle xnav-a");
      attr(a1, "class", "text-decoration-none dropdown-item");
      attr(a1, "href", a1_href_value = "#" + urlCfg.updateTeam((_a = ctx[8]) == null ? void 0 : _a.team, "0"));
      attr(li1, "class", "dropdown-header");
      attr(a2, "class", "dropdown-item");
      attr(a2, "href", urlCfg.groups);
      attr(a2, "data-id", "no-group");
      attr(a3, "class", "dropdown-item");
      attr(a3, "role", "menuitem");
      attr(a3, "href", urlCfg.logout);
      attr(ul, "class", ul_class_value = "dropdown-menu dropdown-menu-" + ctx[0]);
      attr(div, "class", "dropdown d-flex align-items-stretch");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, a0);
      if_block.m(a0, null);
      append(a0, t0);
      append(a0, t1);
      append(div, t2);
      append(div, ul);
      append(ul, li0);
      append(li0, a1);
      append(a1, t3);
      append(a1, t4);
      append(ul, t5);
      append(ul, li1);
      append(ul, t7);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      append(ul, t8);
      append(ul, li2);
      append(ul, t9);
      append(ul, li3);
      append(li3, a2);
      append(a2, t10);
      append(ul, t11);
      append(ul, li4);
      append(li4, a3);
      append(a3, t12);
      if (!mounted) {
        dispose = [
          listen$1(a1, "click", ctx[13]),
          listen$1(a2, "click", function() {
            if (is_function(ctx[1]))
              ctx[1].apply(this, arguments);
          }),
          listen$1(a3, "click", ctx[10])
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      var _a;
      ctx = new_ctx;
      if (current_block_type !== (current_block_type = select_block_type_1(ctx))) {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(a0, t0);
        }
      }
      if (dirty & 64)
        set_data(t1, ctx[6]);
      if (dirty & 16 && t3_value !== (t3_value = ctx[4].name + ""))
        set_data(t3, t3_value);
      if (dirty & 256 && a1_href_value !== (a1_href_value = "#" + urlCfg.updateTeam((_a = ctx[8]) == null ? void 0 : _a.team, "0"))) {
        attr(a1, "href", a1_href_value);
      }
      if (dirty & 268) {
        each_value = ctx[3];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, t8);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & 1 && ul_class_value !== (ul_class_value = "dropdown-menu dropdown-menu-" + ctx[0])) {
        attr(ul, "class", ul_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block.d();
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_else_block(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fa fa-user");
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(i);
    }
  };
}
function create_if_block_1$1(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fa fa-users");
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(i);
    }
  };
}
function create_each_block$1(ctx) {
  let li;
  let a;
  let t_value = ctx[5].name + "";
  let t;
  let a_href_value;
  let mounted;
  let dispose;
  function click_handler_1() {
    return ctx[14](ctx[5]);
  }
  return {
    c() {
      var _a;
      li = element("li");
      a = element("a");
      t = text(t_value);
      attr(a, "class", "dropdown-item");
      attr(a, "href", a_href_value = "#" + urlCfg.updateTeam((_a = ctx[8]) == null ? void 0 : _a.team, ctx[5].id));
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, t);
      if (!mounted) {
        dispose = listen$1(a, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      var _a;
      ctx = new_ctx;
      if (dirty & 8 && t_value !== (t_value = ctx[5].name + ""))
        set_data(t, t_value);
      if (dirty & 264 && a_href_value !== (a_href_value = "#" + urlCfg.updateTeam((_a = ctx[8]) == null ? void 0 : _a.team, ctx[5].id))) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$1(ctx) {
  let title_value;
  let t;
  let if_block_anchor;
  document.title = title_value = ctx[7] + "Watchlist " + (ctx[6] ? `- ${ctx[6]}` : "") + " - Distill Web Monitor";
  function select_block_type(ctx2, dirty) {
    if (ctx2[4].account)
      return create_if_block$1;
    if (ctx2[4].id)
      return create_if_block_2$1;
    return create_else_block_1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      t = space();
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      insert(target, t, anchor);
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & 192 && title_value !== (title_value = ctx2[7] + "Watchlist " + (ctx2[6] ? `- ${ctx2[6]}` : "") + " - Distill Web Monitor")) {
        document.title = title_value;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let unreadTitlePart;
  let $user;
  let $params;
  component_subscribe($$self, params, ($$value) => $$invalidate(8, $params = $$value));
  let { team } = $$props;
  let { menuAlign = "left" } = $$props;
  let { openURL = () => {
  } } = $$props;
  let { showWatchlist = () => {
  } } = $$props;
  let user = getContext("user");
  component_subscribe($$self, user, (value) => $$invalidate(4, $user = value));
  getContext("clients");
  let group;
  let groups = [];
  let name = "";
  let unreadCount = 0;
  async function onSignOut(e) {
    if (Supports.agents.local) {
      e.preventDefault();
      await serviceProxy.auth.logout();
      location.href = urlCfg.logout;
    }
  }
  onMount(() => {
    instance$2.on("user_states", onChangeUnread);
  });
  onDestroy(() => {
    instance$2.off("user_states", onChangeUnread);
  });
  function onChangeUnread({ unread }) {
    $$invalidate(12, unreadCount = unread);
  }
  const click_handler = () => showWatchlist(0);
  const click_handler_1 = (group2) => showWatchlist(group2.id);
  $$self.$$set = ($$props2) => {
    if ("team" in $$props2)
      $$invalidate(11, team = $$props2.team);
    if ("menuAlign" in $$props2)
      $$invalidate(0, menuAlign = $$props2.menuAlign);
    if ("openURL" in $$props2)
      $$invalidate(1, openURL = $$props2.openURL);
    if ("showWatchlist" in $$props2)
      $$invalidate(2, showWatchlist = $$props2.showWatchlist);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2104) {
      {
        $$invalidate(3, groups = $user.groups || []);
        $$invalidate(5, group = groups.find((g) => g.id == team));
        $$invalidate(6, name = group ? group.name : $user.name);
      }
    }
    if ($$self.$$.dirty & 4096) {
      $$invalidate(7, unreadTitlePart = unreadCount > 0 ? `(${unreadCount}) ` : "");
    }
  };
  return [
    menuAlign,
    openURL,
    showWatchlist,
    groups,
    $user,
    group,
    name,
    unreadTitlePart,
    $params,
    user,
    onSignOut,
    team,
    unreadCount,
    click_handler,
    click_handler_1
  ];
}
class Selector extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      team: 11,
      menuAlign: 0,
      openURL: 1,
      showWatchlist: 2
    });
  }
}
async function checkSieveConstraint(count = 0) {
  const defaults = { isOverLimit: false, isFlexi: false };
  const auth = serviceProxy.auth;
  if (auth && !await auth.isLoggedIn()) {
    if (await auth.isLegacy()) {
      return defaults;
    } else {
      const limit = 25;
      const { total_count } = await serviceProxy.store.SieveStore.find(
        { "state.in": [40, 45] },
        { only: ["id"], limit: 1 }
      );
      return { ...defaults, limit, count: total_count, isOverLimit: total_count + count > limit };
    }
  }
  const res = await Api.api("/users/sieve-count");
  return {
    ...res,
    isOverLimit: res.isFlexi ? false : res.count + count > res.limit
  };
}
const Label = base.Model.extend({});
const Labels = base.Collection.extend({
  model: Label,
  url: "/tags",
  findByName: function(name) {
    return this.find(function(m) {
      return m.get("name") === name;
    });
  },
  getOrCreateLabels: async function(names) {
    if (_.isString(names)) {
      names = names.split(",").map((n) => n.trim());
    }
    const labels = App.labels.filter((l) => names.includes(l.get("name"))).map((l) => l.toJSON());
    const allNames = App.labels.pluck("name");
    const newNames = _.difference(names, allNames);
    for (let i = 0; i < newNames.length; i += 1) {
      const name = newNames[i];
      const tag = await Api.api("/tags", "POST", { name });
      labels.push(tag);
    }
    return labels;
  },
  async fetch(options = {
    data: {
      "state": 0,
      "_opt": {
        order: ["name"],
        limit: 1e3
      }
    }
  }) {
    Labels.__super__.fetch.call(this, options);
  }
});
var ModelLabel = {
  Label,
  Labels
};
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
}
function create_if_block(ctx) {
  let div1;
  let span;
  let div0;
  let t0_value = TXT(ctx[0].msg) + "";
  let t0;
  let t1;
  let t2;
  let if_block0 = ctx[0].actions && create_if_block_2(ctx);
  let if_block1 = ctx[0].details && create_if_block_1(ctx);
  return {
    c() {
      div1 = element("div");
      span = element("span");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      attr(div0, "class", "text-break");
      set_style(div0, "max-width", "800px");
      attr(span, "class", "d-flex align-content-center");
      attr(div1, "class", "alert d-flex flex-column overflow-auto");
      set_style(div1, "max-height", "100vh");
      toggle_class(div1, "alert-warning", ctx[0]._info);
      toggle_class(div1, "alert-danger", ctx[0]._error);
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, span);
      append(span, div0);
      append(div0, t0);
      append(span, t1);
      if (if_block0)
        if_block0.m(span, null);
      append(div1, t2);
      if (if_block1)
        if_block1.m(div1, null);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && t0_value !== (t0_value = TXT(ctx2[0].msg) + ""))
        set_data(t0, t0_value);
      if (ctx2[0].actions) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_2(ctx2);
          if_block0.c();
          if_block0.m(span, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[0].details) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_1(ctx2);
          if_block1.c();
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & 1) {
        toggle_class(div1, "alert-warning", ctx2[0]._info);
      }
      if (dirty & 1) {
        toggle_class(div1, "alert-danger", ctx2[0]._error);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
    }
  };
}
function create_if_block_2(ctx) {
  let div;
  let each_value_1 = ctx[0].actions;
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "d-flex gap-2 ml-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & 1) {
        each_value_1 = ctx2[0].actions;
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let a;
  let t_value = TXT(ctx[4].name) + "";
  let t;
  let mounted;
  let dispose;
  let a_levels = [
    { class: "alert-link" },
    { style: "cursor: pointer;" },
    ctx[4].attrs
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      t = text(t_value);
      set_attributes(a, a_data);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
      if (!mounted) {
        dispose = listen$1(a, "click", function() {
          if (is_function(ctx[4].onclick))
            ctx[4].onclick.apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 1 && t_value !== (t_value = TXT(ctx[4].name) + ""))
        set_data_maybe_contenteditable(t, t_value, a_data["contenteditable"]);
      set_attributes(a, a_data = get_spread_update(a_levels, [
        { class: "alert-link" },
        { style: "cursor: pointer;" },
        dirty & 1 && ctx[4].attrs
      ]));
    },
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
  let details;
  let summary;
  let t1;
  let table;
  let tbody;
  let each_value = Object.keys(ctx[0].details);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      details = element("details");
      summary = element("summary");
      summary.textContent = "Error Details";
      t1 = space();
      table = element("table");
      tbody = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(table, "class", "table overflow-scroll");
    },
    m(target, anchor) {
      insert(target, details, anchor);
      append(details, summary);
      append(details, t1);
      append(details, table);
      append(table, tbody);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(tbody, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & 1) {
        each_value = Object.keys(ctx2[0].details);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(tbody, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(details);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block(ctx) {
  let tr;
  let td0;
  let t0_value = ctx[1] + "";
  let t0;
  let t1;
  let td1;
  let div;
  let t2_value = ctx[0].details[ctx[1]] + "";
  let t2;
  let t3;
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      div = element("div");
      t2 = text(t2_value);
      t3 = space();
      attr(div, "class", "m-0 w-100 border-0 overflow-scroll");
      attr(div, "readonly", "");
      set_style(div, "white-space", "pre-wrap");
      set_style(div, "word-wrap", "anywhere");
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, div);
      append(div, t2);
      append(tr, t3);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && t0_value !== (t0_value = ctx2[1] + ""))
        set_data(t0, t0_value);
      if (dirty & 1 && t2_value !== (t2_value = ctx2[0].details[ctx2[1]] + ""))
        set_data(t2, t2_value);
    },
    d(detaching) {
      if (detaching)
        detach(tr);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let if_block = ctx[0].msg && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      attr(div, "id", "msg");
      attr(div, "class", "xmsgbox d-flex justify-content-center");
      set_style(div, "transform", "translateX(calc(50vw - 50%))");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, [dirty]) {
      if (ctx2[0].msg) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $Msg;
  component_subscribe($$self, Msg, ($$value) => $$invalidate(0, $Msg = $$value));
  return [$Msg];
}
class Message extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { ModelLabel as M, SPRINTF as S, SearchForm as a, Selector as b, checkSieveConstraint as c, Message as d, instance$2 as i };
