import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { QueueTab } from '../components/queue-tab';
import {
  getUpcomingSlotsByTelescope,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
  getTelescopeSlot,
  cancelMissionSlot,
} from '../thunks';
import { makeQueueTabUpcomingSlotsDataSelector } from '../selectors';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  upcomingSlotsData: makeQueueTabUpcomingSlotsDataSelector(),
  // selectedSlot: makeTelescopeSelectedSlotSelector(),
});

const mapDispatchToProps = {
  getUpcomingSlotsByTelescope,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
  getTelescopeSlot,
  //setSelectedSlot: ACTION.setSelectedSlot,
  cancelMissionSlot,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QueueTab);
