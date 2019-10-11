/** *********************************
 * V4 Join - Step 1 - Select a Plan
 ********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Button from 'app/components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import Request from 'app/components/common/network/Request';
import {
  JOIN_PAGE_ENDPOINT_URL,
  SUBSCRIPTION_PLANS_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import { DeviceContext } from 'app/providers/DeviceProvider';
import JoinHeader from './partials/JoinHeader';
import SubscriptionPlanCard from './partials/SubscriptionPlanCard';
import { DEFAULT_JOIN_TABS } from './StaticNavTabs';
import { getUserInfo } from 'app/modules/User';

import styles from './JoinStep1.style';

const { string } = PropTypes;

class JoinStep1 extends Component {
  static propTypes = {
    pathname: string,
  };

  static defaultProps = {
    pathname: '/join/step1',
  };

  constructor(props) {
    super(props);

    /* reset all browser localstorage data points for the Join flow */
    window.localStorage.removeItem('pending_cid');
    window.localStorage.removeItem('selectedPlanId');
    window.localStorage.removeItem('selectedSchoolId');
    window.localStorage.removeItem('accountCreationType');
    window.localStorage.removeItem('googleProfileId');
    window.localStorage.removeItem('googleProfileEmail');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
    window.localStorage.removeItem('isAstronomyClub');
    window.localStorage.removeItem('isClassroom');
    window.localStorage.removeItem('invitationCodeAlt');
    window.localStorage.removeItem('inviteeEmailAddress');

    if (
	(getUserInfo().cid) &&
	(getUserInfo().at) &&
	(getUserInfo().token)
    ) {
	//user is already logged in, redirect to dashboard/homepage
	browserHistory.push("/");
    }
  }

  setSelectedPlan(subscriptionPlanId, isAstronomyClub, isClassroom) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClub);
    window.localStorage.setItem('isClassroom', isClassroom);

    /* Teacher Subscription Plans should prompt for School Selection */
    if (isClassroom) {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step1SchoolSelection');
    } else {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step2');
    }
  }

  render() {
    const { pathname } = this.props;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ callSource: 'selectSubscriptionPlan' }}
          render={({ fetchingContent, serviceResponse }) => (
            <Fragment>
              {!fetchingContent && (
                <Fragment>
                  <DeviceContext.Consumer>
                    {({ isMobile, isTablet, isDesktop }) => (
                      <>
                        <JoinHeader
                          mainHeading={serviceResponse.pageHeading1}
                          subHeading={serviceResponse.pageHeading2}
                          activeTab={pathname}
                          tabs={DEFAULT_JOIN_TABS}
                          backgroundImage={
                            isMobile
                              ? serviceResponse.planSelectedBackgroundImageUrl_Mobile
                              : isDesktop
                              ? serviceResponse.planSelectedBackgroundImageUrl_Desktop
                              : isTablet
                              ? serviceResponse.planSelectedBackgroundImageUrl_Tablet
                              : ''
                          }
			  showLogin={true}
                        />
                        <div className="step-root">
                          <div className="section-heading">
                            {serviceResponse.sectionHeading}
                          </div>
                          <Request
                            serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
                            requestBody={{ 
				callSource: 'join', 
				enableHiddenPlanHashCode: window.localStorage.getItem('enableHiddenPlanHashCode'),
			    }}
                            render={({
                              fetchingContent,
                              serviceResponse: serviceRes,
                            }) => (
                              <Fragment>
                                {!fetchingContent && (
                                  <ul className="subscription-plans-list">
                                    {serviceRes.subscriptionPlans.map(
                                      subscriptionPlan => (
                                        <li
                                          key={`subscriptionplan-tile-${
                                            subscriptionPlan.planID
                                          }`}
                                          className="subscription-plans-list-item"
                                        >
                                          <SubscriptionPlanCard
                                            {...subscriptionPlan}
                                            setSelectedPlan={() =>
                                              this.setSelectedPlan(
                                                subscriptionPlan.planID,
                                                subscriptionPlan.isAstronomyClub,
                                                subscriptionPlan.isClassroom
                                              )
                                            }
                                          />
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </Fragment>
                            )}
                          />
                        </div>
                      </>
                    )}
                  </DeviceContext.Consumer>
                </Fragment>
              )}
            </Fragment>
          )}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default JoinStep1;
