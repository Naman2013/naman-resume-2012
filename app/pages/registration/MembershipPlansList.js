import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styles from 'app/pages/registration/MembershipPlansList.style';
import UpgradeModal from 'app/modules/account-settings/containers/upgrade-modal';
import SubscriptionPlanCardSmall from './partials/SubscriptionPlanCardSmall';

export default class MembershipPlansList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: null,
    };
    window.localStorage.removeItem('selectedPlanId');
  }

  setSelectedPlan(
    subscriptionPlanId,
    isAstronomyClubFlag,
    triggerUpgradeFlow,
    selectedPlan
  ) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClubFlag);

    const isAstronomyClub =
      window.localStorage.getItem('isAstronomyClub') === 'true';

    if (triggerUpgradeFlow) {
      this.setUpgradeModalOpen(selectedPlan);
    } else {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step2');
    }
  }

  setUpgradeModalOpen = selectedPlan => this.setState({ selectedPlan });

  viewPlanDetails(subscriptionPlanId, isAstronomyClub) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClub);

    /* move to Plan Details in the Join Flow */
    browserHistory.push('/join/membershipPlanDetailsStep');
  }

  render() {
    const { selectedPlan } = this.state;
    const { plans } = this.props;

    let subscriptionPlansCallSource = 'join';
    if (selectedPlan && selectedPlan.triggerUpgradeFlow === true) {
      subscriptionPlansCallSource = 'upgrade';
    }

    return (
      <>
        {selectedPlan && (
          <UpgradeModal
            show={selectedPlan}
            preSelectedPlan={selectedPlan}
            subscriptionPlansCallSource={subscriptionPlansCallSource}
            onHide={() => this.setUpgradeModalOpen(false)}
          />
        )}

        <ul className="subscription-plans-list">
          {plans.map(subscriptionPlan => (
            <li
              key={`subscriptionplan-tile-${subscriptionPlan.planID}`}
              className="subscription-plans-list-item"
            >
              <SubscriptionPlanCardSmall
                {...subscriptionPlan}
                viewPlanDetails={() =>
                  this.viewPlanDetails(
                    subscriptionPlan.planID,
                    subscriptionPlan.isAstronomyClub
                  )
                }
                setSelectedPlan={() =>
                  this.setSelectedPlan(
                    subscriptionPlan.planID,
                    subscriptionPlan.isAstronomyClub,
                    subscriptionPlan.triggerUpgradeFlow,
                    subscriptionPlan
                  )
                }
              />
            </li>
          ))}
        </ul>

        <style jsx>{styles}</style>
      </>
    );
  }
}
