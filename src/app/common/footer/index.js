import React from 'react';
import './style.css';

export default class Footer extends React.PureComponent {

  render() {
    return (
      <footer className="common-footer">
        <div className="footer-info">
          <ul>
            <li>Webpack 官方文档：<a href="http://webpack.github.io/docs/">http://webpack.github.io/docs/</a></li>
            <li>Webpack 中文手册：<a href="http://webpackdoc.com/">http://webpackdoc.com/</a></li>
            <li>Postcss 官方网站：<a href="http://postcss.org/">http://postcss.org/</a></li>
            <li>Cssnext 官方文档：<a href="http://cssnext.io/features/">http://cssnext.io/features/</a></li>
            <li>Writing a PostCSS Plugin：<a href="https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md">https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md</a></li>
          </ul>
          <img className="logo" alt="logo" src="/images/packing-logo.png" />
        </div>
        <p className="footer-author">CopyRight@ <a href="https://github.com/shallinta/Peekaboo"> John Chan</a></p>
      </footer>
    );
  }
}
