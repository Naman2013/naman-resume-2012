/** *********************************
 * V4 Dashboard Hero
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import styles from './DashboardHeroMobile.style';


class DashboardHeroMobile extends Component {    

  render() {

    return (
    <div ref={div => this.heroContainer = div} className="container">
    </div> 
    );
  }
}

export default DashboardHeroMobile;
