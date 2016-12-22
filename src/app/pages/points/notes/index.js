import React from 'react';
import './style.css';

import NoteXHeight from './note-x-height';
import NoteVerticalAlign from './note-vertical-align';
import NoteZIndex from './note-z-index';

class NoteList extends React.PureComponent {

  render() {
    return (
      <section className="notes-list">
        <div className="notes-list-item">
          <NoteXHeight />
        </div>
        <div className="notes-list-item">
          <NoteVerticalAlign />
        </div>
        <div className="notes-list-item">
          <NoteZIndex />
        </div>
        <div className="notes-list-item" />
      </section>
    );
  }
}

export default NoteList;
