import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Constellation } from '../components/constellation/constellation';
import { withConstellation } from '../components/constellation/constellation-wrapper';
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
  makeMissionsPageSetupSelector,
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
  pageSetup: makeMissionsPageSetupSelector(),
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
  ),
  withConstellation
)(Constellation);
