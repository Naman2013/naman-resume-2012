import React from 'react';
import { ObsBotWidget, TelescopeDetail, ObservatoryInformation } from './';
import style from './tab-telescope.style';

const TabTelescope = (props) => (
  <div>
    <div className="module-container">
      <ObsBotWidget {...props} ViewGroup="scopes"/>
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
