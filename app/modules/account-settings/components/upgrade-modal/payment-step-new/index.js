// @flow
/* eslint-disable */

import React, { Fragment } from 'react';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  JOIN_PAGE_ENDPOINT_URL,
  UPGRADE_CUSTOMER_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import { DeviceContext } from 'app/providers/DeviceProvider';
import JoinHeader from 'app/pages/registration/partials/JoinHeader';
import PlanDetailsCard from 'app/pages/registration/partials/PlanDetailsCard';
import { DEFAULT_JOIN_TABS } from 'app/pages/registration/StaticNavTabs';
import Countdown from 'react-countdown-now';
import { browserHistory } from 'react-router';
import { API } from 'app/api';
import { getUserInfo, deleteSessionToken, deleteMarketingTrackingId } from 'app/modules/User';
import { resetLogIn } from 'app/modules/login/actions';
import { useTranslation } from 'react-i18next';
import { fireSloohFBPurchaseEvent } from 'app/utils/fb-wrapper';
import fireSloohGAPageview from 'app/utils/ga-wrapper';
import styles from 'app/pages/registration/JoinStep3.style';

const CountdownRenderer = ({ completed, minutes, seconds, t }) => {
  if (completed) {
    // Render a completed state
   
    return <div></div>;
  }
  // Render a countdown

    let minutesStr = parseInt(minutes);
    if (minutes < 1) {
	//make sure the minutes does not have a leading zero where needed.
	minutesStr = parseInt(minutes);
    }

    let secondsStr = parseInt(seconds);
    if (seconds < 10) {
	//make sure the seconds has a leading zero where needed.
	secondsStr = "0" + parseInt(seconds);
    }

  return (
    <p
      style={{ backgroundColor: '#f2f2f2', fontSize: '1.3em', color: 'green' }}
    >
      {t('Ecommerce.SignupRequestExpireTimeOnUpgrade', { minutes: minutesStr, seconds: secondsStr })}
    </p>
  );
};

const CountdownExpiredComplete = (props) => {
  
  props.closeModal();
  /* reset all browser localstorage data points for the Join flow */
  // window.localStorage.removeItem('selectedPlanId');
  // window.localStorage.removeItem('accountCreationType');
  // window.localStorage.removeItem('join_accountFormDetails');
  // window.localStorage.removeItem('googleProfileId');
  // browserHistory.push('/');
  // window.location.reload(); 
  
};

