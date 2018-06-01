/***********************************
* V4 Dashboard for a signed in user (the new homepage)
*
*
*
***********************************/

import React from 'react';
import Request from 'components/common/network/Request';
import { DASHBOARD_META_DATA } from 'services/dashboard';
import BootstrappedSignedInDashboard  from './BootstrappedSignedInDashboard';

const Dashboard = () => (
  <Request
    authenticationRedirect={true}
    serviceURL={DASHBOARD_META_DATA}
    method="POST"
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div className="root">
        <BootstrappedSignedInDashboard {...serviceResponse} />
        <style jsx>{`

        `}
        </style>
      </div>
    )}
  />
);

export default Dashboard;
