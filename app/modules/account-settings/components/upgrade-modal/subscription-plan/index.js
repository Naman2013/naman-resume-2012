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
    isPlanActionEnabled,
    teaserContent,
  } = plan;

  return (
    <div className="subscription-plan">
      {planHeading && <Fragment><span className="header">{planHeading}</span><hr /></Fragment>}

      <div className="d-flex justify-content-between align-items-baseline">
        <span className="plan-name">{planName}</span>
	<span className="plan-cost" dangerouslySetInnerHTML={{ __html: planCostPrefix }} />
	<span className="plan-cost">{planCostPrefix}</span>
	<span className="plan-cost" dangerouslySetInnerHTML={{ __html: planCostPostfix }} />
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <span className="header" dangerouslySetInnerHTML={{__html: teaserContent}}/>
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
            <Fragment>
              {isPlanActionEnabled && <Button className="animated fadeIn faster" onClick={() => onSelect(plan)}>
                {selectButtonText} <span className="icon-arrow-right" />
              </Button>
              }
              {!isPlanActionEnabled && <Button disabled={true} style={{backgroundColor: '#D3D3D3'}} className="animated fadeIn faster" onClick={() => onSelect(plan)}>
                {selectButtonText}
              </Button>
              }
            </Fragment>
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
            <Fragment>
              {isPlanActionEnabled && <Button className="btn-active" onClick={() => onSelect(plan)}>
                {selectButtonText}
              </Button>
              }
              {!isPlanActionEnabled && <Button disabled={true} style={{backgroundColor: '#D3D3D3'}} className="animated fadeIn faster" onClick={() => onSelect(plan)}>
                {selectButtonText}
              </Button>
              }
            </Fragment>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
