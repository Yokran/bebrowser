/*
Copyright (c) 2011 Didit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

/**
 * Module dependencies.
 */

/**
 * Utils.
 */

var utils = {};

var doubleQuote = utils.doubleQuote = function(value, outValues) {
  if (nil(value)) {
    return "NULL";
  } else if (_(value).isNumber()) {
    return value;
  } else if (_(value).isArray()) {
    return "(" + toCsv(value, outValues) + ")";
  } else if (_(value).isDate()) {
    return '"' + toDateTime(value) + '"';
  } else {
    return '"' + value + '"';
  }
};

var fieldIsValid = utils.fieldIsValid = function(model, field) {
  var columns = _(model.fields).pluck('name');
  return _.include(columns, field.split('.')[0]);
};

var hasWhiteSpace = utils.hasWhiteSpace = function(value) {
  return /\s/g.test(value);
};

var keysFromObject = utils.keysFromObject = function(fields) {
  return _(fields).chain()
    .map(function(field) {
      return _(field).keys();
    })
    .flatten()
    .uniq()
    .value();
};

var nil = utils.nil = function(value) {
  if (_(value).isUndefined() || _(value).isNull() || _(value).isNaN()) {
    return true;
  } else if (_(value).isArray() && _(value).isEmpty()) {
    return true;
  } else if (value.toString() === '[object Object]' && _(value).isEmpty()) {
    return true;
  } else if (_(value).isString() && _(value).isEmpty()) {
    return true;
  } else {
    return false;
  }
};

var quote = utils.quote = function(outValues, operator, value) {
  if (operator === 'IN' || operator === 'NOT IN') {
    var valuePos = _.range(outValues.length - value.length+1, outValues.length+1);
    var values = _.reduce(valuePos, function(memo, pos, i) {
      memo += '?';
      if (i+1 !== valuePos.length) memo += ',';
      return memo;
    }, '');
    return '(' + values + ')';
  } else if (operator === 'ILIKE') {
    return 'UPPER(?)';
  } else {
    return '?';
  }
};

var toCsv = utils.toCsv = function(list, keys, outValues) {
  return  _(list).chain()
          .values()
          .map(function(o) { outValues.push(o); return '$' + outValues.length; })
          .join(',')
          .value();
};

var toPlaceholder = utils.toPlaceholder = function(list, keys, outValues) {
  return _(list).chain()
         .values()
         .map(function(o) { outValues.push(o); return '?'; })
         .join(', ')
         .value();
};

var toDateTime = utils.toDateTime = function(value) {
  if (_(value).isDate()) {
    return value.getFullYear()
    + '/' + (value.getMonth()+1)
    + '/' + (value.getDate())
    + ' ' + (value.getHours())
    + ':' + (value.getMinutes())
    + ':' + (value.getSeconds());
  }
};

var validFields = utils.validFields = function(model, fields) {
  var returnFields = {};
  _(fields).each(function(value, key) {
    if (fieldIsValid(model, key)) {
      returnFields[key] = value;
    }
  });
  return returnFields;
};


function addColumn(column) {
  var parts = [column.name];
  switch(column.type) {

    case 'boolean':
    case 'integer':
    parts.push('INTEGER');
    break;

    case 'string':
    parts.push('TEXT');
    break;

    case 'timestamp':
    parts.push('TIMESTAMP');
    break;

    case 'json':
    parts.push('TEXT');
    break;

    default:
    console.error('Unsupported column type:' + ':' + (column.type));
    throw new Error('Unknown column type');
    break;
  }

  column.unique && parts.push('UNIQUE');
  column.primaryKey && parts.push('PRIMARY KEY');
  !_.isUndefined(column.default) && parts.push('DEFAULT ', column.default);

  return parts.join(' ');
}

/**
 * Statements.
 */

var Statements = {};

function fixPgIssues(val) {
  /* The current build of pg doesn't know how to bind an
   * undefined value, so we're going to be nice and coerce
   * any of 'em to null for now */
  if (val === undefined)
    return null;

  return val;
};

Statements.alterTableAddColumn = function(model, column) {
  var
  columnsDef = addColumn(column),
  sql = 'ALTER TABLE ' + model.tableName + ' ADD COLUMN ' + columnsDef;
  return sql;
};

Statements.createTable = function(model) {
  var
  columnsDefs = _.map(model.fields, addColumn),
  sql = 'CREATE TABLE IF NOT EXISTS ' + model.tableName + ' (' +
    columnsDefs.join(', ')+ (model.extension || '') + ')';

  return sql;
}

Statements.select = function(model, selector, opts, outValues) {
  var fields = buildSelectFields(model, opts)
    , stmt   = "SELECT " + fields + " FROM " + model.tableName
    , join   = buildJoinClause(model, opts)
    , where  = buildWhereClause(model, selector, outValues)
    , limit  = buildLimitClause(opts)
    , offset = buildOffsetClause(opts)
    , order  = buildOrderClause(opts);

  //console.log('SELECT:', model.tableName, selector, where, outValues);
  return stmt + join + where + order + limit + offset + ';';
};

