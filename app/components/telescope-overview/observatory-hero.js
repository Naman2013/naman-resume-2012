import React, { Component, PropTypes } from 'react';
import { Link, Element } from 'react-scroll';
import style from './observatory-hero.scss';

import EarthView from './weather-widgets/earth-view';

// import some dummy data
import weatherWidgetResponse from './test-data/weather-widget-response';

class ObservatoryHero extends Component {

  fetchCurrentEarthView() {
    return {
      titleText: 'Where on Earth?',
      imageSource: 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_WesternAfrica.jpg'
    };
  }

  render() {
    return(
      <div className="observatory-hero">
        <h3 className="title">Canary Islands</h3>
        <ul className="summary-navigation clearfix">
          <li className="element">Weather</li>
          <li className="element">Lunar phase</li>
          <li className="element">Weather</li>
          <li className="element">Satalite view</li>
          <li className="element">
            <EarthView {...this.fetchCurrentEarthView()} />
          </li>
        </ul>
        <div className="description">
          <p>
            A UNESCO World Heritage Site, Tenerife has been named one of the world’s best locations for star-gazing and astronomy thanks to its low-light pollution and pristine night-sky conditions. Enjoy our telescopes situated next to Teide, a 12,198 foot volcanic summit.
          </p>
        </div>

        <div className="scroll-for-more">
          <Link
            to="scroll-more"
            spy={true}
            smooth={true}
            duration={500}
            className="button" href="#">
            Scroll for more<br />
            <span className="glyphicon glyphicon-menu-down"></span>
          </Link>
          <Element name="scroll-more" />
        </div>
      </div>
    );
  }
}

export default ObservatoryHero;
