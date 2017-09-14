import React from 'react';
import { storiesOf } from '@storybook/react';
import VirtualTelescopeViewer from '../app/components/VirtualTelescopeViewer';

import sampleImage from '../assets/images/graphics/livecam-placeholder.jpg';

const START_TIME = 1499570100;

storiesOf('Virtual Telescope Viewer', module)
  .add('Basic view', () => (
    <VirtualTelescopeViewer timestampInSeconds={START_TIME} />
  ))
  .add('With background image full', () => (
    <VirtualTelescopeViewer timestampInSeconds={START_TIME}>
      <div style={{ width: '100%', height: '100%', backgroundImage: `url(${sampleImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
    </VirtualTelescopeViewer>
  ))
  .add('Clipped image', () => (
    <VirtualTelescopeViewer timestampInSeconds={START_TIME}>
      <div style={{ width: '100%', height: '100%', backgroundImage: `url(${sampleImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
    </VirtualTelescopeViewer>
  ));
