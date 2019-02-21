import { PublicProfile } from 'app/modules/profile/components/public-profile';
import {
  makeProfileLoadingSelector,
  makePublicProfileUserDataSelector,
} from 'app/modules/profile/selectors';
import { getPublicProfile } from 'app/modules/profile/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  isLoading: makeProfileLoadingSelector(),
  data: makePublicProfileUserDataSelector(),
});
const mapDispatchToProps = {
  getPublicProfile,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps,
))(PublicProfile);
