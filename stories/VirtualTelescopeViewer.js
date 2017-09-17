import React from 'react';
import { storiesOf } from '@storybook/react';
import LiveImageViewer from '../app/components/telescope-details/LiveImageViewer';
import VirtualTelescopeViewer from '../app/components/VirtualTelescopeViewer';

import telescopeOne from './assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';
import telescopeTwo from './assets/sample-telescope-images/Canary_Four_SS_Planetary_1679x1268.png';
import telescopeThree from './assets/sample-telescope-images/Canary_One_HM_Normal_1018x1018.png';

storiesOf('Virtual Telescope Viewer', module)
  .add('No image...', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer />
    </LiveImageViewer>
  ))
  .add('Canary Four SS Normal 1119x845', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer>
        <div>
          <img alt="" src={telescopeOne} />
        </div>
      </VirtualTelescopeViewer>
    </LiveImageViewer>
  ))
  .add('Canary Four SS Normal 1678x1268', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer>
        <div>
          <img alt="" src={telescopeTwo} />
        </div>
      </VirtualTelescopeViewer>
    </LiveImageViewer>
  ))
  .add('Canary One SS Normal 1018x1018', () => (
    <LiveImageViewer>
      <VirtualTelescopeViewer>
        <div>
          <img alt="" src={telescopeThree} />
        </div>
      </VirtualTelescopeViewer>
    </LiveImageViewer>
  ));
