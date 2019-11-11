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
import { getUserInfo, storeUserNewAT } from 'app/modules/User';
import { resetLogIn } from 'app/modules/login/actions';
import { useTranslation } from 'react-i18next';

import styles from 'app/pages/registration/JoinStep3.style';

const CountdownRenderer = ({ completed, minutes, seconds, t }) => {
  if (completed) {
    // Render a completed state
    //console.log('The countdown has completed.....');
    return <div></div>;
  }
  // Render a countdown
  return (
    <p
      style={{ backgroundColor: '#f2f2f2', fontSize: '1.3em', color: 'green' }}
    >
      {t('Ecommerce.SignupRequestExpireTimeOnUpgrade', { minutes, seconds })}
    </p>
  );
};

const CountdownExpiredComplete = () => {
  // console.log('Redirecting the user away from this page....');

  /* reset all browser localstorage data points for the Join flow */
  window.localStorage.removeItem('selectedPlanId');
  window.localStorage.removeItem('accountCreationType');
  window.localStorage.removeItem('join_accountFormDetails');
  window.localStorage.removeItem('googleProfileId');
  browserHistory.push('/');
  window.location.reload();
};

const handleIframeTaskUpgrade = e => {
  /* Verify there is data in this event) */
  if (e.data) {
    const paymentMessageData = `${e.data}`;

    let paymentMethod = 'creditcard';
    let paymentNonceTokenData = null;
    //console.log(paymentMessageData);
    let paymentDataString = paymentMessageData.split(
      '!952bccf9afe8e4c04306f70f7bed6610'
    );

    //console.log(paymentDataString);
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
      //console.log('Payment Token:' + paymentNonceTokenData);

      //console.log('Payment Token!! ' + paymentNonceTokenData);

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
        isAstronomyClub:
          window.localStorage.getItem('isAstronomyClub') === 'true',
        astronomyClubName: window.localStorage.getItem('astronomyClubName'),
        isAstronomyClubForMembers18AndOver:
          window.localStorage.getItem('astronomyClub18AndOver') === 'true',
        isClassroom: window.localStorage.getItem('isClassroom') === 'true',
        selectedSchoolId: window.localStorage.getItem('selectedSchoolId'),
      };
      //add string aboc to this //ADD THIS BACK AFTER TESTING
      API.post(UPGRADE_CUSTOMER_ENDPOINT_URL, upgradeCustomerData)
        .then(response => {
          const res = response.data;
          if (!res.apiError) {
            if (res.status === 'success') {
              //Cleanup local localStorage
              window.localStorage.removeItem('pending_cid');
              window.localStorage.removeItem('selectedPlanId');
              window.localStorage.removeItem('selectedSchoolId');
              window.localStorage.removeItem('isAstronomyClub');
              window.localStorage.removeItem('isClassroom');
              window.localStorage.removeItem('astronomyClubName');
              window.localStorage.removeItem('astronomyClub18AndOver');

              /* cleanup local storage */
              window.localStorage.removeItem('accountCreationType');
              window.localStorage.removeItem('username');
              window.localStorage.removeItem('password');

              //upgradeCustomer needs to return new "AT"
              //reset the AT cookie so all sub-sequent APIs use the new Account Type in their Request Params
              storeUserNewAT({
                at: res.newAccountTypeNbr,
              });

              //actions.logUserIn(loginDataPayload);

	      //let confirmationPageURL = '/join/purchaseConfirmation/' + res.conditionType;
              //browserHistory.push( confirmationPageURL );
              this.props.closeModal();
		          browserHistory.push('/');
		          // closing modal on success

	     }
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    } //end token payment decision processing (credit card vs. paypal)
  } //end e.data
}; //end handleIframeTaskUpgrade

type TPaymentStep = { selectedPlan?: Shape };

export const PaymentStep = (props: TPaymentStep) => {
  const { selectedPlan, conditionType } = props;
  const selectedPlanId = selectedPlan.planID;
  const { t } = useTranslation();
  const pathname = '';

  const user = getUserInfo();

  //Listen for a message from the Window/IFrames to capture the ECommerce Hosted Payment Form Messaging
  window.removeEventListener('message', () => handleIframeTaskUpgrade());
  window.addEventListener('message', () => handleIframeTaskUpgrade());

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
          isAstronomyClub: window.localStorage.getItem('isAstronomyClub') === 'true',
          astronomyClubName: window.localStorage.getItem('astronomyClubName'),
          astronomyClub18AndOver: window.localStorage.getItem(
            'astronomyClub18AndOver'
          ) === 'true',
          isClassroom: window.localStorage.getItem('isClassroom') === 'true',
          selectedSchoolId: window.localStorage.getItem('selectedSchoolId'),
        }}
        render={({ fetchingContent, serviceResponse: joinPageRes }) => (
          <Fragment>
            {!fetchingContent && (
              <DeviceContext.Consumer>
                {({ isMobile, isDesktop, isTablet }) => (
                  <Fragment>
                    <h1 className="modal-h">{joinPageRes.pageHeading1}</h1>
                    <p className="modal-p mb-5">{joinPageRes.pageHeading2}</p>
                    {joinPageRes.hasSelectedSchool === 'yes' ? (
                      <JoinHeader
                        mainHeading={joinPageRes.pageHeading1}
                        subHeading={joinPageRes.pageHeading2}
                        showHeading={false}
                        showTabs={false}
                        activeTab={pathname}
                        tabs={CLASSROOM_JOIN_TABS}
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
                      />
                    ) : (
                      <JoinHeader
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
                      />
                    )}
                    <div style={{ marginTop: '-100px' }} className="step-root">
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
                          onComplete={CountdownExpiredComplete}
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
                        >
                          <iframe
                            frameBorder="0"
                            style={{ width: '100%', minHeight: '750px' }}
                            src={joinPageRes.hostedPaymentFormURL}
                          />
                        </DisplayAtBreakpoint>

                        <DisplayAtBreakpoint screenSmall>
                          <iframe
                            frameBorder="0"
                            style={{ width: '100%', minHeight: '850px' }}
                            src={joinPageRes.hostedPaymentFormURL}
                          />
                        </DisplayAtBreakpoint>
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
