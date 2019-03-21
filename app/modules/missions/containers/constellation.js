import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Constellation } from '../components/constellation';
import {
  makeMissionsLoadingSelector,
  makeByConstellationListSelector,
  makeByConstellationListSelectOptsSelector,
  makeByConstellationSelectedConstellationSelector,
  makeByConstellationObjectListSelector,
  makeByConstellationSelectedObjectIdSelector,
  makeByConstellationSelectedObjectDataSelector,
  makeByConstellationObjectListSelectOptsSelector,
  makeMissionsFirstSlot,
  makeReservedMissionData,
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
  objectList: makeByConstellationObjectListSelector(),
  objectListOpts: makeByConstellationObjectListSelectOptsSelector(),
  selectedObjectId: makeByConstellationSelectedObjectIdSelector(),
  selectedObjectData: makeByConstellationSelectedObjectDataSelector(),
  missionSlot: makeMissionsFirstSlot(),
  reservedMissionData: makeReservedMissionData(),
});

const mapDispatchToProps = {
  getMissionSlot,
  resetMissionsData: ACTION.resetMissionsData,
  reserveMissionSlot,
  cancelMissionSlot,
  getConstellationList,
  setConstellation,
  setObject: ACTION.setConstellationObject,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Constellation);
