import React, { Component, PropTypes } from 'react';

import AnnouncementBanner from '../components/common/announcement-banner';
import TelescopeFilterNav from '../components/telescope-overview/telescope-filter-nav';
import ObservatoryHero from '../components/telescope-overview/observatory-hero';

class TelescopeOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayBanner: true
    };
  }

  closeBanner() {
    this.setState({
      displayBanner: false
    });
  }

  render() {
    return(
      <div>

        <AnnouncementBanner
          display={this.state.displayBanner}
          closeBanner={this.closeBanner.bind(this)} />

        <TelescopeFilterNav />

        <ObservatoryHero />

      </div>
    );
  }
}

export default TelescopeOverview;
