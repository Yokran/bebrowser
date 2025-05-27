import { S as SvelteComponent, i as init, s as safe_not_equal, p as element, r as text, q as space, v as attr, y as insert, z as append, A as listen, D as is_function, G as set_data, E as noop, C as detach, L as run_all, w as src_url_equal, O as toggle_class, B as prevent_default, K as subscribe, c as create_component, U as empty, x as set_style, m as mount_component, P as action_destroyer, H as group_outros, d as transition_out, I as check_outros, t as transition_in, e as destroy_component, F as destroy_each, j as component_subscribe, h as getContext, Y as onMount, a0 as onDestroy, a7 as update_keyed_each, a8 as outro_and_destroy_block, ag as flush, ae as get_store_value, aa as setContext } from "./index.21aef151.js";
import { C, T as TXT, M as Model, aX as identifyUser, A as Api, a3 as trackEvent, a4 as PHEvents, aV as Self, a2 as location, aU as replace, b as Msg, aY as updateTeam, aZ as updateRoute, a_ as loadLang, R as Router } from "./json-parser.f519fd70.js";
import { S as SPRINTF, b as Selector, c as checkSieveConstraint, d as Message, M as ModelLabel } from "./Message.d6d97d2b.js";
import { s as serviceProxy } from "./service.04a32097.js";
import { D as Datasources } from "./store.bb54b007.js";
function wrap(args) {
  if (!args) {
    throw Error("Parameter args is required");
  }
  if (!args.component == !args.asyncComponent) {
    throw Error("One and only one of component and asyncComponent is required");
  }
  if (args.component) {
    args.asyncComponent = () => Promise.resolve(args.component);
  }
  if (typeof args.asyncComponent != "function") {
    throw Error("Parameter asyncComponent must be a function");
  }
  if (args.conditions) {
    if (!Array.isArray(args.conditions)) {
      args.conditions = [args.conditions];
    }
    for (let i = 0; i < args.conditions.length; i++) {
      if (!args.conditions[i] || typeof args.conditions[i] != "function") {
        throw Error("Invalid parameter conditions[" + i + "]");
      }
    }
  }
  if (args.loadingComponent) {
    args.asyncComponent.loading = args.loadingComponent;
    args.asyncComponent.loadingParams = args.loadingParams || void 0;
  }
  const obj = {
    component: args.asyncComponent,
    userData: args.userData,
    conditions: args.conditions && args.conditions.length ? args.conditions : void 0,
    props: args.props && Object.keys(args.props).length ? args.props : {},
    _sveltesparouter: true
  };
  return obj;
}
var popup = "";
var SieveLimit_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let div1;
  let div0;
  let t0_value = SPRINTF("m_monitor_constraint_1", ctx[0], ctx[1]) + "";
  let t0;
  let t1;
  let t2_value = SPRINTF("m_monitor_constraint_2") + "";
  let t2;
  let t3;
  let ul;
  let li0;
  let a0;
  let i0;
  let t4;
  let t5_value = SPRINTF("a_go_to_watchlist") + "";
  let t5;
  let t6;
  let t7_value = SPRINTF("m_monitor_constraint_3") + "";
  let t7;
  let t8;
  let li1;
  let a1;
  let i1;
  let t9;
  let t10_value = SPRINTF("a_go_to_billing") + "";
  let t10;
  let t11;
  let t12_value = SPRINTF("m_monitor_constraint_4") + "";
  let t12;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      t2 = text(t2_value);
      t3 = space();
      ul = element("ul");
      li0 = element("li");
      a0 = element("a");
      i0 = element("i");
      t4 = space();
      t5 = text(t5_value);
      t6 = text(" : ");
      t7 = text(t7_value);
      t8 = space();
      li1 = element("li");
      a1 = element("a");
      i1 = element("i");
      t9 = space();
      t10 = text(t10_value);
      t11 = text(": ");
      t12 = text(t12_value);
      attr(i0, "class", "fa fa-link");
      attr(a0, "href", "/ui/inbox.html");
      attr(i1, "class", "fa fa-link");
      attr(a1, "href", serviceProxy.CFG.URL.APP + "#/settings/billing/");
      attr(div0, "class", "alert alert-danger");
      attr(div1, "class", "xmonitor-limit svelte-rpyckn");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, t0);
      append(div0, t1);
      append(div0, t2);
      append(div0, t3);
      append(div0, ul);
      append(ul, li0);
      append(li0, a0);
      append(a0, i0);
      append(a0, t4);
      append(a0, t5);
      append(a0, t6);
      append(a0, t7);
      append(ul, t8);
      append(ul, li1);
      append(li1, a1);
      append(a1, i1);
      append(a1, t9);
      append(a1, t10);
      append(a1, t11);
      append(a1, t12);
      if (!mounted) {
        dispose = [
          listen(a0, "click", function() {
            if (is_function(ctx[2]))
              ctx[2].apply(this, arguments);
          }),
          listen(a1, "click", function() {
            if (is_function(ctx[2]))
              ctx[2].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (dirty & 3 && t0_value !== (t0_value = SPRINTF("m_monitor_constraint_1", ctx[0], ctx[1]) + ""))
        set_data(t0, t0_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div1);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { count } = $$props;
  let { limit } = $$props;
  let { openURL } = $$props;
  $$self.$$set = ($$props2) => {
    if ("count" in $$props2)
      $$invalidate(0, count = $$props2.count);
    if ("limit" in $$props2)
      $$invalidate(1, limit = $$props2.limit);
    if ("openURL" in $$props2)
      $$invalidate(2, openURL = $$props2.openURL);
  };
  return [count, limit, openURL];
}
class SieveLimit extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { count: 0, limit: 1, openURL: 2 });
  }
}
var PopupSieveItem_svelte_svelte_type_style_lang = "";
function create_if_block_2$1(ctx) {
  let t;
  return {
    c() {
      t = text("(deleted)");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_else_block$2(ctx) {
  let div;
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[4].text)
      return create_if_block_1$1;
    return create_else_block_1$1;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "small");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block) {
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
function create_if_block$2(ctx) {
  let div;
  let t0_value = (ctx[4].err.code || "EUNKNOWN") + "";
  let t0;
  let t1;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = text(" error encountered");
      attr(div, "class", "small error");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && t0_value !== (t0_value = (ctx2[4].err.code || "EUNKNOWN") + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_else_block_1$1(ctx) {
  let t;
  return {
    c() {
      t = text("There is no preview yet");
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
function create_if_block_1$1(ctx) {
  let t_value = ctx[4].text + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && t_value !== (t_value = ctx2[4].text + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$2(ctx) {
  let li5;
  let a0;
  let img;
  let img_src_value;
  let t0;
  let div1;
  let div0;
  let t1;
  let t2_value = ctx[4].name + "";
  let t2;
  let t3;
  let a0_href_value;
  let t4;
  let div2;
  let button;
  let t5;
  let ul;
  let li0;
  let a1;
  let t7;
  let li1;
  let a2;
  let t9;
  let li2;
  let a3;
  let t11;
  let li3;
  let t12;
  let li4;
  let a4;
  let mounted;
  let dispose;
  let if_block0 = ctx[4].state == C.STATE_DISCARD && create_if_block_2$1();
  function select_block_type(ctx2, dirty) {
    if (ctx2[4].err)
      return create_if_block$2;
    return create_else_block$2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  return {
    c() {
      li5 = element("li");
      a0 = element("a");
      img = element("img");
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      if (if_block0)
        if_block0.c();
      t1 = space();
      t2 = text(t2_value);
      t3 = space();
      if_block1.c();
      t4 = space();
      div2 = element("div");
      button = element("button");
      button.innerHTML = `<i class="fa fa-ellipsis-h"></i>`;
      t5 = space();
      ul = element("ul");
      li0 = element("li");
      a1 = element("a");
      a1.textContent = "Mark as Read";
      t7 = space();
      li1 = element("li");
      a2 = element("a");
      a2.textContent = "Show Change History";
      t9 = space();
      li2 = element("li");
      a3 = element("a");
      a3.textContent = "Check for changes";
      t11 = space();
      li3 = element("li");
      t12 = space();
      li4 = element("li");
      a4 = element("a");
      a4.textContent = "Move to Trash";
      attr(img, "width", "16");
      attr(img, "height", "16");
      attr(img, "class", "mt-4");
      if (!src_url_equal(img.src, img_src_value = serviceProxy.CFG.URL.APP + "/v1/getfavicon?url=" + escape(ctx[6])))
        attr(img, "src", img_src_value);
      attr(img, "loading", "lazy");
      attr(div0, "class", "xtitle nowrap xellipsis pb-1");
      attr(div1, "class", "flex-grow p-3");
      attr(a0, "href", a0_href_value = ctx[4].uri);
      attr(a0, "class", "xitem flex pl-2 hover:bg-gray-100 no-underline hover:no-underline");
      toggle_class(a0, "xread", ctx[5]);
      attr(button, "class", "btn btn-default btn-sm px-2 svelte-1jheeq8");
      attr(button, "data-bs-toggle", "dropdown");
      attr(a1, "class", "dropdown-item");
      attr(a1, "href", "#");
      toggle_class(li0, "disabled", ctx[5]);
      attr(a2, "class", "dropdown-item");
      attr(a2, "href", "#");
      attr(a3, "class", "dropdown-item");
      attr(a3, "href", "#");
      toggle_class(li2, "disabled", ctx[4].client_id !== ctx[3]);
      attr(li3, "class", "divider");
      attr(a4, "class", "dropdown-item");
      attr(a4, "href", "#");
      attr(ul, "class", "dropdown-menu dropdown-menu-right");
      attr(div2, "class", "xoverflow absolute top-0 right-2 dropdown svelte-1jheeq8");
      attr(li5, "class", "relative svelte-1jheeq8");
    },
    m(target, anchor) {
      insert(target, li5, anchor);
      append(li5, a0);
      append(a0, img);
      append(a0, t0);
      append(a0, div1);
      append(div1, div0);
      if (if_block0)
        if_block0.m(div0, null);
      append(div0, t1);
      append(div0, t2);
      append(div1, t3);
      if_block1.m(div1, null);
      append(li5, t4);
      append(li5, div2);
      append(div2, button);
      append(div2, t5);
      append(div2, ul);
      append(ul, li0);
      append(li0, a1);
      append(ul, t7);
      append(ul, li1);
      append(li1, a2);
      append(ul, t9);
      append(ul, li2);
      append(li2, a3);
      append(ul, t11);
      append(ul, li3);
      append(ul, t12);
      append(ul, li4);
      append(li4, a4);
      if (!mounted) {
        dispose = [
          listen(a0, "click", prevent_default(ctx[8])),
          listen(a1, "click", prevent_default(ctx[9])),
          listen(a2, "click", prevent_default(ctx[10])),
          listen(a3, "click", prevent_default(ctx[11])),
          listen(a4, "click", prevent_default(ctx[12]))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 64 && !src_url_equal(img.src, img_src_value = serviceProxy.CFG.URL.APP + "/v1/getfavicon?url=" + escape(ctx2[6]))) {
        attr(img, "src", img_src_value);
      }
      if (ctx2[4].state == C.STATE_DISCARD) {
        if (if_block0)
          ;
        else {
          if_block0 = create_if_block_2$1();
          if_block0.c();
          if_block0.m(div0, t1);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & 16 && t2_value !== (t2_value = ctx2[4].name + ""))
        set_data(t2, t2_value);
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div1, null);
        }
      }
      if (dirty & 16 && a0_href_value !== (a0_href_value = ctx2[4].uri)) {
        attr(a0, "href", a0_href_value);
      }
      if (dirty & 32) {
        toggle_class(a0, "xread", ctx2[5]);
      }
      if (dirty & 32) {
        toggle_class(li0, "disabled", ctx2[5]);
      }
      if (dirty & 24) {
        toggle_class(li2, "disabled", ctx2[4].client_id !== ctx2[3]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(li5);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $sieve, $$unsubscribe_sieve = noop, $$subscribe_sieve = () => ($$unsubscribe_sieve(), $$unsubscribe_sieve = subscribe(sieve, ($$value) => $$invalidate(4, $sieve = $$value)), sieve);
  $$self.$$.on_destroy.push(() => $$unsubscribe_sieve());
  let { sieve } = $$props;
  $$subscribe_sieve();
  let { openAndMarkRead } = $$props;
  let { openChangeHistory } = $$props;
  let { currentClientId } = $$props;
  let id = $sieve.id;
  let isRead = $sieve && sieve.isRead();
  let host = "";
  try {
    host = "//" + new URL($sieve.uri).host;
  } catch (e) {
  }
  const click_handler = (e) => openAndMarkRead(id);
  const click_handler_1 = (e) => sieve.markRead();
  const click_handler_2 = (e) => openChangeHistory(id);
  const click_handler_3 = (e) => serviceProxy.service.checkNow([id]);
  const click_handler_4 = (e) => sieve.moveToTrash();
  $$self.$$set = ($$props2) => {
    if ("sieve" in $$props2)
      $$subscribe_sieve($$invalidate(0, sieve = $$props2.sieve));
    if ("openAndMarkRead" in $$props2)
      $$invalidate(1, openAndMarkRead = $$props2.openAndMarkRead);
    if ("openChangeHistory" in $$props2)
      $$invalidate(2, openChangeHistory = $$props2.openChangeHistory);
    if ("currentClientId" in $$props2)
      $$invalidate(3, currentClientId = $$props2.currentClientId);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 17) {
      {
        $$invalidate(5, isRead = $sieve && sieve.isRead());
      }
    }
  };
  return [
    sieve,
    openAndMarkRead,
    openChangeHistory,
    currentClientId,
    $sieve,
    isRead,
    host,
    id,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4
  ];
}
class PopupSieveItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      sieve: 0,
      openAndMarkRead: 1,
      openChangeHistory: 2,
      currentClientId: 3
    });
  }
}
async function findContentType(tab) {
  const results = await new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: {
          tabId: tab.id,
          allFrames: false
        },
        func: getContentType
      },
      resolve
    );
  });
  const result = results[0].result;
  return { monitorType: result.type, hasFeed: result.hasFeed };
}
function getContentType() {
  const contentType = document.contentType;
  const textContent = document.body.textContent;
  const htmlContent = document.body.innerHTML;
  let type = "html";
  let hasFeed = false;
  if (contentType && contentType !== "text/plain") {
    switch (contentType) {
      case "application/rss+xml":
      case "application/atom+xml":
        return { type: "feed" };
      case "text/xml":
      case "application/xml":
        type = parseXml();
        return { type };
      case "application/json":
        return { type: "json" };
      case "application/pdf":
        return { type: "pdf" };
      case "text/html":
      case "application/xhtml+xml":
        hasFeed = document.querySelectorAll('[type="application/rss+xml"],[type="application/atom+xml"]').length > 0;
        return { type: "html", hasFeed };
    }
  } else {
    if (textContent == null ? void 0 : textContent.startsWith("{")) {
      try {
        JSON.parse(textContent);
        return { type: "json" };
      } catch (e) {
      }
    } else if (htmlContent && (htmlContent == null ? void 0 : htmlContent.includes('type="application/pdf"'))) {
      return { type: "pdf" };
    } else if (textContent && (textContent.startsWith("<?xml") || htmlContent.includes("webkit-xml-viewer-source-xml"))) {
      type = parseXml();
      return { type };
    }
  }
  function parseXml() {
    if (textContent) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textContent, "text/xml");
      if (xmlDoc.documentElement) {
        const rootTagName = xmlDoc.documentElement.tagName.toLowerCase();
        const startsWithFeedOrRss = rootTagName.startsWith("feed") || rootTagName.startsWith("rss");
        const xmlViewerElement = document.getElementById("webkit-xml-viewer-source-xml");
        if (startsWithFeedOrRss) {
          return "feed";
        } else if (xmlViewerElement) {
          const firstChild = xmlViewerElement.firstElementChild;
          if (firstChild && (firstChild.tagName.toLowerCase() === "rss" || firstChild.tagName.toLowerCase() === "feed")) {
            return "feed";
          }
        }
      }
    }
    return "xml";
  }
  return { type };
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[46] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[49] = list[i];
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[52] = list[i];
  return child_ctx;
}
function create_if_block_6(ctx) {
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      a.textContent = "Enable Monitoring";
      attr(a, "class", "xnav-a error");
      attr(a, "href", "#");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (!mounted) {
        dispose = listen(a, "click", ctx[25]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_1(ctx) {
  var _a;
  let button;
  let i;
  let i_class_value;
  let t0;
  let t1_value = ((_a = ctx[16][ctx[7]]) == null ? void 0 : _a.text) + "";
  let t1;
  let mounted;
  let dispose;
  return {
    c() {
      var _a2, _b;
      button = element("button");
      i = element("i");
      t0 = space();
      t1 = text(t1_value);
      attr(i, "class", i_class_value = ((_b = (_a2 = ctx[16][ctx[7]]) == null ? void 0 : _a2.icon) != null ? _b : "fa fa-plus") + " mr-1");
      attr(button, "class", "btn btn-success btn-sm text-left");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, i);
      append(button, t0);
      append(button, t1);
      if (!mounted) {
        dispose = listen(button, "click", ctx[30]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      var _a2, _b, _c;
      if (dirty[0] & 128 && i_class_value !== (i_class_value = ((_b = (_a2 = ctx2[16][ctx2[7]]) == null ? void 0 : _a2.icon) != null ? _b : "fa fa-plus") + " mr-1")) {
        attr(i, "class", i_class_value);
      }
      if (dirty[0] & 128 && t1_value !== (t1_value = ((_c = ctx2[16][ctx2[7]]) == null ? void 0 : _c.text) + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_5(ctx) {
  let button;
  let i;
  let t0;
  let t1_value = ![VS, FP].includes(ctx[10].id) ? "Monitor " : "";
  let t1;
  let t2;
  let t3_value = TXT(ctx[10].text) + "";
  let t3;
  let button_title_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      i = element("i");
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      t3 = text(t3_value);
      attr(i, "class", "fa fa-plus mr-1");
      attr(button, "class", "btn btn-success btn-sm text-left text-truncate");
      attr(button, "title", button_title_value = TXT(ctx[10].text));
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, i);
      append(button, t0);
      append(button, t1);
      append(button, t2);
      append(button, t3);
      if (!mounted) {
        dispose = listen(button, "click", ctx[29]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & 1024 && t1_value !== (t1_value = ![VS, FP].includes(ctx2[10].id) ? "Monitor " : ""))
        set_data(t1, t1_value);
      if (dirty[0] & 1024 && t3_value !== (t3_value = TXT(ctx2[10].text) + ""))
        set_data(t3, t3_value);
      if (dirty[0] & 1024 && button_title_value !== (button_title_value = TXT(ctx2[10].text))) {
        attr(button, "title", button_title_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_4(ctx) {
  let li0;
  let t1;
  let t2;
  let li1;
  let each_value_2 = ctx[9];
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  return {
    c() {
      li0 = element("li");
      li0.innerHTML = `<h6 class="dropdown-header">Managed Scrapers</h6>`;
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      li1 = element("li");
      li1.innerHTML = `<hr class="dropdown-divider"/>`;
    },
    m(target, anchor) {
      insert(target, li0, anchor);
      insert(target, t1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, t2, anchor);
      insert(target, li1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 67110400) {
        each_value_2 = ctx2[9];
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(t2.parentNode, t2);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_2.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(li0);
      if (detaching)
        detach(t1);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(li1);
    }
  };
}
function create_each_block_2(ctx) {
  let li;
  let a;
  let img;
  let img_src_value;
  let t0;
  let t1_value = TXT(ctx[52].text) + "";
  let t1;
  let mounted;
  let dispose;
  function click_handler_2() {
    return ctx[31](ctx[52]);
  }
  return {
    c() {
      li = element("li");
      a = element("a");
      img = element("img");
      t0 = space();
      t1 = text(t1_value);
      if (!src_url_equal(img.src, img_src_value = "/ui/img/Distill-Logo-80-Template.png"))
        attr(img, "src", img_src_value);
      set_style(img, "width", "17px");
      set_style(img, "aspect-ratio", "1");
      attr(a, "href", "#");
      attr(a, "class", "dropdown-item");
      set_style(a, "--bs-dropdown-item-padding-x", "0.75rem");
      toggle_class(a, "active", ctx[10].id === ctx[52].id);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, img);
      append(a, t0);
      append(a, t1);
      if (!mounted) {
        dispose = listen(a, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & 512 && t1_value !== (t1_value = TXT(ctx[52].text) + ""))
        set_data(t1, t1_value);
      if (dirty[0] & 1536) {
        toggle_class(a, "active", ctx[10].id === ctx[52].id);
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
function create_if_block_3(ctx) {
  var _a, _b;
  let li;
  let a;
  let i;
  let i_class_value;
  let t0;
  let t1_value = (ctx[8] ? (_a = ctx[16]["feed"]) == null ? void 0 : _a.text : (_b = ctx[16][ctx[7]]) == null ? void 0 : _b.text) + "";
  let t1;
  let mounted;
  let dispose;
  return {
    c() {
      var _a2, _b2;
      li = element("li");
      a = element("a");
      i = element("i");
      t0 = space();
      t1 = text(t1_value);
      attr(i, "class", i_class_value = (ctx[8] ? (_a2 = ctx[16]["feed"]) == null ? void 0 : _a2.icon : (_b2 = ctx[16][ctx[7]]) == null ? void 0 : _b2.icon) + " mr-1");
      attr(a, "href", "#");
      attr(a, "class", "dropdown-item");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, i);
      append(a, t0);
      append(a, t1);
      if (!mounted) {
        dispose = listen(a, "click", ctx[32]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      var _a2, _b2, _c, _d;
      if (dirty[0] & 384 && i_class_value !== (i_class_value = (ctx2[8] ? (_a2 = ctx2[16]["feed"]) == null ? void 0 : _a2.icon : (_b2 = ctx2[16][ctx2[7]]) == null ? void 0 : _b2.icon) + " mr-1")) {
        attr(i, "class", i_class_value);
      }
      if (dirty[0] & 384 && t1_value !== (t1_value = (ctx2[8] ? (_c = ctx2[16]["feed"]) == null ? void 0 : _c.text : (_d = ctx2[16][ctx2[7]]) == null ? void 0 : _d.text) + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_1(ctx) {
  let li;
  let a;
  let i;
  let t0;
  let t1_value = TXT(ctx[49].text) + "";
  let t1;
  let t2;
  let mounted;
  let dispose;
  function click_handler_4() {
    return ctx[33](ctx[49]);
  }
  return {
    c() {
      li = element("li");
      a = element("a");
      i = element("i");
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      attr(i, "class", ctx[49].icon + " mr-1");
      attr(a, "href", "#");
      attr(a, "class", "dropdown-item");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, i);
      append(a, t0);
      append(a, t1);
      append(li, t2);
      if (!mounted) {
        dispose = listen(a, "click", click_handler_4);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      dispose();
    }
  };
}
function create_else_block$1(ctx) {
  let div;
  let t0_value = TXT("m_popup_empty") + "";
  let t0;
  let t1;
  let a;
  let t2_value = TXT("l_get_started") + "";
  let t2;
  let t3;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      a = element("a");
      t2 = text(t2_value);
      t3 = text(" with Web Monitoring");
      attr(a, "class", "block");
      attr(a, "href", serviceProxy.CFG.URL.WELCOME);
      attr(div, "class", "p-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
      append(div, a);
      append(a, t2);
      append(a, t3);
      if (!mounted) {
        dispose = listen(a, "click", ctx[23]);
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_2(ctx) {
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let current;
  let each_value = ctx[12].models;
  const get_key = (ctx2) => ctx2[46].id;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 6295556) {
        each_value = ctx2[12].models;
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block, each_1_anchor, get_each_context);
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "Loading...";
      attr(div, "class", "pl-5 pt-2");
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
function create_each_block(key_1, ctx) {
  let first;
  let popupsieveitem;
  let current;
  popupsieveitem = new PopupSieveItem({
    props: {
      currentClientId: ctx[2],
      sieve: ctx[46],
      openAndMarkRead: ctx[21],
      openChangeHistory: ctx[22]
    }
  });
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(popupsieveitem.$$.fragment);
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      mount_component(popupsieveitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const popupsieveitem_changes = {};
      if (dirty[0] & 4)
        popupsieveitem_changes.currentClientId = ctx[2];
      if (dirty[0] & 4096)
        popupsieveitem_changes.sieve = ctx[46];
      popupsieveitem.$set(popupsieveitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(popupsieveitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(popupsieveitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(first);
      destroy_component(popupsieveitem, detaching);
    }
  };
}
function create_if_block$1(ctx) {
  let sievelimit;
  let current;
  sievelimit = new SieveLimit({
    props: {
      count: ctx[5],
      limit: ctx[6],
      openURL: ctx[23]
    }
  });
  return {
    c() {
      create_component(sievelimit.$$.fragment);
    },
    m(target, anchor) {
      mount_component(sievelimit, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const sievelimit_changes = {};
      if (dirty[0] & 32)
        sievelimit_changes.count = ctx2[5];
      if (dirty[0] & 64)
        sievelimit_changes.limit = ctx2[6];
      sievelimit.$set(sievelimit_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(sievelimit.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sievelimit.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(sievelimit, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let div7;
  let div6;
  let div1;
  let watchlistselector;
  let t0;
  let div0;
  let t1;
  let t2;
  let a0;
  let t3_value = TXT("a_go_to_watchlist") + "";
  let t3;
  let t4;
  let div5;
  let div2;
  let t5;
  let button0;
  let t6;
  let ul0;
  let t7;
  let t8;
  let t9;
  let div4;
  let button1;
  let i0;
  let t10;
  let button2;
  let i1;
  let t11;
  let div3;
  let button3;
  let t12;
  let ul1;
  let li0;
  let a1;
  let t14;
  let li1;
  let a2;
  let t15;
  let t16_value = ctx[3] ? "OFF" : "ON";
  let t16;
  let t17;
  let ul2;
  let current_block_type_index;
  let if_block4;
  let t18;
  let if_block5_anchor;
  let current;
  let mounted;
  let dispose;
  watchlistselector = new Selector({
    props: {
      openURL: ctx[23],
      showWatchlist: ctx[0],
      team: ctx[1]
    }
  });
  let if_block0 = !ctx[3] && create_if_block_6(ctx);
  function select_block_type(ctx2, dirty) {
    if (ctx2[7] === "html")
      return create_if_block_5;
    return create_else_block_1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  let if_block2 = ctx[9].length && create_if_block_4(ctx);
  let if_block3 = (ctx[7] !== "html" || ctx[8]) && create_if_block_3(ctx);
  let each_value_1 = ctx[15];
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const if_block_creators = [create_if_block_1, create_if_block_2, create_else_block$1];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[11] === true)
      return 0;
    if (ctx2[12].models.length > 0)
      return 1;
    return 2;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block4 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block5 = ctx[4] && create_if_block$1(ctx);
  return {
    c() {
      div7 = element("div");
      div6 = element("div");
      div1 = element("div");
      create_component(watchlistselector.$$.fragment);
      t0 = space();
      div0 = element("div");
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      a0 = element("a");
      t3 = text(t3_value);
      t4 = space();
      div5 = element("div");
      div2 = element("div");
      if_block1.c();
      t5 = space();
      button0 = element("button");
      t6 = space();
      ul0 = element("ul");
      if (if_block2)
        if_block2.c();
      t7 = space();
      if (if_block3)
        if_block3.c();
      t8 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t9 = space();
      div4 = element("div");
      button1 = element("button");
      i0 = element("i");
      t10 = space();
      button2 = element("button");
      i1 = element("i");
      t11 = space();
      div3 = element("div");
      button3 = element("button");
      t12 = space();
      ul1 = element("ul");
      li0 = element("li");
      a1 = element("a");
      a1.textContent = `${TXT("a_check_changes_all")}`;
      t14 = space();
      li1 = element("li");
      a2 = element("a");
      t15 = text("Turn local monitoring ");
      t16 = text(t16_value);
      t17 = space();
      ul2 = element("ul");
      if_block4.c();
      t18 = space();
      if (if_block5)
        if_block5.c();
      if_block5_anchor = empty();
      attr(div0, "class", "flex-grow");
      attr(a0, "class", "xnav-a");
      attr(a0, "href", serviceProxy.CFG.URL.WATCHLIST);
      attr(div1, "class", "d-flex items-stretch shadow-sm");
      attr(button0, "class", "btn btn-success ml-1 btn-sm dropdown-toggle border-start");
      set_style(button0, "max-width", "35px");
      attr(button0, "data-bs-toggle", "dropdown");
      attr(ul0, "class", "dropdown-menu");
      attr(div2, "class", "btn-group flex-grow");
      set_style(div2, "min-width", "0");
      attr(i0, "class", "fa fa-check");
      attr(button1, "class", "btn btn-default btn-sm");
      attr(button1, "title", TXT("a_mark_read"));
      attr(i1, "class", "fa fa-external-link");
      attr(button2, "class", "btn btn-default btn-sm");
      attr(button2, "title", TXT("a_open_unread_in_tab"));
      attr(button3, "class", "btn btn-default btn-sm dropdown-toggle");
      attr(button3, "data-bs-toggle", "dropdown");
      attr(a1, "href", "#");
      attr(a1, "class", "dropdown-item");
      attr(a2, "href", "#");
      attr(a2, "class", "dropdown-item");
      attr(ul1, "class", "dropdown-menu dropdown-menu-right");
      attr(div3, "class", "btn-group");
      attr(div3, "role", "group");
      attr(div4, "class", "btn-group");
      attr(div5, "class", "d-flex align-items-center gap-3 p-3");
      attr(div6, "class", "bg-gray-100 shadow-sm z-10");
      attr(ul2, "class", "list-group flex-grow overflow-x-hidden");
      attr(div7, "class", "flex flex-column fixed top-0 left-0 right-0 bottom-0");
    },
    m(target, anchor) {
      insert(target, div7, anchor);
      append(div7, div6);
      append(div6, div1);
      mount_component(watchlistselector, div1, null);
      append(div1, t0);
      append(div1, div0);
      append(div1, t1);
      if (if_block0)
        if_block0.m(div1, null);
      append(div1, t2);
      append(div1, a0);
      append(a0, t3);
      append(div6, t4);
      append(div6, div5);
      append(div5, div2);
      if_block1.m(div2, null);
      append(div2, t5);
      append(div2, button0);
      append(div2, t6);
      append(div2, ul0);
      if (if_block2)
        if_block2.m(ul0, null);
      append(ul0, t7);
      if (if_block3)
        if_block3.m(ul0, null);
      append(ul0, t8);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul0, null);
        }
      }
      append(div5, t9);
      append(div5, div4);
      append(div4, button1);
      append(button1, i0);
      append(div4, t10);
      append(div4, button2);
      append(button2, i1);
      append(div4, t11);
      append(div4, div3);
      append(div3, button3);
      append(div3, t12);
      append(div3, ul1);
      append(ul1, li0);
      append(li0, a1);
      append(ul1, t14);
      append(ul1, li1);
      append(li1, a2);
      append(a2, t15);
      append(a2, t16);
      append(div7, t17);
      append(div7, ul2);
      if_blocks[current_block_type_index].m(ul2, null);
      insert(target, t18, anchor);
      if (if_block5)
        if_block5.m(target, anchor);
      insert(target, if_block5_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(a0, "click", ctx[24]),
          listen(button1, "click", ctx[19]),
          listen(button2, "click", serviceProxy.service.openAllAndMarkRead),
          listen(a1, "click", ctx[18]),
          listen(a2, "click", ctx[25]),
          action_destroyer(clickInterceptor.call(null, div7))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const watchlistselector_changes = {};
      if (dirty[0] & 2)
        watchlistselector_changes.team = ctx2[1];
      watchlistselector.$set(watchlistselector_changes);
      if (!ctx2[3]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_6(ctx2);
          if_block0.c();
          if_block0.m(div1, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div2, t5);
        }
      }
      if (ctx2[9].length) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_4(ctx2);
          if_block2.c();
          if_block2.m(ul0, t7);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (ctx2[7] !== "html" || ctx2[8]) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
        } else {
          if_block3 = create_if_block_3(ctx2);
          if_block3.c();
          if_block3.m(ul0, t8);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (dirty[0] & 67141632) {
        each_value_1 = ctx2[15];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul0, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
      if ((!current || dirty[0] & 8) && t16_value !== (t16_value = ctx2[3] ? "OFF" : "ON"))
        set_data(t16, t16_value);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block4 = if_blocks[current_block_type_index];
        if (!if_block4) {
          if_block4 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block4.c();
        } else {
          if_block4.p(ctx2, dirty);
        }
        transition_in(if_block4, 1);
        if_block4.m(ul2, null);
      }
      if (ctx2[4]) {
        if (if_block5) {
          if_block5.p(ctx2, dirty);
          if (dirty[0] & 16) {
            transition_in(if_block5, 1);
          }
        } else {
          if_block5 = create_if_block$1(ctx2);
          if_block5.c();
          transition_in(if_block5, 1);
          if_block5.m(if_block5_anchor.parentNode, if_block5_anchor);
        }
      } else if (if_block5) {
        group_outros();
        transition_out(if_block5, 1, 1, () => {
          if_block5 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(watchlistselector.$$.fragment, local);
      transition_in(if_block4);
      transition_in(if_block5);
      current = true;
    },
    o(local) {
      transition_out(watchlistselector.$$.fragment, local);
      transition_out(if_block4);
      transition_out(if_block5);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div7);
      destroy_component(watchlistselector);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      destroy_each(each_blocks, detaching);
      if_blocks[current_block_type_index].d();
      if (detaching)
        detach(t18);
      if (if_block5)
        if_block5.d(detaching);
      if (detaching)
        detach(if_block5_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
const VS_PREFS_KEY = "visual-selector-prefs";
const VS = "VS";
const FP = "FP";
function preventDefault(e) {
  if (e.target.tagName === "A" && e.target.href) {
    let url = new URL(e.target.href);
    if (url.hash === "") {
      e.preventDefault();
    }
  }
}
function clickInterceptor(el) {
  el.addEventListener("click", preventDefault);
  return {
    destroy() {
      el.removeEventListener("click", preventDefault);
    }
  };
}
function getPref(url) {
  const vsPrefs = App.store.get(VS_PREFS_KEY);
  if (!vsPrefs) {
    return;
  }
  return vsPrefs[url.hostname];
}
function savePref(url, pref) {
  var _a;
  const vsPrefs = (_a = App.store.get(VS_PREFS_KEY)) != null ? _a : {};
  vsPrefs[url.hostname] = pref;
  App.store.set(VS_PREFS_KEY, vsPrefs);
}
function instance$1($$self, $$props, $$invalidate) {
  let $dsStore;
  let $isSyncing;
  let $sieves;
  let { tab } = $$props;
  let { hidePopup: hidePopup2 } = $$props;
  const sieves = new Model.Sieves(
    null,
    {
      comparator: (model) => {
        return -new Date(model.get("ts_data"));
      }
    }
  );
  component_subscribe($$self, sieves, (value) => $$invalidate(12, $sieves = value));
  let isSyncing = sieves.syncing;
  component_subscribe($$self, isSyncing, (value) => $$invalidate(11, $isSyncing = value));
  const pConstraint = checkSieveConstraint(1);
  const defaultItems = [
    {
      id: VS,
      text: TXT("a_monitor_page_elements"),
      icon: "fa fa-plus"
    },
    {
      id: FP,
      text: TXT("a_monitor_page"),
      icon: "fa fa-file-o"
    }
  ];
  const iconAndTextMappings = {
    feed: {
      icon: "fa fa-rss",
      text: TXT("a_monitor_feed")
    },
    xml: {
      icon: "fa fa-file-code-o",
      text: TXT("a_monitor_xml")
    },
    json: { text: TXT("a_monitor_json") },
    pdf: {
      icon: "fa fa-file-pdf-o",
      text: TXT("a_monitor_pdf")
    }
  };
  let labels = getContext("labels");
  let user = getContext("user");
  let identityId;
  let currentClientId;
  let dsStore = new Datasources();
  component_subscribe($$self, dsStore, (value) => $$invalidate(35, $dsStore = value));
  dsStore.setOpt({ order: ["-priority"] });
  let isActive;
  let isOverLimit = false;
  let count = 0;
  let limit = 5;
  let monitorType = "html";
  let hasFeed = false;
  let url = new URL(tab.url);
  let dsItems = [];
  let actionItem = defaultItems[0];
  fetchCurrentClientId().then(() => {
    identifyUser({ user, clientId: currentClientId });
  });
  fetchAll();
  onMount(async () => {
    $$invalidate(3, isActive = await serviceProxy.isActive());
    if (!/^http/.exec(tab.url)) {
      return;
    }
    const { monitorType: updatedMonitorType, hasFeed: updatedHasFeed } = await findContentType(tab);
    $$invalidate(7, monitorType = updatedMonitorType);
    $$invalidate(8, hasFeed = updatedHasFeed);
    if (monitorType === "html") {
      fetchDatasources();
    }
  });
  onDestroy(async () => {
    $$invalidate(27, tab = null);
  });
  async function close2() {
    hidePopup2();
  }
  async function checkAllForChanges() {
    let res = await serviceProxy.store.SieveStore.find({ state: 40, client_id: currentClientId }, { only: ["id"], limit: 1e3 });
    await serviceProxy.service.checkNow(_.pluck(res.data, "id"));
    _.delay(checkWorkerState, 2e3);
    async function checkWorkerState() {
      if (await serviceProxy.Scheduler.isBusy()) {
        _.delay(checkWorkerState, 2e3);
      }
    }
  }
  async function checkIfCanAdd() {
    let constraint;
    try {
      constraint = await pConstraint;
    } catch (e) {
      console.error(e);
      constraint = { isOverLimit: false };
    }
    $$invalidate(4, isOverLimit = constraint.isOverLimit);
    $$invalidate(5, count = constraint.count);
    $$invalidate(6, limit = constraint.limit);
    return !isOverLimit;
  }
  async function fetchCurrentClientId() {
    $$invalidate(2, currentClientId = await serviceProxy.store.Prefs.get("client.id"));
  }
  function fetchAll() {
    return Promise.all([
      labels.fetch(),
      sieves.fetch({
        data: {
          "state.in": [40, 45],
          _opt: {
            limit: 40,
            order: ["-ts_data"],
            only: [
              "id",
              "name",
              "uri",
              "tags",
              "text",
              "ts_data",
              "ts_view",
              "err",
              "client_id"
            ]
          }
        }
      })
    ]);
  }
  async function markAllRead() {
    for (let sieve of sieves.models) {
      await sieve.markRead();
    }
  }
  async function openContentSelector(monitorType2, datasourceId) {
    if (await checkIfCanAdd()) {
      close2();
      if (monitorType2 === "html") {
        serviceProxy.openSelector({ identityId, datasourceId });
      } else {
        try {
          await serviceProxy.addSieveForTab(identityId, monitorType2);
        } catch (e) {
          alert(e.msg || e.message);
        }
      }
    }
  }
  async function openAndMarkRead(id) {
    let sieve = sieves.get(id);
    await sieve.markRead();
    await serviceProxy.service.showURL(sieve.get("uri"));
    close2();
  }
  async function openChangeHistory(id) {
    await serviceProxy.service.showInInbox(id, identityId);
    close2();
  }
  function openURL(e) {
    e.preventDefault();
    chrome.tabs.create({ url: e.target.href }, close2);
  }
  async function gotoWatchlist() {
    await serviceProxy.service.showWatchlist(identityId);
    close2();
  }
  function showMinilist(_iid) {
    $$invalidate(1, identityId = _iid);
    Api.setIdentityId(identityId);
    fetchAll();
  }
  async function toggleService(btn) {
    await serviceProxy.service.toggleService();
    $$invalidate(3, isActive = await serviceProxy.isActive());
  }
  async function watchTab() {
    if (await checkIfCanAdd()) {
      close2();
      await serviceProxy.watchTab({ identityId });
    }
  }
  async function fetchDatasources() {
    var _a, _b;
    if (!user.isLoggedIn()) {
      return;
    }
    await dsStore.fetch({
      data: {
        "regex.pcre": url.toJSON(),
        domain_name: url.host,
        datasource_type: "scraper_mds",
        "datasource_params:->>'workflow_id'.ne": "$null",
        state: 40,
        "schema.ne": "$null",
        async: false
      }
    });
    $$invalidate(9, dsItems = $dsStore.models.map((model) => ({
      id: model.get("id"),
      text: model.get("name")
    })));
    const pref = getPref(url);
    let prefItem;
    if (pref) {
      prefItem = (_a = defaultItems.find((it) => it.id === pref)) != null ? _a : dsItems.find((it) => it.id === pref);
    }
    $$invalidate(10, actionItem = (_b = prefItem != null ? prefItem : dsItems[0]) != null ? _b : defaultItems[0]);
  }
  function onSelect(item) {
    savePref(url, item.id);
    if (item.id === FP) {
      return watchTab();
    }
    if (item.id === VS) {
      return openContentSelector("html");
    }
    trackEvent(PHEvents.EXT_SCRAPER_OPEN, {
      datasource_id: item.id,
      datasource_name: item.text
    });
    openContentSelector("html", item.id);
  }
  const click_handler = () => onSelect(actionItem);
  const click_handler_1 = () => openContentSelector(monitorType);
  const click_handler_2 = (dsItem) => onSelect(dsItem);
  const click_handler_3 = () => openContentSelector(hasFeed ? "feed" : monitorType);
  const click_handler_4 = (defaultItem) => onSelect(defaultItem);
  $$self.$$set = ($$props2) => {
    if ("tab" in $$props2)
      $$invalidate(27, tab = $$props2.tab);
    if ("hidePopup" in $$props2)
      $$invalidate(28, hidePopup2 = $$props2.hidePopup);
  };
  return [
    showMinilist,
    identityId,
    currentClientId,
    isActive,
    isOverLimit,
    count,
    limit,
    monitorType,
    hasFeed,
    dsItems,
    actionItem,
    $isSyncing,
    $sieves,
    sieves,
    isSyncing,
    defaultItems,
    iconAndTextMappings,
    dsStore,
    checkAllForChanges,
    markAllRead,
    openContentSelector,
    openAndMarkRead,
    openChangeHistory,
    openURL,
    gotoWatchlist,
    toggleService,
    onSelect,
    tab,
    hidePopup2,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4
  ];
}
class Popup extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { tab: 27, hidePopup: 28, showMinilist: 0 }, null, [-1, -1]);
  }
  get showMinilist() {
    return this.$$.ctx[0];
  }
}
function create_else_block(ctx) {
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
function create_if_block(ctx) {
  let router;
  let current;
  router = new Router({ props: { routes: ctx[1] } });
  router.$on("routeLoaded", ctx[2]);
  return {
    c() {
      create_component(router.$$.fragment);
    },
    m(target, anchor) {
      mount_component(router, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const router_changes = {};
      if (dirty & 2)
        router_changes.routes = ctx2[1];
      router.$set(router_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(router.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(router.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(router, detaching);
    }
  };
}
function create_fragment(ctx) {
  let message;
  let t;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  message = new Message({});
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      create_component(message.$$.fragment);
      t = space();
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(message, target, anchor);
      insert(target, t, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
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
      transition_in(message.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(message.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      destroy_component(message, detaching);
      if (detaching)
        detach(t);
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function hidePopup() {
  close();
}
function instance($$self, $$props, $$invalidate) {
  let { labels = new ModelLabel.Labels() } = $$props;
  let { user = new Self() } = $$props;
  let tab;
  let loaded = false;
  let routes;
  if (get_store_value(location) === "/") {
    replace("/w/0/list/all");
  }
  setContext("api", Api.api);
  setContext("labels", labels);
  setContext("user", user);
  onMount(async () => {
    try {
      await isReady();
      await syncUser();
      if (!await serviceProxy.auth.isReady()) {
        showLogin();
      }
      chrome.tabs.query({ currentWindow: true, active: true }, ([_tab]) => {
        tab = _tab;
        $$invalidate(1, routes = {
          "/w/:team/:module/:prefix": wrap({
            component: Popup,
            props: { tab, hidePopup }
          })
        });
        $$invalidate(0, loaded = true);
      });
    } catch (e) {
      console.error("error while Service init", e);
      Msg.error(`Error while loading the app. ${e.message}.Please try again later or contact support if problem persists.`, null, e);
    }
  });
  async function routeLoaded(event) {
    var _a, _b, _c, _d;
    const team = (_c = (_b = (_a = event.detail) == null ? void 0 : _a.params) == null ? void 0 : _b.team) != null ? _c : "0";
    const routeName = (_d = event.detail) == null ? void 0 : _d.route;
    updateTeam(team);
    updateRoute(routeName);
  }
  async function isReady() {
    return new Promise(async (resolve, reject) => {
      if (await serviceProxy.service.isReady()) {
        if (await serviceProxy.auth.isReady()) {
          resolve(void 0);
        } else {
          showLogin();
        }
      } else {
        const serviceInfo = await serviceProxy.service.getInfo();
        if (serviceInfo.initError) {
          return reject(serviceInfo.initError);
        }
        serviceProxy.serviceEvents.on("init", resolve);
        serviceProxy.serviceEvents.on("init:error", reject);
      }
    });
  }
  async function syncUser() {
    let tUser = await serviceProxy.store.UserStore.findOne({ id: await serviceProxy.auth.getId() });
    if (tUser) {
      user.set(tUser);
      user.fetch().catch((e) => console.error("error syncing user ", e));
    }
    labels.fetch();
    let locale = tUser ? tUser.locale : await serviceProxy.store.Prefs.get("locale");
    await loadLang(locale || "en-US");
  }
  async function showLogin() {
    chrome.tabs.query({ url: serviceProxy.CFG.URL.AUTH + "/*" }, async ([tab2, ...rest]) => {
      let url = serviceProxy.CFG.URL.LOGIN;
      if (tab2) {
        chrome.tabs.update(tab2.id, { active: true, url });
      } else {
        chrome.tabs.create({ url });
      }
      hidePopup();
    });
  }
  $$self.$$set = ($$props2) => {
    if ("labels" in $$props2)
      $$invalidate(3, labels = $$props2.labels);
    if ("user" in $$props2)
      $$invalidate(4, user = $$props2.user);
  };
  return [loaded, routes, routeLoaded, labels, user];
}
class AppPopup extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { labels: 3, user: 4 });
  }
  get labels() {
    return this.$$.ctx[3];
  }
  set labels(labels) {
    this.$$set({ labels });
    flush();
  }
  get user() {
    return this.$$.ctx[4];
  }
  set user(user) {
    this.$$set({ user });
    flush();
  }
}
export { AppPopup as default };
