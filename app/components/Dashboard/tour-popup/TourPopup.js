import React from 'react';
import Request from 'components/common/network/Request';
import { DASHBOARD_TOUR_POPUP } from 'services/dashboard';
import ConnectUserAndResponseAccess from 'redux/components/ConnectUserAndResponseAccess';
import BootstrappedTourPopup from './BootstrappedTourPopup';

const Tourpopup = () => (
  <Request
    serviceURL={DASHBOARD_TOUR_POPUP}
    method="POST"
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div className="root">
        {serviceResponse.hasPopupDataFlag ? <ConnectUserAndResponseAccess
          render={props => (<BootstrappedTourPopup
            user={props.user}
            validateResponseAccess={props.validateResponseAccess}
            {...serviceResponse.popupData}
          />)}
        /> : null}
        <style jsx>{`

        `}
        </style>
      </div>
    )}
  />
);

export default Tourpopup;
