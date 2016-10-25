import React from 'react';
// import './style.css';

class Home extends React.PureComponent {

  componentWillMount() {
    this.updateState({
      x: '12355'
    });
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

export default Home;
