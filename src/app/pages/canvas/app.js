import React from 'react';
import './style.css';

import Clock from '../../common/clock/';
import Graph from '../../common/graph/';

class Page extends React.PureComponent {

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
      height: 260,
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
    return (
      <div className="main-frame">
        <div className="clock">
          现在时间是：<Clock config={config} />，欢迎来到Canvas世界。
        </div>
        <div className="clock2">
          现在时间是：<Clock config={config2} />，欢迎来到Canvas世界。
        </div>
        <div className="graph">
          <Graph config={config3} />
        </div>
      </div>
    );
  }
}

export default Page;
