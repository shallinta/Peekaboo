import React from 'react';

import LoadingDrawer from '../../utils/drawLoading';

const defaultConfig = {
  width: 100,
  height: 100,
  duration: 5000,
  radius: 4,
  delay: 20,
  count: 5,
  type: 1,
  style: LoadingDrawer.styles.LINE,
  color: '#99c',
  speed: 50,
  t: 0,
};

class Loading extends React.Component {

  static clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  componentWillMount() {
    const { config } = this.props;
    const curConfig = {
      ...defaultConfig,
      ...config,
    };
    const loadingDrawer = new LoadingDrawer({
      color: curConfig.color,
      duration: curConfig.duration,
      radius: curConfig.radius,
      delay: curConfig.delay,
      count: curConfig.count,
      type: curConfig.type,
      style: curConfig.style,
    });
    this.setState({
      ...curConfig,
      loadingDrawer,
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        ...this.state,
        t: this.state.t + this.state.speed
      });
    }, this.state.speed);
    this.drawLoading();
  }

  drawLoading() {
    if (!this.canvas) {
      return;
    }
    const canvas = this.canvas.getContext('2d');
    Loading.clearCanvas(canvas);
    this.state.loadingDrawer.draw(canvas, this.state.t, this.state.style);
  }

  render() {
    this.drawLoading();
    return (
      <canvas width={this.state.width} height={this.state.height} ref={(r) => {this.canvas = r;}} />
    );
  }
}

Loading.styles = {
  LINE: LoadingDrawer.styles.LINE,
  CIRCLE: LoadingDrawer.styles.CIRCLE,
};

Loading.propTypes = {
  config: React.PropTypes.object,
};

export default Loading;
