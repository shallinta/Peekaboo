import React from 'react';
import './style.css';

// import $ from '../../../../utils/dom';
import Vorto from '../../../../common/vorto';
import CodeWord from '../../../../common/code-word';
import Card from '../../components/card';

class P extends React.Component {

  state = {
    originImage: null,
    showBand: false,
    width: 1,
    height: 1,
    top: 0,
    left: 0,
  };

  setOriginImage() {
    const ctx = this.canvas.getContext('2d');
    const width = this.canvas.width;
    const height = this.canvas.height;
    if (this.state.originImage) {
      ctx.drawImage(this.state.originImage, 0, 0, width, height);
    } else {
      const image = new Image(width, height);
      image.src = `//lorempixel.com/${width * 2}/${height * 2}/`;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);
        this.updateState({
          originImage: image,
        });
      };
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setOriginImage();
    }, 0);
  }

  updateState(state) {
    return new Promise((resolve, reject) => {
      this.setState({
        ...this.state,
        ...state,
      }, resolve || reject);
    });
  }

  getCanvasHandler = (r) => {
    this.canvas = r;
  };

  getPreviewNode() {
    return (
      <figure>
        <div
          className="pv-canvas-container"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          <canvas ref={this.getCanvasHandler} width="500" height="300" />
          <div
            className="pv-canvas-rubberband"
            style={this.state.showBand ? {
              display: 'block',
              width: this.state.width,
              height: this.state.height,
              top: this.state.top,
              left: this.state.left,
            } : null}
          />
        </div>
        <div className="pv-canvas-operator">
          <input className="pv-btn" type="button" value="恢复原图" onClick={this.handleClickReset} />
          <input className="pv-btn" type="button" value="挑张图片" onClick={this.handleClickFind} />
        </div>
      </figure>
    );
  }

  getContentNode() {
    return (
      <section>
        123
      </section>
    );
  }

  render() {
    return (
      <Card status="CARD" simStatus="CARD">
        <h1>橡皮筋式选取框</h1>
        <span>2017年1月26日</span>
        <p>在这个演示中，采用了一种名为<CodeWord><Vorto title="Rubberbanding">橡皮筋式</Vorto>选取框</CodeWord>的技术来让用户在canvas之中选择某个区域。起初，该canvas会显示一幅图像，然后当选定图像的某一部分时，应用程序会将你所选的这部分区域放大。</p>
        {this.getPreviewNode()}
        {this.getContentNode()}
        <p>§1.8 《Canvas核心技术》.</p>
      </Card>
    );
  }

  drawPartialImage() {
    const container = this.canvas.getBoundingClientRect();
    const width = this.canvas.width;
    const height = this.canvas.height;
    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(this.canvas,
      this.state.left * width / container.width,
      this.state.top * height / container.height,
      this.state.width * width / container.width,
      this.state.height * height / container.height,
      0, 0, width, height);
  }

  handleMouseDown = (event) => {
    event.preventDefault();
    const container = this.canvas.getBoundingClientRect();
    this.updateState({
      showBand: true,
      top: event.clientY - container.top,
      left: event.clientX - container.left,
      width: 1,
      height: 1,
    });
  };

  handleMouseMove = (event) => {
    event.preventDefault();
    const container = this.canvas.getBoundingClientRect();
    this.updateState({
      width: event.clientX - container.left - this.state.left,
      height: event.clientY - container.top - this.state.top,
    });
  };

  handleMouseUp = (event) => {
    event.preventDefault();
    this.updateState({
      showBand: false,
    });
    this.drawPartialImage();
  };

  handleClickReset = (event) => {
    event.stopPropagation(); // 阻止冒泡
    this.setOriginImage();
  };

  handleClickFind = (event) => {
    event.stopPropagation(); // 阻止冒泡
    this.updateState({
      originImage: null,
    }).then(() => {
      this.setOriginImage();
    });
  };

}

export default P;
