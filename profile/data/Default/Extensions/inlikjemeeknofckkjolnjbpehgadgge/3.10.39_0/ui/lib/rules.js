// supports esm as well as regular format
let _ = typeof window !== 'undefined' ? window._ : null;
let C = typeof window !== 'undefined' ? window.C : null;

// TODO async loading will break usage if module is used immediately after being
// imported
const initPromise = (async () => {
  if (!_) {
    _ = await import('underscore');
  }
  if (!C) {
    ({ default: C } = await import('./const.js'));
  }
})();

export function findNumbers(text, numberFormat) {
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
      throw new Error('unknown number format:' + numberFormat);
  }
}

function containsText(text1, text2) {
  if (!_.isString(text1)) {
    throw new Error('invalid type of text: ' + typeof text1);
  }
  text2 || (text2 = '');
  if (!_.isString(text2)) {
    throw new Error('invalid type of text: ' + typeof text2);
  }
  return text1.toLowerCase().includes(text2.toLowerCase());
}

function findNumbersCommaDot(text) {
  // XXX Fix text is undefined error
  let matches = text ? text.match(/-*[0-9,.]+/g) || [] : [];
  let numbers = [];
  for (let i = 0, len = matches.length; i < len; i += 1) {
    let a_num = matches[i];
    if (a_num.length > 0) {
      a_num = parseFloat(a_num.replace(/([\s,]*)/g, ''));
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
  for (let i = 0, len = matches.length; i < len; i += 1) {
    let a_num = matches[i];
    if (a_num.length > 0) {
      a_num = a_num.replace(/\./g, '*');
      a_num = a_num.replace(/,/g, '.');
      a_num = a_num.replace(/\.(?=.*\.)/g, '');
      a_num = a_num.replace(/\*/g, '');
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
    '$diff.new': '$diff.old',
    '$new': '$old',
    '$summary.new': '$summary.old'
  };

  for (let [newOperand, oldOperand] of Object.entries(newToOld)) {
    if (leftOperand.startsWith(newOperand)) {
      return oldOperand + leftOperand.substring(newOperand.length);
    }
  }

  throw new Error("unreachable ", leftOperand)
}

// This function just supports Spaces(32) and not the half spaces(8201)
// or other white space characters.
//
//  https://en.wikipedia.org/wiki/Decimal_separator#Digit_grouping
function findNumbersSpaceComma(text) {
  let matches = text ? text.match(/-*[\d,.\s]+/g) || [] : [];
  let numbers = [];
  for (let i = 0, len = matches.length; i < len; i += 1) {
    let a_num = matches[i];
    if (a_num.length > 0) {
      a_num = a_num.replace(/\s/g, '');
      a_num = a_num.replace(/\./g, '');
      a_num = a_num.replace(/,(?=.*,)/g, '');
      a_num = a_num.replace(',', '.');
      a_num = parseFloat(a_num);
      if (!isNaN(a_num)) {
        numbers.push(a_num);
      }
    }
  }
  return numbers;
}

const intoString = (val) => {
  if (val === undefined) return '';
  if (typeof val === 'string') return val;
  return JSON.stringify(val);
};

const defs = {
  contains: {
    id: 'contains',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return containsText(left, right);
    },
    fieldType: 'text'
  },
  not_contains: {
    id: 'not_contains',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return !containsText(left, right);
    },
    fieldType: 'text'
  },
  starts_with: {
    id: 'starts_with',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return left.startsWith(right);
    },
    fieldType: 'text'
  },
  not_starts_with: {
    id: 'not_starts_with',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return !left.startsWith(right);
    },
    fieldType: 'text'
  },
  ends_with: {
    id: 'ends_with',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return left.endsWith(right);
    },
    fieldType: 'text'
  },
  not_ends_with: {
    id: 'not_ends_with',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return !left.endsWith(right);
    },
    fieldType: 'text'
  },
  is_empty: {
    id: 'is_empty',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return _.isEmpty(left);
    },
    fieldType: null
  },
  not_is_empty: {
    id: 'not_is_empty',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      return !_.isEmpty(left);
    },
    fieldType: null
  },
  has_num_lt: {
    id: 'has_num_lt',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      return _.any(numbers, function (num) {
        return num < right;
      });
    },
    fieldType: 'number'
  },
  has_num_gt: {
    id: 'has_num_gt',
    match: (leftOperand, right, context) => {
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      return _.any(numbers, function (num) {
        return num > right;
      });
    },
    fieldType: 'number'
  },
  has_num_decr_min: {
    id: 'has_num_decr_min',
    match: (leftOperand, right, context) => {
      let oldOperand = getOldOperand(leftOperand);
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      // NOTE We do not have oldInserts when content type is CHANGED_TEXT.
      let oldText = intoString(getVar(oldOperand, context));
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      // Match numbers at same index.
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        if (oldNumbers[i] - numbers[i] > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: 'number'
  },
  has_num_incr_min: {
    id: 'has_num_incr_min',
    match: (leftOperand, right, context) => {
      let oldOperand = getOldOperand(leftOperand);
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      // NOTE We do not have oldInserts when content type is CHANGED_TEXT.
      let oldText = intoString(getVar(oldOperand, context));
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      // Match numbers at same index.
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        if (numbers[i] - oldNumbers[i] > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: 'number'
  },
  has_num_decr_pct_min: {
    id: 'has_num_decr_pct_min',
    match: (leftOperand, right, context) => {
      let oldOperand = getOldOperand(leftOperand);
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      // NOTE We do not have oldInserts when content type is CHANGED_TEXT.
      let oldText = intoString(getVar(oldOperand, context));
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      // Match numbers at same index.
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        const percentChange = ((oldNumbers[i] - numbers[i]) * 100) / oldNumbers[i];
        if (percentChange > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: 'number'
  },
  has_num_incr_pct_min: {
    id: 'has_num_incr_pct_min',
    match: (leftOperand, right, context) => {
      let oldOperand = getOldOperand(leftOperand);
      let left = intoString(getVar(leftOperand, context));
      let numbers = findNumbers(left, context.numberFormat);
      // NOTE We do not have oldInserts when content type is CHANGED_TEXT.
      let oldText = intoString(getVar(oldOperand, context));
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      // Match numbers at same index.
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        const percentChange = ((numbers[i] - oldNumbers[i]) * 100) / oldNumbers[i];
        if (percentChange > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: 'number'
  },
  length_lt: {
    id: 'length_lt',
    match(leftOperand, right, context) {
      let left = intoString(getVar(leftOperand, context));
      return left.length < right;
    },
    fieldType: 'number'
  },
  length_gt: {
    id: 'length_gt',
    match(leftOperand, right, context) {
      let left = intoString(getVar(leftOperand, context));
      return left.length > right;
    },
    fieldType: 'number'
  },
  match_regex: {
    id: 'match_regex',
    match(leftOperand, right, context) {
      let left = intoString(getVar(leftOperand, context));
      return !!left.match(new RegExp(right.expr, right.flags));
    },
    fieldType: 'regex',
    defaultValue: () => ({ expr: '', flags: 'gim' })
  },
  not_match_regex: {
    id: 'not_match_regex',
    match(leftOperand, right, context) {
      let left = intoString(getVar(leftOperand, context));
      return !left.match(new RegExp(right.expr, right.flags));
    },
    fieldType: 'regex',
    defaultValue: () => ({ expr: '', flags: 'gim' })
  },
  not_match_any_previous_text: {
    id: 'not_match_any_previous_text',
    match: (leftOperand, right, context) => {
      let newTextHash = context.hashedValues.newTextHash;
      let oldTextHashes = context.hashedValues.oldTextHashes;
      return !oldTextHashes.includes(newTextHash);
    },
    fieldType: null
  },
  is_true: {
    id: 'is_true',
    operandType: 'json',
    featureFlagRevision: 1,
    match: (leftOperand, _right, context) => {
      let left = getVar(leftOperand, context);
      return left === true;
    },
    fieldType: null
  },
  is_false: {
    id: 'is_false',
    operandType: 'json',
    featureFlagRevision: 1,
    match: (leftOperand, _right, context) => {
      let left = getVar(leftOperand, context);
      return left === false;
    },
    fieldType: null
  },
  is_null: {
    id: 'is_null',
    operandType: 'json',
    featureFlagRevision: 1,
    match: (leftOperand, _right, context) => {
      let left = getVar(leftOperand, context);
      return left === null;
    },
    fieldType: null
  },
  is_present: {
    id: 'is_present',
    operandType: 'json',
    featureFlagRevision: 1,
    match: (leftOperand, _right, context) => {
      let left = getVar(leftOperand, context);
      return left !== undefined;
    },
    fieldType: null
  }
};

const defValues = Object.values(defs);
const NUMERICS = defValues.filter((def) => def.fieldType == 'number').map((def) => def.id);

function getDef(id) {
  return defs[id];
}

function matchSingleRuleV2(rule, context) {
  const [op, left, right] = rule;
  return defs[op].match(left, right, { ...context });
}

function matchRuleConfigV2(rules, context) {
  // 0 anded rules => true
  return (
    rules.length < 2 ||
    rules.slice(1).some((orEdAndEdRules) => {
      return orEdAndEdRules.slice(1).every(([op, left, right]) => {
        // console.log('matching', op, left, right, getVar(left, context));
        return defs[op].match(left, right, context);
      });
    })
  );
}

function matchRuleConfigV1(config, inserts, dels, text, oldText, numberFormat) {
  if (config.type == C.TYPE_RULE) {
    return matchRule_RULE(config, inserts, dels, text, oldText, numberFormat);
  } else if (config.type == C.TYPE_RULE_GROUP) {
    return matchRule_RULE_GROUP(config, inserts, dels, text, oldText, numberFormat);
  } else {
    throw new Error('unknown type of rule config ' + config.type);
  }
}

const V1 = '1.0.0';
const V2 = '2.0.0';

function matchRule_RULE(config, inserts, dels, text, oldText, numberFormat) {
  let content = text;
  let oldContent = oldText;
  let matched = false;
  let numbers;
  let oldNumbers;
  const rule = config.rule;
  const params = rule.params;

  if (config.contentType == C.CONTENT_TYPE_CHANGED_TEXT) {
    content = inserts;
    oldContent = dels;
  } else if (config.contentType == C.CONTENT_TYPE_OLD_TEXT) {
    content = oldText;
  }

  // console.log('matchRule_RULE: params, content:', params, config);

  switch (rule.type) {
    case C.RULE_NOT_EMPTY:
      matched = !_.isEmpty(content);
      break;

    case C.RULE_HAS_TEXT:
      matched = containsText(content, params.input);
      break;

    case C.RULE_HAS_TEXT_NOT:
      matched = !containsText(content, params.input);
      break;

    case C.RULE_HAS_NUMBER_LT:
      numbers = findNumbers(content, numberFormat);
      matched = _.any(numbers, function (num) {
        return num < params.input;
      });
      break;

    case C.RULE_HAS_NUMBER_GT:
      numbers = findNumbers(content, numberFormat);
      matched = _.any(numbers, function (num) {
        return num > params.input;
      });
      break;

    case C.RULE_HAS_NUMBER_DECR_MIN:
      numbers = findNumbers(content, numberFormat);
      // NOTE We do not have oldInserts when content type is CHANGED_TEXT.
      oldNumbers = findNumbers(oldContent, numberFormat);
      // Match numbers at same index.
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        if (oldNumbers[i] - numbers[i] > params.input) {
          matched = true;
          break;
        }
      }
      break;

    case C.RULE_HAS_NUMBER_INCR_MIN:
      numbers = findNumbers(content, numberFormat);
      // NOTE We do not have oldInserts when content type is CHANGED_TEXT.
      oldNumbers = findNumbers(oldContent, numberFormat);
      // Match numbers at same index.
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        if (numbers[i] - oldNumbers[i] > params.input) {
          matched = true;
          break;
        }
      }
      break;

    case C.RULE_HAS_NUMBER_DECR_PERCENT_MIN:
      numbers = findNumbers(content, numberFormat);
      // NOTE We do not have oldInserts when content type is CHANGED_TEXT.
      oldNumbers = findNumbers(oldContent, numberFormat);
      // Match numbers at same index.
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        var percentChange = ((oldNumbers[i] - numbers[i]) * 100) / oldNumbers[i];
        if (percentChange > params.input) {
          matched = true;
          break;
        }
      }
      break;

    case C.RULE_HAS_NUMBER_INCR_PERCENT_MIN:
      numbers = findNumbers(content, numberFormat);
      // NOTE We do not have oldInserts when content type is CHANGED_TEXT.
      oldNumbers = findNumbers(oldContent, numberFormat);
      // Match numbers at same index.
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        var percentChange = ((numbers[i] - oldNumbers[i]) * 100) / oldNumbers[i];
        if (percentChange > params.input) {
          matched = true;
          break;
        }
      }
      break;

    case C.RULE_MATCH_REGEX:
      matched = content.match(new RegExp(params.input.expr, params.input.flags)) != null;
      break;

    default:
      return false;
  }
  return matched;
}

function matchRule_RULE_GROUP(config, inserts, dels, text, oldText, numberFormat) {
  // console.log('matchRule_RULE_GROUP:  ', config);

  return (
    !config.rules ||
    config.rules.length === 0 ||
    _[config.op == C.OP_AND ? 'all' : 'any'](config.rules, function (ruleConfig) {
      return matchRuleConfigV1(ruleConfig, inserts, dels, text, oldText, numberFormat);
    })
  );
}

/**
 * Gets the value at `path` of `object`.
 * @param {Object} object
 * @param {string|Array} path
 * @returns {*} value if exists else undefined
 */
const get = (object, path) => {
	if (typeof path === "string") path = path.split(".").filter(key => key.length);
	return path.reduce((dive, key) => dive && dive[key], object);
};

function getVar(name, context) {
  // Resolve json paths
  if (name.includes('.')) {
    const [n, path] = name.split(/\.(.*)/s);
    return get(context.vars[n], path);
  }

  return context.vars[name];
}

const getParsedJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
};

function matchRule(context, prefs) {
  let rule = context.rule;

  const vars = {
    $diff: {
      new: context.inserts,
      old: context.dels,
      net_add: context.net_additions,
      net_del: context.net_deletions
    },
    $new: context.sieve_data.text,
    $old: context.old_sieve_data?.text || '',
    $summary: {
      new: context.sieve_data.summary || {},
      old: context.old_sieve_data?.summary || {}
    }
  };

  // For JSON types, we pass json as input
  if (context.sieve.content_type === C.TYPE_JSON) {
    vars.$new = getParsedJSON(context.sieve_data.text);
    vars.$old = getParsedJSON(context.old_sieve_data?.text);
  }

  const hashedValues = {
    newTextHash: context.newTextHash,
    oldTextHashes: context.oldTextHashes
  };

  let globalConfig = prefs.rule;
  let matchedGlobal = true;

  if (globalConfig) {
    if (globalConfig.version == V2) {
      matchedGlobal = matchRuleConfigV2(globalConfig.rules, {
        numberFormat: globalConfig.numberFormat,
        vars,
        hashedValues
      });
    } else {
      matchedGlobal = matchRuleConfigV1(
        globalConfig,
        context.inserts,
        context.dels,
        context.sieve_data.text,
        context.old_sieve_data?.text || '',
        globalConfig.numberFormat
      );
    }
  }

  if (!matchedGlobal) {
    return false;
  }

  if (!rule) {
    return true;
  }

  let config = JSON.parse(rule.config);

  if (!config) {
    return true;
  }

  if (rule.version == V2) {
    return matchRuleConfigV2(config.rules, {
      numberFormat: config.numberFormat,
      vars,
      hashedValues
    });
  } else {
    return matchRuleConfigV1(
      config,
      context.inserts,
      context.dels,
      context.sieve_data.text,
      context.old_sieve_data?.text || '',
      config.numberFormat
    );
  }
}

export {
  V1,
  V2,
  defs,
  getDef,
  getVar,
  NUMERICS,
  initPromise,
  matchRule,
  matchRuleConfigV1,
  matchRuleConfigV2,
  matchSingleRuleV2
};
