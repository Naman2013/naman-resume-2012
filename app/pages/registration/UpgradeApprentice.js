import React from 'react';
import Header from './common/Header';
import AccountEnhancements from './common/AccountEnhancements';

const featureList = [
  'Public Shows',
  'Live Telescope Feeds',
  'Take Pictures',
  '5 Reservations monthly',
  'Objects: Most Popular',
  'Video On Demand: All',
];

const UpgradeApprentice = () => (
  <div className="registration paid-signin">
    <Header
      membershipTier="Slooh Crew"
      text="Level-up to view this content!"
    />

    <AccountEnhancements
      featuresList={featureList}
    />
  </div>
);

export default UpgradeApprentice;
