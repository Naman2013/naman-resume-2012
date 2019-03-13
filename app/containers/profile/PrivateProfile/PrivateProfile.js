/* ********************************
 * V4 Private profile container
 ********************************* */

import React, { Component, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubPageNavigation from '../../../components/common/sub-page-navigation';
import { fetchPrivateProfile } from '../../../modules/private-profile/actions';
import ProfileInformation from '../../../components/profiles/private-profile/ProfileInformation';

import styles from './PrivateProfile.styles';

class PrivateProfile extends Component {
  static propTypes = {
    privateProfileData: PropTypes.shape({}).isRequired,
    fetchPrivateProfile: PropTypes.func.isRequired,
    params: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    this.props.fetchPrivateProfile({});
  }

  generateNavItems = list => list.map(item => ({ title: item.name, link: item.linkUrl }));

  modelData = resp => ({
    myInformationData: {
      generalInfo: {
        avatarType: resp.avatarType,
        avatarURL: resp.avatarURL,
        displayName: resp.displayName,
        memberName: resp.memberName,
        memberSinceMDY: resp.memberSinceMDY,
        memberSinceText: resp.memberSinceText,
        membershipType: resp.membershipType,
        gravityRankLabel: resp.gravityRankLabel,
      },
      gravityData: {
        ...resp.gravityDetails,
        gravityHeading: resp.gravityHeading,
        gravityDetailsText: resp.gravityDetailsText,
        gravityGuideDetails: resp.gravityGuideDetails,
      },
      badgesData: {
        badgesCount: resp.badgesCount,
        badgesHeading: resp.badgesHeading,
        badgesList: resp.badgesList,
      },
      mvpData: {
        specialistObjectHeading: resp.specialistObjectHeading,
        specialistObjects: resp.specialistObjects,
        specialistObjectsCount: resp.specialistObjectsCount,
      },
    },
    profileMenuList: resp.profileMenuList,
    activityData: {
      missionsData: {
        missionCount: resp.missionCount,
        missionList: resp.missionList,
        missionListHeading: resp.missionListHeading,
      },
      recentMissionsData: {
        recentMissionCount: resp.recentMissionCount,
        recentMissionList: resp.recentMissionList,
      },
      askAnAstronomerData: resp.askAnAstronomerData,
    },
    groupsData: {
      groupsCount: resp.groupsCount,
      groupsList: resp.groupsList,
    },
  });

  render() {
    const { children, privateProfileData, params } = this.props;
    const { groupControls } = privateProfileData;
    const modelResult = this.modelData(privateProfileData);

    return (
      <div className="root">
        {modelResult.profileMenuList && (
          <Fragment>
            <ProfileInformation myInformationData={modelResult.myInformationData} />

            <SubPageNavigation items={this.generateNavItems(modelResult.profileMenuList)} />

            {cloneElement(children, {
              activityData: modelResult.activityData,
              groupsData: modelResult.groupsData,
              privateProfileData,
              params,
              groupControls,
              profileMenuList: modelResult.profileMenuList,
            })}
          </Fragment>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ privateProfile, user }) => ({
  privateProfileData: privateProfile.privateProfileData,
  user,
});

const mapDispatchToProps = { fetchPrivateProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateProfile);
