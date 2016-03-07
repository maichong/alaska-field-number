/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');

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
 * alaska-admin-view 前端控件初始化参数
 * @param field
 * @param Model
 */
exports.viewOptions = function (field, Model) {
  let options = alaska.Field.viewOptions.apply(this, arguments);
  options.format = field.format;
  if (!options.format && options.format !== false) {
    options.format = '0,0';
  }
  return options;
};
