import React, { Component } from 'react';
import TopBar from './TopBar';
import Menu from './Menu';
import noop from 'lodash/noop';
import MENU_INTERFACE, {
  isLeft,
  isRight,
} from './Menus/MenuInterface';

class GlobalNavigation extends Component {
  state = {
    isLeftOpen: false,
    isRightOpen: false,
    activeMenu: MENU_INTERFACE.DEFAULT.name,
    activeLeft: MENU_INTERFACE.DEFAULT.name,
    activeRight: MENU_INTERFACE.DEFAULT.name,
  };

  closeAll = () => {
    this.setState({
      activeMenu: MENU_INTERFACE.DEFAULT.name,
      isLeftOpen: false,
      isRightOpen: false,
    });
  }

  handleMenuClick = menuName => {
    const { activeMenu } = this.state;
    const sameMenu = menuName === activeMenu;
    const nextMenu = (sameMenu) ? MENU_INTERFACE.DEFAULT.name : menuName;
    const isDefault = menuName === MENU_INTERFACE.DEFAULT.name;
    const isLeftUpdate = !sameMenu && !isDefault && isLeft(menuName);
    const isRightUpdate = !sameMenu && !isDefault && isRight(menuName);

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
          title={MENU_INTERFACE[activeLeft].title}
          handleClose={this.closeAll}
          position="left"
          isOpen={isLeftOpen}
          render={() => (MENU_INTERFACE[activeLeft].component)}
        />

        <Menu
          title={MENU_INTERFACE[activeRight].title}
          handleClose={this.closeAll}
          position="right"
          isOpen={isRightOpen}
          render={() => (MENU_INTERFACE[activeRight].component)}
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
