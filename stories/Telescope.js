import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import first from 'lodash/first';

import Telescope from '../app/components/Telescope';
import telescopeConfig from '../app/components/Telescope/telescopeConfig';

import telescopeOne from './assets/sample-telescope-images/Canary_Four_SS_Normal_1119x845.png';
import telescopeTwo from './assets/sample-telescope-images/Canary_Four_SS_Planetary_1679x1268.png';

class FauxTelescopeDetailsPage extends Component {
  state = {
    currentTelescope: telescopeConfig.CANARY_ONE_HALF_METER,
  };

  previousInstrumentID = null;

  handleTelescopeSelection = (event) => {
    this.previousInstrumentID = this.state.currentTelescope.instrumentID;
    const instrumentKey = event.target.getAttribute('data-instrument-key');
    this.setState(() => ({ currentTelescope: telescopeConfig[instrumentKey] }));
  };

  render() {
    const { currentTelescope } = this.state;

    const horizontalResolutionKnob = number('Horizontal Resolution', currentTelescope.PORTAL.horizontal);
    const verticalResolutionKnob = number('Vertical Resolution', currentTelescope.PORTAL.vertical);
    const incrementKnob = number('Increment', 5);
    const TELESCOPES = Object.keys(telescopeConfig);

    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <div className="telescope-navigation">
          {
            TELESCOPES.map(telescope => (
              <button
                data-instrument-key={telescopeConfig[telescope].key}
                onClick={this.handleTelescopeSelection}
              >
                {telescopeConfig[telescope].name}
              </button>))
          }
        </div>

        <Telescope
          activeInstrumentID={currentTelescope.instrumentID}
          previousInstrumentID={this.previousInstrumentID}
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
