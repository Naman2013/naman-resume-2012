import ProfileActivity from 'app/modules/profile/components/profile-activity';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getPrivateProfile,
  getPrivateProfileMissions,
  getPublicProfileMissions,
} from 'app/modules/profile/thunks';
import {
  cancelReservation,
  cancelPiggyback,
} from 'app/modules/missions/thunks';
import { createStructuredSelector } from 'reselect';
import {
  makeProfileLoadingSelector,
  makeProfileMissionsDataSelector,
} from 'app/modules/profile/selectors';

const mapStateToProps = createStructuredSelector({
  isLoading: makeProfileLoadingSelector(),
  profileMissionsData: makeProfileMissionsDataSelector(),
});

const mapDispatchToProps = {
  getPrivateProfile,
  cancelReservation,
  cancelPiggyback,

  getPrivateProfileMissions,
  getPublicProfileMissions,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileActivity);
