import { fetchObjectDataAction } from 'app/modules/object-details/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Slooh1000 } from '../components/slooh-1000';
import { ACTION } from '../reducer';
import {
  makeBySlooh1000CategoryListSelectOptsSelector,
  makeBySlooh1000CategoryListSelector,
  makeBySlooh1000DataSelector,
  makeBySlooh1000ObjectListExpiresSelector,
  makeBySlooh1000ObjectListSelectOptsSelector,
  makeBySlooh1000ObjectListSelector,
  makeBySlooh1000SelectedCategorySlugSelector,
  makeBySlooh1000SelectedObjectDataSelector,
  makeBySlooh1000SelectedObjectIdSelector,
  makeMissionsFirstSlot,
  makeMissionsLoadingSelector,
  makeReservedMissionData,
  makeReservedMissionSelector,
} from '../selectors';
import {
  cancelMissionSlot,
  getBySlooh1000,
  getCategoryList,
  getMissionSlot,
  getObjectList,
  reserveMissionSlot,
} from '../thunks';

const mapStateToProps = createStructuredSelector({
  bySlooh1000Data: makeBySlooh1000DataSelector(),
  categoryList: makeBySlooh1000CategoryListSelector(),
  categoryListOpts: makeBySlooh1000CategoryListSelectOptsSelector(),
  selectedCategorySlug: makeBySlooh1000SelectedCategorySlugSelector(),
  objectList: makeBySlooh1000ObjectListSelector(),
  objectListOpts: makeBySlooh1000ObjectListSelectOptsSelector(),
  selectedObjectId: makeBySlooh1000SelectedObjectIdSelector(),
  selectedObjectData: makeBySlooh1000SelectedObjectDataSelector(),
  isFetching: makeMissionsLoadingSelector(),
  missionSlot: makeMissionsFirstSlot(),
  reservedMissionData: makeReservedMissionData(),
  reservedMission: makeReservedMissionSelector(),
  objectListExpires: makeBySlooh1000ObjectListExpiresSelector(),
});

const mapDispatchToProps = {
  getMissionSlot,
  getBySlooh1000,
  getCategoryList,
  setCategory: ACTION.setCategory,
  getObjectList,
  setObject: ACTION.setObject,
  resetMissionsData: ACTION.resetMissionsData,
  reserveMissionSlot,
  cancelMissionSlot,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Slooh1000);
