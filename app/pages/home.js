import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
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
import PromoPanels from '../components/home/promo-panels/promo-panels';
import style from './home.scss';
import SocialSharingBar from '../components/common/social-sharing-bar';

import { fetchCommunityContent }
  from '../modules/community-content/community-object-content-actions';
import { getHomePage, getNewHomePage, trackUser } from '../modules/home-content/actions';
import { getSharedMemberPhotos } from '../modules/get-shared-member-photos/actions';

const mapStateToProps = ({
  appConfig,
  communityContent,
  homeContent,
  newHomeContent,
  sharedMemberPhotos,
}) => ({
  communityContent: communityContent.communityContent,
  homeContent,
  newHomeContent,
  appConfig,
  sharedMemberPhotosList: sharedMemberPhotos.imageList,
  sharedMemberTimelineData: sharedMemberPhotos.timelineData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchCommunityContent,
    getHomePage,
    getNewHomePage,
    getSharedMemberPhotos,
    trackUser,
  }, dispatch),
});

const sloohFeaturesStyle = {
  display: "inline-block",
}

const promoInlineStyle = {
  paddingTop: '0px',
  paddingBottom: '0px',
  marginTop: '0px',
  marginBottom: '-30px',
};

const illuminationsInlineStyle = {
  display: 'inline-block',
  minWidth: '100%',
};

const inlineVideosContainer = {
  position: 'relative',
  display: 'relative',
  width: '100%',
  textAlign: 'center',
};

const inlineInnerVideosContainer = {
  maxWidth: '100%',
};

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  componentWillMount() {
    this.props.actions.fetchCommunityContent();

    this.homePageRerfreshInterval = setInterval(() => {
      this.props.actions.getHomePage();
      this.props.actions.getNewHomePage();
    }, this.props.homeContent.refreshIntervalSec * 1000);
  }

  componentDidMount() {
    this.props.actions.trackUser();

    this.props.actions.getHomePage().then(res => {
      if (res.data.memberPicturesDisplay) {
        this.props.actions.getSharedMemberPhotos();
      }
    });

    this.props.actions.getNewHomePage().then(res => {
      //do nothing
      }
    );
  }

  componentWillUnmount() {
    if (this.homePageRerfreshInterval) {
      clearInterval(this.homePageRerfreshInterval);
    }
  }

  generateRecentVideoTiles() {
    const { homeContent } = this.props;
    return homeContent.videoClips.videoClipsArray.map(videoTile => <RecentVideoTile numVideos={homeContent.videoClips.videoClipsCount} {...videoTile} />);
  }

  generateSloohFeatures() {
    const { homeContent } = this.props;
    return(
      <div style={sloohFeaturesStyle}>
        <PromoMessageBand title={homeContent.upsell.upsellHeading} />
        <div className="clearfix">
            {homeContent.membershipTierArray.map(feature => <SloohFeatures {...feature} key={feature.tierIndex} />)}
        </div>
      </div>
    )
  }

  render() {
    const {
      homeContent,
      newHomeContent,
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

        <SocialSharingBar />

        {homeContent.promo && homeContent.promo.promoShow &&
          <div style={promoInlineStyle}>
            {homeContent.promo && <PromoPanels {...homeContent.promo}/>}
          </div>
        }

        {homeContent.memberPicturesDisplay && <SharedPictures
          heading={homeContent.memberPicturesHeading}
          subheading={homeContent.memberPicturesSubHeading}
          imageList={sharedMemberPhotosList}
          timelineData={sharedMemberTimelineData}
        />}

          {homeContent.videoClips && homeContent.videoClips.videoClipsShow && homeContent.videoClips.videoClipsArray &&
              <div>
                <PromoMessageBand title={homeContent.videoClips.videoClipsHeading} />
                <div style={inlineVideosContainer} className="clearfix">
                    <div style={inlineInnerVideosContainer}>
                      {this.generateRecentVideoTiles()}
                    </div>
                </div>
              </div>
          }

        {homeContent.illuminations && homeContent.illuminations.illuminationsShow &&
          <div style={illuminationsInlineStyle}>
            <PromoMessageBand title={homeContent.illuminations.illuminationsHeading} />
          </div>
        }

        <CommunityPerspectives
          showCallToAction={false}
          showSliderBorder={false}
          showArrows={false}
          numberOfSlidesToDisplay={3}
          communityContent={posts}
        />

        {homeContent.upsell && homeContent.upsell.upsellShow && this.generateSloohFeatures()}

        <LargeBannerHeading content="&nbsp;" />

        {homeContent.recommends && homeContent.recommends.recommendsShow &&
          <div>
            <PromoMessageBand title={homeContent.recommends.recommendsHeading} />
            <ViewableObjects {...homeContent.recommends} />
          </div>
        }

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
