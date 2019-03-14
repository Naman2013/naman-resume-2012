import React, { Component } from 'react';
import { TelescopeNav } from '../telescope-nav';
import './styles.scss';

export class TelescopeSetup extends Component {
  componentDidMount = () => {};

  fetchData = () => {
    const { getObservatoryList } = this.props;
    getObservatoryList();
  };

  render() {
    const { selectedTelescope, telescopeList, setTelescope } = this.props;
    const { teleName, teleUniqueId } = selectedTelescope;

    return (
      <div className="telescope-setup">
        <div className="telescope-setup-header">
          <div className="telescope-setup-telescope-info">
            Set up Telescope: {teleName}
          </div>
          <TelescopeNav
            telescopeList={telescopeList}
            selectedTelescopeId={teleUniqueId}
            setTelescope={setTelescope}
          />
        </div>
        test
      </div>
    );
  }
}
