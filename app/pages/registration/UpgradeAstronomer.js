import React from 'react';
import Header from './common/Header';
import AccountEnhancements from './common/AccountEnhancements';

const featureList = [
  'Public Shows',
  'Live Telescope Feeds',
  'Take Pictures',
  'Unlimited Reservations',
  'Objects: All',
  'Video On Demand: All',
];

const UpgradeAstronomer = () => (
  <div className="registration paid-signin">
    <Header
      membershipTier="Apprentice"
      text="Level-up to view this content!"
    />

    <AccountEnhancements
      featuresList={featureList}
    />
  </div>
);

export default UpgradeAstronomer;
