import React, { Component, PropTypes } from 'react';
import styles from './header.scss';
import DatesSelection from './dates-selection';
import Tips from './tips';

/**
  * Current telescope's header with title, reserve button and a sponsor
  * is used on telescope-details and some other pages (TBD)
  * @param {object} telescope - currently selected telescope
  */
class CurrentSelectionHeader extends Component {

  render() {
    const {
      telescopeIcon,
      teleName,
      teleSponsorLinkURL,
      teleSponsorLogoURL,
      instrTelescopeName } = this.props;

    return(
      <div className="current-selection-header">
        <div className="title-container clearfix">

          <div className="telescope-title-container col-md-8">

            <img src={telescopeIcon} width="48" height="48"/>
            <span className="telescope-title big">
              {`${teleName}: ${instrTelescopeName}`}
            </span>

            <span className="sponsoredby-text">
              Sponsored by:
            </span>
            <a href={teleSponsorLinkURL} target="_blank">
              <img width="145" className="sponsoredby-logo" src={teleSponsorLogoURL} />
            </a>

          </div>

        </div>
      </div>
    );
  }
}

CurrentSelectionHeader.propTypes = {
  telescopeIcon: PropTypes.string,
  teleName: PropTypes.string,
  teleSponsorLinkURL: PropTypes.string,
  teleSponsorLogoURL: PropTypes.string,
  instrTelescopeName: PropTypes.string,
};

export default CurrentSelectionHeader;
