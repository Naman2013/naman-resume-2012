/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Live from './Live';
import Recent from './Recent';
import CenterColumn from 'components/common/CenterColumn';
import { seashell } from 'styles/variables/colors_tiles_v4';
import styles from './BootstrappedShow.style';

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

class BootstrappedShow extends Component {
  static propTypes = {
    inProgressFlag: bool,
    previousFlag: bool,
    upcomingFlag: bool,
  };

  static defaultProps = {
    inProgressFlag: false,
    previousFlag: false,
    upcomingFlag: false,
  };


  constructor(props) {
    super();
    this.state = {
      isLiveShow: props.inProgressFlag,
      isUpcomingShow: props.upcomingFlag,
      isRecentShow: props.previousFlag,
    }

    if (props.inProgressFlag) {
      this.configureTimer({
        expires: props.endDate,
        timestamp: props.startDate,
      });
    }

    if (props.upcomingFlag) {
      this.configureTimer({
        expires: props.startDate,
        timestamp: props.serverTime,
      });
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.inProgressFlag !== nextProps.inProgressFlag) {
      this.setState({
        isLiveShow: nextProps.inProgressFlag,
      });

      if (nextProps.inProgressFlag) {
        this.configureTimer({
          expires: nextProps.endDate,
          timestamp: nextProps.startDate,
        });
      }
    }

    if (this.props.upcomingFlag !== nextProps.upcomingFlag) {
      this.setState({
        isUpcomingShow: nextProps.upcomingFlag,
      });
      if (nextProps.upcomingFlag) {
        this.configureTimer({
          expires: nextProps.startDate,
          timestamp: nextProps.serverTime,
        });
      }
    }

    if (this.props.previousFlag !== nextProps.previousFlag) {
      this.setState({
        isRecentShow: nextProps.previousFlag,
      });
    }
  }

  componentWillUnmount() {
    this.tearDown();
  }

  configureTimer({ expires, timestamp }) {
    clearTimeout(this.timerPointer);
    const milliExpires = Number(expires) * 1000;
    const milliTimestamp = Number(timestamp) * 1000;
    const remainingTime = milliExpires - milliTimestamp;
    if (remainingTime > 1000) {
      this.timerPointer = setTimeout(::this.setNextShowState, remainingTime);
    }
  }

  setNextShowState = () => {
    const { isLiveShow, isUpcomingShow, isRecentShow } = this.state;
    if (isLiveShow) {
      this.setState({
        isLiveShow: false,
        isRecentShow: true,
      });
    }

    if (isUpcomingShow) {
      this.setState({
        isLiveShow: true,
        isUpcomingShow: false,
      });
    }
  }

  timerPointer = undefined; // maintains a pointer to the running timer

  tearDown() {
    clearTimeout(this.timerPointer);
  }

  render() {
    // const {} = this.props;
    const {
      isLiveShow,
      isUpcomingShow,
      isRecentShow,
    } = this.state;

    return (
      <div className="root">
        <CenterColumn theme={{ backgroundColor: seashell }}>
          {isLiveShow ? <Live {...this.props} /> : null}
          {isRecentShow ? <Recent {...this.props} /> : null}
          {isUpcomingShow ? <div /> : null}
        </CenterColumn>
        <style jsx>{styles}</style>
      </div>
    )
  }
}


export default BootstrappedShow;
