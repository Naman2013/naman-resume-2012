/***********************************
 * V4 Dashboard (new homepage)
 *
 *
 *
 ***********************************/

import React from 'react';
import Request from 'app/components/common/network/Request';
import { DASHBOARD_META_DATA } from 'app/services/dashboard';
import BootstrappedDashboard from './BootstrappedDashboard';

const Dashboard = props => (
  <Request
    authenticationRedirect
    serviceURL={DASHBOARD_META_DATA}
    method="POST"
    render={({ fetchingContent, serviceResponse }) => (
      <div className="root">
        <BootstrappedDashboard {...serviceResponse} {...props} />
      </div>
    )}
  />
);

export default Dashboard;
