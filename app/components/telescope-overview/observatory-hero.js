import React, { Component, PropTypes } from 'react';
import style from './observatory-hero.scss';

import CurrentWeather from './weather-widgets/current-weather';
import EarthView from './weather-widgets/earth-view';
import LunarPhase from './weather-widgets/lunar-phase';
import ScrollForMore from '../common/scroll-for-more';

class ObservatoryHero extends Component {

  renderMoonPhase() {
    if(this.props.MoonPhaseWidgetId) {
      return(
        <li className="element">
          <LunarPhase
            {...this.props.moonPhaseWidgetResult} />
        </li>
      );
    }
  }

  renderSatelliteView() {
    if(this.props.satelliteViewWidgetResult) {
      return (
        <li className="element">
          <EarthView
            title={this.props.satelliteViewWidgetResult.title}
            imageSource={this.props.satelliteViewWidgetResult.satelliteImageURL} />
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
          {this.renderMoonPhase()}
          {this.renderSatelliteView()}
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
  moonPhaseWidgetResult: PropTypes.object, // TODO: break this validation down further
  satelliteViewWidgetResult: PropTypes.object // TODO: break this validation down further
};

export default ObservatoryHero;
