import { connect } from 'react-redux';
import { compose } from 'redux';
import Profile from 'app/modules/profile/components/profile';
import {
  getPrivateProfile,
  getPublicProfile,
} from 'app/modules/profile/thunks';

const mapDispatchToProps = {
  getPrivateProfile,
  getPublicProfile,
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(Profile);
