import PrivateProfile from 'app/modules/profile/components/private-profile';
import {
  makeProfileLoadingSelector,
  makePrivateProfileUserDataSelector,
} from 'app/modules/profile/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: makeProfileLoadingSelector(),
  privateProfileData: makePrivateProfileUserDataSelector(),
});

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(PrivateProfile);
