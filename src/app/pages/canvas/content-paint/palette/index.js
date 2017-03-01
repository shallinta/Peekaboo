import React from 'react';
import './style.css';

import Paintor from './paintor';

class Palette extends React.PureComponent {

  paintor = null;

  state = {
    painting: false,
    tool: Paintor.shape.LINE,
  };

  componentDidMount() {
    this.paintor = new Paintor(this.canvas, true, {
      strokeStyle: '#f00',
      fillStyle: '#f0f',
    });
    this.paintor.paint({
      x: 400,
      y: 300,
      r: 200,
      n: 10,
    }, {
      lineWidth: 2,
      strokeStyle: '#f33',
    });
  }

  render() {
    return (
      <div className="palette-wrapper">
        <div className="palette-tools-container">
          <div
            className={this.state.tool === Paintor.shape.LINE ? 'tool active' : 'tool'}
            onClick={() => {
              this.chooseTool(Paintor.shape.LINE);
            }}
          >
            线条
          </div>
          <div
            className={this.state.tool === Paintor.shape.CIRCLE ? 'tool active' : 'tool'}
            onClick={() => {
              this.chooseTool(Paintor.shape.CIRCLE);
            }}
          >
            圆形
          </div>
          <div className="tool" onClick={this.clearPalette}>清空</div>
        </div>
        <div className="palette-container">
          <canvas
            className="palette" width="840" height="700"
            ref={(canvas) => {this.canvas = canvas;}}
          />
          <div
            className={this.state.painting ? 'palette-mask masking' : 'palette-mask'}
            onMouseDown={this.mouseDown}
            onMouseMove={this.mouseMove}
            onMouseUp={this.mouseUp}
          />
        </div>
      </div>
    );
  }

  chooseTool(shapeType) {
    this.setState({
      tool: shapeType,
    }, () => {
      this.paintor.setShape(shapeType);
    });
  }

  clearPalette = () => {
    this.paintor.clear();
  }

  mouseDown = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      painting: true,
    });
    this.paintor.onMouseDown(event);
  };

  mouseMove = (event) => {
    event.preventDefault();
    if (this.state.painting) {
      this.paintor.onMouseMove(event);
    }
  };

  mouseUp = (event) => {
    event.preventDefault();
    if (this.state.painting) {
      this.setState({
        ...this.state,
        painting: false,
      });
      this.paintor.onMouseUp(event);
    }
  };

}

export default Palette;
