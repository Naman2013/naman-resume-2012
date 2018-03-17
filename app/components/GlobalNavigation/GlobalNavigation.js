import React, { Component } from 'react';
import TopBar from './TopBar';
import Menu from './Menu';
import noop from 'lodash/noop';
import MENU_INTERFACE, {
  menuComponents,
  isLeft,
  isRight,
} from './Menus/MenuInterface';

class GlobalNavigation extends Component {
  state = {
    isLeftOpen: false,
    isRightOpen: false,
    activeMenu: MENU_INTERFACE.DEFAULT,
    activeLeft: MENU_INTERFACE.DEFAULT,
    activeRight: MENU_INTERFACE.DEFAULT,
  };

  handleMenuClick = menuName => {
    const { activeMenu } = this.state;
    const sameMenu = menuName === activeMenu;
    const nextMenu = (sameMenu) ? MENU_INTERFACE.DEFAULT : menuName;
    const isLeftUpdate = isLeft(menuName) && !sameMenu;
    const isRightUpdate = isRight(menuName) && !sameMenu;

    this.setState((prevState) => ({
      activeMenu: nextMenu,
      isLeftOpen: isLeftUpdate,
      isRightOpen: isRightUpdate,
      activeLeft: (isLeftUpdate) ? menuName : prevState.activeLeft,
      activeRight: (isRightUpdate) ? menuName : prevState.activeRight,
    }));
  }

  render() {
    const {
      isLeftOpen,
      isRightOpen,
      activeMenu,
      activeLeft,
      activeRight,
    } = this.state;

    return(
      <div className="root">
        <TopBar
          activeMenu={activeMenu}
          handleMenuClick={this.handleMenuClick}
        />

        <Menu
          position="left"
          isOpen={isLeftOpen}
          render={() => (menuComponents[activeLeft])}
        />

        <Menu
          position="right"
          isOpen={isRightOpen}
          render={() => (menuComponents[activeRight])}
        />
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
