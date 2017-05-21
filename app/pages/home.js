import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Hero from '../components/home/hero';
import HeroInspire from '../components/home/hero-inspire';
import RecentVideoTile from '../components/home/recent-video-tile';
import PromoMessageBand from '../components/common/headers/promo-message-band';
import LargeBannerHeading from '../components/home/large-banner-heading';
import SloohFeatures from '../components/home/slooh-features';
import ViewableObjects from '../components/home/viewable-objects/viewable-objects';
import CommunityPerspectives from '../components/common/community-perspectives/community-perspectives';
import Sponsors from '../components/home/sponsors';
import Dedication from '../components/home/slooh-extras/dedication';
import Featured from '../components/home/slooh-extras/featured';
import style from './home.scss';

import { fetchCommunityContent }
  from '../modules/community-content/get-object-content-actions';
import { getHomePage, trackUser } from '../modules/home-content/actions';

const mapStateToProps = ({ communityContent, homeContent, appConfig }) => ({
  communityContent: communityContent.communityContent,
  homeContent,
  appConfig,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchCommunityContent,
    getHomePage,
    trackUser,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  componentWillMount() {
    this.props.actions.fetchCommunityContent();

    this.props.actions.getHomePage();

    this.homePageRerfreshInterval = setInterval(() => {
      this.props.actions.getHomePage();
    }, this.props.homeContent.refreshIntervalSec * 1000);
  }

  componentDidMount() {
    this.props.actions.trackUser();
  }

  componentWillUnmount() {
    if (this.homePageRerfreshInterval) {
      clearInterval(this.homePageRerfreshInterval);
    }
  }

  generateRecentVideoTiles() {
    const { homeContent } = this.props;
    return homeContent.RECENT_STUFF.map(videoTile => <RecentVideoTile {...videoTile} />);
  }

  generateSloohFeatures() {
    const { homeContent } = this.props;
    return homeContent.membershipTierArray.map(feature => <SloohFeatures {...feature} key={feature.tierIndex} />);
  }

  render() {
    const { homeContent, appConfig } = this.props;
    const { posts } = this.props.communityContent;

    const heroProps = {};
    Object.keys(homeContent).filter(key => /^hero/.test(key)).forEach((key) => {
      heroProps[key] = homeContent[key];
    });

    return (
      <div className={`${style.homeContainer} clearfix`}>
        {
          heroProps.heroEventId !== 0 ?
            <Hero {...heroProps} /> :
            <HeroInspire
              {...heroProps}
            />
        }

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
