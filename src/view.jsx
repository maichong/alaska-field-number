/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
const numeral = require('numeral');
import { shallowEqual } from 'alaska-admin-view';
import { Input } from 'react-bootstrap';

export default class NumberFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
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
      errorText
      } = this.props;

    let { display } = this.state;
    let help = errorText ? <span className="text-danger">{errorText}</span> : field.note ? field.note : null;
    return (
      <Input
        type="text"
        value={display}
        label={field.label}
        onChange={this.handleChange}
        disabled={disabled}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        labelClassName="col-xs-2"
        wrapperClassName="col-xs-10"
        help={help}
      />
    );
  }
}
