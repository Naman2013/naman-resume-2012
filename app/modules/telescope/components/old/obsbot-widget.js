import React from 'react';
import ObservatoryBot from 'app/components/telescope-details/ObservatoryBot/ObservatoryBot';
import { ModuleContainer } from './module-container';

const ObsBotWidget = props => {
  const {
    ViewGroup,
    currentTelescope: { teleSystem },
    shortFeed,
    title,
    noDescription,
    noCounter,
    noScroll,
  } = props;
  return (
    <div className="root">
      <ModuleContainer
        title={title || 'Observatory Bot'}
        titleIcon="i-logo_astronaut"
      >
        <ObservatoryBot
          viewGroup={ViewGroup}
          teleSystem={teleSystem}
          shortFeed={shortFeed}
          noCounter={noCounter}
          noScroll={noScroll}
          noDescription={noDescription}
        />
      </ModuleContainer>
    </div>
  );
};

export { ObsBotWidget };
