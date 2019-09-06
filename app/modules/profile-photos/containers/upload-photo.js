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
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeUserSelector } from 'app/modules/user/selectors';

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
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UploadPhoto);
