import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopBar from './TopBar';
import Menu from './Menu';
import MENU_INTERFACE, {
  isLeft,
  isRight,
} from './Menus/MenuInterface';

const mapStateToProps = ({ routing: { locationBeforeTransitions: { key } }, user }) => ({
  routeKey: key,
  user,
});

@connect(mapStateToProps, null)
class GlobalNavigation extends Component {
  static propTypes = {
    routeKey: PropTypes.string.isRequired,
  };

  state = {
    isLeftOpen: false,
    isRightOpen: false,
    isNotificationMenuOpen: false,
    activeMenu: MENU_INTERFACE.DEFAULT.name,
    activeLeft: MENU_INTERFACE.DEFAULT.name,
    activeRight: MENU_INTERFACE.DEFAULT.name,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeKey !== this.props.routeKey) {
      this.closeAll();
    }
  }

  closeAll = () => {
    this.setState({
      activeMenu: MENU_INTERFACE.DEFAULT.name,
      isLeftOpen: false,
      isRightOpen: false,
      isNotificationMenuOpen: false,
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
      isNotificationMenuOpen: false,
    }));
  }

  handleNotificationClick = (menuName) => {
    const { activeMenu } = this.state;
    const sameMenu = menuName === activeMenu;
    const nextMenu = (sameMenu) ? MENU_INTERFACE.DEFAULT.name : menuName;
    const isDefault = (menuName) === MENU_INTERFACE.DEFAULT.name;
    const isRightUpdate = !sameMenu && !isDefault && isRight(menuName);

    this.setState(prevState => ({
      activeMenu: nextMenu,
      isNotificationMenuOpen: isRightUpdate,
    }));
  }

  render() {
    const {
      activeLeft,
      activeMenu,
      activeRight,
      isLeftOpen,
      isNotificationMenuOpen,
      isRightOpen,
    } = this.state;
    const { user } = this.props;

    const leftMenuContent = MENU_INTERFACE[activeLeft];
    const rightMenuContent = MENU_INTERFACE[activeRight];
    const notificationMenuContent = MENU_INTERFACE[MENU_INTERFACE.ALERTS.name]

    return (
      <div className="root">
        <div className="top-bar">
          <TopBar
            activeMenu={activeMenu}
            handleMenuClick={this.handleMenuClick}
            handleNotificationClick={this.handleNotificationClick}
          />
        </div>

        <Menu
          title={leftMenuContent.title}
          handleClose={this.closeAll}
          position="left"
          isOpen={isLeftOpen}
          render={props => (
            leftMenuContent.render(props)
          )}
        />

        <Menu
          title={rightMenuContent.title}
          handleClose={this.closeAll}
          position="right"
          isOpen={isRightOpen}
          render={props => (
            rightMenuContent.render(props)
          )}
        />
        {/* Prerender Notification Menu */}
        {user.isAuthorized ? <Menu
          title={notificationMenuContent.title}
          handleClose={this.closeAll}
          position="right"
          isOpen={isNotificationMenuOpen}
          render={props => (
            notificationMenuContent.render(props)
          )}
        /> : null}

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
