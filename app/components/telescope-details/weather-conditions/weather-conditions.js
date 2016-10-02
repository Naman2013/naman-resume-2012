import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import './weather-conditions.scss';

import Progress from 'react-progressbar';

class WeatherConditions extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
  };

  state = {
    activeTabIdx: 0,
  };

  setTabIdx(activeTabIdx) {
    return () => {
      this.setState({ activeTabIdx });
    };
  }

  render() {
    const { tabs } = this.props;
    const { activeTabIdx } = this.state;

    let tab = null;
    if (activeTabIdx >= 0) {
      tab = tabs[activeTabIdx];
    }

    return(
      <div className="telescope-block weather-conditions">
        <div className="top">
          <h3>Advanced Weather and Conditions</h3>
          <p>The stats, forecasts, and live local views of the Canary Islands location on Tenerife.</p>
        </div>
        <div className="content-wrapper">
          <div className="weather-conditions-controls">
            {tabs.map((tab, tabIdx) => (
              <button
                key={tabIdx}
                className={cx({
                  active: tabIdx === activeTabIdx,
                })}
                onClick={::this.setTabIdx(tabIdx)}
              >{tab.title}</button>
            ))}
          </div>
          <div className="weather-conditions-feed">
            <img
              src="/assets/images/icons/icon-white-screen-view.png"
              className="screen-view"
            />

            {tab && (
              <img
                src={tab.src}
                alt={tab.title}
                width="784"
                height="503"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherConditions;
