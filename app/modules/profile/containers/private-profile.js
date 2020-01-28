import PrivateProfile from 'app/modules/profile/components/private-profile';
import {
  makePrivateProfileUserDataSelector,
  makeProfileLoadingSelector,
} from 'app/modules/profile/selectors';
import { getProfile } from 'app/modules/profile/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: makeProfileLoadingSelector(),
  privateProfileData: makePrivateProfileUserDataSelector(),
});

const mapDispatchToProps = {
  getProfile,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PrivateProfile);
