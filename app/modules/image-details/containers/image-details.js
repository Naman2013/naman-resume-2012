import { validateResponseAccess } from 'app/modules/authorization/actions';
import { ImageDetails } from 'app/modules/image-details/components/image-details';
import {
  getImageDetails,
  setObservationTags,
} from 'app/modules/image-details/thunks';
import { getProfileGroupList } from 'app/modules/clubs/thunks';
import { shareMemberPicture } from 'app/modules/share-member-photo/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeByGroupsListSelectOptsSelector } from 'app/modules/clubs/selectors';

const mapStateToProps = (state, { user }) => {
  return {
    user: state.user,
    observationTagsError: state.imageDetails.observationTagsError,
    imageDetailsData: state.imageDetails.data,
    isFetching: state.imageDetails.isFetching,
    shareMemberPhotoData: state.shareMemberPhoto.shareMemberPhotoData,
    profileGroupList: makeByGroupsListSelectOptsSelector()(state),
  };
};

const mapDispatchToProps = {
  getImageDetails,
  validateResponseAccess,
  setObservationTags,
  shareMemberPicture,
  getProfileGroupList,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ImageDetails);
