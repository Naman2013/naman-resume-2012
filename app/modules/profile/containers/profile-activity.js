import ProfileActivity from 'app/modules/profile/components/profile-activity';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getPrivateProfile } from 'app/modules/profile/thunks';
import { cancelReservation } from 'app/modules/missions/thunks';

const mapStateToProps = state => {};

const mapDispatchToProps = {
  getPrivateProfile,
  cancelReservation,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileActivity);
