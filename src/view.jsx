/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import TextField from 'material-ui/lib/text-field';
const numeral = require('numeral');
import { shallowEqual } from 'alaska-admin-view';

export default class NumberFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      value: props.value,
      display: props.value,
    };
    if (props.field.format) {
      this.state.value = this.state.display = numeral(props.value).format(props.field.format);
    }
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
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

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || !shallowEqual(state, this.state);
  }

  handleChange(event) {
    let field = this.props.field;
    let display = event.target.value;
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

  handleFocus() {
    this.focused = true;
  }

  handleBlur() {
    this.focused = false;
    let field = this.props.field;
    let unfomarted;
    if (field.format) {
      let value = numeral(this.props.value).format(field.format);
      this.setState({ value, display: value });
      unfomarted = numeral().unformat(value);
    } else {
      unfomarted = parseFloat(this.props.value) || '';
    }
    if (unfomarted !== this.props.value) {
      this.props.onChange && this.props.onChange(unfomarted);
    }
  }

  render() {
    let {
      field,
      disabled
      } = this.props;

    let { muiTheme, display } = this.state;
    let noteElement = field.note ?
      <div style={field.fullWidth?muiTheme.fieldNote:muiTheme.fieldNoteInline}>{field.note}</div> : null;
    return (
      <div>
        <TextField
          ref="input"
          value={display}
          fullWidth={field.fullWidth}
          floatingLabelText={field.label}
          onChange={this.handleChange}
          disabled={disabled}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {noteElement}
      </div>
    );
  }
}
