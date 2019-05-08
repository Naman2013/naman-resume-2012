// @flow

import { Modal } from 'app/components/modal';
import { Spinner } from 'app/components/spinner/index';
import { SubscriptionPlan } from 'app/modules/account-settings/components/upgrade-modal/subscription-plan';

import React, { PureComponent } from 'react';

type TUpgradeModal = {
  show: boolean,
  onHide: Function,

  getSubscriptionPlans: Function,
  subscriptionPlansData: any,
  selectedPlanId?: string,
  isFetching: Boolean,
};

export class UpgradeModal extends PureComponent<TUpgradeModal> {
  componentDidMount = () => {
    const { getSubscriptionPlans, selectedPlanId } = this.props;
    getSubscriptionPlans({ selectedPlanId });
  };

  render() {
    const {
      show,
      onHide,
      isFetching,
      subscriptionPlansData,
      selectedPlanId,
    } = this.props;

    const {
      subscriptionPlans = [],
      pageHeading1,
      pageHeading2,
    } = subscriptionPlansData;

    return (
      <Modal show={show} onHide={onHide}>
        <Spinner transparent loading={isFetching} />

        <h1 className="modal-h">{pageHeading1}</h1>
        <p className="modal-p mb-5">{pageHeading2}</p>

        {subscriptionPlans.map(plan => (
          <SubscriptionPlan plan={plan} expanded={Boolean(selectedPlanId)} />
        ))}
      </Modal>
    );
  }
}
