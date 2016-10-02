import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './weather-conditions.scss';

import Progress from 'react-progressbar';

class WeatherConditions extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return(
      <div className="telescope-block weather-conditions">
        <div className="top">
          <h3>Advanced Weather and Conditions</h3>
          <p>The stats, forecasts, and live local views of the Canary Islands location on Tenerife.</p>
        </div>
        <div className="content-wrapper">
          <div className="weather-conditions-controls">
            <button>Conditions</button>
            <button>Dust</button>
            <button>Satellite Cloud</button>
            <button className="active">Wind</button>
            <button>Sky Brightness</button>
            <button>Historic Weather</button>
          </div>
          <div className="weather-conditions-feed">
            <img src="/assets/images/icons/icon-white-screen-view.png" className="screen-view" />
            <img src={'/assets/images/graphics/weather-placeholder.jpg'} />
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherConditions;
