import React, { Component } from 'react';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqueId from 'lodash/uniqueId';

import ListHotThisMonth from './ListHotThisMonth';
import ListObservatories from './ListObservatories';
import UpcomingComponent from './UpcomingComponent';
import StargazersInfo from './StargazersInfo';

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
  NAV_TYPE_SUBMENU_EXTERNAL_NEW_TAB,
} from './constants';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
  }, dispatch),
});

function generateExternalLink(
  show = false,
  anchorText = '',
  anchorLink = '',
  preferredTarget = NAV_TYPE_SUBMENU_EXTERNAL,
) {
  if (!show) {
    return null;
  }

  const target = (preferredTarget === NAV_TYPE_SUBMENU_EXTERNAL)
    ? '_self'
    : '_blank';

  return (
    <li key={uniqueId()}>
      <a className="item" href={anchorLink} target={target}>{anchorText}</a>
    </li>
  );
}

@connect(null, mapDispatchToProps)
class Submenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, link) {
    event.preventDefault();

    browserHistory.push(link);
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
                  return (
                    <UpcomingComponent
                      key={NAV_TYPE_UPCOMING_SHOWS_COMPONENT}
                      source={UPCOMING_EVENTS_URL}
                      refreshIntervalDelay={REFRESH_DELAY_SHOWS}
                    />
                  );
                }
                case NAV_TYPE_OBSERVATORY_MENU_COMPONENT: {
                  return (
                    <ListObservatories
                      key={NAV_TYPE_OBSERVATORY_MENU_COMPONENT}
                      source={OBSERVATORIES_URL}
                      refreshIntervalDelay={REFRESH_DELAY_TELESCOPES}
                    />
                  );
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
                  return generateExternalLink(
                    menuItem.showItem,
                    menuItem.menuItemText,
                    menuItem.itemLink,
                    NAV_TYPE_SUBMENU_EXTERNAL,
                  );
                }
                case NAV_TYPE_SUBMENU_EXTERNAL_NEW_TAB: {
                  return generateExternalLink(
                    menuItem.showItem,
                    menuItem.menuItemText,
                    menuItem.itemLink,
                    NAV_TYPE_SUBMENU_EXTERNAL_NEW_TAB,
                  );
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
