/** *********************************
 * V4 Live Shows Video Viewer
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { Tab, Tabs, TabList } from 'react-tabs';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import styles from './LiveShowVideoViewerNav.style';
import messages from './LiveShowVideoViewer.messages';

const {
  any, arrayOf, bool, func, number, oneOfType, shape, string,
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

class LiveShowVideoViewerNav extends Component {
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

  constructor(props) {
    super(props);
    const options = [
      {
        value: 0,
        label: (
          <div>
            <div className="opt-icon" style={getInlineBgStyle(props.EventIconUrl)} />
            <span className="opt-desc">
              <FormattedMessage {...messages.LiveShow} />
            </span>
          </div>
        ),
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
        ),
      });
    });

    this.state = {
      options,
    };
  }

  handleChange = (selectedOption) => {
    this.props.handleSelect(Number(selectedOption.value));
  };
  
  render() {
    const {
      additionalFeeds,
      EventIconUrl,
      selectedTab,
      showStreamCode,
      showStreamURL,
      isScreenMedium,
      isScreenLarge,
      isScreenXLarge,
    } = this.props;

    const { options } = this.state;
    return (
      <div className="root">
        <Tabs onSelect={this.props.handleSelect} selectedIndex={selectedTab}>
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
                <div className="tab-wrapper">
                  <div className="show-tab live-show">
                    <div className="tab-icon" style={getInlineBgStyle(EventIconUrl)} />
                  </div>
                </div>
              </Tab>
              {additionalFeeds.map((feed, index) => (
                <Tab key={index}>
                  <div className="tab-wrapper">
                    <div className="tab-description">{feed.tabDesc}</div>
                    <div className="show-tab">
                      <div className="tab-icon" style={getInlineBgStyle(feed.tabIconURL)} />
                    </div>
                  </div>
                </Tab>
              ))}
            </TabList>
          )}
        </Tabs>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShowVideoViewerNav;
