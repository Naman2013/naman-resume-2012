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
});

const mapDispatchToProps = {
  getMissionSlot,
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
