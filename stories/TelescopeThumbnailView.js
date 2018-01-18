import React from 'react';
import { storiesOf } from '@storybook/react';
import TelescopeThumbnailView from '../app/components/TelescopeThumbnailView';

import telescopeOne from './assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';
import telescopeTwo from './assets/sample-telescope-images/Canary_Four_SS_Planetary_1679x1268.png';

storiesOf('Telescope thumbnail view', module)
  .add('View', () => (
    <TelescopeThumbnailView
      topImageURL={telescopeOne}
      bottomImageURL={telescopeTwo}
    />
  ));
