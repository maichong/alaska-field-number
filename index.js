/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const numeral = require('numeral');

class NumberField extends alaska.Field {
  init() {
    let field = this;
    this.underscoreMethod('format', function (format) {
      if (format) {
        return numeral(this.get(field.path)).format(format);
      }
      return this.get(field.path);
    });
  }

  createFilter(filter) {
    let value;
    if (typeof filter === 'object') {
      value = filter.value;
    } else if (typeof filter === 'number' || typeof filter === 'string') {
      value = filter;
    }
    if (value !== undefined) {
      value = parseFloat(value);
      return isNaN(value) ? undefined : value;
    }

    //区间
    let bt;
    if (filter instanceof Array) {
      bt = filter;
    } else if (filter.$bt && filter.$bt instanceof Array) {
      bt = filter.$bt;
    }
    if (bt && bt.length === 2) {
      let start = parseFloat(bt[0]);
      let end = parseFloat(bt[1]);
      if (isNaN(start) || isNaN(end)) {
        return;
      }
      return { $gte: start, $lte: end };
    }

    //比较
    ['$gt', '$gte', '$lt', '$lte'].forEach((key) => {
      let val = filter[key];
      if (val === undefined) {
        return;
      }
      val = parseFloat(val);
      if (isNaN(val)) {
        return;
      }
      if (!value) {
        value = {};
      }
      value[key] = val;
    });
    if (value) {
      return value;
    }
  }
}

NumberField.views = {
  cell: {
    name: 'NumberFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'NumberFieldView',
    field: __dirname + '/lib/view.js'
  }
};

NumberField.plain = Number;
NumberField.options = ['min', 'max'];
NumberField.viewOptions = ['min', 'max', 'format'];

module.exports = NumberField;
