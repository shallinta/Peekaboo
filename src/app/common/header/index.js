import React from 'react';
import './style.css';

class Header extends React.Component {

  componentWillMount() {
    this.updateState({
      smallNav: false,
    });
  }

  updateState(state) {
    this.setState({
      ...this.state,
      ...state
    });
  }

  clickMenu() {
    this.updateState({
      ...this.state,
      smallNav: !this.state.smallNav,
    });
  }

  render() {
    const active = this.props.active;
    return (
      <header className="common-header">

        <div className="header-title">
          <img alt="logo" src="/images/packing-logo.png" />
          <h1>THE BIG <em>PACKING</em><sup><del>BANG</del></sup></h1>
        </div>

        <div className="header-menu" onClick={() => this.clickMenu()}> NAVIGATOR </div>

        <nav className={this.state.smallNav ? 'header-nav header-nav-small' : 'header-nav'}>
          <ul>
            <li className={active === 'HOME' ? 'active' : ''}><a href="">HOME</a></li>
            <li className={active === 'SETUP' ? 'active' : ''}><a href="">SETUP</a></li>
            <li className={active === 'DOCS' ? 'active' : ''}><a href="">DOCS</a></li>
            <li className={active === 'API' ? 'active' : ''}><a href="">API</a></li>
            <li className={active === 'ABOUT' ? 'active' : ''}><a href="">ABOUT</a></li>
          </ul>
        </nav>
      </header>
    );
  }

}

Header.propTypes = {
  active: React.PropTypes.string.isRequired,
};

export default Header;
