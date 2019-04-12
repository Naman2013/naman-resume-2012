import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { AvailbleMissionTile } from '../../available-mission-tile';
import { ExpireCountdown } from '../../expire-countdown';
import { withSlooh1000 } from '../../slooh-1000/slooh-1000-wrapper';
import { Slooh1000Setup } from '../../slooh-1000/slooh-1000-setup';
import './styles.scss';

class Slooh1000 extends Component {
  componentDidMount() {
    const {
      getCategoryList,
      resetMissionsData,
      categoryList,
      isFetching,
    } = this.props;
    //resetMissionsData();
    getCategoryList({ callSource: 'byTelescopeV4' });
  }

  componentWillUnmount() {
    const { cancelMissionSlot, selectedSlot } = this.props;
    const { uniqueId } = selectedSlot;
    cancelMissionSlot({
      callSource: 'byTelescopeV4',
      uniqueId,
    });
  }

  getMissionSlot = () => {
    const { getMissionSlot, selectedSlot, missionType } = this.props;
    const { uniqueId } = selectedSlot;

    getMissionSlot(
      {
        callSource: 'byTelescopeV4',
        uniqueId,
        missionType,
      },
      () => {}
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
      setCategory,
      objectListOpts,
      setObject,
      missionSlot,
      selectedCategorySlug,
      selectedObjectId,
      reservedMissionData,
      resetMissionsData,
      objectListExpires,
      reservedMission,
      availableMissions,
      noObjects,
      getTelescopeSlot,
      extendedTimer,
    } = this.props;
    console.log('ORION', this.props);

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
          getTelescopeSlot={getTelescopeSlot}
          extendedTimer={extendedTimer}
          description="Welcome to the Slooh 1000! Tell us what you want to see - we’ll make sure that the object 
          is visible from this observatory and telescope during this time slot - if so, we'll reserve the Mission for you."
          byTelescope
        />
      </div>
    );
  }
}

export const ReservationSlooh1000 = withSlooh1000(Slooh1000);
