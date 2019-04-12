import React, { PureComponent } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ReservationSlooh1000 } from '../reservation-slooh-1000';
import './styles.scss';

export class ReservationModalTabs extends PureComponent {
  render() {
    console.log(this.props);
    const {
      bySlooh1000,
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
    } = this.props;
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
              getTelescopeSlot={getTelescopeSlot}
              extendedTimer={extendedTimer}
            />
          </Tab>
          <Tab eventKey="constellation" title="by constellation">
            fasdfasd
          </Tab>
          <Tab eventKey="catalog" title="by catalog">
            asfdasd
          </Tab>
          <Tab eventKey="coordinates" title="by coordinates">
            asfdasd
          </Tab>
        </Tabs>
      </div>
    );
  }
}
