import React from 'react';
import { storiesOf } from '@storybook/react';
import LiveImageViewer from '../app/components/telescope-details/LiveImageViewer';
import VirtualTelescopeViewer from '../app/components/VirtualTelescopeViewer';

import telescopeOne from './assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';
import telescopeTwo from './assets/sample-telescope-images/Canary_Four_SS_Planetary_1679x1268.png';
import telescopeThree from './assets/sample-telescope-images/Canary_One_HM_Normal_1018x1018.png';

import virtualTelescopeViewerContent from './content/virtualTelescopeViewerContent';
import liveMissionContent from './content/liveMissionContent';

storiesOf('Virtual Telescope Viewer', module)
  .add('No image...', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer />
    </LiveImageViewer>
  ))
  .add('No content: Canary Four SS Normal 1119x845', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer>
        <div>
          <img draggable="false" alt="" src={telescopeOne} />
        </div>
      </VirtualTelescopeViewer>
    </LiveImageViewer>
  ))
  .add('With INFO: Canary Four SS Normal 1678x1268', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer
        showInfoButton={true}
        {...virtualTelescopeViewerContent}
      >
        <div>
          <img draggable="false" alt="" src={telescopeTwo} />
        </div>
      </VirtualTelescopeViewer>
    </LiveImageViewer>
  ))
  .add('showMissionData is false', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer
        missionStart={liveMissionContent.missionList[0].missionStart}
        missionEnd={liveMissionContent.missionList[0].expires}
        {...virtualTelescopeViewerContent}
      >
        <div>
          <img draggable="false" alt="" src={telescopeThree} />
        </div>
      </VirtualTelescopeViewer>
    </LiveImageViewer>
  ))
  .add('showMissionData is true', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer
        missionStart={liveMissionContent.missionList[0].missionStart}
        missionEnd={liveMissionContent.missionList[0].expires}
        {...virtualTelescopeViewerContent}
        showMissionData={true}
      >
        <div>
          <img draggable="false" alt="" src={telescopeThree} />
        </div>
      </VirtualTelescopeViewer>
    </LiveImageViewer>
  ));
