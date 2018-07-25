import React from 'react';
import InAppNavigation from 'components/common/InAppNavigation';
import CenterColumn from 'components/common/CenterColumn';
import TopicContent from 'components/guides/TopicContent';

const TopicGuides = () => (
  <div>
    <InAppNavigation
      title="Topic 1: Astronomical Time"
      menuTopAdjustment={162}
    />

    <div style={{ backgroundColor: 'aqua', textAlign: 'center', color: 'white', padding: '20px 0' }}>TODO - ADD HEADER FROM MATT</div>

    <TopicContent />
  </div>
);

export default TopicGuides;
