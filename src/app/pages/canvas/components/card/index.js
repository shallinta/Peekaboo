import React from 'react';
import getType from 'type-of';
import './style.css';

const BRIEF_LENGTH = 120;

export default class Comp extends React.Component {

  static propTypes = {
    simStatus: React.PropTypes.string,
    status: React.PropTypes.string,
  };

  state = {
    simStatus: 'HIDDEN', // 组件的非全屏状态记录 从全屏FULL状态收起时将回到simStatus状态
    status: 'CARD', // 组件展示状态 分别为 卡片CARD 全屏FULL 标题TITLE 隐藏HIDDEN
    headline: 'Untitled Card',
    time: 'One day.',
    description: '',
    preview: null,
    contents: null,
    footer: null,
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
      headline = headline.props.children;
      childIndex += 1;
    } else {
      headline = this.state.headline;
    }

    let time = children[childIndex];
    if (time && time.type && time.type.match(/^span$/)) {
      time = time.props.children;
      childIndex += 1;
    } else {
      time = this.state.time;
    }

    let description = children[childIndex];
    if (description && description.type && description.type.match(/^p$/)) {
      description = description.props.children;
      childIndex += 1;
    } else {
      description = '';
    }

    let preview = children[childIndex];
    if (preview && preview.type && preview.type.match(/^figure$/)) {
      preview = preview.props.children;
      childIndex += 1;
    } else {
      preview = this.state.preview;
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
      time,
      description,
      preview,
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
                desc.push('...');
                break;
              } else {
                desc.push(curDescription[i]);
                briefLength += 1;
              }
            } else {
              if (briefLength + curDescription[i].length > BRIEF_LENGTH) {
                desc.push(curDescription[i].substr(0, BRIEF_LENGTH - briefLength));
                desc.push('...');
                break;
              } else {
                desc.push(curDescription[i]);
                briefLength += curDescription[i].length;
              }
            }
          }
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
      <div className={`cm-card-wraper ${this.state.status.toLowerCase()}`}>
        <div className="cm-card-container">
          <span className="cm-card-close-btn" onClick={this.switchBack}>x</span>
          <hgroup className="cm-card-header">
            <h1 onClick={this.switchToFull}>{this.state.headline}</h1>
            <p className="cm-card-time">{this.state.time}</p>
            <p>{this.getDesc()}</p>
          </hgroup>
          <section className="cm-card-content">
            {
              this.state.preview
              ? (<div className="cm-card-preview">{this.state.preview}</div>)
              : (<p className="empty">No Preview</p>)
            }
            {
              this.state.status === 'FULL'
              ? (this.state.contents || (<p className="empty">To be continued.</p>))
              : null
            }
          </section>
          {
            this.state.footer
            ? <p className="cm-card-footer">{this.state.footer}</p>
            : null
          }
        </div>
      </div>
    );
  }

  switchToFull = () => {
    if (this.state.status === 'FULL') {
      return;
    }
    this.updateState({
      status: 'FULL',
    });
  };

  switchBack = () => {
    if (this.state.status === 'FULL') {
      this.updateState({
        status: this.state.simStatus,
      });
    }
  };
}