Statements.insert = function(model, obj, outValues) {
  var stmt = "INSERT INTO " + model.tableName
    , fields = buildInsertFields(model, obj, outValues);

  return stmt + fields + ';';
};

Statements.update = function(model, selector, obj, outValues) {
  var stmt  = "UPDATE " + model.tableName
    , set   = buildUpdateFields(model, obj, outValues)
    , where = buildWhereClause(model, selector, outValues);

  return stmt + set + where + ';';
};

Statements.destroy = function(model, selector, outValues) {
  var stmt  = "DELETE FROM " + model.tableName
    , where = buildWhereClause(model, selector, outValues);

  return stmt + where + ";"
};

Statements.truncate = function(model, opts) {
  var opts = opts === undefined ? {} : opts
    , stmt = "TRUNCATE " + model.tableName

  /*
   *if (opts.cascade) {
   *  stmt += " CASCADE";
   *}
   */

  return stmt + ";"
};

Statements.information = function(model) {
  var stmt =  "SELECT column_name, is_nullable, data_type, " +
              "character_maximum_length, column_default " +
              "FROM information_schema.columns " +
              "WHERE table_name = '" + model.tableName + "';";

  return stmt;
};

var buildInsertFields = function(model, fields, outValues) {
  if (!_(fields).isArray()) {
    fields = [fields]
  }
  fields = _.map(fields, function(field) {
   return utils.validFields(model, field)
  })
  var keys =  utils.keysFromObject(fields)
    , vals =  buildMultiInsert(fields, keys, outValues);

  return "(" + keys + ") VALUES" + vals
};

var buildJoinClause = function(model, opts) {
  if (_(opts.join).isUndefined()) {
    return "";
  } else {
    model.fields = model.fields.concat(opts.join.model.fields);
    return " INNER JOIN "  + opts.join.model.tableName + " ON " +
      model.tableName + "." + model.primaryKey + "=" +
      opts.join.model.tableName + "." + opts.join.key;
  }
};

var buildLimitClause = function(opts) {
  if (_(opts.limit).isUndefined()) {
    return "";
  } else {
    return " LIMIT " + opts.limit;
  }
};

var buildOffsetClause = function(opts) {
  if(_(opts.offset).isUndefined()) {
    return "";
  } else {
    return (_(opts.limit).isUndefined()?" LIMIT 100000000":"") + " OFFSET " + opts.offset;
  }
};

var buildMultiInsert = function(fields, keys, outValues) {
  return _(fields).chain()
    .map(function(field) {
      var vals = _(keys).map(function(key) {
        outValues.push(fixPgIssues(field[key]));
        //outValues.push(field[key]);
        return '?'
      });
      return "(" + vals + ")";
    })
    .join(', ')
    .value();
};
var buildAndStatement = function (model, or, outValues) {
  var statement = _.map(or, function (value, key) {
    if (_.isNumber(key)) {
      // Handle case when values are specified as an array
      key = value[0];
      value = value[1];
    }
    if (key.slice(0, 4) === '$and') return buildAndStatement(model, value, outValues);
    if (key.slice(0, 4) === '$or') return buildOrStatement(model, value, outValues);
    if (utils.fieldIsValid(model, key)) return buildOperator(model, key, value, outValues);
  });

  return '(' + statement.join(' AND ') + ')';
};
var buildOrStatement = function (model, or, outValues) {
  var statement = _.map(or, function (value, key) {
    if (_.isNumber(key)) {
      // Handle case when values are specified as an array
      key = value[0];
      value = value[1];
    }
    if (key.slice(0, 4) === '$and') return buildAndStatement(model, value, outValues);
    if (key.slice(0, 4) === '$or') return buildOrStatement(model, value, outValues);
    if (utils.fieldIsValid(model, key)) return buildOperator(model, key, value, outValues);
    throw new Error(`table "${model.name}" doesn't contain column "${key.split('.')[0]}"`);
  });

  return '(' + statement.join(' OR ') + ')';
};

