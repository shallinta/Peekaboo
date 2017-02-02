import React from 'react';
import './style.css';

import Vorto from '../../common/vorto';
import IndexPage from './content-index';
import CategoryPage from './content-category';
import AboutPage from './content-about';

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
      history.replaceState({ page: this.state.page }, '', `points.pug#${this.state.page}`);
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
      case 'category':
        return <CategoryPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <IndexPage />;
    }
  }

  render() {
    const contentNode = this.getContentNode();

    return (
      <div className="app-container">
        <header className="header">
          <h2><Vorto title="Notes" lower>Notoj</Vorto> <Vorto title="of" lower>de</Vorto> <Vorto title="Front-End" lower>Fronto-Pinto</Vorto></h2>
          <ul>
            <li data-id="index" className={this.state.page === 'index' ? 'active' : ''} onClick={this.chooseContent}>首页</li>
            <li data-id="category" className={this.state.page === 'category' ? 'active' : ''} onClick={this.chooseContent}>分类</li>
            <li data-id="about" className={this.state.page === 'about' ? 'active' : ''} onClick={this.chooseContent}>关于</li>
          </ul>
        </header>
        <div className="content">{contentNode}</div>
        <footer className="footer">
          <Vorto title="Copyright">Kopirajto</Vorto> &copy; <a href="https://github.com/shallinta/Peekaboo"> John Chan </a> 2016
        </footer>
      </div>
    );
  }

  chooseContent = (e) => {
    const hash = e.target.getAttribute('data-id');
    this.updateState({
      page: hash
    }).then(() => {
      history.pushState({ page: this.state.page }, '', `points.pug#${this.state.page}`);
    });
  }
}

export default Page;
