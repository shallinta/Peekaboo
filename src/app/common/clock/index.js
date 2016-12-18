import React from 'react';
import NumberDrawer from '../../utils/drawNumber';

const defaultWidth = 20;
const goldenRatio = (Math.sqrt(5) - 1) / 2;

const defaultConfig = {
  numberWidth: defaultWidth,
  width: defaultWidth * (6 + 9 / 3 + 4 / 10), // 6个数字，9个间隔（含左右）， 2个冒号（冒号2倍线条粗）
  lineWidth: defaultWidth / 10,
  sepWidth: defaultWidth / 3,
  height: defaultWidth / goldenRatio,
  heightRatio: 1 / goldenRatio,
  color: '#666',
};

class Clock extends React.Component {

  static getConfig(config) {
    let curConfig;
    if (!config) {
      curConfig = defaultConfig;
    } else {
      curConfig = {
        ...defaultConfig,
        ...config,
      };
      if (config.numberWidth) {
        if (config.width) {
          if (config.lineWidth) {
            curConfig.sepWidth = (curConfig.width - 6 * curConfig.numberWidth - 4 * curConfig.lineWidth) / 9;
          } else if (config.sepWidth) {
            curConfig.lineWidth = (curConfig.width - 6 * curConfig.numberWidth - 9 * curConfig.sepWidth) / 4;
          } else {
            curConfig.lineWidth = curConfig.numberWidth / 10;
            curConfig.sepWidth = (curConfig.width - 6 * curConfig.numberWidth - 4 * curConfig.lineWidth) / 9;
          }
          if (curConfig.sepWidth < 0) {
            curConfig.sepWidth = 0;
          }
          if (curConfig.lineWidth <= 0) {
            curConfig.lineWidth = 1;
          }
        } else if (config.lineWidth) {
          if (!config.sepWidth) {
            curConfig.sepWidth = curConfig.numberWidth / 3;
          }
          curConfig.width = 6 * curConfig.numberWidth + 4 * curConfig.lineWidth + 9 * curConfig.sepWidth;
        } else if (config.sepWidth) {
          curConfig.lineWidth = curConfig.numberWidth / 10;
          curConfig.width = 6 * curConfig.numberWidth + 4 * curConfig.lineWidth + 9 * curConfig.sepWidth;
        } else {
          curConfig.lineWidth = curConfig.numberWidth / 10;
          curConfig.sepWidth = curConfig.numberWidth / 3;
          curConfig.width = 6 * curConfig.numberWidth + 4 * curConfig.lineWidth + 9 * curConfig.sepWidth;
        }
      } else if (config.width) {
        if (config.lineWidth) {
          if (config.sepWidth) {
            curConfig.numberWidth = (curConfig.width - 4 * curConfig.lineWidth - 9 * curConfig.sepWidth) / 6;
          } else {
            curConfig.numberWidth = (curConfig.width - 4 * curConfig.lineWidth) / 9;
            curConfig.sepWidth = curConfig.numberWidth / 3;
          }
        } else if (config.sepWidth) {
          curConfig.numberWidth = (curConfig.width - 9 * curConfig.sepWidth) / (6 + 4 / 10);
          curConfig.lineWidth = curConfig.numberWidth / 10;
        } else {
          curConfig.numberWidth = curConfig.width / (6 + 9 / 3 + 4 / 10);
          curConfig.lineWidth = curConfig.numberWidth / 10;
          curConfig.sepWidth = curConfig.numberWidth / 3;
        }
        if (curConfig.numberWidth <= 0) {
          curConfig.numberWidth = curConfig.width / (6 + 9 / 3 + 4 / 10);
          curConfig.lineWidth = curConfig.numberWidth / 10;
          curConfig.sepWidth = curConfig.numberWidth / 3;
        }
      } else if (config.lineWidth) {
        curConfig.numberWidth = curConfig.lineWidth * 10;
        if (!config.sepWidth) {
          curConfig.sepWidth = curConfig.numberWidth / 3;
        }
        curConfig.width = 6 * curConfig.numberWidth + 4 * curConfig.lineWidth + 9 * curConfig.sepWidth;
      } else if (config.sepWidth) {
        curConfig.numberWidth = curConfig.sepWidth * 3;
        curConfig.lineWidth = curConfig.numberWidth / 10;
        curConfig.width = 6 * curConfig.numberWidth + 4 * curConfig.lineWidth + 9 * curConfig.sepWidth;
      }

      if (curConfig.lineWidth >= (curConfig.height / 6) || curConfig.lineWidth >= (curConfig.numberWidth / 2)) {
        curConfig.lineWidth = Math.min((curConfig.height / 6), (curConfig.numberWidth / 2)) - 1;
        if (curConfig.lineWidth <= 0) {
          curConfig.lineWidth = 1;
        }
      }

      if (config.height) {
        curConfig.heightRatio = curConfig.height / curConfig.numberWidth;
      } else if (config.heightRatio) {
        curConfig.height = curConfig.numberWidth * curConfig.heightRatio;
      } else {
        curConfig.height = curConfig.numberWidth * curConfig.heightRatio;
      }
    }
    return curConfig;
  }

  static clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  componentWillMount() {
    const { config } = this.props;
    const curConfig = Clock.getConfig(config);
    const numberDrawer = new NumberDrawer({
      lineColor: curConfig.color,
      lineWidth: curConfig.lineWidth,
      numberWidth: curConfig.numberWidth,
      heightRatio: curConfig.heightRatio,
      backColor: curConfig.backColor,
    });
    this.setState({
      ...curConfig,
      numberDrawer,
      time: new Date().toTimeString().split(' ')[0],
    });
  }

  componentDidMount() {
    this.loop = setInterval(() => {
      this.setState({
        ...this.state,
        time: new Date().toTimeString().split(' ')[0]
      });
    }, 1000);
    this.drawClock();
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  drawClock() {
    if (!this.canvas) {
      return;
    }
    const canvas = this.canvas.getContext('2d');
    Clock.clearCanvas(canvas);
    const time = this.state.time;
    let x = this.state.sepWidth;
    for (let i = 0, len = time.length; i < len; i += 1) {
      if (time[i] === ':') {
        this.drawSemicolon(canvas, x);
        x += 2 * this.state.lineWidth + this.state.sepWidth;
      } else {
        this.state.numberDrawer.setLineColor(this.state.color);
        if (i === len - 1) {
          this.state.numberDrawer.setLineColor('#c30');
        }
        this.state.numberDrawer.draw(
          time[i],
          canvas,
          {
            x,
            y: 0,
          }
        );
        x += this.state.numberWidth + this.state.sepWidth;
      }
    }
  }

  drawSemicolon(canvas, x) {
    const y1 = this.state.height / 3 * 1 - this.state.lineWidth;
    const y2 = this.state.height / 3 * 2 - this.state.lineWidth;
    const width = 2 * this.state.lineWidth;
    canvas.save();
    canvas.fillStyle = this.state.color;
    canvas.fillRect(x, y1, width, width);
    canvas.fillRect(x, y2, width, width);
    canvas.restore();
  }

  render() {
    this.drawClock();
    return (
      <canvas width={this.state.width} height={this.state.height} ref={(r) => {this.canvas = r;}} />
    );
  }
}

Clock.propTypes = {
  config: React.PropTypes.object,
};

export default Clock;
