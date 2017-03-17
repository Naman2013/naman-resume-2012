import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import style from './home.scss';

import { fetchCommunityContent }
  from '../modules/community-content/get-object-content-actions';

const mapStateToProps = ({ communityContent, homeContent }) => ({
  communityContent: communityContent.communityContent,
  homeContent,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchCommunityContent,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  componentWillMount() {
    this.props.actions.fetchCommunityContent();
  }

  fetchStaticHero() {
    const { homeContent } = this.props;
    return <Hero {...homeContent.STATIC_HERO} />;
  }

  generateRecentVideoTiles() {
    const { homeContent } = this.props;
    return homeContent.RECENT_STUFF.map(videoTile => <RecentVideoTile {...videoTile} />);
  }

  generateSloohFeatures() {
    const { homeContent } = this.props;
    return homeContent.SLOOH_FEATURES.map(feature => <SloohFeatures {...feature} />);
  }

  render() {
    const { homeContent } = this.props;
    const { posts } = this.props.communityContent;

    return (
      <div className={`${style.homeContainer} clearfix`}>

        {this.fetchStaticHero()}

        <div className="clearfix">
          {this.generateRecentVideoTiles()}
        </div>

        <PromoMessageBand message={homeContent.promoBandContent} />

        <div className="clearfix">
          {this.generateSloohFeatures()}
        </div>

        <LargeBannerHeading content={homeContent.ADDITIONAL_OFFERING_HEADER} />

        <PromoMessageBand title={homeContent.VIEWABLE_OBJECTS.ADDITIONAL_OFFERING_BAND} />
        <ViewableObjects {...homeContent.VIEWABLE_OBJECTS} />

        <PromoMessageBand title={homeContent.COMMUNITY_CONTENT_BAND} />
        <CommunityPerspectives
          showCallToAction={false}
          showSliderBorder={false}
          showArrows={false}
          numberOfSlidesToDisplay={3}
          communityContent={posts}
        />

        <PromoMessageBand title={homeContent.SPONSORS_CONTENT_BAND} />

        <Sponsors
          title={homeContent.SPONSORS_SUB_TITLE}
          sponsorImages={homeContent.SPONSOR_IMAGES}
        />

        <div className="col-md-2" />

        <Dedication
          title="Dedication"
        />

        <Featured
          title="Where we've been featured..."
        />
      </div>
    );
  }
}

Home.defaultProps = {
  communityContent: {
    posts: [],
  },
};

export default Home;
