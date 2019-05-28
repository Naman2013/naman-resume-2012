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
      selectedCatalog,
      selectedCatalogData,
      objectData,
      setTargetName,
      targetName,
      telescopeData,
      setProcessingRecipe,
      processingRecipe,
      checkTargetVisibility,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      setCoordinatesData,
      coordinatesData,
      pageSetup,
      navigationConfig,
    } = this.props;

    const {
      completeReservationPromptLong,
      choosePrompt,
    } = pageSetup;

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
          pageConfig={navigationConfig.byCoordinates}
          byTelescope
        />
      </div>
    );
  }
}

export const ReservationCoordinates = withCoordinates(Coordinates);
