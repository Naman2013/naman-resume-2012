import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  fetchGroupOverviewPageMeta,
  changeGroupDescription,
  fetchGroupInvitationPanel,
  fetchGoogleClassroomStudentsPanel,
  fetchInvitePopupContent,
  addExistingUser,
} from '../actions';
import CommunityGroupEdit from '../components/community-group-edit';

const mapStateToProps = state => {
  return {
    communityGroupOverview: state.communityGroupOverview,
    invitePopupContent: state.communityGroupOverview.invitePopupContent,
    isInvitePopupFetching:
      state.communityGroupOverview.invitePopupContentFetching,
  };
};

const mapDispatchToProps = {
  fetchGroupOverviewPageMeta,
  changeGroupDescription,
  fetchGroupInvitationPanel,
  fetchGoogleClassroomStudentsPanel,
  fetchInvitePopupContent,
  addExistingUser,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CommunityGroupEdit);
