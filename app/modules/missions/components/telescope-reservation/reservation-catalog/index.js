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
      catalogListOpts,
      setCatalog,
      missionSlot,
      selectedCatalog,
      selectedCatalogData,
      objectData,
      setDesignation,
      designation,
      telescopeData,
      setProcessingRecipe,
      processingRecipe,
      checkTargetVisibility,
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
          completeReservationPromptLong={completeReservationPromptLong}
          choosePrompt={choosePrompt}
          pageConfig={navigationConfig.byCatalog}
          userHasHold={userHasHold}
          byTelescope
          showHoldOneHourButtonWhenExpanded={showHoldOneHourButtonWhenExpanded}
        />
      </div>
    );
  }
}

export const ReservationCatalog = withCatalog(Catalog);
