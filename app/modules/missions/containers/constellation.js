import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Constellation } from '../components/constellation';
import {
  makeMissionsLoadingSelector,
  makeByConstellationListSelector,
  makeByConstellationListSelectOptsSelector,
  makeByConstellationSelectedConstellationSelector,
} from '../selectors';
import {
  getMissionSlot,
  reserveMissionSlot,
  cancelMissionSlot,
  getConstellationList,
  setConstellation,
} from '../thunks';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  constellationList: makeByConstellationListSelector(),
  constellationListOpt: makeByConstellationListSelectOptsSelector(),
  selectedConstellation: makeByConstellationSelectedConstellationSelector(),
});

const mapDispatchToProps = {
  getMissionSlot,
  reserveMissionSlot,
  cancelMissionSlot,
  getConstellationList,
  setConstellation,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Constellation);
