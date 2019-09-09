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
import {
  fetchBrowseFindDataAction,
  resetBrowseFindDataAction,
} from 'app/modules/browse-find-data/actions';
import { selectBrowseFindData } from 'app/modules/browse-find-data/selectors';

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
  fetchBrowseFindDataAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UploadPhoto);
