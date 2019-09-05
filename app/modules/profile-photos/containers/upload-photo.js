import { UploadPhoto } from 'app/modules/profile-photos/components/upload-photo';
import {
  photoHubsIsFetchingSelector,
  photoHubsUploadPhotoDataSelector,
  photoHubsUploadToMyPicturesPageDataSelector,
} from 'app/modules/profile-photos/selectors';
import { getMissions } from 'app/modules/profile-photos/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isFetching: photoHubsIsFetchingSelector(),
  uploadPhotoPageData: photoHubsUploadToMyPicturesPageDataSelector(),
  uploadPhotoData: photoHubsUploadPhotoDataSelector(),
});

const mapDispatchToProps = {
  getMissions,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UploadPhoto);
