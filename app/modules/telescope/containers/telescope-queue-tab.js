import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { QueueTab } from '../components/queue-tab';
import {
  getUpcomingSlotsByTelescope,
  getFeaturedObjectsByTelescope,
  reserveCommunityMission,
} from '../thunks';
import {
  makeQueueTabUpcomingSlotsDataSelector,
  makeQueueTabIsFetchingSelector,
  makeQueueTabFeaturedObjectsDataSelector,
  makeQueueTabReservedCommunityMissionDataSelector,
  makeQueueTabReservedCommunityMissionSelector,
  makeTelescopePageSetupSelector,
  makeQueueTabTimeStamp,
  makeQueueTabLocalTimeStamp,
} from '../selectors';
import {
  getTelescopeSlot,
  setTelescope,
  cancelMissionSlot,
  grabPiggyback,
  reservePiggyback,
  getMissionSlotEdit,
} from '../../missions/thunks';
import { ACTION as MISSION_ACTION } from '../../missions/reducer';
import {
  makeTelescopeSelectedSlotSelector,
  makePiggybackMissionsFirstSlot,
  makePiggybackReservedMissionData,
  makePiggybackReservedMissionSelector,
} from '../../missions/selectors';
import { makeUserSelector } from '../../user/selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: makeQueueTabIsFetchingSelector(),
  upcomingSlotsData: makeQueueTabUpcomingSlotsDataSelector(),
  timestamp: makeQueueTabTimeStamp(),
  currenttime: makeQueueTabLocalTimeStamp(),
  selectedSlot: makeTelescopeSelectedSlotSelector(),
  featuredObjectsData: makeQueueTabFeaturedObjectsDataSelector(),
  reservedCommunityMissionData: makeQueueTabReservedCommunityMissionDataSelector(),
  user: makeUserSelector(),
  reservedCommunityMission: makeQueueTabReservedCommunityMissionSelector(),
  pageSetup: makeTelescopePageSetupSelector(),
  piggyBackMissionSlot: makePiggybackMissionsFirstSlot(),
  piggybackReservedMissionData: makePiggybackReservedMissionData(),
  piggybackReservedMission: makePiggybackReservedMissionSelector(),
});

const mapDispatchToProps = {
  getUpcomingSlotsByTelescope,
  setTelescope,
  getTelescopeSlot,
  setSelectedSlot: MISSION_ACTION.setSelectedSlot,
  cancelMissionSlot,
  getFeaturedObjectsByTelescope,
  reserveCommunityMission,
  grabPiggyback,
  reservePiggyback,
  getMissionSlotEdit,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QueueTab);
