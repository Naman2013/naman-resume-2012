// @flow

import React, { Fragment } from 'react';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL,
  JOIN_PAGE_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import { DeviceContext } from 'app/providers/DeviceProvider';
import JoinHeader from 'app/pages/registration/partials/JoinHeader';
import PlanDetailsCard from 'app/pages/registration/partials/PlanDetailsCard';
import { DEFAULT_JOIN_TABS } from 'app/pages/registration/StaticNavTabs';
import Countdown from 'react-countdown-now';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';

import styles from 'app/pages/registration/JoinStep3.style';
import messages from 'app/pages/registration/JoinStep3.messages';

  const CountdownRenderer = ({ completed, minutes, seconds }) => {
    if (completed) {
      // Render a completed state
      //console.log('The countdown has completed.....');
      return (
	<div></div>
      );
    }
    // Render a countdown
    return (
      <p style={{ backgroundColor: '#f2f2f2', fontSize: '1.3em', color: 'green' }}>
        <FormattedMessage
          {...messages.SignupRequestExpireTimeOnUpgrade}
          values={{ minutes, seconds }}
        />
      </p>
    );
  };

  const CountdownExpiredRenderer = ({ seconds, completed }) => {
    if (!completed) {
      // Render a countdown to redirect to the homepage
      return (
        <p style={{ backgroundColor: '#f2f2f2', fontSize: '1.3em', fontWeight: 'bold', color: 'red' }}>
          <FormattedMessage
            {...messages.SignupRequestExpireTimeOnUpgrade}
            values={{ seconds }}
          />
        </p>
      );
    }
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


type TPaymentStep = { selectedPlanId?: string };

export const PaymentStep = (props: TPaymentStep) => {
  const { selectedPlanId } = props;
  const pathname = "";

  return (
    <>
      <Request
        serviceURL={JOIN_PAGE_ENDPOINT_URL}
        requestBody={{ callSource: 'providePaymentDetails', selectedPlanId }}
        render={({ fetchingContent, serviceResponse: joinPageRes }) => (
          <Fragment>
            {!fetchingContent && (
              <DeviceContext.Consumer>
                {({ isMobile, isDesktop, isTablet }) => (
                  <Fragment>
      		    <h1 className="modal-h">Heading</h1>
	      	    <p className="modal-p mb-5">paragraph</p>
                    {joinPageRes.hasSelectedSchool === 'yes' ? (
                      <JoinHeader
                        mainHeading={joinPageRes.pageHeading1}
                        subHeading={joinPageRes.pageHeading2}
			showTabs={false}
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
                        showTabs={false}
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
                      <div style={{backgroundColor: '#f2f2f2'}} className="section-heading">
                        {joinPageRes.sectionHeading}
                      </div>
                      <div style={{minWidth: '100%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
                       <Countdown
                         date={
                           Date.now() +
                           joinPageRes.customerHasXSecondsToCompleteSignup
                         }
                         renderer={CountdownRenderer}
			 onComplete={CountdownExpiredComplete}	
                       />			
		      </div>
                      <div style={{backgroundColor: '#f2f2f2'}} className="inner-container">
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
