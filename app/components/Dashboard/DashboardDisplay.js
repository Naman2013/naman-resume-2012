/***********************************
* V4 Dashboard (new homepage)
*
*
*
***********************************/

import React from 'react';
import Request from 'components/common/network/Request';
import { DASHBOARD_META_DATA } from 'services/dashboard';
import BootstrappedDashboard  from './BootstrappedDashboard';

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
        <BootstrappedDashboard {...serviceResponse} />
      </div>
    )}
  />
);

export default Dashboard;
