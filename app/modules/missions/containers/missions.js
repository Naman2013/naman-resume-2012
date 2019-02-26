import { Missions } from 'app/modules/missions/components/missions';
import {
  makeMissionsLoadingSelector,
  makeMissionsPageSetupSelector,
} from 'app/modules/missions/selectors';
import { getMissions } from 'app/modules/missions/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: makeMissionsLoadingSelector(),
  pageSetup: makeMissionsPageSetupSelector(),
});

const mapDispatchToProps = {
  getMissions,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Missions);
