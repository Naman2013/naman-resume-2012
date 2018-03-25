import React, { Component } from 'react';
import TopBar from './TopBar';
import Menu from './Menu';
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

  handleMenuClick = (menuName) => {
    const { activeMenu } = this.state;
    const sameMenu = menuName === activeMenu;
    const nextMenu = (sameMenu) ? MENU_INTERFACE.DEFAULT.name : menuName;
    const isDefault = (menuName) === MENU_INTERFACE.DEFAULT.name;
    const isLeftUpdate = !sameMenu && !isDefault && isLeft(menuName);
    const isRightUpdate = !sameMenu && !isDefault && isRight(menuName);

    this.setState(prevState => ({
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

    const leftMenuContent = MENU_INTERFACE[activeLeft];
    const rightMenuContent = MENU_INTERFACE[activeRight];

    return (
      <div className="root">
        <div className="top-bar">
          <TopBar
            activeMenu={activeMenu}
            handleMenuClick={this.handleMenuClick}
          />
        </div>

        <Menu
          title={leftMenuContent.title}
          handleClose={this.closeAll}
          position="left"
          isOpen={isLeftOpen}
          render={() => (leftMenuContent.component)}
        />

        <Menu
          title={rightMenuContent.title}
          handleClose={this.closeAll}
          position="right"
          isOpen={isRightOpen}
          render={() => (rightMenuContent.component)}
        />

        <style jsx>{`
          .root {
            margin: 0;
            padding: 0;
            width: 100%;
            z-index: 9999;
          }

          .menus {
            z-index: 9999;
            min-height: 100vh;
            height: 100%;
          }
        `}
        </style>
      </div>
    );
  }
}

export default GlobalNavigation;
