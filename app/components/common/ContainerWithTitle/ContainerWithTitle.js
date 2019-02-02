/** *********************************
 * V4 Container with title
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ContainerWithTitle.styles';
// import messages from './ProfileInformation.messages';

const { string } = PropTypes;

export class ContainerWithTitle extends Component {
  static defaultProps = {
    theme: {},
  };

  static propTypes = {
    title: string.isRequired,
  };

  render() {
    const { title, theme, children } = this.props;

    return (
      <div className="root">
        <h2 style={theme}>{title}</h2>
        {children}
        <style jsx>{styles}</style>
      </div>
    );
  }
}
