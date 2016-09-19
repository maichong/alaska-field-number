/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

const { object, func } = React.PropTypes;

export default class NumberFieldFilter extends React.Component {

  static propTypes = {
    field: object,
    onChange: func,
    onClose: func,
  };

  static contextTypes = {
    t: func,
  };

  constructor(props) {
    super(props);
    let value = props.value || {};
    if (typeof value === 'string') {
      value = { value1: value };
    }
    let mode = 1;
    let value1 = value.value1;
    let value2 = '';
    if (value.gte) {
      value1 = value.gte;
      if (value.lte) {
        //区间
        value2 = value.lte;
        mode = 6;
      } else {
        //大于等于
        mode = 4;
      }
    } else if (value.lte) {
      //小于等于
      mode = 5;
      value1 = value.lte;
    } else if (value.gt) {
      //大于
      mode = 2;
      value1 = value.gt;
    } else if (value.lt) {
      //大于
      mode = 3;
      value1 = value.lt;
    }

    let error = false;
    if (!value1 && value1 !== 0) {
      error = true;
    }
    if (mode === 6 && ((!value2 && value2 !== 0) || value1 >= value2)) {
      error = true;
    }
    this.state = {
      mode, // 1 等于 2大于 3小于 4大于等于 5小于等于 6区间
      value1,
      value2,
      error
    };
    this.handleMode1 = this.handleMode.bind(this, 1);
    this.handleMode2 = this.handleMode.bind(this, 2);
    this.handleMode3 = this.handleMode.bind(this, 3);
    this.handleMode4 = this.handleMode.bind(this, 4);
    this.handleMode5 = this.handleMode.bind(this, 5);
    this.handleMode6 = this.handleMode.bind(this, 6);
  }

  handleMode(mode) {
    this.setState({ mode }, () => this.handleBlur());
  }

  handleChange1 = event => {
    this.setState({
      value1: event.target.value
    });
  };

  handleChange2 = event => {
    this.setState({
      value2: event.target.value
    });
  };

  handleBlur = () => {
    const { mode, value1, value2 } = this.state;
    if (!value1 && value1 !== 0) {
      this.setState({ error: true });
      return;
    }
    if (mode === 6 && ((!value2 && value2 !== 0) || value1 >= value2)) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false });
    let filter = value1;
    if (mode === 2) {
      filter = { gt: value1 };
    } else if (mode === 3) {
      filter = { gt: value1 };
    } else if (mode === 4) {
      filter = { gte: value1 };
    } else if (mode === 5) {
      filter = { lte: value1 };
    } else if (mode === 6) {
      filter = { gte: value1, lte: value2 };
    }
    this.props.onChange(filter);
  };

  render() {
    const t = this.context.t;
    const { field, onClose } = this.props;
    const { mode, value1, value2, error } = this.state;
    const buttonClassName = 'btn btn-default';
    const buttonClassNameActive = buttonClassName + ' btn-success';
    let input2 = null;
    if (mode === 6) {
      input2 = <input
        type="number"
        className="form-control"
        onChange={this.handleChange2}
        onBlur={this.handleBlur}
        value={value2}
      />;
    }
    let className = 'row field-filter number-field-filter' + (error ? ' error' : '');
    return (
      <div className={className}>
        <label className="col-xs-2 control-label text-right">{field.label}</label>
        <div className="form-inline col-xs-10">
          <div className="form-group btn-group">
            <a
              className={mode === 1 ? buttonClassNameActive : buttonClassName}
              onClick={this.handleMode1}>=</a>
            <a
              className={mode === 2 ? buttonClassNameActive : buttonClassName}
              onClick={this.handleMode2}>&gt;</a>
            <a
              className={mode === 3 ? buttonClassNameActive : buttonClassName}
              onClick={this.handleMode3}>&lt;</a>
            <a
              className={mode === 4 ? buttonClassNameActive : buttonClassName}
              onClick={this.handleMode4}>&gt;=</a>
            <a
              className={mode === 5 ? buttonClassNameActive : buttonClassName}
              onClick={this.handleMode5}>&lt;=</a>
            <a
              className={mode === 6 ? buttonClassNameActive : buttonClassName}
              onClick={this.handleMode6}>{t('between')}
            </a>
          </div>
          <input
            type="number"
            className="form-control"
            onChange={this.handleChange1}
            onBlur={this.handleBlur}
            value={value1}
          />
          {input2}
        </div>
        <a className="btn field-filter-close" onClick={onClose}><i className="fa fa-close"/></a>
      </div>
    );
  }
}
