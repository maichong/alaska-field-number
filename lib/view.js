'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alaskaAdminView = require('alaska-admin-view');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-02
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var numeral = require('numeral');

var NumberFieldView = function (_React$Component) {
  _inherits(NumberFieldView, _React$Component);

  function NumberFieldView(props) {
    _classCallCheck(this, NumberFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumberFieldView).call(this, props));

    _this.handleChange = function (event) {
      var display = event.target.value;
      _this.setState({ display: display });
    };

    _this.handleFocus = function () {
      _this.focused = true;
    };

    _this.handleBlur = function () {
      _this.focused = false;
      var field = _this.props.field;
      var value = _this.state.display;
      var unfomarted = undefined;
      if (field.format) {
        unfomarted = numeral().unformat(value);
        if (isNaN(unfomarted)) {
          unfomarted = 0;
        }
        _this.setState({ display: numeral(unfomarted).format(field.format) });
      } else {
        unfomarted = parseFloat(value) || '';
        if (unfomarted != value) {
          _this.setState({ display: unfomarted });
        }
      }
      if (unfomarted !== _this.props.value) {
        _this.props.onChange && _this.props.onChange(unfomarted);
      }
    };

    _this.state = {
      display: props.value
    };
    if (props.field.format) {
      _this.state.display = numeral(props.value).format(props.field.format);
    }
    return _this;
  }

  _createClass(NumberFieldView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var newState = {};
      if (nextProps.value) {
        newState.value = nextProps.value;
        if (this.props.field.format) {
          newState.value = numeral(nextProps.value).format(this.props.field.format);
        }
        if (this.focused) {
          //正在输入
          newState.display = nextProps.value;
        } else {
          //不在输入状态
          newState.display = newState.value;
        }
      }
      this.setState(newState);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model') || !(0, _alaskaAdminView.shallowEqual)(state, this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var field = _props.field;
      var disabled = _props.disabled;
      var errorText = _props.errorText;
      var display = this.state.display;

      var help = errorText ? _react2.default.createElement(
        'span',
        { className: 'text-danger' },
        errorText
      ) : field.note ? field.note : null;
      return _react2.default.createElement(_reactBootstrap.Input, {
        type: 'text',
        value: display,
        label: field.label,
        onChange: this.handleChange,
        disabled: disabled,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        labelClassName: 'col-xs-2',
        wrapperClassName: 'col-xs-10',
        help: help
      });
    }
  }]);

  return NumberFieldView;
}(_react2.default.Component);

NumberFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
exports.default = NumberFieldView;