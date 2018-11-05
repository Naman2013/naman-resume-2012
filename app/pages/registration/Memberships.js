/** *********************************
* V4 Memberships page
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import SubscriptionPlanCardSmall from './partials/SubscriptionPlanCardSmall';
import Button from 'components/common/style/buttons/Button';
import Request from 'components/common/network/Request';
import CenterColumn from 'components/common/CenterColumn';
import { JOIN_PAGE_ENDPOINT_URL, SUBSCRIPTION_PLANS_ENDPOINT_URL } from 'services/registration/registration.js';
import styles from './Memberships.style';

class Memberships extends Component {
  constructor(props) {
    super(props);

    window.localStorage.removeItem('selectedPlanId');
  }

  setSelectedPlan(subscriptionPlanId, isAstronomyClubFlag, isClassroomFlag) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClubFlag);
    window.localStorage.setItem('isClassroom', isClassroomFlag);

    const isAstronomyClub = window.localStorage.getItem('isAstronomyClub') === "true" ? true : false;
    const isClassroom = window.localStorage.getItem('isClassroom') === "true" ? true : false;
    
    /* Teacher Subscription Plans should prompt for School Selection */
    if (isClassroom) {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step1SchoolSelection');
    }
    else {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step2');
    }
  }

  viewPlanDetails(subscriptionPlanId, isAstronomyClub, isClassroom) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClub);
    window.localStorage.setItem('isClassroom', isClassroom);

    /* move to Plan Details in the Join Flow */
    browserHistory.push('/join/membershipPlanDetailsStep');
  }

  render() {

    return (
      <div >
        <Request
          serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
          requestBody={{ callSource: 'membershipspage' }}
          render={({
            fetchingContent,
            serviceResponse: subscriptionResponse,
          }) => (
            <Fragment>
              {
                !fetchingContent && (
                  <CenterColumn widths={['645px', '965px', '965px']}>
                    <ul className="subscription-plans-list">
                      {subscriptionResponse.subscriptionPlans.map(subscriptionPlan => (
                        <li
                          key={`subscriptionplan-tile-${subscriptionPlan.planID}`}
                          className="subscription-plans-list-item"
                        >
                          <SubscriptionPlanCardSmall {...subscriptionPlan} viewPlanDetails={() => this.viewPlanDetails(subscriptionPlan.planID, subscriptionPlan.isAstronomyClub, subscriptionPlan.isClassroom)} setSelectedPlan={() => this.setSelectedPlan(subscriptionPlan.planID, subscriptionPlan.isAstronomyClub, subscriptionPlan.isClassroom)} />
                        </li>
                      ))}
                    </ul>
                  </CenterColumn>
                )}
            </Fragment>
          )}
        />
        <style jsx>{styles}</style>
      </div>
    )
  }
}

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

export default connect(mapStateToProps, null)(Memberships);
