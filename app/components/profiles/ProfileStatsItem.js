/** *********************************
 * V4 Profile stats item
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../common/style/buttons/Button';
import styles from './ProfileStatsItem.styles';

const { bool, func, string } = PropTypes;

class ProfileStatsItem extends Component {
  static defaultProps = {};

  static propTypes = {
    label: string.isRequired,
    buttonText: string.isRequired,
    handleClick: func.isRequired,
    isActive: bool.isRequired,
  };

  state = {};

  render() {
    const {
      label, buttonText, handleClick, isActive,
    } = this.props;
    return (
      <div className="profile-stats">
        <div className="profile-stats-label">{label}</div>
        <Button
          isActive={isActive}
          handleClick={handleClick}
          theme={{ borderRadius: '50%' }}
          text={buttonText}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ProfileStatsItem;
