import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchGroupOverviewPageMeta } from '../actions';
import { CommunityGroupEdit } from '../components/community-group-edit';

const mapStateToProps = state => {
  return {
    communityGroupOverview: state.communityGroupOverview,
  };
};

const mapDispatchToProps = {
  fetchGroupOverviewPageMeta,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CommunityGroupEdit);
