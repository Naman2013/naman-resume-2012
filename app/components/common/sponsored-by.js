import React from 'react';
import PropTypes from 'prop-types';
import './common.scss';

const SponsoredBy = ({ sponsorLogoURL, sponsorLinkURL }) =>
  <div className="sponsored">
    <div>Sponsored by:</div>
    <a href={sponsorLinkURL} rel="noopener noreferrer" target="_blank">
      <img alt="Sponsored by logo" src={sponsorLogoURL} width={150} />
    </a>
  </div>;

SponsoredBy.propTypes = {
  sponsorLogoURL: PropTypes.string.isRequired,
  sponsorLinkURL: PropTypes.string.isRequired
};

export default SponsoredBy;
