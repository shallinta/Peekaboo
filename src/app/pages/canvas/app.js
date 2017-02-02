import React from 'react';
import './style.css';

import Vorto from '../../common/vorto';
import IndexPage from './content-index';
import PracticePage from './content-practice';
import PaintPage from './content-paint';
import TestPage from './content-test';

const tabs = {
  index: '首页',
  practice: '练习',
  paint: '绘板',
  test: '测试',
};

class Page extends React.PureComponent {

  state = {
    page: 'index'
  };

  componentWillMount() {
    let hash = location.hash.replace('#', '');
    hash = tabs[hash] && hash || 'index';
    this.updateState({
      ...this.state,
      page: hash
    }).then(() => {
      history.replaceState({ page: this.state.page }, '', `canvas.pug#${this.state.page}`);
    });
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      console.log('pop', history.length);
      this.updateState(history.state);
    });
  }

  updateState(state) {
    return new Promise((resolve, reject) => {
      this.setState({
        ...this.state,
        ...state
      }, resolve || reject);
    });
  }

  getContentNode() {
    switch (this.state.page) {
      case 'index':
        return <IndexPage />;
      case 'practice':
        return <PracticePage />;
      case 'paint':
        return <PaintPage />;
      case 'test':
        return <TestPage />;
      default:
        return <IndexPage />;
    }
  }

  render() {
    const contentNode = this.getContentNode();
    const tabNames = Object.keys(tabs);

    return (
      <div className="wrapper">
        <header className="header">
          <h2>Canvas</h2>
          <ul>
            {
              tabNames.map(tab => (
                <li key={`tab-${tab}`} data-id={tab} className={this.state.page === tab ? 'active' : ''} onClick={this.chooseContent}>{tabs[tab]}</li>
                )
              )
            }
          </ul>
        </header>
        <div className="content">
          {contentNode}
        </div>
        <footer className="footer">
          <Vorto title="Copyright">Kopirajto</Vorto> &copy; <a href="https://github.com/shallinta/Peekaboo"> John Chan</a>
        </footer>
      </div>
    );
  }

  chooseContent = (e) => {
    const hash = e.target.getAttribute('data-id');
    this.updateState({
      page: hash
    }).then(() => {
      history.pushState({ page: this.state.page }, '', `canvas.pug#${this.state.page}`);
    });
  }

}

export default Page;
