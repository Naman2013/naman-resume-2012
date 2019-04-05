import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Slooh1000 } from '../components/slooh-1000';
import {
  makeBySlooh1000CategoryListSelectOptsSelector,
  makeBySlooh1000CategoryListSelector,
  makeBySlooh1000SelectedCategorySlugSelector,
  makeBySlooh1000ObjectListSelector,
  makeBySlooh1000ObjectListSelectOptsSelector,
  makeBySlooh1000SelectedObjectIdSelector,
  makeBySlooh1000SelectedObjectDataSelector,
  makeBySlooh1000DataSelector,
  makeBySlooh1000ObjectListExpiresSelector,
  makeMissionsLoadingSelector,
  makeMissionsFirstSlot,
  makeReservedMissionData,
} from '../selectors';
import {
  getCategoryList,
  setCategory,
  getObjectList,
  getBySlooh1000,
  getMissionSlot,
  reserveMissionSlot,
  cancelMissionSlot,
} from '../thunks';
import { ACTION } from '../reducer';

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
