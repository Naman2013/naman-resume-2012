import React, { Component } from 'react';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
// eslint-disable-next-line
import Request from 'app/components/common/network/Request';
import ConnectUserAndResponseAccess from 'app/redux/components/ConnectUserAndResponseAccess';
import { DASHBOARD_TOUR_POPUP } from 'app/services/dashboard';
import { IGuestDashboard } from 'app/modules/dashboard/types';
import RecommendedObservations from 'app/components/common/RecommendedObservationsSlider';
import { ClubsList } from 'app/components/common/RecommendedGroupsSlider/clubs-list';
import BootstrappedTourPopupForUser from '../tour-popup/BootstrappedTourPopupForUser';
import BootstrappedTourPopupForGuestJoin from '../tour-popup/BootstrappedTourPopupForGuestJoin';
import DashNav from '../nav/DashboardNav';
import DashHero from '../hero/DashboardHero';
import DashHeroMobile from '../hero/DashboardHeroMobile';
import DashboardPanelItem from '../DashboardPanelItem';
import './styles.scss';

type TGuestDashboardProps = {
  user: User;
  guestDashboard: IGuestDashboard;
};

type TGuestDashboardState = {
  guestPopupForceShow: boolean;
};

const SECTION_TYPE: { [key: string]: string } = {
  Telescopes: 'Telescopes',
  Missions: 'Missions',
  MissionsPhotos: 'MissionsPhotos',
  Observations: 'Observations',
  Clubs: 'Clubs',
  Shows: 'Shows',
  Quests: 'Quests',
  Plans: 'Plans',
};

export class GuestDashboard extends Component<
  TGuestDashboardProps,
  TGuestDashboardState
> {
  state = {
    guestPopupForceShow: false,
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        guestPopupForceShow: true,
      });
    }, 15000);
  }

  getSectionComponent = (section: string): any => {
    const { guestDashboard } = this.props;
    const { CommunityObservations, RecommendedClubs } = guestDashboard;

    switch (section) {
      case SECTION_TYPE.Telescopes: {
        return <div />;
      }
      case SECTION_TYPE.Missions: {
        return <div />;
      }
      case SECTION_TYPE.MissionsPhotos: {
        return <div />;
      }
      case SECTION_TYPE.Observations: {
        return (
          <RecommendedObservations imageList={CommunityObservations} readOnly />
        );
      }
      case SECTION_TYPE.Clubs: {
        return <ClubsList clubsList={RecommendedClubs} readOnly />;
      }
      case SECTION_TYPE.Shows: {
        return <div />;
      }
      case SECTION_TYPE.Quests: {
        return <div />;
      }
      case SECTION_TYPE.Plans: {
        return <div />;
      }
      default: {
        return <div />;
      }
    }
  };

  render() {
    const { user, guestDashboard } = this.props;
    const { Sections } = guestDashboard;
    const { guestPopupForceShow } = this.state;

    return (
      <div className="dashboard-layout">
        {/* #TODO remove request */}
        <Request
          serviceURL={DASHBOARD_TOUR_POPUP}
          method="POST"
          render={({ serviceResponse }: any): any => (
            <div className="root">
              {serviceResponse.hasPopupDataFlag && (
                <ConnectUserAndResponseAccess
                  render={(props: any): any => (
                    <>
                      {serviceResponse.displayType === 'user' && (
                        <BootstrappedTourPopupForUser
                          {...user}
                          user={user}
                          {...serviceResponse.popupData}
                          validateResponseAccess={props.validateResponseAccess}
                        />
                      )}
                      {serviceResponse.displayType === 'guest-join' &&
                        guestPopupForceShow && (
                          <BootstrappedTourPopupForGuestJoin
                            id="dashboardGuestModal"
                            {...serviceResponse.popupData}
                            validateResponseAccess={
                              props.validateResponseAccess
                            }
                          />
                        )}
                    </>
                  )}
                />
              )}
            </div>
          )}
        />
        <div className="dash-hero">
          <DisplayAtBreakpoint screenSmall>
            <DashHeroMobile />
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            <div>
              <DashHero />
            </div>
          </DisplayAtBreakpoint>
        </div>

        <div className="dash-nav">
          <DashNav />
        </div>

        <div className="sections-wrapper">
          {Object.keys(Sections).map((section: string) => {
            const { Index, Title, SubTitle, HideSection } = Sections[section];

            return (
              !HideSection && (
                <DashboardPanelItem
                  key={`dashboard-section-0${Index}`}
                  orderNumber={`0${Index}`}
                  title={Title}
                  subtitle={SubTitle}
                  render={(): void => this.getSectionComponent(section)}
                />
              )
            );
          })}
        </div>
      </div>
    );
  }
}
