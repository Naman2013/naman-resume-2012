/** *********************************
* V4 Join - Step 1 - Select a Plan
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import JoinHeader from './partials/JoinHeader';
import Request from 'components/common/network/Request';
import { JOIN_PAGE_ENDPOINT_URL, SUBSCRIPTION_PLANS_ENDPOINT_URL } from 'services/registration/registration.js';
import styles from './JoinStep1.style';

class JoinStep1 extends Component {
  constructor(props) {
    super(props);

    /* reset all browser localstorage data points for the Join flow */
    window.localStorage.removeItem('pending_cid');
    window.localStorage.removeItem('selectedPlanId');
    window.localStorage.removeItem('accountCreationType');
    window.localStorage.removeItem('googleProfileId');
    window.localStorage.removeItem('googleProfileEmail');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
  }

  setSelectedPlan(subscriptionPlanId) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    //console.log('setting selected plan of: ' + subscriptionPlanId);

    /* Teacher Subscription Plans should prompt for School Selection */
    if (subscriptionPlanId == 11) {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step1SchoolSelection');
    }
    else {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step2');
    }
  }

  render() {
    const {
      pathname,
    } = this.props;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ 'callSource': 'selectSubscriptionPlan' }}
          render={({
            fetchingContent,
            serviceResponse,
          }) => (
            <Fragment>
              {
                !fetchingContent &&
                  <Fragment>
                      <JoinHeader
                        mainHeading={serviceResponse.pageHeading1}
                        subHeading={serviceResponse.pageHeading2}
                        activeTab={pathname}
                      />
                      <div className="step-root">
                        <div className="section-heading">{serviceResponse.sectionHeading}</div>
                        <Request
                          serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
                          requestBody={{ 'callSource': 'join' }}
                          render={({
                            fetchingContent,
                            serviceResponse: serviceRes,
                          }) => (
                            <Fragment>
                              {
                                !fetchingContent &&
                                  <Fragment>
                                    <ul>
                                      {serviceRes.subscriptionPlans.map(subscriptionPlan => <li key={`subscriptionplan-tile-${subscriptionPlan.planID}`}>
                                        <div>
                                          <div>
                                            <b>{subscriptionPlan.planName}</b><br/>
                                            <hr/>
                                            <br/>
                                            <i>{subscriptionPlan.planDescription}</i><br/>
                                            <br/>
                                            <hr/>
                                            <br/>
                                            {subscriptionPlan.planCostPrefix}{subscriptionPlan.planCost}<br/>
                                            {subscriptionPlan.planCostPostfix}<br/>
                                            <br/>
                                            <hr/>
                                            <div id={'subscriptionPlanDetails_' + subscriptionPlan.planID} dangerouslySetInnerHTML={{ __html: subscriptionPlan.aboutThisPlan }}/><br/>
                                            <br/>
                                            <br/>
                                            <Link onClick={e => this.setSelectedPlan(subscriptionPlan.planID)}><Button theme={{ margin: '0 auto'}} type="button" text={subscriptionPlan.selectButtonText}/></Link><br/>
                                          </div>
                                         </div>
                                        </li>)}
                                      </ul>
                                    </Fragment>
                                  }
                                </Fragment>
                              )}
                            />
                      </div>
                      </Fragment>
                    }
                  </Fragment>
                )}
          />
          <br/>
          <br/>
          <style jsx>{styles}</style>
      </div>
    )
  }
}


export default JoinStep1;
