/***********************************
* V4 Dashboard for a signed in user with request information
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import TourPopup from './tour-popup/TourPopup';
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
  // 'recommendedQuests',
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
        <div className="dash-hero">
          <span className="vertical-helper"></span>
          <img alt="Welcome" className="hero-img" src="https://vega.slooh.com/assets/v4/dashboard/landing_fpo.png" />
        </div>
        {promoPanelShow ?
          promoArray.map(promoObject => <PromoPanel {...promoObject} key={uniqueId()} />) : null
        }
        <div className="dash-nav">
          <div className="dash-nav-item">
            <img alt="missions" src="https://vega.slooh.com/assets/v4/dashboard/icon_missions.svg" />
            <div>missions</div>
          </div>
          <div className="dash-nav-item">
            <img alt="guides" src="https://vega.slooh.com/assets/v4/dashboard/icon_guides.svg" />
            <div>guides</div>
          </div>
          <div className="dash-nav-item">
            <img alt="missions" src="https://vega.slooh.com/assets/v4/dashboard/icon_quests.svg" />
            <div>quests</div>
          </div>
          <div className="dash-nav-item">
            <img alt="missions" src="https://vega.slooh.com/assets/v4/dashboard/icon_shows.svg" />
            <div>shows</div>
            </div>
          <div className="dash-nav-item">
            <img alt="missions" src="https://vega.slooh.com/assets/v4/dashboard/icon_stories.svg" />
            <div>stories</div>
          </div>
          <div className="dash-nav-item">
            <img alt="missions" src="https://vega.slooh.com/assets/v4/dashboard/icon_groups.svg" />
            <div>groups</div>
          </div>
        </div>
        {sectionOrder.map((section, i) => (
          this.props[section] && getSectionComponent(section, Object.assign({ orderNumber: i + 1 }, this.props[section]))
        ))}

        <style jsx>{`
          .root {
            margin: 0;
            padding: 0;
            width: 100%;
          }
          .vertical-helper {
            display: inline-block;
            height: 100%;
            vertical-align: middle;        
          }
          .dash-hero {
            height: 625px;
            width: 100%;
            background-color: white;
            vertical-align: middle;
            text-align: center;
            transition: height ease-in-out 0.3s;
          }
          .dash-nav {
            position:absolute;
            top: 687px;
            background-color: rgba(0, 0, 0, 0.2);
            box-shadow: inset 0 40px 40px -7px rgba(0,0,0,0.3);
            height: 160px;
            width: 100%;
            font-weight: 400;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 1px;
            color: white;
            display: flex;
            justify-content: space-evenly;
            transition: height ease-in-out 0.3s;
          }
          .dash-nav-item {
            text-align: center;
            height: 100%;
            width: 17%;
          }
          .dash-nav-item + .dash-nav-item {
            border-left: solid 2px #171F29;
          }          
          .dash-nav-item img {
            height: 30px;
            margin: 50px 0 30px 0;
          }
          .dash-nav-item div:hover {
            font-weight: 600;
          }

          @media all and (min-width: 641px) and (max-width: 768px) {
            .dash-hero {
              height: 445px;
            }
            .dash-nav {
              top: 507px;
              display: flex;
              height: 115px;
              font-size: 9px;
            }
            .dash-nav-item img {
              height: 22px;
              margin: 30px 0 20px 0;
            }
          }
          @media all and (max-width: 640px){
            .dash-nav {
              display: none;
            }
          }
        `}
        </style>
      </div>
    );
  }
}

export default BootstrappedDashboard;
