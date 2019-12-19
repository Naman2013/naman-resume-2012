import React, { Component } from 'react';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  IGuestDashboard,
  IDashboardFeaturedObjects,
} from 'app/modules/dashboard/types';
import RecommendedObservations from 'app/components/common/RecommendedObservationsSlider';
import { ClubsList } from 'app/components/common/RecommendedGroupsSlider/clubs-list';
import { RecommendedObjects } from 'app/components/common/RecommendedObjectsSlider/RecommendedObjectsSlider';
import RecommendedQuestsList from 'app/components/common/RecommendedQuestsSlider';
import MembershipPlansList from 'app/pages/registration/MembershipPlansList';
import DashNav from '../nav/DashboardNav';
import DashHero from '../hero/DashboardHero';
import DashHeroMobile from '../hero/DashboardHeroMobile';
import DashboardPanelItem from '../DashboardPanelItem';
import './styles.scss';

type TGuestDashboardProps = {
  guestDashboard: IGuestDashboard;
  recommendedObjects: IDashboardFeaturedObjects;
  getGuestDashboard: Function;
  getDashboardFeaturedObjects: Function;
  getSubscriptionPlans: Function;
  subscriptionPlansData: any;
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

export class GuestDashboard extends Component<TGuestDashboardProps> {
  componentDidMount(): void {
    this.getGuestDashboard();
  }

  getGuestDashboard = (): void => {
    const { getGuestDashboard, getDashboardFeaturedObjects } = this.props;
    getGuestDashboard().then(() => {
      getDashboardFeaturedObjects();
      this.getSubscriptionPlans();
    });
  };

  getSubscriptionPlans = (): void => {
    const {
      getSubscriptionPlans,
      guestDashboard: {
        Sections: {
          Plans: {
            APIParams: { callSource },
          },
        },
      },
    } = this.props;

    getSubscriptionPlans({
      callSource,
    });
  };

  getSectionComponent = (section: string): any => {
    const {
      guestDashboard,
      recommendedObjects,
      subscriptionPlansData,
    } = this.props;
    const {
      CommunityObservations,
      RecommendedClubs,
      RecommendedQuests,
    } = guestDashboard;
    const { subscriptionPlans } = subscriptionPlansData;

    switch (section) {
      case SECTION_TYPE.Telescopes: {
        return <div />;
      }
      case SECTION_TYPE.Missions: {
        return <RecommendedObjects {...recommendedObjects} readOnly />;
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
        return (
          <RecommendedQuestsList
            recommendedQuestsList={RecommendedQuests}
            readOnly
          />
        );
      }
      case SECTION_TYPE.Plans: {
        return <MembershipPlansList plans={subscriptionPlans} />;
      }
      default: {
        return <div />;
      }
    }
  };

  render() {
    const { guestDashboard } = this.props;
    const { Sections } = guestDashboard;

    return (
      <div className="dashboard-layout">
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
              !HideSection &&
              Index && (
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
