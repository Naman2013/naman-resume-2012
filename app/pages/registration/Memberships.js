/** *********************************
 * V4 Memberships page
 ********************************** */

import CenterColumn from 'app/components/common/CenterColumn';
import Request from 'app/components/common/network/Request';
import UpgradeModal from 'app/modules/account-settings/containers/upgrade-modal';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL } from 'app/services/registration/registration';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './Memberships.style';
import SubscriptionPlanCardSmall from './partials/SubscriptionPlanCardSmall';

class Memberships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upgradeSubscriptionPlanId: false,
    };
    window.localStorage.removeItem('selectedPlanId');
  }

  setSelectedPlan(
    subscriptionPlanId,
    isAstronomyClubFlag,
    isClassroomFlag,
    triggerUpgradeFlow
  ) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClubFlag);
    window.localStorage.setItem('isClassroom', isClassroomFlag);

    const isAstronomyClub =
      window.localStorage.getItem('isAstronomyClub') === 'true';
    const isClassroom = window.localStorage.getItem('isClassroom') === 'true';

    if (triggerUpgradeFlow) {
      this.setUpgradeModalOpen(subscriptionPlanId);
    } else if (isClassroom) {
      /* Teacher Subscription Plans should prompt for School Selection */
      browserHistory.push('/join/step1SchoolSelection');
    } else {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step2');
    }
  }

  setUpgradeModalOpen = upgradeSubscriptionPlanId =>
    this.setState({ upgradeSubscriptionPlanId });

  viewPlanDetails(subscriptionPlanId, isAstronomyClub, isClassroom) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClub);
    window.localStorage.setItem('isClassroom', isClassroom);

    /* move to Plan Details in the Join Flow */
    browserHistory.push('/join/membershipPlanDetailsStep');
  }

  render() {
    const { upgradeSubscriptionPlanId } = this.state;
    return (
      <div>
        {upgradeSubscriptionPlanId && (
          <UpgradeModal
            show={upgradeSubscriptionPlanId}
            selectedPlanId={upgradeSubscriptionPlanId}
            onHide={() => this.setUpgradeModalOpen(false)}
          />
        )}

        <Request
          serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
          requestBody={{ callSource: 'membershipspage' }}
          render={({
            fetchingContent,
            serviceResponse: subscriptionResponse,
          }) => (
            <Fragment>
              {!fetchingContent && (
                <CenterColumn widths={['645px', '960px', '960px']}>
                  <ul className="subscription-plans-list">
                    {subscriptionResponse.subscriptionPlans.map(
                      subscriptionPlan => (
                        <li
                          key={`subscriptionplan-tile-${
                            subscriptionPlan.planID
                          }`}
                          className="subscription-plans-list-item"
                        >
                          <SubscriptionPlanCardSmall
                            {...subscriptionPlan}
                            viewPlanDetails={() =>
                              this.viewPlanDetails(
                                subscriptionPlan.planID,
                                subscriptionPlan.isAstronomyClub,
                                subscriptionPlan.isClassroom
                              )
                            }
                            setSelectedPlan={() =>
                              this.setSelectedPlan(
                                subscriptionPlan.planID,
                                subscriptionPlan.isAstronomyClub,
                                subscriptionPlan.isClassroom,
                                subscriptionPlan.triggerUpgradeFlow
                              )
                            }
                          />
                        </li>
                      )
                    )}
                  </ul>
                </CenterColumn>
              )}
            </Fragment>
          )}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

export default connect(
  mapStateToProps,
  null
)(Memberships);
