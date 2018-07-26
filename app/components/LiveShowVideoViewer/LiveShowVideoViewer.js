/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TelescopeImageViewer from 'components/common/telescope-image-viewer/telescope-image-viewer';
import VideoImageLoader from 'components/common/telescope-image-loader/video-image-loader';
import styles from './LiveShowVideoViewer.style';

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

const getInlineBgStyle = imgUrl => ({
  backgroundImage: `url(${imgUrl})`,
  backgroundSize: '100%',
});

class LiveShowVideoViewer extends Component {
  static propTypes = {
    additionalFeeds: arrayOf(shape({
      DomeId: string,
      ObsId: string,
      PierNumber: string,
      SSEfade: number,
      SSEport: number,
      TelescopeCode: oneOfType([string, number]),
      TelescopeId: string,
      TelescopeName: string,
      cameraSourceType: string,
      canStarShare: bool,
      imageSourceType: string,
      systemId: string,
      tabDesc: string,
      tabIconURL: string,
      videoStreamCode: string,
      videoStreamURL: string,
    })),
    showStreamCode: oneOfType([string, number]),
    showStreamURL: string,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    additionalFeeds: [],
  };

  state = {
    selectedTab: 0,
  }

  handleSelect = (index, last) => {
    window.scrollTo(0, 0);
    this.setState({
      selectedTab: index,
    });
  }

  render() {
    const {
      additionalFeeds,
      eventIconURL,
      showStreamCode,
      showStreamURL,
    } = this.props;

    const {
      selectedTab,
    } = this.state;
    const width = '100';
    const videoContainerStyle = { width: `${width}%` };
    return (
      <div className="root">
        <Tabs onSelect={this.handleSelect} selectedIndex={selectedTab}>
          <TabList className="tablist">
            <Tab>
              <div style={getInlineBgStyle(eventIconURL)} />
            </Tab>
            {
              additionalFeeds.map(feed => (
                <Tab key={uniqueId()}>
                  <div>
                    <h6>{feed.tabDesc}</h6>
                  </div>
                  <div style={getInlineBgStyle(feed.tabIconURL)} />
                </Tab>
              ))
            }
          </TabList>
          <TabPanel
            forceRender={true}
            className={classnames({
              'active-tele-tab': selectedTab === 0,
              'inactive-tele-tab': selectedTab !== 0,
            })}
          >
            <div
              style={videoContainerStyle}
              className="live-video-container"
            >
              {showStreamCode && showStreamURL ? (
                <VideoImageLoader
                  teleStreamCode={showStreamCode}
                  teleStreamURL={showStreamURL}
                  showVideoControls={1}
                  showInfo={1}
                />
              ) : null}
            </div>
          </TabPanel>
          {additionalFeeds.map(feed => (
            <TabPanel
              key={uniqueId()}
            >
              <div style={videoContainerStyle} className="live-video-container">
              {feed.imageSourceType === 'video' ?
                <VideoImageLoader
                  teleStreamCode={feed.videoStreamCode}
                  teleStreamURL={feed.videoStreamURL}
                  cameraSourceType={feed.cameraSourceType}
                  teleSystem={feed.systemId}
                  telePort={feed.SSEport}
                  callSource="situationRoom"

                />
              : // else feed.imageSourceType === 'SSE'
                <TelescopeImageViewer
                  teleSystem={feed.systemId}
                  telePort={feed.SSEport}
                  teleId={feed.TelescopeId}
                  obsId={feed.ObsId}
                  domeId={String(feed.DomeId)}
                  teleFade={Number(feed.SSEfade)}
                  clipped={false}
                  missionFormat="none"
                  isInteractive={false}
                  callSource="situationRoom"
                />
              }
              </div>
            </TabPanel>
          ))}
        </Tabs>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShowVideoViewer;
