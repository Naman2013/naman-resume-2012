import React, { Component } from 'react';
import TopBar from './TopBar';
import Menu from './Menu';
import noop from 'lodash/noop';
import MENU_INTERFACE from './Menus/MenuInterface';

class GlobalNavigation extends Component {
  state = {
    isLeftOpen: false,
    isRightOpen: true,
    activeMenu: MENU_INTERFACE.DEFAULT,
    activeLeft: null,
    activeRight: null,
  };

  handleMenuClick = menuName => {
    this.setState({
      activeMenu: menuName,
    });
  }

  handleToggleClick = event => {
    event.preventDefault();
    this.setState((prevState) => ({
      isRightOpen: !prevState.isRightOpen,
      isLeftOpen: !prevState.isLeftOpen,
    }));
  }

  render() {
    const { isLeftOpen, isRightOpen, activeMenu } = this.state;

    return(
      <div className="root">
        <TopBar
          activeMenu={activeMenu}
          handleMenuClick={this.handleMenuClick}
        />

        <Menu
          position="left"
          isOpen={isLeftOpen}
          render={noop}
        />

        <Menu
          position="right"
          isOpen={isRightOpen}
          render={noop}
        />

        <button
          style={{ marginLeft: '400px' }}
          onClick={this.handleToggleClick}
        >
          Toggle Menu
        </button>
        <style jsx>{`
          .root {
            position: relative;
            height: 100vh;
            margin: 0;
            padding:0;
          }
        `}</style>
      </div>
    );
  }
}

export default GlobalNavigation;
