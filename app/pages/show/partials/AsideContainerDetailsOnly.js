/***********************************
* V4 Aside content for shows
* this will hold the three tab nav on desktop
* and will never be shown on tablet/mobile
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop'
import BigBoxInfoContainer from './BigBoxInfoContainer';
import ThreeTabbedNav from 'components/ThreeTabbedNav';
import TwoTabbedNav from 'components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import AboutTab from './AboutTab';
import CommentsTab from './CommentsTab';
import DetailsTab from './DetailsTab';
import styles from './AsideContainerDetailsOnly.style';

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

class AsideContainerDetailsOnly extends Component {
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
    } = this.props;

    const {

    } = this.state;

    return (
      <div className="root">
        <DetailsTab {...this.props} />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AsideContainerDetailsOnly;
