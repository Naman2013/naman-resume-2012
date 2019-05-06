// @flow

import { Modal } from 'app/components/modal';
import { Spinner } from 'app/components/spinner/index';
import { SubscriptionPlan } from 'app/modules/account-settings/components/upgrade-modal/subscription-plan';

import React, { PureComponent } from 'react';

type TUpgradeModal = {
  show: boolean,
  onHide: Function,

  getSubscriptionPlans: Function,
  subscriptionPlans: Array<any>,
  isFetching: Boolean,
};

export class UpgradeModal extends PureComponent<TUpgradeModal> {
  componentDidMount = () => {
    console.log('didMount');
    const { getSubscriptionPlans } = this.props;
    getSubscriptionPlans();
  };

  render() {
    const { show, onHide, isFetching, subscriptionPlans = [] } = this.props;

    console.log(subscriptionPlans);

    return (
      <Modal show={show} onHide={onHide}>
        <Spinner loading={isFetching} />

        <h1 className="modal-h">Looking to Level-up?</h1>
        <p className="modal-p mb-5">
          Here are your options. We think you’d like our Research Astronomer
          membership.
        </p>

        {subscriptionPlans.map(plan => (
          <SubscriptionPlan plan={plan} />
        ))}
      </Modal>
    );
  }
}
