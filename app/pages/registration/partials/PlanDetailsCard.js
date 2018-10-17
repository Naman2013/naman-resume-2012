/***********************************
* V4 Discussions Thread List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import styles from './PlanDetailsCard.style'

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

const PlanDetailsCard = (props) => {
  const {
    nextRenewalDate,
    planCost,
    planCostPostfix,
    planCostPrefix,
    planName,
    selectedPlanId,
    startDateText,
  } = props;

  return (
    <div className="root">
      <div className="flex">
        <div className="plan-details-container">
          <div className="plan-name border-bottom" dangerouslySetInnerHTML={{ __html: planName }} />
          <div className="plan-info emphasize">
            {`${startDateText}  ${nextRenewalDate}`}
          </div>
        </div>
        <div className="plan-cost-container">
          <div className="plan-cost padded-top-bottom">
            <span dangerouslySetInnerHTML={{ __html: planCostPrefix}} />
            <span dangerouslySetInnerHTML={{ __html: planCost}} />
          </div>
          <span className="emphasize post-cost" dangerouslySetInnerHTML={{ __html: planCostPostfix}} />
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
  selectedPlanId: oneOfType([number, string]).isRequired,
  startDateText: string.isRequired,
};

PlanDetailsCard.defaultProps = {

};

export default PlanDetailsCard;
