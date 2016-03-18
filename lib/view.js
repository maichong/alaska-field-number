'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _textField = require('material-ui/lib/text-field');

var _textField2 = _interopRequireDefault(_textField);

var _alaskaAdminView = require('alaska-admin-view');

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

  function NumberFieldView(props, context) {
    _classCallCheck(this, NumberFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumberFieldView).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      value: props.value,
      display: props.value
    };
    if (props.field.format) {
      _this.state.value = _this.state.display = numeral(props.value).format(props.field.format);
    }
    return _this;
  }

  _createClass(NumberFieldView, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
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
    key: 'handleChange',
    value: function handleChange(event) {
      var field = this.props.field;
      var display = event.target.value;
      if (field.format && !/^\d*\.?\d*$/.test(display)) {
        display = numeral().unformat(display);
        if (isNaN(display)) {
          display = parseFloat(event.target.display) || '';
        }
      }
      if (field.max !== undefined && display > field.max) {
        display = field.max;
      }
      if (field.min !== undefined && display < field.min) {
        display = field.min;
      }
      if (this.props.onChange) {
        this.props.onChange(display);
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.focused = true;
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.focused = false;
      var field = this.props.field;
      if (field.format) {
        var value = numeral(this.props.value).format(field.format);
        this.setState({ value: value, display: value });
        var unfomarted = numeral().unformat(value);
        if (unfomarted != this.props.value) {
          this.props.onChange && this.props.onChange(unfomarted);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var field = _props.field;
      var disabled = _props.disabled;
      var _state = this.state;
      var muiTheme = _state.muiTheme;
      var display = _state.display;

      var noteElement = field.note ? _react2.default.createElement(
        'div',
        { style: field.fullWidth ? muiTheme.fieldNote : muiTheme.fieldNoteInline },
        field.note
      ) : null;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_textField2.default, {
          ref: 'input',
          value: display,
          fullWidth: field.fullWidth,
          floatingLabelText: field.label,
          onChange: this.handleChange,
          disabled: disabled,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        noteElement
      );
    }
  }]);

  return NumberFieldView;
}(_react2.default.Component);

NumberFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
NumberFieldView.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
NumberFieldView.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
NumberFieldView.mixins = [_contextPure2.default];
exports.default = NumberFieldView;