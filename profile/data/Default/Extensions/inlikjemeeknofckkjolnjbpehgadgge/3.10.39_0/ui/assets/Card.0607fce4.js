import { S as SvelteComponent, i as init, s as safe_not_equal, l as create_slot, p as element, q as space, v as attr, y as insert, z as append, u as update_slot_base, n as get_all_dirty_from_scope, o as get_slot_changes, t as transition_in, d as transition_out, C as detach, M as createEventDispatcher, A as listen, E as noop } from "./index.21aef151.js";
const get_footer_slot_changes = (dirty) => ({});
const get_footer_slot_context = (ctx) => ({});
const get_post_body_slot_changes = (dirty) => ({});
const get_post_body_slot_context = (ctx) => ({});
const get_header_slot_changes = (dirty) => ({});
const get_header_slot_context = (ctx) => ({});
function create_if_block(ctx) {
  let div;
  let t;
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      t = space();
      button = element("button");
      attr(div, "class", "flex-1");
      attr(button, "class", "btn-close text-sm");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      insert(target, t, anchor);
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", ctx[4]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching)
        detach(t);
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let div3;
  let div0;
  let t0;
  let t1;
  let div1;
  let t2;
  let t3;
  let div2;
  let current;
  const header_slot_template = ctx[3].header;
  const header_slot = create_slot(header_slot_template, ctx, ctx[2], get_header_slot_context);
  let if_block = ctx[0] && create_if_block(ctx);
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  const post_body_slot_template = ctx[3]["post-body"];
  const post_body_slot = create_slot(post_body_slot_template, ctx, ctx[2], get_post_body_slot_context);
  const footer_slot_template = ctx[3].footer;
  const footer_slot = create_slot(footer_slot_template, ctx, ctx[2], get_footer_slot_context);
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      if (header_slot)
        header_slot.c();
      t0 = space();
      if (if_block)
        if_block.c();
      t1 = space();
      div1 = element("div");
      if (default_slot)
        default_slot.c();
      t2 = space();
      if (post_body_slot)
        post_body_slot.c();
      t3 = space();
      div2 = element("div");
      if (footer_slot)
        footer_slot.c();
      attr(div0, "class", "card-header flex");
      attr(div1, "class", "card-body flex flex-row");
      attr(div2, "class", "card-footer bg-white");
      attr(div3, "class", "card panel-default");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      if (header_slot) {
        header_slot.m(div0, null);
      }
      append(div0, t0);
      if (if_block)
        if_block.m(div0, null);
      append(div3, t1);
      append(div3, div1);
      if (default_slot) {
        default_slot.m(div1, null);
      }
      append(div3, t2);
      if (post_body_slot) {
        post_body_slot.m(div3, null);
      }
      append(div3, t3);
      append(div3, div2);
      if (footer_slot) {
        footer_slot.m(div2, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (header_slot) {
        if (header_slot.p && (!current || dirty & 4)) {
          update_slot_base(
            header_slot,
            header_slot_template,
            ctx2,
            ctx2[2],
            !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(header_slot_template, ctx2[2], dirty, get_header_slot_changes),
            get_header_slot_context
          );
        }
      }
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          if_block.m(div0, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[2],
            !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null),
            null
          );
        }
      }
      if (post_body_slot) {
        if (post_body_slot.p && (!current || dirty & 4)) {
          update_slot_base(
            post_body_slot,
            post_body_slot_template,
            ctx2,
            ctx2[2],
            !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(post_body_slot_template, ctx2[2], dirty, get_post_body_slot_changes),
            get_post_body_slot_context
          );
        }
      }
      if (footer_slot) {
        if (footer_slot.p && (!current || dirty & 4)) {
          update_slot_base(
            footer_slot,
            footer_slot_template,
            ctx2,
            ctx2[2],
            !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(footer_slot_template, ctx2[2], dirty, get_footer_slot_changes),
            get_footer_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(header_slot, local);
      transition_in(default_slot, local);
      transition_in(post_body_slot, local);
      transition_in(footer_slot, local);
      current = true;
    },
    o(local) {
      transition_out(header_slot, local);
      transition_out(default_slot, local);
      transition_out(post_body_slot, local);
      transition_out(footer_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div3);
      if (header_slot)
        header_slot.d(detaching);
      if (if_block)
        if_block.d();
      if (default_slot)
        default_slot.d(detaching);
      if (post_body_slot)
        post_body_slot.d(detaching);
      if (footer_slot)
        footer_slot.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { closable = true } = $$props;
  let dispatch = createEventDispatcher();
  const click_handler = (_) => dispatch("close");
  $$self.$$set = ($$props2) => {
    if ("closable" in $$props2)
      $$invalidate(0, closable = $$props2.closable);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  return [closable, dispatch, $$scope, slots, click_handler];
}
class Card extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { closable: 0 });
  }
}
export { Card as C };
