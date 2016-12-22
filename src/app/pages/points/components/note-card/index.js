import React from 'react';
import getType from 'type-of';
import './style.css';

const BRIEF_LENGTH = 20;

export default class Comp extends React.PureComponent {

  static propTypes = {
    // children: React.PropTypes.any,
    simStatus: React.PropTypes.string,
    status: React.PropTypes.string,
  };

  state = {
    simStatus: 'HIDDEN', // 组件的非全屏状态记录 从全屏FULL状态收起时将回到simStatus状态
    status: 'CARD', // 组件展示状态 分别为 卡片CARD 全屏FULL 标题TITLE 隐藏HIDDEN
    headline: <h1>Untitled Note.</h1>,
    description: '',
    contents: <p className="empty">To be edited.</p>,
    footer: 'Someday.',
  };

  componentWillMount() {
    const { simStatus, status } = this.props;
    this.updateState({
      simStatus: simStatus || this.state.simStatus,
      status: status || this.state.status,
    }).then(() => {
      this.updateComponent(this.props);
    });
  }

  componentWillReceiveProps(props) {
    this.updateComponent(props);
  }

  updateComponent(props) {
    const { children } = props;
    if (!children) {
      return;
    }
    let childIndex = 0;

    let headline = children[childIndex];
    if (headline && headline.type && headline.type.match(/^h\d/)) {
      headline = (<h1>{headline.props.children}</h1>);
      childIndex += 1;
    } else {
      headline = this.state.headline;
    }

    let description = children[childIndex];
    if (description && description.type && description.type.match(/^p$/)) {
      description = description.props.children;
      childIndex += 1;
    } else {
      description = '';
    }

    let contents = children[childIndex];
    if (contents && contents.type && !contents.type.match(/^p$/)) {
      contents = contents.props.children;
      childIndex += 1;
    } else {
      contents = this.state.contents;
    }

    let footer = children[childIndex];
    if (footer && footer.type && footer.type.match(/^p$/)) {
      footer = footer.props.children;
    } else {
      footer = this.state.footer;
    }

    this.updateState({
      headline,
      description,
      contents,
      footer,
    });
  }

  updateState(state) {
    return new Promise((resolve, reject) => {
      this.setState({
        ...this.state,
        ...state,
      }, resolve || reject);
    });
  }

  getDesc() {
    const curDescription = this.state.description;
    if (!curDescription) {
      return null;
    } else if (this.state.status === 'FULL') {
      return curDescription;
    }
    let desc = '';
    let briefLength = 0;
    const len = curDescription.length;
    switch (getType(curDescription)) {
      case 'array':
        if (len > 0) {
          desc = [];
          for (let i = 0; i < len; i += 1) {
            if (getType(curDescription[i]) !== 'string') {
              if (briefLength + 1 > BRIEF_LENGTH) {
                break;
              } else {
                desc.push(curDescription[i]);
                briefLength += 1;
              }
            } else {
              if (briefLength + curDescription[i].length > BRIEF_LENGTH) {
                desc.push(curDescription[i].substr(0, BRIEF_LENGTH - briefLength));
                break;
              } else {
                desc.push(curDescription[i]);
                briefLength += curDescription[i].length;
              }
            }
          }
          desc.push('...');
        }
        break;
      case 'string':
        desc = curDescription.length > BRIEF_LENGTH ? `${curDescription.substr(0, BRIEF_LENGTH)}...` : curDescription;
        break;
      default:
    }
    return desc;
  }

  render() {
    return (
      <div className={`note-card-wraper ${this.state.status.toLowerCase()}`} onClick={this.switchToFull}>
        <div className="note-card-container">
          <span className="note-card-close-btn" onClick={this.switchBack}>x</span>
          <hgroup className="note-card-header">
            {this.state.headline}
            <p>{this.getDesc()}</p>
          </hgroup>
          <section className="note-card-content">{this.state.contents}</section>
          <p className="note-card-footer">{this.state.footer}</p>
        </div>
      </div>
    );
  }

  switchToFull = () => {
    console.log('switchtofull');
    if (this.state.status === 'FULL') {
      return;
    }
    this.updateState({
      status: 'FULL',
    });
  }

  switchBack = () => {
    console.log('switchback');
    if (this.state.status === 'FULL') {
      this.updateState({
        status: this.state.simStatus,
      });
    }
  }
}
