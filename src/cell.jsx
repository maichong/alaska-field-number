/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
const numeral = require('numeral');

export default class NumberFieldCell extends React.Component {

  shouldComponentUpdate(props) {
    return props.value != this.props.value;
  }

  render() {
    let props = this.props;
    let value = props.value;
    if (props.field.format) {
      value = numeral(value).format(props.field.format);
    }
    return (
      <div>{value}</div>
    );
  }
}
