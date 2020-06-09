import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import Button from 'app/components/common/style/buttons/Button';
import { info } from 'app/styles/variables/iconURLs';
import styles from './SubscriptionPlanCard.style';

const { func, number, oneOfType, string } = PropTypes;

class SubscriptionPlanCardSmall extends Component {
  static propTypes = {
    aboutThisPlan: string.isRequired,
    imageUrl: string.isRequired,
    planCost: string.isRequired,
    planCostPostfix: string.isRequired,
    planCostPrefix: string.isRequired,
    planDescription: string.isRequired,
    planID: oneOfType([number, string]).isRequired,
    planName: string.isRequired,
    selectButtonText: string.isRequired,
    setSelectedPlan: func.isRequired,
    viewPlanDetails: func.isRequired,
  };

  static defaultProps = {};

  state = {
    showDetails: false,
  };

  toggleDetails = () => {
    this.setState(state => ({
      showDetails: !state.showDetails,
    }));
  };

  render() {
    const {
      aboutThisPlan,
      planAudienceType,
      imageUrl,
      planCost,
      planCostPrefix,
      planCostPostfix,
      planDescription,
      planID,
      planName,
      selectButtonText,
      setSelectedPlan,
      viewPlanDetails,
      isPlanActionEnabled,
      planIsDiscounted,
      originalPlanCost
    } = this.props;

    const { showDetails } = this.state;

    const planCostDetails = planCostPrefix + planCost + " " + (planIsDiscounted ? "" :planCostPostfix);
    const dicountedplanCostDetails = planCostPrefix + originalPlanCost;
    return (
      <div className="root">
        <img src={imageUrl} className="plan-image" />
        <div className="inner-container">
	  <div className="plannametype-container">
	          <div
        	    className="plan-name "
	            dangerouslySetInnerHTML={{ __html: planName }}
        	  />
	          <div className="audience-type">{planAudienceType}</div>
	  </div>
          <div className="emphasize border-top border-bottom padded-top-bottom">
          {planIsDiscounted && (                  
                    <span className="plan-cost-small"><span className="plan-cost-small-strike" dangerouslySetInnerHTML={{ __html: dicountedplanCostDetails }} /> | </span>
                )}
            <span
              className="plan-cost-small"
              dangerouslySetInnerHTML={{ __html: planCostDetails }}
            />    
                {planIsDiscounted && (
                  <div>                    
                    <br/> {planCostPostfix}
                  </div>
                )}    
          </div>
          <div className="flex padded-top-bottom">
            <div>
              <Button icon={info} onClickEvent={viewPlanDetails} />
            </div>
            {isPlanActionEnabled && (
              <Button text={selectButtonText} onClickEvent={setSelectedPlan} />
            )}
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default SubscriptionPlanCardSmall;
