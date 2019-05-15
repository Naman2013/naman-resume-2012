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
} from '../selectors';
import { ACTION } from '../reducer';
import {
  getTelescopeSlot,
  setTelescope,
  cancelMissionSlot,
} from '../../missions/thunks';
import { ACTION as MISSION_ACTION } from '../../missions/reducer';
import { makeTelescopeSelectedSlotSelector } from '../../missions/selectors';
import { makeUserSelector } from '../../user/selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: makeQueueTabIsFetchingSelector(),
  upcomingSlotsData: makeQueueTabUpcomingSlotsDataSelector(),
  selectedSlot: makeTelescopeSelectedSlotSelector(),
  featuredObjectsData: makeQueueTabFeaturedObjectsDataSelector(),
  reservedCommunityMissionData: makeQueueTabReservedCommunityMissionDataSelector(),
  user: makeUserSelector(),
  reservedCommunityMission: makeQueueTabReservedCommunityMissionSelector(),
});

const mapDispatchToProps = {
  getUpcomingSlotsByTelescope,
  setTelescope,
  getTelescopeSlot,
  setSelectedSlot: MISSION_ACTION.setSelectedSlot,
  cancelMissionSlot,
  getFeaturedObjectsByTelescope,
  reserveCommunityMission,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QueueTab);
