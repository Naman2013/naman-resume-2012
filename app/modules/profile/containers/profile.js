import { connect } from 'react-redux';
import { compose } from 'redux';
import Profile from 'app/modules/profile/components/profile';
import {
  getPrivateProfile,
  getProfile,
  getPublicProfile,
} from 'app/modules/profile/thunks';

const mapDispatchToProps = {
  getPrivateProfile,
  getPublicProfile,
  getProfile,
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(Profile);
