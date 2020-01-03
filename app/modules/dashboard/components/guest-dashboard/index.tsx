import React, { Component } from 'react';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  IGuestDashboard,
  IDashboardFeaturedObjects,
  ISubscriptionPlans,
} from 'app/modules/dashboard/types';
import RecommendedObservations from 'app/components/common/RecommendedObservationsSlider';
import { ClubsList } from 'app/components/common/RecommendedGroupsSlider/clubs-list';
import { RecommendedObjects } from 'app/components/common/RecommendedObjectsSlider/RecommendedObjectsSlider';
import RecommendedQuestsList from 'app/components/common/RecommendedQuestsSlider';
import MembershipPlansList from 'app/pages/registration/MembershipPlansList';
import { TelescopesSlider } from 'app/components/telescopes-slider';
import { IObservatoryList } from 'app/modules/telescope/types';
import { ShowsSlider } from 'app/components/shows-slider';
import { MissionPhotosSlider } from 'app/components/mission-photos-slider';
import { IShowsListItem } from 'app/modules/shows/types';
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
  subscriptionPlansData: ISubscriptionPlans;
  getObservatoryList: Function;
  observatoryListData: IObservatoryList;
  getDashboardShows: Function;
  dashboardShowsList: Array<IShowsListItem>;
  MissionPhotosData: IGuestDashboard;
  setSliderWrapperClass: Function;
  customClass?: string;
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

  getObservatoryList = (): void => {
    const { getObservatoryList } = this.props;
    getObservatoryList({ callSource: 'guestDashboard', listType: 'full' });
  };

  getGuestDashboard = (): void => {
    const { getGuestDashboard, getDashboardFeaturedObjects } = this.props;
    getGuestDashboard().then(() => {
      this.getObservatoryList();
      getDashboardFeaturedObjects();
      this.getDashboardShows();
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

  getDashboardShows = (): void => {
    const {
      getDashboardShows,
      guestDashboard: {
        Sections: {
          Shows: {
            APIParams: { callSource },
          },
        },
      },
    } = this.props;

    getDashboardShows({
      upcomingShowsParams: `limit=50`,
      highlightedShowsParams: `callSource=${callSource}`,
    });
  };

  setSliderWrapperClass = (itemList: any): string => {
    return itemList.length < 3 ? 'centered-slider-wrapper' : '';
  };

  getSectionComponent = (section: string): any => {
    const {
      guestDashboard,
      recommendedObjects,
      subscriptionPlansData,
      observatoryListData,
      dashboardShowsList,
    } = this.props;
    const {
      CommunityObservations,
      RecommendedClubs,
      RecommendedQuests,
      TelescopePromos,
      MissionPhotosData,
    } = guestDashboard;
    const { subscriptionPlans } = subscriptionPlansData;
    const { observatoryList } = observatoryListData;
    const { imageList } = MissionPhotosData;

    switch (section) {
      case SECTION_TYPE.Telescopes: {
        return (
          <TelescopesSlider
            telescopesList={TelescopePromos}
            observatoryList={observatoryList}
          />
        );
      }
      case SECTION_TYPE.Missions: {
        return <RecommendedObjects {...recommendedObjects} readOnly />;
      }
      case SECTION_TYPE.MissionsPhotos: {
        return (
          <MissionPhotosSlider
            imageList={imageList}
            customClass={this.setSliderWrapperClass(RecommendedClubs)}
            readOnly
          />
        );
      }
      case SECTION_TYPE.Observations: {
        return (
          <RecommendedObservations imageList={CommunityObservations} readOnly />
        );
      }
      case SECTION_TYPE.Clubs: {
        return (
          <ClubsList
            clubsList={RecommendedClubs}
            customClass={this.setSliderWrapperClass(RecommendedClubs)}
            readOnly
          />
        );
      }
      case SECTION_TYPE.Shows: {
        return <ShowsSlider showsList={dashboardShowsList} readOnly />;
      }
      case SECTION_TYPE.Quests: {
        return (
          <RecommendedQuestsList
            recommendedQuestsList={RecommendedQuests}
            customClass={this.setSliderWrapperClass(RecommendedQuests)}
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
          <DashNav readOnly />
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
