function e(e2, t2) {
  var i2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), i2.push.apply(i2, r2);
  }
  return i2;
}
function t(t2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var n2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? e(Object(n2), true).forEach(function(e2) {
      i(t2, e2, n2[e2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : e(Object(n2)).forEach(function(e2) {
      Object.defineProperty(t2, e2, Object.getOwnPropertyDescriptor(n2, e2));
    });
  }
  return t2;
}
function i(e2, t2, i2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: i2, enumerable: true, configurable: true, writable: true }) : e2[t2] = i2, e2;
}
function r(e2, t2) {
  if (null == e2)
    return {};
  var i2, r2, n2 = function(e3, t3) {
    if (null == e3)
      return {};
    var i3, r3, n3 = {}, s3 = Object.keys(e3);
    for (r3 = 0; r3 < s3.length; r3++)
      i3 = s3[r3], t3.indexOf(i3) >= 0 || (n3[i3] = e3[i3]);
    return n3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var s2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < s2.length; r2++)
      i2 = s2[r2], t2.indexOf(i2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, i2) && (n2[i2] = e2[i2]);
  }
  return n2;
}
var n, s = "undefined" != typeof window ? window : void 0, o = "undefined" != typeof globalThis ? globalThis : s, a = Array.prototype, l = a.forEach, u = a.indexOf, c = null == o ? void 0 : o.navigator, d = null == o ? void 0 : o.document, _ = null == o ? void 0 : o.location, h = null == o ? void 0 : o.fetch, p = null != o && o.XMLHttpRequest && "withCredentials" in new o.XMLHttpRequest() ? o.XMLHttpRequest : void 0, v = null == o ? void 0 : o.AbortController, g = null == c ? void 0 : c.userAgent, f = null != s ? s : {}, m = { DEBUG: false, LIB_VERSION: "1.236.1" }, y = "$copy_autocapture", b = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];
!function(e2) {
  e2.GZipJS = "gzip-js", e2.Base64 = "base64";
}(n || (n = {}));
var w = ["fatal", "error", "warning", "log", "info", "debug"];
function S(e2, t2) {
  return -1 !== e2.indexOf(t2);
}
var k = function(e2) {
  return e2.trim();
}, E = function(e2) {
  return e2.replace(/^\$/, "");
};
var x = Array.isArray, I = Object.prototype, C = I.hasOwnProperty, P = I.toString, F = x || function(e2) {
  return "[object Array]" === P.call(e2);
}, T = (e2) => "function" == typeof e2, R = (e2) => e2 === Object(e2) && !F(e2), $ = (e2) => {
  if (R(e2)) {
    for (var t2 in e2)
      if (C.call(e2, t2))
        return false;
    return true;
  }
  return false;
}, O = (e2) => void 0 === e2, M = (e2) => "[object String]" == P.call(e2), A = (e2) => M(e2) && 0 === e2.trim().length, L = (e2) => null === e2, D = (e2) => O(e2) || L(e2), q = (e2) => "[object Number]" == P.call(e2), N = (e2) => "[object Boolean]" === P.call(e2), B = (e2) => e2 instanceof FormData, H = (e2) => S(b, e2), j = (e2) => {
  var t2 = { _log: function(t3) {
    if (s && (m.DEBUG || f.POSTHOG_DEBUG) && !O(s.console) && s.console) {
      for (var i2 = ("__rrweb_original__" in s.console[t3]) ? s.console[t3].__rrweb_original__ : s.console[t3], r2 = arguments.length, n2 = new Array(r2 > 1 ? r2 - 1 : 0), o2 = 1; o2 < r2; o2++)
        n2[o2 - 1] = arguments[o2];
      i2(e2, ...n2);
    }
  }, info: function() {
    for (var e3 = arguments.length, i2 = new Array(e3), r2 = 0; r2 < e3; r2++)
      i2[r2] = arguments[r2];
    t2._log("log", ...i2);
  }, warn: function() {
    for (var e3 = arguments.length, i2 = new Array(e3), r2 = 0; r2 < e3; r2++)
      i2[r2] = arguments[r2];
    t2._log("warn", ...i2);
  }, error: function() {
    for (var e3 = arguments.length, i2 = new Array(e3), r2 = 0; r2 < e3; r2++)
      i2[r2] = arguments[r2];
    t2._log("error", ...i2);
  }, critical: function() {
    for (var t3 = arguments.length, i2 = new Array(t3), r2 = 0; r2 < t3; r2++)
      i2[r2] = arguments[r2];
    console.error(e2, ...i2);
  }, uninitializedWarning: (e3) => {
    t2.error("You must initialize PostHog before calling ".concat(e3));
  }, createLogger: (t3) => j("".concat(e2, " ").concat(t3)) };
  return t2;
}, U = j("[PostHog.js]"), z = U.createLogger, W = {};
function G(e2, t2, i2) {
  if (F(e2)) {
    if (l && e2.forEach === l)
      e2.forEach(t2, i2);
    else if ("length" in e2 && e2.length === +e2.length) {
      for (var r2 = 0, n2 = e2.length; r2 < n2; r2++)
        if (r2 in e2 && t2.call(i2, e2[r2], r2) === W)
          return;
    }
  }
}
function V(e2, t2, i2) {
  if (!D(e2)) {
    if (F(e2))
      return G(e2, t2, i2);
    if (B(e2)) {
      for (var r2 of e2.entries())
        if (t2.call(i2, r2[1], r2[0]) === W)
          return;
    } else
      for (var n2 in e2)
        if (C.call(e2, n2) && t2.call(i2, e2[n2], n2) === W)
          return;
  }
}
var J = function(e2) {
  for (var t2 = arguments.length, i2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    i2[r2 - 1] = arguments[r2];
  return G(i2, function(t3) {
    for (var i3 in t3)
      void 0 !== t3[i3] && (e2[i3] = t3[i3]);
  }), e2;
}, Y = function(e2) {
  for (var t2 = arguments.length, i2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    i2[r2 - 1] = arguments[r2];
  return G(i2, function(t3) {
    G(t3, function(t4) {
      e2.push(t4);
    });
  }), e2;
};
function K(e2) {
  for (var t2 = Object.keys(e2), i2 = t2.length, r2 = new Array(i2); i2--; )
    r2[i2] = [t2[i2], e2[t2[i2]]];
  return r2;
}
var X = function(e2) {
  try {
    return e2();
  } catch (e3) {
    return;
  }
}, Q = function(e2) {
  return function() {
    try {
      for (var t2 = arguments.length, i2 = new Array(t2), r2 = 0; r2 < t2; r2++)
        i2[r2] = arguments[r2];
      return e2.apply(this, i2);
    } catch (e3) {
      U.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), U.critical(e3);
    }
  };
}, Z = function(e2) {
  var t2 = {};
  return V(e2, function(e3, i2) {
    M(e3) && e3.length > 0 && (t2[i2] = e3);
  }), t2;
};
function ee(e2, t2) {
  return i2 = e2, r2 = (e3) => M(e3) && !L(t2) ? e3.slice(0, t2) : e3, n2 = /* @__PURE__ */ new Set(), function e3(t3, i3) {
    return t3 !== Object(t3) ? r2 ? r2(t3, i3) : t3 : n2.has(t3) ? void 0 : (n2.add(t3), F(t3) ? (s2 = [], G(t3, (t4) => {
      s2.push(e3(t4));
    })) : (s2 = {}, V(t3, (t4, i4) => {
      n2.has(t4) || (s2[i4] = e3(t4, i4));
    })), s2);
    var s2;
  }(i2);
  var i2, r2, n2;
}
var te = ["herokuapp.com", "vercel.app", "netlify.app"];
function ie(e2) {
  var t2 = null == e2 ? void 0 : e2.hostname;
  if (!M(t2))
    return false;
  var i2 = t2.split(".").slice(-2).join(".");
  for (var r2 of te)
    if (i2 === r2)
      return false;
  return true;
}
function re(e2, t2) {
  for (var i2 = 0; i2 < e2.length; i2++)
    if (t2(e2[i2]))
      return e2[i2];
}
function ne(e2, t2, i2, r2) {
  var { capture: n2 = false, passive: s2 = true } = null != r2 ? r2 : {};
  null == e2 || e2.addEventListener(t2, i2, { capture: n2, passive: s2 });
}
var se = "$people_distinct_id", oe = "__alias", ae = "__timers", le = "$autocapture_disabled_server_side", ue = "$heatmaps_enabled_server_side", ce = "$exception_capture_enabled_server_side", de = "$web_vitals_enabled_server_side", _e = "$dead_clicks_enabled_server_side", he = "$web_vitals_allowed_metrics", pe = "$session_recording_enabled_server_side", ve = "$console_log_recording_enabled_server_side", ge = "$session_recording_network_payload_capture", fe = "$session_recording_masking", me = "$session_recording_canvas_recording", ye = "$replay_sample_rate", be = "$replay_minimum_duration", we = "$replay_script_config", Se = "$sesid", ke = "$session_is_sampled", Ee = "$session_recording_url_trigger_activated_session", xe = "$session_recording_event_trigger_activated_session", Ie = "$enabled_feature_flags", Ce = "$early_access_features", Pe = "$feature_flag_details", Fe = "$stored_person_properties", Te = "$stored_group_properties", Re = "$surveys", $e = "$surveys_activated", Oe = "$flag_call_reported", Me = "$user_state", Ae = "$client_session_props", Le = "$capture_rate_limit", De = "$initial_campaign_params", qe = "$initial_referrer_info", Ne = "$initial_person_info", Be = "$epp", He = "__POSTHOG_TOOLBAR__", je = "$posthog_cookieless", Ue = [se, oe, "__cmpns", ae, pe, ue, Se, Ie, Me, Ce, Pe, Te, Fe, Re, Oe, Ae, Le, De, qe, Be];
function ze(e2) {
  var t2;
  return e2 instanceof Element && (e2.id === He || !(null === (t2 = e2.closest) || void 0 === t2 || !t2.call(e2, ".toolbar-global-fade-container")));
}
function We(e2) {
  return !!e2 && 1 === e2.nodeType;
}
function Ge(e2, t2) {
  return !!e2 && !!e2.tagName && e2.tagName.toLowerCase() === t2.toLowerCase();
}
function Ve(e2) {
  return !!e2 && 3 === e2.nodeType;
}
function Je(e2) {
  return !!e2 && 11 === e2.nodeType;
}
function Ye(e2) {
  return e2 ? k(e2).split(/\s+/) : [];
}
function Ke(e2) {
  var t2 = null == s ? void 0 : s.location.href;
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
  return D(e2) ? null : k(e2).split(/(\s+)/).filter((e3) => _t(e3)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
}
function Ze(e2) {
  var t2 = "";
  return nt(e2) && !st(e2) && e2.childNodes && e2.childNodes.length && V(e2.childNodes, function(e3) {
    var i2;
    Ve(e3) && e3.textContent && (t2 += null !== (i2 = Qe(e3.textContent)) && void 0 !== i2 ? i2 : "");
  }), k(t2);
}
function et(e2) {
  return O(e2.target) ? e2.srcElement || null : null !== (t2 = e2.target) && void 0 !== t2 && t2.shadowRoot ? e2.composedPath()[0] || null : e2.target || null;
  var t2;
}
var tt = ["a", "button", "form", "input", "select", "textarea", "label"];
function it(e2) {
  var t2 = e2.parentNode;
  return !(!t2 || !We(t2)) && t2;
}
function rt(e2, t2) {
  var i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, r2 = arguments.length > 3 ? arguments[3] : void 0, n2 = arguments.length > 4 ? arguments[4] : void 0;
  if (!s || !e2 || Ge(e2, "html") || !We(e2))
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
  for (var a2 = false, l2 = [e2], u2 = true, c2 = e2; c2.parentNode && !Ge(c2, "body"); )
    if (Je(c2.parentNode))
      l2.push(c2.parentNode.host), c2 = c2.parentNode.host;
    else {
      if (!(u2 = it(c2)))
        break;
      if (r2 || tt.indexOf(u2.tagName.toLowerCase()) > -1)
        a2 = true;
      else {
        var d2 = s.getComputedStyle(u2);
        d2 && "pointer" === d2.getPropertyValue("cursor") && (a2 = true);
      }
      l2.push(u2), c2 = u2;
    }
  if (!function(e3, t3) {
    var i3 = null == t3 ? void 0 : t3.element_allowlist;
    if (O(i3))
      return true;
    var r3 = function(e4) {
      if (i3.some((t4) => e4.tagName.toLowerCase() === t4))
        return { v: true };
    };
    for (var n3 of e3) {
      var s2 = r3(n3);
      if ("object" == typeof s2)
        return s2.v;
    }
    return false;
  }(l2, i2))
    return false;
  if (!function(e3, t3) {
    var i3 = null == t3 ? void 0 : t3.css_selector_allowlist;
    if (O(i3))
      return true;
    var r3 = function(e4) {
      if (i3.some((t4) => e4.matches(t4)))
        return { v: true };
    };
    for (var n3 of e3) {
      var s2 = r3(n3);
      if ("object" == typeof s2)
        return s2.v;
    }
    return false;
  }(l2, i2))
    return false;
  var _2 = s.getComputedStyle(e2);
  if (_2 && "pointer" === _2.getPropertyValue("cursor") && "click" === t2.type)
    return true;
  var h2 = e2.tagName.toLowerCase();
  switch (h2) {
    case "html":
      return false;
    case "form":
      return (n2 || ["submit"]).indexOf(t2.type) >= 0;
    case "input":
    case "select":
    case "textarea":
      return (n2 || ["change", "click"]).indexOf(t2.type) >= 0;
    default:
      return a2 ? (n2 || ["click"]).indexOf(t2.type) >= 0 : (n2 || ["click"]).indexOf(t2.type) >= 0 && (tt.indexOf(h2) > -1 || "true" === e2.getAttribute("contenteditable"));
  }
}
function nt(e2) {
  for (var t2 = e2; t2.parentNode && !Ge(t2, "body"); t2 = t2.parentNode) {
    var i2 = Xe(t2);
    if (S(i2, "ph-sensitive") || S(i2, "ph-no-capture"))
      return false;
  }
  if (S(Xe(e2), "ph-include"))
    return true;
  var r2 = e2.type || "";
  if (M(r2))
    switch (r2.toLowerCase()) {
      case "hidden":
      case "password":
        return false;
    }
  var n2 = e2.name || e2.id || "";
  if (M(n2)) {
    if (/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(n2.replace(/[^a-zA-Z0-9]/g, "")))
      return false;
  }
  return true;
}
function st(e2) {
  return !!(Ge(e2, "input") && !["button", "checkbox", "submit", "reset"].includes(e2.type) || Ge(e2, "select") || Ge(e2, "textarea") || "true" === e2.getAttribute("contenteditable"));
}
var ot = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})", at = new RegExp("^(?:".concat(ot, ")$")), lt = new RegExp(ot), ut = "\\d{3}-?\\d{2}-?\\d{4}", ct = new RegExp("^(".concat(ut, ")$")), dt = new RegExp("(".concat(ut, ")"));
function _t(e2) {
  var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  if (D(e2))
    return false;
  if (M(e2)) {
    if (e2 = k(e2), (t2 ? at : lt).test((e2 || "").replace(/[- ]/g, "")))
      return false;
    if ((t2 ? ct : dt).test(e2))
      return false;
  }
  return true;
}
function ht(e2) {
  var t2 = Ze(e2);
  return _t(t2 = "".concat(t2, " ").concat(pt(e2)).trim()) ? t2 : "";
}
function pt(e2) {
  var t2 = "";
  return e2 && e2.childNodes && e2.childNodes.length && V(e2.childNodes, function(e3) {
    var i2;
    if (e3 && "span" === (null === (i2 = e3.tagName) || void 0 === i2 ? void 0 : i2.toLowerCase()))
      try {
        var r2 = Ze(e3);
        t2 = "".concat(t2, " ").concat(r2).trim(), e3.childNodes && e3.childNodes.length && (t2 = "".concat(t2, " ").concat(pt(e3)).trim());
      } catch (e4) {
        U.error("[AutoCapture]", e4);
      }
  }), t2;
}
function vt(e2) {
  return function(e3) {
    var i2 = e3.map((e4) => {
      var i3, r2, n2 = "";
      if (e4.tag_name && (n2 += e4.tag_name), e4.attr_class)
        for (var s2 of (e4.attr_class.sort(), e4.attr_class))
          n2 += ".".concat(s2.replace(/"/g, ""));
      var o2 = t(t(t(t({}, e4.text ? { text: e4.text } : {}), {}, { "nth-child": null !== (i3 = e4.nth_child) && void 0 !== i3 ? i3 : 0, "nth-of-type": null !== (r2 = e4.nth_of_type) && void 0 !== r2 ? r2 : 0 }, e4.href ? { href: e4.href } : {}), e4.attr_id ? { attr_id: e4.attr_id } : {}), e4.attributes), a2 = {};
      return K(o2).sort((e5, t2) => {
        var [i4] = e5, [r3] = t2;
        return i4.localeCompare(r3);
      }).forEach((e5) => {
        var [t2, i4] = e5;
        return a2[gt(t2.toString())] = gt(i4.toString());
      }), n2 += ":", n2 += K(o2).map((e5) => {
        var [t2, i4] = e5;
        return "".concat(t2, '="').concat(i4, '"');
      }).join("");
    });
    return i2.join(";");
  }(function(e3) {
    return e3.map((e4) => {
      var t2, i2, r2 = { text: null === (t2 = e4.$el_text) || void 0 === t2 ? void 0 : t2.slice(0, 400), tag_name: e4.tag_name, href: null === (i2 = e4.attr__href) || void 0 === i2 ? void 0 : i2.slice(0, 2048), attr_class: ft(e4), attr_id: e4.attr__id, nth_child: e4.nth_child, nth_of_type: e4.nth_of_type, attributes: {} };
      return K(e4).filter((e5) => {
        var [t3] = e5;
        return 0 === t3.indexOf("attr__");
      }).forEach((e5) => {
        var [t3, i3] = e5;
        return r2.attributes[t3] = i3;
      }), r2;
    });
  }(e2));
}
function gt(e2) {
  return e2.replace(/"|\\"/g, '\\"');
}
function ft(e2) {
  var t2 = e2.attr__class;
  return t2 ? F(t2) ? t2 : Ye(t2) : void 0;
}
class mt {
  constructor() {
    this.clicks = [];
  }
  isRageClick(e2, t2, i2) {
    var r2 = this.clicks[this.clicks.length - 1];
    if (r2 && Math.abs(e2 - r2.x) + Math.abs(t2 - r2.y) < 30 && i2 - r2.timestamp < 1e3) {
      if (this.clicks.push({ x: e2, y: t2, timestamp: i2 }), 3 === this.clicks.length)
        return true;
    } else
      this.clicks = [{ x: e2, y: t2, timestamp: i2 }];
    return false;
  }
}
var yt = ["localhost", "127.0.0.1"], bt = (e2) => {
  var t2 = null == d ? void 0 : d.createElement("a");
  return O(t2) ? null : (t2.href = e2, t2);
}, wt = function(e2) {
  var t2, i2, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "&", n2 = [];
  return V(e2, function(e3, r3) {
    O(e3) || O(r3) || "undefined" === r3 || (t2 = encodeURIComponent(((e4) => e4 instanceof File)(e3) ? e3.name : e3.toString()), i2 = encodeURIComponent(r3), n2[n2.length] = i2 + "=" + t2);
  }), n2.join(r2);
}, St = function(e2, t2) {
  for (var i2, r2 = ((e2.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&"), n2 = 0; n2 < r2.length; n2++) {
    var s2 = r2[n2].split("=");
    if (s2[0] === t2) {
      i2 = s2;
      break;
    }
  }
  if (!F(i2) || i2.length < 2)
    return "";
  var o2 = i2[1];
  try {
    o2 = decodeURIComponent(o2);
  } catch (e3) {
    U.error("Skipping decoding for malformed query param: " + o2);
  }
  return o2.replace(/\+/g, " ");
}, kt = function(e2, t2, i2) {
  if (!e2 || !t2 || !t2.length)
    return e2;
  for (var r2 = e2.split("#"), n2 = r2[0] || "", s2 = r2[1], o2 = n2.split("?"), a2 = o2[1], l2 = o2[0], u2 = (a2 || "").split("&"), c2 = [], d2 = 0; d2 < u2.length; d2++) {
    var _2 = u2[d2].split("=");
    F(_2) && (t2.includes(_2[0]) ? c2.push(_2[0] + "=" + i2) : c2.push(u2[d2]));
  }
  var h2 = l2;
  return null != a2 && (h2 += "?" + c2.join("&")), null != s2 && (h2 += "#" + s2), h2;
}, Et = function(e2, t2) {
  var i2 = e2.match(new RegExp(t2 + "=([^&]*)"));
  return i2 ? i2[1] : null;
}, xt = z("[AutoCapture]");
function It(e2, t2) {
  return t2.length > e2 ? t2.slice(0, e2) + "..." : t2;
}
function Ct(e2) {
  if (e2.previousElementSibling)
    return e2.previousElementSibling;
  var t2 = e2;
  do {
    t2 = t2.previousSibling;
  } while (t2 && !We(t2));
  return t2;
}
function Pt(e2, t2, i2, r2) {
  var n2 = e2.tagName.toLowerCase(), s2 = { tag_name: n2 };
  tt.indexOf(n2) > -1 && !i2 && ("a" === n2.toLowerCase() || "button" === n2.toLowerCase() ? s2.$el_text = It(1024, ht(e2)) : s2.$el_text = It(1024, Ze(e2)));
  var o2 = Xe(e2);
  o2.length > 0 && (s2.classes = o2.filter(function(e3) {
    return "" !== e3;
  })), V(e2.attributes, function(i3) {
    var n3;
    if ((!st(e2) || -1 !== ["name", "id", "class", "aria-label"].indexOf(i3.name)) && ((null == r2 || !r2.includes(i3.name)) && !t2 && _t(i3.value) && (n3 = i3.name, !M(n3) || "_ngcontent" !== n3.substring(0, 10) && "_nghost" !== n3.substring(0, 7)))) {
      var o3 = i3.value;
      "class" === i3.name && (o3 = Ye(o3).join(" ")), s2["attr__" + i3.name] = It(1024, o3);
    }
  });
  for (var a2 = 1, l2 = 1, u2 = e2; u2 = Ct(u2); )
    a2++, u2.tagName === e2.tagName && l2++;
  return s2.nth_child = a2, s2.nth_of_type = l2, s2;
}
function Ft(e2, t2) {
  for (var i2, r2, { e: n2, maskAllElementAttributes: o2, maskAllText: a2, elementAttributeIgnoreList: l2, elementsChainAsString: u2 } = t2, c2 = [e2], d2 = e2; d2.parentNode && !Ge(d2, "body"); )
    Je(d2.parentNode) ? (c2.push(d2.parentNode.host), d2 = d2.parentNode.host) : (c2.push(d2.parentNode), d2 = d2.parentNode);
  var _2, h2 = [], p2 = {}, v2 = false, g2 = false;
  if (V(c2, (e3) => {
    var t3 = nt(e3);
    "a" === e3.tagName.toLowerCase() && (v2 = e3.getAttribute("href"), v2 = t3 && v2 && _t(v2) && v2), S(Xe(e3), "ph-no-capture") && (g2 = true), h2.push(Pt(e3, o2, a2, l2));
    var i3 = function(e4) {
      if (!nt(e4))
        return {};
      var t4 = {};
      return V(e4.attributes, function(e5) {
        if (e5.name && 0 === e5.name.indexOf("data-ph-capture-attribute")) {
          var i4 = e5.name.replace("data-ph-capture-attribute-", ""), r3 = e5.value;
          i4 && r3 && _t(r3) && (t4[i4] = r3);
        }
      }), t4;
    }(e3);
    J(p2, i3);
  }), g2)
    return { props: {}, explicitNoCapture: g2 };
  if (a2 || ("a" === e2.tagName.toLowerCase() || "button" === e2.tagName.toLowerCase() ? h2[0].$el_text = ht(e2) : h2[0].$el_text = Ze(e2)), v2) {
    var f2, m2;
    h2[0].attr__href = v2;
    var y2 = null === (f2 = bt(v2)) || void 0 === f2 ? void 0 : f2.host, b2 = null == s || null === (m2 = s.location) || void 0 === m2 ? void 0 : m2.host;
    y2 && b2 && y2 !== b2 && (_2 = v2);
  }
  return { props: J({ $event_type: n2.type, $ce_version: 1 }, u2 ? {} : { $elements: h2 }, { $elements_chain: vt(h2) }, null !== (i2 = h2[0]) && void 0 !== i2 && i2.$el_text ? { $el_text: null === (r2 = h2[0]) || void 0 === r2 ? void 0 : r2.$el_text } : {}, _2 && "click" === n2.type ? { $external_click_url: _2 } : {}, p2) };
}
class Tt {
  constructor(e2) {
    i(this, "_initialized", false), i(this, "_isDisabledServerSide", null), i(this, "rageclicks", new mt()), i(this, "_elementsChainAsString", false), this.instance = e2, this._elementSelectors = null;
  }
  get _config() {
    var e2, t2, i2 = R(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
    return i2.url_allowlist = null === (e2 = i2.url_allowlist) || void 0 === e2 ? void 0 : e2.map((e3) => new RegExp(e3)), i2.url_ignorelist = null === (t2 = i2.url_ignorelist) || void 0 === t2 ? void 0 : t2.map((e3) => new RegExp(e3)), i2;
  }
  _addDomEventHandlers() {
    if (this.isBrowserSupported()) {
      if (s && d) {
        var e2 = (e3) => {
          e3 = e3 || (null == s ? void 0 : s.event);
          try {
            this._captureEvent(e3);
          } catch (e4) {
            xt.error("Failed to capture event", e4);
          }
        };
        if (ne(d, "submit", e2, { capture: true }), ne(d, "change", e2, { capture: true }), ne(d, "click", e2, { capture: true }), this._config.capture_copied_text) {
          var t2 = (e3) => {
            e3 = e3 || (null == s ? void 0 : s.event), this._captureEvent(e3, y);
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
    e2.elementsChainAsString && (this._elementsChainAsString = e2.elementsChainAsString), this.instance.persistence && this.instance.persistence.register({ [le]: !!e2.autocapture_opt_out }), this._isDisabledServerSide = !!e2.autocapture_opt_out, this.startIfEnabled();
  }
  setElementSelectors(e2) {
    this._elementSelectors = e2;
  }
  getElementSelectors(e2) {
    var t2, i2 = [];
    return null === (t2 = this._elementSelectors) || void 0 === t2 || t2.forEach((t3) => {
      var r2 = null == d ? void 0 : d.querySelectorAll(t3);
      null == r2 || r2.forEach((r3) => {
        e2 === r3 && i2.push(t3);
      });
    }), i2;
  }
  get isEnabled() {
    var e2, t2, i2 = null === (e2 = this.instance.persistence) || void 0 === e2 ? void 0 : e2.props[le], r2 = this._isDisabledServerSide;
    if (L(r2) && !N(i2) && !this.instance.config.advanced_disable_decide)
      return false;
    var n2 = null !== (t2 = this._isDisabledServerSide) && void 0 !== t2 ? t2 : !!i2;
    return !!this.instance.config.autocapture && !n2;
  }
  _captureEvent(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "$autocapture";
    if (this.isEnabled) {
      var i2, r2 = et(e2);
      if (Ve(r2) && (r2 = r2.parentNode || null), "$autocapture" === t2 && "click" === e2.type && e2 instanceof MouseEvent)
        this.instance.config.rageclick && null !== (i2 = this.rageclicks) && void 0 !== i2 && i2.isRageClick(e2.clientX, e2.clientY, new Date().getTime()) && this._captureEvent(e2, "$rageclick");
      var n2 = t2 === y;
      if (r2 && rt(r2, e2, this._config, n2, n2 ? ["copy", "cut"] : void 0)) {
        var { props: o2, explicitNoCapture: a2 } = Ft(r2, { e: e2, maskAllElementAttributes: this.instance.config.mask_all_element_attributes, maskAllText: this.instance.config.mask_all_text, elementAttributeIgnoreList: this._config.element_attribute_ignorelist, elementsChainAsString: this._elementsChainAsString });
        if (a2)
          return false;
        var l2 = this.getElementSelectors(r2);
        if (l2 && l2.length > 0 && (o2.$element_selectors = l2), t2 === y) {
          var u2, c2 = Qe(null == s || null === (u2 = s.getSelection()) || void 0 === u2 ? void 0 : u2.toString()), d2 = e2.type || "clipboard";
          if (!c2)
            return false;
          o2.$selected_content = c2, o2.$copy_type = d2;
        }
        return this.instance.capture(t2, o2), true;
      }
    }
  }
  isBrowserSupported() {
    return T(null == d ? void 0 : d.querySelectorAll);
  }
}
Math.trunc || (Math.trunc = function(e2) {
  return e2 < 0 ? Math.ceil(e2) : Math.floor(e2);
}), Number.isInteger || (Number.isInteger = function(e2) {
  return q(e2) && isFinite(e2) && Math.floor(e2) === e2;
});
var Rt = "0123456789abcdef";
class $t {
  constructor(e2) {
    if (this.bytes = e2, 16 !== e2.length)
      throw new TypeError("not 128-bit length");
  }
  static fromFieldsV7(e2, t2, i2, r2) {
    if (!Number.isInteger(e2) || !Number.isInteger(t2) || !Number.isInteger(i2) || !Number.isInteger(r2) || e2 < 0 || t2 < 0 || i2 < 0 || r2 < 0 || e2 > 281474976710655 || t2 > 4095 || i2 > 1073741823 || r2 > 4294967295)
      throw new RangeError("invalid field value");
    var n2 = new Uint8Array(16);
    return n2[0] = e2 / Math.pow(2, 40), n2[1] = e2 / Math.pow(2, 32), n2[2] = e2 / Math.pow(2, 24), n2[3] = e2 / Math.pow(2, 16), n2[4] = e2 / Math.pow(2, 8), n2[5] = e2, n2[6] = 112 | t2 >>> 8, n2[7] = t2, n2[8] = 128 | i2 >>> 24, n2[9] = i2 >>> 16, n2[10] = i2 >>> 8, n2[11] = i2, n2[12] = r2 >>> 24, n2[13] = r2 >>> 16, n2[14] = r2 >>> 8, n2[15] = r2, new $t(n2);
  }
  toString() {
    for (var e2 = "", t2 = 0; t2 < this.bytes.length; t2++)
      e2 = e2 + Rt.charAt(this.bytes[t2] >>> 4) + Rt.charAt(15 & this.bytes[t2]), 3 !== t2 && 5 !== t2 && 7 !== t2 && 9 !== t2 || (e2 += "-");
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
class Ot {
  constructor() {
    i(this, "_timestamp", 0), i(this, "_counter", 0), i(this, "_random", new Lt());
  }
  generate() {
    var e2 = this.generateOrAbort();
    if (O(e2)) {
      this._timestamp = 0;
      var t2 = this.generateOrAbort();
      if (O(t2))
        throw new Error("Could not generate UUID after timestamp reset");
      return t2;
    }
    return e2;
  }
  generateOrAbort() {
    var e2 = Date.now();
    if (e2 > this._timestamp)
      this._timestamp = e2, this._resetCounter();
    else {
      if (!(e2 + 1e4 > this._timestamp))
        return;
      this._counter++, this._counter > 4398046511103 && (this._timestamp++, this._resetCounter());
    }
    return $t.fromFieldsV7(this._timestamp, Math.trunc(this._counter / Math.pow(2, 30)), this._counter & Math.pow(2, 30) - 1, this._random.nextUint32());
  }
  _resetCounter() {
    this._counter = 1024 * this._random.nextUint32() + (1023 & this._random.nextUint32());
  }
}
var Mt, At = (e2) => {
  if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG)
    throw new Error("no cryptographically strong RNG available");
  for (var t2 = 0; t2 < e2.length; t2++)
    e2[t2] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
  return e2;
};
s && !O(s.crypto) && crypto.getRandomValues && (At = (e2) => crypto.getRandomValues(e2));
class Lt {
  constructor() {
    i(this, "_buffer", new Uint32Array(8)), i(this, "_cursor", 1 / 0);
  }
  nextUint32() {
    return this._cursor >= this._buffer.length && (At(this._buffer), this._cursor = 0), this._buffer[this._cursor++];
  }
}
var Dt = () => qt().toString(), qt = () => (Mt || (Mt = new Ot())).generate(), Nt = "Thu, 01 Jan 1970 00:00:00 GMT", Bt = "";
var Ht = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
function jt(e2, t2) {
  if (t2) {
    var i2 = function(e3) {
      var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d;
      if (Bt)
        return Bt;
      if (!t3)
        return "";
      if (["localhost", "127.0.0.1"].includes(e3))
        return "";
      for (var i3 = e3.split("."), r3 = Math.min(i3.length, 8), n2 = "dmn_chk_" + Dt(), s2 = new RegExp("(^|;)\\s*" + n2 + "=1"); !Bt && r3--; ) {
        var o2 = i3.slice(r3).join("."), a2 = n2 + "=1;domain=." + o2;
        t3.cookie = a2, s2.test(t3.cookie) && (t3.cookie = a2 + ";expires=" + Nt, Bt = o2);
      }
      return Bt;
    }(e2);
    if (!i2) {
      var r2 = ((e3) => {
        var t3 = e3.match(Ht);
        return t3 ? t3[0] : "";
      })(e2);
      r2 !== i2 && U.info("Warning: cookie subdomain discovery mismatch", r2, i2), i2 = r2;
    }
    return i2 ? "; domain=." + i2 : "";
  }
  return "";
}
var Ut, zt = { is_supported: () => !!d, error: function(e2) {
  U.error("cookieStore error: " + e2);
}, get: function(e2) {
  if (d) {
    try {
      for (var t2 = e2 + "=", i2 = d.cookie.split(";").filter((e3) => e3.length), r2 = 0; r2 < i2.length; r2++) {
        for (var n2 = i2[r2]; " " == n2.charAt(0); )
          n2 = n2.substring(1, n2.length);
        if (0 === n2.indexOf(t2))
          return decodeURIComponent(n2.substring(t2.length, n2.length));
      }
    } catch (e3) {
    }
    return null;
  }
}, parse: function(e2) {
  var t2;
  try {
    t2 = JSON.parse(zt.get(e2)) || {};
  } catch (e3) {
  }
  return t2;
}, set: function(e2, t2, i2, r2, n2) {
  if (d)
    try {
      var s2 = "", o2 = "", a2 = jt(d.location.hostname, r2);
      if (i2) {
        var l2 = new Date();
        l2.setTime(l2.getTime() + 24 * i2 * 60 * 60 * 1e3), s2 = "; expires=" + l2.toUTCString();
      }
      n2 && (o2 = "; secure");
      var u2 = e2 + "=" + encodeURIComponent(JSON.stringify(t2)) + s2 + "; SameSite=Lax; path=/" + a2 + o2;
      return u2.length > 3686.4 && U.warn("cookieStore warning: large cookie, len=" + u2.length), d.cookie = u2, u2;
    } catch (e3) {
      return;
    }
}, remove: function(e2, t2) {
  try {
    zt.set(e2, "", -1, t2);
  } catch (e3) {
    return;
  }
} }, Wt = null, Gt = { is_supported: function() {
  if (!L(Wt))
    return Wt;
  var e2 = true;
  if (O(s))
    e2 = false;
  else
    try {
      var t2 = "__mplssupport__";
      Gt.set(t2, "xyz"), '"xyz"' !== Gt.get(t2) && (e2 = false), Gt.remove(t2);
    } catch (t3) {
      e2 = false;
    }
  return e2 || U.error("localStorage unsupported; falling back to cookie store"), Wt = e2, e2;
}, error: function(e2) {
  U.error("localStorage error: " + e2);
}, get: function(e2) {
  try {
    return null == s ? void 0 : s.localStorage.getItem(e2);
  } catch (e3) {
    Gt.error(e3);
  }
  return null;
}, parse: function(e2) {
  try {
    return JSON.parse(Gt.get(e2)) || {};
  } catch (e3) {
  }
  return null;
}, set: function(e2, t2) {
  try {
    null == s || s.localStorage.setItem(e2, JSON.stringify(t2));
  } catch (e3) {
    Gt.error(e3);
  }
}, remove: function(e2) {
  try {
    null == s || s.localStorage.removeItem(e2);
  } catch (e3) {
    Gt.error(e3);
  }
} }, Vt = ["distinct_id", Se, ke, Be, Ne], Jt = t(t({}, Gt), {}, { parse: function(e2) {
  try {
    var t2 = {};
    try {
      t2 = zt.parse(e2) || {};
    } catch (e3) {
    }
    var i2 = J(t2, JSON.parse(Gt.get(e2) || "{}"));
    return Gt.set(e2, i2), i2;
  } catch (e3) {
  }
  return null;
}, set: function(e2, t2, i2, r2, n2, s2) {
  try {
    Gt.set(e2, t2, void 0, void 0, s2);
    var o2 = {};
    Vt.forEach((e3) => {
      t2[e3] && (o2[e3] = t2[e3]);
    }), Object.keys(o2).length && zt.set(e2, o2, i2, r2, n2, s2);
  } catch (e3) {
    Gt.error(e3);
  }
}, remove: function(e2, t2) {
  try {
    null == s || s.localStorage.removeItem(e2), zt.remove(e2, t2);
  } catch (e3) {
    Gt.error(e3);
  }
} }), Yt = {}, Kt = { is_supported: function() {
  return true;
}, error: function(e2) {
  U.error("memoryStorage error: " + e2);
}, get: function(e2) {
  return Yt[e2] || null;
}, parse: function(e2) {
  return Yt[e2] || null;
}, set: function(e2, t2) {
  Yt[e2] = t2;
}, remove: function(e2) {
  delete Yt[e2];
} }, Xt = null, Qt = { is_supported: function() {
  if (!L(Xt))
    return Xt;
  if (Xt = true, O(s))
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
  U.error("sessionStorage error: ", e2);
}, get: function(e2) {
  try {
    return null == s ? void 0 : s.sessionStorage.getItem(e2);
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
    null == s || s.sessionStorage.setItem(e2, JSON.stringify(t2));
  } catch (e3) {
    Qt.error(e3);
  }
}, remove: function(e2) {
  try {
    null == s || s.sessionStorage.removeItem(e2);
  } catch (e3) {
    Qt.error(e3);
  }
} };
!function(e2) {
  e2[e2.PENDING = -1] = "PENDING", e2[e2.DENIED = 0] = "DENIED", e2[e2.GRANTED = 1] = "GRANTED";
}(Ut || (Ut = {}));
class Zt {
  constructor(e2) {
    this._instance = e2;
  }
  get _config() {
    return this._instance.config;
  }
  get consent() {
    return this._getDnt() ? Ut.DENIED : this._storedConsent;
  }
  isOptedOut() {
    return this.consent === Ut.DENIED || this.consent === Ut.PENDING && this._config.opt_out_capturing_by_default;
  }
  isOptedIn() {
    return !this.isOptedOut();
  }
  optInOut(e2) {
    this._storage.set(this._storageKey, e2 ? 1 : 0, this._config.cookie_expiration, this._config.cross_subdomain_cookie, this._config.secure_cookie);
  }
  reset() {
    this._storage.remove(this._storageKey, this._config.cross_subdomain_cookie);
  }
  get _storageKey() {
    var { token: e2, opt_out_capturing_cookie_prefix: t2 } = this._instance.config;
    return (t2 || "__ph_opt_in_out_") + e2;
  }
  get _storedConsent() {
    var e2 = this._storage.get(this._storageKey);
    return "1" === e2 ? Ut.GRANTED : "0" === e2 ? Ut.DENIED : Ut.PENDING;
  }
  get _storage() {
    if (!this._persistentStore) {
      var e2 = this._config.opt_out_capturing_persistence_type;
      this._persistentStore = "localStorage" === e2 ? Gt : zt;
      var t2 = "localStorage" === e2 ? zt : Gt;
      t2.get(this._storageKey) && (this._persistentStore.get(this._storageKey) || this.optInOut("1" === t2.get(this._storageKey)), t2.remove(this._storageKey, this._config.cross_subdomain_cookie));
    }
    return this._persistentStore;
  }
  _getDnt() {
    return !!this._config.respect_dnt && !!re([null == c ? void 0 : c.doNotTrack, null == c ? void 0 : c.msDoNotTrack, f.doNotTrack], (e2) => S([true, 1, "1", "yes"], e2));
  }
}
var ei = z("[Dead Clicks]"), ti = () => true, ii = (e2) => {
  var t2, i2 = !(null === (t2 = e2.instance.persistence) || void 0 === t2 || !t2.get_property(_e)), r2 = e2.instance.config.capture_dead_clicks;
  return N(r2) ? r2 : i2;
};
class ri {
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
    this.isEnabled(this) && this._loadScript(() => {
      this._start();
    });
  }
  _loadScript(e2) {
    var t2, i2, r2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.initDeadClicksAutocapture && e2(), null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (r2 = i2.loadExternalDependency) || void 0 === r2 || r2.call(i2, this.instance, "dead-clicks-autocapture", (t3) => {
      t3 ? ei.error("failed to load script", t3) : e2();
    });
  }
  _start() {
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
var ni = z("[ExceptionAutocapture]");
class si {
  constructor(e2) {
    var t2;
    i(this, "_startCapturing", () => {
      var e3;
      if (s && this.isEnabled && null !== (e3 = f.__PosthogExtensions__) && void 0 !== e3 && e3.errorWrappingFunctions) {
        var t3 = f.__PosthogExtensions__.errorWrappingFunctions.wrapOnError, i2 = f.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection, r2 = f.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
        try {
          !this._unwrapOnError && this.config.capture_unhandled_errors && (this._unwrapOnError = t3(this.captureException.bind(this))), !this._unwrapUnhandledRejection && this.config.capture_unhandled_rejections && (this._unwrapUnhandledRejection = i2(this.captureException.bind(this))), !this._unwrapConsoleError && this.config.capture_console_errors && (this._unwrapConsoleError = r2(this.captureException.bind(this)));
        } catch (e4) {
          ni.error("failed to start", e4), this._stopCapturing();
        }
      }
    }), this.instance = e2, this.remoteEnabled = !(null === (t2 = this.instance.persistence) || void 0 === t2 || !t2.props[ce]), this.config = this._requiredConfig(), this.startIfEnabled();
  }
  _requiredConfig() {
    var e2 = this.instance.config.capture_exceptions, i2 = { capture_unhandled_errors: false, capture_unhandled_rejections: false, capture_console_errors: false };
    return R(e2) ? i2 = t(t({}, i2), e2) : (O(e2) ? this.remoteEnabled : e2) && (i2 = t(t({}, i2), {}, { capture_unhandled_errors: true, capture_unhandled_rejections: true })), i2;
  }
  get isEnabled() {
    return this.config.capture_console_errors || this.config.capture_unhandled_errors || this.config.capture_unhandled_rejections;
  }
  startIfEnabled() {
    this.isEnabled && (ni.info("enabled"), this._loadScript(this._startCapturing));
  }
  _loadScript(e2) {
    var t2, i2, r2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.errorWrappingFunctions && e2(), null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (r2 = i2.loadExternalDependency) || void 0 === r2 || r2.call(i2, this.instance, "exception-autocapture", (t3) => {
      if (t3)
        return ni.error("failed to load script", t3);
      e2();
    });
  }
  _stopCapturing() {
    var e2, t2, i2;
    null === (e2 = this._unwrapOnError) || void 0 === e2 || e2.call(this), this._unwrapOnError = void 0, null === (t2 = this._unwrapUnhandledRejection) || void 0 === t2 || t2.call(this), this._unwrapUnhandledRejection = void 0, null === (i2 = this._unwrapConsoleError) || void 0 === i2 || i2.call(this), this._unwrapConsoleError = void 0;
  }
  onRemoteConfig(e2) {
    var t2 = e2.autocaptureExceptions;
    this.remoteEnabled = !!t2 || false, this.config = this._requiredConfig(), this.instance.persistence && this.instance.persistence.register({ [ce]: this.remoteEnabled }), this.startIfEnabled();
  }
  captureException(e2) {
    var t2 = this.instance.requestRouter.endpointFor("ui");
    e2.$exception_personURL = "".concat(t2, "/project/").concat(this.instance.config.token, "/person/").concat(this.instance.get_distinct_id()), this.instance.exceptions.sendExceptionEvent(e2);
  }
}
function oi(e2) {
  return !O(Event) && ai(e2, Event);
}
function ai(e2, t2) {
  try {
    return e2 instanceof t2;
  } catch (e3) {
    return false;
  }
}
function li(e2, t2) {
  return Object.prototype.toString.call(e2) === "[object ".concat(t2, "]");
}
function ui(e2) {
  return li(e2, "DOMError");
}
var ci = /\(error: (.*)\)/, di = 50, _i = "?";
function hi(e2, t2, i2, r2) {
  var n2 = { platform: "web:javascript", filename: e2, function: "<anonymous>" === t2 ? _i : t2, in_app: true };
  return O(i2) || (n2.lineno = i2), O(r2) || (n2.colno = r2), n2;
}
var pi = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i, vi = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gi = /\((\S*)(?::(\d+))(?::(\d+))\)/, fi = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, mi = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, yi = function() {
  for (var e2 = arguments.length, i2 = new Array(e2), r2 = 0; r2 < e2; r2++)
    i2[r2] = arguments[r2];
  var n2 = i2.sort((e3, t2) => e3[0] - t2[0]).map((e3) => e3[1]);
  return function(e3) {
    for (var i3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r3 = [], s2 = e3.split("\n"), o2 = i3; o2 < s2.length; o2++) {
      var a2 = s2[o2];
      if (!(a2.length > 1024)) {
        var l2 = ci.test(a2) ? a2.replace(ci, "$1") : a2;
        if (!l2.match(/\S*Error: /)) {
          for (var u2 of n2) {
            var c2 = u2(l2);
            if (c2) {
              r3.push(c2);
              break;
            }
          }
          if (r3.length >= di)
            break;
        }
      }
    }
    return function(e4) {
      if (!e4.length)
        return [];
      var i4 = Array.from(e4);
      return i4.reverse(), i4.slice(0, di).map((e5) => t(t({}, e5), {}, { filename: e5.filename || bi(i4).filename, function: e5.function || _i }));
    }(r3);
  };
}(...[[30, (e2) => {
  var t2 = pi.exec(e2);
  if (t2) {
    var [, i2, r2, n2] = t2;
    return hi(i2, _i, +r2, +n2);
  }
  var s2 = vi.exec(e2);
  if (s2) {
    if (s2[2] && 0 === s2[2].indexOf("eval")) {
      var o2 = gi.exec(s2[2]);
      o2 && (s2[2] = o2[1], s2[3] = o2[2], s2[4] = o2[3]);
    }
    var [a2, l2] = Ei(s2[1] || _i, s2[2]);
    return hi(l2, a2, s2[3] ? +s2[3] : void 0, s2[4] ? +s2[4] : void 0);
  }
}], [50, (e2) => {
  var t2 = fi.exec(e2);
  if (t2) {
    if (t2[3] && t2[3].indexOf(" > eval") > -1) {
      var i2 = mi.exec(t2[3]);
      i2 && (t2[1] = t2[1] || "eval", t2[3] = i2[1], t2[4] = i2[2], t2[5] = "");
    }
    var r2 = t2[3], n2 = t2[1] || _i;
    return [n2, r2] = Ei(n2, r2), hi(r2, n2, t2[4] ? +t2[4] : void 0, t2[5] ? +t2[5] : void 0);
  }
}]]);
function bi(e2) {
  return e2[e2.length - 1] || {};
}
var wi, Si, ki, Ei = (e2, t2) => {
  var i2 = -1 !== e2.indexOf("safari-extension"), r2 = -1 !== e2.indexOf("safari-web-extension");
  return i2 || r2 ? [-1 !== e2.indexOf("@") ? e2.split("@")[0] : _i, i2 ? "safari-extension:".concat(t2) : "safari-web-extension:".concat(t2)] : [e2, t2];
};
var xi = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
function Ii(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i2 = e2.stacktrace || e2.stack || "", r2 = function(e3) {
    if (e3 && Ci.test(e3.message))
      return 1;
    return 0;
  }(e2);
  try {
    var n2 = yi, s2 = function(e3, t3) {
      var i3 = function(e4) {
        var t4 = globalThis._posthogChunkIds;
        if (!t4)
          return {};
        var i4 = Object.keys(t4);
        return ki && i4.length === Si || (Si = i4.length, ki = i4.reduce((i5, r3) => {
          wi || (wi = {});
          var n3 = wi[r3];
          if (n3)
            i5[n3[0]] = n3[1];
          else
            for (var s3 = e4(r3), o2 = s3.length - 1; o2 >= 0; o2--) {
              var a2 = s3[o2], l2 = null == a2 ? void 0 : a2.filename, u2 = t4[r3];
              if (l2 && u2) {
                i5[l2] = u2, wi[r3] = [l2, u2];
                break;
              }
            }
          return i5;
        }, {})), ki;
      }(t3);
      return e3.forEach((e4) => {
        e4.filename && (e4.chunk_id = i3[e4.filename]);
      }), e3;
    }(n2(i2, r2), n2);
    return s2.slice(0, s2.length - t2);
  } catch (e3) {
  }
  return [];
}
var Ci = /Minified React error #\d+;/i;
function Pi(e2, t2) {
  var i2, r2, n2 = Ii(e2), s2 = null === (i2 = null == t2 ? void 0 : t2.handled) || void 0 === i2 || i2, o2 = null !== (r2 = null == t2 ? void 0 : t2.synthetic) && void 0 !== r2 && r2;
  return { $exception_list: [{ type: null != t2 && t2.overrideExceptionType ? t2.overrideExceptionType : e2.name, value: function(e3) {
    var t3 = e3.message;
    if (t3.error && "string" == typeof t3.error.message)
      return String(t3.error.message);
    return String(t3);
  }(e2), stacktrace: { frames: n2, type: "raw" }, mechanism: { handled: s2, synthetic: o2 } }], $exception_level: "error" };
}
function Fi(e2, t2) {
  var i2, r2, n2, s2 = null === (i2 = null == t2 ? void 0 : t2.handled) || void 0 === i2 || i2, o2 = null === (r2 = null == t2 ? void 0 : t2.synthetic) || void 0 === r2 || r2, a2 = { type: null != t2 && t2.overrideExceptionType ? t2.overrideExceptionType : null !== (n2 = null == t2 ? void 0 : t2.defaultExceptionType) && void 0 !== n2 ? n2 : "Error", value: e2 || (null == t2 ? void 0 : t2.defaultExceptionMessage), mechanism: { handled: s2, synthetic: o2 } };
  if (null != t2 && t2.syntheticException) {
    var l2 = Ii(t2.syntheticException, 1);
    l2.length && (a2.stacktrace = { frames: l2, type: "raw" });
  }
  return { $exception_list: [a2], $exception_level: "error" };
}
function Ti(e2) {
  return M(e2) && !A(e2) && w.indexOf(e2) >= 0;
}
function Ri(e2, t2) {
  var i2, r2, n2 = null === (i2 = null == t2 ? void 0 : t2.handled) || void 0 === i2 || i2, s2 = null === (r2 = null == t2 ? void 0 : t2.synthetic) || void 0 === r2 || r2, o2 = null != t2 && t2.overrideExceptionType ? t2.overrideExceptionType : oi(e2) ? e2.constructor.name : "Error", a2 = "Non-Error 'exception' captured with keys: ".concat(function(e3) {
    var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 40, i3 = Object.keys(e3);
    if (i3.sort(), !i3.length)
      return "[object has no keys]";
    for (var r3 = i3.length; r3 > 0; r3--) {
      var n3 = i3.slice(0, r3).join(", ");
      if (!(n3.length > t3))
        return r3 === i3.length || n3.length <= t3 ? n3 : "".concat(n3.slice(0, t3), "...");
    }
    return "";
  }(e2)), l2 = { type: o2, value: a2, mechanism: { handled: n2, synthetic: s2 } };
  if (null != t2 && t2.syntheticException) {
    var u2 = Ii(null == t2 ? void 0 : t2.syntheticException, 1);
    u2.length && (l2.stacktrace = { frames: u2, type: "raw" });
  }
  return { $exception_list: [l2], $exception_level: Ti(e2.level) ? e2.level : "error" };
}
function $i(e2, i2) {
  var { error: r2, event: n2 } = e2, s2 = { $exception_list: [] }, o2 = r2 || n2;
  if (ui(o2) || function(e3) {
    return li(e3, "DOMException");
  }(o2)) {
    var a2 = o2;
    if (function(e3) {
      return "stack" in e3;
    }(o2))
      s2 = Pi(o2, i2);
    else {
      var l2 = a2.name || (ui(a2) ? "DOMError" : "DOMException"), u2 = a2.message ? "".concat(l2, ": ").concat(a2.message) : l2, c2 = ui(a2) ? "DOMError" : "DOMException";
      s2 = Fi(u2, t(t({}, i2), {}, { overrideExceptionType: c2, defaultExceptionMessage: u2 }));
    }
    return "code" in a2 && (s2.$exception_DOMException_code = "".concat(a2.code)), s2;
  }
  if (function(e3) {
    return li(e3, "ErrorEvent");
  }(o2) && o2.error)
    return Pi(o2.error, i2);
  if (function(e3) {
    switch (Object.prototype.toString.call(e3)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
      case "[object DOMError]":
        return true;
      default:
        return ai(e3, Error);
    }
  }(o2))
    return Pi(o2, i2);
  if (function(e3) {
    return li(e3, "Object");
  }(o2) || oi(o2))
    return Ri(o2, i2);
  if (O(r2) && M(n2)) {
    var d2 = "Error", _2 = n2, h2 = n2.match(xi);
    return h2 && (d2 = h2[1], _2 = h2[2]), Fi(_2, t(t({}, i2), {}, { overrideExceptionType: d2, defaultExceptionMessage: _2 }));
  }
  return Fi(o2, i2);
}
function Oi(e2) {
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
function Mi(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 66060288e-1;
  if (e2.size >= t2 && e2.data.length > 1) {
    var i2 = Math.floor(e2.data.length / 2), r2 = e2.data.slice(0, i2), n2 = e2.data.slice(i2);
    return [Mi({ size: Oi(r2), data: r2, sessionId: e2.sessionId, windowId: e2.windowId }), Mi({ size: Oi(n2), data: n2, sessionId: e2.sessionId, windowId: e2.windowId })].flatMap((e3) => e3);
  }
  return [e2];
}
var Ai = ((e2) => (e2[e2.DomContentLoaded = 0] = "DomContentLoaded", e2[e2.Load = 1] = "Load", e2[e2.FullSnapshot = 2] = "FullSnapshot", e2[e2.IncrementalSnapshot = 3] = "IncrementalSnapshot", e2[e2.Meta = 4] = "Meta", e2[e2.Custom = 5] = "Custom", e2[e2.Plugin = 6] = "Plugin", e2))(Ai || {}), Li = ((e2) => (e2[e2.Mutation = 0] = "Mutation", e2[e2.MouseMove = 1] = "MouseMove", e2[e2.MouseInteraction = 2] = "MouseInteraction", e2[e2.Scroll = 3] = "Scroll", e2[e2.ViewportResize = 4] = "ViewportResize", e2[e2.Input = 5] = "Input", e2[e2.TouchMove = 6] = "TouchMove", e2[e2.MediaInteraction = 7] = "MediaInteraction", e2[e2.StyleSheetRule = 8] = "StyleSheetRule", e2[e2.CanvasMutation = 9] = "CanvasMutation", e2[e2.Font = 10] = "Font", e2[e2.Log = 11] = "Log", e2[e2.Drag = 12] = "Drag", e2[e2.StyleDeclaration = 13] = "StyleDeclaration", e2[e2.Selection = 14] = "Selection", e2[e2.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e2[e2.CustomElement = 16] = "CustomElement", e2))(Li || {}), Di = "[SessionRecording]", qi = "redacted", Ni = { initiatorTypes: ["audio", "beacon", "body", "css", "early-hint", "embed", "fetch", "frame", "iframe", "icon", "image", "img", "input", "link", "navigation", "object", "ping", "script", "track", "video", "xmlhttprequest"], maskRequestFn: (e2) => e2, recordHeaders: false, recordBody: false, recordInitialRequests: false, recordPerformance: false, performanceEntryTypeToObserve: ["first-input", "navigation", "paint", "resource"], payloadSizeLimitBytes: 1e6, payloadHostDenyList: [".lr-ingest.io", ".ingest.sentry.io", ".clarity.ms", "analytics.google.com"] }, Bi = ["authorization", "x-forwarded-for", "authorization", "cookie", "set-cookie", "x-api-key", "x-real-ip", "remote-addr", "forwarded", "proxy-authorization", "x-csrf-token", "x-csrftoken", "x-xsrf-token"], Hi = ["password", "secret", "passwd", "api_key", "apikey", "auth", "credentials", "mysql_pwd", "privatekey", "private_key", "token"], ji = ["/s/", "/e/", "/i/"];
function Ui(e2, t2, i2, r2) {
  if (D(e2))
    return e2;
  var n2 = (null == t2 ? void 0 : t2["content-length"]) || function(e3) {
    return new Blob([e3]).size;
  }(e2);
  return M(n2) && (n2 = parseInt(n2)), n2 > i2 ? Di + " ".concat(r2, " body too large to record (").concat(n2, " bytes)") : e2;
}
function zi(e2, t2) {
  if (D(e2))
    return e2;
  var i2 = e2;
  return _t(i2, false) || (i2 = Di + " " + t2 + " body " + qi), V(Hi, (e3) => {
    var r2, n2;
    null !== (r2 = i2) && void 0 !== r2 && r2.length && -1 !== (null === (n2 = i2) || void 0 === n2 ? void 0 : n2.indexOf(e3)) && (i2 = Di + " " + t2 + " body " + qi + " as might contain: " + e3);
  }), i2;
}
var Wi = (e2, i2) => {
  var r2, n2, s2, o2 = { payloadSizeLimitBytes: Ni.payloadSizeLimitBytes, performanceEntryTypeToObserve: [...Ni.performanceEntryTypeToObserve], payloadHostDenyList: [...i2.payloadHostDenyList || [], ...Ni.payloadHostDenyList] }, a2 = false !== e2.session_recording.recordHeaders && i2.recordHeaders, l2 = false !== e2.session_recording.recordBody && i2.recordBody, u2 = false !== e2.capture_performance && i2.recordPerformance, c2 = (r2 = o2, s2 = Math.min(1e6, null !== (n2 = r2.payloadSizeLimitBytes) && void 0 !== n2 ? n2 : 1e6), (e3) => (null != e3 && e3.requestBody && (e3.requestBody = Ui(e3.requestBody, e3.requestHeaders, s2, "Request")), null != e3 && e3.responseBody && (e3.responseBody = Ui(e3.responseBody, e3.responseHeaders, s2, "Response")), e3)), d2 = (t2) => {
    return c2(((e3, t3) => {
      var i4, r4 = bt(e3.name), n3 = 0 === t3.indexOf("http") ? null === (i4 = bt(t3)) || void 0 === i4 ? void 0 : i4.pathname : t3;
      "/" === n3 && (n3 = "");
      var s3 = null == r4 ? void 0 : r4.pathname.replace(n3 || "", "");
      if (!(r4 && s3 && ji.some((e4) => 0 === s3.indexOf(e4))))
        return e3;
    })((r3 = (i3 = t2).requestHeaders, D(r3) || V(Object.keys(null != r3 ? r3 : {}), (e3) => {
      Bi.includes(e3.toLowerCase()) && (r3[e3] = qi);
    }), i3), e2.api_host));
    var i3, r3;
  }, _2 = T(e2.session_recording.maskNetworkRequestFn);
  return _2 && T(e2.session_recording.maskCapturedNetworkRequestFn) && U.warn("Both `maskNetworkRequestFn` and `maskCapturedNetworkRequestFn` are defined. `maskNetworkRequestFn` will be ignored."), _2 && (e2.session_recording.maskCapturedNetworkRequestFn = (i3) => {
    var r3 = e2.session_recording.maskNetworkRequestFn({ url: i3.name });
    return t(t({}, i3), {}, { name: null == r3 ? void 0 : r3.url });
  }), o2.maskRequestFn = T(e2.session_recording.maskCapturedNetworkRequestFn) ? (t2) => {
    var i3, r3, n3, s3 = d2(t2);
    return s3 && null !== (i3 = null === (r3 = (n3 = e2.session_recording).maskCapturedNetworkRequestFn) || void 0 === r3 ? void 0 : r3.call(n3, s3)) && void 0 !== i3 ? i3 : void 0;
  } : (e3) => function(e4) {
    if (!O(e4))
      return e4.requestBody = zi(e4.requestBody, "Request"), e4.responseBody = zi(e4.responseBody, "Response"), e4;
  }(d2(e3)), t(t(t({}, Ni), o2), {}, { recordHeaders: a2, recordBody: l2, recordPerformance: u2, recordInitialRequests: u2 });
};
function Gi(e2, t2, i2, r2, n2) {
  return t2 > i2 && (U.warn("min cannot be greater than max."), t2 = i2), q(e2) ? e2 > i2 ? (r2 && U.warn(r2 + " cannot be  greater than max: " + i2 + ". Using max value instead."), i2) : e2 < t2 ? (r2 && U.warn(r2 + " cannot be less than min: " + t2 + ". Using min value instead."), t2) : e2 : (r2 && U.warn(r2 + " must be a number. using max or fallback. max: " + i2 + ", fallback: " + n2), Gi(n2 || i2, t2, i2, r2));
}
class Vi {
  constructor(e2) {
    var t2, r2, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    i(this, "_bucketSize", 100), i(this, "_refillRate", 10), i(this, "_mutationBuckets", {}), i(this, "_loggedTracker", {}), i(this, "_refillBuckets", () => {
      Object.keys(this._mutationBuckets).forEach((e3) => {
        this._mutationBuckets[e3] = this._mutationBuckets[e3] + this._refillRate, this._mutationBuckets[e3] >= this._bucketSize && delete this._mutationBuckets[e3];
      });
    }), i(this, "_getNodeOrRelevantParent", (e3) => {
      var t3 = this._rrweb.mirror.getNode(e3);
      if ("svg" !== (null == t3 ? void 0 : t3.nodeName) && t3 instanceof Element) {
        var i2 = t3.closest("svg");
        if (i2)
          return [this._rrweb.mirror.getId(i2), i2];
      }
      return [e3, t3];
    }), i(this, "_numberOfChanges", (e3) => {
      var t3, i2, r3, n3, s2, o2, a2, l2;
      return (null !== (t3 = null === (i2 = e3.removes) || void 0 === i2 ? void 0 : i2.length) && void 0 !== t3 ? t3 : 0) + (null !== (r3 = null === (n3 = e3.attributes) || void 0 === n3 ? void 0 : n3.length) && void 0 !== r3 ? r3 : 0) + (null !== (s2 = null === (o2 = e3.texts) || void 0 === o2 ? void 0 : o2.length) && void 0 !== s2 ? s2 : 0) + (null !== (a2 = null === (l2 = e3.adds) || void 0 === l2 ? void 0 : l2.length) && void 0 !== a2 ? a2 : 0);
    }), i(this, "throttleMutations", (e3) => {
      if (3 !== e3.type || 0 !== e3.data.source)
        return e3;
      var t3 = e3.data, i2 = this._numberOfChanges(t3);
      t3.attributes && (t3.attributes = t3.attributes.filter((e4) => {
        var t4, i3, r4, [n3, s2] = this._getNodeOrRelevantParent(e4.id);
        if (0 === this._mutationBuckets[n3])
          return false;
        (this._mutationBuckets[n3] = null !== (t4 = this._mutationBuckets[n3]) && void 0 !== t4 ? t4 : this._bucketSize, this._mutationBuckets[n3] = Math.max(this._mutationBuckets[n3] - 1, 0), 0 === this._mutationBuckets[n3]) && (this._loggedTracker[n3] || (this._loggedTracker[n3] = true, null === (i3 = (r4 = this._options).onBlockedNode) || void 0 === i3 || i3.call(r4, n3, s2)));
        return e4;
      }));
      var r3 = this._numberOfChanges(t3);
      return 0 !== r3 || i2 === r3 ? e3 : void 0;
    }), this._rrweb = e2, this._options = n2, this._refillRate = Gi(null !== (t2 = this._options.refillRate) && void 0 !== t2 ? t2 : this._refillRate, 0, 100, "mutation throttling refill rate"), this._bucketSize = Gi(null !== (r2 = this._options.bucketSize) && void 0 !== r2 ? r2 : this._bucketSize, 0, 100, "mutation throttling bucket size"), setInterval(() => {
      this._refillBuckets();
    }, 1e3);
  }
}
var Ji = Uint8Array, Yi = Uint16Array, Ki = Uint32Array, Xi = new Ji([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), Qi = new Ji([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), Zi = new Ji([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), er = function(e2, t2) {
  for (var i2 = new Yi(31), r2 = 0; r2 < 31; ++r2)
    i2[r2] = t2 += 1 << e2[r2 - 1];
  var n2 = new Ki(i2[30]);
  for (r2 = 1; r2 < 30; ++r2)
    for (var s2 = i2[r2]; s2 < i2[r2 + 1]; ++s2)
      n2[s2] = s2 - i2[r2] << 5 | r2;
  return [i2, n2];
}, tr = er(Xi, 2), ir = tr[0], rr = tr[1];
ir[28] = 258, rr[258] = 28;
for (var nr = er(Qi, 0)[1], sr = new Yi(32768), or = 0; or < 32768; ++or) {
  var ar = (43690 & or) >>> 1 | (21845 & or) << 1;
  ar = (61680 & (ar = (52428 & ar) >>> 2 | (13107 & ar) << 2)) >>> 4 | (3855 & ar) << 4, sr[or] = ((65280 & ar) >>> 8 | (255 & ar) << 8) >>> 1;
}
var lr = function(e2, t2, i2) {
  for (var r2 = e2.length, n2 = 0, s2 = new Yi(t2); n2 < r2; ++n2)
    ++s2[e2[n2] - 1];
  var o2, a2 = new Yi(t2);
  for (n2 = 0; n2 < t2; ++n2)
    a2[n2] = a2[n2 - 1] + s2[n2 - 1] << 1;
  if (i2) {
    o2 = new Yi(1 << t2);
    var l2 = 15 - t2;
    for (n2 = 0; n2 < r2; ++n2)
      if (e2[n2])
        for (var u2 = n2 << 4 | e2[n2], c2 = t2 - e2[n2], d2 = a2[e2[n2] - 1]++ << c2, _2 = d2 | (1 << c2) - 1; d2 <= _2; ++d2)
          o2[sr[d2] >>> l2] = u2;
  } else
    for (o2 = new Yi(r2), n2 = 0; n2 < r2; ++n2)
      o2[n2] = sr[a2[e2[n2] - 1]++] >>> 15 - e2[n2];
  return o2;
}, ur = new Ji(288);
for (or = 0; or < 144; ++or)
  ur[or] = 8;
for (or = 144; or < 256; ++or)
  ur[or] = 9;
for (or = 256; or < 280; ++or)
  ur[or] = 7;
for (or = 280; or < 288; ++or)
  ur[or] = 8;
var cr = new Ji(32);
for (or = 0; or < 32; ++or)
  cr[or] = 5;
var dr = lr(ur, 9, 0), _r = lr(cr, 5, 0), hr = function(e2) {
  return (e2 / 8 >> 0) + (7 & e2 && 1);
}, pr = function(e2, t2, i2) {
  (null == i2 || i2 > e2.length) && (i2 = e2.length);
  var r2 = new (e2 instanceof Yi ? Yi : e2 instanceof Ki ? Ki : Ji)(i2 - t2);
  return r2.set(e2.subarray(t2, i2)), r2;
}, vr = function(e2, t2, i2) {
  i2 <<= 7 & t2;
  var r2 = t2 / 8 >> 0;
  e2[r2] |= i2, e2[r2 + 1] |= i2 >>> 8;
}, gr = function(e2, t2, i2) {
  i2 <<= 7 & t2;
  var r2 = t2 / 8 >> 0;
  e2[r2] |= i2, e2[r2 + 1] |= i2 >>> 8, e2[r2 + 2] |= i2 >>> 16;
}, fr = function(e2, t2) {
  for (var i2 = [], r2 = 0; r2 < e2.length; ++r2)
    e2[r2] && i2.push({ s: r2, f: e2[r2] });
  var n2 = i2.length, s2 = i2.slice();
  if (!n2)
    return [new Ji(0), 0];
  if (1 == n2) {
    var o2 = new Ji(i2[0].s + 1);
    return o2[i2[0].s] = 1, [o2, 1];
  }
  i2.sort(function(e3, t3) {
    return e3.f - t3.f;
  }), i2.push({ s: -1, f: 25001 });
  var a2 = i2[0], l2 = i2[1], u2 = 0, c2 = 1, d2 = 2;
  for (i2[0] = { s: -1, f: a2.f + l2.f, l: a2, r: l2 }; c2 != n2 - 1; )
    a2 = i2[i2[u2].f < i2[d2].f ? u2++ : d2++], l2 = i2[u2 != c2 && i2[u2].f < i2[d2].f ? u2++ : d2++], i2[c2++] = { s: -1, f: a2.f + l2.f, l: a2, r: l2 };
  var _2 = s2[0].s;
  for (r2 = 1; r2 < n2; ++r2)
    s2[r2].s > _2 && (_2 = s2[r2].s);
  var h2 = new Yi(_2 + 1), p2 = mr(i2[c2 - 1], h2, 0);
  if (p2 > t2) {
    r2 = 0;
    var v2 = 0, g2 = p2 - t2, f2 = 1 << g2;
    for (s2.sort(function(e3, t3) {
      return h2[t3.s] - h2[e3.s] || e3.f - t3.f;
    }); r2 < n2; ++r2) {
      var m2 = s2[r2].s;
      if (!(h2[m2] > t2))
        break;
      v2 += f2 - (1 << p2 - h2[m2]), h2[m2] = t2;
    }
    for (v2 >>>= g2; v2 > 0; ) {
      var y2 = s2[r2].s;
      h2[y2] < t2 ? v2 -= 1 << t2 - h2[y2]++ - 1 : ++r2;
    }
    for (; r2 >= 0 && v2; --r2) {
      var b2 = s2[r2].s;
      h2[b2] == t2 && (--h2[b2], ++v2);
    }
    p2 = t2;
  }
  return [new Ji(h2), p2];
}, mr = function(e2, t2, i2) {
  return -1 == e2.s ? Math.max(mr(e2.l, t2, i2 + 1), mr(e2.r, t2, i2 + 1)) : t2[e2.s] = i2;
}, yr = function(e2) {
  for (var t2 = e2.length; t2 && !e2[--t2]; )
    ;
  for (var i2 = new Yi(++t2), r2 = 0, n2 = e2[0], s2 = 1, o2 = function(e3) {
    i2[r2++] = e3;
  }, a2 = 1; a2 <= t2; ++a2)
    if (e2[a2] == n2 && a2 != t2)
      ++s2;
    else {
      if (!n2 && s2 > 2) {
        for (; s2 > 138; s2 -= 138)
          o2(32754);
        s2 > 2 && (o2(s2 > 10 ? s2 - 11 << 5 | 28690 : s2 - 3 << 5 | 12305), s2 = 0);
      } else if (s2 > 3) {
        for (o2(n2), --s2; s2 > 6; s2 -= 6)
          o2(8304);
        s2 > 2 && (o2(s2 - 3 << 5 | 8208), s2 = 0);
      }
      for (; s2--; )
        o2(n2);
      s2 = 1, n2 = e2[a2];
    }
  return [i2.subarray(0, r2), t2];
}, br = function(e2, t2) {
  for (var i2 = 0, r2 = 0; r2 < t2.length; ++r2)
    i2 += e2[r2] * t2[r2];
  return i2;
}, wr = function(e2, t2, i2) {
  var r2 = i2.length, n2 = hr(t2 + 2);
  e2[n2] = 255 & r2, e2[n2 + 1] = r2 >>> 8, e2[n2 + 2] = 255 ^ e2[n2], e2[n2 + 3] = 255 ^ e2[n2 + 1];
  for (var s2 = 0; s2 < r2; ++s2)
    e2[n2 + s2 + 4] = i2[s2];
  return 8 * (n2 + 4 + r2);
}, Sr = function(e2, t2, i2, r2, n2, s2, o2, a2, l2, u2, c2) {
  vr(t2, c2++, i2), ++n2[256];
  for (var d2 = fr(n2, 15), _2 = d2[0], h2 = d2[1], p2 = fr(s2, 15), v2 = p2[0], g2 = p2[1], f2 = yr(_2), m2 = f2[0], y2 = f2[1], b2 = yr(v2), w2 = b2[0], S2 = b2[1], k2 = new Yi(19), E2 = 0; E2 < m2.length; ++E2)
    k2[31 & m2[E2]]++;
  for (E2 = 0; E2 < w2.length; ++E2)
    k2[31 & w2[E2]]++;
  for (var x2 = fr(k2, 7), I2 = x2[0], C2 = x2[1], P2 = 19; P2 > 4 && !I2[Zi[P2 - 1]]; --P2)
    ;
  var F2, T2, R2, $2, O2 = u2 + 5 << 3, M2 = br(n2, ur) + br(s2, cr) + o2, A2 = br(n2, _2) + br(s2, v2) + o2 + 14 + 3 * P2 + br(k2, I2) + (2 * k2[16] + 3 * k2[17] + 7 * k2[18]);
  if (O2 <= M2 && O2 <= A2)
    return wr(t2, c2, e2.subarray(l2, l2 + u2));
  if (vr(t2, c2, 1 + (A2 < M2)), c2 += 2, A2 < M2) {
    F2 = lr(_2, h2, 0), T2 = _2, R2 = lr(v2, g2, 0), $2 = v2;
    var L2 = lr(I2, C2, 0);
    vr(t2, c2, y2 - 257), vr(t2, c2 + 5, S2 - 1), vr(t2, c2 + 10, P2 - 4), c2 += 14;
    for (E2 = 0; E2 < P2; ++E2)
      vr(t2, c2 + 3 * E2, I2[Zi[E2]]);
    c2 += 3 * P2;
    for (var D2 = [m2, w2], q2 = 0; q2 < 2; ++q2) {
      var N2 = D2[q2];
      for (E2 = 0; E2 < N2.length; ++E2) {
        var B2 = 31 & N2[E2];
        vr(t2, c2, L2[B2]), c2 += I2[B2], B2 > 15 && (vr(t2, c2, N2[E2] >>> 5 & 127), c2 += N2[E2] >>> 12);
      }
    }
  } else
    F2 = dr, T2 = ur, R2 = _r, $2 = cr;
  for (E2 = 0; E2 < a2; ++E2)
    if (r2[E2] > 255) {
      B2 = r2[E2] >>> 18 & 31;
      gr(t2, c2, F2[B2 + 257]), c2 += T2[B2 + 257], B2 > 7 && (vr(t2, c2, r2[E2] >>> 23 & 31), c2 += Xi[B2]);
      var H2 = 31 & r2[E2];
      gr(t2, c2, R2[H2]), c2 += $2[H2], H2 > 3 && (gr(t2, c2, r2[E2] >>> 5 & 8191), c2 += Qi[H2]);
    } else
      gr(t2, c2, F2[r2[E2]]), c2 += T2[r2[E2]];
  return gr(t2, c2, F2[256]), c2 + T2[256];
}, kr = new Ki([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Er = function() {
  for (var e2 = new Ki(256), t2 = 0; t2 < 256; ++t2) {
    for (var i2 = t2, r2 = 9; --r2; )
      i2 = (1 & i2 && 3988292384) ^ i2 >>> 1;
    e2[t2] = i2;
  }
  return e2;
}(), xr = function() {
  var e2 = 4294967295;
  return { p: function(t2) {
    for (var i2 = e2, r2 = 0; r2 < t2.length; ++r2)
      i2 = Er[255 & i2 ^ t2[r2]] ^ i2 >>> 8;
    e2 = i2;
  }, d: function() {
    return 4294967295 ^ e2;
  } };
}, Ir = function(e2, t2, i2, r2, n2) {
  return function(e3, t3, i3, r3, n3, s2) {
    var o2 = e3.length, a2 = new Ji(r3 + o2 + 5 * (1 + Math.floor(o2 / 7e3)) + n3), l2 = a2.subarray(r3, a2.length - n3), u2 = 0;
    if (!t3 || o2 < 8)
      for (var c2 = 0; c2 <= o2; c2 += 65535) {
        var d2 = c2 + 65535;
        d2 < o2 ? u2 = wr(l2, u2, e3.subarray(c2, d2)) : (l2[c2] = s2, u2 = wr(l2, u2, e3.subarray(c2, o2)));
      }
    else {
      for (var _2 = kr[t3 - 1], h2 = _2 >>> 13, p2 = 8191 & _2, v2 = (1 << i3) - 1, g2 = new Yi(32768), f2 = new Yi(v2 + 1), m2 = Math.ceil(i3 / 3), y2 = 2 * m2, b2 = function(t4) {
        return (e3[t4] ^ e3[t4 + 1] << m2 ^ e3[t4 + 2] << y2) & v2;
      }, w2 = new Ki(25e3), S2 = new Yi(288), k2 = new Yi(32), E2 = 0, x2 = 0, I2 = (c2 = 0, 0), C2 = 0, P2 = 0; c2 < o2; ++c2) {
        var F2 = b2(c2), T2 = 32767 & c2, R2 = f2[F2];
        if (g2[T2] = R2, f2[F2] = T2, C2 <= c2) {
          var $2 = o2 - c2;
          if ((E2 > 7e3 || I2 > 24576) && $2 > 423) {
            u2 = Sr(e3, l2, 0, w2, S2, k2, x2, I2, P2, c2 - P2, u2), I2 = E2 = x2 = 0, P2 = c2;
            for (var O2 = 0; O2 < 286; ++O2)
              S2[O2] = 0;
            for (O2 = 0; O2 < 30; ++O2)
              k2[O2] = 0;
          }
          var M2 = 2, A2 = 0, L2 = p2, D2 = T2 - R2 & 32767;
          if ($2 > 2 && F2 == b2(c2 - D2))
            for (var q2 = Math.min(h2, $2) - 1, N2 = Math.min(32767, c2), B2 = Math.min(258, $2); D2 <= N2 && --L2 && T2 != R2; ) {
              if (e3[c2 + M2] == e3[c2 + M2 - D2]) {
                for (var H2 = 0; H2 < B2 && e3[c2 + H2] == e3[c2 + H2 - D2]; ++H2)
                  ;
                if (H2 > M2) {
                  if (M2 = H2, A2 = D2, H2 > q2)
                    break;
                  var j2 = Math.min(D2, H2 - 2), U2 = 0;
                  for (O2 = 0; O2 < j2; ++O2) {
                    var z2 = c2 - D2 + O2 + 32768 & 32767, W2 = z2 - g2[z2] + 32768 & 32767;
                    W2 > U2 && (U2 = W2, R2 = z2);
                  }
                }
              }
              D2 += (T2 = R2) - (R2 = g2[T2]) + 32768 & 32767;
            }
          if (A2) {
            w2[I2++] = 268435456 | rr[M2] << 18 | nr[A2];
            var G2 = 31 & rr[M2], V2 = 31 & nr[A2];
            x2 += Xi[G2] + Qi[V2], ++S2[257 + G2], ++k2[V2], C2 = c2 + M2, ++E2;
          } else
            w2[I2++] = e3[c2], ++S2[e3[c2]];
        }
      }
      u2 = Sr(e3, l2, s2, w2, S2, k2, x2, I2, P2, c2 - P2, u2);
    }
    return pr(a2, 0, r3 + hr(u2) + n3);
  }(e2, null == t2.level ? 6 : t2.level, null == t2.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e2.length)))) : 12 + t2.mem, i2, r2, !n2);
}, Cr = function(e2, t2, i2) {
  for (; i2; ++t2)
    e2[t2] = i2, i2 >>>= 8;
}, Pr = function(e2, t2) {
  var i2 = t2.filename;
  if (e2[0] = 31, e2[1] = 139, e2[2] = 8, e2[8] = t2.level < 2 ? 4 : 9 == t2.level ? 2 : 0, e2[9] = 3, 0 != t2.mtime && Cr(e2, 4, Math.floor(new Date(t2.mtime || Date.now()) / 1e3)), i2) {
    e2[3] = 8;
    for (var r2 = 0; r2 <= i2.length; ++r2)
      e2[r2 + 10] = i2.charCodeAt(r2);
  }
}, Fr = function(e2) {
  return 10 + (e2.filename && e2.filename.length + 1 || 0);
};
function Tr(e2, t2) {
  void 0 === t2 && (t2 = {});
  var i2 = xr(), r2 = e2.length;
  i2.p(e2);
  var n2 = Ir(e2, t2, Fr(t2), 8), s2 = n2.length;
  return Pr(n2, t2), Cr(n2, s2 - 8, i2.d()), Cr(n2, s2 - 4, r2), n2;
}
function Rr(e2, t2) {
  var i2 = e2.length;
  if ("undefined" != typeof TextEncoder)
    return new TextEncoder().encode(e2);
  for (var r2 = new Ji(e2.length + (e2.length >>> 1)), n2 = 0, s2 = function(e3) {
    r2[n2++] = e3;
  }, o2 = 0; o2 < i2; ++o2) {
    if (n2 + 5 > r2.length) {
      var a2 = new Ji(n2 + 8 + (i2 - o2 << 1));
      a2.set(r2), r2 = a2;
    }
    var l2 = e2.charCodeAt(o2);
    l2 < 128 || t2 ? s2(l2) : l2 < 2048 ? (s2(192 | l2 >>> 6), s2(128 | 63 & l2)) : l2 > 55295 && l2 < 57344 ? (s2(240 | (l2 = 65536 + (1047552 & l2) | 1023 & e2.charCodeAt(++o2)) >>> 18), s2(128 | l2 >>> 12 & 63), s2(128 | l2 >>> 6 & 63), s2(128 | 63 & l2)) : (s2(224 | l2 >>> 12), s2(128 | l2 >>> 6 & 63), s2(128 | 63 & l2));
  }
  return pr(r2, 0, n2);
}
function $r(e2, t2) {
  return function(e3) {
    for (var t3 = 0, i2 = 0; i2 < e3.length; i2++)
      t3 = (t3 << 5) - t3 + e3.charCodeAt(i2), t3 |= 0;
    return Math.abs(t3);
  }(e2) % 100 < Gi(100 * t2, 0, 100);
}
var Or = "[SessionRecording]", Mr = z(Or);
function Ar() {
  var e2, t2;
  return null == f || null === (e2 = f.__PosthogExtensions__) || void 0 === e2 || null === (t2 = e2.rrweb) || void 0 === t2 ? void 0 : t2.record;
}
var Lr = 3e5, Dr = [Li.MouseMove, Li.MouseInteraction, Li.Scroll, Li.ViewportResize, Li.Input, Li.TouchMove, Li.MediaInteraction, Li.Drag], qr = (e2) => ({ rrwebMethod: e2, enqueuedAt: Date.now(), attempt: 1 });
function Nr(e2) {
  return function(e3, t2) {
    for (var i2 = "", r2 = 0; r2 < e3.length; ) {
      var n2 = e3[r2++];
      n2 < 128 || t2 ? i2 += String.fromCharCode(n2) : n2 < 224 ? i2 += String.fromCharCode((31 & n2) << 6 | 63 & e3[r2++]) : n2 < 240 ? i2 += String.fromCharCode((15 & n2) << 12 | (63 & e3[r2++]) << 6 | 63 & e3[r2++]) : (n2 = ((15 & n2) << 18 | (63 & e3[r2++]) << 12 | (63 & e3[r2++]) << 6 | 63 & e3[r2++]) - 65536, i2 += String.fromCharCode(55296 | n2 >> 10, 56320 | 1023 & n2));
    }
    return i2;
  }(Tr(Rr(JSON.stringify(e2))), true);
}
function Br(e2) {
  return e2.type === Ai.Custom && "sessionIdle" === e2.data.tag;
}
function Hr(e2, t2) {
  return t2.some((t3) => "regex" === t3.matching && new RegExp(t3.url).test(e2));
}
class jr {
  get _sessionIdleThresholdMilliseconds() {
    return this._instance.config.session_recording.session_idle_threshold_ms || 3e5;
  }
  get started() {
    return this._captureStarted;
  }
  get _sessionManager() {
    if (!this._instance.sessionManager)
      throw new Error(Or + " must be started with a valid sessionManager.");
    return this._instance.sessionManager;
  }
  get _fullSnapshotIntervalMillis() {
    var e2, t2;
    return "trigger_pending" === this._triggerStatus ? 6e4 : null !== (e2 = null === (t2 = this._instance.config.session_recording) || void 0 === t2 ? void 0 : t2.full_snapshot_interval_millis) && void 0 !== e2 ? e2 : Lr;
  }
  get _isSampled() {
    var e2 = this._instance.get_property(ke);
    return N(e2) ? e2 : null;
  }
  get _sessionDuration() {
    var e2, t2, i2 = null === (e2 = this._buffer) || void 0 === e2 ? void 0 : e2.data[(null === (t2 = this._buffer) || void 0 === t2 ? void 0 : t2.data.length) - 1], { sessionStartTimestamp: r2 } = this._sessionManager.checkAndGetSessionAndWindowId(true);
    return i2 ? i2.timestamp - r2 : null;
  }
  get _isRecordingEnabled() {
    var e2 = !!this._instance.get_property(pe), t2 = !this._instance.config.disable_session_recording;
    return s && e2 && t2;
  }
  get _isConsoleLogCaptureEnabled() {
    var e2 = !!this._instance.get_property(ve), t2 = this._instance.config.enable_recording_console_log;
    return null != t2 ? t2 : e2;
  }
  get _canvasRecording() {
    var e2, t2, i2, r2, n2, s2, o2 = this._instance.config.session_recording.captureCanvas, a2 = this._instance.get_property(me), l2 = null !== (e2 = null !== (t2 = null == o2 ? void 0 : o2.recordCanvas) && void 0 !== t2 ? t2 : null == a2 ? void 0 : a2.enabled) && void 0 !== e2 && e2, u2 = null !== (i2 = null !== (r2 = null == o2 ? void 0 : o2.canvasFps) && void 0 !== r2 ? r2 : null == a2 ? void 0 : a2.fps) && void 0 !== i2 ? i2 : 4, c2 = null !== (n2 = null !== (s2 = null == o2 ? void 0 : o2.canvasQuality) && void 0 !== s2 ? s2 : null == a2 ? void 0 : a2.quality) && void 0 !== n2 ? n2 : 0.4;
    if ("string" == typeof c2) {
      var d2 = parseFloat(c2);
      c2 = isNaN(d2) ? 0.4 : d2;
    }
    return { enabled: l2, fps: Gi(u2, 0, 12, "canvas recording fps", 4), quality: Gi(c2, 0, 1, "canvas recording quality", 0.4) };
  }
  get _networkPayloadCapture() {
    var e2, t2, i2 = this._instance.get_property(ge), r2 = { recordHeaders: null === (e2 = this._instance.config.session_recording) || void 0 === e2 ? void 0 : e2.recordHeaders, recordBody: null === (t2 = this._instance.config.session_recording) || void 0 === t2 ? void 0 : t2.recordBody }, n2 = (null == r2 ? void 0 : r2.recordHeaders) || (null == i2 ? void 0 : i2.recordHeaders), s2 = (null == r2 ? void 0 : r2.recordBody) || (null == i2 ? void 0 : i2.recordBody), o2 = R(this._instance.config.capture_performance) ? this._instance.config.capture_performance.network_timing : this._instance.config.capture_performance, a2 = !!(N(o2) ? o2 : null == i2 ? void 0 : i2.capturePerformance);
    return n2 || s2 || a2 ? { recordHeaders: n2, recordBody: s2, recordPerformance: a2 } : void 0;
  }
  get _masking() {
    var e2, t2, i2, r2, n2, s2, o2 = this._instance.get_property(fe), a2 = { maskAllInputs: null === (e2 = this._instance.config.session_recording) || void 0 === e2 ? void 0 : e2.maskAllInputs, maskTextSelector: null === (t2 = this._instance.config.session_recording) || void 0 === t2 ? void 0 : t2.maskTextSelector, blockSelector: null === (i2 = this._instance.config.session_recording) || void 0 === i2 ? void 0 : i2.blockSelector }, l2 = null !== (r2 = null == a2 ? void 0 : a2.maskAllInputs) && void 0 !== r2 ? r2 : null == o2 ? void 0 : o2.maskAllInputs, u2 = null !== (n2 = null == a2 ? void 0 : a2.maskTextSelector) && void 0 !== n2 ? n2 : null == o2 ? void 0 : o2.maskTextSelector, c2 = null !== (s2 = null == a2 ? void 0 : a2.blockSelector) && void 0 !== s2 ? s2 : null == o2 ? void 0 : o2.blockSelector;
    return O(l2) && O(u2) && O(c2) ? void 0 : { maskAllInputs: null == l2 || l2, maskTextSelector: u2, blockSelector: c2 };
  }
  get _sampleRate() {
    var e2 = this._instance.get_property(ye);
    return q(e2) ? e2 : null;
  }
  get _minimumDuration() {
    var e2 = this._instance.get_property(be);
    return q(e2) ? e2 : null;
  }
  get status() {
    return this._receivedDecide ? this._isRecordingEnabled ? false === this._isSampled ? "disabled" : this._urlBlocked ? "paused" : D(this._linkedFlag) || this._linkedFlagSeen ? "trigger_pending" === this._triggerStatus ? "buffering" : N(this._isSampled) ? this._isSampled ? "sampled" : "disabled" : "active" : "buffering" : "disabled" : "buffering";
  }
  get _urlTriggerStatus() {
    var e2;
    return 0 === this._urlTriggers.length ? "trigger_disabled" : (null === (e2 = this._instance) || void 0 === e2 ? void 0 : e2.get_property(Ee)) === this._sessionId ? "trigger_activated" : "trigger_pending";
  }
  get _eventTriggerStatus() {
    var e2;
    return 0 === this._eventTriggers.length ? "trigger_disabled" : (null === (e2 = this._instance) || void 0 === e2 ? void 0 : e2.get_property(xe)) === this._sessionId ? "trigger_activated" : "trigger_pending";
  }
  get _triggerStatus() {
    var e2 = "trigger_activated" === this._eventTriggerStatus || "trigger_activated" === this._urlTriggerStatus, t2 = "trigger_pending" === this._eventTriggerStatus || "trigger_pending" === this._urlTriggerStatus;
    return e2 ? "trigger_activated" : t2 ? "trigger_pending" : "trigger_disabled";
  }
  constructor(e2) {
    if (i(this, "_queuedRRWebEvents", []), i(this, "_isIdle", "unknown"), i(this, "_linkedFlagSeen", false), i(this, "_lastActivityTimestamp", Date.now()), i(this, "_linkedFlag", null), i(this, "_removePageViewCaptureHook", void 0), i(this, "_onSessionIdListener", void 0), i(this, "_persistDecideOnSessionListener", void 0), i(this, "_samplingSessionListener", void 0), i(this, "_urlTriggers", []), i(this, "_urlBlocklist", []), i(this, "_urlBlocked", false), i(this, "_eventTriggers", []), i(this, "_removeEventTriggerCaptureHook", void 0), i(this, "_forceAllowLocalhostNetworkCapture", false), i(this, "_onBeforeUnload", () => {
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
    }), this._instance = e2, this._captureStarted = false, this._endpoint = "/s/", this._stopRrweb = void 0, this._receivedDecide = false, !this._instance.sessionManager)
      throw Mr.error("started without valid sessionManager"), new Error(Or + " started without valid sessionManager. This is a bug.");
    if (this._instance.config.__preview_experimental_cookieless_mode)
      throw new Error(Or + " cannot be used with __preview_experimental_cookieless_mode.");
    var { sessionId: t2, windowId: r2 } = this._sessionManager.checkAndGetSessionAndWindowId();
    this._sessionId = t2, this._windowId = r2, this._buffer = this._clearBuffer(), this._sessionIdleThresholdMilliseconds >= this._sessionManager.sessionTimeoutMs && Mr.warn("session_idle_threshold_ms (".concat(this._sessionIdleThresholdMilliseconds, ") is greater than the session timeout (").concat(this._sessionManager.sessionTimeoutMs, "). Session will never be detected as idle"));
  }
  startIfEnabledOrStop(e2) {
    this._isRecordingEnabled ? (this._startCapture(e2), ne(s, "beforeunload", this._onBeforeUnload), ne(s, "offline", this._onOffline), ne(s, "online", this._onOnline), ne(s, "visibilitychange", this._onVisibilityChange), this._setupSampling(), this._addEventTriggerListener(), D(this._removePageViewCaptureHook) && (this._removePageViewCaptureHook = this._instance.on("eventCaptured", (e3) => {
      try {
        if ("$pageview" === e3.event) {
          var t2 = null != e3 && e3.properties.$current_url ? this._maskUrl(null == e3 ? void 0 : e3.properties.$current_url) : "";
          if (!t2)
            return;
          this._tryAddCustomEvent("$pageview", { href: t2 });
        }
      } catch (e4) {
        Mr.error("Could not add $pageview to rrweb session", e4);
      }
    })), this._onSessionIdListener || (this._onSessionIdListener = this._sessionManager.onSessionId((e3, t2, i2) => {
      var r2, n2, s2, o2;
      i2 && (this._tryAddCustomEvent("$session_id_change", { sessionId: e3, windowId: t2, changeReason: i2 }), null === (r2 = this._instance) || void 0 === r2 || null === (n2 = r2.persistence) || void 0 === n2 || n2.unregister(xe), null === (s2 = this._instance) || void 0 === s2 || null === (o2 = s2.persistence) || void 0 === o2 || o2.unregister(Ee));
    }))) : this.stopRecording();
  }
  stopRecording() {
    var e2, t2, i2, r2;
    this._captureStarted && this._stopRrweb && (this._stopRrweb(), this._stopRrweb = void 0, this._captureStarted = false, null == s || s.removeEventListener("beforeunload", this._onBeforeUnload), null == s || s.removeEventListener("offline", this._onOffline), null == s || s.removeEventListener("online", this._onOnline), null == s || s.removeEventListener("visibilitychange", this._onVisibilityChange), this._clearBuffer(), clearInterval(this._fullSnapshotTimer), null === (e2 = this._removePageViewCaptureHook) || void 0 === e2 || e2.call(this), this._removePageViewCaptureHook = void 0, null === (t2 = this._removeEventTriggerCaptureHook) || void 0 === t2 || t2.call(this), this._removeEventTriggerCaptureHook = void 0, null === (i2 = this._onSessionIdListener) || void 0 === i2 || i2.call(this), this._onSessionIdListener = void 0, null === (r2 = this._samplingSessionListener) || void 0 === r2 || r2.call(this), this._samplingSessionListener = void 0, Mr.info("stopped"));
  }
  _resetSampling() {
    var e2;
    null === (e2 = this._instance.persistence) || void 0 === e2 || e2.unregister(ke);
  }
  _makeSamplingDecision(e2) {
    var t2, i2 = this._sessionId !== e2, r2 = this._sampleRate;
    if (q(r2)) {
      var n2 = this._isSampled, s2 = i2 || !N(n2), o2 = s2 ? $r(e2, r2) : n2;
      s2 && (o2 ? this._reportStarted("sampled") : Mr.warn("Sample rate (".concat(r2, ") has determined that this sessionId (").concat(e2, ") will not be sent to the server.")), this._tryAddCustomEvent("samplingDecisionMade", { sampleRate: r2, isSampled: o2 })), null === (t2 = this._instance.persistence) || void 0 === t2 || t2.register({ [ke]: o2 });
    } else
      this._resetSampling();
  }
  onRemoteConfig(e2) {
    var t2, i2, r2, n2, s2, o2;
    (this._tryAddCustomEvent("$remote_config_received", e2), this._persistRemoteConfig(e2), this._linkedFlag = (null === (t2 = e2.sessionRecording) || void 0 === t2 ? void 0 : t2.linkedFlag) || null, null !== (i2 = e2.sessionRecording) && void 0 !== i2 && i2.endpoint) && (this._endpoint = null === (o2 = e2.sessionRecording) || void 0 === o2 ? void 0 : o2.endpoint);
    if (this._setupSampling(), !D(this._linkedFlag) && !this._linkedFlagSeen) {
      var a2 = M(this._linkedFlag) ? this._linkedFlag : this._linkedFlag.flag, l2 = M(this._linkedFlag) ? null : this._linkedFlag.variant;
      this._instance.onFeatureFlags((e3, t3) => {
        var i3 = R(t3) && a2 in t3, r3 = l2 ? t3[a2] === l2 : i3;
        r3 && this._reportStarted("linked_flag_matched", { linkedFlag: a2, linkedVariant: l2 }), this._linkedFlagSeen = r3;
      });
    }
    null !== (r2 = e2.sessionRecording) && void 0 !== r2 && r2.urlTriggers && (this._urlTriggers = e2.sessionRecording.urlTriggers), null !== (n2 = e2.sessionRecording) && void 0 !== n2 && n2.urlBlocklist && (this._urlBlocklist = e2.sessionRecording.urlBlocklist), null !== (s2 = e2.sessionRecording) && void 0 !== s2 && s2.eventTriggers && (this._eventTriggers = e2.sessionRecording.eventTriggers), this._receivedDecide = true, this.startIfEnabledOrStop();
  }
  _setupSampling() {
    q(this._sampleRate) && D(this._samplingSessionListener) && (this._samplingSessionListener = this._sessionManager.onSessionId((e2) => {
      this._makeSamplingDecision(e2);
    }));
  }
  _persistRemoteConfig(e2) {
    if (this._instance.persistence) {
      var i2, r2 = this._instance.persistence, n2 = () => {
        var i3, n3, s2, o2, a2, l2, u2, c2, d2, _2 = null === (i3 = e2.sessionRecording) || void 0 === i3 ? void 0 : i3.sampleRate, h2 = D(_2) ? null : parseFloat(_2);
        D(h2) && this._resetSampling();
        var p2 = null === (n3 = e2.sessionRecording) || void 0 === n3 ? void 0 : n3.minimumDurationMilliseconds;
        r2.register({ [pe]: !!e2.sessionRecording, [ve]: null === (s2 = e2.sessionRecording) || void 0 === s2 ? void 0 : s2.consoleLogRecordingEnabled, [ge]: t({ capturePerformance: e2.capturePerformance }, null === (o2 = e2.sessionRecording) || void 0 === o2 ? void 0 : o2.networkPayloadCapture), [fe]: null === (a2 = e2.sessionRecording) || void 0 === a2 ? void 0 : a2.masking, [me]: { enabled: null === (l2 = e2.sessionRecording) || void 0 === l2 ? void 0 : l2.recordCanvas, fps: null === (u2 = e2.sessionRecording) || void 0 === u2 ? void 0 : u2.canvasFps, quality: null === (c2 = e2.sessionRecording) || void 0 === c2 ? void 0 : c2.canvasQuality }, [ye]: h2, [be]: O(p2) ? null : p2, [we]: null === (d2 = e2.sessionRecording) || void 0 === d2 ? void 0 : d2.scriptConfig });
      };
      n2(), null === (i2 = this._persistDecideOnSessionListener) || void 0 === i2 || i2.call(this), this._persistDecideOnSessionListener = this._sessionManager.onSessionId(n2);
    }
  }
  log(e2) {
    var t2, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "log";
    null === (t2 = this._instance.sessionRecording) || void 0 === t2 || t2.onRRwebEmit({ type: 6, data: { plugin: "rrweb/console@1", payload: { level: i2, trace: [], payload: [JSON.stringify(e2)] } }, timestamp: Date.now() });
  }
  _startCapture(e2) {
    if (!O(Object.assign) && !O(Array.from) && !(this._captureStarted || this._instance.config.disable_session_recording || this._instance.consent.isOptedOut())) {
      var t2, i2;
      if (this._captureStarted = true, this._sessionManager.checkAndGetSessionAndWindowId(), Ar())
        this._onScriptLoaded();
      else
        null === (t2 = f.__PosthogExtensions__) || void 0 === t2 || null === (i2 = t2.loadExternalDependency) || void 0 === i2 || i2.call(t2, this._instance, this._scriptName, (e3) => {
          if (e3)
            return Mr.error("could not load recorder", e3);
          this._onScriptLoaded();
        });
      Mr.info("starting"), "active" === this.status && this._reportStarted(e2 || "recording_initialized");
    }
  }
  get _scriptName() {
    var e2, t2, i2;
    return (null === (e2 = this._instance) || void 0 === e2 || null === (t2 = e2.persistence) || void 0 === t2 || null === (i2 = t2.get_property(we)) || void 0 === i2 ? void 0 : i2.script) || "recorder";
  }
  _isInteractiveEvent(e2) {
    var t2;
    return 3 === e2.type && -1 !== Dr.indexOf(null === (t2 = e2.data) || void 0 === t2 ? void 0 : t2.source);
  }
  _updateWindowAndSessionIds(e2) {
    var t2 = this._isInteractiveEvent(e2);
    t2 || this._isIdle || e2.timestamp - this._lastActivityTimestamp > this._sessionIdleThresholdMilliseconds && (this._isIdle = true, clearInterval(this._fullSnapshotTimer), this._tryAddCustomEvent("sessionIdle", { eventTimestamp: e2.timestamp, lastActivityTimestamp: this._lastActivityTimestamp, threshold: this._sessionIdleThresholdMilliseconds, bufferLength: this._buffer.data.length, bufferSize: this._buffer.size }), this._flushBuffer());
    var i2 = false;
    if (t2 && (this._lastActivityTimestamp = e2.timestamp, this._isIdle)) {
      var r2 = "unknown" === this._isIdle;
      this._isIdle = false, r2 || (this._tryAddCustomEvent("sessionNoLongerIdle", { reason: "user activity", type: e2.type }), i2 = true);
    }
    if (!this._isIdle) {
      var { windowId: n2, sessionId: s2 } = this._sessionManager.checkAndGetSessionAndWindowId(!t2, e2.timestamp), o2 = this._sessionId !== s2, a2 = this._windowId !== n2;
      this._windowId = n2, this._sessionId = s2, o2 || a2 ? (this.stopRecording(), this.startIfEnabledOrStop("session_id_changed")) : i2 && this._scheduleFullSnapshot();
    }
  }
  _tryRRWebMethod(e2) {
    try {
      return e2.rrwebMethod(), true;
    } catch (t2) {
      return this._queuedRRWebEvents.length < 10 ? this._queuedRRWebEvents.push({ enqueuedAt: e2.enqueuedAt || Date.now(), attempt: e2.attempt++, rrwebMethod: e2.rrwebMethod }) : Mr.warn("could not emit queued rrweb event.", t2, e2), false;
    }
  }
  _tryAddCustomEvent(e2, t2) {
    return this._tryRRWebMethod(qr(() => Ar().addCustomEvent(e2, t2)));
  }
  _tryTakeFullSnapshot() {
    return this._tryRRWebMethod(qr(() => Ar().takeFullSnapshot()));
  }
  _onScriptLoaded() {
    var e2, i2, r2, n2, s2 = { blockClass: "ph-no-capture", blockSelector: void 0, ignoreClass: "ph-ignore-input", maskTextClass: "ph-mask", maskTextSelector: void 0, maskTextFn: void 0, maskAllInputs: true, maskInputOptions: { password: true }, maskInputFn: void 0, slimDOMOptions: {}, collectFonts: false, inlineStylesheet: true, recordCrossOriginIframes: false }, o2 = this._instance.config.session_recording;
    for (var [a2, l2] of Object.entries(o2 || {}))
      a2 in s2 && ("maskInputOptions" === a2 ? s2.maskInputOptions = t({ password: true }, l2) : s2[a2] = l2);
    (this._canvasRecording && this._canvasRecording.enabled && (s2.recordCanvas = true, s2.sampling = { canvas: this._canvasRecording.fps }, s2.dataURLOptions = { type: "image/webp", quality: this._canvasRecording.quality }), this._masking) && (s2.maskAllInputs = null === (i2 = this._masking.maskAllInputs) || void 0 === i2 || i2, s2.maskTextSelector = null !== (r2 = this._masking.maskTextSelector) && void 0 !== r2 ? r2 : void 0, s2.blockSelector = null !== (n2 = this._masking.blockSelector) && void 0 !== n2 ? n2 : void 0);
    var u2 = Ar();
    if (u2) {
      this._mutationRateLimiter = null !== (e2 = this._mutationRateLimiter) && void 0 !== e2 ? e2 : new Vi(u2, { refillRate: this._instance.config.session_recording.__mutationRateLimiterRefillRate, bucketSize: this._instance.config.session_recording.__mutationRateLimiterBucketSize, onBlockedNode: (e3, t2) => {
        var i3 = "Too many mutations on node '".concat(e3, "'. Rate limiting. This could be due to SVG animations or something similar");
        Mr.info(i3, { node: t2 }), this.log(Or + " " + i3, "warn");
      } });
      var c2 = this._gatherRRWebPlugins();
      this._stopRrweb = u2(t({ emit: (e3) => {
        this.onRRwebEmit(e3);
      }, plugins: c2 }, s2)), this._lastActivityTimestamp = Date.now(), this._isIdle = N(this._isIdle) ? this._isIdle : "unknown", this._tryAddCustomEvent("$session_options", { sessionRecordingOptions: s2, activePlugins: c2.map((e3) => null == e3 ? void 0 : e3.name) }), this._tryAddCustomEvent("$posthog_config", { config: this._instance.config });
    } else
      Mr.error("onScriptLoaded was called but rrwebRecord is not available. This indicates something has gone wrong.");
  }
  _scheduleFullSnapshot() {
    if (this._fullSnapshotTimer && clearInterval(this._fullSnapshotTimer), true !== this._isIdle) {
      var e2 = this._fullSnapshotIntervalMillis;
      e2 && (this._fullSnapshotTimer = setInterval(() => {
        this._tryTakeFullSnapshot();
      }, e2));
    }
  }
  _gatherRRWebPlugins() {
    var e2, t2, i2, r2, n2 = [], s2 = null === (e2 = f.__PosthogExtensions__) || void 0 === e2 || null === (t2 = e2.rrwebPlugins) || void 0 === t2 ? void 0 : t2.getRecordConsolePlugin;
    s2 && this._isConsoleLogCaptureEnabled && n2.push(s2());
    var o2 = null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (r2 = i2.rrwebPlugins) || void 0 === r2 ? void 0 : r2.getRecordNetworkPlugin;
    this._networkPayloadCapture && T(o2) && (!yt.includes(location.hostname) || this._forceAllowLocalhostNetworkCapture ? n2.push(o2(Wi(this._instance.config, this._networkPayloadCapture))) : Mr.info("NetworkCapture not started because we are on localhost."));
    return n2;
  }
  onRRwebEmit(e2) {
    var i2;
    if (this._processQueuedEvents(), e2 && R(e2)) {
      if (e2.type === Ai.Meta) {
        var r2 = this._maskUrl(e2.data.href);
        if (this._lastHref = r2, !r2)
          return;
        e2.data.href = r2;
      } else
        this._pageViewFallBack();
      if (this._checkUrlTriggerConditions(), !this._urlBlocked || function(e3) {
        return e3.type === Ai.Custom && "recording paused" === e3.data.tag;
      }(e2)) {
        e2.type === Ai.FullSnapshot && this._scheduleFullSnapshot(), e2.type === Ai.FullSnapshot && "trigger_pending" === this._triggerStatus && this._clearBuffer();
        var n2 = this._mutationRateLimiter ? this._mutationRateLimiter.throttleMutations(e2) : e2;
        if (n2) {
          var s2 = function(e3) {
            var t2 = e3;
            if (t2 && R(t2) && 6 === t2.type && R(t2.data) && "rrweb/console@1" === t2.data.plugin) {
              t2.data.payload.payload.length > 10 && (t2.data.payload.payload = t2.data.payload.payload.slice(0, 10), t2.data.payload.payload.push("...[truncated]"));
              for (var i3 = [], r3 = 0; r3 < t2.data.payload.payload.length; r3++)
                t2.data.payload.payload[r3] && t2.data.payload.payload[r3].length > 2e3 ? i3.push(t2.data.payload.payload[r3].slice(0, 2e3) + "...[truncated]") : i3.push(t2.data.payload.payload[r3]);
              return t2.data.payload.payload = i3, e3;
            }
            return e3;
          }(n2);
          if (this._updateWindowAndSessionIds(s2), true !== this._isIdle || Br(s2)) {
            if (Br(s2)) {
              var o2 = s2.data.payload;
              if (o2) {
                var a2 = o2.lastActivityTimestamp, l2 = o2.threshold;
                s2.timestamp = a2 + l2;
              }
            }
            var u2 = null === (i2 = this._instance.config.session_recording.compress_events) || void 0 === i2 || i2 ? function(e3) {
              if (Oi(e3) < 1024)
                return e3;
              try {
                if (e3.type === Ai.FullSnapshot)
                  return t(t({}, e3), {}, { data: Nr(e3.data), cv: "2024-10" });
                if (e3.type === Ai.IncrementalSnapshot && e3.data.source === Li.Mutation)
                  return t(t({}, e3), {}, { cv: "2024-10", data: t(t({}, e3.data), {}, { texts: Nr(e3.data.texts), attributes: Nr(e3.data.attributes), removes: Nr(e3.data.removes), adds: Nr(e3.data.adds) }) });
                if (e3.type === Ai.IncrementalSnapshot && e3.data.source === Li.StyleSheetRule)
                  return t(t({}, e3), {}, { cv: "2024-10", data: t(t({}, e3.data), {}, { adds: e3.data.adds ? Nr(e3.data.adds) : void 0, removes: e3.data.removes ? Nr(e3.data.removes) : void 0 }) });
              } catch (e4) {
                Mr.error("could not compress event - will use uncompressed event", e4);
              }
              return e3;
            }(s2) : s2, c2 = { $snapshot_bytes: Oi(u2), $snapshot_data: u2, $session_id: this._sessionId, $window_id: this._windowId };
            "disabled" !== this.status ? this._captureSnapshotBuffered(c2) : this._clearBuffer();
          }
        }
      }
    }
  }
  _pageViewFallBack() {
    if (!this._instance.config.capture_pageview && s) {
      var e2 = this._maskUrl(s.location.href);
      this._lastHref !== e2 && (this._tryAddCustomEvent("$url_changed", { href: e2 }), this._lastHref = e2);
    }
  }
  _processQueuedEvents() {
    if (this._queuedRRWebEvents.length) {
      var e2 = [...this._queuedRRWebEvents];
      this._queuedRRWebEvents = [], e2.forEach((e3) => {
        Date.now() - e3.enqueuedAt <= 2e3 && this._tryRRWebMethod(e3);
      });
    }
  }
  _maskUrl(e2) {
    var t2 = this._instance.config.session_recording;
    if (t2.maskNetworkRequestFn) {
      var i2, r2 = { url: e2 };
      return null === (i2 = r2 = t2.maskNetworkRequestFn(r2)) || void 0 === i2 ? void 0 : i2.url;
    }
    return e2;
  }
  _clearBuffer() {
    return this._buffer = { size: 0, data: [], sessionId: this._sessionId, windowId: this._windowId }, this._buffer;
  }
  _flushBuffer() {
    this._flushBufferTimer && (clearTimeout(this._flushBufferTimer), this._flushBufferTimer = void 0);
    var e2 = this._minimumDuration, t2 = this._sessionDuration, i2 = q(t2) && t2 >= 0, r2 = q(e2) && i2 && t2 < e2;
    if ("buffering" === this.status || "paused" === this.status || "disabled" === this.status || r2)
      return this._flushBufferTimer = setTimeout(() => {
        this._flushBuffer();
      }, 2e3), this._buffer;
    this._buffer.data.length > 0 && Mi(this._buffer).forEach((e3) => {
      this._captureSnapshot({ $snapshot_bytes: e3.size, $snapshot_data: e3.data, $session_id: e3.sessionId, $window_id: e3.windowId, $lib: "web", $lib_version: m.LIB_VERSION });
    });
    return this._clearBuffer();
  }
  _captureSnapshotBuffered(e2) {
    var t2, i2 = 2 + ((null === (t2 = this._buffer) || void 0 === t2 ? void 0 : t2.data.length) || 0);
    !this._isIdle && (this._buffer.size + e2.$snapshot_bytes + i2 > 943718.4 || this._buffer.sessionId !== this._sessionId) && (this._buffer = this._flushBuffer()), this._buffer.size += e2.$snapshot_bytes, this._buffer.data.push(e2.$snapshot_data), this._flushBufferTimer || this._isIdle || (this._flushBufferTimer = setTimeout(() => {
      this._flushBuffer();
    }, 2e3));
  }
  _captureSnapshot(e2) {
    this._instance.capture("$snapshot", e2, { _url: this._instance.requestRouter.endpointFor("api", this._endpoint), _noTruncate: true, _batchKey: "recordings", skip_client_rate_limiting: true });
  }
  _checkUrlTriggerConditions() {
    if (void 0 !== s && s.location.href) {
      var e2 = s.location.href, t2 = this._urlBlocked, i2 = Hr(e2, this._urlBlocklist);
      i2 && !t2 ? this._pauseRecording() : !i2 && t2 && this._resumeRecording(), Hr(e2, this._urlTriggers) && this._activateTrigger("url");
    }
  }
  _activateTrigger(e2) {
    var t2, i2;
    "trigger_pending" === this._triggerStatus && (null === (t2 = this._instance) || void 0 === t2 || null === (i2 = t2.persistence) || void 0 === i2 || i2.register({ ["url" === e2 ? Ee : xe]: this._sessionId }), this._flushBuffer(), this._reportStarted(e2 + "_trigger_matched"));
  }
  _pauseRecording() {
    this._urlBlocked || (this._urlBlocked = true, clearInterval(this._fullSnapshotTimer), Mr.info("recording paused due to URL blocker"), this._tryAddCustomEvent("recording paused", { reason: "url blocker" }));
  }
  _resumeRecording() {
    this._urlBlocked && (this._urlBlocked = false, this._tryTakeFullSnapshot(), this._scheduleFullSnapshot(), this._tryAddCustomEvent("recording resumed", { reason: "left blocked url" }), Mr.info("recording resumed"));
  }
  _addEventTriggerListener() {
    0 !== this._eventTriggers.length && D(this._removeEventTriggerCaptureHook) && (this._removeEventTriggerCaptureHook = this._instance.on("eventCaptured", (e2) => {
      try {
        this._eventTriggers.includes(e2.event) && this._activateTrigger("event");
      } catch (e3) {
        Mr.error("Could not activate event trigger", e3);
      }
    }));
  }
  overrideLinkedFlag() {
    this._linkedFlagSeen = true, this._tryTakeFullSnapshot(), this._reportStarted("linked_flag_overridden");
  }
  overrideSampling() {
    var e2;
    null === (e2 = this._instance.persistence) || void 0 === e2 || e2.register({ [ke]: true }), this._tryTakeFullSnapshot(), this._reportStarted("sampling_overridden");
  }
  overrideTrigger(e2) {
    this._activateTrigger(e2);
  }
  _reportStarted(e2, t2) {
    this._instance.register_for_session({ $session_recording_start_reason: e2 }), Mr.info(e2.replace("_", " "), t2), S(["recording_initialized", "session_id_changed"], e2) || this._tryAddCustomEvent(e2, t2);
  }
  get sdkDebugProperties() {
    var { sessionStartTimestamp: e2 } = this._sessionManager.checkAndGetSessionAndWindowId(true);
    return { $recording_status: this.status, $sdk_debug_replay_internal_buffer_length: this._buffer.data.length, $sdk_debug_replay_internal_buffer_size: this._buffer.size, $sdk_debug_current_session_duration: this._sessionDuration, $sdk_debug_session_start: e2 };
  }
}
var Ur = z("[SegmentIntegration]");
function zr(e2, t2) {
  var i2 = e2.config.segment;
  if (!i2)
    return t2();
  !function(e3, t3) {
    var i3 = e3.config.segment;
    if (!i3)
      return t3();
    var r2 = (i4) => {
      var r3 = () => i4.anonymousId() || Dt();
      e3.config.get_device_id = r3, i4.id() && (e3.register({ distinct_id: i4.id(), $device_id: r3() }), e3.persistence.set_property(Me, "identified")), t3();
    }, n2 = i3.user();
    "then" in n2 && T(n2.then) ? n2.then((e4) => r2(e4)) : r2(n2);
  }(e2, () => {
    i2.register(((e3) => {
      Promise && Promise.resolve || Ur.warn("This browser does not have Promise support, and can not use the segment integration");
      var t3 = (t4, i3) => {
        var r2;
        if (!i3)
          return t4;
        t4.event.userId || t4.event.anonymousId === e3.get_distinct_id() || (Ur.info("No userId set, resetting PostHog"), e3.reset()), t4.event.userId && t4.event.userId !== e3.get_distinct_id() && (Ur.info("UserId set, identifying with PostHog"), e3.identify(t4.event.userId));
        var n2 = e3._calculate_event_properties(i3, null !== (r2 = t4.event.properties) && void 0 !== r2 ? r2 : {}, new Date());
        return t4.event.properties = Object.assign({}, n2, t4.event.properties), t4;
      };
      return { name: "PostHog JS", type: "enrichment", version: "1.0.0", isLoaded: () => true, load: () => Promise.resolve(), track: (e4) => t3(e4, e4.event.event), page: (e4) => t3(e4, "$pageview"), identify: (e4) => t3(e4, "$identify"), screen: (e4) => t3(e4, "$screen") };
    })(e2)).then(() => {
      t2();
    });
  });
}
var Wr = "posthog-js";
function Gr(e2) {
  var { organization: i2, projectId: r2, prefix: n2, severityAllowList: s2 = ["error"] } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return (o2) => {
    var a2, l2, u2, c2, d2;
    if (!("*" === s2 || s2.includes(o2.level)) || !e2.__loaded)
      return o2;
    o2.tags || (o2.tags = {});
    var _2 = e2.requestRouter.endpointFor("ui", "/project/".concat(e2.config.token, "/person/").concat(e2.get_distinct_id()));
    o2.tags["PostHog Person URL"] = _2, e2.sessionRecordingStarted() && (o2.tags["PostHog Recording URL"] = e2.get_session_replay_url({ withTimestamp: true }));
    var h2 = (null === (a2 = o2.exception) || void 0 === a2 ? void 0 : a2.values) || [], p2 = h2.map((e3) => t(t({}, e3), {}, { stacktrace: e3.stacktrace ? t(t({}, e3.stacktrace), {}, { type: "raw", frames: (e3.stacktrace.frames || []).map((e4) => t(t({}, e4), {}, { platform: "web:javascript" })) }) : void 0 })), v2 = { $exception_message: (null === (l2 = h2[0]) || void 0 === l2 ? void 0 : l2.value) || o2.message, $exception_type: null === (u2 = h2[0]) || void 0 === u2 ? void 0 : u2.type, $exception_personURL: _2, $exception_level: o2.level, $exception_list: p2, $sentry_event_id: o2.event_id, $sentry_exception: o2.exception, $sentry_exception_message: (null === (c2 = h2[0]) || void 0 === c2 ? void 0 : c2.value) || o2.message, $sentry_exception_type: null === (d2 = h2[0]) || void 0 === d2 ? void 0 : d2.type, $sentry_tags: o2.tags };
    return i2 && r2 && (v2.$sentry_url = (n2 || "https://sentry.io/organizations/") + i2 + "/issues/?project=" + r2 + "&query=" + o2.event_id), e2.exceptions.sendExceptionEvent(v2), o2;
  };
}
class Vr {
  constructor(e2, t2, i2, r2, n2) {
    this.name = Wr, this.setupOnce = function(s2) {
      s2(Gr(e2, { organization: t2, projectId: i2, prefix: r2, severityAllowList: n2 }));
    };
  }
}
var Jr, Yr = null != s && s.location ? Et(s.location.hash, "__posthog") || Et(location.hash, "state") : null, Kr = "_postHogToolbarParams", Xr = z("[Toolbar]");
!function(e2) {
  e2[e2.UNINITIALIZED = 0] = "UNINITIALIZED", e2[e2.LOADING = 1] = "LOADING", e2[e2.LOADED = 2] = "LOADED";
}(Jr || (Jr = {}));
class Qr {
  constructor(e2) {
    this.instance = e2;
  }
  _setToolbarState(e2) {
    f.ph_toolbar_state = e2;
  }
  _getToolbarState() {
    var e2;
    return null !== (e2 = f.ph_toolbar_state) && void 0 !== e2 ? e2 : Jr.UNINITIALIZED;
  }
  maybeLoadToolbar() {
    var e2, t2, i2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
    if (!s || !d)
      return false;
    i2 = null !== (e2 = i2) && void 0 !== e2 ? e2 : s.location, n2 = null !== (t2 = n2) && void 0 !== t2 ? t2 : s.history;
    try {
      if (!r2) {
        try {
          s.localStorage.setItem("test", "test"), s.localStorage.removeItem("test");
        } catch (e3) {
          return false;
        }
        r2 = null == s ? void 0 : s.localStorage;
      }
      var o2, a2 = Yr || Et(i2.hash, "__posthog") || Et(i2.hash, "state"), l2 = a2 ? X(() => JSON.parse(atob(decodeURIComponent(a2)))) || X(() => JSON.parse(decodeURIComponent(a2))) : null;
      return l2 && "ph_authorize" === l2.action ? ((o2 = l2).source = "url", o2 && Object.keys(o2).length > 0 && (l2.desiredHash ? i2.hash = l2.desiredHash : n2 ? n2.replaceState(n2.state, "", i2.pathname + i2.search) : i2.hash = "")) : ((o2 = JSON.parse(r2.getItem(Kr) || "{}")).source = "localstorage", delete o2.userIntent), !(!o2.token || this.instance.config.token !== o2.token) && (this.loadToolbar(o2), true);
    } catch (e3) {
      return false;
    }
  }
  _callLoadToolbar(e2) {
    var t2 = f.ph_load_toolbar || f.ph_load_editor;
    !D(t2) && T(t2) ? t2(e2, this.instance) : Xr.warn("No toolbar load function found");
  }
  loadToolbar(e2) {
    var i2 = !(null == d || !d.getElementById(He));
    if (!s || i2)
      return false;
    var r2 = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, n2 = t(t({ token: this.instance.config.token }, e2), {}, { apiURL: this.instance.requestRouter.endpointFor("ui") }, r2 ? { instrument: false } : {});
    if (s.localStorage.setItem(Kr, JSON.stringify(t(t({}, n2), {}, { source: void 0 }))), this._getToolbarState() === Jr.LOADED)
      this._callLoadToolbar(n2);
    else if (this._getToolbarState() === Jr.UNINITIALIZED) {
      var o2, a2;
      this._setToolbarState(Jr.LOADING), null === (o2 = f.__PosthogExtensions__) || void 0 === o2 || null === (a2 = o2.loadExternalDependency) || void 0 === a2 || a2.call(o2, this.instance, "toolbar", (e3) => {
        if (e3)
          return Xr.error("[Toolbar] Failed to load", e3), void this._setToolbarState(Jr.UNINITIALIZED);
        this._setToolbarState(Jr.LOADED), this._callLoadToolbar(n2);
      }), ne(s, "turbolinks:load", () => {
        this._setToolbarState(Jr.UNINITIALIZED), this.loadToolbar(n2);
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
var Zr = z("[TracingHeaders]");
class en {
  constructor(e2) {
    i(this, "_restoreXHRPatch", void 0), i(this, "_restoreFetchPatch", void 0), i(this, "_startCapturing", () => {
      var e3, t2, i2, r2;
      O(this._restoreXHRPatch) && (null === (e3 = f.__PosthogExtensions__) || void 0 === e3 || null === (t2 = e3.tracingHeadersPatchFns) || void 0 === t2 || t2._patchXHR(this._instance.sessionManager));
      O(this._restoreFetchPatch) && (null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (r2 = i2.tracingHeadersPatchFns) || void 0 === r2 || r2._patchFetch(this._instance.sessionManager));
    }), this._instance = e2;
  }
  _loadScript(e2) {
    var t2, i2, r2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.tracingHeadersPatchFns && e2(), null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (r2 = i2.loadExternalDependency) || void 0 === r2 || r2.call(i2, this._instance, "tracing-headers", (t3) => {
      if (t3)
        return Zr.error("failed to load script", t3);
      e2();
    });
  }
  startIfEnabledOrStop() {
    var e2, t2;
    this._instance.config.__add_tracing_headers ? this._loadScript(this._startCapturing) : (null === (e2 = this._restoreXHRPatch) || void 0 === e2 || e2.call(this), null === (t2 = this._restoreFetchPatch) || void 0 === t2 || t2.call(this), this._restoreXHRPatch = void 0, this._restoreFetchPatch = void 0);
  }
}
var tn = z("[Web Vitals]"), rn = 9e5;
class nn {
  constructor(e2) {
    var r2;
    i(this, "_enabledServerSide", false), i(this, "_initialized", false), i(this, "_buffer", { url: void 0, metrics: [], firstMetricTimestamp: void 0 }), i(this, "_flushToCapture", () => {
      clearTimeout(this._delayedFlushTimer), 0 !== this._buffer.metrics.length && (this._instance.capture("$web_vitals", this._buffer.metrics.reduce((e3, i2) => t(t({}, e3), {}, { ["$web_vitals_".concat(i2.name, "_event")]: t({}, i2), ["$web_vitals_".concat(i2.name, "_value")]: i2.value }), {})), this._buffer = { url: void 0, metrics: [], firstMetricTimestamp: void 0 });
    }), i(this, "_addToBuffer", (e3) => {
      var i2, r3 = null === (i2 = this._instance.sessionManager) || void 0 === i2 ? void 0 : i2.checkAndGetSessionAndWindowId(true);
      if (O(r3))
        tn.error("Could not read session ID. Dropping metrics!");
      else {
        this._buffer = this._buffer || { url: void 0, metrics: [], firstMetricTimestamp: void 0 };
        var n2 = this._currentURL();
        if (!O(n2))
          if (D(null == e3 ? void 0 : e3.name) || D(null == e3 ? void 0 : e3.value))
            tn.error("Invalid metric received", e3);
          else if (this._maxAllowedValue && e3.value >= this._maxAllowedValue)
            tn.error("Ignoring metric with value >= " + this._maxAllowedValue, e3);
          else
            this._buffer.url !== n2 && (this._flushToCapture(), this._delayedFlushTimer = setTimeout(this._flushToCapture, this.flushToCaptureTimeoutMs)), O(this._buffer.url) && (this._buffer.url = n2), this._buffer.firstMetricTimestamp = O(this._buffer.firstMetricTimestamp) ? Date.now() : this._buffer.firstMetricTimestamp, e3.attribution && e3.attribution.interactionTargetElement && (e3.attribution.interactionTargetElement = void 0), this._buffer.metrics.push(t(t({}, e3), {}, { $current_url: n2, $session_id: r3.sessionId, $window_id: r3.windowId, timestamp: Date.now() })), this._buffer.metrics.length === this.allowedMetrics.length && this._flushToCapture();
      }
    }), i(this, "_startCapturing", () => {
      var e3, t2, i2, r3, n2 = f.__PosthogExtensions__;
      O(n2) || O(n2.postHogWebVitalsCallbacks) || ({ onLCP: e3, onCLS: t2, onFCP: i2, onINP: r3 } = n2.postHogWebVitalsCallbacks), e3 && t2 && i2 && r3 ? (this.allowedMetrics.indexOf("LCP") > -1 && e3(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("CLS") > -1 && t2(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("FCP") > -1 && i2(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("INP") > -1 && r3(this._addToBuffer.bind(this)), this._initialized = true) : tn.error("web vitals callbacks not loaded - not starting");
    }), this._instance = e2, this._enabledServerSide = !(null === (r2 = this._instance.persistence) || void 0 === r2 || !r2.props[de]), this.startIfEnabled();
  }
  get allowedMetrics() {
    var e2, t2, i2 = R(this._instance.config.capture_performance) ? null === (e2 = this._instance.config.capture_performance) || void 0 === e2 ? void 0 : e2.web_vitals_allowed_metrics : void 0;
    return O(i2) ? (null === (t2 = this._instance.persistence) || void 0 === t2 ? void 0 : t2.props[he]) || ["CLS", "FCP", "INP", "LCP"] : i2;
  }
  get flushToCaptureTimeoutMs() {
    return (R(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals_delayed_flush_ms : void 0) || 5e3;
  }
  get _maxAllowedValue() {
    var e2 = R(this._instance.config.capture_performance) && q(this._instance.config.capture_performance.__web_vitals_max_value) ? this._instance.config.capture_performance.__web_vitals_max_value : rn;
    return 0 < e2 && e2 <= 6e4 ? rn : e2;
  }
  get isEnabled() {
    var e2 = null == _ ? void 0 : _.protocol;
    if ("http:" !== e2 && "https:" !== e2)
      return tn.info("Web Vitals are disabled on non-http/https protocols"), false;
    var t2 = R(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals : N(this._instance.config.capture_performance) ? this._instance.config.capture_performance : void 0;
    return N(t2) ? t2 : this._enabledServerSide;
  }
  startIfEnabled() {
    this.isEnabled && !this._initialized && (tn.info("enabled, starting..."), this._loadScript(this._startCapturing));
  }
  onRemoteConfig(e2) {
    var t2 = R(e2.capturePerformance) && !!e2.capturePerformance.web_vitals, i2 = R(e2.capturePerformance) ? e2.capturePerformance.web_vitals_allowed_metrics : void 0;
    this._instance.persistence && (this._instance.persistence.register({ [de]: t2 }), this._instance.persistence.register({ [he]: i2 })), this._enabledServerSide = t2, this.startIfEnabled();
  }
  _loadScript(e2) {
    var t2, i2, r2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.postHogWebVitalsCallbacks && e2(), null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (r2 = i2.loadExternalDependency) || void 0 === r2 || r2.call(i2, this._instance, "web-vitals", (t3) => {
      t3 ? tn.error("failed to load script", t3) : e2();
    });
  }
  _currentURL() {
    var e2 = s ? s.location.href : void 0;
    return e2 || tn.error("Could not determine current URL"), e2;
  }
}
var sn = z("[Heatmaps]");
function on(e2) {
  return R(e2) && "clientX" in e2 && "clientY" in e2 && q(e2.clientX) && q(e2.clientY);
}
class an {
  constructor(e2) {
    var t2;
    i(this, "rageclicks", new mt()), i(this, "_enabledServerSide", false), i(this, "_initialized", false), i(this, "_flushInterval", null), this.instance = e2, this._enabledServerSide = !(null === (t2 = this.instance.persistence) || void 0 === t2 || !t2.props[ue]);
  }
  get flushIntervalMilliseconds() {
    var e2 = 5e3;
    return R(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (e2 = this.instance.config.capture_heatmaps.flush_interval_milliseconds), e2;
  }
  get isEnabled() {
    return O(this.instance.config.capture_heatmaps) ? O(this.instance.config.enable_heatmaps) ? this._enabledServerSide : this.instance.config.enable_heatmaps : false !== this.instance.config.capture_heatmaps;
  }
  startIfEnabled() {
    if (this.isEnabled) {
      if (this._initialized)
        return;
      sn.info("starting..."), this._setupListeners(), this._flushInterval = setInterval(this._flush.bind(this), this.flushIntervalMilliseconds);
    } else {
      var e2, t2;
      clearInterval(null !== (e2 = this._flushInterval) && void 0 !== e2 ? e2 : void 0), null === (t2 = this._deadClicksCapture) || void 0 === t2 || t2.stop(), this.getAndClearBuffer();
    }
  }
  onRemoteConfig(e2) {
    var t2 = !!e2.heatmaps;
    this.instance.persistence && this.instance.persistence.register({ [ue]: t2 }), this._enabledServerSide = t2, this.startIfEnabled();
  }
  getAndClearBuffer() {
    var e2 = this._buffer;
    return this._buffer = void 0, e2;
  }
  _onDeadClick(e2) {
    this._onClick(e2.originalEvent, "deadclick");
  }
  _setupListeners() {
    s && d && (ne(s, "beforeunload", this._flush.bind(this)), ne(d, "click", (e2) => this._onClick(e2 || (null == s ? void 0 : s.event)), { capture: true }), ne(d, "mousemove", (e2) => this._onMouseMove(e2 || (null == s ? void 0 : s.event)), { capture: true }), this._deadClicksCapture = new ri(this.instance, ti, this._onDeadClick.bind(this)), this._deadClicksCapture.startIfEnabled(), this._initialized = true);
  }
  _getProperties(e2, t2) {
    var i2 = this.instance.scrollManager.scrollY(), r2 = this.instance.scrollManager.scrollX(), n2 = this.instance.scrollManager.scrollElement(), o2 = function(e3, t3, i3) {
      for (var r3 = e3; r3 && We(r3) && !Ge(r3, "body"); ) {
        if (r3 === i3)
          return false;
        if (S(t3, null == s ? void 0 : s.getComputedStyle(r3).position))
          return true;
        r3 = it(r3);
      }
      return false;
    }(et(e2), ["fixed", "sticky"], n2);
    return { x: e2.clientX + (o2 ? 0 : r2), y: e2.clientY + (o2 ? 0 : i2), target_fixed: o2, type: t2 };
  }
  _onClick(e2) {
    var i2, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "click";
    if (!ze(e2.target) && on(e2)) {
      var n2 = this._getProperties(e2, r2);
      null !== (i2 = this.rageclicks) && void 0 !== i2 && i2.isRageClick(e2.clientX, e2.clientY, new Date().getTime()) && this._capture(t(t({}, n2), {}, { type: "rageclick" })), this._capture(n2);
    }
  }
  _onMouseMove(e2) {
    !ze(e2.target) && on(e2) && (clearTimeout(this._mouseMoveTimeout), this._mouseMoveTimeout = setTimeout(() => {
      this._capture(this._getProperties(e2, "mousemove"));
    }, 500));
  }
  _capture(e2) {
    if (s) {
      var t2 = s.location.href;
      this._buffer = this._buffer || {}, this._buffer[t2] || (this._buffer[t2] = []), this._buffer[t2].push(e2);
    }
  }
  _flush() {
    this._buffer && !$(this._buffer) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
  }
}
class ln {
  constructor(e2) {
    this._instance = e2;
  }
  doPageView(e2, t2) {
    var i2, r2 = this._previousPageViewProperties(e2, t2);
    return this._currentPageview = { pathname: null !== (i2 = null == s ? void 0 : s.location.pathname) && void 0 !== i2 ? i2 : "", pageViewId: t2, timestamp: e2 }, this._instance.scrollManager.resetContext(), r2;
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
    var r2 = { $pageview_id: t2, $prev_pageview_id: i2.pageViewId }, n2 = this._instance.scrollManager.getContext();
    if (n2 && !this._instance.config.disable_scroll_properties) {
      var { maxScrollHeight: s2, lastScrollY: o2, maxScrollY: a2, maxContentHeight: l2, lastContentY: u2, maxContentY: c2 } = n2;
      if (!(O(s2) || O(o2) || O(a2) || O(l2) || O(u2) || O(c2))) {
        s2 = Math.ceil(s2), o2 = Math.ceil(o2), a2 = Math.ceil(a2), l2 = Math.ceil(l2), u2 = Math.ceil(u2), c2 = Math.ceil(c2);
        var d2 = s2 <= 1 ? 1 : Gi(o2 / s2, 0, 1), _2 = s2 <= 1 ? 1 : Gi(a2 / s2, 0, 1), h2 = l2 <= 1 ? 1 : Gi(u2 / l2, 0, 1), p2 = l2 <= 1 ? 1 : Gi(c2 / l2, 0, 1);
        r2 = J(r2, { $prev_pageview_last_scroll: o2, $prev_pageview_last_scroll_percentage: d2, $prev_pageview_max_scroll: a2, $prev_pageview_max_scroll_percentage: _2, $prev_pageview_last_content: u2, $prev_pageview_last_content_percentage: h2, $prev_pageview_max_content: c2, $prev_pageview_max_content_percentage: p2 });
      }
    }
    return i2.pathname && (r2.$prev_pageview_pathname = i2.pathname), i2.timestamp && (r2.$prev_pageview_duration = (e2.getTime() - i2.timestamp.getTime()) / 1e3), r2;
  }
}
class un {
  constructor(e2) {
    this._instance = e2;
  }
  sendExceptionEvent(e2) {
    this._instance.capture("$exception", e2, { _noTruncate: true, _batchKey: "exceptionEvent" });
  }
}
var cn = "Mobile", dn = "iOS", _n = "Android", hn = "Tablet", pn = _n + " " + hn, vn = "iPad", gn = "Apple", fn = gn + " Watch", mn = "Safari", yn = "BlackBerry", bn = "Samsung", wn = bn + "Browser", Sn = bn + " Internet", kn = "Chrome", En = kn + " OS", xn = kn + " " + dn, In = "Internet Explorer", Cn = In + " " + cn, Pn = "Opera", Fn = Pn + " Mini", Tn = "Edge", Rn = "Microsoft " + Tn, $n = "Firefox", On = $n + " " + dn, Mn = "Nintendo", An = "PlayStation", Ln = "Xbox", Dn = _n + " " + cn, qn = cn + " " + mn, Nn = "Windows", Bn = Nn + " Phone", Hn = "Nokia", jn = "Ouya", Un = "Generic", zn = Un + " " + cn.toLowerCase(), Wn = Un + " " + hn.toLowerCase(), Gn = "Konqueror", Vn = "(\\d+(\\.\\d+)?)", Jn = new RegExp("Version/" + Vn), Yn = new RegExp(Ln, "i"), Kn = new RegExp(An + " \\w+", "i"), Xn = new RegExp(Mn + " \\w+", "i"), Qn = new RegExp(yn + "|PlayBook|BB10", "i"), Zn = { "NT3.51": "NT 3.11", "NT4.0": "NT 4.0", "5.0": "2000", 5.1: "XP", 5.2: "XP", "6.0": "Vista", 6.1: "7", 6.2: "8", 6.3: "8.1", 6.4: "10", "10.0": "10" };
var es = (e2, t2) => t2 && S(t2, gn) || function(e3) {
  return S(e3, mn) && !S(e3, kn) && !S(e3, _n);
}(e2), ts = function(e2, t2) {
  return t2 = t2 || "", S(e2, " OPR/") && S(e2, "Mini") ? Fn : S(e2, " OPR/") ? Pn : Qn.test(e2) ? yn : S(e2, "IE" + cn) || S(e2, "WPDesktop") ? Cn : S(e2, wn) ? Sn : S(e2, Tn) || S(e2, "Edg/") ? Rn : S(e2, "FBIOS") ? "Facebook " + cn : S(e2, "UCWEB") || S(e2, "UCBrowser") ? "UC Browser" : S(e2, "CriOS") ? xn : S(e2, "CrMo") || S(e2, kn) ? kn : S(e2, _n) && S(e2, mn) ? Dn : S(e2, "FxiOS") ? On : S(e2.toLowerCase(), Gn.toLowerCase()) ? Gn : es(e2, t2) ? S(e2, cn) ? qn : mn : S(e2, $n) ? $n : S(e2, "MSIE") || S(e2, "Trident/") ? In : S(e2, "Gecko") ? $n : "";
}, is = { [Cn]: [new RegExp("rv:" + Vn)], [Rn]: [new RegExp(Tn + "?\\/" + Vn)], [kn]: [new RegExp("(" + kn + "|CrMo)\\/" + Vn)], [xn]: [new RegExp("CriOS\\/" + Vn)], "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + Vn)], [mn]: [Jn], [qn]: [Jn], [Pn]: [new RegExp("(Opera|OPR)\\/" + Vn)], [$n]: [new RegExp($n + "\\/" + Vn)], [On]: [new RegExp("FxiOS\\/" + Vn)], [Gn]: [new RegExp("Konqueror[:/]?" + Vn, "i")], [yn]: [new RegExp(yn + " " + Vn), Jn], [Dn]: [new RegExp("android\\s" + Vn, "i")], [Sn]: [new RegExp(wn + "\\/" + Vn)], [In]: [new RegExp("(rv:|MSIE )" + Vn)], Mozilla: [new RegExp("rv:" + Vn)] }, rs = function(e2, t2) {
  var i2 = ts(e2, t2), r2 = is[i2];
  if (O(r2))
    return null;
  for (var n2 = 0; n2 < r2.length; n2++) {
    var s2 = r2[n2], o2 = e2.match(s2);
    if (o2)
      return parseFloat(o2[o2.length - 2]);
  }
  return null;
}, ns = [[new RegExp(Ln + "; " + Ln + " (.*?)[);]", "i"), (e2) => [Ln, e2 && e2[1] || ""]], [new RegExp(Mn, "i"), [Mn, ""]], [new RegExp(An, "i"), [An, ""]], [Qn, [yn, ""]], [new RegExp(Nn, "i"), (e2, t2) => {
  if (/Phone/.test(t2) || /WPDesktop/.test(t2))
    return [Bn, ""];
  if (new RegExp(cn).test(t2) && !/IEMobile\b/.test(t2))
    return [Nn + " " + cn, ""];
  var i2 = /Windows NT ([0-9.]+)/i.exec(t2);
  if (i2 && i2[1]) {
    var r2 = i2[1], n2 = Zn[r2] || "";
    return /arm/i.test(t2) && (n2 = "RT"), [Nn, n2];
  }
  return [Nn, ""];
}], [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (e2) => {
  if (e2 && e2[3]) {
    var t2 = [e2[3], e2[4], e2[5] || "0"];
    return [dn, t2.join(".")];
  }
  return [dn, ""];
}], [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (e2) => {
  var t2 = "";
  return e2 && e2.length >= 3 && (t2 = O(e2[2]) ? e2[3] : e2[2]), ["watchOS", t2];
}], [new RegExp("(" + _n + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + _n + ")", "i"), (e2) => {
  if (e2 && e2[2]) {
    var t2 = [e2[2], e2[3], e2[4] || "0"];
    return [_n, t2.join(".")];
  }
  return [_n, ""];
}], [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (e2) => {
  var t2 = ["Mac OS X", ""];
  if (e2 && e2[1]) {
    var i2 = [e2[1], e2[2], e2[3] || "0"];
    t2[1] = i2.join(".");
  }
  return t2;
}], [/Mac/i, ["Mac OS X", ""]], [/CrOS/, [En, ""]], [/Linux|debian/i, ["Linux", ""]]], ss = function(e2) {
  return Xn.test(e2) ? Mn : Kn.test(e2) ? An : Yn.test(e2) ? Ln : new RegExp(jn, "i").test(e2) ? jn : new RegExp("(" + Bn + "|WPDesktop)", "i").test(e2) ? Bn : /iPad/.test(e2) ? vn : /iPod/.test(e2) ? "iPod Touch" : /iPhone/.test(e2) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(e2) ? fn : Qn.test(e2) ? yn : /(kobo)\s(ereader|touch)/i.test(e2) ? "Kobo" : new RegExp(Hn, "i").test(e2) ? Hn : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(e2) || /(kf[a-z]+)( bui|\)).+silk\//i.test(e2) ? "Kindle Fire" : /(Android|ZTE)/i.test(e2) ? !new RegExp(cn).test(e2) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(e2) ? /pixel[\daxl ]{1,6}/i.test(e2) && !/pixel c/i.test(e2) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(e2) || /lmy47v/i.test(e2) && !/QTAQZ3/i.test(e2) ? _n : pn : _n : new RegExp("(pda|" + cn + ")", "i").test(e2) ? zn : new RegExp(hn, "i").test(e2) && !new RegExp(hn + " pc", "i").test(e2) ? Wn : "";
}, os = function(e2) {
  var t2 = ss(e2);
  return t2 === vn || t2 === pn || "Kobo" === t2 || "Kindle Fire" === t2 || t2 === Wn ? hn : t2 === Mn || t2 === Ln || t2 === An || t2 === jn ? "Console" : t2 === fn ? "Wearable" : t2 ? cn : "Desktop";
}, as = "https?://(.*)", ls = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "irclid", "_kx"], us = Y(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid"], ls), cs = "<masked>";
function ds(e2, t2, i2) {
  if (!d)
    return {};
  var r2 = t2 ? Y([], ls, i2 || []) : [];
  return _s(kt(d.URL, r2, cs), e2);
}
function _s(e2, t2) {
  var i2 = us.concat(t2 || []), r2 = {};
  return V(i2, function(t3) {
    var i3 = St(e2, t3);
    r2[t3] = i3 || null;
  }), r2;
}
function hs(e2) {
  var t2 = function(e3) {
    return e3 ? 0 === e3.search(as + "google.([^/?]*)") ? "google" : 0 === e3.search(as + "bing.com") ? "bing" : 0 === e3.search(as + "yahoo.com") ? "yahoo" : 0 === e3.search(as + "duckduckgo.com") ? "duckduckgo" : null : null;
  }(e2), i2 = "yahoo" != t2 ? "q" : "p", r2 = {};
  if (!L(t2)) {
    r2.$search_engine = t2;
    var n2 = d ? St(d.referrer, i2) : "";
    n2.length && (r2.ph_keyword = n2);
  }
  return r2;
}
function ps() {
  return navigator.language || navigator.userLanguage;
}
function vs() {
  return (null == d ? void 0 : d.referrer) || "$direct";
}
function gs(e2, t2) {
  var i2 = e2 ? Y([], ls, t2 || []) : [], r2 = null == _ ? void 0 : _.href.substring(0, 1e3);
  return { r: vs().substring(0, 1e3), u: r2 ? kt(r2, i2, cs) : void 0 };
}
function fs(e2) {
  var t2, { r: i2, u: r2 } = e2, n2 = { $referrer: i2, $referring_domain: null == i2 ? void 0 : "$direct" == i2 ? "$direct" : null === (t2 = bt(i2)) || void 0 === t2 ? void 0 : t2.host };
  if (r2) {
    n2.$current_url = r2;
    var s2 = bt(r2);
    n2.$host = null == s2 ? void 0 : s2.host, n2.$pathname = null == s2 ? void 0 : s2.pathname;
    var o2 = _s(r2);
    J(n2, o2);
  }
  if (i2) {
    var a2 = hs(i2);
    J(n2, a2);
  }
  return n2;
}
function ms() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e2) {
    return;
  }
}
function ys() {
  try {
    return new Date().getTimezoneOffset();
  } catch (e2) {
    return;
  }
}
function bs(e2, t2) {
  if (!g)
    return {};
  var i2, r2 = e2 ? Y([], ls, t2 || []) : [], [n2, o2] = function(e3) {
    for (var t3 = 0; t3 < ns.length; t3++) {
      var [i3, r3] = ns[t3], n3 = i3.exec(e3), s2 = n3 && (T(r3) ? r3(n3, e3) : r3);
      if (s2)
        return s2;
    }
    return ["", ""];
  }(g);
  return J(Z({ $os: n2, $os_version: o2, $browser: ts(g, navigator.vendor), $device: ss(g), $device_type: os(g), $timezone: ms(), $timezone_offset: ys() }), { $current_url: kt(null == _ ? void 0 : _.href, r2, cs), $host: null == _ ? void 0 : _.host, $pathname: null == _ ? void 0 : _.pathname, $raw_user_agent: g.length > 1e3 ? g.substring(0, 997) + "..." : g, $browser_version: rs(g, navigator.vendor), $browser_language: ps(), $browser_language_prefix: (i2 = ps(), "string" == typeof i2 ? i2.split("-")[0] : void 0), $screen_height: null == s ? void 0 : s.screen.height, $screen_width: null == s ? void 0 : s.screen.width, $viewport_height: null == s ? void 0 : s.innerHeight, $viewport_width: null == s ? void 0 : s.innerWidth, $lib: "web", $lib_version: m.LIB_VERSION, $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10), $time: Date.now() / 1e3 });
}
var ws, Ss = z("[FeatureFlags]"), ks = "$active_feature_flags", Es = "$override_feature_flags", xs = "$feature_flag_payloads", Is = "$override_feature_flag_payloads", Cs = "$feature_flag_request_id", Ps = (e2) => {
  var t2 = {};
  for (var [i2, r2] of K(e2 || {}))
    r2 && (t2[i2] = r2);
  return t2;
}, Fs = (e2) => {
  var t2 = e2.flags;
  return t2 ? (e2.featureFlags = Object.fromEntries(Object.keys(t2).map((e3) => {
    var i2;
    return [e3, null !== (i2 = t2[e3].variant) && void 0 !== i2 ? i2 : t2[e3].enabled];
  })), e2.featureFlagPayloads = Object.fromEntries(Object.keys(t2).filter((e3) => t2[e3].enabled).filter((e3) => {
    var i2;
    return null === (i2 = t2[e3].metadata) || void 0 === i2 ? void 0 : i2.payload;
  }).map((e3) => {
    var i2;
    return [e3, null === (i2 = t2[e3].metadata) || void 0 === i2 ? void 0 : i2.payload];
  }))) : Ss.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), e2;
};
!function(e2) {
  e2.FeatureFlags = "feature_flags", e2.Recordings = "recordings";
}(ws || (ws = {}));
class Ts {
  constructor(e2) {
    i(this, "_override_warning", false), i(this, "_hasLoadedFlags", false), i(this, "_requestInFlight", false), i(this, "_reloadingDisabled", false), i(this, "_additionalReloadRequested", false), i(this, "_decideCalled", false), i(this, "_flagsLoadedFromRemote", false), this._instance = e2, this.featureFlagEventHandlers = [];
  }
  decide() {
    if (this._instance.config.__preview_remote_config)
      this._decideCalled = true;
    else {
      var e2 = !this._reloadDebouncer && (this._instance.config.advanced_disable_feature_flags || this._instance.config.advanced_disable_feature_flags_on_first_load);
      this._callDecideEndpoint({ disableFlags: e2 });
    }
  }
  get hasLoadedFlags() {
    return this._hasLoadedFlags;
  }
  getFlags() {
    return Object.keys(this.getFlagVariants());
  }
  getFlagsWithDetails() {
    var e2 = this._instance.get_property(Pe), i2 = this._instance.get_property(Es), r2 = this._instance.get_property(Is);
    if (!r2 && !i2)
      return e2 || {};
    var n2 = J({}, e2 || {}), s2 = [.../* @__PURE__ */ new Set([...Object.keys(r2 || {}), ...Object.keys(i2 || {})])];
    for (var o2 of s2) {
      var a2, l2, u2 = n2[o2], c2 = null == i2 ? void 0 : i2[o2], d2 = O(c2) ? null !== (a2 = null == u2 ? void 0 : u2.enabled) && void 0 !== a2 && a2 : !!c2, _2 = O(c2) ? u2.variant : "string" == typeof c2 ? c2 : void 0, h2 = null == r2 ? void 0 : r2[o2], p2 = t(t({}, u2), {}, { enabled: d2, variant: d2 ? null != _2 ? _2 : null == u2 ? void 0 : u2.variant : void 0 });
      if (d2 !== (null == u2 ? void 0 : u2.enabled) && (p2.original_enabled = null == u2 ? void 0 : u2.enabled), _2 !== (null == u2 ? void 0 : u2.variant) && (p2.original_variant = null == u2 ? void 0 : u2.variant), h2)
        p2.metadata = t(t({}, null == u2 ? void 0 : u2.metadata), {}, { payload: h2, original_payload: null == u2 || null === (l2 = u2.metadata) || void 0 === l2 ? void 0 : l2.payload });
      n2[o2] = p2;
    }
    return this._override_warning || (Ss.warn(" Overriding feature flag details!", { flagDetails: e2, overriddenPayloads: r2, finalDetails: n2 }), this._override_warning = true), n2;
  }
  getFlagVariants() {
    var e2 = this._instance.get_property(Ie), t2 = this._instance.get_property(Es);
    if (!t2)
      return e2 || {};
    for (var i2 = J({}, e2), r2 = Object.keys(t2), n2 = 0; n2 < r2.length; n2++)
      i2[r2[n2]] = t2[r2[n2]];
    return this._override_warning || (Ss.warn(" Overriding feature flags!", { enabledFlags: e2, overriddenFlags: t2, finalFlags: i2 }), this._override_warning = true), i2;
  }
  getFlagPayloads() {
    var e2 = this._instance.get_property(xs), t2 = this._instance.get_property(Is);
    if (!t2)
      return e2 || {};
    for (var i2 = J({}, e2 || {}), r2 = Object.keys(t2), n2 = 0; n2 < r2.length; n2++)
      i2[r2[n2]] = t2[r2[n2]];
    return this._override_warning || (Ss.warn(" Overriding feature flag payloads!", { flagPayloads: e2, overriddenPayloads: t2, finalPayloads: i2 }), this._override_warning = true), i2;
  }
  reloadFeatureFlags() {
    this._reloadingDisabled || this._instance.config.advanced_disable_feature_flags || this._reloadDebouncer || (this._reloadDebouncer = setTimeout(() => {
      this._callDecideEndpoint();
    }, 5));
  }
  _clearDebouncer() {
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
    if (this._clearDebouncer(), !this._instance.config.advanced_disable_decide)
      if (this._requestInFlight)
        this._additionalReloadRequested = true;
      else {
        var r2 = { token: this._instance.config.token, distinct_id: this._instance.get_distinct_id(), groups: this._instance.getGroups(), $anon_distinct_id: this.$anon_distinct_id, person_properties: t(t({}, (null === (i2 = this._instance.persistence) || void 0 === i2 ? void 0 : i2.get_initial_props()) || {}), this._instance.get_property(Fe) || {}), group_properties: this._instance.get_property(Te) };
        (null != e2 && e2.disableFlags || this._instance.config.advanced_disable_feature_flags) && (r2.disable_flags = true);
        var s2 = this._instance.config.__preview_flags_v2 && this._instance.config.__preview_remote_config;
        s2 && (r2.timezone = ms()), this._requestInFlight = true, this._instance._send_request({ method: "POST", url: this._instance.requestRouter.endpointFor("api", s2 ? "/flags/?v=2" : "/decide/?v=4"), data: r2, compression: this._instance.config.disable_compression ? void 0 : n.Base64, timeout: this._instance.config.feature_flag_request_timeout_ms, callback: (e3) => {
          var t2, i3, n2, s3 = true;
          (200 === e3.statusCode && (this._additionalReloadRequested || (this.$anon_distinct_id = void 0), s3 = false), this._requestInFlight = false, this._decideCalled) || (this._decideCalled = true, this._instance._onRemoteConfig(null !== (n2 = e3.json) && void 0 !== n2 ? n2 : {}));
          r2.disable_flags && !this._additionalReloadRequested || (this._flagsLoadedFromRemote = !s3, e3.json && null !== (t2 = e3.json.quotaLimited) && void 0 !== t2 && t2.includes(ws.FeatureFlags) ? Ss.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.") : (this.receivedFeatureFlags(null !== (i3 = e3.json) && void 0 !== i3 ? i3 : {}, s3), this._additionalReloadRequested && (this._additionalReloadRequested = false, this._callDecideEndpoint())));
        } });
      }
  }
  getFeatureFlag(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0) {
      var i2 = this.getFlagVariants()[e2], r2 = "".concat(i2), n2 = this._instance.get_property(Cs) || void 0, s2 = this._instance.get_property(Oe) || {};
      if ((t2.send_event || !("send_event" in t2)) && (!(e2 in s2) || !s2[e2].includes(r2))) {
        var o2, a2, l2, u2, c2, d2, _2, h2, p2, v2, g2;
        F(s2[e2]) ? s2[e2].push(r2) : s2[e2] = [r2], null === (o2 = this._instance.persistence) || void 0 === o2 || o2.register({ [Oe]: s2 });
        var f2 = this.getFeatureFlagDetails(e2), m2 = { $feature_flag: e2, $feature_flag_response: i2, $feature_flag_payload: this.getFeatureFlagPayload(e2) || null, $feature_flag_request_id: n2, $feature_flag_bootstrapped_response: (null === (a2 = this._instance.config.bootstrap) || void 0 === a2 || null === (l2 = a2.featureFlags) || void 0 === l2 ? void 0 : l2[e2]) || null, $feature_flag_bootstrapped_payload: (null === (u2 = this._instance.config.bootstrap) || void 0 === u2 || null === (c2 = u2.featureFlagPayloads) || void 0 === c2 ? void 0 : c2[e2]) || null, $used_bootstrap_value: !this._flagsLoadedFromRemote };
        O(null == f2 || null === (d2 = f2.metadata) || void 0 === d2 ? void 0 : d2.version) || (m2.$feature_flag_version = f2.metadata.version);
        var y2, b2 = null !== (_2 = null == f2 || null === (h2 = f2.reason) || void 0 === h2 ? void 0 : h2.description) && void 0 !== _2 ? _2 : null == f2 || null === (p2 = f2.reason) || void 0 === p2 ? void 0 : p2.code;
        if (b2 && (m2.$feature_flag_reason = b2), null != f2 && null !== (v2 = f2.metadata) && void 0 !== v2 && v2.id && (m2.$feature_flag_id = f2.metadata.id), O(null == f2 ? void 0 : f2.original_variant) && O(null == f2 ? void 0 : f2.original_enabled) || (m2.$feature_flag_original_response = O(f2.original_variant) ? f2.original_enabled : f2.original_variant), null != f2 && null !== (g2 = f2.metadata) && void 0 !== g2 && g2.original_payload)
          m2.$feature_flag_original_payload = null == f2 || null === (y2 = f2.metadata) || void 0 === y2 ? void 0 : y2.original_payload;
        this._instance.capture("$feature_flag_called", m2);
      }
      return i2;
    }
    Ss.warn('getFeatureFlag for key "' + e2 + `" failed. Feature flags didn't load in time.`);
  }
  getFeatureFlagDetails(e2) {
    return this.getFlagsWithDetails()[e2];
  }
  getFeatureFlagPayload(e2) {
    return this.getFlagPayloads()[e2];
  }
  getRemoteConfigPayload(e2, t2) {
    var i2 = this._instance.config.token;
    this._instance._send_request({ method: "POST", url: this._instance.requestRouter.endpointFor("api", "/decide/?v=4"), data: { distinct_id: this._instance.get_distinct_id(), token: i2 }, compression: this._instance.config.disable_compression ? void 0 : n.Base64, timeout: this._instance.config.feature_flag_request_timeout_ms, callback: (i3) => {
      var r2, n2 = null === (r2 = i3.json) || void 0 === r2 ? void 0 : r2.featureFlagPayloads;
      t2((null == n2 ? void 0 : n2[e2]) || void 0);
    } });
  }
  isFeatureEnabled(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0)
      return !!this.getFeatureFlag(e2, t2);
    Ss.warn('isFeatureEnabled for key "' + e2 + `" failed. Feature flags didn't load in time.`);
  }
  addFeatureFlagsHandler(e2) {
    this.featureFlagEventHandlers.push(e2);
  }
  removeFeatureFlagsHandler(e2) {
    this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((t2) => t2 !== e2);
  }
  receivedFeatureFlags(e2, i2) {
    if (this._instance.persistence) {
      this._hasLoadedFlags = true;
      var r2 = this.getFlagVariants(), n2 = this.getFlagPayloads(), s2 = this.getFlagsWithDetails();
      !function(e3, i3) {
        var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, s3 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, o2 = Fs(e3), a2 = o2.flags, l2 = o2.featureFlags, u2 = o2.featureFlagPayloads;
        if (l2) {
          var c2 = e3.requestId;
          if (F(l2)) {
            Ss.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
            var d2 = {};
            if (l2)
              for (var _2 = 0; _2 < l2.length; _2++)
                d2[l2[_2]] = true;
            i3 && i3.register({ [ks]: l2, [Ie]: d2 });
          } else {
            var h2 = l2, p2 = u2, v2 = a2;
            e3.errorsWhileComputingFlags && (h2 = t(t({}, r3), h2), p2 = t(t({}, n3), p2), v2 = t(t({}, s3), v2)), i3 && i3.register(t({ [ks]: Object.keys(Ps(h2)), [Ie]: h2 || {}, [xs]: p2 || {}, [Pe]: v2 || {} }, c2 ? { [Cs]: c2 } : {}));
          }
        }
      }(e2, this._instance.persistence, r2, n2, s2), this._fireFeatureFlagsCallbacks(i2);
    }
  }
  override(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    Ss.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({ flags: e2, suppressWarning: t2 });
  }
  overrideFeatureFlags(e2) {
    if (!this._instance.__loaded || !this._instance.persistence)
      return Ss.uninitializedWarning("posthog.featureFlags.overrideFeatureFlags");
    if (false === e2)
      return this._instance.persistence.unregister(Es), this._instance.persistence.unregister(Is), void this._fireFeatureFlagsCallbacks();
    if (e2 && "object" == typeof e2 && ("flags" in e2 || "payloads" in e2)) {
      var t2, i2 = e2;
      if (this._override_warning = Boolean(null !== (t2 = i2.suppressWarning) && void 0 !== t2 && t2), "flags" in i2) {
        if (false === i2.flags)
          this._instance.persistence.unregister(Es);
        else if (i2.flags)
          if (F(i2.flags)) {
            for (var r2 = {}, n2 = 0; n2 < i2.flags.length; n2++)
              r2[i2.flags[n2]] = true;
            this._instance.persistence.register({ [Es]: r2 });
          } else
            this._instance.persistence.register({ [Es]: i2.flags });
      }
      return "payloads" in i2 && (false === i2.payloads ? this._instance.persistence.unregister(Is) : i2.payloads && this._instance.persistence.register({ [Is]: i2.payloads })), void this._fireFeatureFlagsCallbacks();
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
    var r2, n2 = (this._instance.get_property(Ce) || []).find((t2) => t2.flagKey === e2), s2 = { ["$feature_enrollment/".concat(e2)]: i2 }, o2 = { $feature_flag: e2, $feature_enrollment: i2, $set: s2 };
    n2 && (o2.$early_access_feature_name = n2.name), this._instance.capture("$feature_enrollment_update", o2), this.setPersonPropertiesForFlags(s2, false);
    var a2 = t(t({}, this.getFlagVariants()), {}, { [e2]: i2 });
    null === (r2 = this._instance.persistence) || void 0 === r2 || r2.register({ [ks]: Object.keys(Ps(a2)), [Ie]: a2 }), this._fireFeatureFlagsCallbacks();
  }
  getEarlyAccessFeatures(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i2 = arguments.length > 2 ? arguments[2] : void 0, r2 = this._instance.get_property(Ce), n2 = i2 ? "&".concat(i2.map((e3) => "stage=".concat(e3)).join("&")) : "";
    if (r2 && !t2)
      return e2(r2);
    this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=".concat(this._instance.config.token).concat(n2)), method: "GET", callback: (t3) => {
      var i3;
      if (t3.json) {
        var r3 = t3.json.earlyAccessFeatures;
        return null === (i3 = this._instance.persistence) || void 0 === i3 || i3.register({ [Ce]: r3 }), e2(r3);
      }
    } });
  }
  _prepareFeatureFlagsForCallbacks() {
    var e2 = this.getFlags(), t2 = this.getFlagVariants();
    return { flags: e2.filter((e3) => t2[e3]), flagVariants: Object.keys(t2).filter((e3) => t2[e3]).reduce((e3, i2) => (e3[i2] = t2[i2], e3), {}) };
  }
  _fireFeatureFlagsCallbacks(e2) {
    var { flags: t2, flagVariants: i2 } = this._prepareFeatureFlagsForCallbacks();
    this.featureFlagEventHandlers.forEach((r2) => r2(t2, i2, { errorsLoading: e2 }));
  }
  setPersonPropertiesForFlags(e2) {
    var i2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], r2 = this._instance.get_property(Fe) || {};
    this._instance.register({ [Fe]: t(t({}, r2), e2) }), i2 && this._instance.reloadFeatureFlags();
  }
  resetPersonPropertiesForFlags() {
    this._instance.unregister(Fe);
  }
  setGroupPropertiesForFlags(e2) {
    var i2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], r2 = this._instance.get_property(Te) || {};
    0 !== Object.keys(r2).length && Object.keys(r2).forEach((i3) => {
      r2[i3] = t(t({}, r2[i3]), e2[i3]), delete e2[i3];
    }), this._instance.register({ [Te]: t(t({}, r2), e2) }), i2 && this._instance.reloadFeatureFlags();
  }
  resetGroupPropertiesForFlags(e2) {
    if (e2) {
      var i2 = this._instance.get_property(Te) || {};
      this._instance.register({ [Te]: t(t({}, i2), {}, { [e2]: {} }) });
    } else
      this._instance.unregister(Te);
  }
}
var Rs = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
class $s {
  constructor(e2) {
    this._config = e2, this.props = {}, this.campaign_params_saved = false, this.name = ((e3) => {
      var t2 = "";
      return e3.token && (t2 = e3.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), e3.persistence_name ? "ph_" + e3.persistence_name : "ph_" + t2 + "_posthog";
    })(e2), this.storage = this._buildStorage(e2), this.load(), e2.debug && U.info("Persistence loaded", e2.persistence, t({}, this.props)), this.update_config(e2, e2), this.save();
  }
  _buildStorage(e2) {
    -1 === Rs.indexOf(e2.persistence.toLowerCase()) && (U.critical("Unknown persistence type " + e2.persistence + "; falling back to localStorage+cookie"), e2.persistence = "localStorage+cookie");
    var t2 = e2.persistence.toLowerCase();
    return "localstorage" === t2 && Gt.is_supported() ? Gt : "localstorage+cookie" === t2 && Jt.is_supported() ? Jt : "sessionstorage" === t2 && Qt.is_supported() ? Qt : "memory" === t2 ? Kt : "cookie" === t2 ? zt : Jt.is_supported() ? Jt : zt;
  }
  properties() {
    var e2 = {};
    return V(this.props, function(t2, i2) {
      if (i2 === Ie && R(t2))
        for (var r2 = Object.keys(t2), n2 = 0; n2 < r2.length; n2++)
          e2["$feature/".concat(r2[n2])] = t2[r2[n2]];
      else
        o2 = i2, a2 = false, (L(s2 = Ue) ? a2 : u && s2.indexOf === u ? -1 != s2.indexOf(o2) : (V(s2, function(e3) {
          if (a2 || (a2 = e3 === o2))
            return W;
        }), a2)) || (e2[i2] = t2);
      var s2, o2, a2;
    }), e2;
  }
  load() {
    if (!this.disabled) {
      var e2 = this.storage.parse(this.name);
      e2 && (this.props = J({}, e2));
    }
  }
  save() {
    this.disabled || this.storage.set(this.name, this.props, this.expire_days, this.cross_subdomain, this.secure, this._config.debug);
  }
  remove() {
    this.storage.remove(this.name, false), this.storage.remove(this.name, true);
  }
  clear() {
    this.remove(), this.props = {};
  }
  register_once(e2, t2, i2) {
    if (R(e2)) {
      O(t2) && (t2 = "None"), this.expire_days = O(i2) ? this.default_expiry : i2;
      var r2 = false;
      if (V(e2, (e3, i3) => {
        this.props.hasOwnProperty(i3) && this.props[i3] !== t2 || (this.props[i3] = e3, r2 = true);
      }), r2)
        return this.save(), true;
    }
    return false;
  }
  register(e2, t2) {
    if (R(e2)) {
      this.expire_days = O(t2) ? this.default_expiry : t2;
      var i2 = false;
      if (V(e2, (t3, r2) => {
        e2.hasOwnProperty(r2) && this.props[r2] !== t3 && (this.props[r2] = t3, i2 = true);
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
      var e2 = ds(this._config.custom_campaign_params, this._config.mask_personal_data_properties, this._config.custom_personal_data_properties);
      $(Z(e2)) || this.register(e2), this.campaign_params_saved = true;
    }
  }
  update_search_keyword() {
    var e2;
    this.register((e2 = null == d ? void 0 : d.referrer) ? hs(e2) : {});
  }
  update_referrer_info() {
    var e2;
    this.register_once({ $referrer: vs(), $referring_domain: null != d && d.referrer && (null === (e2 = bt(d.referrer)) || void 0 === e2 ? void 0 : e2.host) || "$direct" }, void 0);
  }
  set_initial_person_info() {
    this.props[De] || this.props[qe] || this.register_once({ [Ne]: gs(this._config.mask_personal_data_properties, this._config.custom_personal_data_properties) }, void 0);
  }
  get_referrer_info() {
    return Z({ $referrer: this.props.$referrer, $referring_domain: this.props.$referring_domain });
  }
  get_initial_props() {
    var e2 = {};
    V([qe, De], (t3) => {
      var i3 = this.props[t3];
      i3 && V(i3, function(t4, i4) {
        e2["$initial_" + E(i4)] = t4;
      });
    });
    var t2, i2, r2 = this.props[Ne];
    if (r2) {
      var n2 = (t2 = fs(r2), i2 = {}, V(t2, function(e3, t3) {
        i2["$initial_".concat(E(t3))] = e3;
      }), i2);
      J(e2, n2);
    }
    return e2;
  }
  safe_merge(e2) {
    return V(this.props, function(t2, i2) {
      i2 in e2 || (e2[i2] = t2);
    }), e2;
  }
  update_config(e2, t2) {
    if (this.default_expiry = this.expire_days = e2.cookie_expiration, this.set_disabled(e2.disable_persistence), this.set_cross_subdomain(e2.cross_subdomain_cookie), this.set_secure(e2.secure_cookie), e2.persistence !== t2.persistence) {
      var i2 = this._buildStorage(e2), r2 = this.props;
      this.clear(), this.storage = i2, this.props = r2, this.save();
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
    var i2 = this.props[ae] || {};
    i2[e2] = t2, this.props[ae] = i2, this.save();
  }
  remove_event_timer(e2) {
    var t2 = (this.props[ae] || {})[e2];
    return O(t2) || (delete this.props[ae][e2], this.save()), t2;
  }
  get_property(e2) {
    return this.props[e2];
  }
  set_property(e2, t2) {
    this.props[e2] = t2, this.save();
  }
}
var Os, Ms, As, Ls, Ds, qs, Ns, Bs, Hs, js, Us, zs, Ws, Gs, Vs = {}, Js = [], Ys = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Ks = Array.isArray;
function Xs(e2, t2) {
  for (var i2 in t2)
    e2[i2] = t2[i2];
  return e2;
}
function Qs(e2) {
  var t2 = e2.parentNode;
  t2 && t2.removeChild(e2);
}
function Zs(e2, t2, i2, r2, n2) {
  var s2 = { type: e2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == n2 ? ++As : n2, __i: -1, __u: 0 };
  return null == n2 && null != Ms.vnode && Ms.vnode(s2), s2;
}
function eo(e2) {
  return e2.children;
}
function to(e2, t2) {
  this.props = e2, this.context = t2;
}
function io(e2, t2) {
  if (null == t2)
    return e2.__ ? io(e2.__, e2.__i + 1) : null;
  for (var i2; t2 < e2.__k.length; t2++)
    if (null != (i2 = e2.__k[t2]) && null != i2.__e)
      return i2.__e;
  return "function" == typeof e2.type ? io(e2) : null;
}
function ro(e2) {
  var t2, i2;
  if (null != (e2 = e2.__) && null != e2.__c) {
    for (e2.__e = e2.__c.base = null, t2 = 0; t2 < e2.__k.length; t2++)
      if (null != (i2 = e2.__k[t2]) && null != i2.__e) {
        e2.__e = e2.__c.base = i2.__e;
        break;
      }
    return ro(e2);
  }
}
function no(e2) {
  (!e2.__d && (e2.__d = true) && Ls.push(e2) && !so.__r++ || Ds !== Ms.debounceRendering) && ((Ds = Ms.debounceRendering) || qs)(so);
}
function so() {
  var e2, t2, i2, r2, n2, s2, o2, a2, l2;
  for (Ls.sort(Ns); e2 = Ls.shift(); )
    e2.__d && (t2 = Ls.length, r2 = void 0, s2 = (n2 = (i2 = e2).__v).__e, a2 = [], l2 = [], (o2 = i2.__P) && ((r2 = Xs({}, n2)).__v = n2.__v + 1, Ms.vnode && Ms.vnode(r2), vo(o2, r2, n2, i2.__n, void 0 !== o2.ownerSVGElement, 32 & n2.__u ? [s2] : null, a2, null == s2 ? io(n2) : s2, !!(32 & n2.__u), l2), r2.__.__k[r2.__i] = r2, go(a2, r2, l2), r2.__e != s2 && ro(r2)), Ls.length > t2 && Ls.sort(Ns));
  so.__r = 0;
}
function oo(e2, t2, i2, r2, n2, s2, o2, a2, l2, u2, c2) {
  var d2, _2, h2, p2, v2, g2 = r2 && r2.__k || Js, f2 = t2.length;
  for (i2.__d = l2, ao(i2, t2, g2), l2 = i2.__d, d2 = 0; d2 < f2; d2++)
    null != (h2 = i2.__k[d2]) && "boolean" != typeof h2 && "function" != typeof h2 && (_2 = -1 === h2.__i ? Vs : g2[h2.__i] || Vs, h2.__i = d2, vo(e2, h2, _2, n2, s2, o2, a2, l2, u2, c2), p2 = h2.__e, h2.ref && _2.ref != h2.ref && (_2.ref && mo(_2.ref, null, h2), c2.push(h2.ref, h2.__c || p2, h2)), null == v2 && null != p2 && (v2 = p2), 65536 & h2.__u || _2.__k === h2.__k ? l2 = lo(h2, l2, e2) : "function" == typeof h2.type && void 0 !== h2.__d ? l2 = h2.__d : p2 && (l2 = p2.nextSibling), h2.__d = void 0, h2.__u &= -196609);
  i2.__d = l2, i2.__e = v2;
}
function ao(e2, t2, i2) {
  var r2, n2, s2, o2, a2, l2 = t2.length, u2 = i2.length, c2 = u2, d2 = 0;
  for (e2.__k = [], r2 = 0; r2 < l2; r2++)
    null != (n2 = e2.__k[r2] = null == (n2 = t2[r2]) || "boolean" == typeof n2 || "function" == typeof n2 ? null : "string" == typeof n2 || "number" == typeof n2 || "bigint" == typeof n2 || n2.constructor == String ? Zs(null, n2, null, null, n2) : Ks(n2) ? Zs(eo, { children: n2 }, null, null, null) : void 0 === n2.constructor && n2.__b > 0 ? Zs(n2.type, n2.props, n2.key, n2.ref ? n2.ref : null, n2.__v) : n2) ? (n2.__ = e2, n2.__b = e2.__b + 1, a2 = uo(n2, i2, o2 = r2 + d2, c2), n2.__i = a2, s2 = null, -1 !== a2 && (c2--, (s2 = i2[a2]) && (s2.__u |= 131072)), null == s2 || null === s2.__v ? (-1 == a2 && d2--, "function" != typeof n2.type && (n2.__u |= 65536)) : a2 !== o2 && (a2 === o2 + 1 ? d2++ : a2 > o2 ? c2 > l2 - o2 ? d2 += a2 - o2 : d2-- : d2 = a2 < o2 && a2 == o2 - 1 ? a2 - o2 : 0, a2 !== r2 + d2 && (n2.__u |= 65536))) : (s2 = i2[r2]) && null == s2.key && s2.__e && (s2.__e == e2.__d && (e2.__d = io(s2)), yo(s2, s2, false), i2[r2] = null, c2--);
  if (c2)
    for (r2 = 0; r2 < u2; r2++)
      null != (s2 = i2[r2]) && 0 == (131072 & s2.__u) && (s2.__e == e2.__d && (e2.__d = io(s2)), yo(s2, s2));
}
function lo(e2, t2, i2) {
  var r2, n2;
  if ("function" == typeof e2.type) {
    for (r2 = e2.__k, n2 = 0; r2 && n2 < r2.length; n2++)
      r2[n2] && (r2[n2].__ = e2, t2 = lo(r2[n2], t2, i2));
    return t2;
  }
  return e2.__e != t2 && (i2.insertBefore(e2.__e, t2 || null), t2 = e2.__e), t2 && t2.nextSibling;
}
function uo(e2, t2, i2, r2) {
  var n2 = e2.key, s2 = e2.type, o2 = i2 - 1, a2 = i2 + 1, l2 = t2[i2];
  if (null === l2 || l2 && n2 == l2.key && s2 === l2.type)
    return i2;
  if (r2 > (null != l2 && 0 == (131072 & l2.__u) ? 1 : 0))
    for (; o2 >= 0 || a2 < t2.length; ) {
      if (o2 >= 0) {
        if ((l2 = t2[o2]) && 0 == (131072 & l2.__u) && n2 == l2.key && s2 === l2.type)
          return o2;
        o2--;
      }
      if (a2 < t2.length) {
        if ((l2 = t2[a2]) && 0 == (131072 & l2.__u) && n2 == l2.key && s2 === l2.type)
          return a2;
        a2++;
      }
    }
  return -1;
}
function co(e2, t2, i2) {
  "-" === t2[0] ? e2.setProperty(t2, null == i2 ? "" : i2) : e2[t2] = null == i2 ? "" : "number" != typeof i2 || Ys.test(t2) ? i2 : i2 + "px";
}
function _o(e2, t2, i2, r2, n2) {
  var s2;
  e:
    if ("style" === t2)
      if ("string" == typeof i2)
        e2.style.cssText = i2;
      else {
        if ("string" == typeof r2 && (e2.style.cssText = r2 = ""), r2)
          for (t2 in r2)
            i2 && t2 in i2 || co(e2.style, t2, "");
        if (i2)
          for (t2 in i2)
            r2 && i2[t2] === r2[t2] || co(e2.style, t2, i2[t2]);
      }
    else if ("o" === t2[0] && "n" === t2[1])
      s2 = t2 !== (t2 = t2.replace(/(PointerCapture)$|Capture$/, "$1")), t2 = t2.toLowerCase() in e2 ? t2.toLowerCase().slice(2) : t2.slice(2), e2.l || (e2.l = {}), e2.l[t2 + s2] = i2, i2 ? r2 ? i2.u = r2.u : (i2.u = Date.now(), e2.addEventListener(t2, s2 ? po : ho, s2)) : e2.removeEventListener(t2, s2 ? po : ho, s2);
    else {
      if (n2)
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
function ho(e2) {
  var t2 = this.l[e2.type + false];
  if (e2.t) {
    if (e2.t <= t2.u)
      return;
  } else
    e2.t = Date.now();
  return t2(Ms.event ? Ms.event(e2) : e2);
}
function po(e2) {
  return this.l[e2.type + true](Ms.event ? Ms.event(e2) : e2);
}
function vo(e2, t2, i2, r2, n2, s2, o2, a2, l2, u2) {
  var c2, d2, _2, h2, p2, v2, g2, f2, m2, y2, b2, w2, S2, k2, E2, x2 = t2.type;
  if (void 0 !== t2.constructor)
    return null;
  128 & i2.__u && (l2 = !!(32 & i2.__u), s2 = [a2 = t2.__e = i2.__e]), (c2 = Ms.__b) && c2(t2);
  e:
    if ("function" == typeof x2)
      try {
        if (f2 = t2.props, m2 = (c2 = x2.contextType) && r2[c2.__c], y2 = c2 ? m2 ? m2.props.value : c2.__ : r2, i2.__c ? g2 = (d2 = t2.__c = i2.__c).__ = d2.__E : ("prototype" in x2 && x2.prototype.render ? t2.__c = d2 = new x2(f2, y2) : (t2.__c = d2 = new to(f2, y2), d2.constructor = x2, d2.render = bo), m2 && m2.sub(d2), d2.props = f2, d2.state || (d2.state = {}), d2.context = y2, d2.__n = r2, _2 = d2.__d = true, d2.__h = [], d2._sb = []), null == d2.__s && (d2.__s = d2.state), null != x2.getDerivedStateFromProps && (d2.__s == d2.state && (d2.__s = Xs({}, d2.__s)), Xs(d2.__s, x2.getDerivedStateFromProps(f2, d2.__s))), h2 = d2.props, p2 = d2.state, d2.__v = t2, _2)
          null == x2.getDerivedStateFromProps && null != d2.componentWillMount && d2.componentWillMount(), null != d2.componentDidMount && d2.__h.push(d2.componentDidMount);
        else {
          if (null == x2.getDerivedStateFromProps && f2 !== h2 && null != d2.componentWillReceiveProps && d2.componentWillReceiveProps(f2, y2), !d2.__e && (null != d2.shouldComponentUpdate && false === d2.shouldComponentUpdate(f2, d2.__s, y2) || t2.__v === i2.__v)) {
            for (t2.__v !== i2.__v && (d2.props = f2, d2.state = d2.__s, d2.__d = false), t2.__e = i2.__e, t2.__k = i2.__k, t2.__k.forEach(function(e3) {
              e3 && (e3.__ = t2);
            }), b2 = 0; b2 < d2._sb.length; b2++)
              d2.__h.push(d2._sb[b2]);
            d2._sb = [], d2.__h.length && o2.push(d2);
            break e;
          }
          null != d2.componentWillUpdate && d2.componentWillUpdate(f2, d2.__s, y2), null != d2.componentDidUpdate && d2.__h.push(function() {
            d2.componentDidUpdate(h2, p2, v2);
          });
        }
        if (d2.context = y2, d2.props = f2, d2.__P = e2, d2.__e = false, w2 = Ms.__r, S2 = 0, "prototype" in x2 && x2.prototype.render) {
          for (d2.state = d2.__s, d2.__d = false, w2 && w2(t2), c2 = d2.render(d2.props, d2.state, d2.context), k2 = 0; k2 < d2._sb.length; k2++)
            d2.__h.push(d2._sb[k2]);
          d2._sb = [];
        } else
          do {
            d2.__d = false, w2 && w2(t2), c2 = d2.render(d2.props, d2.state, d2.context), d2.state = d2.__s;
          } while (d2.__d && ++S2 < 25);
        d2.state = d2.__s, null != d2.getChildContext && (r2 = Xs(Xs({}, r2), d2.getChildContext())), _2 || null == d2.getSnapshotBeforeUpdate || (v2 = d2.getSnapshotBeforeUpdate(h2, p2)), oo(e2, Ks(E2 = null != c2 && c2.type === eo && null == c2.key ? c2.props.children : c2) ? E2 : [E2], t2, i2, r2, n2, s2, o2, a2, l2, u2), d2.base = t2.__e, t2.__u &= -161, d2.__h.length && o2.push(d2), g2 && (d2.__E = d2.__ = null);
      } catch (e3) {
        t2.__v = null, l2 || null != s2 ? (t2.__e = a2, t2.__u |= l2 ? 160 : 32, s2[s2.indexOf(a2)] = null) : (t2.__e = i2.__e, t2.__k = i2.__k), Ms.__e(e3, t2, i2);
      }
    else
      null == s2 && t2.__v === i2.__v ? (t2.__k = i2.__k, t2.__e = i2.__e) : t2.__e = fo(i2.__e, t2, i2, r2, n2, s2, o2, l2, u2);
  (c2 = Ms.diffed) && c2(t2);
}
function go(e2, t2, i2) {
  t2.__d = void 0;
  for (var r2 = 0; r2 < i2.length; r2++)
    mo(i2[r2], i2[++r2], i2[++r2]);
  Ms.__c && Ms.__c(t2, e2), e2.some(function(t3) {
    try {
      e2 = t3.__h, t3.__h = [], e2.some(function(e3) {
        e3.call(t3);
      });
    } catch (e3) {
      Ms.__e(e3, t3.__v);
    }
  });
}
function fo(e2, t2, i2, r2, n2, s2, o2, a2, l2) {
  var u2, c2, d2, _2, h2, p2, v2, g2 = i2.props, f2 = t2.props, m2 = t2.type;
  if ("svg" === m2 && (n2 = true), null != s2) {
    for (u2 = 0; u2 < s2.length; u2++)
      if ((h2 = s2[u2]) && "setAttribute" in h2 == !!m2 && (m2 ? h2.localName === m2 : 3 === h2.nodeType)) {
        e2 = h2, s2[u2] = null;
        break;
      }
  }
  if (null == e2) {
    if (null === m2)
      return document.createTextNode(f2);
    e2 = n2 ? document.createElementNS("http://www.w3.org/2000/svg", m2) : document.createElement(m2, f2.is && f2), s2 = null, a2 = false;
  }
  if (null === m2)
    g2 === f2 || a2 && e2.data === f2 || (e2.data = f2);
  else {
    if (s2 = s2 && Os.call(e2.childNodes), g2 = i2.props || Vs, !a2 && null != s2)
      for (g2 = {}, u2 = 0; u2 < e2.attributes.length; u2++)
        g2[(h2 = e2.attributes[u2]).name] = h2.value;
    for (u2 in g2)
      h2 = g2[u2], "children" == u2 || ("dangerouslySetInnerHTML" == u2 ? d2 = h2 : "key" === u2 || u2 in f2 || _o(e2, u2, null, h2, n2));
    for (u2 in f2)
      h2 = f2[u2], "children" == u2 ? _2 = h2 : "dangerouslySetInnerHTML" == u2 ? c2 = h2 : "value" == u2 ? p2 = h2 : "checked" == u2 ? v2 = h2 : "key" === u2 || a2 && "function" != typeof h2 || g2[u2] === h2 || _o(e2, u2, h2, g2[u2], n2);
    if (c2)
      a2 || d2 && (c2.__html === d2.__html || c2.__html === e2.innerHTML) || (e2.innerHTML = c2.__html), t2.__k = [];
    else if (d2 && (e2.innerHTML = ""), oo(e2, Ks(_2) ? _2 : [_2], t2, i2, r2, n2 && "foreignObject" !== m2, s2, o2, s2 ? s2[0] : i2.__k && io(i2, 0), a2, l2), null != s2)
      for (u2 = s2.length; u2--; )
        null != s2[u2] && Qs(s2[u2]);
    a2 || (u2 = "value", void 0 !== p2 && (p2 !== e2[u2] || "progress" === m2 && !p2 || "option" === m2 && p2 !== g2[u2]) && _o(e2, u2, p2, g2[u2], false), u2 = "checked", void 0 !== v2 && v2 !== e2[u2] && _o(e2, u2, v2, g2[u2], false));
  }
  return e2;
}
function mo(e2, t2, i2) {
  try {
    "function" == typeof e2 ? e2(t2) : e2.current = t2;
  } catch (e3) {
    Ms.__e(e3, i2);
  }
}
function yo(e2, t2, i2) {
  var r2, n2;
  if (Ms.unmount && Ms.unmount(e2), (r2 = e2.ref) && (r2.current && r2.current !== e2.__e || mo(r2, null, t2)), null != (r2 = e2.__c)) {
    if (r2.componentWillUnmount)
      try {
        r2.componentWillUnmount();
      } catch (e3) {
        Ms.__e(e3, t2);
      }
    r2.base = r2.__P = null, e2.__c = void 0;
  }
  if (r2 = e2.__k)
    for (n2 = 0; n2 < r2.length; n2++)
      r2[n2] && yo(r2[n2], t2, i2 || "function" != typeof e2.type);
  i2 || null == e2.__e || Qs(e2.__e), e2.__ = e2.__e = e2.__d = void 0;
}
function bo(e2, t2, i2) {
  return this.constructor(e2, i2);
}
Os = Js.slice, Ms = { __e: function(e2, t2, i2, r2) {
  for (var n2, s2, o2; t2 = t2.__; )
    if ((n2 = t2.__c) && !n2.__)
      try {
        if ((s2 = n2.constructor) && null != s2.getDerivedStateFromError && (n2.setState(s2.getDerivedStateFromError(e2)), o2 = n2.__d), null != n2.componentDidCatch && (n2.componentDidCatch(e2, r2 || {}), o2 = n2.__d), o2)
          return n2.__E = n2;
      } catch (t3) {
        e2 = t3;
      }
  throw e2;
} }, As = 0, to.prototype.setState = function(e2, t2) {
  var i2;
  i2 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = Xs({}, this.state), "function" == typeof e2 && (e2 = e2(Xs({}, i2), this.props)), e2 && Xs(i2, e2), null != e2 && this.__v && (t2 && this._sb.push(t2), no(this));
}, to.prototype.forceUpdate = function(e2) {
  this.__v && (this.__e = true, e2 && this.__h.push(e2), no(this));
}, to.prototype.render = eo, Ls = [], qs = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Ns = function(e2, t2) {
  return e2.__v.__b - t2.__v.__b;
}, so.__r = 0, Bs = 0, function(e2) {
  e2.Button = "button", e2.Tab = "tab", e2.Selector = "selector";
}(Hs || (Hs = {})), function(e2) {
  e2.Left = "left", e2.Center = "center", e2.Right = "right", e2.NextToTrigger = "next_to_trigger";
}(js || (js = {})), function(e2) {
  e2.Popover = "popover", e2.API = "api", e2.Widget = "widget";
}(Us || (Us = {})), function(e2) {
  e2.Open = "open", e2.MultipleChoice = "multiple_choice", e2.SingleChoice = "single_choice", e2.Rating = "rating", e2.Link = "link";
}(zs || (zs = {})), function(e2) {
  e2.NextQuestion = "next_question", e2.End = "end", e2.ResponseBased = "response_based", e2.SpecificQuestion = "specific_question";
}(Ws || (Ws = {})), function(e2) {
  e2.Once = "once", e2.Recurring = "recurring", e2.Always = "always";
}(Gs || (Gs = {}));
var wo = function(e2, t2) {
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
}, So = z("[Surveys]"), ko = { icontains: (e2, t2) => e2.some((e3) => t2.toLowerCase().includes(e3.toLowerCase())), not_icontains: (e2, t2) => e2.every((e3) => !t2.toLowerCase().includes(e3.toLowerCase())), regex: (e2, t2) => e2.some((e3) => wo(t2, e3)), not_regex: (e2, t2) => e2.every((e3) => !wo(t2, e3)), exact: (e2, t2) => e2.some((e3) => t2 === e3), is_not: (e2, t2) => e2.every((e3) => t2 !== e3) };
function Eo(e2) {
  return null != e2 ? e2 : "icontains";
}
js.Right;
!function(e2, t2) {
  var i2 = { __c: t2 = "__cC" + Bs++, __: e2, Consumer: function(e3, t3) {
    return e3.children(t3);
  }, Provider: function(e3) {
    var i3, r2;
    return this.getChildContext || (i3 = [], (r2 = {})[t2] = this, this.getChildContext = function() {
      return r2;
    }, this.shouldComponentUpdate = function(e4) {
      this.props.value !== e4.value && i3.some(function(e5) {
        e5.__e = true, no(e5);
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
} });
class xo {
  constructor() {
    i(this, "_events", {}), this._events = {};
  }
  on(e2, t2) {
    return this._events[e2] || (this._events[e2] = []), this._events[e2].push(t2), () => {
      this._events[e2] = this._events[e2].filter((e3) => e3 !== t2);
    };
  }
  emit(e2, t2) {
    for (var i2 of this._events[e2] || [])
      i2(t2);
    for (var r2 of this._events["*"] || [])
      r2(e2, t2);
  }
}
class Io {
  constructor(e2) {
    i(this, "_debugEventEmitter", new xo()), i(this, "_checkStep", (e3, t2) => this._checkStepEvent(e3, t2) && this._checkStepUrl(e3, t2) && this._checkStepElement(e3, t2)), i(this, "_checkStepEvent", (e3, t2) => null == t2 || !t2.event || (null == e3 ? void 0 : e3.event) === (null == t2 ? void 0 : t2.event)), this._instance = e2, this._actionEvents = /* @__PURE__ */ new Set(), this._actionRegistry = /* @__PURE__ */ new Set();
  }
  init() {
    var e2;
    if (!O(null === (e2 = this._instance) || void 0 === e2 ? void 0 : e2._addCaptureHook)) {
      var t2;
      null === (t2 = this._instance) || void 0 === t2 || t2._addCaptureHook((e3, t3) => {
        this.on(e3, t3);
      });
    }
  }
  register(e2) {
    var t2, i2;
    if (!O(null === (t2 = this._instance) || void 0 === t2 ? void 0 : t2._addCaptureHook) && (e2.forEach((e3) => {
      var t3, i3;
      null === (t3 = this._actionRegistry) || void 0 === t3 || t3.add(e3), null === (i3 = e3.steps) || void 0 === i3 || i3.forEach((e4) => {
        var t4;
        null === (t4 = this._actionEvents) || void 0 === t4 || t4.add((null == e4 ? void 0 : e4.event) || "");
      });
    }), null !== (i2 = this._instance) && void 0 !== i2 && i2.autocapture)) {
      var r2, n2 = /* @__PURE__ */ new Set();
      e2.forEach((e3) => {
        var t3;
        null === (t3 = e3.steps) || void 0 === t3 || t3.forEach((e4) => {
          null != e4 && e4.selector && n2.add(null == e4 ? void 0 : e4.selector);
        });
      }), null === (r2 = this._instance) || void 0 === r2 || r2.autocapture.setElementSelectors(n2);
    }
  }
  on(e2, t2) {
    var i2;
    null != t2 && 0 != e2.length && (this._actionEvents.has(e2) || this._actionEvents.has(null == t2 ? void 0 : t2.event)) && this._actionRegistry && (null === (i2 = this._actionRegistry) || void 0 === i2 ? void 0 : i2.size) > 0 && this._actionRegistry.forEach((e3) => {
      this._checkAction(t2, e3) && this._debugEventEmitter.emit("actionCaptured", e3.name);
    });
  }
  _addActionHook(e2) {
    this.onAction("actionCaptured", (t2) => e2(t2));
  }
  _checkAction(e2, t2) {
    if (null == (null == t2 ? void 0 : t2.steps))
      return false;
    for (var i2 of t2.steps)
      if (this._checkStep(e2, i2))
        return true;
    return false;
  }
  onAction(e2, t2) {
    return this._debugEventEmitter.on(e2, t2);
  }
  _checkStepUrl(e2, t2) {
    if (null != t2 && t2.url) {
      var i2, r2 = null == e2 || null === (i2 = e2.properties) || void 0 === i2 ? void 0 : i2.$current_url;
      if (!r2 || "string" != typeof r2)
        return false;
      if (!Io._matchString(r2, null == t2 ? void 0 : t2.url, (null == t2 ? void 0 : t2.url_matching) || "contains"))
        return false;
    }
    return true;
  }
  static _matchString(e2, t2, i2) {
    switch (i2) {
      case "regex":
        return !!s && wo(e2, t2);
      case "exact":
        return t2 === e2;
      case "contains":
        var r2 = Io._escapeStringRegexp(t2).replace(/_/g, ".").replace(/%/g, ".*");
        return wo(e2, r2);
      default:
        return false;
    }
  }
  static _escapeStringRegexp(e2) {
    return e2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  _checkStepElement(e2, t2) {
    if ((null != t2 && t2.href || null != t2 && t2.tag_name || null != t2 && t2.text) && !this._getElementsList(e2).some((e3) => !(null != t2 && t2.href && !Io._matchString(e3.href || "", null == t2 ? void 0 : t2.href, (null == t2 ? void 0 : t2.href_matching) || "exact")) && ((null == t2 || !t2.tag_name || e3.tag_name === (null == t2 ? void 0 : t2.tag_name)) && !(null != t2 && t2.text && !Io._matchString(e3.text || "", null == t2 ? void 0 : t2.text, (null == t2 ? void 0 : t2.text_matching) || "exact") && !Io._matchString(e3.$el_text || "", null == t2 ? void 0 : t2.text, (null == t2 ? void 0 : t2.text_matching) || "exact")))))
      return false;
    if (null != t2 && t2.selector) {
      var i2, r2 = null == e2 || null === (i2 = e2.properties) || void 0 === i2 ? void 0 : i2.$element_selectors;
      if (!r2)
        return false;
      if (!r2.includes(null == t2 ? void 0 : t2.selector))
        return false;
    }
    return true;
  }
  _getElementsList(e2) {
    return null == (null == e2 ? void 0 : e2.properties.$elements) ? [] : null == e2 ? void 0 : e2.properties.$elements;
  }
}
class Co {
  constructor(e2) {
    this._instance = e2, this._eventToSurveys = /* @__PURE__ */ new Map(), this._actionToSurveys = /* @__PURE__ */ new Map();
  }
  register(e2) {
    var t2;
    O(null === (t2 = this._instance) || void 0 === t2 ? void 0 : t2._addCaptureHook) || (this._setupEventBasedSurveys(e2), this._setupActionBasedSurveys(e2));
  }
  _setupActionBasedSurveys(e2) {
    var t2 = e2.filter((e3) => {
      var t3, i2, r2, n2;
      return (null === (t3 = e3.conditions) || void 0 === t3 ? void 0 : t3.actions) && (null === (i2 = e3.conditions) || void 0 === i2 || null === (r2 = i2.actions) || void 0 === r2 || null === (n2 = r2.values) || void 0 === n2 ? void 0 : n2.length) > 0;
    });
    if (0 !== t2.length) {
      if (null == this._actionMatcher) {
        this._actionMatcher = new Io(this._instance), this._actionMatcher.init();
        this._actionMatcher._addActionHook((e3) => {
          this.onAction(e3);
        });
      }
      t2.forEach((e3) => {
        var t3, i2, r2, n2, s2, o2, a2, l2, u2, c2;
        e3.conditions && null !== (t3 = e3.conditions) && void 0 !== t3 && t3.actions && null !== (i2 = e3.conditions) && void 0 !== i2 && null !== (r2 = i2.actions) && void 0 !== r2 && r2.values && (null === (n2 = e3.conditions) || void 0 === n2 || null === (s2 = n2.actions) || void 0 === s2 || null === (o2 = s2.values) || void 0 === o2 ? void 0 : o2.length) > 0 && (null === (a2 = this._actionMatcher) || void 0 === a2 || a2.register(e3.conditions.actions.values), null === (l2 = e3.conditions) || void 0 === l2 || null === (u2 = l2.actions) || void 0 === u2 || null === (c2 = u2.values) || void 0 === c2 || c2.forEach((t4) => {
          if (t4 && t4.name) {
            var i3 = this._actionToSurveys.get(t4.name);
            i3 && i3.push(e3.id), this._actionToSurveys.set(t4.name, i3 || [e3.id]);
          }
        }));
      });
    }
  }
  _setupEventBasedSurveys(e2) {
    var t2;
    if (0 !== e2.filter((e3) => {
      var t3, i2, r2, n2;
      return (null === (t3 = e3.conditions) || void 0 === t3 ? void 0 : t3.events) && (null === (i2 = e3.conditions) || void 0 === i2 || null === (r2 = i2.events) || void 0 === r2 || null === (n2 = r2.values) || void 0 === n2 ? void 0 : n2.length) > 0;
    }).length) {
      null === (t2 = this._instance) || void 0 === t2 || t2._addCaptureHook((e3, t3) => {
        this.onEvent(e3, t3);
      }), e2.forEach((e3) => {
        var t3, i2, r2;
        null === (t3 = e3.conditions) || void 0 === t3 || null === (i2 = t3.events) || void 0 === i2 || null === (r2 = i2.values) || void 0 === r2 || r2.forEach((t4) => {
          if (t4 && t4.name) {
            var i3 = this._eventToSurveys.get(t4.name);
            i3 && i3.push(e3.id), this._eventToSurveys.set(t4.name, i3 || [e3.id]);
          }
        });
      });
    }
  }
  onEvent(e2, t2) {
    var i2, r2, n2 = (null === (i2 = this._instance) || void 0 === i2 || null === (r2 = i2.persistence) || void 0 === r2 ? void 0 : r2.props[$e]) || [];
    if ("survey shown" === e2 && t2 && n2.length > 0) {
      var s2, o2 = null == t2 || null === (s2 = t2.properties) || void 0 === s2 ? void 0 : s2.$survey_id;
      if (o2) {
        var a2 = n2.indexOf(o2);
        a2 >= 0 && (n2.splice(a2, 1), this._updateActivatedSurveys(n2));
      }
    } else
      this._eventToSurveys.has(e2) && this._updateActivatedSurveys(n2.concat(this._eventToSurveys.get(e2) || []));
  }
  onAction(e2) {
    var t2, i2, r2 = (null === (t2 = this._instance) || void 0 === t2 || null === (i2 = t2.persistence) || void 0 === i2 ? void 0 : i2.props[$e]) || [];
    this._actionToSurveys.has(e2) && this._updateActivatedSurveys(r2.concat(this._actionToSurveys.get(e2) || []));
  }
  _updateActivatedSurveys(e2) {
    var t2, i2;
    null === (t2 = this._instance) || void 0 === t2 || null === (i2 = t2.persistence) || void 0 === i2 || i2.register({ [$e]: [...new Set(e2)] });
  }
  getSurveys() {
    var e2, t2, i2 = null === (e2 = this._instance) || void 0 === e2 || null === (t2 = e2.persistence) || void 0 === t2 ? void 0 : t2.props[$e];
    return i2 || [];
  }
  getEventToSurveys() {
    return this._eventToSurveys;
  }
  _getActionMatcher() {
    return this._actionMatcher;
  }
}
class Po {
  constructor(e2) {
    i(this, "_isFetchingSurveys", false), i(this, "_isInitializingSurveys", false), i(this, "_surveyCallbacks", []), this._instance = e2, this._surveyEventReceiver = null;
  }
  onRemoteConfig(e2) {
    var t2 = e2.surveys;
    if (D(t2))
      return So.warn("Decide not loaded yet. Not loading surveys.");
    var i2 = F(t2);
    this._hasSurveys = i2 ? t2.length > 0 : t2, So.info("decide response received, hasSurveys: ".concat(this._hasSurveys)), this._hasSurveys && this.loadIfEnabled();
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
        So.info("Already initializing surveys, skipping...");
      else if (this._instance.config.disable_surveys)
        So.info("Disabled. Not loading surveys.");
      else if (this._hasSurveys) {
        var e2 = null == f ? void 0 : f.__PosthogExtensions__;
        if (e2) {
          this._isInitializingSurveys = true;
          try {
            var t2 = e2.generateSurveys;
            if (t2)
              return void this._completeSurveyInitialization(t2);
            var i2 = e2.loadExternalDependency;
            if (!i2)
              return void this._handleSurveyLoadError("PostHog loadExternalDependency extension not found.");
            i2(this._instance, "surveys", (t3) => {
              t3 || !e2.generateSurveys ? this._handleSurveyLoadError("Could not load surveys script", t3) : this._completeSurveyInitialization(e2.generateSurveys);
            });
          } catch (e3) {
            throw this._handleSurveyLoadError("Error initializing surveys", e3), e3;
          } finally {
            this._isInitializingSurveys = false;
          }
        } else
          So.error("PostHog Extensions not found.");
      } else
        So.info("No surveys to load.");
  }
  _completeSurveyInitialization(e2) {
    this._surveyManager = e2(this._instance), this._surveyEventReceiver = new Co(this._instance), So.info("Surveys loaded successfully"), this._notifySurveyCallbacks({ isLoaded: true });
  }
  _handleSurveyLoadError(e2, t2) {
    So.error(e2, t2), this._notifySurveyCallbacks({ isLoaded: false, error: e2 });
  }
  onSurveysLoaded(e2) {
    return this._surveyCallbacks.push(e2), this._surveyManager && this._notifySurveyCallbacks({ isLoaded: true }), () => {
      this._surveyCallbacks = this._surveyCallbacks.filter((t2) => t2 !== e2);
    };
  }
  getSurveys(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (this._instance.config.disable_surveys)
      return So.info("Disabled. Not loading surveys."), e2([]);
    var i2 = this._instance.get_property(Re);
    if (i2 && !t2)
      return e2(i2, { isLoaded: true });
    if (this._isFetchingSurveys)
      return e2([], { isLoaded: false, error: "Surveys are already being loaded" });
    try {
      this._isFetchingSurveys = true, this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", "/api/surveys/?token=".concat(this._instance.config.token)), method: "GET", timeout: this._instance.config.surveys_request_timeout_ms, callback: (t3) => {
        var i3;
        this._isFetchingSurveys = false;
        var r2 = t3.statusCode;
        if (200 !== r2 || !t3.json) {
          var n2 = "Surveys API could not be loaded, status: ".concat(r2);
          return So.error(n2), e2([], { isLoaded: false, error: n2 });
        }
        var s2, o2 = t3.json.surveys || [], a2 = o2.filter((e3) => {
          var t4, i4, r3, n3, s3, o3, a3, l2, u2, c2, d2, _2;
          return (null === (t4 = e3.conditions) || void 0 === t4 ? void 0 : t4.events) && (null === (i4 = e3.conditions) || void 0 === i4 || null === (r3 = i4.events) || void 0 === r3 ? void 0 : r3.values) && (null === (n3 = e3.conditions) || void 0 === n3 || null === (s3 = n3.events) || void 0 === s3 || null === (o3 = s3.values) || void 0 === o3 ? void 0 : o3.length) > 0 || (null === (a3 = e3.conditions) || void 0 === a3 ? void 0 : a3.actions) && (null === (l2 = e3.conditions) || void 0 === l2 || null === (u2 = l2.actions) || void 0 === u2 ? void 0 : u2.values) && (null === (c2 = e3.conditions) || void 0 === c2 || null === (d2 = c2.actions) || void 0 === d2 || null === (_2 = d2.values) || void 0 === _2 ? void 0 : _2.length) > 0;
        });
        a2.length > 0 && (null === (s2 = this._surveyEventReceiver) || void 0 === s2 || s2.register(a2));
        return null === (i3 = this._instance.persistence) || void 0 === i3 || i3.register({ [Re]: o2 }), e2(o2, { isLoaded: true });
      } });
    } catch (e3) {
      throw this._isFetchingSurveys = false, e3;
    }
  }
  _notifySurveyCallbacks(e2) {
    for (var t2 of this._surveyCallbacks)
      try {
        e2.isLoaded ? this.getSurveys(t2) : t2([], e2);
      } catch (e3) {
        So.error("Error in survey callback", e3);
      }
  }
  _isSurveyFeatureFlagEnabled(e2) {
    return !e2 || this._instance.featureFlags.isFeatureEnabled(e2);
  }
  getActiveMatchingSurveys(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    this.getSurveys((t3) => {
      var i2, r2 = t3.filter((e3) => !(!e3.start_date || e3.end_date)).filter((e3) => {
        var t4;
        if (!e3.conditions)
          return true;
        var i3 = function(e4) {
          var t5, i4, r4;
          if (null === (t5 = e4.conditions) || void 0 === t5 || !t5.url)
            return true;
          var n4 = null == s || null === (i4 = s.location) || void 0 === i4 ? void 0 : i4.href;
          if (!n4)
            return false;
          var o3 = [e4.conditions.url];
          return ko[Eo(null === (r4 = e4.conditions) || void 0 === r4 ? void 0 : r4.urlMatchType)](o3, n4);
        }(e3), r3 = null === (t4 = e3.conditions) || void 0 === t4 || !t4.selector || (null == d ? void 0 : d.querySelector(e3.conditions.selector)), n3 = function(e4) {
          var t5, i4, r4;
          if (null === (t5 = e4.conditions) || void 0 === t5 || !t5.deviceTypes || 0 === (null === (i4 = e4.conditions) || void 0 === i4 ? void 0 : i4.deviceTypes.length))
            return true;
          if (!g)
            return false;
          var n4 = os(g);
          return ko[Eo(null === (r4 = e4.conditions) || void 0 === r4 ? void 0 : r4.deviceTypesMatchType)](e4.conditions.deviceTypes, n4);
        }(e3);
        return i3 && r3 && n3;
      }), n2 = null === (i2 = this._surveyEventReceiver) || void 0 === i2 ? void 0 : i2.getSurveys(), o2 = r2.filter((e3) => {
        var t4, i3, r3, s2, o3, a2, l2, u2, c2;
        if (!(e3.linked_flag_key || e3.targeting_flag_key || e3.internal_targeting_flag_key || null !== (t4 = e3.feature_flag_keys) && void 0 !== t4 && t4.length))
          return true;
        var d2 = this._isSurveyFeatureFlagEnabled(e3.linked_flag_key), _2 = this._isSurveyFeatureFlagEnabled(e3.targeting_flag_key), h2 = (null !== (i3 = null === (r3 = e3.conditions) || void 0 === r3 || null === (s2 = r3.events) || void 0 === s2 || null === (o3 = s2.values) || void 0 === o3 ? void 0 : o3.length) && void 0 !== i3 ? i3 : 0) > 0, p2 = (null !== (a2 = null === (l2 = e3.conditions) || void 0 === l2 || null === (u2 = l2.actions) || void 0 === u2 || null === (c2 = u2.values) || void 0 === c2 ? void 0 : c2.length) && void 0 !== a2 ? a2 : 0) > 0, v2 = !h2 && !p2 || (null == n2 ? void 0 : n2.includes(e3.id)), g2 = this._canActivateRepeatedly(e3) || this._isSurveyFeatureFlagEnabled(e3.internal_targeting_flag_key), f2 = this.checkFlags(e3);
        return d2 && _2 && g2 && v2 && f2;
      });
      return e2(o2);
    }, t2);
  }
  checkFlags(e2) {
    var t2;
    return null === (t2 = e2.feature_flag_keys) || void 0 === t2 || !t2.length || e2.feature_flag_keys.every((e3) => {
      var { key: t3, value: i2 } = e3;
      return !t3 || !i2 || this._instance.featureFlags.isFeatureEnabled(i2);
    });
  }
  _canActivateRepeatedly(e2) {
    var t2;
    return D(null === (t2 = f.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.canActivateRepeatedly) ? (So.warn("init was not called"), false) : f.__PosthogExtensions__.canActivateRepeatedly(e2);
  }
  canRenderSurvey(e2) {
    if (D(this._surveyManager))
      return So.warn("init was not called"), { visible: false, disabledReason: "SDK is not enabled or survey functionality is not yet loaded" };
    var i2 = null;
    return this.getSurveys((r2) => {
      var n2 = r2.filter((t2) => t2.id === e2)[0];
      i2 = n2 ? t({}, this._surveyManager.canRenderSurvey(n2)) : { visible: false, disabledReason: "Survey not found" };
    }), i2;
  }
  canRenderSurveyAsync(e2, i2) {
    return D(this._surveyManager) ? (So.warn("init was not called"), Promise.resolve({ visible: false, disabledReason: "SDK is not enabled or survey functionality is not yet loaded" })) : new Promise((r2) => {
      this.getSurveys((i3) => {
        var n2 = i3.filter((t2) => t2.id === e2)[0];
        r2(n2 ? t({}, this._surveyManager.canRenderSurvey(n2)) : { visible: false, disabledReason: "Survey not found" });
      }, i2);
    });
  }
  renderSurvey(e2, t2) {
    D(this._surveyManager) ? So.warn("init was not called") : this.getSurveys((i2) => {
      var r2 = i2.filter((t3) => t3.id === e2)[0];
      this._surveyManager.renderSurvey(r2, null == d ? void 0 : d.querySelector(t2));
    });
  }
}
var Fo = z("[RateLimiter]");
class To {
  constructor(e2) {
    var t2, r2;
    i(this, "serverLimits", {}), i(this, "lastEventRateLimited", false), i(this, "checkForLimiting", (e3) => {
      var t3 = e3.text;
      if (t3 && t3.length)
        try {
          (JSON.parse(t3).quota_limited || []).forEach((e4) => {
            Fo.info("".concat(e4 || "events", " is quota limited.")), this.serverLimits[e4] = new Date().getTime() + 6e4;
          });
        } catch (e4) {
          return void Fo.warn('could not rate limit - continuing. Error: "'.concat(null == e4 ? void 0 : e4.message, '"'), { text: t3 });
        }
    }), this.instance = e2, this.captureEventsPerSecond = (null === (t2 = e2.config.rate_limiting) || void 0 === t2 ? void 0 : t2.events_per_second) || 10, this.captureEventsBurstLimit = Math.max((null === (r2 = e2.config.rate_limiting) || void 0 === r2 ? void 0 : r2.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond), this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
  }
  clientRateLimitContext() {
    var e2, t2, i2, r2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], n2 = new Date().getTime(), s2 = null !== (e2 = null === (t2 = this.instance.persistence) || void 0 === t2 ? void 0 : t2.get_property(Le)) && void 0 !== e2 ? e2 : { tokens: this.captureEventsBurstLimit, last: n2 };
    s2.tokens += (n2 - s2.last) / 1e3 * this.captureEventsPerSecond, s2.last = n2, s2.tokens > this.captureEventsBurstLimit && (s2.tokens = this.captureEventsBurstLimit);
    var o2 = s2.tokens < 1;
    return o2 || r2 || (s2.tokens = Math.max(0, s2.tokens - 1)), !o2 || this.lastEventRateLimited || r2 || this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to ".concat(this.captureEventsPerSecond, " events per second and ").concat(this.captureEventsBurstLimit, " events burst limit.") }, { skip_client_rate_limiting: true }), this.lastEventRateLimited = o2, null === (i2 = this.instance.persistence) || void 0 === i2 || i2.set_property(Le, s2), { isRateLimited: o2, remainingTokens: s2.tokens };
  }
  isServerRateLimited(e2) {
    var t2 = this.serverLimits[e2 || "events"] || false;
    return false !== t2 && new Date().getTime() < t2;
  }
}
var Ro = z("[RemoteConfig]");
class $o {
  constructor(e2) {
    this._instance = e2;
  }
  get remoteConfig() {
    var e2, t2;
    return null === (e2 = f._POSTHOG_REMOTE_CONFIG) || void 0 === e2 || null === (t2 = e2[this._instance.config.token]) || void 0 === t2 ? void 0 : t2.config;
  }
  _loadRemoteConfigJs(e2) {
    var t2, i2, r2;
    null !== (t2 = f.__PosthogExtensions__) && void 0 !== t2 && t2.loadExternalDependency ? null === (i2 = f.__PosthogExtensions__) || void 0 === i2 || null === (r2 = i2.loadExternalDependency) || void 0 === r2 || r2.call(i2, this._instance, "remote-config", () => e2(this.remoteConfig)) : (Ro.error("PostHog Extensions not found. Cannot load remote config."), e2());
  }
  _loadRemoteConfigJSON(e2) {
    this._instance._send_request({ method: "GET", url: this._instance.requestRouter.endpointFor("assets", "/array/".concat(this._instance.config.token, "/config")), callback: (t2) => {
      e2(t2.json);
    } });
  }
  load() {
    try {
      if (this.remoteConfig)
        return Ro.info("Using preloaded remote config", this.remoteConfig), void this._onRemoteConfig(this.remoteConfig);
      if (this._instance.config.advanced_disable_decide)
        return void Ro.warn("Remote config is disabled. Falling back to local config.");
      this._loadRemoteConfigJs((e2) => {
        if (!e2)
          return Ro.info("No config found after loading remote JS config. Falling back to JSON."), void this._loadRemoteConfigJSON((e3) => {
            this._onRemoteConfig(e3);
          });
        this._onRemoteConfig(e2);
      });
    } catch (e2) {
      Ro.error("Error loading remote config", e2);
    }
  }
  _onRemoteConfig(e2) {
    e2 ? this._instance.config.__preview_remote_config ? (this._instance._onRemoteConfig(e2), false !== e2.hasFeatureFlags && this._instance.featureFlags.ensureFlagsLoaded()) : Ro.info("__preview_remote_config is disabled. Logging config instead", e2) : Ro.error("Failed to fetch remote config from PostHog.");
  }
}
var Oo = function(e2) {
  var t2, i2, r2, n2, s2 = "";
  for (t2 = i2 = 0, r2 = (e2 = (e2 + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, n2 = 0; n2 < r2; n2++) {
    var o2 = e2.charCodeAt(n2), a2 = null;
    o2 < 128 ? i2++ : a2 = o2 > 127 && o2 < 2048 ? String.fromCharCode(o2 >> 6 | 192, 63 & o2 | 128) : String.fromCharCode(o2 >> 12 | 224, o2 >> 6 & 63 | 128, 63 & o2 | 128), L(a2) || (i2 > t2 && (s2 += e2.substring(t2, i2)), s2 += a2, t2 = i2 = n2 + 1);
  }
  return i2 > t2 && (s2 += e2.substring(t2, e2.length)), s2;
}, Mo = !!p || !!h, Ao = "text/plain", Lo = (e2, i2) => {
  var [r2, n2] = e2.split("?"), s2 = t({}, i2);
  null == n2 || n2.split("&").forEach((e3) => {
    var [t2] = e3.split("=");
    delete s2[t2];
  });
  var o2 = wt(s2);
  return o2 = o2 ? (n2 ? n2 + "&" : "") + o2 : n2, "".concat(r2, "?").concat(o2);
}, Do = (e2, t2) => JSON.stringify(e2, (e3, t3) => "bigint" == typeof t3 ? t3.toString() : t3, t2), qo = (e2) => {
  var { data: t2, compression: i2 } = e2;
  if (t2) {
    if (i2 === n.GZipJS) {
      var r2 = Tr(Rr(Do(t2)), { mtime: 0 }), s2 = new Blob([r2], { type: Ao });
      return { contentType: Ao, body: s2, estimatedSize: s2.size };
    }
    if (i2 === n.Base64) {
      var o2 = function(e3) {
        var t3, i3, r3, n2, s3, o3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a3 = 0, l3 = 0, u2 = "", c2 = [];
        if (!e3)
          return e3;
        e3 = Oo(e3);
        do {
          t3 = (s3 = e3.charCodeAt(a3++) << 16 | e3.charCodeAt(a3++) << 8 | e3.charCodeAt(a3++)) >> 18 & 63, i3 = s3 >> 12 & 63, r3 = s3 >> 6 & 63, n2 = 63 & s3, c2[l3++] = o3.charAt(t3) + o3.charAt(i3) + o3.charAt(r3) + o3.charAt(n2);
        } while (a3 < e3.length);
        switch (u2 = c2.join(""), e3.length % 3) {
          case 1:
            u2 = u2.slice(0, -2) + "==";
            break;
          case 2:
            u2 = u2.slice(0, -1) + "=";
        }
        return u2;
      }(Do(t2)), a2 = ((e3) => "data=" + encodeURIComponent("string" == typeof e3 ? e3 : Do(e3)))(o2);
      return { contentType: "application/x-www-form-urlencoded", body: a2, estimatedSize: new Blob([a2]).size };
    }
    var l2 = Do(t2);
    return { contentType: "application/json", body: l2, estimatedSize: new Blob([l2]).size };
  }
}, No = [];
h && No.push({ transport: "fetch", method: (e2) => {
  var i2, r2, { contentType: n2, body: s2, estimatedSize: o2 } = null !== (i2 = qo(e2)) && void 0 !== i2 ? i2 : {}, a2 = new Headers();
  V(e2.headers, function(e3, t2) {
    a2.append(t2, e3);
  }), n2 && a2.append("Content-Type", n2);
  var l2 = e2.url, u2 = null;
  if (v) {
    var c2 = new v();
    u2 = { signal: c2.signal, timeout: setTimeout(() => c2.abort(), e2.timeout) };
  }
  h(l2, t({ method: (null == e2 ? void 0 : e2.method) || "GET", headers: a2, keepalive: "POST" === e2.method && (o2 || 0) < 52428.8, body: s2, signal: null === (r2 = u2) || void 0 === r2 ? void 0 : r2.signal }, e2.fetchOptions)).then((t2) => t2.text().then((i3) => {
    var r3, n3 = { statusCode: t2.status, text: i3 };
    if (200 === t2.status)
      try {
        n3.json = JSON.parse(i3);
      } catch (e3) {
        U.error(e3);
      }
    null === (r3 = e2.callback) || void 0 === r3 || r3.call(e2, n3);
  })).catch((t2) => {
    var i3;
    U.error(t2), null === (i3 = e2.callback) || void 0 === i3 || i3.call(e2, { statusCode: 0, text: t2 });
  }).finally(() => u2 ? clearTimeout(u2.timeout) : null);
} }), p && No.push({ transport: "XHR", method: (e2) => {
  var t2, i2 = new p();
  i2.open(e2.method || "GET", e2.url, true);
  var { contentType: r2, body: n2 } = null !== (t2 = qo(e2)) && void 0 !== t2 ? t2 : {};
  V(e2.headers, function(e3, t3) {
    i2.setRequestHeader(t3, e3);
  }), r2 && i2.setRequestHeader("Content-Type", r2), e2.timeout && (i2.timeout = e2.timeout), i2.withCredentials = true, i2.onreadystatechange = () => {
    if (4 === i2.readyState) {
      var t3, r3 = { statusCode: i2.status, text: i2.responseText };
      if (200 === i2.status)
        try {
          r3.json = JSON.parse(i2.responseText);
        } catch (e3) {
        }
      null === (t3 = e2.callback) || void 0 === t3 || t3.call(e2, r3);
    }
  }, i2.send(n2);
} }), null != c && c.sendBeacon && No.push({ transport: "sendBeacon", method: (e2) => {
  var t2 = Lo(e2.url, { beacon: "1" });
  try {
    var i2, { contentType: r2, body: n2 } = null !== (i2 = qo(e2)) && void 0 !== i2 ? i2 : {}, s2 = "string" == typeof n2 ? new Blob([n2], { type: r2 }) : n2;
    c.sendBeacon(t2, s2);
  } catch (e3) {
  }
} });
var Bo = 3e3;
class Ho {
  constructor(e2, t2) {
    i(this, "_isPaused", true), i(this, "_queue", []), this._flushTimeoutMs = Gi((null == t2 ? void 0 : t2.flush_interval_ms) || Bo, 250, 5e3, "flush interval", Bo), this._sendRequest = e2;
  }
  enqueue(e2) {
    this._queue.push(e2), this._flushTimeout || this._setFlushTimeout();
  }
  unload() {
    this._clearFlushTimeout();
    var e2 = this._queue.length > 0 ? this._formatQueue() : {}, i2 = Object.values(e2), r2 = [...i2.filter((e3) => 0 === e3.url.indexOf("/e")), ...i2.filter((e3) => 0 !== e3.url.indexOf("/e"))];
    r2.map((e3) => {
      this._sendRequest(t(t({}, e3), {}, { transport: "sendBeacon" }));
    });
  }
  enable() {
    this._isPaused = false, this._setFlushTimeout();
  }
  _setFlushTimeout() {
    var e2 = this;
    this._isPaused || (this._flushTimeout = setTimeout(() => {
      if (this._clearFlushTimeout(), this._queue.length > 0) {
        var t2 = this._formatQueue(), i2 = function(i3) {
          var r3 = t2[i3], n2 = new Date().getTime();
          r3.data && F(r3.data) && V(r3.data, (e3) => {
            e3.offset = Math.abs(e3.timestamp - n2), delete e3.timestamp;
          }), e2._sendRequest(r3);
        };
        for (var r2 in t2)
          i2(r2);
      }
    }, this._flushTimeoutMs));
  }
  _clearFlushTimeout() {
    clearTimeout(this._flushTimeout), this._flushTimeout = void 0;
  }
  _formatQueue() {
    var e2 = {};
    return V(this._queue, (i2) => {
      var r2, n2 = i2, s2 = (n2 ? n2.batchKey : null) || n2.url;
      O(e2[s2]) && (e2[s2] = t(t({}, n2), {}, { data: [] })), null === (r2 = e2[s2].data) || void 0 === r2 || r2.push(n2.data);
    }), this._queue = [], e2;
  }
}
var jo = ["retriesPerformedSoFar"];
class Uo {
  constructor(e2) {
    i(this, "_isPolling", false), i(this, "_pollIntervalMs", 3e3), i(this, "_queue", []), this._instance = e2, this._queue = [], this._areWeOnline = true, !O(s) && "onLine" in s.navigator && (this._areWeOnline = s.navigator.onLine, ne(s, "online", () => {
      this._areWeOnline = true, this._flush();
    }), ne(s, "offline", () => {
      this._areWeOnline = false;
    }));
  }
  get length() {
    return this._queue.length;
  }
  retriableRequest(e2) {
    var { retriesPerformedSoFar: i2 } = e2, n2 = r(e2, jo);
    q(i2) && i2 > 0 && (n2.url = Lo(n2.url, { retry_count: i2 })), this._instance._send_request(t(t({}, n2), {}, { callback: (e3) => {
      var r2;
      200 !== e3.statusCode && (e3.statusCode < 400 || e3.statusCode >= 500) && (null != i2 ? i2 : 0) < 10 ? this._enqueue(t({ retriesPerformedSoFar: i2 }, n2)) : null === (r2 = n2.callback) || void 0 === r2 || r2.call(n2, e3);
    } }));
  }
  _enqueue(e2) {
    var t2 = e2.retriesPerformedSoFar || 0;
    e2.retriesPerformedSoFar = t2 + 1;
    var i2 = function(e3) {
      var t3 = 3e3 * Math.pow(2, e3), i3 = t3 / 2, r3 = Math.min(18e5, t3), n3 = (Math.random() - 0.5) * (r3 - i3);
      return Math.ceil(r3 + n3);
    }(t2), r2 = Date.now() + i2;
    this._queue.push({ retryAt: r2, requestOptions: e2 });
    var n2 = "Enqueued failed request for retry in ".concat(i2);
    navigator.onLine || (n2 += " (Browser is offline)"), U.warn(n2), this._isPolling || (this._isPolling = true, this._poll());
  }
  _poll() {
    this._poller && clearTimeout(this._poller), this._poller = setTimeout(() => {
      this._areWeOnline && this._queue.length > 0 && this._flush(), this._poll();
    }, this._pollIntervalMs);
  }
  _flush() {
    var e2 = Date.now(), t2 = [], i2 = this._queue.filter((i3) => i3.retryAt < e2 || (t2.push(i3), false));
    if (this._queue = t2, i2.length > 0)
      for (var { requestOptions: r2 } of i2)
        this.retriableRequest(r2);
  }
  unload() {
    for (var { requestOptions: e2 } of (this._poller && (clearTimeout(this._poller), this._poller = void 0), this._queue))
      try {
        this._instance._send_request(t(t({}, e2), {}, { transport: "sendBeacon" }));
      } catch (e3) {
        U.error(e3);
      }
    this._queue = [];
  }
}
class zo {
  constructor(e2) {
    i(this, "_updateScrollData", () => {
      var e3, t2, i2, r2;
      this._context || (this._context = {});
      var n2 = this.scrollElement(), s2 = this.scrollY(), o2 = n2 ? Math.max(0, n2.scrollHeight - n2.clientHeight) : 0, a2 = s2 + ((null == n2 ? void 0 : n2.clientHeight) || 0), l2 = (null == n2 ? void 0 : n2.scrollHeight) || 0;
      this._context.lastScrollY = Math.ceil(s2), this._context.maxScrollY = Math.max(s2, null !== (e3 = this._context.maxScrollY) && void 0 !== e3 ? e3 : 0), this._context.maxScrollHeight = Math.max(o2, null !== (t2 = this._context.maxScrollHeight) && void 0 !== t2 ? t2 : 0), this._context.lastContentY = a2, this._context.maxContentY = Math.max(a2, null !== (i2 = this._context.maxContentY) && void 0 !== i2 ? i2 : 0), this._context.maxContentHeight = Math.max(l2, null !== (r2 = this._context.maxContentHeight) && void 0 !== r2 ? r2 : 0);
    }), this._instance = e2;
  }
  getContext() {
    return this._context;
  }
  resetContext() {
    var e2 = this._context;
    return setTimeout(this._updateScrollData, 0), e2;
  }
  startMeasuringScrollPosition() {
    ne(s, "scroll", this._updateScrollData, { capture: true }), ne(s, "scrollend", this._updateScrollData, { capture: true }), ne(s, "resize", this._updateScrollData);
  }
  scrollElement() {
    if (!this._instance.config.scroll_root_selector)
      return null == s ? void 0 : s.document.documentElement;
    var e2 = F(this._instance.config.scroll_root_selector) ? this._instance.config.scroll_root_selector : [this._instance.config.scroll_root_selector];
    for (var t2 of e2) {
      var i2 = null == s ? void 0 : s.document.querySelector(t2);
      if (i2)
        return i2;
    }
  }
  scrollY() {
    if (this._instance.config.scroll_root_selector) {
      var e2 = this.scrollElement();
      return e2 && e2.scrollTop || 0;
    }
    return s && (s.scrollY || s.pageYOffset || s.document.documentElement.scrollTop) || 0;
  }
  scrollX() {
    if (this._instance.config.scroll_root_selector) {
      var e2 = this.scrollElement();
      return e2 && e2.scrollLeft || 0;
    }
    return s && (s.scrollX || s.pageXOffset || s.document.documentElement.scrollLeft) || 0;
  }
}
var Wo = (e2) => gs(null == e2 ? void 0 : e2.config.mask_personal_data_properties, null == e2 ? void 0 : e2.config.custom_personal_data_properties);
class Go {
  constructor(e2, t2, r2, n2) {
    i(this, "_onSessionIdCallback", (e3) => {
      var t3 = this._getStored();
      if (!t3 || t3.sessionId !== e3) {
        var i2 = { sessionId: e3, props: this._sessionSourceParamGenerator(this._instance) };
        this._persistence.register({ [Ae]: i2 });
      }
    }), this._instance = e2, this._sessionIdManager = t2, this._persistence = r2, this._sessionSourceParamGenerator = n2 || Wo, this._sessionIdManager.onSessionId(this._onSessionIdCallback);
  }
  _getStored() {
    return this._persistence.props[Ae];
  }
  getSetOnceProps() {
    var e2, t2 = null === (e2 = this._getStored()) || void 0 === e2 ? void 0 : e2.props;
    return t2 ? "r" in t2 ? fs(t2) : { $referring_domain: t2.referringDomain, $pathname: t2.initialPathName, utm_source: t2.utm_source, utm_campaign: t2.utm_campaign, utm_medium: t2.utm_medium, utm_content: t2.utm_content, utm_term: t2.utm_term } : {};
  }
  getSessionProps() {
    var e2 = {};
    return V(Z(this.getSetOnceProps()), (t2, i2) => {
      "$current_url" === i2 && (i2 = "url"), e2["$session_entry_".concat(E(i2))] = t2;
    }), e2;
  }
}
var Vo = z("[SessionId]");
class Jo {
  constructor(e2, t2, r2) {
    var n2;
    if (i(this, "_sessionIdChangedHandlers", []), !e2.persistence)
      throw new Error("SessionIdManager requires a PostHogPersistence instance");
    if (e2.config.__preview_experimental_cookieless_mode)
      throw new Error("SessionIdManager cannot be used with __preview_experimental_cookieless_mode");
    this._config = e2.config, this._persistence = e2.persistence, this._windowId = void 0, this._sessionId = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this._sessionIdGenerator = t2 || Dt, this._windowIdGenerator = r2 || Dt;
    var s2 = this._config.persistence_name || this._config.token, o2 = this._config.session_idle_timeout_seconds || 1800;
    if (this._sessionTimeoutMs = 1e3 * Gi(o2, 60, 36e3, "session_idle_timeout_seconds", 1800), e2.register({ $configured_session_timeout_ms: this._sessionTimeoutMs }), this._resetIdleTimer(), this._window_id_storage_key = "ph_" + s2 + "_window_id", this._primary_window_exists_storage_key = "ph_" + s2 + "_primary_window_exists", this._canUseSessionStorage()) {
      var a2 = Qt.parse(this._window_id_storage_key), l2 = Qt.parse(this._primary_window_exists_storage_key);
      a2 && !l2 ? this._windowId = a2 : Qt.remove(this._window_id_storage_key), Qt.set(this._primary_window_exists_storage_key, true);
    }
    if (null !== (n2 = this._config.bootstrap) && void 0 !== n2 && n2.sessionID)
      try {
        var u2 = ((e3) => {
          var t3 = e3.replace(/-/g, "");
          if (32 !== t3.length)
            throw new Error("Not a valid UUID");
          if ("7" !== t3[12])
            throw new Error("Not a UUIDv7");
          return parseInt(t3.substring(0, 12), 16);
        })(this._config.bootstrap.sessionID);
        this._setSessionId(this._config.bootstrap.sessionID, new Date().getTime(), u2);
      } catch (e3) {
        Vo.error("Invalid sessionID in bootstrap", e3);
      }
    this._listenToReloadWindow();
  }
  get sessionTimeoutMs() {
    return this._sessionTimeoutMs;
  }
  onSessionId(e2) {
    return O(this._sessionIdChangedHandlers) && (this._sessionIdChangedHandlers = []), this._sessionIdChangedHandlers.push(e2), this._sessionId && e2(this._sessionId, this._windowId), () => {
      this._sessionIdChangedHandlers = this._sessionIdChangedHandlers.filter((t2) => t2 !== e2);
    };
  }
  _canUseSessionStorage() {
    return "memory" !== this._config.persistence && !this._persistence.disabled && Qt.is_supported();
  }
  _setWindowId(e2) {
    e2 !== this._windowId && (this._windowId = e2, this._canUseSessionStorage() && Qt.set(this._window_id_storage_key, e2));
  }
  _getWindowId() {
    return this._windowId ? this._windowId : this._canUseSessionStorage() ? Qt.parse(this._window_id_storage_key) : null;
  }
  _setSessionId(e2, t2, i2) {
    e2 === this._sessionId && t2 === this._sessionActivityTimestamp && i2 === this._sessionStartTimestamp || (this._sessionStartTimestamp = i2, this._sessionActivityTimestamp = t2, this._sessionId = e2, this._persistence.register({ [Se]: [t2, e2, i2] }));
  }
  _getSessionId() {
    if (this._sessionId && this._sessionActivityTimestamp && this._sessionStartTimestamp)
      return [this._sessionActivityTimestamp, this._sessionId, this._sessionStartTimestamp];
    var e2 = this._persistence.props[Se];
    return F(e2) && 2 === e2.length && e2.push(e2[0]), e2 || [0, null, 0];
  }
  resetSessionId() {
    this._setSessionId(null, null, null);
  }
  _listenToReloadWindow() {
    ne(s, "beforeunload", () => {
      this._canUseSessionStorage() && Qt.remove(this._primary_window_exists_storage_key);
    }, { capture: false });
  }
  checkAndGetSessionAndWindowId() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    if (this._config.__preview_experimental_cookieless_mode)
      throw new Error("checkAndGetSessionAndWindowId should not be called in __preview_experimental_cookieless_mode");
    var i2 = t2 || new Date().getTime(), [r2, n2, s2] = this._getSessionId(), o2 = this._getWindowId(), a2 = q(s2) && s2 > 0 && Math.abs(i2 - s2) > 864e5, l2 = false, u2 = !n2, c2 = !e2 && Math.abs(i2 - r2) > this.sessionTimeoutMs;
    u2 || c2 || a2 ? (n2 = this._sessionIdGenerator(), o2 = this._windowIdGenerator(), Vo.info("new session ID generated", { sessionId: n2, windowId: o2, changeReason: { noSessionId: u2, activityTimeout: c2, sessionPastMaximumLength: a2 } }), s2 = i2, l2 = true) : o2 || (o2 = this._windowIdGenerator(), l2 = true);
    var d2 = 0 === r2 || !e2 || a2 ? i2 : r2, _2 = 0 === s2 ? new Date().getTime() : s2;
    return this._setWindowId(o2), this._setSessionId(n2, d2, _2), e2 || this._resetIdleTimer(), l2 && this._sessionIdChangedHandlers.forEach((e3) => e3(n2, o2, l2 ? { noSessionId: u2, activityTimeout: c2, sessionPastMaximumLength: a2 } : void 0)), { sessionId: n2, windowId: o2, sessionStartTimestamp: _2, changeReason: l2 ? { noSessionId: u2, activityTimeout: c2, sessionPastMaximumLength: a2 } : void 0, lastActivityTimestamp: r2 };
  }
  _resetIdleTimer() {
    clearTimeout(this._enforceIdleTimeout), this._enforceIdleTimeout = setTimeout(() => {
      this.resetSessionId();
    }, 1.1 * this.sessionTimeoutMs);
  }
}
var Yo = ["$set_once", "$set"], Ko = z("[SiteApps]");
class Xo {
  constructor(e2) {
    this._instance = e2, this._bufferedInvocations = [], this.apps = {};
  }
  get isEnabled() {
    return !!this._instance.config.opt_in_site_apps;
  }
  _eventCollector(e2, t2) {
    if (t2) {
      var i2 = this.globalsForEvent(t2);
      this._bufferedInvocations.push(i2), this._bufferedInvocations.length > 1e3 && (this._bufferedInvocations = this._bufferedInvocations.slice(10));
    }
  }
  get siteAppLoaders() {
    var e2, t2;
    return null === (e2 = f._POSTHOG_REMOTE_CONFIG) || void 0 === e2 || null === (t2 = e2[this._instance.config.token]) || void 0 === t2 ? void 0 : t2.siteApps;
  }
  init() {
    if (this.isEnabled) {
      var e2 = this._instance._addCaptureHook(this._eventCollector.bind(this));
      this._stopBuffering = () => {
        e2(), this._bufferedInvocations = [], this._stopBuffering = void 0;
      };
    }
  }
  globalsForEvent(e2) {
    var i2, n2, s2, o2, a2, l2, u2;
    if (!e2)
      throw new Error("Event payload is required");
    var c2 = {}, d2 = this._instance.get_property("$groups") || [], _2 = this._instance.get_property("$stored_group_properties") || {};
    for (var [h2, p2] of Object.entries(_2))
      c2[h2] = { id: d2[h2], type: h2, properties: p2 };
    var { $set_once: v2, $set: g2 } = e2;
    return { event: t(t({}, r(e2, Yo)), {}, { properties: t(t(t({}, e2.properties), g2 ? { $set: t(t({}, null !== (i2 = null === (n2 = e2.properties) || void 0 === n2 ? void 0 : n2.$set) && void 0 !== i2 ? i2 : {}), g2) } : {}), v2 ? { $set_once: t(t({}, null !== (s2 = null === (o2 = e2.properties) || void 0 === o2 ? void 0 : o2.$set_once) && void 0 !== s2 ? s2 : {}), v2) } : {}), elements_chain: null !== (a2 = null === (l2 = e2.properties) || void 0 === l2 ? void 0 : l2.$elements_chain) && void 0 !== a2 ? a2 : "", distinct_id: null === (u2 = e2.properties) || void 0 === u2 ? void 0 : u2.distinct_id }), person: { properties: this._instance.get_property("$stored_person_properties") }, groups: c2 };
  }
  setupSiteApp(e2) {
    var t2 = this.apps[e2.id], i2 = () => {
      var i3;
      (!t2.errored && this._bufferedInvocations.length && (Ko.info("Processing ".concat(this._bufferedInvocations.length, " events for site app with id ").concat(e2.id)), this._bufferedInvocations.forEach((e3) => {
        var i4;
        return null === (i4 = t2.processEvent) || void 0 === i4 ? void 0 : i4.call(t2, e3);
      }), t2.processedBuffer = true), Object.values(this.apps).every((e3) => e3.processedBuffer || e3.errored)) && (null === (i3 = this._stopBuffering) || void 0 === i3 || i3.call(this));
    }, r2 = false, n2 = (n3) => {
      t2.errored = !n3, t2.loaded = true, Ko.info("Site app with id ".concat(e2.id, " ").concat(n3 ? "loaded" : "errored")), r2 && i2();
    };
    try {
      var { processEvent: s2 } = e2.init({ posthog: this._instance, callback: (e3) => {
        n2(e3);
      } });
      s2 && (t2.processEvent = s2), r2 = true;
    } catch (t3) {
      Ko.error("Error while initializing PostHog app with config id ".concat(e2.id), t3), n2(false);
    }
    if (r2 && t2.loaded)
      try {
        i2();
      } catch (i3) {
        Ko.error("Error while processing buffered events PostHog app with config id ".concat(e2.id), i3), t2.errored = true;
      }
  }
  _setupSiteApps() {
    var e2 = this.siteAppLoaders || [];
    for (var t2 of e2)
      this.apps[t2.id] = { id: t2.id, loaded: false, errored: false, processedBuffer: false };
    for (var i2 of e2)
      this.setupSiteApp(i2);
  }
  _onCapturedEvent(e2) {
    if (0 !== Object.keys(this.apps).length) {
      var t2 = this.globalsForEvent(e2);
      for (var i2 of Object.values(this.apps))
        try {
          var r2;
          null === (r2 = i2.processEvent) || void 0 === r2 || r2.call(i2, t2);
        } catch (t3) {
          Ko.error("Error while processing event ".concat(e2.event, " for site app ").concat(i2.id), t3);
        }
    }
  }
  onRemoteConfig(e2) {
    var t2, i2, r2, n2 = this;
    if (null !== (t2 = this.siteAppLoaders) && void 0 !== t2 && t2.length)
      return this.isEnabled ? (this._setupSiteApps(), void this._instance.on("eventCaptured", (e3) => this._onCapturedEvent(e3))) : void Ko.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
    if (null === (i2 = this._stopBuffering) || void 0 === i2 || i2.call(this), null !== (r2 = e2.siteApps) && void 0 !== r2 && r2.length)
      if (this.isEnabled) {
        var s2 = function(e3, t3) {
          var i3, r3;
          f["__$$ph_site_app_".concat(e3)] = n2._instance, null === (i3 = f.__PosthogExtensions__) || void 0 === i3 || null === (r3 = i3.loadSiteApp) || void 0 === r3 || r3.call(i3, n2._instance, t3, (t4) => {
            if (t4)
              return Ko.error("Error while initializing PostHog app with config id ".concat(e3), t4);
          });
        };
        for (var { id: o2, url: a2 } of e2.siteApps)
          s2(o2, a2);
      } else
        Ko.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
  }
}
var Qo, Zo = ["amazonbot", "amazonproductbot", "app.hypefactors.com", "applebot", "archive.org_bot", "awariobot", "backlinksextendedbot", "baiduspider", "bingbot", "bingpreview", "chrome-lighthouse", "dataforseobot", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "http://yandex.com/bots", "hubspot", "ia_archiver", "linkedinbot", "meta-externalagent", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "sebot-wa", "sitebulb", "slackbot", "slurp", "trendictionbot", "turnitin", "twitterbot", "vercelbot", "yahoo! slurp", "yandexbot", "zoombot", "bot.htm", "bot.php", "(bot;", "bot/", "crawler", "ahrefsbot", "ahrefssiteaudit", "semrushbot", "siteauditbot", "splitsignalbot", "gptbot", "oai-searchbot", "chatgpt-user", "perplexitybot", "better uptime bot", "sentryuptimebot", "uptimerobot", "headlesschrome", "cypress", "google-hoteladsverifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleweblight", "mediapartners-google", "storebot-google", "bytespider"], ea = function(e2, t2) {
  if (!e2)
    return false;
  var i2 = e2.toLowerCase();
  return Zo.concat(t2 || []).some((e3) => {
    var t3 = e3.toLowerCase();
    return -1 !== i2.indexOf(t3);
  });
}, ta = function(e2, t2) {
  if (!e2)
    return false;
  var i2 = e2.userAgent;
  if (i2 && ea(i2, t2))
    return true;
  try {
    var r2 = null == e2 ? void 0 : e2.userAgentData;
    if (null != r2 && r2.brands && r2.brands.some((e3) => ea(null == e3 ? void 0 : e3.brand, t2)))
      return true;
  } catch (e3) {
  }
  return !!e2.webdriver;
};
function ia(e2, t2, i2) {
  return Do({ distinct_id: e2, userPropertiesToSet: t2, userPropertiesToSetOnce: i2 });
}
!function(e2) {
  e2.US = "us", e2.EU = "eu", e2.CUSTOM = "custom";
}(Qo || (Qo = {}));
var ra = "i.posthog.com";
class na {
  constructor(e2) {
    i(this, "_regionCache", {}), this.instance = e2;
  }
  get apiHost() {
    var e2 = this.instance.config.api_host.trim().replace(/\/$/, "");
    return "https://app.posthog.com" === e2 ? "https://us.i.posthog.com" : e2;
  }
  get uiHost() {
    var e2, t2 = null === (e2 = this.instance.config.ui_host) || void 0 === e2 ? void 0 : e2.replace(/\/$/, "");
    return t2 || (t2 = this.apiHost.replace(".".concat(ra), ".posthog.com")), "https://app.posthog.com" === t2 ? "https://us.posthog.com" : t2;
  }
  get region() {
    return this._regionCache[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = Qo.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = Qo.EU : this._regionCache[this.apiHost] = Qo.CUSTOM), this._regionCache[this.apiHost];
  }
  endpointFor(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if (t2 && (t2 = "/" === t2[0] ? t2 : "/".concat(t2)), "ui" === e2)
      return this.uiHost + t2;
    if (this.region === Qo.CUSTOM)
      return this.apiHost + t2;
    var i2 = ra + t2;
    switch (e2) {
      case "assets":
        return "https://".concat(this.region, "-assets.").concat(i2);
      case "api":
        return "https://".concat(this.region, ".").concat(i2);
    }
  }
}
var sa = { icontains: (e2, t2) => !!s && t2.href.toLowerCase().indexOf(e2.toLowerCase()) > -1, not_icontains: (e2, t2) => !!s && -1 === t2.href.toLowerCase().indexOf(e2.toLowerCase()), regex: (e2, t2) => !!s && wo(t2.href, e2), not_regex: (e2, t2) => !!s && !wo(t2.href, e2), exact: (e2, t2) => t2.href === e2, is_not: (e2, t2) => t2.href !== e2 };
class oa {
  constructor(e2) {
    var t2 = this;
    i(this, "getWebExperimentsAndEvaluateDisplayLogic", function() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      t2.getWebExperiments((e4) => {
        oa._logInfo("retrieved web experiments from the server"), t2._flagToExperiments = /* @__PURE__ */ new Map(), e4.forEach((e5) => {
          if (e5.feature_flag_key) {
            var i2;
            if (t2._flagToExperiments)
              oa._logInfo("setting flag key ", e5.feature_flag_key, " to web experiment ", e5), null === (i2 = t2._flagToExperiments) || void 0 === i2 || i2.set(e5.feature_flag_key, e5);
            var r2 = t2._instance.getFeatureFlag(e5.feature_flag_key);
            M(r2) && e5.variants[r2] && t2._applyTransforms(e5.name, r2, e5.variants[r2].transforms);
          } else if (e5.variants)
            for (var n2 in e5.variants) {
              var s2 = e5.variants[n2];
              oa._matchesTestVariant(s2) && t2._applyTransforms(e5.name, n2, s2.transforms);
            }
        });
      }, e3);
    }), this._instance = e2, this._instance.onFeatureFlags((e3) => {
      this.onFeatureFlags(e3);
    });
  }
  onFeatureFlags(e2) {
    if (this._is_bot())
      oa._logInfo("Refusing to render web experiment since the viewer is a likely bot");
    else if (!this._instance.config.disable_web_experiments) {
      if (D(this._flagToExperiments))
        return this._flagToExperiments = /* @__PURE__ */ new Map(), this.loadIfEnabled(), void this.previewWebExperiment();
      oa._logInfo("applying feature flags", e2), e2.forEach((e3) => {
        var t2;
        if (this._flagToExperiments && null !== (t2 = this._flagToExperiments) && void 0 !== t2 && t2.has(e3)) {
          var i2, r2 = this._instance.getFeatureFlag(e3), n2 = null === (i2 = this._flagToExperiments) || void 0 === i2 ? void 0 : i2.get(e3);
          r2 && null != n2 && n2.variants[r2] && this._applyTransforms(n2.name, r2, n2.variants[r2].transforms);
        }
      });
    }
  }
  previewWebExperiment() {
    var e2 = oa.getWindowLocation();
    if (null != e2 && e2.search) {
      var t2 = St(null == e2 ? void 0 : e2.search, "__experiment_id"), i2 = St(null == e2 ? void 0 : e2.search, "__experiment_variant");
      t2 && i2 && (oa._logInfo("previewing web experiments ".concat(t2, " && ").concat(i2)), this.getWebExperiments((e3) => {
        this._showPreviewWebExperiment(parseInt(t2), i2, e3);
      }, false, true));
    }
  }
  loadIfEnabled() {
    this._instance.config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
  }
  getWebExperiments(e2, t2, i2) {
    if (this._instance.config.disable_web_experiments && !i2)
      return e2([]);
    var r2 = this._instance.get_property("$web_experiments");
    if (r2 && !t2)
      return e2(r2);
    this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", "/api/web_experiments/?token=".concat(this._instance.config.token)), method: "GET", callback: (t3) => {
      if (200 !== t3.statusCode || !t3.json)
        return e2([]);
      var i3 = t3.json.experiments || [];
      return e2(i3);
    } });
  }
  _showPreviewWebExperiment(e2, t2, i2) {
    var r2 = i2.filter((t3) => t3.id === e2);
    r2 && r2.length > 0 && (oa._logInfo("Previewing web experiment [".concat(r2[0].name, "] with variant [").concat(t2, "]")), this._applyTransforms(r2[0].name, t2, r2[0].variants[t2].transforms));
  }
  static _matchesTestVariant(e2) {
    return !D(e2.conditions) && (oa._matchUrlConditions(e2) && oa._matchUTMConditions(e2));
  }
  static _matchUrlConditions(e2) {
    var t2;
    if (D(e2.conditions) || D(null === (t2 = e2.conditions) || void 0 === t2 ? void 0 : t2.url))
      return true;
    var i2, r2, n2, s2 = oa.getWindowLocation();
    return !!s2 && (null === (i2 = e2.conditions) || void 0 === i2 || !i2.url || sa[null !== (r2 = null === (n2 = e2.conditions) || void 0 === n2 ? void 0 : n2.urlMatchType) && void 0 !== r2 ? r2 : "icontains"](e2.conditions.url, s2));
  }
  static getWindowLocation() {
    return null == s ? void 0 : s.location;
  }
  static _matchUTMConditions(e2) {
    var t2;
    if (D(e2.conditions) || D(null === (t2 = e2.conditions) || void 0 === t2 ? void 0 : t2.utm))
      return true;
    var i2 = ds();
    if (i2.utm_source) {
      var r2, n2, s2, o2, a2, l2, u2, c2, d2, _2, h2, p2, v2, g2, f2, m2, y2 = null === (r2 = e2.conditions) || void 0 === r2 || null === (n2 = r2.utm) || void 0 === n2 || !n2.utm_campaign || (null === (s2 = e2.conditions) || void 0 === s2 || null === (o2 = s2.utm) || void 0 === o2 ? void 0 : o2.utm_campaign) == i2.utm_campaign, b2 = null === (a2 = e2.conditions) || void 0 === a2 || null === (l2 = a2.utm) || void 0 === l2 || !l2.utm_source || (null === (u2 = e2.conditions) || void 0 === u2 || null === (c2 = u2.utm) || void 0 === c2 ? void 0 : c2.utm_source) == i2.utm_source, w2 = null === (d2 = e2.conditions) || void 0 === d2 || null === (_2 = d2.utm) || void 0 === _2 || !_2.utm_medium || (null === (h2 = e2.conditions) || void 0 === h2 || null === (p2 = h2.utm) || void 0 === p2 ? void 0 : p2.utm_medium) == i2.utm_medium, S2 = null === (v2 = e2.conditions) || void 0 === v2 || null === (g2 = v2.utm) || void 0 === g2 || !g2.utm_term || (null === (f2 = e2.conditions) || void 0 === f2 || null === (m2 = f2.utm) || void 0 === m2 ? void 0 : m2.utm_term) == i2.utm_term;
      return y2 && w2 && S2 && b2;
    }
    return false;
  }
  static _logInfo(e2) {
    for (var t2 = arguments.length, i2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
      i2[r2 - 1] = arguments[r2];
    U.info("[WebExperiments] ".concat(e2), i2);
  }
  _applyTransforms(e2, t2, i2) {
    this._is_bot() ? oa._logInfo("Refusing to render web experiment since the viewer is a likely bot") : "control" !== t2 ? i2.forEach((i3) => {
      if (i3.selector) {
        var r2;
        oa._logInfo("applying transform of variant ".concat(t2, " for experiment ").concat(e2, " "), i3);
        var n2 = null === (r2 = document) || void 0 === r2 ? void 0 : r2.querySelectorAll(i3.selector);
        null == n2 || n2.forEach((e3) => {
          var t3 = e3;
          i3.html && (t3.innerHTML = i3.html), i3.css && t3.setAttribute("style", i3.css);
        });
      }
    }) : oa._logInfo("Control variants leave the page unmodified.");
  }
  _is_bot() {
    return c && this._instance ? ta(c, this._instance.config.custom_blocked_useragents) : void 0;
  }
}
var aa = {}, la = () => {
}, ua = "posthog", ca = !Mo && -1 === (null == g ? void 0 : g.indexOf("MSIE")) && -1 === (null == g ? void 0 : g.indexOf("Mozilla")), da = () => {
  var e2;
  return { api_host: "https://us.i.posthog.com", ui_host: null, token: "", autocapture: true, rageclick: true, cross_subdomain_cookie: ie(null == d ? void 0 : d.location), persistence: "localStorage+cookie", persistence_name: "", loaded: la, save_campaign_params: true, custom_campaign_params: [], custom_blocked_useragents: [], save_referrer: true, capture_pageview: true, capture_pageleave: "if_capture_pageview", debug: _ && M(null == _ ? void 0 : _.search) && -1 !== _.search.indexOf("__posthog_debug=true") || false, cookie_expiration: 365, upgrade: false, disable_session_recording: false, disable_persistence: false, disable_web_experiments: true, disable_surveys: false, disable_external_dependency_loading: false, enable_recording_console_log: void 0, secure_cookie: "https:" === (null == s || null === (e2 = s.location) || void 0 === e2 ? void 0 : e2.protocol), ip: true, opt_out_capturing_by_default: false, opt_out_persistence_by_default: false, opt_out_useragent_filter: false, opt_out_capturing_persistence_type: "localStorage", opt_out_capturing_cookie_prefix: null, opt_in_site_apps: false, property_denylist: [], respect_dnt: false, sanitize_properties: null, request_headers: {}, request_batching: true, properties_string_max_length: 65535, session_recording: {}, mask_all_element_attributes: false, mask_all_text: false, mask_personal_data_properties: false, custom_personal_data_properties: [], advanced_disable_decide: false, advanced_disable_feature_flags: false, advanced_disable_feature_flags_on_first_load: false, advanced_disable_toolbar_metrics: false, feature_flag_request_timeout_ms: 3e3, surveys_request_timeout_ms: 1e4, on_request_error: (e3) => {
    var t2 = "Bad HTTP status: " + e3.statusCode + " " + e3.text;
    U.error(t2);
  }, get_device_id: (e3) => e3, capture_performance: void 0, name: "posthog", bootstrap: {}, disable_compression: false, session_idle_timeout_seconds: 1800, person_profiles: "identified_only", before_send: void 0, request_queue_config: { flush_interval_ms: Bo }, _onCapture: la };
}, _a = (e2) => {
  var t2 = {};
  O(e2.process_person) || (t2.person_profiles = e2.process_person), O(e2.xhr_headers) || (t2.request_headers = e2.xhr_headers), O(e2.cookie_name) || (t2.persistence_name = e2.cookie_name), O(e2.disable_cookie) || (t2.disable_persistence = e2.disable_cookie), O(e2.store_google) || (t2.save_campaign_params = e2.store_google), O(e2.verbose) || (t2.debug = e2.verbose);
  var i2 = J({}, t2, e2);
  return F(e2.property_blacklist) && (O(e2.property_denylist) ? i2.property_denylist = e2.property_blacklist : F(e2.property_denylist) ? i2.property_denylist = [...e2.property_blacklist, ...e2.property_denylist] : U.error("Invalid value for property_denylist config: " + e2.property_denylist)), i2;
};
class ha {
  constructor() {
    i(this, "__forceAllowLocalhost", false);
  }
  get _forceAllowLocalhost() {
    return this.__forceAllowLocalhost;
  }
  set _forceAllowLocalhost(e2) {
    U.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e2;
  }
}
class pa {
  get decideEndpointWasHit() {
    var e2, t2;
    return null !== (e2 = null === (t2 = this.featureFlags) || void 0 === t2 ? void 0 : t2.hasLoadedFlags) && void 0 !== e2 && e2;
  }
  constructor() {
    i(this, "webPerformance", new ha()), i(this, "_personProcessingSetOncePropertiesSent", false), i(this, "version", m.LIB_VERSION), i(this, "_internalEventEmitter", new xo()), this.config = da(), this.SentryIntegration = Vr, this.sentryIntegration = (e2) => function(e3, t2) {
      var i2 = Gr(e3, t2);
      return { name: Wr, processEvent: (e4) => i2(e4) };
    }(this, e2), this.__request_queue = [], this.__loaded = false, this.analyticsDefaultEndpoint = "/e/", this._initialPageviewCaptured = false, this._initialPersonProfilesConfig = null, this._cachedPersonProperties = null, this.featureFlags = new Ts(this), this.toolbar = new Qr(this), this.scrollManager = new zo(this), this.pageViewManager = new ln(this), this.surveys = new Po(this), this.experiments = new oa(this), this.exceptions = new un(this), this.rateLimiter = new To(this), this.requestRouter = new na(this), this.consent = new Zt(this), this.people = { set: (e2, t2, i2) => {
      var r2 = M(e2) ? { [e2]: t2 } : e2;
      this.setPersonProperties(r2), null == i2 || i2({});
    }, set_once: (e2, t2, i2) => {
      var r2 = M(e2) ? { [e2]: t2 } : e2;
      this.setPersonProperties(void 0, r2), null == i2 || i2({});
    } }, this.on("eventCaptured", (e2) => U.info('send "'.concat(null == e2 ? void 0 : e2.event, '"'), e2));
  }
  init(e2, t2, i2) {
    if (i2 && i2 !== ua) {
      var r2, n2 = null !== (r2 = aa[i2]) && void 0 !== r2 ? r2 : new pa();
      return n2._init(e2, t2, i2), aa[i2] = n2, aa[ua][i2] = n2, n2;
    }
    return this._init(e2, t2, i2);
  }
  _init(e2) {
    var i2, r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a2 = arguments.length > 2 ? arguments[2] : void 0;
    if (O(e2) || A(e2))
      return U.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
    if (this.__loaded)
      return U.warn("You have already initialized PostHog! Re-initializing is a no-op"), this;
    this.__loaded = true, this.config = {}, this._triggered_notifs = [], o2.person_profiles && (this._initialPersonProfilesConfig = o2.person_profiles), this.set_config(J({}, da(), _a(o2), { name: a2, token: e2 })), this.config.on_xhr_error && U.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = o2.disable_compression ? void 0 : n.GZipJS, this.persistence = new $s(this.config), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new $s(t(t({}, this.config), {}, { persistence: "sessionStorage" }));
    var l2 = t({}, this.persistence.props), u2 = t({}, this.sessionPersistence.props);
    if (this._requestQueue = new Ho((e3) => this._send_retriable_request(e3), this.config.request_queue_config), this._retryQueue = new Uo(this), this.__request_queue = [], this.config.__preview_experimental_cookieless_mode || (this.sessionManager = new Jo(this), this.sessionPropsManager = new Go(this, this.sessionManager, this.persistence)), new en(this).startIfEnabledOrStop(), this.siteApps = new Xo(this), null === (i2 = this.siteApps) || void 0 === i2 || i2.init(), this.config.__preview_experimental_cookieless_mode || (this.sessionRecording = new jr(this), this.sessionRecording.startIfEnabledOrStop()), this.config.disable_scroll_properties || this.scrollManager.startMeasuringScrollPosition(), this.autocapture = new Tt(this), this.autocapture.startIfEnabled(), this.surveys.loadIfEnabled(), this.heatmaps = new an(this), this.heatmaps.startIfEnabled(), this.webVitalsAutocapture = new nn(this), this.exceptionObserver = new si(this), this.exceptionObserver.startIfEnabled(), this.deadClicksAutocapture = new ri(this, ii), this.deadClicksAutocapture.startIfEnabled(), m.DEBUG = m.DEBUG || this.config.debug, m.DEBUG && U.info("Starting in debug mode", { this: this, config: o2, thisC: t({}, this.config), p: l2, s: u2 }), this._sync_opt_out_with_persistence(), void 0 !== (null === (r2 = o2.bootstrap) || void 0 === r2 ? void 0 : r2.distinctID)) {
      var c2, d2, _2 = this.config.get_device_id(Dt()), h2 = null !== (c2 = o2.bootstrap) && void 0 !== c2 && c2.isIdentifiedID ? _2 : o2.bootstrap.distinctID;
      this.persistence.set_property(Me, null !== (d2 = o2.bootstrap) && void 0 !== d2 && d2.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: o2.bootstrap.distinctID, $device_id: h2 });
    }
    if (this._hasBootstrappedFeatureFlags()) {
      var p2, v2, g2 = Object.keys((null === (p2 = o2.bootstrap) || void 0 === p2 ? void 0 : p2.featureFlags) || {}).filter((e3) => {
        var t2, i3;
        return !(null === (t2 = o2.bootstrap) || void 0 === t2 || null === (i3 = t2.featureFlags) || void 0 === i3 || !i3[e3]);
      }).reduce((e3, t2) => {
        var i3, r3;
        return e3[t2] = (null === (i3 = o2.bootstrap) || void 0 === i3 || null === (r3 = i3.featureFlags) || void 0 === r3 ? void 0 : r3[t2]) || false, e3;
      }, {}), f2 = Object.keys((null === (v2 = o2.bootstrap) || void 0 === v2 ? void 0 : v2.featureFlagPayloads) || {}).filter((e3) => g2[e3]).reduce((e3, t2) => {
        var i3, r3, n2, s2;
        null !== (i3 = o2.bootstrap) && void 0 !== i3 && null !== (r3 = i3.featureFlagPayloads) && void 0 !== r3 && r3[t2] && (e3[t2] = null === (n2 = o2.bootstrap) || void 0 === n2 || null === (s2 = n2.featureFlagPayloads) || void 0 === s2 ? void 0 : s2[t2]);
        return e3;
      }, {});
      this.featureFlags.receivedFeatureFlags({ featureFlags: g2, featureFlagPayloads: f2 });
    }
    if (this.config.__preview_experimental_cookieless_mode)
      this.register_once({ distinct_id: je, $device_id: null }, "");
    else if (!this.get_distinct_id()) {
      var y2 = this.config.get_device_id(Dt());
      this.register_once({ distinct_id: y2, $device_id: y2 }, ""), this.persistence.set_property(Me, "anonymous");
    }
    return ne(s, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), { passive: false }), this.toolbar.maybeLoadToolbar(), o2.segment ? zr(this, () => this._loaded()) : this._loaded(), T(this.config._onCapture) && this.config._onCapture !== la && (U.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (e3) => this.config._onCapture(e3.event, e3))), this;
  }
  _onRemoteConfig(e2) {
    var t2, i2, r2, s2, o2, a2, l2, u2;
    if (!d || !d.body)
      return U.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(() => {
        this._onRemoteConfig(e2);
      }, 500);
    this.compression = void 0, e2.supportedCompression && !this.config.disable_compression && (this.compression = S(e2.supportedCompression, n.GZipJS) ? n.GZipJS : S(e2.supportedCompression, n.Base64) ? n.Base64 : void 0), null !== (t2 = e2.analytics) && void 0 !== t2 && t2.endpoint && (this.analyticsDefaultEndpoint = e2.analytics.endpoint), this.set_config({ person_profiles: this._initialPersonProfilesConfig ? this._initialPersonProfilesConfig : "identified_only" }), null === (i2 = this.siteApps) || void 0 === i2 || i2.onRemoteConfig(e2), null === (r2 = this.sessionRecording) || void 0 === r2 || r2.onRemoteConfig(e2), null === (s2 = this.autocapture) || void 0 === s2 || s2.onRemoteConfig(e2), null === (o2 = this.heatmaps) || void 0 === o2 || o2.onRemoteConfig(e2), this.surveys.onRemoteConfig(e2), null === (a2 = this.webVitalsAutocapture) || void 0 === a2 || a2.onRemoteConfig(e2), null === (l2 = this.exceptionObserver) || void 0 === l2 || l2.onRemoteConfig(e2), null === (u2 = this.deadClicksAutocapture) || void 0 === u2 || u2.onRemoteConfig(e2);
  }
  _loaded() {
    try {
      this.config.loaded(this);
    } catch (e2) {
      U.critical("`loaded` function failed", e2);
    }
    this._start_queue_if_opted_in(), this.config.capture_pageview && setTimeout(() => {
      this.consent.isOptedIn() && this._captureInitialPageview();
    }, 1), new $o(this).load(), this.featureFlags.decide();
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
    this.__loaded && (ca ? this.__request_queue.push(e2) : this.rateLimiter.isServerRateLimited(e2.batchKey) || (e2.transport = e2.transport || this.config.api_transport, e2.url = Lo(e2.url, { ip: this.config.ip ? 1 : 0 }), e2.headers = t({}, this.config.request_headers), e2.compression = "best-available" === e2.compression ? this.compression : e2.compression, e2.fetchOptions = e2.fetchOptions || this.config.fetch_options, ((e3) => {
      var i2, r2, n2, s2 = t({}, e3);
      s2.timeout = s2.timeout || 6e4, s2.url = Lo(s2.url, { _: new Date().getTime().toString(), ver: m.LIB_VERSION, compression: s2.compression });
      var o2 = null !== (i2 = s2.transport) && void 0 !== i2 ? i2 : "fetch", a2 = null !== (r2 = null === (n2 = re(No, (e4) => e4.transport === o2)) || void 0 === n2 ? void 0 : n2.method) && void 0 !== r2 ? r2 : No[0].method;
      if (!a2)
        throw new Error("No available transport method");
      a2(s2);
    })(t(t({}, e2), {}, { callback: (t2) => {
      var i2, r2, n2;
      (this.rateLimiter.checkForLimiting(t2), t2.statusCode >= 400) && (null === (r2 = (n2 = this.config).on_request_error) || void 0 === r2 || r2.call(n2, t2));
      null === (i2 = e2.callback) || void 0 === i2 || i2.call(e2, t2);
    } }))));
  }
  _send_retriable_request(e2) {
    this._retryQueue ? this._retryQueue.retriableRequest(e2) : this._send_request(e2);
  }
  _execute_array(e2) {
    var t2, i2 = [], r2 = [], n2 = [];
    G(e2, (e3) => {
      e3 && (t2 = e3[0], F(t2) ? n2.push(e3) : T(e3) ? e3.call(this) : F(e3) && "alias" === t2 ? i2.push(e3) : F(e3) && -1 !== t2.indexOf("capture") && T(this[t2]) ? n2.push(e3) : r2.push(e3));
    });
    var s2 = function(e3, t3) {
      G(e3, function(e4) {
        if (F(e4[0])) {
          var i3 = t3;
          V(e4, function(e5) {
            i3 = i3[e5[0]].apply(i3, e5.slice(1));
          });
        } else
          this[e4[0]].apply(this, e4.slice(1));
      }, t3);
    };
    s2(i2, this), s2(r2, this), s2(n2, this);
  }
  _hasBootstrappedFeatureFlags() {
    var e2, t2;
    return (null === (e2 = this.config.bootstrap) || void 0 === e2 ? void 0 : e2.featureFlags) && Object.keys(null === (t2 = this.config.bootstrap) || void 0 === t2 ? void 0 : t2.featureFlags).length > 0 || false;
  }
  push(e2) {
    this._execute_array([e2]);
  }
  capture(e2, i2, r2) {
    var n2;
    if (this.__loaded && this.persistence && this.sessionPersistence && this._requestQueue) {
      if (!this.consent.isOptedOut())
        if (!O(e2) && M(e2)) {
          if (this.config.opt_out_useragent_filter || !this._is_bot()) {
            var s2 = null != r2 && r2.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
            if (null == s2 || !s2.isRateLimited) {
              null != i2 && i2.$current_url && !M(null == i2 ? void 0 : i2.$current_url) && (U.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), null == i2 || delete i2.$current_url), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
              var o2 = new Date(), a2 = (null == r2 ? void 0 : r2.timestamp) || o2, l2 = Dt(), u2 = { uuid: l2, event: e2, properties: this._calculate_event_properties(e2, i2 || {}, a2, l2) };
              s2 && (u2.properties.$lib_rate_limit_remaining_tokens = s2.remainingTokens), (null == r2 ? void 0 : r2.$set) && (u2.$set = null == r2 ? void 0 : r2.$set);
              var c2 = this._calculate_set_once_properties(null == r2 ? void 0 : r2.$set_once);
              c2 && (u2.$set_once = c2), (u2 = ee(u2, null != r2 && r2._noTruncate ? null : this.config.properties_string_max_length)).timestamp = a2, O(null == r2 ? void 0 : r2.timestamp) || (u2.properties.$event_time_override_provided = true, u2.properties.$event_time_override_system_time = o2);
              var d2 = t(t({}, u2.properties.$set), u2.$set);
              if ($(d2) || this.setPersonPropertiesForFlags(d2), !D(this.config.before_send)) {
                var _2 = this._runBeforeSend(u2);
                if (!_2)
                  return;
                u2 = _2;
              }
              this._internalEventEmitter.emit("eventCaptured", u2);
              var h2 = { method: "POST", url: null !== (n2 = null == r2 ? void 0 : r2._url) && void 0 !== n2 ? n2 : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), data: u2, compression: "best-available", batchKey: null == r2 ? void 0 : r2._batchKey };
              return !this.config.request_batching || r2 && (null == r2 || !r2._batchKey) || null != r2 && r2.send_instantly ? this._send_retriable_request(h2) : this._requestQueue.enqueue(h2), u2;
            }
            U.critical("This capture call is ignored due to client rate limiting.");
          }
        } else
          U.error("No event name provided to posthog.capture");
    } else
      U.uninitializedWarning("posthog.capture");
  }
  _addCaptureHook(e2) {
    return this.on("eventCaptured", (t2) => e2(t2.event, t2));
  }
  _calculate_event_properties(e2, i2, r2, n2) {
    if (r2 = r2 || new Date(), !this.persistence || !this.sessionPersistence)
      return i2;
    var s2 = this.persistence.remove_event_timer(e2), o2 = t({}, i2);
    if (o2.token = this.config.token, this.config.__preview_experimental_cookieless_mode && (o2.$cookieless_mode = true), "$snapshot" === e2) {
      var a2 = t(t({}, this.persistence.properties()), this.sessionPersistence.properties());
      return o2.distinct_id = a2.distinct_id, (!M(o2.distinct_id) && !q(o2.distinct_id) || A(o2.distinct_id)) && U.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), o2;
    }
    var l2, u2 = bs(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties);
    if (this.sessionManager) {
      var { sessionId: c2, windowId: _2 } = this.sessionManager.checkAndGetSessionAndWindowId();
      o2.$session_id = c2, o2.$window_id = _2;
    }
    this.sessionPropsManager && J(o2, this.sessionPropsManager.getSessionProps());
    try {
      var h2;
      this.sessionRecording && J(o2, this.sessionRecording.sdkDebugProperties), o2.$sdk_debug_retry_queue_size = null === (h2 = this._retryQueue) || void 0 === h2 ? void 0 : h2.length;
    } catch (e3) {
      o2.$sdk_debug_error_capturing_properties = String(e3);
    }
    if (this.requestRouter.region === Qo.CUSTOM && (o2.$lib_custom_api_host = this.config.api_host), l2 = "$pageview" === e2 ? this.pageViewManager.doPageView(r2, n2) : "$pageleave" === e2 ? this.pageViewManager.doPageLeave(r2) : this.pageViewManager.doEvent(), o2 = J(o2, l2), "$pageview" === e2 && d && (o2.title = d.title), !O(s2)) {
      var p2 = r2.getTime() - s2;
      o2.$duration = parseFloat((p2 / 1e3).toFixed(3));
    }
    g && this.config.opt_out_useragent_filter && (o2.$browser_type = this._is_bot() ? "bot" : "browser"), (o2 = J({}, u2, this.persistence.properties(), this.sessionPersistence.properties(), o2)).$is_identified = this._isIdentified(), F(this.config.property_denylist) ? V(this.config.property_denylist, function(e3) {
      delete o2[e3];
    }) : U.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
    var v2 = this.config.sanitize_properties;
    v2 && (U.error("sanitize_properties is deprecated. Use before_send instead"), o2 = v2(o2, e2));
    var f2 = this._hasPersonProcessing();
    return o2.$process_person_profile = f2, f2 && this._requirePersonProcessing("_calculate_event_properties"), o2;
  }
  _calculate_set_once_properties(e2) {
    var t2;
    if (!this.persistence || !this._hasPersonProcessing())
      return e2;
    if (this._personProcessingSetOncePropertiesSent)
      return e2;
    var i2 = this.persistence.get_initial_props(), r2 = null === (t2 = this.sessionPropsManager) || void 0 === t2 ? void 0 : t2.getSetOnceProps(), n2 = J({}, i2, r2 || {}, e2 || {}), s2 = this.config.sanitize_properties;
    return s2 && (U.error("sanitize_properties is deprecated. Use before_send instead"), n2 = s2(n2, "$set_once")), this._personProcessingSetOncePropertiesSent = true, $(n2) ? void 0 : n2;
  }
  register(e2, t2) {
    var i2;
    null === (i2 = this.persistence) || void 0 === i2 || i2.register(e2, t2);
  }
  register_once(e2, t2, i2) {
    var r2;
    null === (r2 = this.persistence) || void 0 === r2 || r2.register_once(e2, t2, i2);
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
  onSurveysLoaded(e2) {
    return this.surveys.onSurveysLoaded(e2);
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
    return this.surveys.canRenderSurvey(e2);
  }
  canRenderSurveyAsync(e2) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return this.surveys.canRenderSurveyAsync(e2, t2);
  }
  identify(e2, i2, r2) {
    if (!this.__loaded || !this.persistence)
      return U.uninitializedWarning("posthog.identify");
    if (q(e2) && (e2 = e2.toString(), U.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), e2) {
      if (["distinct_id", "distinctid"].includes(e2.toLowerCase()))
        U.critical('The string "'.concat(e2, '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.'));
      else if (this._requirePersonProcessing("posthog.identify")) {
        var n2 = this.get_distinct_id();
        if (this.register({ $user_id: e2 }), !this.get_property("$device_id")) {
          var s2 = n2;
          this.register_once({ $had_persisted_distinct_id: true, $device_id: s2 }, "");
        }
        e2 !== n2 && e2 !== this.get_property(oe) && (this.unregister(oe), this.register({ distinct_id: e2 }));
        var o2 = "anonymous" === (this.persistence.get_property(Me) || "anonymous");
        e2 !== n2 && o2 ? (this.persistence.set_property(Me, "identified"), this.setPersonPropertiesForFlags(t(t({}, r2 || {}), i2 || {}), false), this.capture("$identify", { distinct_id: e2, $anon_distinct_id: n2 }, { $set: i2 || {}, $set_once: r2 || {} }), this._cachedPersonProperties = ia(e2, i2, r2), this.featureFlags.setAnonymousDistinctId(n2)) : (i2 || r2) && this.setPersonProperties(i2, r2), e2 !== n2 && (this.reloadFeatureFlags(), this.unregister(Oe));
      }
    } else
      U.error("Unique user id has not been set in posthog.identify");
  }
  setPersonProperties(e2, i2) {
    if ((e2 || i2) && this._requirePersonProcessing("posthog.setPersonProperties")) {
      var r2 = ia(this.get_distinct_id(), e2, i2);
      this._cachedPersonProperties !== r2 ? (this.setPersonPropertiesForFlags(t(t({}, i2 || {}), e2 || {})), this.capture("$set", { $set: e2 || {}, $set_once: i2 || {} }), this._cachedPersonProperties = r2) : U.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.");
    }
  }
  group(e2, i2, r2) {
    if (e2 && i2) {
      if (this._requirePersonProcessing("posthog.group")) {
        var n2 = this.getGroups();
        n2[e2] !== i2 && this.resetGroupPropertiesForFlags(e2), this.register({ $groups: t(t({}, n2), {}, { [e2]: i2 }) }), r2 && (this.capture("$groupidentify", { $group_type: e2, $group_key: i2, $group_set: r2 }), this.setGroupPropertiesForFlags({ [e2]: r2 })), n2[e2] === i2 || r2 || this.reloadFeatureFlags();
      }
    } else
      U.error("posthog.group requires a group type and group key");
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
    var t2, i2, r2, n2;
    if (U.info("reset"), !this.__loaded)
      return U.uninitializedWarning("posthog.reset");
    var s2 = this.get_property("$device_id");
    if (this.consent.reset(), null === (t2 = this.persistence) || void 0 === t2 || t2.clear(), null === (i2 = this.sessionPersistence) || void 0 === i2 || i2.clear(), this.surveys.reset(), null === (r2 = this.persistence) || void 0 === r2 || r2.set_property(Me, "anonymous"), null === (n2 = this.sessionManager) || void 0 === n2 || n2.resetSessionId(), this._cachedPersonProperties = null, this.config.__preview_experimental_cookieless_mode)
      this.register_once({ distinct_id: je, $device_id: null }, "");
    else {
      var o2 = this.config.get_device_id(Dt());
      this.register_once({ distinct_id: o2, $device_id: e2 ? o2 : s2 }, "");
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
    var { sessionId: t2, sessionStartTimestamp: i2 } = this.sessionManager.checkAndGetSessionAndWindowId(true), r2 = this.requestRouter.endpointFor("ui", "/project/".concat(this.config.token, "/replay/").concat(t2));
    if (null != e2 && e2.withTimestamp && i2) {
      var n2, s2 = null !== (n2 = e2.timestampLookBack) && void 0 !== n2 ? n2 : 10;
      if (!i2)
        return r2;
      var o2 = Math.max(Math.floor((new Date().getTime() - i2) / 1e3) - s2, 0);
      r2 += "?t=".concat(o2);
    }
    return r2;
  }
  alias(e2, t2) {
    return e2 === this.get_property(se) ? (U.critical("Attempting to create alias for existing People user - aborting."), -2) : this._requirePersonProcessing("posthog.alias") ? (O(t2) && (t2 = this.get_distinct_id()), e2 !== t2 ? (this._register_single(oe, e2), this.capture("$create_alias", { alias: e2, distinct_id: t2 })) : (U.warn("alias matches current distinct_id - skipping api call."), this.identify(e2), -1)) : void 0;
  }
  set_config(e2) {
    var i2, r2, n2, s2, o2 = t({}, this.config);
    R(e2) && (J(this.config, _a(e2)), null === (i2 = this.persistence) || void 0 === i2 || i2.update_config(this.config, o2), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new $s(t(t({}, this.config), {}, { persistence: "sessionStorage" })), Gt.is_supported() && "true" === Gt.get("ph_debug") && (this.config.debug = true), this.config.debug && (m.DEBUG = true, U.info("set_config", JSON.stringify({ config: e2, oldConfig: o2, newConfig: t({}, this.config) }, null, 2))), null === (r2 = this.sessionRecording) || void 0 === r2 || r2.startIfEnabledOrStop(), null === (n2 = this.autocapture) || void 0 === n2 || n2.startIfEnabled(), null === (s2 = this.heatmaps) || void 0 === s2 || s2.startIfEnabled(), this.surveys.loadIfEnabled(), this._sync_opt_out_with_persistence());
  }
  startSessionRecording(e2) {
    var t2 = true === e2, i2 = { sampling: t2 || !(null == e2 || !e2.sampling), linked_flag: t2 || !(null == e2 || !e2.linked_flag), url_trigger: t2 || !(null == e2 || !e2.url_trigger), event_trigger: t2 || !(null == e2 || !e2.event_trigger) };
    if (Object.values(i2).some(Boolean)) {
      var r2, n2, s2, o2, a2;
      if (null === (r2 = this.sessionManager) || void 0 === r2 || r2.checkAndGetSessionAndWindowId(), i2.sampling)
        null === (n2 = this.sessionRecording) || void 0 === n2 || n2.overrideSampling();
      if (i2.linked_flag)
        null === (s2 = this.sessionRecording) || void 0 === s2 || s2.overrideLinkedFlag();
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
    var r2 = new Error("PostHog syntheticException");
    this.exceptions.sendExceptionEvent(t(t({}, $i(((e3) => e3 instanceof Error)(e2) ? { error: e2, event: e2.message } : { event: e2 }, { syntheticException: r2 })), i2));
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
    var e2, t2 = null !== (e2 = this.config.name) && void 0 !== e2 ? e2 : ua;
    return t2 !== ua && (t2 = ua + "." + t2), t2;
  }
  _isIdentified() {
    var e2, t2;
    return "identified" === (null === (e2 = this.persistence) || void 0 === e2 ? void 0 : e2.get_property(Me)) || "identified" === (null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.get_property(Me));
  }
  _hasPersonProcessing() {
    var e2, t2, i2, r2;
    return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && $(this.getGroups()) && (null === (e2 = this.persistence) || void 0 === e2 || null === (t2 = e2.props) || void 0 === t2 || !t2[oe]) && (null === (i2 = this.persistence) || void 0 === i2 || null === (r2 = i2.props) || void 0 === r2 || !r2[Be]));
  }
  _shouldCapturePageleave() {
    return true === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && this.config.capture_pageview;
  }
  createPersonProfile() {
    this._hasPersonProcessing() || this._requirePersonProcessing("posthog.createPersonProfile") && this.setPersonProperties({}, {});
  }
  _requirePersonProcessing(e2) {
    return "never" === this.config.person_profiles ? (U.error(e2 + ' was called, but process_person is set to "never". This call will be ignored.'), false) : (this._register_single(Be, true), true);
  }
  _sync_opt_out_with_persistence() {
    var e2, t2, i2, r2, n2 = this.consent.isOptedOut(), s2 = this.config.opt_out_persistence_by_default, o2 = this.config.disable_persistence || n2 && !!s2;
    (null === (e2 = this.persistence) || void 0 === e2 ? void 0 : e2.disabled) !== o2 && (null === (i2 = this.persistence) || void 0 === i2 || i2.set_disabled(o2));
    (null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.disabled) !== o2 && (null === (r2 = this.sessionPersistence) || void 0 === r2 || r2.set_disabled(o2));
  }
  opt_in_capturing(e2) {
    var t2;
    (this.consent.optInOut(true), this._sync_opt_out_with_persistence(), O(null == e2 ? void 0 : e2.captureEventName) || null != e2 && e2.captureEventName) && this.capture(null !== (t2 = null == e2 ? void 0 : e2.captureEventName) && void 0 !== t2 ? t2 : "$opt_in", null == e2 ? void 0 : e2.captureProperties, { send_instantly: true });
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
    return c ? ta(c, this.config.custom_blocked_useragents) : void 0;
  }
  _captureInitialPageview() {
    d && !this._initialPageviewCaptured && (this._initialPageviewCaptured = true, this.capture("$pageview", { title: d.title }, { send_instantly: true }));
  }
  debug(e2) {
    false === e2 ? (null == s || s.console.log("You've disabled debug mode."), localStorage && localStorage.removeItem("ph_debug"), this.set_config({ debug: false })) : (null == s || s.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), localStorage && localStorage.setItem("ph_debug", "true"), this.set_config({ debug: true }));
  }
  _runBeforeSend(e2) {
    if (D(this.config.before_send))
      return e2;
    var t2 = F(this.config.before_send) ? this.config.before_send : [this.config.before_send], i2 = e2;
    for (var r2 of t2) {
      if (i2 = r2(i2), D(i2)) {
        var n2 = "Event '".concat(e2.event, "' was rejected in beforeSend function");
        return H(e2.event) ? U.warn("".concat(n2, ". This can cause unexpected behavior.")) : U.info(n2), null;
      }
      i2.properties && !$(i2.properties) || U.warn("Event '".concat(e2.event, "' has no properties after beforeSend function, this is likely an error."));
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
    e2.prototype[t2[i2]] = Q(e2.prototype[t2[i2]]);
}(pa, ["identify"]);
var va, ga = (va = aa[ua] = new pa(), function() {
  function e2() {
    e2.done || (e2.done = true, ca = false, V(aa, function(e3) {
      e3._dom_loaded();
    }));
  }
  null != d && d.addEventListener ? "complete" === d.readyState ? e2() : ne(d, "DOMContentLoaded", e2, { capture: false }) : s && U.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
}(), va);
export { y as COPY_AUTOCAPTURE_EVENT, n as Compression, pa as PostHog, js as SurveyPosition, Ws as SurveyQuestionBranchingType, zs as SurveyQuestionType, Gs as SurveySchedule, Us as SurveyType, Hs as SurveyWidgetType, ga as default, b as knownUnsafeEditableEvent, ga as posthog, w as severityLevels };
