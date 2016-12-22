import React from 'react';
import './style.css';

import NoteList from '../notes';

class SubPage extends React.PureComponent {

  render() {
    return (
      <div className="wrapper-index">
        <NoteList />
      </div>
    );
  }
}

export default SubPage;
