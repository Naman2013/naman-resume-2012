/** **********************************************************************************
* V4 Join with an Invitation Email which has all the necessary validation parameters
*************************************************************************************/

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import JoinHeader from './partials/JoinHeader';
import SubscriptionPlanCard from './partials/SubscriptionPlanCard';
import Request from 'components/common/network/Request';
import { JOIN_PAGE_ENDPOINT_URL } from 'services/registration/registration.js';
import styles from './JoinStep1.style';

const {
  string,
} = PropTypes;

class JoinByInviteEmailStep1 extends Component {
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
  }

  render() {
    const {
      pathname,
    } = this.props;

    const {
      invitationCodeHash, invitationCreationEpoch
    } = this.props.params;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ 'callSource': 'joinByInvitationEmail', 'invitationCodeHash': invitationCodeHash, 'invitationCreationEpoch': invitationCreationEpoch }}
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
                                  <ul className="subscription-plans-list">
                                    {serviceRes.subscriptionPlans.map(subscriptionPlan => (
                                      <li
                                        key={`subscriptionplan-tile-${subscriptionPlan.planID}`}
                                        className="subscription-plans-list-item"
                                      >
                                        <SubscriptionPlanCard {...subscriptionPlan} setSelectedPlan={() => this.setSelectedPlan(subscriptionPlan.planID)}/>
                                      </li>))}
                                    </ul>
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
          <style jsx>{styles}</style>
      </div>
    )
  }
}

export default JoinByInviteEmailStep1;
