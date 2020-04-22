import HubHeader from 'app/components/common/HubHeader';
import { Spinner } from 'app/components/spinner/index';
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
    const {
      children,
      pageSetup,
      location,
      isFetching,
      isTelescopeFetching,
    } = this.props;
    const {
      pageIconURL,
      pageTitle,
      navigationConfig,
      calculatingTelescopePrompt,
    } = pageSetup;
    return (
      <div>
        <Spinner
          loading={isFetching || isTelescopeFetching}
          text={isTelescopeFetching && calculatingTelescopePrompt}
        />
        <HubHeader
          icon={pageIconURL}
          title={pageTitle}
          // renderRightMenu
          showIcon
          renderNav={() => (
            <div className="navigation-bar">
              <Nav items={navigationConfig} location={location} getMissions={this.props.getMissions}/>
            </div>
          )}
        />

        {pageTitle && children}
      </div>
    );
  }
}
