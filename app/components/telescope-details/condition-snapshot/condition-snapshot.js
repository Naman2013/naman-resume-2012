import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './condition-snapshot.scss';


class TelescopeConditionSnapshot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      toggle: false
    };
  };

  render() {
    return(
      <div className="condition-snapshot telescope-details-widget">
        <div className="top">
          <div className="row">
          <div className="col-xs-12 ">
            <h3>Current Condition Snapshot</h3>
            <p>Our LIVE AllSky cam and the highlights</p>
          </div>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="col-xs-3">
                <img src={'/assets/images/graphics/morecloudy_moon.png'} />
                <p>NOW</p>
                <p>Partly Cloudy</p>
              </div>
              <div className="col-xs-3">
                <img src={'/assets/images/graphics/full_moon.png'} />
                <p>Lunar Phase</p>
                <p>Full</p>
              </div>
              <div className="col-xs-3">
                <img src={'/assets/images/graphics/sunset.png'} />
                <p>Sunset</p>
                <p>18:44 UTC</p>
              </div>
              <div className="col-xs-3">
                <img src={'/assets/images/graphics/sunrise.png'} />
                <p>Sunrise</p>
                <p>18:44 UTC</p>
              </div>
            </div>
            <div className="col-xs-12">
              <img src={'/assets/images/graphics/day-night-timeline.png'} />
            </div>
            <div className="col-xs-12">
              <img src={'/assets/images/graphics/sunmap.png'} />
            </div>
            <div className="col-xs-12 video">
              <img src={'/assets/images/graphics/graphic-slooh-observatory.png'} className="item" />
              <img src={'/assets/images/icons/icon-play.png'} className="play" />
              <img src={'/assets/images/icons/icon-white-screen-view.png'} className="screen-view" />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TelescopeConditionSnapshot;
