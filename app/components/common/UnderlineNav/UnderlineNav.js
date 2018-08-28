import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import noop from 'lodash/noop';
import style from './UnderlineNav.style';

const {
  number,
  arrayOf,
  string,
  func,
} = PropTypes;

class UnderlineNav extends Component {
  static propTypes = {
    defaultIndex: number,
    navItems: arrayOf(string),
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

  handleClick = (idx) => {
    const { onItemClick } = this.props;

    this.setState({
      activeIndex: idx
    });

    onItemClick(idx);
  }

  render() {
    const {
      navItems,
    } = this.props;

    const { activeIndex } = this.state;

    return (
      <div className="root">
        {navItems.map((item, i) => (
          <a
            className={classnames({
              isActive: activeIndex === i,
            })}
            onClick={handleClick}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
        <style jsx>{style}</style>
      </div>
    )
  }
}

export default UnderlineNav;
