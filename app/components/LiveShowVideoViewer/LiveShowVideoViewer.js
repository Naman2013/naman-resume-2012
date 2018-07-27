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
import Select from 'react-select';
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

const CustomOption = ({ innerRef, innerProps, children }) => (
  <div ref={innerRef} {...innerProps} className="dropdown-opt">
    <Tab className="react-tabs__option">{children}</Tab>
  </div>
);
CustomOption.tabsRole = 'Tab';

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

  constructor(props) {
    super(props);
    const options = [
      {
        value: 0,
        label: (
          <div>
            <div className="opt-icon" style={getInlineBgStyle(props.EventIconUrl)} />
            <span className="opt-desc">Live Show</span>
          </div>
        )
      },
    ];

    props.additionalFeeds.forEach((feed, i) => {
        options.push({
          value: i + 1,
          label: (
            <div>
              <div className="opt-icon" style={getInlineBgStyle(feed.tabIconURL)} />
              <span className="opt-desc" dangerouslySetInnerHTML={{ __html: feed.tabDesc }} />
            </div>
          )
        });
      });

    this.state = {
      selectedTab: 0,
      options,
    }
  }


  handleSelect = (index) => {
    window.scrollTo(0, 0);
    this.setState({
      selectedTab: index,
    });
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedTab: Number(selectedOption.value),
    });
  }

  render() {
    const {
      additionalFeeds,
      EventIconUrl,
      showStreamCode,
      showStreamURL,
      isScreenMedium,
      isScreenLarge,
      isScreenXLarge,
    } = this.props;

    const {
      options,
      selectedTab,
    } = this.state;
    const width = '100';
    const videoContainerStyle = { width: `${width}%` };

    return (
      <div className="root">
        <Tabs onSelect={this.handleSelect} selectedIndex={selectedTab}>
          {!isScreenXLarge && !isScreenLarge && !isScreenMedium ? (
            <TabList className="tablist">
              <Select
                components={{ Option: CustomOption }}
                defaultValue={options[0]}
                onChange={this.handleChange}
                options={options}
                value={options[selectedTab]}
                isSearchable={false}
                classNamePrefix="react-select"
              />
            </TabList>
          ) : (
            <TabList className="tablist">
              <Tab>
                <div className="show-tab live-show">
                  <div className="tab-icon" style={getInlineBgStyle(EventIconUrl)} />
                </div>
              </Tab>
              {
                additionalFeeds.map(feed => (
                  <Tab key={uniqueId()}>
                    <div className="show-tab">
                      <div className="tab-icon" style={getInlineBgStyle(feed.tabIconURL)} />
                    </div>
                  </Tab>
                ))
              }
            </TabList>
          )}
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
