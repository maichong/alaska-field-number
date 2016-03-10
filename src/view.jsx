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
    this._handleChange = this._handleChange.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views
    };
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
    this.setState(newState);
  }

  _handleChange(event) {
    let field = this.props.field;
    let value = event.target.value;
    if (field.format) {
      value = numeral().unformat(value);
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    let {
      model,
      data,
      field,
      value,
      onChange,
      ...others
      } = this.props;

    if (field.format) {
      value = numeral(value).format(field.format);
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
          onChange={this._handleChange}
          disabled={field.noedit}
          {...others}
        />
        {noteElement}
      </div>
    );
  }
}
