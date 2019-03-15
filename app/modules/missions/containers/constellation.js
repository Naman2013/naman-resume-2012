import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Constellation } from '../components/constellation';
import { makeMissionsLoadingSelector } from '../selectors';
import {
  getMissionSlot,
  reserveMissionSlot,
  cancelMissionSlot,
} from '../thunks';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  getMissionSlot,
  reserveMissionSlot,
  cancelMissionSlot,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Constellation);
