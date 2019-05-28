/** ********************************************
 * V4 Join - Step 3 - Collect Payment Details
 ********************************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import {
  resetLogIn,
  logUserIn,
  logGoogleUserIn,
} from 'app/modules/login/actions';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL,
  JOIN_PAGE_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import { DeviceContext } from 'app/providers/DeviceProvider';
import JoinHeader from './partials/JoinHeader';
import PlanDetailsCard from './partials/PlanDetailsCard';
import { DEFAULT_JOIN_TABS } from './StaticNavTabs';

import styles from './JoinStep3.style';
import messages from './JoinStep3.messages';

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
class JoinStep3 extends Component {
  static propTypes = propTypes;

  state = {
    paymentToken: '',
    redirectInXSecondsOnExpiredSignupRequest: 0,
  };

  componentDidMount() {
    //Listen for a message from the Window/IFrames to capture the ECommerce Hosted Payment Form Messaging
    window.addEventListener('message', this.handleIframeTask);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetLogIn();
  }

  handleIframeTask = e => {
    /* Verify there is data in this event) */
    if (e.data) {
      const paymentMessageData = `${e.data}`;

      let paymentMethod = 'creditcard';
      let paymentNonceTokenData = null;
      console.log(paymentMessageData);
      var paymentDataString = paymentMessageData.split('!952bccf9afe8e4c04306f70f7bed6610');

      console.log(paymentDataString);
      /* make sure the data message we received is an ECommerce Payment Token */
      if (paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_')) {
        //Check to see if the payment token is a credit card payment token or a paypal payment token
        if (
          paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_CREDITCARD__')
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
        console.log('Payment Token:' + paymentNonceTokenData);

        this.setState({ paymentMethod });
        this.setState({ paymentToken: paymentNonceTokenData });
        //console.log('Payment Token!! ' + paymentNonceTokenData);

        /* Process the Customer's Activation and Sign the User into the website */
        const activatePendingCustomerData = {
          paymentMethod,
          paymentToken: paymentNonceTokenData,
          customerId: window.localStorage.getItem('pending_cid'),
          selectedSchoolId: window.localStorage.getItem('selectedSchoolId'),
          isAstronomyClub:
            window.localStorage.getItem('isAstronomyClub') === 'true',
          isClassroom: window.localStorage.getItem('isClassroom') === 'true',
          astronomyClubName: window.localStorage.getItem('astronomyClubName'),
          isAstronomyClubForMembers18AndOver:
            window.localStorage.getItem(
              'isAstronomyClubForMembers18AndOver'
            ) === 'true',
          billingAddressString: paymentDataString[1],
        };
//add string aboc to this //ADD THIS BACK AFTER TESTING
            axios
          .post(
            JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL,
            activatePendingCustomerData
          )
          .then(response => {
            const res = response.data;
            if (!res.apiError) {
              if (res.status === 'success') {
                const { actions } = this.props;

                //Cleanup local localStorage
                window.localStorage.removeItem('pending_cid');
                window.localStorage.removeItem('selectedPlanId');
                window.localStorage.removeItem('selectedSchoolId');
                window.localStorage.removeItem('isAstronomyClub');
                window.localStorage.removeItem('isClassroom');
                window.localStorage.removeItem('astronomyClubName');
                window.localStorage.removeItem(
                  'isAstronomyClubForMembers18AndOver'
                );

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

                  actions.logUserIn(loginDataPayload);
                  browserHistory.push('/');
                } else if (accountCreationType === 'googleaccount') {
                  const loginDataPayload = {
                    googleProfileId: window.localStorage.googleProfileId,
                    googleProfileEmail: window.localStorage.username,
                  };

                  window.localStorage.removeItem('accountCreationType');
                  actions.logGoogleUserIn(loginDataPayload);
                  browserHistory.push('/');
                }
              } else {
                /* process / display error to user */ 
              }
            }
          })
          .catch(err => {
            throw ('Error: ', err);
          });
      }
    }
  }; 

  /* Obtain access to the join api service response and update the  redirectInX Seconds state */
  handleJoinPageServiceResponse = result => {
    /* update the account form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      redirectInXSecondsOnExpiredSignupRequest:
        result.redirectInXSecondsOnExpiredSignupRequest,
    }));
  };

  CountdownRenderer = ({ completed, minutes, seconds }) => {
    if (completed) {
      // Render a completed state
      //console.log('The countdown has completed.....');
      return (
        <Countdown
          date={
            Date.now() + this.state.redirectInXSecondsOnExpiredSignupRequest
          }
          renderer={this.CountdownExpiredRenderer}
          onComplete={this.CountdownExpiredComplete}
        />
      );
    }
    // Render a countdown
    return (
      <p style={{ fontSize: '1.3em', color: 'green' }}>
        <FormattedMessage
          {...messages.SignupRequestExpireTime}
          values={{ minutes, seconds }}
        />
      </p>
    );
  };

  CountdownExpiredRenderer = ({ seconds, completed }) => {
    if (!completed) {
      // Render a countdown to redirect to the homepage
      return (
        <p style={{ fontSize: '1.3em', fontWeight: 'bold', color: 'red' }}>
          <FormattedMessage
            {...messages.SignupRequestExpireTime}
            values={{ seconds }}
          />
        </p>
      );
    }
  };

  CountdownExpiredComplete = () => {
    // console.log('Redirecting the user away from this page....');

    /* reset all browser localstorage data points for the Join flow */
    window.localStorage.removeItem('selectedPlanId');
    window.localStorage.removeItem('accountCreationType');
    window.localStorage.removeItem('join_accountFormDetails');
    window.localStorage.removeItem('googleProfileId');

    browserHistory.push('/');
  };

  render() {
    const { pathname } = this.props;
    const paymentTokenNonce = this.state.paymentToken;

    const selectedPlanId = window.localStorage.getItem('selectedPlanId');

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ callSource: 'providePaymentDetails', selectedPlanId }}
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
                                  .planSelectedBackgroundImageUrl_Mobile
                              : isDesktop
                              ? joinPageRes.selectedSubscriptionPlan
                                  .planSelectedBackgroundImageUrl_Desktop
                              : isTablet
                              ? joinPageRes.selectedSubscriptionPlan
                                  .planSelectedBackgroundImageUrl_Tablet
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
                                  .planSelectedBackgroundImageUrl_Mobile
                              : isDesktop
                              ? joinPageRes.selectedSubscriptionPlan
                                  .planSelectedBackgroundImageUrl_Desktop
                              : isTablet
                              ? joinPageRes.selectedSubscriptionPlan
                                  .planSelectedBackgroundImageUrl_Tablet
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
                          onComplete={this.CountdownComplete}
                        />
                        <div className="inner-container">
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
            </Fragment>
          )}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default JoinStep3;
