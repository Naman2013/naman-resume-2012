import React, { Component } from 'react';
import classnames from 'classnames';
import ListHotThisMonth from './ListHotThisMonth';
import ListObservatories from './ListObservatories';
import UpcomingComponent from './UpcomingComponent';
import StargazersInfo from './StargazersInfo';
import { hashHistory } from 'react-router';
import { deactivateMenu } from '../../modules/menu/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  HOT_THIS_MONTH_URL,
  NAV_TYPE_CALLING_ALL_STARGAZERS_COMPONENT,
  NAV_TYPE_HOT_OBJECTS_COMPONENT,
  NAV_TYPE_OBSERVATORY_MENU_COMPONENT,
  NAV_TYPE_UPCOMING_SHOWS_COMPONENT,
  OBSERVATORIES_URL,
  REFRESH_DELAY_SHOWS,
  REFRESH_DELAY_TELESCOPES,
  STARGAZERS_URL,
  UPCOMING_EVENTS_URL,
  NAV_TYPE_SUBMENU_EXTERNAL,
} from './constants';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    deactivateMenu,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class Submenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, link) {
    event.preventDefault();
    hashHistory.push(link);
    this.props.actions.deactivateMenu();
  }

  render() {
    const { data } = this.props;
    return (
      <section className="left-submenu">
        <ul>
          {data.map((menuItem, i) => {
            if (typeof menuItem.menuItemText !== 'undefined') {
              switch (menuItem.menuItemType) {
                case NAV_TYPE_UPCOMING_SHOWS_COMPONENT: {
                  return (<UpcomingComponent
                    key={NAV_TYPE_UPCOMING_SHOWS_COMPONENT}
                    source={UPCOMING_EVENTS_URL}
                    refreshIntervalDelay={REFRESH_DELAY_SHOWS}
                  />);
                }
                case NAV_TYPE_OBSERVATORY_MENU_COMPONENT: {
                  return (<ListObservatories
                    key={NAV_TYPE_OBSERVATORY_MENU_COMPONENT}
                    source={OBSERVATORIES_URL}
                    refreshIntervalDelay={REFRESH_DELAY_TELESCOPES}
                  />);
                }
                case NAV_TYPE_CALLING_ALL_STARGAZERS_COMPONENT: {
                  return (<StargazersInfo
                    key={NAV_TYPE_CALLING_ALL_STARGAZERS_COMPONENT}
                    source={STARGAZERS_URL}
                  />);
                }
                case NAV_TYPE_HOT_OBJECTS_COMPONENT: {
                  return (<ListHotThisMonth
                    key={NAV_TYPE_HOT_OBJECTS_COMPONENT}
                    source={HOT_THIS_MONTH_URL}
                  />);
                }
                case NAV_TYPE_SUBMENU_EXTERNAL: {
                  if (menuItem.showItem) {
                    return (
                      <li
                        key={`${menuItem.menuItemText}-${menuItem.menuItemIndex}`}
                      >
                        <a
                          className="item"
                          href={menuItem.itemLink}
                        >
                          {menuItem.menuItemText}
                        </a>
                      </li>
                    );
                  }
                  return null;
                }
                default: {
                  const menuItemClass = classnames('item', {
                    spacer: menuItem.menuItemType === 'NAV_TYPE_SUBMENU_SPACER',
                  });
                  return (menuItem.showItem &&
                    <li
                      key={`${menuItem.menuItemText}-${menuItem.menuItemIndex}`}
                    >
                      <a
                        className={menuItemClass}
                        onClick={(event) => { this.handleClick(event, menuItem.itemLink); }}
                      >
                        {menuItem.menuItemText}
                      </a>
                    </li>
                  );
                }
              }
            }
          })}
        </ul>
      </section>
    );
  }
}

export default Submenu;
