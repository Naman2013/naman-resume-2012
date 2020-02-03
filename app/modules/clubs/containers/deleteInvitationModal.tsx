import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  getGroupDeleteInvitation,
  deleteInvitation,
} from 'app/modules/clubs/thunks';
import DeleteInvitationModal from 'app/modules/clubs/components/delete-invitation-modal';
import { makeGroupDeleteInvitation } from 'app/modules/clubs/selectors';

const mapStateToProps = createStructuredSelector({
  groupDeleteInvitation: makeGroupDeleteInvitation(),
});

const mapDispatchToProps = {
  getGroupDeleteInvitation,
  deleteInvitation,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DeleteInvitationModal);
