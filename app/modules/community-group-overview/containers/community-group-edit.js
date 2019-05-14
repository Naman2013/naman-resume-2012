import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchGroupOverviewPageMeta, changeGroupDescription } from '../actions';
import { CommunityGroupEdit } from '../components/community-group-edit';

const mapStateToProps = state => {
  return {
    communityGroupOverview: state.communityGroupOverview,
  };
};

const mapDispatchToProps = {
  fetchGroupOverviewPageMeta,
  changeGroupDescription,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CommunityGroupEdit);
