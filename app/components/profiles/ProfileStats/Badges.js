/** *********************************
 * V4 Badges list
 *
 ********************************** */
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import styles from './Badges.styles';

const { arrayOf, shape } = PropTypes;

class Badges extends Component {
  static propTypes = {
    badgesList: arrayOf(shape({})).isRequired,
  };

  state = {};

  render() {
    const { badgesList } = this.props;

    return (
      <div className="badges-list">
        {badgesList.map(item => (
          <div className="badges-list-item-div">
            <div className="blue-shield-badge" />
            <div className="badges-list-item-img-span"><img className="badges-list-item-img" alt={item.badgeAwardedDate} title={item.badgeAwardedDate} src={item.badgeIconURL} /></div>
            <div className="badges-list-item-description">{item.badgeTitle}</div>
          </div>
        ))}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Badges;
