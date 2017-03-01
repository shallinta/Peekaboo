import React from 'react';
import './style.css';

import Palette from './palette';

class Page extends React.PureComponent {

  render() {
    return (
      <div className="paint-wrapper">
        <div className="content-wrapper">
          <section className="palette-area">
            <Palette />
          </section>
          <aside className="aside-area">
            <form action="https://www.baidu.com/s" target="_blank">
              <input type="text" name="wd" />
              <input type="submit" value="百度一下" />
            </form>
          </aside>
        </div>
      </div>
    );
  }
}

export default Page;
