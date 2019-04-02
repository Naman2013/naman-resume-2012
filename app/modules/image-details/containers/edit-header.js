import { EditHeader } from 'app/modules/image-details/components/edit/edit-header';
import {
  makeTagListSelector,
  makeTagsFetchingSelector,
  makeGalleriesFetchingSelector,
  makeGalleryListSelector,
} from 'app/modules/image-details/selectors';
import {
  deleteImage,
  deleteTag,
  getGalleries,
  getTags,
  setTag,
  addImageToGallery,
} from 'app/modules/image-details/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// const mapStateToProps = createStructuredSelector({});
const mapStateToProps = createStructuredSelector({
  //  el: select()(state)
  tagList: makeTagListSelector(),
  tagsFetching: makeTagsFetchingSelector(),

  // galleries
  galleriesFetching: makeGalleriesFetchingSelector(),
  galleryList: makeGalleryListSelector(),
});

const mapDispatchToProps = {
  deleteImage,
  getTags,
  setTag,
  deleteTag,
  getGalleries,
  addImageToGallery,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditHeader);
