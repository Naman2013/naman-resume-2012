import React, { PropTypes } from 'react';
import './common.scss';

const SponsoredBy = ({ sponsorLogoURL, sponsorLinkURL }) =>
  <div className="sponsored">
    <div>Sponsored by:</div>
    <a href={sponsorLinkURL} rel="noopener noreferrer" target="_blank">
      <img alt="Sponsored by logo" src={sponsorLogoURL} height={40} />
    </a>
  </div>;

SponsoredBy.propTypes = {
  sponsorLogoURL: PropTypes.string.isRequired,
  sponsorLinkURL: PropTypes.string.isRequired,
};

export default SponsoredBy;
