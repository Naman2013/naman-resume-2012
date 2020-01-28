import ProfileGroups from 'app/modules/profile/components/profile-groups/index';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProfileGroupList } from 'app/modules/clubs/thunks';
import { makeGroupsListSelector } from 'app/modules/clubs/selectors';

const mapStateToProps = (state: any) => {
  return {
    profileGroupList: makeGroupsListSelector()(state),
  };
};

const mapDispatchToProps = {
  getProfileGroupList,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileGroups);
