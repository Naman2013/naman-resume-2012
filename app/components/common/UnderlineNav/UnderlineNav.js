import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import classnames from 'classnames';
import noop from 'lodash/noop';
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
      name: string,
      filter: string,
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

  handleClick = (e, item) => {
    e.preventDefault();
    const {
      onItemClick,
      navItems,
    } = this.props;

    this.setState({
      activeIndex: findIndex(navItems, navItem => navItem.filter === item.filter),
    });

    onItemClick(item.filter);
  }

  render() {
    const {
      navItems,
    } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="root">
        {navItems.map((item, i) => (
          <div className={classnames('item-container', {
            'is-active': activeIndex === i,
            })}
          >
            <a
              key={`${item.name}+${i}`}
              className="nav-item"
              onClick={(e) => this.handleClick(e, item)}
              dangerouslySetInnerHTML={{ __html: item.name }}
            />
          </div>
        ))}
        <style jsx>{style}</style>
      </div>
    )
  }
}

export default UnderlineNav;
