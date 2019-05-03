import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import Button from 'app/components/common/style/buttons/Button';
import { info } from 'app/styles/variables/iconURLs';
import SubscriptionPlanCardSmall from './SubscriptionPlanCardSmall';
import styles from './SubscriptionPlanCard.style';

const { func, number, oneOfType, string } = PropTypes;

class SubscriptionPlanCard extends Component {
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
      imageUrl,
      planAudienceType,
      planCost,
      planCostPrefix,
      planCostPostfix,
      planDescription,
      planID,
      planName,
      selectButtonText,
      setSelectedPlan,
    } = this.props;

    const { showDetails } = this.state;

    return (
      <div className="root">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <div className="inner-container">
            <div className="emphasize border-bottom title">
              Slooh Membership
            </div>
            <div className="flex border-bottom padded-top-bottom">
              <div>
                <div
                  className="plan-name"
                  dangerouslySetInnerHTML={{ __html: planName }}
                />
                <div className="audience-type">{planAudienceType}</div>
              </div>
              <div className="plan-cost">
                <span dangerouslySetInnerHTML={{ __html: planCostPrefix }} />
                <span dangerouslySetInnerHTML={{ __html: planCost }} />
              </div>
            </div>
            <div className="flex border-bottom padded-top-bottom">
              <div
                className="emphasize"
                dangerouslySetInnerHTML={{ __html: planDescription }}
              />
              <span
                className="emphasize"
                dangerouslySetInnerHTML={{ __html: planCostPostfix }}
              />
            </div>
            <div className="flex padded-top-bottom">
              <div>
                <Button
                  text="Details"
                  isActive={showDetails}
                  onClickEvent={this.toggleDetails}
                />
              </div>
              <Button text={selectButtonText} onClickEvent={setSelectedPlan} />
            </div>
          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <SubscriptionPlanCardSmall {...this.props} />
        </DisplayAtBreakpoint>
        {showDetails ? (
          <div
            className="inner-container"
            id={'subscriptionPlanDetails_' + planID}
            dangerouslySetInnerHTML={{ __html: aboutThisPlan }}
          />
        ) : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default SubscriptionPlanCard;
