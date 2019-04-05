import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Telescope } from '../components/telescope';
import {
  getObservatoryList,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
} from '../thunks';
import {
  makeTelescopeListSelector,
  makeTelescopeSelectedTelescopeSelector,
  makeTelescopeSelectedDateSelector,
  makeTelescopeMissionListSelector,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  telescopeList: makeTelescopeListSelector(),
  selectedTelescope: makeTelescopeSelectedTelescopeSelector(),
  selectedDate: makeTelescopeSelectedDateSelector(),
  missionList: makeTelescopeMissionListSelector(),
});

const mapDispatchToProps = {
  getObservatoryList,
  setTelescope,
  setTelescopeDate,
  getMissionSlotDates,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Telescope);
