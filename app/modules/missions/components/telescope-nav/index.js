import React, { Component } from 'react';
import './styles.scss';

export class TelescopeNav extends Component {
  render() {
    const { telescopeList, selectedTelescopeId, setTelescope } = this.props;
    return (
      <div className="telescope-nav">
        {telescopeList.map(telescope => (
          <div
            key={telescope.teleUniqueId}
            className={`telescope-nav-item${
              selectedTelescopeId === telescope.teleUniqueId ? ' active' : ''
            }`}
            onClick={() => setTelescope(telescope)}
          >
            <img src={telescope.teleLogoURL} alt="" />
          </div>
        ))}
      </div>
    );
  }
}
