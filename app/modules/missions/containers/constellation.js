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
  makeByConstellationObjectListExpiresSelector,
  makeMissionsFirstSlot,
  makeReservedMissionData,
  makeByConstellationAvailableMissionsSelector,
  makeByConstellationNoObjectsSelector,
  makeReservedMissionSelector,
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
  reservedMission: makeReservedMissionSelector(),
  objectListExpires: makeByConstellationObjectListExpiresSelector(),
  availableMissions: makeByConstellationAvailableMissionsSelector(),
  noObjects: makeByConstellationNoObjectsSelector(),
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
