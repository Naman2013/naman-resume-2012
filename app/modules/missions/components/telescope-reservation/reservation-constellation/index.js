import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { withConstellation } from '../../constellation/constellation-wrapper';
import { ConstellationSetup } from '../../constellation/constellation-setup';
import './styles.scss';

class Constellation extends Component {
  componentDidMount() {
    const { getConstellationList } = this.props;
    getConstellationList({ callSource: 'byTelescopeV4' });
  }

  componentWillUnmount() {
    const { resetMissionsData } = this.props;
    resetMissionsData();
  }

  getMissionSlot = () => {
    const { getMissionSlot, selectedSlot, missionType, scrollToGrabbedMission } = this.props;
    const { uniqueId } = selectedSlot;

    getMissionSlot(
      {
        callSource: 'byTelescopeV4',
        uniqueId,
        missionType,
      },
      scrollToGrabbedMission
    );
  };

  setConstellation = value => {
    const { setConstellation, selectedSlot, selectedTelescope } = this.props;
    const { missionStart, scheduledMissionId, uniqueId } = selectedSlot;
    const { obsId, domeId, telescopeId } = selectedTelescope;
    setConstellation(value, {
      callSource: 'byTelescopeV4',
      uniqueId,
      scheduledMissionId,
      missionStart,
      obsId,
      domeId,
      telescopeId,
    });
  };

  render() {
    const {
      constellationListOpt,
      objectListOpts,
      setObject,
      missionSlot,
      selectedConstellation,
      selectedObjectId,
      availableMissions,
      noObjects,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      pageSetup,
    } = this.props;
    const { completeReservationPromptLong, choosePrompt } = pageSetup;

    return (
      <div className="reservation-constellation constellation">
        <ConstellationSetup
          constellationListOpt={constellationListOpt}
          objectListOpts={objectListOpts}
          setConstellation={this.setConstellation}
          setObject={setObject}
          getMissionSlot={this.getMissionSlot}
          selectedConstellation={selectedConstellation}
          selectedObjectId={selectedObjectId}
          disabled={missionSlot && missionSlot.missionAvailable}
          availableMissions={availableMissions}
          noObjects={noObjects}
          countdown={countdown}
          onCountdownTick={onCountdownTick}
          onCountdownComplete={onCountdownComplete}
          getTelescopeSlot={getTelescopeSlot}
          extendedTimer={extendedTimer}
          completeReservationPromptLong={completeReservationPromptLong}
          choosePrompt={choosePrompt}
          description="Welcome to the Constellation! Tell us what you want to see - we’ll make sure that the object 
          is visible from this observatory and telescope during this time slot - if so, we'll reserve the Mission for you."
          byTelescope
        />
      </div>
    );
  }
}

export const ReservationConstellation = withConstellation(Constellation);
