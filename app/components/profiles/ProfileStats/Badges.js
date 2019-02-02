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
          <Link to={item.badgeDescriptionURL} key={uniqueId()}>
            <div className="badges-list-item">
              <img alt="" src={item.badgeURL} />
            </div>
          </Link>
        ))}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Badges;
