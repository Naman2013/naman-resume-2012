import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { Experiment, Variant } from 'react-optimize';
import { projectGoogleOptimizeExpirianceId } from 'app/config/project-config';
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
import Popup from 'react-modal';
import { customModalStylesBlackHalfOverlay } from 'app/styles/mixins/utilities';
import DashboardOffer from 'app/components/dashboard-offer';
import { getUserInfo } from 'app/modules/User';

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
  params: {
    abTestCallSource: string;
  };
};

const SECTION_TYPE: { [key: string]: string } = {
  PlansTop: 'PlansTop',
  Telescopes: 'Telescopes',
  Missions: 'Missions',
  MissionsPhotos: 'MissionsPhotos',
  Observations: 'Observations',
  Clubs: 'Clubs',
  Shows: 'Shows',
  Quests: 'Quests',
  PlansBottom: 'PlansBottom',
};

const GET_PLANS_CALLSOURCES = {
  dashboard: 'dashboard',
  dashboardB: 'dashboard-b',
};

class GuestDashboard extends Component<TGuestDashboardProps> {

  state={
    showOfferPopup: true
  }

  componentDidMount(): void {
    this.getGuestDashboard();
    const { _showOffer } = getUserInfo();
    this.setState({showOfferPopup: !(_showOffer ? _showOffer : false)});
  }

  handleClosePopup = () => {

  }

  getObservatoryList = (): void => {
    const { getObservatoryList } = this.props;
    getObservatoryList({ callSource: 'guestDashboard', listType: 'full' });
  };

  getGuestDashboard = (): void => {
    const {
      getGuestDashboard,
      getDashboardFeaturedObjects,
      params,
    } = this.props;

    

    const { abTestCallSource } = params;
    getGuestDashboard(abTestCallSource).then(() => {
      this.getObservatoryList();
      getDashboardFeaturedObjects();
      this.getDashboardShows();
    });
  };

  getSubscriptionPlans = (callSource: string): void => {
    const { getSubscriptionPlans } = this.props;

    getSubscriptionPlans({ callSource });
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

    const { observatoryList } = observatoryListData;
    const { imageList } = MissionPhotosData;
    const { subscriptionPlans } = subscriptionPlansData;
    const { guestDashboardGoogleExperienceId } = projectGoogleOptimizeExpirianceId || {} 

	
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

      case SECTION_TYPE.PlansTop: {
	   return(
              <MembershipPlansList
                plans={subscriptionPlans}
                getSubscriptionPlans={() =>
                  this.getSubscriptionPlans(GET_PLANS_CALLSOURCES.dashboardB)
                }
                showSlider
              />
	    )
      }

      case SECTION_TYPE.PlansBottom: {
        return ( 
			<MembershipPlansList
				plans={subscriptionPlans}
				getSubscriptionPlans={() =>
					this.getSubscriptionPlans(GET_PLANS_CALLSOURCES.dashboardB)
				}
				showSlider
			/>
		)
      }

      default: {
        return <div />;
      }
    }
  };

  render() {
    const { guestDashboard } = this.props;
    const { Sections, enableDashboardOfferPopup, dashboardOfferPopupCallSource } = guestDashboard;
    const { guestDashboardGoogleExperienceId } = projectGoogleOptimizeExpirianceId || {};
    const { showOfferPopup } = this.state;   
    
    return (
      <div className="dashboard-layout">
        {guestDashboardGoogleExperienceId !== null && <Experiment id={guestDashboardGoogleExperienceId}>
		<Variant id="0">
		        <div className="dash-hero">
          			<DisplayAtBreakpoint screenSmall>
            				<DashHeroMobile />
          			</DisplayAtBreakpoint>
          			<DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            				<div>
              					<DashHero />
            				</div>
          			</DisplayAtBreakpoint>

        			<div className="dash-nav">
          				<DashNav readOnly/>
        			</div>
        		</div>
		</Variant>
		<Variant id="1">
          			<DisplayAtBreakpoint screenSmall>
				        <div className="dash-hero">
            					<DashHeroMobile />
					</div>
          			</DisplayAtBreakpoint>

        			<div className="dash-nav">
          				<DashNav/>
        			</div>
		</Variant>
	</Experiment>
	}

	{guestDashboardGoogleExperienceId == null && <div className="dash-hero">
          	<DisplayAtBreakpoint screenSmall>
            		<DashHeroMobile />
         	</DisplayAtBreakpoint>
          	<DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
       			<div>
              			<DashHero />
            		</div>
          	</DisplayAtBreakpoint>

        	<div className="dash-nav">
          		<DashNav readOnly/>
        	</div>
	</div>
	}

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
			));
		})}              
		</div>

      {enableDashboardOfferPopup && showOfferPopup &&(
         <Popup
         // ariaHideApp={false}
         isOpen={true}
         style={customModalStylesBlackHalfOverlay}
         contentLabel="Error"
         shouldCloseOnOverlayClick={false}
         onRequestClose={this.handleClosePopup}
         >
          <DashboardOffer   
              onClose={()=>this.setState({showOfferPopup: false})}          
              callSource={dashboardOfferPopupCallSource}             	
          />
         </Popup>
      )}

      </div>
    );
  }
}

export default withRouter(GuestDashboard);
