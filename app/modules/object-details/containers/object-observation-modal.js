import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  getObservatoryList,
  setTelescope,
  setTel
  checkTargetVisibility,
} from '../thunks';
import {
  makeTelescopeSelectedTelescopeSelector,
  makeTelescopeSelectedDateSelector,
  makeTelescopeSelectedSlotSelector,
  makeMissionsFirstSlot,
  makeReservedMissionData,
  makeReservedMissionSelector,
} from '../selectors';
import { ACTION } from '../reducer';

class ObjectObservationModal extends Component {
  render() {
    
  }
}

const mapStateToProps = createStructuredSelector({
  selectedTelescope: makeTelescopeSelectedTelescopeSelector(),
  selectedDate: makeTelescopeSelectedDateSelector(),
  selectedSlot: makeTelescopeSelectedSlotSelector(),
  missionSlot: makeMissionsFirstSlot(),
  reservedMissionData: makeReservedMissionData(),
  reservedMission: makeReservedMissionSelector(),
  bySlooh1000: makeBySlooh1000DataSelector(),
  byConstellation: makeByConstellationDataSelector(),
  byCatalog: makeByCatalogDataSelector(),
  byCoordinates: makeByCoordinatesDataSelector(),
  isFetching: makeMissionsLoadingSelector(),
  isTelescopeFetching: makeMissionsTelescopeFetchingSelector(),
});

const mapDispatchToProps = {
  getObservatoryList,
  setTelescope,
  setTelescopeDate,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)();
