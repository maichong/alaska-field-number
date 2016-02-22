/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');

exports.template = __dirname + '/lib/view.js';

exports.plain = Number;

/**
 * 初始化方法
 * @param field   alaksa.Model中的字段配置
 * @param options Mongoose模型字段初始化参数
 */
exports.init = function (field, options) {
  if (field.min != undefined) {
    options.min = field.min;
  }
  if (field.max != undefined) {
    options.max = field.max;
  }

  //TODO 所有mongoose Number 类型初始化参数
};
