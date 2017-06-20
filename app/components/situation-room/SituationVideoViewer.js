import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { uniqueId } from 'lodash';
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
    this.setState({
      selectedTab: index,
    });
  }

  get isStarShareAvailable() {
    const { starShareAvailable, additionalFeeds, videoInProgress } = this.props;
    const { selectedTab } = this.state;

    return selectedTab === 0 ? (starShareAvailable && videoInProgress) : additionalFeeds[selectedTab - 1].canStarShare
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
            {
              videoInProgress &&
              <Tab>
                <div className={s.liveTelescopeTitle}>
                  {selectedTab === 0 && <h6>Main Show</h6>}
                </div>
                <div className="telescope" style={getInlineBgStyle(eventIconURL)} />
              </Tab>
            }
            {
              videoInProgress && additionalFeeds.map(feed => (
                <Tab key={uniqueId()}>
                  <div className={s.liveTelescopeTitle}>
                    {<h6>{feed.TelescopeName}</h6> }
                  </div>
                  <div className="telescope" style={getInlineBgStyle(feed.tabIconURL)} />
                </Tab>
              ))
            }
          </TabList>

          {
            videoInProgress &&
              <TabPanel>
                <aside className={s.liveViewContent}>
                  {
                    initialStreamCode && initialStreamURL ?
                      <VideoImageLoader
                        teleStreamCode={initialStreamCode}
                        teleStreamURL={initialStreamURL}
                        teleStreamThumbnailVideoWidth="1000"
                        teleStreamThumbnailVideoHeight="550"
                        showVideoControls={1}
                        showInfo={1}
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
          }


          {
            videoInProgress && additionalFeeds.map(feed => (
              <TabPanel key={uniqueId()}>
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
            this.isStarShareAvailable ?
              <StarShareCamera /> : null
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
  additionalFeeds: [],
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
