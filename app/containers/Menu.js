import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import onClickOutside from 'react-onclickoutside';
import MenuLink from './../components/menu/MenuLink';
import Submenu from './../components/menu/Submenu';
import * as menuActions from './../modules/Menu';
import styles from '../styles/menu.scss';
import MenuSocial from './../components/menu/MenuSocial';


const { number, bool, string, func, array } = PropTypes;

class Menu extends Component {
  static propTypes = {
    source: string.isRequired,
    fetchMenuItems: func.isRequired,
    activateMenu: func.isRequired,
    deactivateMenu: func.isRequired,
    isActive: bool.isRequired,
    activeMenuIndex: number,
    menuItems: array.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleRootNavigationClick = this.handleRootNavigationClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchMenuItems();
  }

  getPrimaryMenuLink = el => (el.type === 'basic' ? el.link : `/${el.label.en.toLowerCase()}`);

  toggleDrawer() {
    if (!this.props.isActive) {
      this.props.activateMenu(1);
    } else {
      this.props.deactivateMenu();
    }
  }

  handleClickOutside() {
    this.props.deactivateMenu();
  }

  handleRootNavigationClick(index) {
    if(this.props.activeMenuIndex === index || index === 0) {
      this.props.deactivateMenu();
    } else {
      this.props.activateMenu(index);
    }
  }

  render() {
    const { isActive, menuItems } = this.props;

    return (
      <aside className="menu-container">
        {
          isActive ?
          <p className="menu" onClick={this.toggleDrawer}><span className="fa fa-close"></span></p>
          :
          <p className="menu" onClick={this.toggleDrawer}><span className="fa fa-bars"></span></p>
        }

        <nav>
          <ul>
            {
              menuItems.map((item, index) => (
                <MenuLink
                  key={index}
                  index={index}
                  data={item}
                  handleClick={this.handleRootNavigationClick}
                />
              ))
            }
          </ul>
        </nav>

        <ReactCSSTransitionGroup
          component="div"
          transitionName="left-submenu"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          {this.props.menuItems.map((item, index) => {
            if(item.type === 'children' && this.props.activeMenuIndex === index) {
              return (
                <Submenu key={index} data={item.children} />
              );
            }
          })}
        </ReactCSSTransitionGroup>

        <MenuSocial />

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


export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(Menu));
