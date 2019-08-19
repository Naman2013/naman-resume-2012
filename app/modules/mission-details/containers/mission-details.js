import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  deleteTag,
  getTags,
  setTag,
  getMissionDetails,
} from 'app/modules/mission-details/thunks';

import MissionDetails from '../components/mission-details';
import {
  makeMissionDetailsLoadingSelector,
  makeMissionDetailsTitleSelector,
  makeMissionDetailsIconURLSelector,
  makeMissionDetailsDateCreatedSelector,
  makeMissionDetailsImageCountSelector,
  makeMissionDetailsImageListSelector,
  makeMissionDetailsApiURLSelector,
  makeTagListSelector,
  makeTagsFetchingSelector,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: makeMissionDetailsLoadingSelector(),
  missionTitle: makeMissionDetailsTitleSelector(),
  missionIconURL: makeMissionDetailsIconURLSelector(),
  missionDateCreated: makeMissionDetailsDateCreatedSelector(),
  imageCount: makeMissionDetailsImageCountSelector(),
  imageList: makeMissionDetailsImageListSelector(),
  apiURL: makeMissionDetailsApiURLSelector(),
  tagList: makeTagListSelector(),
  tagsFetching: makeTagsFetchingSelector(),
});

const mapDispatchToProps = {
  getMissionDetails,
  getTags,
  setTag,
  deleteTag,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MissionDetails);
