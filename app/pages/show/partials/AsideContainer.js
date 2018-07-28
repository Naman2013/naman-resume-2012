/***********************************
* V4 Aside content for shows
* this will hold the three tab nav on desktop
* and will never be shown on tablet/mobile
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigBoxInfoContainer from './BigBoxInfoContainer';
import styles from './MainContent.style';

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

class LiveShowAsideContent extends Component {
  static propTypes = {
    aboutIsActive: bool.isRequired,
    commentsIsActive: bool.isRequired,
    detailsIsActive: bool.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
  };

  state = {

  }



  render() {
    const {
      aboutIsActive,
      commentsIsActive,
      detailsIsActive,
      isScreenMedium,
      isScreenLarge,

    } = this.props;

    const {

    } = this.state;

    return (
      <div className="root">
        {aboutIsActive ? <div></div> : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShowAsideContent;
