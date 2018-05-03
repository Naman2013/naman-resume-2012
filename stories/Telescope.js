import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import Telescope from '../app/components/Telescope';
import telescopeConfig from '../app/components/Telescope/telescopeConfig';

import telescopeOne from './assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';
import telescopeTwo from './assets/sample-telescope-images/Canary_Four_SS_Planetary_1679x1268.png';

class FauxTelescopeDetailsPage extends Component {
  state = {};

  render() {
    const INITIAL_RESOLUTION = 75;
    const horizontalResolutionKnob = number('Horizontal Resolution', INITIAL_RESOLUTION);
    const verticalResolutionKnob = number('Vertical Resolution', INITIAL_RESOLUTION);
    const incrementKnob = number('Increment', 5);
    const TELESCOPES = Object.keys(telescopeConfig);

    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <div className="telescope-navigation">
          {
            TELESCOPES.map(telescope => <button>{telescopeConfig[telescope].name}</button>)
          }
        </div>

        <Telescope
          horizontalResolution={horizontalResolutionKnob}
          verticalResolution={verticalResolutionKnob}
          increment={incrementKnob}
        />
      </div>
    );
  }
}

storiesOf('Telescope', module)
  .addDecorator(withKnobs)
  .add('View', () => <FauxTelescopeDetailsPage />);
