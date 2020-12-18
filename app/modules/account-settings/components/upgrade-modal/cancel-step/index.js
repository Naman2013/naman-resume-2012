// @flow

import React, { Fragment } from 'react';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { CANCEL_CUSTOMER_ENDPOINT_URL } from 'app/services/registration/registration.js';
import PlanDetailsCard from 'app/pages/registration/partials/PlanDetailsCard';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';

import { API } from 'app/api';
import { getUserInfo } from 'app/modules/User';
import styles from 'app/pages/registration/JoinStep3.style';
import '../../../styles.scss';
import { destroySession, removeUser } from 'app/modules/User';


export const cancelStepClose = (props, cancellationRequiresLogout) => {
  //Force the user back to the account settings page, they have opted to cancel their plan
  if (cancellationRequiresLogout === true) {
    destroySession();
    removeUser();
    props.onHide();
    browserHistory.push('/');
    window.location.reload();

  } else {
    props.onHide();
    browserHistory.push('/account-settings/account-details');
    window.location.reload();

  }

};

export const CancelStep = props => {
  const user = getUserInfo();

  return (
    <>
      <Request
        serviceURL={CANCEL_CUSTOMER_ENDPOINT_URL}
        requestBody={{ cid: user.cid, at: user.at, token: user.token }}
        render={({ fetchingContent, serviceResponse: cancelPageRes }) => (
          <Fragment>
            {!fetchingContent && (
              <DeviceContext.Consumer>
                {({ isMobile, isDesktop, isTablet }) => (
                  <Fragment>
                    <h1 className="modal-h">{cancelPageRes.pageHeading1}</h1>
                    <div className="step-root">
                      <DisplayAtBreakpoint
                        screenMedium
                        screenLarge
                        screenXLarge
                      ></DisplayAtBreakpoint>
                      <br />
                      <br />
                      <p className="modal-p mb-5">
                        {cancelPageRes.statusMessage}
                      </p>
                      <br />
                      <Btn
                        className="white-button"
                        onClick={() => cancelStepClose(props, cancelPageRes.cancellationRequiresLogout)}
                      >
                        Close
                      </Btn>
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
