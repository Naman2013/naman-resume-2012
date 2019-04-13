import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { withCatalog } from '../../catalog/catalog-wrapper';
import { CatalogSetup } from '../../catalog/catalog-setup';
import './styles.scss';

class Catalog extends Component {
  componentDidMount() {
    const { getCatalogList } = this.props;
    getCatalogList({ callSource: 'byTelescopeV4' });
  }

  componentWillUnmount() {
    const { resetMissionsData } = this.props;
    resetMissionsData();
  }

  getMissionSlot = () => {
    const { getMissionSlot, selectedSlot } = this.props;
    const { uniqueId } = selectedSlot;
    getMissionSlot(
      {
        callSource: 'byTelescopeV4',
        uniqueId,
        missionType: 'catalog',
      },
      () => {}
    );
  };

  render() {
    const {
      catalogListOpts,
      setCatalog,
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
      <div className="reservation-catalog catalog">
        <CatalogSetup
          catalogListOpts={catalogListOpts}
          setCatalog={setCatalog}
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
          description="Quickly schedule a Mission by choosing from millions of cataloget objects. Tell us what you want to see - we’ll make sure that the object 
        is visible from this observatory and telescope during this time slot - if so, we'll reserve the Mission for you."
          byTelescope
        />
      </div>
    );
  }
}

export const ReservationCatalog = withCatalog(Catalog);
