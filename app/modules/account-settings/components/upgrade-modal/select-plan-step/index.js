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
    subscriptionPlansCallSource,
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
    goNext(subscriptionPlansCallSource, plan);
    setSelectedPlan(plan);
  };

  return (
    <>
      <h1 className="modal-h" dangerouslySetInnerHTML={{ __html: pageHeading1 }}/>
      <p className="modal-p mb-5" dangerouslySetInnerHTML={{ __html: pageHeading2 }}/>

      {subscriptionPlans.map(plan => (
        <SubscriptionPlan
          plan={plan}
          expanded={false}
          onSelect={onSelect}
        />
      ))}


    </>
  );
};
