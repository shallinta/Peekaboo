import React from 'react';
import './style.css';

import Vorto from '../../../common/vorto';

class SubPage extends React.PureComponent {

  render() {
    return (
      <div className="wrapper-about">
        <h2>
          <Vorto title="Hello!" lower>Saluton!</Vorto>Here is the about page.
        </h2>
      </div>
    );
  }
}

export default SubPage;
