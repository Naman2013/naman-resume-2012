import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getMissionDetails } from '../thunks';
import MissionDetails from '../components/mission-details';
import {
  makeMissionDetailsLoadingSelector,
  makeMissionDetailsTitleSelector,
  makeMissionDetailsIconURLSelector,
  makeMissionDetailsDateCreatedSelector,
  makeMissionDetailsImageCountSelector,
  makeMissionDetailsImageListSelector,
  makeMissionDetailsApiURLSelector,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: makeMissionDetailsLoadingSelector(),
  missionTitle: makeMissionDetailsTitleSelector(),
  missionIconURL: makeMissionDetailsIconURLSelector(),
  missionDateCreated: makeMissionDetailsDateCreatedSelector(),
  imageCount: makeMissionDetailsImageCountSelector(),
  imageList: makeMissionDetailsImageListSelector(),
  apiURL: makeMissionDetailsApiURLSelector(),
});

const mapDispatchToProps = {
  getMissionDetails,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MissionDetails);
