import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { UploadPhoto } from 'app/modules/profile-photos/components/upload-photo';
import {
  photoHubsIsFetchingSelector,
  makeUploadImageDataSelector,
  photoHubsUploadToMyPicturesPageDataSelector,
  makePhotoHubsCatalogListSelectOptsSelector,
  photoHubsUploadToMyPicturesDataSelector,
} from 'app/modules/profile-photos/selectors';
import {
  setMyPicturesUpload,
  uploadToMyPictures,
} from 'app/modules/profile-photos/thunks';
import { makeUserSelector } from 'app/modules/user/selectors';
import { setObservationTags } from 'app/modules/image-details/thunks';

const mapStateToProps = createStructuredSelector({
  isFetching: photoHubsIsFetchingSelector(),
  uploadPhotoPageData: photoHubsUploadToMyPicturesPageDataSelector(),
  imageData: makeUploadImageDataSelector(),
  user: makeUserSelector(),
  catalogListOpts: makePhotoHubsCatalogListSelectOptsSelector(),
  uploadToMyPicturesData: photoHubsUploadToMyPicturesDataSelector(),
});

const mapDispatchToProps = {
  setMyPicturesUpload,
  uploadToMyPictures,
  setObservationTags,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UploadPhoto);
