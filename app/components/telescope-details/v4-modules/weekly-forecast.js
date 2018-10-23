import React from 'react';
import { ModuleContainer } from './module-container';
import Triangle from 'atoms/icons/Triangle';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import style from './weekly-forecast.style';

const WeeklyForecast = () => (
  <ModuleContainer title="Weekly forecast">
    <div className="carousel-container">

      <ul className="week-carousel">
        <li className="day-forecast">
          <h5 className="forecast-name">Sun</h5>
          <div className="forecast-coin">
            <img alt="" width="24" src="https://vega.slooh.com/assets/v4/icons/search_astronaut.svg" />
          </div>
          <Triangle theme={{ color: astronaut }} />
        </li>
        <li className="day-forecast">
          <h5 className="forecast-name">Sun</h5>
          <div className="forecast-coin">
            <img alt="" width="24" src="https://vega.slooh.com/assets/v4/icons/search_astronaut.svg" />
          </div>
        </li>
        <li className="day-forecast">
          <h5 className="forecast-name">Sun</h5>
          <div className="forecast-coin">
            <img alt="" width="24" src="https://vega.slooh.com/assets/v4/icons/search_astronaut.svg" />
          </div>
        </li>
      </ul>

      <div className="actions-list">
        <button className="forecast-action">&#60;</button>
        <button className="forecast-action">&#62;</button>
      </div>

    </div>

    <div className="active-weather-condition-summary">
      <h4 className="active-weather-title">Sunday, Jan 06, 2018</h4>
      <ul className="weather-stats">
        <li className="weather-stat">Precipitation: 80%</li>
        <li className="weather-stat">Humidity: 62%</li>
        <li className="weather-stat">Wind: 17mph</li>
      </ul>
    </div>

    <div className="condition-summary">
      <h4 className="condition-title">Level 3</h4>
      <p className="condition-summary">Almost continuous distortion with occasional brief good moments.</p>
    </div>
    <style jsx>{style}</style>
  </ModuleContainer>
);

export { WeeklyForecast };
