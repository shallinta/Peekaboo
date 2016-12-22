/**
 * CodeWord 用于代码单词的样式格式化
 */

import React from 'react';
import './style.css';

export default class CodeWord extends React.PureComponent {

  static propTypes = {
    children: React.PropTypes.any,
    style: React.PropTypes.object,
  };

  render() {
    return (
      <em className="common-code-word" style={this.props.style}>
        {this.props.children}
      </em>
    );
  }
}
