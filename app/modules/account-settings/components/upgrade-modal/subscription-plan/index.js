// @flow

import BobbieTile from 'app/components/common/tiles/BobbieTile';
import React, { Fragment, useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import './styles.scss';
import cx from 'classnames';

type TSubscriptionPlan = {
  plan: any,
  expanded?: boolean,
  onSelect: Function,
};

export const SubscriptionPlan = (props: TSubscriptionPlan) => {
  const { plan, expanded = false, onSelect } = props;

  const [isDetailsExpanded, setDetailsExpanded] = useState(expanded);
  const {
    planHeading,
    planName,
    planCost,
    planCostPrefix,
    planCostPostfix,
    selectButtonText,
    planDescription,
  } = plan;

  return (
    <div className="subscription-plan">
      {planHeading && <Fragment><span className="header">{planHeading}</span><hr /></Fragment>}

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
          {planDescription}
        </span>
        <span className="header">{planCostPostfix}</span>
      </div>

      <hr />

      {!expanded && (
        <div className="d-flex justify-content-between">
          <Button
            onClick={() => setDetailsExpanded(!isDetailsExpanded)}
            className={cx({ 'btn-active': isDetailsExpanded })}
          >
            {isDetailsExpanded ? <span className="icon-close" /> : 'details'}
          </Button>
          {!isDetailsExpanded && (
            <Button className="animated fadeIn faster" onClick={() => onSelect(plan.planID)}>
              {selectButtonText} <span className="icon-arrow-right" />
            </Button>
          )}
        </div>
      )}

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
            {expanded ? (
              <span />
            ) : (
              <Button onClick={() => setDetailsExpanded(false)}>close</Button>
            )}
            <Button onClick={() => onSelect(plan.planID)} className="btn-active">
              {selectButtonText}
            </Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
