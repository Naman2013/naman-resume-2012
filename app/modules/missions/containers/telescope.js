// import {
import { Telescope } from 'app/modules/missions/components/telescope';
//   makeProfileLoadingSelector,
//   makeMissionsUserDataSelector,
// } from 'app/modules/missions/selectors';
// import { getMissions } from 'app/modules/missions/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  // isLoading: makeProfileLoadingSelector(),
  // publicProfileData: makeMissionsUserDataSelector(),
});

const mapDispatchToProps = {
  // getMissions,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Telescope);
