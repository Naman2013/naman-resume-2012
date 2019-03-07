import React, { Component } from 'react';
import { Nav } from '../../../../components/common/nav';
import HubHeader from '../../../../components/common/HubHeader';
//import { Spinner } from 'app/components/spinner/index';

//static data
const navigationConfig = [
  {
    title: 'ACCOUNT DETAILS',
    linkURL: 'account-settings/account-details',
  },
  {
    title: 'MY INTERESTS',
    linkURL: 'account-settings/my-interests',
  },
  {
    title: 'ALERT SETTINGS',
    linkURL: 'account-settings/alert-settings',
  },
  {
    title: 'TAKE A TOUR',
    linkURL: 'account-settings/take-a-tour',
  },
];
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
              <Nav items={navigationConfig} location={location} />
            </div>
          )}
        />

        {children}
      </div>
    );
  }
}
