/** *********************************
 * V4 Private Profile My Information block
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import DisplayAtBreakpoint from '../../common/DisplayAtBreakpoint';
import ProfileStatsItem from '../ProfileStatsItem';
import styles from './ProfileInformation.styles';
import messages from './ProfileInformation.messages';

const {
  arrayOf, bool, func, number, shape, string,
} = PropTypes;

class MyObservations extends Component {
  static defaultProps = {};

  static propTypes = {
    myInformationData: shape({
      generalInfo: shape({}).isRequired,
      gravityDetails: shape({}).isRequired,
      badgesDetails: shape({}).isRequired,
      mvpData: shape({}).isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
  };

  state = {};

  render() {
    const { intl, myInformationData } = this.props;
    const {
      generalInfo, gravityDetails, badgesDetails, mvpData,
    } = myInformationData;

    return (
      <div className="profile-header">
        <div className="profile-information">
          <div className="profile-avatar">
            <img src={generalInfo.avatarURL} alt="" />
            <div className="profile-user-name">
              <DisplayAtBreakpoint screenMedium>
                {generalInfo.memberName}
              </DisplayAtBreakpoint>
            </div>
          </div>

          <div className="profile-user-info-block">
            <div className="profile-user-name">
              <DisplayAtBreakpoint screenLarge screenXLarge>
                {generalInfo.memberName}
              </DisplayAtBreakpoint>
            </div>
            <div className="profile-user-info">
              <div className="profile-user-gravity-rank">{generalInfo.gravityRankLabel}</div>
              <div className="profile-user-member-since">{generalInfo.memberSinceText}</div>
            </div>
          </div>

          <div className="profile-user-statistics">
            <ProfileStatsItem
              label={intl.formatMessage(messages.Gravity)}
              buttonText={gravityDetails.totalGravity}
              handleClick={() => {}}
              isActive={false}
            />

            <ProfileStatsItem
              label={intl.formatMessage(messages.Badges)}
              buttonText={badgesDetails.badgesCount}
              handleClick={() => {}}
              isActive={false}
            />

            <ProfileStatsItem
              label={intl.formatMessage(messages.MVP)}
              buttonText={mvpData.specialistObjectsCount}
              handleClick={() => {}}
              isActive={false}
            />
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(MyObservations);
