import React from 'react';
import Request from 'components/common/network/Request';
import { DASHBOARD_META_DATA } from 'services/dashboard';
import HydratedDashboard  from './HydratedDashboard';

const Dashboard = () => (
  <Request
    serviceURL={DASHBOARD_META_DATA}
    method="POST"
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div className="root">
        <HydratedDashboard {...serviceResponse} />
        <style jsx>{`

        `}
        </style>
      </div>
    )}
  />
);

export default Dashboard;
