import React from 'react';
import Request from 'components/common/network/Request';
import { DASHBOARD_TOUR_POPUP } from 'services/dashboard';
import HydratedTourpopup  from './HydratedTourpopup';

const Tourpopup = () => (
  <Request
    serviceURL={DASHBOARD_TOUR_POPUP}
    method="POST"
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div className="root">
        {serviceResponse.hasPopupDataFlag ? <HydratedTourpopup {...serviceResponse} /> : null}
        <style jsx>{`

        `}
        </style>
      </div>
    )}
  />
);

export default Tourpopup;
