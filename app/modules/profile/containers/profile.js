import { connect } from 'react-redux';
import { compose } from 'redux';
import Profile from 'app/modules/profile/components/profile';
import {
  getPrivateProfile,
  getProfile,
  getPublicProfile,
} from 'app/modules/profile/thunks';
import { ACTION } from '../reducer';

const mapDispatchToProps = {
  getPrivateProfile,
  getPublicProfile,
  getProfile,
  clearProfileData: ACTION.clearProfileData,
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(Profile);
