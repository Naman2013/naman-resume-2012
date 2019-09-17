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
  grabPiggyback,
  reservePiggyback,
} from 'app/modules/missions/thunks';
import {
  makePiggybackMissionsFirstSlot,
  makePiggybackReservedMissionData,
  makePiggybackReservedMissionSelector,
} from 'app/modules/missions/selectors';
import { createStructuredSelector } from 'reselect';
import {
  makeProfileLoadingSelector,
  makeProfileMissionsDataSelector,
} from 'app/modules/profile/selectors';
import { makeUserSelector } from 'app/modules/user/selectors';

const mapStateToProps = createStructuredSelector({
  isLoading: makeProfileLoadingSelector(),
  profileMissionsData: makeProfileMissionsDataSelector(),
  piggyBackMissionSlot: makePiggybackMissionsFirstSlot(),
  piggybackReservedMissionData: makePiggybackReservedMissionData(),
  piggybackReservedMission: makePiggybackReservedMissionSelector(),
  user: makeUserSelector(),
});

const mapDispatchToProps = {
  getPrivateProfile,
  cancelReservation,
  cancelPiggyback,
  grabPiggyback,
  reservePiggyback,

  getPrivateProfileMissions,
  getPublicProfileMissions,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileActivity);
