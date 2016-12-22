import React from 'react';
import './style.css';

import $ from '../../../utils/dom';
import AntLine from '../../../common/ant-line';
import Loading from '../../../common/loading';
import CodeWord from '../../../common/code-word';
import NoteCard from '../components/note-card';

class Note extends React.Component {

  state = {
    fontSize: 36,
    imageVerticalAlign: 'baseline',
    dotVerticalAlign: 'baseline',
    textFontSize: 24,
    numVerticalAlign: 'super',
    baselineVerticalAlign: 'baseline',
  }

  updateState(state) {
    this.setState({
      ...this.state,
      ...state,
    });
  }

  render() {
    const config = {
      width: 560,
      height: 312,
      unit: 3,
      antLength: 10,
      spaceLength: 15,
      color: '#333',
      speed: 30,
    };
    const config2 = {
      width: 560,
      height: 40,
      unit: 3,
      antLength: 10,
      spaceLength: 15,
      type: 2,
      style: Loading.styles.LINE,
      color: '#f9c',
      speed: 30,
    };
    return (
      <div className="note-vertical-align">
        <NoteCard status="CARD" simStatus="CARD">
          <h1>Vertical-align</h1>
          <p><CodeWord>vertical-align</CodeWord> 在css中表示垂直对齐。虽然是一个很常见的css样式，但其取值却非常多，我们使用的最多的估计就是<CodeWord>middle</CodeWord>这个值了，还有很多我们并不常用，并且还可以以数值作为其取值。<CodeWord>vertical-align</CodeWord> 的各种取值到底表示什么，以及使用数值的时候到底如何表现呢？</p>
          <section>
            <p className="note-section-title">Vertical-align 可能的取值表：</p>
            <div className="image" onClick={this.zoomImage}>
              <img alt="vertical-align可能的取值表" src="/images/vertical-align-1.png" />
            </div>
            <p className="note-section-title">演示：</p>
            <div className="example">
              <AntLine config={config} />
              <div className="container">
                <span className="line" style={{ fontSize: this.state.fontSize }}>
                  Sphinx
                  <img alt="vertical-align示例图片" src="/images/18.jpg" style={{ verticalAlign: this.state.imageVerticalAlign }} />
                  <span className="dot" style={{ display: 'inline-block', verticalAlign: this.state.dotVerticalAlign }} />
                  <span className="text" style={{ fontSize: this.state.textFontSize }}>Sphinx</span>
                  <span className="num" style={{ display: 'inline-block', verticalAlign: this.state.numVerticalAlign }}>2</span>
                  <span className="baseline" style={{ display: 'inline-block', verticalAlign: this.state.baselineVerticalAlign }} />
                </span>
              </div>
            </div>
            <p className="note-section-title">控制台：</p>
            <div className="example-controler">
              <label>
                <span>图片对齐方式: </span>
                <select value={this.state.imageVerticalAlign} onChange={this.imageChange}>
                  <option value="baseline">baseline</option>
                  <option value="top">top</option>
                  <option value="middle">middle</option>
                  <option value="bottom">bottom</option>
                  <option value="text-top">text-top</option>
                  <option value="text-bottom">text-bottom</option>
                  <option value="sub">sub</option>
                  <option value="super">super</option>
                  <option value="1ex">1ex</option>
                </select>
              </label>
              <label>
                <span>外行字号: </span>
                <input type="number" placeholder={this.state.fontSize} onBlur={this.changeFontSize} />
              </label>
              <label>
                <span>内行字号: </span>
                <input type="number" placeholder={this.state.textFontSize} onBlur={this.changeTextFontSize} />
              </label>
              <label>
                <span>绿点对齐方式: </span>
                <input type="text" placeholder={this.state.dotVerticalAlign} onBlur={this.dotChange} />
              </label>
              <label>
                <span>数字对齐方式: </span>
                <input type="text" placeholder={this.state.numVerticalAlign} onBlur={this.numChange} />
              </label>
              <label>
                <span>红线指示位置: </span>
                <input type="text" placeholder={this.state.baselineVerticalAlign} onBlur={this.baselineChange} />
              </label>
            </div>
            <p className="note-section-title">小结：</p>
            <p><CodeWord>vertical-align</CodeWord>的百分比值是相对于<CodeWord>line-height</CodeWord>的值来计算的。计算出数值之后，是相对于<CodeWord>baseline</CodeWord>来上下偏移的。</p>
            <br />
            <p className="center">
              <Loading />
            </p>
            <p className="center">
              <Loading config={config2} />
            </p>
            <br />
          </section>
          <p>2016年12月22日</p>
        </NoteCard>
      </div>
    );
  }

  zoomImage = (e) => {
    const imgNode = $.closest(e.target, '.image');
    if (!$.hasClass(imgNode, 'zoom')) {
      $.addClass(imgNode, 'zoom');
    } else {
      $.removeClass(imgNode, 'zoom');
    }
  }

  imageChange = (e) => {
    this.updateState({
      imageVerticalAlign: e.target.value,
    });
  }

  dotChange = (e) => {
    this.updateState({
      dotVerticalAlign: e.target.value,
    });
  }

  numChange = (e) => {
    this.updateState({
      numVerticalAlign: e.target.value,
    });
  }

  baselineChange = (e) => {
    this.updateState({
      baselineVerticalAlign: e.target.value,
    });
  }

  changeFontSize = (e) => {
    let value = Note.getFontSize(e.target.value);
    if (value === 0) {
      value = this.state.fontSize;
    }
    this.updateState({
      fontSize: value,
    });
  }

  changeTextFontSize = (e) => {
    let value = Note.getFontSize(e.target.value);
    if (value === 0) {
      value = this.state.textFontSize;
    }
    this.updateState({
      textFontSize: value,
    });
  }

  static getFontSize(value) {
    let newValue = value * 1;
    if (newValue === 0) {
      return 0;
    }
    newValue = newValue > 96 ? 96 : newValue;
    newValue = newValue < 10 ? 10 : newValue;
    return newValue;
  }
}

export default Note;
