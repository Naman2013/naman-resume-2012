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
  makeMissionsTelescopeFetchingSelector,
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
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ReservationModalContent);
