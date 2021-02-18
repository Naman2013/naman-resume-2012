/***********************************
 * V4 Discussions Thread List Item
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'app/components/common/style/buttons/Button';
import styles from './PlanDetailsCard.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const PlanDetailsCard = props => {
  const {
    nextRenewalDate,
    planAudienceType,
    planCost,
    planCostPostfix,
    planCostPrefix,
    planName,
    planId,
    startDateText,
    flexClass,
    planIsDiscounted,
    originalPlanCost,
  } = props;

  console.log('originalPlanCost',originalPlanCost);
  
  return (
    <div className="root">
      <div className={flexClass || "flex"}>
        <div className="plan-details-container">
          <div
            className="plan-name "
            dangerouslySetInnerHTML={{ __html: planName }}
          />
          <div className="audience-type border-bottom">{planAudienceType}</div>
          <div className="plan-info emphasize">
            {`${startDateText}  ${nextRenewalDate}`}
          </div>
        </div>
        <div className="plan-cost-container">
        {planIsDiscounted && (
            <div className="plan-cost no-padded">
              <span className="small-scr-strike" dangerouslySetInnerHTML={{ __html: planCostPrefix }} />
              <span className="small-scr-strike" dangerouslySetInnerHTML={{ __html: originalPlanCost }} />
            </div>
          )}   
          <div className="plan-cost padded-top-bottom">
            <span className="small-scr" dangerouslySetInnerHTML={{ __html: planCostPrefix }} />
            <span className="small-scr" dangerouslySetInnerHTML={{ __html: planCost }} />
          </div>                 
          <span
            className="emphasize post-cost"
            dangerouslySetInnerHTML={{ __html: planCostPostfix }}
          />
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

PlanDetailsCard.propTypes = {
  nextRenewalDate: string.isRequired,
  planCost: oneOfType([number, string]).isRequired,
  planCostPostfix: string.isRequired,
  planCostPrefix: string.isRequired,
  planName: string.isRequired,
  planId: oneOfType([number, string]).isRequired,
  startDateText: string.isRequired,
};

PlanDetailsCard.defaultProps = {};

export default PlanDetailsCard;
