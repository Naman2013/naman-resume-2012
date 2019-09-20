import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getGalleryDetails, deleteGallery } from '../thunks';
import GalleryDetails from '../components/gallery-details';
import {
  makeGalleryDetailsLoadingSelector,
  makeGalleryDetailsTitleSelector,
  makeGalleryDetailsDateCreatedSelector,
  makeGalleryDetailsImageCountSelector,
  makeGalleryDetailsImageListSelector,
  makeGalleryDetailsCanEditSelector,
  makeGalleryDetailsApiURLSelector,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: makeGalleryDetailsLoadingSelector(),
  galleryTitle: makeGalleryDetailsTitleSelector(),
  galleryDateCreated: makeGalleryDetailsDateCreatedSelector(),
  imageCount: makeGalleryDetailsImageCountSelector(),
  imageList: makeGalleryDetailsImageListSelector(),
  canEditFlag: makeGalleryDetailsCanEditSelector(),
  apiURL: makeGalleryDetailsApiURLSelector(),
});

const mapDispatchToProps = {
  getGalleryDetails,
  deleteGallery,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GalleryDetails);
