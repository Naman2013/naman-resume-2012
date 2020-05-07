import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeUserSelector } from '../../user/selectors';
import { Telescope } from '../components/telescope';
import {
  getObservatoryList,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
  getTelescopeSlot,
  cancelMissionSlot,
  grabPiggyback,
  reservePiggyback,
  getMissionSlotEdit,
} from '../thunks';
import {
  makeTelescopeListSelector,
  makeTelescopeSelectedTelescopeSelector,
  makeTelescopeSelectedDateSelector,
  makeTelescopeMissionListSelector,
  makeTelescopeSelectedSlotSelector,
  makeTelescopeMissionListRefreshIntervalSelector,
  makeTelescopeMissionTimeStamp,
  makeTelescopeMissionLocalTimeStamp,
  makeTelescopeMissionscrollToSMIDSelector,
  makeMissionsPageSetupSelector,
  makeTelescopeScrolledToSlotSelector,
  makeTelescopeMissionListLodadedSelector,
  makePiggybackMissionsFirstSlot,
  makePiggybackReservedMissionData,
  makePiggybackReservedMissionSelector,
} from '../selectors';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  telescopeList: makeTelescopeListSelector(),
  selectedTelescope: makeTelescopeSelectedTelescopeSelector(),
  selectedDate: makeTelescopeSelectedDateSelector(),
  missionList: makeTelescopeMissionListSelector(),
  selectedSlot: makeTelescopeSelectedSlotSelector(),
  missionListRefreshInterval: makeTelescopeMissionListRefreshIntervalSelector(),
  timestamp: makeTelescopeMissionTimeStamp(),
  currenttime: makeTelescopeMissionLocalTimeStamp(),
  scrollToSMID: makeTelescopeMissionscrollToSMIDSelector(),
  pageSetup: makeMissionsPageSetupSelector(),
  scrolledToSlot: makeTelescopeScrolledToSlotSelector(),
  missionListLodaded: makeTelescopeMissionListLodadedSelector(),
  piggyBackMissionSlot: makePiggybackMissionsFirstSlot(),
  piggybackReservedMissionData: makePiggybackReservedMissionData(),
  piggybackReservedMission: makePiggybackReservedMissionSelector(),
  user: makeUserSelector(),
});

const mapDispatchToProps = {
  getObservatoryList,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
  getTelescopeSlot,
  setSelectedSlot: ACTION.setSelectedSlot,
  setScrolledToSlot: ACTION.setScrolledToSlot,
  cancelMissionSlot,
  grabPiggyback,
  reservePiggyback,
  getMissionSlotEdit,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Telescope);
