import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Countdown from '../../containers/Countdown';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import SponsoredBy from '../common/sponsored-by';
import { camera } from '../community/tools/community-icon';
import styles from './SituationVideoViewer.scss';

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
      <section className={styles.situationVideoViewerRoot}>

        <header className={styles.liveViewHeader}>
          <h2>{eventTitle}</h2>
          {
            hasSponsor ?
              <SponsoredBy
                sponsorLogoURL={sponsorLogoURL}
                sponsorLinkURL={sponsorLinkURL}
              /> : null
          }
        </header>

        <Tabs onSelect={this.handleSelect} selectedIndex={selectedTab}>

          <TabList className={styles.liveTelescopeTabs}>
            <Tab>
              <h6>Main Show</h6>
              <div className="telescope" />
            </Tab>
            {
              additionalFeeds.map(feed => (
                <Tab>
                  <h6>Feed tab</h6>
                  <div className="telescope" />
                </Tab>
              ))
            }
          </TabList>

          <TabPanel>
            <aside className={styles.liveViewContent}>
              {
                videoInProgress && initialStreamCode && initialStreamURL ?
                  <VideoImageLoader
                    teleStreamCode={initialStreamCode}
                    teleStreamURL={initialStreamURL}
                    teleStreamThumbnailVideoWidth="1000"
                    teleStreamThumbnailVideoHeight="550"
                  />
                  :
                  <Countdown size={150} className="live" lineWidth={10} />
              }
            </aside>
          </TabPanel>

          {
            additionalFeeds.map(feed => (
              <TabPanel>
                <aside className={styles.liveViewContent}>Coming soon</aside>
              </TabPanel>
            ))
          }
        </Tabs>

        <footer className={styles.liveCameraTabs}>
          {
            starShareAvailable ?
              <div className="camera-icon">{camera}</div> : null
          }
          <div className="camera" />
          <div className="camera" />
          <div className="camera" />
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
