import React, { Component, PropTypes } from 'react';

import Hero from '../components/home/hero';
import RecentVideoTile from '../components/home/recent-video-tile';
import PromoMessageBand from '../components/home/promo-message-band';
import SloohFeatures from '../components/home/slooh-features';
import ViewableObjects from '../components/home/viewable-objects';

import CONTENT from '../content/home';

class Home extends Component {

  fetchStaticHero() {
    return(
      <Hero {...CONTENT.STATIC_HERO} />
    );
  }

  generateRecentVideoTiles() {
    return CONTENT.RECENT_STUFF.map( videoTile => <RecentVideoTile {...videoTile} /> );
  }

  generateSloohFeatures() {
    return CONTENT.SLOOH_FEATURES.map( feature => <SloohFeatures {...feature} /> );
  }

  render() {
    return(
      <div>
        {this.fetchStaticHero()}

        <div className="clearfix">
          {this.generateRecentVideoTiles()}
        </div>

        <PromoMessageBand message={CONTENT.promoBandContent} />

        <div className="clearfix">
          {this.generateSloohFeatures()}
        </div>

        <PromoMessageBand message={CONTENT.VIEWABLE_OBJECTS.ADDITIONAL_OFFERING_BAND} />

        <ViewableObjects {...CONTENT.VIEWABLE_OBJECTS} />

        <PromoMessageBand message={CONTENT.COMMUNITY_CONTENT_BAND} />
      </div>
    );
  }
}

export default Home;
