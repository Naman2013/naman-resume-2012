import { PrivateProfile } from 'app/modules/profile/components/private-profile';
import {
  makeProfileLoadingSelector,
  makePrivateProfileUserDataSelector,
} from 'app/modules/profile/selectors';
import { getPrivateProfile } from 'app/modules/profile/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: makeProfileLoadingSelector(),
  privateProfileData: makePrivateProfileUserDataSelector(),
});

const mapDispatchToProps = {
  getPrivateProfile,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PrivateProfile);
