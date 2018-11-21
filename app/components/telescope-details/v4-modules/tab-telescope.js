import React from 'react';
import { TelescopeDetail, ObservatoryInformation } from './';
import ObservatoryBot from 'components/telescope-details/ObservatoryBot/ObservatoryBot';
import style from './tab-telescope.style';

const TabTelescope = (props) => (
  <div>
    <div className="module-container">
      <ObservatoryBot
        viewGroup="scope"
        teleSystem={props.currentTelescope.teleSystem}
      />
    </div>
    <div className="module-container">
      <TelescopeDetail />
    </div>

    <div className="module-container">
      <ObservatoryInformation />
    </div>

    <style jsx>{style}</style>
  </div>
);

export { TabTelescope };
