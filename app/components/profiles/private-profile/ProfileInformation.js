/** *********************************
 * V4 Private Profile My Information block
 *
 ********************************** */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Modal from 'react-modal';

import { DeviceContext } from '../../../providers/DeviceProvider';
import { modalStyleFullPage } from '../../../styles/mixins/utilities';
import DisplayAtBreakpoint from '../../common/DisplayAtBreakpoint';
import BackBar from '../../common/style/buttons/BackBar';
import { ProfileStatsItem, StatsPopover, GravityBreakdown, StatsDetails, Badges, SpecialistList } from '../ProfileStats';
import styles from './ProfileInformation.styles';
import messages from './ProfileInformation.messages';

const {
  arrayOf, bool, func, number, shape, string,
} = PropTypes;

const PROFILE_STATS = {
  gravity: 'gravity',
  badges: 'badges',
  mvp: 'mvp',
};

class ProfileInformation extends Component {
  static defaultProps = {};

  static propTypes = {
    myInformationData: shape({
      generalInfo: shape({}).isRequired,
      gravityData: shape({}).isRequired,
      badgesData: shape({}).isRequired,
      mvpData: shape({}).isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    selectedStats: null,
  };

  getGravityTabs = () => {
    const { gravityData } = this.props.myInformationData;
    return {
      tabsList: ['Breakdown', 'Details'],
      panels: [
        <GravityBreakdown gravityList={gravityData.gravityList} />,
        <StatsDetails
          text={gravityData.gravityDetailsText}
          buttonLinkUrl={gravityData.gravityGuideDetails.buttonLinkUrl}
          buttonText={gravityData.gravityGuideDetails.buttonText}
        />,
      ],
    };
  }

  getBadgesTabs = () => {
    const { badgesData } = this.props.myInformationData;
    return {
      tabsList: ['My Budges', 'Details'],
      panels: [
        <Badges badgesList={badgesData.badgesList} />,
        null,
      ],
    };
  }

  getMvpTabs = () => {
    const { mvpData } = this.props.myInformationData;
    return {
      tabsList: ['Specialties', 'Details'],
      panels: [
        <SpecialistList specialistList={mvpData.specialistObjects} />,
        null,
      ],
    };
  }

  toggleStatsPopover = (selectedStats) => {
    this.setState({ selectedStats: this.state.selectedStats === selectedStats ? null : selectedStats });
  };

  render() {
    const { intl, myInformationData } = this.props;
    const {
      generalInfo, gravityData, badgesData, mvpData,
    } = myInformationData;
    const { selectedStats } = this.state;

    const profileStatsItems = (
      <Fragment>
        <ProfileStatsItem
          type={PROFILE_STATS.gravity}
          label={intl.formatMessage(messages.Gravity)}
          buttonText={gravityData.totalGravity}
          onClickEvent={this.toggleStatsPopover}
          isActive={selectedStats === PROFILE_STATS.gravity}
        />

        <ProfileStatsItem
          type={PROFILE_STATS.badges}
          label={intl.formatMessage(messages.Badges)}
          buttonText={badgesData.badgesCount}
          onClickEvent={this.toggleStatsPopover}
          isActive={selectedStats === PROFILE_STATS.badges}
        />

        <ProfileStatsItem
          type={PROFILE_STATS.mvp}
          label={intl.formatMessage(messages.MVP)}
          buttonText={mvpData.specialistObjectsCount}
          onClickEvent={this.toggleStatsPopover}
          isActive={selectedStats === PROFILE_STATS.mvp}
        />
      </Fragment>
    );

    const statsPopovers = (
      <Fragment>
        <StatsPopover
          show={selectedStats === PROFILE_STATS.gravity}
          title={gravityData.gravityHeading}
          total={gravityData.totalGravity}
          selectedStats={selectedStats}
          tabs={this.getGravityTabs()}
        />
        <StatsPopover
          show={selectedStats === PROFILE_STATS.badges}
          title={badgesData.badgesHeading}
          total={badgesData.badgesCount}
          selectedStats={selectedStats}
          tabs={this.getBadgesTabs()}
        />
        <StatsPopover
          show={selectedStats === PROFILE_STATS.mvp}
          title={mvpData.specialistObjectHeading}
          total={mvpData.specialistObjectsCount}
          selectedStats={selectedStats}
          tabs={this.getMvpTabs()}
        />
      </Fragment>
    );

    return (
      <div className="profile-header">
        <div className="profile-information">
          <div className="profile-avatar">
            <img src={generalInfo.avatarURL} alt="" />
            <div className="profile-user-name">
              <DisplayAtBreakpoint screenMedium>{generalInfo.memberName}</DisplayAtBreakpoint>
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

          <div className="profile-user-statistics" ref={(ref) => { this.statsContainer = ref; }} >
            {profileStatsItems}
            <StatsPopover
              show={selectedStats === PROFILE_STATS.gravity}
              title={gravityData.gravityHeading}
              total={gravityData.totalGravity}
              selectedStats={selectedStats}
              tabs={this.getGravityTabs()}
            />
            <StatsPopover
              show={selectedStats === PROFILE_STATS.badges}
              title={badgesData.badgesHeading}
              total={badgesData.badgesCount}
              selectedStats={selectedStats}
              tabs={this.getBadgesTabs()}
            />
            <StatsPopover
              show={selectedStats === PROFILE_STATS.mvp}
              title={mvpData.specialistObjectHeading}
              total={mvpData.specialistObjectsCount}
              selectedStats={selectedStats}
              tabs={this.getMvpTabs()}
            />
          </div>
        </div>

        <DeviceContext.Consumer>
          {context => (
            <div className="profile-information-mobile">
              <div className="avatar-border">
                <img src={generalInfo.avatarURL} alt="" className="avatar-inner-ring" />
              </div>

              <div className="vertical-line" style={{ height: '40px' }} />
              <div className="horizontal-line" />

              <ul className="user-info-list">
                <li className="user-info-list-item profile-user-name ">{generalInfo.memberName}</li>
                <li className="user-info-list-item">{generalInfo.gravityRankLabel}</li>
                <li className="user-info-list-item">{generalInfo.memberSinceText}</li>
              </ul>

              <div className="profile-user-statistics">
                {profileStatsItems}
              </div>

              {context.isMobile && (
                <Modal
                  ariaHideApp={false}
                  isOpen={selectedStats}
                  style={modalStyleFullPage}
                  contentLabel="Stats item"
                  className="profile-information-modal stats-modal"
                >
                  <BackBar onClickEvent={() => this.toggleStatsPopover(null)} />
                  {statsPopovers}
                </Modal>
              )}
            </div>
          )}
        </DeviceContext.Consumer>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(ProfileInformation);
