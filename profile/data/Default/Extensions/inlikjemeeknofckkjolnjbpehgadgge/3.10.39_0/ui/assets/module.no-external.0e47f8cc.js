function e(e2, t2) {
  var i2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var s2 = Object.getOwnPropertySymbols(e2);
    t2 && (s2 = s2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), i2.push.apply(i2, s2);
  }
  return i2;
}
function t(t2) {
  for (var s2 = 1; s2 < arguments.length; s2++) {
    var r2 = null != arguments[s2] ? arguments[s2] : {};
    s2 % 2 ? e(Object(r2), true).forEach(function(e2) {
      i(t2, e2, r2[e2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(r2)) : e(Object(r2)).forEach(function(e2) {
      Object.defineProperty(t2, e2, Object.getOwnPropertyDescriptor(r2, e2));
    });
  }
  return t2;
}
function i(e2, t2, i2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: i2, enumerable: true, configurable: true, writable: true }) : e2[t2] = i2, e2;
}
function s(e2, t2) {
  if (null == e2)
    return {};
  var i2, s2, r2 = function(e3, t3) {
    if (null == e3)
      return {};
    var i3, s3, r3 = {}, n3 = Object.keys(e3);
    for (s3 = 0; s3 < n3.length; s3++)
      i3 = n3[s3], t3.indexOf(i3) >= 0 || (r3[i3] = e3[i3]);
    return r3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    for (s2 = 0; s2 < n2.length; s2++)
      i2 = n2[s2], t2.indexOf(i2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, i2) && (r2[i2] = e2[i2]);
  }
  return r2;
}
var r, n = "undefined" != typeof window ? window : void 0, o = "undefined" != typeof globalThis ? globalThis : n, a = Array.prototype, l = a.forEach, c = a.indexOf, u = null == o ? void 0 : o.navigator, d = null == o ? void 0 : o.document, h = null == o ? void 0 : o.location, _ = null == o ? void 0 : o.fetch, p = null != o && o.XMLHttpRequest && "withCredentials" in new o.XMLHttpRequest() ? o.XMLHttpRequest : void 0, g = null == o ? void 0 : o.AbortController, v = null == u ? void 0 : u.userAgent, f = null != n ? n : {}, m = "$copy_autocapture", b = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];
!function(e2) {
  e2.GZipJS = "gzip-js", e2.Base64 = "base64";
}(r || (r = {}));
var y = ["fatal", "error", "warning", "log", "info", "debug"];
function w(e2, t2) {
  return -1 !== e2.indexOf(t2);
}
var S = function(e2) {
  return e2.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}, k = function(e2) {
  return e2.replace(/^\$/, "");
};
var E = Array.isArray, x = Object.prototype, I = x.hasOwnProperty, P = x.toString, C = E || function(e2) {
  return "[object Array]" === P.call(e2);
}, F = (e2) => "function" == typeof e2, R = (e2) => e2 === Object(e2) && !C(e2), T = (e2) => {
  if (R(e2)) {
    for (var t2 in e2)
      if (I.call(e2, t2))
        return false;
    return true;
  }
  return false;
}, $ = (e2) => void 0 === e2, A = (e2) => "[object String]" == P.call(e2), O = (e2) => A(e2) && 0 === e2.trim().length, M = (e2) => null === e2, L = (e2) => $(e2) || M(e2), D = (e2) => "[object Number]" == P.call(e2), q = (e2) => "[object Boolean]" === P.call(e2), N = (e2) => e2 instanceof FormData, B = (e2) => e2 instanceof Error, H = (e2) => w(b, e2), U = { DEBUG: false, LIB_VERSION: "1.231.2" }, z = (e2) => {
  var t2 = { _log: function(t3) {
    if (n && (U.DEBUG || f.POSTHOG_DEBUG) && !$(n.console) && n.console) {
      for (var i2 = ("__rrweb_original__" in n.console[t3]) ? n.console[t3].__rrweb_original__ : n.console[t3], s2 = arguments.length, r2 = new Array(s2 > 1 ? s2 - 1 : 0), o2 = 1; o2 < s2; o2++)
        r2[o2 - 1] = arguments[o2];
      i2(e2, ...r2);
    }
  }, info: function() {
    for (var e3 = arguments.length, i2 = new Array(e3), s2 = 0; s2 < e3; s2++)
      i2[s2] = arguments[s2];
    t2._log("log", ...i2);
  }, warn: function() {
    for (var e3 = arguments.length, i2 = new Array(e3), s2 = 0; s2 < e3; s2++)
      i2[s2] = arguments[s2];
    t2._log("warn", ...i2);
  }, error: function() {
    for (var e3 = arguments.length, i2 = new Array(e3), s2 = 0; s2 < e3; s2++)
      i2[s2] = arguments[s2];
    t2._log("error", ...i2);
  }, critical: function() {
    for (var t3 = arguments.length, i2 = new Array(t3), s2 = 0; s2 < t3; s2++)
      i2[s2] = arguments[s2];
    console.error(e2, ...i2);
  }, uninitializedWarning: (e3) => {
    t2.error("You must initialize PostHog before calling ".concat(e3));
  }, createLogger: (t3) => z("".concat(e2, " ").concat(t3)) };
  return t2;
}, j = z("[PostHog.js]"), W = j.createLogger, V = {};
function G(e2, t2, i2) {
  if (C(e2)) {
    if (l && e2.forEach === l)
      e2.forEach(t2, i2);
    else if ("length" in e2 && e2.length === +e2.length) {
      for (var s2 = 0, r2 = e2.length; s2 < r2; s2++)
        if (s2 in e2 && t2.call(i2, e2[s2], s2) === V)
          return;
    }
  }
}
function J(e2, t2, i2) {
  if (!L(e2)) {
    if (C(e2))
      return G(e2, t2, i2);
    if (N(e2)) {
      for (var s2 of e2.entries())
        if (t2.call(i2, s2[1], s2[0]) === V)
          return;
    } else
      for (var r2 in e2)
        if (I.call(e2, r2) && t2.call(i2, e2[r2], r2) === V)
          return;
  }
}
var Y = function(e2) {
  for (var t2 = arguments.length, i2 = new Array(t2 > 1 ? t2 - 1 : 0), s2 = 1; s2 < t2; s2++)
    i2[s2 - 1] = arguments[s2];
  return G(i2, function(t3) {
    for (var i3 in t3)
      void 0 !== t3[i3] && (e2[i3] = t3[i3]);
  }), e2;
}, K = function(e2) {
  for (var t2 = arguments.length, i2 = new Array(t2 > 1 ? t2 - 1 : 0), s2 = 1; s2 < t2; s2++)
    i2[s2 - 1] = arguments[s2];
  return G(i2, function(t3) {
    G(t3, function(t4) {
      e2.push(t4);
    });
  }), e2;
};
function X(e2) {
  for (var t2 = Object.keys(e2), i2 = t2.length, s2 = new Array(i2); i2--; )
    s2[i2] = [t2[i2], e2[t2[i2]]];
  return s2;
}
var Q = function(e2) {
  try {
    return e2();
  } catch (e3) {
    return;
  }
}, Z = function(e2) {
  return function() {
    try {
      for (var t2 = arguments.length, i2 = new Array(t2), s2 = 0; s2 < t2; s2++)
        i2[s2] = arguments[s2];
      return e2.apply(this, i2);
    } catch (e3) {
      j.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), j.critical(e3);
    }
  };
}, ee = function(e2) {
  var t2 = {};
  return J(e2, function(e3, i2) {
    A(e3) && e3.length > 0 && (t2[i2] = e3);
  }), t2;
};
function te(e2, t2) {
  return i2 = e2, s2 = (e3) => A(e3) && !M(t2) ? e3.slice(0, t2) : e3, r2 = /* @__PURE__ */ new Set(), function e3(t3, i3) {
    return t3 !== Object(t3) ? s2 ? s2(t3, i3) : t3 : r2.has(t3) ? void 0 : (r2.add(t3), C(t3) ? (n2 = [], G(t3, (t4) => {
      n2.push(e3(t4));
    })) : (n2 = {}, J(t3, (t4, i4) => {
      r2.has(t4) || (n2[i4] = e3(t4, i4));
    })), n2);
    var n2;
  }(i2);
  var i2, s2, r2;
}
var ie = ["herokuapp.com", "vercel.app", "netlify.app"];
function se(e2) {
  var t2 = null == e2 ? void 0 : e2.hostname;
  if (!A(t2))
    return false;
  var i2 = t2.split(".").slice(-2).join(".");
  for (var s2 of ie)
    if (i2 === s2)
      return false;
  return true;
}
function re(e2, t2) {
  for (var i2 = 0; i2 < e2.length; i2++)
    if (t2(e2[i2]))
      return e2[i2];
}
function ne(e2, t2, i2, s2) {
  var { capture: r2 = false, passive: n2 = true } = null != s2 ? s2 : {};
  null == e2 || e2.addEventListener(t2, i2, { capture: r2, passive: n2 });
}
var oe = "$people_distinct_id", ae = "__alias", le = "__timers", ce = "$autocapture_disabled_server_side", ue = "$heatmaps_enabled_server_side", de = "$exception_capture_enabled_server_side", he = "$web_vitals_enabled_server_side", _e = "$dead_clicks_enabled_server_side", pe = "$web_vitals_allowed_metrics", ge = "$session_recording_enabled_server_side", ve = "$console_log_recording_enabled_server_side", fe = "$session_recording_network_payload_capture", me = "$session_recording_masking", be = "$session_recording_canvas_recording", ye = "$replay_sample_rate", we = "$replay_minimum_duration", Se = "$replay_script_config", ke = "$sesid", Ee = "$session_is_sampled", xe = "$session_recording_url_trigger_activated_session", Ie = "$session_recording_event_trigger_activated_session", Pe = "$enabled_feature_flags", Ce = "$early_access_features", Fe = "$stored_person_properties", Re = "$stored_group_properties", Te = "$surveys", $e = "$surveys_activated", Ae = "$flag_call_reported", Oe = "$user_state", Me = "$client_session_props", Le = "$capture_rate_limit", De = "$initial_campaign_params", qe = "$initial_referrer_info", Ne = "$initial_person_info", Be = "$epp", He = "__POSTHOG_TOOLBAR__", Ue = "$posthog_cookieless", ze = [oe, ae, "__cmpns", le, ge, ue, ke, Pe, Oe, Ce, Re, Fe, Te, Ae, Me, Le, De, qe, Be];
function je(e2) {
  var t2;
  return e2 instanceof Element && (e2.id === He || !(null === (t2 = e2.closest) || void 0 === t2 || !t2.call(e2, ".toolbar-global-fade-container")));
}
function We(e2) {
  return !!e2 && 1 === e2.nodeType;
}
function Ve(e2, t2) {
  return !!e2 && !!e2.tagName && e2.tagName.toLowerCase() === t2.toLowerCase();
}
function Ge(e2) {
  return !!e2 && 3 === e2.nodeType;
}
function Je(e2) {
  return !!e2 && 11 === e2.nodeType;
}
function Ye(e2) {
  return e2 ? S(e2).split(/\s+/) : [];
}
function Ke(e2) {
  var t2 = null == n ? void 0 : n.location.href;
  return !!(t2 && e2 && e2.some((e3) => t2.match(e3)));
}
function Xe(e2) {
  var t2 = "";
  switch (typeof e2.className) {
    case "string":
      t2 = e2.className;
      break;
    case "object":
      t2 = (e2.className && "baseVal" in e2.className ? e2.className.baseVal : null) || e2.getAttribute("class") || "";
      break;
    default:
      t2 = "";
  }
  return Ye(t2);
}
function Qe(e2) {
  return L(e2) ? null : S(e2).split(/(\s+)/).filter((e3) => ht(e3)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
}
function Ze(e2) {
  var t2 = "";
  return rt(e2) && !nt(e2) && e2.childNodes && e2.childNodes.length && J(e2.childNodes, function(e3) {
    var i2;
    Ge(e3) && e3.textContent && (t2 += null !== (i2 = Qe(e3.textContent)) && void 0 !== i2 ? i2 : "");
  }), S(t2);
}
function et(e2) {
  return $(e2.target) ? e2.srcElement || null : null !== (t2 = e2.target) && void 0 !== t2 && t2.shadowRoot ? e2.composedPath()[0] || null : e2.target || null;
  var t2;
}
var tt = ["a", "button", "form", "input", "select", "textarea", "label"];
function it(e2) {
  var t2 = e2.parentNode;
  return !(!t2 || !We(t2)) && t2;
}
function st(e2, t2) {
  var i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, s2 = arguments.length > 3 ? arguments[3] : void 0, r2 = arguments.length > 4 ? arguments[4] : void 0;
  if (!n || !e2 || Ve(e2, "html") || !We(e2))
    return false;
  if (null != i2 && i2.url_allowlist && !Ke(i2.url_allowlist))
    return false;
  if (null != i2 && i2.url_ignorelist && Ke(i2.url_ignorelist))
    return false;
  if (null != i2 && i2.dom_event_allowlist) {
    var o2 = i2.dom_event_allowlist;
    if (o2 && !o2.some((e3) => t2.type === e3))
      return false;
  }
  for (var a2 = false, l2 = [e2], c2 = true, u2 = e2; u2.parentNode && !Ve(u2, "body"); )
    if (Je(u2.parentNode))
      l2.push(u2.parentNode.host), u2 = u2.parentNode.host;
    else {
      if (!(c2 = it(u2)))
        break;
      if (s2 || tt.indexOf(c2.tagName.toLowerCase()) > -1)
        a2 = true;
      else {
        var d2 = n.getComputedStyle(c2);
        d2 && "pointer" === d2.getPropertyValue("cursor") && (a2 = true);
      }
      l2.push(c2), u2 = c2;
    }
  if (!function(e3, t3) {
    var i3 = null == t3 ? void 0 : t3.element_allowlist;
    if ($(i3))
      return true;
    var s3 = function(e4) {
      if (i3.some((t4) => e4.tagName.toLowerCase() === t4))
        return { v: true };
    };
    for (var r3 of e3) {
      var n2 = s3(r3);
      if ("object" == typeof n2)
        return n2.v;
    }
    return false;
  }(l2, i2))
    return false;
  if (!function(e3, t3) {
    var i3 = null == t3 ? void 0 : t3.css_selector_allowlist;
    if ($(i3))
      return true;
    var s3 = function(e4) {
      if (i3.some((t4) => e4.matches(t4)))
        return { v: true };
    };
    for (var r3 of e3) {
      var n2 = s3(r3);
      if ("object" == typeof n2)
        return n2.v;
    }
    return false;
  }(l2, i2))
    return false;
  var h2 = n.getComputedStyle(e2);
  if (h2 && "pointer" === h2.getPropertyValue("cursor") && "click" === t2.type)
    return true;
  var _2 = e2.tagName.toLowerCase();
  switch (_2) {
    case "html":
      return false;
    case "form":
      return (r2 || ["submit"]).indexOf(t2.type) >= 0;
    case "input":
    case "select":
    case "textarea":
      return (r2 || ["change", "click"]).indexOf(t2.type) >= 0;
    default:
      return a2 ? (r2 || ["click"]).indexOf(t2.type) >= 0 : (r2 || ["click"]).indexOf(t2.type) >= 0 && (tt.indexOf(_2) > -1 || "true" === e2.getAttribute("contenteditable"));
  }
}
function rt(e2) {
  for (var t2 = e2; t2.parentNode && !Ve(t2, "body"); t2 = t2.parentNode) {
    var i2 = Xe(t2);
    if (w(i2, "ph-sensitive") || w(i2, "ph-no-capture"))
      return false;
  }
  if (w(Xe(e2), "ph-include"))
    return true;
  var s2 = e2.type || "";
  if (A(s2))
    switch (s2.toLowerCase()) {
      case "hidden":
      case "password":
        return false;
    }
  var r2 = e2.name || e2.id || "";
  if (A(r2)) {
    if (/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(r2.replace(/[^a-zA-Z0-9]/g, "")))
      return false;
  }
  return true;
}
function nt(e2) {
  return !!(Ve(e2, "input") && !["button", "checkbox", "submit", "reset"].includes(e2.type) || Ve(e2, "select") || Ve(e2, "textarea") || "true" === e2.getAttribute("contenteditable"));
}
var ot = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})", at = new RegExp("^(?:".concat(ot, ")$")), lt = new RegExp(ot), ct = "\\d{3}-?\\d{2}-?\\d{4}", ut = new RegExp("^(".concat(ct, ")$")), dt = new RegExp("(".concat(ct, ")"));
function ht(e2) {
  var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  if (L(e2))
    return false;
  if (A(e2)) {
    if (e2 = S(e2), (t2 ? at : lt).test((e2 || "").replace(/[- ]/g, "")))
      return false;
    if ((t2 ? ut : dt).test(e2))
      return false;
  }
  return true;
}
function _t(e2) {
  var t2 = Ze(e2);
  return ht(t2 = "".concat(t2, " ").concat(pt(e2)).trim()) ? t2 : "";
}
function pt(e2) {
  var t2 = "";
  return e2 && e2.childNodes && e2.childNodes.length && J(e2.childNodes, function(e3) {
    var i2;
    if (e3 && "span" === (null === (i2 = e3.tagName) || void 0 === i2 ? void 0 : i2.toLowerCase()))
      try {
        var s2 = Ze(e3);
        t2 = "".concat(t2, " ").concat(s2).trim(), e3.childNodes && e3.childNodes.length && (t2 = "".concat(t2, " ").concat(pt(e3)).trim());
      } catch (e4) {
        j.error("[AutoCapture]", e4);
      }
  }), t2;
}
function gt(e2) {
  return function(e3) {
    var i2 = e3.map((e4) => {
      var i3, s2, r2 = "";
      if (e4.tag_name && (r2 += e4.tag_name), e4.attr_class)
        for (var n2 of (e4.attr_class.sort(), e4.attr_class))
          r2 += ".".concat(n2.replace(/"/g, ""));
      var o2 = t(t(t(t({}, e4.text ? { text: e4.text } : {}), {}, { "nth-child": null !== (i3 = e4.nth_child) && void 0 !== i3 ? i3 : 0, "nth-of-type": null !== (s2 = e4.nth_of_type) && void 0 !== s2 ? s2 : 0 }, e4.href ? { href: e4.href } : {}), e4.attr_id ? { attr_id: e4.attr_id } : {}), e4.attributes), a2 = {};
      return X(o2).sort((e5, t2) => {
        var [i4] = e5, [s3] = t2;
        return i4.localeCompare(s3);
      }).forEach((e5) => {
        var [t2, i4] = e5;
        return a2[vt(t2.toString())] = vt(i4.toString());
      }), r2 += ":", r2 += X(o2).map((e5) => {
        var [t2, i4] = e5;
        return "".concat(t2, '="').concat(i4, '"');
      }).join("");
    });
    return i2.join(";");
  }(function(e3) {
    return e3.map((e4) => {
      var t2, i2, s2 = { text: null === (t2 = e4.$el_text) || void 0 === t2 ? void 0 : t2.slice(0, 400), tag_name: e4.tag_name, href: null === (i2 = e4.attr__href) || void 0 === i2 ? void 0 : i2.slice(0, 2048), attr_class: ft(e4), attr_id: e4.attr__id, nth_child: e4.nth_child, nth_of_type: e4.nth_of_type, attributes: {} };
      return X(e4).filter((e5) => {
        var [t3] = e5;
        return 0 === t3.indexOf("attr__");
      }).forEach((e5) => {
        var [t3, i3] = e5;
        return s2.attributes[t3] = i3;
      }), s2;
    });
  }(e2));
}
function vt(e2) {
  return e2.replace(/"|\\"/g, '\\"');
}
function ft(e2) {
  var t2 = e2.attr__class;
  return t2 ? C(t2) ? t2 : Ye(t2) : void 0;
}
class mt {
  constructor() {
    this.clicks = [];
  }
  isRageClick(e2, t2, i2) {
    var s2 = this.clicks[this.clicks.length - 1];
    if (s2 && Math.abs(e2 - s2.x) + Math.abs(t2 - s2.y) < 30 && i2 - s2.timestamp < 1e3) {
      if (this.clicks.push({ x: e2, y: t2, timestamp: i2 }), 3 === this.clicks.length)
        return true;
    } else
      this.clicks = [{ x: e2, y: t2, timestamp: i2 }];
    return false;
  }
}
var bt = ["localhost", "127.0.0.1"], yt = (e2) => {
  var t2 = null == d ? void 0 : d.createElement("a");
  return $(t2) ? null : (t2.href = e2, t2);
}, wt = function(e2) {
  var t2, i2, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "&", r2 = [];
  return J(e2, function(e3, s3) {
    $(e3) || $(s3) || "undefined" === s3 || (t2 = encodeURIComponent(((e4) => e4 instanceof File)(e3) ? e3.name : e3.toString()), i2 = encodeURIComponent(s3), r2[r2.length] = i2 + "=" + t2);
  }), r2.join(s2);
}, St = function(e2, t2) {
  for (var i2, s2 = ((e2.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&"), r2 = 0; r2 < s2.length; r2++) {
    var n2 = s2[r2].split("=");
    if (n2[0] === t2) {
      i2 = n2;
      break;
    }
  }
  if (!C(i2) || i2.length < 2)
    return "";
  var o2 = i2[1];
  try {
    o2 = decodeURIComponent(o2);
  } catch (e3) {
    j.error("Skipping decoding for malformed query param: " + o2);
  }
  return o2.replace(/\+/g, " ");
}, kt = function(e2, t2, i2) {
  if (!e2 || !t2 || !t2.length)
    return e2;
  for (var s2 = e2.split("#"), r2 = s2[0] || "", n2 = s2[1], o2 = r2.split("?"), a2 = o2[1], l2 = o2[0], c2 = (a2 || "").split("&"), u2 = [], d2 = 0; d2 < c2.length; d2++) {
    var h2 = c2[d2].split("=");
    C(h2) && (t2.includes(h2[0]) ? u2.push(h2[0] + "=" + i2) : u2.push(c2[d2]));
  }
  var _2 = l2;
  return null != a2 && (_2 += "?" + u2.join("&")), null != n2 && (_2 += "#" + n2), _2;
}, Et = function(e2, t2) {
  var i2 = e2.match(new RegExp(t2 + "=([^&]*)"));
  return i2 ? i2[1] : null;
}, xt = W("[AutoCapture]");
function It(e2, t2) {
  return t2.length > e2 ? t2.slice(0, e2) + "..." : t2;
}
function Pt(e2) {
  if (e2.previousElementSibling)
    return e2.previousElementSibling;
  var t2 = e2;
  do {
    t2 = t2.previousSibling;
  } while (t2 && !We(t2));
  return t2;
}
function Ct(e2, t2, i2, s2) {
  var r2 = e2.tagName.toLowerCase(), n2 = { tag_name: r2 };
  tt.indexOf(r2) > -1 && !i2 && ("a" === r2.toLowerCase() || "button" === r2.toLowerCase() ? n2.$el_text = It(1024, _t(e2)) : n2.$el_text = It(1024, Ze(e2)));
  var o2 = Xe(e2);
  o2.length > 0 && (n2.classes = o2.filter(function(e3) {
    return "" !== e3;
  })), J(e2.attributes, function(i3) {
    var r3;
    if ((!nt(e2) || -1 !== ["name", "id", "class", "aria-label"].indexOf(i3.name)) && ((null == s2 || !s2.includes(i3.name)) && !t2 && ht(i3.value) && (r3 = i3.name, !A(r3) || "_ngcontent" !== r3.substring(0, 10) && "_nghost" !== r3.substring(0, 7)))) {
      var o3 = i3.value;
      "class" === i3.name && (o3 = Ye(o3).join(" ")), n2["attr__" + i3.name] = It(1024, o3);
    }
  });
  for (var a2 = 1, l2 = 1, c2 = e2; c2 = Pt(c2); )
    a2++, c2.tagName === e2.tagName && l2++;
  return n2.nth_child = a2, n2.nth_of_type = l2, n2;
}
function Ft(e2, t2) {
  for (var i2, s2, { e: r2, maskAllElementAttributes: o2, maskAllText: a2, elementAttributeIgnoreList: l2, elementsChainAsString: c2 } = t2, u2 = [e2], d2 = e2; d2.parentNode && !Ve(d2, "body"); )
    Je(d2.parentNode) ? (u2.push(d2.parentNode.host), d2 = d2.parentNode.host) : (u2.push(d2.parentNode), d2 = d2.parentNode);
  var h2, _2 = [], p2 = {}, g2 = false, v2 = false;
  if (J(u2, (e3) => {
    var t3 = rt(e3);
    "a" === e3.tagName.toLowerCase() && (g2 = e3.getAttribute("href"), g2 = t3 && g2 && ht(g2) && g2), w(Xe(e3), "ph-no-capture") && (v2 = true), _2.push(Ct(e3, o2, a2, l2));
    var i3 = function(e4) {
      if (!rt(e4))
        return {};
      var t4 = {};
      return J(e4.attributes, function(e5) {
        if (e5.name && 0 === e5.name.indexOf("data-ph-capture-attribute")) {
          var i4 = e5.name.replace("data-ph-capture-attribute-", ""), s3 = e5.value;
          i4 && s3 && ht(s3) && (t4[i4] = s3);
        }
      }), t4;
    }(e3);
    Y(p2, i3);
  }), v2)
    return { props: {}, explicitNoCapture: v2 };
  if (a2 || ("a" === e2.tagName.toLowerCase() || "button" === e2.tagName.toLowerCase() ? _2[0].$el_text = _t(e2) : _2[0].$el_text = Ze(e2)), g2) {
    var f2, m2;
    _2[0].attr__href = g2;
    var b2 = null === (f2 = yt(g2)) || void 0 === f2 ? void 0 : f2.host, y2 = null == n || null === (m2 = n.location) || void 0 === m2 ? void 0 : m2.host;
    b2 && y2 && b2 !== y2 && (h2 = g2);
  }
  return { props: Y({ $event_type: r2.type, $ce_version: 1 }, c2 ? {} : { $elements: _2 }, { $elements_chain: gt(_2) }, null !== (i2 = _2[0]) && void 0 !== i2 && i2.$el_text ? { $el_text: null === (s2 = _2[0]) || void 0 === s2 ? void 0 : s2.$el_text } : {}, h2 && "click" === r2.type ? { $external_click_url: h2 } : {}, p2) };
}
class Rt {
  constructor(e2) {
    i(this, "_initialized", false), i(this, "_isDisabledServerSide", null), i(this, "rageclicks", new mt()), i(this, "_elementsChainAsString", false), this.instance = e2, this._elementSelectors = null;
  }
  get config() {
    var e2, t2, i2 = R(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
    return i2.url_allowlist = null === (e2 = i2.url_allowlist) || void 0 === e2 ? void 0 : e2.map((e3) => new RegExp(e3)), i2.url_ignorelist = null === (t2 = i2.url_ignorelist) || void 0 === t2 ? void 0 : t2.map((e3) => new RegExp(e3)), i2;
  }
  _addDomEventHandlers() {
    if (this.isBrowserSupported()) {
      if (n && d) {
        var e2 = (e3) => {
          e3 = e3 || (null == n ? void 0 : n.event);
          try {
            this._captureEvent(e3);
          } catch (e4) {
            xt.error("Failed to capture event", e4);
          }
        };
        if (ne(d, "submit", e2, { capture: true }), ne(d, "change", e2, { capture: true }), ne(d, "click", e2, { capture: true }), this.config.capture_copied_text) {
          var t2 = (e3) => {
            e3 = e3 || (null == n ? void 0 : n.event), this._captureEvent(e3, m);
          };
          ne(d, "copy", t2, { capture: true }), ne(d, "cut", t2, { capture: true });
        }
      }
    } else
      xt.info("Disabling Automatic Event Collection because this browser is not supported");
  }
  startIfEnabled() {
    this.isEnabled && !this._initialized && (this._addDomEventHandlers(), this._initialized = true);
  }
  onRemoteConfig(e2) {
    e2.elementsChainAsString && (this._elementsChainAsString = e2.elementsChainAsString), this.instance.persistence && this.instance.persistence.register({ [ce]: !!e2.autocapture_opt_out }), this._isDisabledServerSide = !!e2.autocapture_opt_out, this.startIfEnabled();
  }
  setElementSelectors(e2) {
    this._elementSelectors = e2;
  }
  getElementSelectors(e2) {
    var t2, i2 = [];
    return null === (t2 = this._elementSelectors) || void 0 === t2 || t2.forEach((t3) => {
      var s2 = null == d ? void 0 : d.querySelectorAll(t3);
      null == s2 || s2.forEach((s3) => {
        e2 === s3 && i2.push(t3);
      });
    }), i2;
  }
  get isEnabled() {
    var e2, t2, i2 = null === (e2 = this.instance.persistence) || void 0 === e2 ? void 0 : e2.props[ce], s2 = this._isDisabledServerSide;
    if (M(s2) && !q(i2) && !this.instance.config.advanced_disable_decide)
      return false;
    var r2 = null !== (t2 = this._isDisabledServerSide) && void 0 !== t2 ? t2 : !!i2;
    return !!this.instance.config.autocapture && !r2;
  }
  _captureEvent(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "$autocapture";
    if (this.isEnabled) {
      var i2, s2 = et(e2);
      if (Ge(s2) && (s2 = s2.parentNode || null), "$autocapture" === t2 && "click" === e2.type && e2 instanceof MouseEvent)
        this.instance.config.rageclick && null !== (i2 = this.rageclicks) && void 0 !== i2 && i2.isRageClick(e2.clientX, e2.clientY, new Date().getTime()) && this._captureEvent(e2, "$rageclick");
      var r2 = t2 === m;
      if (s2 && st(s2, e2, this.config, r2, r2 ? ["copy", "cut"] : void 0)) {
        var { props: o2, explicitNoCapture: a2 } = Ft(s2, { e: e2, maskAllElementAttributes: this.instance.config.mask_all_element_attributes, maskAllText: this.instance.config.mask_all_text, elementAttributeIgnoreList: this.config.element_attribute_ignorelist, elementsChainAsString: this._elementsChainAsString });
        if (a2)
          return false;
        var l2 = this.getElementSelectors(s2);
        if (l2 && l2.length > 0 && (o2.$element_selectors = l2), t2 === m) {
          var c2, u2 = Qe(null == n || null === (c2 = n.getSelection()) || void 0 === c2 ? void 0 : c2.toString()), d2 = e2.type || "clipboard";
          if (!u2)
            return false;
          o2.$selected_content = u2, o2.$copy_type = d2;
        }
        return this.instance.capture(t2, o2), true;
      }
    }
  }
  isBrowserSupported() {
    return F(null == d ? void 0 : d.querySelectorAll);
  }
}
Math.trunc || (Math.trunc = function(e2) {
  return e2 < 0 ? Math.ceil(e2) : Math.floor(e2);
}), Number.isInteger || (Number.isInteger = function(e2) {
  return D(e2) && isFinite(e2) && Math.floor(e2) === e2;
});
var Tt = "0123456789abcdef";
class $t {
  constructor(e2) {
    if (this.bytes = e2, 16 !== e2.length)
      throw new TypeError("not 128-bit length");
  }
  static fromFieldsV7(e2, t2, i2, s2) {
    if (!Number.isInteger(e2) || !Number.isInteger(t2) || !Number.isInteger(i2) || !Number.isInteger(s2) || e2 < 0 || t2 < 0 || i2 < 0 || s2 < 0 || e2 > 281474976710655 || t2 > 4095 || i2 > 1073741823 || s2 > 4294967295)
      throw new RangeError("invalid field value");
    var r2 = new Uint8Array(16);
    return r2[0] = e2 / Math.pow(2, 40), r2[1] = e2 / Math.pow(2, 32), r2[2] = e2 / Math.pow(2, 24), r2[3] = e2 / Math.pow(2, 16), r2[4] = e2 / Math.pow(2, 8), r2[5] = e2, r2[6] = 112 | t2 >>> 8, r2[7] = t2, r2[8] = 128 | i2 >>> 24, r2[9] = i2 >>> 16, r2[10] = i2 >>> 8, r2[11] = i2, r2[12] = s2 >>> 24, r2[13] = s2 >>> 16, r2[14] = s2 >>> 8, r2[15] = s2, new $t(r2);
  }
  toString() {
    for (var e2 = "", t2 = 0; t2 < this.bytes.length; t2++)
      e2 = e2 + Tt.charAt(this.bytes[t2] >>> 4) + Tt.charAt(15 & this.bytes[t2]), 3 !== t2 && 5 !== t2 && 7 !== t2 && 9 !== t2 || (e2 += "-");
    if (36 !== e2.length)
      throw new Error("Invalid UUIDv7 was generated");
    return e2;
  }
  clone() {
    return new $t(this.bytes.slice(0));
  }
  equals(e2) {
    return 0 === this.compareTo(e2);
  }
  compareTo(e2) {
    for (var t2 = 0; t2 < 16; t2++) {
      var i2 = this.bytes[t2] - e2.bytes[t2];
      if (0 !== i2)
        return Math.sign(i2);
    }
    return 0;
  }
}
class At {
  constructor() {
    i(this, "timestamp", 0), i(this, "counter", 0), i(this, "random", new Lt());
  }
  generate() {
    var e2 = this.generateOrAbort();
    if ($(e2)) {
      this.timestamp = 0;
      var t2 = this.generateOrAbort();
      if ($(t2))
        throw new Error("Could not generate UUID after timestamp reset");
      return t2;
    }
    return e2;
  }
  generateOrAbort() {
    var e2 = Date.now();
    if (e2 > this.timestamp)
      this.timestamp = e2, this.resetCounter();
    else {
      if (!(e2 + 1e4 > this.timestamp))
        return;
      this.counter++, this.counter > 4398046511103 && (this.timestamp++, this.resetCounter());
    }
    return $t.fromFieldsV7(this.timestamp, Math.trunc(this.counter / Math.pow(2, 30)), this.counter & Math.pow(2, 30) - 1, this.random.nextUint32());
  }
  resetCounter() {
    this.counter = 1024 * this.random.nextUint32() + (1023 & this.random.nextUint32());
  }
}
var Ot, Mt = (e2) => {
  if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG)
    throw new Error("no cryptographically strong RNG available");
  for (var t2 = 0; t2 < e2.length; t2++)
    e2[t2] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
  return e2;
};
n && !$(n.crypto) && crypto.getRandomValues && (Mt = (e2) => crypto.getRandomValues(e2));
class Lt {
  constructor() {
    i(this, "buffer", new Uint32Array(8)), i(this, "cursor", 1 / 0);
  }
  nextUint32() {
    return this.cursor >= this.buffer.length && (Mt(this.buffer), this.cursor = 0), this.buffer[this.cursor++];
  }
}
var Dt = () => qt().toString(), qt = () => (Ot || (Ot = new At())).generate(), Nt = "Thu, 01 Jan 1970 00:00:00 GMT", Bt = "";
var Ht = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
function Ut(e2, t2) {
  if (t2) {
    var i2 = function(e3) {
      var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d;
      if (Bt)
        return Bt;
      if (!t3)
        return "";
      if (["localhost", "127.0.0.1"].includes(e3))
        return "";
      for (var i3 = e3.split("."), s3 = Math.min(i3.length, 8), r2 = "dmn_chk_" + Dt(), n2 = new RegExp("(^|;)\\s*" + r2 + "=1"); !Bt && s3--; ) {
        var o2 = i3.slice(s3).join("."), a2 = r2 + "=1;domain=." + o2;
        t3.cookie = a2, n2.test(t3.cookie) && (t3.cookie = a2 + ";expires=" + Nt, Bt = o2);
      }
      return Bt;
    }(e2);
    if (!i2) {
      var s2 = ((e3) => {
        var t3 = e3.match(Ht);
        return t3 ? t3[0] : "";
      })(e2);
      s2 !== i2 && j.info("Warning: cookie subdomain discovery mismatch", s2, i2), i2 = s2;
    }
    return i2 ? "; domain=." + i2 : "";
  }
  return "";
}
var zt, jt = { is_supported: () => !!d, error: function(e2) {
  j.error("cookieStore error: " + e2);
}, get: function(e2) {
  if (d) {
    try {
      for (var t2 = e2 + "=", i2 = d.cookie.split(";").filter((e3) => e3.length), s2 = 0; s2 < i2.length; s2++) {
        for (var r2 = i2[s2]; " " == r2.charAt(0); )
          r2 = r2.substring(1, r2.length);
        if (0 === r2.indexOf(t2))
          return decodeURIComponent(r2.substring(t2.length, r2.length));
      }
    } catch (e3) {
    }
    return null;
  }
}, parse: function(e2) {
  var t2;
  try {
    t2 = JSON.parse(jt.get(e2)) || {};
  } catch (e3) {
  }
  return t2;
}, set: function(e2, t2, i2, s2, r2) {
  if (d)
    try {
      var n2 = "", o2 = "", a2 = Ut(d.location.hostname, s2);
      if (i2) {
        var l2 = new Date();
        l2.setTime(l2.getTime() + 24 * i2 * 60 * 60 * 1e3), n2 = "; expires=" + l2.toUTCString();
      }
      r2 && (o2 = "; secure");
      var c2 = e2 + "=" + encodeURIComponent(JSON.stringify(t2)) + n2 + "; SameSite=Lax; path=/" + a2 + o2;
      return c2.length > 3686.4 && j.warn("cookieStore warning: large cookie, len=" + c2.length), d.cookie = c2, c2;
    } catch (e3) {
      return;
    }
}, remove: function(e2, t2) {
  try {
    jt.set(e2, "", -1, t2);
  } catch (e3) {
    return;
  }
} }, Wt = null, Vt = { is_supported: function() {
  if (!M(Wt))
    return Wt;
  var e2 = true;
  if ($(n))
    e2 = false;
  else
    try {
      var t2 = "__mplssupport__";
      Vt.set(t2, "xyz"), '"xyz"' !== Vt.get(t2) && (e2 = false), Vt.remove(t2);
    } catch (t3) {
      e2 = false;
    }
  return e2 || j.error("localStorage unsupported; falling back to cookie store"), Wt = e2, e2;
}, error: function(e2) {
  j.error("localStorage error: " + e2);
}, get: function(e2) {
  try {
    return null == n ? void 0 : n.localStorage.getItem(e2);
  } catch (e3) {
    Vt.error(e3);
  }
  return null;
}, parse: function(e2) {
  try {
    return JSON.parse(Vt.get(e2)) || {};
  } catch (e3) {
  }
  return null;
}, set: function(e2, t2) {
  try {
    null == n || n.localStorage.setItem(e2, JSON.stringify(t2));
  } catch (e3) {
    Vt.error(e3);
  }
}, remove: function(e2) {
  try {
    null == n || n.localStorage.removeItem(e2);
  } catch (e3) {
    Vt.error(e3);
  }
} }, Gt = ["distinct_id", ke, Ee, Be, Ne], Jt = t(t({}, Vt), {}, { parse: function(e2) {
  try {
    var t2 = {};
    try {
      t2 = jt.parse(e2) || {};
    } catch (e3) {
    }
    var i2 = Y(t2, JSON.parse(Vt.get(e2) || "{}"));
    return Vt.set(e2, i2), i2;
  } catch (e3) {
  }
  return null;
}, set: function(e2, t2, i2, s2, r2, n2) {
  try {
    Vt.set(e2, t2, void 0, void 0, n2);
    var o2 = {};
    Gt.forEach((e3) => {
      t2[e3] && (o2[e3] = t2[e3]);
    }), Object.keys(o2).length && jt.set(e2, o2, i2, s2, r2, n2);
  } catch (e3) {
    Vt.error(e3);
  }
}, remove: function(e2, t2) {
  try {
    null == n || n.localStorage.removeItem(e2), jt.remove(e2, t2);
  } catch (e3) {
    Vt.error(e3);
  }
} }), Yt = {}, Kt = { is_supported: function() {
  return true;
}, error: function(e2) {
  j.error("memoryStorage error: " + e2);
}, get: function(e2) {
  return Yt[e2] || null;
}, parse: function(e2) {
  return Yt[e2] || null;
}, set: function(e2, t2) {
  Yt[e2] = t2;
}, remove: function(e2) {
  delete Yt[e2];
} }, Xt = null, Qt = { is_supported: function() {
  if (!M(Xt))
    return Xt;
  if (Xt = true, $(n))
    Xt = false;
  else
    try {
      var e2 = "__support__";
      Qt.set(e2, "xyz"), '"xyz"' !== Qt.get(e2) && (Xt = false), Qt.remove(e2);
    } catch (e3) {
      Xt = false;
    }
  return Xt;
}, error: function(e2) {
  j.error("sessionStorage error: ", e2);
}, get: function(e2) {
  try {
    return null == n ? void 0 : n.sessionStorage.getItem(e2);
  } catch (e3) {
    Qt.error(e3);
  }
  return null;
}, parse: function(e2) {
  try {
    return JSON.parse(Qt.get(e2)) || null;
  } catch (e3) {
  }
  return null;
}, set: function(e2, t2) {
  try {
    null == n || n.sessionStorage.setItem(e2, JSON.stringify(t2));
  } catch (e3) {
    Qt.error(e3);
  }
}, remove: function(e2) {
  try {
    null == n || n.sessionStorage.removeItem(e2);
  } catch (e3) {
    Qt.error(e3);
  }
} };
!function(e2) {
  e2[e2.PENDING = -1] = "PENDING", e2[e2.DENIED = 0] = "DENIED", e2[e2.GRANTED = 1] = "GRANTED";
}(zt || (zt = {}));
class Zt {
  constructor(e2) {
    this.instance = e2;
  }
  get config() {
    return this.instance.config;
  }
  get consent() {
    return this.getDnt() ? zt.DENIED : this.storedConsent;
  }
  isOptedOut() {
    return this.consent === zt.DENIED || this.consent === zt.PENDING && this.config.opt_out_capturing_by_default;
  }
  isOptedIn() {
    return !this.isOptedOut();
  }
  optInOut(e2) {
    this.storage.set(this.storageKey, e2 ? 1 : 0, this.config.cookie_expiration, this.config.cross_subdomain_cookie, this.config.secure_cookie);
  }
  reset() {
    this.storage.remove(this.storageKey, this.config.cross_subdomain_cookie);
  }
  get storageKey() {
    var { token: e2, opt_out_capturing_cookie_prefix: t2 } = this.instance.config;
    return (t2 || "__ph_opt_in_out_") + e2;
  }
  get storedConsent() {
    var e2 = this.storage.get(this.storageKey);
    return "1" === e2 ? zt.GRANTED : "0" === e2 ? zt.DENIED : zt.PENDING;
  }
  get storage() {
    if (!this._storage) {
      var e2 = this.config.opt_out_capturing_persistence_type;
      this._storage = "localStorage" === e2 ? Vt : jt;
      var t2 = "localStorage" === e2 ? jt : Vt;
      t2.get(this.storageKey) && (this._storage.get(this.storageKey) || this.optInOut("1" === t2.get(this.storageKey)), t2.remove(this.storageKey, this.config.cross_subdomain_cookie));
    }
    return this._storage;
  }
  getDnt() {
    return !!this.config.respect_dnt && !!re([null == u ? void 0 : u.doNotTrack, null == u ? void 0 : u.msDoNotTrack, f.doNotTrack], (e2) => w([true, 1, "1", "yes"], e2));
  }
}
var ei = W("[Dead Clicks]"), ti = () => true, ii = (e2) => {
  var t2, i2 = !(null === (t2 = e2.instance.persistence) || void 0 === t2 || !t2.get_property(_e)), s2 = e2.instance.config.capture_dead_clicks;
  return q(s2) ? s2 : i2;
};
class si {
  get lazyLoadedDeadClicksAutocapture() {
    return this._lazyLoadedDeadClicksAutocapture;
  }
  constructor(e2, t2, i2) {
    this.instance = e2, this.isEnabled = t2, this.onCapture = i2, this.startIfEnabled();
  }
  onRemoteConfig(e2) {
    this.instance.persistence && this.instance.persistence.register({ [_e]: null == e2 ? void 0 : e2.captureDeadClicks }), this.startIfEnabled();
  }
  startIfEnabled() {
    this.isEnabled(this) && this.loadScript(() => {
      this.start();
    });
  }
  loadScript(e2) {
    var t2, i2, s2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.initDeadClicksAutocapture && e2(), null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this.instance, "dead-clicks-autocapture", (t3) => {
      t3 ? ei.error("failed to load script", t3) : e2();
    });
  }
  start() {
    var e2;
    if (d) {
      if (!this._lazyLoadedDeadClicksAutocapture && null !== (e2 = f.__PosthogExtensions__) && void 0 !== e2 && e2.initDeadClicksAutocapture) {
        var t2 = R(this.instance.config.capture_dead_clicks) ? this.instance.config.capture_dead_clicks : {};
        t2.__onCapture = this.onCapture, this._lazyLoadedDeadClicksAutocapture = f.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, t2), this._lazyLoadedDeadClicksAutocapture.start(d), ei.info("starting...");
      }
    } else
      ei.error("`document` not found. Cannot start.");
  }
  stop() {
    this._lazyLoadedDeadClicksAutocapture && (this._lazyLoadedDeadClicksAutocapture.stop(), this._lazyLoadedDeadClicksAutocapture = void 0, ei.info("stopping..."));
  }
}
var ri = W("[ExceptionAutocapture]");
class ni {
  constructor(e2) {
    var t2;
    i(this, "startCapturing", () => {
      var e3, t3, i2, s2;
      if (n && this.isEnabled && !this.hasHandlers) {
        var r2 = null === (e3 = f.__PosthogExtensions__) || void 0 === e3 || null === (t3 = e3.errorWrappingFunctions) || void 0 === t3 ? void 0 : t3.wrapOnError, o2 = null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.errorWrappingFunctions) || void 0 === s2 ? void 0 : s2.wrapUnhandledRejection;
        if (r2 && o2)
          try {
            this.unwrapOnError = r2(this.captureException.bind(this)), this.unwrapUnhandledRejection = o2(this.captureException.bind(this));
          } catch (e4) {
            ri.error("failed to start", e4), this.stopCapturing();
          }
        else
          ri.error("failed to load error wrapping functions - cannot start");
      }
    }), this.instance = e2, this.remoteEnabled = !(null === (t2 = this.instance.persistence) || void 0 === t2 || !t2.props[de]), this.startIfEnabled();
  }
  get isEnabled() {
    var e2;
    return q(this.instance.config.capture_exceptions) ? this.instance.config.capture_exceptions : null !== (e2 = this.remoteEnabled) && void 0 !== e2 && e2;
  }
  get hasHandlers() {
    return !$(this.unwrapOnError);
  }
  startIfEnabled() {
    this.isEnabled && !this.hasHandlers && (ri.info("enabled, starting..."), this.loadScript(this.startCapturing));
  }
  loadScript(e2) {
    var t2, i2;
    this.hasHandlers && e2(), null === (t2 = f.__PosthogExtensions__) || void 0 === t2 || null === (i2 = t2.loadExternalDependency) || void 0 === i2 || i2.call(t2, this.instance, "exception-autocapture", (t3) => {
      if (t3)
        return ri.error("failed to load script", t3);
      e2();
    });
  }
  stopCapturing() {
    var e2, t2;
    null === (e2 = this.unwrapOnError) || void 0 === e2 || e2.call(this), this.unwrapOnError = void 0, null === (t2 = this.unwrapUnhandledRejection) || void 0 === t2 || t2.call(this), this.unwrapUnhandledRejection = void 0;
  }
  onRemoteConfig(e2) {
    var t2 = e2.autocaptureExceptions;
    this.remoteEnabled = !!t2 || false, this.instance.persistence && this.instance.persistence.register({ [de]: this.remoteEnabled }), this.startIfEnabled();
  }
  captureException(e2) {
    var t2 = this.instance.requestRouter.endpointFor("ui");
    e2.$exception_personURL = "".concat(t2, "/project/").concat(this.instance.config.token, "/person/").concat(this.instance.get_distinct_id()), this.instance.exceptions.sendExceptionEvent(e2);
  }
}
function oi(e2) {
  var t2, i2;
  return (null === (t2 = JSON.stringify(e2, (i2 = [], function(e3, t3) {
    if (R(t3)) {
      for (; i2.length > 0 && i2[i2.length - 1] !== this; )
        i2.pop();
      return i2.includes(t3) ? "[Circular]" : (i2.push(t3), t3);
    }
    return t3;
  }))) || void 0 === t2 ? void 0 : t2.length) || 0;
}
function ai(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 66060288e-1;
  if (e2.size >= t2 && e2.data.length > 1) {
    var i2 = Math.floor(e2.data.length / 2), s2 = e2.data.slice(0, i2), r2 = e2.data.slice(i2);
    return [ai({ size: oi(s2), data: s2, sessionId: e2.sessionId, windowId: e2.windowId }), ai({ size: oi(r2), data: r2, sessionId: e2.sessionId, windowId: e2.windowId })].flatMap((e3) => e3);
  }
  return [e2];
}
var li = ((e2) => (e2[e2.DomContentLoaded = 0] = "DomContentLoaded", e2[e2.Load = 1] = "Load", e2[e2.FullSnapshot = 2] = "FullSnapshot", e2[e2.IncrementalSnapshot = 3] = "IncrementalSnapshot", e2[e2.Meta = 4] = "Meta", e2[e2.Custom = 5] = "Custom", e2[e2.Plugin = 6] = "Plugin", e2))(li || {}), ci = ((e2) => (e2[e2.Mutation = 0] = "Mutation", e2[e2.MouseMove = 1] = "MouseMove", e2[e2.MouseInteraction = 2] = "MouseInteraction", e2[e2.Scroll = 3] = "Scroll", e2[e2.ViewportResize = 4] = "ViewportResize", e2[e2.Input = 5] = "Input", e2[e2.TouchMove = 6] = "TouchMove", e2[e2.MediaInteraction = 7] = "MediaInteraction", e2[e2.StyleSheetRule = 8] = "StyleSheetRule", e2[e2.CanvasMutation = 9] = "CanvasMutation", e2[e2.Font = 10] = "Font", e2[e2.Log = 11] = "Log", e2[e2.Drag = 12] = "Drag", e2[e2.StyleDeclaration = 13] = "StyleDeclaration", e2[e2.Selection = 14] = "Selection", e2[e2.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e2[e2.CustomElement = 16] = "CustomElement", e2))(ci || {}), ui = "[SessionRecording]", di = "redacted", hi = { initiatorTypes: ["audio", "beacon", "body", "css", "early-hint", "embed", "fetch", "frame", "iframe", "icon", "image", "img", "input", "link", "navigation", "object", "ping", "script", "track", "video", "xmlhttprequest"], maskRequestFn: (e2) => e2, recordHeaders: false, recordBody: false, recordInitialRequests: false, recordPerformance: false, performanceEntryTypeToObserve: ["first-input", "navigation", "paint", "resource"], payloadSizeLimitBytes: 1e6, payloadHostDenyList: [".lr-ingest.io", ".ingest.sentry.io", ".clarity.ms", "analytics.google.com"] }, _i = ["authorization", "x-forwarded-for", "authorization", "cookie", "set-cookie", "x-api-key", "x-real-ip", "remote-addr", "forwarded", "proxy-authorization", "x-csrf-token", "x-csrftoken", "x-xsrf-token"], pi = ["password", "secret", "passwd", "api_key", "apikey", "auth", "credentials", "mysql_pwd", "privatekey", "private_key", "token"], gi = ["/s/", "/e/", "/i/"];
function vi(e2, t2, i2, s2) {
  if (L(e2))
    return e2;
  var r2 = (null == t2 ? void 0 : t2["content-length"]) || function(e3) {
    return new Blob([e3]).size;
  }(e2);
  return A(r2) && (r2 = parseInt(r2)), r2 > i2 ? ui + " ".concat(s2, " body too large to record (").concat(r2, " bytes)") : e2;
}
function fi(e2, t2) {
  if (L(e2))
    return e2;
  var i2 = e2;
  return ht(i2, false) || (i2 = ui + " " + t2 + " body " + di), J(pi, (e3) => {
    var s2, r2;
    null !== (s2 = i2) && void 0 !== s2 && s2.length && -1 !== (null === (r2 = i2) || void 0 === r2 ? void 0 : r2.indexOf(e3)) && (i2 = ui + " " + t2 + " body " + di + " as might contain: " + e3);
  }), i2;
}
var mi = (e2, i2) => {
  var s2, r2, n2, o2 = { payloadSizeLimitBytes: hi.payloadSizeLimitBytes, performanceEntryTypeToObserve: [...hi.performanceEntryTypeToObserve], payloadHostDenyList: [...i2.payloadHostDenyList || [], ...hi.payloadHostDenyList] }, a2 = false !== e2.session_recording.recordHeaders && i2.recordHeaders, l2 = false !== e2.session_recording.recordBody && i2.recordBody, c2 = false !== e2.capture_performance && i2.recordPerformance, u2 = (s2 = o2, n2 = Math.min(1e6, null !== (r2 = s2.payloadSizeLimitBytes) && void 0 !== r2 ? r2 : 1e6), (e3) => (null != e3 && e3.requestBody && (e3.requestBody = vi(e3.requestBody, e3.requestHeaders, n2, "Request")), null != e3 && e3.responseBody && (e3.responseBody = vi(e3.responseBody, e3.responseHeaders, n2, "Response")), e3)), d2 = (t2) => {
    return u2(((e3, t3) => {
      var i4, s4 = yt(e3.name), r3 = 0 === t3.indexOf("http") ? null === (i4 = yt(t3)) || void 0 === i4 ? void 0 : i4.pathname : t3;
      "/" === r3 && (r3 = "");
      var n3 = null == s4 ? void 0 : s4.pathname.replace(r3 || "", "");
      if (!(s4 && n3 && gi.some((e4) => 0 === n3.indexOf(e4))))
        return e3;
    })((s3 = (i3 = t2).requestHeaders, L(s3) || J(Object.keys(null != s3 ? s3 : {}), (e3) => {
      _i.includes(e3.toLowerCase()) && (s3[e3] = di);
    }), i3), e2.api_host));
    var i3, s3;
  }, h2 = F(e2.session_recording.maskNetworkRequestFn);
  return h2 && F(e2.session_recording.maskCapturedNetworkRequestFn) && j.warn("Both `maskNetworkRequestFn` and `maskCapturedNetworkRequestFn` are defined. `maskNetworkRequestFn` will be ignored."), h2 && (e2.session_recording.maskCapturedNetworkRequestFn = (i3) => {
    var s3 = e2.session_recording.maskNetworkRequestFn({ url: i3.name });
    return t(t({}, i3), {}, { name: null == s3 ? void 0 : s3.url });
  }), o2.maskRequestFn = F(e2.session_recording.maskCapturedNetworkRequestFn) ? (t2) => {
    var i3, s3, r3, n3 = d2(t2);
    return n3 && null !== (i3 = null === (s3 = (r3 = e2.session_recording).maskCapturedNetworkRequestFn) || void 0 === s3 ? void 0 : s3.call(r3, n3)) && void 0 !== i3 ? i3 : void 0;
  } : (e3) => function(e4) {
    if (!$(e4))
      return e4.requestBody = fi(e4.requestBody, "Request"), e4.responseBody = fi(e4.responseBody, "Response"), e4;
  }(d2(e3)), t(t(t({}, hi), o2), {}, { recordHeaders: a2, recordBody: l2, recordPerformance: c2, recordInitialRequests: c2 });
};
function bi(e2, t2, i2, s2, r2) {
  return t2 > i2 && (j.warn("min cannot be greater than max."), t2 = i2), D(e2) ? e2 > i2 ? (s2 && j.warn(s2 + " cannot be  greater than max: " + i2 + ". Using max value instead."), i2) : e2 < t2 ? (s2 && j.warn(s2 + " cannot be less than min: " + t2 + ". Using min value instead."), t2) : e2 : (s2 && j.warn(s2 + " must be a number. using max or fallback. max: " + i2 + ", fallback: " + r2), bi(r2 || i2, t2, i2, s2));
}
class yi {
  constructor(e2) {
    var t2, s2, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    i(this, "bucketSize", 100), i(this, "refillRate", 10), i(this, "mutationBuckets", {}), i(this, "loggedTracker", {}), i(this, "refillBuckets", () => {
      Object.keys(this.mutationBuckets).forEach((e3) => {
        this.mutationBuckets[e3] = this.mutationBuckets[e3] + this.refillRate, this.mutationBuckets[e3] >= this.bucketSize && delete this.mutationBuckets[e3];
      });
    }), i(this, "getNodeOrRelevantParent", (e3) => {
      var t3 = this.rrweb.mirror.getNode(e3);
      if ("svg" !== (null == t3 ? void 0 : t3.nodeName) && t3 instanceof Element) {
        var i2 = t3.closest("svg");
        if (i2)
          return [this.rrweb.mirror.getId(i2), i2];
      }
      return [e3, t3];
    }), i(this, "numberOfChanges", (e3) => {
      var t3, i2, s3, r3, n2, o2, a2, l2;
      return (null !== (t3 = null === (i2 = e3.removes) || void 0 === i2 ? void 0 : i2.length) && void 0 !== t3 ? t3 : 0) + (null !== (s3 = null === (r3 = e3.attributes) || void 0 === r3 ? void 0 : r3.length) && void 0 !== s3 ? s3 : 0) + (null !== (n2 = null === (o2 = e3.texts) || void 0 === o2 ? void 0 : o2.length) && void 0 !== n2 ? n2 : 0) + (null !== (a2 = null === (l2 = e3.adds) || void 0 === l2 ? void 0 : l2.length) && void 0 !== a2 ? a2 : 0);
    }), i(this, "throttleMutations", (e3) => {
      if (3 !== e3.type || 0 !== e3.data.source)
        return e3;
      var t3 = e3.data, i2 = this.numberOfChanges(t3);
      t3.attributes && (t3.attributes = t3.attributes.filter((e4) => {
        var t4, i3, s4, [r3, n2] = this.getNodeOrRelevantParent(e4.id);
        if (0 === this.mutationBuckets[r3])
          return false;
        (this.mutationBuckets[r3] = null !== (t4 = this.mutationBuckets[r3]) && void 0 !== t4 ? t4 : this.bucketSize, this.mutationBuckets[r3] = Math.max(this.mutationBuckets[r3] - 1, 0), 0 === this.mutationBuckets[r3]) && (this.loggedTracker[r3] || (this.loggedTracker[r3] = true, null === (i3 = (s4 = this.options).onBlockedNode) || void 0 === i3 || i3.call(s4, r3, n2)));
        return e4;
      }));
      var s3 = this.numberOfChanges(t3);
      return 0 !== s3 || i2 === s3 ? e3 : void 0;
    }), this.rrweb = e2, this.options = r2, this.refillRate = bi(null !== (t2 = this.options.refillRate) && void 0 !== t2 ? t2 : this.refillRate, 0, 100, "mutation throttling refill rate"), this.bucketSize = bi(null !== (s2 = this.options.bucketSize) && void 0 !== s2 ? s2 : this.bucketSize, 0, 100, "mutation throttling bucket size"), setInterval(() => {
      this.refillBuckets();
    }, 1e3);
  }
}
var wi = Uint8Array, Si = Uint16Array, ki = Uint32Array, Ei = new wi([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), xi = new wi([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), Ii = new wi([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Pi = function(e2, t2) {
  for (var i2 = new Si(31), s2 = 0; s2 < 31; ++s2)
    i2[s2] = t2 += 1 << e2[s2 - 1];
  var r2 = new ki(i2[30]);
  for (s2 = 1; s2 < 30; ++s2)
    for (var n2 = i2[s2]; n2 < i2[s2 + 1]; ++n2)
      r2[n2] = n2 - i2[s2] << 5 | s2;
  return [i2, r2];
}, Ci = Pi(Ei, 2), Fi = Ci[0], Ri = Ci[1];
Fi[28] = 258, Ri[258] = 28;
for (var Ti = Pi(xi, 0)[1], $i = new Si(32768), Ai = 0; Ai < 32768; ++Ai) {
  var Oi = (43690 & Ai) >>> 1 | (21845 & Ai) << 1;
  Oi = (61680 & (Oi = (52428 & Oi) >>> 2 | (13107 & Oi) << 2)) >>> 4 | (3855 & Oi) << 4, $i[Ai] = ((65280 & Oi) >>> 8 | (255 & Oi) << 8) >>> 1;
}
var Mi = function(e2, t2, i2) {
  for (var s2 = e2.length, r2 = 0, n2 = new Si(t2); r2 < s2; ++r2)
    ++n2[e2[r2] - 1];
  var o2, a2 = new Si(t2);
  for (r2 = 0; r2 < t2; ++r2)
    a2[r2] = a2[r2 - 1] + n2[r2 - 1] << 1;
  if (i2) {
    o2 = new Si(1 << t2);
    var l2 = 15 - t2;
    for (r2 = 0; r2 < s2; ++r2)
      if (e2[r2])
        for (var c2 = r2 << 4 | e2[r2], u2 = t2 - e2[r2], d2 = a2[e2[r2] - 1]++ << u2, h2 = d2 | (1 << u2) - 1; d2 <= h2; ++d2)
          o2[$i[d2] >>> l2] = c2;
  } else
    for (o2 = new Si(s2), r2 = 0; r2 < s2; ++r2)
      o2[r2] = $i[a2[e2[r2] - 1]++] >>> 15 - e2[r2];
  return o2;
}, Li = new wi(288);
for (Ai = 0; Ai < 144; ++Ai)
  Li[Ai] = 8;
for (Ai = 144; Ai < 256; ++Ai)
  Li[Ai] = 9;
for (Ai = 256; Ai < 280; ++Ai)
  Li[Ai] = 7;
for (Ai = 280; Ai < 288; ++Ai)
  Li[Ai] = 8;
var Di = new wi(32);
for (Ai = 0; Ai < 32; ++Ai)
  Di[Ai] = 5;
var qi = Mi(Li, 9, 0), Ni = Mi(Di, 5, 0), Bi = function(e2) {
  return (e2 / 8 >> 0) + (7 & e2 && 1);
}, Hi = function(e2, t2, i2) {
  (null == i2 || i2 > e2.length) && (i2 = e2.length);
  var s2 = new (e2 instanceof Si ? Si : e2 instanceof ki ? ki : wi)(i2 - t2);
  return s2.set(e2.subarray(t2, i2)), s2;
}, Ui = function(e2, t2, i2) {
  i2 <<= 7 & t2;
  var s2 = t2 / 8 >> 0;
  e2[s2] |= i2, e2[s2 + 1] |= i2 >>> 8;
}, zi = function(e2, t2, i2) {
  i2 <<= 7 & t2;
  var s2 = t2 / 8 >> 0;
  e2[s2] |= i2, e2[s2 + 1] |= i2 >>> 8, e2[s2 + 2] |= i2 >>> 16;
}, ji = function(e2, t2) {
  for (var i2 = [], s2 = 0; s2 < e2.length; ++s2)
    e2[s2] && i2.push({ s: s2, f: e2[s2] });
  var r2 = i2.length, n2 = i2.slice();
  if (!r2)
    return [new wi(0), 0];
  if (1 == r2) {
    var o2 = new wi(i2[0].s + 1);
    return o2[i2[0].s] = 1, [o2, 1];
  }
  i2.sort(function(e3, t3) {
    return e3.f - t3.f;
  }), i2.push({ s: -1, f: 25001 });
  var a2 = i2[0], l2 = i2[1], c2 = 0, u2 = 1, d2 = 2;
  for (i2[0] = { s: -1, f: a2.f + l2.f, l: a2, r: l2 }; u2 != r2 - 1; )
    a2 = i2[i2[c2].f < i2[d2].f ? c2++ : d2++], l2 = i2[c2 != u2 && i2[c2].f < i2[d2].f ? c2++ : d2++], i2[u2++] = { s: -1, f: a2.f + l2.f, l: a2, r: l2 };
  var h2 = n2[0].s;
  for (s2 = 1; s2 < r2; ++s2)
    n2[s2].s > h2 && (h2 = n2[s2].s);
  var _2 = new Si(h2 + 1), p2 = Wi(i2[u2 - 1], _2, 0);
  if (p2 > t2) {
    s2 = 0;
    var g2 = 0, v2 = p2 - t2, f2 = 1 << v2;
    for (n2.sort(function(e3, t3) {
      return _2[t3.s] - _2[e3.s] || e3.f - t3.f;
    }); s2 < r2; ++s2) {
      var m2 = n2[s2].s;
      if (!(_2[m2] > t2))
        break;
      g2 += f2 - (1 << p2 - _2[m2]), _2[m2] = t2;
    }
    for (g2 >>>= v2; g2 > 0; ) {
      var b2 = n2[s2].s;
      _2[b2] < t2 ? g2 -= 1 << t2 - _2[b2]++ - 1 : ++s2;
    }
    for (; s2 >= 0 && g2; --s2) {
      var y2 = n2[s2].s;
      _2[y2] == t2 && (--_2[y2], ++g2);
    }
    p2 = t2;
  }
  return [new wi(_2), p2];
}, Wi = function(e2, t2, i2) {
  return -1 == e2.s ? Math.max(Wi(e2.l, t2, i2 + 1), Wi(e2.r, t2, i2 + 1)) : t2[e2.s] = i2;
}, Vi = function(e2) {
  for (var t2 = e2.length; t2 && !e2[--t2]; )
    ;
  for (var i2 = new Si(++t2), s2 = 0, r2 = e2[0], n2 = 1, o2 = function(e3) {
    i2[s2++] = e3;
  }, a2 = 1; a2 <= t2; ++a2)
    if (e2[a2] == r2 && a2 != t2)
      ++n2;
    else {
      if (!r2 && n2 > 2) {
        for (; n2 > 138; n2 -= 138)
          o2(32754);
        n2 > 2 && (o2(n2 > 10 ? n2 - 11 << 5 | 28690 : n2 - 3 << 5 | 12305), n2 = 0);
      } else if (n2 > 3) {
        for (o2(r2), --n2; n2 > 6; n2 -= 6)
          o2(8304);
        n2 > 2 && (o2(n2 - 3 << 5 | 8208), n2 = 0);
      }
      for (; n2--; )
        o2(r2);
      n2 = 1, r2 = e2[a2];
    }
  return [i2.subarray(0, s2), t2];
}, Gi = function(e2, t2) {
  for (var i2 = 0, s2 = 0; s2 < t2.length; ++s2)
    i2 += e2[s2] * t2[s2];
  return i2;
}, Ji = function(e2, t2, i2) {
  var s2 = i2.length, r2 = Bi(t2 + 2);
  e2[r2] = 255 & s2, e2[r2 + 1] = s2 >>> 8, e2[r2 + 2] = 255 ^ e2[r2], e2[r2 + 3] = 255 ^ e2[r2 + 1];
  for (var n2 = 0; n2 < s2; ++n2)
    e2[r2 + n2 + 4] = i2[n2];
  return 8 * (r2 + 4 + s2);
}, Yi = function(e2, t2, i2, s2, r2, n2, o2, a2, l2, c2, u2) {
  Ui(t2, u2++, i2), ++r2[256];
  for (var d2 = ji(r2, 15), h2 = d2[0], _2 = d2[1], p2 = ji(n2, 15), g2 = p2[0], v2 = p2[1], f2 = Vi(h2), m2 = f2[0], b2 = f2[1], y2 = Vi(g2), w2 = y2[0], S2 = y2[1], k2 = new Si(19), E2 = 0; E2 < m2.length; ++E2)
    k2[31 & m2[E2]]++;
  for (E2 = 0; E2 < w2.length; ++E2)
    k2[31 & w2[E2]]++;
  for (var x2 = ji(k2, 7), I2 = x2[0], P2 = x2[1], C2 = 19; C2 > 4 && !I2[Ii[C2 - 1]]; --C2)
    ;
  var F2, R2, T2, $2, A2 = c2 + 5 << 3, O2 = Gi(r2, Li) + Gi(n2, Di) + o2, M2 = Gi(r2, h2) + Gi(n2, g2) + o2 + 14 + 3 * C2 + Gi(k2, I2) + (2 * k2[16] + 3 * k2[17] + 7 * k2[18]);
  if (A2 <= O2 && A2 <= M2)
    return Ji(t2, u2, e2.subarray(l2, l2 + c2));
  if (Ui(t2, u2, 1 + (M2 < O2)), u2 += 2, M2 < O2) {
    F2 = Mi(h2, _2, 0), R2 = h2, T2 = Mi(g2, v2, 0), $2 = g2;
    var L2 = Mi(I2, P2, 0);
    Ui(t2, u2, b2 - 257), Ui(t2, u2 + 5, S2 - 1), Ui(t2, u2 + 10, C2 - 4), u2 += 14;
    for (E2 = 0; E2 < C2; ++E2)
      Ui(t2, u2 + 3 * E2, I2[Ii[E2]]);
    u2 += 3 * C2;
    for (var D2 = [m2, w2], q2 = 0; q2 < 2; ++q2) {
      var N2 = D2[q2];
      for (E2 = 0; E2 < N2.length; ++E2) {
        var B2 = 31 & N2[E2];
        Ui(t2, u2, L2[B2]), u2 += I2[B2], B2 > 15 && (Ui(t2, u2, N2[E2] >>> 5 & 127), u2 += N2[E2] >>> 12);
      }
    }
  } else
    F2 = qi, R2 = Li, T2 = Ni, $2 = Di;
  for (E2 = 0; E2 < a2; ++E2)
    if (s2[E2] > 255) {
      B2 = s2[E2] >>> 18 & 31;
      zi(t2, u2, F2[B2 + 257]), u2 += R2[B2 + 257], B2 > 7 && (Ui(t2, u2, s2[E2] >>> 23 & 31), u2 += Ei[B2]);
      var H2 = 31 & s2[E2];
      zi(t2, u2, T2[H2]), u2 += $2[H2], H2 > 3 && (zi(t2, u2, s2[E2] >>> 5 & 8191), u2 += xi[H2]);
    } else
      zi(t2, u2, F2[s2[E2]]), u2 += R2[s2[E2]];
  return zi(t2, u2, F2[256]), u2 + R2[256];
}, Ki = new ki([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Xi = function() {
  for (var e2 = new ki(256), t2 = 0; t2 < 256; ++t2) {
    for (var i2 = t2, s2 = 9; --s2; )
      i2 = (1 & i2 && 3988292384) ^ i2 >>> 1;
    e2[t2] = i2;
  }
  return e2;
}(), Qi = function() {
  var e2 = 4294967295;
  return { p: function(t2) {
    for (var i2 = e2, s2 = 0; s2 < t2.length; ++s2)
      i2 = Xi[255 & i2 ^ t2[s2]] ^ i2 >>> 8;
    e2 = i2;
  }, d: function() {
    return 4294967295 ^ e2;
  } };
}, Zi = function(e2, t2, i2, s2, r2) {
  return function(e3, t3, i3, s3, r3, n2) {
    var o2 = e3.length, a2 = new wi(s3 + o2 + 5 * (1 + Math.floor(o2 / 7e3)) + r3), l2 = a2.subarray(s3, a2.length - r3), c2 = 0;
    if (!t3 || o2 < 8)
      for (var u2 = 0; u2 <= o2; u2 += 65535) {
        var d2 = u2 + 65535;
        d2 < o2 ? c2 = Ji(l2, c2, e3.subarray(u2, d2)) : (l2[u2] = n2, c2 = Ji(l2, c2, e3.subarray(u2, o2)));
      }
    else {
      for (var h2 = Ki[t3 - 1], _2 = h2 >>> 13, p2 = 8191 & h2, g2 = (1 << i3) - 1, v2 = new Si(32768), f2 = new Si(g2 + 1), m2 = Math.ceil(i3 / 3), b2 = 2 * m2, y2 = function(t4) {
        return (e3[t4] ^ e3[t4 + 1] << m2 ^ e3[t4 + 2] << b2) & g2;
      }, w2 = new ki(25e3), S2 = new Si(288), k2 = new Si(32), E2 = 0, x2 = 0, I2 = (u2 = 0, 0), P2 = 0, C2 = 0; u2 < o2; ++u2) {
        var F2 = y2(u2), R2 = 32767 & u2, T2 = f2[F2];
        if (v2[R2] = T2, f2[F2] = R2, P2 <= u2) {
          var $2 = o2 - u2;
          if ((E2 > 7e3 || I2 > 24576) && $2 > 423) {
            c2 = Yi(e3, l2, 0, w2, S2, k2, x2, I2, C2, u2 - C2, c2), I2 = E2 = x2 = 0, C2 = u2;
            for (var A2 = 0; A2 < 286; ++A2)
              S2[A2] = 0;
            for (A2 = 0; A2 < 30; ++A2)
              k2[A2] = 0;
          }
          var O2 = 2, M2 = 0, L2 = p2, D2 = R2 - T2 & 32767;
          if ($2 > 2 && F2 == y2(u2 - D2))
            for (var q2 = Math.min(_2, $2) - 1, N2 = Math.min(32767, u2), B2 = Math.min(258, $2); D2 <= N2 && --L2 && R2 != T2; ) {
              if (e3[u2 + O2] == e3[u2 + O2 - D2]) {
                for (var H2 = 0; H2 < B2 && e3[u2 + H2] == e3[u2 + H2 - D2]; ++H2)
                  ;
                if (H2 > O2) {
                  if (O2 = H2, M2 = D2, H2 > q2)
                    break;
                  var U2 = Math.min(D2, H2 - 2), z2 = 0;
                  for (A2 = 0; A2 < U2; ++A2) {
                    var j2 = u2 - D2 + A2 + 32768 & 32767, W2 = j2 - v2[j2] + 32768 & 32767;
                    W2 > z2 && (z2 = W2, T2 = j2);
                  }
                }
              }
              D2 += (R2 = T2) - (T2 = v2[R2]) + 32768 & 32767;
            }
          if (M2) {
            w2[I2++] = 268435456 | Ri[O2] << 18 | Ti[M2];
            var V2 = 31 & Ri[O2], G2 = 31 & Ti[M2];
            x2 += Ei[V2] + xi[G2], ++S2[257 + V2], ++k2[G2], P2 = u2 + O2, ++E2;
          } else
            w2[I2++] = e3[u2], ++S2[e3[u2]];
        }
      }
      c2 = Yi(e3, l2, n2, w2, S2, k2, x2, I2, C2, u2 - C2, c2);
    }
    return Hi(a2, 0, s3 + Bi(c2) + r3);
  }(e2, null == t2.level ? 6 : t2.level, null == t2.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e2.length)))) : 12 + t2.mem, i2, s2, !r2);
}, es = function(e2, t2, i2) {
  for (; i2; ++t2)
    e2[t2] = i2, i2 >>>= 8;
}, ts = function(e2, t2) {
  var i2 = t2.filename;
  if (e2[0] = 31, e2[1] = 139, e2[2] = 8, e2[8] = t2.level < 2 ? 4 : 9 == t2.level ? 2 : 0, e2[9] = 3, 0 != t2.mtime && es(e2, 4, Math.floor(new Date(t2.mtime || Date.now()) / 1e3)), i2) {
    e2[3] = 8;
    for (var s2 = 0; s2 <= i2.length; ++s2)
      e2[s2 + 10] = i2.charCodeAt(s2);
  }
}, is = function(e2) {
  return 10 + (e2.filename && e2.filename.length + 1 || 0);
};
function ss(e2, t2) {
  void 0 === t2 && (t2 = {});
  var i2 = Qi(), s2 = e2.length;
  i2.p(e2);
  var r2 = Zi(e2, t2, is(t2), 8), n2 = r2.length;
  return ts(r2, t2), es(r2, n2 - 8, i2.d()), es(r2, n2 - 4, s2), r2;
}
function rs(e2, t2) {
  var i2 = e2.length;
  if ("undefined" != typeof TextEncoder)
    return new TextEncoder().encode(e2);
  for (var s2 = new wi(e2.length + (e2.length >>> 1)), r2 = 0, n2 = function(e3) {
    s2[r2++] = e3;
  }, o2 = 0; o2 < i2; ++o2) {
    if (r2 + 5 > s2.length) {
      var a2 = new wi(r2 + 8 + (i2 - o2 << 1));
      a2.set(s2), s2 = a2;
    }
    var l2 = e2.charCodeAt(o2);
    l2 < 128 || t2 ? n2(l2) : l2 < 2048 ? (n2(192 | l2 >>> 6), n2(128 | 63 & l2)) : l2 > 55295 && l2 < 57344 ? (n2(240 | (l2 = 65536 + (1047552 & l2) | 1023 & e2.charCodeAt(++o2)) >>> 18), n2(128 | l2 >>> 12 & 63), n2(128 | l2 >>> 6 & 63), n2(128 | 63 & l2)) : (n2(224 | l2 >>> 12), n2(128 | l2 >>> 6 & 63), n2(128 | 63 & l2));
  }
  return Hi(s2, 0, r2);
}
function ns(e2, t2) {
  return function(e3) {
    for (var t3 = 0, i2 = 0; i2 < e3.length; i2++)
      t3 = (t3 << 5) - t3 + e3.charCodeAt(i2), t3 |= 0;
    return Math.abs(t3);
  }(e2) % 100 < bi(100 * t2, 0, 100);
}
var os = "[SessionRecording]", as = W(os), ls = 3e5, cs = [ci.MouseMove, ci.MouseInteraction, ci.Scroll, ci.ViewportResize, ci.Input, ci.TouchMove, ci.MediaInteraction, ci.Drag], us = (e2) => ({ rrwebMethod: e2, enqueuedAt: Date.now(), attempt: 1 });
function ds(e2) {
  return function(e3, t2) {
    for (var i2 = "", s2 = 0; s2 < e3.length; ) {
      var r2 = e3[s2++];
      r2 < 128 || t2 ? i2 += String.fromCharCode(r2) : r2 < 224 ? i2 += String.fromCharCode((31 & r2) << 6 | 63 & e3[s2++]) : r2 < 240 ? i2 += String.fromCharCode((15 & r2) << 12 | (63 & e3[s2++]) << 6 | 63 & e3[s2++]) : (r2 = ((15 & r2) << 18 | (63 & e3[s2++]) << 12 | (63 & e3[s2++]) << 6 | 63 & e3[s2++]) - 65536, i2 += String.fromCharCode(55296 | r2 >> 10, 56320 | 1023 & r2));
    }
    return i2;
  }(ss(rs(JSON.stringify(e2))), true);
}
function hs(e2) {
  return e2.type === li.Custom && "sessionIdle" === e2.data.tag;
}
function _s(e2, t2) {
  return t2.some((t3) => "regex" === t3.matching && new RegExp(t3.url).test(e2));
}
class ps {
  get sessionIdleThresholdMilliseconds() {
    return this.instance.config.session_recording.session_idle_threshold_ms || 3e5;
  }
  get rrwebRecord() {
    var e2, t2;
    return null == f || null === (e2 = f.__PosthogExtensions__) || void 0 === e2 || null === (t2 = e2.rrweb) || void 0 === t2 ? void 0 : t2.record;
  }
  get started() {
    return this._captureStarted;
  }
  get sessionManager() {
    if (!this.instance.sessionManager)
      throw new Error(os + " must be started with a valid sessionManager.");
    return this.instance.sessionManager;
  }
  get fullSnapshotIntervalMillis() {
    var e2, t2;
    return "trigger_pending" === this.triggerStatus ? 6e4 : null !== (e2 = null === (t2 = this.instance.config.session_recording) || void 0 === t2 ? void 0 : t2.full_snapshot_interval_millis) && void 0 !== e2 ? e2 : ls;
  }
  get isSampled() {
    var e2 = this.instance.get_property(Ee);
    return q(e2) ? e2 : null;
  }
  get sessionDuration() {
    var e2, t2, i2 = null === (e2 = this.buffer) || void 0 === e2 ? void 0 : e2.data[(null === (t2 = this.buffer) || void 0 === t2 ? void 0 : t2.data.length) - 1], { sessionStartTimestamp: s2 } = this.sessionManager.checkAndGetSessionAndWindowId(true);
    return i2 ? i2.timestamp - s2 : null;
  }
  get isRecordingEnabled() {
    var e2 = !!this.instance.get_property(ge), t2 = !this.instance.config.disable_session_recording;
    return n && e2 && t2;
  }
  get isConsoleLogCaptureEnabled() {
    var e2 = !!this.instance.get_property(ve), t2 = this.instance.config.enable_recording_console_log;
    return null != t2 ? t2 : e2;
  }
  get canvasRecording() {
    var e2, t2, i2, s2, r2, n2, o2 = this.instance.config.session_recording.captureCanvas, a2 = this.instance.get_property(be), l2 = null !== (e2 = null !== (t2 = null == o2 ? void 0 : o2.recordCanvas) && void 0 !== t2 ? t2 : null == a2 ? void 0 : a2.enabled) && void 0 !== e2 && e2, c2 = null !== (i2 = null !== (s2 = null == o2 ? void 0 : o2.canvasFps) && void 0 !== s2 ? s2 : null == a2 ? void 0 : a2.fps) && void 0 !== i2 ? i2 : 4, u2 = null !== (r2 = null !== (n2 = null == o2 ? void 0 : o2.canvasQuality) && void 0 !== n2 ? n2 : null == a2 ? void 0 : a2.quality) && void 0 !== r2 ? r2 : 0.4;
    if ("string" == typeof u2) {
      var d2 = parseFloat(u2);
      u2 = isNaN(d2) ? 0.4 : d2;
    }
    return { enabled: l2, fps: bi(c2, 0, 12, "canvas recording fps", 4), quality: bi(u2, 0, 1, "canvas recording quality", 0.4) };
  }
  get networkPayloadCapture() {
    var e2, t2, i2 = this.instance.get_property(fe), s2 = { recordHeaders: null === (e2 = this.instance.config.session_recording) || void 0 === e2 ? void 0 : e2.recordHeaders, recordBody: null === (t2 = this.instance.config.session_recording) || void 0 === t2 ? void 0 : t2.recordBody }, r2 = (null == s2 ? void 0 : s2.recordHeaders) || (null == i2 ? void 0 : i2.recordHeaders), n2 = (null == s2 ? void 0 : s2.recordBody) || (null == i2 ? void 0 : i2.recordBody), o2 = R(this.instance.config.capture_performance) ? this.instance.config.capture_performance.network_timing : this.instance.config.capture_performance, a2 = !!(q(o2) ? o2 : null == i2 ? void 0 : i2.capturePerformance);
    return r2 || n2 || a2 ? { recordHeaders: r2, recordBody: n2, recordPerformance: a2 } : void 0;
  }
  get masking() {
    var e2, t2, i2, s2, r2, n2, o2 = this.instance.get_property(me), a2 = { maskAllInputs: null === (e2 = this.instance.config.session_recording) || void 0 === e2 ? void 0 : e2.maskAllInputs, maskTextSelector: null === (t2 = this.instance.config.session_recording) || void 0 === t2 ? void 0 : t2.maskTextSelector, blockSelector: null === (i2 = this.instance.config.session_recording) || void 0 === i2 ? void 0 : i2.blockSelector }, l2 = null !== (s2 = null == a2 ? void 0 : a2.maskAllInputs) && void 0 !== s2 ? s2 : null == o2 ? void 0 : o2.maskAllInputs, c2 = null !== (r2 = null == a2 ? void 0 : a2.maskTextSelector) && void 0 !== r2 ? r2 : null == o2 ? void 0 : o2.maskTextSelector, u2 = null !== (n2 = null == a2 ? void 0 : a2.blockSelector) && void 0 !== n2 ? n2 : null == o2 ? void 0 : o2.blockSelector;
    return $(l2) && $(c2) && $(u2) ? void 0 : { maskAllInputs: null == l2 || l2, maskTextSelector: c2, blockSelector: u2 };
  }
  get sampleRate() {
    var e2 = this.instance.get_property(ye);
    return D(e2) ? e2 : null;
  }
  get minimumDuration() {
    var e2 = this.instance.get_property(we);
    return D(e2) ? e2 : null;
  }
  get status() {
    return this.receivedDecide ? this.isRecordingEnabled ? false === this.isSampled ? "disabled" : this._urlBlocked ? "paused" : L(this._linkedFlag) || this._linkedFlagSeen ? "trigger_pending" === this.triggerStatus ? "buffering" : q(this.isSampled) ? this.isSampled ? "sampled" : "disabled" : "active" : "buffering" : "disabled" : "buffering";
  }
  get urlTriggerStatus() {
    var e2;
    return 0 === this._urlTriggers.length ? "trigger_disabled" : (null === (e2 = this.instance) || void 0 === e2 ? void 0 : e2.get_property(xe)) === this.sessionId ? "trigger_activated" : "trigger_pending";
  }
  get eventTriggerStatus() {
    var e2;
    return 0 === this._eventTriggers.length ? "trigger_disabled" : (null === (e2 = this.instance) || void 0 === e2 ? void 0 : e2.get_property(Ie)) === this.sessionId ? "trigger_activated" : "trigger_pending";
  }
  get triggerStatus() {
    var e2 = "trigger_activated" === this.eventTriggerStatus || "trigger_activated" === this.urlTriggerStatus, t2 = "trigger_pending" === this.eventTriggerStatus || "trigger_pending" === this.urlTriggerStatus;
    return e2 ? "trigger_activated" : t2 ? "trigger_pending" : "trigger_disabled";
  }
  constructor(e2) {
    if (i(this, "queuedRRWebEvents", []), i(this, "isIdle", false), i(this, "_linkedFlagSeen", false), i(this, "_lastActivityTimestamp", Date.now()), i(this, "_linkedFlag", null), i(this, "_removePageViewCaptureHook", void 0), i(this, "_onSessionIdListener", void 0), i(this, "_persistDecideOnSessionListener", void 0), i(this, "_samplingSessionListener", void 0), i(this, "_urlTriggers", []), i(this, "_urlBlocklist", []), i(this, "_urlBlocked", false), i(this, "_eventTriggers", []), i(this, "_removeEventTriggerCaptureHook", void 0), i(this, "_forceAllowLocalhostNetworkCapture", false), i(this, "_onBeforeUnload", () => {
      this._flushBuffer();
    }), i(this, "_onOffline", () => {
      this._tryAddCustomEvent("browser offline", {});
    }), i(this, "_onOnline", () => {
      this._tryAddCustomEvent("browser online", {});
    }), i(this, "_onVisibilityChange", () => {
      if (null != d && d.visibilityState) {
        var e3 = "window " + d.visibilityState;
        this._tryAddCustomEvent(e3, {});
      }
    }), this.instance = e2, this._captureStarted = false, this._endpoint = "/s/", this.stopRrweb = void 0, this.receivedDecide = false, !this.instance.sessionManager)
      throw as.error("started without valid sessionManager"), new Error(os + " started without valid sessionManager. This is a bug.");
    if (this.instance.config.__preview_experimental_cookieless_mode)
      throw new Error(os + " cannot be used with __preview_experimental_cookieless_mode.");
    var { sessionId: t2, windowId: s2 } = this.sessionManager.checkAndGetSessionAndWindowId();
    this.sessionId = t2, this.windowId = s2, this.buffer = this.clearBuffer(), this.sessionIdleThresholdMilliseconds >= this.sessionManager.sessionTimeoutMs && as.warn("session_idle_threshold_ms (".concat(this.sessionIdleThresholdMilliseconds, ") is greater than the session timeout (").concat(this.sessionManager.sessionTimeoutMs, "). Session will never be detected as idle"));
  }
  startIfEnabledOrStop(e2) {
    this.isRecordingEnabled ? (this._startCapture(e2), ne(n, "beforeunload", this._onBeforeUnload), ne(n, "offline", this._onOffline), ne(n, "online", this._onOnline), ne(n, "visibilitychange", this._onVisibilityChange), this._setupSampling(), this._addEventTriggerListener(), L(this._removePageViewCaptureHook) && (this._removePageViewCaptureHook = this.instance.on("eventCaptured", (e3) => {
      try {
        if ("$pageview" === e3.event) {
          var t2 = null != e3 && e3.properties.$current_url ? this._maskUrl(null == e3 ? void 0 : e3.properties.$current_url) : "";
          if (!t2)
            return;
          this._tryAddCustomEvent("$pageview", { href: t2 });
        }
      } catch (e4) {
        as.error("Could not add $pageview to rrweb session", e4);
      }
    })), this._onSessionIdListener || (this._onSessionIdListener = this.sessionManager.onSessionId((e3, t2, i2) => {
      var s2, r2, n2, o2;
      i2 && (this._tryAddCustomEvent("$session_id_change", { sessionId: e3, windowId: t2, changeReason: i2 }), null === (s2 = this.instance) || void 0 === s2 || null === (r2 = s2.persistence) || void 0 === r2 || r2.unregister(Ie), null === (n2 = this.instance) || void 0 === n2 || null === (o2 = n2.persistence) || void 0 === o2 || o2.unregister(xe));
    }))) : this.stopRecording();
  }
  stopRecording() {
    var e2, t2, i2, s2;
    this._captureStarted && this.stopRrweb && (this.stopRrweb(), this.stopRrweb = void 0, this._captureStarted = false, null == n || n.removeEventListener("beforeunload", this._onBeforeUnload), null == n || n.removeEventListener("offline", this._onOffline), null == n || n.removeEventListener("online", this._onOnline), null == n || n.removeEventListener("visibilitychange", this._onVisibilityChange), this.clearBuffer(), clearInterval(this._fullSnapshotTimer), null === (e2 = this._removePageViewCaptureHook) || void 0 === e2 || e2.call(this), this._removePageViewCaptureHook = void 0, null === (t2 = this._removeEventTriggerCaptureHook) || void 0 === t2 || t2.call(this), this._removeEventTriggerCaptureHook = void 0, null === (i2 = this._onSessionIdListener) || void 0 === i2 || i2.call(this), this._onSessionIdListener = void 0, null === (s2 = this._samplingSessionListener) || void 0 === s2 || s2.call(this), this._samplingSessionListener = void 0, as.info("stopped"));
  }
  makeSamplingDecision(e2) {
    var t2, i2 = this.sessionId !== e2, s2 = this.sampleRate;
    if (D(s2)) {
      var r2 = this.isSampled, n2 = i2 || !q(r2), o2 = n2 ? ns(e2, s2) : r2;
      n2 && (o2 ? this._reportStarted("sampled") : as.warn("Sample rate (".concat(s2, ") has determined that this sessionId (").concat(e2, ") will not be sent to the server.")), this._tryAddCustomEvent("samplingDecisionMade", { sampleRate: s2, isSampled: o2 })), null === (t2 = this.instance.persistence) || void 0 === t2 || t2.register({ [Ee]: o2 });
    } else {
      var a2;
      null === (a2 = this.instance.persistence) || void 0 === a2 || a2.register({ [Ee]: null });
    }
  }
  onRemoteConfig(e2) {
    var t2, i2, s2, r2, n2, o2;
    (this._tryAddCustomEvent("$remote_config_received", e2), this._persistRemoteConfig(e2), this._linkedFlag = (null === (t2 = e2.sessionRecording) || void 0 === t2 ? void 0 : t2.linkedFlag) || null, null !== (i2 = e2.sessionRecording) && void 0 !== i2 && i2.endpoint) && (this._endpoint = null === (o2 = e2.sessionRecording) || void 0 === o2 ? void 0 : o2.endpoint);
    if (this._setupSampling(), !L(this._linkedFlag) && !this._linkedFlagSeen) {
      var a2 = A(this._linkedFlag) ? this._linkedFlag : this._linkedFlag.flag, l2 = A(this._linkedFlag) ? null : this._linkedFlag.variant;
      this.instance.onFeatureFlags((e3, t3) => {
        var i3 = R(t3) && a2 in t3, s3 = l2 ? t3[a2] === l2 : i3;
        s3 && this._reportStarted("linked_flag_matched", { linkedFlag: a2, linkedVariant: l2 }), this._linkedFlagSeen = s3;
      });
    }
    null !== (s2 = e2.sessionRecording) && void 0 !== s2 && s2.urlTriggers && (this._urlTriggers = e2.sessionRecording.urlTriggers), null !== (r2 = e2.sessionRecording) && void 0 !== r2 && r2.urlBlocklist && (this._urlBlocklist = e2.sessionRecording.urlBlocklist), null !== (n2 = e2.sessionRecording) && void 0 !== n2 && n2.eventTriggers && (this._eventTriggers = e2.sessionRecording.eventTriggers), this.receivedDecide = true, this.startIfEnabledOrStop();
  }
  _setupSampling() {
    D(this.sampleRate) && L(this._samplingSessionListener) && (this._samplingSessionListener = this.sessionManager.onSessionId((e2) => {
      this.makeSamplingDecision(e2);
    }));
  }
  _persistRemoteConfig(e2) {
    if (this.instance.persistence) {
      var i2, s2 = this.instance.persistence, r2 = () => {
        var i3, r3, n2, o2, a2, l2, c2, u2, d2, h2 = null === (i3 = e2.sessionRecording) || void 0 === i3 ? void 0 : i3.sampleRate, _2 = L(h2) ? null : parseFloat(h2), p2 = null === (r3 = e2.sessionRecording) || void 0 === r3 ? void 0 : r3.minimumDurationMilliseconds;
        s2.register({ [ge]: !!e2.sessionRecording, [ve]: null === (n2 = e2.sessionRecording) || void 0 === n2 ? void 0 : n2.consoleLogRecordingEnabled, [fe]: t({ capturePerformance: e2.capturePerformance }, null === (o2 = e2.sessionRecording) || void 0 === o2 ? void 0 : o2.networkPayloadCapture), [me]: null === (a2 = e2.sessionRecording) || void 0 === a2 ? void 0 : a2.masking, [be]: { enabled: null === (l2 = e2.sessionRecording) || void 0 === l2 ? void 0 : l2.recordCanvas, fps: null === (c2 = e2.sessionRecording) || void 0 === c2 ? void 0 : c2.canvasFps, quality: null === (u2 = e2.sessionRecording) || void 0 === u2 ? void 0 : u2.canvasQuality }, [ye]: _2, [we]: $(p2) ? null : p2, [Se]: null === (d2 = e2.sessionRecording) || void 0 === d2 ? void 0 : d2.scriptConfig });
      };
      r2(), null === (i2 = this._persistDecideOnSessionListener) || void 0 === i2 || i2.call(this), this._persistDecideOnSessionListener = this.sessionManager.onSessionId(r2);
    }
  }
  log(e2) {
    var t2, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "log";
    null === (t2 = this.instance.sessionRecording) || void 0 === t2 || t2.onRRwebEmit({ type: 6, data: { plugin: "rrweb/console@1", payload: { level: i2, trace: [], payload: [JSON.stringify(e2)] } }, timestamp: Date.now() });
  }
  _startCapture(e2) {
    if (!$(Object.assign) && !$(Array.from) && !(this._captureStarted || this.instance.config.disable_session_recording || this.instance.consent.isOptedOut())) {
      var t2, i2;
      if (this._captureStarted = true, this.sessionManager.checkAndGetSessionAndWindowId(), this.rrwebRecord)
        this._onScriptLoaded();
      else
        null === (t2 = f.__PosthogExtensions__) || void 0 === t2 || null === (i2 = t2.loadExternalDependency) || void 0 === i2 || i2.call(t2, this.instance, this.scriptName, (e3) => {
          if (e3)
            return as.error("could not load recorder", e3);
          this._onScriptLoaded();
        });
      as.info("starting"), "active" === this.status && this._reportStarted(e2 || "recording_initialized");
    }
  }
  get scriptName() {
    var e2, t2, i2;
    return (null === (e2 = this.instance) || void 0 === e2 || null === (t2 = e2.persistence) || void 0 === t2 || null === (i2 = t2.get_property(Se)) || void 0 === i2 ? void 0 : i2.script) || "recorder";
  }
  isInteractiveEvent(e2) {
    var t2;
    return 3 === e2.type && -1 !== cs.indexOf(null === (t2 = e2.data) || void 0 === t2 ? void 0 : t2.source);
  }
  _updateWindowAndSessionIds(e2) {
    var t2 = this.isInteractiveEvent(e2);
    t2 || this.isIdle || e2.timestamp - this._lastActivityTimestamp > this.sessionIdleThresholdMilliseconds && (this.isIdle = true, clearInterval(this._fullSnapshotTimer), this._tryAddCustomEvent("sessionIdle", { eventTimestamp: e2.timestamp, lastActivityTimestamp: this._lastActivityTimestamp, threshold: this.sessionIdleThresholdMilliseconds, bufferLength: this.buffer.data.length, bufferSize: this.buffer.size }), this._flushBuffer());
    var i2 = false;
    if (t2 && (this._lastActivityTimestamp = e2.timestamp, this.isIdle && (this.isIdle = false, this._tryAddCustomEvent("sessionNoLongerIdle", { reason: "user activity", type: e2.type }), i2 = true)), !this.isIdle) {
      var { windowId: s2, sessionId: r2 } = this.sessionManager.checkAndGetSessionAndWindowId(!t2, e2.timestamp), n2 = this.sessionId !== r2, o2 = this.windowId !== s2;
      this.windowId = s2, this.sessionId = r2, n2 || o2 ? (this.stopRecording(), this.startIfEnabledOrStop("session_id_changed")) : i2 && this._scheduleFullSnapshot();
    }
  }
  _tryRRWebMethod(e2) {
    try {
      return e2.rrwebMethod(), true;
    } catch (t2) {
      return this.queuedRRWebEvents.length < 10 ? this.queuedRRWebEvents.push({ enqueuedAt: e2.enqueuedAt || Date.now(), attempt: e2.attempt++, rrwebMethod: e2.rrwebMethod }) : as.warn("could not emit queued rrweb event.", t2, e2), false;
    }
  }
  _tryAddCustomEvent(e2, t2) {
    return this._tryRRWebMethod(us(() => this.rrwebRecord.addCustomEvent(e2, t2)));
  }
  _tryTakeFullSnapshot() {
    return this._tryRRWebMethod(us(() => this.rrwebRecord.takeFullSnapshot()));
  }
  _onScriptLoaded() {
    var e2, i2, s2, r2, n2 = { blockClass: "ph-no-capture", blockSelector: void 0, ignoreClass: "ph-ignore-input", maskTextClass: "ph-mask", maskTextSelector: void 0, maskTextFn: void 0, maskAllInputs: true, maskInputOptions: { password: true }, maskInputFn: void 0, slimDOMOptions: {}, collectFonts: false, inlineStylesheet: true, recordCrossOriginIframes: false }, o2 = this.instance.config.session_recording;
    for (var [a2, l2] of Object.entries(o2 || {}))
      a2 in n2 && ("maskInputOptions" === a2 ? n2.maskInputOptions = t({ password: true }, l2) : n2[a2] = l2);
    (this.canvasRecording && this.canvasRecording.enabled && (n2.recordCanvas = true, n2.sampling = { canvas: this.canvasRecording.fps }, n2.dataURLOptions = { type: "image/webp", quality: this.canvasRecording.quality }), this.masking) && (n2.maskAllInputs = null === (i2 = this.masking.maskAllInputs) || void 0 === i2 || i2, n2.maskTextSelector = null !== (s2 = this.masking.maskTextSelector) && void 0 !== s2 ? s2 : void 0, n2.blockSelector = null !== (r2 = this.masking.blockSelector) && void 0 !== r2 ? r2 : void 0);
    if (this.rrwebRecord) {
      this.mutationRateLimiter = null !== (e2 = this.mutationRateLimiter) && void 0 !== e2 ? e2 : new yi(this.rrwebRecord, { refillRate: this.instance.config.session_recording.__mutationRateLimiterRefillRate, bucketSize: this.instance.config.session_recording.__mutationRateLimiterBucketSize, onBlockedNode: (e3, t2) => {
        var i3 = "Too many mutations on node '".concat(e3, "'. Rate limiting. This could be due to SVG animations or something similar");
        as.info(i3, { node: t2 }), this.log(os + " " + i3, "warn");
      } });
      var c2 = this._gatherRRWebPlugins();
      this.stopRrweb = this.rrwebRecord(t({ emit: (e3) => {
        this.onRRwebEmit(e3);
      }, plugins: c2 }, n2)), this._lastActivityTimestamp = Date.now(), this.isIdle = false, this._tryAddCustomEvent("$session_options", { sessionRecordingOptions: n2, activePlugins: c2.map((e3) => null == e3 ? void 0 : e3.name) }), this._tryAddCustomEvent("$posthog_config", { config: this.instance.config });
    } else
      as.error("onScriptLoaded was called but rrwebRecord is not available. This indicates something has gone wrong.");
  }
  _scheduleFullSnapshot() {
    if (this._fullSnapshotTimer && clearInterval(this._fullSnapshotTimer), !this.isIdle) {
      var e2 = this.fullSnapshotIntervalMillis;
      e2 && (this._fullSnapshotTimer = setInterval(() => {
        this._tryTakeFullSnapshot();
      }, e2));
    }
  }
  _gatherRRWebPlugins() {
    var e2, t2, i2, s2, r2 = [], n2 = null === (e2 = f.__PosthogExtensions__) || void 0 === e2 || null === (t2 = e2.rrwebPlugins) || void 0 === t2 ? void 0 : t2.getRecordConsolePlugin;
    n2 && this.isConsoleLogCaptureEnabled && r2.push(n2());
    var o2 = null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.rrwebPlugins) || void 0 === s2 ? void 0 : s2.getRecordNetworkPlugin;
    this.networkPayloadCapture && F(o2) && (!bt.includes(location.hostname) || this._forceAllowLocalhostNetworkCapture ? r2.push(o2(mi(this.instance.config, this.networkPayloadCapture))) : as.info("NetworkCapture not started because we are on localhost."));
    return r2;
  }
  onRRwebEmit(e2) {
    var i2;
    if (this._processQueuedEvents(), e2 && R(e2)) {
      if (e2.type === li.Meta) {
        var s2 = this._maskUrl(e2.data.href);
        if (this._lastHref = s2, !s2)
          return;
        e2.data.href = s2;
      } else
        this._pageViewFallBack();
      if (this._checkUrlTriggerConditions(), !this._urlBlocked || function(e3) {
        return e3.type === li.Custom && "recording paused" === e3.data.tag;
      }(e2)) {
        e2.type === li.FullSnapshot && this._scheduleFullSnapshot(), e2.type === li.FullSnapshot && "trigger_pending" === this.triggerStatus && this.clearBuffer();
        var r2 = this.mutationRateLimiter ? this.mutationRateLimiter.throttleMutations(e2) : e2;
        if (r2) {
          var n2 = function(e3) {
            var t2 = e3;
            if (t2 && R(t2) && 6 === t2.type && R(t2.data) && "rrweb/console@1" === t2.data.plugin) {
              t2.data.payload.payload.length > 10 && (t2.data.payload.payload = t2.data.payload.payload.slice(0, 10), t2.data.payload.payload.push("...[truncated]"));
              for (var i3 = [], s3 = 0; s3 < t2.data.payload.payload.length; s3++)
                t2.data.payload.payload[s3] && t2.data.payload.payload[s3].length > 2e3 ? i3.push(t2.data.payload.payload[s3].slice(0, 2e3) + "...[truncated]") : i3.push(t2.data.payload.payload[s3]);
              return t2.data.payload.payload = i3, e3;
            }
            return e3;
          }(r2);
          if (this._updateWindowAndSessionIds(n2), !this.isIdle || hs(n2)) {
            if (hs(n2)) {
              var o2 = n2.data.payload;
              if (o2) {
                var a2 = o2.lastActivityTimestamp, l2 = o2.threshold;
                n2.timestamp = a2 + l2;
              }
            }
            var c2 = null === (i2 = this.instance.config.session_recording.compress_events) || void 0 === i2 || i2 ? function(e3) {
              if (oi(e3) < 1024)
                return e3;
              try {
                if (e3.type === li.FullSnapshot)
                  return t(t({}, e3), {}, { data: ds(e3.data), cv: "2024-10" });
                if (e3.type === li.IncrementalSnapshot && e3.data.source === ci.Mutation)
                  return t(t({}, e3), {}, { cv: "2024-10", data: t(t({}, e3.data), {}, { texts: ds(e3.data.texts), attributes: ds(e3.data.attributes), removes: ds(e3.data.removes), adds: ds(e3.data.adds) }) });
                if (e3.type === li.IncrementalSnapshot && e3.data.source === ci.StyleSheetRule)
                  return t(t({}, e3), {}, { cv: "2024-10", data: t(t({}, e3.data), {}, { adds: e3.data.adds ? ds(e3.data.adds) : void 0, removes: e3.data.removes ? ds(e3.data.removes) : void 0 }) });
              } catch (e4) {
                as.error("could not compress event - will use uncompressed event", e4);
              }
              return e3;
            }(n2) : n2, u2 = { $snapshot_bytes: oi(c2), $snapshot_data: c2, $session_id: this.sessionId, $window_id: this.windowId };
            "disabled" !== this.status ? this._captureSnapshotBuffered(u2) : this.clearBuffer();
          }
        }
      }
    }
  }
  _pageViewFallBack() {
    if (!this.instance.config.capture_pageview && n) {
      var e2 = this._maskUrl(n.location.href);
      this._lastHref !== e2 && (this._tryAddCustomEvent("$url_changed", { href: e2 }), this._lastHref = e2);
    }
  }
  _processQueuedEvents() {
    if (this.queuedRRWebEvents.length) {
      var e2 = [...this.queuedRRWebEvents];
      this.queuedRRWebEvents = [], e2.forEach((e3) => {
        Date.now() - e3.enqueuedAt <= 2e3 && this._tryRRWebMethod(e3);
      });
    }
  }
  _maskUrl(e2) {
    var t2 = this.instance.config.session_recording;
    if (t2.maskNetworkRequestFn) {
      var i2, s2 = { url: e2 };
      return null === (i2 = s2 = t2.maskNetworkRequestFn(s2)) || void 0 === i2 ? void 0 : i2.url;
    }
    return e2;
  }
  clearBuffer() {
    return this.buffer = { size: 0, data: [], sessionId: this.sessionId, windowId: this.windowId }, this.buffer;
  }
  _flushBuffer() {
    this.flushBufferTimer && (clearTimeout(this.flushBufferTimer), this.flushBufferTimer = void 0);
    var e2 = this.minimumDuration, t2 = this.sessionDuration, i2 = D(t2) && t2 >= 0, s2 = D(e2) && i2 && t2 < e2;
    if ("buffering" === this.status || "paused" === this.status || "disabled" === this.status || s2)
      return this.flushBufferTimer = setTimeout(() => {
        this._flushBuffer();
      }, 2e3), this.buffer;
    this.buffer.data.length > 0 && ai(this.buffer).forEach((e3) => {
      this._captureSnapshot({ $snapshot_bytes: e3.size, $snapshot_data: e3.data, $session_id: e3.sessionId, $window_id: e3.windowId, $lib: "web", $lib_version: U.LIB_VERSION });
    });
    return this.clearBuffer();
  }
  _captureSnapshotBuffered(e2) {
    var t2, i2 = 2 + ((null === (t2 = this.buffer) || void 0 === t2 ? void 0 : t2.data.length) || 0);
    !this.isIdle && (this.buffer.size + e2.$snapshot_bytes + i2 > 943718.4 || this.buffer.sessionId !== this.sessionId) && (this.buffer = this._flushBuffer()), this.buffer.size += e2.$snapshot_bytes, this.buffer.data.push(e2.$snapshot_data), this.flushBufferTimer || this.isIdle || (this.flushBufferTimer = setTimeout(() => {
      this._flushBuffer();
    }, 2e3));
  }
  _captureSnapshot(e2) {
    this.instance.capture("$snapshot", e2, { _url: this.instance.requestRouter.endpointFor("api", this._endpoint), _noTruncate: true, _batchKey: "recordings", skip_client_rate_limiting: true });
  }
  _checkUrlTriggerConditions() {
    if (void 0 !== n && n.location.href) {
      var e2 = n.location.href, t2 = this._urlBlocked, i2 = _s(e2, this._urlBlocklist);
      i2 && !t2 ? this._pauseRecording() : !i2 && t2 && this._resumeRecording(), _s(e2, this._urlTriggers) && this._activateTrigger("url");
    }
  }
  _activateTrigger(e2) {
    var t2, i2;
    "trigger_pending" === this.triggerStatus && (null === (t2 = this.instance) || void 0 === t2 || null === (i2 = t2.persistence) || void 0 === i2 || i2.register({ ["url" === e2 ? xe : Ie]: this.sessionId }), this._flushBuffer(), this._reportStarted(e2 + "_trigger_matched"));
  }
  _pauseRecording() {
    this._urlBlocked || (this._urlBlocked = true, clearInterval(this._fullSnapshotTimer), as.info("recording paused due to URL blocker"), this._tryAddCustomEvent("recording paused", { reason: "url blocker" }));
  }
  _resumeRecording() {
    this._urlBlocked && (this._urlBlocked = false, this._tryTakeFullSnapshot(), this._scheduleFullSnapshot(), this._tryAddCustomEvent("recording resumed", { reason: "left blocked url" }), as.info("recording resumed"));
  }
  _addEventTriggerListener() {
    0 !== this._eventTriggers.length && L(this._removeEventTriggerCaptureHook) && (this._removeEventTriggerCaptureHook = this.instance.on("eventCaptured", (e2) => {
      try {
        this._eventTriggers.includes(e2.event) && this._activateTrigger("event");
      } catch (e3) {
        as.error("Could not activate event trigger", e3);
      }
    }));
  }
  overrideLinkedFlag() {
    this._linkedFlagSeen = true, this._tryTakeFullSnapshot(), this._reportStarted("linked_flag_overridden");
  }
  overrideSampling() {
    var e2;
    null === (e2 = this.instance.persistence) || void 0 === e2 || e2.register({ [Ee]: true }), this._tryTakeFullSnapshot(), this._reportStarted("sampling_overridden");
  }
  overrideTrigger(e2) {
    this._activateTrigger(e2);
  }
  _reportStarted(e2, t2) {
    this.instance.register_for_session({ $session_recording_start_reason: e2 }), as.info(e2.replace("_", " "), t2), w(["recording_initialized", "session_id_changed"], e2) || this._tryAddCustomEvent(e2, t2);
  }
}
var gs = W("[SegmentIntegration]");
function vs(e2, t2) {
  var i2 = e2.config.segment;
  if (!i2)
    return t2();
  !function(e3, t3) {
    var i3 = e3.config.segment;
    if (!i3)
      return t3();
    var s2 = (i4) => {
      var s3 = () => i4.anonymousId() || Dt();
      e3.config.get_device_id = s3, i4.id() && (e3.register({ distinct_id: i4.id(), $device_id: s3() }), e3.persistence.set_property(Oe, "identified")), t3();
    }, r2 = i3.user();
    "then" in r2 && F(r2.then) ? r2.then((e4) => s2(e4)) : s2(r2);
  }(e2, () => {
    i2.register(((e3) => {
      Promise && Promise.resolve || gs.warn("This browser does not have Promise support, and can not use the segment integration");
      var t3 = (t4, i3) => {
        var s2;
        if (!i3)
          return t4;
        t4.event.userId || t4.event.anonymousId === e3.get_distinct_id() || (gs.info("No userId set, resetting PostHog"), e3.reset()), t4.event.userId && t4.event.userId !== e3.get_distinct_id() && (gs.info("UserId set, identifying with PostHog"), e3.identify(t4.event.userId));
        var r2 = e3._calculate_event_properties(i3, null !== (s2 = t4.event.properties) && void 0 !== s2 ? s2 : {}, new Date());
        return t4.event.properties = Object.assign({}, r2, t4.event.properties), t4;
      };
      return { name: "PostHog JS", type: "enrichment", version: "1.0.0", isLoaded: () => true, load: () => Promise.resolve(), track: (e4) => t3(e4, e4.event.event), page: (e4) => t3(e4, "$pageview"), identify: (e4) => t3(e4, "$identify"), screen: (e4) => t3(e4, "$screen") };
    })(e2)).then(() => {
      t2();
    });
  });
}
var fs = "posthog-js";
function ms(e2) {
  var { organization: i2, projectId: s2, prefix: r2, severityAllowList: n2 = ["error"] } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return (o2) => {
    var a2, l2, c2, u2, d2;
    if (!("*" === n2 || n2.includes(o2.level)) || !e2.__loaded)
      return o2;
    o2.tags || (o2.tags = {});
    var h2 = e2.requestRouter.endpointFor("ui", "/project/".concat(e2.config.token, "/person/").concat(e2.get_distinct_id()));
    o2.tags["PostHog Person URL"] = h2, e2.sessionRecordingStarted() && (o2.tags["PostHog Recording URL"] = e2.get_session_replay_url({ withTimestamp: true }));
    var _2 = (null === (a2 = o2.exception) || void 0 === a2 ? void 0 : a2.values) || [], p2 = _2.map((e3) => t(t({}, e3), {}, { stacktrace: e3.stacktrace ? t(t({}, e3.stacktrace), {}, { type: "raw", frames: (e3.stacktrace.frames || []).map((e4) => t(t({}, e4), {}, { platform: "web:javascript" })) }) : void 0 })), g2 = { $exception_message: (null === (l2 = _2[0]) || void 0 === l2 ? void 0 : l2.value) || o2.message, $exception_type: null === (c2 = _2[0]) || void 0 === c2 ? void 0 : c2.type, $exception_personURL: h2, $exception_level: o2.level, $exception_list: p2, $sentry_event_id: o2.event_id, $sentry_exception: o2.exception, $sentry_exception_message: (null === (u2 = _2[0]) || void 0 === u2 ? void 0 : u2.value) || o2.message, $sentry_exception_type: null === (d2 = _2[0]) || void 0 === d2 ? void 0 : d2.type, $sentry_tags: o2.tags };
    return i2 && s2 && (g2.$sentry_url = (r2 || "https://sentry.io/organizations/") + i2 + "/issues/?project=" + s2 + "&query=" + o2.event_id), e2.exceptions.sendExceptionEvent(g2), o2;
  };
}
class bs {
  constructor(e2, t2, i2, s2, r2) {
    this.name = fs, this.setupOnce = function(n2) {
      n2(ms(e2, { organization: t2, projectId: i2, prefix: s2, severityAllowList: r2 }));
    };
  }
}
var ys, ws = null != n && n.location ? Et(n.location.hash, "__posthog") || Et(location.hash, "state") : null, Ss = "_postHogToolbarParams", ks = W("[Toolbar]");
!function(e2) {
  e2[e2.UNINITIALIZED = 0] = "UNINITIALIZED", e2[e2.LOADING = 1] = "LOADING", e2[e2.LOADED = 2] = "LOADED";
}(ys || (ys = {}));
class Es {
  constructor(e2) {
    this.instance = e2;
  }
  setToolbarState(e2) {
    f.ph_toolbar_state = e2;
  }
  getToolbarState() {
    var e2;
    return null !== (e2 = f.ph_toolbar_state) && void 0 !== e2 ? e2 : ys.UNINITIALIZED;
  }
  maybeLoadToolbar() {
    var e2, t2, i2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
    if (!n || !d)
      return false;
    i2 = null !== (e2 = i2) && void 0 !== e2 ? e2 : n.location, r2 = null !== (t2 = r2) && void 0 !== t2 ? t2 : n.history;
    try {
      if (!s2) {
        try {
          n.localStorage.setItem("test", "test"), n.localStorage.removeItem("test");
        } catch (e3) {
          return false;
        }
        s2 = null == n ? void 0 : n.localStorage;
      }
      var o2, a2 = ws || Et(i2.hash, "__posthog") || Et(i2.hash, "state"), l2 = a2 ? Q(() => JSON.parse(atob(decodeURIComponent(a2)))) || Q(() => JSON.parse(decodeURIComponent(a2))) : null;
      return l2 && "ph_authorize" === l2.action ? ((o2 = l2).source = "url", o2 && Object.keys(o2).length > 0 && (l2.desiredHash ? i2.hash = l2.desiredHash : r2 ? r2.replaceState(r2.state, "", i2.pathname + i2.search) : i2.hash = "")) : ((o2 = JSON.parse(s2.getItem(Ss) || "{}")).source = "localstorage", delete o2.userIntent), !(!o2.token || this.instance.config.token !== o2.token) && (this.loadToolbar(o2), true);
    } catch (e3) {
      return false;
    }
  }
  _callLoadToolbar(e2) {
    var t2 = f.ph_load_toolbar || f.ph_load_editor;
    !L(t2) && F(t2) ? t2(e2, this.instance) : ks.warn("No toolbar load function found");
  }
  loadToolbar(e2) {
    var i2 = !(null == d || !d.getElementById(He));
    if (!n || i2)
      return false;
    var s2 = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, r2 = t(t({ token: this.instance.config.token }, e2), {}, { apiURL: this.instance.requestRouter.endpointFor("ui") }, s2 ? { instrument: false } : {});
    if (n.localStorage.setItem(Ss, JSON.stringify(t(t({}, r2), {}, { source: void 0 }))), this.getToolbarState() === ys.LOADED)
      this._callLoadToolbar(r2);
    else if (this.getToolbarState() === ys.UNINITIALIZED) {
      var o2, a2;
      this.setToolbarState(ys.LOADING), null === (o2 = f.__PosthogExtensions__) || void 0 === o2 || null === (a2 = o2.loadExternalDependency) || void 0 === a2 || a2.call(o2, this.instance, "toolbar", (e3) => {
        if (e3)
          return ks.error("[Toolbar] Failed to load", e3), void this.setToolbarState(ys.UNINITIALIZED);
        this.setToolbarState(ys.LOADED), this._callLoadToolbar(r2);
      }), ne(n, "turbolinks:load", () => {
        this.setToolbarState(ys.UNINITIALIZED), this.loadToolbar(r2);
      });
    }
    return true;
  }
  _loadEditor(e2) {
    return this.loadToolbar(e2);
  }
  maybeLoadEditor() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
    return this.maybeLoadToolbar(e2, t2, i2);
  }
}
var xs = W("[TracingHeaders]");
class Is {
  constructor(e2) {
    i(this, "_restoreXHRPatch", void 0), i(this, "_restoreFetchPatch", void 0), i(this, "_startCapturing", () => {
      var e3, t2, i2, s2;
      $(this._restoreXHRPatch) && (null === (e3 = f.__PosthogExtensions__) || void 0 === e3 || null === (t2 = e3.tracingHeadersPatchFns) || void 0 === t2 || t2._patchXHR(this.instance.sessionManager));
      $(this._restoreFetchPatch) && (null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.tracingHeadersPatchFns) || void 0 === s2 || s2._patchFetch(this.instance.sessionManager));
    }), this.instance = e2;
  }
  _loadScript(e2) {
    var t2, i2, s2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.tracingHeadersPatchFns && e2(), null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this.instance, "tracing-headers", (t3) => {
      if (t3)
        return xs.error("failed to load script", t3);
      e2();
    });
  }
  startIfEnabledOrStop() {
    var e2, t2;
    this.instance.config.__add_tracing_headers ? this._loadScript(this._startCapturing) : (null === (e2 = this._restoreXHRPatch) || void 0 === e2 || e2.call(this), null === (t2 = this._restoreFetchPatch) || void 0 === t2 || t2.call(this), this._restoreXHRPatch = void 0, this._restoreFetchPatch = void 0);
  }
}
var Ps = W("[Web Vitals]"), Cs = 9e5;
class Fs {
  constructor(e2) {
    var s2;
    i(this, "_enabledServerSide", false), i(this, "_initialized", false), i(this, "buffer", { url: void 0, metrics: [], firstMetricTimestamp: void 0 }), i(this, "_flushToCapture", () => {
      clearTimeout(this._delayedFlushTimer), 0 !== this.buffer.metrics.length && (this.instance.capture("$web_vitals", this.buffer.metrics.reduce((e3, i2) => t(t({}, e3), {}, { ["$web_vitals_".concat(i2.name, "_event")]: t({}, i2), ["$web_vitals_".concat(i2.name, "_value")]: i2.value }), {})), this.buffer = { url: void 0, metrics: [], firstMetricTimestamp: void 0 });
    }), i(this, "_addToBuffer", (e3) => {
      var i2, s3 = null === (i2 = this.instance.sessionManager) || void 0 === i2 ? void 0 : i2.checkAndGetSessionAndWindowId(true);
      if ($(s3))
        Ps.error("Could not read session ID. Dropping metrics!");
      else {
        this.buffer = this.buffer || { url: void 0, metrics: [], firstMetricTimestamp: void 0 };
        var r2 = this._currentURL();
        if (!$(r2))
          if (L(null == e3 ? void 0 : e3.name) || L(null == e3 ? void 0 : e3.value))
            Ps.error("Invalid metric received", e3);
          else if (this._maxAllowedValue && e3.value >= this._maxAllowedValue)
            Ps.error("Ignoring metric with value >= " + this._maxAllowedValue, e3);
          else
            this.buffer.url !== r2 && (this._flushToCapture(), this._delayedFlushTimer = setTimeout(this._flushToCapture, this.flushToCaptureTimeoutMs)), $(this.buffer.url) && (this.buffer.url = r2), this.buffer.firstMetricTimestamp = $(this.buffer.firstMetricTimestamp) ? Date.now() : this.buffer.firstMetricTimestamp, e3.attribution && e3.attribution.interactionTargetElement && (e3.attribution.interactionTargetElement = void 0), this.buffer.metrics.push(t(t({}, e3), {}, { $current_url: r2, $session_id: s3.sessionId, $window_id: s3.windowId, timestamp: Date.now() })), this.buffer.metrics.length === this.allowedMetrics.length && this._flushToCapture();
      }
    }), i(this, "_startCapturing", () => {
      var e3, t2, i2, s3, r2 = f.__PosthogExtensions__;
      $(r2) || $(r2.postHogWebVitalsCallbacks) || ({ onLCP: e3, onCLS: t2, onFCP: i2, onINP: s3 } = r2.postHogWebVitalsCallbacks), e3 && t2 && i2 && s3 ? (this.allowedMetrics.indexOf("LCP") > -1 && e3(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("CLS") > -1 && t2(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("FCP") > -1 && i2(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("INP") > -1 && s3(this._addToBuffer.bind(this)), this._initialized = true) : Ps.error("web vitals callbacks not loaded - not starting");
    }), this.instance = e2, this._enabledServerSide = !(null === (s2 = this.instance.persistence) || void 0 === s2 || !s2.props[he]), this.startIfEnabled();
  }
  get allowedMetrics() {
    var e2, t2, i2 = R(this.instance.config.capture_performance) ? null === (e2 = this.instance.config.capture_performance) || void 0 === e2 ? void 0 : e2.web_vitals_allowed_metrics : void 0;
    return $(i2) ? (null === (t2 = this.instance.persistence) || void 0 === t2 ? void 0 : t2.props[pe]) || ["CLS", "FCP", "INP", "LCP"] : i2;
  }
  get flushToCaptureTimeoutMs() {
    return (R(this.instance.config.capture_performance) ? this.instance.config.capture_performance.web_vitals_delayed_flush_ms : void 0) || 5e3;
  }
  get _maxAllowedValue() {
    var e2 = R(this.instance.config.capture_performance) && D(this.instance.config.capture_performance.__web_vitals_max_value) ? this.instance.config.capture_performance.__web_vitals_max_value : Cs;
    return 0 < e2 && e2 <= 6e4 ? Cs : e2;
  }
  get isEnabled() {
    var e2 = R(this.instance.config.capture_performance) ? this.instance.config.capture_performance.web_vitals : void 0;
    return q(e2) ? e2 : this._enabledServerSide;
  }
  startIfEnabled() {
    this.isEnabled && !this._initialized && (Ps.info("enabled, starting..."), this.loadScript(this._startCapturing));
  }
  onRemoteConfig(e2) {
    var t2 = R(e2.capturePerformance) && !!e2.capturePerformance.web_vitals, i2 = R(e2.capturePerformance) ? e2.capturePerformance.web_vitals_allowed_metrics : void 0;
    this.instance.persistence && (this.instance.persistence.register({ [he]: t2 }), this.instance.persistence.register({ [pe]: i2 })), this._enabledServerSide = t2, this.startIfEnabled();
  }
  loadScript(e2) {
    var t2, i2, s2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.postHogWebVitalsCallbacks && e2(), null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this.instance, "web-vitals", (t3) => {
      t3 ? Ps.error("failed to load script", t3) : e2();
    });
  }
  _currentURL() {
    var e2 = n ? n.location.href : void 0;
    return e2 || Ps.error("Could not determine current URL"), e2;
  }
}
var Rs = W("[Heatmaps]");
function Ts(e2) {
  return R(e2) && "clientX" in e2 && "clientY" in e2 && D(e2.clientX) && D(e2.clientY);
}
class $s {
  constructor(e2) {
    var t2;
    i(this, "rageclicks", new mt()), i(this, "_enabledServerSide", false), i(this, "_initialized", false), i(this, "_flushInterval", null), this.instance = e2, this._enabledServerSide = !(null === (t2 = this.instance.persistence) || void 0 === t2 || !t2.props[ue]);
  }
  get flushIntervalMilliseconds() {
    var e2 = 5e3;
    return R(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (e2 = this.instance.config.capture_heatmaps.flush_interval_milliseconds), e2;
  }
  get isEnabled() {
    return $(this.instance.config.capture_heatmaps) ? $(this.instance.config.enable_heatmaps) ? this._enabledServerSide : this.instance.config.enable_heatmaps : false !== this.instance.config.capture_heatmaps;
  }
  startIfEnabled() {
    if (this.isEnabled) {
      if (this._initialized)
        return;
      Rs.info("starting..."), this._setupListeners(), this._flushInterval = setInterval(this.flush.bind(this), this.flushIntervalMilliseconds);
    } else {
      var e2, t2;
      clearInterval(null !== (e2 = this._flushInterval) && void 0 !== e2 ? e2 : void 0), null === (t2 = this.deadClicksCapture) || void 0 === t2 || t2.stop(), this.getAndClearBuffer();
    }
  }
  onRemoteConfig(e2) {
    var t2 = !!e2.heatmaps;
    this.instance.persistence && this.instance.persistence.register({ [ue]: t2 }), this._enabledServerSide = t2, this.startIfEnabled();
  }
  getAndClearBuffer() {
    var e2 = this.buffer;
    return this.buffer = void 0, e2;
  }
  _onDeadClick(e2) {
    this._onClick(e2.originalEvent, "deadclick");
  }
  _setupListeners() {
    n && d && (ne(n, "beforeunload", this.flush.bind(this)), ne(d, "click", (e2) => this._onClick(e2 || (null == n ? void 0 : n.event)), { capture: true }), ne(d, "mousemove", (e2) => this._onMouseMove(e2 || (null == n ? void 0 : n.event)), { capture: true }), this.deadClicksCapture = new si(this.instance, ti, this._onDeadClick.bind(this)), this.deadClicksCapture.startIfEnabled(), this._initialized = true);
  }
  _getProperties(e2, t2) {
    var i2 = this.instance.scrollManager.scrollY(), s2 = this.instance.scrollManager.scrollX(), r2 = this.instance.scrollManager.scrollElement(), o2 = function(e3, t3, i3) {
      for (var s3 = e3; s3 && We(s3) && !Ve(s3, "body"); ) {
        if (s3 === i3)
          return false;
        if (w(t3, null == n ? void 0 : n.getComputedStyle(s3).position))
          return true;
        s3 = it(s3);
      }
      return false;
    }(et(e2), ["fixed", "sticky"], r2);
    return { x: e2.clientX + (o2 ? 0 : s2), y: e2.clientY + (o2 ? 0 : i2), target_fixed: o2, type: t2 };
  }
  _onClick(e2) {
    var i2, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "click";
    if (!je(e2.target) && Ts(e2)) {
      var r2 = this._getProperties(e2, s2);
      null !== (i2 = this.rageclicks) && void 0 !== i2 && i2.isRageClick(e2.clientX, e2.clientY, new Date().getTime()) && this._capture(t(t({}, r2), {}, { type: "rageclick" })), this._capture(r2);
    }
  }
  _onMouseMove(e2) {
    !je(e2.target) && Ts(e2) && (clearTimeout(this._mouseMoveTimeout), this._mouseMoveTimeout = setTimeout(() => {
      this._capture(this._getProperties(e2, "mousemove"));
    }, 500));
  }
  _capture(e2) {
    if (n) {
      var t2 = n.location.href;
      this.buffer = this.buffer || {}, this.buffer[t2] || (this.buffer[t2] = []), this.buffer[t2].push(e2);
    }
  }
  flush() {
    this.buffer && !T(this.buffer) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
  }
}
class As {
  constructor(e2) {
    this._instance = e2;
  }
  doPageView(e2, t2) {
    var i2, s2 = this._previousPageViewProperties(e2, t2);
    return this._currentPageview = { pathname: null !== (i2 = null == n ? void 0 : n.location.pathname) && void 0 !== i2 ? i2 : "", pageViewId: t2, timestamp: e2 }, this._instance.scrollManager.resetContext(), s2;
  }
  doPageLeave(e2) {
    var t2;
    return this._previousPageViewProperties(e2, null === (t2 = this._currentPageview) || void 0 === t2 ? void 0 : t2.pageViewId);
  }
  doEvent() {
    var e2;
    return { $pageview_id: null === (e2 = this._currentPageview) || void 0 === e2 ? void 0 : e2.pageViewId };
  }
  _previousPageViewProperties(e2, t2) {
    var i2 = this._currentPageview;
    if (!i2)
      return { $pageview_id: t2 };
    var s2 = { $pageview_id: t2, $prev_pageview_id: i2.pageViewId }, r2 = this._instance.scrollManager.getContext();
    if (r2 && !this._instance.config.disable_scroll_properties) {
      var { maxScrollHeight: n2, lastScrollY: o2, maxScrollY: a2, maxContentHeight: l2, lastContentY: c2, maxContentY: u2 } = r2;
      if (!($(n2) || $(o2) || $(a2) || $(l2) || $(c2) || $(u2))) {
        n2 = Math.ceil(n2), o2 = Math.ceil(o2), a2 = Math.ceil(a2), l2 = Math.ceil(l2), c2 = Math.ceil(c2), u2 = Math.ceil(u2);
        var d2 = n2 <= 1 ? 1 : bi(o2 / n2, 0, 1), h2 = n2 <= 1 ? 1 : bi(a2 / n2, 0, 1), _2 = l2 <= 1 ? 1 : bi(c2 / l2, 0, 1), p2 = l2 <= 1 ? 1 : bi(u2 / l2, 0, 1);
        s2 = Y(s2, { $prev_pageview_last_scroll: o2, $prev_pageview_last_scroll_percentage: d2, $prev_pageview_max_scroll: a2, $prev_pageview_max_scroll_percentage: h2, $prev_pageview_last_content: c2, $prev_pageview_last_content_percentage: _2, $prev_pageview_max_content: u2, $prev_pageview_max_content_percentage: p2 });
      }
    }
    return i2.pathname && (s2.$prev_pageview_pathname = i2.pathname), i2.timestamp && (s2.$prev_pageview_duration = (e2.getTime() - i2.timestamp.getTime()) / 1e3), s2;
  }
}
class Os {
  constructor(e2) {
    this.instance = e2;
  }
  sendExceptionEvent(e2) {
    this.instance.capture("$exception", e2, { _noTruncate: true, _batchKey: "exceptionEvent" });
  }
}
var Ms, Ls = W("[FeatureFlags]"), Ds = "$active_feature_flags", qs = "$override_feature_flags", Ns = "$feature_flag_payloads", Bs = "$override_feature_flag_payloads", Hs = "$feature_flag_request_id", Us = (e2) => {
  var t2 = {};
  for (var [i2, s2] of X(e2 || {}))
    s2 && (t2[i2] = s2);
  return t2;
};
!function(e2) {
  e2.FeatureFlags = "feature_flags", e2.Recordings = "recordings";
}(Ms || (Ms = {}));
class zs {
  constructor(e2) {
    i(this, "_override_warning", false), i(this, "_hasLoadedFlags", false), i(this, "_requestInFlight", false), i(this, "_reloadingDisabled", false), i(this, "_additionalReloadRequested", false), i(this, "_decideCalled", false), i(this, "_flagsLoadedFromRemote", false), this.instance = e2, this.featureFlagEventHandlers = [];
  }
  decide() {
    if (this.instance.config.__preview_remote_config)
      this._decideCalled = true;
    else {
      var e2 = !this._reloadDebouncer && (this.instance.config.advanced_disable_feature_flags || this.instance.config.advanced_disable_feature_flags_on_first_load);
      this._callDecideEndpoint({ disableFlags: e2 });
    }
  }
  get hasLoadedFlags() {
    return this._hasLoadedFlags;
  }
  getFlags() {
    return Object.keys(this.getFlagVariants());
  }
  getFlagVariants() {
    var e2 = this.instance.get_property(Pe), t2 = this.instance.get_property(qs);
    if (!t2)
      return e2 || {};
    for (var i2 = Y({}, e2), s2 = Object.keys(t2), r2 = 0; r2 < s2.length; r2++)
      i2[s2[r2]] = t2[s2[r2]];
    return this._override_warning || (Ls.warn(" Overriding feature flags!", { enabledFlags: e2, overriddenFlags: t2, finalFlags: i2 }), this._override_warning = true), i2;
  }
  getFlagPayloads() {
    var e2 = this.instance.get_property(Ns), t2 = this.instance.get_property(Bs);
    if (!t2)
      return e2 || {};
    for (var i2 = Y({}, e2 || {}), s2 = Object.keys(t2), r2 = 0; r2 < s2.length; r2++)
      i2[s2[r2]] = t2[s2[r2]];
    return this._override_warning || (Ls.warn(" Overriding feature flag payloads!", { flagPayloads: e2, overriddenPayloads: t2, finalPayloads: i2 }), this._override_warning = true), i2;
  }
  reloadFeatureFlags() {
    this._reloadingDisabled || this.instance.config.advanced_disable_feature_flags || this._reloadDebouncer || (this._reloadDebouncer = setTimeout(() => {
      this._callDecideEndpoint();
    }, 5));
  }
  clearDebouncer() {
    clearTimeout(this._reloadDebouncer), this._reloadDebouncer = void 0;
  }
  ensureFlagsLoaded() {
    this._hasLoadedFlags || this._requestInFlight || this._reloadDebouncer || this.reloadFeatureFlags();
  }
  setAnonymousDistinctId(e2) {
    this.$anon_distinct_id = e2;
  }
  setReloadingPaused(e2) {
    this._reloadingDisabled = e2;
  }
  _callDecideEndpoint(e2) {
    var i2;
    if (this.clearDebouncer(), !this.instance.config.advanced_disable_decide)
      if (this._requestInFlight)
        this._additionalReloadRequested = true;
      else {
        var s2 = { token: this.instance.config.token, distinct_id: this.instance.get_distinct_id(), groups: this.instance.getGroups(), $anon_distinct_id: this.$anon_distinct_id, person_properties: t(t({}, (null === (i2 = this.instance.persistence) || void 0 === i2 ? void 0 : i2.get_initial_props()) || {}), this.instance.get_property(Fe) || {}), group_properties: this.instance.get_property(Re) };
        (null != e2 && e2.disableFlags || this.instance.config.advanced_disable_feature_flags) && (s2.disable_flags = true), this._requestInFlight = true, this.instance._send_request({ method: "POST", url: this.instance.requestRouter.endpointFor("api", "/decide/?v=3"), data: s2, compression: this.instance.config.disable_compression ? void 0 : r.Base64, timeout: this.instance.config.feature_flag_request_timeout_ms, callback: (e3) => {
          var t2, i3, r2, n2 = true;
          (200 === e3.statusCode && (this._additionalReloadRequested || (this.$anon_distinct_id = void 0), n2 = false), this._requestInFlight = false, this._decideCalled) || (this._decideCalled = true, this.instance._onRemoteConfig(null !== (r2 = e3.json) && void 0 !== r2 ? r2 : {}));
          s2.disable_flags && !this._additionalReloadRequested || (this._flagsLoadedFromRemote = !n2, e3.json && null !== (t2 = e3.json.quotaLimited) && void 0 !== t2 && t2.includes(Ms.FeatureFlags) ? Ls.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.") : (this.receivedFeatureFlags(null !== (i3 = e3.json) && void 0 !== i3 ? i3 : {}, n2), this._additionalReloadRequested && (this._additionalReloadRequested = false, this._callDecideEndpoint())));
        } });
      }
  }
  getFeatureFlag(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0) {
      var i2, s2, r2, n2, o2, a2 = this.getFlagVariants()[e2], l2 = "".concat(a2), c2 = this.instance.get_property(Hs) || void 0, u2 = this.instance.get_property(Ae) || {};
      if (t2.send_event || !("send_event" in t2)) {
        if (!(e2 in u2) || !u2[e2].includes(l2))
          C(u2[e2]) ? u2[e2].push(l2) : u2[e2] = [l2], null === (i2 = this.instance.persistence) || void 0 === i2 || i2.register({ [Ae]: u2 }), this.instance.capture("$feature_flag_called", { $feature_flag: e2, $feature_flag_response: a2, $feature_flag_payload: this.getFeatureFlagPayload(e2) || null, $feature_flag_request_id: c2, $feature_flag_bootstrapped_response: (null === (s2 = this.instance.config.bootstrap) || void 0 === s2 || null === (r2 = s2.featureFlags) || void 0 === r2 ? void 0 : r2[e2]) || null, $feature_flag_bootstrapped_payload: (null === (n2 = this.instance.config.bootstrap) || void 0 === n2 || null === (o2 = n2.featureFlagPayloads) || void 0 === o2 ? void 0 : o2[e2]) || null, $used_bootstrap_value: !this._flagsLoadedFromRemote });
      }
      return a2;
    }
    Ls.warn('getFeatureFlag for key "' + e2 + `" failed. Feature flags didn't load in time.`);
  }
  getFeatureFlagPayload(e2) {
    return this.getFlagPayloads()[e2];
  }
  getRemoteConfigPayload(e2, t2) {
    var i2 = this.instance.config.token;
    this.instance._send_request({ method: "POST", url: this.instance.requestRouter.endpointFor("api", "/decide/?v=3"), data: { distinct_id: this.instance.get_distinct_id(), token: i2 }, compression: this.instance.config.disable_compression ? void 0 : r.Base64, timeout: this.instance.config.feature_flag_request_timeout_ms, callback: (i3) => {
      var s2, r2 = null === (s2 = i3.json) || void 0 === s2 ? void 0 : s2.featureFlagPayloads;
      t2((null == r2 ? void 0 : r2[e2]) || void 0);
    } });
  }
  isFeatureEnabled(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0)
      return !!this.getFeatureFlag(e2, t2);
    Ls.warn('isFeatureEnabled for key "' + e2 + `" failed. Feature flags didn't load in time.`);
  }
  addFeatureFlagsHandler(e2) {
    this.featureFlagEventHandlers.push(e2);
  }
  removeFeatureFlagsHandler(e2) {
    this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((t2) => t2 !== e2);
  }
  receivedFeatureFlags(e2, i2) {
    if (this.instance.persistence) {
      this._hasLoadedFlags = true;
      var s2 = this.getFlagVariants(), r2 = this.getFlagPayloads();
      !function(e3, i3) {
        var s3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, n2 = e3.featureFlags, o2 = e3.featureFlagPayloads, a2 = e3.requestId;
        if (n2)
          if (C(n2)) {
            var l2 = {};
            if (n2)
              for (var c2 = 0; c2 < n2.length; c2++)
                l2[n2[c2]] = true;
            i3 && i3.register({ [Ds]: n2, [Pe]: l2 });
          } else {
            var u2 = n2, d2 = o2;
            e3.errorsWhileComputingFlags && (u2 = t(t({}, s3), u2), d2 = t(t({}, r3), d2)), i3 && i3.register(t({ [Ds]: Object.keys(Us(u2)), [Pe]: u2 || {}, [Ns]: d2 || {} }, a2 ? { [Hs]: a2 } : {}));
          }
      }(e2, this.instance.persistence, s2, r2), this._fireFeatureFlagsCallbacks(i2);
    }
  }
  override(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    Ls.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({ flags: e2, suppressWarning: t2 });
  }
  overrideFeatureFlags(e2) {
    if (!this.instance.__loaded || !this.instance.persistence)
      return Ls.uninitializedWarning("posthog.feature_flags.overrideFeatureFlags");
    if (false === e2)
      return this.instance.persistence.unregister(qs), this.instance.persistence.unregister(Bs), void this._fireFeatureFlagsCallbacks();
    if (e2 && "object" == typeof e2 && ("flags" in e2 || "payloads" in e2)) {
      var t2, i2 = e2;
      if (this._override_warning = Boolean(null !== (t2 = i2.suppressWarning) && void 0 !== t2 && t2), "flags" in i2) {
        if (false === i2.flags)
          this.instance.persistence.unregister(qs);
        else if (i2.flags)
          if (C(i2.flags)) {
            for (var s2 = {}, r2 = 0; r2 < i2.flags.length; r2++)
              s2[i2.flags[r2]] = true;
            this.instance.persistence.register({ [qs]: s2 });
          } else
            this.instance.persistence.register({ [qs]: i2.flags });
      }
      return "payloads" in i2 && (false === i2.payloads ? this.instance.persistence.unregister(Bs) : i2.payloads && this.instance.persistence.register({ [Bs]: i2.payloads })), void this._fireFeatureFlagsCallbacks();
    }
    this._fireFeatureFlagsCallbacks();
  }
  onFeatureFlags(e2) {
    if (this.addFeatureFlagsHandler(e2), this._hasLoadedFlags) {
      var { flags: t2, flagVariants: i2 } = this._prepareFeatureFlagsForCallbacks();
      e2(t2, i2);
    }
    return () => this.removeFeatureFlagsHandler(e2);
  }
  updateEarlyAccessFeatureEnrollment(e2, i2) {
    var s2, r2 = (this.instance.get_property(Ce) || []).find((t2) => t2.flagKey === e2), n2 = { ["$feature_enrollment/".concat(e2)]: i2 }, o2 = { $feature_flag: e2, $feature_enrollment: i2, $set: n2 };
    r2 && (o2.$early_access_feature_name = r2.name), this.instance.capture("$feature_enrollment_update", o2), this.setPersonPropertiesForFlags(n2, false);
    var a2 = t(t({}, this.getFlagVariants()), {}, { [e2]: i2 });
    null === (s2 = this.instance.persistence) || void 0 === s2 || s2.register({ [Ds]: Object.keys(Us(a2)), [Pe]: a2 }), this._fireFeatureFlagsCallbacks();
  }
  getEarlyAccessFeatures(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i2 = arguments.length > 2 ? arguments[2] : void 0, s2 = this.instance.get_property(Ce), r2 = i2 ? "&".concat(i2.map((e3) => "stage=".concat(e3)).join("&")) : "";
    if (s2 && !t2)
      return e2(s2);
    this.instance._send_request({ url: this.instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=".concat(this.instance.config.token).concat(r2)), method: "GET", callback: (t3) => {
      var i3;
      if (t3.json) {
        var s3 = t3.json.earlyAccessFeatures;
        return null === (i3 = this.instance.persistence) || void 0 === i3 || i3.register({ [Ce]: s3 }), e2(s3);
      }
    } });
  }
  _prepareFeatureFlagsForCallbacks() {
    var e2 = this.getFlags(), t2 = this.getFlagVariants();
    return { flags: e2.filter((e3) => t2[e3]), flagVariants: Object.keys(t2).filter((e3) => t2[e3]).reduce((e3, i2) => (e3[i2] = t2[i2], e3), {}) };
  }
  _fireFeatureFlagsCallbacks(e2) {
    var { flags: t2, flagVariants: i2 } = this._prepareFeatureFlagsForCallbacks();
    this.featureFlagEventHandlers.forEach((s2) => s2(t2, i2, { errorsLoading: e2 }));
  }
  setPersonPropertiesForFlags(e2) {
    var i2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], s2 = this.instance.get_property(Fe) || {};
    this.instance.register({ [Fe]: t(t({}, s2), e2) }), i2 && this.instance.reloadFeatureFlags();
  }
  resetPersonPropertiesForFlags() {
    this.instance.unregister(Fe);
  }
  setGroupPropertiesForFlags(e2) {
    var i2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], s2 = this.instance.get_property(Re) || {};
    0 !== Object.keys(s2).length && Object.keys(s2).forEach((i3) => {
      s2[i3] = t(t({}, s2[i3]), e2[i3]), delete e2[i3];
    }), this.instance.register({ [Re]: t(t({}, s2), e2) }), i2 && this.instance.reloadFeatureFlags();
  }
  resetGroupPropertiesForFlags(e2) {
    if (e2) {
      var i2 = this.instance.get_property(Re) || {};
      this.instance.register({ [Re]: t(t({}, i2), {}, { [e2]: {} }) });
    } else
      this.instance.unregister(Re);
  }
}
var js = "Mobile", Ws = "iOS", Vs = "Android", Gs = "Tablet", Js = Vs + " " + Gs, Ys = "iPad", Ks = "Apple", Xs = Ks + " Watch", Qs = "Safari", Zs = "BlackBerry", er = "Samsung", tr = er + "Browser", ir = er + " Internet", sr = "Chrome", rr = sr + " OS", nr = sr + " " + Ws, or = "Internet Explorer", ar = or + " " + js, lr = "Opera", cr = lr + " Mini", ur = "Edge", dr = "Microsoft " + ur, hr = "Firefox", _r = hr + " " + Ws, pr = "Nintendo", gr = "PlayStation", vr = "Xbox", fr = Vs + " " + js, mr = js + " " + Qs, br = "Windows", yr = br + " Phone", wr = "Nokia", Sr = "Ouya", kr = "Generic", Er = kr + " " + js.toLowerCase(), xr = kr + " " + Gs.toLowerCase(), Ir = "Konqueror", Pr = "(\\d+(\\.\\d+)?)", Cr = new RegExp("Version/" + Pr), Fr = new RegExp(vr, "i"), Rr = new RegExp(gr + " \\w+", "i"), Tr = new RegExp(pr + " \\w+", "i"), $r = new RegExp(Zs + "|PlayBook|BB10", "i"), Ar = { "NT3.51": "NT 3.11", "NT4.0": "NT 4.0", "5.0": "2000", 5.1: "XP", 5.2: "XP", "6.0": "Vista", 6.1: "7", 6.2: "8", 6.3: "8.1", 6.4: "10", "10.0": "10" };
var Or = (e2, t2) => t2 && w(t2, Ks) || function(e3) {
  return w(e3, Qs) && !w(e3, sr) && !w(e3, Vs);
}(e2), Mr = function(e2, t2) {
  return t2 = t2 || "", w(e2, " OPR/") && w(e2, "Mini") ? cr : w(e2, " OPR/") ? lr : $r.test(e2) ? Zs : w(e2, "IE" + js) || w(e2, "WPDesktop") ? ar : w(e2, tr) ? ir : w(e2, ur) || w(e2, "Edg/") ? dr : w(e2, "FBIOS") ? "Facebook " + js : w(e2, "UCWEB") || w(e2, "UCBrowser") ? "UC Browser" : w(e2, "CriOS") ? nr : w(e2, "CrMo") || w(e2, sr) ? sr : w(e2, Vs) && w(e2, Qs) ? fr : w(e2, "FxiOS") ? _r : w(e2.toLowerCase(), Ir.toLowerCase()) ? Ir : Or(e2, t2) ? w(e2, js) ? mr : Qs : w(e2, hr) ? hr : w(e2, "MSIE") || w(e2, "Trident/") ? or : w(e2, "Gecko") ? hr : "";
}, Lr = { [ar]: [new RegExp("rv:" + Pr)], [dr]: [new RegExp(ur + "?\\/" + Pr)], [sr]: [new RegExp("(" + sr + "|CrMo)\\/" + Pr)], [nr]: [new RegExp("CriOS\\/" + Pr)], "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + Pr)], [Qs]: [Cr], [mr]: [Cr], [lr]: [new RegExp("(Opera|OPR)\\/" + Pr)], [hr]: [new RegExp(hr + "\\/" + Pr)], [_r]: [new RegExp("FxiOS\\/" + Pr)], [Ir]: [new RegExp("Konqueror[:/]?" + Pr, "i")], [Zs]: [new RegExp(Zs + " " + Pr), Cr], [fr]: [new RegExp("android\\s" + Pr, "i")], [ir]: [new RegExp(tr + "\\/" + Pr)], [or]: [new RegExp("(rv:|MSIE )" + Pr)], Mozilla: [new RegExp("rv:" + Pr)] }, Dr = [[new RegExp(vr + "; " + vr + " (.*?)[);]", "i"), (e2) => [vr, e2 && e2[1] || ""]], [new RegExp(pr, "i"), [pr, ""]], [new RegExp(gr, "i"), [gr, ""]], [$r, [Zs, ""]], [new RegExp(br, "i"), (e2, t2) => {
  if (/Phone/.test(t2) || /WPDesktop/.test(t2))
    return [yr, ""];
  if (new RegExp(js).test(t2) && !/IEMobile\b/.test(t2))
    return [br + " " + js, ""];
  var i2 = /Windows NT ([0-9.]+)/i.exec(t2);
  if (i2 && i2[1]) {
    var s2 = i2[1], r2 = Ar[s2] || "";
    return /arm/i.test(t2) && (r2 = "RT"), [br, r2];
  }
  return [br, ""];
}], [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (e2) => {
  if (e2 && e2[3]) {
    var t2 = [e2[3], e2[4], e2[5] || "0"];
    return [Ws, t2.join(".")];
  }
  return [Ws, ""];
}], [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (e2) => {
  var t2 = "";
  return e2 && e2.length >= 3 && (t2 = $(e2[2]) ? e2[3] : e2[2]), ["watchOS", t2];
}], [new RegExp("(" + Vs + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + Vs + ")", "i"), (e2) => {
  if (e2 && e2[2]) {
    var t2 = [e2[2], e2[3], e2[4] || "0"];
    return [Vs, t2.join(".")];
  }
  return [Vs, ""];
}], [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (e2) => {
  var t2 = ["Mac OS X", ""];
  if (e2 && e2[1]) {
    var i2 = [e2[1], e2[2], e2[3] || "0"];
    t2[1] = i2.join(".");
  }
  return t2;
}], [/Mac/i, ["Mac OS X", ""]], [/CrOS/, [rr, ""]], [/Linux|debian/i, ["Linux", ""]]], qr = function(e2) {
  return Tr.test(e2) ? pr : Rr.test(e2) ? gr : Fr.test(e2) ? vr : new RegExp(Sr, "i").test(e2) ? Sr : new RegExp("(" + yr + "|WPDesktop)", "i").test(e2) ? yr : /iPad/.test(e2) ? Ys : /iPod/.test(e2) ? "iPod Touch" : /iPhone/.test(e2) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(e2) ? Xs : $r.test(e2) ? Zs : /(kobo)\s(ereader|touch)/i.test(e2) ? "Kobo" : new RegExp(wr, "i").test(e2) ? wr : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(e2) || /(kf[a-z]+)( bui|\)).+silk\//i.test(e2) ? "Kindle Fire" : /(Android|ZTE)/i.test(e2) ? !new RegExp(js).test(e2) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(e2) ? /pixel[\daxl ]{1,6}/i.test(e2) && !/pixel c/i.test(e2) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(e2) || /lmy47v/i.test(e2) && !/QTAQZ3/i.test(e2) ? Vs : Js : Vs : new RegExp("(pda|" + js + ")", "i").test(e2) ? Er : new RegExp(Gs, "i").test(e2) && !new RegExp(Gs + " pc", "i").test(e2) ? xr : "";
}, Nr = "https?://(.*)", Br = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "irclid", "_kx"], Hr = K(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid"], Br), Ur = "<masked>", zr = { campaignParams: function() {
  var { customTrackedParams: e2, maskPersonalDataProperties: t2, customPersonalDataProperties: i2 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  if (!d)
    return {};
  var s2 = t2 ? K([], Br, i2 || []) : [];
  return this._campaignParamsFromUrl(kt(d.URL, s2, Ur), e2);
}, _campaignParamsFromUrl: function(e2, t2) {
  var i2 = Hr.concat(t2 || []), s2 = {};
  return J(i2, function(t3) {
    var i3 = St(e2, t3);
    s2[t3] = i3 || null;
  }), s2;
}, _searchEngine: function(e2) {
  return e2 ? 0 === e2.search(Nr + "google.([^/?]*)") ? "google" : 0 === e2.search(Nr + "bing.com") ? "bing" : 0 === e2.search(Nr + "yahoo.com") ? "yahoo" : 0 === e2.search(Nr + "duckduckgo.com") ? "duckduckgo" : null : null;
}, _searchInfoFromReferrer: function(e2) {
  var t2 = zr._searchEngine(e2), i2 = "yahoo" != t2 ? "q" : "p", s2 = {};
  if (!M(t2)) {
    s2.$search_engine = t2;
    var r2 = d ? St(d.referrer, i2) : "";
    r2.length && (s2.ph_keyword = r2);
  }
  return s2;
}, searchInfo: function() {
  var e2 = null == d ? void 0 : d.referrer;
  return e2 ? this._searchInfoFromReferrer(e2) : {};
}, browser: Mr, browserVersion: function(e2, t2) {
  var i2 = Mr(e2, t2), s2 = Lr[i2];
  if ($(s2))
    return null;
  for (var r2 = 0; r2 < s2.length; r2++) {
    var n2 = s2[r2], o2 = e2.match(n2);
    if (o2)
      return parseFloat(o2[o2.length - 2]);
  }
  return null;
}, browserLanguage: function() {
  return navigator.language || navigator.userLanguage;
}, browserLanguagePrefix: function() {
  var e2 = this.browserLanguage();
  return "string" == typeof e2 ? e2.split("-")[0] : void 0;
}, os: function(e2) {
  for (var t2 = 0; t2 < Dr.length; t2++) {
    var [i2, s2] = Dr[t2], r2 = i2.exec(e2), n2 = r2 && (F(s2) ? s2(r2, e2) : s2);
    if (n2)
      return n2;
  }
  return ["", ""];
}, device: qr, deviceType: function(e2) {
  var t2 = qr(e2);
  return t2 === Ys || t2 === Js || "Kobo" === t2 || "Kindle Fire" === t2 || t2 === xr ? Gs : t2 === pr || t2 === vr || t2 === gr || t2 === Sr ? "Console" : t2 === Xs ? "Wearable" : t2 ? js : "Desktop";
}, referrer: function() {
  return (null == d ? void 0 : d.referrer) || "$direct";
}, referringDomain: function() {
  var e2;
  return null != d && d.referrer && (null === (e2 = yt(d.referrer)) || void 0 === e2 ? void 0 : e2.host) || "$direct";
}, referrerInfo: function() {
  return { $referrer: this.referrer(), $referring_domain: this.referringDomain() };
}, personInfo: function() {
  var { maskPersonalDataProperties: e2, customPersonalDataProperties: t2 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i2 = e2 ? K([], Br, t2 || []) : [], s2 = null == h ? void 0 : h.href.substring(0, 1e3);
  return { r: this.referrer().substring(0, 1e3), u: s2 ? kt(s2, i2, Ur) : void 0 };
}, personPropsFromInfo: function(e2) {
  var t2, { r: i2, u: s2 } = e2, r2 = { $referrer: i2, $referring_domain: null == i2 ? void 0 : "$direct" == i2 ? "$direct" : null === (t2 = yt(i2)) || void 0 === t2 ? void 0 : t2.host };
  if (s2) {
    r2.$current_url = s2;
    var n2 = yt(s2);
    r2.$host = null == n2 ? void 0 : n2.host, r2.$pathname = null == n2 ? void 0 : n2.pathname;
    var o2 = this._campaignParamsFromUrl(s2);
    Y(r2, o2);
  }
  if (i2) {
    var a2 = this._searchInfoFromReferrer(i2);
    Y(r2, a2);
  }
  return r2;
}, initialPersonPropsFromInfo: function(e2) {
  var t2 = this.personPropsFromInfo(e2), i2 = {};
  return J(t2, function(e3, t3) {
    i2["$initial_".concat(k(t3))] = e3;
  }), i2;
}, timezone: function() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e2) {
    return;
  }
}, timezoneOffset: function() {
  try {
    return new Date().getTimezoneOffset();
  } catch (e2) {
    return;
  }
}, properties: function() {
  var { maskPersonalDataProperties: e2, customPersonalDataProperties: t2 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  if (!v)
    return {};
  var i2 = e2 ? K([], Br, t2 || []) : [], [s2, r2] = zr.os(v);
  return Y(ee({ $os: s2, $os_version: r2, $browser: zr.browser(v, navigator.vendor), $device: zr.device(v), $device_type: zr.deviceType(v), $timezone: zr.timezone(), $timezone_offset: zr.timezoneOffset() }), { $current_url: kt(null == h ? void 0 : h.href, i2, Ur), $host: null == h ? void 0 : h.host, $pathname: null == h ? void 0 : h.pathname, $raw_user_agent: v.length > 1e3 ? v.substring(0, 997) + "..." : v, $browser_version: zr.browserVersion(v, navigator.vendor), $browser_language: zr.browserLanguage(), $browser_language_prefix: zr.browserLanguagePrefix(), $screen_height: null == n ? void 0 : n.screen.height, $screen_width: null == n ? void 0 : n.screen.width, $viewport_height: null == n ? void 0 : n.innerHeight, $viewport_width: null == n ? void 0 : n.innerWidth, $lib: "web", $lib_version: U.LIB_VERSION, $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10), $time: Date.now() / 1e3 });
}, people_properties: function() {
  if (!v)
    return {};
  var [e2, t2] = zr.os(v);
  return Y(ee({ $os: e2, $os_version: t2, $browser: zr.browser(v, navigator.vendor) }), { $browser_version: zr.browserVersion(v, navigator.vendor) });
} }, jr = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
class Wr {
  constructor(e2) {
    this.config = e2, this.props = {}, this.campaign_params_saved = false, this.name = ((e3) => {
      var t2 = "";
      return e3.token && (t2 = e3.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), e3.persistence_name ? "ph_" + e3.persistence_name : "ph_" + t2 + "_posthog";
    })(e2), this.storage = this.buildStorage(e2), this.load(), e2.debug && j.info("Persistence loaded", e2.persistence, t({}, this.props)), this.update_config(e2, e2), this.save();
  }
  buildStorage(e2) {
    -1 === jr.indexOf(e2.persistence.toLowerCase()) && (j.critical("Unknown persistence type " + e2.persistence + "; falling back to localStorage+cookie"), e2.persistence = "localStorage+cookie");
    var t2 = e2.persistence.toLowerCase();
    return "localstorage" === t2 && Vt.is_supported() ? Vt : "localstorage+cookie" === t2 && Jt.is_supported() ? Jt : "sessionstorage" === t2 && Qt.is_supported() ? Qt : "memory" === t2 ? Kt : "cookie" === t2 ? jt : Jt.is_supported() ? Jt : jt;
  }
  properties() {
    var e2 = {};
    return J(this.props, function(t2, i2) {
      if (i2 === Pe && R(t2))
        for (var s2 = Object.keys(t2), r2 = 0; r2 < s2.length; r2++)
          e2["$feature/".concat(s2[r2])] = t2[s2[r2]];
      else
        o2 = i2, a2 = false, (M(n2 = ze) ? a2 : c && n2.indexOf === c ? -1 != n2.indexOf(o2) : (J(n2, function(e3) {
          if (a2 || (a2 = e3 === o2))
            return V;
        }), a2)) || (e2[i2] = t2);
      var n2, o2, a2;
    }), e2;
  }
  load() {
    if (!this.disabled) {
      var e2 = this.storage.parse(this.name);
      e2 && (this.props = Y({}, e2));
    }
  }
  save() {
    this.disabled || this.storage.set(this.name, this.props, this.expire_days, this.cross_subdomain, this.secure, this.config.debug);
  }
  remove() {
    this.storage.remove(this.name, false), this.storage.remove(this.name, true);
  }
  clear() {
    this.remove(), this.props = {};
  }
  register_once(e2, t2, i2) {
    if (R(e2)) {
      $(t2) && (t2 = "None"), this.expire_days = $(i2) ? this.default_expiry : i2;
      var s2 = false;
      if (J(e2, (e3, i3) => {
        this.props.hasOwnProperty(i3) && this.props[i3] !== t2 || (this.props[i3] = e3, s2 = true);
      }), s2)
        return this.save(), true;
    }
    return false;
  }
  register(e2, t2) {
    if (R(e2)) {
      this.expire_days = $(t2) ? this.default_expiry : t2;
      var i2 = false;
      if (J(e2, (t3, s2) => {
        e2.hasOwnProperty(s2) && this.props[s2] !== t3 && (this.props[s2] = t3, i2 = true);
      }), i2)
        return this.save(), true;
    }
    return false;
  }
  unregister(e2) {
    e2 in this.props && (delete this.props[e2], this.save());
  }
  update_campaign_params() {
    if (!this.campaign_params_saved) {
      var e2 = zr.campaignParams({ customTrackedParams: this.config.custom_campaign_params, maskPersonalDataProperties: this.config.mask_personal_data_properties, customPersonalDataProperties: this.config.custom_personal_data_properties });
      T(ee(e2)) || this.register(e2), this.campaign_params_saved = true;
    }
  }
  update_search_keyword() {
    this.register(zr.searchInfo());
  }
  update_referrer_info() {
    this.register_once(zr.referrerInfo(), void 0);
  }
  set_initial_person_info() {
    this.props[De] || this.props[qe] || this.register_once({ [Ne]: zr.personInfo({ maskPersonalDataProperties: this.config.mask_personal_data_properties, customPersonalDataProperties: this.config.custom_personal_data_properties }) }, void 0);
  }
  get_referrer_info() {
    return ee({ $referrer: this.props.$referrer, $referring_domain: this.props.$referring_domain });
  }
  get_initial_props() {
    var e2 = {};
    J([qe, De], (t3) => {
      var i3 = this.props[t3];
      i3 && J(i3, function(t4, i4) {
        e2["$initial_" + k(i4)] = t4;
      });
    });
    var t2 = this.props[Ne];
    if (t2) {
      var i2 = zr.initialPersonPropsFromInfo(t2);
      Y(e2, i2);
    }
    return e2;
  }
  safe_merge(e2) {
    return J(this.props, function(t2, i2) {
      i2 in e2 || (e2[i2] = t2);
    }), e2;
  }
  update_config(e2, t2) {
    if (this.default_expiry = this.expire_days = e2.cookie_expiration, this.set_disabled(e2.disable_persistence), this.set_cross_subdomain(e2.cross_subdomain_cookie), this.set_secure(e2.secure_cookie), e2.persistence !== t2.persistence) {
      var i2 = this.buildStorage(e2), s2 = this.props;
      this.clear(), this.storage = i2, this.props = s2, this.save();
    }
  }
  set_disabled(e2) {
    this.disabled = e2, this.disabled ? this.remove() : this.save();
  }
  set_cross_subdomain(e2) {
    e2 !== this.cross_subdomain && (this.cross_subdomain = e2, this.remove(), this.save());
  }
  get_cross_subdomain() {
    return !!this.cross_subdomain;
  }
  set_secure(e2) {
    e2 !== this.secure && (this.secure = e2, this.remove(), this.save());
  }
  set_event_timer(e2, t2) {
    var i2 = this.props[le] || {};
    i2[e2] = t2, this.props[le] = i2, this.save();
  }
  remove_event_timer(e2) {
    var t2 = (this.props[le] || {})[e2];
    return $(t2) || (delete this.props[le][e2], this.save()), t2;
  }
  get_property(e2) {
    return this.props[e2];
  }
  set_property(e2, t2) {
    this.props[e2] = t2, this.save();
  }
}
var Vr, Gr, Jr, Yr, Kr, Xr, Qr, Zr, en, tn, sn, rn, nn = {}, on = [], an = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ln = Array.isArray;
function cn(e2, t2) {
  for (var i2 in t2)
    e2[i2] = t2[i2];
  return e2;
}
function un(e2) {
  var t2 = e2.parentNode;
  t2 && t2.removeChild(e2);
}
function dn(e2, t2, i2, s2, r2) {
  var n2 = { type: e2, props: t2, key: i2, ref: s2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r2 ? ++Jr : r2, __i: -1, __u: 0 };
  return null == r2 && null != Gr.vnode && Gr.vnode(n2), n2;
}
function hn(e2) {
  return e2.children;
}
function _n(e2, t2) {
  this.props = e2, this.context = t2;
}
function pn(e2, t2) {
  if (null == t2)
    return e2.__ ? pn(e2.__, e2.__i + 1) : null;
  for (var i2; t2 < e2.__k.length; t2++)
    if (null != (i2 = e2.__k[t2]) && null != i2.__e)
      return i2.__e;
  return "function" == typeof e2.type ? pn(e2) : null;
}
function gn(e2) {
  var t2, i2;
  if (null != (e2 = e2.__) && null != e2.__c) {
    for (e2.__e = e2.__c.base = null, t2 = 0; t2 < e2.__k.length; t2++)
      if (null != (i2 = e2.__k[t2]) && null != i2.__e) {
        e2.__e = e2.__c.base = i2.__e;
        break;
      }
    return gn(e2);
  }
}
function vn(e2) {
  (!e2.__d && (e2.__d = true) && Yr.push(e2) && !fn.__r++ || Kr !== Gr.debounceRendering) && ((Kr = Gr.debounceRendering) || Xr)(fn);
}
function fn() {
  var e2, t2, i2, s2, r2, n2, o2, a2, l2;
  for (Yr.sort(Qr); e2 = Yr.shift(); )
    e2.__d && (t2 = Yr.length, s2 = void 0, n2 = (r2 = (i2 = e2).__v).__e, a2 = [], l2 = [], (o2 = i2.__P) && ((s2 = cn({}, r2)).__v = r2.__v + 1, Gr.vnode && Gr.vnode(s2), In(o2, s2, r2, i2.__n, void 0 !== o2.ownerSVGElement, 32 & r2.__u ? [n2] : null, a2, null == n2 ? pn(r2) : n2, !!(32 & r2.__u), l2), s2.__.__k[s2.__i] = s2, Pn(a2, s2, l2), s2.__e != n2 && gn(s2)), Yr.length > t2 && Yr.sort(Qr));
  fn.__r = 0;
}
function mn(e2, t2, i2, s2, r2, n2, o2, a2, l2, c2, u2) {
  var d2, h2, _2, p2, g2, v2 = s2 && s2.__k || on, f2 = t2.length;
  for (i2.__d = l2, bn(i2, t2, v2), l2 = i2.__d, d2 = 0; d2 < f2; d2++)
    null != (_2 = i2.__k[d2]) && "boolean" != typeof _2 && "function" != typeof _2 && (h2 = -1 === _2.__i ? nn : v2[_2.__i] || nn, _2.__i = d2, In(e2, _2, h2, r2, n2, o2, a2, l2, c2, u2), p2 = _2.__e, _2.ref && h2.ref != _2.ref && (h2.ref && Fn(h2.ref, null, _2), u2.push(_2.ref, _2.__c || p2, _2)), null == g2 && null != p2 && (g2 = p2), 65536 & _2.__u || h2.__k === _2.__k ? l2 = yn(_2, l2, e2) : "function" == typeof _2.type && void 0 !== _2.__d ? l2 = _2.__d : p2 && (l2 = p2.nextSibling), _2.__d = void 0, _2.__u &= -196609);
  i2.__d = l2, i2.__e = g2;
}
function bn(e2, t2, i2) {
  var s2, r2, n2, o2, a2, l2 = t2.length, c2 = i2.length, u2 = c2, d2 = 0;
  for (e2.__k = [], s2 = 0; s2 < l2; s2++)
    null != (r2 = e2.__k[s2] = null == (r2 = t2[s2]) || "boolean" == typeof r2 || "function" == typeof r2 ? null : "string" == typeof r2 || "number" == typeof r2 || "bigint" == typeof r2 || r2.constructor == String ? dn(null, r2, null, null, r2) : ln(r2) ? dn(hn, { children: r2 }, null, null, null) : void 0 === r2.constructor && r2.__b > 0 ? dn(r2.type, r2.props, r2.key, r2.ref ? r2.ref : null, r2.__v) : r2) ? (r2.__ = e2, r2.__b = e2.__b + 1, a2 = wn(r2, i2, o2 = s2 + d2, u2), r2.__i = a2, n2 = null, -1 !== a2 && (u2--, (n2 = i2[a2]) && (n2.__u |= 131072)), null == n2 || null === n2.__v ? (-1 == a2 && d2--, "function" != typeof r2.type && (r2.__u |= 65536)) : a2 !== o2 && (a2 === o2 + 1 ? d2++ : a2 > o2 ? u2 > l2 - o2 ? d2 += a2 - o2 : d2-- : d2 = a2 < o2 && a2 == o2 - 1 ? a2 - o2 : 0, a2 !== s2 + d2 && (r2.__u |= 65536))) : (n2 = i2[s2]) && null == n2.key && n2.__e && (n2.__e == e2.__d && (e2.__d = pn(n2)), Rn(n2, n2, false), i2[s2] = null, u2--);
  if (u2)
    for (s2 = 0; s2 < c2; s2++)
      null != (n2 = i2[s2]) && 0 == (131072 & n2.__u) && (n2.__e == e2.__d && (e2.__d = pn(n2)), Rn(n2, n2));
}
function yn(e2, t2, i2) {
  var s2, r2;
  if ("function" == typeof e2.type) {
    for (s2 = e2.__k, r2 = 0; s2 && r2 < s2.length; r2++)
      s2[r2] && (s2[r2].__ = e2, t2 = yn(s2[r2], t2, i2));
    return t2;
  }
  return e2.__e != t2 && (i2.insertBefore(e2.__e, t2 || null), t2 = e2.__e), t2 && t2.nextSibling;
}
function wn(e2, t2, i2, s2) {
  var r2 = e2.key, n2 = e2.type, o2 = i2 - 1, a2 = i2 + 1, l2 = t2[i2];
  if (null === l2 || l2 && r2 == l2.key && n2 === l2.type)
    return i2;
  if (s2 > (null != l2 && 0 == (131072 & l2.__u) ? 1 : 0))
    for (; o2 >= 0 || a2 < t2.length; ) {
      if (o2 >= 0) {
        if ((l2 = t2[o2]) && 0 == (131072 & l2.__u) && r2 == l2.key && n2 === l2.type)
          return o2;
        o2--;
      }
      if (a2 < t2.length) {
        if ((l2 = t2[a2]) && 0 == (131072 & l2.__u) && r2 == l2.key && n2 === l2.type)
          return a2;
        a2++;
      }
    }
  return -1;
}
function Sn(e2, t2, i2) {
  "-" === t2[0] ? e2.setProperty(t2, null == i2 ? "" : i2) : e2[t2] = null == i2 ? "" : "number" != typeof i2 || an.test(t2) ? i2 : i2 + "px";
}
function kn(e2, t2, i2, s2, r2) {
  var n2;
  e:
    if ("style" === t2)
      if ("string" == typeof i2)
        e2.style.cssText = i2;
      else {
        if ("string" == typeof s2 && (e2.style.cssText = s2 = ""), s2)
          for (t2 in s2)
            i2 && t2 in i2 || Sn(e2.style, t2, "");
        if (i2)
          for (t2 in i2)
            s2 && i2[t2] === s2[t2] || Sn(e2.style, t2, i2[t2]);
      }
    else if ("o" === t2[0] && "n" === t2[1])
      n2 = t2 !== (t2 = t2.replace(/(PointerCapture)$|Capture$/, "$1")), t2 = t2.toLowerCase() in e2 ? t2.toLowerCase().slice(2) : t2.slice(2), e2.l || (e2.l = {}), e2.l[t2 + n2] = i2, i2 ? s2 ? i2.u = s2.u : (i2.u = Date.now(), e2.addEventListener(t2, n2 ? xn : En, n2)) : e2.removeEventListener(t2, n2 ? xn : En, n2);
    else {
      if (r2)
        t2 = t2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" !== t2 && "height" !== t2 && "href" !== t2 && "list" !== t2 && "form" !== t2 && "tabIndex" !== t2 && "download" !== t2 && "rowSpan" !== t2 && "colSpan" !== t2 && "role" !== t2 && t2 in e2)
        try {
          e2[t2] = null == i2 ? "" : i2;
          break e;
        } catch (e3) {
        }
      "function" == typeof i2 || (null == i2 || false === i2 && "-" !== t2[4] ? e2.removeAttribute(t2) : e2.setAttribute(t2, i2));
    }
}
function En(e2) {
  var t2 = this.l[e2.type + false];
  if (e2.t) {
    if (e2.t <= t2.u)
      return;
  } else
    e2.t = Date.now();
  return t2(Gr.event ? Gr.event(e2) : e2);
}
function xn(e2) {
  return this.l[e2.type + true](Gr.event ? Gr.event(e2) : e2);
}
function In(e2, t2, i2, s2, r2, n2, o2, a2, l2, c2) {
  var u2, d2, h2, _2, p2, g2, v2, f2, m2, b2, y2, w2, S2, k2, E2, x2 = t2.type;
  if (void 0 !== t2.constructor)
    return null;
  128 & i2.__u && (l2 = !!(32 & i2.__u), n2 = [a2 = t2.__e = i2.__e]), (u2 = Gr.__b) && u2(t2);
  e:
    if ("function" == typeof x2)
      try {
        if (f2 = t2.props, m2 = (u2 = x2.contextType) && s2[u2.__c], b2 = u2 ? m2 ? m2.props.value : u2.__ : s2, i2.__c ? v2 = (d2 = t2.__c = i2.__c).__ = d2.__E : ("prototype" in x2 && x2.prototype.render ? t2.__c = d2 = new x2(f2, b2) : (t2.__c = d2 = new _n(f2, b2), d2.constructor = x2, d2.render = Tn), m2 && m2.sub(d2), d2.props = f2, d2.state || (d2.state = {}), d2.context = b2, d2.__n = s2, h2 = d2.__d = true, d2.__h = [], d2._sb = []), null == d2.__s && (d2.__s = d2.state), null != x2.getDerivedStateFromProps && (d2.__s == d2.state && (d2.__s = cn({}, d2.__s)), cn(d2.__s, x2.getDerivedStateFromProps(f2, d2.__s))), _2 = d2.props, p2 = d2.state, d2.__v = t2, h2)
          null == x2.getDerivedStateFromProps && null != d2.componentWillMount && d2.componentWillMount(), null != d2.componentDidMount && d2.__h.push(d2.componentDidMount);
        else {
          if (null == x2.getDerivedStateFromProps && f2 !== _2 && null != d2.componentWillReceiveProps && d2.componentWillReceiveProps(f2, b2), !d2.__e && (null != d2.shouldComponentUpdate && false === d2.shouldComponentUpdate(f2, d2.__s, b2) || t2.__v === i2.__v)) {
            for (t2.__v !== i2.__v && (d2.props = f2, d2.state = d2.__s, d2.__d = false), t2.__e = i2.__e, t2.__k = i2.__k, t2.__k.forEach(function(e3) {
              e3 && (e3.__ = t2);
            }), y2 = 0; y2 < d2._sb.length; y2++)
              d2.__h.push(d2._sb[y2]);
            d2._sb = [], d2.__h.length && o2.push(d2);
            break e;
          }
          null != d2.componentWillUpdate && d2.componentWillUpdate(f2, d2.__s, b2), null != d2.componentDidUpdate && d2.__h.push(function() {
            d2.componentDidUpdate(_2, p2, g2);
          });
        }
        if (d2.context = b2, d2.props = f2, d2.__P = e2, d2.__e = false, w2 = Gr.__r, S2 = 0, "prototype" in x2 && x2.prototype.render) {
          for (d2.state = d2.__s, d2.__d = false, w2 && w2(t2), u2 = d2.render(d2.props, d2.state, d2.context), k2 = 0; k2 < d2._sb.length; k2++)
            d2.__h.push(d2._sb[k2]);
          d2._sb = [];
        } else
          do {
            d2.__d = false, w2 && w2(t2), u2 = d2.render(d2.props, d2.state, d2.context), d2.state = d2.__s;
          } while (d2.__d && ++S2 < 25);
        d2.state = d2.__s, null != d2.getChildContext && (s2 = cn(cn({}, s2), d2.getChildContext())), h2 || null == d2.getSnapshotBeforeUpdate || (g2 = d2.getSnapshotBeforeUpdate(_2, p2)), mn(e2, ln(E2 = null != u2 && u2.type === hn && null == u2.key ? u2.props.children : u2) ? E2 : [E2], t2, i2, s2, r2, n2, o2, a2, l2, c2), d2.base = t2.__e, t2.__u &= -161, d2.__h.length && o2.push(d2), v2 && (d2.__E = d2.__ = null);
      } catch (e3) {
        t2.__v = null, l2 || null != n2 ? (t2.__e = a2, t2.__u |= l2 ? 160 : 32, n2[n2.indexOf(a2)] = null) : (t2.__e = i2.__e, t2.__k = i2.__k), Gr.__e(e3, t2, i2);
      }
    else
      null == n2 && t2.__v === i2.__v ? (t2.__k = i2.__k, t2.__e = i2.__e) : t2.__e = Cn(i2.__e, t2, i2, s2, r2, n2, o2, l2, c2);
  (u2 = Gr.diffed) && u2(t2);
}
function Pn(e2, t2, i2) {
  t2.__d = void 0;
  for (var s2 = 0; s2 < i2.length; s2++)
    Fn(i2[s2], i2[++s2], i2[++s2]);
  Gr.__c && Gr.__c(t2, e2), e2.some(function(t3) {
    try {
      e2 = t3.__h, t3.__h = [], e2.some(function(e3) {
        e3.call(t3);
      });
    } catch (e3) {
      Gr.__e(e3, t3.__v);
    }
  });
}
function Cn(e2, t2, i2, s2, r2, n2, o2, a2, l2) {
  var c2, u2, d2, h2, _2, p2, g2, v2 = i2.props, f2 = t2.props, m2 = t2.type;
  if ("svg" === m2 && (r2 = true), null != n2) {
    for (c2 = 0; c2 < n2.length; c2++)
      if ((_2 = n2[c2]) && "setAttribute" in _2 == !!m2 && (m2 ? _2.localName === m2 : 3 === _2.nodeType)) {
        e2 = _2, n2[c2] = null;
        break;
      }
  }
  if (null == e2) {
    if (null === m2)
      return document.createTextNode(f2);
    e2 = r2 ? document.createElementNS("http://www.w3.org/2000/svg", m2) : document.createElement(m2, f2.is && f2), n2 = null, a2 = false;
  }
  if (null === m2)
    v2 === f2 || a2 && e2.data === f2 || (e2.data = f2);
  else {
    if (n2 = n2 && Vr.call(e2.childNodes), v2 = i2.props || nn, !a2 && null != n2)
      for (v2 = {}, c2 = 0; c2 < e2.attributes.length; c2++)
        v2[(_2 = e2.attributes[c2]).name] = _2.value;
    for (c2 in v2)
      _2 = v2[c2], "children" == c2 || ("dangerouslySetInnerHTML" == c2 ? d2 = _2 : "key" === c2 || c2 in f2 || kn(e2, c2, null, _2, r2));
    for (c2 in f2)
      _2 = f2[c2], "children" == c2 ? h2 = _2 : "dangerouslySetInnerHTML" == c2 ? u2 = _2 : "value" == c2 ? p2 = _2 : "checked" == c2 ? g2 = _2 : "key" === c2 || a2 && "function" != typeof _2 || v2[c2] === _2 || kn(e2, c2, _2, v2[c2], r2);
    if (u2)
      a2 || d2 && (u2.__html === d2.__html || u2.__html === e2.innerHTML) || (e2.innerHTML = u2.__html), t2.__k = [];
    else if (d2 && (e2.innerHTML = ""), mn(e2, ln(h2) ? h2 : [h2], t2, i2, s2, r2 && "foreignObject" !== m2, n2, o2, n2 ? n2[0] : i2.__k && pn(i2, 0), a2, l2), null != n2)
      for (c2 = n2.length; c2--; )
        null != n2[c2] && un(n2[c2]);
    a2 || (c2 = "value", void 0 !== p2 && (p2 !== e2[c2] || "progress" === m2 && !p2 || "option" === m2 && p2 !== v2[c2]) && kn(e2, c2, p2, v2[c2], false), c2 = "checked", void 0 !== g2 && g2 !== e2[c2] && kn(e2, c2, g2, v2[c2], false));
  }
  return e2;
}
function Fn(e2, t2, i2) {
  try {
    "function" == typeof e2 ? e2(t2) : e2.current = t2;
  } catch (e3) {
    Gr.__e(e3, i2);
  }
}
function Rn(e2, t2, i2) {
  var s2, r2;
  if (Gr.unmount && Gr.unmount(e2), (s2 = e2.ref) && (s2.current && s2.current !== e2.__e || Fn(s2, null, t2)), null != (s2 = e2.__c)) {
    if (s2.componentWillUnmount)
      try {
        s2.componentWillUnmount();
      } catch (e3) {
        Gr.__e(e3, t2);
      }
    s2.base = s2.__P = null, e2.__c = void 0;
  }
  if (s2 = e2.__k)
    for (r2 = 0; r2 < s2.length; r2++)
      s2[r2] && Rn(s2[r2], t2, i2 || "function" != typeof e2.type);
  i2 || null == e2.__e || un(e2.__e), e2.__ = e2.__e = e2.__d = void 0;
}
function Tn(e2, t2, i2) {
  return this.constructor(e2, i2);
}
Vr = on.slice, Gr = { __e: function(e2, t2, i2, s2) {
  for (var r2, n2, o2; t2 = t2.__; )
    if ((r2 = t2.__c) && !r2.__)
      try {
        if ((n2 = r2.constructor) && null != n2.getDerivedStateFromError && (r2.setState(n2.getDerivedStateFromError(e2)), o2 = r2.__d), null != r2.componentDidCatch && (r2.componentDidCatch(e2, s2 || {}), o2 = r2.__d), o2)
          return r2.__E = r2;
      } catch (t3) {
        e2 = t3;
      }
  throw e2;
} }, Jr = 0, _n.prototype.setState = function(e2, t2) {
  var i2;
  i2 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = cn({}, this.state), "function" == typeof e2 && (e2 = e2(cn({}, i2), this.props)), e2 && cn(i2, e2), null != e2 && this.__v && (t2 && this._sb.push(t2), vn(this));
}, _n.prototype.forceUpdate = function(e2) {
  this.__v && (this.__e = true, e2 && this.__h.push(e2), vn(this));
}, _n.prototype.render = hn, Yr = [], Xr = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Qr = function(e2, t2) {
  return e2.__v.__b - t2.__v.__b;
}, fn.__r = 0, Zr = 0, function(e2) {
  e2.Popover = "popover", e2.API = "api", e2.Widget = "widget";
}(en || (en = {})), function(e2) {
  e2.Open = "open", e2.MultipleChoice = "multiple_choice", e2.SingleChoice = "single_choice", e2.Rating = "rating", e2.Link = "link";
}(tn || (tn = {})), function(e2) {
  e2.NextQuestion = "next_question", e2.End = "end", e2.ResponseBased = "response_based", e2.SpecificQuestion = "specific_question";
}(sn || (sn = {})), function(e2) {
  e2.Once = "once", e2.Recurring = "recurring", e2.Always = "always";
}(rn || (rn = {}));
!function(e2, t2) {
  var i2 = { __c: t2 = "__cC" + Zr++, __: e2, Consumer: function(e3, t3) {
    return e3.children(t3);
  }, Provider: function(e3) {
    var i3, s2;
    return this.getChildContext || (i3 = [], (s2 = {})[t2] = this, this.getChildContext = function() {
      return s2;
    }, this.shouldComponentUpdate = function(e4) {
      this.props.value !== e4.value && i3.some(function(e5) {
        e5.__e = true, vn(e5);
      });
    }, this.sub = function(e4) {
      i3.push(e4);
      var t3 = e4.componentWillUnmount;
      e4.componentWillUnmount = function() {
        i3.splice(i3.indexOf(e4), 1), t3 && t3.call(e4);
      };
    }), e3.children;
  } };
  i2.Provider.__ = i2.Consumer.contextType = i2;
}({ isPreviewMode: false, previewPageIndex: 0, onPopupSurveyDismissed: () => {
}, isPopup: true, onPreviewSubmit: () => {
}, onPopupSurveySent: () => {
} });
var $n = function(e2, t2) {
  if (!function(e3) {
    try {
      new RegExp(e3);
    } catch (e4) {
      return false;
    }
    return true;
  }(t2))
    return false;
  try {
    return new RegExp(t2).test(e2);
  } catch (e3) {
    return false;
  }
};
class An {
  constructor() {
    i(this, "events", {}), this.events = {};
  }
  on(e2, t2) {
    return this.events[e2] || (this.events[e2] = []), this.events[e2].push(t2), () => {
      this.events[e2] = this.events[e2].filter((e3) => e3 !== t2);
    };
  }
  emit(e2, t2) {
    for (var i2 of this.events[e2] || [])
      i2(t2);
    for (var s2 of this.events["*"] || [])
      s2(e2, t2);
  }
}
class On {
  constructor(e2) {
    i(this, "_debugEventEmitter", new An()), i(this, "checkStep", (e3, t2) => this.checkStepEvent(e3, t2) && this.checkStepUrl(e3, t2) && this.checkStepElement(e3, t2)), i(this, "checkStepEvent", (e3, t2) => null == t2 || !t2.event || (null == e3 ? void 0 : e3.event) === (null == t2 ? void 0 : t2.event)), this.instance = e2, this.actionEvents = /* @__PURE__ */ new Set(), this.actionRegistry = /* @__PURE__ */ new Set();
  }
  init() {
    var e2;
    if (!$(null === (e2 = this.instance) || void 0 === e2 ? void 0 : e2._addCaptureHook)) {
      var t2;
      null === (t2 = this.instance) || void 0 === t2 || t2._addCaptureHook((e3, t3) => {
        this.on(e3, t3);
      });
    }
  }
  register(e2) {
    var t2, i2;
    if (!$(null === (t2 = this.instance) || void 0 === t2 ? void 0 : t2._addCaptureHook) && (e2.forEach((e3) => {
      var t3, i3;
      null === (t3 = this.actionRegistry) || void 0 === t3 || t3.add(e3), null === (i3 = e3.steps) || void 0 === i3 || i3.forEach((e4) => {
        var t4;
        null === (t4 = this.actionEvents) || void 0 === t4 || t4.add((null == e4 ? void 0 : e4.event) || "");
      });
    }), null !== (i2 = this.instance) && void 0 !== i2 && i2.autocapture)) {
      var s2, r2 = /* @__PURE__ */ new Set();
      e2.forEach((e3) => {
        var t3;
        null === (t3 = e3.steps) || void 0 === t3 || t3.forEach((e4) => {
          null != e4 && e4.selector && r2.add(null == e4 ? void 0 : e4.selector);
        });
      }), null === (s2 = this.instance) || void 0 === s2 || s2.autocapture.setElementSelectors(r2);
    }
  }
  on(e2, t2) {
    var i2;
    null != t2 && 0 != e2.length && (this.actionEvents.has(e2) || this.actionEvents.has(null == t2 ? void 0 : t2.event)) && this.actionRegistry && (null === (i2 = this.actionRegistry) || void 0 === i2 ? void 0 : i2.size) > 0 && this.actionRegistry.forEach((e3) => {
      this.checkAction(t2, e3) && this._debugEventEmitter.emit("actionCaptured", e3.name);
    });
  }
  _addActionHook(e2) {
    this.onAction("actionCaptured", (t2) => e2(t2));
  }
  checkAction(e2, t2) {
    if (null == (null == t2 ? void 0 : t2.steps))
      return false;
    for (var i2 of t2.steps)
      if (this.checkStep(e2, i2))
        return true;
    return false;
  }
  onAction(e2, t2) {
    return this._debugEventEmitter.on(e2, t2);
  }
  checkStepUrl(e2, t2) {
    if (null != t2 && t2.url) {
      var i2, s2 = null == e2 || null === (i2 = e2.properties) || void 0 === i2 ? void 0 : i2.$current_url;
      if (!s2 || "string" != typeof s2)
        return false;
      if (!On.matchString(s2, null == t2 ? void 0 : t2.url, (null == t2 ? void 0 : t2.url_matching) || "contains"))
        return false;
    }
    return true;
  }
  static matchString(e2, t2, i2) {
    switch (i2) {
      case "regex":
        return !!n && $n(e2, t2);
      case "exact":
        return t2 === e2;
      case "contains":
        var s2 = On.escapeStringRegexp(t2).replace(/_/g, ".").replace(/%/g, ".*");
        return $n(e2, s2);
      default:
        return false;
    }
  }
  static escapeStringRegexp(e2) {
    return e2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  checkStepElement(e2, t2) {
    if ((null != t2 && t2.href || null != t2 && t2.tag_name || null != t2 && t2.text) && !this.getElementsList(e2).some((e3) => !(null != t2 && t2.href && !On.matchString(e3.href || "", null == t2 ? void 0 : t2.href, (null == t2 ? void 0 : t2.href_matching) || "exact")) && ((null == t2 || !t2.tag_name || e3.tag_name === (null == t2 ? void 0 : t2.tag_name)) && !(null != t2 && t2.text && !On.matchString(e3.text || "", null == t2 ? void 0 : t2.text, (null == t2 ? void 0 : t2.text_matching) || "exact") && !On.matchString(e3.$el_text || "", null == t2 ? void 0 : t2.text, (null == t2 ? void 0 : t2.text_matching) || "exact")))))
      return false;
    if (null != t2 && t2.selector) {
      var i2, s2 = null == e2 || null === (i2 = e2.properties) || void 0 === i2 ? void 0 : i2.$element_selectors;
      if (!s2)
        return false;
      if (!s2.includes(null == t2 ? void 0 : t2.selector))
        return false;
    }
    return true;
  }
  getElementsList(e2) {
    return null == (null == e2 ? void 0 : e2.properties.$elements) ? [] : null == e2 ? void 0 : e2.properties.$elements;
  }
}
class Mn {
  constructor(e2) {
    this.instance = e2, this.eventToSurveys = /* @__PURE__ */ new Map(), this.actionToSurveys = /* @__PURE__ */ new Map();
  }
  register(e2) {
    var t2;
    $(null === (t2 = this.instance) || void 0 === t2 ? void 0 : t2._addCaptureHook) || (this.setupEventBasedSurveys(e2), this.setupActionBasedSurveys(e2));
  }
  setupActionBasedSurveys(e2) {
    var t2 = e2.filter((e3) => {
      var t3, i2, s2, r2;
      return (null === (t3 = e3.conditions) || void 0 === t3 ? void 0 : t3.actions) && (null === (i2 = e3.conditions) || void 0 === i2 || null === (s2 = i2.actions) || void 0 === s2 || null === (r2 = s2.values) || void 0 === r2 ? void 0 : r2.length) > 0;
    });
    if (0 !== t2.length) {
      if (null == this.actionMatcher) {
        this.actionMatcher = new On(this.instance), this.actionMatcher.init();
        this.actionMatcher._addActionHook((e3) => {
          this.onAction(e3);
        });
      }
      t2.forEach((e3) => {
        var t3, i2, s2, r2, n2, o2, a2, l2, c2, u2;
        e3.conditions && null !== (t3 = e3.conditions) && void 0 !== t3 && t3.actions && null !== (i2 = e3.conditions) && void 0 !== i2 && null !== (s2 = i2.actions) && void 0 !== s2 && s2.values && (null === (r2 = e3.conditions) || void 0 === r2 || null === (n2 = r2.actions) || void 0 === n2 || null === (o2 = n2.values) || void 0 === o2 ? void 0 : o2.length) > 0 && (null === (a2 = this.actionMatcher) || void 0 === a2 || a2.register(e3.conditions.actions.values), null === (l2 = e3.conditions) || void 0 === l2 || null === (c2 = l2.actions) || void 0 === c2 || null === (u2 = c2.values) || void 0 === u2 || u2.forEach((t4) => {
          if (t4 && t4.name) {
            var i3 = this.actionToSurveys.get(t4.name);
            i3 && i3.push(e3.id), this.actionToSurveys.set(t4.name, i3 || [e3.id]);
          }
        }));
      });
    }
  }
  setupEventBasedSurveys(e2) {
    var t2;
    if (0 !== e2.filter((e3) => {
      var t3, i2, s2, r2;
      return (null === (t3 = e3.conditions) || void 0 === t3 ? void 0 : t3.events) && (null === (i2 = e3.conditions) || void 0 === i2 || null === (s2 = i2.events) || void 0 === s2 || null === (r2 = s2.values) || void 0 === r2 ? void 0 : r2.length) > 0;
    }).length) {
      null === (t2 = this.instance) || void 0 === t2 || t2._addCaptureHook((e3, t3) => {
        this.onEvent(e3, t3);
      }), e2.forEach((e3) => {
        var t3, i2, s2;
        null === (t3 = e3.conditions) || void 0 === t3 || null === (i2 = t3.events) || void 0 === i2 || null === (s2 = i2.values) || void 0 === s2 || s2.forEach((t4) => {
          if (t4 && t4.name) {
            var i3 = this.eventToSurveys.get(t4.name);
            i3 && i3.push(e3.id), this.eventToSurveys.set(t4.name, i3 || [e3.id]);
          }
        });
      });
    }
  }
  onEvent(e2, t2) {
    var i2, s2, r2 = (null === (i2 = this.instance) || void 0 === i2 || null === (s2 = i2.persistence) || void 0 === s2 ? void 0 : s2.props[$e]) || [];
    if (Mn.SURVEY_SHOWN_EVENT_NAME == e2 && t2 && r2.length > 0) {
      var n2, o2 = null == t2 || null === (n2 = t2.properties) || void 0 === n2 ? void 0 : n2.$survey_id;
      if (o2) {
        var a2 = r2.indexOf(o2);
        a2 >= 0 && (r2.splice(a2, 1), this._updateActivatedSurveys(r2));
      }
    } else
      this.eventToSurveys.has(e2) && this._updateActivatedSurveys(r2.concat(this.eventToSurveys.get(e2) || []));
  }
  onAction(e2) {
    var t2, i2, s2 = (null === (t2 = this.instance) || void 0 === t2 || null === (i2 = t2.persistence) || void 0 === i2 ? void 0 : i2.props[$e]) || [];
    this.actionToSurveys.has(e2) && this._updateActivatedSurveys(s2.concat(this.actionToSurveys.get(e2) || []));
  }
  _updateActivatedSurveys(e2) {
    var t2, i2;
    null === (t2 = this.instance) || void 0 === t2 || null === (i2 = t2.persistence) || void 0 === i2 || i2.register({ [$e]: [...new Set(e2)] });
  }
  getSurveys() {
    var e2, t2, i2 = null === (e2 = this.instance) || void 0 === e2 || null === (t2 = e2.persistence) || void 0 === t2 ? void 0 : t2.props[$e];
    return i2 || [];
  }
  getEventToSurveys() {
    return this.eventToSurveys;
  }
  _getActionMatcher() {
    return this.actionMatcher;
  }
}
i(Mn, "SURVEY_SHOWN_EVENT_NAME", "survey shown");
var Ln = W("[Surveys]"), Dn = { icontains: (e2, t2) => e2.some((e3) => t2.toLowerCase().includes(e3.toLowerCase())), not_icontains: (e2, t2) => e2.every((e3) => !t2.toLowerCase().includes(e3.toLowerCase())), regex: (e2, t2) => e2.some((e3) => $n(t2, e3)), not_regex: (e2, t2) => e2.every((e3) => !$n(t2, e3)), exact: (e2, t2) => e2.some((e3) => t2 === e3), is_not: (e2, t2) => e2.every((e3) => t2 !== e3) };
function qn(e2) {
  return null != e2 ? e2 : "icontains";
}
class Nn {
  constructor(e2) {
    i(this, "_isFetchingSurveys", false), i(this, "_isInitializingSurveys", false), this.instance = e2, this._surveyEventReceiver = null;
  }
  onRemoteConfig(e2) {
    this._decideServerResponse = !!e2.surveys, Ln.info("decideServerResponse set to ".concat(this._decideServerResponse)), this.loadIfEnabled();
  }
  reset() {
    localStorage.removeItem("lastSeenSurveyDate");
    var e2 = (() => {
      for (var e3 = [], t2 = 0; t2 < localStorage.length; t2++) {
        var i2 = localStorage.key(t2);
        null != i2 && i2.startsWith("seenSurvey_") && e3.push(i2);
      }
      return e3;
    })();
    e2.forEach((e3) => localStorage.removeItem(e3));
  }
  loadIfEnabled() {
    if (!this._surveyManager)
      if (this._isInitializingSurveys)
        Ln.info("Already initializing surveys, skipping...");
      else if (this.instance.config.disable_surveys)
        Ln.info("Disabled. Not loading surveys.");
      else {
        var e2 = null == f ? void 0 : f.__PosthogExtensions__;
        if (e2)
          if (this._decideServerResponse) {
            this._isInitializingSurveys = true;
            try {
              var t2 = e2.generateSurveys;
              if (t2)
                this._surveyManager = t2(this.instance), this._isInitializingSurveys = false, this._surveyEventReceiver = new Mn(this.instance), Ln.info("Surveys loaded successfully");
              else {
                var i2 = e2.loadExternalDependency;
                i2 ? i2(this.instance, "surveys", (t3) => {
                  if (t3 || !e2.generateSurveys)
                    return Ln.error("Could not load surveys script", t3), void (this._isInitializingSurveys = false);
                  this._surveyManager = e2.generateSurveys(this.instance), this._isInitializingSurveys = false, this._surveyEventReceiver = new Mn(this.instance), Ln.info("Surveys loaded successfully");
                }) : (Ln.error("PostHog loadExternalDependency extension not found. Cannot load remote config."), this._isInitializingSurveys = false);
              }
            } catch (e3) {
              throw Ln.error("Error initializing surveys", e3), this._isInitializingSurveys = false, e3;
            }
          } else
            Ln.warn("Decide not loaded yet. Not loading surveys.");
        else
          Ln.error("PostHog Extensions not found.");
      }
  }
  getSurveys(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (this.instance.config.disable_surveys)
      return Ln.info("Disabled. Not loading surveys."), e2([]);
    var i2 = this.instance.get_property(Te);
    if (i2 && !t2)
      return e2(i2);
    if (this._isFetchingSurveys)
      return e2([]);
    try {
      this._isFetchingSurveys = true, this.instance._send_request({ url: this.instance.requestRouter.endpointFor("api", "/api/surveys/?token=".concat(this.instance.config.token)), method: "GET", timeout: this.instance.config.surveys_request_timeout_ms, callback: (t3) => {
        var i3;
        this._isFetchingSurveys = false;
        var s2 = t3.statusCode;
        if (200 !== s2 || !t3.json)
          return Ln.error("Surveys API could not be loaded, status: ".concat(s2)), e2([]);
        var r2, n2 = t3.json.surveys || [], o2 = n2.filter((e3) => {
          var t4, i4, s3, r3, n3, o3, a2, l2, c2, u2, d2, h2;
          return (null === (t4 = e3.conditions) || void 0 === t4 ? void 0 : t4.events) && (null === (i4 = e3.conditions) || void 0 === i4 || null === (s3 = i4.events) || void 0 === s3 ? void 0 : s3.values) && (null === (r3 = e3.conditions) || void 0 === r3 || null === (n3 = r3.events) || void 0 === n3 || null === (o3 = n3.values) || void 0 === o3 ? void 0 : o3.length) > 0 || (null === (a2 = e3.conditions) || void 0 === a2 ? void 0 : a2.actions) && (null === (l2 = e3.conditions) || void 0 === l2 || null === (c2 = l2.actions) || void 0 === c2 ? void 0 : c2.values) && (null === (u2 = e3.conditions) || void 0 === u2 || null === (d2 = u2.actions) || void 0 === d2 || null === (h2 = d2.values) || void 0 === h2 ? void 0 : h2.length) > 0;
        });
        o2.length > 0 && (null === (r2 = this._surveyEventReceiver) || void 0 === r2 || r2.register(o2));
        return null === (i3 = this.instance.persistence) || void 0 === i3 || i3.register({ [Te]: n2 }), e2(n2);
      } });
    } catch (e3) {
      throw this._isFetchingSurveys = false, e3;
    }
  }
  isSurveyFeatureFlagEnabled(e2) {
    return !e2 || this.instance.featureFlags.isFeatureEnabled(e2);
  }
  getActiveMatchingSurveys(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    this.getSurveys((t3) => {
      var i2, s2 = t3.filter((e3) => !(!e3.start_date || e3.end_date)).filter((e3) => {
        var t4;
        if (!e3.conditions)
          return true;
        var i3 = function(e4) {
          var t5, i4, s4;
          if (null === (t5 = e4.conditions) || void 0 === t5 || !t5.url)
            return true;
          var r4 = null == n || null === (i4 = n.location) || void 0 === i4 ? void 0 : i4.href;
          if (!r4)
            return false;
          var o3 = [e4.conditions.url];
          return Dn[qn(null === (s4 = e4.conditions) || void 0 === s4 ? void 0 : s4.urlMatchType)](o3, r4);
        }(e3), s3 = null === (t4 = e3.conditions) || void 0 === t4 || !t4.selector || (null == d ? void 0 : d.querySelector(e3.conditions.selector)), r3 = function(e4) {
          var t5, i4, s4;
          if (null === (t5 = e4.conditions) || void 0 === t5 || !t5.deviceTypes || 0 === (null === (i4 = e4.conditions) || void 0 === i4 ? void 0 : i4.deviceTypes.length))
            return true;
          if (!v)
            return false;
          var r4 = zr.deviceType(v);
          return Dn[qn(null === (s4 = e4.conditions) || void 0 === s4 ? void 0 : s4.deviceTypesMatchType)](e4.conditions.deviceTypes, r4);
        }(e3);
        return i3 && s3 && r3;
      }), r2 = null === (i2 = this._surveyEventReceiver) || void 0 === i2 ? void 0 : i2.getSurveys(), o2 = s2.filter((e3) => {
        var t4, i3, s3, n2, o3, a2, l2, c2, u2;
        if (!(e3.linked_flag_key || e3.targeting_flag_key || e3.internal_targeting_flag_key || null !== (t4 = e3.feature_flag_keys) && void 0 !== t4 && t4.length))
          return true;
        var d2 = this.isSurveyFeatureFlagEnabled(e3.linked_flag_key), h2 = this.isSurveyFeatureFlagEnabled(e3.targeting_flag_key), _2 = (null !== (i3 = null === (s3 = e3.conditions) || void 0 === s3 || null === (n2 = s3.events) || void 0 === n2 || null === (o3 = n2.values) || void 0 === o3 ? void 0 : o3.length) && void 0 !== i3 ? i3 : 0) > 0, p2 = (null !== (a2 = null === (l2 = e3.conditions) || void 0 === l2 || null === (c2 = l2.actions) || void 0 === c2 || null === (u2 = c2.values) || void 0 === u2 ? void 0 : u2.length) && void 0 !== a2 ? a2 : 0) > 0, g2 = !_2 && !p2 || (null == r2 ? void 0 : r2.includes(e3.id)), v2 = this._canActivateRepeatedly(e3) || this.isSurveyFeatureFlagEnabled(e3.internal_targeting_flag_key), f2 = this.checkFlags(e3);
        return d2 && h2 && v2 && g2 && f2;
      });
      return e2(o2);
    }, t2);
  }
  checkFlags(e2) {
    var t2;
    return null === (t2 = e2.feature_flag_keys) || void 0 === t2 || !t2.length || e2.feature_flag_keys.every((e3) => {
      var { key: t3, value: i2 } = e3;
      return !t3 || !i2 || this.instance.featureFlags.isFeatureEnabled(i2);
    });
  }
  _canActivateRepeatedly(e2) {
    var t2;
    return L(null === (t2 = f.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.canActivateRepeatedly) ? (Ln.warn("init was not called"), false) : f.__PosthogExtensions__.canActivateRepeatedly(e2);
  }
  canRenderSurvey(e2) {
    L(this._surveyManager) ? Ln.warn("init was not called") : this.getSurveys((t2) => {
      var i2 = t2.filter((t3) => t3.id === e2)[0];
      this._surveyManager.canRenderSurvey(i2);
    });
  }
  renderSurvey(e2, t2) {
    L(this._surveyManager) ? Ln.warn("init was not called") : this.getSurveys((i2) => {
      var s2 = i2.filter((t3) => t3.id === e2)[0];
      this._surveyManager.renderSurvey(s2, null == d ? void 0 : d.querySelector(t2));
    });
  }
}
var Bn = W("[RateLimiter]");
class Hn {
  constructor(e2) {
    var t2, s2;
    i(this, "serverLimits", {}), i(this, "lastEventRateLimited", false), i(this, "checkForLimiting", (e3) => {
      var t3 = e3.text;
      if (t3 && t3.length)
        try {
          (JSON.parse(t3).quota_limited || []).forEach((e4) => {
            Bn.info("".concat(e4 || "events", " is quota limited.")), this.serverLimits[e4] = new Date().getTime() + 6e4;
          });
        } catch (e4) {
          return void Bn.warn('could not rate limit - continuing. Error: "'.concat(null == e4 ? void 0 : e4.message, '"'), { text: t3 });
        }
    }), this.instance = e2, this.captureEventsPerSecond = (null === (t2 = e2.config.rate_limiting) || void 0 === t2 ? void 0 : t2.events_per_second) || 10, this.captureEventsBurstLimit = Math.max((null === (s2 = e2.config.rate_limiting) || void 0 === s2 ? void 0 : s2.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond), this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
  }
  clientRateLimitContext() {
    var e2, t2, i2, s2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r2 = new Date().getTime(), n2 = null !== (e2 = null === (t2 = this.instance.persistence) || void 0 === t2 ? void 0 : t2.get_property(Le)) && void 0 !== e2 ? e2 : { tokens: this.captureEventsBurstLimit, last: r2 };
    n2.tokens += (r2 - n2.last) / 1e3 * this.captureEventsPerSecond, n2.last = r2, n2.tokens > this.captureEventsBurstLimit && (n2.tokens = this.captureEventsBurstLimit);
    var o2 = n2.tokens < 1;
    return o2 || s2 || (n2.tokens = Math.max(0, n2.tokens - 1)), !o2 || this.lastEventRateLimited || s2 || this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to ".concat(this.captureEventsPerSecond, " events per second and ").concat(this.captureEventsBurstLimit, " events burst limit.") }, { skip_client_rate_limiting: true }), this.lastEventRateLimited = o2, null === (i2 = this.instance.persistence) || void 0 === i2 || i2.set_property(Le, n2), { isRateLimited: o2, remainingTokens: n2.tokens };
  }
  isServerRateLimited(e2) {
    var t2 = this.serverLimits[e2 || "events"] || false;
    return false !== t2 && new Date().getTime() < t2;
  }
}
var Un = W("[RemoteConfig]");
class zn {
  constructor(e2) {
    this.instance = e2;
  }
  get remoteConfig() {
    var e2, t2;
    return null === (e2 = f._POSTHOG_REMOTE_CONFIG) || void 0 === e2 || null === (t2 = e2[this.instance.config.token]) || void 0 === t2 ? void 0 : t2.config;
  }
  _loadRemoteConfigJs(e2) {
    var t2, i2, s2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.loadExternalDependency ? null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this.instance, "remote-config", () => e2(this.remoteConfig)) : (Un.error("PostHog Extensions not found. Cannot load remote config."), e2());
  }
  _loadRemoteConfigJSON(e2) {
    this.instance._send_request({ method: "GET", url: this.instance.requestRouter.endpointFor("assets", "/array/".concat(this.instance.config.token, "/config")), callback: (t2) => {
      e2(t2.json);
    } });
  }
  load() {
    try {
      if (this.remoteConfig)
        return Un.info("Using preloaded remote config", this.remoteConfig), void this.onRemoteConfig(this.remoteConfig);
      if (this.instance.config.advanced_disable_decide)
        return void Un.warn("Remote config is disabled. Falling back to local config.");
      this._loadRemoteConfigJs((e2) => {
        if (!e2)
          return Un.info("No config found after loading remote JS config. Falling back to JSON."), void this._loadRemoteConfigJSON((e3) => {
            this.onRemoteConfig(e3);
          });
        this.onRemoteConfig(e2);
      });
    } catch (e2) {
      Un.error("Error loading remote config", e2);
    }
  }
  onRemoteConfig(e2) {
    e2 ? this.instance.config.__preview_remote_config ? (this.instance._onRemoteConfig(e2), false !== e2.hasFeatureFlags && this.instance.featureFlags.ensureFlagsLoaded()) : Un.info("__preview_remote_config is disabled. Logging config instead", e2) : Un.error("Failed to fetch remote config from PostHog.");
  }
}
var jn = function(e2) {
  var t2, i2, s2, r2, n2 = "";
  for (t2 = i2 = 0, s2 = (e2 = (e2 + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, r2 = 0; r2 < s2; r2++) {
    var o2 = e2.charCodeAt(r2), a2 = null;
    o2 < 128 ? i2++ : a2 = o2 > 127 && o2 < 2048 ? String.fromCharCode(o2 >> 6 | 192, 63 & o2 | 128) : String.fromCharCode(o2 >> 12 | 224, o2 >> 6 & 63 | 128, 63 & o2 | 128), M(a2) || (i2 > t2 && (n2 += e2.substring(t2, i2)), n2 += a2, t2 = i2 = r2 + 1);
  }
  return i2 > t2 && (n2 += e2.substring(t2, e2.length)), n2;
}, Wn = !!p || !!_, Vn = "text/plain", Gn = (e2, i2) => {
  var [s2, r2] = e2.split("?"), n2 = t({}, i2);
  null == r2 || r2.split("&").forEach((e3) => {
    var [t2] = e3.split("=");
    delete n2[t2];
  });
  var o2 = wt(n2);
  return o2 = o2 ? (r2 ? r2 + "&" : "") + o2 : r2, "".concat(s2, "?").concat(o2);
}, Jn = (e2, t2) => JSON.stringify(e2, (e3, t3) => "bigint" == typeof t3 ? t3.toString() : t3, t2), Yn = (e2) => {
  var { data: t2, compression: i2 } = e2;
  if (t2) {
    if (i2 === r.GZipJS) {
      var s2 = ss(rs(Jn(t2)), { mtime: 0 }), n2 = new Blob([s2], { type: Vn });
      return { contentType: Vn, body: n2, estimatedSize: n2.size };
    }
    if (i2 === r.Base64) {
      var o2 = function(e3) {
        var t3, i3, s3, r2, n3, o3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a3 = 0, l3 = 0, c2 = "", u2 = [];
        if (!e3)
          return e3;
        e3 = jn(e3);
        do {
          t3 = (n3 = e3.charCodeAt(a3++) << 16 | e3.charCodeAt(a3++) << 8 | e3.charCodeAt(a3++)) >> 18 & 63, i3 = n3 >> 12 & 63, s3 = n3 >> 6 & 63, r2 = 63 & n3, u2[l3++] = o3.charAt(t3) + o3.charAt(i3) + o3.charAt(s3) + o3.charAt(r2);
        } while (a3 < e3.length);
        switch (c2 = u2.join(""), e3.length % 3) {
          case 1:
            c2 = c2.slice(0, -2) + "==";
            break;
          case 2:
            c2 = c2.slice(0, -1) + "=";
        }
        return c2;
      }(Jn(t2)), a2 = ((e3) => "data=" + encodeURIComponent("string" == typeof e3 ? e3 : Jn(e3)))(o2);
      return { contentType: "application/x-www-form-urlencoded", body: a2, estimatedSize: new Blob([a2]).size };
    }
    var l2 = Jn(t2);
    return { contentType: "application/json", body: l2, estimatedSize: new Blob([l2]).size };
  }
}, Kn = [];
_ && Kn.push({ transport: "fetch", method: (e2) => {
  var i2, s2, { contentType: r2, body: n2, estimatedSize: o2 } = null !== (i2 = Yn(e2)) && void 0 !== i2 ? i2 : {}, a2 = new Headers();
  J(e2.headers, function(e3, t2) {
    a2.append(t2, e3);
  }), r2 && a2.append("Content-Type", r2);
  var l2 = e2.url, c2 = null;
  if (g) {
    var u2 = new g();
    c2 = { signal: u2.signal, timeout: setTimeout(() => u2.abort(), e2.timeout) };
  }
  _(l2, t({ method: (null == e2 ? void 0 : e2.method) || "GET", headers: a2, keepalive: "POST" === e2.method && (o2 || 0) < 52428.8, body: n2, signal: null === (s2 = c2) || void 0 === s2 ? void 0 : s2.signal }, e2.fetchOptions)).then((t2) => t2.text().then((i3) => {
    var s3, r3 = { statusCode: t2.status, text: i3 };
    if (200 === t2.status)
      try {
        r3.json = JSON.parse(i3);
      } catch (e3) {
        j.error(e3);
      }
    null === (s3 = e2.callback) || void 0 === s3 || s3.call(e2, r3);
  })).catch((t2) => {
    var i3;
    j.error(t2), null === (i3 = e2.callback) || void 0 === i3 || i3.call(e2, { statusCode: 0, text: t2 });
  }).finally(() => c2 ? clearTimeout(c2.timeout) : null);
} }), p && Kn.push({ transport: "XHR", method: (e2) => {
  var t2, i2 = new p();
  i2.open(e2.method || "GET", e2.url, true);
  var { contentType: s2, body: r2 } = null !== (t2 = Yn(e2)) && void 0 !== t2 ? t2 : {};
  J(e2.headers, function(e3, t3) {
    i2.setRequestHeader(t3, e3);
  }), s2 && i2.setRequestHeader("Content-Type", s2), e2.timeout && (i2.timeout = e2.timeout), i2.withCredentials = true, i2.onreadystatechange = () => {
    if (4 === i2.readyState) {
      var t3, s3 = { statusCode: i2.status, text: i2.responseText };
      if (200 === i2.status)
        try {
          s3.json = JSON.parse(i2.responseText);
        } catch (e3) {
        }
      null === (t3 = e2.callback) || void 0 === t3 || t3.call(e2, s3);
    }
  }, i2.send(r2);
} }), null != u && u.sendBeacon && Kn.push({ transport: "sendBeacon", method: (e2) => {
  var t2 = Gn(e2.url, { beacon: "1" });
  try {
    var i2, { contentType: s2, body: r2 } = null !== (i2 = Yn(e2)) && void 0 !== i2 ? i2 : {}, n2 = "string" == typeof r2 ? new Blob([r2], { type: s2 }) : r2;
    u.sendBeacon(t2, n2);
  } catch (e3) {
  }
} });
var Xn = 3e3;
class Qn {
  constructor(e2, t2) {
    i(this, "isPaused", true), i(this, "queue", []), this.flushTimeoutMs = bi((null == t2 ? void 0 : t2.flush_interval_ms) || Xn, 250, 5e3, "flush interval", Xn), this.sendRequest = e2;
  }
  enqueue(e2) {
    this.queue.push(e2), this.flushTimeout || this.setFlushTimeout();
  }
  unload() {
    this.clearFlushTimeout();
    var e2 = this.queue.length > 0 ? this.formatQueue() : {}, i2 = Object.values(e2), s2 = [...i2.filter((e3) => 0 === e3.url.indexOf("/e")), ...i2.filter((e3) => 0 !== e3.url.indexOf("/e"))];
    s2.map((e3) => {
      this.sendRequest(t(t({}, e3), {}, { transport: "sendBeacon" }));
    });
  }
  enable() {
    this.isPaused = false, this.setFlushTimeout();
  }
  setFlushTimeout() {
    var e2 = this;
    this.isPaused || (this.flushTimeout = setTimeout(() => {
      if (this.clearFlushTimeout(), this.queue.length > 0) {
        var t2 = this.formatQueue(), i2 = function(i3) {
          var s3 = t2[i3], r2 = new Date().getTime();
          s3.data && C(s3.data) && J(s3.data, (e3) => {
            e3.offset = Math.abs(e3.timestamp - r2), delete e3.timestamp;
          }), e2.sendRequest(s3);
        };
        for (var s2 in t2)
          i2(s2);
      }
    }, this.flushTimeoutMs));
  }
  clearFlushTimeout() {
    clearTimeout(this.flushTimeout), this.flushTimeout = void 0;
  }
  formatQueue() {
    var e2 = {};
    return J(this.queue, (i2) => {
      var s2, r2 = i2, n2 = (r2 ? r2.batchKey : null) || r2.url;
      $(e2[n2]) && (e2[n2] = t(t({}, r2), {}, { data: [] })), null === (s2 = e2[n2].data) || void 0 === s2 || s2.push(r2.data);
    }), this.queue = [], e2;
  }
}
var Zn = ["retriesPerformedSoFar"];
class eo {
  constructor(e2) {
    i(this, "isPolling", false), i(this, "pollIntervalMs", 3e3), i(this, "queue", []), this.instance = e2, this.queue = [], this.areWeOnline = true, !$(n) && "onLine" in n.navigator && (this.areWeOnline = n.navigator.onLine, ne(n, "online", () => {
      this.areWeOnline = true, this.flush();
    }), ne(n, "offline", () => {
      this.areWeOnline = false;
    }));
  }
  retriableRequest(e2) {
    var { retriesPerformedSoFar: i2 } = e2, r2 = s(e2, Zn);
    D(i2) && i2 > 0 && (r2.url = Gn(r2.url, { retry_count: i2 })), this.instance._send_request(t(t({}, r2), {}, { callback: (e3) => {
      var s2;
      200 !== e3.statusCode && (e3.statusCode < 400 || e3.statusCode >= 500) && (null != i2 ? i2 : 0) < 10 ? this.enqueue(t({ retriesPerformedSoFar: i2 }, r2)) : null === (s2 = r2.callback) || void 0 === s2 || s2.call(r2, e3);
    } }));
  }
  enqueue(e2) {
    var t2 = e2.retriesPerformedSoFar || 0;
    e2.retriesPerformedSoFar = t2 + 1;
    var i2 = function(e3) {
      var t3 = 3e3 * Math.pow(2, e3), i3 = t3 / 2, s3 = Math.min(18e5, t3), r3 = (Math.random() - 0.5) * (s3 - i3);
      return Math.ceil(s3 + r3);
    }(t2), s2 = Date.now() + i2;
    this.queue.push({ retryAt: s2, requestOptions: e2 });
    var r2 = "Enqueued failed request for retry in ".concat(i2);
    navigator.onLine || (r2 += " (Browser is offline)"), j.warn(r2), this.isPolling || (this.isPolling = true, this.poll());
  }
  poll() {
    this.poller && clearTimeout(this.poller), this.poller = setTimeout(() => {
      this.areWeOnline && this.queue.length > 0 && this.flush(), this.poll();
    }, this.pollIntervalMs);
  }
  flush() {
    var e2 = Date.now(), t2 = [], i2 = this.queue.filter((i3) => i3.retryAt < e2 || (t2.push(i3), false));
    if (this.queue = t2, i2.length > 0)
      for (var { requestOptions: s2 } of i2)
        this.retriableRequest(s2);
  }
  unload() {
    for (var { requestOptions: e2 } of (this.poller && (clearTimeout(this.poller), this.poller = void 0), this.queue))
      try {
        this.instance._send_request(t(t({}, e2), {}, { transport: "sendBeacon" }));
      } catch (e3) {
        j.error(e3);
      }
    this.queue = [];
  }
}
class to {
  constructor(e2) {
    i(this, "_updateScrollData", () => {
      var e3, t2, i2, s2;
      this.context || (this.context = {});
      var r2 = this.scrollElement(), n2 = this.scrollY(), o2 = r2 ? Math.max(0, r2.scrollHeight - r2.clientHeight) : 0, a2 = n2 + ((null == r2 ? void 0 : r2.clientHeight) || 0), l2 = (null == r2 ? void 0 : r2.scrollHeight) || 0;
      this.context.lastScrollY = Math.ceil(n2), this.context.maxScrollY = Math.max(n2, null !== (e3 = this.context.maxScrollY) && void 0 !== e3 ? e3 : 0), this.context.maxScrollHeight = Math.max(o2, null !== (t2 = this.context.maxScrollHeight) && void 0 !== t2 ? t2 : 0), this.context.lastContentY = a2, this.context.maxContentY = Math.max(a2, null !== (i2 = this.context.maxContentY) && void 0 !== i2 ? i2 : 0), this.context.maxContentHeight = Math.max(l2, null !== (s2 = this.context.maxContentHeight) && void 0 !== s2 ? s2 : 0);
    }), this.instance = e2;
  }
  getContext() {
    return this.context;
  }
  resetContext() {
    var e2 = this.context;
    return setTimeout(this._updateScrollData, 0), e2;
  }
  startMeasuringScrollPosition() {
    ne(n, "scroll", this._updateScrollData, { capture: true }), ne(n, "scrollend", this._updateScrollData, { capture: true }), ne(n, "resize", this._updateScrollData);
  }
  scrollElement() {
    if (!this.instance.config.scroll_root_selector)
      return null == n ? void 0 : n.document.documentElement;
    var e2 = C(this.instance.config.scroll_root_selector) ? this.instance.config.scroll_root_selector : [this.instance.config.scroll_root_selector];
    for (var t2 of e2) {
      var i2 = null == n ? void 0 : n.document.querySelector(t2);
      if (i2)
        return i2;
    }
  }
  scrollY() {
    if (this.instance.config.scroll_root_selector) {
      var e2 = this.scrollElement();
      return e2 && e2.scrollTop || 0;
    }
    return n && (n.scrollY || n.pageYOffset || n.document.documentElement.scrollTop) || 0;
  }
  scrollX() {
    if (this.instance.config.scroll_root_selector) {
      var e2 = this.scrollElement();
      return e2 && e2.scrollLeft || 0;
    }
    return n && (n.scrollX || n.pageXOffset || n.document.documentElement.scrollLeft) || 0;
  }
}
var io = (e2) => zr.personInfo({ maskPersonalDataProperties: null == e2 ? void 0 : e2.config.mask_personal_data_properties, customPersonalDataProperties: null == e2 ? void 0 : e2.config.custom_personal_data_properties });
class so {
  constructor(e2, t2, s2, r2) {
    i(this, "_onSessionIdCallback", (e3) => {
      var t3 = this._getStored();
      if (!t3 || t3.sessionId !== e3) {
        var i2 = { sessionId: e3, props: this._sessionSourceParamGenerator(this.instance) };
        this._persistence.register({ [Me]: i2 });
      }
    }), this.instance = e2, this._sessionIdManager = t2, this._persistence = s2, this._sessionSourceParamGenerator = r2 || io, this._sessionIdManager.onSessionId(this._onSessionIdCallback);
  }
  _getStored() {
    return this._persistence.props[Me];
  }
  getSetOnceProps() {
    var e2, t2 = null === (e2 = this._getStored()) || void 0 === e2 ? void 0 : e2.props;
    return t2 ? "r" in t2 ? zr.personPropsFromInfo(t2) : { $referring_domain: t2.referringDomain, $pathname: t2.initialPathName, utm_source: t2.utm_source, utm_campaign: t2.utm_campaign, utm_medium: t2.utm_medium, utm_content: t2.utm_content, utm_term: t2.utm_term } : {};
  }
  getSessionProps() {
    var e2 = {};
    return J(ee(this.getSetOnceProps()), (t2, i2) => {
      "$current_url" === i2 && (i2 = "url"), e2["$session_entry_".concat(k(i2))] = t2;
    }), e2;
  }
}
var ro = W("[SessionId]");
class no {
  constructor(e2, t2, s2) {
    var r2;
    if (i(this, "_sessionIdChangedHandlers", []), !e2.persistence)
      throw new Error("SessionIdManager requires a PostHogPersistence instance");
    if (e2.config.__preview_experimental_cookieless_mode)
      throw new Error("SessionIdManager cannot be used with __preview_experimental_cookieless_mode");
    this.config = e2.config, this.persistence = e2.persistence, this._windowId = void 0, this._sessionId = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this._sessionIdGenerator = t2 || Dt, this._windowIdGenerator = s2 || Dt;
    var n2 = this.config.persistence_name || this.config.token, o2 = this.config.session_idle_timeout_seconds || 1800;
    if (this._sessionTimeoutMs = 1e3 * bi(o2, 60, 36e3, "session_idle_timeout_seconds", 1800), e2.register({ $configured_session_timeout_ms: this._sessionTimeoutMs }), this.resetIdleTimer(), this._window_id_storage_key = "ph_" + n2 + "_window_id", this._primary_window_exists_storage_key = "ph_" + n2 + "_primary_window_exists", this._canUseSessionStorage()) {
      var a2 = Qt.parse(this._window_id_storage_key), l2 = Qt.parse(this._primary_window_exists_storage_key);
      a2 && !l2 ? this._windowId = a2 : Qt.remove(this._window_id_storage_key), Qt.set(this._primary_window_exists_storage_key, true);
    }
    if (null !== (r2 = this.config.bootstrap) && void 0 !== r2 && r2.sessionID)
      try {
        var c2 = ((e3) => {
          var t3 = e3.replace(/-/g, "");
          if (32 !== t3.length)
            throw new Error("Not a valid UUID");
          if ("7" !== t3[12])
            throw new Error("Not a UUIDv7");
          return parseInt(t3.substring(0, 12), 16);
        })(this.config.bootstrap.sessionID);
        this._setSessionId(this.config.bootstrap.sessionID, new Date().getTime(), c2);
      } catch (e3) {
        ro.error("Invalid sessionID in bootstrap", e3);
      }
    this._listenToReloadWindow();
  }
  get sessionTimeoutMs() {
    return this._sessionTimeoutMs;
  }
  onSessionId(e2) {
    return $(this._sessionIdChangedHandlers) && (this._sessionIdChangedHandlers = []), this._sessionIdChangedHandlers.push(e2), this._sessionId && e2(this._sessionId, this._windowId), () => {
      this._sessionIdChangedHandlers = this._sessionIdChangedHandlers.filter((t2) => t2 !== e2);
    };
  }
  _canUseSessionStorage() {
    return "memory" !== this.config.persistence && !this.persistence.disabled && Qt.is_supported();
  }
  _setWindowId(e2) {
    e2 !== this._windowId && (this._windowId = e2, this._canUseSessionStorage() && Qt.set(this._window_id_storage_key, e2));
  }
  _getWindowId() {
    return this._windowId ? this._windowId : this._canUseSessionStorage() ? Qt.parse(this._window_id_storage_key) : null;
  }
  _setSessionId(e2, t2, i2) {
    e2 === this._sessionId && t2 === this._sessionActivityTimestamp && i2 === this._sessionStartTimestamp || (this._sessionStartTimestamp = i2, this._sessionActivityTimestamp = t2, this._sessionId = e2, this.persistence.register({ [ke]: [t2, e2, i2] }));
  }
  _getSessionId() {
    if (this._sessionId && this._sessionActivityTimestamp && this._sessionStartTimestamp)
      return [this._sessionActivityTimestamp, this._sessionId, this._sessionStartTimestamp];
    var e2 = this.persistence.props[ke];
    return C(e2) && 2 === e2.length && e2.push(e2[0]), e2 || [0, null, 0];
  }
  resetSessionId() {
    this._setSessionId(null, null, null);
  }
  _listenToReloadWindow() {
    ne(n, "beforeunload", () => {
      this._canUseSessionStorage() && Qt.remove(this._primary_window_exists_storage_key);
    }, { capture: false });
  }
  checkAndGetSessionAndWindowId() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    if (this.config.__preview_experimental_cookieless_mode)
      throw new Error("checkAndGetSessionAndWindowId should not be called in __preview_experimental_cookieless_mode");
    var i2 = t2 || new Date().getTime(), [s2, r2, n2] = this._getSessionId(), o2 = this._getWindowId(), a2 = D(n2) && n2 > 0 && Math.abs(i2 - n2) > 864e5, l2 = false, c2 = !r2, u2 = !e2 && Math.abs(i2 - s2) > this.sessionTimeoutMs;
    c2 || u2 || a2 ? (r2 = this._sessionIdGenerator(), o2 = this._windowIdGenerator(), ro.info("new session ID generated", { sessionId: r2, windowId: o2, changeReason: { noSessionId: c2, activityTimeout: u2, sessionPastMaximumLength: a2 } }), n2 = i2, l2 = true) : o2 || (o2 = this._windowIdGenerator(), l2 = true);
    var d2 = 0 === s2 || !e2 || a2 ? i2 : s2, h2 = 0 === n2 ? new Date().getTime() : n2;
    return this._setWindowId(o2), this._setSessionId(r2, d2, h2), e2 || this.resetIdleTimer(), l2 && this._sessionIdChangedHandlers.forEach((e3) => e3(r2, o2, l2 ? { noSessionId: c2, activityTimeout: u2, sessionPastMaximumLength: a2 } : void 0)), { sessionId: r2, windowId: o2, sessionStartTimestamp: h2, changeReason: l2 ? { noSessionId: c2, activityTimeout: u2, sessionPastMaximumLength: a2 } : void 0, lastActivityTimestamp: s2 };
  }
  resetIdleTimer() {
    clearTimeout(this._enforceIdleTimeout), this._enforceIdleTimeout = setTimeout(() => {
      this.resetSessionId();
    }, 1.1 * this.sessionTimeoutMs);
  }
}
var oo = ["$set_once", "$set"], ao = W("[SiteApps]");
class lo {
  constructor(e2) {
    this.instance = e2, this.bufferedInvocations = [], this.apps = {};
  }
  get isEnabled() {
    return !!this.instance.config.opt_in_site_apps;
  }
  eventCollector(e2, t2) {
    if (t2) {
      var i2 = this.globalsForEvent(t2);
      this.bufferedInvocations.push(i2), this.bufferedInvocations.length > 1e3 && (this.bufferedInvocations = this.bufferedInvocations.slice(10));
    }
  }
  get siteAppLoaders() {
    var e2, t2;
    return null === (e2 = f._POSTHOG_REMOTE_CONFIG) || void 0 === e2 || null === (t2 = e2[this.instance.config.token]) || void 0 === t2 ? void 0 : t2.siteApps;
  }
  init() {
    if (this.isEnabled) {
      var e2 = this.instance._addCaptureHook(this.eventCollector.bind(this));
      this.stopBuffering = () => {
        e2(), this.bufferedInvocations = [], this.stopBuffering = void 0;
      };
    }
  }
  globalsForEvent(e2) {
    var i2, r2, n2, o2, a2, l2, c2;
    if (!e2)
      throw new Error("Event payload is required");
    var u2 = {}, d2 = this.instance.get_property("$groups") || [], h2 = this.instance.get_property("$stored_group_properties") || {};
    for (var [_2, p2] of Object.entries(h2))
      u2[_2] = { id: d2[_2], type: _2, properties: p2 };
    var { $set_once: g2, $set: v2 } = e2;
    return { event: t(t({}, s(e2, oo)), {}, { properties: t(t(t({}, e2.properties), v2 ? { $set: t(t({}, null !== (i2 = null === (r2 = e2.properties) || void 0 === r2 ? void 0 : r2.$set) && void 0 !== i2 ? i2 : {}), v2) } : {}), g2 ? { $set_once: t(t({}, null !== (n2 = null === (o2 = e2.properties) || void 0 === o2 ? void 0 : o2.$set_once) && void 0 !== n2 ? n2 : {}), g2) } : {}), elements_chain: null !== (a2 = null === (l2 = e2.properties) || void 0 === l2 ? void 0 : l2.$elements_chain) && void 0 !== a2 ? a2 : "", distinct_id: null === (c2 = e2.properties) || void 0 === c2 ? void 0 : c2.distinct_id }), person: { properties: this.instance.get_property("$stored_person_properties") }, groups: u2 };
  }
  setupSiteApp(e2) {
    var t2 = this.apps[e2.id], i2 = () => {
      var i3;
      (!t2.errored && this.bufferedInvocations.length && (ao.info("Processing ".concat(this.bufferedInvocations.length, " events for site app with id ").concat(e2.id)), this.bufferedInvocations.forEach((e3) => {
        var i4;
        return null === (i4 = t2.processEvent) || void 0 === i4 ? void 0 : i4.call(t2, e3);
      }), t2.processedBuffer = true), Object.values(this.apps).every((e3) => e3.processedBuffer || e3.errored)) && (null === (i3 = this.stopBuffering) || void 0 === i3 || i3.call(this));
    }, s2 = false, r2 = (r3) => {
      t2.errored = !r3, t2.loaded = true, ao.info("Site app with id ".concat(e2.id, " ").concat(r3 ? "loaded" : "errored")), s2 && i2();
    };
    try {
      var { processEvent: n2 } = e2.init({ posthog: this.instance, callback: (e3) => {
        r2(e3);
      } });
      n2 && (t2.processEvent = n2), s2 = true;
    } catch (t3) {
      ao.error("Error while initializing PostHog app with config id ".concat(e2.id), t3), r2(false);
    }
    if (s2 && t2.loaded)
      try {
        i2();
      } catch (i3) {
        ao.error("Error while processing buffered events PostHog app with config id ".concat(e2.id), i3), t2.errored = true;
      }
  }
  setupSiteApps() {
    var e2 = this.siteAppLoaders || [];
    for (var t2 of e2)
      this.apps[t2.id] = { id: t2.id, loaded: false, errored: false, processedBuffer: false };
    for (var i2 of e2)
      this.setupSiteApp(i2);
  }
  onCapturedEvent(e2) {
    if (0 !== Object.keys(this.apps).length) {
      var t2 = this.globalsForEvent(e2);
      for (var i2 of Object.values(this.apps))
        try {
          var s2;
          null === (s2 = i2.processEvent) || void 0 === s2 || s2.call(i2, t2);
        } catch (t3) {
          ao.error("Error while processing event ".concat(e2.event, " for site app ").concat(i2.id), t3);
        }
    }
  }
  onRemoteConfig(e2) {
    var t2, i2, s2, r2 = this;
    if (null !== (t2 = this.siteAppLoaders) && void 0 !== t2 && t2.length)
      return this.isEnabled ? (this.setupSiteApps(), void this.instance.on("eventCaptured", (e3) => this.onCapturedEvent(e3))) : void ao.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
    if (null === (i2 = this.stopBuffering) || void 0 === i2 || i2.call(this), null !== (s2 = e2.siteApps) && void 0 !== s2 && s2.length)
      if (this.isEnabled) {
        var n2 = function(e3, t3) {
          var i3, s3;
          f["__$$ph_site_app_".concat(e3)] = r2.instance, null === (i3 = f.__PosthogExtensions__) || void 0 === i3 || null === (s3 = i3.loadSiteApp) || void 0 === s3 || s3.call(i3, r2.instance, t3, (t4) => {
            if (t4)
              return ao.error("Error while initializing PostHog app with config id ".concat(e3), t4);
          });
        };
        for (var { id: o2, url: a2 } of e2.siteApps)
          n2(o2, a2);
      } else
        ao.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
  }
}
var co, uo = ["amazonbot", "amazonproductbot", "app.hypefactors.com", "applebot", "archive.org_bot", "awariobot", "backlinksextendedbot", "baiduspider", "bingbot", "bingpreview", "chrome-lighthouse", "dataforseobot", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "http://yandex.com/bots", "hubspot", "ia_archiver", "linkedinbot", "meta-externalagent", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "sebot-wa", "sitebulb", "slackbot", "slurp", "trendictionbot", "turnitin", "twitterbot", "vercelbot", "yahoo! slurp", "yandexbot", "zoombot", "bot.htm", "bot.php", "(bot;", "bot/", "crawler", "ahrefsbot", "ahrefssiteaudit", "semrushbot", "siteauditbot", "splitsignalbot", "gptbot", "oai-searchbot", "chatgpt-user", "perplexitybot", "better uptime bot", "sentryuptimebot", "uptimerobot", "headlesschrome", "cypress", "google-hoteladsverifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleweblight", "mediapartners-google", "storebot-google", "bytespider"], ho = function(e2, t2) {
  if (!e2)
    return false;
  var i2 = e2.toLowerCase();
  return uo.concat(t2 || []).some((e3) => {
    var t3 = e3.toLowerCase();
    return -1 !== i2.indexOf(t3);
  });
}, _o = function(e2, t2) {
  if (!e2)
    return false;
  var i2 = e2.userAgent;
  if (i2 && ho(i2, t2))
    return true;
  try {
    var s2 = null == e2 ? void 0 : e2.userAgentData;
    if (null != s2 && s2.brands && s2.brands.some((e3) => ho(null == e3 ? void 0 : e3.brand, t2)))
      return true;
  } catch (e3) {
  }
  return !!e2.webdriver;
};
function po(e2, t2, i2) {
  return Jn({ distinct_id: e2, userPropertiesToSet: t2, userPropertiesToSetOnce: i2 });
}
!function(e2) {
  e2.US = "us", e2.EU = "eu", e2.CUSTOM = "custom";
}(co || (co = {}));
var go = "i.posthog.com";
class vo {
  constructor(e2) {
    i(this, "_regionCache", {}), this.instance = e2;
  }
  get apiHost() {
    var e2 = this.instance.config.api_host.trim().replace(/\/$/, "");
    return "https://app.posthog.com" === e2 ? "https://us.i.posthog.com" : e2;
  }
  get uiHost() {
    var e2, t2 = null === (e2 = this.instance.config.ui_host) || void 0 === e2 ? void 0 : e2.replace(/\/$/, "");
    return t2 || (t2 = this.apiHost.replace(".".concat(go), ".posthog.com")), "https://app.posthog.com" === t2 ? "https://us.posthog.com" : t2;
  }
  get region() {
    return this._regionCache[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = co.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = co.EU : this._regionCache[this.apiHost] = co.CUSTOM), this._regionCache[this.apiHost];
  }
  endpointFor(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if (t2 && (t2 = "/" === t2[0] ? t2 : "/".concat(t2)), "ui" === e2)
      return this.uiHost + t2;
    if (this.region === co.CUSTOM)
      return this.apiHost + t2;
    var i2 = go + t2;
    switch (e2) {
      case "assets":
        return "https://".concat(this.region, "-assets.").concat(i2);
      case "api":
        return "https://".concat(this.region, ".").concat(i2);
    }
  }
}
var fo = { icontains: (e2, t2) => !!n && t2.href.toLowerCase().indexOf(e2.toLowerCase()) > -1, not_icontains: (e2, t2) => !!n && -1 === t2.href.toLowerCase().indexOf(e2.toLowerCase()), regex: (e2, t2) => !!n && $n(t2.href, e2), not_regex: (e2, t2) => !!n && !$n(t2.href, e2), exact: (e2, t2) => t2.href === e2, is_not: (e2, t2) => t2.href !== e2 };
class mo {
  constructor(e2) {
    var t2 = this;
    i(this, "getWebExperimentsAndEvaluateDisplayLogic", function() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      t2.getWebExperiments((e4) => {
        mo.logInfo("retrieved web experiments from the server"), t2._flagToExperiments = /* @__PURE__ */ new Map(), e4.forEach((e5) => {
          if (e5.feature_flag_key) {
            var i2;
            if (t2._flagToExperiments)
              mo.logInfo("setting flag key ", e5.feature_flag_key, " to web experiment ", e5), null === (i2 = t2._flagToExperiments) || void 0 === i2 || i2.set(e5.feature_flag_key, e5);
            var s2 = t2.instance.getFeatureFlag(e5.feature_flag_key);
            A(s2) && e5.variants[s2] && t2.applyTransforms(e5.name, s2, e5.variants[s2].transforms);
          } else if (e5.variants)
            for (var r2 in e5.variants) {
              var n2 = e5.variants[r2];
              mo.matchesTestVariant(n2) && t2.applyTransforms(e5.name, r2, n2.transforms);
            }
        });
      }, e3);
    }), this.instance = e2, this.instance.onFeatureFlags((e3) => {
      this.onFeatureFlags(e3);
    });
  }
  onFeatureFlags(e2) {
    if (this._is_bot())
      mo.logInfo("Refusing to render web experiment since the viewer is a likely bot");
    else if (!this.instance.config.disable_web_experiments) {
      if (L(this._flagToExperiments))
        return this._flagToExperiments = /* @__PURE__ */ new Map(), this.loadIfEnabled(), void this.previewWebExperiment();
      mo.logInfo("applying feature flags", e2), e2.forEach((e3) => {
        var t2;
        if (this._flagToExperiments && null !== (t2 = this._flagToExperiments) && void 0 !== t2 && t2.has(e3)) {
          var i2, s2 = this.instance.getFeatureFlag(e3), r2 = null === (i2 = this._flagToExperiments) || void 0 === i2 ? void 0 : i2.get(e3);
          s2 && null != r2 && r2.variants[s2] && this.applyTransforms(r2.name, s2, r2.variants[s2].transforms);
        }
      });
    }
  }
  previewWebExperiment() {
    var e2 = mo.getWindowLocation();
    if (null != e2 && e2.search) {
      var t2 = St(null == e2 ? void 0 : e2.search, "__experiment_id"), i2 = St(null == e2 ? void 0 : e2.search, "__experiment_variant");
      t2 && i2 && (mo.logInfo("previewing web experiments ".concat(t2, " && ").concat(i2)), this.getWebExperiments((e3) => {
        this.showPreviewWebExperiment(parseInt(t2), i2, e3);
      }, false, true));
    }
  }
  loadIfEnabled() {
    this.instance.config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
  }
  getWebExperiments(e2, t2, i2) {
    if (this.instance.config.disable_web_experiments && !i2)
      return e2([]);
    var s2 = this.instance.get_property("$web_experiments");
    if (s2 && !t2)
      return e2(s2);
    this.instance._send_request({ url: this.instance.requestRouter.endpointFor("api", "/api/web_experiments/?token=".concat(this.instance.config.token)), method: "GET", callback: (t3) => {
      if (200 !== t3.statusCode || !t3.json)
        return e2([]);
      var i3 = t3.json.experiments || [];
      return e2(i3);
    } });
  }
  showPreviewWebExperiment(e2, t2, i2) {
    var s2 = i2.filter((t3) => t3.id === e2);
    s2 && s2.length > 0 && (mo.logInfo("Previewing web experiment [".concat(s2[0].name, "] with variant [").concat(t2, "]")), this.applyTransforms(s2[0].name, t2, s2[0].variants[t2].transforms));
  }
  static matchesTestVariant(e2) {
    return !L(e2.conditions) && (mo.matchUrlConditions(e2) && mo.matchUTMConditions(e2));
  }
  static matchUrlConditions(e2) {
    var t2;
    if (L(e2.conditions) || L(null === (t2 = e2.conditions) || void 0 === t2 ? void 0 : t2.url))
      return true;
    var i2, s2, r2, n2 = mo.getWindowLocation();
    return !!n2 && (null === (i2 = e2.conditions) || void 0 === i2 || !i2.url || fo[null !== (s2 = null === (r2 = e2.conditions) || void 0 === r2 ? void 0 : r2.urlMatchType) && void 0 !== s2 ? s2 : "icontains"](e2.conditions.url, n2));
  }
  static getWindowLocation() {
    return null == n ? void 0 : n.location;
  }
  static matchUTMConditions(e2) {
    var t2;
    if (L(e2.conditions) || L(null === (t2 = e2.conditions) || void 0 === t2 ? void 0 : t2.utm))
      return true;
    var i2 = zr.campaignParams();
    if (i2.utm_source) {
      var s2, r2, n2, o2, a2, l2, c2, u2, d2, h2, _2, p2, g2, v2, f2, m2, b2 = null === (s2 = e2.conditions) || void 0 === s2 || null === (r2 = s2.utm) || void 0 === r2 || !r2.utm_campaign || (null === (n2 = e2.conditions) || void 0 === n2 || null === (o2 = n2.utm) || void 0 === o2 ? void 0 : o2.utm_campaign) == i2.utm_campaign, y2 = null === (a2 = e2.conditions) || void 0 === a2 || null === (l2 = a2.utm) || void 0 === l2 || !l2.utm_source || (null === (c2 = e2.conditions) || void 0 === c2 || null === (u2 = c2.utm) || void 0 === u2 ? void 0 : u2.utm_source) == i2.utm_source, w2 = null === (d2 = e2.conditions) || void 0 === d2 || null === (h2 = d2.utm) || void 0 === h2 || !h2.utm_medium || (null === (_2 = e2.conditions) || void 0 === _2 || null === (p2 = _2.utm) || void 0 === p2 ? void 0 : p2.utm_medium) == i2.utm_medium, S2 = null === (g2 = e2.conditions) || void 0 === g2 || null === (v2 = g2.utm) || void 0 === v2 || !v2.utm_term || (null === (f2 = e2.conditions) || void 0 === f2 || null === (m2 = f2.utm) || void 0 === m2 ? void 0 : m2.utm_term) == i2.utm_term;
      return b2 && w2 && S2 && y2;
    }
    return false;
  }
  static logInfo(e2) {
    for (var t2 = arguments.length, i2 = new Array(t2 > 1 ? t2 - 1 : 0), s2 = 1; s2 < t2; s2++)
      i2[s2 - 1] = arguments[s2];
    j.info("[WebExperiments] ".concat(e2), i2);
  }
  applyTransforms(e2, t2, i2) {
    this._is_bot() ? mo.logInfo("Refusing to render web experiment since the viewer is a likely bot") : "control" !== t2 ? i2.forEach((i3) => {
      if (i3.selector) {
        var s2;
        mo.logInfo("applying transform of variant ".concat(t2, " for experiment ").concat(e2, " "), i3);
        var r2 = null === (s2 = document) || void 0 === s2 ? void 0 : s2.querySelectorAll(i3.selector);
        null == r2 || r2.forEach((e3) => {
          var t3 = e3;
          i3.html && (t3.innerHTML = i3.html), i3.css && t3.setAttribute("style", i3.css);
        });
      }
    }) : mo.logInfo("Control variants leave the page unmodified.");
  }
  _is_bot() {
    return u && this.instance ? _o(u, this.instance.config.custom_blocked_useragents) : void 0;
  }
}
var bo = {}, yo = () => {
}, wo = "posthog", So = !Wn && -1 === (null == v ? void 0 : v.indexOf("MSIE")) && -1 === (null == v ? void 0 : v.indexOf("Mozilla")), ko = () => {
  var e2;
  return { api_host: "https://us.i.posthog.com", ui_host: null, token: "", autocapture: true, rageclick: true, cross_subdomain_cookie: se(null == d ? void 0 : d.location), persistence: "localStorage+cookie", persistence_name: "", loaded: yo, save_campaign_params: true, custom_campaign_params: [], custom_blocked_useragents: [], save_referrer: true, capture_pageview: true, capture_pageleave: "if_capture_pageview", debug: h && A(null == h ? void 0 : h.search) && -1 !== h.search.indexOf("__posthog_debug=true") || false, cookie_expiration: 365, upgrade: false, disable_session_recording: false, disable_persistence: false, disable_web_experiments: true, disable_surveys: false, disable_external_dependency_loading: false, enable_recording_console_log: void 0, secure_cookie: "https:" === (null == n || null === (e2 = n.location) || void 0 === e2 ? void 0 : e2.protocol), ip: true, opt_out_capturing_by_default: false, opt_out_persistence_by_default: false, opt_out_useragent_filter: false, opt_out_capturing_persistence_type: "localStorage", opt_out_capturing_cookie_prefix: null, opt_in_site_apps: false, property_denylist: [], respect_dnt: false, sanitize_properties: null, request_headers: {}, request_batching: true, properties_string_max_length: 65535, session_recording: {}, mask_all_element_attributes: false, mask_all_text: false, mask_personal_data_properties: false, custom_personal_data_properties: [], advanced_disable_decide: false, advanced_disable_feature_flags: false, advanced_disable_feature_flags_on_first_load: false, advanced_disable_toolbar_metrics: false, feature_flag_request_timeout_ms: 3e3, surveys_request_timeout_ms: 1e4, on_request_error: (e3) => {
    var t2 = "Bad HTTP status: " + e3.statusCode + " " + e3.text;
    j.error(t2);
  }, get_device_id: (e3) => e3, capture_performance: void 0, name: "posthog", bootstrap: {}, disable_compression: false, session_idle_timeout_seconds: 1800, person_profiles: "identified_only", before_send: void 0, request_queue_config: { flush_interval_ms: Xn }, _onCapture: yo };
}, Eo = (e2) => {
  var t2 = {};
  $(e2.process_person) || (t2.person_profiles = e2.process_person), $(e2.xhr_headers) || (t2.request_headers = e2.xhr_headers), $(e2.cookie_name) || (t2.persistence_name = e2.cookie_name), $(e2.disable_cookie) || (t2.disable_persistence = e2.disable_cookie), $(e2.store_google) || (t2.save_campaign_params = e2.store_google), $(e2.verbose) || (t2.debug = e2.verbose);
  var i2 = Y({}, t2, e2);
  return C(e2.property_blacklist) && ($(e2.property_denylist) ? i2.property_denylist = e2.property_blacklist : C(e2.property_denylist) ? i2.property_denylist = [...e2.property_blacklist, ...e2.property_denylist] : j.error("Invalid value for property_denylist config: " + e2.property_denylist)), i2;
};
class xo {
  constructor() {
    i(this, "__forceAllowLocalhost", false);
  }
  get _forceAllowLocalhost() {
    return this.__forceAllowLocalhost;
  }
  set _forceAllowLocalhost(e2) {
    j.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e2;
  }
}
class Io {
  get decideEndpointWasHit() {
    var e2, t2;
    return null !== (e2 = null === (t2 = this.featureFlags) || void 0 === t2 ? void 0 : t2.hasLoadedFlags) && void 0 !== e2 && e2;
  }
  constructor() {
    i(this, "webPerformance", new xo()), i(this, "_personProcessingSetOncePropertiesSent", false), i(this, "version", U.LIB_VERSION), i(this, "_internalEventEmitter", new An()), this.config = ko(), this.SentryIntegration = bs, this.sentryIntegration = (e2) => function(e3, t2) {
      var i2 = ms(e3, t2);
      return { name: fs, processEvent: (e4) => i2(e4) };
    }(this, e2), this.__request_queue = [], this.__loaded = false, this.analyticsDefaultEndpoint = "/e/", this._initialPageviewCaptured = false, this._initialPersonProfilesConfig = null, this._cachedIdentify = null, this.featureFlags = new zs(this), this.toolbar = new Es(this), this.scrollManager = new to(this), this.pageViewManager = new As(this), this.surveys = new Nn(this), this.experiments = new mo(this), this.exceptions = new Os(this), this.rateLimiter = new Hn(this), this.requestRouter = new vo(this), this.consent = new Zt(this), this.people = { set: (e2, t2, i2) => {
      var s2 = A(e2) ? { [e2]: t2 } : e2;
      this.setPersonProperties(s2), null == i2 || i2({});
    }, set_once: (e2, t2, i2) => {
      var s2 = A(e2) ? { [e2]: t2 } : e2;
      this.setPersonProperties(void 0, s2), null == i2 || i2({});
    } }, this.on("eventCaptured", (e2) => j.info('send "'.concat(null == e2 ? void 0 : e2.event, '"'), e2));
  }
  init(e2, t2, i2) {
    if (i2 && i2 !== wo) {
      var s2, r2 = null !== (s2 = bo[i2]) && void 0 !== s2 ? s2 : new Io();
      return r2._init(e2, t2, i2), bo[i2] = r2, bo[wo][i2] = r2, r2;
    }
    return this._init(e2, t2, i2);
  }
  _init(e2) {
    var i2, s2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a2 = arguments.length > 2 ? arguments[2] : void 0;
    if ($(e2) || O(e2))
      return j.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
    if (this.__loaded)
      return j.warn("You have already initialized PostHog! Re-initializing is a no-op"), this;
    this.__loaded = true, this.config = {}, this._triggered_notifs = [], o2.person_profiles && (this._initialPersonProfilesConfig = o2.person_profiles), this.set_config(Y({}, ko(), Eo(o2), { name: a2, token: e2 })), this.config.on_xhr_error && j.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = o2.disable_compression ? void 0 : r.GZipJS, this.persistence = new Wr(this.config), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new Wr(t(t({}, this.config), {}, { persistence: "sessionStorage" }));
    var l2 = t({}, this.persistence.props), c2 = t({}, this.sessionPersistence.props);
    if (this._requestQueue = new Qn((e3) => this._send_retriable_request(e3), this.config.request_queue_config), this._retryQueue = new eo(this), this.__request_queue = [], this.config.__preview_experimental_cookieless_mode || (this.sessionManager = new no(this), this.sessionPropsManager = new so(this, this.sessionManager, this.persistence)), new Is(this).startIfEnabledOrStop(), this.siteApps = new lo(this), null === (i2 = this.siteApps) || void 0 === i2 || i2.init(), this.config.__preview_experimental_cookieless_mode || (this.sessionRecording = new ps(this), this.sessionRecording.startIfEnabledOrStop()), this.config.disable_scroll_properties || this.scrollManager.startMeasuringScrollPosition(), this.autocapture = new Rt(this), this.autocapture.startIfEnabled(), this.surveys.loadIfEnabled(), this.heatmaps = new $s(this), this.heatmaps.startIfEnabled(), this.webVitalsAutocapture = new Fs(this), this.exceptionObserver = new ni(this), this.exceptionObserver.startIfEnabled(), this.deadClicksAutocapture = new si(this, ii), this.deadClicksAutocapture.startIfEnabled(), U.DEBUG = U.DEBUG || this.config.debug, U.DEBUG && j.info("Starting in debug mode", { this: this, config: o2, thisC: t({}, this.config), p: l2, s: c2 }), this._sync_opt_out_with_persistence(), void 0 !== (null === (s2 = o2.bootstrap) || void 0 === s2 ? void 0 : s2.distinctID)) {
      var u2, d2, h2 = this.config.get_device_id(Dt()), _2 = null !== (u2 = o2.bootstrap) && void 0 !== u2 && u2.isIdentifiedID ? h2 : o2.bootstrap.distinctID;
      this.persistence.set_property(Oe, null !== (d2 = o2.bootstrap) && void 0 !== d2 && d2.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: o2.bootstrap.distinctID, $device_id: _2 });
    }
    if (this._hasBootstrappedFeatureFlags()) {
      var p2, g2, v2 = Object.keys((null === (p2 = o2.bootstrap) || void 0 === p2 ? void 0 : p2.featureFlags) || {}).filter((e3) => {
        var t2, i3;
        return !(null === (t2 = o2.bootstrap) || void 0 === t2 || null === (i3 = t2.featureFlags) || void 0 === i3 || !i3[e3]);
      }).reduce((e3, t2) => {
        var i3, s3;
        return e3[t2] = (null === (i3 = o2.bootstrap) || void 0 === i3 || null === (s3 = i3.featureFlags) || void 0 === s3 ? void 0 : s3[t2]) || false, e3;
      }, {}), f2 = Object.keys((null === (g2 = o2.bootstrap) || void 0 === g2 ? void 0 : g2.featureFlagPayloads) || {}).filter((e3) => v2[e3]).reduce((e3, t2) => {
        var i3, s3, r2, n2;
        null !== (i3 = o2.bootstrap) && void 0 !== i3 && null !== (s3 = i3.featureFlagPayloads) && void 0 !== s3 && s3[t2] && (e3[t2] = null === (r2 = o2.bootstrap) || void 0 === r2 || null === (n2 = r2.featureFlagPayloads) || void 0 === n2 ? void 0 : n2[t2]);
        return e3;
      }, {});
      this.featureFlags.receivedFeatureFlags({ featureFlags: v2, featureFlagPayloads: f2 });
    }
    if (this.config.__preview_experimental_cookieless_mode)
      this.register_once({ distinct_id: Ue, $device_id: null }, "");
    else if (!this.get_distinct_id()) {
      var m2 = this.config.get_device_id(Dt());
      this.register_once({ distinct_id: m2, $device_id: m2 }, ""), this.persistence.set_property(Oe, "anonymous");
    }
    return ne(n, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), { passive: false }), this.toolbar.maybeLoadToolbar(), o2.segment ? vs(this, () => this._loaded()) : this._loaded(), F(this.config._onCapture) && this.config._onCapture !== yo && (j.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (e3) => this.config._onCapture(e3.event, e3))), this;
  }
  _onRemoteConfig(e2) {
    var t2, i2, s2, n2, o2, a2, l2, c2;
    if (!d || !d.body)
      return j.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(() => {
        this._onRemoteConfig(e2);
      }, 500);
    this.compression = void 0, e2.supportedCompression && !this.config.disable_compression && (this.compression = w(e2.supportedCompression, r.GZipJS) ? r.GZipJS : w(e2.supportedCompression, r.Base64) ? r.Base64 : void 0), null !== (t2 = e2.analytics) && void 0 !== t2 && t2.endpoint && (this.analyticsDefaultEndpoint = e2.analytics.endpoint), this.set_config({ person_profiles: this._initialPersonProfilesConfig ? this._initialPersonProfilesConfig : "identified_only" }), null === (i2 = this.siteApps) || void 0 === i2 || i2.onRemoteConfig(e2), null === (s2 = this.sessionRecording) || void 0 === s2 || s2.onRemoteConfig(e2), null === (n2 = this.autocapture) || void 0 === n2 || n2.onRemoteConfig(e2), null === (o2 = this.heatmaps) || void 0 === o2 || o2.onRemoteConfig(e2), this.surveys.onRemoteConfig(e2), null === (a2 = this.webVitalsAutocapture) || void 0 === a2 || a2.onRemoteConfig(e2), null === (l2 = this.exceptionObserver) || void 0 === l2 || l2.onRemoteConfig(e2), null === (c2 = this.deadClicksAutocapture) || void 0 === c2 || c2.onRemoteConfig(e2);
  }
  _loaded() {
    try {
      this.config.loaded(this);
    } catch (e2) {
      j.critical("`loaded` function failed", e2);
    }
    this._start_queue_if_opted_in(), this.config.capture_pageview && setTimeout(() => {
      this.consent.isOptedIn() && this._captureInitialPageview();
    }, 1), new zn(this).load(), this.featureFlags.decide();
  }
  _start_queue_if_opted_in() {
    var e2;
    this.has_opted_out_capturing() || this.config.request_batching && (null === (e2 = this._requestQueue) || void 0 === e2 || e2.enable());
  }
  _dom_loaded() {
    this.has_opted_out_capturing() || G(this.__request_queue, (e2) => this._send_retriable_request(e2)), this.__request_queue = [], this._start_queue_if_opted_in();
  }
  _handle_unload() {
    var e2, t2;
    this.config.request_batching ? (this._shouldCapturePageleave() && this.capture("$pageleave"), null === (e2 = this._requestQueue) || void 0 === e2 || e2.unload(), null === (t2 = this._retryQueue) || void 0 === t2 || t2.unload()) : this._shouldCapturePageleave() && this.capture("$pageleave", null, { transport: "sendBeacon" });
  }
  _send_request(e2) {
    this.__loaded && (So ? this.__request_queue.push(e2) : this.rateLimiter.isServerRateLimited(e2.batchKey) || (e2.transport = e2.transport || this.config.api_transport, e2.url = Gn(e2.url, { ip: this.config.ip ? 1 : 0 }), e2.headers = t({}, this.config.request_headers), e2.compression = "best-available" === e2.compression ? this.compression : e2.compression, e2.fetchOptions = e2.fetchOptions || this.config.fetch_options, ((e3) => {
      var i2, s2, r2, n2 = t({}, e3);
      n2.timeout = n2.timeout || 6e4, n2.url = Gn(n2.url, { _: new Date().getTime().toString(), ver: U.LIB_VERSION, compression: n2.compression });
      var o2 = null !== (i2 = n2.transport) && void 0 !== i2 ? i2 : "fetch", a2 = null !== (s2 = null === (r2 = re(Kn, (e4) => e4.transport === o2)) || void 0 === r2 ? void 0 : r2.method) && void 0 !== s2 ? s2 : Kn[0].method;
      if (!a2)
        throw new Error("No available transport method");
      a2(n2);
    })(t(t({}, e2), {}, { callback: (t2) => {
      var i2, s2, r2;
      (this.rateLimiter.checkForLimiting(t2), t2.statusCode >= 400) && (null === (s2 = (r2 = this.config).on_request_error) || void 0 === s2 || s2.call(r2, t2));
      null === (i2 = e2.callback) || void 0 === i2 || i2.call(e2, t2);
    } }))));
  }
  _send_retriable_request(e2) {
    this._retryQueue ? this._retryQueue.retriableRequest(e2) : this._send_request(e2);
  }
  _execute_array(e2) {
    var t2, i2 = [], s2 = [], r2 = [];
    G(e2, (e3) => {
      e3 && (t2 = e3[0], C(t2) ? r2.push(e3) : F(e3) ? e3.call(this) : C(e3) && "alias" === t2 ? i2.push(e3) : C(e3) && -1 !== t2.indexOf("capture") && F(this[t2]) ? r2.push(e3) : s2.push(e3));
    });
    var n2 = function(e3, t3) {
      G(e3, function(e4) {
        if (C(e4[0])) {
          var i3 = t3;
          J(e4, function(e5) {
            i3 = i3[e5[0]].apply(i3, e5.slice(1));
          });
        } else
          this[e4[0]].apply(this, e4.slice(1));
      }, t3);
    };
    n2(i2, this), n2(s2, this), n2(r2, this);
  }
  _hasBootstrappedFeatureFlags() {
    var e2, t2;
    return (null === (e2 = this.config.bootstrap) || void 0 === e2 ? void 0 : e2.featureFlags) && Object.keys(null === (t2 = this.config.bootstrap) || void 0 === t2 ? void 0 : t2.featureFlags).length > 0 || false;
  }
  push(e2) {
    this._execute_array([e2]);
  }
  capture(e2, i2, s2) {
    var r2;
    if (this.__loaded && this.persistence && this.sessionPersistence && this._requestQueue) {
      if (!this.consent.isOptedOut())
        if (!$(e2) && A(e2)) {
          if (this.config.opt_out_useragent_filter || !this._is_bot()) {
            var n2 = null != s2 && s2.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
            if (null == n2 || !n2.isRateLimited) {
              this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
              var o2 = new Date(), a2 = (null == s2 ? void 0 : s2.timestamp) || o2, l2 = Dt(), c2 = { uuid: l2, event: e2, properties: this._calculate_event_properties(e2, i2 || {}, a2, l2) };
              n2 && (c2.properties.$lib_rate_limit_remaining_tokens = n2.remainingTokens), (null == s2 ? void 0 : s2.$set) && (c2.$set = null == s2 ? void 0 : s2.$set);
              var u2 = this._calculate_set_once_properties(null == s2 ? void 0 : s2.$set_once);
              u2 && (c2.$set_once = u2), (c2 = te(c2, null != s2 && s2._noTruncate ? null : this.config.properties_string_max_length)).timestamp = a2, $(null == s2 ? void 0 : s2.timestamp) || (c2.properties.$event_time_override_provided = true, c2.properties.$event_time_override_system_time = o2);
              var d2 = t(t({}, c2.properties.$set), c2.$set);
              if (T(d2) || this.setPersonPropertiesForFlags(d2), !L(this.config.before_send)) {
                var h2 = this._runBeforeSend(c2);
                if (!h2)
                  return;
                c2 = h2;
              }
              this._internalEventEmitter.emit("eventCaptured", c2);
              var _2 = { method: "POST", url: null !== (r2 = null == s2 ? void 0 : s2._url) && void 0 !== r2 ? r2 : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), data: c2, compression: "best-available", batchKey: null == s2 ? void 0 : s2._batchKey };
              return !this.config.request_batching || s2 && (null == s2 || !s2._batchKey) || null != s2 && s2.send_instantly ? this._send_retriable_request(_2) : this._requestQueue.enqueue(_2), c2;
            }
            j.critical("This capture call is ignored due to client rate limiting.");
          }
        } else
          j.error("No event name provided to posthog.capture");
    } else
      j.uninitializedWarning("posthog.capture");
  }
  _addCaptureHook(e2) {
    return this.on("eventCaptured", (t2) => e2(t2.event, t2));
  }
  _calculate_event_properties(e2, i2, s2, r2) {
    if (s2 = s2 || new Date(), !this.persistence || !this.sessionPersistence)
      return i2;
    var n2 = this.persistence.remove_event_timer(e2), o2 = t({}, i2);
    if (o2.token = this.config.token, this.config.__preview_experimental_cookieless_mode && (o2.$cookieless_mode = true), "$snapshot" === e2) {
      var a2 = t(t({}, this.persistence.properties()), this.sessionPersistence.properties());
      return o2.distinct_id = a2.distinct_id, (!A(o2.distinct_id) && !D(o2.distinct_id) || O(o2.distinct_id)) && j.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), o2;
    }
    var l2, c2 = zr.properties({ maskPersonalDataProperties: this.config.mask_personal_data_properties, customPersonalDataProperties: this.config.custom_personal_data_properties });
    if (this.sessionManager) {
      var { sessionId: u2, windowId: h2 } = this.sessionManager.checkAndGetSessionAndWindowId();
      o2.$session_id = u2, o2.$window_id = h2;
    }
    this.sessionPropsManager && Y(o2, this.sessionPropsManager.getSessionProps());
    try {
      var _2, p2;
      this.sessionRecording && (o2.$recording_status = this.sessionRecording.status, o2.$sdk_debug_replay_internal_buffer_length = this.sessionRecording.buffer.data.length, o2.$sdk_debug_replay_internal_buffer_size = this.sessionRecording.buffer.size), o2.$sdk_debug_retry_queue_size = null === (_2 = this._retryQueue) || void 0 === _2 || null === (p2 = _2.queue) || void 0 === p2 ? void 0 : p2.length;
    } catch (e3) {
      o2.$sdk_debug_error_capturing_properties = String(e3);
    }
    if (this.requestRouter.region === co.CUSTOM && (o2.$lib_custom_api_host = this.config.api_host), l2 = "$pageview" === e2 ? this.pageViewManager.doPageView(s2, r2) : "$pageleave" === e2 ? this.pageViewManager.doPageLeave(s2) : this.pageViewManager.doEvent(), o2 = Y(o2, l2), "$pageview" === e2 && d && (o2.title = d.title), !$(n2)) {
      var g2 = s2.getTime() - n2;
      o2.$duration = parseFloat((g2 / 1e3).toFixed(3));
    }
    v && this.config.opt_out_useragent_filter && (o2.$browser_type = this._is_bot() ? "bot" : "browser"), (o2 = Y({}, c2, this.persistence.properties(), this.sessionPersistence.properties(), o2)).$is_identified = this._isIdentified(), C(this.config.property_denylist) ? J(this.config.property_denylist, function(e3) {
      delete o2[e3];
    }) : j.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
    var f2 = this.config.sanitize_properties;
    f2 && (j.error("sanitize_properties is deprecated. Use before_send instead"), o2 = f2(o2, e2));
    var m2 = this._hasPersonProcessing();
    return o2.$process_person_profile = m2, m2 && this._requirePersonProcessing("_calculate_event_properties"), o2;
  }
  _calculate_set_once_properties(e2) {
    var t2;
    if (!this.persistence || !this._hasPersonProcessing())
      return e2;
    if (this._personProcessingSetOncePropertiesSent)
      return e2;
    var i2 = this.persistence.get_initial_props(), s2 = null === (t2 = this.sessionPropsManager) || void 0 === t2 ? void 0 : t2.getSetOnceProps(), r2 = Y({}, i2, s2 || {}, e2 || {}), n2 = this.config.sanitize_properties;
    return n2 && (j.error("sanitize_properties is deprecated. Use before_send instead"), r2 = n2(r2, "$set_once")), this._personProcessingSetOncePropertiesSent = true, T(r2) ? void 0 : r2;
  }
  register(e2, t2) {
    var i2;
    null === (i2 = this.persistence) || void 0 === i2 || i2.register(e2, t2);
  }
  register_once(e2, t2, i2) {
    var s2;
    null === (s2 = this.persistence) || void 0 === s2 || s2.register_once(e2, t2, i2);
  }
  register_for_session(e2) {
    var t2;
    null === (t2 = this.sessionPersistence) || void 0 === t2 || t2.register(e2);
  }
  unregister(e2) {
    var t2;
    null === (t2 = this.persistence) || void 0 === t2 || t2.unregister(e2);
  }
  unregister_for_session(e2) {
    var t2;
    null === (t2 = this.sessionPersistence) || void 0 === t2 || t2.unregister(e2);
  }
  _register_single(e2, t2) {
    this.register({ [e2]: t2 });
  }
  getFeatureFlag(e2, t2) {
    return this.featureFlags.getFeatureFlag(e2, t2);
  }
  getFeatureFlagPayload(e2) {
    var t2 = this.featureFlags.getFeatureFlagPayload(e2);
    try {
      return JSON.parse(t2);
    } catch (e3) {
      return t2;
    }
  }
  isFeatureEnabled(e2, t2) {
    return this.featureFlags.isFeatureEnabled(e2, t2);
  }
  reloadFeatureFlags() {
    this.featureFlags.reloadFeatureFlags();
  }
  updateEarlyAccessFeatureEnrollment(e2, t2) {
    this.featureFlags.updateEarlyAccessFeatureEnrollment(e2, t2);
  }
  getEarlyAccessFeatures(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i2 = arguments.length > 2 ? arguments[2] : void 0;
    return this.featureFlags.getEarlyAccessFeatures(e2, t2, i2);
  }
  on(e2, t2) {
    return this._internalEventEmitter.on(e2, t2);
  }
  onFeatureFlags(e2) {
    return this.featureFlags.onFeatureFlags(e2);
  }
  onSessionId(e2) {
    var t2, i2;
    return null !== (t2 = null === (i2 = this.sessionManager) || void 0 === i2 ? void 0 : i2.onSessionId(e2)) && void 0 !== t2 ? t2 : () => {
    };
  }
  getSurveys(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    this.surveys.getSurveys(e2, t2);
  }
  getActiveMatchingSurveys(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    this.surveys.getActiveMatchingSurveys(e2, t2);
  }
  renderSurvey(e2, t2) {
    this.surveys.renderSurvey(e2, t2);
  }
  canRenderSurvey(e2) {
    this.surveys.canRenderSurvey(e2);
  }
  identify(e2, i2, s2) {
    if (!this.__loaded || !this.persistence)
      return j.uninitializedWarning("posthog.identify");
    if (D(e2) && (e2 = e2.toString(), j.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), e2) {
      if (["distinct_id", "distinctid"].includes(e2.toLowerCase()))
        j.critical('The string "'.concat(e2, '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.'));
      else if (this._requirePersonProcessing("posthog.identify")) {
        var r2 = this.get_distinct_id();
        if (this.register({ $user_id: e2 }), !this.get_property("$device_id")) {
          var n2 = r2;
          this.register_once({ $had_persisted_distinct_id: true, $device_id: n2 }, "");
        }
        e2 !== r2 && e2 !== this.get_property(ae) && (this.unregister(ae), this.register({ distinct_id: e2 }));
        var o2 = "anonymous" === (this.persistence.get_property(Oe) || "anonymous");
        e2 !== r2 && o2 ? (this.persistence.set_property(Oe, "identified"), this.setPersonPropertiesForFlags(t(t({}, s2 || {}), i2 || {}), false), this.capture("$identify", { distinct_id: e2, $anon_distinct_id: r2 }, { $set: i2 || {}, $set_once: s2 || {} }), this.featureFlags.setAnonymousDistinctId(r2), this._cachedIdentify = po(e2, i2, s2)) : (i2 || s2) && (this._cachedIdentify !== po(e2, i2, s2) ? (this.setPersonProperties(i2, s2), this._cachedIdentify = po(e2, i2, s2)) : j.info("A duplicate posthog.identify call was made with the same properties. It has been ignored.")), e2 !== r2 && (this.reloadFeatureFlags(), this.unregister(Ae));
      }
    } else
      j.error("Unique user id has not been set in posthog.identify");
  }
  setPersonProperties(e2, i2) {
    (e2 || i2) && this._requirePersonProcessing("posthog.setPersonProperties") && (this.setPersonPropertiesForFlags(t(t({}, i2 || {}), e2 || {})), this.capture("$set", { $set: e2 || {}, $set_once: i2 || {} }));
  }
  group(e2, i2, s2) {
    if (e2 && i2) {
      if (this._requirePersonProcessing("posthog.group")) {
        var r2 = this.getGroups();
        r2[e2] !== i2 && this.resetGroupPropertiesForFlags(e2), this.register({ $groups: t(t({}, r2), {}, { [e2]: i2 }) }), s2 && (this.capture("$groupidentify", { $group_type: e2, $group_key: i2, $group_set: s2 }), this.setGroupPropertiesForFlags({ [e2]: s2 })), r2[e2] === i2 || s2 || this.reloadFeatureFlags();
      }
    } else
      j.error("posthog.group requires a group type and group key");
  }
  resetGroups() {
    this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
  }
  setPersonPropertiesForFlags(e2) {
    var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    this.featureFlags.setPersonPropertiesForFlags(e2, t2);
  }
  resetPersonPropertiesForFlags() {
    this.featureFlags.resetPersonPropertiesForFlags();
  }
  setGroupPropertiesForFlags(e2) {
    var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    this._requirePersonProcessing("posthog.setGroupPropertiesForFlags") && this.featureFlags.setGroupPropertiesForFlags(e2, t2);
  }
  resetGroupPropertiesForFlags(e2) {
    this.featureFlags.resetGroupPropertiesForFlags(e2);
  }
  reset(e2) {
    var t2, i2, s2, r2;
    if (j.info("reset"), !this.__loaded)
      return j.uninitializedWarning("posthog.reset");
    var n2 = this.get_property("$device_id");
    if (this.consent.reset(), null === (t2 = this.persistence) || void 0 === t2 || t2.clear(), null === (i2 = this.sessionPersistence) || void 0 === i2 || i2.clear(), this.surveys.reset(), null === (s2 = this.persistence) || void 0 === s2 || s2.set_property(Oe, "anonymous"), null === (r2 = this.sessionManager) || void 0 === r2 || r2.resetSessionId(), this._cachedIdentify = null, this.config.__preview_experimental_cookieless_mode)
      this.register_once({ distinct_id: Ue, $device_id: null }, "");
    else {
      var o2 = this.config.get_device_id(Dt());
      this.register_once({ distinct_id: o2, $device_id: e2 ? o2 : n2 }, "");
    }
    this.register({ $last_posthog_reset: new Date().toISOString() }, 1);
  }
  get_distinct_id() {
    return this.get_property("distinct_id");
  }
  getGroups() {
    return this.get_property("$groups") || {};
  }
  get_session_id() {
    var e2, t2;
    return null !== (e2 = null === (t2 = this.sessionManager) || void 0 === t2 ? void 0 : t2.checkAndGetSessionAndWindowId(true).sessionId) && void 0 !== e2 ? e2 : "";
  }
  get_session_replay_url(e2) {
    if (!this.sessionManager)
      return "";
    var { sessionId: t2, sessionStartTimestamp: i2 } = this.sessionManager.checkAndGetSessionAndWindowId(true), s2 = this.requestRouter.endpointFor("ui", "/project/".concat(this.config.token, "/replay/").concat(t2));
    if (null != e2 && e2.withTimestamp && i2) {
      var r2, n2 = null !== (r2 = e2.timestampLookBack) && void 0 !== r2 ? r2 : 10;
      if (!i2)
        return s2;
      var o2 = Math.max(Math.floor((new Date().getTime() - i2) / 1e3) - n2, 0);
      s2 += "?t=".concat(o2);
    }
    return s2;
  }
  alias(e2, t2) {
    return e2 === this.get_property(oe) ? (j.critical("Attempting to create alias for existing People user - aborting."), -2) : this._requirePersonProcessing("posthog.alias") ? ($(t2) && (t2 = this.get_distinct_id()), e2 !== t2 ? (this._register_single(ae, e2), this.capture("$create_alias", { alias: e2, distinct_id: t2 })) : (j.warn("alias matches current distinct_id - skipping api call."), this.identify(e2), -1)) : void 0;
  }
  set_config(e2) {
    var i2, s2, r2, n2, o2 = t({}, this.config);
    R(e2) && (Y(this.config, Eo(e2)), null === (i2 = this.persistence) || void 0 === i2 || i2.update_config(this.config, o2), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new Wr(t(t({}, this.config), {}, { persistence: "sessionStorage" })), Vt.is_supported() && "true" === Vt.get("ph_debug") && (this.config.debug = true), this.config.debug && (U.DEBUG = true, j.info("set_config", { config: e2, oldConfig: o2, newConfig: t({}, this.config) })), null === (s2 = this.sessionRecording) || void 0 === s2 || s2.startIfEnabledOrStop(), null === (r2 = this.autocapture) || void 0 === r2 || r2.startIfEnabled(), null === (n2 = this.heatmaps) || void 0 === n2 || n2.startIfEnabled(), this.surveys.loadIfEnabled(), this._sync_opt_out_with_persistence());
  }
  startSessionRecording(e2) {
    var t2 = true === e2, i2 = { sampling: t2 || !(null == e2 || !e2.sampling), linked_flag: t2 || !(null == e2 || !e2.linked_flag), url_trigger: t2 || !(null == e2 || !e2.url_trigger), event_trigger: t2 || !(null == e2 || !e2.event_trigger) };
    if (Object.values(i2).some(Boolean)) {
      var s2, r2, n2, o2, a2;
      if (null === (s2 = this.sessionManager) || void 0 === s2 || s2.checkAndGetSessionAndWindowId(), i2.sampling)
        null === (r2 = this.sessionRecording) || void 0 === r2 || r2.overrideSampling();
      if (i2.linked_flag)
        null === (n2 = this.sessionRecording) || void 0 === n2 || n2.overrideLinkedFlag();
      if (i2.url_trigger)
        null === (o2 = this.sessionRecording) || void 0 === o2 || o2.overrideTrigger("url");
      if (i2.event_trigger)
        null === (a2 = this.sessionRecording) || void 0 === a2 || a2.overrideTrigger("event");
    }
    this.set_config({ disable_session_recording: false });
  }
  stopSessionRecording() {
    this.set_config({ disable_session_recording: true });
  }
  sessionRecordingStarted() {
    var e2;
    return !(null === (e2 = this.sessionRecording) || void 0 === e2 || !e2.started);
  }
  captureException(e2, i2) {
    var s2, r2 = new Error("PostHog syntheticException"), n2 = F(null === (s2 = f.__PosthogExtensions__) || void 0 === s2 ? void 0 : s2.parseErrorAsProperties) ? t(t({}, f.__PosthogExtensions__.parseErrorAsProperties(B(e2) ? { error: e2, event: e2.message } : { event: e2 }, { syntheticException: r2 })), i2) : t({ $exception_level: "error", $exception_list: [{ type: B(e2) ? e2.name : "Error", value: B(e2) ? e2.message : R(e2) && "message" in e2 ? String(e2.message) : String(e2), mechanism: { handled: true, synthetic: false } }] }, i2);
    this.exceptions.sendExceptionEvent(n2);
  }
  loadToolbar(e2) {
    return this.toolbar.loadToolbar(e2);
  }
  get_property(e2) {
    var t2;
    return null === (t2 = this.persistence) || void 0 === t2 ? void 0 : t2.props[e2];
  }
  getSessionProperty(e2) {
    var t2;
    return null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.props[e2];
  }
  toString() {
    var e2, t2 = null !== (e2 = this.config.name) && void 0 !== e2 ? e2 : wo;
    return t2 !== wo && (t2 = wo + "." + t2), t2;
  }
  _isIdentified() {
    var e2, t2;
    return "identified" === (null === (e2 = this.persistence) || void 0 === e2 ? void 0 : e2.get_property(Oe)) || "identified" === (null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.get_property(Oe));
  }
  _hasPersonProcessing() {
    var e2, t2, i2, s2;
    return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && T(this.getGroups()) && (null === (e2 = this.persistence) || void 0 === e2 || null === (t2 = e2.props) || void 0 === t2 || !t2[ae]) && (null === (i2 = this.persistence) || void 0 === i2 || null === (s2 = i2.props) || void 0 === s2 || !s2[Be]));
  }
  _shouldCapturePageleave() {
    return true === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && this.config.capture_pageview;
  }
  createPersonProfile() {
    this._hasPersonProcessing() || this._requirePersonProcessing("posthog.createPersonProfile") && this.setPersonProperties({}, {});
  }
  _requirePersonProcessing(e2) {
    return "never" === this.config.person_profiles ? (j.error(e2 + ' was called, but process_person is set to "never". This call will be ignored.'), false) : (this._register_single(Be, true), true);
  }
  _sync_opt_out_with_persistence() {
    var e2, t2, i2, s2, r2 = this.consent.isOptedOut(), n2 = this.config.opt_out_persistence_by_default, o2 = this.config.disable_persistence || r2 && !!n2;
    (null === (e2 = this.persistence) || void 0 === e2 ? void 0 : e2.disabled) !== o2 && (null === (i2 = this.persistence) || void 0 === i2 || i2.set_disabled(o2));
    (null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.disabled) !== o2 && (null === (s2 = this.sessionPersistence) || void 0 === s2 || s2.set_disabled(o2));
  }
  opt_in_capturing(e2) {
    var t2;
    (this.consent.optInOut(true), this._sync_opt_out_with_persistence(), $(null == e2 ? void 0 : e2.captureEventName) || null != e2 && e2.captureEventName) && this.capture(null !== (t2 = null == e2 ? void 0 : e2.captureEventName) && void 0 !== t2 ? t2 : "$opt_in", null == e2 ? void 0 : e2.captureProperties, { send_instantly: true });
    this.config.capture_pageview && this._captureInitialPageview();
  }
  opt_out_capturing() {
    this.consent.optInOut(false), this._sync_opt_out_with_persistence();
  }
  has_opted_in_capturing() {
    return this.consent.isOptedIn();
  }
  has_opted_out_capturing() {
    return this.consent.isOptedOut();
  }
  clear_opt_in_out_capturing() {
    this.consent.reset(), this._sync_opt_out_with_persistence();
  }
  _is_bot() {
    return u ? _o(u, this.config.custom_blocked_useragents) : void 0;
  }
  _captureInitialPageview() {
    d && !this._initialPageviewCaptured && (this._initialPageviewCaptured = true, this.capture("$pageview", { title: d.title }, { send_instantly: true }));
  }
  debug(e2) {
    false === e2 ? (null == n || n.console.log("You've disabled debug mode."), localStorage && localStorage.removeItem("ph_debug"), this.set_config({ debug: false })) : (null == n || n.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), localStorage && localStorage.setItem("ph_debug", "true"), this.set_config({ debug: true }));
  }
  _runBeforeSend(e2) {
    if (L(this.config.before_send))
      return e2;
    var t2 = C(this.config.before_send) ? this.config.before_send : [this.config.before_send], i2 = e2;
    for (var s2 of t2) {
      if (i2 = s2(i2), L(i2)) {
        var r2 = "Event '".concat(e2.event, "' was rejected in beforeSend function");
        return H(e2.event) ? j.warn("".concat(r2, ". This can cause unexpected behavior.")) : j.info(r2), null;
      }
      i2.properties && !T(i2.properties) || j.warn("Event '".concat(e2.event, "' has no properties after beforeSend function, this is likely an error."));
    }
    return i2;
  }
  getPageViewId() {
    var e2;
    return null === (e2 = this.pageViewManager._currentPageview) || void 0 === e2 ? void 0 : e2.pageViewId;
  }
  captureTraceFeedback(e2, t2) {
    this.capture("$ai_feedback", { $ai_trace_id: String(e2), $ai_feedback_text: t2 });
  }
  captureTraceMetric(e2, t2, i2) {
    this.capture("$ai_metric", { $ai_trace_id: String(e2), $ai_metric_name: t2, $ai_metric_value: String(i2) });
  }
}
!function(e2, t2) {
  for (var i2 = 0; i2 < t2.length; i2++)
    e2.prototype[t2[i2]] = Z(e2.prototype[t2[i2]]);
}(Io, ["identify"]);
var Po, Co = (Po = bo[wo] = new Io(), function() {
  function e2() {
    e2.done || (e2.done = true, So = false, J(bo, function(e3) {
      e3._dom_loaded();
    }));
  }
  null != d && d.addEventListener ? "complete" === d.readyState ? e2() : ne(d, "DOMContentLoaded", e2, { capture: false }) : n && j.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
}(), Po);
export { m as COPY_AUTOCAPTURE_EVENT, r as Compression, Io as PostHog, sn as SurveyQuestionBranchingType, tn as SurveyQuestionType, rn as SurveySchedule, en as SurveyType, Co as default, b as knownUnsafeEditableEvent, Co as posthog, y as severityLevels };
