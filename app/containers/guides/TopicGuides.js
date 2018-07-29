import React from 'react';
import InAppNavigation from 'components/common/InAppNavigation';
import CenterColumn from 'components/common/CenterColumn';
import TopicContent from 'components/guides/TopicContent';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import TopicList from 'components/guides/TopicList';

import { SAMPLE_IMAGE_HTML_BLOB, SAMPLE_VIDEO_HTML_BLOB } from '../../../stories/content/getGuidesPanels';

const TEST_PANEL_LIST = [
  {
    guidePanelId: '12345',
    displayOrder: '10',
    title: 'Not a real title',
    authorName: 'Made Up Dude',
    readDuration: '10',
    content: SAMPLE_VIDEO_HTML_BLOB,
  },
  {
    guidePanelId: '3232',
    displayOrder: '2',
    title: 'Not a real title',
    authorName: 'Made Up Dude',
    readDuration: '10',
    content: SAMPLE_IMAGE_HTML_BLOB,
  },
];

const TopicGuides = () => (
  <div>
    <InAppNavigation
      title="Topic 1: Astronomical Time"
      menuTopAdjustment={162}
    />
    <div
      style={{
        backgroundColor: 'aqua',
        textAlign: 'center',
        color: 'white',
        padding: '20px 0',
      }}
    >
      TODO - ADD HEADER FROM MATT
    </div>
    <TopicContent />
    <SterlingTitle
      title="Things to know"
      subTitle="Noteworthy facts from your friends at Slooh"
    />
    <TopicList list={TEST_PANEL_LIST} />
  </div>
);

export default TopicGuides;
