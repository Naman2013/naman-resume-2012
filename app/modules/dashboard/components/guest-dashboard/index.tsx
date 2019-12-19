import React, { Component } from 'react';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
// eslint-disable-next-line
import Request from 'app/components/common/network/Request';
import ConnectUserAndResponseAccess from 'app/redux/components/ConnectUserAndResponseAccess';
import { DASHBOARD_TOUR_POPUP } from 'app/services/dashboard';
import { IGuestDashboard } from 'app/modules/dashboard/types';
import BootstrappedTourPopupForUser from '../tour-popup/BootstrappedTourPopupForUser';
import BootstrappedTourPopupForGuestJoin from '../tour-popup/BootstrappedTourPopupForGuestJoin';
import DashNav from '../nav/DashboardNav';
import DashHero from '../hero/DashboardHero';
import DashHeroMobile from '../hero/DashboardHeroMobile';
import './styles.scss';

type TGuestDashboardProps = {
  user: User;
  guestDashboard: IGuestDashboard;
};

type TGuestDashboardState = {
  guestPopupForceShow: boolean;
};

export class GuestDashboard extends Component<
  TGuestDashboardProps,
  TGuestDashboardState
> {
  state = {
    guestPopupForceShow: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        guestPopupForceShow: true,
      });
    }, 15000);
  }

  render() {
    const { user, guestDashboard } = this.props;
    const { Sections } = guestDashboard;
    console.log(Sections);
    const { guestPopupForceShow } = this.state;

    return (
      <div className="dashboard-layout">
        <Request
          serviceURL={DASHBOARD_TOUR_POPUP}
          method="POST"
          render={({ serviceResponse }: any) => (
            <div className="root">
              {serviceResponse.hasPopupDataFlag && (
                <ConnectUserAndResponseAccess
                  render={(props: any) => (
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

        {/* <div className="sections-wrapper">
          {sectionOrder.map(
            (section, i) =>
              this.props[section] &&
              getSectionComponent(
                section,
                Object.assign(
                  { orderNumber: i + 1 },
                  this.props[section],
                  {
                    user,
                  },
                  recommendedObjects
                )
              )
          )}
        </div> */}
      </div>
    );
  }
}
