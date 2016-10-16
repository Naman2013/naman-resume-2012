import React, { Component, PropTypes } from 'react';

import Hero from '../components/home/hero';
import RecentVideoTile from '../components/home/recent-video-tile';
import PromoMessageBand from '../components/common/headers/promo-message-band';
import LargeBannerHeading from '../components/home/large-banner-heading';
import SloohFeatures from '../components/home/slooh-features';
import ViewableObjects from '../components/home/viewable-objects/viewable-objects';
import CommunityPerspectives from '../components/common/community-perspectives/community-perspectives';
import Sponsors from '../components/home/sponsors';
import Dedication from '../components/home/slooh-extras/dedication';
import Featured from '../components/home/slooh-extras/featured';
import TwitterFeed from '../components/home/slooh-extras/twitter-feed';

// static content
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

        <LargeBannerHeading content={CONTENT.ADDITIONAL_OFFERING_HEADER} />

        <PromoMessageBand title={CONTENT.VIEWABLE_OBJECTS.ADDITIONAL_OFFERING_BAND} />
        <ViewableObjects {...CONTENT.VIEWABLE_OBJECTS} />

        <PromoMessageBand title={CONTENT.COMMUNITY_CONTENT_BAND} />
        <CommunityPerspectives
          showCallToAction={false} />

        <PromoMessageBand title={CONTENT.SPONSORS_CONTENT_BAND} />

        <Sponsors
          title={CONTENT.SPONSORS_SUB_TITLE}
          sponsorImages={CONTENT.SPONSOR_IMAGES} />

        <Dedication
          title="Dedication"/>

        <Featured
          title="Where we've been featured..."/>

        <TwitterFeed
          title="Hashtag #slooh"/>
      </div>
    );
  }
}

export default Home;
