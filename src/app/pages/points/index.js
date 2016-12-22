import React from 'react';
import ReactDOM from 'react-dom';
import Page from './app';

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
