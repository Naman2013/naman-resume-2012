/***********************************
* V4 RecentShow
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ThreeTabbedNav from 'components/ThreeTabbedNav';
import TwoTabbedNav from 'components/TwoTabbedNav';
import CenterColumn from 'components/common/CenterColumn';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
import MonotonousTile from 'components/common/tiles/MonotonousTile'
import VideoImageLoader from 'components/common/telescope-image-loader/video-image-loader';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import MainContainerWithDiscussions from './partials/MainContainerWithDiscussions';
import AsideContainerDetailsOnly from './partials/AsideContainerDetailsOnly';
import { romance, seashell } from 'styles/variables/colors_tiles_v4';

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

class RecentShow extends Component {
  static propTypes = {
    isDesktop: bool.isRequired,
    showInfoTiles: shape({
      list: shape({})
    }),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    showInfoTiles: {},
  };

  state = {
    aboutIsActive: true,
    commentsIsActive: false,
    detailsIsActive: false,
    selectedTab: 0,
  }

  showAbout = () => {
    this.setState({
      aboutIsActive: true,
      commentsIsActive: false,
      detailsIsActive: false,
    });
  }

  showComments = () => {
    this.setState({
      aboutIsActive: false,
      commentsIsActive: true,
      detailsIsActive: false,
    });
  }

  showDetails = () => {
    this.setState({
      aboutIsActive: false,
      commentsIsActive: false,
      detailsIsActive: true,
    });
  }

  handleSelect = (index) => {
    window.scrollTo(0, 0);
    this.setState({
      selectedTab: index,
    });
  }

  render() {
    const {
      hasDiscussionThread,
      headerLabel,
      isDesktop,
      isScreenLarge,
      isScreenMedium,
      showInfoTiles,
      showStreamCode,
      showStreamURL,
      title,
      tagLine,
      intl,
    } = this.props;

    const {
      aboutIsActive,
      commentsIsActive,
      detailsIsActive,
      selectedTab,
    } = this.state;

    console.log(showInfoTiles);

    return (
      <CenterColumn theme={{ backgroundColor: seashell }} theme={{ paddingTop: '25px' }}>
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
                title={title}
                subtitle={tagLine}
              />
            </div>
            <MonotonousTile label={headerLabel} text={title} />
            <div className="hide-on-mobile">
              <LabeledTitleTiles
                theme={{ margin: isDesktop ? 0 : '15px', backgroundColor: romance }}
                tiles={showInfoTiles.list}
                direction="row"
              />
            </div>
          </div>
          <div className="recent-main-container">
            <ResponsiveTwoColumnContainer
              renderNavigationComponent={() => (
                <div className="full-width">{hasDiscussionThread ? (
                  <ThreeTabbedNav
                    firstTitle={intl.formatMessage(messages.About)}
                    secondTitle={intl.formatMessage(messages.Comments)}
                    thirdTitle={intl.formatMessage(messages.Details)}
                    firstTabIsActive={aboutIsActive}
                    firstTabOnClick={this.showAbout}
                    secondTabIsActive={commentsIsActive}
                    secondTabOnClick={this.showComments}
                    thirdTabIsActive={detailsIsActive}
                    thirdTabOnClick={this.showDetails}
                  />
                ) : (
                  <TwoTabbedNav
                    firstTitle={intl.formatMessage(messages.About)}
                    secondTitle={intl.formatMessage(messages.Details)}
                    firstTabIsActive={aboutIsActive}
                    firstTabOnClick={this.showAbout}
                    secondTabIsActive={detailsIsActive}
                    secondTabOnClick={this.showDetails}
                  />
                )}
                </div>)
              }
              renderAsideContent={() => (<AsideContainerDetailsOnly
                {...this.props}
              />)}
              isScreenLarge={isScreenLarge}
              renderMainContent={() => (<MainContainerWithDiscussions
                {...this.props}
                selectedTab={selectedTab}
                handleSelect={this.handleSelect}
                aboutIsActive={aboutIsActive}
                commentsIsActive={commentsIsActive}
                detailsIsActive={detailsIsActive}
              />)}
            />
          </div>
          <style jsx>{styles}</style>
        </div>
      </CenterColumn>
    );
  }
}

export default injectIntl(RecentShow);
