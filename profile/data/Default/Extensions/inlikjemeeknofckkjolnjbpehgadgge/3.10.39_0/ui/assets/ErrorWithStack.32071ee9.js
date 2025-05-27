import { S as SvelteComponent, i as init, s as safe_not_equal, c as create_component, m as mount_component, t as transition_in, d as transition_out, e as destroy_component, p as element, r as text, q as space, y as insert, z as append, G as set_data, C as detach, v as attr } from "./index.21aef151.js";
import { C as Card } from "./Card.0607fce4.js";
var ErrorWithStack_svelte_svelte_type_style_lang = "";
function create_default_slot(ctx) {
  let div;
  let h4;
  let t0;
  let t1_value = ctx[1].message + "";
  let t1;
  let t2;
  let p;
  return {
    c() {
      div = element("div");
      h4 = element("h4");
      t0 = text("Error: ");
      t1 = text(t1_value);
      t2 = space();
      p = element("p");
      p.innerHTML = `Please contact us at <a href="mailto: support@distill.io">support@distill.io</a>`;
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, h4);
      append(h4, t0);
      append(h4, t1);
      append(div, t2);
      append(div, p);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t1_value !== (t1_value = ctx2[1].message + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_header_slot(ctx) {
  let div;
  let h2;
  let t;
  return {
    c() {
      div = element("div");
      h2 = element("h2");
      t = text(ctx[0]);
      attr(div, "slot", "header");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, h2);
      append(h2, t);
    },
    p(ctx2, dirty) {
      if (dirty & 1)
        set_data(t, ctx2[0]);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block(ctx) {
  let details;
  let summary;
  let t1;
  let pre;
  let t2_value = ctx[1].stack + "";
  let t2;
  return {
    c() {
      details = element("details");
      summary = element("summary");
      summary.textContent = "Stack trace";
      t1 = space();
      pre = element("pre");
      t2 = text(t2_value);
      details.open = true;
    },
    m(target, anchor) {
      insert(target, details, anchor);
      append(details, summary);
      append(details, t1);
      append(details, pre);
      append(pre, t2);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t2_value !== (t2_value = ctx2[1].stack + ""))
        set_data(t2, t2_value);
    },
    d(detaching) {
      if (detaching)
        detach(details);
    }
  };
}
function create_post_body_slot(ctx) {
  let div;
  let if_block = ctx[1].stack && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      attr(div, "slot", "post-body");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (ctx2[1].stack) {
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
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function create_fragment(ctx) {
  let card;
  let current;
  card = new Card({
    props: {
      closable: false,
      $$slots: {
        "post-body": [create_post_body_slot],
        header: [create_header_slot],
        default: [create_default_slot]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(card.$$.fragment);
    },
    m(target, anchor) {
      mount_component(card, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const card_changes = {};
      if (dirty & 7) {
        card_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card.$set(card_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(card.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(card.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(card, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { title = "Error" } = $$props;
  let { error } = $$props;
  console.log("Title:", title, "Message", error.message, "Stack", error.stack);
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2)
      $$invalidate(0, title = $$props2.title);
    if ("error" in $$props2)
      $$invalidate(1, error = $$props2.error);
  };
  return [title, error];
}
class ErrorWithStack extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { title: 0, error: 1 });
  }
}
export { ErrorWithStack as default };
