import { S as SvelteComponent, i as init, s as safe_not_equal, p as element, c as create_component, q as space, U as empty, v as attr, y as insert, m as mount_component, t as transition_in, d as transition_out, C as detach, e as destroy_component, Y as onMount, E as noop } from "./index.21aef151.js";
import { C as ConfirmBtn, a as Checkbox } from "./AppLocal.d8abe63b.js";
import { F as FormModel, T as TXT } from "./json-parser.7cb2f04e.js";
import { s as serviceProxy } from "./service.04a32097.js";
import "./Message.fcbba7db.js";
import "./SchemaKeyTree.96209fd8.js";
import "./Card.0607fce4.js";
function create_default_slot_1(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = `${TXT("m_clear_browser_data")}`;
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let checkbox;
  let current;
  checkbox = new Checkbox({
    props: {
      field: ctx[1].fields.close_to_tray,
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(checkbox.$$.fragment);
      attr(div, "class", "gap-2 mb-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(checkbox, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const checkbox_changes = {};
      if (dirty & 64) {
        checkbox_changes.$$scope = { dirty, ctx: ctx2 };
      }
      checkbox.$set(checkbox_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(checkbox.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(checkbox.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(checkbox);
    }
  };
}
function create_default_slot(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = `${TXT("m_minimize_to_tray")}`;
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let confirmbtn;
  let t0;
  let span;
  let t2;
  let if_block_anchor;
  let current;
  confirmbtn = new ConfirmBtn({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  confirmbtn.$on("click", ctx[3]);
  let if_block = !ctx[0] && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      create_component(confirmbtn.$$.fragment);
      t0 = space();
      span = element("span");
      span.textContent = "Browser's cookies and local storage will be cleared";
      t2 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      attr(div, "class", "mt-2");
      attr(span, "class", "help ms-1");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(confirmbtn, div, null);
      insert(target, t0, anchor);
      insert(target, span, anchor);
      insert(target, t2, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const confirmbtn_changes = {};
      if (dirty & 64) {
        confirmbtn_changes.$$scope = { dirty, ctx: ctx2 };
      }
      confirmbtn.$set(confirmbtn_changes);
      if (!ctx2[0])
        if_block.p(ctx2, dirty);
    },
    i(local) {
      if (current)
        return;
      transition_in(confirmbtn.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(confirmbtn.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(confirmbtn);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(span);
      if (detaching)
        detach(t2);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance($$self) {
  const appSettingsDef = {
    launch_on_startup: { type: "boolean", required: true },
    close_to_tray: { type: "boolean", required: true }
  };
  let userAgent = navigator.userAgent;
  const isMac = userAgent.indexOf("Mac") != -1 ? true : false;
  let appSettingsModel = new FormModel(appSettingsDef);
  async function clearBrowserData() {
    await serviceProxy.clearBrowserData();
  }
  onMount(async () => {
    const init2 = async (formDef, formModel) => {
      for (let key in formDef) {
        const pref = await serviceProxy.store.Prefs.get(`electron.${key}`);
        formModel.fields[key].set(pref);
        formModel.fields[key].subscribe((change) => {
          serviceProxy.store.Prefs.set(`electron.${key}`, change);
        });
      }
    };
    await init2(appSettingsDef, appSettingsModel);
  });
  const click_handler = () => {
    clearBrowserData();
  };
  return [isMac, appSettingsModel, clearBrowserData, click_handler];
}
class ElectronSettings extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { ElectronSettings as default };
