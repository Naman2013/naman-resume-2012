import React, { Component, cloneElement } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import styles from './SubscriptionPlanCard.style';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

class SubscriptionPlanCard extends Component {

  static propTypes = {
    planID: oneOfType([number, string]).isRequired,
    planName: string.isRequired,
    planDescription: string.isRequired,
    planCostPrefix: string.isRequired,
    planCostPostfix: string.isRequired,
    planCost: string.isRequired,
    aboutThisPlan: string.isRequired,
    selectButtonText: string.isRequired,
    setSelectedPlan: func.isRequired,
  };

  static defaultProps = {
  }

  state = {
    showDetails: false,
  };

  toggleDetails = () => {
    this.setState(state => ({
      showDetails: !state.showDetails,
    }));
  }

  render() {
    const {
      aboutThisPlan,
      planCost,
      planCostPrefix,
      planCostPostfix,
      planDescription,
      planID,
      planName,
      selectButtonText,
      setSelectedPlan,
    } = this.props;

    const {
      showDetails,
    } = this.state;

    return (
      <div className="root">
        <div className="inner-container">
          <div className="emphasize border-bottom title">Slooh Membership</div>
          <div className="flex border-bottom padded-top-bottom">
            <div className="plan-name" dangerouslySetInnerHTML={{ __html: planName }} />
            <div className="plan-cost">
              <span dangerouslySetInnerHTML={{ __html: planCostPrefix}} />
              <span dangerouslySetInnerHTML={{ __html: planCost}} />
            </div>
          </div>
          <div className="flex border-bottom padded-top-bottom">
            <div className="emphasize" dangerouslySetInnerHTML={{ __html: planDescription }} />
            <span className="emphasize" dangerouslySetInnerHTML={{ __html: planCostPostfix}} />
          </div>
          <div className="flex padded-top-bottom">
            <div>
              <Button
                text="Details"
                isActive={showDetails}
                onClickEvent={this.toggleDetails}
              />

            </div>
            <Button
              text={selectButtonText}
              onClickEvent={setSelectedPlan}
            />
          </div>
        </div>
        {showDetails ? <div
          className="inner-container"
          id={'subscriptionPlanDetails_' + planID}
          dangerouslySetInnerHTML={{ __html: aboutThisPlan }}
        /> : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default SubscriptionPlanCard;
