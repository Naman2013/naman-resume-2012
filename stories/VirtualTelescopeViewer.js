import React from 'react';
import { storiesOf } from '@storybook/react';
import VirtualTelescopeViewer from '../app/components/VirtualTelescopeViewer';

const START_TIME = 1499570100;

storiesOf('Virtual Telescope Viewer', module)
  .add('Basic view', () => (
    <VirtualTelescopeViewer timestampInSeconds={START_TIME} />
  ));
