import React, { Component } from 'react';
import styles from './header.scss';
import DatesSelection from './dates-selection';
import Tips from './tips';

/**
  * Current telescope's header with title, reserve button and a sponsor
  * is used on telescope-details and some other pages (TBD)
  * @param {object} telescope - currently selected telescope
  */
function CurrentSelectionHeader({telescope}) {
    return (
      <div className="current-selection-header">
        <div className="title-container clearfix">

          <div className="telescope-title-container col-md-8">

            <img src={telescope.teleLogoURL} width="48" height="48"/>
            <span className="telescope-title big">{`${telescope.teleName}: ${telescope.teleNameAlt}`}</span>

            <span className="sponsoredby-text">
              Sponsored by:
            </span>
            <a href={telescope.teleSponsorLinkURL} target="_blank">
              <img width="145" className="sponsoredby-logo" src={telescope.teleSponsorLogoURL} />
            </a>

          </div>

        </div>
      </div>
    );
}

export default CurrentSelectionHeader;
