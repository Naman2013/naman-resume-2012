/** *********************************
 * V4 Gravity Breakdown list
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import styles from './GravityBreakdown.styles';

const { arrayOf, shape } = PropTypes;

class GravityBreakdown extends Component {
  static propTypes = {
    gravityList: arrayOf(shape({})).isRequired,
  };

  state = {};

  render() {
    const { gravityList } = this.props;

    return (
      <div className="gravity-breakdown">
        {gravityList.map(item => (
          <div className="gravity-breakdown-item" key={uniqueId()}>
            <div className="gravity-breakdown-item-label">{item.label}</div>
            <div className="gravity-breakdown-item-count">{item.count}</div>
          </div>
        ))}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default GravityBreakdown;
