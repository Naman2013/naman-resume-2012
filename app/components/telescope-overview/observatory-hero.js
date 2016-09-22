import React, { Component, PropTypes } from 'react';
import style from './observatory-hero.scss';

import CurrentWeather from './weather-widgets/current-weather';
import EarthView from './weather-widgets/earth-view';
import LunarPhase from './weather-widgets/lunar-phase';
import ScrollForMore from '../common/scroll-for-more';

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

  renderMoonPhase() {
    if(this.props.MoonPhaseWidgetId) {
      return(
        <li className="element">
          <LunarPhase {...this.props.moonPhaseWidgetResult} />
        </li>
      );
    }
  }

  render() {

    const backgroundStyles = {
      backgroundImage: `url(${this.props.obsHeroURL})`
    };

    return(
      <div
        style={backgroundStyles}
        className="observatory-hero">

        <h3 className="title">{this.props.obsName}</h3>

        <ul className="summary-navigation clearfix">
          <li className="element">
            <CurrentWeather />
          </li>

          {this.renderMoonPhase()}

          <li className="element">
            <EarthView {...this.fetchSatelliteEarthView()} />
          </li>
          <li className="element">
            <EarthView {...this.fetchCurrentEarthView()} />
          </li>
        </ul>

        <div className="description">
          <p>
            {this.props.obsDescription}
          </p>
        </div>

        <ScrollForMore />
      </div>
    );
  }
}

ObservatoryHero.propTypes = {
  obsName: PropTypes.string,
  obsHeroURL: PropTypes.string,
  obsDescription: PropTypes.string,
  MoonPhaseWidgetId: PropTypes.string,
  moonPhaseWidgetResult: PropTypes.object // TODO: break this validation down further
};

export default ObservatoryHero;
