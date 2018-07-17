import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import Telescope from '../app/components/Telescope';
import telescopeConfig from '../app/components/Telescope/telescopeConfig';
import FAUX_MISSIONS, { nonMission } from 'content/fauxMissions';

class FauxTelescopeDetailsPage extends Component {
  state = {
    currentTelescope: telescopeConfig.CANARY_ONE_HALF_METER,
    currentMission: nonMission,
  };

  previousInstrumentID = null;

  handleTelescopeSelection = (event) => {
    this.previousInstrumentID = this.state.currentTelescope.instrumentID;
    const instrumentKey = event.target.getAttribute('data-instrument-key');
    this.setState(() => ({ currentTelescope: telescopeConfig[instrumentKey] }));
  };

  handleNewMission = (event) => {
    const selectedMission = event.target.getAttribute('data-mission');
    this.setState(() => ({ currentMission: FAUX_MISSIONS[selectedMission] }));
  }


  render() {
    const { currentMission, currentTelescope } = this.state;
    const horizontalResolutionKnob = currentTelescope.PORTAL.horizontal;
    const verticalResolutionKnob = currentTelescope.PORTAL.vertical;
    const incrementKnob = 5;
    const TELESCOPES = Object.keys(telescopeConfig);

    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <div className="telescope-navigation">
          <h5>Change telescope</h5>
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

        <div style={{ margin: '10px 0' }} className="change-missions">
          <h5>How Big?</h5>
          <button
            onClick={this.handleNewMission}
            data-mission={FAUX_MISSIONS.scaleUp.key}
          >
            Scale up
          </button>
          <button
            onClick={this.handleNewMission}
            data-mission={FAUX_MISSIONS.scaleDown.key}
          >
            Scale down
          </button>
        </div>

        <Telescope
          missionMetaData={currentMission}
          activeInstrumentID={currentTelescope.instrumentID}
          previousInstrumentID={this.previousInstrumentID}
          increment={incrementKnob}
        />
      </div>
    );
  }
}

storiesOf('Telescope', module)
  .add('View', () => <FauxTelescopeDetailsPage />);
