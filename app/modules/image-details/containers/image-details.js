import { validateResponseAccess } from 'app/modules/authorization/actions';
import { ImageDetails } from 'app/modules/image-details/components/image-details';
import {
  getImageDetails,
  setObservationTags,
} from 'app/modules/image-details/thunks';
import { shareMemberPicture } from 'app/modules/share-member-photo/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = ({ user, imageDetails }) => {
  return {
    user,
    observationTagsError: imageDetails.observationTagsError,
    imageDetailsData: imageDetails.data,
    isFetching: imageDetails.isFetching,
  };
};

const mapDispatchToProps = {
  getImageDetails,
  validateResponseAccess,
  setObservationTags,
  shareMemberPicture,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ImageDetails);
