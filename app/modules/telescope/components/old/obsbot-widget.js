import React from 'react';
import PropTypes from 'prop-types';
import { ImagePortalViewer } from './index';
import { ModuleContainer } from './module-container';
import ObservatoryBot from 'app/components/telescope-details/ObservatoryBot/ObservatoryBot';

const ObsBotWidget = (props) => (
  <div className="root">
    <ModuleContainer title="Observatory Bot">
      <ObservatoryBot
        viewGroup={props.ViewGroup}
        teleSystem={props.currentTelescope.teleSystem}
      />
    </ModuleContainer>
  </div>
);

export { ObsBotWidget };
