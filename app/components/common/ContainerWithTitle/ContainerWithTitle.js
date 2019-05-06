/** *********************************
 * V4 Container with title
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UnderlineNav from '../UnderlineNav';
import styles from './ContainerWithTitle.styles';

const { string, shape, bool, arrayOf } = PropTypes;

export class ContainerWithTitle extends Component {
  static defaultProps = {
    theme: {},
    showNavigation: false,
    activeFilter: null,
    navItems: [],
    parentPath: null,
  };

  static propTypes = {
    title: string.isRequired,
    theme: shape({}),
    showNavigation: bool,
    activeFilter: string,
    navItems: arrayOf(
      shape({
        label: string,
        linkURL: string,
      })
    ),
    parentPath: string,
  };

  render() {
    const {
      title,
      theme,
      children,
      showNavigation,
      activeFilter,
      activeSort,
      navItems,
      parentPath,
    } = this.props;

    return (
      <div className="root">
        <h2 style={theme}>{title}</h2>
        <div className="navigation">
          {showNavigation && (
            <UnderlineNav
              activeFilter={activeFilter}
              activeSort={activeSort}
              navItems={navItems}
              parentPath={parentPath}
            />
          )}
        </div>
        {children}
        <style jsx>{styles}</style>
      </div>
    );
  }
}
