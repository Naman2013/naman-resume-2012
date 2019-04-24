import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { QueueTab } from '../components/queue-tab';
import {
  getUpcomingSlotsByTelescope,
  getFeaturedObjectsByTelescope,
} from '../thunks';
import {
  makeQueueTabUpcomingSlotsDataSelector,
  makeQueueTabIsFetchingSelector,
  makeQueueTabFeaturedObjectsDataSelector,
} from '../selectors';
import { ACTION } from '../reducer';
import {
  getTelescopeSlot,
  setTelescope,
  cancelMissionSlot,
} from '../../missions/thunks';
import { ACTION as MISSION_ACTION } from '../../missions/reducer';
import { makeTelescopeSelectedSlotSelector } from '../../missions/selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: makeQueueTabIsFetchingSelector(),
  upcomingSlotsData: makeQueueTabUpcomingSlotsDataSelector(),
  selectedSlot: makeTelescopeSelectedSlotSelector(),
  featuredObjectsData: makeQueueTabFeaturedObjectsDataSelector(),
});

const mapDispatchToProps = {
  getUpcomingSlotsByTelescope,
  setTelescope,
  getTelescopeSlot,
  setSelectedSlot: MISSION_ACTION.setSelectedSlot,
  cancelMissionSlot,
  getFeaturedObjectsByTelescope,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QueueTab);
