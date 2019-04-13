import React, { PureComponent } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ReservationSlooh1000 } from '../reservation-slooh-1000';
import { ReservationConstellation } from '../reservation-constellation';
import { ReservationCatalog } from '../reservation-catalog';
import './styles.scss';

export class ReservationModalTabs extends PureComponent {
  state = {
    countdown: 300000,
  };

  onCountdownTick = data => {
    this.setState({ countdown: data.total });
  };

  getTelescopeSlot = () => {
    const { getTelescopeSlot } = this.props;
    this.setState({ countdown: 3600000 });
    getTelescopeSlot();
  };

  render() {
    const {
      bySlooh1000,
      byConstellation,
      byCatalog,
      missionSlot,
      reservedMissionData,
      reservedMission,
      getMissionSlot,
      getCategoryList,
      setCategory,
      getObjectList,
      setObject,
      resetMissionsData,
      cancelMissionSlot,
      selectedTelescope,
      selectedSlot,
      getTelescopeSlot,
      extendedTimer,
      getConstellationList,
      setConstellation,
      setConstellationObject,
      getCatalogList,
      setCatalog,
      setDesignation,
      checkTargetVisibility,
      setProcessingRecipe,
      onHide,
    } = this.props;
    const { countdown } = this.state;
    return (
      <div className="reservation-modal-tabs">
        <Tabs
          defaultActiveKey="slooh1000"
          id="reservation-modal-tabs"
          unmountOnExit
        >
          <Tab eventKey="slooh1000" title="by slooh 1000">
            <ReservationSlooh1000
              {...bySlooh1000}
              resetMissionsData={resetMissionsData}
              getCategoryList={getCategoryList}
              getObjectList={getObjectList}
              setCategory={setCategory}
              setObject={setObject}
              missionSlot={missionSlot}
              reservedMissionData={reservedMissionData}
              reservedMission={reservedMission}
              selectedTelescope={selectedTelescope}
              selectedSlot={selectedSlot}
              getMissionSlot={getMissionSlot}
              getTelescopeSlot={this.getTelescopeSlot}
              extendedTimer={extendedTimer}
              countdown={countdown}
              onCountdownTick={this.onCountdownTick}
              onCountdownComplete={onHide}
            />
          </Tab>
          <Tab eventKey="constellation" title="by constellation">
            <ReservationConstellation
              {...byConstellation}
              resetMissionsData={resetMissionsData}
              getConstellationList={getConstellationList}
              setConstellation={setConstellation}
              getObjectList={getObjectList}
              setObject={setConstellationObject}
              missionSlot={missionSlot}
              reservedMissionData={reservedMissionData}
              reservedMission={reservedMission}
              selectedTelescope={selectedTelescope}
              selectedSlot={selectedSlot}
              getMissionSlot={getMissionSlot}
              getTelescopeSlot={this.getTelescopeSlot}
              extendedTimer={extendedTimer}
              countdown={countdown}
              onCountdownTick={this.onCountdownTick}
              onCountdownComplete={onHide}
            />
          </Tab>
          <Tab eventKey="catalog" title="by catalog">
            <ReservationCatalog
              {...byCatalog}
              getCatalogList={getCatalogList}
              setCatalog={setCatalog}
              setDesignation={setDesignation}
              checkTargetVisibility={checkTargetVisibility}
              setProcessingRecipe={setProcessingRecipe}
              missionSlot={missionSlot}
              resetMissionsData={resetMissionsData}
              reservedMissionData={reservedMissionData}
              reservedMission={reservedMission}
              selectedTelescope={selectedTelescope}
              selectedSlot={selectedSlot}
              getMissionSlot={getMissionSlot}
              getTelescopeSlot={this.getTelescopeSlot}
              extendedTimer={extendedTimer}
              countdown={countdown}
              onCountdownTick={this.onCountdownTick}
              onCountdownComplete={onHide}
            />
          </Tab>
          <Tab eventKey="coordinates" title="by coordinates">
            By Coordinates
          </Tab>
        </Tabs>
      </div>
    );
  }
}
