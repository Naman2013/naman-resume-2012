/***********************************
* V4 Dashboard for a signed in user with request information
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TourPopup from './tour-popup/TourPopup';
import PromoPanel from 'components/home/promo-panel';

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

const getSectionComponent = (section, props) => {
  const sectionComponents = {
    recommendedObjects: <div {...props} />,
    featuredObservations: <div {...props} />,
    recommendedGuides: <div {...props} />,
    recommendedQuests: <div {...props} />,
    recommendedShows: <div {...props} />,
    recommendedStories: <div {...props} />,
    popularGroups: <div {...props} />,
  };
  return sectionComponents[section];
};

class HydratedDashboard extends Component {

  static propTypes = {
    featuredObservations: shape({
      featuredObservationsShow: bool,
      featuredObservationsHeading: string,
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
    }),
    promoPanel: shape({
      promoArray: arrayOf(shape({})),
      promoPanelShow: bool,
      promoPanelCount: number,
    }),
    recommendedGuides: shape({
      recommendedGuidesShow: bool,
      recommendedGuidesHeading: string,
    }),
    recommendedObjects: shape({
      recommendedObjectsShow: bool,
      recommendedObjectsHeading: string,
    }),
    recommendedShows: shape({
      recommendedShowsShow: bool,
      recommendedShowsHeading: string,
    }),
    recommendedStories: shape({
      recommendedStoriesShow: bool,
      recommendedStoriesHeading: string,
    }),
    setupMission: shape({
      setupMissionShow: bool,
      setupMissionHeading: string,
    }),
    subheading: string,
    userIsLoggedIn: bool,
  };

  static defaultProps = {
    featuredObservations: {
      featuredObservationsShow: false,
      featuredObservationsHeading: '',
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
    },
    promoPanel: {
      promoArray: [],
      promoPanelShow: false,
      promoPanelCount: 0,
    },
    recommendedGuides: {
      recommendedGuidesShow: false,
      recommendedGuidesHeading: '',
    },
    recommendedObjects: {
      recommendedObjectsShow: false,
      recommendedObjectsHeading: '',
    },
    recommendedShows: {
      recommendedShowsShow: false,
      recommendedShowsHeading: '',
    },
    recommendedStories: {
      recommendedStoriesShow: false,
      recommendedStoriesHeading: '',
    },
    setupMission: {
      setupMissionShow: false,
      setupMissionHeading: '',
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
        {sectionOrder.map(section => (
          this.props[section] && getSectionComponent(section, this.props[section])
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
