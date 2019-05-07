/** *********************************
 * V4 Specialist list
 *
 ********************************** */
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import styles from './SpecialistList.styles';

const { arrayOf, shape } = PropTypes;

class SpecialistList extends Component {
  static propTypes = {
    specialistList: arrayOf(shape({})).isRequired,
  };

  state = {};

  render() {
    const { specialistList } = this.props;

    return (
      <div className="specialist-list">
        {specialistList.map(item => (
          <Link
            to={item.linkUrl}
            key={uniqueId()}
            className="specialist-list-item"
          >
            <div className="specialist-list-item-title">{item.title}</div>
            <div className="specialist-list-item-icon">
              <img alt={item.linkLabel} src={item.iconUrl} />
            </div>
          </Link>
        ))}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default SpecialistList;
