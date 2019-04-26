import {
  fetchFiltersLists,
  setFilters,
} from 'app/modules/my-pictures-filters/actions';
import { fetchObjectTypeList } from 'app/modules/object-type-list/actions';
import { ProfilePhotos } from 'app/modules/profile-photos/components/profile-photos';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTelescopeList,
  selectObjectTypeList,
  selectSelectedFilters,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  telescopeList: selectTelescopeList(),
  objectTypeList: selectObjectTypeList(),
  selectedFilters: selectSelectedFilters(),
});

const mapDispatchToProps = {
  fetchFiltersLists,
  fetchObjectTypeList,
  setFilters,
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfilePhotos);
