// @flow

import BobbieTile from 'app/components/common/tiles/BobbieTile';
import React, { Fragment, useState } from 'react';
import Button from 'app/components/common/style/buttons/Button';
import './styles.scss';
import cx from 'classnames';

type TSubscriptionPlan = {
  plan: any,
  expanded?: boolean,
  onSelect: Function,
};

export const SubscriptionPlanNoDetails = (props: TSubscriptionPlan) => {
  const { plan, onSelect } = props;
  
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
    originalPlanCost,
    planIsDiscounted,
    planAudienceType
  } = plan;

  const planCostDisplay = planCostPrefix + planCost;
  const originalplanCostDisplay = planCostPrefix + originalPlanCost;
  
  return (
    <div className="subscription-plan-no-details">
      {planHeading && (
        <Fragment>
          <span className="header">{planHeading}</span>
          <hr />
        </Fragment>
      )}

      <div className="d-flex justify-content-between align-items-baseline">
        <div className="grid">
          <span className="plan-name">{planName}</span>
          <span className="audience-type">{planAudienceType}</span>
        </div>        
        <div className="grid">
          {planIsDiscounted && (
              <span
              className="plan-cost-strike"
              dangerouslySetInnerHTML={{ __html: originalplanCostDisplay }}
            />
          )}        
        <span
          className="plan-cost"
          dangerouslySetInnerHTML={{ __html: planCostDisplay }}
        />
        </div>        
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <span
          className="header"
          dangerouslySetInnerHTML={{ __html: teaserContent }}
        />
        <span className="header">{planCostPostfix}</span>
      </div>

      <hr />     
         
            <Fragment>
              {isPlanActionEnabled && (
                <Button
                  isActive={true}
                  mod="white-text right"
                  onClickEvent={onSelect}
                >
                  {selectButtonText} 
                  {/* <span className="icon-arrow-right" /> */}
                </Button>
              )}
              {!isPlanActionEnabled && (
                <Button
                  disabled
                  style={{ backgroundColor: '#D3D3D3' }}
                  className="animated fadeIn faster"
                  onClickEvent={onSelect}
                >
                  {selectButtonText}
                </Button>
              )}
            </Fragment>
    </div>
  );
};
