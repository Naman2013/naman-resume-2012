import ProfileLists from 'app/modules/profile/components/profile-lists';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getPrivateProfile,
  getPublicProfile,
  getProfileLists,
} from 'app/modules/profile/thunks';

const mapStateToProps = state => {
  return {
    profileLists: state.profile.profileLists,
  };
};

const mapDispatchToProps = {
  getPrivateProfile,
  getPublicProfile,
  getProfileLists,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileLists);
