import React, { Component, PropTypes } from 'react';
import style from './observatory-hero.scss';

import CurrentWeather from './weather-widgets/current-weather';
import EarthView from './weather-widgets/earth-view';
import LunarPhase from './weather-widgets/lunar-phase';
import ScrollForMore from '../common/scroll-for-more';

// import some dummy data
import moonPhase from './test-data/moon-phase';

class ObservatoryHero extends Component {

  fetchCurrentEarthView() {
    return {
      titleText: 'Where on Earth?',
      imageSource: 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_WesternAfrica.jpg'
    };
  }

  fetchSatelliteEarthView() {
    return {
      titleText: 'Satellite view',
      imageSource: 'http:\/\/sirocco.accuweather.com\/sat_mosaic_640x480_public\/IR\/iscsam.jpg'
    };
  }

  fetchLunarPhase() {
    return moonPhase;
  }

  render() {
    return(
      <div className="observatory-hero">
        <h3 className="title">Canary Islands</h3>
        <ul className="summary-navigation clearfix">
          <li className="element">
            <CurrentWeather />
          </li>
          <li className="element">
            <LunarPhase {...this.fetchLunarPhase()} />
          </li>
          <li className="element">
            <EarthView {...this.fetchSatelliteEarthView()} />
          </li>
          <li className="element">
            <EarthView {...this.fetchCurrentEarthView()} />
          </li>
        </ul>
        <div className="description">
          <p>
            A UNESCO World Heritage Site, Tenerife has been named one of the world’s
            best locations for star-gazing and astronomy thanks to its low-light
            pollution and pristine night-sky conditions. Enjoy our telescopes
            situated next to Teide, a 12,198 foot volcanic summit.
          </p>
        </div>

        <ScrollForMore />
      </div>
    );
  }
}

export default ObservatoryHero;
