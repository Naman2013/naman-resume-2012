/***********************************
* V4 Live Shows Video Viewer
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { Tabs, TabPanel } from 'react-tabs';
import TelescopeImageViewer from 'components/common/telescope-image-viewer/telescope-image-viewer';
import ShowVideoImageLoader from 'components/common/ShowVideoImageLoader';
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
    handleSelect: func.isRequired,
    selectedTab: number.isRequired,
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

  render() {
    const {
      additionalFeeds,
      EventIconUrl,
      selectedTab,
      handleSelect,
      showStreamCode,
      showStreamURL,
      isScreenMedium,
      isScreenLarge,
      isScreenXLarge,
    } = this.props;

    const width = '100';
    const videoContainerStyle = { width: `${width}%` };

    return (
      <div className="root">
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
                <ShowVideoImageLoader
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
                <ShowVideoImageLoader
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
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShowVideoViewer;
