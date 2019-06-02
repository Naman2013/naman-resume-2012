// @flow

import { SubscriptionPlan } from 'app/modules/account-settings/components/upgrade-modal/subscription-plan/index';
import React from 'react';

type TSelectPlanStep = {
  goNext: Function,
  setSelectedPlanId?: Function,
  subscriptionPlansData: any,
  selectedPlanId?: string,
};

export const SelectPlanStep = (props: TSelectPlanStep) => {
  const {
    subscriptionPlansData,
    selectedPlanId,
    goNext,
    setSelectedPlanId,
  } = props;
  const {
    subscriptionPlans = [],
    pageHeading1,
    pageHeading2,
  } = subscriptionPlansData;

  const onSelect = planId => {
    goNext();
    setSelectedPlanId(planId);
  };

  return (
    <>
      <h1 className="modal-h">{pageHeading1}</h1>
      <p className="modal-p mb-5">{pageHeading2}</p>

      {subscriptionPlans.map(plan => (
        <SubscriptionPlan
          plan={plan}
          expanded={Boolean(selectedPlanId)}
          onSelect={onSelect}
        />
      ))}
    </>
  );
};
