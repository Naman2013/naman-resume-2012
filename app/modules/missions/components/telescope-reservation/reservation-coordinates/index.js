import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { withCoordinates } from '../../coordinates/coordinates-wrapper';
import { CoordinatesSetup } from '../../coordinates/coordinates-setup';
import './styles.scss';

class Coordinates extends Component {
  componentDidMount() {
    const { getCategoryList } = this.props;
    getCategoryList();
  }

  componentWillUnmount() {
    const { resetMissionsData } = this.props;
    resetMissionsData();
  }

  getMissionSlot = () => {
    const { getMissionSlot, selectedSlot, scrollToGrabbedMission } = this.props;
    const { uniqueId } = selectedSlot;
    getMissionSlot(
      {
        callSource: 'byTelescopeV4',
        uniqueId,
        missionType: 'coord',
      },
      scrollToGrabbedMission
    );
  };

  render() {
    const {
      categoryList,
      categoryListOpts,
      setCategory,
      selectedCategorySlug,
      missionSlot,
      resetMissionsData,
      selectedCatalog,
      selectedCatalogData,
      reservedMissionData,
      objectData,
      setTargetName,
      targetName,
      telescopeData,
      setProcessingRecipe,
      processingRecipe,
      reservedMission,
      checkTargetVisibility,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      setCoordinatesData,
      coordinatesData,
      pageSetup,
    } = this.props;

    const { completeReservationPromptLong, choosePrompt } = pageSetup;

    return (
      <div className="reservation-coordinates coordinates">
        <CoordinatesSetup
          categoryList={categoryList}
          categoryListOpts={categoryListOpts}
          setCategory={setCategory}
          selectedCategorySlug={selectedCategorySlug}
          getMissionSlot={this.getMissionSlot}
          selectedCatalog={selectedCatalog}
          selectedCatalogData={selectedCatalogData}
          checkTargetVisibility={checkTargetVisibility}
          objectData={objectData}
          targetName={targetName}
          setTargetName={setTargetName}
          telescopeData={telescopeData}
          setProcessingRecipe={setProcessingRecipe}
          processingRecipe={processingRecipe}
          disabled={missionSlot && missionSlot.missionAvailable}
          getTelescopeSlot={getTelescopeSlot}
          extendedTimer={extendedTimer}
          countdown={countdown}
          onCountdownTick={onCountdownTick}
          onCountdownComplete={onCountdownComplete}
          setCoordinatesData={setCoordinatesData}
          coordinatesData={coordinatesData}
          completeReservationPromptLong={completeReservationPromptLong}
          choosePrompt={choosePrompt}
          description="Quickly schedule a Mission by specifying the celestial coordinates that you'd like to image. Check that those coordinates 
          are visivle from this observatory and telescope during this time slot - if so, we'll reserve the Mission for you."
          byTelescope
        />
      </div>
    );
  }
}

export const ReservationCoordinates = withCoordinates(Coordinates);
