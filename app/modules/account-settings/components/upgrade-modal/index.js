// @flow

import { Modal } from 'app/components/modal';
import { Spinner } from 'app/components/spinner/index';
import { PaymentStep } from 'app/modules/account-settings/components/upgrade-modal/payment-step';
import { SelectPlanStep } from 'app/modules/account-settings/components/upgrade-modal/select-plan-step';

import React, { useEffect, useState } from 'react';

type TUpgradeModal = {
  show: boolean,
  onHide: Function,

  getSubscriptionPlans: Function,
  subscriptionPlansData: any,
  selectedPlanId?: string,
  isFetching: Boolean,
};

type TSteps = 'SELECT_PLAN' | 'PAYMENT';

const didMount = (props: TUpgradeModal) => () => {
  const { getSubscriptionPlans, selectedPlanId } = props;
  getSubscriptionPlans({ selectedPlanId });
};

export const UpgradeModal = (props: TUpgradeModal) => {
  const [step, setStep] = useState<TSteps>('SELECT_PLAN');
  useEffect(didMount(props), []);

  const {
    show,
    onHide,
    isFetching,
    subscriptionPlansData,
    selectedPlanId,
    errorData, // errors from issue with user account modal
  } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Spinner transparent loading={isFetching} />

      {step === 'SELECT_PLAN' && (
        <SelectPlanStep
          {...{
            subscriptionPlansData,
            selectedPlanId,
            isFetching,
          }}
          goNext={() => setStep('PAYMENT')}
        />
      )}

      {step === 'PAYMENT' && <PaymentStep />}
    </Modal>
  );
};
