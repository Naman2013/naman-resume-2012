import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Hero from '../components/home/hero';
import HeroInspire from '../components/home/hero-inspire';
import HeroAboutYou from '../components/home/hero-about-you';
import RecentVideoTile from '../components/home/recent-video-tile';
import PromoMessageBand from '../components/common/headers/promo-message-band';
import LargeBannerHeading from '../components/home/large-banner-heading';
import SloohFeatures from '../components/home/slooh-features';
import ViewableObjects from '../components/home/viewable-objects/viewable-objects';
import CommunityPerspectives from '../components/common/community-perspectives/community-perspectives';
import Sponsors from '../components/home/sponsors';
import Dedication from '../components/home/slooh-extras/dedication';
import SloohStorePromo from '../components/home/slooh-store';
import Featured from '../components/home/slooh-extras/featured';
import SharedPictures from '../components/home/shared-pictures';
import style from './home.scss';

import { fetchCommunityContent }
  from '../modules/community-content/community-object-content-actions';
import { getHomePage, trackUser } from '../modules/home-content/actions';
import { getSharedMemberPhotos } from '../modules/get-shared-member-photos/actions';

const mapStateToProps = ({
  appConfig,
  communityContent,
  homeContent,
  sharedMemberPhotos,
}) => ({
  communityContent: communityContent.communityContent,
  homeContent,
  appConfig,
  sharedMemberPhotosList: sharedMemberPhotos.imageList,
  sharedMemberTimelineData: sharedMemberPhotos.timelineData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchCommunityContent,
    getHomePage,
    getSharedMemberPhotos,
    trackUser,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  componentWillMount() {
    this.props.actions.fetchCommunityContent();

    this.homePageRerfreshInterval = setInterval(() => {
      this.props.actions.getHomePage();
    }, this.props.homeContent.refreshIntervalSec * 1000);
  }

  componentDidMount() {
    this.props.actions.trackUser();

    this.props.actions.getHomePage().then(res => {
      if (res.data.memberPicturesDisplay) {
        this.props.actions.getSharedMemberPhotos();
      }
    });
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
    const {
      homeContent,
      appConfig,
      sharedMemberPhotosList,
      sharedMemberTimelineData,
    } = this.props;

    const { posts } = this.props.communityContent;
    const heroProps = {};
    Object.keys(homeContent).filter(key => /^hero/.test(key)).forEach((key) => {
      heroProps[key] = homeContent[key];
    });
    return (
      <div className={`${style.homeContainer} clearfix`}>
        { homeContent.loadHeroTypes.indexOf('inspire') > -1 &&
          <HeroInspire
            heroHeadline={homeContent.heroHeadline}
            heroSubheadline={homeContent.heroSubheadline}
            heroButtonText={homeContent.heroButtonText}
            heroButtonURL={homeContent.heroButtonURL}
            videoTourText={homeContent.videoTourText}
            videoTourURL={homeContent.videoTourURL}
            heroEventId={homeContent.heroEventId}
            heroEventIsLive={homeContent.heroEventIsLive}
            heroImageURL={homeContent.heroImageURL}
            heroFactoidText={homeContent.heroFactoidText}
            heroFactoidIconURL={homeContent.heroFactoidIconURL}
            showHeroButton={homeContent.showHeroButton}
            showVideoTourButton={homeContent.showVideoTourButton}
            userLoggedInFlag={homeContent.userLoggedInFlag}
          />
        }


        {homeContent.loadHeroTypes.indexOf('promotedShow') > -1 &&
          <Hero
            heroHeadline={homeContent.heroHeadline}
            heroSubheadline={homeContent.heroSubheadline}
            heroButtonText={homeContent.heroButtonText}
            heroButtonURL={homeContent.heroButtonURL}
            videoTourText={homeContent.videoTourText}
            videoTourURL={homeContent.videoTourURL}
            heroEventId={homeContent.heroEventId}
            heroEventIsLive={homeContent.heroEventIsLive}
            heroImageURL={homeContent.heroImageURL}
            heroFactoidText={homeContent.heroFactoidText}
            heroFactoidIconURL={homeContent.heroFactoidIconURL}
            showHeroButton={homeContent.showHeroButton}
            showVideoTourButton={homeContent.showVideoTourButton}
            userLoggedInFlag={homeContent.userLoggedInFlag}
          />}

        {homeContent.loadHeroTypes.indexOf('aboutYou') > -1 &&
          <HeroAboutYou {...homeContent.userInformation} />
        }
        {homeContent.memberPicturesDisplay && <SharedPictures
          heading={homeContent.memberPicturesHeading}
          subheading={homeContent.memberPicturesSubHeading}
          imageList={sharedMemberPhotosList}
          timelineData={sharedMemberTimelineData}
        />}
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

        <SloohStorePromo />



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
  homeContent: {
    loadHeroTypes: [],
  },
  communityContent: {
    posts: [],
  },
};

export default Home;
