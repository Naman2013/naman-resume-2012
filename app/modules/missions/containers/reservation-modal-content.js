import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { ReservationModalContent } from '../components/telescope-reservation/reservation-modal-content';
import {
  getObservatoryList,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
  getTelescopeSlot,
  cancelMissionSlot,
  getBySlooh1000,
  getCategoryList,
  getObjectList,
  getMissionSlot,
  reserveMissionSlot,
  getConstellationList,
  setConstellation,
  getCatalogList,
  setCatalog,
  checkTargetVisibility,
} from '../thunks';
import {
  makeTelescopeSelectedTelescopeSelector,
  makeTelescopeSelectedDateSelector,
  makeTelescopeSelectedSlotSelector,
  makeMissionsFirstSlot,
  makeReservedMissionData,
  makeReservedMissionSelector,
  makeMissionsLoadingSelector,
  makeBySlooh1000DataSelector,
  makeByConstellationDataSelector,
  makeMissionsTelescopeFetchingSelector,
  makeByCatalogDataSelector,
  makeByCoordinatesDataSelector,
} from '../selectors';
import { ACTION } from '../reducer';

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
  getMissionSlotDates,
  getTelescopeSlot,
  setSelectedSlot: ACTION.setSelectedSlot,
  cancelMissionSlot,
  getBySlooh1000,
  getCategoryList,
  setCategory: ACTION.setCategory,
  getObjectList,
  setObject: ACTION.setObject,
  resetMissionsData: ACTION.resetMissionsData,
  getMissionSlot,
  reserveMissionSlot,
  getConstellationList,
  setConstellation,
  setConstellationObject: ACTION.setConstellationObject,
  getCatalogList,
  setCatalog: ACTION.setCatalog,
  setDesignation: ACTION.setDesignation,
  checkTargetVisibility,
  setProcessingRecipe: ACTION.setProcessingRecipe,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ReservationModalContent);
