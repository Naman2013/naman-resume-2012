import HubHeader from 'app/components/common/HubHeader';
import { Nav } from 'app/modules/missions/components/nav';
import React, { Component } from 'react';

export class Missions extends Component {
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getMissions } = this.props;
    getMissions();
  };

  render() {
    const { children, pageSetup, location } = this.props;
    const { pageIconURL, pageTitle, navigationConfig } = pageSetup;
    return (
      <div>
        <HubHeader
          icon={pageIconURL}
          title={pageTitle}
          // renderRightMenu
          showIcon
          renderNav={() => (
            <div className="navigation-bar">
              <Nav items={navigationConfig} location={location} />
            </div>
          )}
        />

        {children}
      </div>
    );
  }
}
