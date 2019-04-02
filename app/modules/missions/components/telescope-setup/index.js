import React, { Component } from 'react';
import { TelescopeNav } from '../telescope-nav';
import { TelescopeDropdown } from '../telescope-dropdown';
import './styles.scss';

export class TelescopeSetup extends Component {
  render() {
    const { selectedTelescope, telescopeList, setTelescope } = this.props;
    const { teleName, teleUniqueId } = selectedTelescope;

    return (
      <div className="telescope-setup">
        <div className="telescope-setup-nav">
          <div className="telescope-setup-telescope-info">
            Set up Telescope: {teleName}
          </div>
          <TelescopeNav
            telescopeList={telescopeList}
            selectedTelescopeId={teleUniqueId}
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
            onSelect={setTelescope}
          />
        </div>
      </div>
    );
  }
}
