import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Progress from 'react-progressbar';
import moment from 'moment';
import './live-webcam.scss';

class LiveWebcam extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    time: PropTypes.object.isRequired,
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
    const { time, tabs } = this.props;
    const { activeTabIdx } = this.state;

    let tab = null;
    if (activeTabIdx >= 0) {
      tab = tabs[activeTabIdx];
    }

    return(
      <div className="telescope-block live-webcam">
        <div className="top">
          <h3>Canary Islands Observatories LIVE Webcam</h3>
          <p>Use the navigation below to change the view to a different direction.</p>
          <img className="topLogo" src={'assets/images/graphics/logo-iac.png'} />
        </div>
        <div className="live-webcam-feed">
          {tab && (
            <img
              src={tab.src}
              alt={tab.title}
              width="820"
              height="438"
            />
          )}

          <div className="live-feed-footer">
            <div className="row">
              <div className="col-md-6">
                {moment(time).format('DD/MM/YYYY HH:mm:ss')}
              </div>
              <div className="col-md-6 feed-controls">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveWebcam;
