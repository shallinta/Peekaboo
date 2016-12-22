import React from 'react';
import './style.css';

import Esperanto from '../../../common/esperanto';

class SubPage extends React.PureComponent {

  render() {
    return (
      <div className="wrapper-category">
        <h2>
          <Esperanto title="Hello!" lower>Saluton!</Esperanto>Here is the category page.
        </h2>
      </div>
    );
  }
}

export default SubPage;
