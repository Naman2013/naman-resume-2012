import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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
    defaultIndex: number,
    navItems: arrayOf(shape({
      label: string,
      value: string,
    })),
    onItemClick: func,
  };

  static defaultProps = {
    defaultIndex: 0,
    navItems: [],
    onItemClick: noop,

  };

  state = {
    activeIndex: this.props.defaultIndex,
  }

  handleClick = (e, value) => {
    if (e) e.preventDefault();

    const {
      onItemClick,
      navItems,
    } = this.props;

    this.setState(() => ({
      activeIndex: findIndex(navItems, navItem => navItem.value === value),
    }));

    onItemClick(value);
  }

  render() {
    const {
      navItems,
    } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="root">
        <DisplayAtBreakpoint
          screenMedium
          screenLarge
          screenXLarge
        >
          {navItems.map((item, i) => (
            <div className={classnames('item-container', {
              'is-active': activeIndex === i,
              })}
              key={`${item.label}+${i}`}
            >
              <a
                className="nav-item"
                onClick={(e) => this.handleClick(e, item)}
                dangerouslySetInnerHTML={{ __html: item.label }}
              />
            </div>
          ))}
        </DisplayAtBreakpoint>

        <DisplayAtBreakpoint
          screenSmall
        >
          <DropDown
            handleSelect={this.handleClick}
            selectedIndex={activeIndex}
            options={navItems}
          />
        </DisplayAtBreakpoint>

        <style jsx>{style}</style>
      </div>
    )
  }
}

export default UnderlineNav;
