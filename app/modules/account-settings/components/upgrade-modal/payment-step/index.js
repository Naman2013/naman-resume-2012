// @flow

import React from 'react';
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

import styles from 'app/pages/registration/JoinStep3.style';
import messages from 'app/pages/registration/JoinStep3.messages';

type TPaymentStep = {};

export const PaymentStep = (props: TPaymentStep) => {
  // const {} = props;

  return (
    <>
      <h1 className="modal-h">Heading</h1>
      <p className="modal-p mb-5">paragraph</p>
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
    </>
  );
};
