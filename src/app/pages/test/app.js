import React from 'react';
import './style.css';

import A from './A';

class Page extends React.PureComponent {

  componentWillMount() {
    this.updateState({
      x: '12355'
    });
    this.a = new A();
    // this.a.y = 45;
    this.a.foo();
  }

  updateState(state) {
    this.setState({
      ...this.state,
      ...state
    });
  }

  render() {
    console.log(this.state.x);
    return (
      <div className="home">
        {this.state.x}
        <span> Span </span>
        <span className="author"> — zc </span>
      </div>
    );
  }
}

export default Page;