const handleIframeTaskUpgrade = (e, props) => {
  /* Verify there is data in this event) */
  if (e.data) {
    const paymentMessageData = `${e.data}`;

    let paymentMethod = 'creditcard';
    let paymentNonceTokenData = null;
  
    let paymentDataString = paymentMessageData.split(
      '!952bccf9afe8e4c04306f70f7bed6610'
    );

   
    /* make sure the data message we received is an ECommerce Payment Token */
    if (paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_')) {
      //Check to see if the payment token is a credit card payment token or a paypal payment token
      if (
        paymentDataString[0].startsWith(
          '__ECOMMERCE_PAYMENT_TOKEN_CREDITCARD__'
        )
      ) {
        paymentNonceTokenData = String.prototype.replace.call(
          paymentDataString[0],
          '__ECOMMERCE_PAYMENT_TOKEN_CREDITCARD__',
          ''
        );
        paymentMethod = 'creditcard';
      } else if (
        paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_PAYPAL__')
      ) {
        paymentNonceTokenData = String.prototype.replace.call(
          paymentDataString[0],
          '__ECOMMERCE_PAYMENT_TOKEN_PAYPAL__',
          ''
        );

        paymentMethod = 'paypal';
      }
    

      //determine if there is a sslooh marketing tracking id
      const { _sloohatid } = getUserInfo();

      /* Process the Customer's Activation and Sign the User into the website */
      const upgradeCustomerData = {
        cid: getUserInfo().cid,
        at: getUserInfo().at,
        token: getUserInfo().token,
        customerId: getUserInfo().cid,
        selectedPlanId: paymentDataString[1],
        conditionType: paymentDataString[2],
        paymentMethod,
        paymentToken: paymentNonceTokenData,
        billingAddressString: paymentDataString[3],
        isAstronomyClub: window.localStorage.getItem('isAstronomyClub') === 'true',
	sloohMarketingTrackingId: _sloohatid,
      };
      //add string aboc to this //ADD THIS BACK AFTER TESTING
      API.post(UPGRADE_CUSTOMER_ENDPOINT_URL, upgradeCustomerData)
        .then(response => {
          const res = response.data;
          if (!res.apiError) {
            if (res.status === 'success') {
              
              fireSloohGAPageview({ pagePath: "/join/purchaseConfirmation/" + res.conditionType });	

              //fire off the Purchase Facebook Event
              fireSloohFBPurchaseEvent( {
                cid: getUserInfo().cid, 
                planName: res.PlanName,
                planCostInUSD: res.PlanCostInUSD,
              });

		//clean up any session or marketing tracking id
		deleteSessionToken();
		deleteMarketingTrackingId();

              //Cleanup local localStorage
              window.localStorage.removeItem('pending_cid');
              window.localStorage.removeItem('selectedPlanId');
              window.localStorage.removeItem('isAstronomyClub');

              /* cleanup local storage */
              window.localStorage.removeItem('accountCreationType');
              window.localStorage.removeItem('username');
              window.localStorage.removeItem('password');

              //upgradeCustomer needs to return new "AT"
              //reset the AT cookie so all sub-sequent APIs use the new Account Type in their Request Params
              props.storeUserNewAT(res.newAccountTypeNbr).then(() => {
                props.onSuccess(res);
              //   props.closeModal(true);

              //  let confirmationPageURL = '/join/purchaseConfirmation/' + res.conditionType;
              //  browserHistory.push( confirmationPageURL );

               //browserHistory.push('/');
              });
            }
	    else {
	            /* process / display error to user */
        	    document
            		.getElementById('embeddedHostedPaymentForm')
			.contentWindow.captureActivationError(res);
	    }
          }
          else{
            props.onError(res);
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    } //end token payment decision processing (credit card vs. paypal)
  } //end e.data
}; //end handleIframeTaskUpgrade

type TPaymentStep = { selectedPlan?: Shape };

export const PaymentStepNew = (props: TPaymentStep) => {
  const { selectedPlan, conditionType} = props;
  const selectedPlanId = selectedPlan.planID;
  const { t } = useTranslation();
  const pathname = '';

  const user = getUserInfo();

  //Listen for a message from the Window/IFrames to capture the ECommerce Hosted Payment Form Messaging
  window.removeEventListener('message', e => handleIframeTaskUpgrade(e, props));
  window.addEventListener('message', e => handleIframeTaskUpgrade(e, props));

  return (
    <>
      <Request
        serviceURL={JOIN_PAGE_ENDPOINT_URL}
        requestBody={{
          callSource: 'providePaymentDetails',
          cid: user.cid,
          at: user.at,
          token: user.token,
          selectedPlanId,
          conditionType,
          isAstronomyClub:
            window.localStorage.getItem('isAstronomyClub') === 'true'
        }}
        render={({ fetchingContent, serviceResponse: joinPageRes }) => (
          <Fragment>
            {!fetchingContent && (
              <DeviceContext.Consumer>
                {({ isMobile, isDesktop, isTablet }) => (
                  <Fragment>
                    <h1 className="modal-h">{joinPageRes.pageHeading1}</h1>
                    <p className="modal-p mb-5">{joinPageRes.pageHeading2}</p>
                      {/* <JoinHeader
                        mainHeading={joinPageRes.pageHeading1}
                        subHeading={joinPageRes.pageHeading2}
                        showHeading={false}
                        showTabs={false}
                        activeTab={pathname}
                        tabs={DEFAULT_JOIN_TABS}
                        backgroundImage={
                          isMobile
                            ? joinPageRes.selectedSubscriptionPlan
                                ?.planSelectedBackgroundImageUrl_Mobile
                            : isDesktop
                            ? joinPageRes.selectedSubscriptionPlan
                                ?.planSelectedBackgroundImageUrl_Desktop
                            : isTablet
                            ? joinPageRes.selectedSubscriptionPlan
                                ?.planSelectedBackgroundImageUrl_Tablet
                            : ''
                        }
                      /> */}
                    <div 
                    // style={{ marginTop: '-100px' }} 
                    className="step-root-new">
                      <DisplayAtBreakpoint
                        screenMedium
                        screenLarge
                        screenXLarge
                      >
                        <PlanDetailsCard
                          {...joinPageRes.selectedSubscriptionPlan}
                        />
                      </DisplayAtBreakpoint>
                      <div
                        style={{ backgroundColor: '#f2f2f2' }}
                        className="section-heading"
                      >
                        {joinPageRes.sectionHeading}
                      </div>
                      <div
                        style={{
                          minWidth: '100%',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          textAlign: 'center',
                        }}
                      >
                        <Countdown
                          date={
                            Date.now() +
                            joinPageRes.customerHasXSecondsToCompleteSignup
                          }
                          renderer={cprops => (
                            <CountdownRenderer {...cprops} t={t} />
                          )}
                          onComplete={() => CountdownExpiredComplete(props) }
                        />
                      </div>
                      <div
                        style={{ backgroundColor: '#f2f2f2' }}
                        className="inner-container"
                      >
                        <DisplayAtBreakpoint
                          screenMedium
                          screenLarge
                          screenXLarge
                          screenSmall
                        >
                          <iframe
			                      id="embeddedHostedPaymentForm"
                            frameBorder="0"
                            style={{ width: '100%'}}
                            src={joinPageRes.hostedPaymentFormURL}
                          />
                        </DisplayAtBreakpoint>

                        {/* <DisplayAtBreakpoint screenSmall>
                          <iframe
                            frameBorder="0"
                            style={{ width: '100%', minHeight: '850px' }}
                            src={joinPageRes.hostedPaymentFormURL}
                          />
                        </DisplayAtBreakpoint> */}
                      </div>
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
/* eslint-enable */
