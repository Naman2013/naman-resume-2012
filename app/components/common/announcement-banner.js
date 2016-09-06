import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import style from './announcement-banner.scss';

class AnnouncementBanner extends Component {
  render() {

    const displayBannerStyles = classnames({
      hide: !this.props.display,
      announcementBanner: true
    });

    return(
      <div className={displayBannerStyles}>
        <p className={style.announcement}>
          Conditions in the Canary Islands right now are GOOD and look to remain optimal throughout the weekend.
        </p>
        <button
          onClick={this.props.closeBanner}
          className={style.button}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </div>
    );
  }
}

export default AnnouncementBanner;
