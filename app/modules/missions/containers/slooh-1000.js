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
  makeBySlooh1000DataSelector,
  makeMissionsLoadingSelector,
} from '../selectors';
import {
  getCategoryList,
  setCategory,
  getBySlooh1000,
  getMissionSlot,
} from '../thunks';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  bySlooh1000Data: makeBySlooh1000DataSelector(),
  categoryList: makeBySlooh1000CategoryListSelector(),
  categoryListOpts: makeBySlooh1000CategoryListSelectOptsSelector(),
  selectedCategorySlug: makeBySlooh1000SelectedCategorySlugSelector(),
  objectList: makeBySlooh1000ObjectListSelector(),
  objectListOpts: makeBySlooh1000ObjectListSelectOptsSelector(),
  isFetching: makeMissionsLoadingSelector(),
});

const mapDispatchToProps = {
  getMissionSlot,
  getBySlooh1000,
  getCategoryList,
  setCategory,
  setObject: ACTION.setObject,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Slooh1000);
