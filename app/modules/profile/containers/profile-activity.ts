import ProfileActivity from 'app/modules/profile/components/profile-activity';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getPrivateProfile } from 'app/modules/profile/thunks';
import {
  cancelReservation,
  cancelPiggyback,
} from 'app/modules/missions/thunks';

const mapStateToProps = () => {};

const mapDispatchToProps = {
  getPrivateProfile,
  cancelReservation,
  cancelPiggyback,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileActivity);
