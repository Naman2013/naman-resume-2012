import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { withCoordinates } from '../../coordinates/coordinates-wrapper';
import { CoordinatesSetup } from '../../coordinates/coordinates-setup';
import './styles.scss';

class Coordinates extends Component {
  componentDidMount() {
    const { getCategoryList } = this.props;
    getCategoryList({ callSource: 'byTelescopeV4' });
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
        missionType: 'catalog',
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
      setDesignation,
      designation,
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
    } = this.props;

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
          checkCatalogVisibility={checkTargetVisibility}
          objectData={objectData}
          designation={designation}
          setDesignation={setDesignation}
          telescopeData={telescopeData}
          setProcessingRecipe={setProcessingRecipe}
          processingRecipe={processingRecipe}
          disabled={missionSlot && missionSlot.missionAvailable}
          getTelescopeSlot={getTelescopeSlot}
          extendedTimer={extendedTimer}
          countdown={countdown}
          onCountdownTick={onCountdownTick}
          onCountdownComplete={onCountdownComplete}
          description="Quickly schedule a Mission by specifying the celestial coordinates that you'd like to image. Check that those coordinates 
          are visivle from this observatory and telescope during this time slot - if so, we'll reserve the Mission for you."
          byTelescope
        />
      </div>
    );
  }
}

export const ReservationCoordinates = withCoordinates(Coordinates);
