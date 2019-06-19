// @flow

import { SubscriptionPlan } from 'app/modules/account-settings/components/upgrade-modal/subscription-plan/index';
import React from 'react';
import Btn from 'app/atoms/Btn';

type TSelectPlanStep = {
  goNext: Function,
  setSelectedPlan?: Function,
  subscriptionPlansData: any,
  selectedPlan?: Shape,
  user?: Shape,
};

export const SelectPlanStep = (props: TSelectPlanStep) => {
  const {
    subscriptionPlansData,
    selectedPlan,
    goNext,
    setSelectedPlan,
  } = props;

  const {
    subscriptionPlans = [],
    pageHeading1,
    pageHeading2,
  } = subscriptionPlansData;

  const onSelect = plan => {
    goNext();
    setSelectedPlan(plan);
  };

  return (
    <>
      <h1 className="modal-h">{pageHeading1}</h1>
      <p className="modal-p mb-5">{pageHeading2}</p>

      {subscriptionPlans.map(plan => (
        <SubscriptionPlan
          plan={plan}
          expanded={Boolean(selectedPlan)}
          onSelect={onSelect}
        />
      ))}


    </>
  );
};
