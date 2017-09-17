import React from 'react';
import { storiesOf } from '@storybook/react';
import VirtualTelescopeViewer from '../app/components/VirtualTelescopeViewer';

import VirtualTelescopeView from '../app/components/VirtualTelescopeView';

import sampleImage from '../assets/images/photos/eclipse.jpg';
import telescopeOne from './assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';
import telescopeTwo from './assets/sample-telescope-images/Canary_Four_SS_Planetary_1679x1268.png';
import telescopeThree from './assets/sample-telescope-images/Canary_One_HM_Normal_1018x1018.png';

const START_TIME = 1499570100;

storiesOf('Virtual Telescope Viewer', module)
  .add('Basic view', () => (
    <VirtualTelescopeViewer timestampInSeconds={START_TIME} />
  ))
  .add('With background image full', () => (
    <VirtualTelescopeViewer timestampInSeconds={START_TIME} clipped={false}>
      <div>
        <img width="100%" alt="" src={sampleImage} />
      </div>
    </VirtualTelescopeViewer>
  ))
  .add('Clipped image', () => (
    <VirtualTelescopeViewer timestampInSeconds={START_TIME} clipped={true}>
      <div>
        <img width="100%" alt="" src={sampleImage} />
      </div>
    </VirtualTelescopeViewer>
  ))
  .add('Canary Four SS Normal 1119x845', () => (
    <VirtualTelescopeView>
      <div>
        <img alt="" src={telescopeOne} />
      </div>
    </VirtualTelescopeView>
  ))
  .add('Canary Four SS Normal 1678x1268', () => (
    <VirtualTelescopeView>
      <div>
        <img alt="" src={telescopeTwo} />
      </div>
    </VirtualTelescopeView>
  ))
  .add('Canary One SS Normal 1018x1018', () => (
    <VirtualTelescopeView>
      <div>
        <img alt="" src={telescopeThree} />
      </div>
    </VirtualTelescopeView>
  ));
