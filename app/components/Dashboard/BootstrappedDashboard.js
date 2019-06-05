/** *********************************
 * V4 Dashboard with request information
 *
 *
 *
 ********************************** */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import Request from '../../components/common/network/Request';
import ConnectUserAndResponseAccess from '../../redux/components/ConnectUserAndResponseAccess';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { getDashboardFeaturedObjects } from 'app/modules/dashboard/actions';
import { makeDashboardFeaturedObjectsSelector } from 'app/modules/dashboard/selectors';
import { reserveCommunityMission } from 'app/modules/telescope/thunks';
import { makeUserSelector } from 'app/modules/user/selectors';
import {
  makeQueueTabReservedCommunityMissionDataSelector,
  makeQueueTabReservedCommunityMissionSelector,
} from 'app/modules/telescope/selectors';
import BootstrappedTourPopup from './tour-popup/BootstrappedTourPopup';
import { DASHBOARD_TOUR_POPUP } from '../../services/dashboard';
import PromoPanel from 'app/components/home/promo-panel';
import { getSectionComponent } from './dashboardPanelItemsConfiguration';
import DashNav from './nav/DashboardNav';
import DashHero from './hero/DashboardHero';
import DashHeroMobile from './hero/DashboardHeroMobile';
import styles from './BootstrappedDashboard.style';
import messages from './BootstrappedDashboard.messages';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
// import { connect } from 'react-redux';

const { arrayOf, bool, number, shape, string } = PropTypes;

const sectionOrder = [
  'recommendedObjects',
  'featuredObservations',
  'recommendedGuides',
  'recommendedQuests',
  'recommendedShows',
  'recommendedStories',
  'popularGroups',
];

class BootstrappedDashboard extends Component {
  static propTypes = {
    featuredObservations: shape({
      featuredObservationsShow: bool,
      featuredObservationsHeading: string,
      featuredObservationsSubHeading: string,
    }),
    heading: string,
    hero: shape({
      heroShow: bool,
      heroHeading: string,
      heroSubHeading: string,
    }),
    popularGroups: shape({
      popularGroupsShow: bool,
      popularGroupsHeading: string,
      popularGroupsSubHeading: string,
    }),
    promoPanel: shape({
      promoArray: arrayOf(shape({})),
      promoPanelShow: bool,
      promoPanelCount: number,
    }),
    recommendedGuides: shape({
      recommendedGuidesShow: bool,
      recommendedGuidesHeading: string,
      recommendedGuidesSubHeading: string,
    }),
    recommendedObjects: shape({
      recommendedObjectsShow: bool,
      recommendedObjectsHeading: string,
      recommendedObjectsSubHeading: string,
    }),
    recommendedShows: shape({
      recommendedShowsShow: bool,
      recommendedShowsHeading: string,
      recommendedShowsSubHeading: string,
    }),
    recommendedStories: shape({
      recommendedStoriesShow: bool,
      recommendedStoriesHeading: string,
      recommendedStoriesSubHeading: string,
    }),
    recommendedQuests: shape({
      recommendedQuestsShow: bool,
      recommendedQuestsHeading: string,
      recommendedQuestsSubHeading: string,
    }),
    setupMission: shape({
      setupMissionShow: bool,
      setupMissionHeading: string,
      setupMissionSubHeading: string,
    }),
    subheading: string,
    userIsLoggedIn: bool,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    featuredObservations: {
      featuredObservationsShow: false,
      featuredObservationsHeading: '',
      featuredObservationsSubHeading: '',
    },
    heading: '',
    hero: {
      heroShow: false,
      heroHeading: '',
      heroSubHeading: '',
    },
    popularGroups: {
      popularGroupsShow: false,
      popularGroupsHeading: '',
      popularGroupsSubHeading: '',
    },
    promoPanel: {
      promoArray: [],
      promoPanelShow: false,
      promoPanelCount: 0,
    },
    recommendedObjects: {
      recommendedObjectsShow: false,
      recommendedObjectsHeading: '',
      recommendedObjectsSubHeading: '',
    },
    recommendedGuides: {
      recommendedGuidesShow: false,
      recommendedGuidesHeading: '',
      recommendedGuidesSubHeading: '',
    },
    recommendedQuests: {
      recommendedQuestsShow: false,
      recommendedQuestsHeading: '',
      recommendedQuestsSubHeading: '',
    },
    recommendedShows: {
      recommendedShowsShow: false,
      recommendedShowsHeading: '',
      recommendedShowsSubHeading: '',
    },
    recommendedStories: {
      recommendedStoriesShow: false,
      recommendedStoriesHeading: '',
      recommendedStoriesSubHeading: '',
    },
    setupMission: {
      setupMissionShow: false,
      setupMissionHeading: '',
      setupMissionSubHeading: '',
    },
    subheading: '',
    userIsLoggedIn: false,
  };

  state = {};

  render() {
    let {
      promoPanel: { promoArray, promoPanelShow },
      user,
      intl,
      recommendedObjects,
      reserveCommunityMission,
      reservedCommunityMission,
      reservedCommunityMissionData,
      getDashboardFeaturedObjects,
    } = this.props;

    recommendedObjects = { 
      ...recommendedObjects,
      reserveCommunityMission, 
      reservedCommunityMission,
      reservedCommunityMissionData,
      getDashboardFeaturedObjects,
    };

    return (
      <div className="root">
	  {user && user.cid && <Request
    		serviceURL={DASHBOARD_TOUR_POPUP}
    		method="POST"
    		render={({ serviceResponse }) => (
      			<div className="root">
        			{serviceResponse.hasPopupDataFlag && (
          			<ConnectUserAndResponseAccess
            				render={props => (
              					<BootstrappedTourPopup
                					{...user}
                          user={user}
                					{...serviceResponse.popupData}
                					validateResponseAccess={props.validateResponseAccess}
              					/>
            				)}
          			/>
        			)}
      			</div>
    		)}
	  
  	/>}

        <div className="dash-hero">
          {/*<div
            alt={intl.formatMessage(messages.welcome)}
            className="hero-img"
          />*/}
          <DisplayAtBreakpoint screenSmall>
            <DashHeroMobile />
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            <DashHero />
          </DisplayAtBreakpoint>
        </div>
        {promoPanelShow
          ? promoArray.map(promoObject => (
              <PromoPanel {...promoObject} key={uniqueId()} />
            ))
          : null}
        <div className="dash-nav">
          <DashNav />
        </div>
        <div className="sections-wrapper">
          {sectionOrder.map(
            (section, i) =>
              this.props[section] &&
              getSectionComponent(
                section,
                Object.assign({ orderNumber: i + 1 }, this.props[section], {
                  user,
                }, recommendedObjects)
              )
          )}
        </div>

        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  recommendedObjects: makeDashboardFeaturedObjectsSelector(),
  reservedCommunityMissionData: makeQueueTabReservedCommunityMissionDataSelector(),
  reservedCommunityMission: makeQueueTabReservedCommunityMissionSelector(),
  user: makeUserSelector(),
});

const mapDispatchToProps = {
  getDashboardFeaturedObjects,
  reserveCommunityMission,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(BootstrappedDashboard));
