import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import Telescope from '../app/components/Telescope';

import telescopeOne from './assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';
import telescopeTwo from './assets/sample-telescope-images/Canary_Four_SS_Planetary_1679x1268.png';

storiesOf('Telescope', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('View', () => (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <Telescope tickRowCount={20} />
    </div>
  ));
