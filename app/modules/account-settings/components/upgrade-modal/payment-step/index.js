// @flow

import React from 'react';

type TPaymentStep = { selectedPlanId?: string };

export const PaymentStep = (props: TPaymentStep) => {
  const { selectedPlanId } = props;

  return (
    <>
      <h1 className="modal-h">Heading</h1>
      <p className="modal-p mb-5">paragraph</p>
    </>
  );
};
