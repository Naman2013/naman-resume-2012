import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';

/**
  * Current telescope's header with title, reserve button and a sponsor
  * is used on telescope-details and some other pages (TBD)
  * @param {object} telescope - currently selected telescope
  */

const propTypes = {
  telescopeIcon: PropTypes.string,
  teleName: PropTypes.string,
  teleSponsorLinkURL: PropTypes.string,
  teleSponsorLogoURL: PropTypes.string,
  instrTelescopeName: PropTypes.string,
};

function CurrentSelectionHeader({
  telescopeIcon,
  teleName,
  teleSponsorLinkURL,
  teleSponsorLogoURL,
  instrTelescopeName,
}) {
  return (
    <div className="current-selection-header">
      <div className="title-container clearfix">
        <div className="telescope-title-container">
          <img alt="" src={telescopeIcon} width="25" height="25" />
          <span className="telescope-title big">{`${teleName}: ${instrTelescopeName}`}</span>

          {teleSponsorLogoURL ? (
            <span className="sponsoredby-text">
              Sponsored by:
              <a href={teleSponsorLinkURL} rel="noopener noreferrer" target="_blank">
                <img alt="" width="145" className="sponsoredby-logo" src={teleSponsorLogoURL} />
              </a>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

CurrentSelectionHeader.propTypes = propTypes;

export default CurrentSelectionHeader;
