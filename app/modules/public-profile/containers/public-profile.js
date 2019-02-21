import { PublicProfile } from 'app/modules/public-profile/components/public-profile';
import {
  makePublicProfileLoadingSelector,
  makePublicProfileUserDataSelector,
} from 'app/modules/public-profile/selectors';
import { getPublicProfile } from 'app/modules/public-profile/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  isLoading: makePublicProfileLoadingSelector(),
  data: makePublicProfileUserDataSelector(),
});
const mapDispatchToProps = {
  getPublicProfile,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps,
))(PublicProfile);
