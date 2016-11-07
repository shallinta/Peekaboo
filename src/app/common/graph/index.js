import React from 'react';
import GraphDrawer from '../../utils/drawGraph';

const defaultConfig = {
  width: 300,
  height: 100,
  startX: -150,
  startY: -50,
  unit: 1,
  ratio: 1,
  coordinate: true,
  curves: [
    {
      x1: -150,
      x2: 150,
      color: '#f33',
      equation: () => 0,
    }
  ],
};

const isNumber = n => n * 1 === n;

class Graph extends React.Component {

  static clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  componentWillMount() {
    const { config } = this.props;
    const curConfig = {
      ...defaultConfig,
      ...config,
    };
    const graphDrawer = new GraphDrawer({
      unit: curConfig.unit,
      ratio: curConfig.ratio,
      coordinate: curConfig.coordinate,
      startX: curConfig.startX,
      startY: curConfig.startY,
    });
    this.setState({
      ...curConfig,
      graphDrawer,
    });
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     ...this.state,
    //     time: new Date().toTimeString().split(' ')[0]
    //   });
    // }, 1000);
    this.drawGraph();
  }

  drawGraph() {
    if (!this.canvas) {
      return;
    }
    const canvas = this.canvas.getContext('2d');
    Graph.clearCanvas(canvas);
    if (this.state.coordinate !== false) {
      this.state.graphDrawer.drawCoordinateSystem(canvas);
    }
    const curves = this.state.curves;
    for (const c of curves) {
      if (c.equation) {
        this.state.graphDrawer.setColor(c.color);
        const x1 = isNumber(c.x1) ? c.x1 : this.state.startX;
        const x2 = isNumber(c.x2) ? c.x2 : this.state.startX + this.state.width;
        this.state.graphDrawer.draw(x1, x2, c.equation, canvas);
      }
    }
  }

  render() {
    this.drawGraph();
    return (
      <canvas width={this.state.width} height={this.state.height} ref={(r) => {this.canvas = r;}} />
    );
  }
}

Graph.propTypes = {
  config: React.PropTypes.object,
};

export default Graph;
