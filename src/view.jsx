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
      value: props.value
    };
    if (props.field.format) {
      this.state.value = numeral(props.value).format(props.field.format);
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
    }
    this.setState(newState);
  }

  handleChange(event) {
    let field = this.props.field;
    let value = event.target.value;
    if (!/^\d*\.?\d*$/.test(value) && field.format) {
      value = numeral().unformat(value);
    }
    if (isNaN(value)) {
      value = parseFloat(event.target.value) || '';
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleFocus() {
    this.focused = true;
  }

  handleBlur() {
    this.focused = false;
    let field = this.props.field;
    if (field.format) {
      let value = numeral(this.props.value).format(field.format);
      this.setState({ value });
      if (value != this.props.value && value == parseFloat(value)) {
        this.props.onChange && this.props.onChange(parseFloat(value));
      }
    }
  }

  render() {
    let {
      model,
      data,
      field,
      value,
      onChange,
      disabled,
      ...others
      } = this.props;

    if (!this.focused) {
      value = this.state.value;
    }

    let { muiTheme } = this.state;
    let noteElement = field.note ?
      <div style={field.fullWidth?muiTheme.fieldNote:muiTheme.fieldNoteInline}>{field.note}</div> : null;
    return (
      <div>
        <TextField
          ref="input"
          value={value}
          fullWidth={field.fullWidth}
          floatingLabelText={field.label}
          onChange={this.handleChange}
          disabled={disabled}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...others}
        />
        {noteElement}
      </div>
    );
  }
}
