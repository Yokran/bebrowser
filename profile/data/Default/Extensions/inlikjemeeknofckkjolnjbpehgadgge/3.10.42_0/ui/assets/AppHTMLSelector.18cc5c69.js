var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as SvelteComponent, i as init, s as safe_not_equal, p as element, c as create_component, q as space, v as attr, x as set_style, y as insert, z as append, m as mount_component, t as transition_in, d as transition_out, C as detach, e as destroy_component, aa as setContext, r as text, U as empty, O as toggle_class, A as listen, H as group_outros, I as check_outros, L as run_all, j as component_subscribe, Y as onMount, E as noop, ae as get_store_value, V as binding_callbacks, W as bind, X as add_flush_callback, B as prevent_default, G as set_data, a as assign, g as get_spread_update, b as get_spread_object, f as compute_rest_props, k as exclude_internal_props, M as createEventDispatcher, h as getContext, a9 as stop_propagation, R as handle_promise, T as update_await_block_branch, a2 as set_store_value, P as action_destroyer, K as subscribe, Q as bubble, D as is_function } from "./index.21aef151.js";
import { T as TXT, M as Model, C, a3 as trackEvent, w as writable, a4 as PHEvents, ac as initStores, A as Api, j as ModelClient, aX as identifyUser, s as base, a_ as loadLang } from "./json-parser.f519fd70.js";
import { s as serviceProxy } from "./service.04a32097.js";
import { aq as SieveConfigPage, ar as RegexWrapper, aw as Tooltip, ax as DashedCircle, ah as Cross, ay as TickCircle, az as Loading, aA as Expandable, P as ParamsEditor, at as SchemaKeyTree, T as TreeView, w as BaseNode, o as Conditional, R as Root, n as Block, C as Clause, aB as While, aC as ExpressionStatus, aD as getSummary, S as StackedError, p as portal, aE as setupParams, s as parseSteps, L as Loader$1, j as RejectablePromise } from "./SchemaKeyTree.c700e647.js";
import { L as LSStore } from "./store-localstorage.f2df8c73.js";
import { a as DatasourceModel } from "./store.bb54b007.js";
var selector = "";
function create_fragment$9(ctx) {
  let div2;
  let div0;
  let sieveconfigpage;
  let t0;
  let div1;
  let textarea;
  let t1;
  let regexwrapper;
  let current;
  sieveconfigpage = new SieveConfigPage({
    props: {
      model: ctx[1],
      config: ctx[0]
    }
  });
  regexwrapper = new RegexWrapper({
    props: {
      id: "vs-regex",
      show: false,
      config: ctx[0]
    }
  });
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      create_component(sieveconfigpage.$$.fragment);
      t0 = space();
      div1 = element("div");
      textarea = element("textarea");
      t1 = space();
      create_component(regexwrapper.$$.fragment);
      attr(div0, "class", "flex-auto overflow-y-scroll");
      attr(textarea, "class", "form-control flex-auto");
      attr(textarea, "placeholder", TXT("m_vs_sel_preview"));
      textarea.value = ctx[2];
      attr(div1, "class", "w-30 bl b--silver flex flex-column");
      attr(div2, "class", "flex");
      set_style(div2, "height", "calc(100vh - 34px)");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      mount_component(sieveconfigpage, div0, null);
      append(div2, t0);
      append(div2, div1);
      append(div1, textarea);
      append(div1, t1);
      mount_component(regexwrapper, div1, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const sieveconfigpage_changes = {};
      if (dirty & 2)
        sieveconfigpage_changes.model = ctx2[1];
      if (dirty & 1)
        sieveconfigpage_changes.config = ctx2[0];
      sieveconfigpage.$set(sieveconfigpage_changes);
      if (!current || dirty & 4) {
        textarea.value = ctx2[2];
      }
      const regexwrapper_changes = {};
      if (dirty & 1)
        regexwrapper_changes.config = ctx2[0];
      regexwrapper.$set(regexwrapper_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(sieveconfigpage.$$.fragment, local);
      transition_in(regexwrapper.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sieveconfigpage.$$.fragment, local);
      transition_out(regexwrapper.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      destroy_component(sieveconfigpage);
      destroy_component(regexwrapper);
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let { config } = $$props;
  let { page } = $$props;
  let { previewText = "" } = $$props;
  let { bbModel } = $$props;
  setContext("bbModel", bbModel);
  $$self.$$set = ($$props2) => {
    if ("config" in $$props2)
      $$invalidate(0, config = $$props2.config);
    if ("page" in $$props2)
      $$invalidate(1, page = $$props2.page);
    if ("previewText" in $$props2)
      $$invalidate(2, previewText = $$props2.previewText);
    if ("bbModel" in $$props2)
      $$invalidate(3, bbModel = $$props2.bbModel);
  };
  return [config, page, previewText, bbModel];
}
class HTML extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$9, safe_not_equal, {
      config: 0,
      page: 1,
      previewText: 2,
      bbModel: 3
    });
  }
}
function create_if_block_1$5(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = `${TXT("m_vs_help")}`;
      attr(div, "class", "flex-auto bg-dark text-white p-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block$6(ctx) {
  let htmlconfig;
  let current;
  htmlconfig = new HTML({
    props: {
      page: ctx[5],
      config: ctx[4],
      previewText: ctx[2],
      bbModel: ctx[3]
    }
  });
  return {
    c() {
      create_component(htmlconfig.$$.fragment);
    },
    m(target, anchor) {
      mount_component(htmlconfig, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const htmlconfig_changes = {};
      if (dirty[0] & 4)
        htmlconfig_changes.previewText = ctx2[2];
      htmlconfig.$set(htmlconfig_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(htmlconfig.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(htmlconfig.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(htmlconfig, detaching);
    }
  };
}
function create_fragment$8(ctx) {
  let div;
  let button0;
  let i0;
  let t0;
  let t1_value = TXT("a_select_elements") + "";
  let t1;
  let t2;
  let t3;
  let button1;
  let i1;
  let t4;
  let t5_value = TXT("a_save_selections") + "";
  let t5;
  let t6;
  let button2;
  let i2;
  let t7;
  let button3;
  let i3;
  let t8;
  let if_block1_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block0 = ctx[1] && create_if_block_1$5();
  let if_block1 = ctx[1] && ctx[5] && create_if_block$6(ctx);
  return {
    c() {
      div = element("div");
      button0 = element("button");
      i0 = element("i");
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      if (if_block0)
        if_block0.c();
      t3 = space();
      button1 = element("button");
      i1 = element("i");
      t4 = space();
      t5 = text(t5_value);
      t6 = space();
      button2 = element("button");
      i2 = element("i");
      t7 = space();
      button3 = element("button");
      i3 = element("i");
      t8 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      attr(i0, "class", "fa");
      toggle_class(i0, "fa-play", !ctx[0]);
      toggle_class(i0, "fa-pause", ctx[0]);
      attr(button0, "class", "btn btn-primary rounded-0");
      toggle_class(button0, "flex-1", !ctx[1]);
      attr(i1, "class", "fa fa-save");
      attr(button1, "class", "btn btn-default rounded-0");
      attr(i2, "class", "fa");
      toggle_class(i2, "fa-expand", !ctx[1]);
      toggle_class(i2, "fa-compress", ctx[1]);
      attr(button2, "class", "btn btn-default rounded-0");
      attr(button2, "title", TXT("a_expand"));
      attr(i3, "class", "fa fa-times");
      attr(button3, "class", "btn btn-default rounded-0");
      attr(button3, "title", TXT("a_close"));
      attr(div, "class", "d-flex");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button0);
      append(button0, i0);
      append(button0, t0);
      append(button0, t1);
      append(div, t2);
      if (if_block0)
        if_block0.m(div, null);
      append(div, t3);
      append(div, button1);
      append(button1, i1);
      append(button1, t4);
      append(button1, t5);
      append(div, t6);
      append(div, button2);
      append(button2, i2);
      append(div, t7);
      append(div, button3);
      append(button3, i3);
      insert(target, t8, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button0, "click", ctx[9]),
          listen(button1, "click", ctx[7]),
          listen(button2, "click", ctx[8]),
          listen(button3, "click", ctx[6])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty[0] & 1) {
        toggle_class(i0, "fa-play", !ctx2[0]);
      }
      if (!current || dirty[0] & 1) {
        toggle_class(i0, "fa-pause", ctx2[0]);
      }
      if (!current || dirty[0] & 2) {
        toggle_class(button0, "flex-1", !ctx2[1]);
      }
      if (ctx2[1]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_1$5();
          if_block0.c();
          if_block0.m(div, t3);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!current || dirty[0] & 2) {
        toggle_class(i2, "fa-expand", !ctx2[1]);
      }
      if (!current || dirty[0] & 2) {
        toggle_class(i2, "fa-compress", ctx2[1]);
      }
      if (ctx2[1] && ctx2[5]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$6(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block0)
        if_block0.d();
      if (detaching)
        detach(t8);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
const MSG_EVENT = 2;
const MSG_REQUEST = 3;
const MSG_RESPONSE = 4;
function instance$7($$self, $$props, $$invalidate) {
  let $page;
  let { on = true } = $$props;
  let { model } = $$props;
  let { state } = $$props;
  let { portReq } = $$props;
  if (state == null ? void 0 : state.selectorOn) {
    on = !!state.selectorOn;
  }
  let expanded = !!(state == null ? void 0 : state.expanded);
  const _ = window._;
  const ID = ((x) => (prefix = "$") => "$" + x++)(1);
  const PORT_INDEX = [];
  const responseHandlers = {};
  let savedSieve = model;
  let savedConfig = savedSieve.get("config");
  let savedPages = savedConfig == null ? void 0 : savedConfig.get("selections");
  let savedCurrentpage;
  let previewText = "Page Loaded...";
  const config = new Model.SieveConfigHTML();
  config.applyDefaults([]);
  let page = config.get("selections").at(0);
  component_subscribe($$self, page, (value) => $$invalidate(15, $page = value));
  if (savedConfig) {
    config.set("regexp", savedConfig.get("regexp"));
    config.set("includeStyle", !!savedConfig.get("includeStyle"));
    if (savedPages && savedPages.at(0)) {
      page.set("delay", savedPages.at(0).get("delay"));
    }
  }
  const port = portReq.port;
  portReq.removeMessageListener();
  port.onMessage.addListener(function(msg2) {
    let { type, data } = msg2;
    switch (type) {
      case MSG_EVENT:
        onPortEvent(data.type, data.event);
        break;
      case MSG_RESPONSE:
        onPortResponse(msg2);
        break;
      default:
        console.warn("Unhandled msg type: ", msg2);
    }
  });
  sendRequest("subscribe");
  setContext("CMD", {
    async add(frameIndex, op = "INCLUDE") {
      await portRequest(frameIndex, {
        path: "picker_select_new",
        data: {
          id: ID(),
          op,
          locator: {
            type: "css",
            expr: "#enter-your-selector-here"
          }
        }
      });
    },
    async del(locator) {
      const frame = locator.collection.frame;
      await portRequest(frame.get("index"), {
        path: "picker_select_call",
        data: { id: locator.id, method: "close" }
      });
    },
    async setExpr(locator, expr) {
      const frame = locator.collection.frame;
      await portRequest(frame.get("index"), {
        path: "picker_select_call",
        data: {
          id: locator.id,
          method: "setLocator",
          args: [{ type: locator.get("type"), expr }]
        }
      });
    },
    async setType(locator, type) {
      const frame = locator.collection.frame;
      await portRequest(frame.get("index"), {
        path: "picker_select_call",
        data: {
          id: locator.id,
          method: "setLocatorType",
          args: [type]
        }
      });
    }
  });
  function onPortEvent(type, event) {
    switch (type) {
      case "loader:load":
        onLoadPort(event);
        break;
      case "loader:reset":
        $$invalidate(2, previewText = "");
        onLoaderReset(event);
        break;
      case "loader:port:select:close":
        onSelectClose(event);
        break;
      case "loader:port:select:display":
        onSelectDisplay(event);
        break;
      case "loader:port:select:new":
        onSelectNew(event);
        break;
      default:
        console.warn("Unhandled event type: ", type);
    }
  }
  function onPortResponse({ _id, err, data }) {
    let handler = responseHandlers[_id];
    if (handler) {
      delete responseHandlers[_id];
      handler(err, data);
    } else {
      console.error("Unhandled response: ", msg);
    }
  }
  port.onDisconnect.addListener(function() {
  });
  onMount(() => {
    config.on("change:regexp", updatePreview);
  });
  async function close() {
    await Promise.allSettled(PORT_INDEX.map(portReset));
    $$invalidate(0, on = false);
    sendEvent("close");
  }
  async function save() {
    if (config.isEmpty()) {
      showMsg("Please select elements to monitor before saving selections.");
      return;
    }
    const metaToBeSaved = savedSieve.get("meta") || {
      source: {
        action: "add",
        user_id: await serviceProxy.auth.getId(),
        client_id: await serviceProxy.store.Prefs.get("client.id"),
        client_type: serviceProxy.CFG.CLIENT.TYPE
      }
    };
    savedSieve.set({
      uri: $page.uri,
      config,
      content_type: C.TYPE_HTML,
      meta: metaToBeSaved
    });
    const modelJSON = savedSieve.toJSON();
    await Promise.allSettled(PORT_INDEX.map(portReset));
    $$invalidate(0, on = false);
    sendEvent("save", modelJSON);
  }
  async function onLoadPort(event) {
    const index = event.index;
    const savedFrame = savedCurrentpage == null ? void 0 : savedCurrentpage.get("frames").findWhere({ index });
    PORT_INDEX.push(index);
    if (savedFrame) {
      showVisualSelections(savedFrame);
    }
    portSetMode(index);
  }
  function onLoaderReset(event) {
    page.reset();
    page.set("uri", event.uri);
    PORT_INDEX.splice(0);
    savedCurrentpage = savedPages && savedPages.at(0);
  }
  async function onLocatorChange(locator, options) {
    if (options && options.source === "picker")
      return;
    const frame = locator.collection.frame;
    await portRequest(frame.get("index"), {
      path: "picker_select_call",
      data: {
        method: "setLocator",
        id: locator.id,
        args: [_.pick(locator.attributes, "expr", "type")]
      }
    });
    updatePreview();
  }
  function onSelectClose(event) {
    page.removeLocator(event.index, event.id);
    updatePreview();
  }
  function onSelectDisplay(event) {
    const locator = page.getLocator(event.index, event.id);
    const attrs = _.extend({ id: event.id, allFields: event.allFields }, event.locator);
    if (!_.isEqual(attrs, locator.attributes)) {
      locator.set(attrs, { source: "picker" });
      locator.set("matchedElementCount", event.matchedElementCount);
      updatePreview();
    }
  }
  function onSelectNew(event) {
    const attrs = { id: event.id, ...event.locator };
    const locator = page.addLocator({ index: event.index, uri: event.uri }, event.op, attrs);
    Backbone.listenTo(locator, "change", onLocatorChange);
  }
  function portRequest(portSelector, data) {
    return sendRequest("loader/request", { portSelector, data });
  }
  async function portReset(portIndex) {
    await portRequest(portIndex, { path: "picker_reset" });
  }
  async function portSetMode(portIndex) {
    await portRequest(portIndex, {
      path: "picker_setMode",
      data: on ? "SELECT" : "NOOP"
    });
    if (on && portIndex == 0) {
      showMsg("Selector is on. Click elements on page that you would like to monitor for changes.");
    }
  }
  function portSetModeForAll(_mode) {
    for (let index of PORT_INDEX) {
      portSetMode(index);
    }
  }
  function sendEvent(type, event) {
    port.postMessage({ type: MSG_EVENT, data: { type, event } });
  }
  function sendRequest(path, data) {
    return new Promise((resolve, reject) => {
      const _id = ID();
      responseHandlers[_id] = (err, data2) => {
        err ? reject(err) : resolve(data2);
      };
      port.postMessage({ type: MSG_REQUEST, _id, path, data });
    });
  }
  function sendUIState(expanded2) {
    let data = { expanded: expanded2 };
    window.parent.postMessage({ type: "show", data }, "*");
    sendEvent("uistate", data);
  }
  function showMsg(msg2) {
    return portRequest(0, {
      path: "showMsg",
      data: { msg: msg2, hideAfter: 6e3 }
    });
  }
  function showVisualSelections(savedFrame) {
    const index = savedFrame.get("index");
    const includes = savedFrame.get("includes").models;
    const excludes = savedFrame.get("excludes").models;
    includes.map((model2) => portRequest(index, {
      path: "picker_select_new",
      data: {
        id: model2.id,
        locator: model2.toJSON(),
        op: "INCLUDE"
      }
    }));
    excludes.map((model2) => portRequest(index, {
      path: "picker_select_new",
      data: {
        id: model2.id,
        locator: model2.toJSON(),
        op: "EXCLUDE"
      }
    }));
  }
  function toggleExpanded() {
    $$invalidate(1, expanded = !expanded);
  }
  function toggleSelector() {
    $$invalidate(0, on = !on);
  }
  async function updatePreview() {
    if (!page)
      return;
    $$invalidate(2, previewText = "Loading...");
    try {
      let results = await Promise.all(page.get("frames").map((frame) => portRequest(frame.get("index"), {
        path: "filterHTMLAndGetData",
        data: {
          includes: frame.get("includes").toJSON(),
          excludes: frame.get("excludes").toJSON()
        }
      })));
      const re = config.get("regexp");
      let text2 = results.map((r) => r.text).join("");
      if (re && re.expr) {
        const matches = text2.match(new RegExp(re.expr, re.flags || ""));
        if (matches && matches.length > 0) {
          text2 = matches.join(" ");
        } else {
          text2 = "";
        }
      }
      $$invalidate(2, previewText = text2);
    } catch (e) {
      console.error("error while updating preview", e);
      $$invalidate(2, previewText = "Error: " + (e.message || e.msg || e.toString()));
    }
  }
  $$self.$$set = ($$props2) => {
    if ("on" in $$props2)
      $$invalidate(0, on = $$props2.on);
    if ("model" in $$props2)
      $$invalidate(10, model = $$props2.model);
    if ("state" in $$props2)
      $$invalidate(11, state = $$props2.state);
    if ("portReq" in $$props2)
      $$invalidate(12, portReq = $$props2.portReq);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 2) {
      sendUIState(expanded);
    }
    if ($$self.$$.dirty[0] & 1) {
      portSetModeForAll();
    }
  };
  return [
    on,
    expanded,
    previewText,
    savedSieve,
    config,
    page,
    close,
    save,
    toggleExpanded,
    toggleSelector,
    model,
    state,
    portReq
  ];
}
class HTMLSelector extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$8, safe_not_equal, { on: 0, model: 10, state: 11, portReq: 12 }, null, [-1, -1]);
  }
}
function attachPopover(el, popoverOpts) {
  const bsPopover = new window.bootstrap.Popover(el, popoverOpts);
  return {
    destory: () => bsPopover.dispose()
  };
}
async function updateReplayStatus(replayStatusStore, tree, key, data) {
  const replayStatus = get_store_value(replayStatusStore);
  if (key === "isPlaying") {
    replayStatus.isPlaying = data;
    replayStatusStore.set(replayStatus);
  } else if (key === "playing") {
    const { path } = data;
    const node = tree.getNode(path);
    replayStatus.playing = [...replayStatus.playing, node];
    replayStatusStore.set(replayStatus);
  } else if (key === "errored") {
    const { path } = data;
    const node = tree.getNode(path);
    replayStatus.errored = [node, ...replayStatus.errored];
    replayStatusStore.set(replayStatus);
  } else if (key === "completed") {
    const { path } = data;
    const node = tree.getNode(path);
    const nodeIdx = replayStatus.playing.indexOf(node);
    if (nodeIdx > -1) {
      replayStatus.completed = [...replayStatus.completed, node];
      replayStatus.playing = replayStatus.playing.slice(0, nodeIdx);
      replayStatusStore.set(replayStatus);
    }
  }
}
function create_fragment$7(ctx) {
  let strong0;
  let t1;
  let div;
  let t3;
  let strong1;
  let t5;
  let ol;
  let t13;
  let small;
  return {
    c() {
      strong0 = element("strong");
      strong0.textContent = "Managed Scraper";
      t1 = space();
      div = element("div");
      div.textContent = "Ready to use scrapers managed by Distill. Scrapers extract tagged data from webpages, offering\n  easy setup and fine-grained notification control.";
      t3 = space();
      strong1 = element("strong");
      strong1.textContent = "How to use scraper?";
      t5 = space();
      ol = element("ol");
      ol.innerHTML = `<li>Select the fields you want to monitor</li> 
  <li>Enter the input fields(if required) and click <strong>Run</strong></li> 
  <li>Click <strong>Save</strong></li>`;
      t13 = space();
      small = element("small");
      small.innerHTML = `For questions send a mail to <a href="mailto:support@distill.io">support@distill.io</a> or reach
  out to us at <a href="https://forums.distill.io" target="_blank">https://forums.distill.io</a>`;
      attr(strong0, "class", "fs-6");
      attr(div, "class", "mb-1");
      attr(strong1, "class", "fs-6");
      attr(ol, "class", "mb-2");
    },
    m(target, anchor) {
      insert(target, strong0, anchor);
      insert(target, t1, anchor);
      insert(target, div, anchor);
      insert(target, t3, anchor);
      insert(target, strong1, anchor);
      insert(target, t5, anchor);
      insert(target, ol, anchor);
      insert(target, t13, anchor);
      insert(target, small, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(strong0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(strong1);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(ol);
      if (detaching)
        detach(t13);
      if (detaching)
        detach(small);
    }
  };
}
class Help extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$7, safe_not_equal, {});
  }
}
function create_if_block_3$3(ctx) {
  let tooltip;
  let current;
  tooltip = new Tooltip({
    props: {
      tip: "Error",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(tooltip.$$.fragment);
    },
    m(target, anchor) {
      mount_component(tooltip, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(tooltip, detaching);
    }
  };
}
function create_if_block_2$3(ctx) {
  let tooltip;
  let current;
  tooltip = new Tooltip({
    props: {
      tip: "Done",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(tooltip.$$.fragment);
    },
    m(target, anchor) {
      mount_component(tooltip, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(tooltip, detaching);
    }
  };
}
function create_if_block_1$4(ctx) {
  let tooltip;
  let current;
  tooltip = new Tooltip({
    props: {
      tip: "Running",
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(tooltip.$$.fragment);
    },
    m(target, anchor) {
      mount_component(tooltip, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(tooltip.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tooltip.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(tooltip, detaching);
    }
  };
}
function create_if_block$5(ctx) {
  let dashedcircle;
  let current;
  dashedcircle = new DashedCircle({ props: { fill: "#6c757d" } });
  return {
    c() {
      create_component(dashedcircle.$$.fragment);
    },
    m(target, anchor) {
      mount_component(dashedcircle, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(dashedcircle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dashedcircle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dashedcircle, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let cross;
  let current;
  cross = new Cross({ props: { strokeColor: "red" } });
  return {
    c() {
      create_component(cross.$$.fragment);
    },
    m(target, anchor) {
      mount_component(cross, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(cross.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cross.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(cross, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let tickcircle;
  let current;
  tickcircle = new TickCircle({
    props: { strokeColor: "green", strokeWidth: 18 }
  });
  return {
    c() {
      create_component(tickcircle.$$.fragment);
    },
    m(target, anchor) {
      mount_component(tickcircle, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(tickcircle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tickcircle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(tickcircle, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let loading;
  let current;
  loading = new Loading({
    props: { strokeColor: "blue", strokeWidth: 18 }
  });
  return {
    c() {
      create_component(loading.$$.fragment);
    },
    m(target, anchor) {
      mount_component(loading, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(loading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(loading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(loading, detaching);
    }
  };
}
function create_fragment$6(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block$5, create_if_block_1$4, create_if_block_2$3, create_if_block_3$3];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!ctx2[0])
      return 0;
    if (ctx2[0] === "running")
      return 1;
    if (ctx2[0] === "completed")
      return 2;
    if (ctx2[0] === "error")
      return 3;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      attr(div, "style", ctx[1]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index !== previous_block_index) {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          }
          transition_in(if_block, 1);
          if_block.m(div, null);
        } else {
          if_block = null;
        }
      }
      if (!current || dirty & 2) {
        attr(div, "style", ctx2[1]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { state } = $$props;
  let { style = "" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("state" in $$props2)
      $$invalidate(0, state = $$props2.state);
    if ("style" in $$props2)
      $$invalidate(1, style = $$props2.style);
  };
  return [state, style];
}
class Loader extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { state: 0, style: 1 });
  }
}
function create_fragment$5(ctx) {
  let div3;
  let div1;
  let div0;
  let expandable;
  let updating_expanded;
  let t0;
  let span;
  let t2;
  let div2;
  let paramseditor;
  let current;
  let mounted;
  let dispose;
  function expandable_expanded_binding(value) {
    ctx[4](value);
  }
  let expandable_props = { style: "width: 1em;height: 1em;" };
  if (ctx[0] !== void 0) {
    expandable_props.expanded = ctx[0];
  }
  expandable = new Expandable({ props: expandable_props });
  binding_callbacks.push(() => bind(expandable, "expanded", expandable_expanded_binding));
  paramseditor = new ParamsEditor({
    props: {
      paramsFormModel: ctx[1]
    }
  });
  return {
    c() {
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      create_component(expandable.$$.fragment);
      t0 = space();
      span = element("span");
      span.textContent = "Input Fields";
      t2 = space();
      div2 = element("div");
      create_component(paramseditor.$$.fragment);
      attr(div0, "role", "button");
      attr(div0, "data-bs-toggle", "collapse");
      attr(div0, "data-bs-target", ".input-fields");
      set_style(div0, "width", "16px");
      attr(span, "role", "button");
      attr(div1, "class", "d-flex fs-6 text-secondary fw-bolder tv-sm align-items-center");
      set_style(div1, "padding", "var(--tv-cell-padding) 0");
      set_style(div1, "gap", "var(--tv-key-gap)");
      attr(div2, "class", "input-fields collapse");
      set_style(div2, "--distill-input-edit-padding-y", "0.25rem");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div1);
      append(div1, div0);
      mount_component(expandable, div0, null);
      append(div1, t0);
      append(div1, span);
      append(div3, t2);
      append(div3, div2);
      mount_component(paramseditor, div2, null);
      ctx[6](div2);
      current = true;
      if (!mounted) {
        dispose = listen(span, "click", ctx[5]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const expandable_changes = {};
      if (!updating_expanded && dirty & 1) {
        updating_expanded = true;
        expandable_changes.expanded = ctx2[0];
        add_flush_callback(() => updating_expanded = false);
      }
      expandable.$set(expandable_changes);
      const paramseditor_changes = {};
      if (dirty & 2)
        paramseditor_changes.paramsFormModel = ctx2[1];
      paramseditor.$set(paramseditor_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(expandable.$$.fragment, local);
      transition_in(paramseditor.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(expandable.$$.fragment, local);
      transition_out(paramseditor.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div3);
      destroy_component(expandable);
      destroy_component(paramseditor);
      ctx[6](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { paramsFormModel } = $$props;
  let { expanded = true } = $$props;
  const showInputFields = async () => {
    if (expanded) {
      return;
    }
    const showPromise = new Promise((res) => {
      inputFieldsEl.addEventListener(
        "shown.bs.collapse",
        () => {
          setTimeout(res, 100);
        },
        { once: true }
      );
    });
    $$invalidate(0, expanded = true);
    await showPromise;
  };
  let inputFieldsEl;
  let inputFieldsBs;
  onMount(() => {
    inputFieldsBs = window.bootstrap.Collapse.getOrCreateInstance(inputFieldsEl, { toggle: false });
    toggleCollapse();
  });
  function toggleCollapse() {
    if (!inputFieldsBs) {
      return;
    }
    if (expanded) {
      inputFieldsBs.show();
    } else {
      inputFieldsBs.hide();
    }
  }
  function expandable_expanded_binding(value) {
    expanded = value;
    $$invalidate(0, expanded);
  }
  const click_handler = () => $$invalidate(0, expanded = !expanded);
  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inputFieldsEl = $$value;
      $$invalidate(2, inputFieldsEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("paramsFormModel" in $$props2)
      $$invalidate(1, paramsFormModel = $$props2.paramsFormModel);
    if ("expanded" in $$props2)
      $$invalidate(0, expanded = $$props2.expanded);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      toggleCollapse();
    }
  };
  return [
    expanded,
    paramsFormModel,
    inputFieldsEl,
    showInputFields,
    expandable_expanded_binding,
    click_handler,
    div2_binding
  ];
}
class InputFields extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      paramsFormModel: 1,
      expanded: 0,
      showInputFields: 3
    });
  }
  get showInputFields() {
    return this.$$.ctx[3];
  }
}
var MonitoredFields_svelte_svelte_type_style_lang = "";
function create_if_block$4(ctx) {
  let div1;
  let div0;
  let t0;
  let span;
  let t1;
  let t2;
  let a;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[0] && create_if_block_1$3(ctx);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (if_block)
        if_block.c();
      t0 = space();
      span = element("span");
      t1 = text(ctx[3]);
      t2 = space();
      a = element("a");
      a.textContent = "Select all";
      attr(span, "data-bs-toggle", "collapse");
      attr(span, "data-bs-target", ".selection");
      attr(span, "role", "button");
      attr(div0, "class", "d-flex");
      set_style(div0, "gap", "var(--tv-key-gap)");
      attr(a, "href", "#");
      attr(a, "class", "me-2");
      set_style(a, "font-size", "10px");
      attr(div1, "class", "d-flex justify-content-between align-items-center fs-6 text-secondary fw-bolder tv-sm");
      set_style(div1, "padding", "var(--tv-cell-padding) 0");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      if (if_block)
        if_block.m(div0, null);
      append(div0, t0);
      append(div0, span);
      append(span, t1);
      append(div1, t2);
      append(div1, a);
      current = true;
      if (!mounted) {
        dispose = [
          listen(span, "click", ctx[10]),
          listen(a, "click", prevent_default(ctx[5]))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div0, t0);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & 8)
        set_data(t1, ctx2[3]);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_1$3(ctx) {
  let div;
  let expandable_1;
  let updating_expanded;
  let current;
  function expandable_1_expanded_binding(value) {
    ctx[9](value);
  }
  let expandable_1_props = { style: "width: 1em;height: 1em;" };
  if (ctx[6] !== void 0) {
    expandable_1_props.expanded = ctx[6];
  }
  expandable_1 = new Expandable({ props: expandable_1_props });
  binding_callbacks.push(() => bind(expandable_1, "expanded", expandable_1_expanded_binding));
  return {
    c() {
      div = element("div");
      create_component(expandable_1.$$.fragment);
      attr(div, "role", "button");
      attr(div, "data-bs-toggle", "collapse");
      attr(div, "data-bs-target", ".selection");
      set_style(div, "width", "16px");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(expandable_1, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const expandable_1_changes = {};
      if (!updating_expanded && dirty & 64) {
        updating_expanded = true;
        expandable_1_changes.expanded = ctx2[6];
        add_flush_callback(() => updating_expanded = false);
      }
      expandable_1.$set(expandable_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(expandable_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(expandable_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(expandable_1);
    }
  };
}
function create_fragment$4(ctx) {
  let div1;
  let t;
  let div0;
  let schemakeytree;
  let updating_root;
  let current;
  let if_block = ctx[4] && create_if_block$4(ctx);
  function schemakeytree_root_binding(value) {
    ctx[11](value);
  }
  let schemakeytree_props = {
    obj: JSON.parse(JSON.stringify(ctx[1].get("schema"))),
    includedJson: ctx[2],
    class: "monitored-fields"
  };
  if (ctx[7] !== void 0) {
    schemakeytree_props.root = ctx[7];
  }
  schemakeytree = new SchemaKeyTree({ props: schemakeytree_props });
  binding_callbacks.push(() => bind(schemakeytree, "root", schemakeytree_root_binding));
  return {
    c() {
      div1 = element("div");
      if (if_block)
        if_block.c();
      t = space();
      div0 = element("div");
      create_component(schemakeytree.$$.fragment);
      attr(div0, "class", "selection collapse show bg-white");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      if (if_block)
        if_block.m(div1, null);
      append(div1, t);
      append(div1, div0);
      mount_component(schemakeytree, div0, null);
      ctx[12](div0);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[4]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div1, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const schemakeytree_changes = {};
      if (dirty & 2)
        schemakeytree_changes.obj = JSON.parse(JSON.stringify(ctx2[1].get("schema")));
      if (dirty & 4)
        schemakeytree_changes.includedJson = ctx2[2];
      if (!updating_root && dirty & 128) {
        updating_root = true;
        schemakeytree_changes.root = ctx2[7];
        add_flush_callback(() => updating_root = false);
      }
      schemakeytree.$set(schemakeytree_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(schemakeytree.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(schemakeytree.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (if_block)
        if_block.d();
      destroy_component(schemakeytree);
      ctx[12](null);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { datasource } = $$props;
  let { includedJson } = $$props;
  let { expandable = true } = $$props;
  let { title = "Show Monitored Fields" } = $$props;
  let { showTitle = true } = $$props;
  const selectAll = () => {
    includedJson.set(["."]);
    root.checkAll(true);
  };
  let root;
  let monitoredFieldsEl;
  let monitoredFieldsBs;
  let expanded = true;
  onMount(() => {
    monitoredFieldsBs = window.bootstrap.Collapse.getOrCreateInstance(monitoredFieldsEl, { toggle: false });
  });
  function toggleCollapse() {
    if (!monitoredFieldsBs) {
      return;
    }
    if (expanded) {
      monitoredFieldsBs.show();
    } else {
      monitoredFieldsBs.hide();
    }
  }
  function expandable_1_expanded_binding(value) {
    expanded = value;
    $$invalidate(6, expanded);
  }
  const click_handler = () => {
    if (expandable) {
      $$invalidate(0, expandable = !expanded);
    }
  };
  function schemakeytree_root_binding(value) {
    root = value;
    $$invalidate(7, root);
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      monitoredFieldsEl = $$value;
      $$invalidate(8, monitoredFieldsEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("datasource" in $$props2)
      $$invalidate(1, datasource = $$props2.datasource);
    if ("includedJson" in $$props2)
      $$invalidate(2, includedJson = $$props2.includedJson);
    if ("expandable" in $$props2)
      $$invalidate(0, expandable = $$props2.expandable);
    if ("title" in $$props2)
      $$invalidate(3, title = $$props2.title);
    if ("showTitle" in $$props2)
      $$invalidate(4, showTitle = $$props2.showTitle);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 64) {
      toggleCollapse();
    }
  };
  return [
    expandable,
    datasource,
    includedJson,
    title,
    showTitle,
    selectAll,
    expanded,
    root,
    monitoredFieldsEl,
    expandable_1_expanded_binding,
    click_handler,
    schemakeytree_root_binding,
    div0_binding
  ];
}
class MonitoredFields extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      datasource: 1,
      includedJson: 2,
      expandable: 0,
      title: 3,
      showTitle: 4,
      selectAll: 5
    });
  }
  get selectAll() {
    return this.$$.ctx[5];
  }
}
function create_label_slot$1(ctx) {
  let span;
  let t_value = ctx[2].label + "";
  let t;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      attr(span, "slot", "label");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t_value !== (t_value = ctx2[2].label + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create_else_block$3(ctx) {
  let t_value = ctx[2].value + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t_value !== (t_value = ctx2[2].value + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block_3$2(ctx) {
  let if_block_anchor;
  let if_block = ctx[2].value === null && create_if_block_4$2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (ctx2[2].value === null) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_4$2(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_2$2(ctx) {
  let t0;
  let t1_value = ctx[2].value.length + "";
  let t1;
  let t2;
  let t3_value = typeof ctx[2].value;
  let t3;
  let t4;
  return {
    c() {
      t0 = text("List of ");
      t1 = text(t1_value);
      t2 = space();
      t3 = text(t3_value);
      t4 = text("(s)");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      insert(target, t2, anchor);
      insert(target, t3, anchor);
      insert(target, t4, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t1_value !== (t1_value = ctx2[2].value.length + ""))
        set_data(t1, t1_value);
      if (dirty & 4 && t3_value !== (t3_value = typeof ctx2[2].value))
        set_data(t3, t3_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(t4);
    }
  };
}
function create_if_block_1$2(ctx) {
  let t_value = ctx[2].value + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t_value !== (t_value = ctx2[2].value + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block$3(ctx) {
  let t_value = ctx[2].value + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t_value !== (t_value = ctx2[2].value + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block_4$2(ctx) {
  let t_value = ctx[2].value + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t_value !== (t_value = ctx2[2].value + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_meta_slot(ctx) {
  let span;
  let show_if;
  function select_block_type(ctx2, dirty) {
    if (dirty & 4)
      show_if = null;
    if (typeof ctx2[2].value === "string")
      return create_if_block$3;
    if (typeof ctx2[2].value === "number")
      return create_if_block_1$2;
    if (show_if == null)
      show_if = !!Array.isArray(ctx2[2].value);
    if (show_if)
      return create_if_block_2$2;
    if (typeof ctx2[2].value === "object")
      return create_if_block_3$2;
    return create_else_block$3;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      span = element("span");
      if_block.c();
      attr(span, "slot", "meta");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      if_block.m(span, null);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(span, null);
        }
      }
    },
    d(detaching) {
      if (detaching)
        detach(span);
      if_block.d();
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let treeview;
  let div_class_value;
  let current;
  const treeview_spread_levels = [{ root: ctx[2] }, ctx[3]];
  let treeview_props = {
    $$slots: {
      meta: [create_meta_slot, ({ node }) => ({ 2: node }), ({ node }) => node ? 4 : 0],
      label: [create_label_slot$1, ({ node }) => ({ 2: node }), ({ node }) => node ? 4 : 0]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < treeview_spread_levels.length; i += 1) {
    treeview_props = assign(treeview_props, treeview_spread_levels[i]);
  }
  treeview = new TreeView({ props: treeview_props });
  return {
    c() {
      div = element("div");
      create_component(treeview.$$.fragment);
      attr(div, "style", ctx[0]);
      attr(div, "class", div_class_value = "bg-body " + ctx[1]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(treeview, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const treeview_changes = dirty & 12 ? get_spread_update(treeview_spread_levels, [
        dirty & 4 && { root: ctx2[2] },
        dirty & 8 && get_spread_object(ctx2[3])
      ]) : {};
      if (dirty & 260) {
        treeview_changes.$$scope = { dirty, ctx: ctx2 };
      }
      treeview.$set(treeview_changes);
      if (!current || dirty & 1) {
        attr(div, "style", ctx2[0]);
      }
      if (!current || dirty & 2 && div_class_value !== (div_class_value = "bg-body " + ctx2[1])) {
        attr(div, "class", div_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(treeview);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let node;
  const omit_props_names = ["data", "style", "class"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { data } = $$props;
  let { style = "--tv-key-width: 25%;--tv-key-meta-grow: 1;" } = $$props;
  let count = 0;
  let { class: clazz = "" } = $$props;
  class Node extends BaseNode {
    constructor(id, label, parent = null, value) {
      super(id, label, parent);
      this.checkable = false;
      this.selectable = true;
      this.disabled = false;
      this._expanded = true;
      this.value = value;
    }
    getChildren() {
      return this.children ? this.children : [];
    }
  }
  function jsonToNode(json, label, node2, key, value) {
    let type = (typeof json).toString();
    if (Array.isArray(json))
      type = "array";
    let children = [];
    let newNode;
    if (type === "array") {
      newNode = new Node(count, `${key !== void 0 ? key + ": " : ""} []`, node2, json);
    } else if (type === "object") {
      newNode = new Node(count, `${key !== void 0 ? key + ": " : ""} {}`, node2, json);
    } else {
      newNode = new Node(count, `${key !== void 0 ? key + ": " : ""}`, node2, value);
    }
    count++;
    if (Array.isArray(json)) {
      children = json.map((value2, index) => jsonToNode(value2, value2, newNode, index, value2));
    } else if (type === "object" && json) {
      children = Object.keys(json).map((key2) => jsonToNode(json[key2], json[key2], newNode, key2, json[key2]));
    }
    newNode.children = children;
    return newNode;
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("data" in $$new_props)
      $$invalidate(4, data = $$new_props.data);
    if ("style" in $$new_props)
      $$invalidate(0, style = $$new_props.style);
    if ("class" in $$new_props)
      $$invalidate(1, clazz = $$new_props.class);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 16) {
      $$invalidate(2, node = jsonToNode(data != null ? data : {}, "{}", null, null));
    }
  };
  return [style, clazz, node, $$restProps, data];
}
class JSONDataTree extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { data: 4, style: 0, class: 1 });
  }
}
class SvelteTreeNode extends BaseNode {
  constructor({ id, node, parent }) {
    super(id, null, parent);
    this.node = node;
  }
}
function convertExpressionToSTNode(node) {
  let id = 0;
  const rootNode = function convert(node2, parent) {
    if (node2 instanceof Conditional || !(node2.parent instanceof Root) && node2 instanceof Block && node2.name === "_untitled_") {
      let children = [];
      for (const child of node2.children) {
        const convNodes = convert(child, parent);
        if (Array.isArray(convNodes)) {
          children = [...children, ...convNodes];
        } else {
          let convNode = convNodes;
          children.push(convNode);
        }
      }
      return children;
    }
    let stNode = new SvelteTreeNode({ id: id++, node: node2, parent });
    if (shouldAddChildren(node2)) {
      stNode.children = [];
      for (const child of node2.children) {
        if ((node2 instanceof Clause || node2 instanceof While) && node2.condition === child) {
          continue;
        }
        const convNodes = convert(child, stNode);
        if (Array.isArray(convNodes)) {
          stNode.children = [...stNode.children, ...convNodes];
        } else {
          let convNode = convNodes;
          stNode.children.push(convNode);
        }
      }
    }
    return stNode;
  }(node);
  return rootNode;
}
function shouldAddChildren(node) {
  if (node instanceof Block || node instanceof Conditional || node instanceof While || node instanceof Clause) {
    return true;
  }
  return false;
}
function create_else_block_3$1(ctx) {
  let t_value = getSummary(ctx[11].node) + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2048 && t_value !== (t_value = getSummary(ctx2[11].node) + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block_6$1(ctx) {
  let t0;
  let t1_value = getSummary(ctx[11].node.condition) + "";
  let t1;
  return {
    c() {
      t0 = text("While ");
      t1 = text(t1_value);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2048 && t1_value !== (t1_value = getSummary(ctx2[11].node.condition) + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
    }
  };
}
function create_if_block_4$1(ctx) {
  let show_if;
  let if_block_anchor;
  function select_block_type_3(ctx2, dirty) {
    if (dirty & 2048)
      show_if = null;
    if (show_if == null)
      show_if = !!(ctx2[11].node.parent.children.indexOf(ctx2[11].node) === 0);
    if (show_if)
      return create_if_block_5$1;
    return create_else_block_2$1;
  }
  let current_block_type = select_block_type_3(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_3(ctx2, dirty)) && if_block) {
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
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_1$1(ctx) {
  let if_block_anchor;
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[11].node.parent instanceof Root)
      return create_if_block_2$1;
    return create_else_block_1$1;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block) {
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
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block_2$1(ctx) {
  let t0;
  let t1_value = getSummary(ctx[11].node) + "";
  let t1;
  return {
    c() {
      t0 = text("Else if ");
      t1 = text(t1_value);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2048 && t1_value !== (t1_value = getSummary(ctx2[11].node) + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
    }
  };
}
function create_if_block_5$1(ctx) {
  let t0;
  let t1_value = getSummary(ctx[11].node) + "";
  let t1;
  return {
    c() {
      t0 = text("If ");
      t1 = text(t1_value);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2048 && t1_value !== (t1_value = getSummary(ctx2[11].node) + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
    }
  };
}
function create_else_block_1$1(ctx) {
  let t0;
  let t1_value = ctx[11].node.name + "";
  let t1;
  return {
    c() {
      t0 = text("Block ");
      t1 = text(t1_value);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2048 && t1_value !== (t1_value = ctx2[11].node.name + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
    }
  };
}
function create_if_block_2$1(ctx) {
  let div;
  let t;
  function select_block_type_2(ctx2, dirty) {
    var _a;
    if ((_a = ctx2[1]) == null ? void 0 : _a.isPlaying)
      return create_if_block_3$1;
    return create_else_block$2;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      t = text("Workflow\n            ");
      if_block.c();
      attr(div, "class", "d-flex justify-content-between align-items-center me-2 fw-bolder fs-6");
      set_style(div, "--bs-btn-passing-y", "0");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
      if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block.d();
    }
  };
}
function create_else_block$2(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Run";
      attr(button, "class", "btn btn-primary btn-xs py-0");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", stop_propagation(prevent_default(ctx[9])));
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3$1(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Stop";
      attr(button, "class", "btn btn-danger btn-sm py-0");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", ctx[8]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$2(ctx) {
  let expressionstatus;
  let current;
  expressionstatus = new ExpressionStatus({
    props: {
      node: ctx[11].node,
      stNode: ctx[11]
    }
  });
  return {
    c() {
      create_component(expressionstatus.$$.fragment);
    },
    m(target, anchor) {
      mount_component(expressionstatus, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const expressionstatus_changes = {};
      if (dirty & 2048)
        expressionstatus_changes.node = ctx2[11].node;
      if (dirty & 2048)
        expressionstatus_changes.stNode = ctx2[11];
      expressionstatus.$set(expressionstatus_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(expressionstatus.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(expressionstatus.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(expressionstatus, detaching);
    }
  };
}
function create_label_slot(ctx) {
  let div2;
  let div0;
  let t;
  let div1;
  let current;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (ctx2[11].node instanceof Block)
      return create_if_block_1$1;
    if (ctx2[11].node instanceof Clause)
      return create_if_block_4$1;
    if (ctx2[11].node instanceof While)
      return create_if_block_6$1;
    return create_else_block_3$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = ctx[1] && create_if_block$2(ctx);
  function click_handler_2() {
    return ctx[10](ctx[11]);
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      if_block0.c();
      t = space();
      div1 = element("div");
      if (if_block1)
        if_block1.c();
      attr(div0, "class", "flex-fill");
      set_style(div0, "overflow-wrap", "anywhere");
      attr(div1, "class", "flex-shrink-0");
      set_style(div1, "width", "20px");
      attr(div2, "slot", "label");
      attr(div2, "class", "d-flex");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      if_block0.m(div0, null);
      append(div2, t);
      append(div2, div1);
      if (if_block1)
        if_block1.m(div1, null);
      current = true;
      if (!mounted) {
        dispose = listen(div2, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div0, null);
        }
      }
      if (ctx[1]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & 2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      if_block0.d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$2(ctx) {
  let treeview;
  let current;
  treeview = new TreeView({
    props: {
      root: ctx[4],
      showRoot: ctx[0],
      showMeta: false,
      showIcon: false,
      class: "bg-white " + (ctx[0] ? "tree-view-ro" : ""),
      size: "small",
      $$slots: {
        label: [
          create_label_slot,
          ({ node: stNode }) => ({ 11: stNode }),
          ({ node: stNode }) => stNode ? 2048 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(treeview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(treeview, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const treeview_changes = {};
      if (dirty & 1)
        treeview_changes.showRoot = ctx2[0];
      if (dirty & 1)
        treeview_changes.class = "bg-white " + (ctx2[0] ? "tree-view-ro" : "");
      if (dirty & 6146) {
        treeview_changes.$$scope = { dirty, ctx: ctx2 };
      }
      treeview.$set(treeview_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(treeview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(treeview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(treeview, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $replayStatus;
  const dispatch = createEventDispatcher();
  let { tree } = $$props;
  let { showRoot = true } = $$props;
  let { expanded } = $$props;
  const replayStatus = getContext("replayStatus");
  component_subscribe($$self, replayStatus, (value) => $$invalidate(1, $replayStatus = value));
  const stRoot = convertExpressionToSTNode(tree.expression);
  if (expanded) {
    stRoot.setExpanded(true);
  }
  function onClick(stNode) {
    if (stNode.node.parent instanceof Root) {
      if (stNode.isExpanded()) {
        stNode.setExpanded(false);
      } else {
        stNode.setExpanded(true);
      }
    }
  }
  const click_handler = () => dispatch("stop");
  const click_handler_1 = () => dispatch("run");
  const click_handler_2 = (stNode) => {
    onClick(stNode);
  };
  $$self.$$set = ($$props2) => {
    if ("tree" in $$props2)
      $$invalidate(6, tree = $$props2.tree);
    if ("showRoot" in $$props2)
      $$invalidate(0, showRoot = $$props2.showRoot);
    if ("expanded" in $$props2)
      $$invalidate(7, expanded = $$props2.expanded);
  };
  return [
    showRoot,
    $replayStatus,
    dispatch,
    replayStatus,
    stRoot,
    onClick,
    tree,
    expanded,
    click_handler,
    click_handler_1,
    click_handler_2
  ];
}
class TreeViewRO extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { tree: 6, showRoot: 0, expanded: 7 });
  }
}
var ScraperSelector_svelte_svelte_type_style_lang = "";
function create_if_block_16(ctx) {
  let div;
  let t;
  let if_block1_anchor;
  let current;
  function select_block_type(ctx2, dirty) {
    var _a;
    if ((_a = ctx2[20]) == null ? void 0 : _a.isPlaying)
      return create_if_block_18;
    return create_else_block_3;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = ctx[4] && create_if_block_17(ctx);
  return {
    c() {
      div = element("div");
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      attr(div, "class", "d-flex");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block0.m(div, null);
      insert(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div, null);
        }
      }
      if (ctx2[4]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 16) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_17(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block0.d();
      if (detaching)
        detach(t);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function create_else_block_3(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.innerHTML = `<i class="fa fa-play"></i>
            Run`;
      attr(button, "class", "btn btn-success");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", ctx[29]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_18(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.innerHTML = `<i class="fa fa-pause"></i>
            Stop`;
      attr(button, "class", "btn btn-danger");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", ctx[30]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_17(ctx) {
  let div;
  let loadercircle;
  let current;
  loadercircle = new Loader({
    props: {
      state: ctx[14],
      style: "width: 20px; height: 20px;"
    }
  });
  return {
    c() {
      div = element("div");
      create_component(loadercircle.$$.fragment);
      attr(div, "class", "d-flex align-items-center");
      set_style(div, "padding", "0 3px");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(loadercircle, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const loadercircle_changes = {};
      if (dirty[0] & 16384)
        loadercircle_changes.state = ctx2[14];
      loadercircle.$set(loadercircle_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(loadercircle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(loadercircle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(loadercircle);
    }
  };
}
function create_catch_block_1(ctx) {
  return { c: noop, m: noop, p: noop, d: noop };
}
function create_then_block_1(ctx) {
  let div;
  let span;
  let t0_value = ctx[19].name + "";
  let t0;
  let span_title_value;
  let t1;
  let if_block = ctx[1] && ctx[11].description && create_if_block_15(ctx);
  return {
    c() {
      div = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      if (if_block)
        if_block.c();
      attr(span, "class", "text-truncate fw-bolder");
      attr(span, "title", span_title_value = ctx[19].name);
      attr(div, "class", "d-flex align-items-center gap-1 px-2");
      toggle_class(div, "flex-fill", !ctx[1]);
      set_style(div, "min-width", `0`);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span);
      append(span, t0);
      append(div, t1);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 524288 && t0_value !== (t0_value = ctx2[19].name + ""))
        set_data(t0, t0_value);
      if (dirty[0] & 524288 && span_title_value !== (span_title_value = ctx2[19].name)) {
        attr(span, "title", span_title_value);
      }
      if (ctx2[1] && ctx2[11].description) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_15(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & 2) {
        toggle_class(div, "flex-fill", !ctx2[1]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_15(ctx) {
  let a;
  let attachPopover_action;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      attr(a, "href", "#");
      attr(a, "role", "button");
      attr(a, "class", "fs-6 fa fa-info-circle text-dark-emphasis");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (!mounted) {
        dispose = [
          listen(a, "click", prevent_default(ctx[35])),
          action_destroyer(attachPopover_action = attachPopover.call(null, a, {
            content: ctx[11].description,
            trigger: "focus",
            placement: "right"
          }))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (attachPopover_action && is_function(attachPopover_action.update) && dirty[0] & 2048)
        attachPopover_action.update.call(null, {
          content: ctx2[11].description,
          trigger: "focus",
          placement: "right"
        });
    },
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_pending_block_1(ctx) {
  return { c: noop, m: noop, p: noop, d: noop };
}
function create_if_block_14(ctx) {
  let div;
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      a = element("a");
      attr(a, "href", "#");
      attr(a, "class", "fa fa-question-circle text-light position-absolute");
      set_style(a, "right", "10px");
      set_style(a, "top", "25%");
      attr(a, "role", "button");
      attr(div, "class", "position-relative text-truncate fs-5 bg-black text-white flex-fill text-center align-content-center px-1");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, a);
      if (!mounted) {
        dispose = [
          listen(a, "click", prevent_default(ctx[34])),
          action_destroyer(attachPopover.call(null, a, ctx[23]))
        ];
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_catch_block$1(ctx) {
  return {
    c: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
}
function create_then_block$1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && create_if_block_1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_1(ctx) {
  let div13;
  let div3;
  let div2;
  let div1;
  let t3;
  let button;
  let t5;
  let monitoredfields;
  let updating_selectAll;
  let t6;
  let t7;
  let div7;
  let div6;
  let div5;
  let t13;
  let t14;
  let t15;
  let t16;
  let div12;
  let div11;
  let div9;
  let t20;
  let div10;
  let t21;
  let current_block_type_index;
  let if_block5;
  let current;
  let mounted;
  let dispose;
  function monitoredfields_selectAll_binding(value) {
    ctx[36](value);
  }
  let monitoredfields_props = {
    showTitle: false,
    includedJson: ctx[16],
    datasource: ctx[12],
    expandable: false
  };
  if (ctx[10] !== void 0) {
    monitoredfields_props.selectAll = ctx[10];
  }
  monitoredfields = new MonitoredFields({ props: monitoredfields_props });
  binding_callbacks.push(() => bind(monitoredfields, "selectAll", monitoredfields_selectAll_binding));
  let if_block0 = !ctx[18].id && create_if_block_13(ctx);
  function select_block_type_1(ctx2, dirty) {
    var _a;
    if ((_a = ctx2[20]) == null ? void 0 : _a.isPlaying)
      return create_if_block_12;
    return create_else_block_2;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block1 = current_block_type(ctx);
  let if_block2 = ctx[5] && create_if_block_11(ctx);
  let if_block3 = ctx[4] && create_if_block_10(ctx);
  let if_block4 = !ctx[9] && create_if_block_9();
  const if_block_creators = [create_if_block_2, create_if_block_3, create_if_block_7];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    var _a;
    if ((_a = ctx2[20]) == null ? void 0 : _a.isPlaying)
      return 0;
    if (ctx2[6])
      return 1;
    if (ctx2[21])
      return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_2(ctx))) {
    if_block5 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div13 = element("div");
      div3 = element("div");
      div2 = element("div");
      div1 = element("div");
      div1.innerHTML = `<div class="text-secondary fw-bolder">1. Select Monitored Fields</div> 
              <span style="font-size: 12px" class="text-muted">Select the fields you want to receive notification for</span>`;
      t3 = space();
      button = element("button");
      button.textContent = "Select All";
      t5 = space();
      create_component(monitoredfields.$$.fragment);
      t6 = space();
      if (if_block0)
        if_block0.c();
      t7 = space();
      div7 = element("div");
      div6 = element("div");
      div5 = element("div");
      div5.innerHTML = `<div class="text-secondary fw-bolder">2. Workflow</div> 
              <span style="font-size: 12px" class="text-muted">Enter required input fields(if any) and press <strong>Run</strong> to start the scrape</span>`;
      t13 = space();
      if_block1.c();
      t14 = space();
      if (if_block2)
        if_block2.c();
      t15 = space();
      if (if_block3)
        if_block3.c();
      t16 = space();
      div12 = element("div");
      div11 = element("div");
      div9 = element("div");
      div9.innerHTML = `<div class="text-secondary fw-bolder">3. Results</div> 
              <span style="font-size: 12px" class="text-muted">Scraped data and errors will be shown here</span>`;
      t20 = space();
      div10 = element("div");
      if (if_block4)
        if_block4.c();
      t21 = space();
      if (if_block5)
        if_block5.c();
      set_style(button, "--bs-btn-padding-y", "0.25rem");
      attr(button, "class", "btn btn-secondary btn-xs align-self-center");
      attr(div2, "class", "px-2 py-1 d-flex justify-content-between border-bottom border-secondary-subtle");
      attr(div3, "class", "col overflow-auto svelte-14t6qep");
      attr(div6, "class", "px-2 py-1 d-flex justify-content-between");
      attr(div7, "class", "col overflow-auto svelte-14t6qep");
      attr(div9, "class", "ps-2 py-1 border-bottom border-secondary-subtle");
      attr(div10, "class", "results flex-fill overflow-auto");
      attr(div11, "class", "bottom d-flex flex-column");
      set_style(div11, "min-height", "0");
      attr(div12, "class", "col overflow-auto svelte-14t6qep");
      attr(div13, "class", "scraper-row row flex-fill overflow-auto svelte-14t6qep");
      set_style(div13, "--bs-gutter-x", "0", 1);
      set_style(div13, "--bs-gutter-y", "0", 1);
    },
    m(target, anchor) {
      insert(target, div13, anchor);
      append(div13, div3);
      append(div3, div2);
      append(div2, div1);
      append(div2, t3);
      append(div2, button);
      append(div3, t5);
      mount_component(monitoredfields, div3, null);
      append(div3, t6);
      if (if_block0)
        if_block0.m(div3, null);
      append(div13, t7);
      append(div13, div7);
      append(div7, div6);
      append(div6, div5);
      append(div6, t13);
      if_block1.m(div6, null);
      append(div7, t14);
      if (if_block2)
        if_block2.m(div7, null);
      append(div7, t15);
      if (if_block3)
        if_block3.m(div7, null);
      append(div13, t16);
      append(div13, div12);
      append(div12, div11);
      append(div11, div9);
      append(div11, t20);
      append(div11, div10);
      if (if_block4)
        if_block4.m(div10, null);
      append(div10, t21);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div10, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(ctx[10]))
            ctx[10].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const monitoredfields_changes = {};
      if (dirty[0] & 65536)
        monitoredfields_changes.includedJson = ctx[16];
      if (dirty[0] & 4096)
        monitoredfields_changes.datasource = ctx[12];
      if (!updating_selectAll && dirty[0] & 1024) {
        updating_selectAll = true;
        monitoredfields_changes.selectAll = ctx[10];
        add_flush_callback(() => updating_selectAll = false);
      }
      monitoredfields.$set(monitoredfields_changes);
      if (!ctx[18].id) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_13(ctx);
          if_block0.c();
          if_block0.m(div3, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block1) {
        if_block1.p(ctx, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div6, null);
        }
      }
      if (ctx[5]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
          if (dirty[0] & 32) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_11(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div7, t15);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (ctx[4]) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
          if (dirty[0] & 16) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block_10(ctx);
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(div7, null);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
      if (!ctx[9]) {
        if (if_block4)
          ;
        else {
          if_block4 = create_if_block_9();
          if_block4.c();
          if_block4.m(div10, t21);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        }
      } else {
        if (if_block5) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block5 = if_blocks[current_block_type_index];
          if (!if_block5) {
            if_block5 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
            if_block5.c();
          } else {
            if_block5.p(ctx, dirty);
          }
          transition_in(if_block5, 1);
          if_block5.m(div10, null);
        } else {
          if_block5 = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(monitoredfields.$$.fragment, local);
      transition_in(if_block2);
      transition_in(if_block3);
      transition_in(if_block5);
      current = true;
    },
    o(local) {
      transition_out(monitoredfields.$$.fragment, local);
      transition_out(if_block2);
      transition_out(if_block3);
      transition_out(if_block5);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div13);
      destroy_component(monitoredfields);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      if (if_block4)
        if_block4.d();
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_13(ctx) {
  let div;
  let t0;
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      t0 = text("Didn't find the fields you want to monitor?\n              ");
      a = element("a");
      a.textContent = "Select parts of page";
      attr(a, "href", "#");
      attr(div, "class", "p-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, a);
      if (!mounted) {
        dispose = listen(a, "click", ctx[31]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_2(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Run";
      set_style(button, "--bs-btn-padding-y", "0.25rem");
      attr(button, "class", "btn btn-success btn-xs align-self-center");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", ctx[29]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_12(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Stop";
      set_style(button, "--bs-btn-padding-y", "0.25rem");
      attr(button, "class", "btn btn-danger btn-xs align-self-center");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", ctx[30]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_11(ctx) {
  let inputfields;
  let updating_showInputFields;
  let updating_expanded;
  let current;
  function inputfields_showInputFields_binding(value) {
    ctx[37](value);
  }
  function inputfields_expanded_binding(value) {
    ctx[38](value);
  }
  let inputfields_props = {
    paramsFormModel: ctx[5]
  };
  if (ctx[8] !== void 0) {
    inputfields_props.showInputFields = ctx[8];
  }
  if (ctx[7] !== void 0) {
    inputfields_props.expanded = ctx[7];
  }
  inputfields = new InputFields({ props: inputfields_props });
  binding_callbacks.push(() => bind(inputfields, "showInputFields", inputfields_showInputFields_binding));
  binding_callbacks.push(() => bind(inputfields, "expanded", inputfields_expanded_binding));
  return {
    c() {
      create_component(inputfields.$$.fragment);
    },
    m(target, anchor) {
      mount_component(inputfields, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const inputfields_changes = {};
      if (dirty[0] & 32)
        inputfields_changes.paramsFormModel = ctx2[5];
      if (!updating_showInputFields && dirty[0] & 256) {
        updating_showInputFields = true;
        inputfields_changes.showInputFields = ctx2[8];
        add_flush_callback(() => updating_showInputFields = false);
      }
      if (!updating_expanded && dirty[0] & 128) {
        updating_expanded = true;
        inputfields_changes.expanded = ctx2[7];
        add_flush_callback(() => updating_expanded = false);
      }
      inputfields.$set(inputfields_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(inputfields.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(inputfields.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(inputfields, detaching);
    }
  };
}
function create_if_block_10(ctx) {
  let div;
  let t0;
  let loadercircle;
  let t1;
  let treeviewro;
  let current;
  loadercircle = new Loader({
    props: {
      state: ctx[14],
      style: "width: 20px; height: 20px;"
    }
  });
  treeviewro = new TreeViewRO({
    props: {
      tree: ctx[4],
      expanded: true,
      showRoot: false
    }
  });
  return {
    c() {
      div = element("div");
      t0 = text("Steps\n              ");
      create_component(loadercircle.$$.fragment);
      t1 = space();
      create_component(treeviewro.$$.fragment);
      attr(div, "class", "ps-2 py-1 text-secondary fw-bolder border-top border-bottom border-secondary-subtle d-flex justify-content-between");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      mount_component(loadercircle, div, null);
      insert(target, t1, anchor);
      mount_component(treeviewro, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const loadercircle_changes = {};
      if (dirty[0] & 16384)
        loadercircle_changes.state = ctx2[14];
      loadercircle.$set(loadercircle_changes);
      const treeviewro_changes = {};
      if (dirty[0] & 16)
        treeviewro_changes.tree = ctx2[4];
      treeviewro.$set(treeviewro_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(loadercircle.$$.fragment, local);
      transition_in(treeviewro.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(loadercircle.$$.fragment, local);
      transition_out(treeviewro.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(loadercircle);
      if (detaching)
        detach(t1);
      destroy_component(treeviewro, detaching);
    }
  };
}
function create_if_block_9(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "Run workflow and view the result here";
      attr(div, "class", "ps-2 pt-3");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_7(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_8, create_else_block_1];
  const if_blocks = [];
  function select_block_type_4(ctx2, dirty) {
    if (ctx2[2].length === 0 && ctx2[9])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_4(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_4(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_3(ctx) {
  let div;
  let t0;
  let span;
  let t1_value = ctx[6].message + "";
  let t1;
  let t2;
  let if_block1_anchor;
  let if_block0 = ctx[6].code && create_if_block_6(ctx);
  let if_block1 = ctx[6].code !== "E_INTERRUPT" && create_if_block_4(ctx);
  return {
    c() {
      div = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      attr(div, "class", "mt-4 ms-2 text-danger");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append(div, t0);
      append(div, span);
      append(span, t1);
      insert(target, t2, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (ctx2[6].code) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_6(ctx2);
          if_block0.c();
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty[0] & 64 && t1_value !== (t1_value = ctx2[6].message + ""))
        set_data(t1, t1_value);
      if (ctx2[6].code !== "E_INTERRUPT") {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_4(ctx2);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block0)
        if_block0.d();
      if (detaching)
        detach(t2);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function create_if_block_2(ctx) {
  let loader;
  let t0;
  let div;
  let current;
  loader = new Loader$1({
    props: {
      style: "margin: 0;background-color: rgba(0, 0, 0, 0);"
    }
  });
  return {
    c() {
      create_component(loader.$$.fragment);
      t0 = space();
      div = element("div");
      div.textContent = "Running Scraper...";
      attr(div, "class", "ps-2 pt-3");
    },
    m(target, anchor) {
      mount_component(loader, target, anchor);
      insert(target, t0, anchor);
      insert(target, div, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(loader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(loader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(loader, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
    }
  };
}
function create_else_block_1(ctx) {
  let jsondatatree;
  let current;
  jsondatatree = new JSONDataTree({
    props: {
      data: ctx[21],
      size: "small",
      class: "scraped-data",
      showRoot: false,
      style: "--tv-key-width: 40%;--tv-key-meta-grow: 1;--tv-key-meta-max-height: 200px;--tv-key-meta-overflow: auto;"
    }
  });
  return {
    c() {
      create_component(jsondatatree.$$.fragment);
    },
    m(target, anchor) {
      mount_component(jsondatatree, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const jsondatatree_changes = {};
      if (dirty[0] & 2097152)
        jsondatatree_changes.data = ctx2[21];
      jsondatatree.$set(jsondatatree_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(jsondatatree.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(jsondatatree.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(jsondatatree, detaching);
    }
  };
}
function create_if_block_8(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "No fields selected";
      attr(div, "class", "ps-2 pt-3 text-danger");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_6(ctx) {
  let b;
  let t_value = ctx[6].code + "";
  let t;
  let br;
  return {
    c() {
      b = element("b");
      t = text(t_value);
      br = element("br");
    },
    m(target, anchor) {
      insert(target, b, anchor);
      append(b, t);
      insert(target, br, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 64 && t_value !== (t_value = ctx2[6].code + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(b);
      if (detaching)
        detach(br);
    }
  };
}
function create_if_block_4(ctx) {
  let div;
  function select_block_type_3(ctx2, dirty) {
    if (ctx2[18].id)
      return create_if_block_5;
    return create_else_block$1;
  }
  let current_block_type = select_block_type_3(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "alert alert-info mt-4");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_3(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block.d();
    }
  };
}
function create_else_block$1(ctx) {
  let t0;
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      t0 = text("Try re-running the scraper, if the error persists try\n                      ");
      a = element("a");
      a.textContent = "Selecting parts of page";
      attr(a, "href", "#");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, a, anchor);
      if (!mounted) {
        dispose = listen(a, "click", ctx[31]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_5(ctx) {
  let t;
  return {
    c() {
      t = text("Try re-running the scraper");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_pending_block$1(ctx) {
  return {
    c: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
}
function create_if_block$1(ctx) {
  let div4;
  let div3;
  let div2;
  let div1;
  let div0;
  let t0;
  let help;
  let t1;
  let div5;
  let current;
  let mounted;
  let dispose;
  help = new Help({});
  return {
    c() {
      div4 = element("div");
      div3 = element("div");
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      div0.innerHTML = `<i class="fa fa-times"></i>`;
      t0 = space();
      create_component(help.$$.fragment);
      t1 = space();
      div5 = element("div");
      attr(div0, "class", "cursor-pointer");
      set_style(div0, "position", "absolute");
      set_style(div0, "top", "10px");
      set_style(div0, "right", "10px");
      attr(div1, "class", "modal-body");
      attr(div2, "class", "modal-content");
      attr(div3, "class", "modal-dialog");
      attr(div4, "class", "modal d-block");
      attr(div4, "data-bs-backdrop", "static");
      attr(div4, "tabindex", "-1");
      attr(div5, "class", "modal-backdrop fade show");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div3);
      append(div3, div2);
      append(div2, div1);
      append(div1, div0);
      append(div1, t0);
      mount_component(help, div1, null);
      insert(target, t1, anchor);
      insert(target, div5, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(div0, "click", ctx[39]),
          action_destroyer(portal.call(null, div4))
        ];
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(help.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(help.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div4);
      destroy_component(help);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div5);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$1(ctx) {
  let div2;
  let div1;
  let t0;
  let promise;
  let t1;
  let t2;
  let div0;
  let button0;
  let t4;
  let button1;
  let i1;
  let t5;
  let button2;
  let i2;
  let t6;
  let t7;
  let if_block2_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block0 = !ctx[1] && create_if_block_16(ctx);
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block_1,
    then: create_then_block_1,
    catch: create_catch_block_1,
    value: 52
  };
  handle_promise(promise = ctx[13], info);
  let if_block1 = ctx[1] && create_if_block_14(ctx);
  let info_1 = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block$1,
    then: create_then_block$1,
    catch: create_catch_block$1,
    value: 52,
    blocks: [, , ,]
  };
  handle_promise(ctx[25](), info_1);
  let if_block2 = ctx[3] && create_if_block$1(ctx);
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      info.block.c();
      t1 = space();
      if (if_block1)
        if_block1.c();
      t2 = space();
      div0 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fa fa-save"></i>
        Save`;
      t4 = space();
      button1 = element("button");
      i1 = element("i");
      t5 = space();
      button2 = element("button");
      i2 = element("i");
      t6 = space();
      info_1.block.c();
      t7 = space();
      if (if_block2)
        if_block2.c();
      if_block2_anchor = empty();
      attr(button0, "class", "btn btn-primary rounded-0 whitespace-nowrap");
      set_style(button0, "min-width", "125px");
      attr(i1, "class", "fa");
      toggle_class(i1, "fa-expand", !ctx[1]);
      toggle_class(i1, "fa-compress", ctx[1]);
      attr(button1, "class", "btn btn-default rounded-0");
      attr(button1, "title", TXT("a_expand"));
      attr(i2, "class", "fa fa-times");
      attr(button2, "class", "btn btn-default rounded-0");
      attr(button2, "title", TXT("a_close"));
      attr(div0, "class", "d-flex");
      attr(div1, "class", "d-flex whitespace-nowrap");
      attr(div2, "class", "d-flex flex-column w-full h-full");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div1);
      if (if_block0)
        if_block0.m(div1, null);
      append(div1, t0);
      info.block.m(div1, info.anchor = null);
      info.mount = () => div1;
      info.anchor = t1;
      append(div1, t1);
      if (if_block1)
        if_block1.m(div1, null);
      append(div1, t2);
      append(div1, div0);
      append(div0, button0);
      append(div0, t4);
      append(div0, button1);
      append(button1, i1);
      append(div0, t5);
      append(div0, button2);
      append(button2, i2);
      append(div2, t6);
      info_1.block.m(div2, info_1.anchor = null);
      info_1.mount = () => div2;
      info_1.anchor = null;
      insert(target, t7, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert(target, if_block2_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button0, "click", ctx[27]),
          listen(button1, "click", ctx[28]),
          listen(button2, "click", ctx[26])
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (!ctx[1]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty[0] & 2) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_16(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div1, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      info.ctx = ctx;
      if (dirty[0] & 8192 && promise !== (promise = ctx[13]) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
      if (ctx[1]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_14(ctx);
          if_block1.c();
          if_block1.m(div1, t2);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (!current || dirty[0] & 2) {
        toggle_class(i1, "fa-expand", !ctx[1]);
      }
      if (!current || dirty[0] & 2) {
        toggle_class(i1, "fa-compress", ctx[1]);
      }
      update_await_block_branch(info_1, ctx, dirty);
      if (ctx[3]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
          if (dirty[0] & 8) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$1(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(info_1.block);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      for (let i = 0; i < 3; i += 1) {
        const block = info_1.blocks[i];
        transition_out(block);
      }
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      if (if_block0)
        if_block0.d();
      info.block.d();
      info.token = null;
      info = null;
      if (if_block1)
        if_block1.d();
      info_1.block.d();
      info_1.token = null;
      info_1 = null;
      if (detaching)
        detach(t7);
      if (if_block2)
        if_block2.d(detaching);
      if (detaching)
        detach(if_block2_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
const SCRAPER_HELP_PREF_KEY = "scraper-help-modal-seen";
function instance$1($$self, $$props, $$invalidate) {
  let $model, $$unsubscribe_model = noop, $$subscribe_model = () => ($$unsubscribe_model(), $$unsubscribe_model = subscribe(model, ($$value) => $$invalidate(18, $model = $$value)), model);
  let $originalJson, $$unsubscribe_originalJson = noop, $$subscribe_originalJson = () => ($$unsubscribe_originalJson(), $$unsubscribe_originalJson = subscribe(originalJson, ($$value) => $$invalidate(41, $originalJson = $$value)), originalJson);
  let $includedJson, $$unsubscribe_includedJson = noop, $$subscribe_includedJson = () => ($$unsubscribe_includedJson(), $$unsubscribe_includedJson = subscribe(includedJson, ($$value) => $$invalidate(2, $includedJson = $$value)), includedJson);
  let $datasource, $$unsubscribe_datasource = noop, $$subscribe_datasource = () => ($$unsubscribe_datasource(), $$unsubscribe_datasource = subscribe(datasource, ($$value) => $$invalidate(19, $datasource = $$value)), datasource);
  let $replayStatus;
  let $previewJson, $$unsubscribe_previewJson = noop, $$subscribe_previewJson = () => ($$unsubscribe_previewJson(), $$unsubscribe_previewJson = subscribe(previewJson, ($$value) => $$invalidate(21, $previewJson = $$value)), previewJson);
  $$self.$$.on_destroy.push(() => $$unsubscribe_model());
  $$self.$$.on_destroy.push(() => $$unsubscribe_originalJson());
  $$self.$$.on_destroy.push(() => $$unsubscribe_includedJson());
  $$self.$$.on_destroy.push(() => $$unsubscribe_datasource());
  $$self.$$.on_destroy.push(() => $$unsubscribe_previewJson());
  let { model } = $$props;
  $$subscribe_model();
  let { state } = $$props;
  let { portReq } = $$props;
  const lsStore = new LSStore();
  const helpPopoverOpts = {
    content: createHelpContent(),
    html: true,
    trigger: "focus"
  };
  let expanded = state.expanded;
  let showScraperHelpModal = !lsStore.get(SCRAPER_HELP_PREF_KEY);
  let tree;
  let paramsFormModel;
  let replayError;
  let inputFieldsExpanded;
  let showInputFields;
  let firstRun = false;
  let selectAllFields;
  let replayStatus = writable();
  component_subscribe($$self, replayStatus, (value) => $$invalidate(20, $replayStatus = value));
  setContext("replayStatus", replayStatus);
  let workflow;
  let datasource;
  let workflowPromise = new Promise(() => {
  });
  let loaderState;
  let stores, originalJson, includedJson, previewJson;
  portReq.setEventMsgHandler((type, event) => {
    switch (type) {
      case "scraper:run:start":
        set_store_value(replayStatus, $replayStatus = event.replayStatus, $replayStatus);
        $$invalidate(14, loaderState = "running");
        phTrackEvent(PHEvents.EXT_SCRAPER_RUN_START);
        break;
      case "scraper:run:update":
        const { key, data } = event;
        updateReplayStatus(replayStatus, tree, key, data);
        break;
      case "scraper:run:complete":
        set_store_value(originalJson, $originalJson = event.result.data, $originalJson);
        $$invalidate(14, loaderState = "completed");
        phTrackEvent(PHEvents.EXT_SCRAPER_RUN_SUCCESS);
        break;
      case "scraper:run:error":
        const { error } = event;
        $$invalidate(6, replayError = StackedError.handle(error));
        $$invalidate(14, loaderState = "error");
        phTrackEvent(PHEvents.EXT_SCRAPER_RUN_ERROR);
        if ($replayStatus.errored[0] !== tree.expression) {
          set_store_value(replayStatus, $replayStatus.errored = [tree.expression, ...$replayStatus.errored], $replayStatus);
        }
        break;
      default:
        console.warn("Unhandled event type: ", type);
    }
  });
  portReq.sendRequest("subscribe");
  async function init2() {
    var _a, _b, _c, _d;
    const scraperState = state.scraper;
    let initialSelections = ["."];
    let vars = {};
    if ($model.id) {
      vars = $model.config.get("params");
      initialSelections = $model.config.get("filters").included;
    }
    vars = (_a = scraperState.params) != null ? _a : vars;
    initialSelections = (_b = scraperState.selections) != null ? _b : initialSelections;
    if (scraperState.datasource) {
      $$subscribe_datasource($$invalidate(12, datasource = new DatasourceModel(scraperState.datasource)));
    } else {
      $$subscribe_datasource($$invalidate(12, datasource = await fetchDatasource($model.datasource_id)));
    }
    if (scraperState.workflow) {
      $$invalidate(11, workflow = scraperState.workflow);
      $$invalidate(13, workflowPromise = Promise.resolve());
    } else {
      const workflowId = $datasource.datasource_params.workflow_id;
      $$invalidate(13, workflowPromise = fetchWorkflow(workflowId));
      $$invalidate(11, workflow = await workflowPromise);
    }
    $$invalidate(5, paramsFormModel = setupParams($datasource.spec.params, vars));
    saveState({ datasource, workflow });
    $$invalidate(4, tree = parseSteps(workflow.steps, workflow.tags.map((tag) => tag.name), { declarations: workflow.params_spec }));
    stores = initStores(initialSelections, (_d = (_c = scraperState.result) == null ? void 0 : _c.data) != null ? _d : void 0);
    $$subscribe_originalJson($$invalidate(15, { originalJson, includedJson, previewJson } = stores, originalJson, $$subscribe_includedJson($$invalidate(16, includedJson)), $$subscribe_previewJson($$invalidate(17, previewJson))));
    if (scraperState.replayStatus) {
      $$invalidate(9, firstRun = true);
      const status = scraperState.replayStatus;
      if (status.isPlaying) {
        $$invalidate(14, loaderState = "running");
        $$invalidate(7, inputFieldsExpanded = false);
      } else {
        if (scraperState.error) {
          $$invalidate(6, replayError = StackedError.handle(scraperState.error));
          $$invalidate(14, loaderState = "error");
        } else {
          $$invalidate(14, loaderState = "completed");
        }
      }
      parseAndSetReplayStatus(scraperState.replayStatus);
    }
    if (!firstRun) {
      setTimeout(() => startRun(), 300);
    }
  }
  function parseAndSetReplayStatus(rpStatus) {
    const newRpStatus = {
      isPlaying: rpStatus.isPlaying,
      error: rpStatus.error
    };
    for (const key of ["playing", "errored", "completed"]) {
      newRpStatus[key] = rpStatus[key].map((path) => tree.getNode(path));
    }
    set_store_value(replayStatus, $replayStatus = newRpStatus, $replayStatus);
  }
  async function fetchDatasource(datasourceId) {
    const datasource2 = new DatasourceModel({ id: datasourceId });
    await datasource2.fetch();
    return datasource2;
  }
  async function fetchWorkflow(workflowId) {
    return await Api.api(`/pagedb/workflows/${workflowId}`);
  }
  async function setHighlight(state2) {
    portReq.sendRequest("scraper/set-highlight", state2);
  }
  function phTrackEvent(name, data = {}) {
    trackEvent(name, {
      datasource_id: $datasource.id,
      datasource_name: $datasource.name,
      ...data
    });
  }
  function saveState(state2) {
    portReq.sendRequest("scraper/save-state", state2);
  }
  async function close() {
    phTrackEvent(PHEvents.EXT_SCRAPER_CANCELLED);
    portReq.sendEvent("close");
  }
  async function save() {
    if (!$includedJson.length) {
      showMsg("Please select fields to monitor before saving datasource.");
      return;
    }
    const metaToBeSaved = model.get("meta") || {
      source: {
        action: "add",
        user_id: await serviceProxy.auth.getId(),
        client_id: await serviceProxy.store.Prefs.get("client.id"),
        client_type: serviceProxy.CFG.CLIENT.TYPE
      }
    };
    await validateVars();
    const config = {
      filters: { included: $includedJson },
      params: paramsFormModel == null ? void 0 : paramsFormModel.toJSON()
    };
    model.set({
      content_type: C.TYPE_JSON,
      name: datasource.get("name"),
      config,
      meta: metaToBeSaved
    });
    const modelJSON = model.toJSON();
    portReq.sendEvent("save", modelJSON);
    phTrackEvent(PHEvents.EXT_SCRAPER_SAVED);
  }
  function sendUIState(expanded2) {
    let data = { expanded: expanded2 };
    window.parent.postMessage({ type: "show", data }, "*");
    portReq.sendEvent("uistate", data);
  }
  function showMsg(msg2) {
    return portReq.sendRequest("loader/request", {
      portSelector: 0,
      data: {
        path: "showMsg",
        data: { msg: msg2, hideAfter: 6e3 }
      }
    });
  }
  function toggleExpanded() {
    $$invalidate(1, expanded = !expanded);
  }
  async function validateVars() {
    if (!paramsFormModel) {
      return;
    }
    for (const field of Object.values(paramsFormModel.fields)) {
      if (get_store_value(field.error)) {
        if (expanded) {
          await showInputFields();
          field.el.focus();
        } else {
          $$invalidate(1, expanded = true);
          setTimeout(() => field.el.focus(), 500);
        }
        throw new Error("validation failed");
      }
    }
  }
  async function startRun() {
    $$invalidate(6, replayError = null);
    set_store_value(originalJson, $originalJson = "", $originalJson);
    if (tree.hasErrors()) {
      $$invalidate(6, replayError = new Error("Cannot run expression with errors"));
      return;
    }
    await validateVars();
    $$invalidate(7, inputFieldsExpanded = false);
    $$invalidate(9, firstRun = true);
    portReq.sendRequest("scraper/start-run", {
      datasourceId: $model.datasource_id,
      params: paramsFormModel == null ? void 0 : paramsFormModel.toJSON()
    });
  }
  function stopRun() {
    portReq.sendRequest("scraper/stop-run");
  }
  function createHelpContent() {
    const contentEl = document.createElement("div");
    new Help({ target: contentEl });
    return contentEl;
  }
  function switchToVS() {
    phTrackEvent(PHEvents.EXT_SCRAPER_SWITCH_TO_VS);
    setHighlight(false);
    serviceProxy.openSelector({ identityId: state.identityId });
  }
  function click_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function monitoredfields_selectAll_binding(value) {
    selectAllFields = value;
    $$invalidate(10, selectAllFields);
  }
  function inputfields_showInputFields_binding(value) {
    showInputFields = value;
    $$invalidate(8, showInputFields);
  }
  function inputfields_expanded_binding(value) {
    inputFieldsExpanded = value;
    $$invalidate(7, inputFieldsExpanded);
  }
  const click_handler_2 = () => {
    lsStore.set(SCRAPER_HELP_PREF_KEY, true);
    $$invalidate(3, showScraperHelpModal = false);
  };
  $$self.$$set = ($$props2) => {
    if ("model" in $$props2)
      $$subscribe_model($$invalidate(0, model = $$props2.model));
    if ("state" in $$props2)
      $$invalidate(32, state = $$props2.state);
    if ("portReq" in $$props2)
      $$invalidate(33, portReq = $$props2.portReq);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 2) {
      sendUIState(expanded);
    }
    if ($$self.$$.dirty[0] & 4) {
      saveState({ selections: $includedJson });
    }
  };
  return [
    model,
    expanded,
    $includedJson,
    showScraperHelpModal,
    tree,
    paramsFormModel,
    replayError,
    inputFieldsExpanded,
    showInputFields,
    firstRun,
    selectAllFields,
    workflow,
    datasource,
    workflowPromise,
    loaderState,
    originalJson,
    includedJson,
    previewJson,
    $model,
    $datasource,
    $replayStatus,
    $previewJson,
    lsStore,
    helpPopoverOpts,
    replayStatus,
    init2,
    close,
    save,
    toggleExpanded,
    startRun,
    stopRun,
    switchToVS,
    state,
    portReq,
    click_handler_1,
    click_handler,
    monitoredfields_selectAll_binding,
    inputfields_showInputFields_binding,
    inputfields_expanded_binding,
    click_handler_2
  ];
}
class ScraperSelector extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { model: 0, state: 32, portReq: 33 }, null, [-1, -1]);
  }
}
const MSG = {
  INIT: 1,
  EVENT: 2,
  REQUEST: 3,
  RESPONSE: 4
};
class PortRequest {
  constructor(port) {
    __publicField(this, "responseHandlers");
    __publicField(this, "reqId");
    __publicField(this, "port");
    __publicField(this, "onPortEvent");
    this.port = port;
    this.responseHandlers = {};
    this.reqId = 1;
    this.onMessageListener = (msg2) => {
      var _a;
      let { type, data } = msg2;
      switch (type) {
        case MSG.EVENT:
          (_a = this.onPortEvent) == null ? void 0 : _a.call(this, data.type, data.event);
          break;
        case MSG.RESPONSE:
          this.onPortResponse(msg2);
          break;
        default:
          console.warn("Unhandled msg type: ", msg2);
      }
    };
    this.port.onMessage.addListener(this.onMessageListener);
  }
  removeMessageListener() {
    this.port.onMessage.removeListener(this.onMessageListener);
  }
  generateReqID() {
    return this.reqId++;
  }
  setEventMsgHandler(evtHandler) {
    this.onPortEvent = evtHandler;
  }
  sendRequest(path, data) {
    return new Promise((resolve, reject) => {
      const _id = this.generateReqID();
      this.responseHandlers[_id] = (err, data2) => {
        err ? reject(err) : resolve(data2);
      };
      this.port.postMessage({ type: MSG.REQUEST, _id, path, data });
    });
  }
  sendEvent(type, event) {
    this.port.postMessage({
      type: MSG.EVENT,
      data: { type, event }
    });
  }
  onPortResponse(msg2) {
    let { _id, err, data } = msg2;
    let handler = this.responseHandlers[_id];
    if (handler) {
      delete this.responseHandlers[_id];
      handler(err, data);
    } else {
      console.error("Unhandled response: ", msg2);
    }
  }
}
function create_catch_block(ctx) {
  return {
    c: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
}
function create_then_block(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[3].datasource_id)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let htmlselector;
  let current;
  htmlselector = new HTMLSelector({
    props: {
      model: ctx[1],
      state: ctx[2],
      portReq: ctx[0]
    }
  });
  return {
    c() {
      create_component(htmlselector.$$.fragment);
    },
    m(target, anchor) {
      mount_component(htmlselector, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const htmlselector_changes = {};
      if (dirty & 2)
        htmlselector_changes.model = ctx2[1];
      if (dirty & 4)
        htmlselector_changes.state = ctx2[2];
      if (dirty & 1)
        htmlselector_changes.portReq = ctx2[0];
      htmlselector.$set(htmlselector_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(htmlselector.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(htmlselector.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(htmlselector, detaching);
    }
  };
}
function create_if_block(ctx) {
  let scraperselector;
  let current;
  scraperselector = new ScraperSelector({
    props: {
      model: ctx[1],
      state: ctx[2],
      portReq: ctx[0]
    }
  });
  return {
    c() {
      create_component(scraperselector.$$.fragment);
    },
    m(target, anchor) {
      mount_component(scraperselector, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const scraperselector_changes = {};
      if (dirty & 2)
        scraperselector_changes.model = ctx2[1];
      if (dirty & 4)
        scraperselector_changes.state = ctx2[2];
      if (dirty & 1)
        scraperselector_changes.portReq = ctx2[0];
      scraperselector.$set(scraperselector_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(scraperselector.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(scraperselector.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(scraperselector, detaching);
    }
  };
}
function create_pending_block(ctx) {
  let t;
  return {
    c() {
      t = text("Loading...");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment(ctx) {
  let await_block_anchor;
  let current;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block,
    value: 9,
    blocks: [, , ,]
  };
  handle_promise(Promise.all([ctx[4](), ctx[5](), ctx[6]()]), info);
  return {
    c() {
      await_block_anchor = empty();
      info.block.c();
    },
    m(target, anchor) {
      insert(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
      current = true;
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      update_await_block_branch(info, ctx, dirty);
    },
    i(local) {
      if (current)
        return;
      transition_in(info.block);
      current = true;
    },
    o(local) {
      for (let i = 0; i < 3; i += 1) {
        const block = info.blocks[i];
        transition_out(block);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(await_block_anchor);
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $model, $$unsubscribe_model = noop, $$subscribe_model = () => ($$unsubscribe_model(), $$unsubscribe_model = subscribe(model, ($$value) => $$invalidate(3, $model = $$value)), model);
  $$self.$$.on_destroy.push(() => $$unsubscribe_model());
  let portReq;
  let model;
  let state;
  let user;
  let clients = new ModelClient.Clients();
  async function syncUser() {
    try {
      user = await serviceProxy.store.UserStore.findOne({ id: await serviceProxy.auth.getId() });
      let locale = (user ? user.locale : await serviceProxy.store.Prefs.get("locale")) || "en-US";
      await identifyUser({
        user: new base.Model(user),
        clientId: serviceProxy.clientId
      });
      await loadLang(locale);
    } catch (e) {
      await loadLang("en-US");
    }
  }
  async function fetchClients() {
    await clients.fetch({
      data: {
        "state.in": [0, 30],
        "type.nin": [C.CLIENT_WEB, C.CLIENT_ANY],
        _opt: { order: ["ts"] }
      }
    });
    window.App.clients = clients;
  }
  async function initPort() {
    const portInitPromise = new RejectablePromise();
    const port = chrome.runtime.connect({ name: "selector:{}" });
    $$invalidate(0, portReq = new PortRequest(port));
    portReq.setEventMsgHandler((type, event) => {
      if (type === "init") {
        $$subscribe_model($$invalidate(1, model = new Model.Sieve(event == null ? void 0 : event.model, { parse: true })));
        $$invalidate(2, state = event == null ? void 0 : event.state);
        portInitPromise.resolve();
      }
    });
    return portInitPromise;
  }
  return [portReq, model, state, $model, syncUser, fetchClients, initPort];
}
class AppHTMLSelector extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { AppHTMLSelector as default };
