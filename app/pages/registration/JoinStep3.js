/** ********************************************
 * V4 Join - Step 3 - Collect Payment Details
 ********************************************** */
/* eslint-disable */

import React, { Component, Fragment } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';

import { API } from 'app/api';
import { resetLogIn, logUserIn, logGoogleUserIn } from 'app/modules/login/actions';
import { getUserInfo, deleteSessionToken, deleteMarketingTrackingId } from 'app/modules/User';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL,
  JOIN_PAGE_ENDPOINT_URL,
} from 'app/services/registration/registration';
import { DeviceContext } from 'app/providers/DeviceProvider';
import JoinHeader from './partials/JoinHeader';
import PlanDetailsCard from './partials/PlanDetailsCard';
import { DEFAULT_JOIN_TABS, CLASSROOM_JOIN_TABS } from './StaticNavTabs';
import { fireSloohFBPurchaseEvent } from 'app/utils/fb-wrapper';

import styles from './JoinStep3.style';

const propTypes = {
  actions: PropTypes.shape({
    logUserIn: PropTypes.func.isRequired,
    resetLogIn: PropTypes.func.isRequired,
    logGoogleUserIn: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetLogIn,
      logUserIn,
      logGoogleUserIn,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation()
class JoinStep3 extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    //Listen for a message from the Window/IFrames to capture the ECommerce Hosted Payment Form Messaging
    window.addEventListener('message', this.handleIframeTask);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetLogIn();

    window.removeEventListener('message', this.handleIframeTask);
  }

  handleIframeTask = e => {
    /* Verify there is data in this event) */
    if (e.data) {
      const paymentMessageData = `${e.data}`;

      //determine if there is a slooh session token or slooh marketing tracking id
      const { _sloohsstkn, _sloohatid } = getUserInfo();

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

        

        /* Process the Customer's Activation and Sign the User into the website */
        const activatePendingCustomerData = {
          paymentMethod,
          paymentToken: paymentNonceTokenData,
          customerId: window.localStorage.getItem('pending_cid'),
          selectedSchoolId: window.localStorage.getItem('selectedSchoolId'),
          isAstronomyClub:
            window.localStorage.getItem('isAstronomyClub') === 'true',
            clubCodeA: window.localStorage.getItem('clubCodeA'),
            clubCodeB: window.localStorage.getItem('clubCodeB'),
          billingAddressString: paymentDataString[3],
	  // sloohSiteSessionToken: _sloohsstkn,
	  sloohMarketingTrackingId: _sloohatid,
        };

        API.post(
          JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL,
          activatePendingCustomerData
        )
          .then(response => {
            const res = response.data;
            if (!res.apiError) {
              if (res.status === 'success') {
                const { actions } = this.props;

		//fire off the Purchase Facebook Event
		const myCID = window.localStorage.getItem('pending_cid');
		fireSloohFBPurchaseEvent( {
			cid: myCID, 
			planName: res.PlanName,
			planCostInUSD: res.PlanCostInUSD,
		});

                //Cleanup local localStorage
                //cleanup any hidden plan that was accessed now that a plan was redeemed.
                window.localStorage.removeItem('enableHiddenPlanHashCode');

                //cleanup other localstorage elements
                window.localStorage.removeItem('pending_cid');
                window.localStorage.removeItem('selectedPlanId');
                window.localStorage.removeItem('isAstronomyClub');
                window.localStorage.removeItem('clubCodeA');
                window.localStorage.removeItem('clubCodeB');
                // log the user in (userpass or googleaccount logins supported)
                const { accountCreationType } = window.localStorage;
                if (accountCreationType === 'userpass') {
                  const loginDataPayload = {
                    username: window.localStorage.username,
                    pwd: window.localStorage.password,
                  };

                  /* cleanup local storage */
                  window.localStorage.removeItem('accountCreationType');
                  window.localStorage.removeItem('username');
                  window.localStorage.removeItem('password');
                 

                  actions.logUserIn(loginDataPayload, {reload: false}).then(() => {
                    browserHistory.push('/join/purchaseConfirmation/join');
                  });
                } else if (accountCreationType === 'googleaccount') {
                  const loginDataPayload = {
                    googleProfileId: window.localStorage.googleProfileId,
                    googleProfileEmail: window.localStorage.username,
                  };

                  window.localStorage.removeItem('accountCreationType');
                  actions.logGoogleUserIn(loginDataPayload, {reload: false}).then(() => {
                    browserHistory.push('/join/purchaseConfirmation/join');
                  });
                }
              } else {
                /* process / display error to user */
                document
                  .getElementById('embeddedHostedPaymentForm')
                  .contentWindow.captureActivationError(res);
              }
            }
          })
          .catch(err => {
            throw ('Error: ', err);
          });
      }
    }
  };

  CountdownRenderer = ({ completed, minutes, seconds }) => {
    const { t } = this.props;
    if (completed) {
      // Render a completed state
     
      return <div></div>;
    }

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

    // Render a countdown
    return (
      <p style={{ fontSize: '1.3em', color: 'green' }}>
        {t('Ecommerce.SignupRequestExpireTime', { minutes: minutesStr, seconds: secondsStr })}
      </p>
    );
  };

  CountdownExpiredComplete = () => {
   

    /* reset all browser localstorage data points for the Join flow */
    window.localStorage.removeItem('selectedPlanId');
    window.localStorage.removeItem('accountCreationType');
    window.localStorage.removeItem('join_accountFormDetails');
    window.localStorage.removeItem('googleProfileId');

    browserHistory.push('/');
  };

  render() {
    const { pathname } = this.props;

    const selectedPlanId = window.localStorage.getItem('selectedPlanId');
    
    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{
            callSource: 'providePaymentDetails',
            selectedPlanId,
            cid: window.localStorage.getItem('pending_cid'),
            enableHiddenPlanHashCode: window.localStorage.getItem(
              'enableHiddenPlanHashCode'
            ),
          }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({ fetchingContent, serviceResponse: joinPageRes }) => (
            <Fragment>
              {!fetchingContent && (
                <DeviceContext.Consumer>
                  {({ isMobile, isDesktop, isTablet }) => (
                    <Fragment>
                      {joinPageRes.hasSelectedSchool === 'yes' ? (
                        <JoinHeader
                          mainHeading={joinPageRes.pageHeading1}
                          subHeading={joinPageRes.pageHeading2}
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
                      <div className="step-root">
                        <DisplayAtBreakpoint
                          screenMedium
                          screenLarge
                          screenXLarge
                        >
                          <PlanDetailsCard
                            {...joinPageRes.selectedSubscriptionPlan}
                          />
                        </DisplayAtBreakpoint>
                        <div className="section-heading">
                          {joinPageRes.sectionHeading}
                        </div>
                        <Countdown
                          date={
                            Date.now() +
                            joinPageRes.customerHasXSecondsToCompleteSignup
                          }
                          renderer={this.CountdownRenderer}
                          onComplete={this.CountdownExpiredComplete}
                        />
                        <div className="inner-container">
                          <DisplayAtBreakpoint
                            screenMedium
                            screenLarge
                            screenXLarge
                            screenSmall
                          >
                            <iframe
                              id="embeddedHostedPaymentForm"
                              title="PaymentFormLarge"
                              frameBorder="0"
                              style={{ width: '100%'}}
                              src={joinPageRes.hostedPaymentFormURL}
                            />
                          </DisplayAtBreakpoint>

                          {/* {screenSmall && (

                          )} */}
                          {/* <DisplayAtBreakpoint screenSmall>
                            <iframe
                              id="embeddedHostedPaymentForm"
                              title="PaymentFormSmall"
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
            </Fragment>
          )}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default JoinStep3;
