/** *********************************
 * V4 Profile stats item
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../common/style/buttons/Button';
import styles from './ProfileStatsItem.styles';

const {
  bool, func, string, number,
} = PropTypes;

class ProfileStatsItem extends Component {
  static propTypes = {
    label: string.isRequired,
    buttonText: PropTypes.oneOfType([string, number]).isRequired,
    onClickEvent: func.isRequired,
    isActive: bool.isRequired,
    type: string.isRequired,
  };

  renderIcon = () => <div className="profile-stats-icon fa fa-close" />;

  render() {
    const {
      label, buttonText, onClickEvent, isActive, type,
    } = this.props;
    return (
      <div className={`profile-stats${isActive ? ' active' : ''}`}>
        <div className="profile-stats-label">{label}</div>
        <Button
          isActive={isActive}
          onClickEvent={() => onClickEvent(type)}
          theme={{ borderRadius: '50%' }}
          text={!isActive && buttonText}
          renderIcon={isActive && this.renderIcon}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ProfileStatsItem;
