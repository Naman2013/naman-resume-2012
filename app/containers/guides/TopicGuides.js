import React from 'react';
import InAppNavigation from 'components/common/InAppNavigation';
import CenterColumn from 'components/common/CenterColumn';
import TopicContent from 'components/guides/TopicContent';
import SterlingTitle from 'components/common/titles/SterlingTitle';

const TopicGuides = () => (
  <div>
    <InAppNavigation
      title="Topic 1: Astronomical Time"
      menuTopAdjustment={162}
    />
    <div style={{ backgroundColor: 'aqua', textAlign: 'center', color: 'white', padding: '20px 0' }}>TODO - ADD HEADER FROM MATT</div>
    <TopicContent />
    <SterlingTitle
      title="Things to know"
      subTitle="Noteworthy facts from your friends at Slooh"
    />
  </div>
);

export default TopicGuides;
