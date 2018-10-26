/** ********************************************
* V4 Join - Step 3 - Collect Payment Details
********************************************** */

import React, { Component , cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { resetLogIn, logUserIn, logGoogleUserIn } from 'modules/login/actions';
import Request from 'components/common/network/Request';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import JoinHeader from './partials/JoinHeader';
import { JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL, JOIN_PAGE_ENDPOINT_URL } from 'services/registration/registration.js';
import PlanDetailsCard from './partials/PlanDetailsCard';
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
  actions: bindActionCreators({
    resetLogIn,
    logUserIn,
    logGoogleUserIn,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class JoinStep3 extends Component  {
  static propTypes = propTypes;

  state = {
    'paymentToken': '',
    'redirectInXSecondsOnExpiredSignupRequest': 0,
  };

  componentDidMount() {
    //Listen for a message from the Window/IFrames to capture the ECommerce Hosted Payment Form Messaging
    window.addEventListener('message', this.handleIframeTask);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetLogIn();
  }

  handleIframeTask = (e) => {
    /* Verify there is data in this event) */
    if (e.data) {
      const paymentMessageData = e.data + '';

      /* make sure the data message we received is an ECommerce Payment Token */
      if (paymentMessageData.startsWith('__ECOMMERCE_PAYMENT_TOKEN__')) {
        const paymentNonceTokenData = String.prototype.replace.call(paymentMessageData, '__ECOMMERCE_PAYMENT_TOKEN__', '');
        this.setState( { 'paymentToken': paymentNonceTokenData });
        //console.log('Payment Token!! ' + paymentNonceTokenData);

        /* Process the Customer's Activation and Sign the User into the website */
        const activatePendingCustomerData = {
          paymentToken: paymentNonceTokenData,
          customerId: window.localStorage.getItem('pending_cid'),
          selectedSchoolId: window.localStorage.getItem('selectedSchoolId'),
          isAstronomyClub: window.localStorage.getItem('isAstronomyClub') === "true" ? true : false,
          isClassroom: window.localStorage.getItem('isClassroom') === "true" ? true : false,
          astronomyClubName: window.localStorage.getItem('astronomyClubName'),
          isAstronomyClubForMembers18AndOver: window.localStorage.getItem('isAstronomyClubForMembers18AndOver')  === "true" ? true : false,
        };

        axios.post(JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL, activatePendingCustomerData)
          .then((response) => {
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
                window.localStorage.removeItem('isAstronomyClubForMembers18AndOver');

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
          .catch((err) => {
            throw ('Error: ', err);
          });
      }
    }
  }

  /* Obtain access to the join api service response and update the  redirectInX Seconds state */
  handleJoinPageServiceResponse = (result) => {
      /* update the account form details state so the correct hinText will show on each form field */
      this.setState(() => ({
        redirectInXSecondsOnExpiredSignupRequest: result.redirectInXSecondsOnExpiredSignupRequest,
      }));
  }

  CountdownRenderer = ({
    completed,
    minutes,
    seconds,
  }) => {
    if (completed) {
      // Render a completed state
      //console.log('The countdown has completed.....');
      return <Countdown date={Date.now() + this.state.redirectInXSecondsOnExpiredSignupRequest} renderer={this.CountdownExpiredRenderer} onComplete={this.CountdownExpiredComplete}/>;
    }
    // Render a countdown
    return <p style={{'fontSize': '1.3em', 'color': 'green'}}>This signup request will expire in {minutes}:{seconds}.</p>;
  };

  CountdownExpiredRenderer = ({
    seconds,
    completed,
  }) => {
    if (!completed) {
      // Render a countdown to redirect to the homepage
      return <p style={{'fontSize': '1.3em', 'fontWeight': 'bold', 'color': 'red'}}>Signup request expired...redirecting to the homepage in 00:{seconds}.</p>;
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
  }

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
          render={({
            fetchingContent,
            serviceResponse: joinPageResponse,
          }) => (
            <Fragment>
              {
                !fetchingContent &&
                  <Fragment>
                    <JoinHeader
                      mainHeading={joinPageResponse.pageHeading1}
                      subHeading={joinPageResponse.pageHeading2}
                      activeTab={pathname}
                    />
                    <div className="step-root">
                      <DisplayAtBreakpoint
                        screenMedium
                        screenLarge
                        screenXLarge
                      >
                        <PlanDetailsCard {...joinPageResponse.selectedSubscriptionPlan} />
                      </DisplayAtBreakpoint>
                      <div className="section-heading">{joinPageResponse.sectionHeading}</div>
                      <Countdown date={Date.now() + joinPageResponse.customerHasXSecondsToCompleteSignup} renderer={this.CountdownRenderer} onComplete={this.CountdownComplete}/>
                      <div className="inner-container">
                        <DisplayAtBreakpoint
                          screenMedium
                          screenLarge
                          screenXLarge
                        >
                          <iframe frameBorder="0" style={{width: '100%', minHeight: '750px'}} src={joinPageResponse.hostedPaymentFormURL}></iframe>
                        </DisplayAtBreakpoint>

                        <DisplayAtBreakpoint
                          screenSmall
                        >
                          <iframe frameBorder="0" style={{width: '100%', minHeight: '850px'}} src={joinPageResponse.hostedPaymentFormURL}></iframe>
                        </DisplayAtBreakpoint>


                      </div>
                    </div>
                  </Fragment>
                }
                </Fragment>
              )}
            />
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default JoinStep3;
