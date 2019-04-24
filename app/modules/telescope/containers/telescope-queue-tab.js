import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { QueueTab } from '../components/queue-tab';
import {
  getUpcomingSlotsByTelescope,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
  cancelMissionSlot,
} from '../thunks';
import { 
  makeQueueTabUpcomingSlotsDataSelector,
  makeQueueTabIsFetchingSelector,
 } from '../selectors';
import { ACTION } from '../reducer';
import { getTelescopeSlot } from '../../missions/thunks';
import { ACTION as MISSION_ACTION } from '../../missions/reducer';

const mapStateToProps = createStructuredSelector({
  isFetching: makeQueueTabIsFetchingSelector(),
  upcomingSlotsData: makeQueueTabUpcomingSlotsDataSelector(),
  // selectedSlot: makeTelescopeSelectedSlotSelector(),
});

const mapDispatchToProps = {
  getUpcomingSlotsByTelescope,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
  getTelescopeSlot,
  setSelectedSlot: MISSION_ACTION.setSelectedSlot,
  cancelMissionSlot,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QueueTab);
