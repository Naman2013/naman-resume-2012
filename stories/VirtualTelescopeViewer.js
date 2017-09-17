import React from 'react';
import { storiesOf } from '@storybook/react';
import VirtualTelescopeViewer from '../app/components/VirtualTelescopeViewer';

import VirtualTelescopeView from '../app/components/VirtualTelescopeView';

import sampleImage from '../assets/images/photos/eclipse.jpg';

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
  .add('Test VirtualTelescopeView Component', () => (
    <VirtualTelescopeView>
      <div>
        <img alt="" src={sampleImage} />

        <style jsx>{`
          div { margin: 0; padding: 0; }
          img { width: 100%; height: 100%; }
        `}</style>
      </div>
    </VirtualTelescopeView>
  ));
