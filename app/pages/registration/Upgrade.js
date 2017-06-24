import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Header from './common/Header';
import AccountEnhancements from './common/AccountEnhancements';

const mapStateToProps = ({ authorization }) => ({
  authorization,
});

@connect(mapStateToProps)
class Upgrade extends Component {
  render() {
    const { authorization } = this.props;
    const { errorHandlerBody } = authorization;

    if (isEmpty(errorHandlerBody)) {
      return null;
    }

    const {
      upsellPageArray: {
        featureListArray: {
          featureList,
          featureListTitle,
          infoIconURL,
        },
        membershipTierArray,
        pricingArray,
        tiersPrompt1,
        tiersPrompt2,
        title1,
        title2,
        upgradeAccountLinkURL,
        upgradeButtonPrompt,
      },
    } = errorHandlerBody;

    return (
      <div className="registration paid-signin">
        <Header
          title={title1}
          text={title2}
        />

        <AccountEnhancements
          titleLineOne={tiersPrompt1}
          titleLineTwo={tiersPrompt2}
          upgradeButtonPrompt={upgradeButtonPrompt}
          upgradeAccountLinkURL={upgradeAccountLinkURL}
          suggestedTier={membershipTierArray[0]}
          suggestedTierPricing={pricingArray}
          featureListTitle={featureListTitle}
          infoIconURL={infoIconURL}
          featureList={featureList}
        />
      </div>
    );
  }
}

export default Upgrade;
