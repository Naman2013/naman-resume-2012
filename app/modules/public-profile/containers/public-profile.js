import { PublicProfile } from 'app/modules/public-profile/components/public-profile';
import { makePublicProfileLoadingSelector } from 'app/modules/public-profile/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  isLoading: makePublicProfileLoadingSelector(),
});
const mapDispatchToProps = {
  getPublicProfile: ACTION.getPublicProfile,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps,
))(PublicProfile);
