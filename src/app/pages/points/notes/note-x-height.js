import React from 'react';
import './style.css';

import CodeWord from '../../../common/code-word';
import CodePre from '../../../common/code-pre';
import NoteCard from '../components/note-card';

class Note extends React.Component {

  state = {
    fontSize: 14,
  }

  updateState(state) {
    this.setState({
      ...this.state,
      ...state,
    });
  }

  render() {
    return (
      <div className="note-x-height">
        <NoteCard status="CARD" simStatus="CARD">
          <h1>X-height 与 "ex"</h1>
          <p><CodeWord>x-height</CodeWord> 是小写字母x字母的字高，是基线（<CodeWord>baseline</CodeWord>）与主线（<CodeWord>mean line</CodeWord>）之间的高度。在CSS中用<CodeWord>ex</CodeWord>这个单位表示一个x字高。与其他基本长度单位一样，这个单位从IE6开始就已经支持了。与其相似的有另一个单位<CodeWord>em</CodeWord>，表示一个大写字母M的宽度，同样从IE6开始就已经支持，并且广为人知，使用更加频繁。</p>
          <section>
            <p className="note-section-title">演示：</p>
            <figure className="example" style={{ fontSize: `${this.state.fontSize}px` }}>
              Sphinx<i className="icon-arrow" style={{ display: 'inline-block' }} />
            </figure>
            <p className="note-section-title">控制台：</p>
            <label className="example-controler">
              <span>字号: </span>
              <input type="number" onBlur={this.changeFontSize} />
            </label>
            <p className="note-section-title">代码：</p>
            <CodePre>
              <code><comment>{'//'} html</comment></code>
              <code>{'<'}<var>p</var>>Sphinx{'<'}<var>i</var> <key>class</key>="arrow"{'/></'}<var>p</var>></code>
              <code>{'  '}</code>
              <code><comment>{'//'} css</comment></code>
              <code><var>p</var> {'{'}</code>
              <code>{'  '}padding: 0 10px;</code>
              <code>{'  '}line-height: 3;</code>
              <code>{'}'}</code>
              <code><var>.arrow</var> {'{'}</code>
              <code>{'  '}display: inline-block;</code>
              <code>{'  '}width: 20px;</code>
              <code>{'  '}height: <em>1ex</em>;</code>
              <code>{'  '}background: url(.../arrow.png) no-repeat center;</code>
              <code>{'}'}</code>
            </CodePre>
          </section>
          <p>2016年12月21日 夜晚</p>
        </NoteCard>
      </div>
    );
  }

  changeFontSize = (e) => {
    let value = e.target.value * 1;
    value = value === 0 ? 14 : value;
    value = value > 60 ? 60 : value;
    value = value < 12 ? 12 : value;
    this.updateState({
      fontSize: value,
    });
  }
}

export default Note;