var buildOperator = function(model, key, value, outValues) {
  if(_.isNumber(key)) {
    // Handles case when input to $or or $and is an array
    key = value[0];
    value = value[1];
  }
  var
  field = key.split('.')[0],
  op = key.split('.')[1];

  if(value === null || value === void 0 || value === '$null') {
    if(op == 'ne') {
      return field + ' IS NOT NULL';
    } else {
      return field + ' IS NULL';
    }
  }

  let order = 0;
  switch(op) {
  case 'ne': case 'not':
    var operator = "<>";
    break;
  case 'gt':
    var operator = ">";
    break;
  case 'lt':
    var operator = "<";
    break;
  case 'gte':
    var operator = ">=";
    break;
  case 'lte':
    var operator = "<=";
    break;
  case 'like':
    var operator = "LIKE";
    break;
  case 'nlike': case 'not_like':
    var operator = "NOT LIKE";
    break;
  case 'ilike':
    var operator = "ILIKE";
    field = 'UPPER('+field+')';
    break;
  case 'nilike': case 'not_ilike':
    var operator = "NOT ILIKE";
  case 'in':
    var operator = "IN";
    break;
  case 'nin': case 'not_in':
    var operator = "NOT IN";
    break;
  case 'textsearch':
    var operator = "@@";
  	break;
  case 'rnipcre':
    order = 1;
    var operator = "NOT REGEXP"
    break;
  case 'ripcre':
    order = 1;
    var operator = "REGEXP"
    break;
  default:
    var operator = "=";
  }

  if(_.isObject(value) && value.type == 'field') {
    var name = value.name;
    if(!utils.fieldIsValid(model, name)) {
      name == 'INVALID_NAME';
    }
    return field + ' ' + operator + ' ' + name;
  }

  outValues.push(fixPgIssues(value));
  //outValues.push(value);
  //outValues = _.flatten(outValues);
  outValues.push.apply(outValues, _.flatten(outValues.splice(0)));

  if (key.split('.')[1] == 'textsearch') {
    return (
      "to_tsvector('english', " +
      field +
      ') ' +
      operator +
      " to_tsquery('english', " +
      utils.quote(outValues, operator) +
      ')'
    );
  } else {
    if (order === 0) {
      return (
        field +
        ' ' +
        (operator === 'ILIKE' ? 'LIKE' : operator) +
        ' ' +
        utils.quote(outValues, operator, value)
      );
    } else if (order === 1) {
      return operator + '(' + utils.quote(outValues, operator, value) + ',' + field + ')';
    }
  }
};

var buildOrderClause = function(opts) {
  if (_(opts.order).isUndefined()) {
    return "";
  } else {
    var orderFields = _(opts.order).chain()
      .map(function(orderField) {
        var direction  = orderField[0] === '-' ? "DESC" : "ASC";
        var suffix = '';
        if(orderField.indexOf(' ') > 0) {
          var parts = orderField.split(' ');
          orderField = parts[0];
          if(parts[1] == 'nocase') {
            suffix = 'COLLATE NOCASE';
          }
        }
        var orderField = orderField[0] === '-' ?
          utils.doubleQuote(orderField.substring(1, orderField.length)) :
          utils.doubleQuote(orderField);
        return orderField + " " + suffix + " " + direction + " " + "NULLS first";
      })
      .join(', ')
      .value();

    return " ORDER BY " + orderFields;
  }
};

var buildSelectFields = function(model, opts) {
  if (_(opts.only).isUndefined()) {
    if (!_(opts.join).isUndefined()) {
      return model.tableName + ".*";
    } else {
      return (opts.count)?"COUNT(*) AS count":"*";
    }
  } else if (_(opts.only).isArray()) {
    var columns = _(model.fields).pluck('name');
    var valid_fields = _.select(opts.only, function(valid_field) {
      return _.include(columns, valid_field);
    });
    return _(valid_fields).isEmpty() ? "*" : valid_fields.join(', ');
  } else {
    var columns = _(model.fields).pluck('name');
    var alias_fields = [];
    _.map(opts.only, function(value, key) {
      if (_.include(columns, key))
        alias_fields.push(key+' AS '+utils.doubleQuote(value));
    });
    return _(alias_fields).isEmpty() ? "*" : alias_fields.join(', ');
  }
};

var buildUpdateFields = function(model, fields, outValues) {
  var fields = utils.validFields(model, fields)
    , pred   =  _(fields).chain()
                .map(function(value, key) {
                  outValues.push(fixPgIssues(value));
                  return key + '= ?'
                })
                .join(', ')
                .value();

  return utils.nil(pred) ? '' : " SET " + pred;
};

var buildPredicate = function(model, selector, outValues) {
  if (utils.nil(selector)) {
    var pred = '';
  } else if (_(selector).isNumber() || _(selector).isString()) {
    var id = selector;
    var pred = model.primaryKey + " = '" + id + "'";
  } else {
    var pred =  _(selector).chain()
                .map(function(value, key) {
                  if(_.isNumber(key)) {
                    // Handle case when values are specified as an array
                    key = value[0];
                    value = value[1];
                  }
                  if (key.slice(0,3) === '$or')
                    return buildOrStatement(model, value, outValues)
                  if (key.slice(0, 4) === '$and') {
                    return '(' + buildPredicate(model, value, outValues) + ')';
                  }
                  if (utils.fieldIsValid(model, key))
                    return buildOperator(model, key, value, outValues);
                })
                .compact()
                .join(' AND ')
                .value();
    pred += utils.nil(pred) ? 'INVALID' : '';
  }

  return pred;
};

var buildWhereClause = function(model, selector, outValues) {
  var pred = buildPredicate(model, selector, outValues);
  return utils.nil(pred) ? '' : " WHERE " + pred;
};

