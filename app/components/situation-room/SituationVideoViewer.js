import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import Countdown from '../../containers/Countdown';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import TelescopeImageViewer from '../../components/common/telescope-image-viewer/telescope-image-viewer';
import SponsoredBy from '../common/sponsored-by';
import StarShareCamera from '../../components/telescope-details/star-share-camera/star-share-camera';
import s from './SituationVideoViewer.scss';

const getInlineBgStyle = imgUrl => ({
  backgroundImage: `url(${imgUrl})`,
  backgroundSize: '100%',
});

class SituationVideoViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(index, last) {
    window.scrollTo(0, 0);
    this.setState({
      selectedTab: index,
    });
  }

  get isStarShareAvailable() {
    const { starShareAvailable, additionalFeeds, videoInProgress } = this.props;
    const { selectedTab } = this.state;

    return selectedTab === 0
      ? starShareAvailable && videoInProgress
      : additionalFeeds[selectedTab - 1].canStarShare;
  }

  get noVideoHtml() {
    return (
      <div className={s.showNotStartedContainer}>
        <div className={s.showCountdownContainer}>
          <Countdown size={150} className="live" lineWidth={10} />
        </div>
      </div>
    );
  }

  render() {
    const {
      videoInProgress,
      eventTitle,
      hasSponsor,
      sponsorLogoURL,
      sponsorLinkURL,
      additionalFeeds,
      eventIconURL,
      starShareAvailable,
      initialStreamCode,
      initialStreamURL,
    } = this.props;
    const { selectedTab } = this.state;

    return (
      <section className={s.situationVideoViewerRoot}>
        <header className={s.liveViewHeader}>
          <h2 dangerouslySetInnerHTML={{ __html: eventTitle }} />
        </header>

        {videoInProgress && (
          <Tabs onSelect={this.handleSelect} selectedIndex={selectedTab}>
            <TabList className={s.liveTelescopeTabs}>
              <Tab>
                <div className={s.liveTelescopeTitle}>
                  <h6>Main Show</h6>
                </div>
                <div
                  className="telescope"
                  style={getInlineBgStyle(eventIconURL)}
                />
              </Tab>

              {additionalFeeds.map(feed => (
                <Tab key={uniqueId()}>
                  <div className={s.liveTelescopeTitle}>
                    {<h6>{feed.tabDesc}</h6>}
                  </div>
                  <div
                    className="telescope"
                    style={getInlineBgStyle(feed.tabIconURL)}
                  />
                </Tab>
              ))}
            </TabList>

            <TabPanel
              forceRender={true}
              className={classnames({
                'active-tele-tab': selectedTab === 0,
                'inactive-tele-tab': selectedTab !== 0,
              })}
            >
              <aside className={s.liveViewContent}>
                {initialStreamCode && initialStreamURL ? (
                  <VideoImageLoader
                    teleStreamCode={initialStreamCode}
                    teleStreamURL={initialStreamURL}
                    teleStreamThumbnailVideoWidth="1000"
                    teleStreamThumbnailVideoHeight="550"
                    showVideoControls={1}
                    showInfo={1}
                  />
                ) : (
                  this.noVideoHtml
                )}
              </aside>
            </TabPanel>

            {additionalFeeds.map((feed, i) => (
              <TabPanel key={uniqueId()}>
                <aside className={s.liveViewContent}>
                  {feed.imageSourceType === 'video' ? (
                    <VideoImageLoader
                      teleStreamCode={feed.videoStreamCode}
                      teleStreamURL={feed.videoStreamURL}
                      teleStreamThumbnailVideoWidth="1000"
                      teleStreamThumbnailVideoHeight="550"
                      cameraSourceType={feed.cameraSourceType}
                      teleSystem={feed.systemId}
                      telePort={feed.SSEport}
                      callSource="situationRoom"
                    />
                  ) : (
                    // else feed.imageSourceType === 'SSE'
                    <TelescopeImageViewer
                      teleSystem={feed.systemId}
                      telePort={feed.SSEport}
                      teleId={feed.TelescopeId}
                      obsId={feed.ObsId}
                      domeId={String(feed.DomeId)}
                      teleFade={Number(feed.SSEfade)}
                      shouldUseTransitions={false}
                      clipped={false}
                      missionFormat="none"
                      isInteractive={false}
                      callSource="situationRoom"
                    />
                  )}
                </aside>
              </TabPanel>
            ))}
          </Tabs>
        )}

        {!videoInProgress && (
          <aside className={s.liveViewContent}>{this.noVideoHtml}</aside>
        )}

        <footer className={s.liveCameraTabs}>
          {this.isStarShareAvailable ? <StarShareCamera /> : null}
        </footer>

        <style jsx>
          {`
            :global(.active-tele-tab) {
              display: block;
            }

            :global(.inactive-tele-tab) {
              display: none;
            }
          `}
        </style>
      </section>
    );
  }
}

SituationVideoViewer.defaultProps = {
  videoInProgress: false,
  videoEmbedCode: null,
  eventTitle: '',
  hasSponsor: false,
  sponsorLogoURL: '',
  sponsorLinkURL: '',
  initialStreamCode: null,
  initialStreamURL: null,
  eventIconURL: '',
  additionalFeeds: [],
  starShareAvailable: false,
};

SituationVideoViewer.propTypes = {
  videoInProgress: PropTypes.bool,
  videoEmbedCode: PropTypes.string,
  eventTitle: PropTypes.string,
  hasSponsor: PropTypes.bool,
  sponsorLogoURL: PropTypes.string,
  sponsorLinkURL: PropTypes.string,
  eventIconURL: PropTypes.string,
  additionalFeeds: PropTypes.arrayOf(
    PropTypes.shape({
      DomeId: PropTypes.string,
      ObsId: PropTypes.string,
      PierNumber: PropTypes.string,
      SSEfade: PropTypes.number,
      SSEport: PropTypes.number,
      TelescopeCode: PropTypes.string,
      TelescopeId: PropTypes.string,
      TelescopeName: PropTypes.string,
      cameraSourceType: PropTypes.string,
      canStarShare: PropTypes.bool,
      imageSourceType: PropTypes.string,
      systemId: PropTypes.string,
      tabDesc: PropTypes.string,
      tabIconURL: PropTypes.string,
      videoStreamCode: PropTypes.string,
      videoStreamURL: PropTypes.string,
    })
  ),
  starShareAvailable: PropTypes.bool,
  initialStreamCode: PropTypes.string,
  initialStreamURL: PropTypes.string,

  hasAdditionalFeeds: PropTypes.bool.isRequired,
};

export default SituationVideoViewer;
