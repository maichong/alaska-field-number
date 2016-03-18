/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const numeral = require('numeral');

exports.views = {
  cell: {
    name: 'NumberFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'NumberFieldView',
    field: __dirname + '/lib/view.js'
  }
};

exports.plain = Number;

/**
 * 初始化Schema
 * @param field   alaksa.Model中的字段配置
 * @param schema
 * @param Model
 */
exports.initSchema = function (field, schema, Model) {
  let options = {
    type: Number
  };
  [
    'get',
    'set',
    'default',
    'index',
    'required',
    'select',
    'min',
    'max'
  ].forEach(function (key) {
    if (field[key] !== undefined) {
      options[key] = field[key];
    }
  });

  schema.path(field.path, options);

  Model.underscoreMethod(field.path, 'format', function (format) {
    if (format) {
      return numeral(this.get(field.path)).format(format);
    }
    return this.get(field.path);
  });
};

/**
 * alaska-admin-view 前端控件初始化参数
 * @param field
 * @param Model
 */
exports.viewOptions = function (field, Model) {
  let options = alaska.Field.viewOptions.apply(this, arguments);
  options.min = field.min instanceof Array ? field.min[0] : field.min;
  options.max = field.max instanceof Array ? field.max[0] : field.max;
  options.format = field.format;
  if (!options.format && options.format !== false) {
    options.format = '0,0';
  }
  return options;
};
