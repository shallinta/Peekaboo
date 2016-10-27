import React from 'react';
import './style.css';

import Header from '../../common/header';
import Footer from '../../common/footer';

class Page extends React.PureComponent {

  componentWillMount() {
    this.updateState({
      activePage: 'HOME'
    });
  }

  updateState(state) {
    this.setState({
      ...this.state,
      ...state
    });
  }

  render() {
    return (
      <div className="home">
        <Header active={this.state.activePage} />
        <article className="content">
          <h2>The big packing is coming!</h2>
          <h3>基于webpack的前端集成开发环境和编译环境</h3>
          <figure>
            <h4>1. 安装<span>yo</span>和<span>generator-packing</span></h4>
            <code>
              npm install -g yo generator-packing
            </code>
          </figure>
          <figure>
            <h4>2. 生成你的网站</h4>
            <code>
              yo packing
            </code>
          </figure>
          <figure>
            <h4>3. 启动开发模式</h4>
            <code>
              npm run serve
            </code>
          </figure>
          <figure>
            <h4>4. 在浏览器中预览网站 <span>http://localhost:8081</span></h4>
          </figure>
          <div
            className="x"
            title="Every node must have a relevant source
            so PostCSS can generate an accurate source map."
          >
            · Every node must have a relevant source so PostCSS can generate an accurate source map.
          </div>
        </article>
        <Footer />
      </div>
    );
  }
}

export default Page;
