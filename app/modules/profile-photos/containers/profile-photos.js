import { fetchFiltersLists } from 'app/modules/my-pictures-filters/actions';
import { fetchObjectTypeList } from 'app/modules/object-type-list/actions';
import { ProfilePhotos } from 'app/modules/profile-photos/components/profile-photos';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectTelescopeList, selectObjectTypeList } from '../selectors';

const mapStateToProps = createStructuredSelector({
  telescopeList: selectTelescopeList(),
  objectTypeList: selectObjectTypeList(),
});

const mapDispatchToProps = {
  fetchFiltersLists,
  fetchObjectTypeList,
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfilePhotos);
