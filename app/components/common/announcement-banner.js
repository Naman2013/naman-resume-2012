import React, { Component, PropTypes } from 'react';

import style from './announcement-banner.scss';

class AnnouncementBanner extends Component {
  render() {
    return(
      <div className={style.annoucementBanner}>
        <p className={style.announcement}>
          Conditions in the Canary Islands right now are GOOD and look to remain optimal throughout the weekend.
        </p>
        <button className={style.button}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
      </div>
    );
  }
}

export default AnnouncementBanner;
