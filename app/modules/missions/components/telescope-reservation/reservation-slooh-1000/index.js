import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { AvailbleMissionTile } from '../../available-mission-tile';
import { ExpireCountdown } from '../../expire-countdown';
import { withSlooh1000 } from '../../slooh-1000/slooh-1000-wrapper';
import { Slooh1000Setup } from '../../slooh-1000/slooh-1000-setup';
import './styles.scss';

class Slooh1000 extends Component {
  componentDidMount() {
    const { getCategoryList } = this.props;
    getCategoryList({ callSource: 'byTelescopeV4' });
  }

  componentWillUnmount() {
    const { resetMissionsData } = this.props;
    resetMissionsData();
  }

  getMissionSlot = () => {
    const {
      getMissionSlot,
      selectedSlot,
      missionType,
      scrollToGrabbedMission,
    } = this.props;
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

  setCategory = value => {
    const { setCategory, selectedSlot, selectedTelescope } = this.props;
    const { missionStart, scheduledMissionId, uniqueId } = selectedSlot;
    const { obsId, domeId, telescopeId } = selectedTelescope;
    setCategory(value, {
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
      categoryList,
      categoryListOpts,
      objectListOpts,
      setObject,
      missionSlot,
      selectedCategorySlug,
      selectedObjectId,
      availableMissions,
      noObjects,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      pageSetup,
      navigationConfig,
      selectedSlot,
      showHoldOneHourButtonWhenExpanded,
    } = this.props;

    const { completeReservationPromptLong, choosePrompt } = pageSetup;
    const { userHasHold } = selectedSlot;
    
    return (
      <div className="reservation-slooh-1000 slooh-1000">
        <Slooh1000Setup
          categoryList={categoryList}
          categoryListOpts={categoryListOpts}
          objectListOpts={objectListOpts}
          setCategory={this.setCategory}
          setObject={setObject}
          getMissionSlot={this.getMissionSlot}
          selectedCategorySlug={selectedCategorySlug}
          selectedObjectId={selectedObjectId}
          disabled={missionSlot && missionSlot.missionAvailable}
          availableMissions={availableMissions}
          noObjects={noObjects}
          onCountdownTick={onCountdownTick}
          countdown={countdown}
          onCountdownComplete={onCountdownComplete}
          getTelescopeSlot={getTelescopeSlot}
          extendedTimer={extendedTimer}
          completeReservationPromptLong={completeReservationPromptLong}
          choosePrompt={choosePrompt}
          pageConfig={navigationConfig.bySlooh1000}
          userHasHold={userHasHold}
          byTelescope
          showHoldOneHourButtonWhenExpanded={showHoldOneHourButtonWhenExpanded}
        />
      </div>
    );
  }
}

export const ReservationSlooh1000 = withSlooh1000(Slooh1000);
