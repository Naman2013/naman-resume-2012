import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { UploadPhoto } from 'app/modules/profile-photos/components/upload-photo';
import {
  photoHubsIsFetchingSelector,
  photoHubsUploadPhotoDataSelector,
  photoHubsUploadToMyPicturesPageDataSelector,
  makePhotoHubsCatalogListSelectOptsSelector,
  photoHubsUploadToMyPicturesDataSelector,
} from 'app/modules/profile-photos/selectors';
import {
  uploadToMyPicturesPage,
  setMyPicturesUpload,
  uploadToMyPictures,
} from 'app/modules/profile-photos/thunks';
import { makeUserSelector } from 'app/modules/user/selectors';
import { setObservationTags } from 'app/modules/image-details/thunks';
import { ACTION } from 'app/modules/profile-photos/reducer';

const mapStateToProps = createStructuredSelector({
  isFetching: photoHubsIsFetchingSelector(),
  uploadPhotoPageData: photoHubsUploadToMyPicturesPageDataSelector(),
  uploadPhotoData: photoHubsUploadPhotoDataSelector(),
  user: makeUserSelector(),
  catalogListOpts: makePhotoHubsCatalogListSelectOptsSelector(),
  uploadToMyPicturesData: photoHubsUploadToMyPicturesDataSelector(),
});

const mapDispatchToProps = {
  setMyPicturesUpload,
  uploadToMyPictures,
  setObservationTags,
  uploadToMyPicturesPage,
  clearUploadedPhotoData: ACTION.clearUploadedPhotoData,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UploadPhoto);
