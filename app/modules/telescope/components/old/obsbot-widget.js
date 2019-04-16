import React from 'react';
import ObservatoryBot from 'app/components/telescope-details/ObservatoryBot/ObservatoryBot';
import { ModuleContainer } from './module-container';

const ObsBotWidget = props => {
  const {
    ViewGroup,
    currentTelescope: { teleSystem },
    shortFeed,
  } = props;
  return (
    <div className="root">
      <ModuleContainer title="Observatory Bot">
        <ObservatoryBot
          viewGroup={ViewGroup}
          teleSystem={teleSystem}
          shortFeed={shortFeed}
        />
      </ModuleContainer>
    </div>
  );
};

export { ObsBotWidget };
