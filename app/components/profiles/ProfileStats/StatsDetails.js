/** *********************************
 * V4 Stats Details
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

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
    const { text, buttonLinkUrl, buttonText } = this.props;

    return (
      <div className="stats-details">
        <div className="stats-details-text">{text}</div>
        <Link to={buttonLinkUrl}>
          <Button text={buttonText} theme={{ marginTop: '15px' }} />
        </Link>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default StatsDetails;
