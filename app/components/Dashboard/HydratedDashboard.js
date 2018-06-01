import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TourPopup from './tour-popup/TourPopup'
// import { connect } from 'react-redux';

const {
  shape,
  string,
  bool,
  number,
} = PropTypes;
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
    } = this.state;
    return (
      <div className="root">
      <TourPopup />
      {/* Hero */}
      {/* Navigation */}

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
