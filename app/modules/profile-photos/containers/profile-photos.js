import { fetchFiltersLists } from 'app/modules/my-pictures-filters/actions';
import { ProfilePhotos } from 'app/modules/profile-photos/components/profile-photos';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectMyPicturesFilters } from '../selectors';

const mapStateToProps = createStructuredSelector({
  allFilters: selectMyPicturesFilters(),
});
const mapDispatchToProps = {
  fetchFiltersLists,
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfilePhotos);
