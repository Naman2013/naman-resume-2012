import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import Telescope from '../app/components/Telescope';
import telescopeConfig from '../app/components/telescopeConfig';

import telescopeOne from './assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';
import telescopeTwo from './assets/sample-telescope-images/Canary_Four_SS_Planetary_1679x1268.png';

storiesOf('Telescope', module)
  .addDecorator(withKnobs)
  .add('View', () => {
    const INITIAL_RESOLUTION = 75;
    const horizontalResolutionKnob = number('Horizontal Resolution', INITIAL_RESOLUTION);
    const verticalResolutionKnob = number('Vertical Resolution', INITIAL_RESOLUTION);
    const incrementKnob = number('Increment', 5);
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <div className="telescope-navigation">
          <button></button>
        </div>
        <Telescope
          horizontalResolution={horizontalResolutionKnob}
          verticalResolution={verticalResolutionKnob}
          increment={incrementKnob}
        />
      </div>
    );
  });
