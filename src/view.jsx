/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
const numeral = require('numeral');
import { shallowEqual } from 'alaska-admin-view';

const { bool, object, any, func, string } = React.PropTypes;

export default class NumberFieldView extends React.Component {

  static propTypes = {
    value: any,
    model: object,
    data: object,
    field: object,
    disabled: bool,
    errorText: string,
    onChange: func,
  };

  static contextTypes = {
    t: func,
  };

  constructor(props) {
    super(props);
    this.state = {
      display: props.value
    };
    if (props.field.format) {
      this.state.display = numeral(props.value).format(props.field.format);
    }
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if (typeof nextProps.value !== 'undefined' || typeof nextProps.field.default === 'undefined') {
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

  handleChange = (event) => {
    let display = event.target.value;
    this.setState({ display });
  };

  handleFocus = () => {
    this.focused = true;
  };

  handleBlur = () => {
    this.focused = false;
    let field = this.props.field;
    let value = this.state.display;
    let unfomarted;
    if (field.format) {
      unfomarted = numeral().unformat(value);
      if (isNaN(unfomarted)) {
        unfomarted = 0;
      }
      this.setState({ display: numeral(unfomarted).format(field.format) });
    } else {
      unfomarted = parseFloat(value) || '';
      if (unfomarted != value) {
        this.setState({ display: unfomarted });
      }
    }
    if (unfomarted !== this.props.value) {
      this.props.onChange && this.props.onChange(unfomarted);
    }
  };

  render() {
    let {
      field,
      disabled,
      value,
      errorText,
      model
      } = this.props;
    const t = this.context.t;
    let help = field.help;
    let className = 'form-group number-field';
    if (errorText) {
      className += ' has-error';
      help = errorText;
    }
    let helpElement = help ? <p className="help-block">{help}</p> : null;
    let inputElement;
    if (field.static) {
      inputElement = <p className="form-control-static">{value}</p>;
    } else {
      let placeholder = field.placeholder ? t(field.placeholder, field.service || model.service.id) : '';
      inputElement = (<input
        type="text"
        className="form-control"
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        value={this.state.display || ''}
        disabled={disabled}
        placeholder={placeholder}
      />);
      let addonAfter = field.addonAfter ?
        <span className="input-group-addon">{t(field.addonAfter, field.service || model.service.id)}</span> : null;
      let addonBefore = field.addonBefore ?
        <span className="input-group-addon">{t(field.addonBefore, field.service || model.service.id)}</span> : null;
      if (addonAfter || addonBefore) {
        inputElement = <div className="input-group">{addonBefore}{inputElement}{addonAfter}</div>;
      }
    }

    let label = field.nolabel ? '' : field.label;

    if (field.horizontal === false) {
      let labelElement = label ? (
        <label className="control-label">{label}</label>
      ) : null;
      return (
        <div className={className}>
          {labelElement}
          {inputElement}
          {helpElement}
        </div>
      );
    }

    return (
      <div className={className}>
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-10">
          {inputElement}
          {helpElement}
        </div>
      </div>
    );
  }
}
