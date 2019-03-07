import React, { Component } from 'react';
//import { Nav } from 'app/modules/missions/components/nav';
import HubHeader from '../../../../components/common/HubHeader';
//import { Spinner } from 'app/components/spinner/index';

export class AccountSettings extends Component {
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {};

  render() {
    const { children, location, isFetching } = this.props;
    return (
      <div>
        {/* <Spinner loading={isFetching} /> */}
        <HubHeader
          //icon={pageIconURL}
          //title={pageTitle}
          showIcon
          renderNav={() => (
            <div className="navigation-bar">
              {/* <Nav items={navigationConfig} location={location} /> */}fsdf
            </div>
          )}
        />

        {children}
      </div>
    );
  }
}
