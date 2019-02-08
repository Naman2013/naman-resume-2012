import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './InfoTile.styles';

const { string } = PropTypes;

class InfoTile extends Component {
  static propTypes = {
    subject: string.isRequired,
    title: string.isRequired,
    x: string.isRequired,
  };

  render() {
    const { subject, title, text } = this.props;

    return (
      <div className="info-tile-root">
        <div className="subject">{subject}</div>
        <div className="title">{title}</div>
        <div className="text">{text}</div>

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export { InfoTile };
