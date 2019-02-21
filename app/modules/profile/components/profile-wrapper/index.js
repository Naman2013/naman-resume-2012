// todo refactor me
import SubPageNavigation from 'app/components/common/sub-page-navigation';
import ProfileInformation from 'app/components/profiles/private-profile/ProfileInformation';
import PropTypes from 'prop-types';
import React, { cloneElement, Component, Fragment } from 'react';

export class ProfileWrapper extends Component {
  static propTypes = {
    privateProfileData: PropTypes.shape({}).isRequired,
    params: PropTypes.shape({}).isRequired,
  };

  generateNavItems = list =>
    list.map(item => ({ title: item.name, link: item.linkUrl }));

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
    const modelResult = this.modelData(privateProfileData);

    return (
      <div className="root">
        <Fragment>
          <ProfileInformation

            myInformationData={modelResult.myInformationData}
          />

          {modelResult.profileMenuList && (
            <SubPageNavigation
              items={this.generateNavItems(modelResult.profileMenuList)}
            />
          )}

          {cloneElement(children, {
            activityData: modelResult.activityData,
            groupsData: modelResult.groupsData,
            privateProfileData,
            params,
          })}
        </Fragment>
      </div>
    );
  }
}
