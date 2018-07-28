/***********************************
* V4 Observations Page
*
*
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

class LiveShowMainContent extends Component {
  static propTypes = {
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
      isScreenMedium,
      isScreenLarge,

    } = this.props;

    const {

    } = this.state;

    return (
      <div className="root">
        {isScreenLarge ? (
          <div>
            <BigBoxInfoContainer {...this.props} />
          </div>
        ) : (
          <div></div>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShowMainContent;
