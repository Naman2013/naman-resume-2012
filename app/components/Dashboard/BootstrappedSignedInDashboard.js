/***********************************
* V4 Dashboard for a signed in user with request information
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TourPopup from './tour-popup/TourPopup';
import DashboardPanelItem from './DashboardPanelItem';
import PromoPanel from 'components/home/promo-panel';
import {
  getSectionComponent,
} from './dashboardPanelItemsConfiguration';

// import { connect } from 'react-redux';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

const sectionOrder = [
  'recommendedObjects',
  'featuredObservations',
  'recommendedGuides',
  'recommendedQuests',
  'recommendedShows',
  'recommendedStories',
  'popularGroups',
];

class HydratedDashboard extends Component {

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
    setupMission: shape({
      setupMissionShow: bool,
      setupMissionHeading: string,
      setupMissionSubHeading: string,
    }),
    subheading: string,
    userIsLoggedIn: bool,
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
    recommendedGuides: {
      recommendedGuidesShow: false,
      recommendedGuidesHeading: '',
      recommendedGuidesSubHeading: '',
    },
    recommendedObjects: {
      recommendedObjectsShow: false,
      recommendedObjectsHeading: '',
      recommendedObjectsSubHeading: '',
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


  state = {
  };

  render() {
    const {
      promoPanel: { promoArray, promoPanelShow },
    } = this.props;
    const {
    } = this.state;
    return (
      <div className="root">
        <TourPopup />
        {/* Hero */}
        {promoPanelShow ?
          promoArray.map(promoObject => <PromoPanel {...promoObject} />) : null
        }
        {/* Navigation */}
        {sectionOrder.map((section, i) => (
          this.props[section] && getSectionComponent(section, Object.assign({ orderNumber: i + 1 }, this.props[section]))
        ))}

        <style jsx>{`
          .root {
            margin: 0;
            padding: 0;
            width: 100%;
          }
        `}
        </style>
      </div>
    );
  }
}

export default HydratedDashboard;
