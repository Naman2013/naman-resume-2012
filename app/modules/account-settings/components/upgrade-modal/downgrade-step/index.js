// @flow

import React, { Fragment } from 'react';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  UPGRADE_CUSTOMER_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import PlanDetailsCard from 'app/pages/registration/partials/PlanDetailsCard';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';

import { API } from 'app/api';
import { getUserInfo } from 'app/modules/User';
import styles from 'app/pages/registration/JoinStep3.style';
import messages from 'app/pages/registration/JoinStep3.messages';
import '../../../styles.scss';

export const downgradeStepClose = props => {
  //Force the user back to the account settings page, they have opted to downgrade their plan
  props.onHide();
  browserHistory.push('/account-settings/account-details');
  window.location.reload();
}

export const DowngradeStep = (props) => {

  const user = getUserInfo();

  return (
    <>
      <Request
        serviceURL={UPGRADE_CUSTOMER_ENDPOINT_URL}
        requestBody={{
          cid: user.cid,
          at: user.at,
          token: user.token,
          conditionType: props.conditionType,
          selectedPlanId: props.selectedPlan.planID }}
        render={({ fetchingContent, serviceResponse: downgradePageRes }) => (
          <Fragment>
            {!fetchingContent && (
              <DeviceContext.Consumer>
                {({ isMobile, isDesktop, isTablet }) => (
                  <Fragment>
      		          <h1 className="modal-h">{downgradePageRes.pageHeading1}</h1>
                    <div className="step-root">
                      <DisplayAtBreakpoint
                        screenMedium
                        screenLarge
                        screenXLarge
                      >

                      </DisplayAtBreakpoint>
                      <br/>
                      <br/>
                      <p className="modal-p mb-5">{downgradePageRes.statusMessage}</p>
                      <br/>
                      <Btn className='white-button' onClick={() => downgradeStepClose(props)}>Close</Btn>

                    </div>
                  </Fragment>
                )}
              </DeviceContext.Consumer>
            )}
	          <style jsx>{styles}</style>
          </Fragment>
        )}
      />
    </>
  );
};
