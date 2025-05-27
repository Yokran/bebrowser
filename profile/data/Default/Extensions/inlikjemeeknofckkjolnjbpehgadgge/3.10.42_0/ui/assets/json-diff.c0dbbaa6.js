import { _ as __vitePreload } from "./service.04a32097.js";
import { b as generateTree, c as getChanges, d as ChangeType } from "./AppLocal.2fbeb786.js";
import "./index.21aef151.js";
import "./json-parser.f519fd70.js";
import "./Message.d6d97d2b.js";
import "./SchemaKeyTree.c700e647.js";
import "./Card.0607fce4.js";
const jsonDiff = function() {
  var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
  function t(e2) {
    if (e2.__esModule)
      return e2;
    var t2 = Object.defineProperty({}, "__esModule", { value: true });
    return Object.keys(e2).forEach(function(n2) {
      var r2 = Object.getOwnPropertyDescriptor(e2, n2);
      Object.defineProperty(t2, n2, r2.get ? r2 : { enumerable: true, get: function() {
        return e2[n2];
      } });
    }), t2;
  }
  function n(e2) {
    return { path: e2, exports: {}, require: function(t2, n2) {
      return h(t2, null == n2 ? e2 : n2);
    } };
  }
  function r(e2, t2) {
    o[e2] = t2;
  }
  var o = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null), f = { id: "<rollup>", exports: {}, parent: void 0, filename: null, loaded: false, children: [], paths: [] }, u = ["", ".js", ".json"];
  function a(e2) {
    for (var t2 = (e2 = e2.replace(/\\/g, "/")).split("/"), n2 = "" === t2[0], r2 = 1; r2 < t2.length; r2++)
      "." !== t2[r2] && "" !== t2[r2] || t2.splice(r2--, 1);
    for (r2 = 1; r2 < t2.length; r2++)
      ".." === t2[r2] && r2 > 0 && ".." !== t2[r2 - 1] && "." !== t2[r2 - 1] && (t2.splice(--r2, 2), r2--);
    return e2 = t2.join("/"), n2 && "/" !== e2[0] ? e2 = "/" + e2 : 0 === e2.length && (e2 = "."), e2;
  }
  function c() {
    if (0 === arguments.length)
      return ".";
    for (var e2, t2 = 0; t2 < arguments.length; ++t2) {
      var n2 = arguments[t2];
      n2.length > 0 && (void 0 === e2 ? e2 = n2 : e2 += "/" + n2);
    }
    return void 0 === e2 ? "." : e2;
  }
  function s(e2) {
    if (0 === e2.length)
      return ".";
    for (var t2 = e2.length - 1; t2 > 0; ) {
      var n2 = e2.charCodeAt(t2);
      if ((47 === n2 || 92 === n2) && t2 !== e2.length - 1)
        break;
      t2--;
    }
    return t2 > 0 ? e2.substr(0, t2) : 47 === e2.chartCodeAt(0) || 92 === e2.chartCodeAt(0) ? e2.charAt(0) : ".";
  }
  function p(e2, t2, n2) {
    var r2, f2 = function(e3) {
      var t3 = e3[0];
      if ("/" === t3 || "\\" === t3)
        return false;
      var n3 = e3[1], r3 = e3[2];
      return !(!("." !== t3 || n3 && "/" !== n3 && "\\" !== n3) || !("." !== t3 || "." !== n3 || r3 && "/" !== r3 && "\\" !== r3)) && (":" !== n3 || "/" !== r3 && "\\" !== r3);
    }(e2);
    for ("/" === (e2 = a(e2))[0] && (t2 = "/"); !(r2 = f2 ? a(t2 ? t2 + "/node_modules/" + e2 : c("node_modules", e2)) : t2 ? a(t2 + "/" + e2) : e2).endsWith("/.."); ) {
      for (var s2 = 0; s2 < u.length; s2++) {
        var p2 = r2 + u[s2];
        if (i[p2])
          return p2;
        if (l[p2])
          return p2;
        if (o[p2])
          return p2;
      }
      if (!f2)
        break;
      var h2 = a(t2 + "/..");
      if (h2 === t2)
        break;
      t2 = h2;
    }
    return null;
  }
  function h(t2, n2) {
    var r2 = p(t2, n2);
    if (null !== r2) {
      var u2 = i[r2];
      if (u2)
        return u2.exports;
      var a2 = l[r2];
      if (a2) {
        if (u2 = i[a2])
          return u2.exports;
        r2 = p(a2, null);
      }
      var c2 = o[r2];
      if (c2) {
        i[r2] = u2 = { id: r2, filename: r2, path: s(r2), exports: {}, parent: f, loaded: false, children: [], paths: [], require: function(e2, t3) {
          return h(e2, null == t3 ? u2.path : t3);
        } };
        try {
          c2.call(e, u2, u2.exports);
        } catch (e2) {
          throw delete i[r2], e2;
        }
        return u2.loaded = true, u2.exports;
      }
    }
    throw new Error('Could not dynamically require "' + t2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  h.cache = i, h.resolve = function(e2, t2) {
    var n2 = p(e2, t2);
    return null !== n2 ? n2 : require.resolve(e2);
  };
  var d = function() {
    if ("object" == typeof self && self)
      return self;
    if ("object" == typeof window && window)
      return window;
    throw new Error("Unable to resolve global `this`");
  }, y = function() {
    if (this)
      return this;
    try {
      Object.defineProperty(Object.prototype, "__global__", { get: function() {
        return this;
      }, configurable: true });
    } catch (e2) {
      return d();
    }
    try {
      return __global__ || d();
    } finally {
      delete Object.prototype.__global__;
    }
  }(), _ = "object" != typeof globalThis || !globalThis || globalThis.Array !== Array ? y : globalThis, g = _, v = { object: true, symbol: true }, b = n("/$$rollup_base$$/node_modules/d"), m = function(e2) {
    return null != e2;
  }, w = m, O = { object: true, function: true, undefined: true }, j = function(e2) {
    return !!w(e2) && hasOwnProperty.call(O, typeof e2);
  }, x = j, S = function(e2) {
    if (!x(e2))
      return false;
    try {
      return !!e2.constructor && e2.constructor.prototype === e2;
    } catch (e3) {
      return false;
    }
  }, k = function(e2) {
    if ("function" != typeof e2)
      return false;
    if (!hasOwnProperty.call(e2, "length"))
      return false;
    try {
      if ("number" != typeof e2.length)
        return false;
      if ("function" != typeof e2.call)
        return false;
      if ("function" != typeof e2.apply)
        return false;
    } catch (e3) {
      return false;
    }
    return !S(e2);
  }, $ = /^\s*class[\s{/}]/, P = Function.prototype.toString, T = function(e2) {
    return !!k(e2) && !$.test(P.call(e2));
  }, N = function(e2) {
    return null != e2;
  }, C = N, A = Object.keys, z = function() {
    try {
      return Object.keys("primitive"), true;
    } catch (e2) {
      return false;
    }
  }() ? Object.keys : function(e2) {
    return A(C(e2) ? Object(e2) : e2);
  }, E = N, M = function(e2) {
    if (!E(e2))
      throw new TypeError("Cannot use null or undefined");
    return e2;
  }, q = z, I = M, R = Math.max, D = function() {
    var e2, t2 = Object.assign;
    return "function" == typeof t2 && (t2(e2 = { foo: "raz" }, { bar: "dwa" }, { trzy: "trzy" }), e2.foo + e2.bar + e2.trzy === "razdwatrzy");
  }() ? Object.assign : function(e2, t2) {
    var n2, r2, o2, i2 = R(arguments.length, 2);
    for (e2 = Object(I(e2)), o2 = function(r3) {
      try {
        e2[r3] = t2[r3];
      } catch (e3) {
        n2 || (n2 = e3);
      }
    }, r2 = 1; r2 < i2; ++r2)
      q(t2 = arguments[r2]).forEach(o2);
    if (void 0 !== n2)
      throw n2;
    return e2;
  }, F = N, B = Array.prototype.forEach, L = Object.create, U = function(e2, t2) {
    var n2;
    for (n2 in e2)
      t2[n2] = e2[n2];
  }, K = function(e2) {
    var t2 = L(null);
    return B.call(arguments, function(e3) {
      F(e3) && U(Object(e3), t2);
    }), t2;
  }, J = "razdwatrzy", H = String.prototype.indexOf, Z = "function" == typeof J.contains && true === J.contains("dwa") && false === J.contains("foo") ? String.prototype.contains : function(e2) {
    return H.call(this, e2, arguments[1]) > -1;
  }, V = m, G = T, Q = D, W = K, X = Z, Y = b.exports = function(e2, t2) {
    var n2, r2, o2, i2, l2;
    return arguments.length < 2 || "string" != typeof e2 ? (i2 = t2, t2 = e2, e2 = null) : i2 = arguments[2], V(e2) ? (n2 = X.call(e2, "c"), r2 = X.call(e2, "e"), o2 = X.call(e2, "w")) : (n2 = o2 = true, r2 = false), l2 = { value: t2, configurable: n2, enumerable: r2, writable: o2 }, i2 ? Q(W(i2), l2) : l2;
  };
  Y.gs = function(e2, t2, n2) {
    var r2, o2, i2, l2;
    return "string" != typeof e2 ? (i2 = n2, n2 = t2, t2 = e2, e2 = null) : i2 = arguments[3], V(t2) ? G(t2) ? V(n2) ? G(n2) || (i2 = n2, n2 = void 0) : n2 = void 0 : (i2 = t2, t2 = n2 = void 0) : t2 = void 0, V(e2) ? (r2 = X.call(e2, "c"), o2 = X.call(e2, "e")) : (r2 = true, o2 = false), l2 = { get: t2, set: n2, configurable: r2, enumerable: o2 }, i2 ? Q(W(i2), l2) : l2;
  };
  var ee, te, ne, re = function(e2) {
    return !!e2 && ("symbol" == typeof e2 || !!e2.constructor && ("Symbol" === e2.constructor.name && "Symbol" === e2[e2.constructor.toStringTag]));
  }, oe = function(e2) {
    if (!re(e2))
      throw new TypeError(e2 + " is not a symbol");
    return e2;
  }, ie = b.exports, le = Object.create, fe = Object.defineProperty, ue = Object.prototype, ae = le(null), ce = b.exports, se = _.Symbol, pe = b.exports, he = oe, de = /* @__PURE__ */ Object.create(null), ye = b.exports, _e = oe, ge = _.Symbol, ve = function(e2) {
    for (var t2, n2, r2 = 0; ae[e2 + (r2 || "")]; )
      ++r2;
    return ae[e2 += r2 || ""] = true, fe(ue, t2 = "@@" + e2, ie.gs(null, function(e3) {
      n2 || (n2 = true, fe(this, t2, ie(e3)), n2 = false);
    })), t2;
  }, be = function(e2) {
    return Object.defineProperties(e2, { hasInstance: ce("", se && se.hasInstance || e2("hasInstance")), isConcatSpreadable: ce("", se && se.isConcatSpreadable || e2("isConcatSpreadable")), iterator: ce("", se && se.iterator || e2("iterator")), match: ce("", se && se.match || e2("match")), replace: ce("", se && se.replace || e2("replace")), search: ce("", se && se.search || e2("search")), species: ce("", se && se.species || e2("species")), split: ce("", se && se.split || e2("split")), toPrimitive: ce("", se && se.toPrimitive || e2("toPrimitive")), toStringTag: ce("", se && se.toStringTag || e2("toStringTag")), unscopables: ce("", se && se.unscopables || e2("unscopables")) });
  }, me = function(e2) {
    return Object.defineProperties(e2, { for: pe(function(t2) {
      return de[t2] ? de[t2] : de[t2] = e2(String(t2));
    }), keyFor: pe(function(e3) {
      var t2;
      for (t2 in he(e3), de)
        if (de[t2] === e3)
          return t2;
    }) });
  }, we = Object.create, Oe = Object.defineProperties, je = Object.defineProperty;
  if ("function" == typeof ge)
    try {
      String(ge()), ne = true;
    } catch (e2) {
    }
  else
    ge = null;
  te = function(e2) {
    if (this instanceof te)
      throw new TypeError("Symbol is not a constructor");
    return ee(e2);
  };
  var xe = ee = function e2(t2) {
    var n2;
    if (this instanceof e2)
      throw new TypeError("Symbol is not a constructor");
    return ne ? ge(t2) : (n2 = we(te.prototype), t2 = void 0 === t2 ? "" : String(t2), Oe(n2, { __description__: ye("", t2), __name__: ye("", ve(t2)) }));
  };
  be(ee), me(ee), Oe(te.prototype, { constructor: ye(ee), toString: ye("", function() {
    return this.__name__;
  }) }), Oe(ee.prototype, { toString: ye(function() {
    return "Symbol (" + _e(this).__description__ + ")";
  }), valueOf: ye(function() {
    return _e(this);
  }) }), je(ee.prototype, ee.toPrimitive, ye("", function() {
    var e2 = _e(this);
    return "symbol" == typeof e2 ? e2 : e2.toString();
  })), je(ee.prototype, ee.toStringTag, ye("c", "Symbol")), je(te.prototype, ee.toStringTag, ye("c", ee.prototype[ee.toStringTag])), je(te.prototype, ee.toPrimitive, ye("c", ee.prototype[ee.toPrimitive]));
  var Se, ke, $e, Pe, Te, Ne, Ce, Ae = function() {
    var e2, t2 = g.Symbol;
    if ("function" != typeof t2)
      return false;
    e2 = t2("test symbol");
    try {
      String(e2);
    } catch (e3) {
      return false;
    }
    return !!v[typeof t2.iterator] && (!!v[typeof t2.toPrimitive] && !!v[typeof t2.toStringTag]);
  }() ? _.Symbol : xe, ze = Object.prototype.toString, Ee = ze.call(function() {
    return arguments;
  }()), Me = function(e2) {
    return ze.call(e2) === Ee;
  }, qe = Object.prototype.toString, Ie = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/), Re = function(e2) {
    return "function" == typeof e2 && Ie(qe.call(e2));
  }, De = function() {
    var e2 = Math.sign;
    return "function" == typeof e2 && (1 === e2(10) && -1 === e2(-20));
  }() ? Math.sign : function(e2) {
    return e2 = Number(e2), isNaN(e2) || 0 === e2 ? e2 : e2 > 0 ? 1 : -1;
  }, Fe = De, Be = Math.abs, Le = Math.floor, Ue = function(e2) {
    return isNaN(e2) ? 0 : 0 !== (e2 = Number(e2)) && isFinite(e2) ? Fe(e2) * Le(Be(e2)) : e2;
  }, Ke = Ue, Je = Math.max, He = function(e2) {
    return Je(0, Ke(e2));
  }, Ze = function(e2) {
    if ("function" != typeof e2)
      throw new TypeError(e2 + " is not a function");
    return e2;
  }, Ve = Object.prototype.toString, Ge = Ve.call(""), Qe = function(e2) {
    return "string" == typeof e2 || e2 && "object" == typeof e2 && (e2 instanceof String || Ve.call(e2) === Ge) || false;
  }, We = Ae.iterator, Xe = Me, Ye = Re, et = He, tt = Ze, nt = M, rt = N, ot = Qe, it = Array.isArray, lt = Function.prototype.call, ft = { configurable: true, enumerable: true, writable: true, value: null }, ut = Object.defineProperty, at = function() {
    var e2, t2, n2 = Array.from;
    return "function" == typeof n2 && (t2 = n2(e2 = ["raz", "dwa"]), Boolean(t2 && t2 !== e2 && "dwa" === t2[1]));
  }() ? Array.from : function(e2) {
    var t2, n2, r2, o2, i2, l2, f2, u2, a2, c2, s2 = arguments[1], p2 = arguments[2];
    if (e2 = Object(nt(e2)), rt(s2) && tt(s2), this && this !== Array && Ye(this))
      t2 = this;
    else {
      if (!s2) {
        if (Xe(e2))
          return 1 !== (i2 = e2.length) ? Array.apply(null, e2) : ((o2 = new Array(1))[0] = e2[0], o2);
        if (it(e2)) {
          for (o2 = new Array(i2 = e2.length), n2 = 0; n2 < i2; ++n2)
            o2[n2] = e2[n2];
          return o2;
        }
      }
      o2 = [];
    }
    if (!it(e2)) {
      if (void 0 !== (a2 = e2[We])) {
        for (f2 = tt(a2).call(e2), t2 && (o2 = new t2()), u2 = f2.next(), n2 = 0; !u2.done; )
          c2 = s2 ? lt.call(s2, p2, u2.value, n2) : u2.value, t2 ? (ft.value = c2, ut(o2, n2, ft)) : o2[n2] = c2, u2 = f2.next(), ++n2;
        i2 = n2;
      } else if (ot(e2)) {
        for (i2 = e2.length, t2 && (o2 = new t2()), n2 = 0, r2 = 0; n2 < i2; ++n2)
          c2 = e2[n2], n2 + 1 < i2 && (l2 = c2.charCodeAt(0)) >= 55296 && l2 <= 56319 && (c2 += e2[++n2]), c2 = s2 ? lt.call(s2, p2, c2, r2) : c2, t2 ? (ft.value = c2, ut(o2, r2, ft)) : o2[r2] = c2, ++r2;
        i2 = r2;
      }
    }
    if (void 0 === i2)
      for (i2 = et(e2.length), t2 && (o2 = new t2(i2)), n2 = 0; n2 < i2; ++n2)
        c2 = s2 ? lt.call(s2, p2, e2[n2], n2) : e2[n2], t2 ? (ft.value = c2, ut(o2, n2, ft)) : o2[n2] = c2;
    return t2 && (ft.value = null, o2.length = i2), o2;
  }, ct = Ze, st = M, pt = Function.prototype.bind, ht = Function.prototype.call, dt = Object.keys, yt = Object.prototype.propertyIsEnumerable, _t = (Se = "forEach", function(e2, t2) {
    var n2, r2 = arguments[2], o2 = arguments[3];
    return e2 = Object(st(e2)), ct(t2), n2 = dt(e2), o2 && n2.sort("function" == typeof o2 ? pt.call(o2, e2) : void 0), "function" != typeof Se && (Se = n2[Se]), ht.call(Se, n2, function(n3, o3) {
      return yt.call(e2, n3) ? ht.call(t2, r2, e2[n3], n3, e2, o3) : ke;
    });
  }), gt = Ze, vt = _t, bt = Function.prototype.call, mt = function(e2, t2) {
    var n2 = {}, r2 = arguments[2];
    return gt(t2), vt(e2, function(e3, o2, i2, l2) {
      n2[o2] = bt.call(t2, r2, e3, o2, i2, l2);
    }), n2;
  }, wt = M, Ot = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, xt = Object.getOwnPropertyNames, St = Object.getOwnPropertySymbols, kt = function(e2, t2) {
    var n2, r2 = Object(wt(t2));
    if (e2 = Object(wt(e2)), xt(r2).forEach(function(r3) {
      try {
        Ot(e2, r3, jt(t2, r3));
      } catch (e3) {
        n2 = e3;
      }
    }), "function" == typeof St && St(r2).forEach(function(r3) {
      try {
        Ot(e2, r3, jt(t2, r3));
      } catch (e3) {
        n2 = e3;
      }
    }), void 0 !== n2)
      throw n2;
    return e2;
  }, $t = n("/$$rollup_base$$/node_modules/es5-ext/function"), Pt = He, Tt = function(e2, t2) {
    return t2;
  };
  try {
    Object.defineProperty(Tt, "length", { configurable: true, writable: false, enumerable: false, value: 1 });
  } catch (e2) {
  }
  1 === Tt.length ? ($e = { configurable: true, writable: false, enumerable: false }, Pe = Object.defineProperty, $t.exports = function(e2, t2) {
    return t2 = Pt(t2), e2.length === t2 ? e2 : ($e.value = t2, Pe(e2, "length", $e));
  }) : (Ne = kt, Ce = [], Te = function(e2) {
    var t2, n2 = 0;
    if (Ce[e2])
      return Ce[e2];
    for (t2 = []; e2--; )
      t2.push("a" + (++n2).toString(36));
    return new Function("fn", "return function (" + t2.join(", ") + ") { return fn.apply(this, arguments); };");
  }, $t.exports = function(e2, t2) {
    var n2;
    if (t2 = Pt(t2), e2.length === t2)
      return e2;
    n2 = Te(t2)(e2);
    try {
      Ne(n2, e2);
    } catch (e3) {
    }
    return n2;
  });
  var Nt = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
  function Ct() {
    throw new Error("setTimeout has not been defined");
  }
  function At() {
    throw new Error("clearTimeout has not been defined");
  }
  var zt = Ct, Et = At;
  function Mt(e2) {
    if (zt === setTimeout)
      return setTimeout(e2, 0);
    if ((zt === Ct || !zt) && setTimeout)
      return zt = setTimeout, setTimeout(e2, 0);
    try {
      return zt(e2, 0);
    } catch (t2) {
      try {
        return zt.call(null, e2, 0);
      } catch (t3) {
        return zt.call(this, e2, 0);
      }
    }
  }
  "function" == typeof Nt.setTimeout && (zt = setTimeout), "function" == typeof Nt.clearTimeout && (Et = clearTimeout);
  var qt, It = [], Rt = false, Dt = -1;
  function Ft() {
    Rt && qt && (Rt = false, qt.length ? It = qt.concat(It) : Dt = -1, It.length && Bt());
  }
  function Bt() {
    if (!Rt) {
      var e2 = Mt(Ft);
      Rt = true;
      for (var t2 = It.length; t2; ) {
        for (qt = It, It = []; ++Dt < t2; )
          qt && qt[Dt].run();
        Dt = -1, t2 = It.length;
      }
      qt = null, Rt = false, function(e3) {
        if (Et === clearTimeout)
          return clearTimeout(e3);
        if ((Et === At || !Et) && clearTimeout)
          return Et = clearTimeout, clearTimeout(e3);
        try {
          Et(e3);
        } catch (t3) {
          try {
            return Et.call(null, e3);
          } catch (t4) {
            return Et.call(this, e3);
          }
        }
      }(e2);
    }
  }
  function Lt(e2, t2) {
    this.fun = e2, this.array = t2;
  }
  Lt.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  function Ut() {
  }
  var Kt = Ut, Jt = Ut, Ht = Ut, Zt = Ut, Vt = Ut, Gt = Ut, Qt = Ut;
  var Wt = Nt.performance || {}, Xt = Wt.now || Wt.mozNow || Wt.msNow || Wt.oNow || Wt.webkitNow || function() {
    return new Date().getTime();
  };
  var Yt = new Date();
  var en = { nextTick: function(e2) {
    var t2 = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var n2 = 1; n2 < arguments.length; n2++)
        t2[n2 - 1] = arguments[n2];
    It.push(new Lt(e2, t2)), 1 !== It.length || Rt || Mt(Bt);
  }, title: "browser", browser: true, env: {}, argv: [], version: "", versions: {}, on: Kt, addListener: Jt, once: Ht, off: Zt, removeListener: Vt, removeAllListeners: Gt, emit: Qt, binding: function(e2) {
    throw new Error("process.binding is not supported");
  }, cwd: function() {
    return "/";
  }, chdir: function(e2) {
    throw new Error("process.chdir is not supported");
  }, umask: function() {
    return 0;
  }, hrtime: function(e2) {
    var t2 = 1e-3 * Xt.call(Wt), n2 = Math.floor(t2), r2 = Math.floor(t2 % 1 * 1e9);
    return e2 && (n2 -= e2[0], (r2 -= e2[1]) < 0 && (n2--, r2 += 1e9)), [n2, r2];
  }, platform: "browser", release: {}, config: {}, uptime: function() {
    return (new Date() - Yt) / 1e3;
  } }, tn = en, nn = function(e2) {
    if ("function" != typeof e2)
      throw new TypeError(e2 + " is not a function");
    return e2;
  }, rn = function(e2) {
    var t2, n2, r2 = document.createTextNode(""), o2 = 0;
    return new e2(function() {
      var e3;
      if (t2)
        n2 && (t2 = n2.concat(t2));
      else {
        if (!n2)
          return;
        t2 = n2;
      }
      if (n2 = t2, t2 = null, "function" == typeof n2)
        return e3 = n2, n2 = null, void e3();
      for (r2.data = o2 = ++o2 % 2; n2; )
        e3 = n2.shift(), n2.length || (n2 = null), e3();
    }).observe(r2, { characterData: true }), function(e3) {
      nn(e3), t2 ? "function" == typeof t2 ? t2 = [t2, e3] : t2.push(e3) : (t2 = e3, r2.data = o2 = ++o2 % 2);
    };
  }, on = function() {
    if ("object" == typeof tn && tn && "function" == typeof tn.nextTick)
      return tn.nextTick;
    if ("function" == typeof queueMicrotask)
      return function(e2) {
        queueMicrotask(nn(e2));
      };
    if ("object" == typeof document && document) {
      if ("function" == typeof MutationObserver)
        return rn(MutationObserver);
      if ("function" == typeof WebKitMutationObserver)
        return rn(WebKitMutationObserver);
    }
    return "function" == typeof setImmediate ? function(e2) {
      setImmediate(nn(e2));
    } : "function" == typeof setTimeout || "object" == typeof setTimeout ? function(e2) {
      setTimeout(nn(e2), 0);
    } : null;
  }(), ln = t(Object.freeze({ __proto__: null }));
  r("/$$rollup_base$$/node_modules/memoizee/ext/async.js", function(e2, t2) {
    var n2 = at, r2 = mt, o2 = kt, i2 = $t.exports, l2 = on, f2 = Array.prototype.slice, u2 = Function.prototype.apply, a2 = Object.create;
    ln.async = function(e3, t3) {
      var c2, s2, p2, h2 = a2(null), d2 = a2(null), y2 = t3.memoized, _2 = t3.original;
      t3.memoized = i2(function(e4) {
        var t4 = arguments, n3 = t4[t4.length - 1];
        return "function" == typeof n3 && (c2 = n3, t4 = f2.call(t4, 0, -1)), y2.apply(s2 = this, p2 = t4);
      }, y2);
      try {
        o2(t3.memoized, y2);
      } catch (e4) {
      }
      t3.on("get", function(e4) {
        var n3, r3, o3;
        if (c2) {
          if (h2[e4])
            return "function" == typeof h2[e4] ? h2[e4] = [h2[e4], c2] : h2[e4].push(c2), void (c2 = null);
          n3 = c2, r3 = s2, o3 = p2, c2 = s2 = p2 = null, l2(function() {
            var i3;
            hasOwnProperty.call(d2, e4) ? (i3 = d2[e4], t3.emit("getasync", e4, o3, r3), u2.call(n3, i3.context, i3.args)) : (c2 = n3, s2 = r3, p2 = o3, y2.apply(r3, o3));
          });
        }
      }), t3.original = function() {
        var e4, r3, o3, i3;
        return c2 ? (e4 = n2(arguments), r3 = function e5(r4) {
          var o4, f3, a3 = e5.id;
          if (null != a3) {
            if (delete e5.id, o4 = h2[a3], delete h2[a3], o4)
              return f3 = n2(arguments), t3.has(a3) && (r4 ? t3.delete(a3) : (d2[a3] = { context: this, args: f3 }, t3.emit("setasync", a3, "function" == typeof o4 ? 1 : o4.length))), "function" == typeof o4 ? i3 = u2.call(o4, this, f3) : o4.forEach(function(e6) {
                i3 = u2.call(e6, this, f3);
              }, this), i3;
          } else
            l2(u2.bind(e5, this, arguments));
        }, o3 = c2, c2 = s2 = p2 = null, e4.push(r3), i3 = u2.call(_2, this, e4), r3.cb = o3, c2 = r3, i3) : u2.call(_2, this, arguments);
      }, t3.on("set", function(e4) {
        c2 ? (h2[e4] ? "function" == typeof h2[e4] ? h2[e4] = [h2[e4], c2.cb] : h2[e4].push(c2.cb) : h2[e4] = c2.cb, delete c2.cb, c2.id = e4, c2 = null) : t3.delete(e4);
      }), t3.on("delete", function(e4) {
        var n3;
        hasOwnProperty.call(h2, e4) || d2[e4] && (n3 = d2[e4], delete d2[e4], t3.emit("deleteasync", e4, f2.call(n3.args, 1)));
      }), t3.on("clear", function() {
        var e4 = d2;
        d2 = a2(null), t3.emit("clearasync", r2(e4, function(e5) {
          return f2.call(e5.args, 1);
        }));
      });
    };
  });
  r("/$$rollup_base$$/node_modules/memoizee/ext/dispose.js", function(e2, t2) {
    var n2 = Ze, r2 = _t, o2 = ln, i2 = Function.prototype.apply;
    o2.dispose = function(e3, t3, l2) {
      var f2;
      if (n2(e3), l2.async && o2.async || l2.promise && o2.promise)
        return t3.on("deleteasync", f2 = function(t4, n3) {
          i2.call(e3, null, n3);
        }), void t3.on("clearasync", function(e4) {
          r2(e4, function(e5, t4) {
            f2(t4, e5);
          });
        });
      t3.on("delete", f2 = function(t4, n3) {
        e3(n3);
      }), t3.on("clear", function(e4) {
        r2(e4, function(e5, t4) {
          f2(t4, e5);
        });
      });
    };
  });
  var fn = n("/$$rollup_base$$/node_modules/is-promise");
  function un(e2) {
    return !!e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof e2.then;
  }
  fn.exports = un, fn.exports.default = un;
  var an = He, cn = function(e2) {
    if ((e2 = an(e2)) > 2147483647)
      throw new TypeError(e2 + " exceeds maximum possible timeout");
    return e2;
  };
  r("/$$rollup_base$$/node_modules/memoizee/ext/max-age.js", function(e2, t2) {
    var n2 = at, r2 = _t, o2 = on, i2 = fn.exports, l2 = cn, f2 = ln, u2 = Function.prototype, a2 = Math.max, c2 = Math.min, s2 = Object.create;
    f2.maxAge = function(e3, t3, p2) {
      var h2, d2, y2, _2;
      (e3 = l2(e3)) && (h2 = s2(null), d2 = p2.async && f2.async || p2.promise && f2.promise ? "async" : "", t3.on("set" + d2, function(n3) {
        h2[n3] = setTimeout(function() {
          t3.delete(n3);
        }, e3), "function" == typeof h2[n3].unref && h2[n3].unref(), _2 && (_2[n3] && "nextTick" !== _2[n3] && clearTimeout(_2[n3]), _2[n3] = setTimeout(function() {
          delete _2[n3];
        }, y2), "function" == typeof _2[n3].unref && _2[n3].unref());
      }), t3.on("delete" + d2, function(e4) {
        clearTimeout(h2[e4]), delete h2[e4], _2 && ("nextTick" !== _2[e4] && clearTimeout(_2[e4]), delete _2[e4]);
      }), p2.preFetch && (y2 = true === p2.preFetch || isNaN(p2.preFetch) ? 0.333 : a2(c2(Number(p2.preFetch), 1), 0)) && (_2 = {}, y2 = (1 - y2) * e3, t3.on("get" + d2, function(e4, r3, l3) {
        _2[e4] || (_2[e4] = "nextTick", o2(function() {
          var o3;
          "nextTick" === _2[e4] && (delete _2[e4], t3.delete(e4), p2.async && (r3 = n2(r3)).push(u2), o3 = t3.memoized.apply(l3, r3), p2.promise && i2(o3) && ("function" == typeof o3.done ? o3.done(u2, u2) : o3.then(u2, u2)));
        }));
      })), t3.on("clear" + d2, function() {
        r2(h2, function(e4) {
          clearTimeout(e4);
        }), h2 = {}, _2 && (r2(_2, function(e4) {
          "nextTick" !== e4 && clearTimeout(e4);
        }), _2 = {});
      }));
    };
  });
  var sn = He, pn = Object.create, hn = Object.prototype.hasOwnProperty, dn = function(e2) {
    var t2, n2 = 0, r2 = 1, o2 = pn(null), i2 = pn(null), l2 = 0;
    return e2 = sn(e2), { hit: function(f2) {
      var u2 = i2[f2], a2 = ++l2;
      if (o2[a2] = f2, i2[f2] = a2, !u2) {
        if (++n2 <= e2)
          return;
        return f2 = o2[r2], t2(f2), f2;
      }
      if (delete o2[u2], r2 === u2)
        for (; !hn.call(o2, ++r2); )
          continue;
    }, delete: t2 = function(e3) {
      var t3 = i2[e3];
      if (t3 && (delete o2[t3], delete i2[e3], --n2, r2 === t3)) {
        if (!n2)
          return l2 = 0, void (r2 = 1);
        for (; !hn.call(o2, ++r2); )
          continue;
      }
    }, clear: function() {
      n2 = 0, r2 = 1, o2 = pn(null), i2 = pn(null), l2 = 0;
    } };
  };
  r("/$$rollup_base$$/node_modules/memoizee/ext/max.js", function(e2, t2) {
    var n2 = He, r2 = dn, o2 = ln;
    o2.max = function(e3, t3, i2) {
      var l2, f2, u2;
      (e3 = n2(e3)) && (f2 = r2(e3), l2 = i2.async && o2.async || i2.promise && o2.promise ? "async" : "", t3.on("set" + l2, u2 = function(e4) {
        void 0 !== (e4 = f2.hit(e4)) && t3.delete(e4);
      }), t3.on("get" + l2, u2), t3.on("delete" + l2, f2.delete), t3.on("clear" + l2, f2.clear));
    };
  });
  var yn = Array.prototype.forEach, _n = Object.create, gn = function(e2) {
    var t2 = _n(null);
    return yn.call(arguments, function(e3) {
      t2[e3] = true;
    }), t2;
  }, vn = function(e2) {
    return "function" == typeof e2;
  }, bn = vn, mn = function(e2) {
    try {
      return e2 && bn(e2.toString) ? e2.toString() : String(e2);
    } catch (e3) {
      throw new TypeError("Passed argument cannot be stringifed");
    }
  }, wn = M, On = mn, jn = function(e2) {
    return On(wn(e2));
  }, xn = vn, Sn = function(e2) {
    try {
      return e2 && xn(e2.toString) ? e2.toString() : String(e2);
    } catch (e3) {
      return "<Non-coercible to string value>";
    }
  }, kn = /[\n\r\u2028\u2029]/g, $n = function(e2) {
    var t2 = Sn(e2);
    return t2.length > 100 && (t2 = t2.slice(0, 99) + "\u2026"), t2 = t2.replace(kn, function(e3) {
      return JSON.stringify(e3).slice(1, -1);
    });
  };
  r("/$$rollup_base$$/node_modules/memoizee/ext/promise.js", function(e2, t2) {
    var n2 = mt, r2 = gn, o2 = jn, i2 = $n, l2 = fn.exports, f2 = on, u2 = Object.create, a2 = r2("then", "then:finally", "done", "done:finally");
    ln.promise = function(e3, t3) {
      var r3 = u2(null), c2 = u2(null), s2 = u2(null);
      if (true === e3)
        e3 = null;
      else if (e3 = o2(e3), !a2[e3])
        throw new TypeError("'" + i2(e3) + "' is not valid promise mode");
      t3.on("set", function(n3, o3, i3) {
        var u3 = false;
        if (!l2(i3))
          return c2[n3] = i3, void t3.emit("setasync", n3, 1);
        r3[n3] = 1, s2[n3] = i3;
        var a3 = function(e4) {
          var o4 = r3[n3];
          if (u3)
            throw new Error("Memoizee error: Detected unordered then|done & finally resolution, which in turn makes proper detection of success/failure impossible (when in 'done:finally' mode)\nConsider to rely on 'then' or 'done' mode instead.");
          o4 && (delete r3[n3], c2[n3] = e4, t3.emit("setasync", n3, o4));
        }, p2 = function() {
          u3 = true, r3[n3] && (delete r3[n3], delete s2[n3], t3.delete(n3));
        }, h2 = e3;
        if (h2 || (h2 = "then"), "then" === h2) {
          var d2 = function() {
            f2(p2);
          };
          i3 = i3.then(function(e4) {
            f2(a3.bind(this, e4));
          }, d2), "function" == typeof i3.finally && i3.finally(d2);
        } else if ("done" === h2) {
          if ("function" != typeof i3.done)
            throw new Error("Memoizee error: Retrieved promise does not implement 'done' in 'done' mode");
          i3.done(a3, p2);
        } else if ("done:finally" === h2) {
          if ("function" != typeof i3.done)
            throw new Error("Memoizee error: Retrieved promise does not implement 'done' in 'done:finally' mode");
          if ("function" != typeof i3.finally)
            throw new Error("Memoizee error: Retrieved promise does not implement 'finally' in 'done:finally' mode");
          i3.done(a3), i3.finally(p2);
        }
      }), t3.on("get", function(e4, n3, o3) {
        var i3;
        if (r3[e4])
          ++r3[e4];
        else {
          i3 = s2[e4];
          var u3 = function() {
            t3.emit("getasync", e4, n3, o3);
          };
          l2(i3) ? "function" == typeof i3.done ? i3.done(u3) : i3.then(function() {
            f2(u3);
          }) : u3();
        }
      }), t3.on("delete", function(e4) {
        if (delete s2[e4], r3[e4])
          delete r3[e4];
        else if (hasOwnProperty.call(c2, e4)) {
          var n3 = c2[e4];
          delete c2[e4], t3.emit("deleteasync", e4, [n3]);
        }
      }), t3.on("clear", function() {
        var e4 = c2;
        c2 = u2(null), r3 = u2(null), s2 = u2(null), t3.emit("clearasync", n2(e4, function(e5) {
          return [e5];
        }));
      });
    };
  });
  r("/$$rollup_base$$/node_modules/memoizee/ext/ref-counter.js", function(e2, t2) {
    var n2 = b.exports, r2 = ln, o2 = Object.create, i2 = Object.defineProperties;
    r2.refCounter = function(e3, t3, l2) {
      var f2, u2;
      f2 = o2(null), u2 = l2.async && r2.async || l2.promise && r2.promise ? "async" : "", t3.on("set" + u2, function(e4, t4) {
        f2[e4] = t4 || 1;
      }), t3.on("get" + u2, function(e4) {
        ++f2[e4];
      }), t3.on("delete" + u2, function(e4) {
        delete f2[e4];
      }), t3.on("clear" + u2, function() {
        f2 = {};
      }), i2(t3.memoized, { deleteRef: n2(function() {
        var e4 = t3.get(arguments);
        return null === e4 ? null : f2[e4] ? !--f2[e4] && (t3.delete(e4), true) : null;
      }), getRefCount: n2(function() {
        var e4 = t3.get(arguments);
        return null === e4 ? 0 : f2[e4] ? f2[e4] : 0;
      }) });
    };
  });
  var Pn, Tn = {}, Nn = n("/$$rollup_base$$/node_modules/heap/lib");
  Pn = Nn, function() {
    var e2, t2, n2, r2, o2, i2, l2, f2, u2, a2, c2, s2, p2, h2, d2;
    n2 = Math.floor, a2 = Math.min, t2 = function(e3, t3) {
      return e3 < t3 ? -1 : e3 > t3 ? 1 : 0;
    }, u2 = function(e3, r3, o3, i3, l3) {
      var f3;
      if (null == o3 && (o3 = 0), null == l3 && (l3 = t2), o3 < 0)
        throw new Error("lo must be non-negative");
      for (null == i3 && (i3 = e3.length); o3 < i3; )
        l3(r3, e3[f3 = n2((o3 + i3) / 2)]) < 0 ? i3 = f3 : o3 = f3 + 1;
      return [].splice.apply(e3, [o3, o3 - o3].concat(r3)), r3;
    }, i2 = function(e3, n3, r3) {
      return null == r3 && (r3 = t2), e3.push(n3), h2(e3, 0, e3.length - 1, r3);
    }, o2 = function(e3, n3) {
      var r3, o3;
      return null == n3 && (n3 = t2), r3 = e3.pop(), e3.length ? (o3 = e3[0], e3[0] = r3, d2(e3, 0, n3)) : o3 = r3, o3;
    }, f2 = function(e3, n3, r3) {
      var o3;
      return null == r3 && (r3 = t2), o3 = e3[0], e3[0] = n3, d2(e3, 0, r3), o3;
    }, l2 = function(e3, n3, r3) {
      var o3;
      return null == r3 && (r3 = t2), e3.length && r3(e3[0], n3) < 0 && (n3 = (o3 = [e3[0], n3])[0], e3[0] = o3[1], d2(e3, 0, r3)), n3;
    }, r2 = function(e3, r3) {
      var o3, i3, l3, f3, u3, a3;
      for (null == r3 && (r3 = t2), u3 = [], i3 = 0, l3 = (f3 = function() {
        a3 = [];
        for (var t3 = 0, r4 = n2(e3.length / 2); 0 <= r4 ? t3 < r4 : t3 > r4; 0 <= r4 ? t3++ : t3--)
          a3.push(t3);
        return a3;
      }.apply(this).reverse()).length; i3 < l3; i3++)
        o3 = f3[i3], u3.push(d2(e3, o3, r3));
      return u3;
    }, p2 = function(e3, n3, r3) {
      var o3;
      if (null == r3 && (r3 = t2), -1 !== (o3 = e3.indexOf(n3)))
        return h2(e3, 0, o3, r3), d2(e3, o3, r3);
    }, c2 = function(e3, n3, o3) {
      var i3, f3, u3, a3, c3;
      if (null == o3 && (o3 = t2), !(f3 = e3.slice(0, n3)).length)
        return f3;
      for (r2(f3, o3), u3 = 0, a3 = (c3 = e3.slice(n3)).length; u3 < a3; u3++)
        i3 = c3[u3], l2(f3, i3, o3);
      return f3.sort(o3).reverse();
    }, s2 = function(e3, n3, i3) {
      var l3, f3, c3, s3, p3, h3, d3, y2, _2;
      if (null == i3 && (i3 = t2), 10 * n3 <= e3.length) {
        if (!(c3 = e3.slice(0, n3).sort(i3)).length)
          return c3;
        for (f3 = c3[c3.length - 1], s3 = 0, h3 = (d3 = e3.slice(n3)).length; s3 < h3; s3++)
          i3(l3 = d3[s3], f3) < 0 && (u2(c3, l3, 0, null, i3), c3.pop(), f3 = c3[c3.length - 1]);
        return c3;
      }
      for (r2(e3, i3), _2 = [], p3 = 0, y2 = a2(n3, e3.length); 0 <= y2 ? p3 < y2 : p3 > y2; 0 <= y2 ? ++p3 : --p3)
        _2.push(o2(e3, i3));
      return _2;
    }, h2 = function(e3, n3, r3, o3) {
      var i3, l3, f3;
      for (null == o3 && (o3 = t2), i3 = e3[r3]; r3 > n3 && o3(i3, l3 = e3[f3 = r3 - 1 >> 1]) < 0; )
        e3[r3] = l3, r3 = f3;
      return e3[r3] = i3;
    }, d2 = function(e3, n3, r3) {
      var o3, i3, l3, f3, u3;
      for (null == r3 && (r3 = t2), i3 = e3.length, u3 = n3, l3 = e3[n3], o3 = 2 * n3 + 1; o3 < i3; )
        (f3 = o3 + 1) < i3 && !(r3(e3[o3], e3[f3]) < 0) && (o3 = f3), e3[n3] = e3[o3], o3 = 2 * (n3 = o3) + 1;
      return e3[n3] = l3, h2(e3, u3, n3, r3);
    }, e2 = function() {
      function e3(e4) {
        this.cmp = null != e4 ? e4 : t2, this.nodes = [];
      }
      return e3.push = i2, e3.pop = o2, e3.replace = f2, e3.pushpop = l2, e3.heapify = r2, e3.updateItem = p2, e3.nlargest = c2, e3.nsmallest = s2, e3.prototype.push = function(e4) {
        return i2(this.nodes, e4, this.cmp);
      }, e3.prototype.pop = function() {
        return o2(this.nodes, this.cmp);
      }, e3.prototype.peek = function() {
        return this.nodes[0];
      }, e3.prototype.contains = function(e4) {
        return -1 !== this.nodes.indexOf(e4);
      }, e3.prototype.replace = function(e4) {
        return f2(this.nodes, e4, this.cmp);
      }, e3.prototype.pushpop = function(e4) {
        return l2(this.nodes, e4, this.cmp);
      }, e3.prototype.heapify = function() {
        return r2(this.nodes, this.cmp);
      }, e3.prototype.updateItem = function(e4) {
        return p2(this.nodes, e4, this.cmp);
      }, e3.prototype.clear = function() {
        return this.nodes = [];
      }, e3.prototype.empty = function() {
        return 0 === this.nodes.length;
      }, e3.prototype.size = function() {
        return this.nodes.length;
      }, e3.prototype.clone = function() {
        var t3;
        return (t3 = new e3()).nodes = this.nodes.slice(0), t3;
      }, e3.prototype.toArray = function() {
        return this.nodes.slice(0);
      }, e3.prototype.insert = e3.prototype.push, e3.prototype.top = e3.prototype.peek, e3.prototype.front = e3.prototype.peek, e3.prototype.has = e3.prototype.contains, e3.prototype.copy = e3.prototype.clone, e3;
    }(), Pn.exports = e2;
  }.call(e);
  var Cn = Nn.exports;
  (function() {
    var e2, t2, n2, r2, o2, i2, l2, f2, u2, a2, c2, s2, p2, h2, d2, y2, _2, g2, v2, b2, m2 = [].indexOf || function(e3) {
      for (var t3 = 0, n3 = this.length; t3 < n3; t3++)
        if (t3 in this && this[t3] === e3)
          return t3;
      return -1;
    };
    l2 = Math.floor, u2 = Math.max, a2 = Math.min, t2 = Cn, y2 = function(e3, t3) {
      return t3 ? 2 * e3 / t3 : 1;
    }, d2 = function(e3, t3) {
      var n3, r3, o3, i3, l3, f3;
      for (l3 = [e3.length, t3.length], n3 = i3 = 0, f3 = a2(r3 = l3[0], o3 = l3[1]); 0 <= f3 ? i3 < f3 : i3 > f3; n3 = 0 <= f3 ? ++i3 : --i3) {
        if (e3[n3] < t3[n3])
          return -1;
        if (e3[n3] > t3[n3])
          return 1;
      }
      return r3 - o3;
    }, b2 = function(e3, t3) {
      return Object.prototype.hasOwnProperty.call(e3, t3);
    }, h2 = function(e3) {
      var t3, n3;
      for (t3 = 0, n3 = e3.length; t3 < n3; t3++)
        if (e3[t3])
          return true;
      return false;
    }, o2 = function() {
      function e3(e4, t3, n3, r3) {
        this.isjunk = e4, null == t3 && (t3 = ""), null == n3 && (n3 = ""), this.autojunk = null == r3 || r3, this.a = this.b = null, this.setSeqs(t3, n3);
      }
      return e3.prototype.setSeqs = function(e4, t3) {
        return this.setSeq1(e4), this.setSeq2(t3);
      }, e3.prototype.setSeq1 = function(e4) {
        if (e4 !== this.a)
          return this.a = e4, this.matchingBlocks = this.opcodes = null;
      }, e3.prototype.setSeq2 = function(e4) {
        if (e4 !== this.b)
          return this.b = e4, this.matchingBlocks = this.opcodes = null, this.fullbcount = null, this._chainB();
      }, e3.prototype._chainB = function() {
        var e4, t3, n3, r3, o3, i3, f3, u3, a3, c3, s3, p3, h3, d3;
        for (e4 = this.b, this.b2j = t3 = {}, r3 = c3 = 0, p3 = e4.length; c3 < p3; r3 = ++c3)
          n3 = e4[r3], (b2(t3, n3) ? t3[n3] : t3[n3] = []).push(r3);
        if (i3 = {}, o3 = this.isjunk)
          for (s3 = 0, h3 = (d3 = Object.keys(t3)).length; s3 < h3; s3++)
            o3(n3 = d3[s3]) && (i3[n3] = true, delete t3[n3]);
        if (a3 = {}, f3 = e4.length, this.autojunk && f3 >= 200)
          for (n3 in u3 = l2(f3 / 100) + 1, t3)
            t3[n3].length > u3 && (a3[n3] = true, delete t3[n3]);
        return this.isbjunk = function(e5) {
          return b2(i3, e5);
        }, this.isbpopular = function(e5) {
          return b2(a3, e5);
        };
      }, e3.prototype.findLongestMatch = function(e4, t3, n3, r3) {
        var o3, i3, l3, f3, u3, a3, c3, s3, p3, h3, d3, y3, _3, g3, v3, m3, w2, O2, j2, x2, S2;
        for (o3 = (m3 = [this.a, this.b, this.b2j, this.isbjunk])[0], i3 = m3[1], l3 = m3[2], s3 = m3[3], f3 = (w2 = [e4, n3, 0])[0], u3 = w2[1], a3 = w2[2], h3 = {}, c3 = _3 = e4; e4 <= t3 ? _3 < t3 : _3 > t3; c3 = e4 <= t3 ? ++_3 : --_3) {
          for (y3 = {}, g3 = 0, v3 = (O2 = b2(l3, o3[c3]) ? l3[o3[c3]] : []).length; g3 < v3; g3++)
            if (!((p3 = O2[g3]) < n3)) {
              if (p3 >= r3)
                break;
              (d3 = y3[p3] = (h3[p3 - 1] || 0) + 1) > a3 && (f3 = (j2 = [c3 - d3 + 1, p3 - d3 + 1, d3])[0], u3 = j2[1], a3 = j2[2]);
            }
          h3 = y3;
        }
        for (; f3 > e4 && u3 > n3 && !s3(i3[u3 - 1]) && o3[f3 - 1] === i3[u3 - 1]; )
          f3 = (x2 = [f3 - 1, u3 - 1, a3 + 1])[0], u3 = x2[1], a3 = x2[2];
        for (; f3 + a3 < t3 && u3 + a3 < r3 && !s3(i3[u3 + a3]) && o3[f3 + a3] === i3[u3 + a3]; )
          a3++;
        for (; f3 > e4 && u3 > n3 && s3(i3[u3 - 1]) && o3[f3 - 1] === i3[u3 - 1]; )
          f3 = (S2 = [f3 - 1, u3 - 1, a3 + 1])[0], u3 = S2[1], a3 = S2[2];
        for (; f3 + a3 < t3 && u3 + a3 < r3 && s3(i3[u3 + a3]) && o3[f3 + a3] === i3[u3 + a3]; )
          a3++;
        return [f3, u3, a3];
      }, e3.prototype.getMatchingBlocks = function() {
        var e4, t3, n3, r3, o3, i3, l3, f3, u3, a3, c3, s3, p3, h3, y3, _3, g3, v3, b3, m3, w2, O2, j2, x2, S2, k2;
        if (this.matchingBlocks)
          return this.matchingBlocks;
        for (v3 = [[0, h3 = (O2 = [this.a.length, this.b.length])[0], 0, y3 = O2[1]]], _3 = []; v3.length; )
          t3 = (j2 = v3.pop())[0], e4 = j2[1], r3 = j2[2], n3 = j2[3], o3 = (x2 = b3 = this.findLongestMatch(t3, e4, r3, n3))[0], f3 = x2[1], (c3 = x2[2]) && (_3.push(b3), t3 < o3 && r3 < f3 && v3.push([t3, o3, r3, f3]), o3 + c3 < e4 && f3 + c3 < n3 && v3.push([o3 + c3, e4, f3 + c3, n3]));
        for (_3.sort(d2), i3 = u3 = s3 = 0, g3 = [], m3 = 0, w2 = _3.length; m3 < w2; m3++)
          l3 = (S2 = _3[m3])[0], a3 = S2[1], p3 = S2[2], i3 + s3 === l3 && u3 + s3 === a3 ? s3 += p3 : (s3 && g3.push([i3, u3, s3]), i3 = (k2 = [l3, a3, p3])[0], u3 = k2[1], s3 = k2[2]);
        return s3 && g3.push([i3, u3, s3]), g3.push([h3, y3, 0]), this.matchingBlocks = g3;
      }, e3.prototype.getOpcodes = function() {
        var e4, t3, n3, r3, o3, i3, l3, f3, u3, a3, c3, s3;
        if (this.opcodes)
          return this.opcodes;
        for (r3 = o3 = 0, this.opcodes = t3 = [], f3 = 0, u3 = (a3 = this.getMatchingBlocks()).length; f3 < u3; f3++)
          e4 = (c3 = a3[f3])[0], n3 = c3[1], i3 = c3[2], l3 = "", r3 < e4 && o3 < n3 ? l3 = "replace" : r3 < e4 ? l3 = "delete" : o3 < n3 && (l3 = "insert"), l3 && t3.push([l3, r3, e4, o3, n3]), r3 = (s3 = [e4 + i3, n3 + i3])[0], o3 = s3[1], i3 && t3.push(["equal", e4, r3, n3, o3]);
        return t3;
      }, e3.prototype.getGroupedOpcodes = function(e4) {
        var t3, n3, r3, o3, i3, l3, f3, c3, s3, p3, h3, d3, y3, _3, g3;
        for (null == e4 && (e4 = 3), (t3 = this.getOpcodes()).length || (t3 = [["equal", 0, 1, 0, 1]]), "equal" === t3[0][0] && (s3 = (d3 = t3[0])[0], o3 = d3[1], i3 = d3[2], l3 = d3[3], f3 = d3[4], t3[0] = [s3, u2(o3, i3 - e4), i3, u2(l3, f3 - e4), f3]), "equal" === t3[t3.length - 1][0] && (s3 = (y3 = t3[t3.length - 1])[0], o3 = y3[1], i3 = y3[2], l3 = y3[3], f3 = y3[4], t3[t3.length - 1] = [s3, o3, a2(i3, o3 + e4), l3, a2(f3, l3 + e4)]), c3 = e4 + e4, r3 = [], n3 = [], p3 = 0, h3 = t3.length; p3 < h3; p3++)
          s3 = (_3 = t3[p3])[0], o3 = _3[1], i3 = _3[2], l3 = _3[3], f3 = _3[4], "equal" === s3 && i3 - o3 > c3 && (n3.push([s3, o3, a2(i3, o3 + e4), l3, a2(f3, l3 + e4)]), r3.push(n3), n3 = [], o3 = (g3 = [u2(o3, i3 - e4), u2(l3, f3 - e4)])[0], l3 = g3[1]), n3.push([s3, o3, i3, l3, f3]);
        return !n3.length || 1 === n3.length && "equal" === n3[0][0] || r3.push(n3), r3;
      }, e3.prototype.ratio = function() {
        var e4, t3, n3, r3;
        for (e4 = 0, t3 = 0, n3 = (r3 = this.getMatchingBlocks()).length; t3 < n3; t3++)
          e4 += r3[t3][2];
        return y2(e4, this.a.length + this.b.length);
      }, e3.prototype.quickRatio = function() {
        var e4, t3, n3, r3, o3, i3, l3, f3, u3, a3, c3;
        if (!this.fullbcount)
          for (this.fullbcount = n3 = {}, i3 = 0, f3 = (a3 = this.b).length; i3 < f3; i3++)
            n3[t3 = a3[i3]] = (n3[t3] || 0) + 1;
        for (n3 = this.fullbcount, e4 = {}, r3 = 0, l3 = 0, u3 = (c3 = this.a).length; l3 < u3; l3++)
          t3 = c3[l3], o3 = b2(e4, t3) ? e4[t3] : n3[t3] || 0, e4[t3] = o3 - 1, o3 > 0 && r3++;
        return y2(r3, this.a.length + this.b.length);
      }, e3.prototype.realQuickRatio = function() {
        var e4, t3, n3;
        return n3 = [this.a.length, this.b.length], y2(a2(e4 = n3[0], t3 = n3[1]), e4 + t3);
      }, e3;
    }(), f2 = function(e3, n3, r3, i3) {
      var l3, f3, u3, a3, c3, s3, p3, h3;
      if (null == r3 && (r3 = 3), null == i3 && (i3 = 0.6), !(r3 > 0))
        throw new Error("n must be > 0: (" + r3 + ")");
      if (!(0 <= i3 && i3 <= 1))
        throw new Error("cutoff must be in [0.0, 1.0]: (" + i3 + ")");
      for (l3 = [], (f3 = new o2()).setSeq2(e3), a3 = 0, s3 = n3.length; a3 < s3; a3++)
        u3 = n3[a3], f3.setSeq1(u3), f3.realQuickRatio() >= i3 && f3.quickRatio() >= i3 && f3.ratio() >= i3 && l3.push([f3.ratio(), u3]);
      for (h3 = [], c3 = 0, p3 = (l3 = t2.nlargest(l3, r3, d2)).length; c3 < p3; c3++)
        u3 = l3[c3][1], h3.push(u3);
      return h3;
    }, _2 = function(e3, t3) {
      var n3, r3, o3;
      for (n3 = (o3 = [0, e3.length])[0], r3 = o3[1]; n3 < r3 && e3[n3] === t3; )
        n3++;
      return n3;
    }, e2 = function() {
      function e3(e4, t3) {
        this.linejunk = e4, this.charjunk = t3;
      }
      return e3.prototype.compare = function(e4, t3) {
        var n3, r3, i3, l3, f3, u3, a3, c3, s3, p3, h3, d3, y3, _3;
        for (a3 = [], s3 = 0, h3 = (y3 = new o2(this.linejunk, e4, t3).getOpcodes()).length; s3 < h3; s3++) {
          switch (c3 = (_3 = y3[s3])[0], r3 = _3[1], n3 = _3[2], l3 = _3[3], i3 = _3[4], c3) {
            case "replace":
              f3 = this._fancyReplace(e4, r3, n3, t3, l3, i3);
              break;
            case "delete":
              f3 = this._dump("-", e4, r3, n3);
              break;
            case "insert":
              f3 = this._dump("+", t3, l3, i3);
              break;
            case "equal":
              f3 = this._dump(" ", e4, r3, n3);
              break;
            default:
              throw new Error("unknow tag (" + c3 + ")");
          }
          for (p3 = 0, d3 = f3.length; p3 < d3; p3++)
            u3 = f3[p3], a3.push(u3);
        }
        return a3;
      }, e3.prototype._dump = function(e4, t3, n3, r3) {
        var o3, i3, l3;
        for (l3 = [], o3 = i3 = n3; n3 <= r3 ? i3 < r3 : i3 > r3; o3 = n3 <= r3 ? ++i3 : --i3)
          l3.push(e4 + " " + t3[o3]);
        return l3;
      }, e3.prototype._plainReplace = function(e4, t3, n3, r3, o3, i3) {
        var l3, f3, u3, a3, c3, s3, p3, h3, d3, y3;
        for (i3 - o3 < n3 - t3 ? (l3 = this._dump("+", r3, o3, i3), c3 = this._dump("-", e4, t3, n3)) : (l3 = this._dump("-", e4, t3, n3), c3 = this._dump("+", r3, o3, i3)), a3 = [], s3 = 0, h3 = (y3 = [l3, c3]).length; s3 < h3; s3++)
          for (p3 = 0, d3 = (f3 = y3[s3]).length; p3 < d3; p3++)
            u3 = f3[p3], a3.push(u3);
        return a3;
      }, e3.prototype._fancyReplace = function(e4, t3, n3, r3, i3, l3) {
        var f3, u3, a3, c3, s3, p3, h3, d3, y3, _3, g3, v3, b3, m3, w2, O2, j2, x2, S2, k2, $2, P2, T2, N2, C2, A2, z2, E2, M2, q2, I2, R2, D2, F2, B2, L2, U2, K2, J2, H2, Z2, V2, G2, Q2, W2, X2, Y2, ee2;
        for (h3 = (L2 = [0.74, 0.75])[0], m3 = L2[1], b3 = new o2(this.charjunk), w2 = (U2 = [null, null])[0], O2 = U2[1], P2 = [], x2 = N2 = i3; i3 <= l3 ? N2 < l3 : N2 > l3; x2 = i3 <= l3 ? ++N2 : --N2)
          for (_3 = r3[x2], b3.setSeq2(_3), j2 = C2 = t3; t3 <= n3 ? C2 < n3 : C2 > n3; j2 = t3 <= n3 ? ++C2 : --C2)
            (u3 = e4[j2]) !== _3 ? (b3.setSeq1(u3), b3.realQuickRatio() > h3 && b3.quickRatio() > h3 && b3.ratio() > h3 && (h3 = (V2 = [b3.ratio(), j2, x2])[0], d3 = V2[1], y3 = V2[2])) : null === w2 && (w2 = (Z2 = [j2, x2])[0], O2 = Z2[1]);
        if (h3 < m3) {
          if (null === w2) {
            for (A2 = 0, E2 = (G2 = this._plainReplace(e4, t3, n3, r3, i3, l3)).length; A2 < E2; A2++)
              $2 = G2[A2], P2.push($2);
            return P2;
          }
          d3 = (Q2 = [w2, O2, 1])[0], y3 = Q2[1], h3 = Q2[2];
        } else
          w2 = null;
        for (z2 = 0, M2 = (W2 = this._fancyHelper(e4, t3, d3, r3, i3, y3)).length; z2 < M2; z2++)
          $2 = W2[z2], P2.push($2);
        if (f3 = (X2 = [e4[d3], r3[y3]])[0], p3 = X2[1], null === w2) {
          for (s3 = v3 = "", b3.setSeqs(f3, p3), D2 = 0, q2 = (Y2 = b3.getOpcodes()).length; D2 < q2; D2++)
            switch (T2 = (ee2 = Y2[D2])[0], a3 = ee2[1], c3 = ee2[2], g3 = ee2[3], S2 = (K2 = [c3 - a3, ee2[4] - g3])[0], k2 = K2[1], T2) {
              case "replace":
                s3 += Array(S2 + 1).join("^"), v3 += Array(k2 + 1).join("^");
                break;
              case "delete":
                s3 += Array(S2 + 1).join("-");
                break;
              case "insert":
                v3 += Array(k2 + 1).join("+");
                break;
              case "equal":
                s3 += Array(S2 + 1).join(" "), v3 += Array(k2 + 1).join(" ");
                break;
              default:
                throw new Error("unknow tag (" + T2 + ")");
            }
          for (F2 = 0, I2 = (J2 = this._qformat(f3, p3, s3, v3)).length; F2 < I2; F2++)
            $2 = J2[F2], P2.push($2);
        } else
          P2.push("  " + f3);
        for (B2 = 0, R2 = (H2 = this._fancyHelper(e4, d3 + 1, n3, r3, y3 + 1, l3)).length; B2 < R2; B2++)
          $2 = H2[B2], P2.push($2);
        return P2;
      }, e3.prototype._fancyHelper = function(e4, t3, n3, r3, o3, i3) {
        var l3;
        return l3 = [], t3 < n3 ? l3 = o3 < i3 ? this._fancyReplace(e4, t3, n3, r3, o3, i3) : this._dump("-", e4, t3, n3) : o3 < i3 && (l3 = this._dump("+", r3, o3, i3)), l3;
      }, e3.prototype._qformat = function(e4, t3, n3, r3) {
        var o3, i3;
        return i3 = [], o3 = a2(_2(e4, "	"), _2(t3, "	")), o3 = a2(o3, _2(n3.slice(0, o3), " ")), o3 = a2(o3, _2(r3.slice(0, o3), " ")), n3 = n3.slice(o3).replace(/\s+$/, ""), r3 = r3.slice(o3).replace(/\s+$/, ""), i3.push("- " + e4), n3.length && i3.push("? " + Array(o3 + 1).join("	") + n3 + "\n"), i3.push("+ " + t3), r3.length && i3.push("? " + Array(o3 + 1).join("	") + r3 + "\n"), i3;
      }, e3;
    }(), r2 = function(e3, t3) {
      return null == t3 && (t3 = /^\s*#?\s*$/), t3.test(e3);
    }, n2 = function(e3, t3) {
      return null == t3 && (t3 = " 	"), m2.call(t3, e3) >= 0;
    }, v2 = function(e3, t3) {
      var n3, r3;
      return n3 = e3 + 1, 1 === (r3 = t3 - e3) ? "" + n3 : (r3 || n3--, n3 + "," + r3);
    }, p2 = function(e3, t3, n3) {
      var r3, i3, l3, f3, u3, a3, c3, s3, p3, h3, d3, y3, _3, g3, b3, m3, w2, O2, j2, x2, S2, k2, $2, P2, T2, N2, C2, A2, z2, E2, M2, q2, I2, R2, D2, F2, B2;
      for (null == (u3 = (M2 = null != n3 ? n3 : {}).fromfile) && (u3 = ""), null == (j2 = M2.tofile) && (j2 = ""), null == (a3 = M2.fromfiledate) && (a3 = ""), null == (x2 = M2.tofiledate) && (x2 = ""), null == (b3 = M2.lineterm) && (b3 = "\n"), g3 = [], m3 = false, S2 = 0, T2 = (q2 = new o2(null, e3, t3).getGroupedOpcodes()).length; S2 < T2; S2++)
        for (c3 = q2[S2], m3 || (m3 = true, f3 = a3 ? "	" + a3 : "", O2 = x2 ? "	" + x2 : "", g3.push("--- " + u3 + f3 + b3), g3.push("+++ " + j2 + O2 + b3)), y3 = (I2 = [c3[0], c3[c3.length - 1]])[1], r3 = v2((l3 = I2[0])[1], y3[2]), i3 = v2(l3[3], y3[4]), g3.push("@@ -" + r3 + " +" + i3 + " @@" + b3), k2 = 0, N2 = c3.length; k2 < N2; k2++)
          if (w2 = (R2 = c3[k2])[0], s3 = R2[1], p3 = R2[2], h3 = R2[3], d3 = R2[4], "equal" !== w2) {
            if ("replace" === w2 || "delete" === w2)
              for (P2 = 0, A2 = (F2 = e3.slice(s3, p3)).length; P2 < A2; P2++)
                _3 = F2[P2], g3.push("-" + _3);
            if ("replace" === w2 || "insert" === w2)
              for (E2 = 0, z2 = (B2 = t3.slice(h3, d3)).length; E2 < z2; E2++)
                _3 = B2[E2], g3.push("+" + _3);
          } else
            for ($2 = 0, C2 = (D2 = e3.slice(s3, p3)).length; $2 < C2; $2++)
              _3 = D2[$2], g3.push(" " + _3);
      return g3;
    }, g2 = function(e3, t3) {
      var n3, r3;
      return n3 = e3 + 1, (r3 = t3 - e3) || n3--, r3 <= 1 ? "" + n3 : n3 + "," + (n3 + r3 - 1);
    }, i2 = function(e3, t3, n3) {
      var r3, i3, l3, f3, u3, a3, c3, s3, p3, d3, y3, _3, v3, b3, m3, w2, O2, j2, x2, S2, k2, $2, P2, T2, N2, C2, A2, z2, E2, M2, q2, I2, R2, D2, F2, B2, L2, U2;
      for (null == (u3 = (I2 = null != n3 ? n3 : {}).fromfile) && (u3 = ""), null == (S2 = I2.tofile) && (S2 = ""), null == (a3 = I2.fromfiledate) && (a3 = ""), null == (k2 = I2.tofiledate) && (k2 = ""), null == (m3 = I2.lineterm) && (m3 = "\n"), w2 = { insert: "+ ", delete: "- ", replace: "! ", equal: "  " }, O2 = false, b3 = [], $2 = 0, C2 = (R2 = new o2(null, e3, t3).getGroupedOpcodes()).length; $2 < C2; $2++)
        if (c3 = R2[$2], !O2) {
          if (O2 = true, f3 = a3 ? "	" + a3 : "", x2 = k2 ? "	" + k2 : "", b3.push("*** " + u3 + f3 + m3), b3.push("--- " + S2 + x2 + m3), l3 = (D2 = [c3[0], c3[c3.length - 1]])[0], _3 = D2[1], b3.push("***************" + m3), r3 = g2(l3[1], _3[2]), b3.push("*** " + r3 + " ****" + m3), h2(function() {
            var e4, t4, n4, r4;
            for (r4 = [], e4 = 0, t4 = c3.length; e4 < t4; e4++)
              n4 = c3[e4], j2 = n4[0], r4.push("replace" === j2 || "delete" === j2);
            return r4;
          }())) {
            for (P2 = 0, A2 = c3.length; P2 < A2; P2++)
              if (F2 = c3[P2], j2 = F2[0], s3 = F2[1], p3 = F2[2], "insert" !== j2)
                for (T2 = 0, z2 = (B2 = e3.slice(s3, p3)).length; T2 < z2; T2++)
                  v3 = B2[T2], b3.push(w2[j2] + v3);
          }
          if (i3 = g2(l3[3], _3[4]), b3.push("--- " + i3 + " ----" + m3), h2(function() {
            var e4, t4, n4, r4;
            for (r4 = [], e4 = 0, t4 = c3.length; e4 < t4; e4++)
              n4 = c3[e4], j2 = n4[0], r4.push("replace" === j2 || "insert" === j2);
            return r4;
          }())) {
            for (N2 = 0, E2 = c3.length; N2 < E2; N2++)
              if (L2 = c3[N2], j2 = L2[0], d3 = L2[3], y3 = L2[4], "delete" !== j2)
                for (q2 = 0, M2 = (U2 = t3.slice(d3, y3)).length; q2 < M2; q2++)
                  v3 = U2[q2], b3.push(w2[j2] + v3);
          }
        }
      return b3;
    }, c2 = function(t3, r3, o3, i3) {
      return null == i3 && (i3 = n2), new e2(o3, i3).compare(t3, r3);
    }, s2 = function(e3, t3) {
      var n3, r3, o3, i3, l3, f3, u3;
      if (!(i3 = { 1: "- ", 2: "+ " }[t3]))
        throw new Error("unknow delta choice (must be 1 or 2): " + t3);
      for (o3 = ["  ", i3], r3 = [], l3 = 0, f3 = e3.length; l3 < f3; l3++)
        u3 = (n3 = e3[l3]).slice(0, 2), m2.call(o3, u3) >= 0 && r3.push(n3.slice(2));
      return r3;
    }, Tn._arrayCmp = d2, Tn.SequenceMatcher = o2, Tn.getCloseMatches = f2, Tn._countLeading = _2, Tn.Differ = e2, Tn.IS_LINE_JUNK = r2, Tn.IS_CHARACTER_JUNK = n2, Tn._formatRangeUnified = v2, Tn.unifiedDiff = p2, Tn._formatRangeContext = g2, Tn.contextDiff = i2, Tn.ndiff = c2, Tn.restore = s2;
  }).call(e);
  var An = Tn;
  const zn = function(e2, t2) {
    const n2 = typeof e2;
    if ("array" === n2)
      return e2.map((e3) => zn(e3, t2));
    if ("object" === n2) {
      for (const n3 in e2)
        e2[n3] = zn(e2[n3], t2);
      return e2;
    }
    return "number" === n2 && Number.isFinite(e2) && !Number.isInteger(e2) ? +e2.toFixed(t2) : e2;
  };
  var En, Mn = { extendedTypeOf: function(e2) {
    const t2 = typeof e2;
    return null == e2 ? "null" : "object" === t2 && e2.constructor === Array ? "array" : t2;
  }, roundObj: zn }, qn = Object.create, In = Object.getPrototypeOf, Rn = {}, Dn = function() {
    var e2 = Object.setPrototypeOf, t2 = arguments[0] || qn;
    return "function" == typeof e2 && In(e2(t2(null), Rn)) === Rn;
  }, Fn = N, Bn = { function: true, object: true }, Ln = function(e2) {
    return Fn(e2) && Bn[typeof e2] || false;
  };
  Dn() || (En = Xn), function() {
    var e2, t2, n2;
    En && (1 !== En.level || (e2 = {}, t2 = {}, n2 = { configurable: false, enumerable: false, writable: true, value: void 0 }, Object.getOwnPropertyNames(Object.prototype).forEach(function(e3) {
      t2[e3] = "__proto__" !== e3 ? n2 : { configurable: true, enumerable: false, writable: true, value: void 0 };
    }), Object.defineProperties(e2, t2), Object.defineProperty(En, "nullPolyfill", { configurable: false, enumerable: false, writable: false, value: e2 })));
  }();
  var Un, Kn = Ln, Jn = M, Hn = Object.prototype.isPrototypeOf, Zn = Object.defineProperty, Vn = { configurable: true, enumerable: false, writable: true, value: void 0 };
  Un = function(e2, t2) {
    if (Jn(e2), null === t2 || Kn(t2))
      return e2;
    throw new TypeError("Prototype must be null or an object");
  };
  var Gn, Qn, Wn, Xn = (Gn = function() {
    var e2, t2 = /* @__PURE__ */ Object.create(null), n2 = {}, r2 = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
    if (r2) {
      try {
        (e2 = r2.set).call(t2, n2);
      } catch (e3) {
      }
      if (Object.getPrototypeOf(t2) === n2)
        return { set: e2, level: 2 };
    }
    return t2.__proto__ = n2, Object.getPrototypeOf(t2) === n2 ? { level: 2 } : ((t2 = {}).__proto__ = n2, Object.getPrototypeOf(t2) === n2 && { level: 1 });
  }(), Gn ? (2 === Gn.level ? Gn.set ? (Wn = Gn.set, Qn = function(e2, t2) {
    return Wn.call(Un(e2, t2), t2), e2;
  }) : Qn = function(e2, t2) {
    return Un(e2, t2).__proto__ = t2, e2;
  } : Qn = function e2(t2, n2) {
    var r2;
    return Un(t2, n2), (r2 = Hn.call(e2.nullPolyfill, t2)) && delete e2.nullPolyfill.__proto__, null === n2 && (n2 = e2.nullPolyfill), t2.__proto__ = n2, r2 && Zn(e2.nullPolyfill, "__proto__", Vn), t2;
  }, Object.defineProperty(Qn, "level", { configurable: false, enumerable: false, writable: false, value: Gn.level })) : null), Yn = Dn() ? Object.setPrototypeOf : Xn, er = He, tr = function(e2, t2, n2) {
    var r2;
    return isNaN(e2) ? (r2 = t2) >= 0 ? n2 && r2 ? r2 - 1 : r2 : 1 : false !== e2 && er(e2);
  }, nr = n("/$$rollup_base$$/node_modules/es5-ext/error");
  !function(e2) {
    var t2 = D, n2 = Ln, r2 = N, o2 = Error.captureStackTrace;
    e2.exports = function(i2) {
      var l2 = new Error(i2), f2 = arguments[1], u2 = arguments[2];
      return r2(u2) || n2(f2) && (u2 = f2, f2 = null), r2(u2) && t2(l2, u2), r2(f2) && (l2.code = f2), o2 && o2(l2, e2.exports), l2;
    };
  }(nr);
  var rr = n("/$$rollup_base$$/node_modules/event-emitter");
  !function(e2, t2) {
    var n2, r2, o2, i2, l2, f2, u2, a2 = b.exports, c2 = Ze, s2 = Function.prototype.apply, p2 = Function.prototype.call, h2 = Object.create, d2 = Object.defineProperty, y2 = Object.defineProperties, _2 = Object.prototype.hasOwnProperty, g2 = { configurable: true, enumerable: false, writable: true };
    r2 = function(e3, t3) {
      var r3, i3;
      return c2(t3), i3 = this, n2.call(this, e3, r3 = function() {
        o2.call(i3, e3, r3), s2.call(t3, this, arguments);
      }), r3.__eeOnceListener__ = t3, this;
    }, o2 = function(e3, t3) {
      var n3, r3, o3, i3;
      if (c2(t3), !_2.call(this, "__ee__"))
        return this;
      if (!(n3 = this.__ee__)[e3])
        return this;
      if ("object" == typeof (r3 = n3[e3]))
        for (i3 = 0; o3 = r3[i3]; ++i3)
          o3 !== t3 && o3.__eeOnceListener__ !== t3 || (2 === r3.length ? n3[e3] = r3[i3 ? 0 : 1] : r3.splice(i3, 1));
      else
        r3 !== t3 && r3.__eeOnceListener__ !== t3 || delete n3[e3];
      return this;
    }, i2 = function(e3) {
      var t3, n3, r3, o3, i3;
      if (_2.call(this, "__ee__") && (o3 = this.__ee__[e3]))
        if ("object" == typeof o3) {
          for (n3 = arguments.length, i3 = new Array(n3 - 1), t3 = 1; t3 < n3; ++t3)
            i3[t3 - 1] = arguments[t3];
          for (o3 = o3.slice(), t3 = 0; r3 = o3[t3]; ++t3)
            s2.call(r3, this, i3);
        } else
          switch (arguments.length) {
            case 1:
              p2.call(o3, this);
              break;
            case 2:
              p2.call(o3, this, arguments[1]);
              break;
            case 3:
              p2.call(o3, this, arguments[1], arguments[2]);
              break;
            default:
              for (n3 = arguments.length, i3 = new Array(n3 - 1), t3 = 1; t3 < n3; ++t3)
                i3[t3 - 1] = arguments[t3];
              s2.call(o3, this, i3);
          }
    }, l2 = { on: n2 = function(e3, t3) {
      var n3;
      return c2(t3), _2.call(this, "__ee__") ? n3 = this.__ee__ : (n3 = g2.value = h2(null), d2(this, "__ee__", g2), g2.value = null), n3[e3] ? "object" == typeof n3[e3] ? n3[e3].push(t3) : n3[e3] = [n3[e3], t3] : n3[e3] = t3, this;
    }, once: r2, off: o2, emit: i2 }, f2 = { on: a2(n2), once: a2(r2), off: a2(o2), emit: a2(i2) }, u2 = y2({}, f2), e2.exports = t2 = function(e3) {
      return null == e3 ? h2(u2) : y2(Object(e3), f2);
    }, t2.methods = l2;
  }(rr, rr.exports);
  var or, ir = at, lr = Array.isArray, fr = function(e2) {
    return lr(e2) ? e2 : ir(e2);
  }, ur = N, ar = Ze, cr = Array.prototype.slice;
  or = function(e2) {
    return this.map(function(t2, n2) {
      return t2 ? t2(e2[n2]) : e2[n2];
    }).concat(cr.call(e2, this.length));
  };
  var sr, pr = Ze, hr = nr.exports, dr = $t.exports, yr = b.exports, _r = rr.exports.methods, gr = function(e2) {
    return (e2 = fr(e2)).forEach(function(e3) {
      ur(e3) && ar(e3);
    }), or.bind(e2);
  }, vr = function(e2) {
    var t2;
    return "function" == typeof e2 ? { set: e2, get: e2 } : (t2 = { get: pr(e2.get) }, void 0 !== e2.set ? (t2.set = pr(e2.set), e2.delete && (t2.delete = pr(e2.delete)), e2.clear && (t2.clear = pr(e2.clear)), t2) : (t2.set = t2.get, t2));
  }, br = Function.prototype.apply, mr = Function.prototype.call, wr = Object.create, Or = Object.defineProperties, jr = _r.on, xr = _r.emit, Sr = Ze, kr = _t, $r = ln, Pr = function(e2, t2, n2) {
    var r2, o2, i2, l2, f2, u2, a2, c2, s2, p2, h2, d2, y2, _2, g2, v2 = wr(null);
    return o2 = false !== t2 ? t2 : isNaN(e2.length) ? 1 : e2.length, n2.normalizer && (p2 = vr(n2.normalizer), i2 = p2.get, l2 = p2.set, f2 = p2.delete, u2 = p2.clear), null != n2.resolvers && (g2 = gr(n2.resolvers)), _2 = i2 ? dr(function(t3) {
      var n3, o3, f3 = arguments;
      if (g2 && (f3 = g2(f3)), null !== (n3 = i2(f3)) && hasOwnProperty.call(v2, n3))
        return h2 && r2.emit("get", n3, f3, this), v2[n3];
      if (o3 = 1 === f3.length ? mr.call(e2, this, f3[0]) : br.call(e2, this, f3), null === n3) {
        if (null !== (n3 = i2(f3)))
          throw hr("Circular invocation", "CIRCULAR_INVOCATION");
        n3 = l2(f3);
      } else if (hasOwnProperty.call(v2, n3))
        throw hr("Circular invocation", "CIRCULAR_INVOCATION");
      return v2[n3] = o3, d2 && r2.emit("set", n3, null, o3), o3;
    }, o2) : 0 === t2 ? function() {
      var t3;
      if (hasOwnProperty.call(v2, "data"))
        return h2 && r2.emit("get", "data", arguments, this), v2.data;
      if (t3 = arguments.length ? br.call(e2, this, arguments) : mr.call(e2, this), hasOwnProperty.call(v2, "data"))
        throw hr("Circular invocation", "CIRCULAR_INVOCATION");
      return v2.data = t3, d2 && r2.emit("set", "data", null, t3), t3;
    } : function(t3) {
      var n3, o3, i3 = arguments;
      if (g2 && (i3 = g2(arguments)), o3 = String(i3[0]), hasOwnProperty.call(v2, o3))
        return h2 && r2.emit("get", o3, i3, this), v2[o3];
      if (n3 = 1 === i3.length ? mr.call(e2, this, i3[0]) : br.call(e2, this, i3), hasOwnProperty.call(v2, o3))
        throw hr("Circular invocation", "CIRCULAR_INVOCATION");
      return v2[o3] = n3, d2 && r2.emit("set", o3, null, n3), n3;
    }, r2 = { original: e2, memoized: _2, profileName: n2.profileName, get: function(e3) {
      return g2 && (e3 = g2(e3)), i2 ? i2(e3) : String(e3[0]);
    }, has: function(e3) {
      return hasOwnProperty.call(v2, e3);
    }, delete: function(e3) {
      var t3;
      hasOwnProperty.call(v2, e3) && (f2 && f2(e3), t3 = v2[e3], delete v2[e3], y2 && r2.emit("delete", e3, t3));
    }, clear: function() {
      var e3 = v2;
      u2 && u2(), v2 = wr(null), r2.emit("clear", e3);
    }, on: function(e3, t3) {
      return "get" === e3 ? h2 = true : "set" === e3 ? d2 = true : "delete" === e3 && (y2 = true), jr.call(this, e3, t3);
    }, emit: xr, updateEnv: function() {
      e2 = r2.original;
    } }, a2 = i2 ? dr(function(e3) {
      var t3, n3 = arguments;
      g2 && (n3 = g2(n3)), null !== (t3 = i2(n3)) && r2.delete(t3);
    }, o2) : 0 === t2 ? function() {
      return r2.delete("data");
    } : function(e3) {
      return g2 && (e3 = g2(arguments)[0]), r2.delete(e3);
    }, c2 = dr(function() {
      var e3, n3 = arguments;
      return 0 === t2 ? v2.data : (g2 && (n3 = g2(n3)), e3 = i2 ? i2(n3) : String(n3[0]), v2[e3]);
    }), s2 = dr(function() {
      var e3, n3 = arguments;
      return 0 === t2 ? r2.has("data") : (g2 && (n3 = g2(n3)), null !== (e3 = i2 ? i2(n3) : String(n3[0])) && r2.has(e3));
    }), Or(_2, { __memoized__: yr(true), delete: yr(a2), clear: yr(r2.clear), _get: yr(c2), _has: yr(s2) }), r2;
  }, Tr = tr, Nr = function(e2) {
    var t2, n2, r2 = e2.length;
    if (!r2)
      return "";
    for (t2 = String(e2[n2 = 0]); --r2; )
      t2 += "" + e2[++n2];
    return t2;
  }, Cr = function(e2) {
    return e2 ? function(t2) {
      for (var n2 = String(t2[0]), r2 = 0, o2 = e2; --o2; )
        n2 += "" + t2[++r2];
      return n2;
    } : function() {
      return "";
    };
  }, Ar = function() {
    var e2 = Number.isNaN;
    return "function" == typeof e2 && (!e2({}) && e2(NaN) && !e2(34));
  }() ? Number.isNaN : function(e2) {
    return e2 != e2;
  }, zr = Ar, Er = He, Mr = M, qr = Array.prototype.indexOf, Ir = Object.prototype.hasOwnProperty, Rr = Math.abs, Dr = Math.floor, Fr = function(e2) {
    var t2, n2, r2, o2;
    if (!zr(e2))
      return qr.apply(this, arguments);
    for (n2 = Er(Mr(this).length), r2 = arguments[1], t2 = r2 = isNaN(r2) ? 0 : r2 >= 0 ? Dr(r2) : Er(this.length) - Dr(Rr(r2)); t2 < n2; ++t2)
      if (Ir.call(this, t2) && (o2 = this[t2], zr(o2)))
        return t2;
    return -1;
  }, Br = Fr, Lr = Object.create, Ur = function() {
    var e2 = 0, t2 = [], n2 = Lr(null);
    return { get: function(e3) {
      var n3, r2 = 0, o2 = t2, i2 = e3.length;
      if (0 === i2)
        return o2[i2] || null;
      if (o2 = o2[i2]) {
        for (; r2 < i2 - 1; ) {
          if (-1 === (n3 = Br.call(o2[0], e3[r2])))
            return null;
          o2 = o2[1][n3], ++r2;
        }
        return -1 === (n3 = Br.call(o2[0], e3[r2])) ? null : o2[1][n3] || null;
      }
      return null;
    }, set: function(r2) {
      var o2, i2 = 0, l2 = t2, f2 = r2.length;
      if (0 === f2)
        l2[f2] = ++e2;
      else {
        for (l2[f2] || (l2[f2] = [[], []]), l2 = l2[f2]; i2 < f2 - 1; )
          -1 === (o2 = Br.call(l2[0], r2[i2])) && (o2 = l2[0].push(r2[i2]) - 1, l2[1].push([[], []])), l2 = l2[1][o2], ++i2;
        -1 === (o2 = Br.call(l2[0], r2[i2])) && (o2 = l2[0].push(r2[i2]) - 1), l2[1][o2] = ++e2;
      }
      return n2[e2] = r2, e2;
    }, delete: function(e3) {
      var r2, o2 = 0, i2 = t2, l2 = n2[e3], f2 = l2.length, u2 = [];
      if (0 === f2)
        delete i2[f2];
      else if (i2 = i2[f2]) {
        for (; o2 < f2 - 1; ) {
          if (-1 === (r2 = Br.call(i2[0], l2[o2])))
            return;
          u2.push(i2, r2), i2 = i2[1][r2], ++o2;
        }
        if (-1 === (r2 = Br.call(i2[0], l2[o2])))
          return;
        for (e3 = i2[1][r2], i2[0].splice(r2, 1), i2[1].splice(r2, 1); !i2[0].length && u2.length; )
          r2 = u2.pop(), (i2 = u2.pop())[0].splice(r2, 1), i2[1].splice(r2, 1);
      }
      delete n2[e3];
    }, clear: function() {
      t2 = [], n2 = Lr(null);
    } };
  }, Kr = Fr, Jr = function() {
    var e2 = 0, t2 = [], n2 = [];
    return { get: function(e3) {
      var r2 = Kr.call(t2, e3[0]);
      return -1 === r2 ? null : n2[r2];
    }, set: function(r2) {
      return t2.push(r2[0]), n2.push(++e2), e2;
    }, delete: function(e3) {
      var r2 = Kr.call(n2, e3);
      -1 !== r2 && (t2.splice(r2, 1), n2.splice(r2, 1));
    }, clear: function() {
      t2 = [], n2 = [];
    } };
  }, Hr = Fr, Zr = Object.create, Vr = function(e2) {
    var t2 = 0, n2 = [[], []], r2 = Zr(null);
    return { get: function(t3) {
      for (var r3, o2 = 0, i2 = n2; o2 < e2 - 1; ) {
        if (-1 === (r3 = Hr.call(i2[0], t3[o2])))
          return null;
        i2 = i2[1][r3], ++o2;
      }
      return -1 === (r3 = Hr.call(i2[0], t3[o2])) ? null : i2[1][r3] || null;
    }, set: function(o2) {
      for (var i2, l2 = 0, f2 = n2; l2 < e2 - 1; )
        -1 === (i2 = Hr.call(f2[0], o2[l2])) && (i2 = f2[0].push(o2[l2]) - 1, f2[1].push([[], []])), f2 = f2[1][i2], ++l2;
      return -1 === (i2 = Hr.call(f2[0], o2[l2])) && (i2 = f2[0].push(o2[l2]) - 1), f2[1][i2] = ++t2, r2[t2] = o2, t2;
    }, delete: function(t3) {
      for (var o2, i2 = 0, l2 = n2, f2 = [], u2 = r2[t3]; i2 < e2 - 1; ) {
        if (-1 === (o2 = Hr.call(l2[0], u2[i2])))
          return;
        f2.push(l2, o2), l2 = l2[1][o2], ++i2;
      }
      if (-1 !== (o2 = Hr.call(l2[0], u2[i2]))) {
        for (t3 = l2[1][o2], l2[0].splice(o2, 1), l2[1].splice(o2, 1); !l2[0].length && f2.length; )
          o2 = f2.pop(), (l2 = f2.pop())[0].splice(o2, 1), l2[1].splice(o2, 1);
        delete r2[t3];
      }
    }, clear: function() {
      n2 = [[], []], r2 = Zr(null);
    } };
  }, Gr = K, Qr = tr, Wr = function e2(t2) {
    var n2, r2, o2;
    if (Sr(t2), (n2 = Object(arguments[1])).async && n2.promise)
      throw new Error("Options 'async' and 'promise' cannot be used together");
    return hasOwnProperty.call(t2, "__memoized__") && !n2.force ? t2 : (r2 = Tr(n2.length, t2.length, n2.async && $r.async), o2 = Pr(t2, r2, n2), kr($r, function(e3, t3) {
      n2[t3] && e3(n2[t3], o2, n2);
    }), e2.__profiler__ && e2.__profiler__(o2), o2.updateEnv(), o2.memoized);
  }, Xr = function(e2) {
    var t2, n2 = Gr(arguments[1]);
    return n2.normalizer || 0 !== (t2 = n2.length = Qr(n2.length, e2.length, n2.async)) && (n2.primitive ? false === t2 ? n2.normalizer = Nr : t2 > 1 && (n2.normalizer = Cr(t2)) : n2.normalizer = false === t2 ? Ur() : 1 === t2 ? Jr() : Vr(t2)), n2.async && h("./ext/async", "/$$rollup_base$$/node_modules/memoizee"), n2.promise && h("./ext/promise", "/$$rollup_base$$/node_modules/memoizee"), n2.dispose && h("./ext/dispose", "/$$rollup_base$$/node_modules/memoizee"), n2.maxAge && h("./ext/max-age", "/$$rollup_base$$/node_modules/memoizee"), n2.max && h("./ext/max", "/$$rollup_base$$/node_modules/memoizee"), n2.refCounter && h("./ext/ref-counter", "/$$rollup_base$$/node_modules/memoizee"), Wr(e2, n2);
  }, Yr = m, eo = j, to = Object.prototype.toString, no = function(e2) {
    try {
      return e2.toString();
    } catch (t2) {
      try {
        return String(e2);
      } catch (e3) {
        return null;
      }
    }
  }, ro = /[\n\r\u2028\u2029]/g, oo = m, io = j, lo = function(e2) {
    if (!Yr(e2))
      return null;
    if (eo(e2)) {
      var t2 = e2.toString;
      if ("function" != typeof t2)
        return null;
      if (t2 === to)
        return null;
    }
    try {
      return "" + e2;
    } catch (e3) {
      return null;
    }
  }, fo = function(e2) {
    var t2 = no(e2);
    return null === t2 ? "<Non-coercible to string value>" : (t2.length > 100 && (t2 = t2.slice(0, 99) + "\u2026"), t2 = t2.replace(ro, function(e3) {
      switch (e3) {
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw new Error("Unexpected character");
      }
    }));
  }, uo = function(e2, t2) {
    return e2.replace("%v", fo(t2));
  }, ao = function(e2, t2, n2) {
    if (!io(n2))
      throw new TypeError(uo(t2, e2));
    if (!oo(e2)) {
      if ("default" in n2)
        return n2.default;
      if (n2.isOptional)
        return null;
    }
    var r2 = lo(n2.errorMessage);
    throw oo(r2) || (r2 = t2), new TypeError(uo(r2, e2));
  }, co = ao, so = m, po = function(e2) {
    return so(e2) ? e2 : co(e2, "Cannot use %v", arguments[1]);
  }, ho = T, yo = po, _o = m, go = mt, vo = Z, bo = Function.prototype.call, mo = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, Oo = Object.getPrototypeOf, jo = Object.prototype.hasOwnProperty, xo = { configurable: false, enumerable: false, writable: false, value: null };
  sr = function(e2, t2) {
    var n2, r2, o2, i2, l2, f2, u2 = false;
    return t2 = Object(yo(t2)), o2 = t2.cacheName, f2 = t2.flat, _o(o2) || (o2 = e2), delete t2.cacheName, n2 = t2.value, l2 = ho(n2), delete t2.value, (r2 = { configurable: Boolean(t2.configurable), enumerable: Boolean(t2.enumerable) }).get = e2 !== o2 ? function() {
      return jo.call(this, o2) || (xo.value = l2 ? bo.call(n2, this, t2) : n2, xo.writable = u2, mo(this, o2, xo), xo.value = null, i2 && mo(this, e2, i2)), this[o2];
    } : f2 ? function r3() {
      var o3, f3 = this;
      if (jo.call(this, e2)) {
        if ((o3 = wo(this, e2)).hasOwnProperty("value"))
          return o3.value;
        if ("function" == typeof o3.get && o3.get !== r3)
          return o3.get.call(this);
      }
      for (; !jo.call(f3, e2); )
        f3 = Oo(f3);
      return i2.value = l2 ? bo.call(n2, f3, t2) : n2, mo(f3, e2, i2), i2.value = null, f3[e2];
    } : function r3() {
      var o3;
      return jo.call(this, e2) && (o3 = wo(this, e2)) ? o3.hasOwnProperty("value") ? o3.value : "function" == typeof o3.get && o3.get !== r3 ? o3.get.call(this) : n2 : (i2.value = l2 ? bo.call(n2, this, t2) : n2, mo(this, e2, i2), i2.value = null, this[e2]);
    }, r2.set = function(t3) {
      if (jo.call(this, e2))
        throw new TypeError("Cannot assign to lazy defined '" + e2 + "' property of " + this);
      r2.get.call(this), this[o2] = t3;
    }, t2.desc ? (i2 = { configurable: vo.call(t2.desc, "c"), enumerable: vo.call(t2.desc, "e") }, o2 === e2 ? (i2.writable = vo.call(t2.desc, "w"), i2.value = null) : (u2 = vo.call(t2.desc, "w"), i2.get = r2.get, i2.set = r2.set), delete t2.desc) : o2 === e2 && (i2 = { configurable: Boolean(t2.configurable), enumerable: Boolean(t2.enumerable), writable: Boolean(t2.writable), value: null }), delete t2.configurable, delete t2.enumerable, delete t2.writable, r2;
  };
  var So, ko = _t, $o = K, Po = Ze, To = function(e2) {
    return go(e2, function(e3, t2) {
      return sr(t2, e3);
    });
  }, No = tr, Co = ln, Ao = function(e2) {
    return function(t2) {
      return ko(t2, function(t3) {
        var n2, r2 = Po(t3.value);
        t3.value = function(t4) {
          return t4.getNormalizer && (t4 = $o(t4), void 0 === n2 && (n2 = No(t4.length, r2.length, t4.async && Co.async)), t4.normalizer = t4.getNormalizer(n2), delete t4.getNormalizer), e2(r2.bind(this), t4);
        };
      }), To(t2);
    };
  }(Xr), zo = M, Eo = Object.prototype.propertyIsEnumerable, Mo = He, qo = Ze, Io = M, Ro = Object.prototype.hasOwnProperty, Do = Function.prototype.call, Fo = Fr, Bo = Array.prototype.filter;
  So = function(e2, t2) {
    return Fo.call(this, e2) === t2;
  };
  var Lo = D, Uo = Z, Ko = _t, Jo = function(e2) {
    var t2;
    for (t2 in zo(e2), e2)
      if (Eo.call(e2, t2))
        return t2;
    return null;
  }, Ho = function(e2) {
    var t2, n2, r2;
    for (n2 = Object(Io(this)), qo(e2), r2 = arguments[1], t2 = Mo(n2.length) - 1; t2 >= 0; --t2)
      Ro.call(n2, t2) && Do.call(e2, r2, n2[t2], t2, n2);
  }, Zo = function() {
    return Bo.call(this, So, this);
  }, Vo = "\x1B[", Go = function(e2) {
    return Vo + e2 + "m";
  };
  Go.CSI = Vo;
  var Qo = Lo({ bold: { _bold: [1, 22] }, italic: { _italic: [3, 23] }, underline: { _underline: [4, 24] }, blink: { _blink: [5, 25] }, inverse: { _inverse: [7, 27] }, strike: { _strike: [9, 29] } }, ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"].reduce(function(e2, t2, n2) {
    return e2[t2] = { _fg: [30 + n2, 39] }, e2[t2 + "Bright"] = { _fg: [90 + n2, 39] }, e2["bg" + t2[0].toUpperCase() + t2.slice(1)] = { _bg: [40 + n2, 49] }, e2["bg" + t2[0].toUpperCase() + t2.slice(1) + "Bright"] = { _bg: [100 + n2, 49] }, e2;
  }, {}));
  Go.mods = Qo, Go.openers = {}, Go.closers = {}, Ko(Qo, function(e2) {
    var t2 = e2[Jo(e2)];
    Go.openers[t2[0]] = t2, Go.closers[t2[1]] = t2;
  }), Go.openStyle = function(e2, t2) {
    e2.push(Go.openers[t2]);
  }, Go.closeStyle = function(e2, t2) {
    Ho.call(e2, function(n2, r2) {
      n2[1] === t2 && e2.splice(r2, 1);
    });
  }, Go.prepend = function(e2) {
    return e2.map(function(e3) {
      return Go(e3[0]);
    });
  }, Go.complete = function(e2, t2) {
    return t2.forEach(function(t3) {
      Go.closeStyle(e2, t3);
    }), e2 = (e2 = e2.reverse()).map(function(e3) {
      return e3[1];
    }), (e2 = Zo.call(e2)).map(Go);
  };
  Go.hasCSI = function(e2) {
    return Uo.call(e2, Vo);
  };
  Go.extractCode = function(e2) {
    var t2 = e2.slice(2, -1);
    return t2 = Number(t2);
  };
  var Wo, Xo, Yo, ei, ti = Go, ni = null, ri = { enableColor: function() {
    ni = true;
  }, disableColor: function() {
    ni = false;
  }, autoDetectSupport: function() {
    ni = null;
  }, isColorSupported: function() {
    return null === ni ? !tn.env.NO_COLOR : ni;
  } }, oi = Array.prototype.push, ii = Array.prototype.reduce, li = Math.abs;
  Wo = ["000000", "800000", "008000", "808000", "000080", "800080", "008080", "c0c0c0", "808080", "ff0000", "00ff00", "ffff00", "0000ff", "ff00ff", "00ffff", "ffffff", "000000", "00005f", "000087", "0000af", "0000d7", "0000ff", "005f00", "005f5f", "005f87", "005faf", "005fd7", "005fff", "008700", "00875f", "008787", "0087af", "0087d7", "0087ff", "00af00", "00af5f", "00af87", "00afaf", "00afd7", "00afff", "00d700", "00d75f", "00d787", "00d7af", "00d7d7", "00d7ff", "00ff00", "00ff5f", "00ff87", "00ffaf", "00ffd7", "00ffff", "5f0000", "5f005f", "5f0087", "5f00af", "5f00d7", "5f00ff", "5f5f00", "5f5f5f", "5f5f87", "5f5faf", "5f5fd7", "5f5fff", "5f8700", "5f875f", "5f8787", "5f87af", "5f87d7", "5f87ff", "5faf00", "5faf5f", "5faf87", "5fafaf", "5fafd7", "5fafff", "5fd700", "5fd75f", "5fd787", "5fd7af", "5fd7d7", "5fd7ff", "5fff00", "5fff5f", "5fff87", "5fffaf", "5fffd7", "5fffff", "870000", "87005f", "870087", "8700af", "8700d7", "8700ff", "875f00", "875f5f", "875f87", "875faf", "875fd7", "875fff", "878700", "87875f", "878787", "8787af", "8787d7", "8787ff", "87af00", "87af5f", "87af87", "87afaf", "87afd7", "87afff", "87d700", "87d75f", "87d787", "87d7af", "87d7d7", "87d7ff", "87ff00", "87ff5f", "87ff87", "87ffaf", "87ffd7", "87ffff", "af0000", "af005f", "af0087", "af00af", "af00d7", "af00ff", "af5f00", "af5f5f", "af5f87", "af5faf", "af5fd7", "af5fff", "af8700", "af875f", "af8787", "af87af", "af87d7", "af87ff", "afaf00", "afaf5f", "afaf87", "afafaf", "afafd7", "afafff", "afd700", "afd75f", "afd787", "afd7af", "afd7d7", "afd7ff", "afff00", "afff5f", "afff87", "afffaf", "afffd7", "afffff", "d70000", "d7005f", "d70087", "d700af", "d700d7", "d700ff", "d75f00", "d75f5f", "d75f87", "d75faf", "d75fd7", "d75fff", "d78700", "d7875f", "d78787", "d787af", "d787d7", "d787ff", "d7af00", "d7af5f", "d7af87", "d7afaf", "d7afd7", "d7afff", "d7d700", "d7d75f", "d7d787", "d7d7af", "d7d7d7", "d7d7ff", "d7ff00", "d7ff5f", "d7ff87", "d7ffaf", "d7ffd7", "d7ffff", "ff0000", "ff005f", "ff0087", "ff00af", "ff00d7", "ff00ff", "ff5f00", "ff5f5f", "ff5f87", "ff5faf", "ff5fd7", "ff5fff", "ff8700", "ff875f", "ff8787", "ff87af", "ff87d7", "ff87ff", "ffaf00", "ffaf5f", "ffaf87", "ffafaf", "ffafd7", "ffafff", "ffd700", "ffd75f", "ffd787", "ffd7af", "ffd7d7", "ffd7ff", "ffff00", "ffff5f", "ffff87", "ffffaf", "ffffd7", "ffffff", "080808", "121212", "1c1c1c", "262626", "303030", "3a3a3a", "444444", "4e4e4e", "585858", "626262", "6c6c6c", "767676", "808080", "8a8a8a", "949494", "9e9e9e", "a8a8a8", "b2b2b2", "bcbcbc", "c6c6c6", "d0d0d0", "dadada", "e4e4e4", "eeeeee"].map(function(e2) {
    return { r: parseInt(e2.slice(0, 2), 16), g: parseInt(e2.slice(2, 4), 16), b: parseInt(e2.slice(4), 16) };
  }), Xo = Wo.slice(0, 16);
  Yo = [];
  for (ei = 0; ei < 8; )
    Yo.push(30 + ei++);
  for (ei = 0; ei < 8; )
    Yo.push(90 + ei++);
  oi.apply(Yo, Wo.slice(16).map(function(e2) {
    var t2, n2 = 1 / 0;
    return Xo.every(function(r2, o2) {
      var i2 = ii.call("rgb", function(t3, n3) {
        return t3 += li(r2[n3] - e2[n3]);
      }, 0);
      return i2 < n2 && (t2 = o2, n2 = i2), i2;
    }), Yo[t2];
  }));
  var ui, ai = b.exports, ci = D, si = _t, pi = mt, hi = gn, di = Yn, yi = Xr, _i = Ao, gi = ti, vi = ri, bi = gi.mods, mi = Array.prototype.join, wi = Object.defineProperty, Oi = Math.max, ji = Math.min, xi = hi("_fg", "_bg"), Si = null, ki = yi(function(e2, t2) {
    return wi(ui(), "_cliColorData", ai(ci({}, e2._cliColorData, t2)));
  }), $i = Object.create(Function.prototype, ci(pi(bi, function(e2) {
    return ai.gs(function() {
      return ki(this, e2);
    });
  }), _i({ xterm: ai(function(e2) {
    return e2 = isNaN(e2) ? 255 : ji(Oi(e2, 0), 255), wi(ui(), "_cliColorData", ai(ci({}, this._cliColorData, { _fg: ["38;5;" + e2, 39] })));
  }), bgXterm: ai(function(e2) {
    return e2 = isNaN(e2) ? 255 : ji(Oi(e2, 0), 255), wi(ui(), "_cliColorData", ai(ci({}, this._cliColorData, { _bg: ["48;5;" + e2, 49] })));
  }) }))), Pi = yi(function(e2) {
    return new RegExp("\x1B\\[" + e2 + "m", "g");
  }, { primitive: true });
  ui = function() {
    return di(function e2() {
      var t2 = "", n2 = "", r2 = mi.call(arguments, " "), o2 = e2._cliColorData, i2 = gi.hasCSI(r2);
      return si(o2, function(e3, o3) {
        n2 = gi(e3[1]) + n2, t2 += gi(e3[0]), i2 && (r2 = r2.replace(Pi(e3[1]), xi[o3] ? gi(e3[0]) : ""));
      }, null, true), vi.isColorSupported() ? t2 + r2 + n2 : r2;
    }, $i);
  };
  var Ti = Object.defineProperties(ui(), { xtermSupported: ai(!Si), _cliColorData: ai("", {}) }), Ni = {};
  !function(e2) {
    var t2 = b.exports;
    Object.defineProperties(e2, { width: t2.gs("ce", function() {
      return tn.stdout.columns || 0;
    }), height: t2.gs("ce", function() {
      return tn.stdout.rows || 0;
    }) });
  }(Ni);
  var Ci, Ai, zi, Ei, Mi = Math.floor, qi = function() {
    var e2 = Math.trunc;
    return "function" == typeof e2 && (13 === e2(13.67) && -13 === e2(-13.67));
  }() ? Math.trunc : function(e2) {
    return isNaN(e2) ? NaN : 0 === (e2 = Number(e2)) ? e2 : e2 === 1 / 0 ? 1 / 0 : e2 === -1 / 0 ? -1 / 0 : e2 > 0 ? Mi(e2) : -Mi(-e2);
  }, Ii = b.exports, Ri = qi, Di = Math.abs, Fi = Math.floor, Bi = Math.max, Li = function(e2) {
    return function(t2) {
      return (t2 = isNaN(t2) ? 0 : Bi(Fi(t2), 0)) ? "\x1B[" + t2 + e2 : "";
    };
  }, Ui = Object.defineProperties(function(e2, t2) {
    return e2 = isNaN(e2) ? 0 : Fi(e2), t2 = isNaN(t2) ? 0 : Fi(t2), (e2 > 0 ? zi(e2) : Ei(-e2)) + (t2 > 0 ? Ai(t2) : Ci(-t2));
  }, { up: Ii(Ci = Li("A")), down: Ii(Ai = Li("B")), right: Ii(zi = Li("C")), left: Ii(Ei = Li("D")), to: Ii(function(e2, t2) {
    return e2 = isNaN(e2) ? 1 : Bi(Fi(e2), 0) + 1, "\x1B[" + (t2 = isNaN(t2) ? 1 : Bi(Fi(t2), 0) + 1) + ";" + e2 + "H";
  }), lines: Ii(function(e2) {
    var t2;
    return t2 = (e2 = Ri(e2) || 0) >= 0 ? "E" : "F", "\x1B[" + (e2 = Fi(Di(e2))) + t2;
  }), top: Ii("\x1B[5000F"), bottom: Ii("\x1B[5000B"), lineBegin: Ii("\x1B[5000D"), lineEnd: Ii("\x1B[5000C") }), Ki = He, Ji = M, Hi = Array.prototype.slice, Zi = Re, Vi = Ln, Gi = N, Qi = Ae.iterator, Wi = N, Xi = function(e2) {
    return Gi(e2) && "number" == typeof e2.length && (Vi(e2) && !Zi(e2) || "string" == typeof e2) || false;
  }, Yi = Ln, el = function(e2) {
    return !!Wi(e2) && ("function" == typeof e2[Qi] || Xi(e2));
  }, tl = M, nl = Ue, rl = "function" == typeof "foo".repeat && "foofoo" === "foo".repeat(2) ? String.prototype.repeat : function(e2) {
    var t2, n2 = String(tl(this));
    if ((e2 = nl(e2)) < 0)
      throw new RangeError("Count must be >= 0");
    if (!isFinite(e2))
      throw new RangeError("Count must be < \u221E");
    for (t2 = ""; e2; )
      e2 % 2 && (t2 += n2), e2 > 1 && (n2 += n2), e2 >>= 1;
    return t2;
  }, ol = function() {
    return new RegExp("[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))", "g");
  }, il = mn, ll = ol(), fl = function(e2) {
    return il(e2).replace(ll, "");
  }, ul = fl, al = function(e2) {
    return ul(e2).length;
  }, cl = function(e2) {
    var t2, n2;
    if (0 === (e2 = Ki(Ji(e2))))
      return [];
    for (t2 = arguments.length < 2 ? [void 0] : Hi.call(arguments, 1, 1 + e2); (n2 = t2.length) < e2; )
      t2 = t2.concat(t2.slice(0, e2 - n2));
    return t2;
  }, sl = at, pl = function(e2) {
    if (el(e2) && Yi(e2))
      return e2;
    throw new TypeError(e2 + " is not an iterable or array-like object");
  }, hl = N, dl = mn, yl = rl, _l = al, gl = Array.prototype.push, vl = ol, bl = jn, ml = al, wl = ti, Ol = Math.max, jl = function(e2) {
    this.token = e2;
  }, xl = function(e2) {
    var t2 = vl().exec(e2);
    if (!t2)
      return [e2];
    var n2, r2, o2, i2 = t2.index;
    return 0 === i2 ? (n2 = t2[0], o2 = e2.slice(n2.length), [new jl(n2)].concat(xl(o2))) : (r2 = e2.slice(0, i2), n2 = t2[0], o2 = e2.slice(i2 + n2.length), [r2, new jl(n2)].concat(xl(o2)));
  }, Sl = function(e2, t2, n2) {
    var r2 = e2.reduce(function(e3, r3) {
      var o2 = e3.index;
      if (r3 instanceof jl) {
        var i2 = wl.extractCode(r3.token);
        o2 <= t2 ? (i2 in wl.openers && wl.openStyle(e3.preOpeners, i2), i2 in wl.closers && wl.closeStyle(e3.preOpeners, i2)) : o2 < n2 && (i2 in wl.openers ? (wl.openStyle(e3.inOpeners, i2), e3.seq.push(r3)) : i2 in wl.closers && (e3.inClosers.push(i2), e3.seq.push(r3)));
      } else {
        var l2 = "";
        if (function(e4, t3, n3, r4) {
          return !(n3 > e4.length + t3 || r4 < t3);
        }(r3, o2, t2, n2)) {
          var f2 = Math.max(t2 - o2, 0), u2 = Math.min(n2 - o2, r3.length);
          l2 = r3.slice(f2, u2);
        }
        e3.seq.push(l2), e3.index = o2 + r3.length;
      }
      return e3;
    }, { index: 0, seq: [], preOpeners: [], inOpeners: [], inClosers: [] });
    return r2.seq = [].concat(wl.prepend(r2.preOpeners), r2.seq, wl.complete([].concat(r2.preOpeners, r2.inOpeners), r2.inClosers)), r2.seq;
  }, kl = n("/$$rollup_base$$/node_modules/cli-color"), $l = N, Pl = Ze, Tl = at, Nl = Function.prototype.apply, Cl = Function.prototype.call, Al = function(e2, t2) {
    return Cl.call(t2, this, e2);
  }, zl = function(e2) {
    var t2, n2, r2 = Tl(arguments);
    return (t2 = $l(this) ? [this].concat(r2) : r2).forEach(Pl), t2 = t2.reverse(), n2 = t2[0], t2 = t2.slice(1), function(e3) {
      return t2.reduce(Al, Nl.call(n2, this, arguments));
    };
  };
  !function(e2, t2) {
    var n2, r2 = zl, o2 = Ze, i2 = b.exports, l2 = cn, f2 = "-\\|/", u2 = f2.length;
    n2 = function() {
    }, Object.defineProperties(n2.prototype, { index: i2(-1), running: i2(false), next: i2(function() {
      var e3 = this.running ? "\b" : "";
      return this.running || (this.running = true), e3 + f2[this.index = (this.index + 1) % u2];
    }), reset: i2(function() {
      return this.running ? (this.index = -1, this.running = false, "\b") : "";
    }) }), e2.exports = t2 = function(e3, t3) {
      var i3, f3 = arguments[2], u3 = new n2();
      return o2(e3), t3 = l2(t3), void 0 !== f3 && (e3 = r2.call(e3, o2(f3))), { start: function() {
        i3 || (i3 = setInterval(function() {
          e3(u3.next());
        }, t3));
      }, restart: function() {
        this.stop(), this.start();
      }, stop: function() {
        i3 && (clearInterval(i3), i3 = null, e3(u3.reset()));
      } };
    }, Object.defineProperty(t2, "Iterator", i2(n2));
  }(kl, kl.exports);
  var El, Ml = Ln, ql = n("/$$rollup_base$$/node_modules/es6-iterator"), Il = M, Rl = ao, Dl = T, Fl = at, Bl = D, Ll = M, Ul = m, Kl = po, Jl = function(e2) {
    return Dl(e2) ? e2 : Rl(e2, "%v is not a plain function", arguments[1]);
  }, Hl = function(e2) {
    var t2 = Object(Ll(e2)), n2 = arguments[1], r2 = Object(arguments[2]);
    if (t2 !== e2 && !n2)
      return t2;
    var o2 = {};
    return n2 ? Fl(n2, function(t3) {
      (r2.ensure || t3 in e2) && (o2[t3] = e2[t3]);
    }) : Bl(o2, e2), o2;
  }, Zl = K, Vl = mt, Gl = Function.prototype.bind, Ql = Object.defineProperty, Wl = Object.prototype.hasOwnProperty;
  El = function(e2, t2, n2) {
    var r2, o2 = Kl(t2) && Jl(t2.value);
    return delete (r2 = Hl(t2)).writable, delete r2.value, r2.get = function() {
      return !n2.overwriteDefinition && Wl.call(this, e2) ? o2 : (t2.value = Gl.call(o2, n2.resolveContext ? n2.resolveContext(this) : this), Ql(this, e2, t2), this[e2]);
    }, r2;
  };
  var Xl, Yl = function() {
    return Il(this).length = 0, this;
  }, ef = D, tf = Ze, nf = M, rf = b.exports, of = function(e2) {
    var t2 = Zl(arguments[1]);
    return Ul(t2.resolveContext) && Jl(t2.resolveContext), Vl(e2, function(e3, n2) {
      return El(n2, e3, t2);
    });
  }, lf = Ae, ff = Object.defineProperty, uf = Object.defineProperties, af = Xl = function(e2, t2) {
    if (!(this instanceof Xl))
      throw new TypeError("Constructor requires 'new'");
    uf(this, { __list__: rf("w", nf(e2)), __context__: rf("w", t2), __nextIndex__: rf("w", 0) }), t2 && (tf(t2.on), t2.on("_add", this._onAdd), t2.on("_delete", this._onDelete), t2.on("_clear", this._onClear));
  };
  delete Xl.prototype.constructor, uf(Xl.prototype, ef({ _next: rf(function() {
    var e2;
    if (this.__list__)
      return this.__redo__ && void 0 !== (e2 = this.__redo__.shift()) ? e2 : this.__nextIndex__ < this.__list__.length ? this.__nextIndex__++ : void this._unBind();
  }), next: rf(function() {
    return this._createResult(this._next());
  }), _createResult: rf(function(e2) {
    return void 0 === e2 ? { done: true, value: void 0 } : { done: false, value: this._resolve(e2) };
  }), _resolve: rf(function(e2) {
    return this.__list__[e2];
  }), _unBind: rf(function() {
    this.__list__ = null, delete this.__redo__, this.__context__ && (this.__context__.off("_add", this._onAdd), this.__context__.off("_delete", this._onDelete), this.__context__.off("_clear", this._onClear), this.__context__ = null);
  }), toString: rf(function() {
    return "[object " + (this[lf.toStringTag] || "Object") + "]";
  }) }, of({ _onAdd: rf(function(e2) {
    e2 >= this.__nextIndex__ || (++this.__nextIndex__, this.__redo__ ? (this.__redo__.forEach(function(t2, n2) {
      t2 >= e2 && (this.__redo__[n2] = ++t2);
    }, this), this.__redo__.push(e2)) : ff(this, "__redo__", rf("c", [e2])));
  }), _onDelete: rf(function(e2) {
    var t2;
    e2 >= this.__nextIndex__ || (--this.__nextIndex__, this.__redo__ && (-1 !== (t2 = this.__redo__.indexOf(e2)) && this.__redo__.splice(t2, 1), this.__redo__.forEach(function(t3, n2) {
      t3 > e2 && (this.__redo__[n2] = --t3);
    }, this)));
  }), _onClear: rf(function() {
    this.__redo__ && Yl.call(this.__redo__), this.__nextIndex__ = 0;
  }) }))), ff(Xl.prototype, lf.iterator, rf(function() {
    return this;
  }));
  var cf, sf = Yn, pf = Z, hf = b.exports, df = Ae, yf = af, _f = Object.defineProperty;
  cf = ql.exports = function(e2, t2) {
    if (!(this instanceof cf))
      throw new TypeError("Constructor requires 'new'");
    yf.call(this, e2), t2 = t2 ? pf.call(t2, "key+value") ? "key+value" : pf.call(t2, "key") ? "key" : "value" : "value", _f(this, "__kind__", hf("", t2));
  }, sf && sf(cf, yf), delete cf.prototype.constructor, cf.prototype = Object.create(yf.prototype, { _resolve: hf(function(e2) {
    return "value" === this.__kind__ ? this.__list__[e2] : "key+value" === this.__kind__ ? [e2, this.__list__[e2]] : e2;
  }) }), _f(cf.prototype, df.toStringTag, hf("c", "Array Iterator"));
  var gf, vf = n("/$$rollup_base$$/node_modules/es6-iterator"), bf = Yn, mf = b.exports, wf = Ae, Of = af, jf = Object.defineProperty;
  gf = vf.exports = function(e2) {
    if (!(this instanceof gf))
      throw new TypeError("Constructor requires 'new'");
    e2 = String(e2), Of.call(this, e2), jf(this, "__length__", mf("", e2.length));
  }, bf && bf(gf, Of), delete gf.prototype.constructor, gf.prototype = Object.create(Of.prototype, { _next: mf(function() {
    if (this.__list__)
      return this.__nextIndex__ < this.__length__ ? this.__nextIndex__++ : void this._unBind();
  }), _resolve: mf(function(e2) {
    var t2, n2 = this.__list__[e2];
    return this.__nextIndex__ === this.__length__ ? n2 : (t2 = n2.charCodeAt(0)) >= 55296 && t2 <= 56319 ? n2 + this.__list__[this.__nextIndex__++] : n2;
  }) }), jf(gf.prototype, wf.toStringTag, mf("c", "String Iterator"));
  var xf = Me, Sf = N, kf = Qe, $f = Ae.iterator, Pf = Array.isArray, Tf = function(e2) {
    return !!Sf(e2) && (!!Pf(e2) || (!!kf(e2) || (!!xf(e2) || "function" == typeof e2[$f])));
  }, Nf = Me, Cf = Qe, Af = ql.exports, zf = vf.exports, Ef = function(e2) {
    if (!Tf(e2))
      throw new TypeError(e2 + " is not iterable");
    return e2;
  }, Mf = Ae.iterator, qf = Me, If = Ze, Rf = Qe, Df = function(e2) {
    return "function" == typeof Ef(e2)[Mf] ? e2[Mf]() : Nf(e2) ? new Af(e2) : Cf(e2) ? new zf(e2) : new Af(e2);
  }, Ff = Array.isArray, Bf = Function.prototype.call, Lf = Array.prototype.some, Uf = function(e2) {
    if (!Ml(e2))
      throw new TypeError(e2 + " is not an Object");
    return e2;
  }, Kf = jn, Jf = function(e2, t2) {
    var n2, r2, o2, i2, l2, f2, u2, a2, c2 = arguments[2];
    if (Ff(e2) || qf(e2) ? n2 = "array" : Rf(e2) ? n2 = "string" : e2 = Df(e2), If(t2), o2 = function() {
      i2 = true;
    }, "array" !== n2)
      if ("string" !== n2)
        for (r2 = e2.next(); !r2.done; ) {
          if (Bf.call(t2, c2, r2.value, o2), i2)
            return;
          r2 = e2.next();
        }
      else
        for (f2 = e2.length, l2 = 0; l2 < f2 && (u2 = e2[l2], l2 + 1 < f2 && (a2 = u2.charCodeAt(0)) >= 55296 && a2 <= 56319 && (u2 += e2[++l2]), Bf.call(t2, c2, u2, o2), !i2); ++l2)
          ;
    else
      Lf.call(e2, function(e3) {
        return Bf.call(t2, c2, e3, o2), i2;
      });
  }, Hf = b.exports, Zf = Object.defineProperties(Ti, { windowSize: Hf(Ni), erase: Hf({ screen: "\x1B[2J", screenLeft: "\x1B[1J", screenRight: "\x1B[J", line: "\x1B[2K", lineLeft: "\x1B[1K", lineRight: "\x1B[K" }), move: Hf(Ui), beep: Hf("\x07"), columns: Hf(function(e2) {
    var t2 = Object(arguments[1]), n2 = [], r2 = t2.columns || [], o2 = [];
    return sl(pl(e2), function(e3) {
      var t3 = [[]];
      sl(pl(e3), function(e4, n3) {
        for (var r3 = dl(e4).split("\n"); r3.length > t3.length; )
          t3.push(cl(n3, ""));
        r3.forEach(function(e5, r4) {
          t3[r4][n3] = e5;
        });
      }), gl.apply(o2, t3);
    }), o2.map(function(e3) {
      return sl(pl(e3), function(e4, t3) {
        var r3, o3 = n2[t3];
        return o3 || (o3 = n2[t3] = { width: 0 }), e4 = dl(e4), (r3 = _l(e4)) > o3.width && (o3.width = r3), { str: e4, length: r3 };
      });
    }).map(function(e3) {
      return e3.map(function(e4, t3) {
        var o3, i2, l2 = r2 && r2[t3];
        return i2 = l2 && "right" === l2.align ? "right" : "left", o3 = yl.call(" ", n2[t3].width - e4.length), "left" === i2 ? e4.str + o3 : o3 + e4.str;
      }).join(hl(t2.sep) ? t2.sep : " | ");
    }).join("\n") + "\n";
  }), strip: Hf(fl), getStrippedLength: Hf(al), slice: Hf(function(e2) {
    var t2, n2, r2 = Number(arguments[1]), o2 = Number(arguments[2]);
    return e2 = bl(e2), n2 = ml(e2), isNaN(r2) && (r2 = 0), isNaN(o2) && (o2 = n2), r2 < 0 && (r2 = Ol(n2 + r2, 0)), o2 < 0 && (o2 = Ol(n2 + o2, 0)), t2 = xl(e2), (t2 = Sl(t2, r2, o2)).map(function(e3) {
      return e3 instanceof jl ? e3.token : e3;
    }).join("");
  }), throbber: Hf(kl.exports), reset: Hf("\x1B[2J\x1B[0;0H"), art: Hf(function(e2, t2) {
    var n2 = "";
    return e2 = Kf(e2), Uf(t2), Jf(e2, function(e3) {
      n2 += t2[e3] || e3;
    }), n2;
  }) });
  const Vf = Zf;
  Vf.green, Vf.red;
  const { SequenceMatcher: Gf } = An, { extendedTypeOf: Qf, roundObj: Wf } = Mn;
  class Xf {
    constructor(e2) {
      e2.outputKeys = e2.outputKeys || [], this.options = e2;
    }
    isScalar(e2) {
      return "object" != typeof e2 || null === e2;
    }
    objectDiff(e2, t2) {
      let n2 = {}, r2 = 0, o2 = true;
      for (const [i2, l2] of Object.entries(e2))
        i2 in t2 || (n2[`${i2}__deleted`] = l2, r2 -= 30, o2 = false);
      for (const [i2, l2] of Object.entries(t2))
        i2 in e2 || (n2[`${i2}__added`] = l2, r2 -= 30, o2 = false);
      for (const [i2, l2] of Object.entries(e2))
        if (i2 in t2) {
          r2 += 20;
          const e3 = t2[i2], f2 = this.diff(l2, e3);
          f2.equal ? (this.options.full || this.options.outputKeys.includes(i2)) && (n2[i2] = l2) : (n2[i2] = f2.result, o2 = false), r2 += Math.min(20, Math.max(-10, f2.score / 5));
        }
      return o2 ? (r2 = 100 * Math.max(Object.keys(e2).length, 0.5), this.options.full || (n2 = void 0)) : r2 = Math.max(0, r2), { score: r2, result: n2, equal: o2 };
    }
    findMatchingObject(e2, t2, n2) {
      let r2 = null, o2 = 0;
      for (const [i2, l2] of Object.entries(n2))
        if ("__next" !== i2) {
          const n3 = Math.abs(o2 - t2);
          if (Qf(e2) === Qf(l2)) {
            const { score: t3 } = this.diff(e2, l2);
            (!r2 || t3 > r2.score || t3 === r2.score && n3 < r2.indexDistance) && (r2 = { score: t3, key: i2, indexDistance: n3 });
          }
          o2++;
        }
      return r2;
    }
    scalarize(e2, t2, n2) {
      const r2 = [];
      if (n2) {
        const t3 = {};
        for (let r3 = 0; r3 < e2.length; r3++) {
          const o3 = e2[r3];
          if (this.isScalar(o3))
            continue;
          const i2 = this.findMatchingObject(o3, r3, n2);
          i2 && (!t3[i2.key] || i2.score > t3[i2.key].score) && (t3[i2.key] = { score: i2.score, index: r3 });
        }
        for (const [e3, n3] of Object.entries(t3))
          r2[n3.index] = e3;
      }
      const o2 = [];
      for (let n3 = 0; n3 < e2.length; n3++) {
        const i2 = e2[n3];
        if (this.isScalar(i2))
          o2.push(i2);
        else {
          const e3 = r2[n3] || "__$!SCALAR" + t2.__next++;
          t2[e3] = i2, o2.push(e3);
        }
      }
      return o2;
    }
    isScalarized(e2, t2) {
      return "string" == typeof e2 && e2 in t2;
    }
    descalarize(e2, t2) {
      return this.isScalarized(e2, t2) ? t2[e2] : e2;
    }
    arrayDiff(e2, t2) {
      const n2 = { __next: 1 }, r2 = this.scalarize(e2, n2), o2 = { __next: n2.__next }, i2 = this.scalarize(t2, o2, n2);
      this.options.sort && (r2.sort(), i2.sort());
      const l2 = new Gf(null, r2, i2).getOpcodes();
      let f2 = [], u2 = 0, a2 = true;
      for (const [e3, t3, c2, s2, p2] of l2) {
        let l3, h2, d2, y2, _2, g2, v2, b2;
        switch ("equal" === e3 || this.options.keysOnly && "replace" === e3 || (a2 = false), e3) {
          case "equal":
            for (l3 = t3, y2 = c2, d2 = t3 <= y2; d2 ? l3 < y2 : l3 > y2; d2 ? l3++ : l3--) {
              const e4 = r2[l3];
              if (this.isScalarized(e4, n2)) {
                if (!this.isScalarized(e4, o2))
                  throw new Error(`internal bug: isScalarized(item, originals1) != isScalarized(item, originals2) for item ${JSON.stringify(e4)}`);
                const t4 = this.descalarize(e4, n2), r3 = this.descalarize(e4, o2), i3 = this.diff(t4, r3);
                i3.equal ? this.options.full ? f2.push([" ", t4]) : f2.push([" "]) : (f2.push(["~", i3.result]), a2 = false);
              } else
                this.options.full ? f2.push([" ", e4]) : f2.push([" "]);
              u2 += 10;
            }
            break;
          case "delete":
            for (l3 = t3, g2 = c2, _2 = t3 <= g2; _2 ? l3 < g2 : l3 > g2; _2 ? l3++ : l3--)
              f2.push(["-", this.descalarize(r2[l3], n2)]), u2 -= 5;
            break;
          case "insert":
            for (h2 = s2, b2 = p2, v2 = s2 <= b2; v2 ? h2 < b2 : h2 > b2; v2 ? h2++ : h2--)
              f2.push(["+", this.descalarize(i2[h2], o2)]), u2 -= 5;
            break;
          case "replace":
            if (this.options.keysOnly) {
              let e4, u3;
              for (l3 = t3, u3 = c2, e4 = t3 <= u3; e4 ? l3 < u3 : l3 > u3; e4 ? l3++ : l3--) {
                const e5 = this.diff(this.descalarize(r2[l3], n2), this.descalarize(i2[l3 - t3 + s2], o2));
                e5.equal ? f2.push([" "]) : (f2.push(["~", e5.result]), a2 = false);
              }
            } else {
              let e4, a3, d3, y3;
              for (l3 = t3, a3 = c2, e4 = t3 <= a3; e4 ? l3 < a3 : l3 > a3; e4 ? l3++ : l3--)
                f2.push(["-", this.descalarize(r2[l3], n2)]), u2 -= 5;
              for (h2 = s2, y3 = p2, d3 = s2 <= y3; d3 ? h2 < y3 : h2 > y3; d3 ? h2++ : h2--)
                f2.push(["+", this.descalarize(i2[h2], o2)]), u2 -= 5;
            }
        }
      }
      return a2 || 0 === l2.length ? (f2 = this.options.full ? e2 : void 0, u2 = 100) : u2 = Math.max(0, u2), { score: u2, result: f2, equal: a2 };
    }
    diff(e2, t2) {
      const n2 = Qf(e2);
      if (n2 === Qf(t2))
        switch (n2) {
          case "object":
            return this.objectDiff(e2, t2);
          case "array":
            return this.arrayDiff(e2, t2);
        }
      let r2, o2 = 100, i2 = e2;
      return this.options.keysOnly ? (r2 = true, i2 = void 0) : (r2 = e2 === t2, r2 ? this.options.full || (i2 = void 0) : (o2 = 0, i2 = { __old: e2, __new: t2 })), { score: o2, result: i2, equal: r2 };
    }
  }
  return { diff: function(e2, t2, n2 = {}) {
    return void 0 !== n2.precision && (e2 = Wf(e2, n2.precision), t2 = Wf(t2, n2.precision)), new Xf(n2).diff(e2, t2).result;
  } };
}();
class JsonDiff {
  constructor() {
    this.type = "json";
  }
  diff(data1, data2, { diffOpts, treeOpts } = {}) {
    var _a;
    if (typeof data1 === "string") {
      data1 = JSON.parse(data1);
    }
    if (typeof data2 === "string") {
      data2 = JSON.parse(data2);
    }
    const diffs = (_a = jsonDiff.diff(data1, data2, diffOpts)) != null ? _a : data1;
    const diffNode = generateTree(diffs, treeOpts);
    const addedText = getChanges(diffNode, ChangeType.ADDED);
    const deletedText = getChanges(diffNode, ChangeType.DELETED);
    return {
      diff: diffNode,
      addedText,
      deletedText
    };
  }
  async render(diff, renderOpts = {}) {
    const { diffNodeToHTML } = await __vitePreload(() => import("./jsondiff-to-html.ab75d72e.js"), true ? ["assets/jsondiff-to-html.ab75d72e.js","assets/service.04a32097.js","assets/index-default.0d44a930.js","assets/html-components.5825f149.js","assets/AppLocal.2fbeb786.js","assets/AppLocal.3d3795ac.css","assets/index.21aef151.js","assets/json-parser.f519fd70.js","assets/json-parser.c0f36dc5.css","assets/Message.d6d97d2b.js","assets/SchemaKeyTree.c700e647.js","assets/SchemaKeyTree.9a96e0c5.css","assets/Card.0607fce4.js","assets/utils.fb792079.js"] : void 0);
    return await diffNodeToHTML(diff, renderOpts);
  }
  async renderEmail(diff, { emailOpts } = {}) {
    const { snipJsonDiff, removeAdditions, removeDeletions, cloneJsonDiff } = await __vitePreload(() => import("./AppLocal.2fbeb786.js").then(function(n) {
      return n.e;
    }), true ? ["assets/AppLocal.2fbeb786.js","assets/AppLocal.3d3795ac.css","assets/index.21aef151.js","assets/json-parser.f519fd70.js","assets/json-parser.c0f36dc5.css","assets/service.04a32097.js","assets/Message.d6d97d2b.js","assets/SchemaKeyTree.c700e647.js","assets/SchemaKeyTree.9a96e0c5.css","assets/Card.0607fce4.js"] : void 0);
    let { highlighted = true, mode = "SPLIT", snipped = true } = emailOpts;
    if (snipped) {
      snipJsonDiff(diff);
    }
    const { body } = await __vitePreload(() => import("./html-components.5825f149.js"), true ? ["assets/html-components.5825f149.js","assets/AppLocal.2fbeb786.js","assets/AppLocal.3d3795ac.css","assets/index.21aef151.js","assets/json-parser.f519fd70.js","assets/json-parser.c0f36dc5.css","assets/service.04a32097.js","assets/Message.d6d97d2b.js","assets/SchemaKeyTree.c700e647.js","assets/SchemaKeyTree.9a96e0c5.css","assets/Card.0607fce4.js"] : void 0);
    switch (mode) {
      case "NONE":
        removeDeletions(diff);
        return body(await this.render(diff, { highlighted }), "highlighted-none");
      case "INLINED":
        return body(await this.render(diff, { highlighted }), "highlighted-inlined");
      case "SPLIT":
        const { getSplitView } = await __vitePreload(() => import("./jsondiff-to-html.ab75d72e.js"), true ? ["assets/jsondiff-to-html.ab75d72e.js","assets/service.04a32097.js","assets/index-default.0d44a930.js","assets/html-components.5825f149.js","assets/AppLocal.2fbeb786.js","assets/AppLocal.3d3795ac.css","assets/index.21aef151.js","assets/json-parser.f519fd70.js","assets/json-parser.c0f36dc5.css","assets/Message.d6d97d2b.js","assets/SchemaKeyTree.c700e647.js","assets/SchemaKeyTree.9a96e0c5.css","assets/Card.0607fce4.js","assets/utils.fb792079.js"] : void 0);
        const diff2 = cloneJsonDiff(diff);
        removeAdditions(diff);
        const view1 = await this.render(diff, { highlighted, wrapBody: false, classes: "w-full" });
        removeDeletions(diff2);
        const view2 = await this.render(diff2, { highlighted, wrapBody: false, classes: "w-full" });
        return getSplitView(view1, view2);
    }
  }
  async diffAndRender(data1, data2, { renderOpts, ...otherOpts } = {}) {
    const { diff } = this.diff(data1, data2, otherOpts);
    return await this.render(diff, renderOpts);
  }
  async diffAndRenderEmail(data1, data2, { diffOpts, treeOpts, emailOpts } = {}) {
    if (!diffOpts) {
      diffOpts = { full: true };
    }
    if (!treeOpts) {
      treeOpts = {
        root: "Properties",
        value: "Values"
      };
    }
    const { diff } = this.diff(data1, data2, { diffOpts, treeOpts });
    return await this.renderEmail(diff, { emailOpts });
  }
  getAdditions(diffNode) {
    return getChanges(diffNode, ChangeType.ADDED);
  }
  getDeletions(diffNode) {
    return getChanges(diffNode, ChangeType.DELETED);
  }
}
export { JsonDiff as default };
