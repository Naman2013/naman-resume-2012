/** *********************************
 * V4 Join - Enable a Hidden Plan
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
import { getUserInfo } from 'app/modules/User';
import SubscriptionPlanCard from './partials/SubscriptionPlanCard';
import JoinHeader from './partials/JoinHeader';
import { DEFAULT_JOIN_TABS } from './StaticNavTabs';

import styles from './JoinStep1.style';

const { string } = PropTypes;

class EnableHiddenPlan extends Component {
  static propTypes = {
    pathname: string,
  };

  static defaultProps = {
    pathname: 'endablePlan',
  };

  constructor(props) {
    super(props);
  }

  handleSubscriptionPlanResponse = result => {
    if (result.selectedSubscriptionPlan) {
      const selectedPlanId = result.selectedSubscriptionPlan.planId;
      const { isAstronomyClub } = result.selectedSubscriptionPlan;
      const { isClassroom } = result.selectedSubscriptionPlan;

      //We have received a valid response, hand off to setSelectedPlan...
      this.setSelectedPlan(selectedPlanId, isAstronomyClub, isClassroom);
    }
  };

  setSelectedPlan = (subscriptionPlanId, isAstronomyClub, isClassroom) => {
    window.localStorage.setItem(
      'enableHiddenPlanHashCode',
      this.props.params.subscriptionPlanHashCode
    );

    /* move to the products page */
    browserHistory.push('/about/memberships');
  };

  render() {
    const { pathname } = this.props;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{
            callSource: 'enableHiddenPlan',
            selectedPlanHashCode: this.props.params.subscriptionPlanHashCode,
            cid: getUserInfo().cid,
            at: getUserInfo().at,
            token: getUserInfo().token,
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

export default EnableHiddenPlan;
