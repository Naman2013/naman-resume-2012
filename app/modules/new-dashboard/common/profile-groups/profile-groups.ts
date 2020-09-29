import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProfileGroupList } from 'app/modules/clubs/thunks';
import { makeGroupsListSelector } from 'app/modules/clubs/selectors';
import { createStructuredSelector } from 'reselect';
import ProfileGroups from './index.js';

const mapStateToProps = createStructuredSelector({
  profileGroupList: makeGroupsListSelector(),
});

const mapDispatchToProps = {
  getProfileGroupList,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileGroups);
