import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import Button from 'app/components/common/style/buttons/Button';
import { info } from 'app/styles/variables/iconURLs';
import SubscriptionPlanCardSmall from './SubscriptionPlanCardSmall';
import { browserHistory } from 'react-router';
import styles from './SubscriptionPlanCard.style';

const { func, number, oneOfType, string } = PropTypes;

class SubscriptionPlanCardDashboard extends Component {
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

  viewPlanDetails(subscriptionPlanId, isAstronomyClub, isClassroom) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClub);
    window.localStorage.setItem('isClassroom', isClassroom);

    /* move to Plan Details in the Join Flow */
    browserHistory.push('/join/membershipPlanDetailsStep');
  }

  selectPlan(subscriptionPlanId, isAstronomyClub, isClassroom) {
    window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
    window.localStorage.setItem('isAstronomyClub', isAstronomyClub);
    window.localStorage.setItem('isClassroom', isClassroom);

    /* move to collecting account info in the Join Flow */
    if (isClassroom == true) {
      browserHistory.push('/join/step1SchoolSelection');
    }
    else {
      browserHistory.push('/join/step2');
    }
  }

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
      isAstronomyClub,
      isClassroom,
      selectButtonText,
      setSelectedPlan,
      teaserContent,
    } = this.props;

    return (
      <div className="root">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <div className="inner-container">
            <div className="emphasize title">
              Welcome!
            </div>
            <div className="emphasize border-bottom title">
              Join now to enjoy Slooh for <span style={{fontWeight: "bold"}}>FREE</span>.
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
                FREE
              </div>
            </div>
            <div className="flex border-bottom padded-top-bottom">
              <div
                className="emphasize"
                dangerouslySetInnerHTML={{ __html: teaserContent }}
              />
              <span
                className="emphasize"
                dangerouslySetInnerHTML={{ __html: planCostPostfix }}
              />
            </div>
            <div className="flex padded-top-bottom">
              <div>
                <Button
                  icon={info}
                  onClickEvent={() =>
                    this.viewPlanDetails(
                      planID,
                      isAstronomyClub,
                      isClassroom
                    )
                  }
                />
              </div>
              <Button text={selectButtonText}
                onClickEvent={() =>
                  this.selectPlan(
                    planID,
                    isAstronomyClub,
                    isClassroom
                  )}
              />
            </div>
          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <SubscriptionPlanCardSmall {...this.props} />
        </DisplayAtBreakpoint>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default SubscriptionPlanCardDashboard;
