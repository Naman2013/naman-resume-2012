import React, { Component, PropTypes } from 'react';

import AnnouncementBanner from '../components/common/announcement-banner';

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

      </div>
    );
  }
}

export default TelescopeOverview;
