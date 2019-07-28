/** *********************************
 * V4 Gravity Stats list
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import styles from './GravityStatsList.styles';

const { arrayOf, shape } = PropTypes;

class GravityStatsList extends Component {
  static propTypes = {
    gravityList: arrayOf(shape({})).isRequired,
  };

  state = {};

  render() {
    const { gravityList } = this.props;

    return (
      <div className="gravity-stats">
        <div className="gravity-stats-list" key={uniqueId()}>
          <div>{gravityList.favoriteObject}</div>
          <div>{gravityList.nextTier}</div>
          <div>{gravityList.rank}</div>
          <div>{gravityList.topObservation}</div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default GravityStatsList;
