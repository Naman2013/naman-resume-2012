import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Countdown from '../../containers/Countdown';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import SponsoredBy from '../common/sponsored-by';
import { camera } from '../community/tools/community-icon';
import s from './SituationVideoViewer.scss';

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
              <h6>Main Show</h6>
              <div className="telescope" />
            </Tab>
            {
              /** TODO: SSE feeds deferred
                additionalFeeds.map(feed => (
                  <Tab>
                    <h6>Feed tab</h6>
                    <div className="telescope" />
                  </Tab>
                ))
              */
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
            /** TODO: deferred the SSE work
            additionalFeeds.map(feed => (
              <TabPanel>
                <aside className={s.liveViewContent}>Coming soon</aside>
              </TabPanel>
            ))
            */
          }
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
  hasSponsor: 0,
  sponsorLogoURL: '',
  sponsorLinkURL: '',
  initialStreamCode: null,
  initialStreamURL: null,
};

SituationVideoViewer.propTypes = {
  videoInProgress: PropTypes.bool,
  videoEmbedCode: PropTypes.string,
  eventTitle: PropTypes.string,
  hasSponsor: PropTypes.number, // number 0 or 1 treated as boolean
  sponsorLogoURL: PropTypes.string,
  sponsorLinkURL: PropTypes.string,

  additionalFeeds: PropTypes.array,
  starShareAvailable: PropTypes.bool.isRequired,
  initialStreamCode: PropTypes.string,
  initialStreamURL: PropTypes.string,

  hasAdditionalFeeds: PropTypes.bool.isRequired,
};

export default SituationVideoViewer;
