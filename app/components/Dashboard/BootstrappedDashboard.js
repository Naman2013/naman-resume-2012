/** *********************************
 * V4 Dashboard with request information
 *
 *
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import TourPopup from './tour-popup/TourPopup';
import PromoPanel from 'components/home/promo-panel';
import { getSectionComponent } from './dashboardPanelItemsConfiguration';
import DashNav from './nav/DashboardNav';
import styles from './BootstrappedDashboard.style';
import messages from './BootstrappedDashboard.messages';
// import { connect } from 'react-redux';

const {
  arrayOf, bool, number, shape, string,
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
    const {
      promoPanel: { promoArray, promoPanelShow },
      user,
      intl,
    } = this.props;

    return (
      <div className="root">
        <TourPopup user={user} />
        <div className="dash-hero">
          <div alt={intl.formatMessage(messages.welcome)} className="hero-img" />
        </div>
        {promoPanelShow
          ? promoArray.map(promoObject => <PromoPanel {...promoObject} key={uniqueId()} />)
          : null}
        <div className="dash-nav">
          <DashNav />
        </div>

        {sectionOrder.map((section, i) =>
            this.props[section] &&
            getSectionComponent(
              section,
              Object.assign({ orderNumber: i + 1 }, this.props[section]),
            ))}

        <style>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(BootstrappedDashboard);
