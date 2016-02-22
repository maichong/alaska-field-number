/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = _react2.default.createClass({
  displayName: 'View',
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      'number view'
    );
  }
});

exports.default = View;