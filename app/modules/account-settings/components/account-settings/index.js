import React, { Fragment } from 'react';
import { Nav } from '../../../../components/common/nav';
import HubHeader from '../../../../components/common/HubHeader';
import { sloohLogoAstronaut } from 'app/styles/variables/iconURLs';
import { Spinner } from 'app/components/spinner/index';

//static data
const navigationConfig = [
  {
    title: 'ACCOUNT DETAILS',
    linkURL: '/account-settings/account-details',
  },
  {
    title: 'MY INTERESTS',
    linkURL: '/account-settings/my-interests',
  },
  {
    title: 'ALERT SETTINGS',
    linkURL: '/account-settings/alert-settings',
  },
  {
    title: 'TAKE A TOUR',
    linkURL: '/account-settings/take-a-tour',
  },
];

const AccountSettings = props => {
  const { children, location, isFetching } = props;
  const pageTitle = 'Account Controls';

  return isFetching ? <Spinner loading={isFetching} /> : (
    <Fragment>
      <HubHeader
        showIcon
        title={pageTitle}
        icon={sloohLogoAstronaut}
        renderNav={() => (
          <div className="navigation-bar">
            <Nav
              items={navigationConfig}
              location={location}
              style={{ padding: 0 }}
            />
          </div>
        )}
      />
      {children}
    </Fragment>
  )
};

export { AccountSettings };
