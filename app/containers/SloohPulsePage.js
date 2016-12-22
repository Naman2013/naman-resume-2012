import React, { Component, PropTypes } from 'react';
import PulsePopular from '../components/pulse/pulse-popular';
import PulseRecommended from '../components/pulse/pulse-recommends';
import MissionAd from '../components/missions/mission-ad';

export default class SloohPulsePage extends Component {

  render() {
    const { children } = this.props;

    return (
      <div className="reserve-missions">

        <section className="container clearfix">
          <div className="row">
            <div className="col-md-8">
              {children}
            </div>

            <div className="col-md-4 mission-sidebar">
              <MissionAd />
              <PulsePopular />
              <PulseRecommended />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
