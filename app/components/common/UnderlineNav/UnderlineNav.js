import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import classnames from 'classnames';
import noop from 'lodash/noop';
import DropDown from 'app/components/common/DropDown';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import style from './UnderlineNav.style';

const { arrayOf, shape, string, bool } = PropTypes;

class UnderlineNav extends Component {
  static propTypes = {
    activeFilter: string,
    activeSort: string,
    navItems: arrayOf(
      shape({
        label: string,
        linkURL: string,
      })
    ),
    parentPath: string.isRequired,
    profile: bool,
  };

  static defaultProps = {
    activeFilter: null,
    activeSort: null,
    navItems: [],
    onItemClick: noop,
    profile: false,
  };

  state = {
    activeIndex: findIndex(
      this.props.navItems,
      navItem =>
        navItem.linkURL ===
        `/${this.props.parentPath}/${this.props.activeFilter}`
    ),
  };

  handleClick = (e, selected) => {
    if (e) e.preventDefault();

    const { navItems, activeSort } = this.props;

    this.setState(() => ({
      activeIndex: findIndex(
        navItems,
        navItem => navItem.linkURL === selected.value
      ),
    }));
    const path = `${selected.value}${activeSort ? `?sort=${activeSort}` : ''}`;
    browserHistory.push(path);
  };

  render() {
    const { activeFilter, navItems, activeSort, profile } = this.props;
    const { activeIndex } = this.state;
    const dropdownOptions = navItems.map(item => ({
      label: item.title,
      value: item.linkURL,
    }));

    return (
      <div className={classnames('root underlined-nav', { profile })}>
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <div className="nav">
            {navItems.map(item => {
              const path = `${item.linkURL}${
                activeSort ? `?sort=${activeSort}` : ''
              }`;
              const itemSplitPath = item.linkURL.split('/');
              return (
                <div
                  className={classnames('item-container', {
                    'is-active':
                      activeFilter === itemSplitPath[itemSplitPath.length - 1] ||
                      (!activeFilter && !itemSplitPath[itemSplitPath.length - 1]),
                  })}
                  key={`${item.linkURL}`}
                >
                  <Link to={path}>
                    <span
                      className="nav-item"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </DisplayAtBreakpoint>

        <DisplayAtBreakpoint screenSmall>
          <DropDown
            handleSelect={this.handleClick}
            selectedIndex={activeIndex}
            options={dropdownOptions}
          />
        </DisplayAtBreakpoint>

        <style jsx>{style}</style>
      </div>
    );
  }
}

export default UnderlineNav;
