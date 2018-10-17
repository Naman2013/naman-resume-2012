import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import TopBar from './TopBar';
import Menu from './Menu';
import MENU_INTERFACE, {
  isLeft,
  isRight,
} from './Menus/MenuInterface';
import {
  closeAllMenus,
  closeUpsellModal,
  toggleGlobalNavMenu,
  toggleGlobalNavNotificationMenu,
} from 'modules/global-navigation/actions';
import { customModalStylesBlackOverlay } from 'styles/mixins/utilities';

const mapStateToProps = ({ globalNavigation, routing: { locationBeforeTransitions: { key } }, user }) => ({
  routeKey: key,
  user,
  ...globalNavigation,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    closeAllMenus,
    closeUpsellModal,
    toggleGlobalNavMenu,
    toggleGlobalNavNotificationMenu,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class GlobalNavigation extends Component {
  static propTypes = {
    actions: PropTypes.shape({}),
    activeLeft: PropTypes.string,
    activeMenu: PropTypes.string,
    activeRight: PropTypes.string,
    isLeftOpen: PropTypes.bool,
    isNotificationMenuOpen: PropTypes.bool,
    isRightOpen: PropTypes.bool,
    routeKey: PropTypes.string,
    showUpsellModal: PropTypes.bool,
  };

  static defaultProps = {
    actions: {},
    activeLeft: '',
    activeMenu: '',
    activeRight: '',
    isLeftOpen: false,
    isNotificationMenuOpen: false,
    isRightOpen: false,
    showUpsellModal: false,
  };


  componentDidMount() {
    window.addEventListener('scroll', this.closeAll);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeKey !== this.props.routeKey) {
      this.closeAll();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.closeAll);
  }

  closeAll = (e) => {
    const { actions } = this.props;
    actions.closeAllMenus();
  }

  closeUpsellModal = () => {
    const { actions } = this.props;
    actions.closeUpsellModal();
  }

  handleMenuClick = (menuName) => {
    const { activeMenu, actions } = this.props;
    const sameMenu = menuName === activeMenu;
    const nextMenu = (sameMenu) ? MENU_INTERFACE.DEFAULT.name : menuName;
    const isDefault = (menuName) === MENU_INTERFACE.DEFAULT.name;
    const isLeftUpdate = !sameMenu && !isDefault && isLeft(menuName);
    const isRightUpdate = !sameMenu && !isDefault && isRight(menuName);
    actions.toggleGlobalNavMenu({
      activeMenu: nextMenu,
      isLeftOpen: isLeftUpdate,
      isRightOpen: isRightUpdate,
      activeLeft: (isLeftUpdate) ? menuName : this.props.activeLeft,
      activeRight: (isRightUpdate) ? menuName : this.props.activeRight,
      isNotificationMenuOpen: false,
    });
  }

  handleNotificationClick = (menuName) => {
    const { activeMenu, actions } = this.props;
    const sameMenu = menuName === activeMenu;
    const nextMenu = (sameMenu) ? MENU_INTERFACE.DEFAULT.name : menuName;
    const isDefault = (menuName) === MENU_INTERFACE.DEFAULT.name;
    const isRightUpdate = !sameMenu && !isDefault && isRight(menuName);
    actions.toggleGlobalNavNotificationMenu({
      activeMenu: nextMenu,
      isNotificationMenuOpen: isRightUpdate,
    });
  }

  render() {
    const {
      activeLeft,
      activeMenu,
      activeRight,
      isLeftOpen,
      isNotificationMenuOpen,
      isRightOpen,
      mainMenu,
      showUpsellModal,
      user,
      userMenu,
    } = this.props;

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
          width={leftMenuContent.menuWidth}
          widthUnits={leftMenuContent.menuWidthUnits}
          theme={leftMenuContent.theme}
          isOpen={isLeftOpen}
          render={props => (
            leftMenuContent.render(Object.assign({}, props, { userMenu, mainMenu }))
          )}
        />

        <Menu
          title={rightMenuContent.title}
          handleClose={this.closeAll}
          position="right"
          isOpen={isRightOpen}
          width={rightMenuContent.menuWidth}
          widthUnits={rightMenuContent.menuWidthUnits}
          theme={rightMenuContent.theme}
          render={props => (
            rightMenuContent.render(Object.assign({}, props, { userMenu, mainMenu }))
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
        <Modal
          ariaHideApp={false}
          isOpen={showUpsellModal}
          style={customModalStylesBlackOverlay}
          contentLabel="Upsell"
          shouldCloseOnOverlayClick={false}
          onRequestClose={this.closeUpsellModal}
        >

          upsell text goes here
        </Modal>
        <style jsx>{`
          .root {
            margin: 0;
            padding: 0;
            width: 100%;
            z-index: 9999;
            position: relative;
            overflow-x: hidden;
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
