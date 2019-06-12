import { getProfile } from 'app/modules/profile/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PublicProfile from 'app/modules/profile/components/public-profile';
import {
  makeProfileLoadingSelector,
  makePublicProfileUserDataSelector,
} from 'app/modules/profile/selectors';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: makeProfileLoadingSelector(),
  publicProfileData: makePublicProfileUserDataSelector(),
});

const mapDispatchToProps = {
  getProfile,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PublicProfile);
