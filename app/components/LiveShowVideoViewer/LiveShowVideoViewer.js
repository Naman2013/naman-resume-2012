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
import { TabPanel } from 'react-tabs';
import TelescopeImageViewer from 'app/components/common/telescope-image-viewer/telescope-image-viewer';
import ShowVideoImageLoader from 'app/components/common/ShowVideoImageLoader';
import styles from './LiveShowVideoViewer.style';

const { arrayOf, bool, func, number, oneOfType, shape, string } = PropTypes;

class LiveShowVideoViewer extends Component {
  static propTypes = {
    additionalFeeds: arrayOf(
      shape({
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
      })
    ),
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
      selectedTab,
      showStreamCode,
      showStreamURL,
    } = this.props;

    const width = '100';
    const videoContainerStyle = { width: `${width}%` };

    const currentFeed = additionalFeeds.find(
      (feed, i) => selectedTab === i + 1
    );

    return (
      <div className="root">
        <TabPanel
          forceRender
          className={classnames({
            'active-tele-tab': selectedTab === 0,
            'inactive-tele-tab': selectedTab !== 0,
          })}
        >
          <div style={videoContainerStyle} className="live-video-container">
            {showStreamCode && showStreamURL ? (
              <ShowVideoImageLoader
                teleStreamCode={showStreamCode}
                teleStreamURL={showStreamURL}
                showVideoControls={1}
                showInfo={1}
                autoplay={1}
              />
            ) : null}
          </div>
        </TabPanel>
        {currentFeed && (
          <TabPanel forceRender className={classnames('active-tele-tab')}>
            <div style={videoContainerStyle} className="live-video-container">
              {currentFeed.imageSourceType === 'video' ? (
                <ShowVideoImageLoader
                  teleStreamCode={currentFeed.videoStreamCode}
                  teleStreamURL={currentFeed.videoStreamURL}
                  cameraSourceType={currentFeed.cameraSourceType}
                  teleSystem={currentFeed.systemId}
                  telePort={currentFeed.SSEport}
                  callSource="situationRoom"
                />
              ) : (
                // else currentFeed.imageSourceType === 'SSE'
                <TelescopeImageViewer
                  teleSystem={currentFeed.systemId}
                  telePort={currentFeed.SSEport}
                  teleId={currentFeed.TelescopeId}
                  obsId={currentFeed.ObsId}
                  domeId={String(currentFeed.DomeId)}
                  teleFade={Number(currentFeed.SSEfade)}
                  clipped={false}
                  missionFormat="none"
                  isInteractive={false}
                  callSource="situationRoom"
                  shouldUseTransitions={false}
                />
              )}
            </div>
          </TabPanel>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShowVideoViewer;
