import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getGalleryDetails } from '../thunks';
import GalleryDetails from '../components/gallery-details';
import {
  makeGalleryDetailsLoadingSelector,
  makeGalleryDetailsTitleSelector,
  makeGalleryDetailsDateCreatedSelector,
  makeGalleryDetailsImageCountSelector,
  makeGalleryDetailsImageListSelector,
  makeGalleryDetailsApiURLSelector,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: makeGalleryDetailsLoadingSelector(),
  galleryTitle: makeGalleryDetailsTitleSelector(),
  galleryDateCreated: makeGalleryDetailsDateCreatedSelector(),
  imageCount: makeGalleryDetailsImageCountSelector(),
  imageList: makeGalleryDetailsImageListSelector(),
  apiURL: makeGalleryDetailsApiURLSelector(),
});

const mapDispatchToProps = {
  getGalleryDetails,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GalleryDetails);
