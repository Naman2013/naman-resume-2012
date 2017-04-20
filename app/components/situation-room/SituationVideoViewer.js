import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Countdown from '../../containers/Countdown';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import TelescopeImageViewer from '../../components/common/telescope-image-viewer/telescope-image-viewer';
import generateSseImageLoader from '../../utils/generate-sse-image-source';
import SponsoredBy from '../common/sponsored-by';
import { camera } from '../community/tools/community-icon';
import s from './SituationVideoViewer.scss';

const getInlineBgStyle = imgUrl => ({
  backgroundImage: `url(${imgUrl})`,
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
    this.setState({
      selectedTab: index,
    });
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
    Tabs.setUseDefaultStyles(false);

    return (
      <section className={s.situationVideoViewerRoot}>

        <header className={s.liveViewHeader}>
          <h2 dangerouslySetInnerHTML={{ __html: eventTitle }}></h2>
          {
            hasSponsor ?
              <SponsoredBy
                sponsorLogoURL={sponsorLogoURL}
                sponsorLinkURL={sponsorLinkURL}
              /> : null
          }
        </header>

        <Tabs onSelect={this.handleSelect} selectedIndex={selectedTab}>

          <TabList className={s.liveTelescopeTabs}>
            <Tab>
              <div className={s.liveTelescopeTitle}>
                {selectedTab === 0 && <h6>Main Show</h6>}
              </div>
              <div className="telescope" style={getInlineBgStyle(eventIconURL)} />
            </Tab>
            {
                additionalFeeds.map((feed, i) => (
                  <Tab key={feed.videoStreamCode}>
                    <div className={s.liveTelescopeTitle}>
                      {(selectedTab === i + 1) && <h6>{feed.TelescopeName}</h6> }
                    </div>
                    <div className="telescope" style={getInlineBgStyle(feed.tabIconURL)} />
                  </Tab>
                ))
            }
          </TabList>

          <TabPanel>
            <aside className={s.liveViewContent}>
              {
                videoInProgress && initialStreamCode && initialStreamURL ?
                  <VideoImageLoader
                    teleStreamCode={initialStreamCode}
                    teleStreamURL={initialStreamURL}
                    teleStreamThumbnailVideoWidth="1000"
                    teleStreamThumbnailVideoHeight="550"
                  />
                  :
                  <div className={s.showNotStartedContainer}>
                    <div className={s.showCountdownContainer}>
                      <Countdown size={150} className="live" lineWidth={10} />
                    </div>
                  </div>
              }
            </aside>
          </TabPanel>

          {
            additionalFeeds.map(feed => (
              <TabPanel key={feed.videoStreamCode}>
                <aside className={s.liveViewContent}>
                  {feed.imageSourceType === 'video' ?
                    <VideoImageLoader
                      teleStreamCode={feed.videoStreamCode}
                      teleStreamURL={feed.videoStreamURL}
                      teleStreamThumbnailVideoWidth="1000"
                      teleStreamThumbnailVideoHeight="550"
                    />
                  : // else feed.imageSourceType === 'SSE'
                    <TelescopeImageViewer
                      teleSystem={feed.systemId}
                      telePort={feed.SSEport}
                      teleId={feed.TelescopeId}
                      obsId={feed.ObsId}
                      domeId={String(feed.DomeId)}
                      teleFade={String(feed.SSEfade)}
                      clipped={false}
                    />
                  }
                </aside>
              </TabPanel>)
            )}
        </Tabs>

        <footer className={s.liveCameraTabs}>
          {
            starShareAvailable ?
              <div className="camera-icon">{camera}</div> : null
          }
          {
            /** TODO: deferred starshare camera work
              <div className="camera" />
              <div className="camera" />
              <div className="camera" />
            */
          }
        </footer>

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
};

SituationVideoViewer.propTypes = {
  videoInProgress: PropTypes.bool,
  videoEmbedCode: PropTypes.string,
  eventTitle: PropTypes.string,
  hasSponsor: PropTypes.bool,
  sponsorLogoURL: PropTypes.string,
  sponsorLinkURL: PropTypes.string,
  eventIconURL: PropTypes.string,
  additionalFeeds: PropTypes.array,
  starShareAvailable: PropTypes.bool.isRequired,
  initialStreamCode: PropTypes.string,
  initialStreamURL: PropTypes.string,

  hasAdditionalFeeds: PropTypes.bool.isRequired,
};

export default SituationVideoViewer;
