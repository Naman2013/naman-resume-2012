import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import onClickOutside from 'react-onclickoutside';
import MenuLink from './../components/MenuLink';
import Submenu from './../components/Submenu';
import * as menuActions from './../modules/Menu';

const { number, bool, string, func, array } = PropTypes;

class MenuComponent extends Component {
  static propTypes = {
    source: string.isRequired,
    fetchMenuItems: func.isRequired,
    activateMenu: func.isRequired,
    deactivateMenu: func.isRequired,
    isActive: bool.isRequired,
    activeMenuIndex: number,
    menuItems: array.isRequired,
  };

  componentDidMount() {
    this.props.fetchMenuItems();
  }

  getPrimaryMenuLink = el => (el.type === 'basic' ? el.link : `/${el.label.en.toLowerCase()}`);

  toggleDrawer = () => {
    if (!this.props.isActive) {
      this.props.activateMenu();
    } else {
      this.props.deactivateMenu();
    }
  }

  handleClickOutside = () => {
    this.props.deactivateMenu();
  }

  handleClick = (index) => {
    if (this.props.activeMenuIndex === index) {
      this.props.deactivateMenu();
    } else {
      this.props.activateMenu(index);
    }
  }

  render() {
    return (
      <aside className="menu-container">
        <p className={classnames('menu', { active: this.props.isActive })} onClick={this.toggleDrawer} />
        <nav>
          <ul>
            {this.props.menuItems.map((item, index) => {
              return (
                <MenuLink key={index} index={index} data={item} handleClick={this.handleClick} />
              );
            })}
          </ul>
        </nav>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="left-submenu"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          {this.props.menuItems.map((item, index) => {
            if (item.type === 'children' && this.props.activeMenuIndex === index) {
              return (
                <Submenu key={index} data={item.children} />
              );
            }
          })}
        </ReactCSSTransitionGroup>
      </aside>
    );
  }
}

function mapStateToProps({ menu }) {
  return { ...menu };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(menuActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(MenuComponent));
