import React from 'react';
import './style-test.css';

import Clock from '../../common/clock/';
import Graph from '../../common/graph/';
import AntLine from '../../common/ant-line';
import Loading from '../../common/loading';

class TestPage extends React.PureComponent {

  render() {
    const config = {
      // width: 100,
      height: 14,
      numberWidth: 10,
      // heightRatio: 1.2,
      // lineWidth: 40,
      // sepWidth: 20,
      color: '#333',
      // backColor: false,
    };
    const config2 = {
      height: 24,
      numberWidth: 18,
      color: '#39f',
      backColor: false,
    };
    const config3 = {
      width: 600,
      height: 280,
      startX: -300,
      startY: -180,
      unit: 3,
      ratio: 50,
      // coordinate: false,
      curves: [
        {
          x1: 63,
          // x2: 0,
          color: '#999',
          equation: x => Math.sin(x), // y=sin(x)
        },
        {
          // x1: 0,
          x2: -63,
          color: '#999',
          equation: x => Math.cos(x + Math.PI / 2), // y=cos(x)
        },
        {
          color: '#f9c',
          equation: x => Math.sqrt(1 - Math.pow((x - 1) * 5, 2)) / 5, // y= 根(1-平方(x-1))
        },
        {
          color: '#f9c',
          equation: x => 0 - Math.sqrt(1 - Math.pow((x - 1) * 5, 2)) / 5, // y= -根(1-平方(x-1))
        },
        {
          color: '#f9c',
          equation: x => Math.sqrt(1 - Math.pow((x + 1) * 5, 2)) / 5, // y= 根(1-平方(x+1))
        },
        {
          color: '#f9c',
          equation: x => 0 - Math.sqrt(1 - Math.pow((x + 1) * 5, 2)) / 5, // y= -根(1-平方(x+1))
        },
        {
          color: '#9cf',
          equation: x => 0 - Math.sqrt(1 - Math.pow(Math.abs(x) - 1, 2)), // y= -根(1-(|x|-1)(|x|-1))
        },
        {
          color: '#99f',
          equation: x => Math.sqrt(1 - Math.pow(Math.abs(x) - 1, 2)), // y= 根(1-(|x|-1)(|x|-1))
        },
        {
          color: '#f99',
          equation: x => Math.acos(1 - Math.abs(x)) - Math.PI, // y= arccos(1-|x|) - PI
        }
      ],
    };
    const config4 = {
      width: 200,
      height: 100,
      startX: -30,
      startY: -50,
      unit: 1,
      ratio: 8,
      curves: [
        {
          x1: -100,
          x2: 100,
          color: '#f99',
          equation: x => Math.sin(x) + Math.cos(2 * x), // y=sin(x) + cos(2x)
        },
        {
          x1: 100,
          x2: 300,
          color: '#9f9',
          equation: x => 1.25 * (Math.sin(x) + Math.sin(2 * x)), // y=sin(x) + sin(2x)
        },
        {
          x1: 300,
          x2: 500,
          color: '#99f',
          equation: x => 1.5 * (Math.sin(x - Math.PI / 4) + Math.sin(2 * (x - Math.PI / 4)) + Math.sin(3 * (x - Math.PI / 4))),
        },
        {
          color: '#3ff',
          equation: x => 1 / x,
        },
        {
          color: '#f3f',
          equation: x => Math.log2(x),
        },
        {
          color: '#ff3',
          equation: x => x * x,
        },
      ]
    };
    const config5 = {
      width: 350,
      height: 350,
      startX: -10,
      startY: -10,
      unit: 2,
      ratio: 1,
      curves: [
        // {
        //   color: '#c33',
        //   equation: () => 1.5,
        // },
        // {
        //   color: '#999',
        //   equation: x => 2 * Math.sin(x * 5) * Math.tan(1 / x) * Math.sin(11 / 6 * Math.PI - 10 * x), // 2sin(11π/6 -2x)+3+m
        // },
        {
          x1: 0,
          x2: 300,
          color: '#f00',
          equation: (x) => {
            const w = 300;
            const d = w / 2;
            return d / Math.tan(1) * (Math.tan((x - d) / d) + Math.tan(1));
          },
        },
        {
          x1: 0,
          x2: 300,
          color: '#00f',
          equation: (x) => {
            const w = 300;
            const d = w / 2;
            if (x < d) {
              return d * Math.sqrt(1 - (x = (x - d) / d) * x);
            } else {
              return w - d * Math.sqrt(1 - (x = (x - d) / d) * x);
            }
          }
        }
      ]
    };
    const config6 = {
      width: 200,
      height: 50,
      unit: 3,
      antLength: 10,
      spaceLength: 15,
      direction: 2,
      color: '#f93',
      speed: 30,
      // offset: 3,
    };
    const config7 = {
      width: 800,
      height: 40,
      duration: 2000,
      radius: 3,
      delay: 80,
      count: 5,
      type: 1,
      speed: 20,
      color: '#fff',
    };
    const config8 = {
      width: 800,
      height: 40,
      duration: 2000,
      radius: 3,
      delay: 240,
      count: 3,
      type: 2,
      speed: 10,
      color: '#fff',
    };
    const config9 = {
      width: 350,
      height: 350,
      unit: 3,
      antLength: 10,
      spaceLength: 15,
      color: '#333',
      speed: 30,
    };
    const config10 = {
      width: 800,
      height: 40,
      unit: 3,
      antLength: 10,
      spaceLength: 15,
      color: '#f9c',
      speed: 30,
    };
    const config11 = {
      width: 50,
      height: 50,
      duration: 2000,
      radius: 2,
      delay: 130,
      count: 5,
      type: 1,
      style: Loading.styles.CIRCLE,
      speed: 10,
      color: '#fff',
    };
    const config12 = {
      width: 50,
      height: 50,
      duration: 2000,
      radius: 2,
      delay: 240,
      count: 3,
      type: 2,
      style: Loading.styles.CIRCLE,
      speed: 10,
      color: '#fff',
    };

    return (
      <div className="test-wrapper">
        <div className="clock">
          现在时间是：<Clock config={config} />，欢迎来到Canvas世界。
        </div>
        <div className="clock2">
          现在时间是：<Clock config={config2} />，欢迎来到Canvas世界。
        </div>
        <div className="graph">
          <Graph config={config3} />
        </div>
        <div className="graph">
          <Graph config={config4} />
        </div>
        <div className="graph">
          <Graph config={config5} />
          <AntLine config={config9} />
        </div>
        <div className="ant-line">
          <AntLine config={config6} />
          <h2>这是一条蚂蚁线</h2>
        </div>
        <div className="loading">
          <Loading config={config7} />
          <AntLine config={config10} />
        </div>
        <div className="loading">
          <Loading config={config8} />
        </div>
        <div className="loading loading2">
          <div className="loading-inner">
            <Loading config={config11} />
          </div>
          <div className="loading-inner">
            <Loading config={config12} />
          </div>
        </div>
      </div>
    );
  }
}

export default TestPage;
