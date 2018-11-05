import React from 'react';
import { TelescopeDetail, ObservatoryInformation } from './';
import style from './tab-telescope.style';

const TabTelescope = () => (
  <div>
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
