var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { _ as __vitePreload, S as Service, s as serviceProxy } from "./service.04a32097.js";
import { E as noop, K as subscribe, L as run_all, s as safe_not_equal, D as is_function, ah as tick, S as SvelteComponent, i as init$2, U as empty, y as insert, H as group_outros, d as transition_out, I as check_outros, t as transition_in, C as detach, M as createEventDispatcher, ac as afterUpdate, a0 as onDestroy, Q as bubble, $ as construct_svelte_component, c as create_component, m as mount_component, g as get_spread_update, b as get_spread_object, e as destroy_component, a as assign$2, ae as get_store_value } from "./index.21aef151.js";
var tachyons = "";
var common = "";
var icomoon = "";
var tailwind = "";
var app = "";
var fontAwesome = "";
var index = "";
var flagIcons_min = "";
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function isDate$1(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate$1(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}
var MILLISECONDS_IN_DAY = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}
var MILLISECONDS_IN_WEEK$1 = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
function addLeadingZeros(number, targetLength) {
  var sign3 = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign3 + output;
}
var formatters$2 = {
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  h: function h(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var formatters$3 = formatters$2;
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return formatters$3.y(date, token);
  },
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return formatters$3.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  I: function I2(date, token, localize2) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return formatters$3.d(date, token);
  },
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  B: function B2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  h: function h2(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return formatters$3.h(date, token);
  },
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return formatters$3.H(date, token);
  },
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return formatters$3.m(date, token);
  },
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return formatters$3.s(date, token);
  },
  S: function S2(date, token) {
    return formatters$3.S(date, token);
  },
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign3 = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign3 + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign3 + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign3 = offset > 0 ? "-" : "+";
    return sign3 + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign3 = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign3 + hours + delimiter + minutes;
}
var formatters$1 = formatters;
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters$1 = longFormatters;
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance$1 = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var formatDistance$2 = formatDistance$1;
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatLong$1 = formatLong;
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative$1 = formatRelative;
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index2 = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index2];
  };
}
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var localize$1 = localize;
function buildMatchFn(args) {
  return function(string2) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string2.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string2.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string2) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string2.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string2.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string2.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index2) {
      return index2 + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var match$1 = match;
var locale = {
  code: "en-US",
  formatDistance: formatDistance$2,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var defaultLocale = locale;
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters$1[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters$1[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
function compareAsc(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}
function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}
function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}
function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
function isLastDayOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  return endOfDay(date).getTime() === endOfMonth(date).getTime();
}
function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign3 = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
  var result;
  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      dateLeft.setDate(30);
    }
    dateLeft.setMonth(dateLeft.getMonth() - sign3 * difference);
    var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign3;
    if (isLastDayOfMonth(toDate(dirtyDateLeft)) && difference === 1 && compareAsc(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }
    result = sign3 * (difference - Number(isLastMonthNotFull));
  }
  return result === 0 ? 0 : result;
}
function differenceInMilliseconds(dateLeft, dateRight) {
  requiredArgs(2, arguments);
  return toDate(dateLeft).getTime() - toDate(dateRight).getTime();
}
var roundingMap = {
  ceil: Math.ceil,
  round: Math.round,
  floor: Math.floor,
  trunc: function trunc(value) {
    return value < 0 ? Math.ceil(value) : Math.floor(value);
  }
};
var defaultRoundingMethod = "trunc";
function getRoundingMethod(method) {
  return method ? roundingMap[method] : roundingMap[defaultRoundingMethod];
}
function differenceInSeconds(dateLeft, dateRight, options) {
  requiredArgs(2, arguments);
  var diff = differenceInMilliseconds(dateLeft, dateRight) / 1e3;
  return getRoundingMethod(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}
function assign$1(target, object) {
  if (target == null) {
    throw new TypeError("assign requires that input parameter not be null or undefined");
  }
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      target[property] = object[property];
    }
  }
  return target;
}
function cloneObject(object) {
  return assign$1({}, object);
}
var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;
function formatDistance2(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale;
  requiredArgs(2, arguments);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
  if (!locale2.formatDistance) {
    throw new RangeError("locale must contain formatDistance property");
  }
  var comparison = compareAsc(dirtyDate, dirtyBaseDate);
  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }
  var localizeOptions = assign$1(cloneObject(options), {
    addSuffix: Boolean(options === null || options === void 0 ? void 0 : options.addSuffix),
    comparison
  });
  var dateLeft;
  var dateRight;
  if (comparison > 0) {
    dateLeft = toDate(dirtyBaseDate);
    dateRight = toDate(dirtyDate);
  } else {
    dateLeft = toDate(dirtyDate);
    dateRight = toDate(dirtyBaseDate);
  }
  var seconds = differenceInSeconds(dateRight, dateLeft);
  var offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1e3;
  var minutes = Math.round((seconds - offsetInSeconds) / 60);
  var months;
  if (minutes < 2) {
    if (options !== null && options !== void 0 && options.includeSeconds) {
      if (seconds < 5) {
        return locale2.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale2.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale2.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale2.formatDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return locale2.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale2.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale2.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale2.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return locale2.formatDistance("xMinutes", minutes, localizeOptions);
  } else if (minutes < 90) {
    return locale2.formatDistance("aboutXHours", 1, localizeOptions);
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return locale2.formatDistance("aboutXHours", hours, localizeOptions);
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return locale2.formatDistance("xDays", 1, localizeOptions);
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return locale2.formatDistance("xDays", days, localizeOptions);
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return locale2.formatDistance("aboutXMonths", months, localizeOptions);
  }
  months = differenceInMonths(dateRight, dateLeft);
  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return locale2.formatDistance("xMonths", nearestMonth, localizeOptions);
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12);
    if (monthsSinceStartOfYear < 3) {
      return locale2.formatDistance("aboutXYears", years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return locale2.formatDistance("overXYears", years, localizeOptions);
    } else {
      return locale2.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}
const _$7 = window._;
if (!_$7) {
  throw new Error("ADD _");
}
const Jed = window.Jed;
if (!Jed) {
  throw new Error("ADD Jed");
}
let jed;
init$1(window.LANG);
function init$1(LANG) {
  jed = new Jed({
    locale_data: {
      messages: _$7.extend(
        {
          "": {
            domain: "messages",
            lang: "en",
            plural_forms: "nplurals=2; plural=(n != 1);"
          }
        },
        _$7.reduce(LANG, function(memo, value, key) {
          memo[key] = [null, value];
          return memo;
        }, {})
      )
    },
    missing_key_callback: function(key) {
    },
    domain: "messages"
  });
}
var i18n = {
  init: init$1,
  gettext(...args) {
    return jed.gettext(...args);
  },
  sprintf(...args) {
    return jed.sprintf(...args);
  },
  translate(...args) {
    return jed.translate(...args);
  }
};
var TXT = i18n.gettext.bind(i18n);
var C$1 = {
  TYPE_ERR: 0,
  TYPE_TEXT: 1,
  TYPE_HTML: 2,
  TYPE_XML: 4,
  TYPE_FEED: 5,
  TYPE_FORM: 6,
  TYPE_PDF_HTML: 7,
  TYPE_DOC: 8,
  TYPE_JSON: 9,
  TYPE_SITEMAP: 10,
  TYPE_RULE: 1,
  TYPE_RULE_GROUP: 2,
  OP_AND: 1,
  OP_OR: 2,
  CONTENT_TYPE_TEXT: 1,
  CONTENT_TYPE_CHANGED_TEXT: 2,
  CONTENT_TYPE_OLD_TEXT: 3,
  RULE_NOT_EMPTY: 1,
  RULE_HAS_TEXT: 2,
  RULE_HAS_TEXT_NOT: 3,
  RULE_HAS_NUMBER_LT: 4,
  RULE_HAS_NUMBER_GT: 5,
  RULE_HAS_NUMBER_DECR_MIN: 6,
  RULE_HAS_NUMBER_INCR_MIN: 7,
  RULE_MATCH_REGEX: 8,
  RULE_HAS_NUMBER_DECR_PERCENT_MIN: 9,
  RULE_HAS_NUMBER_INCR_PERCENT_MIN: 10,
  STATE_DEFAULT: 0,
  STATE_NEW: 10,
  STATE_INIT: 20,
  STATE_UNAUTHORIZED: 30,
  STATE_AUTHORIZED: 35,
  STATE_READY: 40,
  STATE_PAUSED: 45,
  STATE_RESTRICTED: 50,
  STATE_DISCARD: 90,
  STATE_DEL: 100,
  STATE_DONE: 100,
  STATE_PLAN_PUBLIC: 0,
  STATE_PLAN_PRIVATE: 70,
  STATE_ARCHIVED: 110,
  STATE_ERROR: 120,
  STATE_TERMINATING: 130,
  STATE_TERMINATED: 135,
  STATE_RETRYING: 140,
  STATE_EXPIRED: 145,
  STATE_UNSUBSCRIBED: 149,
  STATE_ATTR_DEFAULT: 0,
  STATE_ATTR_VERIFY: 10,
  STATE_ATTR_VERIFY_INIT: 20,
  STATE_ATTR_VERIFY_WAIT: 30,
  STATE_ATTR_VERIFY_DONE: 40,
  ACTION_NONE: 0,
  ACTION_EMAIL: 1,
  ACTION_SMS: 2,
  ACTION_PUSH: 3,
  ACTION_MACRO: 4,
  ACTION_WEBHOOK: 5,
  ACTION_SLACK: 6,
  ACTION_DISCORD: 7,
  ACTION_TEAMS: 8,
  ACTION_LOCAL_AUDIO: 101,
  ACTION_LOCAL_POPUP: 102,
  ACTION_LOCAL_OPEN_TAB: 103,
  RUN_STATE_INIT: 1,
  RUN_STATE_WAIT: 2,
  RUN_STATE_WIP: 3,
  LOCAL_STATE_SYNCED: 0,
  LOCAL_STATE_POST: 1,
  LOCAL_STATE_PUT: 2,
  LOCAL_STATE_DEL: 3,
  LOCAL_STATE_POST_ERR: 10,
  LOCAL_STATE_PUT_ERR: 20,
  LOCAL_STATE_DEL_ERR: 30,
  CLIENT_WEB: 1,
  CLIENT_ANY: 2,
  CLIENT_FF: 10,
  CLIENT_CR: 11,
  CLIENT_OP: 12,
  CLIENT_FFWX: 13,
  CLIENT_MSE: 14,
  CLIENT_ELECTRON: 15,
  CLIENT_SF: 16,
  CLIENT_MAC: 20,
  CLIENT_IOS: 21,
  CLIENT_ANDROID: 22,
  CLIENT_WEBFF: 50,
  CLIENT_DEDI: 51,
  CLIENT_ID_ANY: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
  CLIENT_ID_WEB: "ffffffff-ffff-ffff-ffff-ffffffffffff",
  CLIENT_ACTIVE: 15,
  CLIENT_INACTIVE: 25,
  CLIENT_DISCONN: 45,
  CLIENT_INVALID: 55,
  SOURCE_SITEMAP: 1,
  DEFAULT_GROUPID: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
  TIME_INFINITE: 2592e3,
  NUM_FORMAT_COMMA_DOT: "1,.",
  NUM_FORMAT_DOT_COMMA: "2.,",
  NUM_FORMAT_SPACE_COMMA: "3 ,",
  DS_TYPE_JSON: "json",
  DS_TYPE_SCRAPEX_SCRAPER: "scrapex_scraper",
  DS_TYPE_SCRAPEX_SCRIPT: "scrapex_script",
  DS_TYPE_UPTIME: "uptime",
  DS_TYPE_SCRAPER: "scraper",
  DS_ID_JSON: "00000000-0000-0000-0000-000000000001",
  DS_ID_UPTIME: "00000000-0000-0000-0000-000000000002",
  DS_ID_TEXT: "00000000-0000-0000-0000-000000000003",
  DS_ID_SCRAPER: "00000000-0000-0000-0000-000000000004",
  PRODUCT_ID_DISTILL: 1,
  PRODUCT_ID_SCRAPEX: 2,
  PRODUCT_DISTILL: "Distill Web Monitor",
  PRODUCT_SCRAPEX: "Scrapex.ai",
  DIFF_MODE_VISUAL: 1,
  DIFF_MODE_TEXT: 2,
  DIFF_MODE_SOURCE: 3,
  DIFF_MODE_DATA: 4,
  FORM_DOWNGRADE: "downgrade",
  FORM_CANCEL: "cancel",
  FORM_ACCOUNT_CLOSE: "account-close",
  FORM_EMAIL_ALERT: "email-alert",
  FORM_APP_FEEDBACK: "app",
  FORM_CHANGELOG: "changelog",
  FORM_DOCS: "docs",
  FORM_CHANGE_SUMMARY: "change-summary-feedback",
  JOB_TYPE_SCHEDULED: "scheduled",
  JOB_TYPE_SCHED_RETRY: "scheduledRetry",
  JOB_TYPE_RETRY: "retry",
  JOB_TYPE_BULL_RETRY: "bullRetry",
  JOB_TYPE_ON_DEMAND: "onDemand",
  PLAN_ID_FREE: "00000000-0000-0000-0000-000000000000",
  PLAN_ID_VOID: "00000000-0000-0000-0000-000000000001",
  UNSUBSCRIBE_TYPE_SIEVE: 1,
  UNSUBSCRIBE_TYPE_WORKSPACE: 2,
  UNSUBSCRIBE_TYPE_ALL: 3,
  UNSUBSCRIBE_TYPE_ERROR_ACTION: 4,
  EMAIL_MAX_SUBJECT_LENGTH: 988,
  PROXY_REGION_ICONS_CLASS_NAMES: {
    CA: "fi-ca",
    US: "fi-us",
    MX: "fi-mx",
    BR: "fi-br",
    AR: "fi-ar",
    IN: "fi-in",
    HK: "fi-hk",
    KR: "fi-kr",
    JP: "fi-jp",
    SG: "fi-sg",
    TW: "fi-tw",
    AD: "fi-ad",
    AT: "fi-at",
    BG: "fi-bg",
    CZ: "fi-cz",
    DK: "fi-dk",
    FI: "fi-fi",
    FR: "fi-fr",
    DE: "fi-de",
    GR: "fi-gr",
    HU: "fi-hu",
    IS: "fi-is",
    IT: "fi-it",
    LT: "fi-lt",
    LU: "fi-lu",
    MC: "fi-mc",
    NL: "fi-nl",
    NO: "fi-no",
    PL: "fi-pl",
    PT: "fi-pt",
    RO: "fi-ro",
    RU: "fi-ru",
    SK: "fi-sk",
    ES: "fi-es",
    SE: "fi-se",
    CH: "fi-ch",
    UA: "fi-ua",
    GB: "fi-gb",
    VA: "fi-va",
    EU: "fi-eu",
    WORLD: "fi-world"
  }
};
var _const = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": C$1
}, Symbol.toStringTag, { value: "Module" }));
const ID = function() {
  let id = 0;
  return () => ++id;
}();
function isStaticDatasource(datasourceId) {
  return [C$1.DS_ID_TEXT, C$1.DS_ID_JSON, C$1.DS_ID_UPTIME].includes(datasourceId);
}
function formatTime(ts, trim) {
  if (!ts)
    return "";
  const then = moment(ts);
  const now = moment();
  const diff = now.diff(then) / 1e3 | 0;
  if (diff < 60) {
    return then.format("hh:mm a");
  } else if (diff < 24 * 3600 && now.date() == then.date()) {
    return then.format("hh:mm a");
  } else if (diff < 365 * 24 * 3600) {
    return trim ? then.format("MMM DD") : then.format("MMM DD hh:mm a");
  } else {
    return trim ? then.format("YYYY/MM") : then.format("hh:mm a, MMM DD, YYYY");
  }
}
function formatLogTime(ts) {
  if (!ts)
    return "";
  const then = moment(ts);
  const now = moment();
  const sameDay = now.isSame(then, "day");
  if (sameDay) {
    return then.format("hh:mm a");
  } else {
    return then.format("YYYY/MM/DD HH:mm");
  }
}
function formatTimeV2(ts, trim, applyTZ = false) {
  if (!ts)
    return "";
  const thenStr = new Date(ts).toLocaleString("en-US", { timeZone: getTimezone() });
  const then = new Date(thenStr);
  const now = new Date();
  const diff = (now.getTime() - then.getTime()) / 1e3 || 0;
  if (diff < 60) {
    return format(then, "h:mm a");
  } else if (diff < 24 * 3600 && now.getDate() === then.getDate()) {
    return format(then, "h:mm a");
  } else if (diff < 365 * 24 * 3600) {
    return trim ? format(then, "MMM dd") : format(then, "MMM dd h:mm a");
  } else {
    return trim ? format(then, "yyyy/MM") : format(then, "h:mm a, MMM dd, yyyy");
  }
}
function getDuration(ts1, ts2) {
  return formatDistance2(new Date(ts1), new Date(ts2));
}
function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function withWindow(fn) {
  let unloadFn = fn();
  if (typeof unloadFn == "function") {
    window.addEventListener("unload", unloadFn);
  }
}
function toISOString(dateStr) {
  const date = new Date(dateStr);
  const tzo = -date.getTimezoneOffset(), dif = tzo >= 0 ? "+" : "-", pad = function(num) {
    return (num < 10 ? "0" : "") + num;
  };
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) + dif + pad(Math.floor(Math.abs(tzo) / 60)) + ":" + pad(Math.abs(tzo) % 60);
}
function getShortDisplayText(schedule) {
  let params2 = schedule.params;
  const interval = params2.interval;
  if (schedule.type == "AUTO") {
    return TXT("l_auto");
  }
  if (schedule.type == "LIVE") {
    return TXT("l_schedule_live");
  }
  if (schedule.type == "RANDOM") {
    return formatInterval(params2.min, true) + "-" + formatInterval(params2.max, true);
  }
  if (schedule.type == "CRON") {
    return "cron";
  }
  if (!interval) {
    return TXT("m_never");
  }
  return formatInterval(interval);
}
function formatInterval(interval, terse) {
  let unit;
  let value;
  if (interval < 60) {
    unit = "second";
    value = interval;
  } else if (interval < 3600) {
    unit = "minute";
    value = interval / 60;
  } else if (interval < 86400) {
    unit = "hour";
    value = interval / 3600;
  } else if (interval < 2592e3) {
    unit = "day";
    value = interval / 86400;
  } else {
    return TXT("m_never");
  }
  value = Math.round(value);
  if (terse) {
    return value + unit[0];
  } else {
    return i18n.translate("m_1_" + unit).ifPlural(value, TXT("m_n_" + unit)).fetch(value);
  }
}
function getInterval(inputVal, defaultUnit = "m", defaultValue = 120) {
  const units = { s: 1, m: 60, h: 3600, d: 86400, w: 604800 };
  let num, unit = defaultUnit;
  if (typeof inputVal !== "number") {
    const parts2 = inputVal.trim().replace(/\s+/g, "").split(/(\d*\.*\d*)/);
    num = parseInt(parts2[1]) || defaultValue;
    unit = (parts2[2] || "").toLowerCase()[0] || defaultUnit;
  } else {
    num = inputVal;
  }
  const value = num * units[unit];
  return value;
}
function getNameFromURL(url2, maxLength = 100) {
  let parsedUrl;
  if (url2 instanceof URL) {
    parsedUrl = url2;
  } else {
    try {
      parsedUrl = new URL(url2);
    } catch (err) {
      if (url2.length > maxLength) {
        url2 = `${url2.substring(0, maxLength)}...`;
      }
      return url2;
    }
  }
  let domain = parsedUrl.hostname;
  let path = parsedUrl.pathname;
  domain = (domain.startsWith("www.") ? domain.slice(4) : domain).trim();
  if (path === "/") {
    return domain;
  }
  path = path.replace(/[\/\-]/g, " ").trim();
  let name = `${domain} - ${path}`;
  if (name.length > maxLength) {
    name = `${name.substring(0, maxLength)}...`;
  }
  return name;
}
var MESSAGES = {
  e_brwsr_na: "Brwsr not found",
  e_brwsr_timeout: "Please try again later. No remote browser is available right now.",
  e_err: "Error",
  e_err_add: "Failed to add - ",
  e_err_unexpected: "Unexpected error",
  e_feed_in_page_na: "No feed found in the page.",
  e_load_source: "Failed to load source.",
  e_load_stripe: "Failed to load Stripe.",
  e_pwd_change: "Failed to change password.",
  e_pwd_new: "Sorry, we could not find this email.",
  e_pwd_reset: "Failed to reset password.",
  e_req: "Request to server failed.",
  e_sel_0_save: "No selections could be found to be saved.",
  e_signin_invalid: "Sign in failed, please check your username and password and try again",
  e_subscription_failed: "Failed to complete subscription.",
  e_sync_disabled: "Please sign in and then enable sync.",
  e_sync_server_na: "Please check if sync is enabled for your account.",
  e_unknown_content_type: "Unknown content type: %1$s",
  e_value_exists: "Entered value already exists.",
  e_value_incorrect_check: "Please check entered value. It is an invalid value.",
  a_action_object: "%1$s %2$s",
  a_action_reload: "Reload",
  a_add: "Add",
  a_add_action: "Add action",
  a_add_feed: "Add feed",
  a_add_file: "Add file",
  a_add_label: "Add label",
  a_add_pdf: "Add PDF",
  a_add_url: "Add url",
  a_apply: "Apply",
  a_cancel: "Cancel",
  a_change_plan: "Change Plan",
  a_check_changes: "Check for changes",
  a_check_changes_all: "Check all for changes",
  a_checks_off: "OFF",
  a_checks_on: "ON",
  a_change: "Change",
  a_clear: "Clear",
  a_close: "Close",
  a_confirm: "Confirm",
  a_confirm_plan: "Confirm Plan",
  a_del: "Delete",
  a_del_permanent: "Delete forever",
  a_discard: "Cancel",
  a_downgrade: "Downgrade",
  a_duplicate: "Duplicate",
  a_edit: "Edit",
  a_edit_options: "Edit Options",
  a_edit_rules: "Edit Conditions",
  a_expand: "Expand",
  a_get_set_go: "Got it - Get started",
  a_go_to_watchlist: "Go to Watchlist",
  a_hide_actions: "Hide actions",
  a_later: "Later",
  a_load_website_in_sieve: "Go!",
  a_mark_read: "Mark as read",
  a_monitor_feed: "Monitor Feed",
  a_monitor_xml: "Monitor XML",
  a_monitor_json: "Monitor JSON",
  a_monitor_pdf: "Monitor PDF",
  a_monitor_page: "Monitor full page",
  a_monitor_page_elements: "Monitor parts of page",
  a_move_to_trash: "Move to Trash",
  a_narrow_sel: "Narrow expanded selection",
  a_next: "Next",
  a_open_selector: "Open Selector",
  a_close_selector: "Close Selector",
  a_open_x_selector: "Open %s Selector",
  a_close_x_selector: "Close %s Selector",
  a_open_unread_in_tab: "Open unread in tab",
  a_play: "Play",
  a_register: "Create Account",
  a_rename: "Rename",
  a_resend_verification_msg: "Resend verification message",
  a_restore: "Restore",
  a_save: "Save",
  a_save_selections: "Save selections",
  a_select: "Select",
  a_select_elements: "Select elements",
  a_select_properties: "Select properties",
  a_select_device: "Select device to run checks",
  a_show_actions: "Show actions",
  a_signin: "Sign In",
  a_subscribe: "Subscribe",
  a_sieve_new: "Add Webpage",
  a_static_load: "Disable JavaScript",
  a_toggle_changes: "Show/Hide Changes",
  a_verify: "Verify",
  a_window_close: "Close Window",
  a_make_primary: "Make Primary",
  h_brwsr_closed: "Remote browser has stopped working. Please try to start new browser.",
  h_brwsr_disconnect: "Connection to remote browser has been broken. Please try to start new browser.",
  h_config_show: "Show config",
  h_css_selelctor: "CSS selector to select elements",
  h_del_action: "Delete action",
  h_desc: "Write a description that explains purpose of this entry.",
  h_email_addr: "Email address, e.g. name@example.com",
  h_js: "JavaScript to match selected elements. Return matched elements synchronously or perform an async task and use sendResponse(err, elements) callback to return matched elements after task completion.",
  h_opening_selector_in_new_tab: "Opening new tab to select content...",
  h_opened_selector_in_tab: "Opened new tab to select source content.",
  h_phone: "# international format: +19999999999",
  h_regexp_filter: "Regular expression to filter text content",
  h_schedule_interval: "Set interval at which it will be checked for changes.",
  h_selector_edit: "Select content from a webpage.",
  h_sieve_actions: "Actions are taken when source content changes. Multiple actions can be taken concurrently.",
  h_sieve_device: "Select device that this monitor runs on. Other devices will appear in the list once all devices are synced. The device name with suffix (this device) is name of the current Watchlist's device.",
  h_sieve_empty: "Empty text in selection! If it does not match text in next check consider changing selections. Check update log for checks.",
  h_sieve_name: "A short name to identify this monitor.",
  h_sieve_new: "Preview will be available soon after this task is run.",
  h_sieve_no_config: "No source has been selected. Edit options to select content from a webpage.",
  h_sieve_rules: "Conditions can be used to take actions only when it is true. When there is no condition, actions are taken on any change. All conditions except regexp are case-insensitive.",
  h_sieve_source: "Source is used to get text and data to be monitored.",
  h_tpl_desc_info: "A description of the template. Add any info that may be useful for users and show what is unique about this template.",
  h_tpl_desc_name: 'A short name that specifies what is being monitored e.g. "Price and Stock". Do not include verbs like "Monitor" or "Track changes" or website name.',
  h_tpl_desc_url: "URL of homepage of the website.",
  h_tpl_config: "Define selections to be monitored in a webpage using this template. When required, reference a parameter by its {{name}}.",
  h_tpl_params: "Parameters make it possible to use a template to create multiple monitors using multiple input values. Values can be extracted from a reference URL or provided by user.",
  h_tpl_url: "A template used to create a monitor's URL. Reference a parameter by its {{name}}. When there is only one possible URL, there is no need to use a parameter.",
  h_tpl_url_pattern: "A regular expression to test if this template can be used for a webpage. It is a good idea to capture a group that is name or id. A group can be mapped to parameters in a template. For example, amazon((\\.\\w+)+)/(.*/)*dp/(w+) can be used to match products at all Amazon websites. It captures TLD and product id. Use regex101.com for tests.",
  h_tpl_url_ref: "URL of the webpage that is used to create and test following regular expression.",
  h_try_later: "Please try again later.",
  h_xpath: "XPath expression to select elements",
  l_welcome: "Welcome",
  l_account: "Account",
  l_account_credit: "Account credit",
  l_actions: "Actions",
  l_active: "active",
  l_action_email: "Email",
  l_action_local_audio: "Audio Notification (for local monitor)",
  l_action_local_popup: "Popup Notification (for local monitor)",
  l_action_macro: "Run Macro",
  l_action_none: "Unknown action type",
  l_action_push: "Push Notification (Using Distill's iOS or Android App)",
  l_action_sms: "SMS",
  l_action_webhook: "Webhook Call",
  l_added_text: "Added text",
  l_advanced: "Advanced",
  l_all: "All",
  l_any: "Any",
  l_apps: "Apps",
  l_asian_koel: "Asian Koel",
  l_available: "Available",
  l_available_na: "Not available!",
  l_brwsr: "Brwsr",
  l_bell_strike: "Bell Strike",
  l_changed_on: "Last changed on",
  l_check_log: "Check log",
  l_conditions: "Conditions",
  l_connect: "Connect",
  l_credit: "Credit",
  l_css_selector: "CSS Selector",
  l_device: "Device",
  l_device_this: "this device",
  l_devices: "Devices",
  l_devices_all: "all devices",
  l_data: "Data",
  l_desc: "Description",
  l_developers: "Developers",
  l_device_filter: "Show devices",
  l_done: "Done",
  l_ding_dong: "Ding Dong",
  l_page_options: "Page options",
  l_include_style: "Include page styles",
  l_dynamic: "Enable Javascript",
  l_delay: "Wait for duration",
  l_delay_info: "Wait duration after page load before checking for changes",
  l_dynamic_info: "Enable Javascript to load dynamic content",
  l_include_style_info: "Disable to ignore page styles for faster checks",
  l_el_selected: "Selected",
  l_el_deselected: "Deselected",
  l_email: "Email",
  l_emails_phones: "Emails & Phones",
  l_error: "Error",
  l_explore: "Explore",
  l_feed: "Feed",
  l_field: "Field",
  l_file: "File",
  l_flags: "Flags",
  l_fullname: "Full Name",
  l_general: "General",
  l_get_access: "Get early access",
  l_get_started: "Get started",
  l_has: "has",
  l_has_not: "does not have",
  l_has_num_gt: "has number more than (>)",
  l_has_num_lt: "has number less than (<)",
  l_has_num_decr_min: "has number that decreased more than (-\u0394 >)",
  l_has_num_incr_min: "has number that increased more than (+\u0394 >)",
  l_header: "Header",
  l_headers: "Headers",
  l_help: "Help",
  l_help_support: "Help and support",
  l_incognito: "Incognito",
  l_incognito_info: "Run the monitor in an Incognito tab (Only available for Desktop app)",
  l_js: "JavaScript",
  l_label: "Label",
  l_learn_more: "Learn More",
  l_loading: "Loading",
  l_macro: "Macro",
  l_match_regex: "matches regular expression",
  l_month: "month",
  l_name: "Name",
  l_name_or_email: "Username or Email",
  l_never: "Never",
  l_none: "None",
  l_not_is_empty: "is not empty",
  l_num: "Number",
  l_options: "Options",
  l_opt_force_bg: "Background (dynamic content won't work)",
  l_opt_bgtab: "Tab",
  l_opt_bgwindow: "Window",
  l_page_size: "Page size",
  l_password: "Password",
  l_pdf: "PDF",
  l_phone: "Phone Number",
  l_preview: "Preview",
  l_pricing: "Pricing",
  l_prompt: "Prompt",
  l_read: "Read",
  l_referral: "Referral",
  l_regexp: "Regular Expression",
  l_regexp_filter: "RegExp Filter",
  l_reset_sel: "Reset Selections",
  l_rule: "Condition",
  l_rule_group: "Compound Condition",
  l_rule_true_if_matches_x: "True if matches",
  l_saving: "Saving...",
  l_schedule: "Schedule checks",
  l_schedule_live: "Live",
  l_search_input_label: "Enter the website url here",
  l_search_label: "Tell us the website to track",
  l_selector: "Selector",
  l_select_el: "Select Elements",
  l_selection_config: "Selection Config",
  l_settings: "Settings",
  l_signed_in_as: "Signed in as %s",
  l_sieve_tpl_list: "Templates",
  l_sort_by: "Sort by",
  l_source: "Source",
  l_sources: "Sources",
  l_subscription: "Subscription",
  l_sync: "Sync",
  l_syncing: "Syncing data...",
  l_syncing_wait: "Syncing data. It may take some time to sync numerous changes!",
  l_text: "Text",
  l_text_filter: "Text filter",
  l_time_changed_on: "Time changed on",
  l_tone: "Tone",
  l_tos: "Terms of service",
  l_tpl: "Template",
  l_tpl_desc_name: "Name",
  l_tpl_desc_url: "Homepage",
  l_tpl_desc_info: "Description",
  l_tpl_config: "Selection Config",
  l_tpl_params: "Parameters",
  l_tpl_uri: "URL",
  l_trash: "Trash",
  l_unread: "Unread",
  l_unsaved: "Unsaved",
  l_untitled: "Untitled",
  l_unverified: "Unverified",
  l_url: "URL",
  l_uri_match_group_param_map: "Parameter map",
  l_uri_pattern: "Pattern to match URL",
  l_uri_ref: "Test URL",
  l_usage: "Usage",
  l_username: "Username",
  l_value: "Value",
  l_verification_code: "Verification Code",
  l_verification_req: "Verification Required",
  l_visual_selector: "Visual Selector",
  l_vs_bookmarklet: "Visual Selector Bookmarklet",
  l_waiting: "Waiting",
  l_watchlist: "Watchlist",
  l_webpage: "Webpage",
  l_x_of_following_rules: "of following conditions",
  l_xml: "XML (beta)",
  l_json: "JSON",
  l_xpath: "XPath",
  l_year: "year",
  l_sitemap: "Sitemap (alpha)",
  l_scraper: "Scraper",
  l_auto: "Auto",
  l_feedback_form: "Please provide your feedback",
  l_adblocker: "Block ads and cookies",
  l_adblocker_info: "Enable to block ads and cookie banners",
  m_1_day: "1 day",
  m_n_day: "%d days",
  m_1_hour: "1 hour",
  m_n_hour: "%d hours",
  m_1_minute: "1 min",
  m_n_minute: "%d mins",
  m_1_second: "1 sec",
  m_n_second: "%d secs",
  m_account_credit: "%1$d USD will be credited to your account.",
  m_account_credit_minus: "%1$d USD will be deducted from your account credit.",
  m_action_can_add_only_one: "Action already added. Cannot add another.",
  m_autohide_popup: "Auto-hide notification popup after",
  m_brwsr_data_discard: "Note: Browsing data will be discarded after remote browser is closed.",
  m_check_local_only: "Please switch to web app for cloud monitors. Only local monitors can be checked for changes from this device.",
  m_check_web_only: `Local monitors can't be run from the web app. Please switch to %s's watchlist to run them`,
  m_clear_browser_data: "Clear browser data",
  m_coming_soon: "Coming soon",
  m_confirm_plan_change: "Please confirm that you would like to change the plan.",
  m_del_item: "Moved one item to trash.",
  m_del_items: "Moved %1$s items to trash.",
  m_deleted_action: "Deleted action",
  m_dont_show: "Don't show again",
  m_enter_valid_url: "Please enter a valid URL.",
  m_enter_feed_url: "Enter URL of a feed or a page containing the feed",
  m_enter_pdf_url: "Enter URL of a PDF file",
  m_enter_xml_url: "Enter URL of an XML file",
  m_feed_finding: "Looking for feeds in webpage...",
  m_feed_multi_selection: "Found multiple feeds in page. Pick one!",
  m_free_trial_days_left: "Multiple feeds found, pick one!",
  m_free_trial_end: "Your FREE trial is coming to an end soon.",
  m_free_trial_ending_soon: "Your free trial has ended. You should upgrade now or switch to the Free plan.",
  m_free_trial_till: "Your free trial lasts till %1$s.",
  m_firefox_only: "Only for Firefox",
  m_initial_charge_amount: "Account will be charged $%1$d. It is a prorated fee for %2$s plan till %3$s.",
  m_load_page_options: "Load pages that can't be loaded in background in",
  m_log_na: "Log is empty. Logs appear after the source is checked for updates.",
  m_login_success: "Login successful",
  m_max_workers: "Maximum number of concurrent workers",
  m_minimize_to_tray: "Minimize to tray on close",
  m_never: "Never",
  m_popup_empty: "Recent updates from your Watchlist appear here. Get started by monitoring a few webpages.",
  m_premium_only: "For paid customers",
  m_pwd_reset_req_sent: "Please check your inbox for the password reset link",
  m_referral_info: "Send your friends $10 in Distill credit. Earn $20 credit for each one that signs up and upgrades account.",
  m_referral_tweet: "Tweet to invite you friends",
  m_referral_tweet_msg: "Distill monitors web and notifies instantly. Join now and get $10 in free credit!",
  m_regex_group_na: "There is no group in url pattern.",
  m_restored_from_trash: "Restored monitors from Trash.",
  m_save_selections_none: "There is no selection to save.",
  m_saved: "Saved",
  m_saved_action: "Saved action",
  m_saved_schedule: "Saved changes to schedule",
  m_selection_discarded: "Selection canceled",
  m_selection_saved: "Selection complete",
  m_sent_verify: "Sent verification request",
  m_sieve_data_na: "No older history found",
  m_sign_in_req: "Sign in to view details.",
  m_start_end_of_total: "%1$s-%2$s of %3$s",
  m_subscription_cancelled: "Subscription cancelled.",
  m_sync_monitors: "Sync monitors across devices.",
  m_sync_to_save: "Sync to cloud to save local changes",
  m_try_later: "Please try again later.",
  m_unique_referral_link: "Your unique referral link",
  m_verification_code: "You will receive a message with a code on your %1$s. Please enter the code below to verify it.",
  m_vs_bookmarklet: "Drag me to bookmarks toolbar. Then open a webpage in your browser and click the bookmarklet to select parts from it and add to Distill.",
  m_vs_help: "Select one or more elements on the page to monitor for changes. Ignore a child element by clicking on the element within a selection. Ignored elements are shown in a red box.",
  m_vs_intro_main: "Visual Selector starts a browser in the cloud for remote interaction.",
  m_vs_intro_msg1: "Go to a webpage using the urlbar.",
  m_vs_intro_msg2: "Use selector tools to select and save content from the opened webpage.",
  m_vs_page_loading_try_later: "Uh oh! It seems that the page has not finished loading! Please try again after page has finished loading.",
  m_vs_sel_preview: "Select elements to see preview of selected text.",
  m_xframe_notice1: "When checking for updates, this page will be opened in a tab or a window in an extension.",
  m_xframe_notice2: "You can load it in background in the extension by disabling JavaScript.",
  l_add_monitor: "Add Monitor",
  t_updates: "Updates",
  a_bulk_edit: "Batch Edit",
  a_create: "Create",
  a_export: "Export",
  a_feeds: "Feeds",
  a_import: "Import",
  a_clear_error: "Clear Error Flag",
  a_send: "Send",
  h_error_notif_desc: "Error notification appears: 1. For the first time, when any monitor encounters consecutive errors and 2. In regular intervals if further errors are encountered.",
  h_schedule_constraint_1: "Minimum interval for your account is ",
  h_schedule_constraint_2: "Use local monitor for smaller interval or ",
  h_schedule_random: "Set minimum and maximum interval in seconds to schedule checks",
  l_action_local_open_tab: "Open Page In Tab (for local monitor)",
  l_action_macro_open_tab: "Run Macro (for local monitor)",
  l_action_discord: "Discord Notification",
  l_action_teams: "Microsoft Teams Notification",
  l_action_slack: "Slack Notification",
  l_buzzer: "Buzzer",
  l_confused: "Confused",
  l_discord: "Discord Webhook URL",
  l_dissatisfied: "Dissatisfied",
  l_feedback: "Send Feedback?",
  l_happy: "Happy",
  l_has_num_decr_pct_min: "has number that decreased more than percent (-\u0394% >)",
  l_has_num_incr_pct_min: "has number that increased more than percent (+\u0394% >)",
  l_notification_sound: "Notification Sound",
  l_opt_sticky_tabs: "Sticky Tabs",
  l_opt_sticky_window: "Sticky Window",
  l_random: "Random",
  l_sad: "Sad",
  l_schedule_live_desc: "Check webpages that auto-update content (e.g. a ticker). For local monitors only.",
  l_slack: "Slack Incoming Webhook URL",
  l_suggestion: "Suggestion",
  l_text_old: "Previous text",
  l_time_slots: "Time Slots For Checks",
  l_monday: "Monday",
  l_tuesday: "Tuesday",
  l_wednesday: "Wednesday",
  l_thursday: "Thursday",
  l_friday: "Friday",
  l_saturday: "Saturday",
  l_sunday: "Sunday",
  l_time_slots_start: "Start Time",
  l_time_slots_end: "End Time",
  l_time_slots_day: "Days",
  l_time_slots_enabled: "Enable checks by time slots",
  m_day_warning: "Warning! Slot timings were changed!",
  m_ext_signin: "Sign in to connect with cloud and sync data across connected devices.",
  m_history_empty: "History is empty. Details will appear once it is checked for updates.",
  m_send_feedback: "Send Feedback?",
  m_sticky_window_timeout: "Specify time after which sticky window will close due to inactivity (in minutes) ",
  m_sticky_window_warning: "When using sticky window, Distill will try its best to restore your tabs on startup.",
  m_sticky_tab_timeout: "Specify time after which sticky tab will close due to inactivity (in minutes) ",
  m_subscription_renewal: "Subscription is renewed on 1st of every month. To cancel this subscription, change to Free plan.",
  m_thank_you: "Thank You!",
  e_auth_400: "Please enter valid username and password!",
  e_auth_402: "Please remove other devices or upgrade account. Reached maximum number of devices!",
  e_auth_403: "Forbidden",
  e_auth_5xx: "Please try again later, unexpected error encountered.",
  m_monitor_constraint_1: "Used %1$d of %2$d available monitors. Unable to add a new monitor.",
  m_monitor_constraint_2: "Please follow one of the following options to add new monitors:",
  m_monitor_constraint_3: "Move a few monitors to trash and try again.",
  a_go_to_billing: "Go to billing",
  m_monitor_constraint_4: "Upgrade your plan to increase the limit.",
  m_monitor_limit: "Monitor Limit Exceeded",
  a_signout: "Sign Out",
  m_embedded_opt: "Show embedded icon in pages opened by Distill",
  l_left: "Left",
  l_right: "Right",
  l_top: "Top",
  l_bottom: "Bottom",
  l_dock: "Dock Position",
  a_login: "Login",
  a_forgot_pass: "Forgot password?",
  l_used: "%1$d out of %2$d used",
  l_billing: "Billing",
  l_usage_stats: "Usage Analytics",
  l_support: "Support",
  a_sign_out: "Sign Out",
  l_admin: "Admin Console",
  m_enter_doc_url: "Enter URL of a DOC or DOCX file",
  l_doc: "Word document",
  m_lose_monitors: "You will lose %1$d monitors",
  m_resend_modal: "Verification",
  a_resend: "Resend",
  m_resend: "Do you want to resend verification message?",
  l_snapshot: "Snapshot",
  l_proxy_server: "Proxy Servers",
  h_proxy_server: "Select Proxies, add to monitor.",
  m_checks_paused: "Checks are paused; Click Distill icon in the browser toolbar and click ON button to start checks.",
  m_enterprise_only_feature: "This feature is only available for the enterprise users right now.",
  m_started_check_for_changes: "Started the checks for changes",
  m_check_for_changes_failed: "Could not check for changes",
  rule_comma_dot: "A: 1,000,000.00",
  rule_dot_comma: "B: 1.000.000,00",
  rule_space_comma: "C: 1 000 000,00",
  l_num_format: "Number Format",
  title_num_format: "Number format used for parsing the numbers from the text.",
  title_format_option_comma_dot: ", as Thousands separator and . as Decimal Separator",
  title_format_option_dot_comma: ". as Thousands separator and , as Decimal Separator",
  title_format_option_space_comma: "' ' as Thousands separator and , as Decimal Separator",
  m_upgrade_account: "Upgrade Account",
  err_select_datasource: "Please select a datasource.",
  err_invalid_datasource_selected: "The selected datasource is not available anymore, please select one from the available datasources.",
  m_no_datasource_available: "No datasources are available for this website.",
  m_err_datasource: "Error while executing the datasource.",
  m_datasources_info_title: "All about Datasources",
  m_datasources_info_1: "Offers a data-driven view instead of the web page view that will eliminate false notifications.",
  m_datasources_info_2: "Unlike visual selectors, they are managed by Distill.io, so that we can make sure that data is monitored accurately.",
  m_datasources_info_3: "And, you don't have to worry about the configurations of selectors, delay or authentication.",
  a_show_more_info: "Show more info",
  m_datasource_request: "Let us know if we should create a datasource for the provided URL too",
  m_datasource_request_description: "More info, like fields to be included",
  m_datasource_request_success: "Datasource request submitted successfully",
  err_datasource_request_submit: "Error while submitting datasource request",
  a_submit: "Submit",
  l_monitor: "Monitor",
  l_uptime: "Uptime",
  l_datasource: "Datasource",
  a_inline_diff: "Inline Diff",
  a_side_by_side_diff: "Side-by-Side Diff",
  a_styled_page: "Styled Page",
  a_unstyled_page: "Unstyled Page",
  l_sieve_to_compare: "Monitor to compare",
  l_sieve_to_compare_with: "Monitor to compare with",
  l_diff_stats: "Diff Stats",
  l_tree: "Tree",
  l_raw: "Raw",
  l_continue_only: "Only continue if",
  l_continue_or: "Or continue if",
  l_and: "And",
  l_or: "Or",
  l_contains: "contains",
  l_not_contains: "does not contain",
  l_starts_with: "starts with",
  l_not_starts_with: "doesn't start with",
  l_ends_with: "ends with",
  l_not_ends_with: "doesn't end with",
  l_greater_than: "is greater than",
  l_greater_than_or_equal_to: "is greater than or equal to",
  l_less_than: "is less than",
  l_equal_to: "is equal to",
  l_not_equal_to: "is not equal to",
  l_is_empty: "is empty",
  l_not_match_regex: "doesn't match regular expression",
  l_length_lt: "length is less than",
  l_length_gt: "length is greater than",
  l_not_match_any_previous_text: "doesn't match any previous text",
  l_is_true: "is true (boolean)",
  l_is_false: "is false (boolean)",
  l_is_null: "is null",
  l_is_present: "is present",
  l_text_del: "Deleted text",
  l_net_added_text: "Net added text",
  l_net_deleted_text: "Net deleted text",
  e_app_not_installed: "App not installed. Install one to get push notifications.",
  l_duration: "Duration",
  l_no_snapshot_found: "No snapshot found for this check",
  m_sieve_count_per_plan: "The number of past changes per monitor kept in history is based on the plan.",
  l_visual: "Visual",
  m_invalid_sieve_data_id_explore_diff: "Cannot find this change data from this monitor's change history",
  l_explore_diff_in_a_new_page: "Explore diff in a new page",
  l_chrome: "Chrome",
  l_firefox: "Firefox",
  l_opera: "Opera",
  l_edge: "Edge",
  l_installed: "Installed",
  a_download: "Download",
  a_add_to: "Add To %s",
  l_extension: "Browser Extension",
  l_desktop: "Desktop App",
  a_go: "Go",
  a_back: "Back",
  a_skip: "Skip",
  l_unlimited: "Unlimited",
  l_minutes: "minutes",
  l_onboarding_welcome_title: "Great to have you here!",
  m_onboarding_welcome_1: "We make keeping tabs on the web a piece of cake.",
  m_onboarding_welcome_2: "Price changes? We've got you.",
  m_onboarding_welcome_3: "Watching your competition? Easy peasy.",
  m_onboarding_welcome_4: "Need to know when content changes? No problem.",
  m_onboarding_welcome_5: "Simple setup, powerful features, spot-on updates.",
  m_onboarding_welcome_6: "All in real-time, right from your browser.",
  m_onboarding_welcome_7: "So, let's get started, shall we?",
  l_onboarding_platforms_title: "Track Changes at Warp Speed, Worry-free",
  m_onboarding_platforms_benefits: "Benefits of using extension/desktop app:",
  m_onboarding_platforms_benefits_1: "Faster checks",
  m_onboarding_platforms_benefits_2: "Unlimited local checks",
  m_onboarding_platforms_benefits_3: "Easily track authenticated pages",
  m_onboarding_platforms_benefits_4: "Audio Notifications",
  a_save_and_next: "Save & Next",
  m_onboarding_create_monitor_title: "Create your first monitor",
  m_onboarding_create_monitor_info_1: "Click 'Go' or enter a URL of your choice. After the page finishes loading, click 'Save & Next'.",
  m_onboarding_create_monitor_info_2: "Monitor webpages, track changes in PDFs, keep an eye on updates in feeds or JSON endpoints, you can even monitor the uptime of a website",
  m_onboarding_create_monitor_exists: "You have already created one onboarding monitor, delete it before creating a new one",
  m_onborading_free_trial_title: "Try out Premium Features - For Free!",
  m_onboarding_free_trial: "Unlock the full potential of Distill with our <strong>7-day free</strong> trial. Take advantage of enhanced monitoring capabilities and gain actionable insights.",
  m_onboarding_free_trial_info: "With free trial you get access to premium features :",
  m_onboarding_free_trial_info_1: "Unlimited push notifications",
  m_onboarding_free_trial_info_2: "Macros to automate steps like filling forms and clicks",
  m_onboarding_free_trial_info_3: "Slack, Discord and Webhook notifications",
  m_onboarding_free_trial_info_4: "Faster cloud checks and 24x7 monitoring",
  l_start_free_trial: "Start Your Free Trial",
  l_subscribed_to_free_trial: "Successfully subscribed to free trial!",
  m_onboarding_free_trial_cond_1: "* For verification purposes, $1 authorization charge will be made on your credit card. This will be refunded within 7 days.",
  m_onboarding_free_trial_cond_2: "* After the free trial ends, you'll switch to the <a href='https://distill.io/pricing/' target='_blank'>Starter plan</a>.",
  m_continue_without_trial: "Continue without free trial?",
  m_without_trial_warning: `The premium monitors you've created aren't included in our free plan, and proceeding would lead to their deletion.
  To keep it active try out our free trial or opt for one of our premium subscriptions.`,
  l_continue_with_free_plan: "Continue with free plan",
  l_monitors: "Monitors",
  l_push: "Push Notifications",
  l_macros: "Macros",
  l_min_cloud_interval: "Minimum check interval in cloud",
  m_onboarding_whats_next_title: "What's Next?",
  m_onboarding_whats_next_info_1: "Install <strong>Distill's app</strong> to view updates and get push notifications on the go.",
  m_onboarding_whats_next_info_2: "This is just the tip of the iceberg, there's lot more to explore :",
  l_import_export: "Import/Export",
  l_download_all_monitors: "Download All Monitors",
  l_download_selected_monitors: "Download Selected Monitors",
  m_import_export_info: "Transfer monitors from one device to other.",
  m_conditions_info: "Get notification only if the configured criteria is satisfied",
  m_macros_info: "Record actions and replay it when the check is performed",
  m_watchlist_info: "View, add and manage all your monitors"
};
var lang = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": MESSAGES
}, Symbol.toStringTag, { value: "Module" }));
window.LANG = MESSAGES;
async function loadLang(locale2) {
  let mod = await loadModule(locale2);
  if (mod) {
    window.LANG = mod.default;
  }
  i18n.init(window.LANG);
}
async function loadModule(locale2) {
  switch (locale2) {
    case "de":
      return await __vitePreload(() => import("./lang.1c8b49cc.js"), true ? ["assets/lang.1c8b49cc.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "en-US":
      return await __vitePreload(() => Promise.resolve().then(function() {
        return lang;
      }), true ? void 0 : void 0);
    case "es":
      return await __vitePreload(() => import("./lang.e38d2037.js"), true ? ["assets/lang.e38d2037.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "fr":
      return await __vitePreload(() => import("./lang.d1162b9d.js"), true ? ["assets/lang.d1162b9d.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "it":
      return await __vitePreload(() => import("./lang.c9aa93dd.js"), true ? ["assets/lang.c9aa93dd.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "ja":
      return await __vitePreload(() => import("./lang.39b56d71.js"), true ? ["assets/lang.39b56d71.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "pl":
      return await __vitePreload(() => import("./lang.6d079e33.js"), true ? ["assets/lang.6d079e33.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "pt":
      return await __vitePreload(() => import("./lang.5194e408.js"), true ? ["assets/lang.5194e408.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "ru":
      return await __vitePreload(() => import("./lang.6eb617ac.js"), true ? ["assets/lang.6eb617ac.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "sr":
      return await __vitePreload(() => import("./lang.6e5f3605.js"), true ? ["assets/lang.6e5f3605.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    case "zh":
      return await __vitePreload(() => import("./lang.2c293ccc.js"), true ? ["assets/lang.2c293ccc.js","assets/service.04a32097.js","assets/index.21aef151.js"] : void 0);
    default:
      throw new Error("unhandled language:" + locale2);
  }
}
const subscriber_queue = [];
function readable(value, start2) {
  return {
    subscribe: writable(value, start2).subscribe
  };
}
function writable(value, start2 = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start2(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync2 = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i2) => subscribe(store, (value) => {
      values[i2] = value;
      pending &= ~(1 << i2);
      if (started) {
        sync2();
      }
    }, () => {
      pending |= 1 << i2;
    }));
    started = true;
    sync2();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function parse$2(str, loose) {
  if (str instanceof RegExp)
    return { keys: false, pattern: str };
  var c2, o, tmp, ext, keys = [], pattern = "", arr = str.split("/");
  arr[0] || arr.shift();
  while (tmp = arr.shift()) {
    c2 = tmp[0];
    if (c2 === "*") {
      keys.push("wild");
      pattern += "/(.*)";
    } else if (c2 === ":") {
      o = tmp.indexOf("?", 1);
      ext = tmp.indexOf(".", 1);
      keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
      pattern += !!~o && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
      if (!!~ext)
        pattern += (!!~o ? "?" : "") + "\\" + tmp.substring(ext);
    } else {
      pattern += "/" + tmp;
    }
  }
  return {
    keys,
    pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
  };
}
function create_else_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[2]];
  var switch_value = ctx[0];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1) {
      switch_instance_props = assign$2(switch_instance_props, switch_instance_spread_levels[i2]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
    switch_instance.$on("routeEvent", ctx[7]);
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[2])]) : {};
      if (dirty & 1 && switch_value !== (switch_value = ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props());
          switch_instance.$on("routeEvent", ctx2[7]);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [{ params: ctx[1] }, ctx[2]];
  var switch_value = ctx[0];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1) {
      switch_instance_props = assign$2(switch_instance_props, switch_instance_spread_levels[i2]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
    switch_instance.$on("routeEvent", ctx[6]);
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 6 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 2 && { params: ctx2[1] },
        dirty & 4 && get_spread_object(ctx2[2])
      ]) : {};
      if (dirty & 1 && switch_value !== (switch_value = ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props());
          switch_instance.$on("routeEvent", ctx2[6]);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[1])
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
function getLocation() {
  const hashPosition = window.location.href.indexOf("#/");
  let location2 = hashPosition > -1 ? window.location.href.substr(hashPosition + 1) : "/";
  const qsPosition = location2.indexOf("?");
  let querystring2 = "";
  if (qsPosition > -1) {
    querystring2 = location2.substr(qsPosition + 1);
    location2 = location2.substr(0, qsPosition);
  }
  return { location: location2, querystring: querystring2 };
}
const loc = readable(
  null,
  function start(set) {
    set(getLocation());
    const update = () => {
      set(getLocation());
    };
    window.addEventListener("hashchange", update, false);
    return function stop() {
      window.removeEventListener("hashchange", update, false);
    };
  }
);
const location = derived(loc, ($loc) => $loc.location);
const querystring = derived(loc, ($loc) => $loc.querystring);
const params = writable(void 0);
async function push$1(location2) {
  if (!location2 || location2.length < 1 || location2.charAt(0) != "/" && location2.indexOf("#/") !== 0) {
    throw Error("Invalid parameter location");
  }
  await tick();
  history.replaceState(
    {
      ...history.state,
      __svelte_spa_router_scrollX: window.scrollX,
      __svelte_spa_router_scrollY: window.scrollY
    },
    void 0
  );
  window.location.hash = (location2.charAt(0) == "#" ? "" : "#") + location2;
}
async function pop() {
  await tick();
  window.history.back();
}
async function replace$1(location2) {
  if (!location2 || location2.length < 1 || location2.charAt(0) != "/" && location2.indexOf("#/") !== 0) {
    throw Error("Invalid parameter location");
  }
  await tick();
  const dest = (location2.charAt(0) == "#" ? "" : "#") + location2;
  try {
    const newState = { ...history.state };
    delete newState["__svelte_spa_router_scrollX"];
    delete newState["__svelte_spa_router_scrollY"];
    window.history.replaceState(newState, void 0, dest);
  } catch (e2) {
    console.warn("Caught exception while replacing the current page. If you're running this in the Svelte REPL, please note that the `replace` method might not work in this environment.");
  }
  window.dispatchEvent(new Event("hashchange"));
}
function restoreScroll(state) {
  if (state) {
    window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
  } else {
    window.scrollTo(0, 0);
  }
}
function instance($$self, $$props, $$invalidate) {
  let { routes = {} } = $$props;
  let { prefix = "" } = $$props;
  let { restoreScrollState = false } = $$props;
  class RouteItem {
    constructor(path, component2) {
      if (!component2 || typeof component2 != "function" && (typeof component2 != "object" || component2._sveltesparouter !== true)) {
        throw Error("Invalid component object");
      }
      if (!path || typeof path == "string" && (path.length < 1 || path.charAt(0) != "/" && path.charAt(0) != "*") || typeof path == "object" && !(path instanceof RegExp)) {
        throw Error('Invalid value for "path" argument - strings must start with / or *');
      }
      const { pattern, keys } = parse$2(path);
      this.path = path;
      if (typeof component2 == "object" && component2._sveltesparouter === true) {
        this.component = component2.component;
        this.conditions = component2.conditions || [];
        this.userData = component2.userData;
        this.props = component2.props || {};
      } else {
        this.component = () => Promise.resolve(component2);
        this.conditions = [];
        this.props = {};
      }
      this._pattern = pattern;
      this._keys = keys;
    }
    match(path) {
      if (prefix) {
        if (typeof prefix == "string") {
          if (path.startsWith(prefix)) {
            path = path.substr(prefix.length) || "/";
          } else {
            return null;
          }
        } else if (prefix instanceof RegExp) {
          const match2 = path.match(prefix);
          if (match2 && match2[0]) {
            path = path.substr(match2[0].length) || "/";
          } else {
            return null;
          }
        }
      }
      const matches = this._pattern.exec(path);
      if (matches === null) {
        return null;
      }
      if (this._keys === false) {
        return matches;
      }
      const out = {};
      let i2 = 0;
      while (i2 < this._keys.length) {
        try {
          out[this._keys[i2]] = decodeURIComponent(matches[i2 + 1] || "") || null;
        } catch (e2) {
          out[this._keys[i2]] = null;
        }
        i2++;
      }
      return out;
    }
    async checkConditions(detail) {
      for (let i2 = 0; i2 < this.conditions.length; i2++) {
        if (!await this.conditions[i2](detail)) {
          return false;
        }
      }
      return true;
    }
  }
  const routesList = [];
  if (routes instanceof Map) {
    routes.forEach((route2, path) => {
      routesList.push(new RouteItem(path, route2));
    });
  } else {
    Object.keys(routes).forEach((path) => {
      routesList.push(new RouteItem(path, routes[path]));
    });
  }
  let component = null;
  let componentParams = null;
  let props = {};
  const dispatch = createEventDispatcher();
  async function dispatchNextTick(name, detail) {
    await tick();
    dispatch(name, detail);
  }
  let previousScrollState = null;
  let popStateChanged = null;
  if (restoreScrollState) {
    popStateChanged = (event) => {
      if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
        previousScrollState = event.state;
      } else {
        previousScrollState = null;
      }
    };
    window.addEventListener("popstate", popStateChanged);
    afterUpdate(() => {
      restoreScroll(previousScrollState);
    });
  }
  let lastLoc = null;
  let componentObj = null;
  const unsubscribeLoc = loc.subscribe(async (newLoc) => {
    lastLoc = newLoc;
    let i2 = 0;
    while (i2 < routesList.length) {
      const match2 = routesList[i2].match(newLoc.location);
      if (!match2) {
        i2++;
        continue;
      }
      const detail = {
        route: routesList[i2].path,
        location: newLoc.location,
        querystring: newLoc.querystring,
        userData: routesList[i2].userData,
        params: match2 && typeof match2 == "object" && Object.keys(match2).length ? match2 : null
      };
      if (!await routesList[i2].checkConditions(detail)) {
        $$invalidate(0, component = null);
        componentObj = null;
        dispatchNextTick("conditionsFailed", detail);
        return;
      }
      dispatchNextTick("routeLoading", Object.assign({}, detail));
      const obj = routesList[i2].component;
      if (componentObj != obj) {
        if (obj.loading) {
          $$invalidate(0, component = obj.loading);
          componentObj = obj;
          $$invalidate(1, componentParams = obj.loadingParams);
          $$invalidate(2, props = {});
          dispatchNextTick("routeLoaded", Object.assign({}, detail, {
            component,
            name: component.name,
            params: componentParams
          }));
        } else {
          $$invalidate(0, component = null);
          componentObj = null;
        }
        const loaded = await obj();
        if (newLoc != lastLoc) {
          return;
        }
        $$invalidate(0, component = loaded && loaded.default || loaded);
        componentObj = obj;
      }
      if (match2 && typeof match2 == "object" && Object.keys(match2).length) {
        $$invalidate(1, componentParams = match2);
      } else {
        $$invalidate(1, componentParams = null);
      }
      $$invalidate(2, props = routesList[i2].props);
      dispatchNextTick("routeLoaded", Object.assign({}, detail, {
        component,
        name: component.name,
        params: componentParams
      })).then(() => {
        params.set(componentParams);
      });
      return;
    }
    $$invalidate(0, component = null);
    componentObj = null;
    params.set(void 0);
  });
  onDestroy(() => {
    unsubscribeLoc();
    popStateChanged && window.removeEventListener("popstate", popStateChanged);
  });
  function routeEvent_handler(event) {
    bubble.call(this, $$self, event);
  }
  function routeEvent_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("routes" in $$props2)
      $$invalidate(3, routes = $$props2.routes);
    if ("prefix" in $$props2)
      $$invalidate(4, prefix = $$props2.prefix);
    if ("restoreScrollState" in $$props2)
      $$invalidate(5, restoreScrollState = $$props2.restoreScrollState);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 32) {
      history.scrollRestoration = restoreScrollState ? "manual" : "auto";
    }
  };
  return [
    component,
    componentParams,
    props,
    routes,
    prefix,
    restoreScrollState,
    routeEvent_handler,
    routeEvent_handler_1
  ];
}
class Router extends SvelteComponent {
  constructor(options) {
    super();
    init$2(this, options, instance, create_fragment, safe_not_equal, {
      routes: 3,
      prefix: 4,
      restoreScrollState: 5
    });
  }
}
const qs$1 = window.qs;
if (!qs$1) {
  throw new Error("ADD qs");
}
const $$4 = window.jQuery;
if (!$$4) {
  throw new Error("ADD jQuery");
}
const _$6 = window._;
if (!_$6) {
  throw new Error("ADD _");
}
const async$1 = window.async;
if (!async$1) {
  throw new Error("ADD async");
}
const Backbone$6 = window.Backbone;
if (!Backbone$6) {
  throw new Error("ADD Backbone");
}
const methodMap = {
  "create": "POST",
  "update": "PUT",
  "patch": "PATCH",
  "delete": "DELETE",
  "read": "GET"
};
let IID_USER = null;
let iid = IID_USER;
const Api = _$6.extend({
  api,
  utils: Service.utilApi,
  batch,
  init,
  setIdentityId
}, Backbone$6.Events);
async function api(url2, method, json2) {
  var _a, _b;
  let headers = null;
  if (url2 && typeof url2 === "object") {
    ({ url: url2, method, json: json2, headers } = url2);
  } else if (typeof method === "object") {
    json2 = method;
    method = "GET";
  }
  json2 = json2 != null ? json2 : {};
  method = (_b = (_a = methodMap[method]) != null ? _a : method) != null ? _b : "GET";
  delete json2._state;
  if (iid !== IID_USER) {
    return await Service.fetchFromAPIOrStore({
      url: url2,
      method,
      json: json2,
      headers: { "x-identity": iid }
    });
  } else {
    return Service.fetchFromAPIOrStore(url2, method, json2);
  }
}
async function batch(requests) {
  for (let request of requests) {
    await api(request.url, request.method, request.body);
  }
}
function init() {
}
function setIdentityId(_iid) {
  iid = _iid || IID_USER;
}
var Supports = {
  user: 1,
  email: 1,
  phone: 0,
  agents: {
    local: 1,
    type: async () => {
      if (Service.proxy)
        return await Service.proxy.CFG.CLIENT.TYPE;
      else
        return Service.CFG.CLIENT.TYPE;
    },
    version: async () => {
      if (Service.proxy)
        return await Service.proxy.CFG.VERSION;
      else
        return Service.CFG.VERSION;
    }
  },
  actions: {
    popup: true
  },
  tabForDynamic: Service.Supports.tabForDynamic,
  tabForXFrame: Service.Supports.tabForXFrame
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a3 = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k2) {
    var d3 = Object.getOwnPropertyDescriptor(n, k2);
    Object.defineProperty(a3, k2, d3.get ? d3 : {
      enumerable: true,
      get: function() {
        return n[k2];
      }
    });
  });
  return a3;
}
var type = TypeError;
var __viteBrowserExternal = {};
var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasMap = typeof Map === "function" && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === "function" && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace$1 = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat$1 = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;
var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O2) {
  return O2.__proto__;
} : null);
function addNumericSeparator(num, str) {
  if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
    return str;
  }
  var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof num === "number") {
    var int2 = num < 0 ? -$floor(-num) : $floor(num);
    if (int2 !== num) {
      var intStr = String(int2);
      var dec = $slice.call(str, intStr.length + 1);
      return $replace$1.call(intStr, sepRegex, "$&_") + "." + $replace$1.call($replace$1.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return $replace$1.call(str, sepRegex, "$&_");
}
var utilInspect = require$$0;
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
var quotes = {
  __proto__: null,
  "double": '"',
  single: "'"
};
var quoteREs = {
  __proto__: null,
  "double": /(["\\])/g,
  single: /(['\\])/g
};
var objectInspect = function inspect_(obj, options, depth, seen) {
  var opts = options || {};
  if (has$3(opts, "quoteStyle") && !has$3(quotes, opts.quoteStyle)) {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }
  if (has$3(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }
  var customInspect = has$3(opts, "customInspect") ? opts.customInspect : true;
  if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  }
  if (has$3(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  }
  if (has$3(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  }
  var numericSeparator = opts.numericSeparator;
  if (typeof obj === "undefined") {
    return "undefined";
  }
  if (obj === null) {
    return "null";
  }
  if (typeof obj === "boolean") {
    return obj ? "true" : "false";
  }
  if (typeof obj === "string") {
    return inspectString(obj, opts);
  }
  if (typeof obj === "number") {
    if (obj === 0) {
      return Infinity / obj > 0 ? "0" : "-0";
    }
    var str = String(obj);
    return numericSeparator ? addNumericSeparator(obj, str) : str;
  }
  if (typeof obj === "bigint") {
    var bigIntStr = String(obj) + "n";
    return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
  }
  var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
    return isArray$4(obj) ? "[Array]" : "[Object]";
  }
  var indent = getIndent(opts, depth);
  if (typeof seen === "undefined") {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return "[Circular]";
  }
  function inspect2(value, from, noIndent) {
    if (from) {
      seen = $arrSlice.call(seen);
      seen.push(from);
    }
    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };
      if (has$3(opts, "quoteStyle")) {
        newOpts.quoteStyle = opts.quoteStyle;
      }
      return inspect_(value, newOpts, depth + 1, seen);
    }
    return inspect_(value, opts, depth + 1, seen);
  }
  if (typeof obj === "function" && !isRegExp$1(obj)) {
    var name = nameOf(obj);
    var keys = arrObjKeys(obj, inspect2);
    return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
  }
  if (isSymbol(obj)) {
    var symString = hasShammedSymbols ? $replace$1.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
    return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
  }
  if (isElement(obj)) {
    var s3 = "<" + $toLowerCase.call(String(obj.nodeName));
    var attrs = obj.attributes || [];
    for (var i2 = 0; i2 < attrs.length; i2++) {
      s3 += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
    }
    s3 += ">";
    if (obj.childNodes && obj.childNodes.length) {
      s3 += "...";
    }
    s3 += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
    return s3;
  }
  if (isArray$4(obj)) {
    if (obj.length === 0) {
      return "[]";
    }
    var xs = arrObjKeys(obj, inspect2);
    if (indent && !singleLineValues(xs)) {
      return "[" + indentedJoin(xs, indent) + "]";
    }
    return "[ " + $join.call(xs, ", ") + " ]";
  }
  if (isError(obj)) {
    var parts2 = arrObjKeys(obj, inspect2);
    if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
      return "{ [" + String(obj) + "] " + $join.call($concat$1.call("[cause]: " + inspect2(obj.cause), parts2), ", ") + " }";
    }
    if (parts2.length === 0) {
      return "[" + String(obj) + "]";
    }
    return "{ [" + String(obj) + "] " + $join.call(parts2, ", ") + " }";
  }
  if (typeof obj === "object" && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
      return utilInspect(obj, { depth: maxDepth - depth });
    } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
      return obj.inspect();
    }
  }
  if (isMap(obj)) {
    var mapParts = [];
    if (mapForEach) {
      mapForEach.call(obj, function(value, key) {
        mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
      });
    }
    return collectionOf("Map", mapSize.call(obj), mapParts, indent);
  }
  if (isSet(obj)) {
    var setParts = [];
    if (setForEach) {
      setForEach.call(obj, function(value) {
        setParts.push(inspect2(value, obj));
      });
    }
    return collectionOf("Set", setSize.call(obj), setParts, indent);
  }
  if (isWeakMap(obj)) {
    return weakCollectionOf("WeakMap");
  }
  if (isWeakSet(obj)) {
    return weakCollectionOf("WeakSet");
  }
  if (isWeakRef(obj)) {
    return weakCollectionOf("WeakRef");
  }
  if (isNumber(obj)) {
    return markBoxed(inspect2(Number(obj)));
  }
  if (isBigInt(obj)) {
    return markBoxed(inspect2(bigIntValueOf.call(obj)));
  }
  if (isBoolean(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }
  if (isString(obj)) {
    return markBoxed(inspect2(String(obj)));
  }
  if (typeof window !== "undefined" && obj === window) {
    return "{ [object Window] }";
  }
  if (typeof globalThis !== "undefined" && obj === globalThis || typeof commonjsGlobal !== "undefined" && obj === commonjsGlobal) {
    return "{ [object globalThis] }";
  }
  if (!isDate(obj) && !isRegExp$1(obj)) {
    var ys = arrObjKeys(obj, inspect2);
    var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
    var protoTag = obj instanceof Object ? "" : "null prototype";
    var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr$1(obj), 8, -1) : protoTag ? "Object" : "";
    var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
    var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat$1.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
    if (ys.length === 0) {
      return tag + "{}";
    }
    if (indent) {
      return tag + "{" + indentedJoin(ys, indent) + "}";
    }
    return tag + "{ " + $join.call(ys, ", ") + " }";
  }
  return String(obj);
};
function wrapQuotes(s3, defaultStyle, opts) {
  var style = opts.quoteStyle || defaultStyle;
  var quoteChar = quotes[style];
  return quoteChar + s3 + quoteChar;
}
function quote(s3) {
  return $replace$1.call(String(s3), /"/g, "&quot;");
}
function canTrustToString(obj) {
  return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
}
function isArray$4(obj) {
  return toStr$1(obj) === "[object Array]" && canTrustToString(obj);
}
function isDate(obj) {
  return toStr$1(obj) === "[object Date]" && canTrustToString(obj);
}
function isRegExp$1(obj) {
  return toStr$1(obj) === "[object RegExp]" && canTrustToString(obj);
}
function isError(obj) {
  return toStr$1(obj) === "[object Error]" && canTrustToString(obj);
}
function isString(obj) {
  return toStr$1(obj) === "[object String]" && canTrustToString(obj);
}
function isNumber(obj) {
  return toStr$1(obj) === "[object Number]" && canTrustToString(obj);
}
function isBoolean(obj) {
  return toStr$1(obj) === "[object Boolean]" && canTrustToString(obj);
}
function isSymbol(obj) {
  if (hasShammedSymbols) {
    return obj && typeof obj === "object" && obj instanceof Symbol;
  }
  if (typeof obj === "symbol") {
    return true;
  }
  if (!obj || typeof obj !== "object" || !symToString) {
    return false;
  }
  try {
    symToString.call(obj);
    return true;
  } catch (e2) {
  }
  return false;
}
function isBigInt(obj) {
  if (!obj || typeof obj !== "object" || !bigIntValueOf) {
    return false;
  }
  try {
    bigIntValueOf.call(obj);
    return true;
  } catch (e2) {
  }
  return false;
}
var hasOwn$1 = Object.prototype.hasOwnProperty || function(key) {
  return key in this;
};
function has$3(obj, key) {
  return hasOwn$1.call(obj, key);
}
function toStr$1(obj) {
  return objectToString.call(obj);
}
function nameOf(f) {
  if (f.name) {
    return f.name;
  }
  var m3 = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
  if (m3) {
    return m3[1];
  }
  return null;
}
function indexOf(xs, x2) {
  if (xs.indexOf) {
    return xs.indexOf(x2);
  }
  for (var i2 = 0, l = xs.length; i2 < l; i2++) {
    if (xs[i2] === x2) {
      return i2;
    }
  }
  return -1;
}
function isMap(x2) {
  if (!mapSize || !x2 || typeof x2 !== "object") {
    return false;
  }
  try {
    mapSize.call(x2);
    try {
      setSize.call(x2);
    } catch (s3) {
      return true;
    }
    return x2 instanceof Map;
  } catch (e2) {
  }
  return false;
}
function isWeakMap(x2) {
  if (!weakMapHas || !x2 || typeof x2 !== "object") {
    return false;
  }
  try {
    weakMapHas.call(x2, weakMapHas);
    try {
      weakSetHas.call(x2, weakSetHas);
    } catch (s3) {
      return true;
    }
    return x2 instanceof WeakMap;
  } catch (e2) {
  }
  return false;
}
function isWeakRef(x2) {
  if (!weakRefDeref || !x2 || typeof x2 !== "object") {
    return false;
  }
  try {
    weakRefDeref.call(x2);
    return true;
  } catch (e2) {
  }
  return false;
}
function isSet(x2) {
  if (!setSize || !x2 || typeof x2 !== "object") {
    return false;
  }
  try {
    setSize.call(x2);
    try {
      mapSize.call(x2);
    } catch (m3) {
      return true;
    }
    return x2 instanceof Set;
  } catch (e2) {
  }
  return false;
}
function isWeakSet(x2) {
  if (!weakSetHas || !x2 || typeof x2 !== "object") {
    return false;
  }
  try {
    weakSetHas.call(x2, weakSetHas);
    try {
      weakMapHas.call(x2, weakMapHas);
    } catch (s3) {
      return true;
    }
    return x2 instanceof WeakSet;
  } catch (e2) {
  }
  return false;
}
function isElement(x2) {
  if (!x2 || typeof x2 !== "object") {
    return false;
  }
  if (typeof HTMLElement !== "undefined" && x2 instanceof HTMLElement) {
    return true;
  }
  return typeof x2.nodeName === "string" && typeof x2.getAttribute === "function";
}
function inspectString(str, opts) {
  if (str.length > opts.maxStringLength) {
    var remaining = str.length - opts.maxStringLength;
    var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
    return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
  }
  var quoteRE = quoteREs[opts.quoteStyle || "single"];
  quoteRE.lastIndex = 0;
  var s3 = $replace$1.call($replace$1.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s3, "single", opts);
}
function lowbyte(c2) {
  var n = c2.charCodeAt(0);
  var x2 = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[n];
  if (x2) {
    return "\\" + x2;
  }
  return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
}
function markBoxed(str) {
  return "Object(" + str + ")";
}
function weakCollectionOf(type2) {
  return type2 + " { ? }";
}
function collectionOf(type2, size, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
  return type2 + " (" + size + ") {" + joinedEntries + "}";
}
function singleLineValues(xs) {
  for (var i2 = 0; i2 < xs.length; i2++) {
    if (indexOf(xs[i2], "\n") >= 0) {
      return false;
    }
  }
  return true;
}
function getIndent(opts, depth) {
  var baseIndent;
  if (opts.indent === "	") {
    baseIndent = "	";
  } else if (typeof opts.indent === "number" && opts.indent > 0) {
    baseIndent = $join.call(Array(opts.indent + 1), " ");
  } else {
    return null;
  }
  return {
    base: baseIndent,
    prev: $join.call(Array(depth + 1), baseIndent)
  };
}
function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return "";
  }
  var lineJoiner = "\n" + indent.prev + indent.base;
  return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
}
function arrObjKeys(obj, inspect2) {
  var isArr = isArray$4(obj);
  var xs = [];
  if (isArr) {
    xs.length = obj.length;
    for (var i2 = 0; i2 < obj.length; i2++) {
      xs[i2] = has$3(obj, i2) ? inspect2(obj[i2], obj) : "";
    }
  }
  var syms = typeof gOPS === "function" ? gOPS(obj) : [];
  var symMap;
  if (hasShammedSymbols) {
    symMap = {};
    for (var k2 = 0; k2 < syms.length; k2++) {
      symMap["$" + syms[k2]] = syms[k2];
    }
  }
  for (var key in obj) {
    if (!has$3(obj, key)) {
      continue;
    }
    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    }
    if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
      continue;
    } else if ($test.call(/[^\w$]/, key)) {
      xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
    } else {
      xs.push(key + ": " + inspect2(obj[key], obj));
    }
  }
  if (typeof gOPS === "function") {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
      }
    }
  }
  return xs;
}
var inspect$3 = objectInspect;
var $TypeError$5 = type;
var listGetNode = function(list, key, isDelete) {
  var prev = list;
  var curr;
  for (; (curr = prev.next) != null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      if (!isDelete) {
        curr.next = list.next;
        list.next = curr;
      }
      return curr;
    }
  }
};
var listGet = function(objects, key) {
  if (!objects) {
    return void 0;
  }
  var node = listGetNode(objects, key);
  return node && node.value;
};
var listSet = function(objects, key, value) {
  var node = listGetNode(objects, key);
  if (node) {
    node.value = value;
  } else {
    objects.next = {
      key,
      next: objects.next,
      value
    };
  }
};
var listHas = function(objects, key) {
  if (!objects) {
    return false;
  }
  return !!listGetNode(objects, key);
};
var listDelete = function(objects, key) {
  if (objects) {
    return listGetNode(objects, key, true);
  }
};
var sideChannelList = function getSideChannelList() {
  var $o;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError$5("Side channel does not contain " + inspect$3(key));
      }
    },
    "delete": function(key) {
      var root = $o && $o.next;
      var deletedNode = listDelete($o, key);
      if (deletedNode && root && root === deletedNode) {
        $o = void 0;
      }
      return !!deletedNode;
    },
    get: function(key) {
      return listGet($o, key);
    },
    has: function(key) {
      return listHas($o, key);
    },
    set: function(key, value) {
      if (!$o) {
        $o = {
          next: void 0
        };
      }
      listSet($o, key, value);
    }
  };
  return channel;
};
var esObjectAtoms = Object;
var esErrors = Error;
var _eval = EvalError;
var range = RangeError;
var ref = ReferenceError;
var syntax = SyntaxError;
var uri = URIError;
var abs$1 = Math.abs;
var floor$1 = Math.floor;
var max$2 = Math.max;
var min$1 = Math.min;
var pow$1 = Math.pow;
var round$1 = Math.round;
var _isNaN = Number.isNaN || function isNaN2(a3) {
  return a3 !== a3;
};
var $isNaN = _isNaN;
var sign$1 = function sign(number) {
  if ($isNaN(number) || number === 0) {
    return number;
  }
  return number < 0 ? -1 : 1;
};
var gOPD$1 = Object.getOwnPropertyDescriptor;
var $gOPD$1 = gOPD$1;
if ($gOPD$1) {
  try {
    $gOPD$1([], "length");
  } catch (e2) {
    $gOPD$1 = null;
  }
}
var gopd = $gOPD$1;
var $defineProperty$1 = Object.defineProperty || false;
if ($defineProperty$1) {
  try {
    $defineProperty$1({}, "a", { value: 1 });
  } catch (e2) {
    $defineProperty$1 = false;
  }
}
var esDefineProperty = $defineProperty$1;
var shams = function hasSymbols() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (var _2 in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams;
var hasSymbols$1 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var Reflect_getPrototypeOf = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
var $Object$2 = esObjectAtoms;
var Object_getPrototypeOf = $Object$2.getPrototypeOf || null;
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var toStr = Object.prototype.toString;
var max$1 = Math.max;
var funcType = "[object Function]";
var concatty = function concatty2(a3, b2) {
  var arr = [];
  for (var i2 = 0; i2 < a3.length; i2 += 1) {
    arr[i2] = a3[i2];
  }
  for (var j = 0; j < b2.length; j += 1) {
    arr[j + a3.length] = b2[j];
  }
  return arr;
};
var slicy = function slicy2(arrLike, offset) {
  var arr = [];
  for (var i2 = offset || 0, j = 0; i2 < arrLike.length; i2 += 1, j += 1) {
    arr[j] = arrLike[i2];
  }
  return arr;
};
var joiny = function(arr, joiner) {
  var str = "";
  for (var i2 = 0; i2 < arr.length; i2 += 1) {
    str += arr[i2];
    if (i2 + 1 < arr.length) {
      str += joiner;
    }
  }
  return str;
};
var implementation$1 = function bind(that) {
  var target = this;
  if (typeof target !== "function" || toStr.apply(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slicy(arguments, 1);
  var bound;
  var binder = function() {
    if (this instanceof bound) {
      var result = target.apply(
        this,
        concatty(args, arguments)
      );
      if (Object(result) === result) {
        return result;
      }
      return this;
    }
    return target.apply(
      that,
      concatty(args, arguments)
    );
  };
  var boundLength = max$1(0, target.length - args.length);
  var boundArgs = [];
  for (var i2 = 0; i2 < boundLength; i2++) {
    boundArgs[i2] = "$" + i2;
  }
  bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};
var implementation = implementation$1;
var functionBind = Function.prototype.bind || implementation;
var functionCall = Function.prototype.call;
var functionApply = Function.prototype.apply;
var reflectApply = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
var bind$3 = functionBind;
var $apply$1 = functionApply;
var $call$2 = functionCall;
var $reflectApply = reflectApply;
var actualApply = $reflectApply || bind$3.call($call$2, $apply$1);
var bind$2 = functionBind;
var $TypeError$4 = type;
var $call$1 = functionCall;
var $actualApply = actualApply;
var callBindApplyHelpers = function callBindBasic(args) {
  if (args.length < 1 || typeof args[0] !== "function") {
    throw new $TypeError$4("a function is required");
  }
  return $actualApply(bind$2, $call$1, args);
};
var callBind = callBindApplyHelpers;
var gOPD = gopd;
var hasProtoAccessor;
try {
  hasProtoAccessor = [].__proto__ === Array.prototype;
} catch (e2) {
  if (!e2 || typeof e2 !== "object" || !("code" in e2) || e2.code !== "ERR_PROTO_ACCESS") {
    throw e2;
  }
}
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, "__proto__");
var $Object$1 = Object;
var $getPrototypeOf = $Object$1.getPrototypeOf;
var get$2 = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? function getDunder(value) {
  return $getPrototypeOf(value == null ? value : $Object$1(value));
} : false;
var reflectGetProto = Reflect_getPrototypeOf;
var originalGetProto = Object_getPrototypeOf;
var getDunderProto = get$2;
var getProto$1 = reflectGetProto ? function getProto(O2) {
  return reflectGetProto(O2);
} : originalGetProto ? function getProto2(O2) {
  if (!O2 || typeof O2 !== "object" && typeof O2 !== "function") {
    throw new TypeError("getProto: not an object");
  }
  return originalGetProto(O2);
} : getDunderProto ? function getProto3(O2) {
  return getDunderProto(O2);
} : null;
var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind$1 = functionBind;
var hasown = bind$1.call(call, $hasOwn);
var undefined$1;
var $Object = esObjectAtoms;
var $Error = esErrors;
var $EvalError = _eval;
var $RangeError = range;
var $ReferenceError = ref;
var $SyntaxError = syntax;
var $TypeError$3 = type;
var $URIError = uri;
var abs = abs$1;
var floor = floor$1;
var max = max$2;
var min = min$1;
var pow = pow$1;
var round = round$1;
var sign2 = sign$1;
var $Function = Function;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e2) {
  }
};
var $gOPD = gopd;
var $defineProperty = esDefineProperty;
var throwTypeError = function() {
  throw new $TypeError$3();
};
var ThrowTypeError = $gOPD ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols2 = hasSymbols$1();
var getProto4 = getProto$1;
var $ObjectGPO = Object_getPrototypeOf;
var $ReflectGPO = Reflect_getPrototypeOf;
var $apply = functionApply;
var $call = functionCall;
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" || !getProto4 ? undefined$1 : getProto4(Uint8Array);
var INTRINSICS = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols2 && getProto4 ? getProto4([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": $Error,
  "%eval%": eval,
  "%EvalError%": $EvalError,
  "%Float16Array%": typeof Float16Array === "undefined" ? undefined$1 : Float16Array,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols2 && getProto4 ? getProto4(getProto4([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 || !getProto4 ? undefined$1 : getProto4((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": $Object,
  "%Object.getOwnPropertyDescriptor%": $gOPD,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": $RangeError,
  "%ReferenceError%": $ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 || !getProto4 ? undefined$1 : getProto4((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols2 && getProto4 ? getProto4(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$3,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": $URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
  "%Function.prototype.call%": $call,
  "%Function.prototype.apply%": $apply,
  "%Object.defineProperty%": $defineProperty,
  "%Object.getPrototypeOf%": $ObjectGPO,
  "%Math.abs%": abs,
  "%Math.floor%": floor,
  "%Math.max%": max,
  "%Math.min%": min,
  "%Math.pow%": pow,
  "%Math.round%": round,
  "%Math.sign%": sign2,
  "%Reflect.getPrototypeOf%": $ReflectGPO
};
if (getProto4) {
  try {
    null.error;
  } catch (e2) {
    var errorProto = getProto4(getProto4(e2));
    INTRINSICS["%Error.prototype%"] = errorProto;
  }
}
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen && getProto4) {
      value = getProto4(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind2 = functionBind;
var hasOwn = hasown;
var $concat = bind2.call($call, Array.prototype.concat);
var $spliceApply = bind2.call($apply, Array.prototype.splice);
var $replace = bind2.call($call, String.prototype.replace);
var $strSlice = bind2.call($call, String.prototype.slice);
var $exec = bind2.call($call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string2) {
  var first = $strSlice(string2, 0, 1);
  var last = $strSlice(string2, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace(string2, rePropName, function(match2, number, quote2, subString) {
    result[result.length] = quote2 ? $replace(subString, reEscapeChar, "$1") : number || match2;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError$3("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError$3("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$3('"allowMissing" argument must be a boolean');
  }
  if ($exec(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts2 = stringToPath(name);
  var intrinsicBaseName = parts2.length > 0 ? parts2[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts2, $concat([0, 1], alias));
  }
  for (var i2 = 1, isOwn = true; i2 < parts2.length; i2 += 1) {
    var part = parts2[i2];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$3("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD && i2 + 1 >= parts2.length) {
        var desc2 = $gOPD(value, part);
        isOwn = !!desc2;
        if (isOwn && "get" in desc2 && !("originalValue" in desc2.get)) {
          value = desc2.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var GetIntrinsic$2 = getIntrinsic;
var callBindBasic2 = callBindApplyHelpers;
var $indexOf = callBindBasic2([GetIntrinsic$2("%String.prototype.indexOf%")]);
var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$2(name, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBindBasic2([intrinsic]);
  }
  return intrinsic;
};
var GetIntrinsic$1 = getIntrinsic;
var callBound$1 = callBound$2;
var inspect$2 = objectInspect;
var $TypeError$2 = type;
var $Map = GetIntrinsic$1("%Map%", true);
var $mapGet = callBound$1("Map.prototype.get", true);
var $mapSet = callBound$1("Map.prototype.set", true);
var $mapHas = callBound$1("Map.prototype.has", true);
var $mapDelete = callBound$1("Map.prototype.delete", true);
var $mapSize = callBound$1("Map.prototype.size", true);
var sideChannelMap = !!$Map && function getSideChannelMap() {
  var $m;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError$2("Side channel does not contain " + inspect$2(key));
      }
    },
    "delete": function(key) {
      if ($m) {
        var result = $mapDelete($m, key);
        if ($mapSize($m) === 0) {
          $m = void 0;
        }
        return result;
      }
      return false;
    },
    get: function(key) {
      if ($m) {
        return $mapGet($m, key);
      }
    },
    has: function(key) {
      if ($m) {
        return $mapHas($m, key);
      }
      return false;
    },
    set: function(key, value) {
      if (!$m) {
        $m = new $Map();
      }
      $mapSet($m, key, value);
    }
  };
  return channel;
};
var GetIntrinsic2 = getIntrinsic;
var callBound = callBound$2;
var inspect$1 = objectInspect;
var getSideChannelMap$1 = sideChannelMap;
var $TypeError$1 = type;
var $WeakMap = GetIntrinsic2("%WeakMap%", true);
var $weakMapGet = callBound("WeakMap.prototype.get", true);
var $weakMapSet = callBound("WeakMap.prototype.set", true);
var $weakMapHas = callBound("WeakMap.prototype.has", true);
var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
var sideChannelWeakmap = $WeakMap ? function getSideChannelWeakMap() {
  var $wm;
  var $m;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError$1("Side channel does not contain " + inspect$1(key));
      }
    },
    "delete": function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapDelete($wm, key);
        }
      } else if (getSideChannelMap$1) {
        if ($m) {
          return $m["delete"](key);
        }
      }
      return false;
    },
    get: function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapGet($wm, key);
        }
      }
      return $m && $m.get(key);
    },
    has: function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapHas($wm, key);
        }
      }
      return !!$m && $m.has(key);
    },
    set: function(key, value) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if (!$wm) {
          $wm = new $WeakMap();
        }
        $weakMapSet($wm, key, value);
      } else if (getSideChannelMap$1) {
        if (!$m) {
          $m = getSideChannelMap$1();
        }
        $m.set(key, value);
      }
    }
  };
  return channel;
} : getSideChannelMap$1;
var $TypeError = type;
var inspect = objectInspect;
var getSideChannelList2 = sideChannelList;
var getSideChannelMap2 = sideChannelMap;
var getSideChannelWeakMap2 = sideChannelWeakmap;
var makeChannel = getSideChannelWeakMap2 || getSideChannelMap2 || getSideChannelList2;
var sideChannel = function getSideChannel() {
  var $channelData;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError("Side channel does not contain " + inspect(key));
      }
    },
    "delete": function(key) {
      return !!$channelData && $channelData["delete"](key);
    },
    get: function(key) {
      return $channelData && $channelData.get(key);
    },
    has: function(key) {
      return !!$channelData && $channelData.has(key);
    },
    set: function(key, value) {
      if (!$channelData) {
        $channelData = makeChannel();
      }
      $channelData.set(key, value);
    }
  };
  return channel;
};
var replace = String.prototype.replace;
var percentTwenties = /%20/g;
var Format = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
};
var formats$3 = {
  "default": Format.RFC3986,
  formatters: {
    RFC1738: function(value) {
      return replace.call(value, percentTwenties, "+");
    },
    RFC3986: function(value) {
      return String(value);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
};
var formats$2 = formats$3;
var has$2 = Object.prototype.hasOwnProperty;
var isArray$3 = Array.isArray;
var hexTable = function() {
  var array = [];
  for (var i2 = 0; i2 < 256; ++i2) {
    array.push("%" + ((i2 < 16 ? "0" : "") + i2.toString(16)).toUpperCase());
  }
  return array;
}();
var compactQueue = function compactQueue2(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];
    if (isArray$3(obj)) {
      var compacted = [];
      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== "undefined") {
          compacted.push(obj[j]);
        }
      }
      item.obj[item.prop] = compacted;
    }
  }
};
var arrayToObject = function arrayToObject2(source, options) {
  var obj = options && options.plainObjects ? { __proto__: null } : {};
  for (var i2 = 0; i2 < source.length; ++i2) {
    if (typeof source[i2] !== "undefined") {
      obj[i2] = source[i2];
    }
  }
  return obj;
};
var merge$1 = function merge(target, source, options) {
  if (!source) {
    return target;
  }
  if (typeof source !== "object" && typeof source !== "function") {
    if (isArray$3(target)) {
      target.push(source);
    } else if (target && typeof target === "object") {
      if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }
    return target;
  }
  if (!target || typeof target !== "object") {
    return [target].concat(source);
  }
  var mergeTarget = target;
  if (isArray$3(target) && !isArray$3(source)) {
    mergeTarget = arrayToObject(target, options);
  }
  if (isArray$3(target) && isArray$3(source)) {
    source.forEach(function(item, i2) {
      if (has$2.call(target, i2)) {
        var targetItem = target[i2];
        if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
          target[i2] = merge(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i2] = item;
      }
    });
    return target;
  }
  return Object.keys(source).reduce(function(acc, key) {
    var value = source[key];
    if (has$2.call(acc, key)) {
      acc[key] = merge(acc[key], value, options);
    } else {
      acc[key] = value;
    }
    return acc;
  }, mergeTarget);
};
var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function(acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};
var decode = function(str, defaultDecoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, " ");
  if (charset === "iso-8859-1") {
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }
  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e2) {
    return strWithoutPlus;
  }
};
var limit = 1024;
var encode = function encode2(str, defaultEncoder, charset, kind, format2) {
  if (str.length === 0) {
    return str;
  }
  var string2 = str;
  if (typeof str === "symbol") {
    string2 = Symbol.prototype.toString.call(str);
  } else if (typeof str !== "string") {
    string2 = String(str);
  }
  if (charset === "iso-8859-1") {
    return escape(string2).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  var out = "";
  for (var j = 0; j < string2.length; j += limit) {
    var segment = string2.length >= limit ? string2.slice(j, j + limit) : string2;
    var arr = [];
    for (var i2 = 0; i2 < segment.length; ++i2) {
      var c2 = segment.charCodeAt(i2);
      if (c2 === 45 || c2 === 46 || c2 === 95 || c2 === 126 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || format2 === formats$2.RFC1738 && (c2 === 40 || c2 === 41)) {
        arr[arr.length] = segment.charAt(i2);
        continue;
      }
      if (c2 < 128) {
        arr[arr.length] = hexTable[c2];
        continue;
      }
      if (c2 < 2048) {
        arr[arr.length] = hexTable[192 | c2 >> 6] + hexTable[128 | c2 & 63];
        continue;
      }
      if (c2 < 55296 || c2 >= 57344) {
        arr[arr.length] = hexTable[224 | c2 >> 12] + hexTable[128 | c2 >> 6 & 63] + hexTable[128 | c2 & 63];
        continue;
      }
      i2 += 1;
      c2 = 65536 + ((c2 & 1023) << 10 | segment.charCodeAt(i2) & 1023);
      arr[arr.length] = hexTable[240 | c2 >> 18] + hexTable[128 | c2 >> 12 & 63] + hexTable[128 | c2 >> 6 & 63] + hexTable[128 | c2 & 63];
    }
    out += arr.join("");
  }
  return out;
};
var compact = function compact2(value) {
  var queue = [{ obj: { o: value }, prop: "o" }];
  var refs = [];
  for (var i2 = 0; i2 < queue.length; ++i2) {
    var item = queue[i2];
    var obj = item.obj[item.prop];
    var keys = Object.keys(obj);
    for (var j = 0; j < keys.length; ++j) {
      var key = keys[j];
      var val = obj[key];
      if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
        queue.push({ obj, prop: key });
        refs.push(val);
      }
    }
  }
  compactQueue(queue);
  return value;
};
var isRegExp = function isRegExp2(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
};
var isBuffer = function isBuffer2(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};
var combine = function combine2(a3, b2) {
  return [].concat(a3, b2);
};
var maybeMap = function maybeMap2(val, fn) {
  if (isArray$3(val)) {
    var mapped = [];
    for (var i2 = 0; i2 < val.length; i2 += 1) {
      mapped.push(fn(val[i2]));
    }
    return mapped;
  }
  return fn(val);
};
var utils$2 = {
  arrayToObject,
  assign,
  combine,
  compact,
  decode,
  encode,
  isBuffer,
  isRegExp,
  maybeMap,
  merge: merge$1
};
var getSideChannel2 = sideChannel;
var utils$1 = utils$2;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + "[]";
  },
  comma: "comma",
  indices: function indices(prefix, key) {
    return prefix + "[" + key + "]";
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$2 = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function(arr, valueOrArray) {
  push.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaultFormat = formats$1["default"];
var defaults$2 = {
  addQueryPrefix: false,
  allowDots: false,
  allowEmptyArrays: false,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: false,
  commaRoundTrip: false,
  delimiter: "&",
  encode: true,
  encodeDotInKeys: false,
  encoder: utils$1.encode,
  encodeValuesOnly: false,
  filter: void 0,
  format: defaultFormat,
  formatter: formats$1.formatters[defaultFormat],
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
};
var sentinel = {};
var stringify$1 = function stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate2, format2, formatter, encodeValuesOnly, charset, sideChannel2) {
  var obj = object;
  var tmpSc = sideChannel2;
  var step = 0;
  var findFlag = false;
  while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
    var pos = tmpSc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        findFlag = true;
      }
    }
    if (typeof tmpSc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate2(obj);
  } else if (generateArrayPrefix === "comma" && isArray$2(obj)) {
    obj = utils$1.maybeMap(obj, function(value2) {
      if (value2 instanceof Date) {
        return serializeDate2(value2);
      }
      return value2;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults$2.encoder, charset, "key", format2) : prefix;
    }
    obj = "";
  }
  if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$2.encoder, charset, "key", format2);
      return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults$2.encoder, charset, "value", format2))];
    }
    return [formatter(prefix) + "=" + formatter(String(obj))];
  }
  var values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  var objKeys;
  if (generateArrayPrefix === "comma" && isArray$2(obj)) {
    if (encodeValuesOnly && encoder) {
      obj = utils$1.maybeMap(obj, encoder);
    }
    objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray$2(filter)) {
    objKeys = filter;
  } else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }
  var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
  var adjustedPrefix = commaRoundTrip && isArray$2(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
  if (allowEmptyArrays && isArray$2(obj) && obj.length === 0) {
    return adjustedPrefix + "[]";
  }
  for (var j = 0; j < objKeys.length; ++j) {
    var key = objKeys[j];
    var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
    if (skipNulls && value === null) {
      continue;
    }
    var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
    var keyPrefix = isArray$2(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
    sideChannel2.set(object, step);
    var valueSideChannel = getSideChannel2();
    valueSideChannel.set(sentinel, sideChannel2);
    pushToArray(values, stringify(
      value,
      keyPrefix,
      generateArrayPrefix,
      commaRoundTrip,
      allowEmptyArrays,
      strictNullHandling,
      skipNulls,
      encodeDotInKeys,
      generateArrayPrefix === "comma" && encodeValuesOnly && isArray$2(obj) ? null : encoder,
      filter,
      sort,
      allowDots,
      serializeDate2,
      format2,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
};
var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
  if (!opts) {
    return defaults$2;
  }
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  var charset = opts.charset || defaults$2.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var format2 = formats$1["default"];
  if (typeof opts.format !== "undefined") {
    if (!has$1.call(formats$1.formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format2 = opts.format;
  }
  var formatter = formats$1.formatters[format2];
  var filter = defaults$2.filter;
  if (typeof opts.filter === "function" || isArray$2(opts.filter)) {
    filter = opts.filter;
  }
  var arrayFormat;
  if (opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if ("indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = defaults$2.arrayFormat;
  }
  if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  }
  var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults$2.allowDots : !!opts.allowDots;
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$2.addQueryPrefix,
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults$2.allowEmptyArrays,
    arrayFormat,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$2.charsetSentinel,
    commaRoundTrip: !!opts.commaRoundTrip,
    delimiter: typeof opts.delimiter === "undefined" ? defaults$2.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults$2.encode,
    encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults$2.encodeDotInKeys,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$2.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$2.encodeValuesOnly,
    filter,
    format: format2,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$2.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$2.skipNulls,
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$2.strictNullHandling
  };
};
var stringify_1 = function(object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (isArray$2(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }
  var keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
  var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
  if (!objKeys) {
    objKeys = Object.keys(obj);
  }
  if (options.sort) {
    objKeys.sort(options.sort);
  }
  var sideChannel2 = getSideChannel2();
  for (var i2 = 0; i2 < objKeys.length; ++i2) {
    var key = objKeys[i2];
    var value = obj[key];
    if (options.skipNulls && value === null) {
      continue;
    }
    pushToArray(keys, stringify$1(
      value,
      key,
      generateArrayPrefix,
      commaRoundTrip,
      options.allowEmptyArrays,
      options.strictNullHandling,
      options.skipNulls,
      options.encodeDotInKeys,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel2
    ));
  }
  var joined = keys.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
};
var utils = utils$2;
var has = Object.prototype.hasOwnProperty;
var isArray$1 = Array.isArray;
var defaults$1 = {
  allowDots: false,
  allowEmptyArrays: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: false,
  comma: false,
  decodeDotInKeys: false,
  decoder: utils.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1e3,
  parseArrays: true,
  plainObjects: false,
  strictDepth: false,
  strictNullHandling: false,
  throwOnLimitExceeded: false
};
var interpretNumericEntities = function(str) {
  return str.replace(/&#(\d+);/g, function($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};
var parseArrayValue = function(val, options, currentArrayLength) {
  if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
    return val.split(",");
  }
  if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
    throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
  }
  return val;
};
var isoSentinel = "utf8=%26%2310003%3B";
var charsetSentinel = "utf8=%E2%9C%93";
var parseValues = function parseQueryStringValues(str, options) {
  var obj = { __proto__: null };
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
  cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var limit2 = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
  var parts2 = cleanStr.split(
    options.delimiter,
    options.throwOnLimitExceeded ? limit2 + 1 : limit2
  );
  if (options.throwOnLimitExceeded && parts2.length > limit2) {
    throw new RangeError("Parameter limit exceeded. Only " + limit2 + " parameter" + (limit2 === 1 ? "" : "s") + " allowed.");
  }
  var skipIndex = -1;
  var i2;
  var charset = options.charset;
  if (options.charsetSentinel) {
    for (i2 = 0; i2 < parts2.length; ++i2) {
      if (parts2[i2].indexOf("utf8=") === 0) {
        if (parts2[i2] === charsetSentinel) {
          charset = "utf-8";
        } else if (parts2[i2] === isoSentinel) {
          charset = "iso-8859-1";
        }
        skipIndex = i2;
        i2 = parts2.length;
      }
    }
  }
  for (i2 = 0; i2 < parts2.length; ++i2) {
    if (i2 === skipIndex) {
      continue;
    }
    var part = parts2[i2];
    var bracketEqualsPos = part.indexOf("]=");
    var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
    var key;
    var val;
    if (pos === -1) {
      key = options.decoder(part, defaults$1.decoder, charset, "key");
      val = options.strictNullHandling ? null : "";
    } else {
      key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, "key");
      val = utils.maybeMap(
        parseArrayValue(
          part.slice(pos + 1),
          options,
          isArray$1(obj[key]) ? obj[key].length : 0
        ),
        function(encodedVal) {
          return options.decoder(encodedVal, defaults$1.decoder, charset, "value");
        }
      );
    }
    if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
      val = interpretNumericEntities(String(val));
    }
    if (part.indexOf("[]=") > -1) {
      val = isArray$1(val) ? [val] : val;
    }
    var existing = has.call(obj, key);
    if (existing && options.duplicates === "combine") {
      obj[key] = utils.combine(obj[key], val);
    } else if (!existing || options.duplicates === "last") {
      obj[key] = val;
    }
  }
  return obj;
};
var parseObject = function(chain, val, options, valuesParsed) {
  var currentArrayLength = 0;
  if (chain.length > 0 && chain[chain.length - 1] === "[]") {
    var parentKey = chain.slice(0, -1).join("");
    currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
  }
  var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
  for (var i2 = chain.length - 1; i2 >= 0; --i2) {
    var obj;
    var root = chain[i2];
    if (root === "[]" && options.parseArrays) {
      obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils.combine([], leaf);
    } else {
      obj = options.plainObjects ? { __proto__: null } : {};
      var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
      var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
      var index2 = parseInt(decodedRoot, 10);
      if (!options.parseArrays && decodedRoot === "") {
        obj = { 0: leaf };
      } else if (!isNaN(index2) && root !== decodedRoot && String(index2) === decodedRoot && index2 >= 0 && (options.parseArrays && index2 <= options.arrayLimit)) {
        obj = [];
        obj[index2] = leaf;
      } else if (decodedRoot !== "__proto__") {
        obj[decodedRoot] = leaf;
      }
    }
    leaf = obj;
  }
  return leaf;
};
var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  }
  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
  var brackets2 = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g;
  var segment = options.depth > 0 && brackets2.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key;
  var keys = [];
  if (parent) {
    if (!options.plainObjects && has.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(parent);
  }
  var i2 = 0;
  while (options.depth > 0 && (segment = child.exec(key)) !== null && i2 < options.depth) {
    i2 += 1;
    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(segment[1]);
  }
  if (segment) {
    if (options.strictDepth === true) {
      throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
    }
    keys.push("[" + key.slice(segment.index) + "]");
  }
  return parseObject(keys, val, options, valuesParsed);
};
var normalizeParseOptions = function normalizeParseOptions2(opts) {
  if (!opts) {
    return defaults$1;
  }
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
    throw new TypeError("Decoder has to be a function.");
  }
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") {
    throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
  }
  var charset = typeof opts.charset === "undefined" ? defaults$1.charset : opts.charset;
  var duplicates = typeof opts.duplicates === "undefined" ? defaults$1.duplicates : opts.duplicates;
  if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
    throw new TypeError("The duplicates option must be either combine, first, or last");
  }
  var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults$1.allowDots : !!opts.allowDots;
  return {
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults$1.allowEmptyArrays,
    allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults$1.allowPrototypes,
    allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults$1.allowSparse,
    arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults$1.arrayLimit,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$1.charsetSentinel,
    comma: typeof opts.comma === "boolean" ? opts.comma : defaults$1.comma,
    decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults$1.decodeDotInKeys,
    decoder: typeof opts.decoder === "function" ? opts.decoder : defaults$1.decoder,
    delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
    depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults$1.depth,
    duplicates,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults$1.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults$1.plainObjects,
    strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults$1.strictDepth,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$1.strictNullHandling,
    throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
  };
};
var parse$1 = function(str, opts) {
  var options = normalizeParseOptions(opts);
  if (str === "" || str === null || typeof str === "undefined") {
    return options.plainObjects ? { __proto__: null } : {};
  }
  var tempObj = typeof str === "string" ? parseValues(str, options) : str;
  var obj = options.plainObjects ? { __proto__: null } : {};
  var keys = Object.keys(tempObj);
  for (var i2 = 0; i2 < keys.length; ++i2) {
    var key = keys[i2];
    var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
    obj = utils.merge(obj, newObj, options);
  }
  if (options.allowSparse === true) {
    return obj;
  }
  return utils.compact(obj);
};
var stringify2 = stringify_1;
var parse = parse$1;
var formats = formats$3;
var lib = {
  formats,
  parse,
  stringify: stringify2
};
var qs = lib;
function prepareURLs({
  APP: APP2,
  AUTH: AUTH2
}) {
  return {
    admin: `${APP2}#/admin/users/`,
    availability: `${APP2}/#/usage/availability/`,
    billing: `${AUTH2}/billing`,
    diffPage(sieveId, dataId1 = "", dataId2 = "") {
      return `#/u/${Api.identityId || 0}/sieve/${sieveId}/data/${dataId1}/diff?d2=${dataId2}`;
    },
    forums: `https://forums.distill.io`,
    groups: `${APP2}#/teams/`,
    logout: `${AUTH2}/logout`,
    sievePage(sieveId) {
      return `#/w/${Api.identityId || 0}/list/all/${sieveId}.id`;
    },
    sievesGotoPage: (route2, pageNumber) => {
      const base2 = getBasePath$1(route2);
      if (pageNumber == 0 || !pageNumber) {
        const query = { ...get_store_value(route2).query };
        delete query.page;
        const queryStr = qs.stringify(query);
        const newPath = queryStr ? `${base2}?${queryStr}` : base2;
        push$1(newPath);
      } else {
        const query = qs.stringify({ ...get_store_value(route2).query, page: pageNumber + 1 });
        const newPath = `${base2}?${query}`;
        push$1(newPath);
      }
    },
    usageAvailabilityForTeam: (teamId = ((_b) => (_b = ((_a) => (_a = get_store_value(params)) == null ? void 0 : _a.team)()) != null ? _b : 0)()) => {
      return `${APP2}/#/u/${teamId}/usage/availability/`;
    },
    usageDailyForTeam: (teamId) => {
      return `${APP2}/#/u/${teamId}/usage/daily/`;
    },
    usageMonthlyForTeam: (teamId) => {
      return `${APP2}/#/u/${teamId}/usage/monthly/`;
    },
    usageJobsForTeam: (teamId) => {
      return `${APP2}/#/u/${teamId}/usage/jobs/`;
    },
    crawlerDetail: (teamId, crawlerId) => {
      return `${APP2}/#/u/${teamId}/crawlers/${crawlerId}`;
    },
    crawlerJobDetail: (teamId, crawlerId, jobId) => {
      return `${APP2}/#/u/${teamId}/crawlers/${crawlerId}/${jobId}`;
    },
    crawlerDiffImport: (teamId, crawlerId, jobId1, jobId2) => {
      return `${APP2}/#/w/${teamId}/import/from-sitemap/?crawler_id=${crawlerId}&job_id1=${jobId1}${jobId2 ? `&job_id2=${jobId2}` : ""}`;
    },
    sieveRuleDebugger: (teamId, sieveId, oldDataId, newDataId) => {
      return `#/w/${teamId}/sieve/edit/${sieveId}.id?debug_conditions=${oldDataId}..${newDataId}`;
    },
    serviceLogin: (params2) => {
      return `${AUTH2}/service-login?redirect=` + encodeURIComponent(params2.href);
    },
    updateTeam: (oldTeamId, newTeamId) => {
      return get_store_value(location).replace(`/${oldTeamId != null ? oldTeamId : 0}/`, `/${newTeamId}/`);
    }
  };
}
function getBasePath$1(route2) {
  let { module, team, prefix, data } = get_store_value(route2);
  let base2 = `/w/${team}/${module}/${prefix}/`;
  if (data) {
    base2 = base2 + `${data}.d/`;
  }
  return base2;
}
const { AUTH, API, APP } = Service.CFG.URL;
const INBOX = "/ui/inbox.html";
var urlCfg = {
  ...prepareURLs({
    APP,
    AUTH
  }),
  api: API,
  app: APP,
  login: `${AUTH}/service-login?redirect=app://ui/inbox.html#`,
  settings: `${INBOX}#/settings/general`,
  website: `https://distill.io`,
  watchlist: `${INBOX}#/w/0/list/all/`
};
const defaults = { msg: "", _info: false, _error: false, actions: [] };
const Msg = new class {
  constructor() {
    Object.assign(this, writable(defaults));
  }
  info(msg, actions) {
    if (actions && !Array.isArray(actions)) {
      actions = [actions];
    }
    this.set({
      msg,
      _info: true,
      actions: actions || []
    });
  }
  error(msg, actions = void 0, details = void 0) {
    if (actions && !Array.isArray(actions)) {
      actions = [actions];
    }
    this.set({
      msg,
      details,
      _error: true,
      actions: actions || []
    });
  }
  reset() {
    this.set(defaults);
  }
  setMsg(options = {}) {
    if (typeof options === "string") {
      options = { info: options };
    }
    if (options.error) {
      this.error(options.error);
    } else if (options.info) {
      this.info(options.info);
    }
  }
  start(name, options) {
    this.setMsg(options);
  }
  stop(name, options) {
    this.reset();
    this.setMsg(options);
  }
}();
const Backbone$5 = window.Backbone;
if (!Backbone$5) {
  throw new Error("ADD Backbone");
}
var Base$4 = Backbone$5.View.extend({
  name: "Base",
  domo,
  bubbleEvent: function(name) {
    this.parent && this.parent.trigger(name);
  },
  bubbleAddEvent: function() {
    this.bubbleEvent("child:add");
  },
  bubbleRemoveEvent: function() {
    this.bubbleEvent("child:remove");
  },
  getRoot: function() {
    if (this.parent) {
      return this.parent.getRoot();
    }
    return this;
  },
  focus: _.debounce(function() {
    this.$el.find('[value=""],input:not([value]),textarea').first().focus();
  }, 100),
  initialize: function(options) {
    options || (options = {});
    this.options = options;
    _.bindAll(...[this].concat(_.functions(this)));
    this.children = [];
    this.name = options.name || this.name;
    options.parent && this.setParent(options.parent);
    this.listenTo(this, "child:add", this.bubbleAddEvent);
    this.listenTo(this, "child:remove", this.bubbleRemoveEvent);
    this.model && this.$el.attr("data-id", this.model.id);
    this.$el.attr("viewclass", this.name);
    this.postInit(options);
  },
  postInit: function(options) {
  },
  remove: function() {
    if (this.el.parentNode) {
      Base$4.__super__.remove.call(this);
      this.setParent(null);
      this.removeChildren();
      this.trigger("remove", this);
    }
  },
  removeChildren: function() {
    _.each(this.children.slice(0), function(child) {
      child.remove();
      this.trigger("child:remove");
    }, this);
  },
  setParent: function(parent) {
    if (this.parent) {
      this.parent.children = _.without(this.parent.children, this);
      this.parent.trigger("child:remove", this);
    }
    this.parent = parent;
    if (this.parent) {
      this.parent.children.push(this);
      this.parent.trigger("child:add", this);
    }
  }
});
var View$1 = { Base: Base$4 };
const _$5 = window._;
if (!_$5) {
  throw new Error("ADD _");
}
const types$1 = {};
function Def(name, __super__, members) {
  if (typeof __super__ == "object") {
    members = __super__;
    __super__ = void 0;
  }
  types$1[this.name = name] = this;
  this.__super__ = __super__;
  _$5.extend(this, members);
}
_$5.extend(Def.prototype, {
  is: function(name) {
    return this.name == name || this.__super__ && this.__super__.isType(name);
  },
  isValid: function(value, desc2) {
    return true;
  },
  format: identity$1,
  parse: identity$1
});
new Def("text"), new Def("integer", {
  isValid: function(value, desc2) {
    return !isNaN(this.parse(value));
  },
  parse: function(value) {
    return parseInt(value);
  }
}), new Def("number", {
  isValid: function(value, desc2) {
    return !isNaN(this.parse(value));
  },
  parse: function(value) {
    return parseFloat(value);
  }
}), new Def("email", "text", {
  isValid: function(value, desc2) {
    return /^[a-z0-9_.+-]+@[a-z0-9_.-]+\.[a-z0-9_.-]+$/i.test(value);
  }
}), new Def("phone", "text", {
  isValid: function(value, desc2) {
    return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value);
  }
}), new Def("tpl:text", "text", {
  params: [],
  isValid: function(value, desc2) {
    return true;
  }
}), new Def("tpl:html", "tpl:text", {
  isValid: function(value, desc2) {
    return this.__super__.isValid(value, desc2);
  }
}), new Def("url", "text", {
  isValid: function(value, desc2) {
    return /^([a-z]*\:\w*)/.test(value) && value.indexOf(" ") < 0;
  }
}), new Def("json", {
  isValid: function(value, desc2) {
    try {
      JSON.parse(value);
    } catch (e2) {
      return false;
    }
    return true;
  },
  format: function(value) {
    return JSON.stringify(value, null, "  ");
  },
  parse: function(text) {
    return _$5.isEmpty(text) ? {} : JSON.parse(text);
  }
}), new Def("dict"), new Def("css", "text", {
  isValid: function(value, desc2) {
    try {
      document.querySelector(value);
      return true;
    } catch (e2) {
      return false;
    }
  }
}), new Def("js", "text", {
  isValid: function(value, desc2) {
    return true;
  }
}), new Def("xpath", "text", {
  isValid: function(value, desc2) {
    try {
      document.createExpression(value, function(prefix) {
        if (prefix == "x" || prefix == "xhtml" || prefix == "html") {
          return "http://www.w3.org/1999/xhtml";
        }
      });
      return true;
    } catch (e2) {
      return false;
    }
  }
}), new Def("regexp", "text", {
  isValid: function(value, desc2) {
    try {
      new RegExp(value.expr, value.flags);
      return true;
    } catch (e2) {
      return false;
    }
  }
}), new Def("enum", "text", {
  isValid: function(value, desc2) {
    return _$5.indexOf(_$5.pluck(desc2.list, "value"), value) >= 0;
  }
}), new Def("file", {});
var Types = _$5.extend(types$1, {
  Def,
  get: function(name) {
    return types$1[name];
  },
  reg: function(name, type2) {
    if (typeof type2 == "string") {
      type2 = types$1[type2];
    }
    types$1[name] = type2;
  }
});
function identity$1(value) {
  return value;
}
const $$3 = window.jQuery;
if (!$$3) {
  throw new Error("ADD jQuery");
}
const _$4 = window._;
if (!_$4) {
  throw new Error("ADD _");
}
const async = window.async;
if (!async) {
  throw new Error("ADD async");
}
const domo$2 = window.domo;
if (!domo$2) {
  throw new Error("ADD domo");
}
const moment$2 = window.moment;
if (!moment$2) {
  throw new Error("ADD moment");
}
const Backbone$4 = window.Backbone;
if (!Backbone$4) {
  throw new Error("ADD Backbone");
}
const CLASS_HIDE = "hidden";
var Base$3 = View$1.Base.extend({
  initialize: function(options) {
    const param = this.param = options.param || { name: "param" };
    const type2 = Types.get(options.type || param.type) || this.type;
    if (type2 == null) {
      throw new Error("Editor with unknown type: " + type2);
    }
    this.type = type2;
    Base$3.__super__.initialize.call(this, options);
    this.model || (this.model = new Backbone$4.Model());
    this.listenTo(this.model, "change:" + param.name, this.resetValue);
    this.plugins = _$4.map(param.plugins, function(cls) {
      return new cls(type2, param, this);
    }, this);
  },
  acquire: function() {
    this.acquireRefs();
    this.renderPlugins();
    this.postRender();
    return this;
  },
  acquireRefs: function() {
  },
  isValid: function() {
    const rawValue = this.getRawValue();
    return !(this.param.must && _$4.isEmpty(rawValue)) && this.type.isValid(rawValue, this.param);
  },
  getValue: function() {
    const raw = this.getRawValue();
    return this.type.parse(raw);
  },
  postRender: function() {
  },
  remove: function() {
    Base$3.__super__.remove.call(this);
    _$4.each(this.plugins, function(plugin) {
      plugin.unload();
    });
  },
  render: function() {
    this.renderBase();
    this.renderPlugins();
    this.postRender();
    return this;
  },
  renderBase: function() {
  },
  renderPlugins: function() {
    _$4.each(this.plugins, function(plugin) {
      plugin.render();
    });
  },
  resetValue: function(model, changes, options) {
    if (options && options.source == "editor") {
      return;
    }
    let value = this.model.get(this.param.name);
    if (value === void 0) {
      value = this.param.defaultValue;
    }
    if (this.getValue() !== value) {
      this.setValue(value);
    }
  },
  setValue: function(value) {
  }
});
const Static = Base$3.extend({
  name: "Static",
  type: Types.text,
  postInit: function() {
    this.listenTo(this.model, "change", this.render);
  },
  renderBase: function() {
    this.$el.text(this.model.get(this.param.name));
    this.$field = this.$el;
    this.field = this.el;
  }
});
const Formatted = Base$3.extend({
  name: "Formatted",
  acquireRefs: function() {
    const $field = this.$el.find("input,textarea,select");
    this.field = $field[0];
    this.$help = $field.next(".help,.help-inline,.help-block");
    this.classHide = this.$help.hasClass("invisible") ? "invisible" : CLASS_HIDE;
    if (!this.field) {
      console.error("Failed to acquire refs for:", this);
      throw new Error("Editor failed to acquire refs");
    }
    const modelValue = this.model.get(this.param.name);
    if (_$4.isUndefined(modelValue)) {
      const value = this.getValue();
      if (!_$4.isEmpty(value) && _$4.isEmpty(this.model.get(this.param.name))) {
        this.model.set(this.param.name, value);
        const self2 = this;
        _$4.delay(function() {
          self2.trigger("change", this, value);
        }, 0);
      }
    }
  },
  getRawValue: function() {
    return this.field.value;
  },
  getFormatted: function(value) {
    return value !== void 0 ? this.type.format(value) : void 0;
  },
  setRawValue: function(value) {
    this.field.value = value;
  },
  setValue: function(value) {
    const formatted = value && this.getFormatted(value);
    if (formatted !== void 0)
      this.setRawValue(formatted);
    if (this.model.get(this.param.name) != value) {
      this.model.set(this.param.name, value);
    }
  }
});
const Hidden = Formatted.extend({
  name: "Hidden",
  type: Types.text
});
const BaseFieldEdit = Formatted.extend({
  inputClass: "form-control xform-control-sm",
  type: Types.text,
  hideError: function() {
    this.$el.removeClass("has-error");
  },
  onBlur: function() {
    this.validate();
  },
  onChange: function() {
    if (this.isValid()) {
      const value = this.getValue();
      this.hideError();
      this.model.set(this.param.name, value, { source: "editor" });
      this.trigger("change", this, value);
    } else {
      this.showError();
    }
  },
  onFocus: function() {
  },
  onInput: _$4.debounce(function() {
    this.onChange();
  }, 400),
  onKeypress: function(e2) {
    if (e2.keyCode == 13) {
      this.onChange();
    }
  },
  postRender: function() {
    this.$el.addClass("xeditor control-group");
    $$3(this.field).change(this.onChange).focus(this.onFocus).blur(this.onBlur).keypress(this.onKeypress);
    this.resetValue();
  },
  renderBase: function() {
    const help = this.param.help;
    this.$el.empty().append(
      this.field = this.renderField(),
      help ? P({ "class": "help " }, TXT(help)) : ""
    );
    this.$field = $$3(this.field);
    this.$help = this.$(".help");
  },
  showError: function() {
    this.$el.addClass("has-error");
  },
  validate: function() {
    if (this.isValid())
      ;
    else {
      this.showError();
    }
  }
});
const InputEdit = BaseFieldEdit.extend({
  name: "InputEdit",
  className: "xtext",
  inputType: "text",
  renderField: function() {
    const placeholder = this.param.placeholder || this.param.label;
    return INPUT({
      "placeholder": placeholder ? TXT(placeholder) : "",
      "type": this.inputType,
      "class": this.inputClass + " inline"
    });
  }
});
const PasswordEdit = InputEdit.extend({
  name: "PasswordEdit",
  inputType: "password"
});
const EmailEdit = InputEdit.extend({
  name: "EmailEdit",
  className: "xemail",
  type: Types.email
});
const IntegerEdit = InputEdit.extend({
  name: "IntegerEdit",
  className: "xnumber",
  type: Types.integer,
  inputType: "number"
});
const NumberEdit = InputEdit.extend({
  name: "NumberEdit",
  className: "xnumber",
  type: Types.number,
  inputType: "number"
});
const DurationEdit = IntegerEdit.extend({
  name: "DurationEdit",
  className: "xduration",
  type: Types.duration
});
const PhoneEdit = InputEdit.extend({
  name: "PhoneEdit",
  className: "xphone",
  type: Types.phone
});
const TextTplEdit = InputEdit.extend({
  name: "TextTplEdit",
  className: "xtpltext",
  type: Types.get("tpl:text")
});
const RichTextEdit = InputEdit.extend({
  name: "RichTextEdit",
  className: "xrichtext",
  renderField: function() {
    return TEXTAREA({
      "class": this.inputClass,
      "placeholder": TXT(this.param.label || "NA")
    });
  }
});
const HTMLTplEdit = RichTextEdit.extend({
  name: "HTMLTplEdit",
  className: "xhtmltext",
  type: Types.get("tpl:html")
});
const URLEdit = InputEdit.extend({
  name: "URLEdit",
  className: "xurl flex items-stretch",
  type: Types.url
});
const RegExpEdit = BaseFieldEdit.extend({
  name: "RegExpEdit",
  className: "xregexp",
  type: Types.regexp,
  getValue: function() {
    return {
      expr: this.elExpr.value,
      flags: this.elFlags.value
    };
  },
  postRender: function() {
    this.$el.addClass("xeditor control-group");
    $$3([this.elExpr, this.elFlags]).change(this.onChange).focus(this.onFocus).blur(this.onBlur).keypress(this.onKeypress);
    this.resetValue();
  },
  renderField: function() {
    return DIV(
      { "class": "flex" },
      this.elExpr = INPUT({
        "placeholder": TXT("l_regexp"),
        "type": "text",
        "class": this.inputClass + " xre-expr flex-auto mr2"
      }),
      this.elFlags = INPUT({
        "placeholder": TXT("l_flags"),
        "type": "text",
        "class": this.inputClass + " xre-flag w-16"
      })
    );
  },
  getRawValue: function() {
    return this.getValue();
  },
  setValue: function(value) {
    const oldValue = this.model.get(this.param.name) || {};
    value || (value = {});
    this.elExpr.value = value.expr || "";
    this.elFlags.value = value.flags || "gim";
    if (!_$4.isEqual(oldValue, value)) {
      this.model.set(this.param.name, value);
    }
  }
});
const MacroEdit = Base$3.extend({
  name: "MacroEdit",
  type: Types.macro,
  getValue: function() {
    return this.value;
  },
  setValue: function(value) {
    this.value = value || {};
  },
  acquireRefs: function() {
    throw new Error("Not supported");
  },
  renderBase: function() {
    throw new Error("Not implemented");
  }
});
const XPathEdit = InputEdit.extend({
  name: "XPathEdit",
  className: "xxpath",
  type: Types.xpath
});
const CSSEdit = InputEdit.extend({
  name: "CSSEdit",
  className: "xcss",
  type: Types.css
});
const JSEdit = RichTextEdit.extend({
  name: "JSEdit",
  className: "xjs",
  type: Types.js
});
const JSONEdit = RichTextEdit.extend({
  name: "JSONEdit",
  className: "xjson",
  type: Types.json
});
const EnumEdit = BaseFieldEdit.extend({
  name: "EnumEdit",
  className: "xenum",
  type: Types.get("enum"),
  getItemLabel: function(item) {
    return TXT(item.label);
  },
  postInit: function() {
    this.list = this.param.list;
  },
  renderField: function() {
    const self2 = this;
    const options = _$4.map(this.list, function(aItem) {
      if (_$4.isString(aItem)) {
        return OPTION({ value: aItem }, aItem ? TXT(aItem) : "");
      } else {
        let attributes3 = { value: aItem.value };
        if (!!aItem.title) {
          attributes3.title = TXT(aItem.title);
        }
        return OPTION(attributes3, aItem ? self2.getItemLabel(aItem) : "");
      }
    });
    let attributes2 = {};
    if (!!this.param.title) {
      attributes2.title = TXT(this.param.title);
    }
    return SELECT(attributes2, options);
  },
  setList: function(list) {
    this.list = list;
    this.render();
  }
});
var Property = View$1.Base.extend({
  name: "Property",
  className: "row",
  initialize: function(options) {
    Property.__super__.initialize.call(this, options);
    this.$el.on("change", this.updateModel);
  },
  render: function() {
    const self2 = this;
    let btnDel;
    this.$el.append(
      DIV(
        { "class": "col-xs-1" },
        btnDel = BUTTON(
          { "class": "btn btn-default xbtn-light" },
          I({ "class": "fa fa-trash-o" })
        )
      ),
      DIV(
        { "class": "col-xs-3" },
        this.elKey = INPUT({
          "class": "form-control xform-control-sm inline",
          "placeholder": "name",
          "value": this.model.get("key")
        })
      ),
      DIV(
        { "class": "col-xs-8" },
        this.elValue = INPUT({
          "class": "form-control xform-control-sm inline",
          "placeholder": "value",
          "value": this.model.get("value")
        })
      )
    );
    btnDel.onclick = function() {
      self2.trigger("request:delete", self2);
    };
    return this;
  },
  updateModel: function() {
    this.model.set({
      key: this.elKey.value,
      value: this.elValue.value
    });
  }
});
var DictEdit = BaseFieldEdit.extend({
  name: "DictEdit",
  className: "xdict",
  type: Types.dict,
  action_add: function() {
    this.addOne("", "");
  },
  addOne: function(key, value) {
    const propertyEditor = new Property({
      model: new Backbone$4.Model({ key, value }),
      parent: this
    });
    propertyEditor.render();
    this.listenTo(propertyEditor, "request:delete", this.onDelete);
    this.listenTo(propertyEditor.model, "change", this.onPropertyChange);
    this.elList.appendChild(propertyEditor.el);
    this.propertyEditors.push(propertyEditor);
  },
  getRawValue: function() {
    return this.getValue();
  },
  getValue: function() {
    return _$4.reduce(this.propertyEditors, function(memo, editor) {
      memo[editor.model.get("key")] = editor.model.get("value");
      return memo;
    }, {});
  },
  initialize: function(options) {
    DictEdit.__super__.initialize.call(this, options);
    this.propertyEditors = [];
  },
  onDelete: function(editor) {
    editor.remove();
    this.propertyEditors = _$4.without(this.propertyEditors, editor);
    this.onChange();
  },
  onPropertyChange: function(model) {
    this.onChange();
  },
  postRender: function() {
    this.resetValue();
  },
  renderField: function() {
    let btnAdd;
    let el;
    el = DIV(
      DIV(
        { "class": "xpad-vertical" },
        btnAdd = BUTTON(
          { "class": "btn btn-default btn-sm xbtn-light" },
          I({ "class": "fa fa-plus" }),
          " " + TXT(this.param.fieldLabel)
        )
      ),
      this.elList = DIV({})
    );
    btnAdd.onclick = this.action_add;
    return el;
  },
  setValue: function(value) {
    const self2 = this;
    const oldValue = this.model.get(this.param.name) || {};
    value || (value = {});
    _$4.each(this.propertyEditors, function(editor) {
      editor.remove();
    });
    this.propertyEditors = [];
    _$4.each(value, function(value2, key) {
      self2.addOne(key, value2);
    });
    if (!_$4.isEqual(oldValue, value)) {
      this.model.set(this.param.name, value);
    }
  }
});
const FileEdit = InputEdit.extend({
  name: "FileEdit",
  inputType: "file"
});
const views = {
  "css": CSSEdit,
  "duration": DurationEdit,
  "email": EmailEdit,
  "enum": EnumEdit,
  "file": FileEdit,
  "hidden": Hidden,
  "integer": IntegerEdit,
  "js": JSEdit,
  "json": JSONEdit,
  "macro": MacroEdit,
  "number": NumberEdit,
  "password": PasswordEdit,
  "phone": PhoneEdit,
  "regexp": RegExpEdit,
  "request_headers": DictEdit,
  "request_data": DictEdit,
  "static": Static,
  "text": InputEdit,
  "textarea": RichTextEdit,
  "tpl:text": TextTplEdit,
  "tpl:html": HTMLTplEdit,
  "url": URLEdit,
  "xpath": XPathEdit
};
function Plugin(type2, param, editor) {
  this.type = type2;
  this.param = param;
  this.editor = editor;
  this.load(param, editor);
}
_$4.extend(Plugin.prototype, Backbone$4.Events, {
  load: function(param, editor) {
  },
  render: function() {
  },
  unload: function() {
    this.off();
  }
});
Plugin.extend = View$1.Base.extend;
const SelectOptionsPlugin = Plugin.extend({
  attrLabel: "value",
  attrValue: "value",
  loadData: function(collection) {
    $$3(this.separator).attr("label", "");
    $$3(this.separator).nextAll().remove();
    collection.each(function(model) {
      this.select.appendChild(this.renderOption(model));
    }, this);
    this.editor.resetValue();
    if (_$4.isEmpty(this.editor.getValue()) && collection.length > 0) {
      this.editor.setValue(collection.at(0).get(this.attrValue));
    }
  },
  render: function() {
    const self2 = this;
    $$3(this.editor.field).wrap(SPAN({
      "class": "xwrap"
    })).addClass("hide").before(this.select = SELECT());
    this.editor.field = this.select;
    this.renderDefaults();
    this.renderActions();
    this.separator = OPTGROUP();
    this.select.appendChild(this.separator);
    $$3(this.select).change(function() {
      const value = self2.select.value;
      if (value.indexOf("action:") == 0) {
        self2[value.replace(":", "_")]();
        self2.reset();
      }
    });
  },
  renderActions: function() {
  },
  renderDefaults: function() {
    this.select.appendChild(
      OPTION(
        { value: "", tag: "defaults" },
        i18n.sprintf(
          TXT("a_action_object"),
          TXT("a_select"),
          TXT(this.param.label || "")
        )
      )
    );
  },
  renderOption: function(model) {
    return OPTION({
      value: model.get(this.attrValue)
    }, this.getOptionLabel(model));
  },
  getOptionLabel: function(model) {
    return model.get(this.attrLabel);
  },
  reset: function() {
    if (this.attrs.length > 0) {
      this.select.value = "";
    } else {
      this.select.value = "";
    }
  }
});
Plugin.extend({
  load: function(param, editor) {
    editor.on("change", function(editor2, value) {
      localStorage.setItem("editor:" + param.name, value);
    });
    let localStorageValue = localStorage.getItem("editor:" + param.name);
    if (!!localStorageValue) {
      param.defaultValue = localStorageValue;
    } else {
      localStorage.setItem("editor:" + param.name, editor.model.get(param.name));
    }
  }
});
var Editor = {
  create: function(type2, options) {
    if (typeof type2 == "object") {
      options = type2;
      if (!options.param || !options.param.type) {
        throw new Error("Invalid editor param: " + JSON.stringify(options));
      }
      type2 = options.param.type;
    }
    const Cls = views[type2];
    if (Cls == null)
      throw new Error("View type not registered: " + type2);
    return new Cls(options);
  },
  get: function(type2) {
    return views[type2];
  },
  reg: function(type2, Cls) {
    views[type2] = Cls;
  },
  Plugin,
  SelectOptionsPlugin
};
const $$2 = window.jQuery;
if (!$$2) {
  throw new Error("ADD jQuery");
}
const _$3 = window._;
if (!_$3) {
  throw new Error("ADD _");
}
const Backbone$3 = window.Backbone;
if (!Backbone$3) {
  throw new Error("ADD Backbone");
}
const Acts = function() {
  let actions = null;
  let view = null;
  function act(name, param, originalTarget) {
    const action = actions && actions[name];
    if (!action) {
      console.error("action not found:" + name);
      return false;
    }
    const context = action.context;
    let fn = action.fn;
    if (_$3.isString(fn)) {
      fn = context[fn];
    }
    if (!fn) {
      return console.error("Function not found: " + action.fn);
    }
    return fn.call(context, param, originalTarget);
  }
  function updateActions() {
    actions = view.getActions();
  }
  return {
    act,
    setActions: function(_actions) {
      actions = _actions;
    },
    setView(_view) {
      if (view) {
        view.off("child:add child:on", updateActions);
      }
      view = _view;
      view.on("child:add child:on", updateActions);
    }
  };
}();
$$2(document).delegate("[data-action]", {
  click: function(event) {
    if (event.actDone)
      return;
    const target = event.currentTarget;
    const name = target.dataset.action;
    let param = target.dataset.actionParam || "";
    if (name == "void 0") {
      event.actDone = true;
      return;
    }
    if (param.charAt(0) == "@") {
      param = $$2(target).attr(param.slice(1));
    } else if (param.charAt(0) == "$") {
      param = param.slice(1);
      const indexSpace = param.indexOf(" ");
      const fn = param.slice(0, indexSpace);
      const path = param.slice(indexSpace + 1);
      const lioAt = path.lastIndexOf("@");
      const el = path.slice(0, lioAt);
      param = $$2(target)[fn](el).attr(path.slice(lioAt + 1));
    }
    if (Acts.act(name, param, target) !== false) {
      event.preventDefault();
      event.actDone = true;
    }
  }
});
Backbone$3.Model.prototype.eget = function(name, v) {
  v = this.get(name);
  return v ? _$3.escape(v) : v;
};
if (typeof console == "undefined") {
  window.console = {
    error: function() {
      alert("unexpected error:" + _$3.toArray(arguments).join(":"));
    },
    log: function() {
    },
    warn: function() {
    }
  };
}
var Core = {
  Acts,
  ID: function(x2) {
    return function() {
      return x2 += 1;
    };
  }(1)
};
const domo$1 = window.domo;
if (!domo$1) {
  throw new Error("ADD domo");
}
const $$1 = window.jQuery;
if (!$$1) {
  throw new Error("ADD jQuery");
}
const Backbone$2 = window.Backbone;
if (!Backbone$2) {
  throw new Error("ADD Backbone");
}
var Base$2 = Backbone$2.View.extend({
  name: "Base",
  domo: domo$1,
  bubbleEvent: function() {
    this.trigger(...arguments);
    this.parent && this.parent.bubbleEvent(...arguments);
  },
  getRoot: function() {
    if (this.parent) {
      return this.parent.getRoot();
    }
    return this;
  },
  focus: _.debounce(function() {
    this.$el.find('[value=""],input:not([value]),textarea').first().focus();
  }, 100),
  initialize: function(options) {
    options || (options = {});
    this.options = options;
    _.bindAll(...[this].concat(_.functions(this)));
    this.children = [];
    this.name = options.name || this.name;
    options.parent && this.setParent(options.parent);
    this.model && this.$el.attr("data-id", this.model.id);
    this.$el.attr({ viewclass: this.name, cid: this.cid });
    this.postInit(options);
  },
  postInit: function(options) {
  },
  remove: function() {
    if (this.el.parentNode) {
      Base$2.__super__.remove.call(this);
      this.setParent(null);
      this.removeChildren();
      this.trigger("remove", this);
    }
  },
  removeChildren: function() {
    _.each(this.children.slice(0), function(child) {
      child.remove();
      this.bubbleEvent("child:remove");
    }, this);
  },
  setParent: function(parent) {
    if (this.parent) {
      this.parent.children = _.without(this.parent.children, this);
      this.parent.bubbleEvent("child:remove", this);
    }
    this.parent = parent;
    if (this.parent) {
      this.parent.children.push(this);
      this.parent.bubbleEvent("child:add", this);
    }
  }
});
const Activable = Base$2.extend({
  name: "Activable",
  active: true,
  setActive: function(active) {
    if (this.active != active) {
      this.active = active;
      this.trigger("active", active);
    }
  }
});
const ActionProvider = Activable.extend({
  name: "ActionProvider",
  actions: {},
  getActions: function() {
    if (this.active) {
      return _.reduce(this.children, function(memo, child) {
        return _.extend(memo, child.getActions && child.getActions());
      }, contextifyActions(this));
    }
    function contextifyActions(view) {
      return _.reduce(view.actions, function(memo, action, name) {
        memo[name] = _.extend({ context: view }, action);
        return memo;
      }, {});
    }
  }
});
var Form = ActionProvider.extend({
  name: "Form",
  tagName: "form",
  event_keypress: function(e2) {
    if (e2.keyCode == "\r".charCodeAt(0)) {
      return this.onSubmit();
    }
  },
  event_submit: function(e2) {
    return this.onSubmit();
  },
  clear: function() {
    this.$el.find("input").val("");
  },
  initialize: function(options) {
    Form.__super__.initialize.call(this, options);
    this.$el.on("submit", this.event_submit);
    this.$el.on("keypress", this.event_keypress);
  },
  onError: function(errors) {
  },
  onSubmit: function() {
    const errors = this.validateFields();
    if (!_.isEmpty(errors)) {
      this.onError(errors);
      return false;
    }
    return this.submit();
  },
  submit: function() {
    return true;
  },
  validateFields: function() {
    return null;
  }
});
const SimpleForm = Form.extend({
  name: "SimpleForm",
  className: "form-horizontal",
  fields: [],
  afterRender: function() {
  },
  onError: function(errors) {
    _.each(this.editors, function(editor) {
      editor.validate();
    });
  },
  render: function() {
    this.$el.attr({
      action: this.options.action || "",
      method: this.options.method || "post"
    });
    this.renderEditors();
    return this;
  },
  renderEditors: function() {
    const self2 = this;
    self2.editors = _.map(self2.fields, function(field) {
      const editor = Editor.create(field.type, {
        param: field,
        parent: self2,
        model: self2.model,
        label: field.label,
        form: true
      });
      self2.el.appendChild(editor.render().el);
      return editor;
    });
    self2.afterRender();
  },
  validateFields: function() {
    const errors = _.filter(this.editors, function(editor) {
      return !editor.isValid();
    }, this);
    return errors;
  }
});
const Frame$1 = ActionProvider.extend({
  name: "Frame",
  tagName: "iframe",
  attributes: {
    frameborder: 0,
    style: "width: 100%;"
  },
  render: function() {
    this.rendered = true;
    this.iframe = this.el;
    this.iframe.src = this.getFrameURL();
    this.iframe.onload = _.bind(this.initializeFrame, this);
    return this;
  },
  getFrameURL: function() {
    return "about:blank";
  },
  initializeFrame: function() {
  }
});
var XDFrame = Frame$1.extend({
  name: "XDFrame",
  getFrameURL: function() {
    return this.model.get("host") + "/" + this.name + "#" + this.model.id;
  },
  initialize: function(options) {
    XDFrame.__super__.initialize.call(this, options);
    this.options = options;
    this.responseHandlers = {};
  },
  initializeFrame: function() {
    window.addEventListener("message", _.bind(this.onMessage, this));
  },
  onMessage: function(e2) {
    if (e2.source != this.iframe.contentWindow || this.model.get("host") != e2.origin)
      return;
    const data = typeof e2.data === "string" ? JSON.parse(e2.data) : e2.data;
    if (data.type == "response") {
      const handler = this.responseHandlers[data._id];
      if (handler) {
        delete this.responseHandlers[data._id];
        handler(data.err, data.data);
      }
    } else if (data.type == "event") {
      this.trigger("app", data.data, this);
      if (typeof this["on_" + data.data.type] == "function") {
        this["on_" + data.data.type](data.data);
      }
    } else {
      console.error("Unhandled message type:", data);
    }
  },
  request: function(path, data, callback) {
    const _id = Core.ID();
    callback || (callback = function() {
    });
    this.responseHandlers[_id] = callback;
    let msg = {
      _id,
      type: "request",
      path,
      data
    };
    window.IE && (msg = JSON.stringify(msg));
    this.iframe.contentWindow.postMessage(msg, this.model.get("host"));
  }
});
const Routed = ActionProvider.extend({
  name: "Routed",
  getRouter: function() {
    return this.parent.getRouter();
  },
  routePrefix: function() {
    const prefix = this.options.routePrefix;
    return _.isUndefined(prefix) ? this.name : prefix;
  },
  route: function(frags) {
    frags = _.toArray(arguments);
    frags.unshift(_.result(this, "routePrefix"));
    this.parent.route(frags.join("/"));
  }
});
const RoutedRoot = Routed.extend({
  name: "RoutedRoot",
  actions: {
    "nav": {
      fn: "action_nav"
    }
  },
  action_nav: function(name) {
    Backbone$2.history.navigate(name, true);
  },
  postInit: function(options) {
    this.router = options.router;
    this.on("child:add child:remove", _.debounce(this.updateActions, 10));
  },
  route: function(fragment) {
    this.router.navigate(fragment || "", true);
  },
  getRouter: function() {
    return this.router;
  },
  setRouter: function(router) {
    this.router = router;
  },
  updateActions: function() {
    Core.Acts.setActions(this.getActions());
  }
});
const Menu = ActionProvider.extend({
  name: "Menu",
  tagName: "ul",
  className: "dropdown-menu",
  actions: {
    noop: { fn: "noop" }
  },
  noop: function() {
  },
  events: {
    "click a": "event_click"
  },
  event_click: function(event) {
    this.trigger("click", event.target.dataset, event);
  },
  render: function() {
    const items = this.options.items;
    this.$el.append(
      _.map(items, function(item) {
        const a3 = A({ href: "#", class: "dropdown-item" }, TXT(item.label));
        _.each(item.data, function(value, key) {
          a3.dataset[key] = value;
        });
        return LI(a3);
      })
    ).attr("data-action", "noop");
    return this;
  }
});
const ContextMenu = Menu.extend({
  name: "ContextMenu",
  hide: function() {
    this.$el.remove();
    this.removeChildren();
    this.stopListening();
    $$1(window).off("click", this.onAClick).off("keypress", this.onKeyup);
    this.id = null;
  },
  onAClick: function(e2) {
    const target = e2.target;
    if (($$1.contains(document.documentElement, target) || document.documentElement == target) && !$$1.contains(this.el, target) && $$1(target).parents(".dropdown-menu").length == 0) {
      this.hide();
    }
  },
  onKeyup: function(e2) {
    if (e2.keyCode == 27) {
      this.hide();
    }
  },
  renderMenu: function() {
  },
  show: function() {
    const ref2 = this.ref;
    const parent = $$1(ref2).offsetParent();
    const offset = $$1(ref2).position();
    $$1(this.el).css({
      "display": "block",
      "left": 0,
      "color": "#333",
      "font-weight": 300
    }).css({
      top: offset.top + ref2.offsetHeight,
      left: Math.min(
        offset.left + 10,
        parent.width() - this.el.offsetWidth - 10
      )
    }).attr("data-action", "noop");
  },
  toggle: function(id, ref2) {
    if (this.id === id) {
      this.off();
      this.hide();
      return;
    }
    if (this.id)
      this.hide();
    this.id = id;
    this.ref = ref2;
    this.renderMenu();
    this.$el.appendTo(ref2.parentNode);
    this.show();
    _.defer(function(self2) {
      $$1(window).click(self2.onAClick).keyup(self2.onKeyup);
    }, this);
  }
});
const Dropdown = ActionProvider.extend({
  name: "Dropdown",
  className: "dropdown dropup",
  actionTag: "a",
  postInit: function(options) {
    this.menu = options.menu;
    this.label = options.label;
  },
  render: function() {
    const elAction = this.renderAction();
    this.$el.append(
      elAction,
      this.menu.render().el
    ).css("font-weight", "initial");
    return this;
  },
  renderAction: function() {
    const caret = SPAN({ "class": "caret" });
    const elLabel = this.elLabel = SPAN(this.label);
    return this.actionTag == "a" ? A({
      "class": "dropdown-toggle",
      "data-toggle": "dropdown",
      "href": "#"
    }, elLabel, " ", caret) : BUTTON({
      "class": "btn btn-default dropdown-toggle",
      "data-toggle": "dropdown"
    }, elLabel, " ", caret);
  },
  setLabel: function(label) {
    this.label = label;
    if (this.elLabel) {
      $$1(this.elLabel).text(TXT(this.label));
    }
  }
});
var Panel = ActionProvider.extend({
  name: "Panel",
  className: "card panel-default",
  bodyClass: "card-body",
  headerClass: "card-header",
  title: "Title",
  postInit: function(options) {
    _.extend(this, _.pick(
      options,
      "toolbarActions",
      "title",
      "view",
      "bodyClass",
      "headerClass"
    ));
    this.view && this.listenTo(this.view, "remove", this.remove);
  },
  remove: function() {
    this.view && this.view.remove();
    Panel.__super__.remove.call(this);
  },
  render: function() {
    const views2 = [];
    const header = this.renderHeader();
    const view = this.renderView();
    const footer = this.footer = this.renderFooter();
    if (header) {
      views2.push(DIV({ "class": this.headerClass }, header));
    }
    $$1(view).addClass(this.bodyClass).css("clear", "both");
    views2.push(view);
    if (footer) {
      views2.push(footer);
    }
    this.$el.append(views2);
    return Panel.__super__.render.call(this);
  },
  renderHeader: function() {
    let extraEl;
    let actions;
    const header = DIV(
      actions = DIV({ "class": "xtbar pull-right" }),
      H3(TXT(this.title), extraEl = SMALL())
    );
    _.each(this.toolbarActions, function(action, index2) {
      actions.appendChild(
        A(_.extend({
          "class": index2 == 0 ? "btn btn-primary" : "btn"
        }, action.attrs), TXT(action.label))
      );
    });
    this.options.titleEx && $$1(extraEl).empty().append(" ", SMALL(TXT(this.options.titleEx)));
    return header;
  },
  renderFooter: function() {
  },
  renderView: function() {
    return this.view.render().el;
  }
});
var Modal = Panel.extend({
  name: "Modal",
  actions: { "modal close": { fn: "action_discard" } },
  toolbarActions: [
    {
      label: "\u2715",
      attrs: {
        "data-action": "modal close",
        "class": "close",
        "title": "Close"
      }
    }
  ],
  action_discard: function() {
    this.trigger("discard");
    this.remove();
  },
  render: function() {
    Modal.__super__.render.call(this);
    const opts = this.options;
    const top = opts.top === void 0 ? 0 : opts.top;
    const dimens = _.extend({
      width: 800
    }, _.pick(opts, "height", "width"));
    const wrapped = this.el;
    const parent = this.el.parentNode;
    const wrap = domo$1.DIV(
      { "class": "xmodal" },
      wrapped,
      domo$1.DIV({ "class": "xbg" })
    );
    parent && parent.appendChild(wrap);
    this.el = wrap;
    this.$el = Backbone$2.$(this.el);
    if (opts.maxHeight) {
      this.view.$el.css({
        maxHeight: opts.maxHeight,
        overflow: "auto"
      });
    }
    $$1(wrapped).css(dimens).addClass("xraised");
    if (opts.position == "absolute") {
      this.$el.css("top", $$1(window).scrollTop() + top);
    } else {
      this.$el.css({ position: "fixed", top });
    }
    return this;
  },
  show: function() {
    $$1("body").append(this.render().el);
    this.focus();
    return this;
  }
});
const SaveDiscardModal = Modal.extend({
  action_discard: function() {
    this.trigger("discard");
    const callback = this.options.discard;
    callback && callback(this);
  },
  action_save: function() {
    this.trigger("save");
    const callback = this.options.save;
    callback && callback(this);
  },
  renderFooter: function() {
    const footer = DIV(
      { "class": "card-footer btn-toolbar" },
      this.save = BUTTON({
        "class": "btn " + (this.options.okBtnClass || "btn-primary"),
        "data-loading-text": TXT("l_loading")
      }, TXT(this.options.a_save || "a_save")),
      this.discard = BUTTON({
        "class": "btn btn-default ml-2"
      }, TXT(this.options.a_discard || "a_discard"))
    );
    this.discard.onclick = this.action_discard;
    this.save.onclick = this.action_save;
    return footer;
  },
  showProgress: function(show) {
    if (show === false) {
      $$1(this.save).button("reset");
    } else {
      $$1(this.save).button("loading");
    }
  }
});
const PromptModal = SaveDiscardModal.extend({
  title: "l_prompt",
  a_save: "a_save",
  action_discard: function() {
    this.trigger("discard");
    this.remove();
  },
  renderView: function() {
    return DIV(
      { "class": "form" },
      DIV(
        { "class": "form-group" },
        LABEL({
          "class": "control-label"
        }, TXT(this.options.msg || " ")),
        DIV(this.view ? this.view.render().el : ""),
        this.alert = DIV({ "class": "alert alert-error hide" })
      )
    );
  },
  showAlert: function(msg) {
    if (msg) {
      $$1(this.alert).html(TXT(msg)).removeClass("hide").removeClass("invisible");
    } else {
      $$1(this.alert).addClass("invisible");
    }
  }
});
var Collection$3 = ActionProvider.extend({
  name: "Collection",
  _getModelId: function(model) {
    return model.id || model.cid;
  },
  addOne: function(model) {
    throw new Error("addOne not implemented!");
  },
  initialize: function(options) {
    const self2 = this;
    this.initCollection(options);
    this.views = {};
    this.listenTo(this.collection, "add", function(model) {
      self2.views[self2._getModelId(model)] = self2.addOne(model);
    });
    this.listenTo(this.collection, "remove", this.removeOne);
    this.listenTo(this.collection, "reset", this.onReset);
    Collection$3.__super__.initialize.call(this, options);
  },
  initCollection: function(options) {
    this.collection = options.collection || options.model;
  },
  onReset: function(collection, options) {
    this.resetList(options.previousModels);
    if (this.rendered) {
      this.renderList();
    }
  },
  removeOne: function(model) {
    const id = this._getModelId(model);
    const view = this.views[id];
    if (view) {
      view.remove();
      delete this.views[id];
    }
  },
  render: function() {
    this.renderBase();
    this.renderList();
    this.rendered = true;
    return this;
  },
  renderBase: function() {
  },
  renderList: function() {
    const self2 = this;
    this.views = this.collection.reduce(function(views2, model) {
      views2[self2._getModelId(model)] = self2.addOne(model);
      return views2;
    }, this.views);
  },
  resetList: function(oldModels) {
    _.each(oldModels, this.removeOne);
  }
});
const Entities = Collection$3.extend({
  name: "Entities",
  ViewClass: Base$2,
  removeModelView: function() {
    if (this.modelView) {
      this.modelView.remove();
    }
    this.modelView = this.model = null;
  },
  renderModelView: function(model, view) {
    throw new Error("Override renderModelView()");
  },
  showModelView: function(model) {
    if (!this.ViewClass) {
      throw new Error("ViewClass not set.", model);
    }
    if (this.modelView) {
      if (this.modelView.model == model) {
        return this.modelView;
      }
      this.removeModelView();
    }
    this.modelView = new this.ViewClass({
      model,
      parent: this,
      ...this.ViewOptions
    });
    this.renderModelView(model, this.modelView);
    return this.modelView;
  }
});
const Summary = Base$2.extend({
  name: "Summary",
  className: "xsummary",
  render: function() {
    this.$el.append(
      DIV(CLS("xmask")),
      DIV(CLS("xinfo"))
    );
  }
});
var View = {
  ActionProvider,
  Activable,
  Base: Base$2,
  Collection: Collection$3,
  Dropdown,
  ContextMenu,
  Entities,
  Form,
  Frame: Frame$1,
  Menu,
  Modal,
  PromptModal,
  Panel,
  Routed,
  RoutedRoot,
  SaveDiscardModal,
  SimpleForm,
  Summary,
  XDFrame
};
const _$2 = window._;
const FETCH_CANCELLATION_ERROR = "Fetch cancelled in favor of a newer fetch";
if (!_$2) {
  throw new Error("ADD _");
}
const Backbone$1 = window.Backbone;
if (!Backbone$1) {
  throw new Error("ADD Backbone");
}
async function sync(method, model, options) {
  if (!Api.api) {
    Api.on("init", function() {
      sync(method, model, options);
    });
    return;
  }
  model.syncing.set(true);
  model.syncErr.set(null);
  const url2 = _$2.result(model, "url") || urlError();
  let data = options.data;
  let headers = options.headers;
  if (data == null && model && (method === "create" || method === "update" || method === "patch")) {
    data = options.attrs || model.toJSON(options);
  }
  let xhr;
  model.trigger("request", model, xhr, options);
  try {
    xhr = options.xhr = await Api.api({
      url: url2,
      method,
      json: data,
      headers
    });
    options.success && options.success(xhr);
  } catch (err) {
    options.error && options.error({ ...err, data });
    model.syncErr.set(err);
    throw err;
  } finally {
    model.syncing.set(false);
  }
  return xhr;
}
async function syncBatch(changes) {
  const dels = _$2.map(changes.dels, function(model) {
    return {
      method: "DELETE",
      url: _$2.result(model, "url") || urlError()
    };
  });
  const posts = _$2.map(changes.posts, function(model) {
    return {
      method: "POST",
      url: _$2.result(model, "url") || urlError(),
      body: model.toJSON()
    };
  });
  const puts = _$2.map(changes.puts, function(model) {
    return {
      method: "PUT",
      url: _$2.result(model, "url") || urlError(),
      body: _$2.pick(...[model.toJSON()].concat(_$2.keys(model.changedAttributes())))
    };
  });
  const requests = [].concat(dels, posts, puts);
  if (requests.length == 0) {
    return false;
  }
  return await Api.batch(requests);
}
var urlError = function() {
  throw new Error('A "url" property or function must be specified');
};
const origModelFetch = Backbone$1.Model.prototype.fetch;
Backbone$1.Model.prototype.fetch = async function(options) {
  options || (options = {});
  let promise = new Promise((resolve, reject) => {
    origModelFetch.call(this, {
      ...options,
      error: function(...args) {
        options.error && options.error(...args);
        reject(args[1]);
      },
      success: function(...args) {
        options.success && options.success(...args);
        resolve(args);
      }
    });
  });
  return promise;
};
const origModelSave = Backbone$1.Model.prototype.save;
Backbone$1.Model.prototype.save = async function(key, value, options) {
  let data;
  if (arguments.length == 3) {
    data = { [key]: value };
  } else {
    data = key;
    options = value;
  }
  options || (options = {});
  return new Promise((resolve, reject) => {
    origModelSave.call(this, data, {
      ...options,
      error: function(...args) {
        options.error && options.error(...args);
        reject(args[1]);
      },
      success: function(...args) {
        options.success && options.success(...args);
        resolve(args);
      }
    });
  });
};
const origCollectionCreate = Backbone$1.Collection.prototype.create;
Backbone$1.Collection.prototype.create = async function(attributes2, options) {
  options || (options = {});
  return new Promise((resolve, reject) => {
    origCollectionCreate.call(this, attributes2, {
      ...options,
      error: function(...args) {
        options.error && options.error(...args);
        reject(args[1]);
      },
      success: function(model, resp) {
        options.success && options.success(model, resp, options);
        resolve(model);
      }
    });
  });
};
const origCollectionFetch = Backbone$1.Collection.prototype.fetch;
Backbone$1.Collection.prototype.fetch = async function(options) {
  options || (options = {});
  let promise = new Promise((resolve, reject) => {
    origCollectionFetch.call(this, {
      ...options,
      error: function(...args) {
        options.error && options.error(...args);
        reject(args[1]);
      },
      success: function(...args) {
        options.success && options.success(...args);
        resolve(args);
      }
    });
  });
  return promise;
};
Backbone$1.Model.prototype.clone = function() {
  const json2 = this.toJSON();
  const model = new this.constructor(json2, { parse: true });
  model.props = _$2.clone(this.props);
  return model;
};
const Model$3 = Backbone$1.Model.extend({
  sync,
  encodedFields: [],
  initialize(...args) {
    Model$3.__super__.initialize.call(this, ...args);
    this._listeners = [];
    this.syncing = writable(false);
    this.syncErr = writable(null);
    this.listenTo(this, "change", this._notify);
    this.attributes = new Proxy(this.attributes, {
      set: (obj, key, value) => {
        let oldValue = obj[key];
        if (oldValue !== value) {
          obj[key] = value;
          this._notify();
          this.trigger("change:" + key, this, value, oldValue);
        }
        return true;
      }
    });
  },
  _notify() {
    for (let listener of this._listeners) {
      listener(this.attributes);
    }
  },
  subscribe(listener) {
    this._listeners.push(listener);
    listener(this.attributes);
    return () => {
      this._listeners.splice(this._listeners.indexOf(listener), 1);
    };
  },
  parse(response) {
    _$2.each(this.encodedFields, function(name) {
      const text = response[name];
      if (_$2.isString(text)) {
        let obj = null;
        try {
          obj = JSON.parse(text);
        } catch (e2) {
          console.error("Invalid model json attribute:", name, text, e2);
        }
        response[name] = obj;
      }
    });
    return response;
  },
  prop(name, value) {
    this.props || (this.props = {});
    if (arguments.length == 2) {
      const oldVal = _$2.result(this.props, name);
      if (oldVal === value)
        return;
      this.props[name] = value;
      this.trigger("prop:" + name, value, oldVal);
      if (this.collection) {
        this.collection.trigger("prop:" + name, value, oldVal, this);
      }
    } else {
      return _$2.result(this.props, name);
    }
  },
  toJSON() {
    const json2 = Backbone$1.Model.prototype.toJSON.call(this);
    _$2.each(this.encodedFields, function(name) {
      const obj = json2[name];
      if (!_$2.isEmpty(obj)) {
        json2[name] = JSON.stringify(obj);
      }
    });
    return json2;
  }
});
const Collection$2 = Backbone$1.Collection.extend({
  model: Model$3,
  sync,
  initialize(...args) {
    Collection$2.__super__.initialize.call(this, ...args);
    this._listeners = [];
    this._query = {};
    this._opt = {};
    this.syncing = writable(false);
    this.syncErr = writable(null);
    this._activeFetch = null;
    this._queuedFetch = null;
    this.listenTo(this, "add", this._notify);
    this.listenTo(this, "change", this._notify);
    this.listenTo(this, "remove", this._notify);
    this.listenTo(this, "reset", this._notify);
  },
  _notify() {
    for (let listener of this._listeners) {
      listener(this);
    }
  },
  fetch(options = {}) {
    var _a;
    let data = options.data || {};
    let _opt = { ...(_a = data._opt) != null ? _a : {}, ...this._opt };
    options.data = { ...data, ...this._query, _opt };
    options.headers = this.headers;
    if (this._activeFetch) {
      if (this._queuedFetch && this._queuedFetch.reject) {
        this._queuedFetch.reject(
          new Error(FETCH_CANCELLATION_ERROR)
        );
      }
      return new Promise((resolve, reject) => {
        this._queuedFetch = { options, resolve, reject };
      });
    }
    const fetchPromise = Collection$2.__super__.fetch.call(this, options);
    this._activeFetch = fetchPromise;
    fetchPromise.finally(() => {
      this._activeFetch = null;
      if (this._queuedFetch) {
        const { options: queuedOptions, resolve, reject } = this._queuedFetch;
        this._queuedFetch = null;
        this.fetch(queuedOptions).then(resolve).catch((error) => {
          if (error.message === FETCH_CANCELLATION_ERROR) {
            resolve(null);
          } else {
            reject(error);
          }
        });
      }
    });
    return fetchPromise;
  },
  parse: function(res) {
    return res.data;
  },
  subscribe(listener) {
    this._listeners.push(listener);
    listener(this);
    return () => {
      this._listeners.splice(this._listeners.indexOf(listener), 1);
    };
  },
  setQuery(q2) {
    this._query = q2;
  },
  getQuery(q2) {
    return this._query;
  },
  setOpt(opt) {
    this._opt = opt;
  },
  setHeaders(headerObj) {
    if (typeof headerObj !== "object") {
      throw new Error("header must be an object");
    }
    this.headers = headerObj;
  }
});
const PagedCollection = Collection$2.extend({
  currentPage: 0,
  limit: 20,
  total_count: 0,
  orderBy: "-ts",
  initialize(models = [], options = {}) {
    PagedCollection.__super__.initialize.call(this, models, options);
    _$2.extend(this, _$2.pick(options, "limit", "orderBy"));
  },
  getOpts() {
    return {
      limit: this.limit,
      offset: this.currentPage * this.limit,
      order: [this.orderBy]
    };
  },
  goto(page, options) {
    this.currentPage = parseInt(page || "0", 10);
    this._notify();
    return this.fetch(options).catch((error) => {
      if (error.message === FETCH_CANCELLATION_ERROR) {
        return null;
      }
      throw error;
    });
  },
  hasNext() {
    let { currentPage, nPages } = this.info();
    return currentPage < nPages - 1;
  },
  hasPrev() {
    return this.currentPage > 0;
  },
  info() {
    let { currentPage, limit: limit2, orderBy, total_count } = this;
    let count = this.models.length;
    return {
      count,
      currentPage,
      nPages: Math.ceil(total_count / limit2),
      offset: currentPage * limit2,
      limit: limit2,
      orderBy,
      total_count: total_count || 0
    };
  },
  onNext() {
    this.hasNext() && this.goto(this.currentPage + 1);
  },
  onPrev() {
    this.hasPrev() && this.goto(this.currentPage - 1);
  },
  parse(res) {
    this.total_count = res.total_count;
    return res.data;
  },
  sync(method, self2, options) {
    options.data = options.data || {};
    options.data._opt = _$2.extend(this.getOpts(), options.data._opt);
    return sync(method, self2, options);
  }
});
var base$1 = {
  sync,
  syncBatch,
  Model: Model$3,
  Collection: Collection$2,
  PagedCollection
};
class UserPermissions extends base$1.Model {
  constructor(user) {
    super();
    this.user = user;
    params.subscribe((paramsSubValue) => {
      var _a;
      paramsSubValue != null ? paramsSubValue : paramsSubValue = {
        team: "0"
      };
      (_a = paramsSubValue.team) != null ? _a : paramsSubValue.team = "0";
      let attrs = {
        "team": paramsSubValue.team,
        readOnly: !user.hasEditPermissions(paramsSubValue.team)
      };
      this.set(attrs);
    });
  }
}
const PREFS_DEFAULT = {
  ui_diff: {
    removed: false,
    snipped: false
  },
  summary: {
    enabled: false
  },
  error_actions: [{
    trigger: false,
    sieve_filter: "",
    minimum_time_interval: 5,
    number_of_consecutive_errors: 3
  }]
};
const User = base$1.Model.extend({});
const Self = User.extend({
  url: "/users/self/init",
  initialize(...args) {
    Self.__super__.initialize.call(this, ...args);
    this.permissionsModel = new UserPermissions(this);
  },
  defaults() {
    return {
      constraint: { interval: 5 },
      prefs: PREFS_DEFAULT,
      features: {}
    };
  },
  getPref(key, { groupId } = { groupId: "0" }) {
    if (groupId && groupId !== "0") {
      return this.get("groups").find((g) => g.id === groupId).prefs[key] || PREFS_DEFAULT[key];
    }
    return this.attributes.prefs[key] || PREFS_DEFAULT[key];
  },
  getErrorActionsPref({ groupId } = { groupId: "0" }) {
    return this.getPref("errorActions", { groupId });
  },
  async updateErrorActionsPref(newErrorActions, { groupId } = { groupId: "0" }) {
    await Api.api("/prefs/errorActions", "PUT", newErrorActions);
    if (groupId === "0") {
      this.attributes.prefs = {
        ...this.attributes.prefs,
        errorActions: newErrorActions
      };
    } else {
      if (!groupId) {
        throw new Error(`invalid groupId, ${groupId}, passed for updating errorActions`);
      }
      const groups = this.get("groups");
      const group = groups.find((g) => g.id === groupId);
      group.prefs = { ...group.prefs, errorActions: newErrorActions };
    }
  },
  setSummaryPrefs(summaryPrefs, { groupId } = { groupId: "0" }) {
    if (groupId && groupId !== "0") {
      return this.get("groups").find((g) => g.id === groupId).prefs["summary"] = summaryPrefs;
    }
    this.attributes.prefs.summary = summaryPrefs;
    this.trigger("change:summary", summaryPrefs);
  },
  setDiffPrefs(diffPrefs) {
    this.attributes.prefs.ui_diff = diffPrefs;
    this.trigger("change:ui_diff", diffPrefs);
  },
  isLoggedIn() {
    return !!this.attributes.id;
  },
  isEnterprise() {
    return !!this.attributes.account_id;
  },
  isFlexi() {
    return this.attributes.constraint.flexi;
  },
  isFree() {
    return !this.isLoggedIn() || [C$1.PLAN_ID_FREE, C$1.PLAN_ID_VOID].includes(this.attributes.constraint.plan_id);
  },
  getPermissions(teamId = "0") {
    if (teamId === "0") {
      return {
        edit: true,
        admin: true
      };
    }
    const teams = this.get("groups");
    if (!teams || teams.length === 0) {
      return {
        edit: false,
        admin: false
      };
    }
    const team = teams.find((t2) => t2.id === teamId);
    if (!team) {
      return {
        edit: false,
        admin: false
      };
    }
    return team.permissions;
  },
  hasEditPermissions(teamId = "0") {
    const permissions = this.getPermissions(teamId);
    return !!(permissions.edit || permissions.admin);
  }
});
const { Model: Model$2, Collection: Collection$1 } = base$1;
const UserAttr = Model$2.extend({
  urlRoot: "/users/attrs",
  isVerified() {
    return this.get("state") == C$1.STATE_ATTR_VERIFY_DONE;
  },
  isPrimary() {
    return this.get("name") == "email" && this.get("value") == window.App.user.get("email");
  }
});
const UserAttrs = Collection$1.extend({
  model: UserAttr,
  url: "/users/attrs"
});
var AttrModel = {
  UserAttr,
  UserAttrs
};
const Client = base$1.Model.extend({
  urlRoot: "/clients",
  getIcon: function() {
    let iconClass;
    const clientType = this.get("type");
    if (this.iconClass) {
      return this.iconClass;
    } else if (this.id == Clients.webAppId) {
      iconClass = "fa fa-cloud";
    } else if (this.id == App.clients.defaultId) {
      iconClass = "im-pc";
    } else if (clientType == C$1.CLIENT_FF) {
      iconClass = "im-firefox";
    } else if (clientType == C$1.CLIENT_CR) {
      iconClass = "im-chrome";
    } else if (clientType == C$1.CLIENT_OP) {
      iconClass = "im-opera";
    } else if (clientType == C$1.CLIENT_FFWX) {
      iconClass = "im-firefox";
    } else {
      iconClass = "im-globe";
    }
    return this.iconClass = iconClass;
  },
  getInfo: function() {
    let info = this.get("info") || this.get("name");
    if (this.id == App.clients.defaultId) {
      info += " (this device)";
    }
    return info;
  },
  isWeb: function() {
    return this.id === Clients.webAppId;
  },
  isExtension() {
    return [
      C$1.CLIENT_SF,
      C$1.CLIENT_FFWX,
      C$1.CLIENT_CR,
      C$1.CLIENT_OP,
      C$1.CLIENT_MSE,
      C$1.CLIENT_ANY
    ].includes(this.get("type"));
  }
});
var Clients = base$1.Collection.extend({
  model: Client,
  url: "/clients",
  fetch(options = { data: { "state.in": [0, 30], "_opt": { order: ["ts"] } } }) {
    return Clients.__super__.fetch.call(this, options);
  }
}, {
  webAppId: C$1.CLIENT_ID_WEB,
  anyLocalId: C$1.CLIENT_ID_ANY
});
var ModelClient = {
  Client,
  Clients
};
const Macro$1 = base$1.Model.extend({
  urlRoot: "/macro",
  hasParams() {
    var _a, _b;
    return ((_b = (_a = this.get("spec")) == null ? void 0 : _a.params) == null ? void 0 : _b.length) > 0;
  },
  getRequiredParams() {
    if (!this.hasParams()) {
      return [];
    }
    const params2 = this.get("spec").params;
    return params2.filter((p) => {
      if (p.dataType === "boolean") {
        return p.default == null;
      }
      return _.isEmpty(p.default);
    });
  },
  getParam(name) {
    var _a, _b;
    return (_b = (_a = this.get("spec")) == null ? void 0 : _a.params) == null ? void 0 : _b.find((p) => p.name === name);
  },
  validateSieveConfig(config) {
    const requiredParams = this.getRequiredParams();
    if (requiredParams.length === 0) {
      return;
    }
    const configJSON = config.toJSON();
    const requiredParamNames = requiredParams.map((p) => p.name);
    const validParamNamesFromConfig = Object.keys((configJSON == null ? void 0 : configJSON.params) || {}).filter((pName) => {
      const param = this.getParam(pName);
      if (!param) {
        return false;
      }
      const value = configJSON.params[pName];
      if (param.dataType === "boolean") {
        return value != null;
      }
      return !_.isEmpty(value);
    });
    const missingParams = requiredParamNames.filter((p) => !validParamNamesFromConfig.includes(p));
    if (missingParams.length === 0) {
      return;
    }
    throw new Error(`'${missingParams[0]}' is required for Macro - ${this.get("name")}`);
  }
});
var MacroModel = {
  Macro: Macro$1
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = /* @__PURE__ */ new WeakMap();
const directive = (f) => (...args) => {
  const d3 = f(...args);
  directives.set(d3, true);
  return d3;
};
const isDirective = (o) => {
  return typeof o === "function" && directives.has(o);
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
const reparentNodes = (container, start2, end = null, before = null) => {
  while (start2 !== end) {
    const n = start2.nextSibling;
    container.insertBefore(start2, before);
    start2 = n;
  }
};
const removeNodes = (container, start2, end = null) => {
  while (start2 !== end) {
    const n = start2.nextSibling;
    container.removeChild(start2);
    start2 = n;
  }
};
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const noChange = {};
const nothing = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
const boundAttributeSuffix = "$lit$";
class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = [];
    const walker = document.createTreeWalker(element.content, 133, null, false);
    let lastPartIndex = 0;
    let index2 = -1;
    let partIndex = 0;
    const { strings, values: { length } } = result;
    while (partIndex < length) {
      const node = walker.nextNode();
      if (node === null) {
        walker.currentNode = stack.pop();
        continue;
      }
      index2++;
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attributes2 = node.attributes;
          const { length: length2 } = attributes2;
          let count = 0;
          for (let i2 = 0; i2 < length2; i2++) {
            if (endsWith(attributes2[i2].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings[partIndex];
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({ type: "attribute", index: index2, name, strings: statics });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings2 = data.split(markerRegex);
          const lastIndex = strings2.length - 1;
          for (let i2 = 0; i2 < lastIndex; i2++) {
            let insert2;
            let s3 = strings2[i2];
            if (s3 === "") {
              insert2 = createMarker();
            } else {
              const match2 = lastAttributeNameRegex.exec(s3);
              if (match2 !== null && endsWith(match2[2], boundAttributeSuffix)) {
                s3 = s3.slice(0, match2.index) + match2[1] + match2[2].slice(0, -boundAttributeSuffix.length) + match2[3];
              }
              insert2 = document.createTextNode(s3);
            }
            parent.insertBefore(insert2, node);
            this.parts.push({ type: "node", index: ++index2 });
          }
          if (strings2[lastIndex] === "") {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings2[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index2 === lastPartIndex) {
            index2++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index2;
          this.parts.push({ type: "node", index: index2 });
          if (node.nextSibling === null) {
            node.data = "";
          } else {
            nodesToRemove.push(node);
            index2--;
          }
          partIndex++;
        } else {
          let i2 = -1;
          while ((i2 = node.data.indexOf(marker, i2 + 1)) !== -1) {
            this.parts.push({ type: "node", index: -1 });
            partIndex++;
          }
        }
      }
    }
    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }
}
const endsWith = (str, suffix) => {
  const index2 = str.length - suffix.length;
  return index2 >= 0 && str.slice(index2) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
const createMarker = () => document.createComment("");
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i2 = 0;
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.setValue(values[i2]);
      }
      i2++;
    }
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts2 = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts2.length) {
      part = parts2[partIndex];
      if (!isTemplatePartActive(part)) {
        this.__parts.push(void 0);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part2 = this.processor.handleTextExpression(this.options);
        part2.insertAfterNode(node.previousSibling);
        this.__parts.push(part2);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", { createHTML: (s3) => s3 });
const commentMarker = ` ${marker} `;
class TemplateResult {
  constructor(strings, values, type2, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type2;
    this.processor = processor;
  }
  getHTML() {
    const l = this.strings.length - 1;
    let html2 = "";
    let isCommentBinding = false;
    for (let i2 = 0; i2 < l; i2++) {
      const s3 = this.strings[i2];
      const commentOpen = s3.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s3.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = lastAttributeNameRegex.exec(s3);
      if (attributeMatch === null) {
        html2 += s3 + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        html2 += s3.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }
    html2 += this.strings[l];
    return html2;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    let value = this.getHTML();
    if (policy !== void 0) {
      value = policy.createHTML(value);
    }
    template.innerHTML = value;
    return template;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive$1 = (value) => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
const isIterable = (value) => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i2 = 0; i2 < strings.length - 1; i2++) {
      this.parts[i2] = this._createPart();
    }
  }
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts2 = this.parts;
    if (l === 1 && strings[0] === "" && strings[1] === "") {
      const v = parts2[0].value;
      if (typeof v === "symbol") {
        return String(v);
      }
      if (typeof v === "string" || !isIterable(v)) {
        return v;
      }
    }
    let text = "";
    for (let i2 = 0; i2 < l; i2++) {
      text += strings[i2];
      const part = parts2[i2];
      if (part !== void 0) {
        const v = part.value;
        if (isPrimitive$1(v) || !isIterable(v)) {
          text += typeof v === "string" ? v : String(v);
        } else {
          for (const t2 of v) {
            text += typeof t2 === "string" ? t2 : String(t2);
          }
        }
      }
    }
    text += strings[l];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}
class AttributePart {
  constructor(committer) {
    this.value = void 0;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== noChange && (!isPrimitive$1(value) || value !== this.value)) {
      this.value = value;
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (isDirective(this.value)) {
      const directive2 = this.value;
      this.value = noChange;
      directive2(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
}
class NodePart {
  constructor(options) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.options = options;
  }
  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  insertAfterNode(ref2) {
    this.startNode = ref2;
    this.endNode = ref2.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());
    part.__insert(this.endNode = createMarker());
  }
  insertAfterPart(ref2) {
    ref2.__insert(this.startNode = createMarker());
    this.endNode = ref2.endNode;
    ref2.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    const value = this.__pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive$1(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance2 = new TemplateInstance(template, value.processor, this.options);
      const fragment = instance2._clone();
      instance2.update(value.values);
      this.__commitNode(fragment);
      this.value = instance2;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === void 0) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = void 0;
    this.__pendingValue = void 0;
    if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = noChange;
  }
}
class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
}
class PropertyPart extends AttributePart {
}
let eventOptionsSupported = false;
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (_e) {
  }
})();
class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = (e2) => this.handleEvent(e2);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
}
const getOptions = (o) => o && (eventOptionsSupported ? { capture: o.capture, passive: o.passive, once: o.once } : o.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class DefaultTemplateProcessor {
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];
    if (prefix === ".") {
      const committer2 = new PropertyCommitter(element, name.slice(1), strings);
      return committer2.parts;
    }
    if (prefix === "@") {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === "?") {
      return [new BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new NodePart(options);
  }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: /* @__PURE__ */ new WeakMap(),
      keyString: /* @__PURE__ */ new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);
  if (template === void 0) {
    template = new Template(result, result.getTemplateElement());
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
const templateCaches = /* @__PURE__ */ new Map();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = /* @__PURE__ */ new WeakMap();
const render = (result, container, options) => {
  let part = parts.get(container);
  if (part === void 0) {
    removeNodes(container, container.firstChild);
    parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
if (typeof window !== "undefined") {
  (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.4.1");
}
const html = (strings, ...values) => new TemplateResult(strings, values, "html", defaultTemplateProcessor);
class Base$1 {
  constructor(initialState = {}, options) {
    Object.assign(this, options);
    this.el = this.el || document.createElement(this.tag);
    this.el.setAttribute("viewclass", this._getCName());
    this.state = new Proxy(initialState, {
      set: (obj, prop, value) => {
        if (obj[prop] !== value) {
          obj[prop] = value;
          !this._renderTimeout && this._render();
        }
        return true;
      },
      deleteProperty: (target, prop) => {
        if (prop in target) {
          delete target[prop];
          !this._renderTimeout && this._render();
          return true;
        }
        return false;
      }
    });
    this.views = new Proxy({}, {
      set: (obj, prop, value) => {
        if (obj[prop] !== value) {
          obj[prop] = value;
          this._render();
        }
        return true;
      }
    });
    this.init();
    this._render();
  }
  createTpl() {
    throw new Error(`View should implement createTpl(state)`);
  }
  init() {
  }
  _render() {
    if (this._renderTimeout) {
      clearTimeout(this._renderTimeout);
    }
    this._renderTimeout = setTimeout(() => {
      delete this._renderTimeout;
      render(this.createTpl(this.state), this.el);
      this.afterRender();
    }, 1);
  }
  afterRender() {
  }
  setState(newState) {
    for (const key in newState) {
      if (this.state[key] !== newState[key]) {
        this.state[key] = newState[key];
      }
    }
  }
  _getCName() {
    return this.constructor.name;
  }
}
Base$1.prototype.tag = "div";
let _$1 = typeof window !== "undefined" ? window._ : null;
let C = typeof window !== "undefined" ? window.C : null;
(async () => {
  if (!_$1) {
    _$1 = await __vitePreload(() => import("./index-all.47d5e6a1.js"), true ? [] : void 0);
  }
  if (!C) {
    ({ default: C } = await __vitePreload(() => Promise.resolve().then(function() {
      return _const;
    }), true ? void 0 : void 0));
  }
})();
function findNumbers(text, numberFormat) {
  if (!numberFormat) {
    numberFormat = C.NUM_FORMAT_COMMA_DOT;
  }
  switch (numberFormat) {
    case C.NUM_FORMAT_DOT_COMMA:
      return findNumbersDotComma(text);
    case C.NUM_FORMAT_SPACE_COMMA:
      return findNumbersSpaceComma(text);
    case C.NUM_FORMAT_COMMA_DOT:
      return findNumbersCommaDot(text);
    default:
      throw new Error("unknown number format:" + numberFormat);
  }
}
function containsText(text1, text2) {
  if (!_$1.isString(text1)) {
    throw new Error("invalid type of text: " + typeof text1);
  }
  text2 || (text2 = "");
  if (!_$1.isString(text2)) {
    throw new Error("invalid type of text: " + typeof text2);
  }
  return text1.toLowerCase().includes(text2.toLowerCase());
}
function findNumbersCommaDot(text) {
  let matches = text ? text.match(/-*[0-9,.]+/g) || [] : [];
  let numbers = [];
  for (let i2 = 0, len = matches.length; i2 < len; i2 += 1) {
    let a_num = matches[i2];
    if (a_num.length > 0) {
      a_num = parseFloat(a_num.replace(/([\s,]*)/g, ""));
      if (!isNaN(a_num)) {
        numbers.push(a_num);
      }
    }
  }
  return numbers;
}
function findNumbersDotComma(text) {
  let matches = text ? text.match(/-*[0-9,.]+/g) || [] : [];
  let numbers = [];
  for (let i2 = 0, len = matches.length; i2 < len; i2 += 1) {
    let a_num = matches[i2];
    if (a_num.length > 0) {
      a_num = a_num.replace(/\./g, "*");
      a_num = a_num.replace(/,/g, ".");
      a_num = a_num.replace(/\.(?=.*\.)/g, "");
      a_num = a_num.replace(/\*/g, "");
      a_num = parseFloat(a_num);
      if (!isNaN(a_num)) {
        numbers.push(a_num);
      }
    }
  }
  return numbers;
}
const getOldOperand = (leftOperand) => {
  const newToOld = {
    "$diff.new": "$diff.old",
    "$new": "$old",
    "$summary.new": "$summary.old"
  };
  for (let [newOperand, oldOperand] of Object.entries(newToOld)) {
    if (leftOperand.startsWith(newOperand)) {
      return oldOperand + leftOperand.substring(newOperand.length);
    }
  }
  throw new Error("unreachable ", leftOperand);
};
function findNumbersSpaceComma(text) {
  let matches = text ? text.match(/-*[\d,.\s]+/g) || [] : [];
  let numbers = [];
  for (let i2 = 0, len = matches.length; i2 < len; i2 += 1) {
    let a_num = matches[i2];
    if (a_num.length > 0) {
      a_num = a_num.replace(/\s/g, "");
      a_num = a_num.replace(/\./g, "");
      a_num = a_num.replace(/,(?=.*,)/g, "");
      a_num = a_num.replace(",", ".");
      a_num = parseFloat(a_num);
      if (!isNaN(a_num)) {
        numbers.push(a_num);
      }
    }
  }
  return numbers;
}
const intoString = (val) => {
  if (val === void 0)
    return "";
  if (typeof val === "string")
    return val;
  return JSON.stringify(val);
};
const defs = {
  contains: {
    id: "contains",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return containsText(left, right);
    },
    fieldType: "text"
  },
  not_contains: {
    id: "not_contains",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return !containsText(left, right);
    },
    fieldType: "text"
  },
  starts_with: {
    id: "starts_with",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return left.startsWith(right);
    },
    fieldType: "text"
  },
  not_starts_with: {
    id: "not_starts_with",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return !left.startsWith(right);
    },
    fieldType: "text"
  },
  ends_with: {
    id: "ends_with",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return left.endsWith(right);
    },
    fieldType: "text"
  },
  not_ends_with: {
    id: "not_ends_with",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return !left.endsWith(right);
    },
    fieldType: "text"
  },
  is_empty: {
    id: "is_empty",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return _$1.isEmpty(left);
    },
    fieldType: null
  },
  not_is_empty: {
    id: "not_is_empty",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return !_$1.isEmpty(left);
    },
    fieldType: null
  },
  has_num_lt: {
    id: "has_num_lt",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      return _$1.any(numbers, function(num) {
        return num < right;
      });
    },
    fieldType: "number"
  },
  has_num_gt: {
    id: "has_num_gt",
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      return _$1.any(numbers, function(num) {
        return num > right;
      });
    },
    fieldType: "number"
  },
  has_num_decr_min: {
    id: "has_num_decr_min",
    match: (leftOperand, right, context) => {
      let oldOperand = getOldOperand(leftOperand);
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      let oldText = intoString(getVar(oldOperand, context));
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      for (var i2 = Math.min(numbers.length, oldNumbers.length) - 1; i2 >= 0; i2 -= 1) {
        if (oldNumbers[i2] - numbers[i2] > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: "number"
  },
  has_num_incr_min: {
    id: "has_num_incr_min",
    match: (leftOperand, right, context) => {
      let oldOperand = getOldOperand(leftOperand);
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      let oldText = intoString(getVar(oldOperand, context));
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      for (var i2 = Math.min(numbers.length, oldNumbers.length) - 1; i2 >= 0; i2 -= 1) {
        if (numbers[i2] - oldNumbers[i2] > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: "number"
  },
  has_num_decr_pct_min: {
    id: "has_num_decr_pct_min",
    match: (leftOperand, right, context) => {
      let oldOperand = getOldOperand(leftOperand);
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      let oldText = intoString(getVar(oldOperand, context));
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      for (var i2 = Math.min(numbers.length, oldNumbers.length) - 1; i2 >= 0; i2 -= 1) {
        const percentChange = (oldNumbers[i2] - numbers[i2]) * 100 / oldNumbers[i2];
        if (percentChange > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: "number"
  },
  has_num_incr_pct_min: {
    id: "has_num_incr_pct_min",
    match: (leftOperand, right, context) => {
      let oldOperand = getOldOperand(leftOperand);
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      let oldText = intoString(getVar(oldOperand, context));
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      for (var i2 = Math.min(numbers.length, oldNumbers.length) - 1; i2 >= 0; i2 -= 1) {
        const percentChange = (numbers[i2] - oldNumbers[i2]) * 100 / oldNumbers[i2];
        if (percentChange > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: "number"
  },
  length_lt: {
    id: "length_lt",
    match(leftOperand, right, context) {
      let left = intoString(getVar(leftOperand, context));
      return left.length < right;
    },
    fieldType: "number"
  },
  length_gt: {
    id: "length_gt",
    match(leftOperand, right, context) {
      let left = intoString(getVar(leftOperand, context));
      return left.length > right;
    },
    fieldType: "number"
  },
  match_regex: {
    id: "match_regex",
    match(leftOperand, right, context) {
      let left = intoString(getVar(leftOperand, context));
      return !!left.match(new RegExp(right.expr, right.flags));
    },
    fieldType: "regex",
    defaultValue: () => ({ expr: "", flags: "gim" })
  },
  not_match_regex: {
    id: "not_match_regex",
    match(leftOperand, right, context) {
      let left = intoString(getVar(leftOperand, context));
      return !left.match(new RegExp(right.expr, right.flags));
    },
    fieldType: "regex",
    defaultValue: () => ({ expr: "", flags: "gim" })
  },
  not_match_any_previous_text: {
    id: "not_match_any_previous_text",
    match: (leftOperand, right, context) => {
      let newTextHash = context.hashedValues.newTextHash;
      let oldTextHashes = context.hashedValues.oldTextHashes;
      return !oldTextHashes.includes(newTextHash);
    },
    fieldType: null
  },
  is_true: {
    id: "is_true",
    operandType: "json",
    featureFlagRevision: 1,
    match: (leftOperand, _right, context) => {
      let left = getVar(leftOperand, context);
      return left === true;
    },
    fieldType: null
  },
  is_false: {
    id: "is_false",
    operandType: "json",
    featureFlagRevision: 1,
    match: (leftOperand, _right, context) => {
      let left = getVar(leftOperand, context);
      return left === false;
    },
    fieldType: null
  },
  is_null: {
    id: "is_null",
    operandType: "json",
    featureFlagRevision: 1,
    match: (leftOperand, _right, context) => {
      let left = getVar(leftOperand, context);
      return left === null;
    },
    fieldType: null
  },
  is_present: {
    id: "is_present",
    operandType: "json",
    featureFlagRevision: 1,
    match: (leftOperand, _right, context) => {
      let left = getVar(leftOperand, context);
      return left !== void 0;
    },
    fieldType: null
  }
};
const defValues = Object.values(defs);
const NUMERICS = defValues.filter((def) => def.fieldType == "number").map((def) => def.id);
function getDef(id) {
  return defs[id];
}
function matchSingleRuleV2(rule, context) {
  const [op, left, right] = rule;
  return defs[op].match(left, right, { ...context });
}
function matchRuleConfigV1(config, inserts, dels, text, oldText, numberFormat) {
  if (config.type == C.TYPE_RULE) {
    return matchRule_RULE(config, inserts, dels, text, oldText, numberFormat);
  } else if (config.type == C.TYPE_RULE_GROUP) {
    return matchRule_RULE_GROUP(config, inserts, dels, text, oldText, numberFormat);
  } else {
    throw new Error("unknown type of rule config " + config.type);
  }
}
const V1 = "1.0.0";
const V2 = "2.0.0";
function matchRule_RULE(config, inserts, dels, text, oldText, numberFormat) {
  let content = text;
  let oldContent = oldText;
  let matched = false;
  let numbers;
  let oldNumbers;
  const rule = config.rule;
  const params2 = rule.params;
  if (config.contentType == C.CONTENT_TYPE_CHANGED_TEXT) {
    content = inserts;
    oldContent = dels;
  } else if (config.contentType == C.CONTENT_TYPE_OLD_TEXT) {
    content = oldText;
  }
  switch (rule.type) {
    case C.RULE_NOT_EMPTY:
      matched = !_$1.isEmpty(content);
      break;
    case C.RULE_HAS_TEXT:
      matched = containsText(content, params2.input);
      break;
    case C.RULE_HAS_TEXT_NOT:
      matched = !containsText(content, params2.input);
      break;
    case C.RULE_HAS_NUMBER_LT:
      numbers = findNumbers(content, numberFormat);
      matched = _$1.any(numbers, function(num) {
        return num < params2.input;
      });
      break;
    case C.RULE_HAS_NUMBER_GT:
      numbers = findNumbers(content, numberFormat);
      matched = _$1.any(numbers, function(num) {
        return num > params2.input;
      });
      break;
    case C.RULE_HAS_NUMBER_DECR_MIN:
      numbers = findNumbers(content, numberFormat);
      oldNumbers = findNumbers(oldContent, numberFormat);
      for (var i2 = Math.min(numbers.length, oldNumbers.length) - 1; i2 >= 0; i2 -= 1) {
        if (oldNumbers[i2] - numbers[i2] > params2.input) {
          matched = true;
          break;
        }
      }
      break;
    case C.RULE_HAS_NUMBER_INCR_MIN:
      numbers = findNumbers(content, numberFormat);
      oldNumbers = findNumbers(oldContent, numberFormat);
      for (var i2 = Math.min(numbers.length, oldNumbers.length) - 1; i2 >= 0; i2 -= 1) {
        if (numbers[i2] - oldNumbers[i2] > params2.input) {
          matched = true;
          break;
        }
      }
      break;
    case C.RULE_HAS_NUMBER_DECR_PERCENT_MIN:
      numbers = findNumbers(content, numberFormat);
      oldNumbers = findNumbers(oldContent, numberFormat);
      for (var i2 = Math.min(numbers.length, oldNumbers.length) - 1; i2 >= 0; i2 -= 1) {
        var percentChange = (oldNumbers[i2] - numbers[i2]) * 100 / oldNumbers[i2];
        if (percentChange > params2.input) {
          matched = true;
          break;
        }
      }
      break;
    case C.RULE_HAS_NUMBER_INCR_PERCENT_MIN:
      numbers = findNumbers(content, numberFormat);
      oldNumbers = findNumbers(oldContent, numberFormat);
      for (var i2 = Math.min(numbers.length, oldNumbers.length) - 1; i2 >= 0; i2 -= 1) {
        var percentChange = (numbers[i2] - oldNumbers[i2]) * 100 / oldNumbers[i2];
        if (percentChange > params2.input) {
          matched = true;
          break;
        }
      }
      break;
    case C.RULE_MATCH_REGEX:
      matched = content.match(new RegExp(params2.input.expr, params2.input.flags)) != null;
      break;
    default:
      return false;
  }
  return matched;
}
function matchRule_RULE_GROUP(config, inserts, dels, text, oldText, numberFormat) {
  return !config.rules || config.rules.length === 0 || _$1[config.op == C.OP_AND ? "all" : "any"](config.rules, function(ruleConfig) {
    return matchRuleConfigV1(ruleConfig, inserts, dels, text, oldText, numberFormat);
  });
}
const get$1 = (object, path) => {
  if (typeof path === "string")
    path = path.split(".").filter((key) => key.length);
  return path.reduce((dive, key) => dive && dive[key], object);
};
function getVar(name, context) {
  if (name.includes(".")) {
    const [n, path] = name.split(/\.(.*)/s);
    return get$1(context.vars[n], path);
  }
  return context.vars[name];
}
class Macro extends base$1.Model {
  constructor() {
    super(...arguments);
    __publicField(this, "urlRoot", "/macros");
  }
  parse(json2) {
    if (json2.steps && (!json2.version || json2.version === 1)) {
      json2.steps = toMacroFormat(json2.steps || []);
    }
    return json2;
  }
  toJSON() {
    var _a;
    let json2 = super.toJSON();
    if (json2.steps) {
      if (((_a = USER.features) == null ? void 0 : _a.macro_version) === "2") {
        json2.version = 2;
      } else {
        json2.steps = toDistillFormat(json2.steps || []);
        json2.version = 1;
      }
    }
    return json2;
  }
}
class Macros extends base$1.PagedCollection {
  constructor() {
    super(...arguments);
    __publicField(this, "model", Macro);
    __publicField(this, "url", "/macros");
    __publicField(this, "limit", 20);
  }
  fetch(options = {}) {
    options.data = {
      ...options.data,
      "$or": {
        "meta:->>'scraper'": "$null",
        "meta:->>'scraper'.eq": false
      }
    };
    return super.fetch(options);
  }
}
function toDistillFormat(steps) {
  return steps.map((step) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    let type2 = step[0].toUpperCase();
    switch (step[0]) {
      case "click":
        return {
          type: type2,
          data: {
            selector: step[1][1],
            pos: step[2]
          },
          frame: ((_a = step[3]) == null ? void 0 : _a.frame) || 0
        };
      case "wait_doc":
        return {
          type: type2,
          data: {},
          frame: ((_b = step[1]) == null ? void 0 : _b.frame) || 0
        };
      case "select":
        return {
          type: type2,
          data: {
            selector: step[1][1],
            value: step[2]
          },
          frame: ((_c = step[3]) == null ? void 0 : _c.frame) || 0
        };
      case "keypress":
        return {
          type: type2,
          data: {
            code: step[1],
            count: step[2]
          },
          page: ((_d = step[3]) == null ? void 0 : _d.page) || -1
        };
      case "mousemove":
        return {
          type: type2,
          data: {
            selector: step[1][1],
            pos: step[2]
          },
          frame: ((_e = step[3]) == null ? void 0 : _e.frame) || 0
        };
      case "drag":
        return {
          type: type2,
          data: {
            start: {
              selector: step[1][1],
              pos: step[2]
            },
            end: {
              selector: step[3][1],
              pos: step[4]
            }
          },
          frame: ((_f = step[5]) == null ? void 0 : _f.frame) || 0
        };
      case "fill":
        return {
          type: type2,
          data: {
            selector: step[1][1],
            value: step[2]
          },
          frame: ((_g = step[3]) == null ? void 0 : _g.frame) || 0
        };
      case "focus":
        return {
          type: type2,
          data: {
            selector: step[1][1]
          },
          frame: ((_h = step[2]) == null ? void 0 : _h.frame) || 0
        };
      case "type":
        return {
          type: type2,
          data: {
            selector: step[1][1],
            value: step[2]
          },
          frame: ((_i = step[3]) == null ? void 0 : _i.frame) || 0
        };
      case "scroll":
        return {
          type: type2,
          data: {
            selector: step[1][1],
            left: step[2],
            top: step[3]
          },
          frame: ((_j = step[4]) == null ? void 0 : _j.frame) || 0
        };
      case "wait_for_duration":
        return {
          type: type2,
          data: {
            duration: step[1]
          }
        };
      case "wait_for_element":
        return {
          type: type2,
          data: {
            selector: step[1][1]
          },
          frame: ((_k = step[2]) == null ? void 0 : _k.frame) || 0
        };
      case "open":
        return {
          type: type2,
          data: {
            url: step[1]
          },
          page: ((_l = step[2]) == null ? void 0 : _l.page) || -1
        };
      case "for":
      case "while":
        return {
          type: type2,
          data: step
        };
      default:
        throw new Error("Unknown step type: " + step[0]);
    }
  });
}
function toMacroFormat(steps) {
  return steps.map((step) => {
    let type2 = step.type.toLowerCase();
    switch (type2) {
      case "click":
        return [
          type2,
          ["selector", step.data.selector],
          step.data.pos,
          { frame: step.frame || 0 }
        ];
      case "wait_doc":
        return [
          type2,
          { frame: step.frame || 0 }
        ];
      case "select":
        return [
          type2,
          ["selector", step.data.selector],
          step.data.value,
          { frame: step.frame || 0 }
        ];
      case "keypress":
        return [
          type2,
          step.data.code,
          step.data.count,
          { page: step.page || -1 }
        ];
      case "mousemove":
        return [
          type2,
          ["selector", step.data.selector],
          step.data.pos,
          { frame: step.frame || 0 }
        ];
      case "drag":
        return [
          type2,
          ["selector", step.data.start.selector],
          step.data.start.pos,
          ["selector", step.data.end.selector],
          step.data.end.pos,
          { frame: step.frame || 0 }
        ];
      case "focus":
        return [
          type2,
          ["selector", step.data.selector],
          { frame: step.frame || 0 }
        ];
      case "type":
        return [
          type2,
          ["selector", step.data.selector],
          step.data.value,
          { frame: step.frame || 0 }
        ];
      case "scroll":
        return [
          type2,
          ["selector", step.data.selector],
          step.data.left,
          step.data.top,
          { frame: step.frame || 0 }
        ];
      case "wait_for_duration":
        return [
          type2,
          step.data.duration
        ];
      case "wait_for_element":
        return [
          type2,
          ["selector", step.data.selector],
          { frame: step.frame || 0 }
        ];
      case "open":
        return [
          type2,
          step.data.url,
          { page: step.page || -1 }
        ];
      case "fill":
        return [
          type2,
          ["selector", step.data.selector],
          step.data.value,
          { frame: step.frame || 0 }
        ];
      case "while":
      case "for":
        return step.data;
      default:
        throw new Error("Unknown step type: " + step.type);
    }
  });
}
let Crawler = base$1.Model.extend({
  urlRoot: `/crawlers`,
  defaults() {
    return {
      name: "Untitled Crawler",
      url: "https://distill.io",
      state: C$1.STATE_READY,
      schedule: {
        type: "INTERVAL",
        params: {
          interval: 24 * 60 * 60
        }
      },
      config: {
        crawlSubdomains: false,
        maxPages: Math.min(App.user.get("constraint").crawl_pages, 1e4),
        includes: [],
        excludes: [
          {
            expr: ".*\\.(?:jpg|jpeg|png|gif|bmp|svg|webp)(?:\\?[^#]*)?(?:#.*)?$",
            flags: "gim"
          }
        ],
        subtreeOnly: true,
        rewriteURLSteps: [],
        validationSteps: []
      }
    };
  },
  parseAndSet(key, value, options) {
    if (key == null)
      return this;
    let attrs;
    if (typeof key === "object") {
      attrs = key;
    } else {
      (attrs = {})[key] = value;
    }
    attrs = this.parse(attrs);
    return Crawler.__super__.set.call(this, key, attrs[key]);
  }
});
class CrawlerJob extends base$1.Model {
  constructor(attrs, options) {
    super(attrs, options);
    this.urlRoot = `/crawlers/${options.crawler_id}/jobs`;
  }
}
class Crawlers extends base$1.PagedCollection {
  constructor() {
    super(...arguments);
    __publicField(this, "model", Crawler);
    __publicField(this, "url", "/crawlers");
    __publicField(this, "limit", 20);
  }
}
class CrawlerJobs extends base$1.PagedCollection {
  constructor(attrs, options) {
    super(attrs, options);
    __publicField(this, "model", CrawlerJob);
    __publicField(this, "limit", 20);
    this.url = `/crawlers/${options.crawler_id}/jobs`;
  }
}
class JobState extends base$1.Model {
}
class JobStates extends base$1.PagedCollection {
  constructor(attrs, options) {
    super(attrs, options);
    __publicField(this, "model", JobState);
    __publicField(this, "limit", 20);
    __publicField(this, "orderBy", "ts");
    this.url = `/crawlers/data/${options.crawler_id}/jobs/${options.id}/states`;
  }
}
async function send({ path, method, data, query, headers }) {
  return await Api.api({
    url: path,
    method,
    json: query != null ? query : data,
    headers
  });
}
function get(path, query, headers) {
  return send({ method: "GET", path, query, headers });
}
function del(path, data) {
  return send({ method: "DELETE", path, data });
}
function post(path, data) {
  return send({ method: "POST", path, data });
}
function patch(path, data) {
  return send({ method: "PATCH", path, data });
}
class EventEmitter {
  constructor() {
    __publicField(this, "__ee_listeners");
    this.__ee_listeners = {};
  }
  emit(name, ...args) {
    (this.__ee_listeners[name] || []).forEach((l) => l(...args));
  }
  off(name, listener) {
    let listeners = this.__ee_listeners[name];
    if (listeners == void 0) {
      listeners = this.__ee_listeners[name] = [];
    }
    let index2 = listeners.indexOf(listener);
    while (index2 >= 0) {
      listeners.splice(index2, 1);
      index2 = listeners.indexOf(listener);
    }
    return this;
  }
  on(name, listener) {
    let listeners = this.__ee_listeners[name];
    if (listeners == void 0) {
      listeners = this.__ee_listeners[name] = [];
    }
    listeners.push(listener);
    return this;
  }
  once(name, listener) {
    const l2 = (...args) => {
      this.off(name, l2);
      listener(...args);
    };
    this.on(name, l2);
    return this;
  }
  reset() {
    this.__ee_listeners = [];
  }
  waitForEvent(name, ...selectors) {
    return new Promise((resolve) => {
      const l2 = (...args) => {
        for (let i2 = 0, length = selectors.length; i2 < length; i2 += 1) {
          if (selectors[i2] !== args[i2]) {
            return;
          }
        }
        resolve(args[0]);
      };
      this.on(name, l2);
    });
  }
}
function verifyURL(urlObj) {
  try {
    const protocolRegex = new RegExp("(http|https):");
    const urlRegex = new RegExp(
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
      "i"
    );
    const ipv4Regex = new RegExp(
      "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
    );
    const block = "[0-9a-fA-F]{1,4}";
    const ipv6Full = `(${block}:){7}${block}`;
    const ipv6Shorthand = [
      `(${block}:){1,7}:`,
      `(${block}:){1,6}:${block}`,
      `(${block}:){1,5}(:${block}){1,2}`,
      `(${block}:){1,4}(:${block}){1,3}`,
      `(${block}:){1,3}(:${block}){1,4}`,
      `(${block}:){1,2}(:${block}){1,5}`,
      `${block}:((:${block}){1,6})`,
      `:((:${block}){1,7}|:)`,
      `fe80:(:${block}){0,4}%[0-9a-zA-Z]{1,}`,
      `::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])`,
      `(${block}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])`
    ].join("|");
    const ipv6Regex = new RegExp(`\\[(${ipv6Full}|${ipv6Shorthand})\\]$`, "i");
    const protocol = urlObj.protocol;
    const hostname = urlObj.hostname;
    if (!protocolRegex.test(protocol)) {
      throw new Error("Invalid Protocol");
    }
    if (!urlRegex.test(hostname) && !ipv4Regex.test(hostname) && !ipv6Regex.test(hostname)) {
      throw new Error("Invalid URL");
    }
  } catch (e2) {
    console.error(e2.message);
    return e2.message;
  }
}
function verifyRegex({ expr, flags }) {
  try {
    let x2 = new RegExp(expr, flags);
    return null;
  } catch (err) {
    return "Invalid Regular Expression";
  }
}
function verifyInt(value) {
  if (value === null) {
    return "Invalid Number";
  }
  const num = Number(value);
  if (!Number.isInteger(num)) {
    return "Invalid Number";
  }
  return null;
}
function verifyUint(value) {
  const err = verifyInt(value);
  if (err)
    return err;
  const num = Number(value);
  if (num < 0) {
    return `Invalid Number: Must be unsigned (${num})`;
  }
  return null;
}
function verifyFloat(value) {
  if (value === null) {
    return "Invalid Number";
  }
  const num = Number(value);
  if (isNaN(num)) {
    return "Invalid Number";
  }
  return null;
}
function verifyBool(value) {
  if (typeof value !== "boolean") {
    return "Invalid boolean";
  }
}
function verifyEnum(value, def) {
  const optionsList = def.options.map((obj) => obj.id);
  let isSubset = false;
  if (def.multi) {
    isSubset = value.every((val) => optionsList.includes(val));
    if (isSubset)
      return;
  } else {
    isSubset = optionsList.includes(value);
    if (isSubset)
      return;
  }
  return "Invalid selection";
}
function cannotBeLessThan(n) {
  return (value) => {
    if (value < n) {
      return `Cannot be less than ${n}`;
    }
  };
}
function mustMatchRegex(options = {}) {
  if (!options.expr) {
    throw new Error("expr is required to create a regex validator");
  }
  if (!options.message) {
    options.message = "Invalid input";
  }
  if (!options.flags) {
    options.flags = "";
  }
  return (value) => {
    let x2 = new RegExp(options.expr, options.flags);
    if (!x2.test(value)) {
      return options.message;
    }
  };
}
function identity(value) {
  return value;
}
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return value === void 0;
}
class base {
}
__publicField(base, "default");
__publicField(base, "validators", []);
__publicField(base, "toJSON", identity);
__publicField(base, "parse", identity);
__publicField(base, "format", identity);
__publicField(base, "deformat", identity);
__publicField(base, "isEmpty", isUndefined);
class boolean extends base {
}
__publicField(boolean, "default", false);
__publicField(boolean, "validators", [verifyBool]);
class string extends base {
  static isEmpty(val) {
    return !val || val.trim().length == 0;
  }
  static format(val) {
    return val != null ? val : "";
  }
}
class secret extends string {
}
const _url = class extends base {
  static toJSON(value) {
    if (!value) {
      return "";
    }
    return value.toString();
  }
  static parse(value) {
    if (!value) {
      return null;
    }
    return new URL(value);
  }
};
let url = _url;
__publicField(url, "default", null);
__publicField(url, "validators", [verifyURL]);
__publicField(url, "format", _url.toJSON);
__publicField(url, "deformat", _url.parse);
__publicField(url, "isEmpty", isNull);
class json extends base {
  static format(jsonObj, options = {}) {
    const { spaces = 2, showEmpty = true } = options;
    if (!showEmpty && !jsonObj) {
      return "";
    }
    return JSON.stringify(jsonObj, null, spaces);
  }
  static deformat(formattedValue) {
    if (formattedValue === "") {
      return null;
    }
    return JSON.parse(formattedValue);
  }
}
__publicField(json, "toJSON", identity);
__publicField(json, "parse", identity);
__publicField(json, "isEmpty", isNull);
class jsonStr extends json {
  static toJSON(value) {
    return JSON.stringify(value);
  }
  static parse(value) {
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }
}
class regex extends base {
}
__publicField(regex, "default", {
  expr: "",
  flags: "gmi"
});
__publicField(regex, "validators", [verifyRegex]);
__publicField(regex, "toJSON", identity);
__publicField(regex, "parse", identity);
class int extends base {
  static toJSON(value) {
    return parseInt(value);
  }
}
__publicField(int, "default", 0);
__publicField(int, "validators", [verifyInt]);
class uint extends int {
  static toJSON(value) {
    return parseInt(value);
  }
}
__publicField(uint, "default", 0);
__publicField(uint, "validators", [verifyUint]);
class float extends base {
  static toJSON(value) {
    return parseFloat(value);
  }
}
__publicField(float, "default", 0);
__publicField(float, "validators", [verifyFloat]);
class eNum extends base {
}
__publicField(eNum, "validators", [verifyEnum]);
function verifyEmail(value) {
  if (!value.trim().length) {
    return "Email cannot be empty";
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,24}$/.test(value)) {
    return "Invalid email";
  }
}
class email extends base {
}
__publicField(email, "default", new String());
__publicField(email, "validators", [verifyEmail]);
const TYPES = {
  base,
  boolean,
  email,
  enum: eNum,
  int,
  uint,
  float,
  json,
  jsonStr,
  regex,
  string,
  url,
  secret
};
function register(name, type2) {
  if (TYPES[name]) {
    throw new Error(`type "${name}" already exists`);
  }
  TYPES[name] = type2;
}
function createObservableProxy(target, onModified) {
  const handler = {
    set(obj, prop, value) {
      if (obj[prop] !== value) {
        if (isObject$1(value)) {
          value = createObservableProxy(value, onModified);
        }
        obj[prop] = value;
        onModified();
      }
      return true;
    },
    apply(target2, thisArg, argumentsList) {
      onModified();
      return Reflect.apply(target2, thisArg, argumentsList);
    }
  };
  const isArray2 = Array.isArray(target);
  if (isArray2) {
    for (let i2 = 0; i2 < target.length; i2++) {
      if (isObject$1(target[i2])) {
        target[i2] = createObservableProxy(target[i2], onModified);
      }
    }
  } else {
    for (let key in target) {
      if (isObject$1(target[key])) {
        target[key] = createObservableProxy(target[key], onModified);
      }
    }
  }
  return new Proxy(target, handler);
}
function isObject$1(value) {
  return typeof value === "object" && value !== null;
}
class SvelteStore extends EventEmitter {
  constructor() {
    super();
    this._listeners = [];
  }
  _notify() {
    for (let listener of this._listeners) {
      listener(this.getStoreValue());
    }
  }
  subscribe(listener) {
    this._listeners.push(listener);
    listener(this.getStoreValue());
    return () => {
      this._listeners.splice(this._listeners.indexOf(listener), 1);
    };
  }
  getStoreValue() {
    throw new Error("Not implemented!");
  }
  clone() {
    throw new Error("Not implemented!");
  }
}
class SyncableStore extends SvelteStore {
  constructor() {
    super();
    this.syncState = writable(false);
    this.syncError = writable(null);
  }
  getURLRoot() {
    throw new Error("Not implemented");
  }
  async fetch() {
    throw new Error("Not implemented");
  }
}
class BaseModel extends SyncableStore {
  isNew() {
    return !this.id;
  }
  getURL() {
    return this.getURLRoot() + "/" + this.id;
  }
  async fetch() {
    this.syncState.set(true);
    try {
      let res = await get(this.getURL());
      let parsed = this.parse(res);
      this.reset(parsed);
    } catch (e2) {
      this.syncError.set(e2);
      throw e2;
    } finally {
      this.syncState.set(false);
    }
  }
  reset(parsed) {
    throw new Error("Reset not implemented");
  }
  parse(res) {
    return res;
  }
  toJSON() {
    throw new Error("toJSON not implemented");
  }
  async save(attrs = {}) {
    this.syncState.set(true);
    this.syncError.set(null);
    try {
      let res;
      if (this.isNew()) {
        res = await post(this.getURLRoot(), this.toJSON());
        this.id = res["id"];
      } else {
        res = await patch(this.getURL(), { ...this.toJSON(true), ...attrs });
      }
      this.set({ ...attrs, ...res });
      return res;
    } catch (e2) {
      this.syncError.set(e2);
      throw e2;
    } finally {
      this.syncState.set(false);
    }
  }
  async delete() {
    this.syncState.set(true);
    this.syncError.set(null);
    try {
      await del(this.getURL());
      this.emit("destroy", this);
    } catch (e2) {
      this.syncError.set(e2);
      throw e2;
    } finally {
      this.syncState.set(false);
    }
  }
}
class StoreList extends SvelteStore {
  constructor(stores = []) {
    super();
    __publicField(this, "add", (store) => {
      this.stores.push(store);
      let unsubscribe = store.subscribe(() => {
        this._notify();
      });
      this.unsubscribes.set(store, unsubscribe);
    });
    __publicField(this, "remove", (store) => {
      let index2 = this.stores.indexOf(store);
      if (index2 < 0) {
        throw Error("store not added - cant remove");
      }
      let unsubscribe = this.unsubscribes.get(store);
      unsubscribe();
      this.unsubscribes.delete(store);
      this.stores.splice(index2, 1);
      this._notify();
    });
    this.stores = [];
    this.unsubscribes = /* @__PURE__ */ new Map();
    stores.forEach(this.add);
  }
  getStoreValue() {
    return this.stores.map(get_store_value);
  }
}
class ReducedStoreList extends StoreList {
  constructor() {
    super();
    this.dirty = false;
  }
  set(dirty) {
    this.dirty = dirty;
    this._notify();
  }
  getStoreValue() {
    const validValue = this.stores.map(get_store_value).filter((a3) => !!a3)[0];
    return validValue || this.dirty;
  }
}
class FieldList extends SvelteStore {
  constructor(def, fields) {
    super();
    __publicField(this, "add", (value = this.getDefaultValue()) => {
      let field = createFieldStore(this.getDef(value), value);
      this.fields.push(field);
      this.dirty.add(field.dirty);
      this.error.add(field.error);
      this.touched.add(field.touched);
      this.showError.add(field.showError);
      if (this._ready) {
        this._notify();
        this.dirty.set(true);
      }
      field.subscribe(() => {
        this._notify();
      });
    });
    __publicField(this, "remove", (i2) => {
      let deletedList = this.fields.splice(i2, 1);
      if (deletedList.length !== 1) {
        throw new Error("item not found");
      }
      let field = deletedList[0];
      this.dirty.remove(field.dirty);
      this.error.remove(field.error);
      this.touched.remove(field.touched);
      this.showError.remove(field.showError);
      if (this._ready) {
        this._notify();
        this.dirty.set(true);
      }
      return deletedList[0];
    });
    this.def = def;
    this.fields = [];
    this.dirty = new ReducedStoreList();
    this.error = new ReducedStoreList();
    this.touched = new ReducedStoreList();
    this.showError = new ReducedStoreList();
    fields.map(this.add);
    this._ready = true;
  }
  get length() {
    return this.fields.length;
  }
  getDef(value) {
    return this.def;
  }
  getDefaultValue() {
    throw new Error("Not implemented");
  }
  getStoreValue() {
    return this.fields;
  }
  set(fields) {
    [...this.fields].forEach(this.remove);
    fields.forEach(this.add);
  }
  toJSON() {
    return this.fields.map(get_store_value);
  }
}
function mapDefTree(defTree, valTree, map, acc, root = acc) {
  Object.keys(defTree).forEach((key) => {
    const defOrObj = defTree[key];
    const val = valTree[key];
    if (typeof defOrObj !== "object") {
      throw new Error("def not found");
    }
    let fieldFound = typeof defOrObj.type == "string";
    if (fieldFound) {
      acc[key] = map(key, defOrObj, val, acc, root);
    } else {
      acc[key] = mapDefTree(defOrObj, val, map, {}, root);
    }
  });
  return acc;
}
function visitObject(object, altTree, visitor, isLeafNode) {
  Object.entries(object).forEach(([key, value]) => {
    const altValue = altTree == null ? void 0 : altTree[key];
    if (isLeafNode(value)) {
      visitor(key, value, altValue, object);
    } else if (value instanceof Object) {
      visitObject(value, altValue, visitor, isLeafNode);
    }
  });
}
function mapObject(object, map, isLeafNode, acc = {}) {
  Object.entries(object).forEach(([key, value]) => {
    if (isLeafNode(value)) {
      acc[key] = map(value, key, object, acc);
    } else if (value instanceof Object) {
      acc[key] = mapObject(value, map, isLeafNode, {});
    }
  });
  return acc;
}
class FormModel extends BaseModel {
  constructor(defs2, attrs = {}) {
    super();
    this.id = attrs.id;
    this.initFields(defs2, attrs);
    this._iid = `${this.constructor.name}-${ID()}`;
  }
  initFields(defs2, attrs) {
    if (!defs2)
      throw new Error("fields defs is mandatory");
    this.defs = defs2;
    const valueStores = [];
    const dirtys = [];
    const errors = [];
    const touchedStores = [];
    this.fields = mapDefTree(defs2, attrs, (key, def, val, acc, root) => {
      const store = this.createField(key, def, val, root);
      valueStores.push(store);
      dirtys.push(store.dirty);
      errors.push(store.error);
      touchedStores.push(store.touched);
      store.subscribe(() => {
        this._notify();
      });
      return store;
    }, {});
    const formError = derived(valueStores, (values) => this.validate(values));
    errors.push(formError);
    this.dirty = derived(dirtys, filterTruthyValues);
    this.error = derived(errors, filterTruthyValues);
    this.touched = derived(touchedStores, filterTruthyValues);
    this.showError = derived(
      [this.error, this.touched],
      ([$error, $touched]) => !!($error && $touched)
    );
    function filterTruthyValues(list) {
      return list.find(identity);
    }
  }
  createField(key, def, val, fields) {
    if (def.type === "unknown") {
      let type2 = this.getTypeForUnknown(key, val, fields);
      if (!type2) {
        throw new Error(`Unknown type for ${key} - ${type2}`);
      }
      def = { type: type2 };
    }
    return createFieldStore(def, val);
  }
  getTypeForUnknown(fieldName, val, fields) {
    throw new Error("Not implemented");
  }
  getStoreValue() {
    return this.toJSON();
  }
  getURL() {
    return this.getURLRoot() + "/" + this.id;
  }
  getURLRoot() {
    throw new Error("Not implemented");
  }
  set(res) {
    this.visitFields((key, field, altValue) => {
      if (altValue !== void 0) {
        field.reset(altValue);
      }
    }, res);
  }
  reset(parsed) {
    this.visitFields((key, field, altValue) => field.reset(altValue), parsed);
  }
  setTouched(touched = true) {
    this.visitFields((key, field) => field.setTouched(touched));
  }
  async save() {
    let error = get_store_value(this.error);
    if (error) {
      throw error;
    } else {
      return super.save();
    }
  }
  async submit(e2) {
    e2.preventDefault();
    return this.save();
  }
  replaceField(field, value) {
    this.visitFields((key, f, alt, parent) => {
      if (f === field) {
        parent[key] = this.createField(key, { type: "unknown" }, value, this.fields);
      }
    });
  }
  visitFields(visitor, altTree = {}) {
    visitObject(this.fields, altTree, visitor, (field) => field == null ? void 0 : field.subscribe);
  }
  validate(values) {
  }
  toJSON(dirty = false) {
    return mapObject(this.fields, (field) => {
      if (!dirty || get_store_value(field.dirty)) {
        return field.toJSON();
      }
    }, (field) => field == null ? void 0 : field.subscribe);
  }
  isDirty() {
    return get_store_value(this.dirty);
  }
}
function createFieldStore(def, dbValue) {
  var _a;
  let subscribers = /* @__PURE__ */ new Set();
  const typeDef = TYPES[def.type];
  if (dbValue === void 0) {
    dbValue = def && typeof def.default === "function" ? def.default() : (def == null ? void 0 : def.default) || (typeDef == null ? void 0 : typeDef.default);
  }
  let parsedValue = null;
  try {
    parsedValue = typeDef.parse(dbValue);
  } catch (e2) {
    console.error("error while typeDef.parse", "def", def, "dbValue", dbValue, e2);
    throw e2;
  }
  if (parsedValue == null ? void 0 : parsedValue.subscribe) {
    return parsedValue;
  }
  const isPOJO = (parsedValue == null ? void 0 : parsedValue.constructor) === Object;
  if (isPOJO) {
    parsedValue = createObservableProxy(parsedValue, onNestedPropertyModified);
  }
  const value = writable(parsedValue);
  const { subscribe: subscribe2, set: set_internal } = value;
  const error = writable(null);
  const dirty = writable(false);
  const touched = writable(false);
  const showError = derived([error, touched], ([$error, $touched]) => !!($error && $touched));
  const isEmpty = (_a = def.isEmpty) != null ? _a : typeDef.isEmpty;
  function onNestedPropertyModified() {
    dirty.set(true);
    validate(get_store_value(value));
  }
  function validate(val) {
    let err = null;
    if (isEmpty(val)) {
      if (def.required) {
        err = {
          message: "This field is required"
        };
      }
    } else {
      const validators = def.validators || [];
      for (const validator of [...typeDef.validators, ...validators]) {
        const message = validator(val, def);
        if (message) {
          err = {
            message
          };
          break;
        }
      }
    }
    error.set(err);
    if (err) {
      let $value = get_store_value(value);
      subscribers.forEach((fn) => fn($value));
    }
    return err;
  }
  function reset($value) {
    value.set($value);
    dirty.set(false);
    error.set(null);
    touched.set(false);
  }
  function clone() {
    return createFieldStore(def, typeDef.toJSON(get_store_value(value)));
  }
  function set($value, options = {}) {
    const { parse: parse2 = false } = options;
    if (parse2) {
      $value = typeDef.parse($value);
    }
    dirty.set($value !== parsedValue);
    if (isPOJO) {
      $value = createObservableProxy(JSON.parse(JSON.stringify($value)), onNestedPropertyModified);
    }
    if (validate($value)) {
      return;
    }
    set_internal($value);
  }
  return {
    get() {
      return get_store_value(value);
    },
    subscribe: (fn) => {
      subscribers.add(fn);
      let unsubscribe = subscribe2(fn);
      return () => {
        subscribers.delete(fn);
        unsubscribe();
      };
    },
    set,
    update(fn) {
      let newValue = fn(get_store_value(value));
      set(newValue);
    },
    reset,
    def,
    typeDef,
    dirty,
    error,
    showError,
    touched,
    setTouched(val = true) {
      const wasTouched = get_store_value(touched);
      if (wasTouched !== val) {
        touched.set(val);
        if (!wasTouched) {
          validate(get_store_value(value));
        }
      }
    },
    validate,
    clone,
    toJSON() {
      return typeDef.toJSON(get_store_value(value));
    }
  };
}
const TEXTRULES = [C$1.RULE_HAS_TEXT, C$1.RULE_HAS_TEXT_NOT, C$1.RULE_MATCH_REGEX, C$1.RULE_NOT_EMPTY];
const RuleToTypeMap = Object.freeze({
  [C$1.RULE_NOT_EMPTY]: "json",
  [C$1.RULE_HAS_TEXT]: "string",
  [C$1.RULE_HAS_TEXT_NOT]: "string",
  [C$1.RULE_HAS_NUMBER_GT]: "float",
  [C$1.RULE_HAS_NUMBER_LT]: "float",
  [C$1.RULE_HAS_NUMBER_INCR_MIN]: "float",
  [C$1.RULE_HAS_NUMBER_INCR_PERCENT_MIN]: "float",
  [C$1.RULE_HAS_NUMBER_DECR_MIN]: "float",
  [C$1.RULE_HAS_NUMBER_DECR_PERCENT_MIN]: "float",
  [C$1.RULE_MATCH_REGEX]: "regex"
});
class RuleList extends FieldList {
  constructor(values) {
    super({ type: "singleRuleType" }, values);
  }
  getDef(value) {
    if (value.type === C$1.TYPE_RULE_GROUP) {
      return {
        type: "compoundRuleType"
      };
    }
    return {
      type: "singleRuleType"
    };
  }
  defaultRule() {
    return {
      type: C$1.TYPE_RULE,
      contentType: C$1.CONTENT_TYPE_CHANGED_TEXT,
      rule: {
        type: C$1.RULE_HAS_TEXT,
        params: {
          input: ""
        }
      }
    };
  }
  getDefaultValue(isGroup = false) {
    return isGroup ? {
      type: C$1.TYPE_RULE_GROUP,
      op: C$1.OP_AND,
      rules: [this.defaultRule()]
    } : this.defaultRule();
  }
}
class RuleListType extends TYPES.base {
  static toJSON(config) {
    return config.toJSON();
  }
  static parse(json2) {
    return new RuleList(json2);
  }
}
__publicField(RuleListType, "default", []);
const _Rule = class extends FormModel {
  getTypeForUnknown(fieldName, val, fields) {
    return RuleToTypeMap[fields.type.get()];
  }
  constructor(json2) {
    super(_Rule.defs, json2);
  }
};
let Rule = _Rule;
__publicField(Rule, "defs", Object.freeze({
  type: {
    type: "int"
  },
  params: {
    input: {
      type: "unknown"
    }
  }
}));
class RuleType extends TYPES.base {
  static toJSON(rule) {
    return rule.toJSON();
  }
  static parse(json2) {
    return new Rule(json2);
  }
}
class CompoundRuleType extends TYPES.base {
  static toJSON(config) {
    return config.toJSON();
  }
  static parse(json2) {
    return new CompoundRule(json2);
  }
}
class SingleRuleType extends TYPES.base {
  static toJSON(config) {
    return config.toJSON();
  }
  static parse(json2) {
    return new SingleRule$1(json2);
  }
}
register("singleRuleType", SingleRuleType);
register("compoundRuleType", CompoundRuleType);
register("ruleType", RuleType);
register("list:rule", RuleListType);
const _SingleRule$1 = class extends FormModel {
  constructor(json2) {
    super(_SingleRule$1.fields, json2);
  }
  evaluate(context, numberFormat, results) {
    var _a;
    const ruleConfig = this.toJSON();
    let result = matchRuleConfigV1(
      ruleConfig,
      context.inserts,
      context.dels,
      context.sieve_data.text,
      ((_a = context.old_sieve_data) == null ? void 0 : _a.text) || "",
      numberFormat
    );
    results.set(this, result);
    this.fields.result.set(result);
    return result;
  }
  isNumeric() {
    return !TEXTRULES.includes(this.fields.rule.toJSON().type);
  }
};
let SingleRule$1 = _SingleRule$1;
__publicField(SingleRule$1, "fields", Object.freeze({
  type: {
    type: "int"
  },
  contentType: {
    type: "int"
  },
  rule: {
    type: "ruleType"
  },
  result: {
    type: "base"
  }
}));
const _CompoundRule = class extends FormModel {
  constructor(json2, fields = _CompoundRule.fields) {
    super(fields, json2);
  }
  evaluate(context, numberFormat, results) {
    const rules = this.fields.rules.fields;
    if (rules.length === 0) {
      return true;
    }
    const OP = this.fields.op.get();
    const ruleResults = rules.map((rule) => rule.evaluate(context, numberFormat, results));
    const result = OP === C$1.OP_AND ? ruleResults.every((result2) => result2) : ruleResults.some((result2) => result2);
    results.set(this, result);
    this.fields.result.set(result);
    return result;
  }
  hasNumeric() {
    return this.fields.rules.fields.some((rule) => {
      if (rule.toJSON().type === C$1.TYPE_RULE) {
        return rule.isNumeric();
      } else {
        return rule.hasNumeric();
      }
    });
  }
};
let CompoundRule = _CompoundRule;
__publicField(CompoundRule, "fields", Object.freeze({
  type: {
    type: "int"
  },
  op: {
    type: "int"
  },
  rules: {
    type: "list:rule"
  },
  result: {
    type: "base"
  }
}));
const _RuleConfig = class extends CompoundRule {
  constructor(json2 = _RuleConfig.default) {
    super(json2, _RuleConfig.fields);
  }
  getURLRoot() {
    return "/rules";
  }
  evaluate(context, numberFormat) {
    const results = /* @__PURE__ */ new Map();
    const finalResult = super.evaluate(context, numberFormat, results);
    return { finalResult, results };
  }
};
let RuleConfig = _RuleConfig;
__publicField(RuleConfig, "fields", Object.freeze({
  ...CompoundRule.fields,
  numberFormat: {
    type: "string"
  }
}));
__publicField(RuleConfig, "default", {
  type: C$1.TYPE_RULE_GROUP,
  op: C$1.OP_AND,
  rules: [],
  numberFormat: "1,."
});
class Base {
  constructor(op, ...operands) {
    this.expr = [op, ...operands];
  }
  toJSON() {
    const [op, ...operands] = this.expr;
    return [op, ...operands.map((operand) => operand instanceof Base ? operand.toJSON() : operand)];
  }
}
class Or extends Base {
  constructor(...operands) {
    super("or", ...operands);
  }
  evaluate(vars, hashedValues, numberFormat, results) {
    const rules = this.expr.slice(1);
    if (rules.length === 0) {
      results.set(this, true);
      return true;
    }
    const ruleResults = rules.map((rule) => rule.evaluate(vars, hashedValues, numberFormat, results));
    const result = ruleResults.some((result2) => result2);
    results.set(this, result);
    return result;
  }
}
class And extends Base {
  constructor(...operands) {
    super("and", ...operands);
  }
  evaluate(vars, hashedValues, numberFormat, results) {
    const rules = this.expr.slice(1);
    const ruleResults = rules.map((rule) => rule.evaluate(vars, hashedValues, numberFormat, results));
    const result = ruleResults.every((result2) => result2);
    results.set(this, result);
    return result;
  }
}
class SingleRule extends Base {
  constructor(op, leftOperand, rightOperand) {
    super(op, leftOperand, rightOperand);
  }
  evaluate(vars, hashedValues, numberFormat, results) {
    const result = matchSingleRuleV2(this.expr, { numberFormat, vars, hashedValues });
    results.set(this, result);
    return result;
  }
}
const _RuleConfigV2 = class {
  constructor(config) {
    const { rules, numberFormat } = config != null ? config : _RuleConfigV2.default;
    this.numberFormat = numberFormat;
    this.rule = null;
    this.parseRules(rules);
  }
  parseRules(rules) {
    const [op, ...operands] = rules;
    if (op === "and" || op === "or") {
      const nestedRules = operands.map((nestedRule) => this.parseRules(nestedRule));
      this.rule = new (op === "and" ? And : Or)(...nestedRules);
    } else {
      const [leftOperand, rightOperand] = operands;
      this.rule = new SingleRule(op, leftOperand, rightOperand);
    }
    return this.rule;
  }
  toJSON() {
    return {
      rules: this.rule.toJSON(),
      numberFormat: this.numberFormat
    };
  }
  evaluate(vars, hashedValues, numberFormat) {
    const results = /* @__PURE__ */ new Map();
    const finalResult = this.rule.evaluate(vars, hashedValues, numberFormat, results);
    return { finalResult, results };
  }
};
let RuleConfigV2 = _RuleConfigV2;
__publicField(RuleConfigV2, "default", {
  rules: ["or"],
  numberFormat: C$1.NUM_FORMAT_COMMA_DOT
});
function hasNumeric(rules) {
  const orEdRules = rules.toJSON().slice(1);
  const containsNumeric = orEdRules.find(
    (andEdRules) => andEdRules.find(
      ([op]) => NUMERICS.includes(op)
    )
  );
  return !!containsNumeric;
}
const _SieveFormModel = class extends FormModel {
  constructor(model) {
    super(_SieveFormModel.fieldDefs, model.toJSON());
    this.model = model;
    this.unsubscribeCallbacks = [];
    Object.entries(this.fields).forEach(([field, store]) => {
      this.unsubscribeCallbacks.push(store.subscribe((_2) => {
        this.model.parseAndSet(field, store.toJSON());
      }));
    });
  }
  copyForm(formModel) {
    this.copyFields(formModel.fields);
  }
  set(res) {
    const fields = this.defs;
    Object.keys(fields).forEach((key) => {
      if (key in res) {
        this.fields[key].set(res[key], { parse: true });
      }
    });
  }
  copyFromModel(model) {
    this.set(model.toJSON());
  }
  copyFields(fields) {
    Object.entries(fields).forEach(([field, store]) => {
      this.fields[field].set(get_store_value(store));
    });
  }
  clone() {
    this.modelClone = this.model.clone();
    return new _SieveFormModel(this.modelClone);
  }
  unsubscribe() {
    this.unsubscribeCallbacks.forEach((_unsubscribe) => _unsubscribe());
  }
};
let SieveFormModel = _SieveFormModel;
__publicField(SieveFormModel, "fieldDefs", {
  uri: {
    type: "url",
    required: true
  },
  config: {
    type: "jsonStr",
    required: true
  },
  schedule: {
    type: "jsonStr",
    required: true
  }
});
__publicField(SieveFormModel, "path", "sieves");
class Params extends FormModel {
  constructor(paramSpecs) {
    const defs2 = {};
    paramSpecs.forEach((paramSpec) => {
      defs2[paramSpec.name] = {
        type: paramSpec.dataType,
        required: true,
        spec: paramSpec
      };
    });
    super(defs2, paramSpecs);
  }
  updateValues(values) {
    if (typeof values === "object") {
      Object.entries(this.fields).forEach(([key, field]) => {
        if (values[key]) {
          field.set(values[key]);
        } else if (field.def.spec.default) {
          field.set(field.def.spec.default);
        }
      });
    }
  }
  validate() {
    let validated = true;
    Object.entries(this.fields).forEach(([key, field]) => {
      const error = get_store_value(field.error);
      if (error) {
        field.setTouched(true);
        validated = false;
      }
    });
    return validated;
  }
}
class ScraperFilterList extends FieldList {
  constructor(values) {
    super({ type: "string" }, values);
  }
  getDef(value) {
    return {
      type: "string"
    };
  }
}
class ScraperFiltersListType extends TYPES.base {
  static toJSON(config) {
    return config.toJSON();
  }
  static parse(json2) {
    return new ScraperFilterList(json2);
  }
}
register("list:string", ScraperFiltersListType);
class SieveActionFormModel extends FormModel {
  constructor(fieldDefs, config = {}) {
    super(fieldDefs, config);
    this.fieldDefs = fieldDefs;
    this.config = config;
  }
  validate() {
    let validated = true;
    Object.entries(this.fields).forEach(([key, field]) => {
      const value = field.get();
      const touched = get_store_value(field.touched);
      const error = get_store_value(field.error);
      if (touched && error) {
        validated = false;
      } else {
        const fieldError = field.validate(value);
        if (fieldError) {
          field.setTouched(true);
          validated = false;
        }
      }
    });
    return validated;
  }
}
async function fetchUserAttr(attr) {
  const attrModel = new AttrModel.UserAttrs();
  const result = await attrModel.fetch({
    data: {
      "name": attr,
      "state.in": [10, 40],
      "_opt": {
        order: ["ts"]
      }
    }
  });
  const collection = result[0];
  return collection.models;
}
function predefinedTones() {
  return [
    {
      id: "/skin/media/bell_strike.ogg",
      name: TXT("l_bell_strike")
    },
    {
      id: "/skin/media/asian_koel.ogg",
      name: TXT("l_asian_koel")
    },
    {
      id: "/skin/media/ding_dong.ogg",
      name: TXT("l_ding_dong")
    },
    {
      id: "/skin/media/buzzer.ogg",
      name: TXT("l_buzzer")
    }
  ];
}
async function fetchTones() {
  const tones = [];
  if (Supports.agents.local) {
    let doc = await serviceProxy.store.KVStore.findOne("tones");
    if (doc) {
      const customTones = JSON.parse(doc.value).map((tone) => ({ id: tone.value, name: tone.label }));
      customTones.forEach((tone) => tones.push(tone));
    }
  }
  return tones;
}
async function fetchMacros(phrase = "", id = null) {
  const query = {
    "_opt": {
      order: ["-ts"],
      only: ["id", "name", "spec"],
      limit: 20
    }
  };
  if (phrase) {
    query["name.ilike"] = `%${phrase}%`;
  }
  const macrosCollection = new Macros([], { orderBy: "-ts" });
  await macrosCollection.fetch({
    data: query
  });
  if (!id || macrosCollection.get(id)) {
    return macrosCollection.toJSON();
  }
  const macro = new Macro({ id });
  await macro.fetch();
  macrosCollection.models.splice(0, 0, macro);
  return macrosCollection.toJSON();
}
const attributes = {
  "run": "Checks",
  "action": "Actions",
  "email": "Emails",
  "sms": "SMS",
  "push": "Push notifications",
  "action_macro": "Macro Action"
};
function isQuotaAvailable(user, desc2) {
  var _a;
  const action = (_a = desc2.constraint_id) != null ? _a : "action";
  if (user.isLoggedIn() && !user.isFlexi()) {
    let message;
    const constraint = user.get("constraint");
    const usage = user.get("usage");
    if (!constraint[action]) {
      message = `${action === "action" ? "Action" : attributes[action]} not included in your plan.`;
    } else if (constraint[action] - usage[action] <= 0) {
      message = `${usage[action]} of ${constraint[action]} ${attributes[action]} used.`;
    }
    return {
      error: message
    };
  }
}
function createListItem(model) {
  const name = model.get("value");
  const state = model.get("state");
  return { id: name, name: name + (state === C$1.STATE_NEW ? " - unverified " : "") };
}
const SieveActionDescList = [
  {
    type: C$1.ACTION_EMAIL,
    constraint_id: "email",
    label: "l_action_email",
    icon: "fa-envelope-o",
    plugins: ["datafetch", "login", "quota"],
    fields: {
      email: {
        type: "enum",
        required: true,
        multi: false,
        options: []
      },
      subject: {
        required: false,
        type: "string",
        default: ""
      }
    },
    async fetchData(fields, user) {
      var _a;
      const emails = await fetchUserAttr("email");
      const data = emails.map(createListItem);
      fields.email.def.options = data;
      if (!fields.email.get()) {
        fields.email.set(data.find((e2) => e2.id === user.get("email")) ? user.get("email") : (_a = data[0]) == null ? void 0 : _a.id);
      }
      return data;
    },
    addByDefault: function(Supports2) {
      return Supports2.user && Supports2.email;
    }
  },
  {
    type: C$1.ACTION_PUSH,
    constraint_id: "push",
    label: "l_action_push",
    icon: "fa-mobile",
    plugins: ["app", "paid", "quota", "single"],
    paid: 1,
    addByDefault: function(Supports2) {
      return false;
    },
    async fetchData() {
      return [];
    }
  },
  {
    type: C$1.ACTION_SMS,
    constraint_id: "sms",
    label: "l_action_sms",
    icon: "fa-mobile",
    plugins: ["datafetch", "login", "paid", "quota"],
    paid: 1,
    fields: {
      phone: {
        type: "enum",
        required: true,
        dropdown: true,
        options: [],
        multi: false
      }
    },
    async fetchData(fields, user) {
      var _a;
      const phones = await fetchUserAttr("phone");
      const data = phones.map(createListItem);
      fields.phone.def.options = data;
      if (!fields.phone.get()) {
        fields.phone.set((_a = data[0]) == null ? void 0 : _a.id);
      }
      return data;
    },
    addByDefault: function(Supports2) {
      return false;
    }
  },
  {
    type: C$1.ACTION_DISCORD,
    label: "l_action_discord",
    icon: "fa-terminal",
    plugins: ["login", "paid", "quota"],
    paid: 1,
    fields: {
      discord: {
        required: true,
        type: "url"
      }
    },
    addByDefault: function(Supports2) {
      return false;
    },
    async fetchData() {
      return [];
    }
  },
  {
    type: C$1.ACTION_TEAMS,
    label: "l_action_teams",
    icon: "fa-terminal",
    plugins: ["login", "paid", "quota"],
    paid: 1,
    fields: {
      teams: {
        required: true,
        type: "url"
      }
    },
    addByDefault: function(Supports2) {
      return false;
    },
    async fetchData() {
      return [];
    }
  },
  {
    type: C$1.ACTION_SLACK,
    label: "l_action_slack",
    icon: "fa-slack",
    plugins: ["login", "paid", "quota"],
    paid: 1,
    fields: {
      slack: {
        required: true,
        type: "url"
      }
    },
    addByDefault: function(Supports2) {
      return false;
    },
    async fetchData() {
      return [];
    }
  },
  {
    type: C$1.ACTION_WEBHOOK,
    label: "l_action_webhook",
    icon: "fa-terminal",
    plugins: ["login", "paid", "quota"],
    paid: 1,
    fields: {
      url: {
        required: true,
        type: "url"
      },
      data: {
        required: false,
        type: "json",
        default: {
          id: "{{sieve.id}}",
          name: "{{sieve.name}}",
          uri: "{{sieve.uri}}",
          text: "{{sieve_data.text}}"
        }
      },
      headers: {
        required: false,
        type: "json",
        default: {}
      }
    },
    addByDefault: function(Supports2) {
      return false;
    },
    async fetchData() {
      return [];
    }
  },
  {
    local: true,
    type: C$1.ACTION_LOCAL_OPEN_TAB,
    label: "l_action_local_open_tab",
    icon: "fa-file-o",
    plugins: ["local", "single"],
    addByDefault: function() {
      return false;
    },
    async fetchData() {
      return [];
    }
  },
  {
    local: true,
    type: C$1.ACTION_LOCAL_POPUP,
    label: "l_action_local_popup",
    icon: "fa-comment-o",
    plugins: ["local", "single"],
    addByDefault: function(Supports2) {
      return Supports2.agents.local;
    },
    async fetchData() {
      return [];
    }
  },
  {
    local: true,
    type: C$1.ACTION_LOCAL_AUDIO,
    label: "l_action_local_audio",
    icon: "fa-volume-up",
    plugins: ["audio", "datafetch", "local", "single"],
    fields: {
      tone: {
        required: true,
        type: "enum",
        multi: false,
        options: []
      }
    },
    async fetchData(fields, user) {
      var _a;
      const predefTones = predefinedTones();
      const tones = await fetchTones();
      const data = [...predefTones, ...tones];
      fields.tone.def.options = data;
      if (!fields.tone.get()) {
        fields.tone.set((_a = data[0]) == null ? void 0 : _a.id);
      }
      return data;
    },
    addByDefault: function(Supports2) {
      return Supports2.agents.local;
    }
  },
  {
    type: C$1.ACTION_MACRO,
    constraint_id: "action_macro",
    label: "l_action_macro_open_tab",
    icon: "fa fa-tasks",
    plugins: ["datafetch", "login", "paid", "quota"],
    paid: 1,
    fields: {
      macro_id: {
        type: "enum",
        required: true,
        multi: false,
        options: []
      },
      params: {
        required: true,
        type: "json",
        default: {}
      }
    },
    async fetchData(fields, user, options = {}) {
      let data = [];
      if (options.query) {
        data = await fetchMacros(options.query);
      } else {
        data = await fetchMacros("", fields.macro_id.get());
      }
      fields.macro_id.def.options = data;
      return data;
    },
    addByDefault: function(Supports2) {
      return false;
    }
  }
];
const ADBLOCKER_ID = "adblocker";
const EXT_ID_PROPS = {
  [ADBLOCKER_ID]: "blockAdsAndCookies"
};
const Backbone = window.Backbone;
if (!Backbone) {
  throw new Error("ADD Backbone");
}
const moment$1 = window.moment;
if (!moment$1) {
  throw new Error("ADD moment");
}
const { Model, Collection } = base$1;
var Schedule = Model.extend({
  defaults: function() {
    return {
      type: "INTERVAL",
      params: new Model({
        interval: 10800
      })
    };
  },
  getFrequencyClass: function() {
    let { params: params2, type: type2 } = this.attributes;
    params2 || (params2 = this.defaults());
    const interval = params2.attributes.interval;
    let cls = "";
    if (interval) {
      if (interval < 60) {
        cls = "xfreq-xh";
      } else if (interval < 600) {
        cls = "xfreq-hi";
      } else {
        cls = "xfreq";
      }
    } else if (type2 == "LIVE") {
      cls = "xfreq-hi";
    }
    return cls;
  },
  parse: function(response) {
    response.params = new Model({ ...response.params }, { parse: true });
    return response;
  },
  toJSON: function() {
    const json2 = Schedule.__super__.toJSON.call(this);
    json2.params = json2.params.toJSON();
    return json2;
  }
});
const LocatorDescList = [
  {
    type: "css",
    label: "l_css_selector",
    params: [{
      label: "l_css_selector",
      help: "h_css_selelctor",
      must: true,
      name: "expr",
      type: "css"
    }]
  },
  {
    type: "js",
    label: "l_js",
    params: [{
      label: "l_js",
      help: "h_js",
      must: true,
      name: "expr",
      type: "js"
    }]
  },
  {
    type: "xpath",
    label: "l_xpath",
    params: [{
      label: "l_xpath",
      help: "h_xpath",
      must: true,
      name: "expr",
      type: "xpath"
    }]
  }
];
const Locator = Model.extend({
  defaults: {
    type: "xpath"
  },
  toJSON: function() {
    const json2 = Locator.__super__.toJSON.call(this);
    delete json2.id;
    if (json2.allFields) {
      delete json2.allFields;
    }
    delete json2.matchedElementCount;
    return json2;
  }
});
const Locators = Collection.extend({
  model: Locator,
  initialize: function(attrs, options) {
    Locators.__super__.initialize.call(this, attrs, options);
    this.frame = options.frame;
    this.on("all", (eventName) => {
      this.frame.trigger("change:locators:" + eventName);
    });
  },
  parse: function(response) {
    return response;
  }
});
var Frame = Model.extend({
  parse: function(response) {
    response.excludes = new Locators(response.excludes, {
      parse: true,
      frame: this
    });
    response.includes = new Locators(response.includes, {
      parse: true,
      frame: this
    });
    return response;
  },
  toJSON: function() {
    const json2 = Frame.__super__.toJSON.call(this);
    json2.excludes = json2.excludes.toJSON();
    json2.includes = json2.includes.toJSON();
    if (json2.index === 0) {
      delete json2.title;
      delete json2.uri;
    }
    return json2;
  }
});
const Frames = Collection.extend({
  model: Frame,
  initialize: function(models, options) {
    Frames.__super__.initialize.call(this, models, options);
    this.page = options.page;
    this.on("all", (eventName) => {
      this.page.trigger("change:frames:" + eventName);
    });
  },
  parse: function(response) {
    return response;
  }
});
var Page = Model.extend({
  defaults: {
    dynamic: true,
    delay: 2
  },
  addLocator: function(frameConfig, op, attrs) {
    const frames = this.get("frames");
    let frame = frames.findWhere({ index: frameConfig.index });
    const locator = new Locator(attrs);
    if (!frame) {
      frame = new Frame(frameConfig, { parse: true });
      frames.add(frame);
    }
    if (op == "EXCLUDE") {
      frame.get("excludes").add(locator);
    } else {
      frame.get("includes").add(locator);
    }
    return locator;
  },
  createDefaultSelection: function() {
    this.addLocator({ index: 0 }, "INCLUDE", { type: "css", expr: "body" });
  },
  getLocator: function(frameIndex, id) {
    const frames = this.get("frames");
    const frame = frames.findWhere({ index: frameIndex });
    return frame.get("excludes").get(id) || frame.get("includes").get(id);
  },
  isEmpty: function() {
    const frame = this.get("frames").at(0);
    return !frame || frame.get("includes").length === 0;
  },
  parse: function(response) {
    response.frames = new Frames(response.frames, { parse: true, page: this });
    return response;
  },
  removeLocator: function(frameIndex, id) {
    const frames = this.get("frames");
    const frame = frames.findWhere({ index: frameIndex });
    const excludes = frame.get("excludes");
    const includes = frame.get("includes");
    let model;
    if (model = excludes.get(id)) {
      excludes.remove(model);
    } else if (model = includes.get(id)) {
      includes.remove(model);
    } else {
      throw new Error("Frame does not contain selection with id: " + id);
    }
  },
  reset() {
    const frames = this.get("frames");
    frames.reset();
  },
  toJSON: function() {
    const json2 = Page.__super__.toJSON.call(this);
    json2.frames = json2.frames.toJSON();
    delete json2.title;
    delete json2.uri;
    return json2;
  }
});
const Pages = Collection.extend({
  model: Page,
  initialize: function(models, options) {
    Pages.__super__.initialize.call(this, models, options);
    this.config = options.config;
    this.on("all", (eventName) => {
      this.config.trigger("change:pages:" + eventName);
    });
  },
  parse: function(res) {
    return res;
  }
});
const SieveConfig = Model.extend({
  isEmpty() {
    return false;
  },
  applyDefaults() {
    return;
  }
});
const SieveConfigRequest = SieveConfig.extend({
  defaults() {
    return {
      request: {
        method: "GET",
        headers: [],
        body: {
          type: "none"
        },
        timeout: 30
      }
    };
  }
});
const SieveConfigFeed = SieveConfigRequest.extend();
const SieveConfigPDF = SieveConfigRequest.extend({
  defaults() {
    return {
      ...SieveConfigPDF.__super__.defaults(),
      request: {
        ...SieveConfigPDF.__super__.defaults().request,
        timeout: 120
      }
    };
  }
});
const SieveConfigNA = SieveConfig.extend();
const SieveConfigXML = SieveConfigRequest.extend({
  defaults() {
    return {
      ...SieveConfigXML.__super__.defaults(),
      selection: {
        excludes: [],
        includes: [{
          type: "xpath",
          expr: "/*"
        }]
      },
      ignoreEmptyText: true
    };
  }
});
const SieveConfigJSON = SieveConfigRequest.extend({
  constructor: function(attrs, options) {
    this.datasource_id = options.datasource_id;
    SieveConfigJSON.__super__.constructor.call(this, attrs, options);
  },
  isEmpty() {
    const filters = this.get("filters");
    return !(filters == null ? void 0 : filters.included) || filters.included.length === 0;
  },
  defaults() {
    let attrs = {
      filters: {
        included: ["."]
      },
      errorOnEmptyData: true
    };
    switch (this.datasource_id) {
      case null:
      case void 0:
      case C$1.DS_ID_JSON:
      case C$1.DS_ID_UPTIME:
        attrs = { ...SieveConfigJSON.__super__.defaults(), ...attrs };
        break;
    }
    return attrs;
  },
  applyDefaults() {
    this.set({
      ...this.defaults(),
      filters: {
        included: ["."]
      }
    });
  }
});
const SieveConfigDOC = SieveConfigRequest.extend({
  defaults() {
    return { ...SieveConfigDOC.__super__.defaults(), ignoreEmptyText: true, dataAttr: "text" };
  }
});
const SieveConfigScraper = SieveConfig.extend({
  defaults() {
    return {
      filters: {
        included: ["."]
      },
      params: []
    };
  },
  applyDefaults() {
    this.set(this.defaults());
  },
  isEmpty() {
    var _a;
    return !((_a = this.filters.included) == null ? void 0 : _a.length);
  }
});
var SieveConfigHTML = Model.extend({
  __structure__: {
    includeStyle: false,
    includeScript: false,
    selections: [{
      frames: [{
        index: 0,
        excludes: [{
          type: "xpath",
          expr: ""
        }],
        includes: [{}]
      }]
    }]
  },
  defaults: {
    ignoreEmptyText: true,
    includeStyle: false,
    dataAttr: "text"
  },
  applyDefaults(includes = [{ expr: "body", type: "css" }]) {
    this.set({
      ...this.defaults,
      selections: new Pages([
        {
          frames: [
            {
              index: 0,
              excludes: [],
              includes
            }
          ],
          dynamic: true,
          delay: 2
        }
      ], { parse: true, config: this }),
      incognito: false
    });
  },
  getExcludes: function() {
    const selections = this.get("selections").toJSON();
    return _.chain(selections).pluck("frames").flatten().pluck("excludes").flatten().value();
  },
  getIncludes: function() {
    const selections = this.get("selections").toJSON();
    return _.chain(selections).pluck("frames").flatten().pluck("includes").flatten().value();
  },
  getPage: function() {
    const selections = this.get("selections");
    return selections && selections.at(0);
  },
  isEmpty: function() {
    return this.getIncludes().length == 0;
  },
  isAdblockerEnabled() {
    var _a;
    return (_a = this.get(EXT_ID_PROPS[ADBLOCKER_ID])) != null ? _a : true;
  },
  setAdblockerEnabled(enabled) {
    this.set({ [EXT_ID_PROPS[ADBLOCKER_ID]]: enabled });
  },
  parse: function(response) {
    response.selections = new Pages(response.selections, { parse: true, config: this });
    if (_.isString(response.regexp)) {
      response.regexp = { expr: response.regexp, flags: "gim" };
    }
    return response;
  },
  toJSON: function() {
    const json2 = SieveConfigHTML.__super__.toJSON.call(this);
    json2.selections = json2.selections.toJSON();
    return json2;
  }
});
function clientAny() {
  return true;
}
function clientNone() {
  return false;
}
function clientWeb({ id }) {
  return id == C$1.CLIENT_ID_WEB;
}
var Sieve = Model.extend({
  constructor: function() {
    Sieve.__super__.constructor.apply(this, arguments);
    const content_type = this.get("content_type");
    const clientID = this.get("client_id");
    if (!clientID) {
      let defaultClientId;
      if (Supports.agents.local) {
        defaultClientId = serviceProxy.clientId;
      } else {
        defaultClientId = ModelClient.Clients.webAppId;
      }
      this.set("client_id", defaultClientId);
    }
    if (content_type) {
      if (!this.get("prefs")) {
        const diffContentMode = content_type === C$1.TYPE_XML ? C$1.DIFF_MODE_SOURCE : C$1.DIFF_MODE_VISUAL;
        this.set("prefs", { diffContentMode });
      }
      if (!this.get("schedule")) {
        const scheduleType = new Schedule({
          type: content_type === C$1.TYPE_SITEMAP ? "AUTO" : "INTERVAL"
        });
        this.set("schedule", scheduleType);
      }
    }
  },
  ANON_ACCESSIBLE_TYPES: [
    C$1.TYPE_HTML,
    C$1.TYPE_FEED
  ],
  TYPES: [{
    type: C$1.TYPE_HTML,
    name: "Webpage",
    client: clientAny
  }, {
    type: C$1.TYPE_FEED,
    name: "Feed",
    client: clientAny
  }, {
    type: C$1.TYPE_XML,
    name: "XML",
    client: clientAny
  }, {
    type: C$1.TYPE_PDF_HTML,
    name: "PDF",
    client: clientWeb
  }, {
    type: C$1.TYPE_DOC,
    name: "Word Document",
    client: clientWeb
  }, {
    type: C$1.TYPE_JSON,
    name: "JSON, Uptime and Scraper",
    client: clientAny
  }, {
    type: C$1.TYPE_SITEMAP,
    name: "Sitemap",
    client: clientWeb
  }],
  encodedFields: ["config", "schedule", "err"],
  urlRoot: "/sieves",
  applyConfigDefaults() {
    if (!this.get("config")) {
      this.parseAndSet("config", {});
    }
    this.get("config").applyDefaults();
  },
  parseAndSet(key, value, options) {
    let attrs;
    if (typeof key === "object") {
      attrs = key;
      options = value;
    } else {
      (attrs = {})[key] = value;
    }
    const updateKeys = Object.keys(attrs);
    attrs = _.pick(this.parse(attrs), updateKeys);
    return Sieve.__super__.set.call(this, attrs, options);
  },
  getExcludes: function() {
    const config = this.get("config");
    return config && config.getExcludes() || [];
  },
  getIncludes: function() {
    const config = this.get("config");
    return config && config.getIncludes() || [];
  },
  getPage: function() {
    const config = this.get("config");
    return config && config.getPage();
  },
  getTags: function(fromTags) {
    let tag;
    const tags = [];
    const tagIds = (this.get("tags") || "").split(",");
    _.each(tagIds, function(id) {
      tag = fromTags && fromTags.get(id);
      tag && tags.push(tag);
    });
    return tags;
  },
  isDeviceWeb() {
    return this.get("client_id") == C$1.CLIENT_ID_WEB;
  },
  isDeviceElectron() {
    var _a;
    const clientID = this.get("client_id");
    let monitorType = (_a = App.clients.get(clientID)) == null ? void 0 : _a.get("type");
    return monitorType === C$1.CLIENT_ELECTRON;
  },
  isDynamic: function() {
    const config = this.get("config");
    if (config) {
      const selections = config.get("selections");
      if (selections && selections.length > 0) {
        const page = selections.at(0);
        return page.attributes.dynamic === true;
      }
    }
    return false;
  },
  isEmpty: function() {
    const config = this.get("config");
    return !config || config.isEmpty();
  },
  isRead: function() {
    return moment$1(this.get("ts_view")) >= moment$1(this.get("ts_data") || 0);
  },
  markReadUntil: function(until) {
    const last = moment$1(this.get("ts_view"));
    if (until <= last)
      return;
    const ts_view = until.add(1, "second").format();
    return this.save({
      ts_view
    }, {
      patch: true
    });
  },
  markRead: function(read = true) {
    if (read === this.isRead()) {
      return;
    }
    const ts_view = read ? moment$1().format() : moment$1(0).format();
    const tags = this.getTags(App.labels);
    const tagIds = tags.map((tag) => tag.id);
    return this.save({
      tags: tagIds.join(","),
      ts_view
    }, {
      patch: true
    });
  },
  async loadCrawler() {
    let { crawler_id, crawler } = this.attributes;
    if (crawler) {
      return;
    }
    if (crawler_id) {
      crawler = new Crawler({ id: crawler_id });
      await crawler.fetch();
    } else {
      crawler = new Crawler();
    }
    this.set("crawler", crawler);
  },
  async moveToTrash() {
    await this.save({ state: C$1.STATE_DISCARD }, { patch: true, wait: true });
    this.collection.remove(this);
  },
  parse: function({ schedule, ...response }) {
    response = Sieve.__super__.parse.call(this, response);
    const content_type = response.content_type || this.attributes.content_type;
    let config = response.config;
    const datasource_id = response.datasource_id || this.attributes.datasource_id;
    if (config) {
      if (content_type == C$1.TYPE_FEED) {
        response.config = new SieveConfigFeed(config);
      } else if (content_type == C$1.TYPE_HTML) {
        response.config = new SieveConfigHTML(config, { parse: true });
      } else if (content_type == C$1.TYPE_PDF_HTML) {
        response.config = new SieveConfigPDF(config, { parse: true });
      } else if (content_type == C$1.TYPE_XML) {
        response.config = new SieveConfigXML(config, { parse: true });
      } else if (content_type == C$1.TYPE_DOC) {
        response.config = new SieveConfigDOC(config, { parse: true });
      } else if (content_type == C$1.TYPE_JSON) {
        if (datasource_id == C$1.DS_ID_SCRAPER) {
          response.config = new SieveConfigScraper(config, { parse: true });
        } else {
          response.config = new SieveConfigJSON(config, {
            parse: true,
            datasource_id
          });
        }
      } else {
        response.config = new SieveConfigNA(config, { parse: true });
      }
    }
    if (schedule) {
      try {
        schedule = JSON.parse(schedule);
      } catch (e2) {
        schedule = {};
      }
      response.schedule = new Schedule(schedule, { parse: true });
    }
    const diffContentModeValue = content_type === C$1.TYPE_XML ? C$1.DIFF_MODE_SOURCE : C$1.DIFF_MODE_VISUAL;
    if (response.prefs) {
      if (!response.prefs.diffContentMode) {
        response.prefs.diffContentMode = diffContentModeValue;
      }
    }
    return response;
  },
  getDiffMode() {
    var _a;
    const diffModePref = (_a = this.get("prefs")) == null ? void 0 : _a.diffContentMode;
    if (diffModePref) {
      return diffModePref;
    }
    if (this.get("content_type") === C$1.TYPE_JSON && isStaticDatasource(this.get("datasource_id"))) {
      return C$1.DIFF_MODE_DATA;
    } else {
      return C$1.DIFF_MODE_VISUAL;
    }
  },
  setDiffMode(diffContentModeValue) {
    const updatedData = {
      prefs: {
        ...this.get("prefs"),
        diffContentMode: diffContentModeValue
      }
    };
    this.save(updatedData, { patch: true });
  },
  async setMeta(meta = {}) {
    var _a;
    let client_type, client_id, user_id;
    if (Supports.agents.local) {
      client_type = await Supports.agents.type();
      user_id = await serviceProxy.auth.getId();
      client_id = await serviceProxy.store.Prefs.get("client.id");
    } else {
      client_type = C$1.CLIENT_WEB;
      client_id = C$1.CLIENT_ID_WEB;
      user_id = (_a = App.user) == null ? void 0 : _a.id;
    }
    const source = {
      ...meta,
      user_id,
      client_id,
      client_type
    };
    this.set("meta", { source });
  },
  isHTML() {
    const contentType = this.get("content_type");
    const htmlTypes = [C$1.TYPE_DOC, C$1.TYPE_HTML, C$1.TYPE_PDF_HTML];
    return htmlTypes.includes(contentType);
  },
  async fetchMacro() {
    const macro_id = this.get("macro_id");
    let macro = this.get("macro");
    if (macro && macro.id === macro_id) {
      return macro;
    }
    if (macro_id) {
      macro = await Api.api(`/macros/${macro_id}`, "GET");
      this.set("macro", macro);
      return macro;
    }
    throw new Error("No macro available and macro_id is missing");
  },
  validateMacro() {
    const macro = this.get("macro");
    if (!macro) {
      return false;
    }
    const macroModel = new MacroModel.Macro({ ...macro });
    return macroModel.validateSieveConfig(this.get("config"));
  },
  getTypeDesc() {
    let content_type = this.attributes.content_type;
    let desc2 = this.TYPES.filter(({ type: type2 }) => type2 == content_type)[0];
    if (!desc2) {
      desc2 = {
        type: content_type,
        client: clientNone,
        name: "<none>"
      };
    }
    return desc2;
  },
  getAccessibleClients(clients) {
    let type2 = this.getTypeDesc();
    return clients.filter((client) => type2.client(client));
  },
  async getAccess(user) {
    const { content_type } = this.attributes;
    if (content_type == 0) {
      return {
        hasAccess: true,
        minPlan: null
      };
    }
    if (user.isLoggedIn()) {
      try {
        return await Api.api(`/users/sieve-access/${content_type}`);
      } catch (e2) {
        console.error("error getting sieve-access", e2);
        return { hasAccess: true };
      }
    } else {
      let hasAccess = this.ANON_ACCESSIBLE_TYPES.includes(content_type);
      return {
        hasAccess,
        minPlan: null
      };
    }
  },
  getTypeName() {
    let type2 = this.getTypeDesc();
    return type2.name;
  },
  isScraperDatasource() {
    const contentType = this.get("content_type");
    const datasourceId = this.get("datasource_id");
    return contentType === C$1.TYPE_JSON && datasourceId && ![C$1.DS_ID_JSON, C$1.DS_ID_UPTIME, C$1.DS_ID_TEXT].includes(datasourceId);
  }
});
const Sieves = base$1.PagedCollection.extend({
  model: Sieve,
  url: "/sieves",
  initialize: function(models, options) {
    Sieves.__super__.initialize.call(this, models, options);
    this.listenTo(this, "change:selected", this._notify);
  },
  getSelectedSieves() {
    return this.models.filter((sieve) => sieve.get("selected"));
  },
  getSelectedSieveIds() {
    let selectedIds = [];
    this.models.forEach((sieve) => {
      if (sieve.get("selected")) {
        selectedIds.push(sieve.get("id"));
      }
    });
    return selectedIds;
  },
  toggleSieveSelection(check) {
    this.models.forEach((sieve) => {
      sieve.set("selected", typeof check === "function" ? check(sieve) : check);
    });
  },
  async markAsRead(read) {
    const models = this.getSelectedSieves();
    try {
      await Promise.all(
        models.map((model) => model.markRead(read))
      );
    } catch (err) {
      Msg.error("sieve:update:err");
    }
  }
});
const SieveRule = Model.extend({
  encodedFields: ["config"],
  urlRoot: "/rules",
  defaults() {
    const ruleDefault = USER.features.rule_default || V2;
    return ruleDefault === V1 ? this.defaultsV1() : this.defaultsV2();
  },
  defaultsV1() {
    return {
      config: new RuleConfig({
        type: C$1.TYPE_RULE_GROUP,
        op: C$1.OP_AND,
        rules: [],
        numberFormat: C$1.NUM_FORMAT_COMMA_DOT
      }),
      version: V1
    };
  },
  defaultsV2() {
    return {
      config: new RuleConfigV2({
        numberFormat: C$1.NUM_FORMAT_COMMA_DOT,
        rules: ["or"]
      }),
      version: V2
    };
  },
  getCount() {
    let count = 0;
    const { config, version } = this.attributes;
    if (V1 == this.get("version")) {
      let doCount = function(rule) {
        if (rule.type == C$1.TYPE_RULE_GROUP) {
          rule.rules.forEach(doCount);
        } else {
          count += 1;
        }
      };
      doCount(config.toJSON());
    } else {
      const orEdRules = config.toJSON().rules;
      for (let i2 = 1; i2 < orEdRules.length; i2 += 1) {
        const andEdRules = orEdRules[i2];
        count += andEdRules.length - 1;
      }
    }
    return count;
  },
  isEmpty: function() {
    const { config, version } = this.attributes;
    if (V1 == this.get("version")) {
      return !(config && config.toJSON().rules.length > 0);
    } else {
      return !(config && config.toJSON().rules.length > 1);
    }
  },
  parse(json2) {
    json2 = SieveRule.__super__.parse.call(this, json2);
    if (!json2.version) {
      json2.version = USER.features.rule_default || V2;
    }
    if (json2.version === V1) {
      json2.config = new RuleConfig(json2.config);
    } else if (json2.version === V2) {
      json2.config = new RuleConfigV2(json2.config);
    }
    return json2;
  },
  setVersion(version) {
    if (version === this.get("version")) {
      return;
    }
    let attrs;
    if (version == V1) {
      this._v2Attrs = { ...this.attributes };
      attrs = this._v1Attrs || this.defaultsV1();
    } else if (version == V2) {
      this._v1Attrs = { ...this.attributes };
      attrs = this._v2Attrs || this.defaultsV2();
    }
    this.set(attrs);
  }
});
SieveRule.V1 = V1;
SieveRule.V2 = V2;
const Work = Model.extend({
  encodedFields: ["err", "data"],
  parse(json2) {
    json2.fetchingSnapshot = false;
    json2.uri = this.collection.sieve.get("uri");
    return Work.__super__.parse.call(this, json2);
  },
  getMessage() {
    return this.get("err").msg || this.get("err").message || JSON.stringify(this.get("err"));
  },
  async fetchScreenshot() {
    var _a;
    const sieve = this.collection.sieve;
    if (this.get("snapshot")) {
      return;
    }
    try {
      this.set("fetchingSnapshot", true);
      let uri2 = `/sieves/${sieve.id}/snapshots/${this.get("snapshot_id")}`;
      if (Supports.agents.local && sieve.get("client_id") !== ModelClient.Clients.webAppId) {
        uri2 += "/local";
      }
      const res = await Api.api(uri2, "GET");
      if (res) {
        this.set("snapshot", res);
        this.set("uri", (_a = res.uri) != null ? _a : this.get("uri"));
      }
    } catch (e2) {
      console.error("error while fetching screenshot data", "sieveID", sieve.id, "workID", this.id, e2);
    } finally {
      this.set("fetchingSnapshot", false);
    }
  }
});
const Works = Collection.extend({
  model: Work,
  initialize: function(models, options) {
    Works.__super__.initialize.call(this, models, options);
    this.sieve = options.sieve;
    this.on("add", this.onAdd, this);
  },
  onAdd: function(model) {
    model.sieve = this.sieve;
  },
  url: function() {
    let route2 = "works";
    const clientId = this.sieve.get("client_id");
    if (Supports.agents.local && clientId !== ModelClient.Clients.webAppId) {
      route2 = "works/local";
    }
    return ["/sieves", this.sieve.id, route2].join("/");
  }
});
class SimpleAttrList extends Base$1 {
  constructor(name) {
    super({
      name,
      available: false,
      list: [],
      loading: true,
      newValue: ""
    });
    this.fetch();
  }
  async fetch() {
    let constraint = await Api.api("/users/constraints");
    if (constraint.plan_id[0] !== "0") {
      this.state.available = true;
    }
    let attrs = await Api.api("/users/attrs", {
      name: this.state.name,
      "state.in": [10, 40]
    });
    this.state.loading = false;
    this.state.list = attrs.data;
  }
  createTpl({ loading, available, list, name }) {
    return loading ? html`Loading` : !available ? html`It is currently only available for paid customers.` : html`
      <ul class='list-group'>
      ${list.map((attr) => attr.value == USER.email ? "" : html`<li class='list-group-item' id=${attr.id}>
        <span>${attr.value}</span>
        <div class='right'>
          <button class='btn btn-default btn-sm' @click=${(e2) => this.onDel(attr.id)}>
            Delete
          </button>
        <div>
        </li>`)}
      </ul>
      <div class='input-group'>
        <input class='form-control' type='text' placeholder='Enter new ${name}'
          @input=${(e2) => this.state.newValue = e2.target.value}
          .value=${this.state.newValue}
          >
        <span class='input-group-btn'>
          <button @click=${(e2) => this.onAdd()} class='btn btn-primary'>Add</button>
        </span>
      </div>
      `;
  }
  async onAdd() {
    let value = this.state.newValue.trim();
    if (value.length > 0) {
      await Api.api("/users/attrs", "POST", { name: this.state.name, value });
      this.fetch();
    }
    this.state.newValue = "";
  }
  async onDel(id) {
    await Api.api(`/users/attrs/${id}`, "DELETE");
    this.fetch();
  }
}
var UserAttrOptionsPlugin = Editor.SelectOptionsPlugin.extend({
  action_edit: function() {
    const view = new View.Base({
      el: new SimpleAttrList(this.param.name).el
    });
    const modal = new View.Modal({
      title: "Manage List",
      parent: this.editor.getRoot(),
      view
    });
    modal.show();
    this.listenTo(modal, "discard", () => this.fetch());
  },
  fetch: function() {
    this.attrs.fetch({
      data: {
        "name": this.param.name,
        "state.in": [10, 40],
        "_opt": {
          order: ["ts"]
        }
      }
    });
  },
  getOptionLabel: function(model) {
    return model.get(this.attrLabel) + (model.get("state") == 10 ? " - unverified" : "");
  },
  load: function() {
    this.attrs = new AttrModel.UserAttrs();
    this.listenTo(this.editor, "reset", _.bind(this.fetch, this));
    this.listenTo(this.attrs, "sync", _.bind(this.loadData, this));
    this.fetch();
    $(this.separator).attr("label", TXT("l_loading"));
  },
  onSync: async function() {
    await serviceProxy.SyncMan._syncStore(serviceProxy.store.AttrStore);
    this.fetch();
  },
  render: function() {
    UserAttrOptionsPlugin.__super__.render.call(this);
    if (Supports.agents.local && App.user.isLoggedIn()) {
      let btn;
      $(this.select).after(
        " ",
        btn = BUTTON(
          { "class": "btn xbtn-light", "title": TXT("l_sync") },
          I({ "class": "fa fa-refresh" })
        )
      );
      btn.onclick = this.onSync.bind(this);
    }
  },
  renderActions() {
    if (this.param.name == "email") {
      this.select.appendChild(OPTION({ value: "action:edit" }, "Manager List"));
    }
  },
  unload: function() {
    UserAttrOptionsPlugin.__super__.unload.call(this);
    this.attrs.reset();
  }
});
const MacroOptionsPlugin = Editor.SelectOptionsPlugin.extend({
  attrLabel: "name",
  attrValue: "id",
  action_edit: function() {
    const view = new View.Base({
      el: new SimpleAttrList(this.param.name).el
    });
    const modal = new View.Modal({
      title: "Manage List",
      parent: this.editor.getRoot(),
      view
    });
    modal.show();
    this.listenTo(modal, "discard", () => this.fetch());
  },
  fetch: function() {
    this.macros.fetch();
  },
  getOptionLabel: function(model) {
    return model.get(this.attrLabel);
  },
  load: function() {
    this.macros = new Macros([], {
      orderBy: "-ts"
    });
    this.listenTo(this.editor, "reset", _.bind(this.fetch, this));
    this.listenTo(this.macros, "sync", _.bind(this.loadData, this));
    this.fetch();
    $(this.separator).attr("label", TXT("l_loading"));
  },
  render: function() {
    MacroOptionsPlugin.__super__.render.call(this);
  },
  renderActions() {
    if (this.param.name == "email") {
      this.select.appendChild(OPTION({ value: "action:edit" }, "Managre List"));
    }
  },
  unload: function() {
    MacroOptionsPlugin.__super__.unload.call(this);
    this.macros.reset();
  }
});
Editor.Plugin.extend({
  render() {
    if (!App.user.isLoggedIn()) {
      this.a = A({ href: serviceProxy.CFG.URL.LOGIN }, B(TXT("a_signin")));
      $(this.editor.field).hide().after(this.a);
    }
  }
});
Editor.Plugin.extend({
  play: async function() {
    const field = this.editor.field;
    const audio = AUDIO();
    const tone = field.value;
    $(field).after(audio);
    if (tone.indexOf("tone:") == 0) {
      let doc = await serviceProxy.store.KVStore.findOne(tone);
      play(doc.value);
    } else {
      play(tone);
    }
    function play(dataOrUrl) {
      audio.src = dataOrUrl;
      audio.play();
    }
  },
  render: function() {
    const field = this.editor.field;
    const a3 = A({ href: "javascript:void 0" }, TXT("a_play"));
    $(field).after(" ", a3);
    a3.onclick = _.bind(this.play, this);
  }
});
const SieveAction = Model.extend({
  encodedFields: ["config"],
  parent: null,
  defaults: function() {
    const desc2 = this.desc;
    const defaults2 = {
      type: desc2.type
    };
    if (desc2.defaults) {
      defaults2.config = _.result(desc2, "defaults");
    }
    return defaults2;
  },
  parse: function(response) {
    response = SieveAction.__super__.parse.call(this, response);
    const fieldDefs = this.desc.fields;
    const config = response.config || {};
    response.config = new SieveActionFormModel(fieldDefs || {}, config);
    return response;
  },
  initialize: function(attrs, options) {
    SieveAction.__super__.initialize.call(this, attrs, options);
    this.parent = options && options.parent;
  },
  urlRoot: function() {
    const parent = this.parent;
    if (parent == null)
      throw new Error("Parent sieve not set for action");
    return "/sieves/" + parent.id + "/actions";
  },
  hasChanged: function(attr) {
    var _a;
    if (!attr) {
      return SieveAction.__super__.hasChanged.call(this) || ((_a = this.get("config")) == null ? void 0 : _a.isDirty());
    }
    return SieveAction.__super__.hasChanged.call(this, attr);
  },
  changedAttributes: function(attr) {
    var _a;
    let _hash = {};
    if ((_a = this.get("config")) == null ? void 0 : _a.isDirty()) {
      _hash = { config: this.get("config") };
    }
    return {
      ..._hash,
      ...SieveAction.__super__.changedAttributes.call(this, attr)
    };
  },
  clone: function({ omit } = {}) {
    let attrs = this.toJSON();
    if (omit == null ? void 0 : omit.length) {
      attrs = _.omit(attrs, omit);
    }
    return new this.constructor(attrs, { parse: true });
  }
});
const SieveActionNone = SieveAction.extend({
  desc: {
    type: C$1.ACTION_NONE,
    label: "l_action_none",
    single: true,
    addByDefault: function(Supports2) {
      return false;
    },
    params: []
  }
});
var SieveActions = Collection.extend({
  initialize: function(models, options) {
    SieveActions.__super__.initialize.call(this, models, options);
    this.parent = options.parent;
    this.on("add", this.onAdd, this);
  },
  onAdd: function(action) {
    action.parent = this.parent;
  },
  parse: function(response) {
    response = SieveActions.__super__.parse.call(this, response);
    return _.map(response, function(attrs) {
      const Type = SieveAction[attrs.type] || SieveActionNone;
      return new Type(attrs, {
        parse: true,
        parent: this.parent
      });
    }, this);
  },
  url: function() {
    return ["/sieves", this.parent.id, "actions"].join("/");
  },
  getConfigValue(type2) {
    const isSignedIn = USER.id;
    const typeConditions = {
      1: (config) => isSignedIn && config.email,
      2: (config) => isSignedIn && config.phone,
      4: (config) => config.macro_id,
      5: (config) => isSignedIn && config.url,
      6: (config) => isSignedIn && config.slack,
      7: (config) => isSignedIn && config.discord,
      8: (config) => isSignedIn && config.teams
    };
    return typeConditions[type2];
  },
  getPosts() {
    return this.models.filter((action) => {
      const type2 = action.get("type");
      const config = action.get("config").toJSON();
      const condition = this.getConfigValue(type2);
      if (condition && !condition(config)) {
        return false;
      }
      return action.isNew();
    });
  },
  getPuts() {
    return this.models.filter(function(action) {
      return !action.isNew() && action.hasChanged();
    });
  },
  validateActions() {
    let isValid2 = true;
    this.models.forEach((action) => {
      if (!USER.id && [C$1.ACTION_EMAIL, C$1.ACTION_SMS, C$1.ACTION_WEBHOOK, C$1.ACTION_SLACK, C$1.ACTION_DISCORD].includes(action.get("type"))) {
        return isValid2;
      }
      const field = action.get("config");
      if (!field.validate()) {
        isValid2 = false;
      }
    });
    return isValid2;
  }
});
if (Supports.agents.local) {
  SieveActionDescList.slice(0).forEach(function(desc2, index2) {
    if (desc2.local) {
      SieveActionDescList.splice(index2, 1);
      SieveActionDescList.unshift(desc2);
    }
  });
}
_.each(SieveActionDescList, function(desc2) {
  SieveAction[desc2.type] = SieveAction.extend({ desc: desc2 }, { desc: desc2 });
});
var Model$1 = {
  LocatorDescList,
  Frame,
  Frames,
  Page,
  Pages,
  Schedule,
  Sieve,
  SieveConfigRequest,
  SieveConfigFeed,
  SieveConfigHTML,
  SieveConfigJSON,
  SieveConfigScraper,
  SieveConfigPDF,
  SieveConfigXML,
  Sieves,
  SieveRule,
  SieveActionDescList,
  SieveAction,
  SieveActions,
  Works,
  ACTION_EMAIL: C$1.ACTION_EMAIL,
  ACTION_SMS: C$1.ACTION_SMS,
  ACTION_PUSH: C$1.ACTION_PUSH
};
var SieveData = base$1.Model.extend({
  url() {
    return `/sieves/${this.get("sieve_id")}/data/${this.id}`;
  }
});
const SieveDataCollection = base$1.Collection.extend({
  model: SieveData,
  initialize(models = [], options = {}) {
    SieveDataCollection.__super__.initialize.call(this, models, options);
    _.extend(this, options);
  },
  parse(res) {
    return res.data.map((sd) => {
      return {
        sieve_id: this.sieveId,
        ...sd
      };
    });
  },
  url() {
    return `/sieves/${this.sieveId}/data`;
  }
});
const route = writable({
  prefix: "all",
  team: void 0
});
function getBasePath(rt = get_store_value(route)) {
  let { module, team, prefix, data } = rt;
  let base2 = `/w/${team}/${module}/${prefix}/`;
  if (data) {
    base2 = base2 + `${data}.d/`;
  }
  return base2;
}
function updateTeam(team) {
  const currentRouteProps = get_store_value(route);
  if (currentRouteProps.team === team) {
    return;
  }
  Api.setIdentityId(team == 0 || !team ? null : team);
  route.update((r) => {
    return {
      ...r,
      team
    };
  });
}
function updateRoute(currentRoute) {
  route.update((r) => {
    return {
      ...r,
      currentRoute
    };
  });
}
function getCurrentRoute() {
  return get_store_value(route).currentRoute;
}
const types = {
  ARRAY: "Array",
  ARRAY_OF_OBJECTS: "ArrayOfObjects",
  OBJECT: "Object",
  NUMBER: "Number",
  BOOLEAN: "Boolean",
  STRING: "String",
  NULL: "Null",
  UNDEFINED: "Undefined",
  PRIMITIVE: "Primitive",
  UNKNOWN: "Unknown"
};
function jsonType(json2) {
  const type2 = Object.prototype.toString.call(json2).slice(8, -1);
  if (type2 === "Object") {
    if (typeof json2[Symbol.iterator] === "function") {
      return "Iterable";
    }
    return json2.constructor.name;
  }
  return type2;
}
function isPrimitive(value) {
  return isPrimitiveType(jsonType(value));
}
function isArrayOfPrimitives(arr) {
  if (!arr) {
    return false;
  }
  if (!Array.isArray(arr)) {
    return false;
  }
  for (let i2 = 0; i2 < arr.length; i2++) {
    if (!isPrimitive(arr[i2])) {
      return false;
    }
  }
  return true;
}
function isArrayOfObject(array) {
  for (let arr of array) {
    if (jsonType(arr) === types.OBJECT) {
      return true;
    }
  }
  return false;
}
function isPrimitiveType(type2) {
  switch (type2) {
    case types.NUMBER:
    case types.BOOLEAN:
    case types.STRING:
    case types.PRIMITIVE:
    case types.NULL:
    case types.UNDEFINED:
      return true;
    case types.ARRAY:
    case types.ARRAY_OF_OBJECTS:
    case types.OBJECT:
      return false;
  }
}
async function importPosthog() {
  return await __vitePreload(() => import("./module.no-external.adb6b13f.js"), true ? [] : void 0);
}
const PHEvents = {
  ADD_MONITOR: {
    WEBPAGE: "add_monitor_webpage",
    FEED: "add_monitor_feed",
    JSON: "add_monitor_json",
    PDF: "add_monitor_pdf",
    UPTIME: "add_monitor_uptime",
    DOC: "add_monitor_doc",
    XML: "add_monitor_xml",
    SITEMAP: "add_monitor_sitemap"
  },
  OPEN_SELECTOR: {
    WEBPAGE: "open_selector_webpage",
    FEED: "open_selector_feed",
    JSON: "open_selector_json",
    DATASOURCE: "open_selector_datasource",
    PDF: "open_selector_pdf",
    UPTIME: "open_selector_uptime",
    DOC: "open_selector_doc",
    XML: "open_selector_xml",
    SITEMAP: "open_selector_sitemap"
  },
  URL_ADDED: "url_added",
  MONITOR_FULL_PAGE: "monitor_full_page",
  MONITOR_PARTS_OF_PAGE: "monitor_parts_of_page",
  MONITOR_SCRAPER: "monitor_scraper",
  VS_GOTO_THREW: "vs_goto_threw",
  VS_GOTO_ERROR_PAGE: "vs_goto_error_page",
  VS_GOTO_SUCCESS: "vs_goto_success",
  VS_ELEMENT_SELECTED: "vs_element_selected",
  VS_SAVED: "vs_saved",
  VS_CANCELLED: "vs_cancelled",
  SCRAPER_SAVED: "scraper_saved",
  SCRAPER_CANCELLED: "scraper_cancelled",
  SIEVE_EDIT_OPTIONS_OPEN: "sieve_edit_options_open",
  SIEVE_EDIT_OPTIONS_SAVED: "sieve_edit_options_saved",
  SIEVE_EDIT_OPTIONS_CANCELLED: "sieve_edit_options_cancelled",
  SIEVE_STATE: "sieve_state",
  SIEVE_DELETED: "sieve_deleted",
  SIEVE_WORKLOG_VIEW: "sieve_worklog_view",
  SIEVE_RUN: "sieve_run",
  SIEVE_DATA_FETCH: "sieve_data_fetch",
  ONBOARDING_GO: "onboarding_go",
  ONBOARDING_SKIP: "onboarding_skip",
  ONBOARDING_COMPLETED: "onboarding_completed",
  FORM_SUBMIT: "form_submit",
  PLAN_UPGRADE: "plan_upgrade",
  EXT_SCRAPER_OPEN: "ext_scraper_open",
  EXT_SCRAPER_SAVED: "ext_scraper_saved",
  EXT_SCRAPER_CANCELLED: "ext_scraper_cancelled",
  EXT_SCRAPER_SWITCH_TO_VS: "ext_scraper_switch_to_vs",
  EXT_SCRAPER_RUN_START: "ext_scraper_run_start",
  EXT_SCRAPER_RUN_SUCCESS: "ext_scraper_run_success",
  EXT_SCRAPER_RUN_ERROR: "ext_scraper_run_error",
  getEventForSieveSelectorPanel: (content_type, datasourceId) => {
    switch (content_type) {
      case C$1.TYPE_HTML:
        return PHEvents.OPEN_SELECTOR.WEBPAGE;
      case C$1.TYPE_FEED:
        return PHEvents.OPEN_SELECTOR.FEED;
      case C$1.TYPE_JSON:
        switch (datasourceId) {
          case C$1.DS_ID_UPTIME:
            return PHEvents.OPEN_SELECTOR.UPTIME;
          case C$1.DS_ID_JSON:
          case null:
          case void 0:
            return PHEvents.OPEN_SELECTOR.JSON;
          default:
            return PHEvents.OPEN_SELECTOR.DATASOURCE;
        }
      case C$1.TYPE_PDF_HTML:
        return PHEvents.OPEN_SELECTOR.PDF;
      case C$1.TYPE_DOC:
        return PHEvents.OPEN_SELECTOR.DOC;
      case C$1.TYPE_XML:
        return PHEvents.OPEN_SELECTOR.XML;
      case C$1.TYPE_SITEMAP:
        return PHEvents.OPEN_SELECTOR.SITEMAP;
      default:
        return PHEvents.OPEN_SELECTOR.WEBPAGE;
    }
  }
};
const PHEventCategories = {
  FORM_SUBMISSIONS: "form_submissions",
  FIRST_PAGE_VIEW: "first_page_view",
  NEW_USER_USAGE: "new_user_usage",
  PRODUCT_PLAN: "product_plan"
};
const PHEventCategoryFilters = {
  [PHEventCategories.FORM_SUBMISSIONS]: ({ p }) => true,
  [PHEventCategories.FIRST_PAGE_VIEW]: ({ p }) => true,
  [PHEventCategories.PRODUCT_PLAN]: ({ p }) => true,
  [PHEventCategories.NEW_USER_USAGE]: ({ p }) => {
    return p.isNewUser();
  },
  undefined: ({ p }) => {
    return p.isNewUser();
  }
};
class PosthogEventTracker {
  constructor({ clientId, userId, posthog: posthog2 }) {
    __publicField(this, "userJoinDate");
    __publicField(this, "clientId");
    __publicField(this, "userId");
    __publicField(this, "posthog");
    __publicField(this, "clientType");
    __publicField(this, "_isNewUser");
    var _a;
    this.clientId = clientId;
    this.userId = userId;
    this.posthog = posthog2;
    this.clientType = C$1.CLIENT_WEB;
    if (Supports.agents.local) {
      this.clientType = (_a = serviceProxy.CFG.CLIENT) == null ? void 0 : _a.TYPE;
    }
    this._isNewUser = void 0;
  }
  setUserJoinDate(joinDate) {
    this.userJoinDate = joinDate;
  }
  isNewUser() {
    if (this._isNewUser !== void 0) {
      return this._isNewUser;
    }
    if (!this.userJoinDate) {
      return false;
    }
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    this._isNewUser = this.userJoinDate.getTime() > threeMonthsAgo.getTime();
    return this._isNewUser;
  }
  identifyUser({ userId, clientId, name }) {
    var _a;
    if (!userId && !clientId) {
      return;
    }
    if (!userId)
      ;
    else {
      this.posthog.identify(userId, {
        name,
        clientId,
        userJoinDate: (_a = this.userJoinDate) == null ? void 0 : _a.toISOString()
      });
    }
  }
  trackEvent(name, props, category) {
    if (!category) {
      category = void 0;
    }
    if (!name) {
      console.error("tracker.trackEvent", "cannot track event without name");
      return;
    }
    if (!props) {
      props = {};
    }
    props = {
      ...props,
      clientType: this.clientType,
      clientId: this.clientId
    };
    if (PHEventCategoryFilters[category]) {
      if (!PHEventCategoryFilters[category]({ p: this })) {
        return;
      }
    }
    this.posthog.capture(name, props);
  }
}
class MockTracker {
  trackEvent() {
  }
}
const LS_LAST_PAGE_VIEW_TS = "PH_lastPageViewTS";
let posthog = null;
let posthogLoaded = false;
let posthogEventTracker = null;
const posthogEventQueue = [];
let POSTHOG_CONFIG = {
  ...{ "enabled": true, "token": "phc_dj4782fjKWOwZ02v1cZa05bbWrbb4d2EAwPFhsBFD6W", "host": "https://eu.i.posthog.com" }
};
async function loadPosthog() {
  if (posthogLoaded) {
    return posthog;
  }
  let posthogModule = await importPosthog();
  posthogLoaded = true;
  posthog = posthogModule.default;
  return posthog;
}
async function setupPosthog() {
  if (!POSTHOG_CONFIG.enabled) {
    throw new Error("Posthog is not enabled");
  }
  if (!posthogLoaded) {
    await loadPosthog();
  }
  posthog.init(POSTHOG_CONFIG.token, {
    api_host: POSTHOG_CONFIG.host,
    autocapture: false,
    disable_session_recording: true,
    capture_pageview: false,
    capture_pageleave: false,
    persistence: "localStorage"
  });
  window.posthog = posthog;
  return posthog;
}
async function identifyUser({ user, clientId }) {
  try {
    const userId = user.id;
    if (!userId && !clientId) {
      console.error("identifyUser", "cannot identify user without userId or clientId");
      return;
    }
    const name = user.get("name");
    let userJoinDate;
    if (!userId && Supports.agents.local) {
      try {
        const { time } = await serviceProxy.store.Prefs.get("since");
        userJoinDate = new Date(time);
      } catch (e2) {
        console.error("cannot get the since.time value from the Prefs", e2);
        posthogEventTracker = new MockTracker();
        return;
      }
    } else {
      userJoinDate = new Date(user.get("ts"));
    }
    if (!posthogLoaded) {
      await setupPosthog();
    }
    posthogEventTracker = new PosthogEventTracker({
      clientId,
      userId,
      posthog
    });
    posthogEventTracker.setUserJoinDate(userJoinDate);
    posthogEventTracker.identifyUser({ userId, clientId, name });
    const Store = window.App.store;
    const lastPageViewTSStr = Store.get(LS_LAST_PAGE_VIEW_TS);
    if (!lastPageViewTSStr) {
      trackPageView();
      Store.set(LS_LAST_PAGE_VIEW_TS, new Date());
    } else {
      const lastPageViewTS = new Date(lastPageViewTSStr).getTime();
      if (Date.now() - lastPageViewTS > 24 * 60 * 60 * 1e3) {
        trackPageView();
        Store.set(LS_LAST_PAGE_VIEW_TS, new Date());
      }
    }
    for (const event of posthogEventQueue) {
      posthogEventTracker.trackEvent(event.name, event.props, event.category);
    }
    posthogEventQueue.length = 0;
  } catch (e2) {
    if (e2.message !== "Posthog is not enabled") {
      console.error("cannot identify user", e2);
    }
    posthogEventTracker = new MockTracker();
  }
}
async function trackEvent(name, props, category) {
  try {
    if (!posthogEventTracker) {
      if (posthogEventQueue.length > 100) {
        return;
      }
      posthogEventQueue.push({ name, props, category });
      return;
    }
    posthogEventTracker.trackEvent(name, props, category);
  } catch (e2) {
    console.error("cannot track event", name, e2);
  }
}
async function trackPageView() {
  trackEvent("$pageview", void 0, PHEventCategories.FIRST_PAGE_VIEW);
}
function applyFilters(json2, filters) {
  let prev = isArray(json2) ? [] : {};
  let filtersExecuted = [];
  if (filters.length === 1 && filters[0] === ".") {
    return json2;
  }
  let clone = structuredClone(prev);
  filters.forEach((filter) => {
    if (!isPrefix(filtersExecuted, filter)) {
      let operations = getOperationsArray(filter);
      try {
        prev = applyFilter(json2, operations, prev);
        clone = structuredClone(prev);
      } catch (e2) {
        prev = structuredClone(clone);
      }
      filtersExecuted.push(filter);
    }
  });
  return prev;
}
function applyFilter(data, operations, prev, explode = false) {
  let res = prev || {};
  let temp = res;
  let key;
  for (let index2 = 0; index2 < operations.length; index2++) {
    let op = operations[index2];
    if (op.includes("[]?")) {
      if (data === void 0) {
        throw new Error("Data Undefined");
      }
      key = op.split("[]?")[0];
      if (key) {
        data = data[key];
        if (!temp[key]) {
          temp[key] = [];
        }
        temp = temp[key];
      } else if (!prev) {
        res = [];
        temp = res;
      }
      if (!operations[index2 + 1]) {
        data.forEach((value) => temp.push(value));
      } else {
        let ops = operations.splice(index2 + 1);
        if (temp.length !== 0) {
          data.forEach((obj, i2) => applyFilter(obj, [...ops], temp[i2], true));
        } else {
          data.forEach(
            (obj) => temp.push(applyFilter(obj, [...ops], void 0, true))
          );
        }
      }
    } else if (op !== "") {
      data = data[op];
      if (data === void 0) {
        if (explode) {
          return res;
        } else {
          throw new Error("Data Undefined");
        }
      }
      if (isObject(data) && operations[index2 + 1]) {
        if (!temp[op]) {
          temp[op] = {};
        }
        temp = temp[op];
      } else {
        temp[op] = data;
      }
    }
  }
  return res;
}
function getOperationsArray(filter) {
  filter = filter.replace(/"/g, "");
  return filter.split(".");
}
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}
function isObject(data) {
  return Object.prototype.toString.call(data).slice(8, -1) === "Object";
}
function isArray(data) {
  return getType(data) === "Array";
}
function isPrefix(arr, str) {
  let res = false;
  for (let val of arr) {
    if (str.startsWith(val)) {
      res = true;
      break;
    }
  }
  return res;
}
function initStores(includedJSON = [], data = "") {
  const originalJson = writable(data);
  const includedJson = writable(includedJSON);
  return {
    originalJson,
    includedJson,
    previewJson: derived([includedJson, originalJson], ([$includedJson, $originalJson]) => applyFilters($originalJson, $includedJson))
  };
}
const ParsedPropertyName = "parsed__properties";
const NumberOfMerges = "number__merges";
const PrimitiveProperties = "primitive__properties";
function isInternalField(name) {
  switch (name) {
    case ParsedPropertyName:
    case NumberOfMerges:
    case PrimitiveProperties:
      return true;
    default:
      return false;
  }
}
let outputTemplate = {};
function merge2(template, obj) {
  const primitivePropertiesEncountered = {};
  Object.keys(obj).filter((k2) => !isInternalField(k2)).forEach((k2) => {
    switch (obj[ParsedPropertyName][k2]) {
      case types.OBJECT:
        if (!template[k2]) {
          template[k2] = {};
        } else {
          if (Array.isArray(template[k2])) {
            template[k2] = {};
          }
        }
        merge2(template[k2], obj[k2]);
        break;
      case types.ARRAY_OF_OBJECTS:
        if (!template[k2]) {
          template[k2] = obj[k2];
        } else if (template[k2].length === 1 && obj[k2].length === 1) {
          if (obj[ParsedPropertyName][k2] === template[ParsedPropertyName][k2]) {
            merge2(template[k2][0], obj[k2][0]);
          }
        }
        break;
      case types.ARRAY:
        if (!template[k2]) {
          template[k2] = [];
        }
        if (Array.isArray(template[k2])) {
          template[k2].push(obj[k2]);
        }
        break;
      case types.NULL:
      case types.PRIMITIVE:
        if (!template[k2]) {
          template[k2] = [];
          const numberOfMerges = template[NumberOfMerges] || 0;
          for (let i2 = 0; i2 < numberOfMerges; i2++) {
            template[k2].push(null);
          }
        }
        if (Array.isArray(template[k2]) && Array.isArray(obj[k2])) {
          template[k2].push(...obj[k2]);
        } else if (Array.isArray(template[k2])) {
          template[k2].push(obj[k2]);
        } else {
          break;
        }
        if (!template[PrimitiveProperties]) {
          template[PrimitiveProperties] = {};
        }
        template[PrimitiveProperties][k2] = true;
        primitivePropertiesEncountered[k2] = true;
        break;
    }
  });
  if (!template[ParsedPropertyName]) {
    template[ParsedPropertyName] = obj[ParsedPropertyName];
  } else {
    Object.keys(obj[ParsedPropertyName]).forEach((key) => {
      if (key in template[ParsedPropertyName]) {
        if (obj[ParsedPropertyName][key] !== types.NULL && template[ParsedPropertyName][key] !== types.UNKNOWN) {
          if (template[ParsedPropertyName][key] !== types.NULL && template[ParsedPropertyName][key] !== obj[ParsedPropertyName][key]) {
            template[key] = {};
            template[ParsedPropertyName][key] = types.UNKNOWN;
          } else
            template[ParsedPropertyName][key] = obj[ParsedPropertyName][key];
        }
      } else {
        template[ParsedPropertyName][key] = obj[ParsedPropertyName][key];
      }
    });
  }
  template[NumberOfMerges] = template[NumberOfMerges] ? ++template[NumberOfMerges] : 1;
  if (template[PrimitiveProperties]) {
    Object.keys(template[PrimitiveProperties]).filter((key) => !primitivePropertiesEncountered[key]).forEach((key) => {
      if (template[key]) {
        if (Array.isArray(template[key]))
          template[key].push(null);
      }
    });
  }
}
function createArrayTemplate(array, template) {
  let mergedObject = {};
  for (let arr of array) {
    const type2 = jsonType(arr);
    if (type2 === types.OBJECT) {
      const innerTemplate = createTemplate(arr, {});
      merge2(mergedObject, innerTemplate);
    }
  }
  template.push(mergedObject);
  return template;
}
function createTemplate(json2, template) {
  let properties = {};
  for (let key in json2) {
    if (Object.prototype.hasOwnProperty.call(json2, key)) {
      let type2 = jsonType(json2[key]);
      if (json2[key] === null) {
        type2 = types.NULL;
        template[key] = json2[key];
        properties[key] = types.NULL;
      } else if (type2 === types.OBJECT) {
        template[key] = createTemplate(json2[key], {});
        properties[key] = types.OBJECT;
      } else if (type2 === types.ARRAY) {
        if (isArrayOfObject(json2[key])) {
          template[key] = createArrayTemplate(json2[key], []);
          properties[key] = types.ARRAY_OF_OBJECTS;
        } else {
          template[key] = json2[key];
          properties[key] = types.ARRAY;
        }
      } else {
        template[key] = json2[key];
        properties[key] = types.PRIMITIVE;
      }
    }
  }
  template[ParsedPropertyName] = properties;
  return template;
}
function performJSONParsing(json2) {
  const type2 = jsonType(json2);
  if (type2 === types.ARRAY) {
    if (isArrayOfObject(json2)) {
      outputTemplate = createArrayTemplate(json2, []);
    } else if (isArrayOfPrimitives(json2)) {
      outputTemplate = json2;
    } else {
      outputTemplate = "Array";
    }
  } else if (type2 === types.OBJECT) {
    outputTemplate = createTemplate(json2, {});
  } else {
    return {
      msg: "Invalid Json"
    };
  }
  return outputTemplate;
}
function sanitize(parsedJSON, fieldName) {
  if (!parsedJSON) {
    return parsedJSON;
  } else if (Array.isArray(parsedJSON)) {
    for (let i2 = 0; i2 < parsedJSON.length; i2++) {
      sanitize(parsedJSON[i2], fieldName);
    }
  } else if (jsonType(parsedJSON) === types.OBJECT) {
    if (Object.prototype.hasOwnProperty.call(parsedJSON, fieldName)) {
      delete parsedJSON[fieldName];
    }
    Object.keys(parsedJSON).filter((k2) => parsedJSON[k2]).filter((k2) => !isPrimitive(parsedJSON[k2])).forEach((k2) => sanitize(parsedJSON[k2], fieldName));
  }
}
function setValue(parsedJSON, fieldName, value) {
  if (!parsedJSON) {
    return parsedJSON;
  } else if (Array.isArray(parsedJSON)) {
    for (let i2 = 0; i2 < parsedJSON.length; i2++) {
      setValue(parsedJSON[i2], fieldName, value);
    }
  } else if (jsonType(parsedJSON) === types.OBJECT && parsedJSON.type) {
    parsedJSON[fieldName] = value;
  }
  Object.keys(parsedJSON).filter((k2) => parsedJSON[k2]).filter((k2) => !isPrimitive(parsedJSON[k2])).forEach((k2) => setValue(parsedJSON[k2], fieldName, value));
}
function jsonParser(json2) {
  const parsedJSON = performJSONParsing(json2);
  sanitize(parsedJSON, NumberOfMerges);
  sanitize(parsedJSON, PrimitiveProperties);
  return parsedJSON;
}
export { qs as $, Api as A, querystring as B, C$1 as C, push$1 as D, Editor as E, FormModel as F, Base$1 as G, html as H, ID as I, getVar as J, getDef as K, defs as L, Model$1 as M, NodePart as N, And as O, Or as P, SingleRule as Q, Router as R, Supports as S, TXT as T, hasNumeric as U, View as V, RuleToTypeMap as W, formatInterval as X, getShortDisplayText as Y, Macros as Z, render as _, removeNodes as a, withWindow as a$, Macro as a0, formatTimeV2 as a1, location as a2, trackEvent as a3, PHEvents as a4, jsonType as a5, isArrayOfObject as a6, ParsedPropertyName as a7, sanitize as a8, isPrimitiveType as a9, ADBLOCKER_ID as aA, V1 as aB, V2 as aC, formatLogTime as aD, SieveDataCollection as aE, MacroModel as aF, Crawler as aG, SieveFormModel as aH, CrawlerJob as aI, mustMatchRegex as aJ, verifyEnum as aK, getCurrentRoute as aL, PHEventCategories as aM, JSONEdit as aN, getBasePath as aO, pop as aP, Crawlers as aQ, JobStates as aR, getDuration as aS, CrawlerJobs as aT, replace$1 as aU, Self as aV, Core as aW, identifyUser as aX, updateTeam as aY, updateRoute as aZ, loadLang as a_, isPrimitive as aa, isArrayOfPrimitives as ab, initStores as ac, jsonParser as ad, getInterval as ae, _typeof as af, getUTCWeekYear as ag, startOfUTCWeek as ah, startOfUTCISOWeek as ai, requiredArgs as aj, toDate as ak, getUTCWeek as al, toInteger as am, getUTCISOWeek as an, getDefaultOptions as ao, defaultLocale as ap, longFormatters$1 as aq, isProtectedWeekYearToken as ar, throwProtectedError as as, isProtectedDayOfYearToken as at, subMilliseconds as au, getTimezoneOffsetInMilliseconds as av, assign$1 as aw, isValid as ax, getNameFromURL as ay, EXT_ID_PROPS as az, Msg as b, Params as b0, Types as b1, setValue as b2, MESSAGES as b3, commonjsGlobal as b4, getDefaultExportFromCjs as b5, createMarker as c, directive as d, createFieldStore as e, TYPES as f, FieldList as g, register as h, derived as i, ModelClient as j, i18n as k, AttrModel as l, route as m, SieveActionDescList as n, isQuotaAvailable as o, params as p, cannotBeLessThan as q, reparentNodes as r, base$1 as s, formatTime as t, urlCfg as u, toISOString as v, writable as w, isStaticDatasource as x, types as y, format as z };
