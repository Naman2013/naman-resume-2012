import { Spinner } from 'app/components/spinner/index';
import React, { cloneElement, Component, Fragment } from 'react';
import SubPageNavigation from 'app/components/common/sub-page-navigation';
import ProfileInformation from 'app/components/profiles/private-profile/ProfileInformation';

class ProfileWrapper extends Component {
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
    const { children, data, params, isLoading } = this.props;
    const modelResult = this.modelData(data);

    return (
      <div className="root">
        <Spinner loading={isLoading} />

        <Fragment>
          <ProfileInformation
            myInformationData={modelResult.myInformationData}
            profileData={data}
          />

          {modelResult.profileMenuList && (
            <SubPageNavigation
              items={this.generateNavItems(modelResult.profileMenuList)}
            />
          )}

          {cloneElement(children, {
            activityData: modelResult.activityData,
            groupsData: modelResult.groupsData,
            data,
            params,
          })}
        </Fragment>
      </div>
    );
  }
}

export default ProfileWrapper;
