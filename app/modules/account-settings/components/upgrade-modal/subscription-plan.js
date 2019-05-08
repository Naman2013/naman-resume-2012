// @flow

import BobbieTile from 'app/components/common/tiles/BobbieTile';
import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import './subscription-plan.scss';
import cx from 'classnames';

type TSubscriptionPlan = {
  plan: any,
};

export const SubscriptionPlan = (props: TSubscriptionPlan) => {
  const [isDetailsExpanded, setDetailsExpanded] = useState(false);

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
          <Button
            onClick={() => setDetailsExpanded(!isDetailsExpanded)}
            className={cx({ 'btn-active': isDetailsExpanded })}
          >
            {isDetailsExpanded ? <span className="icon-close" /> : 'details'}
          </Button>
          <Button className="ml-3 btn-circle">
            <span className="icon-share" />
          </Button>
        </div>
        <Button>
          {selectButtonText} <span className="icon-arrow-right" />
        </Button>
      </div>

      <Collapse in={isDetailsExpanded}>
        <div className="plan-details-expanded">
          <BobbieTile
            className="form-section"
            showTitle={false}
            showSubtitle={false}
            title=""
            subtitle=""
            HTMLBlob={plan.aboutThisPlan}
            disableReadMore
            embed
          />
          <hr />
          <div className="d-flex justify-content-between">
            <Button onClick={() => setDetailsExpanded(false)}>close</Button>
            <Button className="btn-active">{selectButtonText}</Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
