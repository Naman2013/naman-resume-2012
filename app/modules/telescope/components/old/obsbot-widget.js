import React from 'react';
import ObservatoryBot from 'app/components/telescope-details/ObservatoryBot/ObservatoryBot';
import { ObservatoryBotOffline } from 'app/modules/telescope/components/status-tab/stellite-widget/ObservatoryBotOffline';
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
    dayNightMap,
    weatherSatellite,
    weatherConditions,
    obsId,
  } = props;
  return (
    <div className="root">
      <ModuleContainer
        title={title || 'Observatory Bot'}
        titleIcon="i-logo_astronaut"
      >
        <ObservatoryBotOffline
          obsId={obsId}
          dayNightMap={dayNightMap}
          weatherSatellite={weatherSatellite}
          weatherConditions={weatherConditions}
        />
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
