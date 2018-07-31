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

  state = {
    isLiveShow: this.props.inProgressFlag,
    isUpcomingShow: this.props.upcomingFlag,
    isRecentShow: this.props.previousFlag,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.inProgressFlag !== nextProps.inProgressFlag) {
      this.setState({
        isLiveShow: nextProps.inProgressFlag,
      });
    }

    if (this.props.upcomingFlag !== nextProps.upcomingFlag) {
      this.setState({
        isUpcomingShow: nextProps.upcomingFlag,
      });
    }

    if (this.props.previousFlag !== nextProps.previousFlag) {
      this.setState({
        isRecentShow: nextProps.previousFlag,
      });
    }
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
