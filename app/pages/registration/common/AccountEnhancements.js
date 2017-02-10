import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { uniqueId } from 'lodash';
import s from './AccountEnhancements.scss';

const AccountEnhancements = ({ featuresList }) => (
  <div className={s.accountEnhancementsRoot}>
    <div className={s.accountTypeContainer}>
      <h3 className={s.title}>To view this content you must be signed-in as an</h3>
      <div className={s.accountIcon}>
        <img className={s.icon} alt="Astronaut icon" src="../assets/icons/astronaut.svg" width="70%" />
      </div>
      <p className={s.accountName}>Apprentice</p>
      <div className={s.price}>
        <sup>$</sup>4.95
      </div>
      <div className={s.priceSubtext}>
        Monthly | USD
      </div>
      <div className={s.callToAction}>
        <Link to="btn-primary continue bottom-left margin-top-xxlarge">
          Upgrade Now
        </Link>
      </div>
    </div>

    <div className={s.topicList}>
      <h3 className={s.title}>What You Get:</h3>
      <ul className={s.upgradeList}>
        {
          featuresList.map(feature => <li key={uniqueId()} className={s.upgradeItem}>{feature}</li>)
        }
      </ul>
    </div>
  </div>
);

AccountEnhancements.defaultProps = {
  featuresList: [],
};

AccountEnhancements.propTypes = {
  featuresList: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default AccountEnhancements;
