import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../status-tab/styles.scss';
import { ObservatoryBotOffline } from 'app/modules/telescope/components/status-tab/stellite-widget/ObservatoryBotOffline';
import { ModuleContainer } from 'app/modules/telescope/components/old/module-container';

export const TelescopeOfflineWidget = props => {
  const {
    clockList,
    obsId,
    dayNightMap,
    weatherSatellite,
    weatherConditions,
    missionControlStatusWidgetId,
  } = props;

  return (
    <div className="telescope-offline">
      <ModuleContainer title="Observatory Information">
        <ObservatoryBotOffline
          obsId={obsId}
          dayNightMap={dayNightMap}
          weatherSatellite={weatherSatellite}
          weatherConditions={weatherConditions}
          clockList={clockList}
          missionControlStatusWidgetId={missionControlStatusWidgetId}
        />
      </ModuleContainer>
    </div>
  );
};

TelescopeOfflineWidget.propTypes = {
  weatherSatellite: PropTypes.object.isRequired,
  weatherConditions: PropTypes.object.isRequired,
  dayNightMap: PropTypes.object.isRequired,
  clockList: PropTypes.object.isRequired,
  obsId: PropTypes.string.isRequired,
  missionControlStatusWidgetId: PropTypes.string.isRequired,
};
