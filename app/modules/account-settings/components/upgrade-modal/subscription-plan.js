// @flow

import React from 'react';
import './subscription-plan.scss';

type TSubscriptionPlan = {
  plan: any,
};

export const SubscriptionPlan = (props: TSubscriptionPlan) => {
  const { plan } = props;
  return (
    <div className="subscription-plan">
      <h1>{plan.planName}</h1>
    </div>
  );
};
