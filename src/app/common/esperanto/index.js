/**
 * Esperanto 用于世界语单词的使用
 * 通过title(string)属性传入该单词的注释
 * 鼠标hover时单词高亮并在其上方悬浮显示注释
 * 可通过lower(boolean)属性使注释显示在下方
 */

import React from 'react';
import './style.css';

export default class Esperanto extends React.PureComponent {

  static propTypes = {
    children: React.PropTypes.any,
    style: React.PropTypes.object,
    title: React.PropTypes.string,
    lower: React.PropTypes.bool,
  }

  render() {
    return (
      <em className="common-esperanto" style={this.props.style}>
        {this.props.children}
        <span className={this.props.lower ? 'title lower' : 'title'}>{this.props.title}</span>
      </em>
    );
  }
}
