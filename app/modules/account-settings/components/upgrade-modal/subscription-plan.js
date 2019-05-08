// @flow

import BobbieTile from 'app/components/common/tiles/BobbieTile';
import React from 'react';
import { Button } from 'react-bootstrap';
import './subscription-plan.scss';

type TSubscriptionPlan = {
  plan: any,
};

export const SubscriptionPlan = (props: TSubscriptionPlan) => {
  const { plan } = props;
  const {
    planHeading,
    planName,
    planCost,
    planCostPrefix,
    planCostPostfix,
    selectButtonText,
  } = plan;
  return (
    <div className="subscription-plan">
      <span className="header">{planHeading}</span>
      <hr />

      <div className="d-flex justify-content-between align-items-baseline">
        <span className="plan-name">{planName}</span>
        <span className="plan-cost">
          {planCostPrefix}
          {planCost}
        </span>
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <span className="header">
          UPGRADE TODAY AND GET A 14 DAY FREE TRIAL!
        </span>
        <span className="header">{planCostPostfix}</span>
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <div>
          <Button>details</Button>
          <Button className="ml-3 btn-circle">
            <span className="icon-share" />
          </Button>
        </div>
        <div>
          <Button>
            {selectButtonText} <span className="icon-arrow-right" />
          </Button>
        </div>
      </div>

      <h2>Descr</h2>

      <BobbieTile
        className="form-section"
        showTitle={false}
        showSubtitle={false}
        title=""
        subtitle=""
        HTMLBlob={plan.aboutThisPlan}
        disableReadMore
      />
    </div>
  );
};
