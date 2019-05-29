import React, { Component } from 'react';
import { TelescopeNav } from '../telescope-nav';
import { TelescopeDropdown } from '../telescope-dropdown';
import './styles.scss';

export class TelescopeSetup extends Component {
  render() {
    const { selectedTelescope, telescopeList, setTelescope, setUpTelescopePrompt } = this.props;
    const { teleName, telescopeId } = selectedTelescope;

    return (
      <div className="telescope-setup">
        <div className="telescope-setup-nav">
          <div className="telescope-setup-telescope-info">
            {setUpTelescopePrompt} {teleName}
          </div>
          <TelescopeNav
            telescopeList={telescopeList}
            selectedTelescopeId={telescopeId}
            setTelescope={setTelescope}
          />
        </div>
        <div className="telescope-setup-dropdown">
          <div className="telescope-setup-telescope-info">
            Select a Telescope
          </div>
          <TelescopeDropdown
            telescopeList={telescopeList}
            selectedTelescope={selectedTelescope}
            onSelect={telescope => setTelescope(telescope, true)}
          />
        </div>
      </div>
    );
  }
}
