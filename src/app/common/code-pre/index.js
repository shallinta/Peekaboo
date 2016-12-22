/**
 * CodePre 用于代码片段的样式格式化
 */

import React from 'react';
import './style.css';

export default class CodePre extends React.PureComponent {

  static propTypes = {
    children: React.PropTypes.any,
    style: React.PropTypes.object,
  };

  render() {
    return (
      <pre className="common-code-pre" style={this.props.style}>
        {this.props.children}
      </pre>
    );
  }
}
