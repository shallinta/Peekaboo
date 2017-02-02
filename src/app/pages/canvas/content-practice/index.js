import React from 'react';
import './style.css';

import P1 from './p1';

class Page extends React.PureComponent {

  render() {
    return (
      <div className="practice-wrapper">
        <P1 />
      </div>
    );
  }
}

export default Page;
