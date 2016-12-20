import React from 'react';
import './style.css';

class Page extends React.PureComponent {

  componentWillMount() {
    this.updateState({
      activePage: 'HOME'
    });
  }

  updateState(state) {
    this.setState({
      ...this.state,
      ...state
    });
  }

  render() {
    return (
      <div className="points">
      123
      </div>
    );
  }
}

export default Page;
