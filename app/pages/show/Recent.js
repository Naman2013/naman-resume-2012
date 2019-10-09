/***********************************
 * V4 RecentShow
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import ThreeTabbedNav from 'app/components/ThreeTabbedNav';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import CenterColumn from 'app/components/common/CenterColumn';
import LabeledTitleTiles from 'app/components/common/style/LabeledTitleTiles';
import MonotonousTile from 'app/components/common/tiles/MonotonousTile';
import VideoImageLoader from 'app/components/common/telescope-image-loader/video-image-loader';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import { romance, seashell } from 'app/styles/variables/colors_tiles_v4';
import MainContainerWithDiscussions from './partials/MainContainerWithDiscussions';
import AsideContainerDetailsOnly from './partials/AsideContainerDetailsOnly';

import styles from './Show.style';
import messages from './Show.messages';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

@withTranslation
class RecentShow extends Component {
  static propTypes = {
    isDesktop: bool.isRequired,
    showInfoTiles: shape({
      list: shape({}),
    }),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,

  };

  static defaultProps = {
    showInfoTiles: {},
  };

  state = {
    aboutIsActive: true,
    commentsIsActive: false,
    detailsIsActive: false,
    selectedTab: 0,
  };

  showAbout = () => {
    this.setState({
      aboutIsActive: true,
      commentsIsActive: false,
      detailsIsActive: false,
    });
  };

  showComments = () => {
    this.setState({
      aboutIsActive: false,
      commentsIsActive: true,
      detailsIsActive: false,
    });
  };

  showDetails = () => {
    this.setState({
      aboutIsActive: false,
      commentsIsActive: false,
      detailsIsActive: true,
    });
  };

  handleSelect = index => {
    window.scrollTo(0, 0);
    this.setState({
      selectedTab: index,
    });
  };

  render() {
    const {
      hasDiscussionThread,
      headerLabel,
      isDesktop,
      isScreenLarge,
      isScreenMedium,
      readingListPrompt,
      promptIconUrl,
      showId,
      showInfoTiles,
      showStreamCode,
      showStreamURL,
      title,
      tagLine,
      t,
    } = this.props;

    const {
      aboutIsActive,
      commentsIsActive,
      detailsIsActive,
      selectedTab,
    } = this.state;

    return (
      <CenterColumn
        theme={{ backgroundColor: seashell }}
        theme={{ paddingTop: '25px' }}
      >
        <div className="root">
          <div className="big-box">
            <div className="show-video-container">
              <VideoImageLoader
                teleStreamCode={showStreamCode}
                teleStreamURL={showStreamURL}
                teleStreamThumbnailVideoWidth="800"
                teleStreamThumbnailVideoHeight="550"
                showVideoControls={1}
                autoPlay={0}
              />
            </div>
            <MonotonousTile
              label={headerLabel}
              text={title}
              showReadingList
              readingListType="show"
              readingListPrompt={readingListPrompt}
              promptIconUrl={promptIconUrl}
              id={showId}
            />
            <div className="hide-on-mobile">
              <LabeledTitleTiles
                theme={{
                  backgroundColor: romance,
                }}
                tiles={showInfoTiles.list}
                direction="row"
              />
            </div>
          </div>
          <div className="recent-main-container">
            <ResponsiveTwoColumnContainer
              renderNavigationComponent={() => (
                <div className="full-width">
                  {hasDiscussionThread ? (
                    <ThreeTabbedNav
                      firstTitle={t('.About')}
                      secondTitle={t('.Comments')}
                      thirdTitle={t('.Details')}
                      firstTabIsActive={aboutIsActive}
                      firstTabOnClick={this.showAbout}
                      secondTabIsActive={commentsIsActive}
                      secondTabOnClick={this.showComments}
                      thirdTabIsActive={detailsIsActive}
                      thirdTabOnClick={this.showDetails}
                    />
                  ) : (
                    <TwoTabbedNav
                      firstTitle={t('.About')}
                      secondTitle={t('.Details')}
                      firstTabIsActive={aboutIsActive}
                      firstTabOnClick={this.showAbout}
                      secondTabIsActive={detailsIsActive}
                      secondTabOnClick={this.showDetails}
                    />
                  )}
                </div>
              )}
              renderAsideContent={() => (
                <AsideContainerDetailsOnly {...this.props} />
              )}
              isScreenSize={isDesktop}
              renderMainContent={() => (
                <MainContainerWithDiscussions
                  {...this.props}
                  selectedTab={selectedTab}
                  handleSelect={this.handleSelect}
                  aboutIsActive={aboutIsActive}
                  commentsIsActive={commentsIsActive}
                  detailsIsActive={detailsIsActive}
                />
              )}
            />
          </div>
          <style jsx>{styles}</style>
        </div>
      </CenterColumn>
    );
  }
}

export default RecentShow;
