/** *********************************
 * V4 Dashboard Hero Mobile
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import styles from './DashboardHeroMobile.style';


class DashboardHeroMobile extends Component {    

  render() {

    return (
    <div ref={div => this.heroContainer = div} className="mobile-hero-container">
      <style jsx>{styles}</style>
    </div> 
    );
  }
}

export default DashboardHeroMobile;
