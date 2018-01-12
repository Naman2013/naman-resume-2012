import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import onClickOutside from 'react-onclickoutside';
import MenuLink from './../components/menu/MenuLink';
import Submenu from './../components/menu/Submenu';
import { fetchMenuList, activateMenu, deactivateMenu } from './../modules/menu/actions';
import '../styles/menu.scss';

class Menu extends Component {
  static propTypes = {
    activeMenuIndex: PropTypes.number,
    fetchMenuList: PropTypes.func.isRequired,
    activateMenu: PropTypes.func.isRequired,
    deactivateMenu: PropTypes.func.isRequired,
    menuList: PropTypes.array.isRequired,
  };

  static defaultProps = {
    activeMenuIndex: 0,
  };

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleRootNavigationClick = this.handleRootNavigationClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchMenuList({});
  }

  getPrimaryMenuLink = el => (el.type === 'basic' ? el.link : `/${el.label.en.toLowerCase()}`);

  handleClickOutside() {
    this.props.deactivateMenu();
  }

  handleRootNavigationClick(index) {
    if (this.props.activeMenuIndex === index || index === 0) {
      this.props.deactivateMenu();
    } else {
      this.props.activateMenu(index);
    }
  }

  render() {
    const { activeMenuIndex, menuList } = this.props;
    return (
      <aside className="menu-container">
        <nav>
          <ul>
            {
              menuList.map((item, index) => (
                item.showMenu && <MenuLink
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
          className="left-submenu-wrapper"
          transitionName="left-submenu"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          {
            menuList.map((listItem, index) => {
              if (activeMenuIndex === index) {
                return (
                  <Submenu key={`${listItem.text}-${index}`} data={listItem.menuItems} />
                );
              }
            })
          }
        </ReactCSSTransitionGroup>
      </aside>
    );
  }
}

const mapStateToProps = ({ menu }) => ({ ...menu });
const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchMenuList,
  activateMenu,
  deactivateMenu,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(Menu));
