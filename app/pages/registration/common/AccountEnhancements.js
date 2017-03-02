import React, { PropTypes } from 'react';
import { uniqueId } from 'lodash';
import s from './AccountEnhancements.scss';

const AccountEnhancements = ({
  titleLineOne,
  titleLineTwo,
  upgradeButtonPrompt,
  upgradeAccountLinkURL,
  featureList,
  suggestedTier,
  suggestedTierPricing,
  featureListTitle,
  infoIconURL,
}) => (
  <div className={s.accountEnhancementsRoot}>
    <div className={s.accountTypeContainer}>
      <h3 className={s.title}>
        {titleLineOne} <br /> {titleLineTwo}
      </h3>
      <div className={s.accountIcon}>
        <img className={s.icon} alt="" src={suggestedTier.tierIconURL} height="48" />
      </div>
      <p className={s.accountName}>{suggestedTier.tierName}</p>
      <div className={s.price}>
        <sup>$</sup>{suggestedTierPricing.price}
      </div>
      <div className={s.priceSubtext}>
        {suggestedTierPricing.priceDescription1}<br />
      {suggestedTierPricing.priceDescription2}<br />
    {suggestedTierPricing.priceDescription3}
      </div>
      <div className={s.callToAction}>
        <a
          className="btn-primary"
          href={upgradeAccountLinkURL}
        >
          {upgradeButtonPrompt}
        </a>
      </div>
    </div>

    <div className={s.topicList}>
      <h3 className={s.title}>
        <img className={s.titleIcon} alt="" height="20" src={infoIconURL} /> {featureListTitle}
      </h3>
      <ul className={s.upgradeList}>
        {
          featureList.map(
            feature =>
              <li key={uniqueId()} className={s.upgradeItem}>
                {feature.featureText}
              </li>
          )
        }
      </ul>
    </div>
  </div>
);

AccountEnhancements.defaultProps = {
  featuresList: [],
};

AccountEnhancements.propTypes = {
  upgradeButtonPrompt: PropTypes.string.isRequired,
  upgradeAccountLinkURL: PropTypes.string.isRequired,
  suggestedTier: PropTypes.shape({
    tierIconURL: PropTypes.string.isRequired,
    tierName: PropTypes.string.isRequired,
  }).isRequired,
  suggestedTierPricing: PropTypes.shape({
    price: PropTypes.string.isRequired,
    priceDescription1: PropTypes.string.isRequired,
    priceDescription2: PropTypes.string.isRequired,
    priceDescription3: PropTypes.string.isRequired,
  }).isRequired,
  titleLineOne: PropTypes.string.isRequired,
  titleLineTwo: PropTypes.string.isRequired,
  featureListTitle: PropTypes.string.isRequired,
  infoIconURL: PropTypes.string.isRequired,
  featureList: PropTypes.arrayOf(PropTypes.shape({
    featureText: PropTypes.string.isRequired,
    infoText: PropTypes.string.isRequired,
    strikeout: PropTypes.string.isRequired,
  })).isRequired,
};

export default AccountEnhancements;
