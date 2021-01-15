/** *********************************
 * V4 Join - Step 1 - Select a Plan
 ********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Button from 'app/components/common/style/buttons/Button';

import Request from 'app/components/common/network/Request';
import {
  JOIN_PAGE_ENDPOINT_URL,
  SUBSCRIPTION_PLANS_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import JoinHeader from './partials/JoinHeader';
import SubscriptionPlanCard from './partials/SubscriptionPlanCard';
import { DEFAULT_JOIN_TABS } from './StaticNavTabs';

import styles from './JoinStep1.style';

const { string } = PropTypes;

class JoinByLandingPage extends Component {
  static propTypes = {
    pathname: string,
  };

  static defaultProps = {
    pathname: '/join/byLandingPage',
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
    window.localStorage.removeItem('invitationCodeAlt');
    window.localStorage.removeItem('inviteeEmailAddress');
  }

  handleSubscriptionPlanResponse = result => {
    if (result.selectedSubscriptionPlan) {
      const selectedPlanId = result.selectedSubscriptionPlan.planId;
      const { isAstronomyClub } = result.selectedSubscriptionPlan;

      //We have received a valid response, hand off to setSelectedPlan...
      this.setSelectedPlan(selectedPlanId, isAstronomyClub);
    }
  };

  setSelectedPlan(subscriptionPlanId, isAstronomyClub) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClub);

    /* move to step 2 in the join flow */
    browserHistory.push('/join');
  }

  render() {
    const { pathname } = this.props;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{
            callSource: 'joinByLandingPage',
            selectedPlanHashCode: this.props.params.subscriptionPlanHashCode,
          }}
          serviceResponseHandler={this.handleSubscriptionPlanResponse}
          render={({ fetchingContent, serviceResponse }) => (
            <Fragment>
              <div />
            </Fragment>
          )}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default JoinByLandingPage;
