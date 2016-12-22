import React from 'react';
import './style.css';

import AntLine from '../../../common/ant-line';
import CodeWord from '../../../common/code-word';
import CodePre from '../../../common/code-pre';
import NoteCard from '../components/note-card';

class Note extends React.Component {

  updateState(state) {
    this.setState({
      ...this.state,
      ...state,
    });
  }

  render() {
    const config = {
      width: 300,
      height: 300,
      unit: 2,
      antLength: 6,
      spaceLength: 6,
      color: '#933',
      speed: 50,
    };
    return (
      <div className="note-z-index">
        <NoteCard status="CARD" simStatus="CARD">
          <h1>Z-index与层叠上下文</h1>
          <p><CodeWord>z-index</CodeWord> 是在css中用来控制分层显示的属性。简单来说z-index可以调整元素建的层叠关系，也就是离人眼近还是远，可以理解为屏幕的Z轴方向。但有些时候z-index的实际表现可能与我们想象中的有出入。那么z-index背后的原理是什么样的呢？这将涉及到层叠上下文（<CodeWord>stacking context</CodeWord>）和层叠等级（<CodeWord>stack level</CodeWord>）的概念。</p>
          <section>
            <p className="note-section-title">演示：</p>
            <div className="example">
              <AntLine config={config} />
              <div className="pane pane1">
                <div className="subpane pane1-1">20</div>
                <div className="subpane pane1-2">10</div>
              </div>
              <div className="pane pane2">
                <div className="subpane pane2-1">2</div>
                <div className="subpane pane2-2">1</div>
              </div>
            </div>
            <p className="note-section-title">演示：</p>
            <CodePre>
              <code><comment>{'//'} html</comment></code>
              <code>{'  <div'} <key>class</key>{'="p p1">'}</code>
              <code>{'    <div'} <key>class</key>{'="sp p1-1"></div>'}</code>
              <code>{'    <div'} <key>class</key>{'="sp p1-2"></div>'}</code>
              <code>{'  </div>'}</code>
              <code>{'  <div'} <key>class</key>{'="p p2">'}</code>
              <code>{'    <div'} <key>class</key>{'="sp p2-1"></div>'}</code>
              <code>{'    <div'} <key>class</key>{'="sp p2-2"></div>'}</code>
              <code>{'  </div>'}</code>
              <code>{'  '}</code>
              <code><comment>{'//'} css</comment></code>
              <code><var>.p</var> {'{'}</code>
              <code>{'  '}position: absolute;</code>
              <code>{'  '}width: 200px;</code>
              <code>{'  '}height: 200px;</code>
              <code>{'}'}</code>
              <code><var>.sp</var> {'{'}</code>
              <code>{'  '}position: absolute;</code>
              <code>{'  '}width: 100px;</code>
              <code>{'  '}height: 100px;</code>
              <code>{'}'}</code>
              <code><var>.p1-1</var> {'{'}</code>
              <code>{'  '}<em>z-index</em>: 20;</code>
              <code>{'}'}</code>
              <code><var>.p1-2</var> {'{'}</code>
              <code>{'  '}<em>z-index</em>: 10;</code>
              <code>{'}'}</code>
              <code><var>.p2-1</var> {'{'}</code>
              <code>{'  '}<em>z-index</em>: 2;</code>
              <code>{'}'}</code>
              <code><var>.p2-2</var> {'{'}</code>
              <code>{'  '}<em>z-index</em>: 1;</code>
              <code>{'}'}</code>
            </CodePre>
            <p className="note-section-title">小结：</p>
            <p>1. 定位元素有<CodeWord>z-index</CodeWord>值的时候才会创建新的<CodeWord>stacking context</CodeWord>，其子元素属于这个新的stacking context。否则将不创建stacking context，子元素仍属于自己所在的stacking context。</p>
            <p>2. 同一个<CodeWord>stacking context</CodeWord>的元素的<CodeWord>z-index</CodeWord>才有可比性，否则直接比较stacking context的父子关系。</p>
          </section>
          <p>2016年12月22日</p>
        </NoteCard>
      </div>
    );
  }
}

export default Note;
