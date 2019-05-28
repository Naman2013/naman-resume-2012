import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Telescope } from '../components/telescope';
import {
  getObservatoryList,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
  getTelescopeSlot,
  cancelMissionSlot,
} from '../thunks';
import {
  makeTelescopeListSelector,
  makeTelescopeSelectedTelescopeSelector,
  makeTelescopeSelectedDateSelector,
  makeTelescopeMissionListSelector,
  makeTelescopeSelectedSlotSelector,
  makeTelescopeMissionListRefreshIntervalSelector,
  makeTelescopeMissionscrollToSMIDSelector,
  makeMissionsPageSetupSelector,
  makeTelescopeScrolledToSlotSelector,
  makeTelescopeMissionListLodadedSelector,
} from '../selectors';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  telescopeList: makeTelescopeListSelector(),
  selectedTelescope: makeTelescopeSelectedTelescopeSelector(),
  selectedDate: makeTelescopeSelectedDateSelector(),
  missionList: makeTelescopeMissionListSelector(),
  selectedSlot: makeTelescopeSelectedSlotSelector(),
  missionListRefreshInterval: makeTelescopeMissionListRefreshIntervalSelector(),
  scrollToSMID: makeTelescopeMissionscrollToSMIDSelector(),
  pageSetup: makeMissionsPageSetupSelector(),
  scrolledToSlot: makeTelescopeScrolledToSlotSelector(),
  missionListLodaded: makeTelescopeMissionListLodadedSelector(),
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
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Telescope);
