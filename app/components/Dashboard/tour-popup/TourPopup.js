import React from 'react';
import Request from '../../../components/common/network/Request';
import { DASHBOARD_TOUR_POPUP } from '../../../services/dashboard';
import ConnectUserAndResponseAccess from '../../../redux/components/ConnectUserAndResponseAccess';
import BootstrappedTourPopup from './BootstrappedTourPopup';

const Tourpopup = user => (
  <Request
    serviceURL={DASHBOARD_TOUR_POPUP}
    method="POST"
    render={({
      serviceResponse,
    }) => (
      <div className="root">
        {serviceResponse.hasPopupDataFlag && <ConnectUserAndResponseAccess
          render={props => (<BootstrappedTourPopup
            {...user}
            {...serviceResponse.popupData}
            validateResponseAccess={props.validateResponseAccess}
          />)}
        />}
      </div>
    )}
  />
);

export default Tourpopup;
