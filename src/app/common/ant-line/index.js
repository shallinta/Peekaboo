import React from 'react';
import './style.css';

import AntLineDrawer from '../../utils/drawAntLine';

const defaultConfig = {
  width: 100,
  height: 100,
  unit: 1,
  antLength: 10,
  spaceLength: 10,
  color: '#666',
  direction: 1,
  speed: 50,
  offset: 0,
};

class AntLine extends React.Component {

  static clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  componentWillMount() {
    const { config } = this.props;
    const curConfig = {
      ...defaultConfig,
      ...config,
    };
    const antLineDrawer = new AntLineDrawer({
      unit: curConfig.unit,
      antLength: curConfig.antLength,
      spaceLength: curConfig.spaceLength,
      color: curConfig.color,
      direction: curConfig.direction,
    });
    this.setState({
      ...curConfig,
      antLineDrawer,
    });
  }

  componentDidMount() {
    this.loop = setInterval(() => {
      this.setState({
        ...this.state,
        offset: this.state.offset + 1
      });
    }, this.state.speed);
    this.drawAntLine();
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  drawAntLine() {
    if (!this.canvas) {
      return;
    }
    const canvas = this.canvas.getContext('2d');
    AntLine.clearCanvas(canvas);
    this.state.antLineDrawer.draw(canvas, this.state.offset);
  }

  render() {
    this.drawAntLine();
    return (
      <canvas width={this.state.width} height={this.state.height} ref={(r) => {this.canvas = r;}} className="ant-line-canvas" />
    );
  }
}

AntLine.propTypes = {
  config: React.PropTypes.object,
};

export default AntLine;
