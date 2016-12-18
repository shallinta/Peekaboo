import React from 'react';
import './style.css';

import IndexPage from './content-index';
import PaintPage from './content-paint';
import TestPage from './content-test';

class Page extends React.PureComponent {

  state = {
    page: 'index'
  };

  componentWillMount() {
    let hash = location.hash.replace('#', '');
    hash = hash || 'index';
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

    return (
      <div className="wrapper">
        <header className="header">
          <h2>Canvas</h2>
          <ul>
            <li data-id="index" className={this.state.page === 'index' ? 'active' : ''} onClick={this.chooseContent}>首页</li>
            <li data-id="paint" className={this.state.page === 'paint' ? 'active' : ''} onClick={this.chooseContent}>绘板</li>
            <li data-id="test" className={this.state.page === 'test' ? 'active' : ''} onClick={this.chooseContent}>测试</li>
          </ul>
        </header>
        <div className="content">
          {contentNode}
        </div>
        <footer className="footer">
          Copyright &copy; <a href="https://github.com/shallinta/Peekaboo"> John Chan</a>
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
