import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import classnames from 'classnames';
import noop from 'lodash/noop';
import DropDown from 'components/common/DropDown';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import style from './UnderlineNav.style';

const {
  number,
  arrayOf,
  shape,
  string,
  func,
} = PropTypes;

class UnderlineNav extends Component {
  static propTypes = {
    activeFilter: string,
    navItems: arrayOf(shape({
      label: string,
      linkURL: string,
    })),
    parentPath: string.isRequired,
  };

  static defaultProps = {
    activeFilter: null,
    navItems: [],
    onItemClick: noop,

  };

  state = {
    activeIndex: findIndex(this.props.navItems, navItem => navItem.linkURL === `/${this.props.parentPath}/${this.props.activeFilter}`),
  }

  handleClick = (e, selected) => {
    if (e) e.preventDefault();

    const {
      navItems,
    } = this.props;

    this.setState(() => ({
      activeIndex: findIndex(navItems, navItem => navItem.linkURL === selected.value),
    }));
    browserHistory.push(selected.value);
  }

  render() {
    const {
      activeFilter,
      navItems,
    } = this.props;
    const { activeIndex } = this.state;
    const dropdownOptions = navItems.map(item => ({ label: item.title, value: item.linkURL }))
    return (
      <div className="root">
        <DisplayAtBreakpoint
          screenMedium
          screenLarge
          screenXLarge
        >
          {navItems.map((item) => (
            <div className={classnames('item-container', {
              'is-active': activeFilter === item.linkURL.split('/')[2] || (!activeFilter && !item.linkURL.split('/')[2]),
              })}
              key={`${item.linkURL}`}
            >
              <Link
                to={item.linkURL}
              >
              <span className="nav-item" dangerouslySetInnerHTML={{ __html: item.title }} />
              </Link>
            </div>
          ))}
        </DisplayAtBreakpoint>

        <DisplayAtBreakpoint
          screenSmall
        >
          <DropDown
            handleSelect={this.handleClick}
            selectedIndex={activeIndex}
            options={dropdownOptions}
          />
        </DisplayAtBreakpoint>

        <style jsx>{style}</style>
      </div>
    )
  }
}

export default UnderlineNav;
