import React, { PureComponent } from 'react';
import './styles.scss';

export class TelescopeNav extends PureComponent {
  render() {
    const { telescopeList, selectedTelescopeId, setTelescope } = this.props;
    return (
      <div className="telescope-nav">
        {telescopeList.map(telescope => (
          <div
            key={telescope.telescopeId}
            className={`telescope-nav-item${
              selectedTelescopeId === telescope.telescopeId ? ' active' : ''
            }`}
            onClick={() => setTelescope(telescope, true)}
          >
            <h4>{telescope.teleName}</h4>
            <img src={telescope.teleLogoURL} alt="" />
          </div>
        ))}
      </div>
    );
  }
}
