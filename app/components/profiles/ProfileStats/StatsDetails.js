/** *********************************
 * V4 Stats Details
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import GuideTile from 'app/components/common/tiles/guide-tile';
import Button from '../../common/style/buttons/Button';
import styles from './StatsDetails.styles';

const { string } = PropTypes;

class StatsDetails extends Component {
  static propTypes = {
    text: string.isRequired,
    buttonLinkUrl: string.isRequired,
    buttonText: string.isRequired,
  };

  state = {};

  render() {
    const { userInfoGuideDetails } = this.props;
    const { guideTitleDisplay, headerText, linkUrl } = userInfoGuideDetails;
    return (
      <div className="stats-details">
        <GuideTile
          title={headerText}
          subTitle={guideTitleDisplay}
          linkUrl={linkUrl}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default StatsDetails;
